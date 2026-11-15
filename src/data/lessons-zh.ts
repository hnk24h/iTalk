import { Lesson } from '../types'

export const chineseLessons: Lesson[] = [
  {
    id: 'zh-01',
    language: 'zh',
    title: 'Chào hỏi & Giao tiếp cơ bản hàng ngày',
    level: 'HSK 1 - Sơ cấp',
    category: 'Giao tiếp thường nhật',
    description: 'Tập trung chuẩn hóa 4 thanh điệu tiếng Trung và cách ngắt câu tự nhiên.',
    sentences: [
      {
        id: 'zh-01-s1',
        text: '你好！很高兴认识你。你最近工作忙不忙？',
        phonetic: 'Nǐ hǎo! Hěn gāoxìng rènshi nǐ. Nǐ zuìjìn gōngzuò máng bu máng?',
        translation: 'Xin chào! Rất vui được quen biết bạn. Dạo này công việc của bạn có bận không?',
        grammarNote: 'máng bu máng (忙不忙): Cấu trúc câu hỏi chính phản A-không-A (A不A).'
      },
      {
        id: 'zh-01-s2',
        text: '我最近还挺好的，正在努力学习外语。',
        phonetic: 'Wǒ zuìjìn hái tǐng hǎo de, zhèngzài nǔlì xuéxí wàiyǔ.',
        translation: 'Dạo này tôi vẫn khá tốt, đang nỗ lực chăm chỉ học ngoại ngữ.',
        grammarNote: 'tǐng... de (挺...的): Khá là / Tương đối; zhèngzài (正在): Đang diễn ra.'
      },
      {
        id: 'zh-01-s3',
        text: '有时间的话，我们一起去喝杯咖啡吧。',
        phonetic: 'Yǒu shíjiān dehuà, wǒmen yīqǐ qù hē bēi kāfēi ba.',
        translation: 'Nếu có thời gian, chúng ta cùng nhau đi uống tách cà phê nhé.',
        grammarNote: '... dehuà (...的话): Biểu thị giả định "nếu"; ba (吧): Trợ từ ngữ khí rủ rê.'
      }
    ]
  },
  {
    id: 'zh-02',
    language: 'zh',
    title: 'Đi nhà hàng & Thưởng thức ẩm thực Trung Hoa',
    level: 'HSK 2-3 - Trung cấp',
    category: 'Đời sống & Ẩm thực',
    description: 'Luyện tập gọi món, hỏi hương vị và yêu cầu nhân viên phục vụ.',
    sentences: [
      {
        id: 'zh-02-s1',
        text: '服务员，请给我们一份菜单，有什么特色菜推荐吗？',
        phonetic: 'Fúwùyuán, qǐng gěi wǒmen yī fèn càidān, yǒu shénme tèsè cài tuījiàn ma?',
        translation: 'Phục vụ ơi, vui lòng cho chúng tôi xin một cuốn thực đơn, có món đặc sắc nào gợi ý không?',
        grammarNote: 'qǐng gěi (请给): Làm ơn cho; tuījiàn (推荐): Tiến cử, gợi ý, đề xuất.'
      },
      {
        id: 'zh-02-s2',
        text: '这道菜有一点辣，请少放一点辣椒和香菜。',
        phonetic: 'Zhè dào cài yǒu yīdiǎn là, qǐng shǎo fàng yīdiǎn làjiāo hé xiāngcài.',
        translation: 'Món này hơi cay một chút, làm ơn bỏ bớt ớt và rau mùi giùm tôi nhé.',
        grammarNote: 'yǒu yīdiǎn (有一点): Hơi... một chút (thường chỉ cảm giác không vừa ý); shǎo fàng (少放): Bỏ ít.'
      },
      {
        id: 'zh-02-s3',
        text: '买单！请问可以用微信支付或者刷卡吗？',
        phonetic: 'Mǎidān! Qǐngwèn kěyǐ yòng Wēixìn zhīfù huòzhě shuākǎ ma?',
        translation: 'Tính tiền ạ! Xin hỏi có thể thanh toán qua WeChat hoặc quẹt thẻ được không?',
        grammarNote: 'kěyǐ... ma (可以...吗): Hỏi xin phép; huòzhě (或者): Hoặc là (dùng trong câu trần thuật/hỏi).'
      }
    ]
  },
  {
    id: 'zh-03',
    language: 'zh',
    title: 'Đàm phán thương mại & Hợp tác đối tác',
    level: 'HSK 4 - Nâng cao',
    category: 'Kinh doanh & Thương mại',
    description: 'Luyện phát âm dứt khoát, chuyên nghiệp trong môi trường hợp tác kinh doanh.',
    sentences: [
      {
        id: 'zh-03-s1',
        text: '我们非常重视与贵公司的长期合作关系。',
        phonetic: 'Wǒmen fēicháng zhòngshì yǔ guì gōngsī de chángqī hézuò guānxì.',
        translation: 'Chúng tôi vô cùng coi trọng mối quan hệ hợp tác lâu dài với quý công ty.',
        grammarNote: 'zhòngshì (重视): Coi trọng; guì gōngsī (贵公司): Quý công ty (kính ngữ trang trọng).'
      },
      {
        id: 'zh-03-s2',
        text: '关于产品价格，我们希望能争取到更有竞争力的折扣。',
        phonetic: 'Guānyú chǎnpǐn jiàgé, wǒmen xīwàng néng zhēngqǔ dào gèng yǒu jìngzhēnglì de zhékòu.',
        translation: 'Về giá thành sản phẩm, chúng tôi hy vọng có thể đạt được mức chiết khấu có tính cạnh tranh hơn.',
        grammarNote: 'guānyú (关于): Về vấn đề; zhēngqǔ dào (争取到): Tranh thủ đạt được.'
      },
      {
        id: 'zh-03-s3',
        text: '只要双方坦诚相待，互利共赢是完全可以实现的。',
        phonetic: 'Zhǐyào shuāngfāng tǎnchéng xiāngdài, hùlì gòngyíng shì wánquán kěyǐ shíxiàn de.',
        translation: 'Chỉ cần đôi bên chân thành đối đãi, đôi bên cùng có lợi hoàn toàn có thể thực hiện được.',
        grammarNote: 'zhǐyào... jiù/shì... (只要...): Cặp liên từ điều kiện "Chỉ cần... thì...".'
      }
    ]
  }
]
