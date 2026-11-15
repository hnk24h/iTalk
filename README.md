# iTalk — Ứng Dụng Luyện Nghe Nói & Shadowing Ngoại Ngữ (Web & Electron Desktop)

**iTalk** là ứng dụng chuyên sâu dành cho cá nhân tự luyện tập phản xạ giao tiếp, ngữ pháp và phát âm qua phương pháp **Shadowing (nhại giọng người bản xứ)**, hỗ trợ 3 ngôn ngữ: **Tiếng Nhật (🇯🇵)**, **Tiếng Trung (🇨🇳)** và **Tiếng Việt (🇻🇳)**.

Ứng dụng hoạt động song song trên cả hai nền tảng:
- **Web App (Vite + React + Tailwind)**: Truy cập nhanh qua trình duyệt.
- **Electron Desktop App**: Hỗ trợ nạp file audio gốc từ ổ cứng, ghi trực tiếp video webcam và âm thanh vào thư mục local trên ổ cứng (`~/iTalk-Recordings`) mà không bị rào cản sandbox của trình duyệt.

---

## 🎯 1. Phân Tích Tính Khả Thi

| Yêu cầu | Giải pháp kỹ thuật | Đánh giá khả thi |
| :--- | :--- | :--- |
| **Nạp Nguồn Data & File Nghe Gốc** | Hỗ trợ nạp file audio gốc (.mp3, .wav, .m4a, .ogg) từ máy tính qua native dialog (Electron) hoặc kéo-thả (Web). Hỗ trợ bóc tách phụ đề tự động từ file **.LRC**, **.SRT**, hoặc văn bản thuần có mốc thời gian start-end từng câu. | ⭐⭐⭐⭐⭐ **100% Khả thi** |
| **Luyện Shadowing với File Gốc** | Phát đúng phân đoạn từng câu trong file audio gốc (A-B loop) hoặc linh hoạt chuyển đổi giữa **"File nghe gốc"** và **"Giọng đọc AI (TTS)"**. Tùy chỉnh tốc độ phát (0.75x, 1.0x, 1.25x). | ⭐⭐⭐⭐⭐ **100% Khả thi** |
| **Ghi âm & Ghi hình Video Webcam** | Sử dụng `MediaRecorder API` + `getUserMedia`. Tích hợp camera preview dạng gương để quan sát khẩu hình miệng khi phát âm, kèm cột sóng âm (Audio visualizer). | ⭐⭐⭐⭐⭐ **100% Khả thi** |
| **Lưu Video vào Thư mục Local** | **Electron Native IPC**: Cầu nối `preload.cjs` và `fs.promises` cho phép lưu file `.webm` / `.mp4` trực tiếp vào bất kỳ thư mục nào bạn chỉ định, có nút 1-click **"Mở thư mục trên máy"** (`shell.openPath`). | ⭐⭐⭐⭐⭐ **100% Khả thi** |
| **Chấm điểm phát âm** | Tích hợp `SpeechRecognition` nhận diện giọng nói thực tế, sau đó dùng thuật toán so khớp chuỗi (Levenshtein Distance + LCS Tokenizer) tính điểm 0-100% và highlight màu: 🟢 Đúng, 🟡 Gần đúng, 🔴 Sai/Thiếu từ. | ⭐⭐⭐⭐⭐ **100% Khả thi** |
| **Theo dõi theo Schedule / Lịch học** | Lưu trữ tiến độ học tập hàng ngày, tính chuỗi liên tục (Streak 🔥), đặt mục tiêu 15 phút/ngày và bản đồ thói quen 28 ngày (Heatmap matrix). | ⭐⭐⭐⭐⭐ **100% Khả thi** |

---

## 🚀 2. Hướng Dẫn Cài Đặt & Khởi Chạy

### Yêu cầu môi trường
- **Node.js**: Phiên bản 18+ (hoặc `bun`)
- **Microphone & Webcam** (để quay video và thu âm)

### Cài đặt thư viện
Tại thư mục `/home/hoank/workspace/iTalk`:
```bash
npm install
# hoặc nếu dùng bun:
bun install
```

### Chạy ứng dụng

#### Cách 1: Chạy Web App trong trình duyệt
```bash
npm run dev
# hoặc: bun dev
```
Mở trình duyệt tại: `http://localhost:5173`

#### Cách 2: Chạy ứng dụng Desktop Electron (Khuyên dùng)
```bash
npm run electron:dev
```
Cửa sổ Electron Desktop sẽ tự động mở lên với đầy đủ quyền truy cập file audio gốc và lưu video trực tiếp vào ổ cứng máy tính.

---

## 💡 3. Các Tính Năng Nổi Bật

### 🎧 1. Nạp Nguồn Data & File Nghe Gốc (Audio Importer)
- Bấm nút **"Nạp File Nghe Gốc"** tại thanh công cụ Shadowing:
  - **File Audio**: Chọn file MP3, WAV, M4A, OGG từ máy tính.
  - **File Lời / Phụ Đề**: Chọn file `.lrc` (Lyric có mốc thời gian), `.srt` (phụ đề phim/video), hoặc dán văn bản.
  - **Tự động đồng bộ**: Hệ thống tự động chia câu và gán thời gian bắt đầu (`startTime`) - kết thúc (`endTime`) cho từng câu để khi luyện đọc, app phát đúng đoạn âm thanh gốc của người bản xứ!

### 🎙️ 2. Shadowing Studio (Phòng Thu Luyện Nói)
- **Kho bài học sẵn có**:
  - **Tiếng Nhật (🇯🇵)**: N5, N4, N3 kèm Furigana / Romaji và mẹo ngữ pháp trợ từ, khiêm nhường ngữ.
  - **Tiếng Trung (🇨🇳)**: HSK 1, 2, 3, 4 kèm Bính âm (Pinyin) có dấu thanh điệu (ā, á, ǎ, à).
  - **Tiếng Việt (🇻🇳)**: Bài tập chuẩn thanh điệu (phân biệt hỏi, ngã, nặng), ngữ điệu thuyết trình.
- **Chuyển đổi nguồn phát**: Cho phép chọn giữa **"File gốc"** (nghe người bản xứ thực tế) và **"Giọng AI (TTS)"**.
- **Chia câu thông minh**: Nghe từng câu -> bấm **Bắt đầu Shadowing** -> webcam ghi hình -> bấm **Dừng & Chấm điểm**.

### 💬 3. Luyện Nói Phản Xạ Ngữ Pháp (Grammar Speaking)
- Tổng hợp các cấu trúc ngữ pháp then chốt theo tình huống thực tế.
- Đặt câu hỏi phản xạ: Người học bấm micro nói câu trả lời, hệ thống nhận diện và chấm điểm ngữ pháp.

### 📁 4. Thư Mục Bản Ghi & Xem Lại Lịch Sử (Recordings History)
- Xem lại danh sách video đã quay.
- Phát lại video ngay trong app để tự đối chiếu khẩu hình với người bản xứ.
- Mở nhanh thư mục trên máy tính (`~/iTalk-Recordings` hoặc thư mục do bạn chọn).

### 📅 5. Quản Lý Lịch Học & Tiến Độ (Schedule & Habits)
- **Chuỗi Streak 🔥**: Đếm số ngày liên tục bạn duy trì thói quen luyện nói.
- **Mục tiêu ngày**: 15 phút luyện nói & 3 bài hoàn thành mỗi ngày.
- **Bản đồ nhiệt 28 ngày**: Theo dõi mức độ chăm chỉ trực quan như GitHub contribution graph.

---

## 🛠️ 4. Cấu Trúc Thư Mục Dự Án

```
iTalk/
├── electron/
│   ├── main.cjs            # Electron main process & IPC (chọn audio gốc, lưu video, mở folder)
│   └── preload.cjs         # Context bridge an toàn giữa Electron và Web App
├── src/
│   ├── components/
│   │   ├── Header.tsx                 # Thanh điều hướng, chọn ngôn ngữ, streak
│   │   ├── ShadowingStudio.tsx        # Phòng thu Shadowing (Webcam, TTS, Audio gốc)
│   │   ├── AudioImporterModal.tsx     # Modal nạp file nghe gốc & bóc tách phụ đề LRC/SRT
│   │   ├── PronunciationScoreModal.tsx# Modal phân tích điểm phát âm từng từ
│   │   ├── GrammarSpeaking.tsx        # Luyện nói phản xạ theo mẫu câu ngữ pháp
│   │   ├── RecordingsHistory.tsx      # Lịch sử video, xem lại và quản lý file
│   │   ├── ScheduleTracker.tsx        # Lịch học, mục tiêu ngày, streak
│   │   └── SettingsModal.tsx          # Cài đặt thư mục, mic/cam, ngôn ngữ
│   ├── data/
│   │   ├── languages.ts               # Danh mục ngôn ngữ hỗ trợ
│   │   ├── lessons-ja.ts              # Bài đọc tiếng Nhật
│   │   ├── lessons-zh.ts              # Bài đọc tiếng Trung
│   │   └── lessons-vi.ts              # Bài đọc tiếng Việt
│   ├── services/
│   │   ├── audioDb.ts                 # Lưu trữ Audio Blob dung lượng lớn vào IndexedDB
│   │   ├── transcriptParser.ts        # Bóc tách file phụ đề LRC, SRT, TXT có timestamp
│   │   ├── speech.ts                  # Web Speech API (TTS & Speech-to-Text)
│   │   ├── scoring.ts                 # Thuật toán chấm điểm phát âm Levenshtein
│   │   ├── mediaRecorder.ts           # Thu âm Mic và quay Video Webcam
│   │   └── storage.ts                 # Quản lý lưu trữ local và Electron IPC
│   ├── types/index.ts                 # Type definitions TypeScript
│   ├── App.tsx                        # Layout chính và chuyển tab
│   ├── index.css                      # Tailwind styles
│   └── main.tsx                       # Entry point React
├── package.json
├── vite.config.ts
├── tailwind.config.js
└── README.md
```
