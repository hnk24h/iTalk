import { GrammarPattern, KaiwaGroup } from '../types'

export const chineseGrammar: GrammarPattern[] = [
  {
    "id": "zh-g-hsk1-01",
    "language": "zh",
    "level": "HSK 1",
    "pattern": "是……的 (Nhấn mạnh thời gian, địa điểm, phương thức)",
    "meaning": "Dùng khi hành động đã xảy ra trong quá khứ, nhấn mạnh vào thời gian, địa điểm, cách thức hoặc đối tượng thực hiện.",
    "formula": "Chủ ngữ + 是 + [Thời gian / Địa điểm / Phương thức] + Động từ + 的",
    "note": "Trong câu khẳng định có thể lược bỏ chữ 是, nhưng trong câu phủ định bắt buộc phải nói 不是...的.",
    "examples": [
      {
        "text": "我是坐飞机来的。",
        "reading": "Wǒ shì zuò fēijī lái de.",
        "translation": "Tôi đến đây bằng máy bay."
      },
      {
        "text": "这本书是在北京买的。",
        "reading": "Zhè běn shū shì zài Běijīng mǎi de.",
        "translation": "Quyển sách này là tôi mua ở Bắc Kinh."
      },
      {
        "text": "他是昨天下午到的。",
        "reading": "Tā shì zuótiān xiàwǔ dào de.",
        "translation": "Anh ấy tới nơi vào chiều hôm qua."
      },
      {
        "text": "我们是一起长大的好朋友。",
        "reading": "Wǒmen shì yìqǐ zhǎngdà de hǎo péngyou.",
        "translation": "Chúng tôi là những người bạn tốt lớn lên cùng nhau."
      }
    ]
  },
  {
    "id": "zh-g-hsk1-02",
    "language": "zh",
    "level": "HSK 1",
    "pattern": "太……了 (Quá... / Lắm - Biểu thị cảm thán hoặc vượt mức)",
    "meaning": "Biểu thị mức độ cao mang tính cảm thán khen ngợi hoặc phàn nàn chê bai.",
    "formula": "太 + Tính từ / Động từ tâm lý + 了",
    "note": "Khi mang nghĩa phủ định 'không... lắm' dùng 不太 + Tính từ (không có 了).",
    "examples": [
      {
        "text": "这个苹果太好吃了！",
        "reading": "Zhè ge píngguǒ tài hǎochī le!",
        "translation": "Quả táo này ngon quá đi mất!"
      },
      {
        "text": "今天天气太冷了，多穿点衣服吧。",
        "reading": "Jīntiān tiānqì tài lěng le, duō chuān diǎn yīfu ba.",
        "translation": "Hôm nay trời lạnh quá, hãy mặc nhiều áo ấm vào nhé."
      },
      {
        "text": "太谢谢你了，帮了我这么大的忙。",
        "reading": "Tài xièxie nǐ le, bāng le wǒ zhème dà de máng.",
        "translation": "Quá cảm ơn bạn, đã giúp tôi một việc lớn như vậy."
      },
      {
        "text": "这里的衣服太贵了，我们去别处看看吧。",
        "reading": "Zhèlǐ de yīfu tài guì le, wǒmen qù biéchù kànkan ba.",
        "translation": "Quần áo ở đây đắt quá, chúng mình sang chỗ khác xem đi."
      }
    ]
  },
  {
    "id": "zh-g-hsk1-03",
    "language": "zh",
    "level": "HSK 1",
    "pattern": "在 + Địa điểm + Làm gì (Ở đâu làm gì đó)",
    "meaning": "Giới từ 在 chỉ nơi chốn diễn ra hành động.",
    "formula": "Chủ ngữ + 在 + Nơi chốn + Động từ + Tân ngữ",
    "note": "Khác tiếng Việt: Tiếng Việt nói 'Làm gì Ở ĐÂU', tiếng Trung bắt buộc phải nói 'Ở ĐÂU Làm gì'.",
    "examples": [
      {
        "text": "我在图书馆看书。",
        "reading": "Wǒ zài túshūguǎn kàn shū.",
        "translation": "Tôi đọc sách ở thư viện."
      },
      {
        "text": "妈妈在厨房做饭。",
        "reading": "Māma zài chúfáng zuò fàn.",
        "translation": "Mẹ đang nấu cơm trong bếp."
      },
      {
        "text": "我们在中国大学学习汉语。",
        "reading": "Wǒmen zài Zhōngguó dàxué xuéxí Hànyǔ.",
        "translation": "Chúng tôi học tiếng Trung ở trường đại học Trung Quốc."
      },
      {
        "text": "爸爸在医院工作。",
        "reading": "Bàba zài yīyuàn gōngzuò.",
        "translation": "Bố tôi làm việc ở bệnh viện."
      }
    ]
  },
  {
    "id": "zh-g-hsk2-01",
    "language": "zh",
    "level": "HSK 2",
    "pattern": "A 比 B + Tính từ (So sánh hơn: A hơn B)",
    "meaning": "Mẫu câu so sánh hơn giữa hai sự vật hoặc hai người.",
    "formula": "A + 比 + B + Tính từ (+ 一点儿 / 得多 / 具体数量)",
    "note": "Tuyệt đối KHÔNG dùng phó từ 很, 非常 trước tính từ trong câu chữ 比.",
    "examples": [
      {
        "text": "哥哥比我大三岁。",
        "reading": "Gēge bǐ wǒ dà sān suì.",
        "translation": "Anh trai lớn hơn tôi 3 tuổi."
      },
      {
        "text": "今天的天气比昨天暖和得多。",
        "reading": "Jīntiān de tiānqì bǐ zuótiān nuǎnhuo de duō.",
        "translation": "Thời tiết hôm nay ấm áp hơn hôm qua nhiều."
      },
      {
        "text": "高铁比普通火车快多了。",
        "reading": "Gāotiě bǐ pǔtōng huǒchē kuài duō le.",
        "translation": "Tàu cao tốc nhanh hơn nhiều so với tàu hỏa thường."
      },
      {
        "text": "这件衣服比那件便宜一点儿。",
        "reading": "Zhè jiàn yīfu bǐ nà jiàn piányi yìdiǎnr.",
        "translation": "Bộ quần áo này rẻ hơn bộ kia một chút."
      }
    ]
  },
  {
    "id": "zh-g-hsk2-02",
    "language": "zh",
    "level": "HSK 2",
    "pattern": "虽然……但是…… (Tuy... nhưng... - Quan hệ nhượng bộ)",
    "meaning": "Cặp liên từ diễn tả sự tương phản nhượng bộ giữa hai vế câu.",
    "formula": "虽然 + [Vế 1]，但是 / 可是 + [Vế 2]",
    "note": "Vế 2 mới là trọng tâm thông tin người nói muốn truyền đạt.",
    "examples": [
      {
        "text": "虽然汉字很难写，但是我觉得很有趣。",
        "reading": "Suīrán hànzì hěn nán xiě, dànshì wǒ juéde hěn yǒuqù.",
        "translation": "Tuy chữ Hán rất khó viết, nhưng tôi thấy vô cùng thú vị."
      },
      {
        "text": "虽然外面下着大雨，但他依然按时来上班。",
        "reading": "Suīrán wàimiàn xiàzhe dàyǔ, dàn tā yīrán ànshí lái shàngbān.",
        "translation": "Mặc dù bên ngoài trời mưa to, nhưng anh ấy vẫn đi làm đúng giờ."
      },
      {
        "text": "虽然这台手机很贵，但是质量非常好。",
        "reading": "Suīrán zhè tái shǒujī hěn guì, dànshì zhìliàng fēicháng hǎo.",
        "translation": "Tuy chiếc điện thoại này đắt tiền, nhưng chất lượng cực kỳ tốt."
      },
      {
        "text": "虽然学习很忙，我每天还是坚持运动半小时。",
        "reading": "Suīrán xuéxí hěn máng, wǒ měitiān háishi jiānchí yùndòng bàn xiǎoshí.",
        "translation": "Dù việc học rất bận rộn, mỗi ngày tôi vẫn kiên trì tập thể dục nửa tiếng."
      }
    ]
  },
  {
    "id": "zh-g-hsk3-01",
    "language": "zh",
    "level": "HSK 3",
    "pattern": "把字句 (Câu chữ BẢ: Xử lý tân ngữ và thay đổi trạng thái)",
    "meaning": "Nhấn mạnh chủ ngữ tác động làm dịch chuyển vị trí hoặc thay đổi trạng thái, kết quả của sự vật.",
    "formula": "Chủ ngữ + 把 + Tân ngữ + Động từ + Thành phần kết quả / Vị trí",
    "note": "Động từ không được đứng trơ trọi một mình, phía sau phải có bổ ngữ kết quả, bổ ngữ xu hướng hoặc 了.",
    "examples": [
      {
        "text": "请把窗户关上，外面风很大。",
        "reading": "Qǐng bǎ chuānghu guānshàng, wàimiàn fēng hěn dà.",
        "translation": "Làm ơn hãy đóng cửa sổ lại, bên ngoài gió to lắm."
      },
      {
        "text": "我已经把作业写完了。",
        "reading": "Wǒ yǐjīng bǎ zuòyè xiěwán le.",
        "translation": "Tôi đã làm xong hết bài tập về nhà rồi."
      },
      {
        "text": "他把护照放进了双肩包里。",
        "reading": "Tā bǎ hùzhào fàngjìn le shuāngjiānbāo lǐ.",
        "translation": "Anh ấy đã cất hộ chiếu vào trong balo rồi."
      },
      {
        "text": "请把这杯热茶端给李老师。",
        "reading": "Qǐng bǎ zhè bēi rèchá duāngěi Lǐ lǎoshī.",
        "translation": "Xin hãy bưng tách trà nóng này cho thầy Lý."
      }
    ]
  },
  {
    "id": "zh-g-hsk3-02",
    "language": "zh",
    "level": "HSK 3",
    "pattern": "越来越…… (Càng ngày càng... - Mức độ tăng tiến theo thời gian)",
    "meaning": "Biểu thị sự biến chuyển mức độ tính chất tăng dần theo dòng thời gian.",
    "formula": "Chủ ngữ + 越来越 + Tính từ / Động từ tâm lý (+ 了)",
    "note": "Tuyệt đối KHÔNG chèn thêm phó từ mức độ như 很, 非常 vào sau 越来越.",
    "examples": [
      {
        "text": "你的汉语说得越来越流利了！",
        "reading": "Nǐ de Hànyǔ shuō de yuè lái yuè liúlì le!",
        "translation": "Tiếng Trung của bạn nói càng ngày càng lưu loát rồi đấy!"
      },
      {
        "text": "随着天气转凉，树叶越来越黄了。",
        "reading": "Suízhe tiānqì zhuǎnliáng, shùyè yuè lái yuè huáng le.",
        "translation": "Theo thời tiết chuyển lạnh, lá cây càng ngày càng vàng úa."
      },
      {
        "text": "现代社会人们对健康的关注越来越高。",
        "reading": "Xiàndài shèhuì rénmen duì jiànkāng de guānzhù yuè lái yuè gāo.",
        "translation": "Trong xã hội hiện đại, sự quan tâm của con người đối với sức khỏe càng lúc càng cao."
      },
      {
        "text": "离考试日期越来越近了，大家都在抓紧复习。",
        "reading": "Lí kǎoshì rìqī yuè lái yuè jìn le, dàjiā dōu zài zhuājǐn fùxí.",
        "translation": "Càng ngày càng đến gần ngày thi rồi, mọi người đều đang gấp rút ôn tập."
      }
    ]
  },
  {
    "id": "zh-g-hsk4-01",
    "language": "zh",
    "level": "HSK 4",
    "pattern": "无论……都…… (Bất luận / Cho dù... đều...)",
    "meaning": "Biểu thị trong bất kỳ điều kiện hay tình huống nào thì kết quả vẫn không thay đổi.",
    "formula": "无论 (不论 / 不管) + [Điều kiện phiếm chỉ / Lựa chọn]，都 / 也 + [Kết quả cố định]",
    "note": "Vế sau 无论 thường có từ nghi vấn (什么, 怎么, 哪里) hoặc kết cấu chính phản (是否, A还是B).",
    "examples": [
      {
        "text": "无论遇到多么大的困难，我们都决不轻言放弃。",
        "reading": "Wúlùn yùdào duōme dà de kùnnan, wǒmen dōu juébù qīngyán fàngqì.",
        "translation": "Bất luận gặp phải khó khăn lớn đến nhường nào, chúng tôi đều quyết không buông xuôi bỏ cuộc."
      },
      {
        "text": "无论刮风下雨，他每天早晨都去公园跑步。",
        "reading": "Wúlùn guāfēng xiàyǔ, tā měitiān zǎochén dōu qù gōngyuán pǎobù.",
        "translation": "Cho dù mưa gió bão bùng, mỗi sáng anh ấy đều ra công viên chạy bộ."
      },
      {
        "text": "无论你做出什么决定，家人都会全力支持你。",
        "reading": "Wúlùn nǐ zuòchū shénme juédìng, jiārén dōu huì quánlì zhīchí nǐ.",
        "translation": "Bất kể bạn đưa ra quyết định gì, gia đình đều sẽ toàn lực ủng hộ bạn."
      },
      {
        "text": "无论结果成功与否，这次尝试都是宝贵的人生经历。",
        "reading": "Wúlùn jiéguǒ chénggōng yǔfǒu, zhè cì chángshì dōu shì bǎoguì de rénshēng jīnglì.",
        "translation": "Bất luận kết quả có thành công hay không, lần thử sức này đều là một trải nghiệm nhân sinh vô giá."
      }
    ]
  },
  {
    "id": "zh-g-hsk4-02",
    "language": "zh",
    "level": "HSK 4",
    "pattern": "既然……就…… (Đã... thì... - Suy luận tiền đề hiển nhiên)",
    "meaning": "Nêu ra một tiền đề thực tế đã xảy ra hoặc hiển nhiên, từ đó rút ra kết luận hợp logic.",
    "formula": "既然 + [Tiền đề hiển nhiên]，(那么) 就 + [Kết luận / Đề xuất hành động]",
    "note": "Vế sau thường là câu đưa ra giải pháp, mệnh lệnh hoặc lời khuyên.",
    "examples": [
      {
        "text": "既然决定了要出国留学，就要全力以赴准备语言考试。",
        "reading": "Jìrán juédìng le yào chūguó liúxué, jiù yào quánlìyǐfù zhǔnbèi yǔyán kǎoshì.",
        "translation": "Một khi đã quyết định đi du học nước ngoài thì phải dốc toàn lực chuẩn bị kỳ thi ngoại ngữ."
      },
      {
        "text": "既然大家意见都一致，我们就按这个方案执行吧。",
        "reading": "Jìrán dàjiā yìjiàn dōu yízhì, wǒmen jiù àn zhè ge fāng'àn zhíxíng ba.",
        "translation": "Đã là ý kiến mọi người đều thống nhất, thì chúng ta cứ triển khai theo phương án này đi."
      },
      {
        "text": "既然身体不舒服，你今天就早点回家休息吧。",
        "reading": "Jìrán shēntǐ bù shūfu, nǐ jīntiān jiù zǎodiǎn huíjiā xiūxi ba.",
        "translation": "Đã thấy trong người không khỏe thì hôm nay bạn cứ về nhà nghỉ ngơi sớm đi nhé."
      },
      {
        "text": "既然来了一趟北京，就一定要去爬长城尝烤鸭。",
        "reading": "Jìrán lái le yí tàng Běijīng, jiù yídìng yào qù pá Chángchéng cháng kǎoyā.",
        "translation": "Đã mất công tới Bắc Kinh một chuyến, thì nhất định phải đi leo Vạn Lý Trường Thành nếm vị vịt quay."
      }
    ]
  },
  {
    "id": "zh-g-hsk5-01",
    "language": "zh",
    "level": "HSK 5",
    "pattern": "与其……不如…… (Thà rằng... còn hơn là... - Lựa chọn so sánh)",
    "meaning": "So sánh hai phương án, người nói bác bỏ phương án trước và lựa chọn phương án sau tốt hơn.",
    "formula": "与其 + [Phương án kém]，不如 / 宁可 + [Phương án tối ưu]",
    "note": "Nhấn mạnh sự chủ động chọn phương án thứ hai mang lại giá trị thiết thực hơn.",
    "examples": [
      {
        "text": "与其坐在这里焦虑抱怨，不如立刻采取切实的行动。",
        "reading": "Yǔqí zuò zài zhèlǐ jiāolǜ bàoyuàn, bùrú lìkè cǎiqǔ qièshí de xíngdòng.",
        "translation": "Thà rằng ngồi đây lo âu than thở, chi bằng hãy lập tức bắt tay vào hành động thực tế."
      },
      {
        "text": "与其盲目追逐热门行业，不如沉下心来深耕自己的专业。",
        "reading": "Yǔqí mángmù zhuīzhú rèmén hángyè, bùrú chénxiàxīn lái shēngēng zìjǐ de zhuānyè.",
        "translation": "Thay vì mù quáng chạy theo các ngành nghề thời thượng, chi bằng lắng lòng dùi mài chuyên sâu lĩnh vực của chính mình."
      },
      {
        "text": "周末与其整天宅在家里刷手机，不如出去大自然散散心。",
        "reading": "Zhōumò yǔqí zhěngtiān zhái zài jiā lǐ shuā shǒujī, bùrú chūqu dàzìrán sànsanxīn.",
        "translation": "Cuối tuần thà rằng ru rú trong nhà lướt điện thoại cả ngày, chi bằng bước ra thiên nhiên hít thở thư thái."
      },
      {
        "text": "与其事后互相推卸责任，不如大家共同寻找补救措施。",
        "reading": "Yǔqí shìhòu hùxiāng tuīxiè zérèn, bùrú dàjiā gòngtóng xúnzhǎo bǔjiù cuòshī.",
        "translation": "Thay vì sau khi sự việc xảy ra lại đổ lỗi cho nhau, chi bằng mọi người cùng nhau tìm kiếm biện pháp cứu vãn khắc phục."
      }
    ]
  },
  {
    "id": "zh-g-hsk5-02",
    "language": "zh",
    "level": "HSK 5",
    "pattern": "难怪…… (Hóa ra là vậy / Thảo nào... - Tìm ra nguyên nhân)",
    "meaning": "Biểu thị sau khi biết được nguyên nhân thì mới vỡ lẽ, hiểu ra lý do tại sao sự việc lại như vậy.",
    "formula": "难怪 (怪不得) + [Hiện tượng / Kết quả đã thấy]",
    "note": "Rất thường dùng trong khẩu ngữ biểu thị sự ngộ ra bất ngờ hợp lý.",
    "examples": [
      {
        "text": "原来他从小在北方长大，难怪普通话讲得这么标准。",
        "reading": "Yuánlái tā cóngxiǎo zài běifāng zhǎngdà, nánguài pǔtōnghuà jiǎng de zhème biāozhǔn.",
        "translation": "Hóa ra cậu ấy từ nhỏ lớn lên ở phương Bắc, thảo nào tiếng Quan thoại nói chuẩn đến thế."
      },
      {
        "text": "今天正好是周末休息日，难怪商场里人山人海。",
        "reading": "Jīntiān zhènghǎo shì zhōumò xiūxìrì, nánguài shāngchǎng lǐ rénshān-rénhǎi.",
        "translation": "Hôm nay đúng vào ngày nghỉ cuối tuần, hèn chi trong trung tâm thương mại người đông như nêm."
      },
      {
        "text": "他每天都在健身房苦练两小时，难怪身材保持得这么好。",
        "reading": "Tā měitiān dōu zài jiànshēnfáng kǔliàn liǎng xiǎoshí, nánguài shēncái bǎochí de zhème hǎo.",
        "translation": "Ngày nào anh ấy cũng khổ luyện 2 tiếng ở phòng gym, hèn gì vóc dáng giữ chuẩn đẹp đến vậy."
      },
      {
        "text": "听说了这个好消息，难怪她今天走起路来都带着笑容。",
        "reading": "Tīngshuō le zhè ge hǎo xiāoxi, nánguài tā jīntiān zǒu qǐ lù lái dōu dàizhe xiàoróng.",
        "translation": "Nghe được tin vui này, hèn chi hôm nay cô ấy bước đi cũng rạng ngời nụ cười trên môi."
      }
    ]
  },
  {
    "id": "zh-g-hsk6-01",
    "language": "zh",
    "level": "HSK 6",
    "pattern": "鉴于…… (Xét thấy / Căn cứ vào... - Văn phong chính luận & hành chính)",
    "meaning": "Đưa ra bối cảnh, lý do xác đáng làm cơ sở căn cứ để đưa ra quyết sách, hành động tiếp theo.",
    "formula": "鉴于 + [Tình hình thực tế / Nguyên nhân quan trọng]，[Quyết định / Biện pháp]",
    "note": "Văn phong trang trọng, thường dùng trong văn bản báo cáo kinh tế, nghị quyết, thông báo chính thức.",
    "examples": [
      {
        "text": "鉴于近期国际原材料价格大幅波动，董事会决定适当调整全年生产预算。",
        "reading": "Jiànyú jìnqī guójì yuáncáiliào jiàgé dàfú bōdòng, dǒngshìhuì juédìng shìdàng tiáozhěng quánnián shēngchǎn yùsuàn.",
        "translation": "Xét thấy giá nguyên vật liệu quốc tế gần đây dao động dữ dội, Hội đồng quản trị quyết định điều chỉnh hợp lý ngân sách sản xuất cả năm."
      },
      {
        "text": "鉴于该项目对城市生态环境的深远影响，专家团队建议启动全方位二次评估。",
        "reading": "Jiànyú gāi xiàngmù duì chéngshì shēngtài huánjìng de shēnyuǎn yǐngxiǎng, zhuānjiā tuánduì jiànyì qǐdòng quán-fāngwèi èrcì pínggū.",
        "translation": "Căn cứ vào tầm ảnh hưởng sâu rộng của dự án này tới môi trường sinh thái đô thị, đội ngũ chuyên gia đề xuất kích hoạt đợt đánh giá toàn diện lần thứ hai."
      },
      {
        "text": "鉴于他在科研攻关中所做出的卓越贡献，学院特授予其终身杰出成就奖。",
        "reading": "Jiànyú tā zài kēyán gōngguān zhōng suǒ zuòchū de zhuóyuè gòngxiàn, xuéyuàn tè shòuyǔ qí zhōngshēn jiéchū chéngjiù jiǎng.",
        "translation": "Xét những cống hiến kiệt xuất của ông trong các công trình nghiên cứu khoa học đột phá, học viện đặc cách trao tặng ông giải thưởng thành tựu xuất sắc trọn đời."
      },
      {
        "text": "鉴于恶劣暴雪天气的持续蔓延，有关部门发布了最高级别的交通橙色预警。",
        "reading": "Jiànyú èliè bàoxuě tiānqì de chíxù mànyán, yǒuguān bùmén fābù le zuìgāo jíbié de jiāotōng chéngsè yùjǐng.",
        "translation": "Căn cứ vào sự lan rộng kéo dài của thời tiết bão tuyết khắc nghiệt, các cơ quan chức năng đã ban bố cảnh báo màu cam cấp cao nhất về giao thông."
      }
    ]
  },
  {
    "id": "zh-g-hsk6-02",
    "language": "zh",
    "level": "HSK 6",
    "pattern": "不免…… (Không tránh khỏi / Khó lòng tránh được)",
    "meaning": "Diễn tả một kết quả hoặc trạng thái tâm lý tất yếu tự nhiên sẽ xảy ra trong hoàn cảnh nhất định.",
    "formula": "Chủ ngữ + 不免 + (会 / 让人) + [Cảm xúc / Trạng thái tất yếu]",
    "note": "Trang trọng hơn 难免, biểu thị sự thấu hiểu tâm lý hoặc quy luật tất nhiên.",
    "examples": [
      {
        "text": "初次踏入陌生的异国他乡，心中不免会涌起几分孤独与思乡之情。",
        "reading": "Chūcì tàrù mòshēng de yìguó-tāxiāng, xīnzhōng bùmiǎn huì yǒngqǐ jǐ fēn gūdú yǔ sīxiāng zhī qíng.",
        "translation": "Lần đầu đặt chân tới vùng đất xứ người xa lạ, trong lòng không tránh khỏi dâng lên đôi phần cô đơn và nỗi nhớ quê hương da diết."
      },
      {
        "text": "面对如此错综复杂的历史纠葛，双方的讨论中不免出现激烈的交锋。",
        "reading": "Miànduì rúcǐ cuòzōng-fùzá de lìshǐ jiūgé, shuāngfāng de tǎolùn zhōng bùmiǎn chūxiàn jīliè de jiāofēng.",
        "translation": "Đối diện với những vướng mắc lịch sử đan xen phức tạp dường ấy, trong thảo luận giữa hai bên khó tránh khỏi xuất hiện những màn tranh luận nảy lửa gay gắt."
      },
      {
        "text": "青年人在探索创新的征途上经验尚浅，跌倒受挫也是不免的事。",
        "reading": "Qīngniánrén zài tànsuǒ chuàngxīn de zhēngtú shang jīngyàn shàng qiǎn, diēdǎo shòucuò yě shì bùmiǎn de shì.",
        "translation": "Người trẻ trên con đường thám hiểm đổi mới sáng tạo kinh nghiệm còn non nớt, việc vấp ngã thất bại cũng là điều khó lòng tránh khỏi."
      },
      {
        "text": "长时间处于超负荷的高压运转之下，员工的身心健康不免会亮起红灯。",
        "reading": "Cháng shíjiān chùyú chāofùhè de gāoyā yùnzhuǎn zhīxià, yuángōng de shēnxīn jiànkāng bùmiǎn huì liàngqǐ hóngdēng.",
        "translation": "Trong thời gian dài ở vào guồng quay áp lực cao quá tải, sức khỏe thân tâm của người lao động không tránh khỏi sẽ bị bật đèn đỏ cảnh báo."
      }
    ]
  }
]

export const chineseKaiwa: KaiwaGroup[] = [
  {
    "id": "zh-k-hsk1-01",
    "language": "zh",
    "level": "HSK 1",
    "situation": "Chào hỏi làm quen & Hỏi thăm quốc tịch",
    "phrases": [
      {
        "text": "你好！很高兴认识你。你叫什么名字？",
        "reading": "Nǐ hǎo! Hěn gāoxìng rènshi nǐ. Nǐ jiào shénme míngzi?",
        "translation": "Xin chào! Rất vui được quen bạn. Bạn tên là gì?"
      },
      {
        "text": "我叫阿黄，我是越南人。你呢？",
        "reading": "Wǒ jiào Ā Huáng, wǒ shì Yuènán rén. Nǐ ne?",
        "translation": "Tôi tên là Hoàng, tôi là người Việt Nam. Còn bạn thì sao?"
      },
      {
        "text": "我是中国人，我是来北京学习的留学生。",
        "reading": "Wǒ shì Zhōngguó rén, wǒ shì lái Běijīng xuéxí de liúxuéshēng.",
        "translation": "Tôi là người Trung Quốc, tôi là lưu học sinh đến Bắc Kinh học tập."
      }
    ]
  },
  {
    "id": "zh-k-hsk1-02",
    "language": "zh",
    "level": "HSK 1",
    "situation": "Mua hoa quả ở chợ & Thanh toán WeChat",
    "phrases": [
      {
        "text": "老板，请问这个红富士苹果一斤多少钱？",
        "reading": "Lǎobǎn, qǐngwèn zhè ge hóngfùshì píngguǒ yì jīn duōshao qián?",
        "translation": "Ông chủ ơi, xin hỏi táo Fuji đỏ này bao nhiêu tiền một cân (500g)?"
      },
      {
        "text": "五块钱一斤，特别甜，称两斤吧！",
        "reading": "Wǔ kuài qián yì jīn, tèbié tián, chēng liǎng jīn ba!",
        "translation": "Năm tệ một cân, ngọt lắm, cân 2 cân nhé!"
      },
      {
        "text": "好的，一共十块钱，我扫微信二维码付给您。",
        "reading": "Hǎo de, yígòng shí kuài qián, wǒ sǎo Wēixìn èrwéimǎ fù gěi nín.",
        "translation": "Vâng được rồi, tổng cộng 10 tệ, tôi quét mã QR WeChat trả bác nhé."
      }
    ]
  },
  {
    "id": "zh-k-hsk2-01",
    "language": "zh",
    "level": "HSK 2",
    "situation": "Đi taxi & Nhắc nhở tài xế đồng hồ km",
    "phrases": [
      {
        "text": "师傅您好，我去北京大学东门，请打表吧。",
        "reading": "Shīfu nín hǎo, wǒ qù Běijīng Dàxué dōngmén, qǐng dǎbiǎo ba.",
        "translation": "Chào bác tài, tôi đến cổng Đông Đại học Bắc Kinh, xin hãy bật đồng hồ tính tiền nhé."
      },
      {
        "text": "好的，这个时间二环路有点堵车，我们走环城高速可以吗？",
        "reading": "Hǎo de, zhè ge shíjiān Èrhuánlù yǒudiǎn dǔchē, wǒmen zǒu huánchéng gāosù kěyǐ ma?",
        "translation": "Được rồi, giờ này đường Vành đai 2 hơi tắc, chúng ta đi cao tốc ven đô được không?"
      },
      {
        "text": "没问题，只要能按时到达就可以，谢谢师傅！",
        "reading": "Méi wèntí, zhǐyào néng ànshí dàodá jiù kěyǐ, xièxie shīfu!",
        "translation": "Không vấn đề gì ạ, chỉ cần đến nơi đúng giờ là được, cảm ơn bác tài!"
      }
    ]
  },
  {
    "id": "zh-k-hsk3-01",
    "language": "zh",
    "level": "HSK 3",
    "situation": "Gọi món ở quán ăn Tứ Xuyên dặn dò khẩu vị",
    "phrases": [
      {
        "text": "服务员，请给我们推荐两个你们店里的招牌特色菜。",
        "reading": "Fúwùyuán, qǐng gěi wǒmen tuījiàn liǎng ge nǐmen diàn lǐ de zhāopái tèsècài.",
        "translation": "Phục vụ ơi, xin giới thiệu cho chúng tôi 2 món đặc sản nức tiếng của quán bạn."
      },
      {
        "text": "水煮牛肉和麻婆豆腐是必点的，香辣过瘾非常下饭。",
        "reading": "Shuǐzhǔ niúròu hé mápó dòufu shì bì diǎn de, xiānglà guòyǐn fēicháng xiàfàn.",
        "translation": "Bò nhúng cay và đậu phụ Ma Bà là món nhất định phải gọi, cay thơm đậm đà rất tốn cơm."
      },
      {
        "text": "我们不太能吃辣，厨师炒菜的时候请做成微辣，少放点花椒。",
        "reading": "Wǒmen bú tài néng chī là, chúshī chǎocài de shíhou qǐng zuòchéng wēilà, shǎo fàng diǎn huājiāo.",
        "translation": "Chúng tôi không ăn cay giỏi lắm, khi đầu bếp xào món xin hãy làm cay nhẹ và cho bớt hạt tiêu hoa tiêu nhé."
      }
    ]
  },
  {
    "id": "zh-k-hsk4-01",
    "language": "zh",
    "level": "HSK 4",
    "situation": "Họp giao ban đầu tuần & Báo cáo tiến độ KPI",
    "phrases": [
      {
        "text": "各位同事早上好，今天周例会我们主要盘点一下本月核心业务的交付情况。",
        "reading": "Gèwèi tóngshì zǎoshang hǎo, jīntiān zhōu lìhuì wǒmen zhǔyào pándiǎn yíxià běn yuè héxīn yèwù de jiāofù qíngkuàng.",
        "translation": "Chào buổi sáng các đồng nghiệp, cuộc họp giao ban tuần hôm nay chúng ta chủ yếu rà soát tình hình bàn giao nghiệp vụ cốt lõi trong tháng."
      },
      {
        "text": "截至上周五，移动端应用测试已经全部通过，预计下周一可以正式上线。",
        "reading": "Jiézhì shàngzhōuwǔ, yídòngduān yìngyòng cèshì yǐjīng quánbù tōngguò, yùjì xiàzhōuyī kěyǐ zhèngshì shàngxiàn.",
        "translation": "Tính đến thứ 6 tuần trước, kiểm thử ứng dụng di động đã vượt qua toàn bộ, dự kiến thứ 2 tuần tới có thể chính thức release lên app store."
      },
      {
        "text": "市场推广团队请务必提前准备好宣传素材，确保上线后引爆首波流量。",
        "reading": "Shìchǎng tuīguǎng tuánduì qǐng wùbì tíqián zhǔnbèi hǎo xuānchuán sùcái, quèbǎo shàngxiàn hòu yǐnbào shǒubō liúliàng.",
        "translation": "Đội ngũ marketing xin nhất thiết chuẩn bị sẵn tài liệu quảng bá từ trước, đảm bảo sau khi ra mắt sẽ bùng nổ làn sóng tương tác đầu tiên."
      }
    ]
  },
  {
    "id": "zh-k-hsk5-01",
    "language": "zh",
    "level": "HSK 5",
    "situation": "Đàm phán hợp đồng kinh tế thương mại song phương",
    "phrases": [
      {
        "text": "针对贵方提出的交货期延后条款，我们原则上表示理解，但付款节点必须相应微调。",
        "reading": "Zhēnduì guìfāng tíchū de jiāohuòqī yánhòu tiáokuǎn, wǒmen yuánzé shang biǎoshì lǐjiě, dàn fùkuǎn jiédiǎn bìxū xiāngyìng wēitiáo.",
        "translation": "Nhắm vào điều khoản lùi thời hạn giao hàng do quý công ty đề xuất, về nguyên tắc chúng tôi bày tỏ sự thấu hiểu, song các mốc thanh toán tiền bắt buộc phải điều chỉnh tương ứng."
      },
      {
        "text": "为保障双方长期共赢合作，我们建议将质保金的留存比例下调至百分之五。",
        "reading": "Wèi bǎozhàng shuāngfāng chángqī gòngyíng hézuò, wǒmen jiànyì jiāng zhìbǎojīn de liúcún bǐlì xiàtiáo zhì bǎifēnzhī wǔ.",
        "translation": "Để bảo đảm sự hợp tác cùng thắng lâu dài giữa hai bên, chúng tôi đề xuất hạ tỷ lệ tiền giữ lại bảo hành xuống mức 5%."
      },
      {
        "text": "这个提议非常具有建设性，我们法务部门审核后今天下午就可以正式签字盖章。",
        "reading": "Zhè ge tíyì fēicháng jùyǒu jiànshèxìng, wǒmen fǎwù bùmén shěnhé hòu jīntiān xiàwǔ jiù kěyǐ zhèngshì qiānzì gāizhāng.",
        "translation": "Đề xuất này mang tính xây dựng rất cao, sau khi phòng pháp chế của chúng tôi thẩm tra xong chiều nay có thể chính thức ký tên đóng dấu hợp đồng."
      }
    ]
  },
  {
    "id": "zh-k-hsk6-01",
    "language": "zh",
    "level": "HSK 6",
    "situation": "Phát biểu khai mạc diễn đàn kinh tế quốc tế & Tầm nhìn chiến lược",
    "phrases": [
      {
        "text": "尊敬的各位来宾、女士们、先生们：非常荣幸能与各位在今日的数字化高峰论坛齐聚一堂。",
        "reading": "Zūnjìng de gèwèi láibīn, nǚshìmen, xiānshengmen: Fēicháng róngxìng néng yǔ gèwèi zài jīnrì de shùzìhuà gāofēng lùntán qíjù yītáng.",
        "translation": "Kính thưa quý vị quan khách, thưa quý bà và quý ông: Thật vinh hạnh biết bao khi được tề tựu cùng quý vị tại diễn đàn thượng đỉnh số hóa ngày hôm nay."
      },
      {
        "text": "身处技术剧烈重构的时代浪潮之中，唯有秉持开放包容与求同存异的胸襟，方能开拓全球合作的新蓝海。",
        "reading": "Shēnchù jìshù jùliè chónggòu de shídài làngcháo zhīzhōng, wéiyǒu bǐngchí kāifàng bāoróng yǔ qiútóng-cúnyì de xiōngjīn, fāng néng kāituò quánqiú hézuò de xīn lánhǎi.",
        "translation": "Đứng giữa làn sóng thời đại nơi công nghệ đang tái cấu trúc dữ dội, chỉ có giữ vững tấm lòng mở rộng bao dung và cầu đồng tồn dị, mới có thể khai phá đại dương xanh mới của hợp tác toàn cầu."
      },
      {
        "text": "衷心祝愿本次论坛取得圆满成功，祝愿各位事业蒸蒸日上、前程似锦！",
        "reading": "Zhōngxīn zhùyuàn běn cì lùntán qǔdé yuánmǎn chénggōng, zhùyuàn gèwèi shìyè zhēngzhēng-rìshàng, qiánchéng sì jǐn!",
        "translation": "Xin chân thành kính chúc diễn đàn thành công tốt đẹp viên mãn, chúc quý vị sự nghiệp ngày một thăng tiến, tiền đồ xán lạn tựa gấm hoa!"
      }
    ]
  }
]
