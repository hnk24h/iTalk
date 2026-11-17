import { Lesson } from '../types'

export const japaneseLessons: Lesson[] = [
  // ==========================================
  // LEVEL N5 - CƠ BẢN & NHẬP MÔN
  // ==========================================
  {
    id: 'ja-01',
    language: 'ja',
    title: 'Hội thoại làm quen & Giới thiệu bản thân',
    level: 'N5',
    category: 'Giao tiếp hàng ngày',
    description: 'Luyện tập ngữ điệu tự nhiên khi lần đầu gặp gỡ và tự giới thiệu trong tiếng Nhật.',
    sentences: [
      {
        id: 'ja-01-s1',
        text: '初めまして、ホアンと申します。ベトナムから来ました。',
        furigana: '初[はじ]めまして、ホアンと申[もう]します。ベトナムから来[き]ました。',
        phonetic: 'Hajimemashite, Hoan to moushimasu. Betonamu kara kimashita.',
        translation: 'Rất vui được gặp bạn, tôi tên là Hoàn. Tôi đến từ Việt Nam.',
        grammarNote: '〜と申します (to moushimasu): Khiêm nhường ngữ của 〜と言います, dùng lịch sự khi giới thiệu tên.'
      },
      {
        id: 'ja-01-s2',
        text: '日本に来てから、もう半年が経ちました。',
        furigana: '日[に]本[ほん]に来[き]てから、もう半[はん]年[とし]が経[た]ちました。',
        phonetic: 'Nihon ni kite kara, mou hantoshi ga tachimashita.',
        translation: 'Kể từ khi đến Nhật Bản, cũng đã được nửa năm trôi qua rồi.',
        grammarNote: '〜てから (te kara): Diễn tả hành động diễn ra sau khi hoàn thành một việc gì đó.'
      },
      {
        id: 'ja-01-s3',
        text: 'どうぞよろしくお願いいたします。',
        furigana: 'どうぞよろしくお願[ねが]いいたします。',
        phonetic: 'Douzo yoroshiku onegai itashimasu.',
        translation: 'Rất mong nhận được sự giúp đỡ của quý vị.',
        grammarNote: 'Câu chào kết thúc kinh điển, cần phát âm tròn và hạ nhẹ giọng ở cuối câu.'
      }
    ]
  },
  {
    id: 'ja-05',
    language: 'ja',
    title: 'Hỏi đường & Đi tàu điện ngầm ở Tokyo',
    level: 'N5',
    category: 'Giao thông & Di chuyển',
    description: 'Mẫu câu hỏi thăm vị trí nhà ga, mua vé tàu điện và hỏi giờ tàu chạy.',
    sentences: [
      {
        id: 'ja-05-s1',
        text: 'すみません、新宿駅へ行きたいのですが、どの電車に乗ればいいですか？',
        furigana: 'すみません、新[しん]宿[じゅく]駅[えき]へ行[い]きたいのですが、どの電[でん]車[しゃ]に乗[の]ればいいですか？',
        phonetic: 'Sumimasen, Shinjuku eki e ikitai no desu ga, dono densha ni noreba ii desu ka?',
        translation: 'Xin lỗi, tôi muốn đến ga Shinjuku thì nên đi chuyến tàu nào ạ?',
        grammarNote: '〜ばいいですか (ba ii desu ka): Mẫu câu hỏi xin lời khuyên hoặc hướng dẫn.'
      },
      {
        id: 'ja-05-s2',
        text: '２番線の山手線に乗ると、１５分ほどで着きますよ。',
        furigana: '２番[ばん]線[せん]の山[やま]手[の]線[せん]に乗[の]ると、１５分[ふん]ほどで着[つ]きますよ。',
        phonetic: 'Ni-bansen no Yamanote-sen ni noru to, juugo-fun hodo de tsukimasu yo.',
        translation: 'Nếu bạn lên tuyến Yamanote ở đường ray số 2 thì khoảng 15 phút là đến nơi đấy.',
        grammarNote: '〜と (to): Câu điều kiện tự nhiên, hễ làm A thì kết quả B sẽ xảy ra.'
      },
      {
        id: 'ja-05-s3',
        text: '切符売り場はあちらの階段の隣にございます。',
        furigana: '切[きっ]符[ぷ]売[う]り場[ば]はあちらの階[かい]段[だん]の隣[となり]にございます。',
        phonetic: 'Kippu uriba wa achira no kaidan no tonari ni gozaimasu.',
        translation: 'Quầy bán vé ở ngay bên cạnh cầu thang đằng kia ạ.',
        grammarNote: 'ございます (gozaimasu): Thể lịch sự tôn kính của あります (arimasu).'
      }
    ]
  },

  // ==========================================
  // LEVEL N4 - SƠ TRUNG CẤP & ĐỜI SỐNG
  // ==========================================
  {
    id: 'ja-02',
    language: 'ja',
    title: 'Đặt hàng & Mua sắm tại siêu thị / Konbini',
    level: 'N4',
    category: 'Mua sắm & Đời sống',
    description: 'Luyện phản xạ nhanh khi giao tiếp với nhân viên thu ngân hoặc hỏi mua đồ.',
    sentences: [
      {
        id: 'ja-02-s1',
        text: 'すみません、温めてもらえますか？レジ袋もお願いします。',
        furigana: 'すみません、温[あたた]めてもらえますか？レジ袋[ぶくろ]もお願[ねが]いします。',
        phonetic: 'Sumimasen, atatamete moraemasu ka? Rejibukuro mo onegai shimasu.',
        translation: 'Xin lỗi, làm ơn hâm nóng giúp tôi được không? Cho tôi xin cả túi ni-lông nữa ạ.',
        grammarNote: '〜てもらえますか (te moraemasu ka): Cấu trúc nhờ vả lịch sự.'
      },
      {
        id: 'ja-02-s2',
        text: 'お支払いはクレジットカードでお願いできますでしょうか。',
        furigana: 'お支払[しはら]いはクレジットカードでお願[ねが]いできますでしょうか。',
        phonetic: 'Oshiharai wa kurejitto kaado de onegai dekimasu deshou ka.',
        translation: 'Tôi có thể thanh toán bằng thẻ tín dụng được không ạ?',
        grammarNote: '〜でお願いできますでしょうか: Cách nói thể hiện sự tinh tế, lịch sự cao khi thanh toán.'
      },
      {
        id: 'ja-02-s3',
        text: 'ポイントカードはお持ちですか？',
        furigana: 'ポイントカードはお持[も]ちですか？',
        phonetic: 'Pointo kaado wa omochi desu ka?',
        translation: 'Quý khách có mang theo thẻ tích điểm không ạ?',
        grammarNote: 'お持ちですか: Tôn kính ngữ của 持っていますか.'
      }
    ]
  },
  {
    id: 'ja-04',
    language: 'ja',
    title: 'Gọi món tại nhà hàng & Yêu cầu dịch vụ',
    level: 'N4',
    category: 'Ăn uống & Dịch vụ',
    description: 'Giao tiếp gọi món, hỏi về nguyên liệu và xin hóa đơn tại quán ăn Nhật Bản.',
    sentences: [
      {
        id: 'ja-04-s1',
        text: '注文をお願いしたいのですが、おすすめの定食は何ですか？',
        furigana: '注[ちゅう]文[もん]をお願[ねが]いしたいのですが、おすすめの定[てい]食[しょく]は何[なん]ですか？',
        phonetic: 'Chuumon wo onegai shitai no desu ga, osusume no teishoku wa nan desu ka?',
        translation: 'Tôi muốn gọi món ạ, set cơm phần nào được quán gợi ý nhiều nhất vậy?',
        grammarNote: '〜たいのですが: Bày tỏ nguyện vọng nhẹ nhàng, mở đầu cho câu hỏi.'
      },
      {
        id: 'ja-04-s2',
        text: '牛肉が苦手なので、豚肉か魚に変更していただけますか？',
        furigana: '牛[ぎゅう]肉[にく]が苦[にが]手[て]なので、豚[ぶた]肉[にく]か魚[さかな]に変[へん]更[こう]していただけますか？',
        phonetic: 'Gyuuniku ga nigate na node, butaniku ka sakana ni henkou shite itadakemasu ka?',
        translation: 'Vì tôi không ăn được thịt bò, quán có thể đổi sang thịt heo hoặc cá giúp tôi được không?',
        grammarNote: '〜していただけますか: Yêu cầu khiêm nhường đối phương làm giúp việc gì.'
      },
      {
        id: 'ja-04-s3',
        text: 'お水のおかわりをいただけますか？お会計は別々でお願いします。',
        furigana: 'お水[みず]のおかわりをいただけますか？お会[かい]計[けい]は別[べつ]々[べつ]でお願[ねが]いします。',
        phonetic: 'Omizu no okawari wo itadakemasu ka? Okaikei wa betsubetsu de onegai shimasu.',
        translation: 'Cho tôi xin thêm nước được không ạ? Hóa đơn tính riêng từng người giúp chúng tôi nhé.',
        grammarNote: 'おかわり (okawari): Xin thêm phần thức ăn/nước uống.'
      }
    ]
  },

  // ==========================================
  // LEVEL N3 - TRUNG CẤP & MÔI TRƯỜNG CÔNG SỞ
  // ==========================================
  {
    id: 'ja-03',
    language: 'ja',
    title: 'Ý kiến trong công việc & Thảo luận dự án',
    level: 'N3',
    category: 'Công việc & Thảo luận',
    description: 'Nâng cao khả năng diễn đạt logic và trình bày quan điểm trong cuộc họp.',
    sentences: [
      {
        id: 'ja-03-s1',
        text: 'この問題について、別の角度から考えてみる必要があると思います。',
        furigana: 'この問[もん]題[だい]について、別[べつ]の角[かく]度[ど]から考[かんが]えてみる必[ひつ]要[よう]があると思[おも]います。',
        phonetic: 'Kono mondai ni tsuite, betsu no kakudo kara kangaete miru hitsuyou ga aru to omoimasu.',
        translation: 'Về vấn đề này, tôi nghĩ chúng ta cần phải thử suy nghĩ từ một góc nhìn khác.',
        grammarNote: '〜について (ni tsuite): Về mặt/Vấn đề; 〜必要がある (hitsuyou ga aru): Cần thiết.'
      },
      {
        id: 'ja-03-s2',
        text: '納期に間に合わせるために、優先順位を見直しましょう。',
        furigana: '納[のう]期[き]に間[ま]に合[あ]わせるために、優[ゆう]先[せん]順[じゅん]位[い]を見[み]直[なお]しましょう。',
        phonetic: 'Nouki ni maniawaseru tame ni, yuusen jun\'i wo minaoshimashou.',
        translation: 'Để kịp thời hạn giao hàng, chúng ta hãy xem xét lại thứ tự ưu tiên nhé.',
        grammarNote: '〜ために (tame ni): Chỉ mục đích rõ ràng; 〜ましょう (mashou): Rủ rê/Đề xuất.'
      },
      {
        id: 'ja-03-s3',
        text: '進捗状況に遅れが生じた場合は、速やかに共有してください。',
        furigana: '進[しん]捗[ちょく]状[じょう]況[きょう]に遅[おく]れが生[しょう]じた場[ば]合[あい]は、速[すみ]やかに共[きょう]有[ゆう]してください。',
        phonetic: 'Shinchoku joukyou ni okure ga shoujita baai wa, sumiyaka ni kyouyuu shite kudasai.',
        translation: 'Trong trường hợp có sự chậm trễ về tiến độ, xin vui lòng chia sẻ thông tin ngay lập tức.',
        grammarNote: '〜場合は (baai wa): Trong trường hợp; 速やかに (sumiyaka ni): Nhanh chóng, mau lẹ.'
      }
    ]
  },
  {
    id: 'ja-06',
    language: 'ja',
    title: 'Xin nghỉ phép & Bàn giao công việc với cấp trên',
    level: 'N3',
    category: 'Môi trường công sở',
    description: 'Cách viết email hoặc trao đổi trực tiếp khi xin nghỉ ốm và nhờ đồng nghiệp hỗ trợ.',
    sentences: [
      {
        id: 'ja-06-s1',
        text: '大変申し訳ありませんが、今朝から高熱が出ているため、本日はお休みをいただけますでしょうか。',
        furigana: '大[たい]変[へん]申[もう]し訳[わけ]ありませんが、今[け]朝[さ]から高[こう]熱[ねつ]が出[で]ているため、本[ほん]日[じつ]はお休[やす]みをいただけますでしょうか。',
        phonetic: 'Taihen moushiwake arimasen ga, kesa kara kounetsu ga dete iru tame, honjitsu wa oyasumi wo itadakemasu deshou ka.',
        translation: 'Tôi vô cùng xin lỗi, nhưng vì từ sáng nay tôi bị sốt cao, nên hôm nay tôi xin phép được nghỉ có được không ạ?',
        grammarNote: '大変申し訳ありませんが: Lời xin lỗi trang trọng mở đầu khi thông báo tin không vui.'
      },
      {
        id: 'ja-06-s2',
        text: '本日の打ち合わせ資料につきましては、田中さんに引き継ぎをお願いいたしました。',
        furigana: '本[ほん]日[じつ]の打[う]ち合[あ]わせ資[し]料[りょう]につきましては、田[た]中[なか]さんに引[ひ]き継[つ]ぎをお願[ねが]いいたしました。',
        phonetic: 'Honjitsu no uchiawase shiryou ni tsukimashite wa, Tanaka-san ni hikitsugi wo onegai itashimashita.',
        translation: 'Về phần tài liệu cuộc họp hôm nay, tôi đã nhờ anh Tanaka tiếp nhận bàn giao rồi ạ.',
        grammarNote: 'につきましては (ni tsukimashite wa): Thể lịch sự của については; 引き継ぎ: Bàn giao.'
      },
      {
        id: 'ja-06-s3',
        text: 'ご迷惑をおかけして恐縮ですが、緊急の際は携帯電話にご連絡ください。',
        furigana: 'ご迷[めい]惑[わく]をおかけして恐[きょう]縮[しゅく]ですが、緊[きん]急[きゅう]の際[さい]は携[けい]帯[たい]電[でん]話[わ]にご連[れん]絡[らく]ください。',
        phonetic: 'Gomeiwaku wo okake shite kyoushuku desu ga, kinkyuu no sai wa keitai denwa ni gorenraku kudasai.',
        translation: 'Tôi rất áy náy vì đã làm phiền mọi người, trong trường hợp khẩn cấp xin hãy liên hệ qua điện thoại di động của tôi.',
        grammarNote: 'ご迷惑をおかけして恐縮ですが: Cụm từ tôn kính thể hiện sự thấu hiểu và tạ lỗi trong văn hóa doanh nghiệp Nhật.'
      }
    ]
  },

  // ==========================================
  // LEVEL N2 - TRUNG CAO CẤP & ĐÀM PHÁN
  // ==========================================
  {
    id: 'ja-07',
    language: 'ja',
    title: 'Thuyết trình & Đàm phán hợp đồng với đối tác',
    level: 'N2',
    category: 'Đàm phán & Thương mại',
    description: 'Kỹ năng trình bày đề xuất giải pháp, lắng nghe phản hồi và thương lượng điều khoản.',
    sentences: [
      {
        id: 'ja-07-s1',
        text: '弊社の新システムを導入することで、業務効率が約３０パーセント向上する見込みでございます。',
        furigana: '弊[へい]社[しゃ]の新[しん]システムを導[どう]入[にゅう]することで、業[ぎょう]務[む]効[こう]率[りつ]が約[やく]３０パーセント向[こう]上[じょう]する見[み]込[こ]みでございます。',
        phonetic: 'Heisha no shin shisutemu wo dounyuu suru koto de, gyoumu kouritsu ga yaku sanjuu paasento koujou suru mikomi de gozaimasu.',
        translation: 'Bằng việc triển khai hệ thống mới của công ty chúng tôi, dự kiến hiệu suất công việc sẽ nâng cao khoảng 30%.',
        grammarNote: '弊社 (heisha): Khiêm nhường xưng hô công ty mình; 〜見込み (mikomi): Kỳ vọng/Dự kiến.'
      },
      {
        id: 'ja-07-s2',
        text: 'ご予算に応じた柔軟なプランもご用意しておりますので、ぜひ前向きにご検討いただけますと幸いです。',
        furigana: 'ご予[よ]算[さん]に応[おう]じた柔[じゅう]軟[なん]なプランもご用[よう]意[い]しておりますので、ぜひ前[まえ]向[む]きにご検[けん]討[とう]いただけますと幸[さいわ]いです。',
        phonetic: 'Goyosan ni oujita juunan na puran mo goyoui shite orimasu node, zehi maemuki ni gokentou itadakemasu to saiwai desu.',
        translation: 'Chúng tôi cũng đã chuẩn bị các phương án linh hoạt phù hợp với ngân sách của quý công ty, vì vậy rất mong quý vị sẽ tích cực cân nhắc.',
        grammarNote: '〜に応じた (ni oujita): Tương ứng, phù hợp với; 〜いただけますと幸いです: Rất vinh hạnh nếu được...'
      },
      {
        id: 'ja-07-s3',
        text: '契約条件の詳細に関しましては、持ち帰って社内で協議の上、改めてご報告申し上げます。',
        furigana: '契[けい]約[やく]条[じょう]件[けん]の詳[しょう]細[さい]に関[かん]しましては、持[も]ち帰[かえ]って社[しゃ]内[ない]で協[きょう]議[ぎ]の上[うえ]、改[あらた]めてご報[ほう]告[こく]申[もう]し上[あ]げます。',
        phonetic: 'Keiyaku jouken no shousai ni kanshimashite wa, mochikaette shanai de kyougi no ue, aratamete gohoukoku moushiagemasu.',
        translation: 'Liên quan đến chi tiết các điều khoản hợp đồng, chúng tôi xin phép mang về thảo luận nội bộ rồi sẽ báo cáo lại sau ạ.',
        grammarNote: '〜の上 (no ue): Sau khi hoàn thành việc gì đó rồi mới thực hiện bước kế tiếp; 申し上げます: Khiêm nhường ngữ.'
      }
    ]
  },
  {
    id: 'ja-08',
    language: 'ja',
    title: 'Phỏng vấn tuyển dụng & Trình bày thế mạnh cá nhân',
    level: 'N2',
    category: 'Phỏng vấn & Xin việc',
    description: 'Cách thể hiện năng lực bản thân, lý do chuyển việc và động lực cống hiến cho công ty.',
    sentences: [
      {
        id: 'ja-08-s1',
        text: '前職ではプロジェクトリーダーとして、多国籍チームのマネジメントを担当しておりました。',
        furigana: '前[ぜん]職[しょく]ではプロジェクトリーダーとして、多[た]国[こく]籍[せき]チームのマネジメントを担[たん]当[とう]しておりました。',
        phonetic: 'Zenshoku de wa purojekuto riidaa to shite, takokuseki chiimu no manejimento wo tantou shite orimashita.',
        translation: 'Tại công việc trước đây, với tư cách là trưởng dự án, tôi đã phụ trách quản lý một đội ngũ đa quốc gia.',
        grammarNote: '〜として (to shite): Với tư cách/vai trò là; 〜ておりました: Khiêm nhường ngữ của 〜ていました.'
      },
      {
        id: 'ja-08-s2',
        text: '困難な課題に直面した際にも、粘り強く原因を分析し、解決策を見出すことが私の強みです。',
        furigana: '困[こん]難[なん]な課[か]題[だい]に直[ちょく]面[めん]した際[さい]にも、粘[ねば]り強[づよ]く原[げん]因[いん]を分[ぶん]析[せき]し、解[かい]決[けつ]策[さく]を見[み]出[いだ]すことが私[わたし]の強[つよ]みです。',
        phonetic: 'Konnan na kadai ni chokumen shita sai ni mo, nebariduyoku gen\'in wo bunseki shi, kaiketsusaku wo miidasu koto ga watashi no tsuyomi desu.',
        translation: 'Ngay cả khi đối mặt với những vấn đề khó khăn, việc kiên trì phân tích nguyên nhân và tìm ra giải pháp chính là thế mạnh của tôi.',
        grammarNote: '直面した際にも: Ngay cả khi đối mặt; 粘り強く (nebariduyoku): Kiên cường, bền bỉ.'
      },
      {
        id: 'ja-08-s3',
        text: 'これまでに培った技術力と異文化適応力を活かし、貴社のグローバル事業に貢献したいと考えております。',
        furigana: 'これまでに培[つちか]った技[ぎ]術[じゅつ]力[りょく]と異[い]文[ぶん]化[か]適[てき]応[おう]力[りょく]を活[い]かし、貴[き]社[しゃ]のグローバル事[じ]業[ぎょう]に貢[こう]献[けん]したいと考[かんが]えております。',
        phonetic: 'Kore made ni tsuchikatta gijutsuryoku to ibunka tekiouryoku wo ikashi, kisha no guroobaru jigyou ni kouken shitai to kangaete orimasu.',
        translation: 'Phát huy năng lực kỹ thuật và khả năng thích ứng đa văn hóa đã tích lũy từ trước đến nay, tôi mong muốn được cống hiến cho mảng kinh doanh toàn cầu của quý công ty.',
        grammarNote: '貴社 (kisha): Tôn kính khi nói về công ty người phỏng vấn; 〜を活かし: Vận dụng/phát huy.'
      }
    ]
  },

  // ==========================================
  // LEVEL N1 - CAO CẤP & PHÂN TÍCH CHIẾN LƯỢC
  // ==========================================
  {
    id: 'ja-09',
    language: 'ja',
    title: 'Phân tích thị trường & Chiến lược mở rộng kinh doanh',
    level: 'N1',
    category: 'Kinh tế & Chiến lược',
    description: 'Ngôn từ học thuật, kinh tế và quản trị chiến lược dành cho cấp quản lý và chuyên gia.',
    sentences: [
      {
        id: 'ja-09-s1',
        text: '少子高齢化の進展に伴い、国内市場の縮小が懸念される中、海外展開の加速は避けて通れない課題です。',
        furigana: '少[しょう]子[し]高[こう]齢[れい]化[か]の進[しん]展[てん]に伴[ともな]い、国[こく]内[ない]市[し]場[じょう]の縮[しゅく]小[しょう]が懸[け]念[ねん]される中[なか]、海[かい]外[がい]展[てん]開[かい]の加[か]速[そく]は避[さ]けて通[とお]れない課[か]題[だい]です。',
        phonetic: 'Shoushikou shrinkage no shinten ni tomonai, kokunai shijou no shukushou ga kenen sareru naka, kaigai tenkai no kasoku wa sakete toorenai kadai desu.',
        translation: 'Cùng với sự gia tăng của già hóa dân số và giảm sinh, giữa lúc thị trường nội địa được quan ngại sẽ thu hẹp, thì việc đẩy mạnh mở rộng ra thị trường nước ngoài là nhiệm vụ không thể né tránh.',
        grammarNote: '〜に伴い (ni tomonai): Kéo theo, đi liền với; 避けて通れない: Không thể né tránh.'
      },
      {
        id: 'ja-09-s2',
        text: '現地ニーズを的確に把握した上で、ローカライズと差別化戦略を両立させることが肝要となります。',
        furigana: '現[げん]地[ち]ニーズを的[てき]確[かく]に把[は]握[あく]した上[うえ]で、ローカライズと差[さ]別[べつ]化[か]戦[せん]略[りゃく]を両[りょう]立[りつ]させることが肝[かん]要[よう]となります。',
        phonetic: 'Genchi niizu wo tekikaku ni haaku shita ue de, rookaraizu to sabetsuka senryaku wo ryouritsu saseru koto ga kanyou to narimasu.',
        translation: 'Sau khi nắm bắt chính xác nhu cầu bản địa, việc kết hợp hài hòa giữa bản địa hóa và chiến lược khác biệt hóa là điều tối quan trọng.',
        grammarNote: '〜た上で (ta ue de): Sau khi...; 肝要 (kanyou): Điều then chốt, cốt lõi tối quan trọng.'
      },
      {
        id: 'ja-09-s3',
        text: '既存の枠組みにとらわれることなく、革新的なビジネスモデルを果敢に模索していく所存です。',
        furigana: '既[き]存[ぞん]の枠[わく]組[ぐ]みにとらわれることなく、革[かく]新[しん]的[てき]なビジネスモデルを果[か]敢[かん]に模[も]索[さく]していく所[しょ]存[ぞん]です。',
        phonetic: 'Kizon no wakugumi ni torawareru koto naku, kakushinteki na bijinesu moderu wo kakan ni mosaku shite iku shozon desu.',
        translation: 'Không bị ràng buộc bởi các khuôn mẫu có sẵn, chúng tôi quyết tâm dũng cảm tìm kiếm những mô hình kinh doanh mang tính đột phá.',
        grammarNote: '〜にとらわれることなく: Không bị gò bó/trói buộc bởi; 所存です (shozon desu): Ý chí, quyết tâm của người nói (văn phong trang trọng).'
      }
    ]
  },
  {
    id: 'ja-10',
    language: 'ja',
    title: 'Xu hướng Trí tuệ nhân tạo (AI) & Tương lai xã hội',
    level: 'N1',
    category: 'Công nghệ & Xã hội',
    description: 'Thảo luận sâu về công nghệ tiên tiến, đạo đức AI và sự chuyển dịch của lực lượng lao động.',
    sentences: [
      {
        id: 'ja-010-s1',
        text: '生成AIの急速な台頭は、産業構造のみならず人間の創造性のあり方にまで根本的な変革を迫っています。',
        furigana: '生[せい]成[せい]AIの急[きゅう]速[そく]な台[たい]頭[とう]は、産[さん]業[ぎょう]構[こう]造[ぞう]のみならず人[にん]間[げん]の創[そう]造[ぞう]性[せい]のあり方[かた]にまで根[こん]本[ぽん]的[てき]な変[へん]革[かく]を迫[せま]っています。',
        phonetic: 'Seisei AI no kyuusoku na taitou wa, sangyou kouzou nomi narazu ningen no souzousei no arikata ni made komponteki na henkaku wo sematte imasu.',
        translation: 'Sự trỗi dậy nhanh chóng của AI tạo sinh không chỉ thay đổi cơ cấu công nghiệp mà còn đặt ra những chuyển biến mang tính căn bản đối với bản chất sáng tạo của con người.',
        grammarNote: '〜のみならず (nomi narazu): Không những... mà còn; 変革を迫る: Thúc bách, đặt ra yêu cầu phải thay đổi.'
      },
      {
        id: 'ja-010-s2',
        text: '利便性の追求の一方で、プライバシー保護や倫理的課題への配慮を怠ってはなりません。',
        furigana: '利[り]便[べん]性[せい]の追[つい]求[きゅう]の一[いっ]方[ぽう]で、プライバシー保[ほ]護[ご]や倫[りん]理[り]的[てき]課[か]題[だい]への配[はい]慮[りょ]を怠[おこた]ってはなりません。',
        phonetic: 'Ribensei no tsuikyuu no ippou de, puraibashii hogo ya rinriteki kadai e no hairyo wo okotatte wa narimasen.',
        translation: 'Một mặt theo đuổi sự tiện lợi, nhưng mặt khác chúng ta tuyệt đối không được lơ là việc bảo vệ quyền riêng tư và các vấn đề đạo đức.',
        grammarNote: '〜一方で (ippou de): Một mặt... mặt khác; 〜てはなりません (te wa narimasen): Cấm chỉ, không được phép làm gì.'
      },
      {
        id: 'ja-010-s3',
        text: 'テクノロジーと人間性が調和した持続可能な未来社会を構築すべく、多角的な議論が求められています。',
        furigana: 'テクノロジーと人[にん]間[げん]性[せい]が調[ちょう]和[わ]した持[じ]続[ぞく]可[か]能[のう]な未[み]来[らい]社[しゃ]会[かい]を構[こう]築[ちく]すべく、多[た]角[かく]的[てき]な議[ぎ]論[ろん]が求[มอ]められています。',
        phonetic: 'Tekunorojii to ningensei ga chouwa shita jizoku kanou na mirai shakai wo kouchiku subeku, takakuteki na giron ga motomerarete imasu.',
        translation: 'Để kiến tạo một xã hội tương lai bền vững nơi công nghệ và tính nhân bản hòa hợp, chúng ta cần phải có những cuộc thảo luận đa chiều.',
        grammarNote: '〜すべく (subeku): Nhằm mục đích, để... (văn viết trang trọng cổ điển).'
      }
    ]
  }
]
