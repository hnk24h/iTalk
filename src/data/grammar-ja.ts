import { GrammarPattern, KaiwaGroup } from '../types'

export const japaneseGrammar: GrammarPattern[] = [
  {
    "id": "ja-g-n5-01",
    "language": "ja",
    "level": "N5",
    "pattern": "〜は〜です (Khẳng định cơ bản: A là B)",
    "meaning": "Dùng để giới thiệu danh tính, quốc tịch, nghề nghiệp hoặc tính chất của chủ ngữ.",
    "formula": "Danh từ 1 + は + Danh từ 2 / Tính từ + です",
    "note": "Trợ từ は viết là 'ha' nhưng phát âm là 'wa'.",
    "examples": [
      {
        "text": "私[わたし]はベトナム人[じん]です。",
        "furigana": "私[わたし]はベトナム人[じん]です。",
        "reading": "Watashi wa betonamu-jin desu.",
        "translation": "Tôi là người Việt Nam."
      },
      {
        "text": "田中[たなか]さんは日本語[にほんご]の先生[せんせい]です。",
        "furigana": "田中[たなか]さんは日本語[にほんご]の先生[せんせい]です。",
        "reading": "Tanaka-san wa nihongo no sensei desu.",
        "translation": "Anh Tanaka là giáo viên tiếng Nhật."
      },
      {
        "text": "富士山[ふじさん]は高[たか]いです。",
        "furigana": "富士山[ふじさん]は高[たか]いです。",
        "reading": "Fujisan wa takai desu.",
        "translation": "Núi Phú Sĩ rất cao."
      },
      {
        "text": "この本[ほん]はとても面白[おもしろ]いです。",
        "furigana": "この本[ほん]はとても面白[おもしろ]いです。",
        "reading": "Kono hon wa totemo omoshiroi desu.",
        "translation": "Quyển sách này rất thú vị."
      }
    ]
  },
  {
    "id": "ja-g-n5-02",
    "language": "ja",
    "level": "N5",
    "pattern": "〜があります / 〜がいます (Có vật / Có người & động vật)",
    "meaning": "Biểu thị sự tồn tại hoặc sở hữu của đồ vật (あります) hoặc người, động vật (います).",
    "formula": "Địa điểm + に + Danh từ + が + あります / います",
    "note": "あります dùng cho đồ vật, cây cối (vật vô tri). います dùng cho người và động vật di chuyển được.",
    "examples": [
      {
        "text": "机[つくえ]の上[うえ]に本[ほん]があります。",
        "furigana": "机[つくえ]の上[うえ]に本[ほん]があります。",
        "reading": "Tsukue no ue ni hon ga arimasu.",
        "translation": "Trên bàn có một cuốn sách."
      },
      {
        "text": "教室[きょうしつ]に学生[がくせい]が三人[さんにん]います。",
        "furigana": "教室[きょうしつ]に学生[がくせい]が三人[さんにん]います。",
        "reading": "Kyoushitsu ni gakusei ga sannin imasu.",
        "translation": "Trong phòng học có 3 học sinh."
      },
      {
        "text": "庭[にわ]に大[おお]きな木[き]があります。",
        "furigana": "庭[にわ]に大[おお]きな木[き]があります。",
        "reading": "Niwa ni ookina ki ga arimasu.",
        "translation": "Trong vườn có một cái cây to."
      },
      {
        "text": "公園[こうえん]に可愛[かわい]い犬[いぬ]がいます。",
        "furigana": "公園[こうえん]に可愛[かわい]い犬[いぬ]がいます。",
        "reading": "Kouen ni kawaii inu ga imasu.",
        "translation": "Ở công viên có một chú cún đáng yêu."
      }
    ]
  },
  {
    "id": "ja-g-n5-03",
    "language": "ja",
    "level": "N5",
    "pattern": "〜てください (Xin hãy làm gì / Yêu cầu lịch sự)",
    "meaning": "Dùng để nhờ vả, yêu cầu ai đó làm việc gì một cách lịch sự, thân mật.",
    "formula": "Động từ thể て + ください",
    "note": "Với cấp trên hoặc khách hàng trang trọng, nên dùng 〜ていただけませんか.",
    "examples": [
      {
        "text": "名前[なまえ]を書[か]いてください。",
        "furigana": "名前[なまえ]を書[か]いてください。",
        "reading": "Namae wo kaite kudasai.",
        "translation": "Xin hãy viết tên của bạn vào đây."
      },
      {
        "text": "窓[まど]を開[あ]けてください。",
        "furigana": "窓[まど]を開[あ]けてください。",
        "reading": "Mado wo akete kudasai.",
        "translation": "Làm ơn hãy mở cửa sổ giúp tôi."
      },
      {
        "text": "日本語[にほんご]で話[はな]してください。",
        "furigana": "日本語[にほんご]で話[はな]してください。",
        "reading": "Nihongo de hanashite kudasai.",
        "translation": "Xin hãy nói bằng tiếng Nhật."
      },
      {
        "text": "もう一度[いちど]言[い]ってください。",
        "furigana": "もう一度[いちど]言[い]ってください。",
        "reading": "Mou ichido itte kudasai.",
        "translation": "Xin hãy nhắc lại một lần nữa."
      }
    ]
  },
  {
    "id": "ja-g-n5-04",
    "language": "ja",
    "level": "N5",
    "pattern": "〜てもいいです (Làm gì đó được không / Cho phép)",
    "meaning": "Xin phép làm gì đó hoặc biểu thị sự cho phép người khác làm gì.",
    "formula": "Động từ thể て + もいいです (か)",
    "note": "Khi xin phép: 〜てもいいですか (Tôi làm ... có được không?).",
    "examples": [
      {
        "text": "写真[しゃしん]を撮[と]ってもいいですか。",
        "furigana": "写真[しゃしん]を撮[と]ってもいいですか。",
        "reading": "Shashin wo totte mo ii desu ka.",
        "translation": "Tôi chụp ảnh ở đây có được không ạ?"
      },
      {
        "text": "ここに座[すわ]ってもいいですよ。",
        "furigana": "ここに座[すわ]ってもいいですよ。",
        "reading": "Koko ni suwatte mo ii desu yo.",
        "translation": "Bạn ngồi ở đây cũng được nhé."
      },
      {
        "text": "辞書[じしょ]を使[つか]ってもいいですか。",
        "furigana": "辞書[じしょ]を使[つか]ってもいいですか。",
        "reading": "Jisho wo tsukatte mo ii desu ka.",
        "translation": "Tôi có thể dùng từ điển được không?"
      },
      {
        "text": "タバコを吸[す]ってはいけません。",
        "furigana": "タバコを吸[す]ってはいけません。",
        "reading": "Tabako wo sutte wa ikemasen.",
        "translation": "Không được phép hút thuốc (Cấm đoán ngược lại)."
      }
    ]
  },
  {
    "id": "ja-g-n5-05",
    "language": "ja",
    "level": "N5",
    "pattern": "〜たいです (Muốn làm gì / Nguyện vọng)",
    "meaning": "Biểu thị nguyện vọng, ý muốn làm hành động gì đó của người nói.",
    "formula": "Động từ thể ます bỏ ます + たいです",
    "note": "Chỉ dùng cho ngôi thứ nhất (tôi). Muốn hỏi người khác dùng 〜たいですか, nói về người thứ ba dùng 〜たがっています.",
    "examples": [
      {
        "text": "日本[にほん]へ行[い]きたいです。",
        "furigana": "日本[にほん]へ行[い]きたいです。",
        "reading": "Nihon e ikitai desu.",
        "translation": "Tôi muốn đi du lịch Nhật Bản."
      },
      {
        "text": "温[あたた]かいお茶[ちゃ]を飲[の]みたいです。",
        "furigana": "温[あたた]かいお茶[ちゃ]を飲[の]みたいです。",
        "reading": "Atatakai ocha wo nomitai desu.",
        "translation": "Tôi muốn uống một tách trà nóng."
      },
      {
        "text": "新[あたら]しいパソコンを買[か]いたいです。",
        "furigana": "新[あたら]しいパソコンを買[か]いたいです。",
        "reading": "Atarashii pasokon wo kaitai desu.",
        "translation": "Tôi muốn mua một chiếc máy tính xách tay mới."
      },
      {
        "text": "今週末[こんしゅうまつ]は家[いえ]でゆっくり休[やす]みたいです。",
        "furigana": "今週末[こんしゅうまつ]は家[いえ]でゆっくり休[やす]みたいです。",
        "reading": "Konshuumatsu wa ie de yukkuri yasumitai desu.",
        "translation": "Cuối tuần này tôi muốn ở nhà nghỉ ngơi thong thả."
      }
    ]
  },
  {
    "id": "ja-g-n5-06",
    "language": "ja",
    "level": "N5",
    "pattern": "〜てから (Sau khi làm V1 thì làm V2)",
    "meaning": "Diễn tả trình tự thời gian dứt khoát, hành động 2 chỉ diễn ra sau khi hành động 1 hoàn tất.",
    "formula": "Động từ 1 thể て + から、Động từ 2",
    "note": "Nhấn mạnh thứ tự trước sau rõ ràng.",
    "examples": [
      {
        "text": "ご飯[はん]を食[た]べてから、薬[くすり]を飲[の]みます。",
        "furigana": "ご飯[はん]を食[た]べてから、薬[くすり]を飲[の]みます。",
        "reading": "Gohan wo tabete kara, kusuri wo nomimasu.",
        "translation": "Sau khi ăn cơm xong, tôi uống thuốc."
      },
      {
        "text": "手[て]を洗[あら]ってから、食事[しょくじ]をします。",
        "furigana": "手[て]を洗[あら]ってから、食事[しょくじ]をします。",
        "reading": "Te wo aratte kara, shokuji wo shimasu.",
        "translation": "Sau khi rửa tay sạch sẽ, tôi mới dùng bữa."
      },
      {
        "text": "大学[だいがく]を卒業[そつぎょう]してから、日本[にほん]の会社[かいしゃ]に入[はい]りました。",
        "furigana": "大学[だいがく]を卒業[そつぎょう]してから、日本[にほん]の会社[かいしゃ]に入[はい]りました。",
        "reading": "Daigaku wo sotsugyou shite kara, nihon no kaisha ni hairimashita.",
        "translation": "Sau khi tốt nghiệp đại học, tôi đã vào làm việc tại công ty Nhật."
      },
      {
        "text": "よく考[かんが]えてから、返事[へんじ]をしてください。",
        "furigana": "よく考[かんが]えてから、返事[へんじ]をしてください。",
        "reading": "Yoku kangaete kara, henji wo shite kudasai.",
        "translation": "Hãy suy nghĩ kỹ lưỡng rồi hẵng trả lời nhé."
      }
    ]
  },
  {
    "id": "ja-g-n5-07",
    "language": "ja",
    "level": "N5",
    "pattern": "〜たことがあります (Đã từng trải nghiệm làm gì)",
    "meaning": "Diễn tả trải nghiệm từng xảy ra trong quá khứ như một kinh nghiệm sống.",
    "formula": "Động từ thể た + ことがあります",
    "note": "Phủ định: 〜たことがありません (Chưa từng làm bao giờ).",
    "examples": [
      {
        "text": "富士山[ふじさん]に登[のぼ]ったことがあります。",
        "furigana": "富士山[ふじさん]に登[のぼ]ったことがあります。",
        "reading": "Fujisan ni nobotta koto ga arimasu.",
        "translation": "Tôi đã từng leo núi Phú Sĩ."
      },
      {
        "text": "日本[にほん]のお酒[さけ]を飲[の]んだことがありますか。",
        "furigana": "日本[にほん]のお酒[さけ]を飲[の]んだことがありますか。",
        "reading": "Nihon no osake wo nonda koto ga arimasu ka.",
        "translation": "Bạn đã từng uống rượu sake Nhật Bản chưa?"
      },
      {
        "text": "刺身[さしみ]を食[た]べたことがありません。",
        "furigana": "刺身[さしみ]を食[た]べたことがありません。",
        "reading": "Sashimi wo tabeta koto ga arimasen.",
        "translation": "Tôi chưa từng ăn món gỏi sống sashimi bao giờ."
      },
      {
        "text": "歌舞伎[かぶき]を見[み]たことがあります。",
        "furigana": "歌舞伎[かぶき]を見[み]たことがあります。",
        "reading": "Kabuki wo mita koto ga arimasu.",
        "translation": "Tôi đã từng xem kịch kĩ vũ Kabuki truyền thống."
      }
    ]
  },
  {
    "id": "ja-g-n5-08",
    "language": "ja",
    "level": "N5",
    "pattern": "〜なければなりません (Bắt buộc phải làm gì)",
    "meaning": "Diễn tả nghĩa vụ, bổn phận hoặc việc bắt buộc phải làm theo quy định/tự nhiên.",
    "formula": "Động từ thể ない bỏ い + ければなりません",
    "note": "Khẩu ngữ thân mật thường nói rút gọn thành 〜なきゃ / 〜なくちゃ.",
    "examples": [
      {
        "text": "明日[あした]は朝[あさ]六時[ろくじ]に起[お]きなければなりません。",
        "furigana": "明日[あした]は朝[あさ]六時[ろくじ]に起[お]きなければなりません。",
        "reading": "Ashita wa asa rokuji ni okinakereba narimasen.",
        "translation": "Ngày mai tôi phải thức dậy lúc 6 giờ sáng."
      },
      {
        "text": "毎日[まいにち]漢字[かんじ]を練習[れんしゅう]しなければなりません。",
        "furigana": "毎日[まいにち]漢字[かんじ]を練習[れんしゅう]しなければなりません。",
        "reading": "Mainichi kanji wo renshuu shinakereba narimasen.",
        "translation": "Mỗi ngày tôi đều phải luyện viết chữ Hán."
      },
      {
        "text": "図書館[としょかん]の本[ほん]を返[かえ]さなければなりません。",
        "furigana": "図書館[としょかん]の本[ほん]を返[かえ]さなければなりません。",
        "reading": "Toshokan no hon wo kaesanakereba narimasen.",
        "translation": "Tôi phải đem trả sách cho thư viện."
      },
      {
        "text": "パスポートを持[も]って行[い]かなければなりません。",
        "furigana": "パスポートを持[も]って行[い]かなければなりません。",
        "reading": "Pasupooto wo motte ikanakereba narimasen.",
        "translation": "Tôi bắt buộc phải mang theo hộ chiếu đi cùng."
      }
    ]
  },
  {
    "id": "ja-g-n4-01",
    "language": "ja",
    "level": "N4",
    "pattern": "〜んです / 〜のだ (Giải thích lý do / Nhấn mạnh bối cảnh)",
    "meaning": "Dùng để giải thích nguyên nhân, lý do một cách thuyết phục hoặc tìm kiếm thông tin tò mò.",
    "formula": "Thể thông thường (Futsuukei) + んです (Tính từ na / Danh từ + なんです)",
    "note": "Được người Nhật sử dụng với tần suất cực cao trong giao tiếp đời sống hàng ngày.",
    "examples": [
      {
        "text": "頭[あたま]が痛[いた]いんです。早退[そうたい]してもいいですか。",
        "furigana": "頭[あたま]が痛[いた]いんです。早退[そうたい]してもいいですか。",
        "reading": "Atama ga itai n desu. Soutai shite mo ii desu ka.",
        "translation": "Tôi bị đau đầu (giải thích lý do). Tôi có thể xin về sớm được không ạ?"
      },
      {
        "text": "どうして遅刻[ちこく]したんですか。電車[でんしゃ]が止[と]まったんです。",
        "furigana": "どうして遅刻[ちこく]したんですか。電車[でんしゃ]が止[と]まったんです。",
        "reading": "Doushite chikoku shita n desu ka. Densha ga tomatta n desu.",
        "translation": "Tại sao bạn lại đến muộn vậy? Vì tàu điện bị dừng đột xuất ạ."
      },
      {
        "text": "どこでその服[ふく]を買[か]ったんですか。",
        "furigana": "どこでその服[ふく]を買[か]ったんですか。",
        "reading": "Doko de sono fuku wo katta n desu ka.",
        "translation": "Bạn đã mua bộ quần áo đẹp đó ở đâu thế?"
      },
      {
        "text": "日本語[にほんご]がとても上手[じょうず]ですね。たくさん練習[れんしゅう]したんです。",
        "furigana": "日本語[にほんご]がとても上手[じょうず]ですね。たくさん練習[れんしゅう]したんです。",
        "translation": "Tiếng Nhật của bạn giỏi quá! Vì tôi đã luyện tập rất nhiều đấy ạ."
      }
    ]
  },
  {
    "id": "ja-g-n4-02",
    "language": "ja",
    "level": "N4",
    "pattern": "〜たら (Nếu / Sau khi... điều kiện giả định & thời gian)",
    "meaning": "Diễn tả điều kiện giả định (nếu...) hoặc sự kiện chắc chắn xảy ra trong tương lai (sau khi...).",
    "formula": "Động từ thể た + ら (Thể quá khứ + ら)",
    "note": "Vế sau có thể là mệnh lệnh, ý chí, nguyện vọng của người nói (linh hoạt hơn ば và と).",
    "examples": [
      {
        "text": "雨[あめ]が降[ふ]ったら、出[で]かけません。",
        "furigana": "雨[あめ]が降[ふ]ったら、出[で]かけません。",
        "reading": "Ame ga futtara, dekakemasen.",
        "translation": "Nếu trời mưa thì tôi sẽ không ra ngoài."
      },
      {
        "text": "駅[えき]に着[つ]いたら、電話[でんわ]してください。",
        "furigana": "駅[えき]に着[つ]いたら、電話[でんわ]してください。",
        "reading": "Eki ni tsuitara, denwa shite kudasai.",
        "translation": "Sau khi đến ga tàu, xin hãy gọi điện cho tôi nhé."
      },
      {
        "text": "安[やす]かったら、買[か]いたいです。",
        "furigana": "安[やす]かったら、買[か]いたいです。",
        "reading": "Yasukattara, kaitai desu.",
        "translation": "Nếu giá rẻ thì tôi muốn mua."
      },
      {
        "text": "時間[じかん]があったら、一緒[いっしょ]にお茶[ちゃ]を飲[の]みませんか。",
        "furigana": "時間[じかん]があったら、一緒[いっしょ]にお茶[ちゃ]を飲[の]みませんか。",
        "reading": "Jikan ga attara, issho ni ocha wo nomimasen ka.",
        "translation": "Nếu có thời gian, bạn cùng đi uống trà với tôi nhé?"
      }
    ]
  },
  {
    "id": "ja-g-n4-03",
    "language": "ja",
    "level": "N4",
    "pattern": "〜ように (Để mà... mục đích)",
    "meaning": "Diễn tả mục đích thực hiện hành động, vế trước thường là động từ chỉ khả năng hoặc tự động từ.",
    "formula": "Động từ thể từ điển / thể ない + ように、Hành động",
    "note": "Khác với 〜ために (động từ có ý chí), 〜ように thường đi với động từ không ý chí hoặc thể khả năng.",
    "examples": [
      {
        "text": "忘[わす]れないように、メモを取[と]ります。",
        "furigana": "忘[わす]れないように、メモを取[と]ります。",
        "reading": "Wasurenai you ni, memo wo torimasu.",
        "translation": "Tôi ghi chép lại để không bị quên."
      },
      {
        "text": "日本語[にほんご]が話[はな]せるように、毎日[まいにち]練習[れんしゅう]しています。",
        "furigana": "日本語[にほんご]が話[はな]せるように、毎日[まいにち]練習[れんしゅう]しています。",
        "reading": "Nihongo ga hanaseru you ni, mainichi renshuu shite imasu.",
        "translation": "Tôi luyện tập mỗi ngày để có thể nói được tiếng Nhật."
      },
      {
        "text": "風邪[かぜ]をひかないように、気[き]をつけてください。",
        "furigana": "風邪[かぜ]をひかないように、気[き]をつけてください。",
        "reading": "Kaze wo hikanai you ni, ki wo tsukete kudasai.",
        "translation": "Xin hãy cẩn thận giữ gìn để không bị cảm lạnh nhé."
      },
      {
        "text": "後[うし]ろの人[ひと]にも見[み]えるように、大[おお]きく書[か]きます。",
        "furigana": "後[うし]ろの人[ひと]にも見[み]えるように、大[おお]きく書[か]きます。",
        "reading": "Ushiro no hito ni mo mieru you ni, ookiku kakimasu.",
        "translation": "Tôi viết chữ to để người ngồi phía sau cũng có thể nhìn thấy."
      }
    ]
  },
  {
    "id": "ja-g-n4-04",
    "language": "ja",
    "level": "N4",
    "pattern": "〜そうです (Nghe nói là / Trông có vẻ)",
    "meaning": "1. Nghe nói (truyền văn): Thể thông thường + そうです. 2. Trông có vẻ (phán đoán mắt thấy): Thân từ ます bỏ ます + そうです.",
    "formula": "1. Động từ/Tính từ thể thường + そうです (nghe nói). 2. V-ます (bỏ ます) + そうです (có vẻ)",
    "note": "おいしそうです (Trông có vẻ ngon - mắt thấy); おいしいそうです (Nghe đồn là ngon - nghe kể lại).",
    "examples": [
      {
        "text": "天気予報[てんきよほう]によると、明日[あした]は雨[あめ]が降[ふ]るそうです。",
        "furigana": "天気予報[てんきよほう]によると、明日[あした]は雨[あめ]が降[ふ]るそうです。",
        "reading": "Tenki yohou ni yoru to, ashita wa ame ga furu sou desu.",
        "translation": "Theo dự báo thời tiết, nghe nói ngày mai trời sẽ mưa."
      },
      {
        "text": "この料理[りょうり]はとてもおいしそうです。",
        "furigana": "この料理[りょうり]はとてもおいしそうです。",
        "reading": "Kono ryouri wa totemo oishisou desu.",
        "translation": "Món ăn này trông có vẻ rất ngon miệng."
      },
      {
        "text": "彼[かれ]は忙[いそが]しそうに仕事[しごと]をしています。",
        "furigana": "彼[かれ]は忙[いそが]しそうに仕事[しごと]をしています。",
        "reading": "Kare wa isogashisou ni shigoto wo shite imasu.",
        "translation": "Anh ấy đang làm việc trông có vẻ rất bận rộn."
      },
      {
        "text": "田中[たなか]さんは来月[らいげつ]結婚[けっこん]するそうです。",
        "furigana": "田中[たなか]さんは来月[らいげつ]結婚[けっこん]するそうです。",
        "reading": "Tanaka-san wa raigetsu kekkon suru sou desu.",
        "translation": "Nghe nói anh Tanaka tháng sau sẽ kết hôn đấy."
      }
    ]
  },
  {
    "id": "ja-g-n3-01",
    "language": "ja",
    "level": "N3",
    "pattern": "〜ことにする / 〜ことになる (Quyết định của bản thân / Quy định tập thể)",
    "meaning": "ことにする: Quyết định chủ quan do chính mình đưa ra. ことになる: Quy định khách quan, việc đã được quyết định từ bên ngoài.",
    "formula": "Động từ thể từ điển / thể ない + ことにする / ことになる",
    "note": "ことにしている: Duy trì thói quen tự mình đặt ra (ví dụ: mỗi sáng chạy bộ).",
    "examples": [
      {
        "text": "健康[けんこう]のために、毎日[まいにち]ジョギングすることにしました。",
        "furigana": "健康[けんこう]のために、毎日[まいにち]ジョギングすることにしました。",
        "reading": "Kenkou no tame ni, mainichi jogingu suru koto ni shimashita.",
        "translation": "Vì sức khỏe, tôi đã quyết định mỗi ngày sẽ chạy bộ rèn luyện."
      },
      {
        "text": "来月[らいげつ]から大阪[おおさか]の支社[ししゃ]へ転勤[てんきん]することになりました。",
        "furigana": "来月[らいげつ]から大阪[おおさか]の支社[ししゃ]へ転勤[てんきん]することになりました。",
        "reading": "Raigetsu kara Oosaka no shisha e tenkin suru koto ni narimashita.",
        "translation": "Từ tháng sau tôi đã có quyết định được điều chuyển công tác đến chi nhánh Osaka."
      },
      {
        "text": "お酒[さけ]を飲[の]まないことにしています。",
        "furigana": "お酒[さけ]を飲[の]まないことにしています。",
        "reading": "Osake wo nomanai koto ni shite imasu.",
        "translation": "Tôi đang duy trì thói quen kiêng không uống rượu bia."
      },
      {
        "text": "社内[しゃない]では英語[えいご]で会議[かいぎ]を行う[おこなう]ことになっています。",
        "furigana": "社内[しゃない]では英語[えいご]で会議[かいぎ]を行う[おこなう]ことになっています。",
        "reading": "Shanai dewa eigo de kaigi wo okonau koto ni natte imasu.",
        "translation": "Trong công ty có quy định các cuộc họp đều phải tiến hành bằng tiếng Anh."
      }
    ]
  },
  {
    "id": "ja-g-n3-02",
    "language": "ja",
    "level": "N3",
    "pattern": "〜わけにはいかない (Không thể nào làm vì đạo đức / chuẩn mực xã hội)",
    "meaning": "Về mặt tâm lý, đạo đức, lương tâm hoặc hoàn cảnh xã hội thì không thể làm việc đó được.",
    "formula": "Động từ thể từ điển + わけにはいかない (phủ định: V-ない + わけにはいかない = buộc phải làm)",
    "note": "Khác với 〜できない (năng lực thể chất), mẫu này nhấn mạnh rào cản đạo đức/trách nhiệm.",
    "examples": [
      {
        "text": "大事[だいじ]な会議[かいぎ]がありますから、休[やす]むわけにはいきません。",
        "furigana": "大事[だいじ]な会議[かいぎ]がありますから、休[やす]むわけにはいきません。",
        "reading": "Daiji na kaigi ga arimasu kara, yasumu wake ni wa ikimasen.",
        "translation": "Vì có cuộc họp rất quan trọng nên tôi không thể nào nghỉ được."
      },
      {
        "text": "上司[じょうし]に頼[たの]まれた仕事[しごと]なので、断る[ことわる]わけにはいかない。",
        "furigana": "上司[じょうし]に頼[たの]まれた仕事[しごと]なので、断る[ことわる]わけにはいかない。",
        "reading": "Joushi ni tanomareta shigoto nano de, kotowaru wake ni wa ikanai.",
        "translation": "Vì là công việc cấp trên nhờ vả nên tôi không thể nào từ chối được."
      },
      {
        "text": "どんなに辛く[つらく]ても、途中[とちゅう]で諦める[あきらめる]わけにはいかない。",
        "furigana": "どんなに辛く[つらく]ても、途中[とちゅう]で諦める[あきらめる]わけにはいかない。",
        "reading": "Dore dake tsurakute mo, tochuu de akirameru wake ni wa ikanai.",
        "translation": "Dù có vất vả cay đắng đến đâu, tôi cũng không thể bỏ cuộc giữa chừng được."
      },
      {
        "text": "お世話[せわ]になった先生[せんせい]なので、結婚式[けっこんしき]に行かない[いかない]わけにはいかない。",
        "furigana": "お世話[せわ]になった先生[せんせい]なので、結婚式[けっこんしき]に行かない[いかない]わけにはいかない。",
        "reading": "Osewa ni natta sensei nano de, kekkonshiki ni ikanai wake ni wa ikanai.",
        "translation": "Vì là người thầy đã chăm sóc giúp đỡ tôi rất nhiều nên đám cưới tôi không thể không đi (buộc phải đi)."
      }
    ]
  },
  {
    "id": "ja-g-n2-01",
    "language": "ja",
    "level": "N2",
    "pattern": "〜に対して (Đối với / Trái ngược với... so sánh & đối tượng)",
    "meaning": "1. Hướng tới một đối tượng cụ thể (thái độ, hành vi). 2. Biểu thị sự tương phản rõ rệt giữa hai sự việc.",
    "formula": "Danh từ + に対して / に対する + Danh từ",
    "note": "Rất phổ biến trong văn phong công sở, đàm phán hợp đồng và báo chí chính luận.",
    "examples": [
      {
        "text": "お客様[おきゃくさま]に対して、丁寧[ていねい]な言葉遣い[ことばづかい]をしなければならない。",
        "furigana": "お客様[おきゃくさま]に対して、丁寧[ていねい]な言葉遣い[ことばづかい]をしなければならない。",
        "reading": "Okyaku-sama ni taishite, teinei na kotobazukai wo shinakereba naranai.",
        "translation": "Đối với khách hàng, bắt buộc phải dùng cách ăn nói lịch sự nhã nhặn."
      },
      {
        "text": "兄[あに]が活発[かっぱつ]な性格[せいかく]であるのに対して、弟[おとうと]は静か[しずか]だ。",
        "furigana": "兄[あに]が活発[かっぱつ]な性格[せいかく]であるのに対して、弟[おとうと]は静か[しずか]だ。",
        "translation": "Trái ngược với người anh có tính cách hoạt bát năng nổ, người em lại rất trầm tính."
      },
      {
        "text": "環境[かんきょう]問題[もんだい]に対する市民[しみん]の関心[かんしん]が急激[きゅうげき]に高[たか]まっている。",
        "furigana": "環境[かんきょう]問題[もんだい]に対する市民[しみん]の関心[かんしん]が急激[きゅうげき]に高[たか]まっている。",
        "translation": "Mối quan tâm của người dân đối với vấn đề môi trường đang gia tăng nhanh chóng."
      },
      {
        "text": "厳格[げんかく]な上司[じょうし]に対して、同僚[どうりょう]たちはいつも緊張[きんちょう]している。",
        "furigana": "厳格[げんかく]な上司[じょうし]に対して、同僚[どうりょう]たちはいつも緊張[きんちょう]している。",
        "translation": "Trước người sếp nghiêm khắc, các đồng nghiệp lúc nào cũng cảm thấy căng thẳng."
      }
    ]
  },
  {
    "id": "ja-g-n2-02",
    "language": "ja",
    "level": "N2",
    "pattern": "〜ざるを得ない (Đành phải / Buộc lòng phải...)",
    "meaning": "Mặc dù bản thân không hề muốn làm, nhưng vì tình thế ép buộc nên buộc lòng đành phải làm.",
    "formula": "Động từ thể ない bỏ ない + ざるを得ない (Đặc biệt: する ➔ せざるを得ない)",
    "note": "Mang sắc thái bất đắc dĩ, không còn lựa chọn nào khác.",
    "examples": [
      {
        "text": "台風[たいふう]の接近[せっきん]により、旅行[りょこう]を中止[ちゅうし]せざるを得ない。",
        "furigana": "台風[たいふう]の接近[せっきん]により、旅行[りょこう]を中止[ちゅうし]せざるを得ない。",
        "translation": "Do cơn bão đang tiến lại gần, chúng tôi buộc lòng phải hủy bỏ chuyến du lịch."
      },
      {
        "text": "証拠[しょうこ]が揃って[そろって]いる以上[いじょう]、罪[つみ]を認め[みとめ]ざるを得ない。",
        "furigana": "証拠[しょうこ]が揃って[そろって]いる以上[いじょう]、罪[つみ]を認め[みとめ]ざるを得ない。",
        "translation": "Một khi bằng chứng đã rõ ràng rành rành, anh ta đành phải nhận tội."
      },
      {
        "text": "これほどコストが高騰[こうとう]すると、値上げ[ねあげ]せざるを得ない。",
        "furigana": "これほどコストが高騰[こうとう]すると、値上げ[ねあげ]せざるを得ない。",
        "translation": "Khi chi phí leo thang đến mức này, doanh nghiệp đành phải tăng giá bán."
      },
      {
        "text": "会社[かいしゃ]の方針[ほうしん]には納得[なっとく]できないが、従わざるを得ない[したがわざるをえない]。",
        "furigana": "会社[かいしゃ]の方針[ほうしん]には納得[なっとく]できないが、従わざるを得ない[したがわざるをえない]。",
        "translation": "Dù không thực sự đồng tình với phương châm của công ty, nhưng tôi đành phải tuân theo."
      }
    ]
  },
  {
    "id": "ja-g-n1-01",
    "language": "ja",
    "level": "N1",
    "pattern": "〜ならでは (Chỉ có thể là... độc nhất vô nhị)",
    "meaning": "Chỉ có đối tượng đó mới có phẩm chất, nét đặc trưng tuyệt vời đó mà những nơi khác không thể có được.",
    "formula": "Danh từ + ならでは (の + Danh từ) / ならではだ",
    "note": "Luôn dùng để khen ngợi, ca ngợi giá trị độc bản cao quý.",
    "examples": [
      {
        "text": "京都[きょうと]ならではの風情[ふぜい]ある町並み[まちなみ]を散策[さんさく]する。",
        "furigana": "京都[きょうと]ならではの風情[ふぜい]ある町並み[まちなみ]を散策[さんさく]する。",
        "translation": "Tản bộ qua những dãy phố mang đậm phong vị cổ kính mà chỉ riêng cố đô Kyoto mới có."
      },
      {
        "text": "伝統[でんとう]工芸[こうげい]の手仕事[てしごと]ならではの温もり[ぬくもり]が伝わって[つたわって]くる。",
        "furigana": "伝統[でんとう]工芸[こうげい]の手仕事[てしごと]ならではの温もり[ぬくもり]が伝わって[つたわって]くる。",
        "translation": "Hơi ấm và sự mộc mạc tinh tế chỉ có ở bàn tay thủ công mỹ nghệ truyền thống được truyền tải trọn vẹn."
      },
      {
        "text": "一流[いちりゅう]ホテルならではの行き届いた[ゆきとどいた]サービスに感動[かんどう]した。",
        "furigana": "一流[いちりゅう]ホテルならではの行き届いた[ゆきとどいた]サービスに感動[かんどう]した。",
        "translation": "Tôi vô cùng xúc động trước sự phục vụ chu đáo tận tâm mà chỉ khách sạn đẳng cấp hàng đầu mới có được."
      },
      {
        "text": "若者[わかもの]ならではの柔軟[じゅうなん]な発想[はっそう]が新事業[しんじぎょう]を生み出した[うみだした]。",
        "furigana": "若者[わかもの]ならではの柔軟[じゅうなん]な発想[はっそう]が新事業[しんじぎょう]を生み出した[うみだした]。",
        "translation": "Tư duy sáng tạo linh hoạt chỉ có ở thế hệ trẻ đã tạo nên dự án kinh doanh mới đầy đột phá."
      }
    ]
  },
  {
    "id": "ja-g-n1-02",
    "language": "ja",
    "level": "N1",
    "pattern": "〜を余儀なくされる (Bị ép buộc rơi vào tình thế khốn đốn)",
    "meaning": "Do hoàn cảnh khách quan bất khả kháng chi phối, buộc phải rơi vào trạng thái tiêu cực ngoài mong muốn.",
    "formula": "Danh từ + を余儀なくされる (hoặc: を余儀なくさせる)",
    "note": "Văn phong báo chí, tin tức truyền hình cực kỳ trang trọng và cao cấp.",
    "examples": [
      {
        "text": "不況[ふきょう]の煽り[あおり]を受け[うけ]、工場[こうじょう]の閉鎖[へいさ]を余儀なくされた[よぎなくされた]。",
        "furigana": "不況[ふきょう]の煽り[あおり]を受け[うけ]、工場[こうじょう]の閉鎖[へいさ]を余儀なくされた[よぎなくされた]。",
        "translation": "Chịu tác động dữ dội của suy thoái kinh tế, nhà máy buộc lòng phải đóng cửa."
      },
      {
        "text": "突然[とつぜん]の怪我[けが]により、選手[せんしゅ]生命[せいめい]の断念[だんねん]を余儀なくされた。",
        "furigana": "突然[とつぜん]の怪我[けが]により、選手[せんしゅ]生命[せいめい]の断念[だんねん]を余儀なくされた。",
        "translation": "Do chấn thương bất ngờ, anh ấy buộc phải từ bỏ sự nghiệp thi đấu thể thao đỉnh cao."
      },
      {
        "text": "長引く[ながびく]紛争[ふんそう]により、避難[ひなん]生活[せいかつ]を余儀なくされている人々[ひとびと]がいる。",
        "furigana": "長引く[ながびく]紛争[ふんそう]により、避難[ひなん]生活[せいかつ]を余儀なくされている人々[ひとびと]がいる。",
        "translation": "Do xung đột kéo dài triền miên, có những người dân buộc phải sống trong cảnh tị nạn khốn khó."
      },
      {
        "text": "予算[よさん]の大幅[おおはば]な削減[さくげん]が、計画[けいかく]の見直し[みなおし]を余儀なくさせた。",
        "furigana": "予算[よさん]の大幅[おおはば]な削減[さくげん]が、計画[けいかく]の見直し[みなおし]を余儀なくさせた。",
        "translation": "Việc cắt giảm ngân sách sâu sắc đã buộc dự án phải rà soát tái định hình lại toàn bộ kế hoạch."
      }
    ]
  }
]

export const japaneseKaiwa: KaiwaGroup[] = [
  {
    "id": "ja-k-n5-01",
    "language": "ja",
    "level": "N5",
    "situation": "Chào hỏi làm quen & Trao danh thiếp",
    "phrases": [
      {
        "text": "初[はじ]めまして、ホアンと申[もう]します。ベトナムから参[まい]りました。",
        "furigana": "初[はじ]めまして、ホアンと申[もう]します。ベトナムから参[まい]りました。",
        "reading": "Hajimemashite, Hoan to moushimasu. Betonamu kara mairimashita.",
        "translation": "Rất vui được gặp bạn, tôi tên là Hoàn. Tôi đến từ Việt Nam."
      },
      {
        "text": "どうぞよろしくお願[ねが]いいたします。",
        "furigana": "どうぞよろしくお願[ねが]いいたします。",
        "reading": "Douzo yoroshiku onegai itashimasu.",
        "translation": "Rất mong nhận được sự giúp đỡ và chỉ giáo của bạn."
      },
      {
        "text": "こちらこそ、お会[あ]いできて嬉[うれ]しいです。",
        "furigana": "こちらこそ、お会[あ]いできて嬉[うれ]しいです。",
        "reading": "Kochira koso, oai dekite ureshii desu.",
        "translation": "Chính tôi mới là người rất vui khi được gặp bạn."
      }
    ]
  },
  {
    "id": "ja-k-n5-02",
    "language": "ja",
    "level": "N5",
    "situation": "Mua hàng tại cửa hàng tiện lợi (Combini)",
    "phrases": [
      {
        "text": "お弁当[べんとう]を温[あたた]めていただけますか。",
        "furigana": "お弁当[べんとう]を温[あたた]めていただけますか。",
        "reading": "Obentou wo atatamete itadakemasu ka.",
        "translation": "Bạn có thể hâm nóng hộp cơm bento này giúp tôi được không?"
      },
      {
        "text": "レジ袋[ぶくろ]は結構[けっこう]です。自分[じぶん]のバッグがあります。",
        "furigana": "レジ袋[ぶくろ]は結構[けっこう]です。自分[じぶん]のバッグがあります。",
        "reading": "Reji-bukuro wa kekkou desu. Jibun no baggu ga arimasu.",
        "translation": "Tôi không cần túi nilon đâu ạ, tôi có mang sẵn túi riêng rồi."
      },
      {
        "text": "お会計[かいけい]はクレジットカードで払[はら]います。",
        "furigana": "お会計[かいけい]はクレジットカードで払[はら]います。",
        "reading": "Okaikei wa kurejitto-kaado de haraimasu.",
        "translation": "Tôi xin phép thanh toán bằng thẻ tín dụng."
      }
    ]
  },
  {
    "id": "ja-k-n4-01",
    "language": "ja",
    "level": "N4",
    "situation": "Xin phép nghỉ phép & Hỏi thăm sức khỏe",
    "phrases": [
      {
        "text": "部長[ぶちょう]、少[すこ]しお時間[じかん]よろしいでしょうか。",
        "furigana": "部長[ぶちょう]、少[すこ]しお時間[じかん]よろしいでしょうか。",
        "reading": "Buchou, sukoshi ojikan yoroshii deshou ka.",
        "translation": "Thưa Trưởng phòng, em có thể xin phép một chút thời gian của anh được không ạ?"
      },
      {
        "text": "今朝[けさ]から熱[ねつ]がありまして、病院[びょういん]に行[い]きたいんです。",
        "furigana": "今朝[けさ]から熱[ねつ]がありまして、病院[びょういん]に行[い]きたいんです。",
        "reading": "Kesa kara netsu ga arimashite, byouin ni ikitai n desu.",
        "translation": "Từ sáng nay em bị sốt, nên em muốn xin phép đi bệnh viện khám ạ."
      },
      {
        "text": "無理[むり]をしないで、今日[きょう]はゆっくり休[やす]んでくださいね。",
        "furigana": "無理[むり]をしないで、今日[きょう]はゆっくり休[やす]んでくださいね。",
        "reading": "Muri wo shinaide, kyou wa yukkuri yasunde kudasai ne.",
        "translation": "Đừng cố quá sức nhé, hôm nay em hãy nghỉ ngơi tĩnh dưỡng cho lại sức."
      }
    ]
  },
  {
    "id": "ja-k-n3-01",
    "language": "ja",
    "level": "N3",
    "situation": "Báo cáo tiến độ công việc trong buổi họp (Hou-Ren-So)",
    "phrases": [
      {
        "text": "今週[こんしゅう]の進捗[しんちょく]状況[じょうきょう]についてご報告[ほうこく]いたします。",
        "furigana": "今週[こんしゅう]の進捗[しんちょく]状況[じょうきょう]についてご報告[ほうこく]いたします。",
        "reading": "Konshuu no shinchoku joukyou ni tsuite go-houkoku itashimasu.",
        "translation": "Tôi xin phép được báo cáo về tình hình tiến độ công việc tuần này."
      },
      {
        "text": "現在[げんざい]のところ、予定[よてい]通[どお]り順調[じゅんちょう]に進[すす]んでおります。",
        "furigana": "現在[げんざい]のところ、予定[よてい]通[どお]り順調[じゅんちょう]に進[すす]んでおります。",
        "reading": "Genzai no tokoro, yotei-doori junchou ni susunde orimasu.",
        "translation": "Tính tới thời điểm hiện tại, mọi việc đang diễn ra thuận lợi theo đúng kế hoạch."
      },
      {
        "text": "万[まん]が一[いち]問題[もんだい]が生[しょう]じましたら、速[すみ]やかに共有[きょうゆう]いたします。",
        "furigana": "万[まん]が一[いち]問題[もんだい]が生[しょう]じましたら、速[すみ]やかに共有[きょうゆう]いたします。",
        "translation": "Vạn nhất nếu phát sinh vấn đề trở ngại, tôi sẽ lập tức thông báo chia sẻ ngay."
      }
    ]
  },
  {
    "id": "ja-k-n2-01",
    "language": "ja",
    "level": "N2",
    "situation": "Đàm phán lịch trình bàn giao dự án đối tác",
    "phrases": [
      {
        "text": "納期[のうき]の件[けん]に関[かん]しまして、ご相談[そうだん]がございます。",
        "furigana": "納期[のうき]の件[けん]に関[かん]しまして、ご相談[そうだん]がございます。",
        "reading": "Nouki no ken ni kanshimashite, go-soudan ga gozaimasu.",
        "translation": "Liên quan đến thời hạn giao hàng nghiệm thu, tôi có việc muốn xin ý kiến thảo luận cùng quý công ty."
      },
      {
        "text": "品質[ひんしつ]を担保[たんぽ]するため、納品[のうひん]を三日[みっか]ほど延長[えんちょう]していただけないでしょうか。",
        "furigana": "品質[ひんしつ]を担保[たんぽ]するため、納品[のうひん]を三日[みっか]ほど延長[えんちょう]していただけないでしょうか。",
        "translation": "Để bảo đảm chất lượng hoàn hảo nhất, liệu quý đối tác có thể gia hạn giao hàng thêm 3 ngày giúp chúng tôi được không ạ?"
      },
      {
        "text": "事情[じじょう]は承知[しょうち]いたしました。社内[しゃない]で検討[けんとう]のうえ、本日[ほんじつ]中[ちゅう]にご連絡[れんらく]します。",
        "furigana": "事情[じじょう]は承知[しょうち]いたしました。社内[しゃない]で検討[けんとう]のうえ、本日[ほんじつ]中[ちゅう]にご連絡[れんらく]します。",
        "translation": "Chúng tôi đã thấu hiểu tình hình. Sau khi bàn thảo nội bộ, chúng tôi sẽ phản hồi lại ngay trong ngày hôm nay."
      }
    ]
  },
  {
    "id": "ja-k-n1-01",
    "language": "ja",
    "level": "N1",
    "situation": "Thuyết trình chiến lược kinh doanh cấp cao & Chào mừng hội nghị",
    "phrases": [
      {
        "text": "本日[ほんじつ]はご多忙[たぼう]の折[おり]、弊社[へいしゃ]の事業[じぎょう]説明会[せつめいかい]にお越[こ]しいただき、厚[あつ]く御礼[おんれい]申[もう]し上[あ]げます。",
        "furigana": "本日[ほんじつ]はご多忙[たぼう]の折[おり]、弊社[へいしゃ]の事業[じぎょう]説明会[せつめいかい]にお越[こ]しいただき、厚[あつ]く御礼[おんれい]申[もう]し上[あ]げます。",
        "reading": "Honjitsu wa gotabou no ori, heisha no jigyou setsumeikai ni okoshi itadaki, atsuku onrei moushiagemasu.",
        "translation": "Hôm nay giữa lịch trình vô cùng bận rộn, sự hiện diện của quý vị tại buổi thuyết trình chiến lược của chúng tôi là niềm vinh hạnh to lớn và chúng tôi xin chân thành cảm tạ."
      },
      {
        "text": "不確実性[ふかくじつせい]の増[ま]す市場[しじょう]環境[かんきょう]下[か]におきましても、持続[じぞく]可能[かのう]な成長[せいちょう]を追求[ついきゅう]してまいる所存[しょぞん]でございます。",
        "furigana": "不確実性[ふかくじつせい]の増[ま]す市場[しじょう]環境[かんきょう]下[か]におきましても、持続[じぞく]可能[かのう]な成長[せいちょう]を追求[ついきゅう]してまいる所存[しょぞん]でございます。",
        "translation": "Ngay cả dưới bối cảnh thị trường ngày càng gia tăng sự bất định, chúng tôi vẫn quyết tâm kiên định theo đuổi sự tăng trưởng bền vững lâu dài."
      },
      {
        "text": "今後[こんご]とも倍旧[ばいきゅう]のご指導[しどう]ご鞭撻[べんたつ]を賜[たまわ]りますよう、何卒[なにとぞ]よろしくお願い[おねがい]申し上げます[もうしあげます]。",
        "furigana": "今後[こんご]とも倍旧[ばいきゅう]のご指導[しどう]ご鞭撻[べんたつ]を賜[たまわ]りますよう、何卒[なにとぞ]よろしくお願い[おねがい]申し上げます[もうしあげます]。",
        "reading": "Kongo tomo baikyuu no goshidou gobentatsu wo tamawarimasu you, nanitozo yoroshiku onegai moushiagemasu.",
        "translation": "Kính mong trong thời gian tới tiếp tục nhận được sự chỉ đạo và khích lệ quý báu gấp bội phần từ quý vị."
      }
    ]
  }
]
