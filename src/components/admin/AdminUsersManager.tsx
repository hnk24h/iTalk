import React, { useEffect, useMemo, useState } from 'react'
import { AdminUserOverview, AdminUserRecording, UserRole } from '../../types'
import {
  adminCreateUser,
  adminDeleteUser,
  adminDeleteUserRecording,
  adminFetchUserRecordings,
  adminFetchUsersOverview,
  adminResetUserProgress,
  adminSendPasswordReset,
  adminUpdateUser,
  adminUpdateUserRole,
} from '../../services/cms'
import {
  AlertTriangle,
  Award,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  Edit3,
  Eye,
  Flame,
  KeyRound,
  Mic,
  RefreshCw,
  RotateCcw,
  Save,
  Search,
  Shield,
  ShieldCheck,
  Trash2,
  UserPlus,
  Users,
  X,
} from 'lucide-react'

interface AdminUsersManagerProps {
  currentUserId: string
  onStatsUpdated?: (stats: {
    usersCount: number
    totalRecordings: number
    totalMinutes: number
  }) => void
}

const PAGE_SIZE = 20

export const AdminUsersManager: React.FC<AdminUsersManagerProps> = ({
  currentUserId,
  onStatsUpdated,
}) => {
  const [users, setUsers] = useState<AdminUserOverview[]>([])
  const [totalRecordings, setTotalRecordings] = useState(0)
  const [totalMinutes, setTotalMinutes] = useState(0)
  const [guestScheduleCount, setGuestScheduleCount] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [toastMsg, setToastMsg] = useState<string | null>(null)

  // Filters & Pagination
  const [searchQuery, setSearchQuery] = useState('')
  const [roleFilter, setRoleFilter] = useState<'all' | UserRole>('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [updatingRoleId, setUpdatingRoleId] = useState<string | null>(null)
  const [confirmDeleteUserId, setConfirmDeleteUserId] = useState<string | null>(null)
  const [deletingUserId, setDeletingUserId] = useState<string | null>(null)

  // Create Modal State
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [createEmail, setCreateEmail] = useState('')
  const [createPassword, setCreatePassword] = useState('')
  const [createDisplayName, setCreateDisplayName] = useState('')
  const [createRole, setCreateRole] = useState<UserRole>('user')
  const [createTargetMinutes, setCreateTargetMinutes] = useState(15)
  const [createTargetLessons, setCreateTargetLessons] = useState(3)
  const [createError, setCreateError] = useState<string | null>(null)
  const [isCreating, setIsCreating] = useState(false)

  // Edit Modal State
  const [editingUser, setEditingUser] = useState<AdminUserOverview | null>(null)
  const [editDisplayName, setEditDisplayName] = useState('')
  const [editAvatarUrl, setEditAvatarUrl] = useState('')
  const [editRole, setEditRole] = useState<UserRole>('user')
  const [editStreak, setEditStreak] = useState(0)
  const [editTargetMinutes, setEditTargetMinutes] = useState(15)
  const [editTargetLessons, setEditTargetLessons] = useState(3)
  const [editError, setEditError] = useState<string | null>(null)
  const [editActionMsg, setEditActionMsg] = useState<string | null>(null)
  const [isSavingEdit, setIsSavingEdit] = useState(false)
  const [isSendingReset, setIsSendingReset] = useState(false)
  const [confirmResetProgress, setConfirmResetProgress] = useState(false)
  const [isResettingProgress, setIsResettingProgress] = useState(false)

  // Detail modal
  const [selectedUser, setSelectedUser] = useState<AdminUserOverview | null>(null)
  const [userRecordings, setUserRecordings] = useState<AdminUserRecording[]>([])
  const [isLoadingDetail, setIsLoadingDetail] = useState(false)
  const [confirmDeleteRecId, setConfirmDeleteRecId] = useState<string | null>(null)

  const showToast = (msg: string) => {
    setToastMsg(msg)
    setTimeout(() => setToastMsg((prev) => (prev === msg ? null : prev)), 4000)
  }

  const fetchUsers = async () => {
    setIsLoading(true)
    setErrorMsg(null)
    const res = await adminFetchUsersOverview()
    if (res.error) {
      setErrorMsg(res.error)
    }
    setUsers(res.users)
    setTotalRecordings(res.totalRecordings)
    setTotalMinutes(res.totalMinutes)
    setGuestScheduleCount(res.guestScheduleCount)
    onStatsUpdated?.({
      usersCount: res.users.length,
      totalRecordings: res.totalRecordings,
      totalMinutes: res.totalMinutes,
    })
    setIsLoading(false)
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery, roleFilter])

  const openCreateModal = () => {
    setCreateEmail('')
    setCreatePassword('')
    setCreateDisplayName('')
    setCreateRole('user')
    setCreateTargetMinutes(15)
    setCreateTargetLessons(3)
    setCreateError(null)
    setShowCreateModal(true)
  }

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setCreateError(null)

    if (!createEmail.trim()) {
      setCreateError('Vui lòng nhập email.')
      return
    }
    if (createPassword.length < 6) {
      setCreateError('Mật khẩu tối thiểu 6 ký tự.')
      return
    }

    setIsCreating(true)
    const res = await adminCreateUser({
      email: createEmail,
      password: createPassword,
      displayName: createDisplayName,
      role: createRole,
      targetMinutes: createTargetMinutes,
      targetLessons: createTargetLessons,
    })
    setIsCreating(false)

    if (res.error) {
      setCreateError(res.error)
      return
    }

    setShowCreateModal(false)
    await fetchUsers()
    showToast(
      res.needsEmailConfirmation
        ? `Đã tạo tài khoản ${createEmail.trim()} (cần xác nhận email nếu Supabase bật Confirm Email).`
        : `Đã tạo tài khoản ${createEmail.trim()} thành công!`
    )
  }

  const openEditModal = (user: AdminUserOverview) => {
    setEditingUser(user)
    setEditDisplayName(user.displayName)
    setEditAvatarUrl(user.avatarUrl || '')
    setEditRole(user.role)
    setEditStreak(user.streak)
    setEditTargetMinutes(user.targetMinutes)
    setEditTargetLessons(user.targetLessons)
    setEditError(null)
    setEditActionMsg(null)
    setConfirmResetProgress(false)
  }

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingUser) return
    if (!editDisplayName.trim()) {
      setEditError('Tên hiển thị không được để trống.')
      return
    }

    const safeRole: UserRole =
      editingUser.id === currentUserId ? editingUser.role : editRole

    setIsSavingEdit(true)
    setEditError(null)
    const res = await adminUpdateUser(editingUser.id, {
      displayName: editDisplayName,
      avatarUrl: editAvatarUrl,
      role: safeRole,
      streak: editStreak,
      targetMinutes: editTargetMinutes,
      targetLessons: editTargetLessons,
    })
    setIsSavingEdit(false)

    if (!res.success) {
      setEditError(res.error || 'Không thể lưu thông tin người dùng.')
      return
    }

    setEditingUser(null)
    await fetchUsers()
    showToast(`Đã cập nhật tài khoản ${editingUser.email || editDisplayName}.`)
  }

  const handleSendPasswordReset = async () => {
    if (!editingUser?.email) return
    setIsSendingReset(true)
    setEditError(null)
    setEditActionMsg(null)
    const res = await adminSendPasswordReset(editingUser.email)
    setIsSendingReset(false)

    if (!res.success) {
      setEditError(res.error || 'Không thể gửi email đặt lại mật khẩu.')
      return
    }
    setEditActionMsg(`Đã gửi email đặt lại mật khẩu tới ${editingUser.email}.`)
  }

  const handleResetProgress = async () => {
    if (!editingUser) return
    setIsResettingProgress(true)
    setEditError(null)
    setEditActionMsg(null)
    const res = await adminResetUserProgress(editingUser.id)
    setIsResettingProgress(false)
    setConfirmResetProgress(false)

    if (!res.success) {
      setEditError(res.error || 'Không thể reset tiến độ học.')
      return
    }

    setEditStreak(0)
    await fetchUsers()
    setEditActionMsg('Đã reset Streak & lịch sử học tập về 0.')
  }

  const handleToggleRole = async (user: AdminUserOverview) => {
    if (user.id === currentUserId) return
    const nextRole: UserRole = user.role === 'admin' ? 'user' : 'admin'
    setUpdatingRoleId(user.id)
    setErrorMsg(null)
    const res = await adminUpdateUserRole(user.id, nextRole)
    setUpdatingRoleId(null)

    if (!res.success) {
      setErrorMsg(res.error || 'Không thể cập nhật quyền tài khoản.')
      return
    }

    setUsers((prev) =>
      prev.map((u) => (u.id === user.id ? { ...u, role: nextRole } : u))
    )
    if (selectedUser?.id === user.id) {
      setSelectedUser({ ...selectedUser, role: nextRole })
    }
    showToast(
      nextRole === 'admin'
        ? `Đã cấp quyền Admin cho ${user.email || user.displayName}`
        : `Đã chuyển ${user.email || user.displayName} về User`
    )
  }

  const handleDeleteUser = async (user: AdminUserOverview) => {
    if (user.id === currentUserId) return
    setDeletingUserId(user.id)
    setErrorMsg(null)
    const res = await adminDeleteUser(user.id)
    setDeletingUserId(null)
    setConfirmDeleteUserId(null)

    if (!res.success) {
      setErrorMsg(res.error || 'Không thể xóa tài khoản.')
      return
    }

    if (selectedUser?.id === user.id) setSelectedUser(null)
    if (editingUser?.id === user.id) setEditingUser(null)
    await fetchUsers()
    showToast(`Đã xóa hoàn toàn tài khoản ${user.email || user.displayName}.`)
  }

  const openUserDetail = async (user: AdminUserOverview) => {
    setSelectedUser(user)
    setConfirmDeleteRecId(null)
    setIsLoadingDetail(true)
    setUserRecordings([])
    const res = await adminFetchUserRecordings(user.id)
    setUserRecordings(res.data)
    setIsLoadingDetail(false)
  }

  const handleDeleteRecording = async (rec: AdminUserRecording) => {
    const res = await adminDeleteUserRecording(rec.id, rec.userId)
    setConfirmDeleteRecId(null)
    if (!res.success) {
      setErrorMsg(res.error || 'Không thể xóa bản ghi thu âm.')
      return
    }
    setUserRecordings((prev) => prev.filter((item) => item.id !== rec.id))
    const nextTotalRecs = Math.max(0, totalRecordings - 1)
    setTotalRecordings(nextTotalRecs)
    setUsers((prev) => {
      const next = prev.map((u) =>
        u.id === rec.userId
          ? { ...u, recordingsCount: Math.max(0, u.recordingsCount - 1) }
          : u
      )
      onStatsUpdated?.({
        usersCount: next.length,
        totalRecordings: nextTotalRecs,
        totalMinutes,
      })
      return next
    })
    if (selectedUser?.id === rec.userId) {
      setSelectedUser((prev) =>
        prev ? { ...prev, recordingsCount: Math.max(0, prev.recordingsCount - 1) } : null
      )
    }
    showToast(`Đã xóa bản ghi "${rec.lessonTitle}".`)
  }

  const filteredUsers = useMemo(() => {
    const q = searchQuery.trim().toLowerCase()
    return users.filter((u) => {
      if (roleFilter !== 'all' && u.role !== roleFilter) return false
      if (q) {
        const hay = `${u.displayName} ${u.email} ${u.id}`.toLowerCase()
        if (!hay.includes(q)) return false
      }
      return true
    })
  }, [users, searchQuery, roleFilter])

  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / PAGE_SIZE))
  const safePage = Math.min(currentPage, totalPages)
  const paginatedUsers = useMemo(() => {
    const start = (safePage - 1) * PAGE_SIZE
    return filteredUsers.slice(start, start + PAGE_SIZE)
  }, [filteredUsers, safePage])

  const pageStartDisplay = filteredUsers.length === 0 ? 0 : (safePage - 1) * PAGE_SIZE + 1
  const pageEndDisplay = Math.min(safePage * PAGE_SIZE, filteredUsers.length)

  const adminCount = useMemo(
    () => users.filter((u) => u.role === 'admin').length,
    [users]
  )

  return (
    <div className="space-y-4">
      {toastMsg && (
        <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{toastMsg}</span>
        </div>
      )}

      {errorMsg && (
        <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* KPI Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Tổng người dùng</span>
            <Users className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-extrabold text-white mt-1">{users.length}</div>
          {guestScheduleCount > 0 && (
            <p className="text-[11px] text-slate-400 mt-0.5">
              +{guestScheduleCount} phiên thiết bị khách
            </p>
          )}
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Tài khoản Admin</span>
            <ShieldCheck className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-2xl font-extrabold text-white mt-1">{adminCount}</div>
          <p className="text-[11px] text-slate-400 mt-0.5">Toàn quyền CMS</p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Tổng phút học</span>
            <Clock className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-extrabold text-white mt-1">{totalMinutes}p</div>
          <p className="text-[11px] text-slate-400 mt-0.5">Đồng bộ từ học viên</p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Tổng bản thu âm</span>
            <Mic className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-2xl font-extrabold text-white mt-1">{totalRecordings}</div>
          <p className="text-[11px] text-slate-400 mt-0.5">Shadowing &amp; Video</p>
        </div>
      </div>

      {/* Filters & Create Bar */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2.5 flex-1">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm theo email, tên hiển thị, ID..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-8 pr-3 py-2 text-xs text-slate-100"
            />
          </div>

          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value as 'all' | UserRole)}
            className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 cursor-pointer"
          >
            <option value="all">Tất cả vai trò</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={openCreateModal}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold shadow-md cursor-pointer"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>+ Thêm người dùng</span>
          </button>

          <button
            type="button"
            onClick={fetchUsers}
            disabled={isLoading}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 cursor-pointer"
            title="Làm mới"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Users Table */}
      {isLoading ? (
        <div className="p-10 rounded-2xl bg-slate-900 border border-slate-800 text-center text-xs text-slate-400">
          Đang tải danh sách người dùng và tiến độ...
        </div>
      ) : paginatedUsers.length === 0 ? (
        <div className="p-10 rounded-2xl bg-slate-900 border border-slate-800 text-center text-xs text-slate-400">
          Chưa tìm thấy người dùng nào khớp bộ lọc.
        </div>
      ) : (
        <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-[11px] uppercase tracking-wider text-slate-400">
                <th className="px-4 py-3">Tài khoản</th>
                <th className="px-4 py-3">Vai trò</th>
                <th className="px-4 py-3">Streak</th>
                <th className="px-4 py-3">Phút học</th>
                <th className="px-4 py-3">Bài xong</th>
                <th className="px-4 py-3">Bản ghi</th>
                <th className="px-4 py-3">Điểm TB</th>
                <th className="px-4 py-3">Hoạt động cuối</th>
                <th className="px-4 py-3 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 text-xs">
              {paginatedUsers.map((u) => {
                const isSelf = u.id === currentUserId
                const initial = (u.displayName || u.email || 'U').charAt(0).toUpperCase()
                return (
                  <tr key={u.id} className="hover:bg-slate-950/60 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        {u.avatarUrl ? (
                          <img
                            src={u.avatarUrl}
                            alt={u.displayName}
                            className="w-8 h-8 rounded-full object-cover border border-slate-700 shrink-0"
                          />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-bold text-emerald-400 shrink-0">
                            {initial}
                          </div>
                        )}
                        <div className="min-w-0">
                          <div className="font-bold text-white flex items-center gap-1.5">
                            <span className="truncate max-w-[160px]">{u.displayName}</span>
                            {isSelf && (
                              <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                                Bạn
                              </span>
                            )}
                          </div>
                          <div className="text-[11px] text-slate-400 truncate max-w-[200px]">
                            {u.email || u.id}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold border ${
                          u.role === 'admin'
                            ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30'
                            : 'bg-slate-800 text-slate-300 border-slate-700'
                        }`}
                      >
                        <Shield className="w-3 h-3" />
                        <span>{u.role === 'admin' ? 'Admin' : 'User'}</span>
                      </span>
                    </td>

                    <td className="px-4 py-3 font-semibold text-amber-400">
                      <span className="inline-flex items-center gap-1">
                        <Flame className="w-3.5 h-3.5" />
                        {u.streak}
                      </span>
                    </td>

                    <td className="px-4 py-3 text-slate-200 font-semibold">{u.totalMinutes}p</td>
                    <td className="px-4 py-3 text-slate-200">{u.totalLessonsCompleted}</td>
                    <td className="px-4 py-3 text-slate-200">{u.recordingsCount}</td>
                    <td className="px-4 py-3">
                      {u.avgScore !== null ? (
                        <span className="inline-flex items-center gap-1 text-emerald-400 font-bold">
                          <Award className="w-3.5 h-3.5" />
                          {u.avgScore}đ
                        </span>
                      ) : (
                        <span className="text-slate-500">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-slate-400 font-mono text-[11px]">
                      {u.lastActiveDate || '—'}
                    </td>

                    <td className="px-4 py-3 text-right">
                      <div className="inline-flex items-center gap-1.5 justify-end">
                        <button
                          type="button"
                          onClick={() => openUserDetail(u)}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-semibold border border-slate-700 cursor-pointer"
                          title="Xem chi tiết"
                        >
                          <Eye className="w-3 h-3" />
                          <span>Chi tiết</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => openEditModal(u)}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-semibold border border-slate-700 cursor-pointer"
                          title="Sửa hồ sơ & mục tiêu"
                        >
                          <Edit3 className="w-3 h-3" />
                          <span>Sửa</span>
                        </button>

                        <button
                          type="button"
                          disabled={isSelf || updatingRoleId === u.id}
                          onClick={() => handleToggleRole(u)}
                          title={
                            isSelf
                              ? 'Không thể tự hạ quyền tài khoản Admin đang đăng nhập'
                              : u.role === 'admin'
                              ? 'Hạ về User thường'
                              : 'Cấp quyền Admin CMS'
                          }
                          className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${
                            u.role === 'admin'
                              ? 'bg-amber-500/15 text-amber-300 border-amber-500/30 hover:bg-amber-500/25'
                              : 'bg-indigo-600 text-white border-indigo-500 hover:bg-indigo-500'
                          }`}
                        >
                          {updatingRoleId === u.id
                            ? 'Đang lưu...'
                            : u.role === 'admin'
                            ? 'Hạ về User'
                            : 'Cấp Admin'}
                        </button>

                        {confirmDeleteUserId === u.id ? (
                          <div className="inline-flex items-center gap-1">
                            <button
                              type="button"
                              disabled={deletingUserId === u.id}
                              onClick={() => handleDeleteUser(u)}
                              className="px-2 py-1 rounded-lg bg-rose-500 text-white text-[11px] font-bold cursor-pointer disabled:opacity-50"
                            >
                              {deletingUserId === u.id ? 'Đang xóa...' : 'Xác nhận xóa'}
                            </button>
                            <button
                              type="button"
                              onClick={() => setConfirmDeleteUserId(null)}
                              className="px-2 py-1 rounded-lg bg-slate-800 text-slate-300 text-[11px] cursor-pointer"
                            >
                              Hủy
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            disabled={isSelf}
                            onClick={() => setConfirmDeleteUserId(u.id)}
                            title={
                              isSelf
                                ? 'Không thể tự xóa tài khoản Admin đang đăng nhập'
                                : 'Xóa hoàn toàn tài khoản & dữ liệu'
                            }
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-rose-400 border border-slate-700 cursor-pointer disabled:opacity-35 disabled:cursor-not-allowed"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination Bar */}
      {filteredUsers.length > 0 && (
        <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400">
          <span>
            Hiển thị <strong className="text-slate-200">{pageStartDisplay}</strong>–
            <strong className="text-slate-200">{pageEndDisplay}</strong> / tổng{' '}
            <strong className="text-white">{filteredUsers.length}</strong> tài khoản
          </span>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={safePage <= 1}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 disabled:opacity-40 cursor-pointer"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Trước</span>
            </button>
            <span className="px-2 font-semibold text-slate-300">
              Trang {safePage} / {totalPages}
            </span>
            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={safePage >= totalPages}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 disabled:opacity-40 cursor-pointer"
            >
              <span>Sau</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Create User Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <UserPlus className="w-4 h-4 text-emerald-400" />
                <h3 className="text-sm font-bold text-white">Thêm người dùng mới</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowCreateModal(false)}
                className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="p-5 space-y-3.5">
              {createError && (
                <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs">
                  {createError}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={createEmail}
                    onChange={(e) => setCreateEmail(e.target.value)}
                    placeholder="user@example.com"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Mật khẩu * (tối thiểu 6 ký tự)
                  </label>
                  <input
                    type="password"
                    required
                    minLength={6}
                    value={createPassword}
                    onChange={(e) => setCreatePassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Tên hiển thị
                  </label>
                  <input
                    type="text"
                    value={createDisplayName}
                    onChange={(e) => setCreateDisplayName(e.target.value)}
                    placeholder="VD: Nguyễn Văn A"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Vai trò
                  </label>
                  <select
                    value={createRole}
                    onChange={(e) => setCreateRole(e.target.value as UserRole)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-100 cursor-pointer"
                  >
                    <option value="user">User (Học viên)</option>
                    <option value="admin">Admin (Quản trị CMS)</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Phút/ngày
                    </label>
                    <input
                      type="number"
                      min={1}
                      value={createTargetMinutes}
                      onChange={(e) => setCreateTargetMinutes(Number(e.target.value) || 15)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-100"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Bài/ngày
                    </label>
                    <input
                      type="number"
                      min={1}
                      value={createTargetLessons}
                      onChange={(e) => setCreateTargetLessons(Number(e.target.value) || 3)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-100"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold cursor-pointer"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={isCreating}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold disabled:opacity-50 cursor-pointer"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>{isCreating ? 'Đang tạo...' : 'Tạo tài khoản'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {editingUser && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <Edit3 className="w-4 h-4 text-emerald-400" />
                <div>
                  <h3 className="text-sm font-bold text-white">Chỉnh sửa người dùng</h3>
                  <p className="text-[11px] text-slate-400 truncate max-w-[300px]">
                    {editingUser.email || editingUser.id}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setEditingUser(null)}
                className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="p-5 overflow-y-auto space-y-4">
              {editError && (
                <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs">
                  {editError}
                </div>
              )}

              {editActionMsg && (
                <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs">
                  {editActionMsg}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                    User ID (không thể sửa)
                  </label>
                  <input
                    type="text"
                    readOnly
                    value={editingUser.id}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-[11px] font-mono text-slate-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Tên hiển thị *
                  </label>
                  <input
                    type="text"
                    required
                    value={editDisplayName}
                    onChange={(e) => setEditDisplayName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-100"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Vai trò
                  </label>
                  <select
                    value={editRole}
                    disabled={editingUser.id === currentUserId}
                    onChange={(e) => setEditRole(e.target.value as UserRole)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-100 disabled:opacity-50 cursor-pointer"
                  >
                    <option value="user">User (Học viên)</option>
                    <option value="admin">Admin (Quản trị CMS)</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Avatar URL (tùy chọn)
                  </label>
                  <div className="flex items-center gap-2.5">
                    {editAvatarUrl.trim() && (
                      <img
                        src={editAvatarUrl.trim()}
                        alt="Avatar preview"
                        className="w-9 h-9 rounded-full object-cover border border-slate-700 shrink-0"
                      />
                    )}
                    <input
                      type="url"
                      value={editAvatarUrl}
                      onChange={(e) => setEditAvatarUrl(e.target.value)}
                      placeholder="https://..."
                      className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-100"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Streak (ngày)
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={editStreak}
                    onChange={(e) => setEditStreak(Math.max(0, Number(e.target.value) || 0))}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-100"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Phút/ngày
                    </label>
                    <input
                      type="number"
                      min={1}
                      value={editTargetMinutes}
                      onChange={(e) =>
                        setEditTargetMinutes(Math.max(1, Number(e.target.value) || 15))
                      }
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-100"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Bài/ngày
                    </label>
                    <input
                      type="number"
                      min={1}
                      value={editTargetLessons}
                      onChange={(e) =>
                        setEditTargetLessons(Math.max(1, Number(e.target.value) || 3))
                      }
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-100"
                    />
                  </div>
                </div>
              </div>

              {/* Admin Quick Account Actions */}
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2.5">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Tác vụ quản trị nhanh
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  {editingUser.email && (
                    <button
                      type="button"
                      disabled={isSendingReset}
                      onClick={handleSendPasswordReset}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-indigo-300 text-xs font-semibold border border-slate-700 cursor-pointer disabled:opacity-50"
                    >
                      <KeyRound className="w-3.5 h-3.5" />
                      <span>
                        {isSendingReset ? 'Đang gửi...' : 'Gửi email đặt lại mật khẩu'}
                      </span>
                    </button>
                  )}

                  {confirmResetProgress ? (
                    <div className="inline-flex items-center gap-1.5">
                      <button
                        type="button"
                        disabled={isResettingProgress}
                        onClick={handleResetProgress}
                        className="px-2.5 py-1.5 rounded-lg bg-rose-500 text-white text-xs font-bold cursor-pointer disabled:opacity-50"
                      >
                        {isResettingProgress ? 'Đang reset...' : 'Xác nhận reset tiến độ'}
                      </button>
                      <button
                        type="button"
                        onClick={() => setConfirmResetProgress(false)}
                        className="px-2.5 py-1.5 rounded-lg bg-slate-800 text-slate-300 text-xs cursor-pointer"
                      >
                        Hủy
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setConfirmResetProgress(true)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs font-semibold border border-slate-700 cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Reset tiến độ học</span>
                    </button>
                  )}
                </div>
              </div>

              <div className="pt-1 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingUser(null)}
                  className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold cursor-pointer"
                >
                  Đóng
                </button>
                <button
                  type="submit"
                  disabled={isSavingEdit}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold disabled:opacity-50 cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>{isSavingEdit ? 'Đang lưu...' : 'Lưu thay đổi'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* User Detail Modal */}
      {selectedUser && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-3xl max-h-[88vh] bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <span>{selectedUser.displayName}</span>
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                    {selectedUser.role.toUpperCase()}
                  </span>
                </h3>
                <p className="text-xs text-slate-400">
                  {selectedUser.email} • ID: <span className="font-mono">{selectedUser.id}</span>
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedUser(null)}
                className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 overflow-y-auto space-y-5 flex-1">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="text-[11px] text-slate-400">Streak hiện tại</div>
                  <div className="text-lg font-bold text-amber-400">{selectedUser.streak} ngày</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="text-[11px] text-slate-400">Mục tiêu/ngày</div>
                  <div className="text-lg font-bold text-white">
                    {selectedUser.targetMinutes}p / {selectedUser.targetLessons} bài
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="text-[11px] text-slate-400">Tổng hoàn thành</div>
                  <div className="text-lg font-bold text-emerald-400">
                    {selectedUser.totalLessonsCompleted} bài
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="text-[11px] text-slate-400">Điểm trung bình</div>
                  <div className="text-lg font-bold text-indigo-400">
                    {selectedUser.avgScore !== null ? `${selectedUser.avgScore}đ` : '—'}
                  </div>
                </div>
              </div>

              {/* 14-day History */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Lịch sử học gần đây (tối đa 14 ngày)
                </h4>
                {selectedUser.recentHistory.length === 0 ? (
                  <p className="text-xs text-slate-500">Chưa có dữ liệu lịch sử đồng bộ.</p>
                ) : (
                  <div className="rounded-xl bg-slate-950 border border-slate-800 overflow-hidden">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-slate-800 text-[11px] text-slate-400">
                          <th className="px-3 py-2">Ngày</th>
                          <th className="px-3 py-2">Phút học</th>
                          <th className="px-3 py-2">Số bài</th>
                          <th className="px-3 py-2">Điểm TB</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/70">
                        {selectedUser.recentHistory.map((h) => (
                          <tr key={h.date}>
                            <td className="px-3 py-2 font-mono text-slate-300">{h.date}</td>
                            <td className="px-3 py-2 text-slate-200">{h.minutes}p</td>
                            <td className="px-3 py-2 text-slate-200">{h.lessonsCompleted}</td>
                            <td className="px-3 py-2 text-emerald-400">
                              {h.avgScore !== null ? `${h.avgScore}đ` : '—'}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* User Recordings */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Bản thu âm gần nhất ({userRecordings.length})
                </h4>
                {isLoadingDetail ? (
                  <p className="text-xs text-slate-400">Đang tải danh sách bản thu...</p>
                ) : userRecordings.length === 0 ? (
                  <p className="text-xs text-slate-500">
                    Người dùng chưa đồng bộ bản thu nào lên Cloud.
                  </p>
                ) : (
                  <div className="space-y-2">
                    {userRecordings.map((rec) => (
                      <div
                        key={rec.id}
                        className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5"
                      >
                        <div className="flex items-center justify-between gap-2 text-xs">
                          <span className="font-bold text-white truncate">
                            {rec.lessonTitle} ({rec.language.toUpperCase()})
                          </span>
                          <div className="flex items-center gap-2 shrink-0 text-[11px] text-slate-400">
                            <span>{rec.durationSec}s</span>
                            {rec.score !== null && rec.score !== undefined && (
                              <span className="text-emerald-400 font-bold">{rec.score}đ</span>
                            )}
                            {confirmDeleteRecId === rec.id ? (
                              <div className="inline-flex items-center gap-1 ml-1">
                                <button
                                  type="button"
                                  onClick={() => handleDeleteRecording(rec)}
                                  className="px-2 py-0.5 rounded bg-rose-500 text-white text-[10px] font-bold cursor-pointer"
                                >
                                  Xác nhận xóa
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setConfirmDeleteRecId(null)}
                                  className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px] cursor-pointer"
                                >
                                  Hủy
                                </button>
                              </div>
                            ) : (
                              <button
                                type="button"
                                onClick={() => setConfirmDeleteRecId(rec.id)}
                                className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-rose-400 border border-slate-700 cursor-pointer"
                                title="Xóa bản thu này"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            )}
                          </div>
                        </div>
                        {rec.fileUrl && rec.fileUrl.startsWith('http') && (
                          rec.type === 'video' ? (
                            <a
                              href={rec.fileUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-block text-[11px] text-indigo-400 underline"
                            >
                              Mở video Cloud
                            </a>
                          ) : (
                            <audio src={rec.fileUrl} controls className="w-full h-8" />
                          )
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
