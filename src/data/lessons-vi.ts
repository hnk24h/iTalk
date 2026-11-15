import { Lesson } from '../types'

export const vietnameseLessons: Lesson[] = [
  {
    id: 'vi-01',
    language: 'vi',
    title: 'Luyện chuẩn thanh điệu (Hỏi - Ngã - Nặng)',
    level: 'Cơ bản',
    category: 'Ngữ âm chuẩn',
    description: 'Bài tập kinh điển giúp sửa lỗi nuốt âm, phân biệt dứt khoát dấu hỏi và dấu ngã.',
    sentences: [
      {
        id: 'vi-01-s1',
        text: 'Nỗ lực mỗi ngày sẽ giúp bạn mở rộng tầm nhìn và gặt hái thành quả tốt đẹp.',
        phonetic: 'Nỗ lực (dấu ngã gằn nhẹ) - mỗi ngày - mở rộng (dấu hỏi ngân nhẹ)',
        translation: 'Daily effort will help you broaden your horizons and achieve good results.',
        grammarNote: 'Lưu ý: Dấu ngã (Nỗ, mỗi) cần có độ gằn nhẹ ở giữa, dấu hỏi (mở, quả) ngân giọng rồi ngắt.'
      },
      {
        id: 'vi-01-s2',
        text: 'Kỷ luật bản thân là chiếc cầu nối giữa mục tiêu và sự thành công vững chắc.',
        phonetic: 'Kỷ luật - bản thân - vững chắc (ngã)',
        translation: 'Self-discipline is the bridge between goals and solid success.',
        grammarNote: 'Phát âm tròn vành các nguyên âm đôi: "i-ê" trong "chiếc", "u-â" trong "luật".'
      },
      {
        id: 'vi-01-s3',
        text: 'Hãy giữ vững niềm tin và kiên định với con đường mình đã lựa chọn.',
        phonetic: 'Hãy (ngã) - giữ vững (ngã) - đã (ngã)',
        translation: 'Keep your faith and stay steadfast on the path you have chosen.',
        grammarNote: 'Câu chứa liên tiếp các âm dấu ngã ("Hãy", "giữ", "vững", "đã") - luyện độ dẻo của cơ vòm họng.'
      }
    ]
  },
  {
    id: 'vi-02',
    language: 'vi',
    title: 'Giao tiếp thuyết trình & Trình bày ý tưởng',
    level: 'Nâng cao',
    category: 'Thuyết trình chuyên nghiệp',
    description: 'Luyện nhịp thở, ngữ điệu ngắt nghỉ theo cụm từ và tạo sức thuyết phục.',
    sentences: [
      {
        id: 'vi-02-s1',
        text: 'Chào mừng quý vị và các bạn đã đến với buổi chia sẻ ngày hôm nay.',
        phonetic: 'Ngắt nghỉ: Chào mừng quý vị // và các bạn // đã đến với buổi chia sẻ ngày hôm nay.',
        translation: 'Welcome ladies and gentlemen to today\'s sharing session.',
        grammarNote: 'Giọng mở đầu cần ấm, rõ ràng, tốc độ vừa phải khoảng 120-140 từ/phút.'
      },
      {
        id: 'vi-02-s2',
        text: 'Điểm cốt lõi mà chúng ta cần tập trung cải thiện chính là trải nghiệm người dùng.',
        phonetic: 'Nhấn trọng âm vào: "cốt lõi", "tập trung", "trải nghiệm người dùng".',
        translation: 'The core point we need to focus on improving is user experience.',
        grammarNote: 'Trong tiếng Việt thương mại, nhấn mạnh từ khóa chính giúp người nghe nắm bắt thông điệp ngay lập tức.'
      },
      {
        id: 'vi-02-s3',
        text: 'Cảm ơn sự chú ý lắng nghe và đóng góp quý báu của tất cả mọi người.',
        phonetic: 'Hạ nhẹ giọng ở cuối câu để tạo cảm giác trang trọng, lịch sự.',
        translation: 'Thank you for everyone\'s attention and valuable contributions.',
        grammarNote: 'Cấu trúc cảm ơn chuẩn mực trong văn phong hội nghị.'
      }
    ]
  }
]
