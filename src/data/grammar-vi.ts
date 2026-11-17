import { GrammarPattern, KaiwaGroup } from '../types'

export const vietnameseGrammar: GrammarPattern[] = [
  {
    id: 'vi-g-b1', language: 'vi', level: 'Cơ bản',
    pattern: 'Nếu... thì... (Giả định)',
    meaning: 'Diễn tả điều kiện và hệ quả tự nhiên hoặc giả định.',
    formula: 'Nếu + [điều kiện], thì + [kết quả]',
    note: 'Nhấn giọng ở vế kết quả để tạo sức thuyết phục.',
    examples: [
      { text: 'Nếu trời mưa, thì chúng ta ở nhà.', translation: 'If it rains, we will stay home.' },
      { text: 'Nếu bạn cố gắng, thì bạn sẽ thành công.', translation: 'If you try hard, you will succeed.' },
      { text: 'Nếu kiên trì luyện nói mỗi ngày, thì bạn sẽ tiến bộ vượt bậc.', translation: 'If you practice speaking every day, you will improve greatly.' },
    ],
  },
  {
    id: 'vi-g-b2', language: 'vi', level: 'Cơ bản',
    pattern: 'Vì... nên... (Nguyên nhân - kết quả)',
    meaning: 'Nêu nguyên nhân ở vế đầu và kết quả ở vế sau.',
    formula: 'Vì + [nguyên nhân] nên + [kết quả]',
    note: 'Không dùng đồng thời "vì" và "bởi vì" trong cùng một vế.',
    examples: [
      { text: 'Vì trời lạnh nên tôi mặc áo ấm.', translation: 'Because it is cold, I wear a warm coat.' },
      { text: 'Vì đường tắc nên tôi đến muộn.', translation: 'Because of the traffic jam, I arrived late.' },
      { text: 'Vì chăm chỉ luyện tập nên cô ấy nói rất trôi chảy.', translation: 'Because she practices diligently, she speaks very fluently.' },
    ],
  },
  {
    id: 'vi-g-b3', language: 'vi', level: 'Cơ bản',
    pattern: 'Đã... rồi (Hành động đã hoàn thành)',
    meaning: 'Diễn tả hành động đã xảy ra và hoàn tất.',
    formula: 'Chủ ngữ + đã + động từ (+ rồi)',
    note: '"rồi" đứng cuối câu làm câu nói tự nhiên hơn.',
    examples: [
      { text: 'Tôi đã ăn cơm rồi.', translation: 'I have already eaten.' },
      { text: 'Anh ấy đã về nhà rồi.', translation: 'He has already gone home.' },
      { text: 'Chúng tôi đã hoàn thành bài tập rồi.', translation: 'We have finished the homework.' },
    ],
  },
  {
    id: 'vi-g-a1', language: 'vi', level: 'Nâng cao',
    pattern: 'Không những... mà còn... (Tăng tiến)',
    meaning: 'Diễn đạt tính chất bổ sung, tăng tiến của sự việc.',
    formula: 'Không những [ý 1] mà còn [ý 2]',
    note: 'Ngắt nhẹ sau vế thứ nhất, nhấn mạnh vế thứ hai.',
    examples: [
      { text: 'Cô ấy không những xinh đẹp mà còn rất thông minh.', translation: 'She is not only beautiful but also very smart.' },
      { text: 'Học ngoại ngữ không những mở rộng tư duy mà còn mang lại nhiều cơ hội việc làm.', translation: 'Learning languages not only broadens the mind but also brings career opportunities.' },
      { text: 'Dự án này không những tiết kiệm chi phí mà còn nâng cao hiệu quả.', translation: 'This project not only saves cost but also improves efficiency.' },
    ],
  },
  {
    id: 'vi-g-a2', language: 'vi', level: 'Nâng cao',
    pattern: 'Mặc dù... nhưng... (Nhượng bộ)',
    meaning: 'Chỉ sự đối lập giữa hai vế, vế sau là ý chính.',
    formula: 'Mặc dù + [vế 1], nhưng + [vế 2]',
    note: 'Có thể lược bỏ "nhưng" trong văn viết.',
    examples: [
      { text: 'Mặc dù trời mưa, nhưng chúng tôi vẫn đi.', translation: 'Although it rained, we still went.' },
      { text: 'Mặc dù công việc bận rộn, nhưng anh ấy vẫn dành thời gian cho gia đình.', translation: 'Although work is busy, he still makes time for his family.' },
      { text: 'Mặc dù gặp nhiều khó khăn, nhưng họ không bao giờ bỏ cuộc.', translation: 'Despite many difficulties, they never give up.' },
    ],
  },
  {
    id: 'vi-g-a3', language: 'vi', level: 'Nâng cao',
    pattern: 'Càng... càng... (So sánh tăng dần)',
    meaning: 'Hai mức độ cùng tăng dần theo nhau.',
    formula: 'Càng + [A] càng + [B]',
    note: '',
    examples: [
      { text: 'Càng học càng thấy thú vị.', translation: 'The more I study, the more interesting it gets.' },
      { text: 'Càng nói nhiều, bạn càng tự tin hơn.', translation: 'The more you speak, the more confident you become.' },
      { text: 'Càng về khuya, thành phố càng yên tĩnh.', translation: 'The later at night, the quieter the city.' },
    ],
  },
]

export const vietnameseKaiwa: KaiwaGroup[] = [
  {
    id: 'vi-k-b1', language: 'vi', level: 'Cơ bản', situation: 'Chào hỏi & làm quen',
    phrases: [
      { text: 'Xin chào, rất vui được gặp bạn.', translation: 'Hello, nice to meet you.' },
      { text: 'Bạn khỏe không? Dạo này thế nào?', translation: 'How are you? How have you been?' },
      { text: 'Tôi tên là Hoàng, tôi đến từ Việt Nam.', translation: 'My name is Hoang, I come from Vietnam.' },
    ],
  },
  {
    id: 'vi-k-b2', language: 'vi', level: 'Cơ bản', situation: 'Mua sắm',
    phrases: [
      { text: 'Cái này giá bao nhiêu vậy ạ?', translation: 'How much is this?' },
      { text: 'Bớt cho tôi một chút được không?', translation: 'Can you give me a small discount?' },
      { text: 'Tôi lấy cái này, cảm ơn chị.', translation: 'I will take this one, thank you.' },
    ],
  },
  {
    id: 'vi-k-a1', language: 'vi', level: 'Nâng cao', situation: 'Thuyết trình & họp',
    phrases: [
      { text: 'Chào mừng quý vị đã đến với buổi chia sẻ ngày hôm nay.', translation: 'Welcome to today\'s sharing session.' },
      { text: 'Tôi xin phép trình bày ba điểm chính trong báo cáo này.', translation: 'Let me present three main points in this report.' },
      { text: 'Cảm ơn mọi người đã lắng nghe, xin mời đặt câu hỏi.', translation: 'Thank you for listening, please feel free to ask questions.' },
    ],
  },
]
