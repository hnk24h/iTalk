import { Lesson } from '../types'

export const chineseLessons: Lesson[] = [
  // ==========================================
  // HSK 1 - SƠ CẤP CƠ BẢN (150 TỪ VỰNG)
  // ==========================================
  {
    id: 'zh-01',
    language: 'zh',
    title: 'Chào hỏi & Làm quen thường nhật',
    level: 'HSK 1',
    category: 'Giao tiếp cơ bản',
    description: 'Rèn luyện 4 thanh điệu chuẩn xác và các mẫu câu chào hỏi, tự giới thiệu cơ bản nhất.',
    sentences: [
      {
        id: 'zh-01-s1',
        text: '你好！很高兴认识你。你叫什么名字？',
        phonetic: 'Nǐ hǎo! Hěn gāoxìng rènshi nǐ. Nǐ jiào shénme míngzi?',
        translation: 'Xin chào! Rất vui được quen biết bạn. Bạn tên là gì?',
        grammarNote: '很高兴认识你 (hěn gāoxìng rènshi nǐ): Cụm câu xã giao kinh điển khi lần đầu gặp mặt.'
      },
      {
        id: 'zh-01-s2',
        text: '我叫阿黄，我是越南人。我是来学习中文的。',
        phonetic: 'Wǒ jiào Ā Huáng, wǒ shì Yuènán rén. Wǒ shì lái xuéxí zhōngwén de.',
        translation: 'Tôi tên là Hoàng, tôi là người Việt Nam. Tôi đến đây để học tiếng Trung.',
        grammarNote: '是...的 (shì...de): Cấu trúc nhấn mạnh mục đích hoặc phương thức của hành động.'
      },
      {
        id: 'zh-01-s3',
        text: '请问，这个汉字怎么读？你可以教我吗？',
        phonetic: 'Qǐngwèn, zhè ge hànzì zěnme dú? Nǐ kěyǐ jiāo wǒ ma?',
        translation: 'Xin hỏi, chữ Hán này đọc như thế nào? Bạn có thể dạy tôi được không?',
        grammarNote: '怎么 (zěnme) + Động từ: Hỏi cách thức thực hiện hành động (đọc như thế nào).'
      }
    ]
  },
  {
    id: 'zh-02',
    language: 'zh',
    title: 'Hỏi giờ, Ngày tháng & Thói quen sinh hoạt',
    level: 'HSK 1',
    category: 'Đời sống & Thói quen',
    description: 'Luyện tập phát âm các con số, thời gian biểu và các hoạt động thường ngày.',
    sentences: [
      {
        id: 'zh-02-s1',
        text: '现在几点了？我们今天下午几点上课？',
        phonetic: 'Xiànzài jǐ diǎn le? Wǒmen jīntiān xiàwǔ jǐ diǎn shàngkè?',
        translation: 'Bây giờ là mấy giờ rồi? Chiều nay chúng ta mấy giờ vào học?',
        grammarNote: '几点 (jǐ diǎn): Mấy giờ; 上课 (shàngkè): Vào lớp, bắt đầu tiết học.'
      },
      {
        id: 'zh-02-s2',
        text: '现在差一刻两点，两点半在图书馆集合。',
        phonetic: 'Xiànzài chà yí kè liǎng diǎn, liǎng diǎn bàn zài túshūguǎn jíhé.',
        translation: 'Bây giờ là 2 giờ kém 15, hai rưỡi chúng ta tập trung ở thư viện nhé.',
        grammarNote: '差一刻 (chà yí kè): Kém 15 phút (một khắc = 15 phút); 半 (bàn): Rưỡi (30 phút).'
      },
      {
        id: 'zh-02-s3',
        text: '太好了，我先去食堂吃个午饭，然后再去。',
        phonetic: 'Tài hǎo le, wǒ xiān qù shítáng chī ge wǔfàn, ránhòu zài qù.',
        translation: 'Tuyệt quá, tôi đi căn tin ăn bữa trưa trước đã, sau đó mới qua.',
        grammarNote: '先...然后... (xiān... ránhòu...): Cặp phó từ biểu thị trình tự trước sau "Làm A trước rồi mới làm B".'
      }
    ]
  },

  // ==========================================
  // HSK 2 - SƠ TRUNG CẤP (300 TỪ VỰNG)
  // ==========================================
  {
    id: 'zh-03',
    language: 'zh',
    title: 'Mua sắm tại cửa hàng tiện lợi & Mặc cả',
    level: 'HSK 2',
    category: 'Mua sắm & Đời sống',
    description: 'Thực hành các mẫu câu hỏi giá tiền, chọn kích cỡ và phương thức thanh toán.',
    sentences: [
      {
        id: 'zh-03-s1',
        text: '老板，请问这件外套多少钱？有没有大一点的码？',
        phonetic: 'Lǎobǎn, qǐngwèn zhè jiàn wàitào duōshao qián? Yǒu méiyǒu dà yìdiǎnr de mǎ?',
        translation: 'Ông chủ ơi, xin hỏi chiếc áo khoác này bao nhiêu tiền? Có size lớn hơn một chút không?',
        grammarNote: '件 (jiàn): Lượng từ cho trang phục áo quần; 大一点儿 (dà yìdiǎnr): To hơn một chút.'
      },
      {
        id: 'zh-03-s2',
        text: '这件原价两百八，如果你真心想要，两百块拿走吧。',
        phonetic: 'Zhè jiàn yuánjià liǎng bǎi bā, rúguǒ nǐ zhēnxīn xiǎng yào, liǎng bǎi kuài ná zǒu ba.',
        translation: 'Cái này giá gốc 280 tệ, nếu bạn thật lòng muốn lấy thì 200 tệ mang về nhé.',
        grammarNote: '如果...就/话 (rúguǒ...): Nếu như; 块 (kuài): Đồng tệ (khẩu ngữ thường dùng thay cho 元).'
      },
      {
        id: 'zh-03-s3',
        text: '行，便宜一点我就买。我扫微信二维码付钱给您。',
        phonetic: 'Xíng, piányi yìdiǎnr wǒ jiù mǎi. Wǒ sǎo Wēixìn èrwéimǎ fù qián gěi nín.',
        translation: 'Được ạ, bớt chút thì tôi mua. Tôi quét mã QR WeChat thanh toán cho bác nhé.',
        grammarNote: '扫二维码 (sǎo èrwéimǎ): Quét mã QR thanh toán (nét văn hóa đời sống đặc trưng ở Trung Quốc).'
      }
    ]
  },
  {
    id: 'zh-04',
    language: 'zh',
    title: 'Đi taxi & Hỏi đường ga tàu điện ngầm',
    level: 'HSK 2',
    category: 'Giao thông & Di chuyển',
    description: 'Luyện tập hội thoại chỉ đường, hỏi trạm dừng và đón xe taxi, tàu điện ngầm.',
    sentences: [
      {
        id: 'zh-04-s1',
        text: '师傅，您好！我去高铁站，大概需要多长时间？',
        phonetic: 'Shīfu, nín hǎo! Wǒ qù gāotiě zhàn, dàgài xūyào duō cháng shíjiān?',
        translation: 'Bác tài ơi, chào bác! Tôi đến ga tàu cao tốc, khoảng bao lâu thì tới nơi ạ?',
        grammarNote: '师傅 (shīfu): Cách xưng hô lịch sự với tài xế hoặc thợ; 多长时间: Bao lâu.'
      },
      {
        id: 'zh-04-s2',
        text: '现在路上有点儿堵车，走高架桥大概要半个小时。',
        phonetic: 'Xiànzài lùshang yǒudiǎnr dǔchē, zǒu gāojiàqiáo dàgài yào bàn gè xiǎoshí.',
        translation: 'Hiện tại đường hơi kẹt xe một chút, đi cầu cạn trên cao mất khoảng nửa tiếng đồng hồ.',
        grammarNote: '堵车 (dǔchē): Kẹt xe, tắc đường; 半个小时 (bàn gè xiǎoshí): Nửa tiếng (30 phút).'
      },
      {
        id: 'zh-04-s3',
        text: '那麻烦您稍微开快一点，我怕赶不上十点半的高铁。',
        phonetic: 'Nà máfan nín shāowēi kāi kuài yìdiǎnr, wǒ pà gǎnbushàng shí diǎn bàn de gāotiě.',
        translation: 'Vậy phiền bác chạy nhanh một chút giùm tôi nhé, tôi sợ không kịp chuyến tàu 10 giờ rưỡi.',
        grammarNote: '麻烦您 (máfan nín): Làm phiền bác; 赶不上 (gǎnbushàng): Bổ ngữ khả năng phủ định "không đuổi kịp/không bắt kịp".'
      }
    ]
  },

  // ==========================================
  // HSK 3 - TRUNG CẤP ĐỜI SỐNG (600 TỪ VỰNG)
  // ==========================================
  {
    id: 'zh-05',
    language: 'zh',
    title: 'Thưởng thức ẩm thực & Gọi món tại nhà hàng',
    level: 'HSK 3',
    category: 'Ẩm thực & Dịch vụ',
    description: 'Diễn đạt sở thích khẩu vị (cay, ngọt, mặn, chua) và phong cách phục vụ chu đáo.',
    sentences: [
      {
        id: 'zh-05-s1',
        text: '服务员，请问招牌菜宫保鸡丁和水煮牛肉辣不辣？',
        phonetic: 'Fúwùyuán, qǐngwèn zhāopáicài Gōngbǎo Jīdīng hé Shuǐzhǔ Niúròu là bu là?',
        translation: 'Phục vụ ơi, cho hỏi món đặc sản Gà Cung Bảo và Bò nhúng cay Tứ Xuyên có cay lắm không?',
        grammarNote: '招牌菜 (zhāopáicài): Món ăn đặc trưng / Món tủ của nhà hàng; 辣不辣: Câu hỏi chính phản A-không-A.'
      },
      {
        id: 'zh-05-s2',
        text: '水煮牛肉比较麻辣，如果您不太能吃辣，我们可以做微辣。',
        phonetic: 'Shuǐzhǔ Niúròu bǐjiào málà, rúguǒ nǐ bú tài néng chī là, wǒmen kěyǐ zuò wēilà.',
        translation: 'Món Bò nhúng vị tê cay khá đậm, nếu quý khách không ăn cay giỏi thì chúng tôi có thể làm cay nhẹ thôi ạ.',
        grammarNote: '麻辣 (málà): Vị tê cay đặc trưng của hoa tiêu Tứ Xuyên; 微辣 (wēilà): Cay nhẹ.'
      },
      {
        id: 'zh-05-s3',
        text: '太贴心了！那就做微辣，再给我们加一壶茉莉花茶。',
        phonetic: 'Tài tiēxīn le! Nà jiù zuò wēilà, zài gěi wǒmen jiā yì hú mòlihuā chá.',
        translation: 'Chu đáo quá! Vậy làm cay nhẹ nhé, cho chúng tôi thêm một ấm trà hoa nhài nữa.',
        grammarNote: '贴心 (tiēxīn): Tinh tế, chu đáo, ấm áp; 壶 (hú): Lượng từ chỉ ấm/bình trà.'
      }
    ]
  },
  {
    id: 'zh-06',
    language: 'zh',
    title: 'Thuê căn hộ & Ký kết hợp đồng nhà đất',
    level: 'HSK 3',
    category: 'Nhà ở & Đời sống',
    description: 'Luyện tập đàm phán hợp đồng thuê phòng, tiền đặt cọc và tiện ích nội thất đi kèm.',
    sentences: [
      {
        id: 'zh-06-s1',
        text: '中介先生，这套两居室的房子采光很好，家电都齐全吗？',
        phonetic: 'Zhōngjiè xiānsheng, zhè tào liǎngjūshì de fángzi cǎiguāng hěn hǎo, jiādiàn dōu qíquán ma?',
        translation: 'Anh môi giới ơi, căn hộ hai phòng ngủ này ánh sáng tự nhiên rất tốt, đồ điện gia dụng có đầy đủ hết không?',
        grammarNote: '两居室 (liǎngjūshì): Căn hộ 2 phòng ngủ; 齐全 (qíquán): Đầy đủ, trọn gói.'
      },
      {
        id: 'zh-06-s2',
        text: '冰箱、洗衣机和空调都是全新的，房租包含物业管理费。',
        phonetic: 'Bīngxiāng, xǐyījī hé kōngtiáo dōu shì quánxīn de, fángzū bāohán wùyè guǎnlǐ fèi.',
        translation: 'Tủ lạnh, máy giặt và điều hòa nhiệt độ đều là đồ mới toanh, tiền thuê nhà đã bao gồm phí quản lý tòa nhà.',
        grammarNote: '包含 (bāohán): Bao gồm; 物业管理费 (wùyè guǎnlǐ fèi): Phí dịch vụ quản lý chung cư.'
      },
      {
        id: 'zh-06-s3',
        text: '押金是押一付三吗？如果没问题，我们今天就可以签合同。',
        phonetic: 'Yājīn shì yā yī fù sān ma? Rúguǒ méi wèntí, wǒmen jīntiān jiù kěyǐ qiān hétong.',
        translation: 'Tiền cọc là đặt cọc một tháng trả ba tháng đúng không? Nếu không có vấn đề gì thì hôm nay chúng ta có thể ký hợp đồng luôn.',
        grammarNote: '押一付三 (yā yī fù sān): Quy tắc thuê nhà phổ biến ở Trung Quốc: Đặt cọc 1 tháng, đóng tiền trước 3 tháng.'
      }
    ]
  },

  // ==========================================
  // HSK 4 - TRUNG CAO CẤP CÔNG SỞ (1200 TỪ VỰNG)
  // ==========================================
  {
    id: 'zh-07',
    language: 'zh',
    title: 'Phỏng vấn xin việc & Giới thiệu năng lực',
    level: 'HSK 4',
    category: 'Công việc & Sự nghiệp',
    description: 'Thuyết phục nhà tuyển dụng bằng cách trình bày kinh nghiệm, kỹ năng và thái độ cầu tiến.',
    sentences: [
      {
        id: 'zh-07-s1',
        text: '面试官您好，我之前在外贸企业有三年的跨境电商运营经验。',
        phonetic: 'Miànshìguān nín hǎo, wǒ zhīqián zài wàimào qǐyè yǒu sān nián de kuàjìng diànshāng yùnyíng jīngyàn.',
        translation: 'Kính chào quý vị phỏng vấn, trước đây tôi từng có 3 năm kinh nghiệm vận hành thương mại điện tử xuyên biên giới tại doanh nghiệp ngoại thương.',
        grammarNote: '跨境电商 (kuàjìng diànshāng): Thương mại điện tử xuyên biên giới; 运营 (yùnyíng): Vận hành, quản lý.'
      },
      {
        id: 'zh-07-s2',
        text: '我的优势在于具备良好的沟通能力，并且能承受高强度的工作压力。',
        phonetic: 'Wǒ de yòushì zàiyú jùbèi liánghǎo de gōutōng nénglì, bìngqiě néng chéngshòu gāo qiángdù de gōngzuò yālì.',
        translation: 'Thế mạnh của tôi nằm ở khả năng giao tiếp khéo léo, đồng thời có thể chịu đựng được áp lực công việc cường độ cao.',
        grammarNote: '优势在于 (yòushì zàiyú): Thế mạnh nằm ở chỗ; 承受压力 (chéngshòu yālì): Chịu áp lực.'
      },
      {
        id: 'zh-07-s3',
        text: '我非常认同贵公司的企业文化，希望能有机会加入团队共同成长。',
        phonetic: 'Wǒ fēicháng rèntóng guì gōngsī de qǐyè wénhuà, xīwàng néng yǒu jīhuì jiārù tuánduì gòngtóng chéngzhǎng.',
        translation: 'Tôi vô cùng tâm đắc với văn hóa doanh nghiệp của quý công ty, rất hy vọng có cơ hội gia nhập đội ngũ để cùng nhau phát triển.',
        grammarNote: '认同 (rèntóng): Đồng thuận, tâm đắc, thấu hiểu; 共同成长 (gòngtóng chéngzhǎng): Cùng nhau trưởng thành.'
      }
    ]
  },
  {
    id: 'zh-08',
    language: 'zh',
    title: 'Họp báo cáo tiến độ dự án & Phân công nhiệm vụ',
    level: 'HSK 4',
    category: 'Môi trường công sở',
    description: 'Luyện tập phong thái chuyên nghiệp khi trình bày tiến độ công việc trước đồng nghiệp và cấp trên.',
    sentences: [
      {
        id: 'zh-08-s1',
        text: '大家早上好！今天的周会主要复盘上周的销售数据和项目进展。',
        phonetic: 'Dàjiā zǎoshang hǎo! Jīntiān de zhōuhuì zhǔyào fùpán shàng zhōu de xiàoshòu shùjù hé xiàngmù jìnzhǎn.',
        translation: 'Chào buổi sáng mọi người! Cuộc họp tuần hôm nay chủ yếu đúc kết lại số liệu bán hàng và tiến độ dự án tuần vừa rồi.',
        grammarNote: '复盘 (fùpán): Đúc kết, đánh giá lại toàn diện sau một chiến dịch/giai đoạn (thuật ngữ công sở rất phổ biến).'
      },
      {
        id: 'zh-08-s2',
        text: '技术部门已经完成了系统升级，接下来需要市场部配合做推广。',
        phonetic: 'Jìshù bùmén yǐjīng wánchéng le xìtǒng shēngjí, jiēxiàlai xūyào shìchǎngbù pèihé zuò tuīguǎng.',
        translation: 'Phòng kỹ thuật đã hoàn thành việc nâng cấp hệ thống, tiếp theo cần phòng marketing phối hợp làm công tác quảng bá.',
        grammarNote: '接下来 (jiēxiàlai): Kế tiếp, sau đây; 配合 (pèihé): Phối hợp ăn ý.'
      },
      {
        id: 'zh-08-s3',
        text: '如果在执行过程中遇到任何突发问题，请大家第一时间在工作群里反馈。',
        phonetic: 'Rúguǒ zài zhíxíng guòchéng zhōng yùdào rènhé tūfā wèntí, qǐng dàjiā dì-yī shíjiān zài gōngzuò qún lǐ fǎnkuì.',
        translation: 'Nếu trong quá trình thực thi gặp bất kỳ sự cố đột xuất nào, xin mọi người hãy phản hồi ngay lập tức trên nhóm làm việc.',
        grammarNote: '第一时间 (dì-yī shíjiān): Ngay lập tức, sớm nhất có thể; 反馈 (fǎnkuì): Phản hồi thông tin.'
      }
    ]
  },

  // ==========================================
  // HSK 5 - CAO CẤP & THƯƠNG MẠI (2500 TỪ VỰNG)
  // ==========================================
  {
    id: 'zh-09',
    language: 'zh',
    title: 'Đàm phán thương mại & Ký kết hợp đồng đại lý',
    level: 'HSK 5',
    category: 'Kinh doanh & Thương mại',
    description: 'Thảo luận các điều khoản hợp tác kinh doanh, điều kiện phân phối và chiến lược cùng có lợi.',
    sentences: [
      {
        id: 'zh-09-s1',
        text: '根据双方此前的初步意向，我们希望能在东南亚市场取得独家代理权。',
        phonetic: 'Gēnjù shuāngfāng cǐqián de chūbù yìxiàng, wǒmen xīwàng néng zài Dōngnányà shìchǎng qǔdé dújiā dàilǐ quán.',
        translation: 'Căn cứ theo ý định ban đầu đôi bên trước đây, chúng tôi hy vọng có thể giành được quyền đại lý độc quyền tại thị trường Đông Nam Á.',
        grammarNote: '根据 (gēnjù): Căn cứ theo; 独家代理权 (dújiā dàilǐ quán): Quyền đại lý độc quyền.'
      },
      {
        id: 'zh-09-s2',
        text: '我们非常认可贵公司的渠道实力，但年度最低采购额必须达到合同约定。',
        phonetic: 'Wǒmen fēicháng rènkě guì gōngsī de qúdào shílì, dàn niándù zuìdī cǎigòu é bìxū dádào hétong yuēdìng.',
        translation: 'Chúng tôi rất đánh giá cao thực lực kênh phân phối của quý công ty, nhưng doanh số mua sắm tối thiểu hàng năm bắt buộc phải đạt mức quy định trong hợp đồng.',
        grammarNote: '渠道实力 (qúdào shílì): Năng lực kênh phân phối; 采购额 (cǎigòu é): Kim ngạch mua hàng.'
      },
      {
        id: 'zh-09-s3',
        text: '只要双方秉持互利共赢的原则，我相信未来的合作空间必然十分广阔。',
        phonetic: 'Zhǐyào shuāngfāng bǐngchí hùlì gòngyíng de yuánzé, wǒ xiāngxìn wèilái de hézuò kōngjiān bìrán shífēn guǎngkuò.',
        translation: 'Chỉ cần hai bên kiên trì giữ vững nguyên tắc đôi bên cùng có lợi, tôi tin chắc không gian hợp tác trong tương lai nhất định sẽ vô cùng rộng mở.',
        grammarNote: '秉持 (bǐngchí): Giữ vững, tuân thủ; 互利共赢 (hùlì gòngyíng): Đôi bên cùng có lợi (thành ngữ thương mại kinh điển).'
      }
    ]
  },
  {
    id: 'zh-10',
    language: 'zh',
    title: 'Thương mại điện tử & Thanh toán kỹ thuật số',
    level: 'HSK 5',
    category: 'Công nghệ & Xã hội',
    description: 'Bình luận về sự bùng nổ của mạng xã hội, livestream bán hàng và công nghệ tài chính hiện đại.',
    sentences: [
      {
        id: 'zh-10-s1',
        text: '直播带货的兴起彻底重塑了传统零售模式，拉近了消费者与品牌之间的距离。',
        phonetic: 'Zhíbō dàihuò de xīngqǐ chèdǐ chóngshù le chuántǒng língshòu móshì, lājìn le xiāofèizhě yǔ pǐnpái zhījiān de jùlí.',
        translation: 'Sự trỗi dậy của bán hàng qua phát sóng trực tiếp (livestream) đã tái định hình triệt để mô hình bán lẻ truyền thống, thu hẹp khoảng cách giữa người tiêu dùng và thương hiệu.',
        grammarNote: '直播带货 (zhíbō dàihuò): Bán hàng qua livestream; 重塑 (chóngshù): Tái định hình, đúc lại.'
      },
      {
        id: 'zh-10-s2',
        text: '移动支付不仅提升了交易效率，还为大数据分析和精准营销奠定了坚实基础。',
        phonetic: 'Yídòng zhīfù bùjǐn tíshēng le jiāoyì xiàolǜ, hái wèi dàshùjù fēnxī hé jīngzhǔn yíngxiāo diàndìng le jiānshí jīchǔ.',
        translation: 'Thanh toán di động không chỉ nâng cao hiệu suất giao dịch, mà còn đặt nền móng vững chắc cho việc phân tích dữ liệu lớn và tiếp thị chính xác mục tiêu.',
        grammarNote: '不仅...还... (bùjǐn... hái...): Không những... mà còn...; 奠定基础 (diàndìng jīchǔ): Đặt nền móng vững chắc.'
      },
      {
        id: 'zh-10-s3',
        text: '然而，如何在保障用户信息安全的同时激发市场创新，是数字经济面临的核心课题。',
        phonetic: 'Rán\'ér, rúhé zài bǎozhàng yònghù xìnxī ānquán de tóngshí jīfā shìchǎng chuàngxīn, shì shùzì jīngjì miànlín de héxīn kètí.',
        translation: 'Tuy nhiên, làm thế nào để kích thích đổi mới thị trường song song với việc bảo vệ an toàn thông tin người dùng là chủ đề cốt lõi mà nền kinh tế số đang đối mặt.',
        grammarNote: '在...的同时 (zài... de tóngshí): Đồng thời trong lúc...; 核心课题 (héxīn kètí): Đề tài then chốt.'
      }
    ]
  },

  // ==========================================
  // HSK 6 - CAO CẤP CHUYÊN GIA (5000+ TỪ VỰNG)
  // ==========================================
  {
    id: 'zh-11',
    language: 'zh',
    title: 'Cân bằng giữa áp lực công việc và cuộc sống',
    level: 'HSK 6',
    category: 'Tâm lý & Xã hội',
    description: 'Thảo luận sâu sắc về nhịp sống hối hả, hội chứng kiệt sức và nghệ thuật nuôi dưỡng nội tâm an yên.',
    sentences: [
      {
        id: 'zh-11-s1',
        text: '随着社会节奏的日益加快，现代都市人普遍陷入了难以自拔的内卷与焦虑之中。',
        phonetic: 'Suízhe shèhuì jiézòu de rìyì jiākuài, xiàndài dūshìrén pǔbiàn xiànrù le nányǐ zìbá de nèijuǎn yǔ jiāolǜ zhī zhōng.',
        translation: 'Cùng với nhịp độ xã hội ngày càng tăng tốc, người dân đô thị hiện đại nhìn chung đều rơi vào vòng xoáy cạnh tranh nội bộ khốc liệt và lo âu khó lòng tự thoát ra.',
        grammarNote: '内卷 (nèijuǎn): Thuật ngữ "Involution" - cạnh tranh khốc liệt triệt tiêu lẫn nhau; 难以自拔: Khó tự rút chân ra được.'
      },
      {
        id: 'zh-11-s2',
        text: '真正的成功并非盲目追求外在的名利积累，而在于能否在喧嚣中守住内心的笃定与宁静。',
        phonetic: 'Zhēnzhèng de chénggōng bìngfēi mángmù zhuīqiú wàizài de mínglì jīlěi, ér zàiyú néng fǒu zài xuānxiāo zhōng shǒuzhù nèixīn de dǔdìng yǔ níngjìng.',
        translation: 'Thành công đích thực tuyệt nhiên không phải là mù quáng mưu cầu tích lũy danh lợi bên ngoài, mà nằm ở chỗ liệu có giữ vững được sự kiên định và thanh thản nội tâm giữa chốn ồn ào náo nhiệt hay không.',
        grammarNote: '并非...而在于... (bìngfēi... ér zàiyú...): Tuyệt nhiên không phải là... mà là ở chỗ...; 笃定 (dǔdìng): Kiên định không lay chuyển.'
      },
      {
        id: 'zh-11-s3',
        text: '学会在快慢交织的生命旅程中张弛有度，方能领悟细水长流的人生意境与智慧。',
        phonetic: 'Xuéhuì zài kuài-màn jiāozhī de shēngmìng lǚchéng zhōng zhāngchí-yǒudù, fāng néng lǐngwù xìshuǐ-chángliú de rénshēng yìjìng yǔ zhìhuì.',
        translation: 'Học được cách biết cương biết nhu, kết hợp hài hòa giữa căng và chùng trong hành trình đời người đan xen giữa nhanh và chậm, mới có thể thấu cảm cảnh giới và trí tuệ êm đềm bền lâu của kiếp nhân sinh.',
        grammarNote: '张弛有度 (zhāngchí-yǒudù): Thành ngữ "Biết căng biết chùng, hài hòa nhịp độ"; 细水长流: Nước chảy nhỏ giọt nhưng dài lâu, bền bỉ.'
      }
    ]
  },
  {
    id: 'zh-12',
    language: 'zh',
    title: 'Nghệ thuật trà đạo & Triết lý tĩnh tâm',
    level: 'HSK 6',
    category: 'Văn hóa & Nghệ thuật',
    description: 'Chiêm nghiệm vẻ đẹp văn hóa truyền thống Á Đông, tìm kiếm sự thong dong tự tại qua chén trà.',
    sentences: [
      {
        id: 'zh-12-s1',
        text: '中国茶文化源远流长，其精髓不仅在于品鉴茶汤之甘醇，更在于感悟天人合一的东方哲学。',
        phonetic: 'Zhōngguó chá wénhuà yuányuǎn-liúcháng, qí jīngsuǐ bùjǐn zàiyú pǐnjiàn chátāng zhī gānchún, gèng zàiyú gǎnwù tiān-rén-hé-yī de dōngfāng zhéxué.',
        translation: 'Văn hóa trà Trung Hoa có nguồn gốc sâu xa và lịch sử lâu đời, tinh hoa của nó không chỉ nằm ở việc thưởng thức vị ngọt lành thanh khiết của chén trà, mà sâu xa hơn là cảm ngộ triết lý "Thiên nhân hợp nhất" của phương Đông.',
        grammarNote: '源远流长 (yuányuǎn-liúcháng): Nguồn xa dòng dài, lịch sử lâu đời; 天人合一 (tiān-rén-hé-yī): Thiên nhân hợp nhất (con người hòa hợp với thiên nhiên).'
      },
      {
        id: 'zh-12-s2',
        text: '一壶沸水，几片嫩芽，在沉浮翻滚之间尽显生命的历练与蜕变。',
        phonetic: 'Yì hú fèishuǐ, jǐ piàn nèn yá, zài chénfú fāngǔn zhījiān jìn xiǎn shēngmìng de lìliàn yǔ tuìbiàn.',
        translation: 'Một ấm nước sôi, vài búp trà non, giữa những lần chìm nổi cuộn trào đã hiển lộ trọn vẹn sự trui rèn và lột xác của một kiếp sinh linh.',
        grammarNote: '沉浮 (chénfú): Chìm nổi, thăng trầm; 蜕变 (tuìbiàn): Lột xác, chuyển hóa sang cảnh giới mới.'
      },
      {
        id: 'zh-12-s3',
        text: '以茶会友，淡泊明志；于一方茶席之中，方能洗尽铅华，复归质朴本真。',
        phonetic: 'Yǐ chá huì yǒu, dànbó míngzhì; yú yì fāng cháxí zhī zhōng, fāng néng xǐ jìn qiānhuá, fùguī zhìpǔ běnzhēn.',
        translation: 'Lấy trà kết giao tri kỷ, đạm bạc để sáng tỏ chí hướng; nơi một góc bàn trà tĩnh lặng, mới có thể gột sạch mọi phù hoa lấp lánh để tìm về với bản tính thuần khiết mộc mạc ban sơ.',
        grammarNote: '淡泊明志 (dànbó míngzhì): Đạm bạc dĩ minh chí (thành ngữ nổi tiếng của Gia Cát Lượng); 洗尽铅华: Rửa sạch mọi vẻ son phấn phù hoa.'
      }
    ]
  }
]
