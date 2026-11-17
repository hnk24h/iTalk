import { GrammarPattern, KaiwaGroup } from '../types'

export const japaneseGrammar: GrammarPattern[] = [
  {
    "id": "ja-g-n5-01-wa",
    "language": "ja",
    "level": "N5",
    "pattern": "〜は (wa)",
    "meaning": "như đối với; đánh dấu chủ đề của câu",
    "formula": "Danh từ (N) + は",
    "note": "Viết は nhưng phát âm là 'wa'. Nó thiết lập nội dung câu nói; thông tin quan trọng sẽ xuất hiện sau nó.",
    "examples": [
      {
        "text": "私[わたし]は学生[がくせい]です。",
        "furigana": "私[わたし]は学生[がくせい]です。",
        "reading": "watashihagakuseidesu。",
        "translation": "Tôi là sinh viên."
      },
      {
        "text": "今日[きょう]は天気[てんき]がいいです。",
        "furigana": "今日[きょう]は天気[てんき]がいいです。",
        "reading": "kyouhatenkigaiidesu。",
        "translation": "Thời tiết hôm nay đẹp quá."
      },
      {
        "text": "この本[ほん]はおもしろいです。",
        "furigana": "この本[ほん]はおもしろいです。",
        "reading": "konohonhaomoshiroidesu。",
        "translation": "Cuốn sách này thú vị đấy."
      }
    ]
  },
  {
    "id": "ja-g-n5-02-ga-subject",
    "language": "ja",
    "level": "N5",
    "pattern": "〜が（subject） (ga (subject))",
    "meaning": "đánh dấu chủ đề; chỉ ra thông tin mới hoặc tập trung",
    "formula": "Danh từ (N) + が",
    "note": "Các từ để hỏi như だれ và 何 lấy が, không bao giờ lấy は khi chúng là chủ ngữ. が cũng được dùng với 好き, ほしい, 上手 và わかる để chỉ sự việc thích, mong muốn hoặc được hiểu.",
    "examples": [
      {
        "text": "雨[あめ]が降[ふ]っています。",
        "furigana": "雨[あめ]が降[ふ]っています。",
        "reading": "amegafutteimasu。",
        "translation": "Trời đang mưa."
      },
      {
        "text": "だれが窓[まど]を開[あ]けましたか。",
        "furigana": "だれが窓[まど]を開[あ]けましたか。",
        "reading": "daregamadooakemashitaka。",
        "translation": "Ai đã mở cửa sổ?"
      },
      {
        "text": "私[わたし]が行[い]きます。",
        "furigana": "私[わたし]が行[い]きます。",
        "reading": "watashigaikimasu。",
        "translation": "tôi sẽ đi."
      }
    ]
  },
  {
    "id": "ja-g-n5-03-o",
    "language": "ja",
    "level": "N5",
    "pattern": "〜を (o)",
    "meaning": "đánh dấu tân ngữ trực tiếp của động từ; đánh dấu một địa điểm đã được chuyển qua hoặc để",
    "formula": "Danh từ (N) + を",
    "note": "Được viết là を nhưng được phát âm là 'o'. Với các động từ chuyển động như 歩く, 散歩する và 出る nó đánh dấu tuyến đường hoặc địa điểm bị bỏ lại.",
    "examples": [
      {
        "text": "毎朝[まいあさ]パンを食[た]べます。",
        "furigana": "毎朝[まいあさ]パンを食[た]べます。",
        "reading": "maiasaパンotabemasu。",
        "translation": "Sáng nào tôi cũng ăn bánh mì."
      },
      {
        "text": "姉[あね]は新[あたら]しいかばんを買[か]いました。",
        "furigana": "姉[あね]は新[あたら]しいかばんを買[か]いました。",
        "reading": "anehaatarashiikabanokaimashita。",
        "translation": "Chị tôi mua túi mới."
      },
      {
        "text": "公園[こうえん]を散歩[さんぽ]しました。",
        "furigana": "公園[こうえん]を散歩[さんぽ]しました。",
        "reading": "kouenosanposhimashita。",
        "translation": "Tôi đi dạo trong công viên."
      }
    ]
  },
  {
    "id": "ja-g-n5-04-ni-time",
    "language": "ja",
    "level": "N5",
    "pattern": "〜に（time） (ni (time))",
    "meaning": "tại; TRÊN; trong (một thời điểm cụ thể) có vẻ như",
    "formula": "Danh từ (N) + に",
    "note": "Được sử dụng với đồng hồ thời gian, ngày, ngày trong tuần và tháng. Các từ tương đối như 今日, 明日, 毎日 và 来週 không có に.",
    "examples": [
      {
        "text": "毎朝[まいあさ]7時[じ]に起[お]きます。",
        "furigana": "毎朝[まいあさ]7時[じ]に起[お]きます。",
        "reading": "maiasa7jiniokimasu。",
        "translation": "Mỗi sáng tôi thức dậy lúc 7 giờ."
      },
      {
        "text": "日曜日[にちようび]に友達[ともだち]と会[あ]います。",
        "furigana": "日曜日[にちようび]に友達[ともだち]と会[あ]います。",
        "reading": "nichiyoubinitomodachitoaimasu。",
        "translation": "Tôi sẽ gặp bạn bè vào Chủ nhật."
      },
      {
        "text": "8月[がつ]に国[くに]へ帰[かえ]ります。",
        "furigana": "8月[がつ]に国[くに]へ帰[かえ]ります。",
        "reading": "8gatsunikunihekaerimasu。",
        "translation": "Tôi sẽ về nước vào tháng 8."
      }
    ]
  },
  {
    "id": "ja-g-n5-05-ni-destination",
    "language": "ja",
    "level": "N5",
    "pattern": "〜に（destination） (ni (destination))",
    "meaning": "tới; vào (đích của chuyển động)",
    "formula": "Danh từ (N) + に + 行く / 来る / 帰る",
    "note": "Gần nghĩa với へ. に đặt trọng tâm vào điểm đến, へ vào hướng đi.",
    "examples": [
      {
        "text": "毎日[まいにち]バスで学校[がっこう]に行[い]きます。",
        "furigana": "毎日[まいにち]バスで学校[がっこう]に行[い]きます。",
        "reading": "mainichiバスdegakkouniikimasu。",
        "translation": "Mình đi học bằng xe buýt hàng ngày."
      },
      {
        "text": "夜[よる]10時[じ]に家[いえ]に帰[かえ]りました。",
        "furigana": "夜[よる]10時[じ]に家[いえ]に帰[かえ]りました。",
        "reading": "yoru10jiniienikaerimashita。",
        "translation": "Tôi về đến nhà lúc 10 giờ tối."
      },
      {
        "text": "来月[らいげつ]、姉[あね]が日本[にほん]に来[き]ます。",
        "furigana": "来月[らいげつ]、姉[あね]が日本[にほん]に来[き]ます。",
        "reading": "raigetsu、aneganihonnikimasu。",
        "translation": "Chị tôi tháng sau sẽ sang Nhật."
      }
    ]
  },
  {
    "id": "ja-g-n5-06-ni-location",
    "language": "ja",
    "level": "N5",
    "pattern": "〜に（place of existence） (ni (location))",
    "meaning": "vào; Tại; on (nơi có ai đó hoặc cái gì đó)",
    "formula": "Danh từ (N) + に + ある / いる",
    "note": "Dùng với ある, いる và 住む. Đối với nơi xảy ra hành động (ăn, học, chơi), thay vào đó hãy sử dụng で.",
    "examples": [
      {
        "text": "机[つくえ]の上[うえ]に辞書[じしょ]があります。",
        "furigana": "机[つくえ]の上[うえ]に辞書[じしょ]があります。",
        "reading": "tsukuenouenijishogaarimasu。",
        "translation": "Có một cuốn từ điển trên bàn."
      },
      {
        "text": "姉[あね]は東京[とうきょう]に住[す]んでいます。",
        "furigana": "姉[あね]は東京[とうきょう]に住[す]んでいます。",
        "reading": "anehatoukyounisundeimasu。",
        "translation": "Chị tôi sống ở Tokyo."
      },
      {
        "text": "猫[ねこ]は今[いま]どこにいますか。",
        "furigana": "猫[ねこ]は今[いま]どこにいますか。",
        "reading": "nekohaimadokoniimasuka。",
        "translation": "Con mèo bây giờ ở đâu?"
      }
    ]
  },
  {
    "id": "ja-g-n5-07-ni-indirect-object",
    "language": "ja",
    "level": "N5",
    "pattern": "〜に（indirect object） (ni (indirect object))",
    "meaning": "đến (người nhận hoặc là mục tiêu của một hành động)",
    "formula": "Danh từ (N) + に",
    "note": "Phổ biến với あげる, 貸す, 教える, 見せる, 電話をかける và 会う. Với もらう và 借りる, に đánh dấu người mà bạn nhận được thứ gì đó.",
    "examples": [
      {
        "text": "母[はは]に手紙[てがみ]を書[か]きます。",
        "furigana": "母[はは]に手紙[てがみ]を書[か]きます。",
        "reading": "hahanitegamiokakimasu。",
        "translation": "Tôi sẽ viết thư cho mẹ tôi."
      },
      {
        "text": "妹[いもうと]に本[ほん]を貸[か]しました。",
        "furigana": "妹[いもうと]に本[ほん]を貸[か]しました。",
        "reading": "imoutonihonokashimashita。",
        "translation": "Mình cho chị mượn sách."
      },
      {
        "text": "友達[ともだち]に電話[でんわ]をかけました。",
        "furigana": "友達[ともだち]に電話[でんわ]をかけました。",
        "reading": "tomodachinidenwaokakemashita。",
        "translation": "Tôi đã gọi cho bạn tôi."
      }
    ]
  },
  {
    "id": "ja-g-n5-08-ni-frequency",
    "language": "ja",
    "level": "N5",
    "pattern": "〜に（frequency） (ni (frequency))",
    "meaning": "mỗi; trong (bao nhiêu lần trong một khoảng thời gian)",
    "formula": "Danh từ (N) + に + Danh từ (N)",
    "note": "Kinh nguyệt đến trước, sau đó là に, sau đó là số lần: 月に一回 (mỗi tháng một lần).",
    "examples": [
      {
        "text": "一週間[いっしゅうかん]に二[に]回[かい]、プールで泳[およ]ぎます。",
        "furigana": "一週間[いっしゅうかん]に二[に]回[かい]、プールで泳[およ]ぎます。",
        "reading": "isshuukanninikai、プールdeoyogimasu。",
        "translation": "Tôi bơi ở hồ bơi hai lần một tuần."
      },
      {
        "text": "母[はは]は一[いち]日[にち]に二[に]回[かい]、犬[いぬ]の散歩[さんぽ]をします。",
        "furigana": "母[はは]は一[いち]日[にち]に二[に]回[かい]、犬[いぬ]の散歩[さんぽ]をします。",
        "reading": "hahahaichinichininikai、inunosanpooshimasu。",
        "translation": "Mẹ tôi dắt chó đi dạo hai lần một ngày."
      },
      {
        "text": "一[いち]年[ねん]に一[いち]度[ど]、家族[かぞく]で旅行[りょこう]します。",
        "furigana": "一[いち]年[ねん]に一[いち]度[ど]、家族[かぞく]で旅行[りょこう]します。",
        "reading": "ichinenniichido、kazokuderyokoushimasu。",
        "translation": "Tôi đi du lịch cùng gia đình mỗi năm một lần."
      }
    ]
  },
  {
    "id": "ja-g-n5-09-e",
    "language": "ja",
    "level": "N5",
    "pattern": "〜へ (e)",
    "meaning": "to; hướng tới (hướng chuyển động)",
    "formula": "Danh từ (N) + へ",
    "note": "Viết là へ nhưng phát âm là 'e'. Thường có thể hoán đổi với に để chỉ điểm đến; へ nhấn mạnh về hướng hơn một chút.",
    "examples": [
      {
        "text": "夏休[なつやす]みに北海道[ほっかいどう]へ行[い]きます。",
        "furigana": "夏休[なつやす]みに北海道[ほっかいどう]へ行[い]きます。",
        "reading": "natsuyasuminihokkaidouheikimasu。",
        "translation": "Tôi sẽ đến Hokkaido vào kỳ nghỉ hè."
      },
      {
        "text": "来週[らいしゅう]、国[くに]へ帰[かえ]ります。",
        "furigana": "来週[らいしゅう]、国[くに]へ帰[かえ]ります。",
        "reading": "raishuu、kunihekaerimasu。",
        "translation": "Tôi sẽ trở về đất nước của tôi vào tuần tới."
      },
      {
        "text": "どこへ行[い]きますか。",
        "furigana": "どこへ行[い]きますか。",
        "reading": "dokoheikimasuka。",
        "translation": "Bạn đi đâu thế?"
      }
    ]
  },
  {
    "id": "ja-g-n5-10-de-place",
    "language": "ja",
    "level": "N5",
    "pattern": "〜で（place of action） (de (place))",
    "meaning": "at; in (nơi xảy ra hành động)",
    "formula": "Danh từ (N) + で",
    "note": "So sánh 教室にいます (ở đâu đó: に) với 教室で勉強します (làm gì đó ở đó: で).",
    "examples": [
      {
        "text": "図書館[としょかん]で本[ほん]を読[よ]みます。",
        "furigana": "図書館[としょかん]で本[ほん]を読[よ]みます。",
        "reading": "toshokandehonoyomimasu。",
        "translation": "Tôi đọc sách ở thư viện."
      },
      {
        "text": "きのう、デパートでくつを買[か]いました。",
        "furigana": "きのう、デパートでくつを買[か]いました。",
        "reading": "kinou、デパートdekutsuokaimashita。",
        "translation": "Hôm qua tôi mua giày ở cửa hàng bách hóa."
      },
      {
        "text": "駅[えき]の前[まえ]で友達[ともだち]を待[ま]ちました。",
        "furigana": "駅[えき]の前[まえ]で友達[ともだち]を待[ま]ちました。",
        "reading": "ekinomaedetomodachiomachimashita。",
        "translation": "Tôi đợi bạn tôi trước nhà ga."
      }
    ]
  },
  {
    "id": "ja-g-n5-11-de-means",
    "language": "ja",
    "level": "N5",
    "pattern": "〜で（means） (de (means))",
    "meaning": "; với; trong (phương tiện, công cụ, phương pháp hoặc ngôn ngữ)",
    "formula": "Danh từ (N) + で",
    "note": "Để nói 'đi bộ', hãy sử dụng 歩いて行きます thay vì で.",
    "examples": [
      {
        "text": "毎日[まいにち]電車[でんしゃ]で会社[かいしゃ]へ行[い]きます。",
        "furigana": "毎日[まいにち]電車[でんしゃ]で会社[かいしゃ]へ行[い]きます。",
        "reading": "mainichidenshadekaishaheikimasu。",
        "translation": "Hàng ngày tôi đi làm bằng tàu hỏa."
      },
      {
        "text": "はしでご飯[はん]を食[た]べます。",
        "furigana": "はしでご飯[はん]を食[た]べます。",
        "reading": "hashidegohanotabemasu。",
        "translation": "Mình ăn cơm bằng đũa."
      },
      {
        "text": "日本語[にほんご]で手紙[てがみ]を書[か]きました。",
        "furigana": "日本語[にほんご]で手紙[てがみ]を書[か]きました。",
        "reading": "nihongodetegamiokakimashita。",
        "translation": "Tôi đã viết một lá thư bằng tiếng Nhật."
      }
    ]
  },
  {
    "id": "ja-g-n5-12-to-and",
    "language": "ja",
    "level": "N5",
    "pattern": "〜と（and） (to (and))",
    "meaning": "và (nối các danh từ trong một danh sách đầy đủ)",
    "formula": "Danh từ (N) + と + Danh từ (N)",
    "note": "と liệt kê mọi mục; để đưa ra một số ví dụ, hãy sử dụng や. Nó chỉ nối danh từ, không nối động từ hoặc tính từ.",
    "examples": [
      {
        "text": "かばんの中[なか]にペンとノートがあります。",
        "furigana": "かばんの中[なか]にペンとノートがあります。",
        "reading": "kabannonakaniペンtoノートgaarimasu。",
        "translation": "Trong túi tôi có một cây bút và một cuốn sổ."
      },
      {
        "text": "朝[あさ]ご飯[はん]にパンとたまごを食[た]べました。",
        "furigana": "朝[あさ]ご飯[はん]にパンとたまごを食[た]べました。",
        "reading": "asagohanniパンtotamagootabemashita。",
        "translation": "Tôi đã ăn bánh mì và trứng cho bữa sáng."
      },
      {
        "text": "父[ちち]と母[はは]は銀行[ぎんこう]で働[はたら]いています。",
        "furigana": "父[ちち]と母[はは]は銀行[ぎんこう]で働[はたら]いています。",
        "reading": "chichitohahahaginkoudehataraiteimasu。",
        "translation": "Bố mẹ tôi làm việc ở ngân hàng."
      }
    ]
  },
  {
    "id": "ja-g-n5-13-to-with",
    "language": "ja",
    "level": "N5",
    "pattern": "〜と（with） (to (with))",
    "meaning": "with; cùng với (một đối tác trong một hành động)",
    "formula": "Danh từ (N) + と",
    "note": "Thường theo sau là いっしょに. Với các động từ như 話す, 会う và 結婚する, と đánh dấu người khác.",
    "examples": [
      {
        "text": "週末[しゅうまつ]、友達[ともだち]と映画[えいが]を見[み]ました。",
        "furigana": "週末[しゅうまつ]、友達[ともだち]と映画[えいが]を見[み]ました。",
        "reading": "shuumatsu、tomodachitoeigaomimashita。",
        "translation": "Cuối tuần tôi đi xem phim với bạn bè."
      },
      {
        "text": "妹[いもうと]といっしょに買[か]い物[もの]に行[い]きます。",
        "furigana": "妹[いもうと]といっしょに買[か]い物[もの]に行[い]きます。",
        "reading": "imoutotoisshonikaimononiikimasu。",
        "translation": "Tôi đang đi mua sắm với chị gái."
      },
      {
        "text": "だれと昼[ひる]ご飯[はん]を食[た]べましたか。",
        "furigana": "だれと昼[ひる]ご飯[はん]を食[た]べましたか。",
        "reading": "daretohirugohanotabemashitaka。",
        "translation": "Bạn đã ăn trưa với ai?"
      }
    ]
  },
  {
    "id": "ja-g-n5-14-ya",
    "language": "ja",
    "level": "N5",
    "pattern": "〜や (ya)",
    "meaning": "và (đưa ra một số ví dụ khác); ... v.v. mặc dù vậy",
    "formula": "Danh từ (N) + や + Danh từ (N)",
    "note": "Đề nghị danh sách chưa đầy đủ. Thường kết thúc bằng など: 本や雑誌など.",
    "examples": [
      {
        "text": "机[つくえ]の上[うえ]に本[ほん]や雑誌[ざっし]があります。",
        "furigana": "机[つくえ]の上[うえ]に本[ほん]や雑誌[ざっし]があります。",
        "reading": "tsukuenouenihonyazasshigaarimasu。",
        "translation": "Trên bàn có sách và tạp chí."
      },
      {
        "text": "スーパーで肉[にく]や野菜[やさい]を買[か]いました。",
        "furigana": "スーパーで肉[にく]や野菜[やさい]を買[か]いました。",
        "reading": "スーパーdenikuyayasaiokaimashita。",
        "translation": "Tôi mua một ít thịt và rau ở siêu thị."
      }
    ]
  },
  {
    "id": "ja-g-n5-15-ka-or",
    "language": "ja",
    "level": "N5",
    "pattern": "〜か（or） (ka (or))",
    "meaning": "hoặc (sự lựa chọn giữa các danh từ)",
    "formula": "Danh từ (N) + か + Danh từ (N)",
    "note": "Có nghĩa là một trong các mục được chọn. Để liệt kê các mục cùng nhau, hãy sử dụng と hoặc や.",
    "examples": [
      {
        "text": "飲[の]み物[もの]はコーヒーか紅茶[こうちゃ]がいいです。",
        "furigana": "飲[の]み物[もの]はコーヒーか紅茶[こうちゃ]がいいです。",
        "reading": "nomimonohaコーヒーkakouchagaiidesu。",
        "translation": "Tôi muốn uống cà phê hoặc trà."
      },
      {
        "text": "土曜日[どようび]か日曜日[にちようび]に買[か]い物[もの]に行[い]きます。",
        "furigana": "土曜日[どようび]か日曜日[にちようび]に買[か]い物[もの]に行[い]きます。",
        "reading": "doyoubikanichiyoubinikaimononiikimasu。",
        "translation": "Tôi sẽ đi mua sắm vào thứ bảy hoặc chủ nhật."
      },
      {
        "text": "駅[えき]までバスかタクシーで行[い]きます。",
        "furigana": "駅[えき]までバスかタクシーで行[い]きます。",
        "reading": "ekimadeバスkaタクシーdeikimasu。",
        "translation": "Tôi sẽ đến ga bằng xe buýt hoặc taxi."
      }
    ]
  },
  {
    "id": "ja-g-n5-16-mo",
    "language": "ja",
    "level": "N5",
    "pattern": "〜も (mo)",
    "meaning": "cũng vậy; cũng vậy; (với câu phủ định) cũng không...; không ... cũng không chỉ",
    "formula": "Danh từ (N) + も",
    "note": "も thay thế は, が và を, nhưng đứng sau các trợ từ khác: 京都にも行きました.",
    "examples": [
      {
        "text": "私[わたし]も学生[がくせい]です。",
        "furigana": "私[わたし]も学生[がくせい]です。",
        "reading": "watashimogakuseidesu。",
        "translation": "Mình cũng là sinh viên."
      },
      {
        "text": "兄[あに]はサッカーも好[す]きです。",
        "furigana": "兄[あに]はサッカーも好[す]きです。",
        "reading": "anihaサッカーmosukidesu。",
        "translation": "Anh trai tôi cũng thích bóng đá."
      },
      {
        "text": "肉[にく]も魚[さかな]も食[た]べません。",
        "furigana": "肉[にく]も魚[さかな]も食[た]べません。",
        "reading": "nikumosakanamotabemasen。",
        "translation": "Tôi không ăn thịt hoặc cá."
      }
    ]
  },
  {
    "id": "ja-g-n5-17-no",
    "language": "ja",
    "level": "N5",
    "pattern": "〜の（possessive） (no)",
    "meaning": "'s; của (sở hữu, thuộc về hoặc mô tả)",
    "formula": "Danh từ (N) + の + Danh từ (N)",
    "note": "Danh từ đầu tiên mô tả danh từ thứ hai: 日本の車 (một chiếc xe hơi Nhật Bản). Danh từ thứ hai có thể lược bỏ khi rõ ràng: それは私のです.",
    "examples": [
      {
        "text": "これは私[わたし]のかさです。",
        "furigana": "これは私[わたし]のかさです。",
        "reading": "korehawatashinokasadesu。",
        "translation": "Đây là ô của tôi."
      },
      {
        "text": "日本語[にほんご]の先生[せんせい]はとてもやさしいです。",
        "furigana": "日本語[にほんご]の先生[せんせい]はとてもやさしいです。",
        "reading": "nihongonosenseihatotemoyasashiidesu。",
        "translation": "Cô giáo người Nhật rất tốt bụng."
      },
      {
        "text": "駅[えき]の近[ちか]くに新[あたら]しい店[みせ]があります。",
        "furigana": "駅[えき]の近[ちか]くに新[あたら]しい店[みせ]があります。",
        "reading": "ekinochikakuniatarashiimisegaarimasu。",
        "translation": "Có một cửa hàng mới gần nhà ga."
      }
    ]
  },
  {
    "id": "ja-g-n5-18-kara-from",
    "language": "ja",
    "level": "N5",
    "pattern": "〜から（from） (kara (from))",
    "meaning": "từ (điểm bắt đầu về thời gian hoặc địa điểm)",
    "formula": "Danh từ (N) + から",
    "note": "Thường kết hợp với まで: 月曜日から金曜日まで (từ thứ Hai đến thứ Sáu).",
    "examples": [
      {
        "text": "授業[じゅぎょう]は9時[じ]からです。",
        "furigana": "授業[じゅぎょう]は9時[じ]からです。",
        "reading": "jugyouha9jikaradesu。",
        "translation": "Lớp học bắt đầu lúc 9 giờ."
      },
      {
        "text": "学校[がっこう]から駅[えき]まで歩[ある]きます。",
        "furigana": "学校[がっこう]から駅[えき]まで歩[ある]きます。",
        "reading": "gakkoukaraekimadearukimasu。",
        "translation": "Tôi đi bộ từ trường ra ga."
      },
      {
        "text": "私[わたし]はブラジルから来[き]ました。",
        "furigana": "私[わたし]はブラジルから来[き]ました。",
        "reading": "watashihaブラジルkarakimashita。",
        "translation": "Tôi đến từ Brazil."
      }
    ]
  },
  {
    "id": "ja-g-n5-19-made",
    "language": "ja",
    "level": "N5",
    "pattern": "〜まで（until） (made)",
    "meaning": "cho đến khi; đến ; theo như",
    "formula": "Danh từ (N) + まで",
    "note": "Đánh dấu điểm kết thúc của một cái gì đó vẫn tiếp tục. Đối với thời hạn ('by'), hãy sử dụng までに (N4).",
    "examples": [
      {
        "text": "昼休[ひるやす]みは1時[じ]までです。",
        "furigana": "昼休[ひるやす]みは1時[じ]までです。",
        "reading": "hiruyasumiha1jimadedesu。",
        "translation": "Giờ nghỉ trưa kéo dài đến 1 giờ."
      },
      {
        "text": "駅[えき]までいっしょに行[い]きましょう。",
        "furigana": "駅[えき]までいっしょに行[い]きましょう。",
        "reading": "ekimadeisshoniikimashou。",
        "translation": "Chúng ta cùng nhau đến ga nhé."
      },
      {
        "text": "きのうは夜[よる]11時[じ]まで勉強[べんきょう]しました。",
        "furigana": "きのうは夜[よる]11時[じ]まで勉強[べんきょう]しました。",
        "reading": "kinouhayoru11jimadebenkyoushimashita。",
        "translation": "Hôm qua tôi học đến 11 giờ đêm."
      }
    ]
  },
  {
    "id": "ja-g-n5-20-ka-question",
    "language": "ja",
    "level": "N5",
    "pattern": "〜か（question） (ka (question))",
    "meaning": "(dấu hỏi) biến một câu thành một câu hỏi",
    "formula": "Câu + か",
    "note": "Các câu hỏi lịch sự kết thúc bằng か và thường được viết bằng 。. Trong lời nói thông thường, か thường được bỏ đi và thay vào đó sử dụng ngữ điệu lên cao.",
    "examples": [
      {
        "text": "これはあなたのかばんですか。",
        "furigana": "これはあなたのかばんですか。",
        "reading": "korehaanatanokabandesuka。",
        "translation": "Đây là túi của bạn phải không?"
      },
      {
        "text": "朝[あさ]ご飯[はん]を食[た]べましたか。",
        "furigana": "朝[あさ]ご飯[はん]を食[た]べましたか。",
        "reading": "asagohanotabemashitaka。",
        "translation": "Bạn đã ăn sáng chưa?"
      },
      {
        "text": "トイレはどこですか。",
        "furigana": "トイレはどこですか。",
        "reading": "トイレhadokodesuka。",
        "translation": "Phòng vệ sinh ở đâu."
      }
    ]
  },
  {
    "id": "ja-g-n5-21-ne",
    "language": "ja",
    "level": "N5",
    "pattern": "〜ね (ne)",
    "meaning": "phải không?; Phải? (tìm kiếm sự đồng tình hoặc chia sẻ cảm xúc)",
    "formula": "Câu + ね",
    "note": "Được sử dụng khi người nói mong muốn người nghe chia sẻ cùng quan điểm hoặc kiến ​​thức. So sánh よ, cho người nghe biết điều gì đó mới mẻ.",
    "examples": [
      {
        "text": "今日[きょう]は暑[あつ]いですね。",
        "furigana": "今日[きょう]は暑[あつ]いですね。",
        "reading": "kyouhaatsuidesune。",
        "translation": "Hôm nay trời nóng quá phải không?"
      },
      {
        "text": "このケーキ、おいしいですね。",
        "furigana": "このケーキ、おいしいですね。",
        "reading": "konoケーキ、oishiidesune。",
        "translation": "Bánh này ngon quá."
      },
      {
        "text": "明日[あした]のテストは10時[じ]からですね。",
        "furigana": "明日[あした]のテストは10時[じ]からですね。",
        "reading": "ashitanoテストha10jikaradesune。",
        "translation": "Bài kiểm tra ngày mai bắt đầu lúc 10 giờ."
      }
    ]
  },
  {
    "id": "ja-g-n5-22-yo",
    "language": "ja",
    "level": "N5",
    "pattern": "〜よ (yo)",
    "meaning": "bạn biết đấy; Tôi nói với bạn (cung cấp thông tin mới hoặc nhấn mạnh)",
    "formula": "Câu + よ",
    "note": "Nói với người nghe điều gì đó mà họ có thể không biết. Việc lạm dụng nó với cấp trên nghe có vẻ tự đề cao.",
    "examples": [
      {
        "text": "このラーメンはとてもおいしいですよ。",
        "furigana": "このラーメンはとてもおいしいですよ。",
        "reading": "konoラーメンhatotemooishiidesuyo。",
        "translation": "Món ramen này rất ngon."
      },
      {
        "text": "かさを忘[わす]れていますよ。",
        "furigana": "かさを忘[わす]れていますよ。",
        "reading": "kasaowasureteimasuyo。",
        "translation": "Bạn quên mang ô rồi."
      },
      {
        "text": "明日[あした]はテストがありますよ。",
        "furigana": "明日[あした]はテストがありますよ。",
        "reading": "ashitahaテストgaarimasuyo。",
        "translation": "Ngày mai tôi có bài kiểm tra."
      }
    ]
  },
  {
    "id": "ja-g-n5-23-yori",
    "language": "ja",
    "level": "N5",
    "pattern": "〜より (yori)",
    "meaning": "hơn (tiêu chuẩn so sánh)",
    "formula": "Danh từ (N) + より",
    "note": "Trong X は Y より + tính từ, Y là tiêu chuẩn. Tính từ tiếng Nhật không có dạng '-er'; より làm công việc đó.",
    "examples": [
      {
        "text": "今日[きょう]はきのうより寒[さむ]いです。",
        "furigana": "今日[きょう]はきのうより寒[さむ]いです。",
        "reading": "kyouhakinouyorisamuidesu。",
        "translation": "Hôm nay trời lạnh hơn hôm qua."
      },
      {
        "text": "電車[でんしゃ]はバスより速[はや]いです。",
        "furigana": "電車[でんしゃ]はバスより速[はや]いです。",
        "reading": "denshahaバスyorihayaidesu。",
        "translation": "Tàu nhanh hơn xe buýt."
      },
      {
        "text": "兄[あに]は父[ちち]より背[せ]が高[たか]いです。",
        "furigana": "兄[あに]は父[ちち]より背[せ]が高[たか]いです。",
        "reading": "anihachichiyorisegatakaidesu。",
        "translation": "Anh trai tôi cao hơn bố tôi."
      }
    ]
  },
  {
    "id": "ja-g-n5-24-no-hou-ga-yori",
    "language": "ja",
    "level": "N5",
    "pattern": "〜の方が〜より (no hou ga ... yori)",
    "meaning": "X thì hơn... hơn Y",
    "formula": "Danh từ (N) + の方が + Danh từ (N) + より",
    "note": "Hai phần có thể đến theo thứ tự. Thường dùng để trả lời câu hỏi どちら.",
    "examples": [
      {
        "text": "犬[いぬ]の方[ほう]が猫[ねこ]より好[す]きです。",
        "furigana": "犬[いぬ]の方[ほう]が猫[ねこ]より好[す]きです。",
        "reading": "inunohouganekoyorisukidesu。",
        "translation": "Mình thích chó hơn mèo."
      },
      {
        "text": "東京[とうきょう]の方[ほう]が大阪[おおさか]より人[ひと]が多[おお]いです。",
        "furigana": "東京[とうきょう]の方[ほう]が大阪[おおさか]より人[ひと]が多[おお]いです。",
        "reading": "toukyounohougaoosakayorihitogaooidesu。",
        "translation": "Ở Tokyo có nhiều người hơn ở Osaka."
      },
      {
        "text": "夏[なつ]より冬[ふゆ]の方[ほう]が好[す]きです。",
        "furigana": "夏[なつ]より冬[ふゆ]の方[ほう]が好[す]きです。",
        "reading": "natsuyorifuyunohougasukidesu。",
        "translation": "Tôi thích mùa đông hơn mùa hè."
      }
    ]
  },
  {
    "id": "ja-g-n5-25-to-to-dochira-ga",
    "language": "ja",
    "level": "N5",
    "pattern": "〜と〜とどちらが (to ... to dochira ga)",
    "meaning": "cái nào hơn ..., X hay Y?",
    "formula": "Danh từ (N) + と + Danh từ (N) + とどちらが",
    "note": "So sánh chính xác hai điều. どっち là dạng thông thường của どちら. Trả lời bằng 〜の方が.",
    "examples": [
      {
        "text": "コーヒーと紅茶[こうちゃ]とどちらが好[す]きですか。",
        "furigana": "コーヒーと紅茶[こうちゃ]とどちらが好[す]きですか。",
        "reading": "コーヒーtokouchatodochiragasukidesuka。",
        "translation": "Bạn thích cái nào hơn, cà phê hay trà?"
      },
      {
        "text": "電車[でんしゃ]とバスとどちらが安[やす]いですか。",
        "furigana": "電車[でんしゃ]とバスとどちらが安[やす]いですか。",
        "reading": "denshatoバスtodochiragayasuidesuka。",
        "translation": "Cái nào rẻ hơn, tàu hay xe buýt?"
      },
      {
        "text": "「山[やま]と海[うみ]とどちらがいいですか。」「海[うみ]の方[ほう]がいいです。」",
        "furigana": "「山[やま]と海[うみ]とどちらがいいですか。」「海[うみ]の方[ほう]がいいです。」",
        "reading": "「yamatoumitodochiragaiidesuka。」「uminohougaiidesu。」",
        "translation": "``Bạn thích cái nào hơn, núi hay biển?'' ``Tôi thích biển hơn.''"
      }
    ]
  },
  {
    "id": "ja-g-n5-26-no-naka-de-ga-ichiban",
    "language": "ja",
    "level": "N5",
    "pattern": "〜の中で〜が一番 (no naka de ... ga ichiban)",
    "meaning": "... là nhất ... trong số/của",
    "formula": "Danh từ (N) + の中で + Danh từ (N) + が一番",
    "note": "Được sử dụng cho ba mặt hàng trở lên. Trong câu hỏi sử dụng 何, だれ, どこ hoặc いつ trước が一番.",
    "examples": [
      {
        "text": "果物[くだもの]の中[なか]でりんごが一番[いちばん]好[す]きです。",
        "furigana": "果物[くだもの]の中[なか]でりんごが一番[いちばん]好[す]きです。",
        "reading": "kudamonononakaderingogaichibansukidesu。",
        "translation": "Trong tất cả các loại trái cây, tôi thích nhất là táo."
      },
      {
        "text": "クラスの中[なか]でだれが一番[いちばん]背[せ]が高[たか]いですか。",
        "furigana": "クラスの中[なか]でだれが一番[いちばん]背[せ]が高[たか]いですか。",
        "reading": "クラスnonakadedaregaichibansegatakaidesuka。",
        "translation": "Ai cao nhất lớp?"
      },
      {
        "text": "家族[かぞく]の中[なか]で父[ちち]が一番[いちばん]早[はや]く起[お]きます。",
        "furigana": "家族[かぞく]の中[なか]で父[ちち]が一番[いちばん]早[はや]く起[お]きます。",
        "reading": "kazokunonakadechichigaichibanhayakuokimasu。",
        "translation": "Bố tôi là người đánh thức đầu tiên trong gia đình tôi."
      }
    ]
  },
  {
    "id": "ja-g-n5-27-desu",
    "language": "ja",
    "level": "N5",
    "pattern": "〜です (desu)",
    "meaning": "là; là; cũng vậy (copula lịch sự)",
    "formula": "Danh từ (N) + です / Tính từ đuôi な (A-na) + です / Tính từ đuôi い (A-i) + です",
    "note": "Các hình thức: です, ではありません, でした, ではありませんでした. Sau tính từ い, です chỉ thêm tính lịch sự: 高いです.",
    "examples": [
      {
        "text": "私[わたし]はマリアです。",
        "furigana": "私[わたし]はマリアです。",
        "reading": "watashihaマリアdesu。",
        "translation": "Tôi là Maria."
      },
      {
        "text": "今日[きょう]は月曜日[げつようび]です。",
        "furigana": "今日[きょう]は月曜日[げつようび]です。",
        "reading": "kyouhagetsuyoubidesu。",
        "translation": "Hôm nay là thứ Hai."
      },
      {
        "text": "この部屋[へや]はとても静[しず]かです。",
        "furigana": "この部屋[へや]はとても静[しず]かです。",
        "reading": "konoheyahatotemoshizukadesu。",
        "translation": "Căn phòng này rất yên tĩnh."
      }
    ]
  },
  {
    "id": "ja-g-n5-28-da",
    "language": "ja",
    "level": "N5",
    "pattern": "〜だ (da)",
    "meaning": "is; là; là (đồng bằng copula)",
    "formula": "Danh từ (N) + だ / Tính từ đuôi な (A-na) + だ",
    "note": "Các dạng: だ, じゃない, だった, じゃなかった. Không bao giờ dùng ngay sau tính từ い (高いだ là sai). Thường rơi vào các câu hỏi thông thường: 学生？",
    "examples": [
      {
        "text": "今日[きょう]は日曜日[にちようび]だ。",
        "furigana": "今日[きょう]は日曜日[にちようび]だ。",
        "reading": "kyouhanichiyoubida。",
        "translation": "Hôm nay là chủ nhật."
      },
      {
        "text": "あの人[ひと]は私[わたし]の兄[あに]だ。",
        "furigana": "あの人[ひと]は私[わたし]の兄[あに]だ。",
        "reading": "anohitohawatashinoanida。",
        "translation": "Người đó là anh trai tôi."
      },
      {
        "text": "明日[あした]は休[やす]みだから、ゆっくり寝[ね]る。",
        "furigana": "明日[あした]は休[やす]みだから、ゆっくり寝[ね]る。",
        "reading": "ashitahayasumidakara、yukkurineru。",
        "translation": "Ngày mai là ngày nghỉ của tôi nên tôi sẽ ngủ ngon."
      }
    ]
  },
  {
    "id": "ja-g-n5-29-de-wa-arimasen-ja-nai",
    "language": "ja",
    "level": "N5",
    "pattern": "〜ではありません / 〜じゃない (de wa arimasen / ja nai)",
    "meaning": "thì không; tôi không; không phải lúc này",
    "formula": "Danh từ (N) + ではありません / Tính từ đuôi な (A-na) + ではありません / Danh từ (N) + じゃない / Tính từ đuôi な (A-na) + じゃない",
    "note": "じゃありません và じゃないです là những hình thức đàm thoại lịch sự hơn. Quá khứ: ではありませんでした / じゃなかった. Tính từ い dùng 〜くない thay thế.",
    "examples": [
      {
        "text": "私[わたし]は先生[せんせい]ではありません。学生[がくせい]です。",
        "furigana": "私[わたし]は先生[せんせい]ではありません。学生[がくせい]です。",
        "reading": "watashihasenseidehaarimasen。gakuseidesu。",
        "translation": "Tôi không phải là giáo viên. Tôi là một sinh viên."
      },
      {
        "text": "今日[きょう]は休[やす]みじゃない。",
        "furigana": "今日[きょう]は休[やす]みじゃない。",
        "reading": "kyouhayasumijanai。",
        "translation": "Hôm nay không phải là ngày nghỉ."
      },
      {
        "text": "この町[まち]はあまりにぎやかではありません。",
        "furigana": "この町[まち]はあまりにぎやかではありません。",
        "reading": "konomachihaamarinigiyakadehaarimasen。",
        "translation": "Thị trấn này không sôi động lắm."
      }
    ]
  },
  {
    "id": "ja-g-n5-30-deshita",
    "language": "ja",
    "level": "N5",
    "pattern": "〜でした (deshita)",
    "meaning": "là; đã (copula quá khứ lịch sự)",
    "formula": "Danh từ (N) + でした / Tính từ đuôi な (A-na) + でした",
    "note": "Quá khứ phủ định: ではありませんでした. Tính từ い không dùng でした: nói 高かったです, không dùng 高いでした.",
    "examples": [
      {
        "text": "きのうは私[わたし]の誕生[たんじょう]日[び]でした。",
        "furigana": "きのうは私[わたし]の誕生[たんじょう]日[び]でした。",
        "reading": "kinouhawatashinotanjoubideshita。",
        "translation": "Hôm qua là sinh nhật của tôi."
      },
      {
        "text": "子[こ]どものころ、野菜[やさい]がきらいでした。",
        "furigana": "子[こ]どものころ、野菜[やさい]がきらいでした。",
        "reading": "kodomonokoro、yasaigakiraideshita。",
        "translation": "Lúc nhỏ tôi ghét rau lắm."
      },
      {
        "text": "テストはかんたんでした。",
        "furigana": "テストはかんたんでした。",
        "reading": "テストhakantandeshita。",
        "translation": "Bài kiểm tra rất dễ."
      }
    ]
  },
  {
    "id": "ja-g-n5-31-masu",
    "language": "ja",
    "level": "N5",
    "pattern": "〜ます (masu)",
    "meaning": "kết thúc động từ không ở quá khứ một cách lịch sự (do; will do)",
    "formula": "Động từ thể ます bỏ ます (V-masu) + ます",
    "note": "Bao gồm các thói quen và hành động trong tương lai. 飲む→飲みます, 食べる→食べます, する→します, 来る→来ます.",
    "examples": [
      {
        "text": "毎朝[まいあさ]コーヒーを飲[の]みます。",
        "furigana": "毎朝[まいあさ]コーヒーを飲[の]みます。",
        "reading": "maiasaコーヒーonomimasu。",
        "translation": "Sáng nào tôi cũng uống cà phê."
      },
      {
        "text": "明日[あした]、京都[きょうと]へ行[い]きます。",
        "furigana": "明日[あした]、京都[きょうと]へ行[い]きます。",
        "reading": "ashita、kyoutoheikimasu。",
        "translation": "Ngày mai tôi sẽ đi Kyoto."
      },
      {
        "text": "弟[おとうと]は毎晩[まいばん]9時[じ]に寝[ね]ます。",
        "furigana": "弟[おとうと]は毎晩[まいばん]9時[じ]に寝[ね]ます。",
        "reading": "otoutohamaiban9jininemasu。",
        "translation": "Tối nào anh trai tôi cũng đi ngủ lúc 9 giờ."
      }
    ]
  },
  {
    "id": "ja-g-n5-32-masen",
    "language": "ja",
    "level": "N5",
    "pattern": "〜ません (masen)",
    "meaning": "không; sẽ không (tiêu cực lịch sự)",
    "formula": "Động từ thể ます bỏ ます (V-masu) + ません",
    "note": "Tương đương đơn giản là dạng ない: 飲みません = 飲まない.",
    "examples": [
      {
        "text": "私[わたし]はお酒[さけ]を飲[の]みません。",
        "furigana": "私[わたし]はお酒[さけ]を飲[の]みません。",
        "reading": "watashihaosakeonomimasen。",
        "translation": "Tôi không uống rượu."
      },
      {
        "text": "日曜日[にちようび]は学校[がっこう]へ行[い]きません。",
        "furigana": "日曜日[にちようび]は学校[がっこう]へ行[い]きません。",
        "reading": "nichiyoubihagakkouheikimasen。",
        "translation": "Chủ nhật tôi không đi học."
      },
      {
        "text": "今晩[こんばん]はテレビを見[み]ません。",
        "furigana": "今晩[こんばん]はテレビを見[み]ません。",
        "reading": "konbanhaテレビomimasen。",
        "translation": "Tối nay tôi sẽ không xem TV."
      }
    ]
  },
  {
    "id": "ja-g-n5-33-mashita",
    "language": "ja",
    "level": "N5",
    "pattern": "〜ました (mashita)",
    "meaning": "đã làm (quá khứ lịch sự)",
    "formula": "Động từ thể ます bỏ ます (V-masu) + ました",
    "note": "Tương đương đơn giản là dạng た: 会いました = 会った.",
    "examples": [
      {
        "text": "きのう、友達[ともだち]に会[あ]いました。",
        "furigana": "きのう、友達[ともだち]に会[あ]いました。",
        "reading": "kinou、tomodachiniaimashita。",
        "translation": "Hôm qua tôi đã gặp bạn tôi."
      },
      {
        "text": "先週[せんしゅう]、新[あたら]しいくつを買[か]いました。",
        "furigana": "先週[せんしゅう]、新[あたら]しいくつを買[か]いました。",
        "reading": "senshuu、atarashiikutsuokaimashita。",
        "translation": "Tuần trước tôi mới mua giày mới."
      },
      {
        "text": "けさ、6時[じ]に起[お]きました。",
        "furigana": "けさ、6時[じ]に起[お]きました。",
        "reading": "kesa、6jiniokimashita。",
        "translation": "Kesa, tôi thức dậy lúc 6 giờ."
      }
    ]
  },
  {
    "id": "ja-g-n5-34-masen-deshita",
    "language": "ja",
    "level": "N5",
    "pattern": "〜ませんでした (masen deshita)",
    "meaning": "không (lịch sự quá khứ phủ định)",
    "formula": "Động từ thể ます bỏ ます (V-masu) + ませんでした",
    "note": "Tương đương đơn giản là 〜なかった: 食べませんでした = 食べなかった.",
    "examples": [
      {
        "text": "けさは朝[あさ]ご飯[はん]を食[た]べませんでした。",
        "furigana": "けさは朝[あさ]ご飯[はん]を食[た]べませんでした。",
        "reading": "kesahaasagohanotabemasendeshita。",
        "translation": "Kesa chưa ăn sáng."
      },
      {
        "text": "週末[しゅうまつ]は宿題[しゅくだい]をしませんでした。",
        "furigana": "週末[しゅうまつ]は宿題[しゅくだい]をしませんでした。",
        "reading": "shuumatsuhashukudaioshimasendeshita。",
        "translation": "Cuối tuần tôi không làm bài tập về nhà."
      },
      {
        "text": "きのうは雨[あめ]でしたから、出[で]かけませんでした。",
        "furigana": "きのうは雨[あめ]でしたから、出[で]かけませんでした。",
        "reading": "kinouhaamedeshitakara、dekakemasendeshita。",
        "translation": "Hôm qua trời mưa nên tôi không đi chơi."
      }
    ]
  },
  {
    "id": "ja-g-n5-35-nai",
    "language": "ja",
    "level": "N5",
    "pattern": "〜ない (nai)",
    "meaning": "không; will not (phủ định rõ ràng của động từ)",
    "formula": "Động từ thể ない (V-nai) stem + ない",
    "note": "Động từ う đổi âm -u cuối thành -a: 書く→書かない, 買う→買わない. る-động từ thả る: 食べない. する→しない, 来る→こない, ある→ない. Quá khứ: 〜なかった.",
    "examples": [
      {
        "text": "今日[きょう]は学校[がっこう]へ行[い]かない。",
        "furigana": "今日[きょう]は学校[がっこう]へ行[い]かない。",
        "reading": "kyouhagakkouheikanai。",
        "translation": "Hôm nay tôi không đi học."
      },
      {
        "text": "兄[あに]は肉[にく]を食[た]べない。",
        "furigana": "兄[あに]は肉[にく]を食[た]べない。",
        "reading": "anihanikuotabenai。",
        "translation": "Anh trai tôi không ăn thịt."
      },
      {
        "text": "「コーヒー、飲[の]む？」「ううん、飲[の]まない。」",
        "furigana": "「コーヒー、飲[の]む？」「ううん、飲[の]まない。」",
        "reading": "「コーヒー、nomu？」「uun、nomanai。」",
        "translation": "``Bạn có muốn uống cà phê không?'' ``Không, tôi không.''"
      }
    ]
  },
  {
    "id": "ja-g-n5-36-ta",
    "language": "ja",
    "level": "N5",
    "pattern": "〜た (ta)",
    "meaning": "đã làm (quá khứ đơn giản của động từ)",
    "formula": "Động từ thể た (V-ta)",
    "note": "Được làm chính xác như dạng て, với て→た và で→だ: 書いて→書いた, 飲んで→飲んだ, 行って→行った. Tương đương lịch sự: 〜ました.",
    "examples": [
      {
        "text": "週末[しゅうまつ]は家[いえ]で映画[えいが]を見[み]た。",
        "furigana": "週末[しゅうまつ]は家[いえ]で映画[えいが]を見[み]た。",
        "reading": "shuumatsuhaiedeeigaomita。",
        "translation": "Tôi xem phim ở nhà vào cuối tuần."
      },
      {
        "text": "駅[えき]で先生[せんせい]に会[あ]った。",
        "furigana": "駅[えき]で先生[せんせい]に会[あ]った。",
        "reading": "ekidesenseiniatta。",
        "translation": "Mình gặp thầy ở nhà ga."
      },
      {
        "text": "「昼[ひる]ご飯[はん]、食[た]べた？」「うん、もう食[た]べた。」",
        "furigana": "「昼[ひる]ご飯[はん]、食[た]べた？」「うん、もう食[た]べた。」",
        "reading": "「hirugohan、tabeta？」「un、moutabeta。」",
        "translation": "``Bạn đã ăn trưa chưa?'' ``Ừ, tôi đã ăn rồi.''"
      }
    ]
  },
  {
    "id": "ja-g-n5-37-mashou",
    "language": "ja",
    "level": "N5",
    "pattern": "〜ましょう (mashou)",
    "meaning": "let's (do)",
    "formula": "Động từ thể ます bỏ ます (V-masu) + ましょう",
    "note": "Được sử dụng khi người nói mong đợi người nghe đồng ý. Để mời nhẹ nhàng hơn, hãy sử dụng 〜ませんか.",
    "examples": [
      {
        "text": "いっしょに行[い]きましょう。",
        "furigana": "いっしょに行[い]きましょう。",
        "reading": "isshoniikimashou。",
        "translation": "Chúng ta hãy đi cùng nhau."
      },
      {
        "text": "少[すこ]し休[やす]みましょう。",
        "furigana": "少[すこ]し休[やす]みましょう。",
        "reading": "sukoshiyasumimashou。",
        "translation": "Chúng ta nghỉ ngơi nhé."
      },
      {
        "text": "駅[えき]の前[まえ]で会[あ]いましょう。",
        "furigana": "駅[えき]の前[まえ]で会[あ]いましょう。",
        "reading": "ekinomaedeaimashou。",
        "translation": "Chúng ta gặp nhau trước nhà ga nhé."
      }
    ]
  },
  {
    "id": "ja-g-n5-38-mashou-ka",
    "language": "ja",
    "level": "N5",
    "pattern": "〜ましょうか (mashou ka)",
    "meaning": "tôi sẽ ...?; chúng ta sẽ...?",
    "formula": "Động từ thể ます bỏ ます (V-masu) + ましょうか",
    "note": "Đề nghị làm điều gì đó cho người nghe (tôi có nên làm không?) hoặc yêu cầu họ cùng nhau quyết định điều gì đó (chúng ta có làm không?).",
    "examples": [
      {
        "text": "窓[まど]を開[あ]けましょうか。",
        "furigana": "窓[まど]を開[あ]けましょうか。",
        "reading": "madooakemashouka。",
        "translation": "Tôi mở cửa sổ nhé?"
      },
      {
        "text": "荷物[にもつ]を持[も]ちましょうか。",
        "furigana": "荷物[にもつ]を持[も]ちましょうか。",
        "reading": "nimotsuomochimashouka。",
        "translation": "Tôi có cần mang theo hành lý không?"
      },
      {
        "text": "何[なん]時[じ]に会[あ]いましょうか。",
        "furigana": "何[なん]時[じ]に会[あ]いましょうか。",
        "reading": "nanjiniaimashouka。",
        "translation": "Chúng ta sẽ gặp nhau lúc mấy giờ?"
      }
    ]
  },
  {
    "id": "ja-g-n5-39-masen-ka",
    "language": "ja",
    "level": "N5",
    "pattern": "〜ませんか (masen ka)",
    "meaning": "phải không bạn...?; bạn có muốn...? (lời mời lịch sự)",
    "formula": "Động từ thể ます bỏ ます (V-masu) + ませんか",
    "note": "Nhẹ nhàng hơn 〜ましょう vì nó khiến không gian người nghe bị suy giảm. Chấp nhận với ええ、〜ましょう.",
    "examples": [
      {
        "text": "いっしょに昼[ひる]ご飯[はん]を食[た]べませんか。",
        "furigana": "いっしょに昼[ひる]ご飯[はん]を食[た]べませんか。",
        "reading": "isshonihirugohanotabemasenka。",
        "translation": "Bạn có muốn ăn trưa cùng nhau không?"
      },
      {
        "text": "日曜日[にちようび]にテニスをしませんか。",
        "furigana": "日曜日[にちようび]にテニスをしませんか。",
        "reading": "nichiyoubiniテニスoshimasenka。",
        "translation": "Bạn có muốn chơi quần vợt vào Chủ Nhật không?"
      },
      {
        "text": "明日[あした]、公園[こうえん]を散歩[さんぽ]しませんか。",
        "furigana": "明日[あした]、公園[こうえん]を散歩[さんぽ]しませんか。",
        "reading": "ashita、kouenosanposhimasenka。",
        "translation": "Ngày mai bạn có muốn đi dạo trong công viên không?"
      }
    ]
  },
  {
    "id": "ja-g-n5-40-tai",
    "language": "ja",
    "level": "N5",
    "pattern": "〜たい (tai)",
    "meaning": "muốn (làm)",
    "formula": "Động từ thể ます bỏ ます (V-masu) + たい",
    "note": "Liên hợp như tính từ い: 〜たくない, 〜たかった. Đối tượng có thể lấy が hoặc を. Không dùng để nói trực tiếp mong muốn của người khác.",
    "examples": [
      {
        "text": "夏休[なつやす]みに沖縄[おきなわ]へ行[い]きたいです。",
        "furigana": "夏休[なつやす]みに沖縄[おきなわ]へ行[い]きたいです。",
        "reading": "natsuyasuminiokinawaheikitaidesu。",
        "translation": "Tôi muốn đến Okinawa vào kỳ nghỉ hè."
      },
      {
        "text": "冷[つめ]たい水[みず]が飲[の]みたいです。",
        "furigana": "冷[つめ]たい水[みず]が飲[の]みたいです。",
        "reading": "tsumetaimizuganomitaidesu。",
        "translation": "Tôi muốn uống nước lạnh."
      },
      {
        "text": "何[なに]が食[た]べたいですか。",
        "furigana": "何[なに]が食[た]べたいですか。",
        "reading": "nanigatabetaidesuka。",
        "translation": "Bạn muốn ăn gì?"
      }
    ]
  },
  {
    "id": "ja-g-n5-41-ga-hoshii",
    "language": "ja",
    "level": "N5",
    "pattern": "〜がほしい (ga hoshii)",
    "meaning": "muốn (cái gì đó)",
    "formula": "Danh từ (N) + がほしい",
    "note": "Đối với sự vật, không phải hành động (hành động sử dụng 〜たい). Liên hợp như tính từ い: ほしくない, ほしかった.",
    "examples": [
      {
        "text": "新[あたら]しいパソコンがほしいです。",
        "furigana": "新[あたら]しいパソコンがほしいです。",
        "reading": "atarashiiパソコンgahoshiidesu。",
        "translation": "Tôi muốn một chiếc máy tính mới."
      },
      {
        "text": "誕生[たんじょう]日[び]に何[なに]がほしいですか。",
        "furigana": "誕生[たんじょう]日[び]に何[なに]がほしいですか。",
        "reading": "tanjoubininanigahoshiidesuka。",
        "translation": "Bạn muốn gì vào ngày sinh nhật của mình?"
      },
      {
        "text": "今[いま]は何[なに]もほしくないです。",
        "furigana": "今[いま]は何[なに]もほしくないです。",
        "reading": "imahananimohoshikunaidesu。",
        "translation": "Lúc này tôi chẳng muốn gì cả."
      }
    ]
  },
  {
    "id": "ja-g-n5-42-o-kudasai",
    "language": "ja",
    "level": "N5",
    "pattern": "〜をください (o kudasai)",
    "meaning": "xin vui lòng cho tôi (cái gì đó); Tôi sẽ có",
    "formula": "Danh từ (N) + をください",
    "note": "Được sử dụng khi mua sắm hoặc đặt hàng. Số lượng theo sau を không có tiểu từ: 切手を二枚ください.",
    "examples": [
      {
        "text": "すみません、水[みず]をください。",
        "furigana": "すみません、水[みず]をください。",
        "reading": "sumimasen、mizuokudasai。",
        "translation": "Xin lỗi, cho tôi xin chút nước."
      },
      {
        "text": "このりんごを三[みっ]つください。",
        "furigana": "このりんごを三[みっ]つください。",
        "reading": "konoringoomittsukudasai。",
        "translation": "Cho tôi ba quả táo này nhé."
      },
      {
        "text": "メニューをください。",
        "furigana": "メニューをください。",
        "reading": "メニューokudasai。",
        "translation": "Cho em xin thực đơn nhé."
      }
    ]
  },
  {
    "id": "ja-g-n5-43-te-kudasai",
    "language": "ja",
    "level": "N5",
    "pattern": "〜てください (te kudasai)",
    "meaning": "làm ơn (làm)",
    "formula": "Động từ thể て (V-te) + ください",
    "note": "Lịch sự nhưng vẫn là một lời chỉ dẫn mà người nói mong muốn được tuân theo. Yêu cầu nhẹ nhàng hơn sử dụng 〜てくれませんか (N4).",
    "examples": [
      {
        "text": "もう少[すこ]しゆっくり話[はな]してください。",
        "furigana": "もう少[すこ]しゆっくり話[はな]してください。",
        "reading": "mousukoshiyukkurihanashitekudasai。",
        "translation": "Xin hãy nói chậm lại một chút."
      },
      {
        "text": "ここでくつをぬいでください。",
        "furigana": "ここでくつをぬいでください。",
        "reading": "kokodekutsuonuidekudasai。",
        "translation": "Hãy cởi giày ra đây."
      },
      {
        "text": "すみません、駅[えき]までの道[みち]を教[おし]えてください。",
        "furigana": "すみません、駅[えき]までの道[みち]を教[おし]えてください。",
        "reading": "sumimasen、ekimadenomichiooshietekudasai。",
        "translation": "Xin lỗi, bạn có thể chỉ cho tôi đường đến nhà ga được không?"
      }
    ]
  },
  {
    "id": "ja-g-n5-44-naide-kudasai",
    "language": "ja",
    "level": "N5",
    "pattern": "〜ないでください (naide kudasai)",
    "meaning": "xin đừng (làm)",
    "formula": "Động từ thể ない (V-nai) + でください",
    "note": "Nhẹ nhàng hơn 〜てはいけません. Trong cách nói thông thường ください được lược bỏ: 見ないで.",
    "examples": [
      {
        "text": "教室[きょうしつ]で食[た]べないでください。",
        "furigana": "教室[きょうしつ]で食[た]べないでください。",
        "reading": "kyoushitsudetabenaidekudasai。",
        "translation": "Vui lòng không ăn uống trong lớp học."
      },
      {
        "text": "この部屋[へや]に入[はい]らないでください。",
        "furigana": "この部屋[へや]に入[はい]らないでください。",
        "reading": "konoheyanihairanaidekudasai。",
        "translation": "Xin đừng vào phòng này."
      },
      {
        "text": "心配[しんぱい]しないでください。",
        "furigana": "心配[しんぱい]しないでください。",
        "reading": "shinpaishinaidekudasai。",
        "translation": "Đừng lo lắng."
      }
    ]
  },
  {
    "id": "ja-g-n5-45-te-mo-ii",
    "language": "ja",
    "level": "N5",
    "pattern": "〜てもいい (te mo ii)",
    "meaning": "có thể; không sao đâu",
    "formula": "Động từ thể て (V-te) + もいい",
    "note": "Thêm ですか để xin phép. Một lời từ chối lịch sự thường chỉ là すみません、ちょっと….",
    "examples": [
      {
        "text": "この辞書[じしょ]を使[つか]ってもいいですか。",
        "furigana": "この辞書[じしょ]を使[つか]ってもいいですか。",
        "reading": "konojishootsukattemoiidesuka。",
        "translation": "Tôi có thể sử dụng từ điển này được không?"
      },
      {
        "text": "今日[きょう]は早[はや]く帰[かえ]ってもいいです。",
        "furigana": "今日[きょう]は早[はや]く帰[かえ]ってもいいです。",
        "reading": "kyouhahayakukaettemoiidesu。",
        "translation": "Hôm nay bạn có thể về nhà sớm."
      },
      {
        "text": "ここにすわってもいいですか。",
        "furigana": "ここにすわってもいいですか。",
        "reading": "kokonisuwattemoiidesuka。",
        "translation": "Tôi có thể ngồi đây được không?"
      }
    ]
  },
  {
    "id": "ja-g-n5-46-te-wa-ikenai",
    "language": "ja",
    "level": "N5",
    "pattern": "〜てはいけない (te wa ikenai)",
    "meaning": "không được; có thể không",
    "formula": "Động từ thể て (V-te) + はいけない",
    "note": "Một sự cấm đoán mạnh mẽ, thường dành cho các quy tắc. Hình thức lịch sự: 〜てはいけません. Co rút thông thường: 〜ちゃいけない / 〜じゃいけない.",
    "examples": [
      {
        "text": "図書館[としょかん]で大[おお]きい声[こえ]で話[はな]してはいけません。",
        "furigana": "図書館[としょかん]で大[おお]きい声[こえ]で話[はな]してはいけません。",
        "reading": "toshokandeookiikoedehanashitehaikemasen。",
        "translation": "Đừng nói to trong thư viện."
      },
      {
        "text": "子[こ]どもはこの川[かわ]で泳[およ]いではいけません。",
        "furigana": "子[こ]どもはこの川[かわ]で泳[およ]いではいけません。",
        "reading": "kodomohakonokawadeoyoidehaikemasen。",
        "translation": "Trẻ em không được phép bơi ở dòng sông này."
      },
      {
        "text": "ここでたばこを吸[す]ってはいけません。",
        "furigana": "ここでたばこを吸[す]ってはいけません。",
        "reading": "kokodetabakoosuttehaikemasen。",
        "translation": "Bạn không được phép hút thuốc ở đây."
      }
    ]
  },
  {
    "id": "ja-g-n5-47-nakereba-naranai-nakute-wa-ikenai",
    "language": "ja",
    "level": "N5",
    "pattern": "〜なければならない / 〜なくてはいけない (nakereba naranai / nakute wa ikenai)",
    "meaning": "phải; phải",
    "formula": "Động từ thể ない (V-nai) stem + なければならない / Động từ thể ない (V-nai) stem + なくてはいけない",
    "note": "Các hình thức lịch sự kết thúc bằng なりません / いけません. Cả hai đều có nghĩa giống nhau; なければならない nghe có vẻ trang trọng hơn một chút.",
    "examples": [
      {
        "text": "明日[あした]は6時[じ]に起[お]きなければなりません。",
        "furigana": "明日[あした]は6時[じ]に起[お]きなければなりません。",
        "reading": "ashitaha6jiniokinakerebanarimasen。",
        "translation": "Ngày mai tôi phải dậy lúc 6 giờ."
      },
      {
        "text": "今日[きょう]は早[はや]く家[いえ]に帰[かえ]らなくてはいけません。",
        "furigana": "今日[きょう]は早[はや]く家[いえ]に帰[かえ]らなくてはいけません。",
        "reading": "kyouhahayakuienikaeranakutehaikemasen。",
        "translation": "Hôm nay tôi phải về nhà sớm."
      },
      {
        "text": "日本[にほん]では、家[いえ]に入[はい]る前[まえ]にくつをぬがなければなりません。",
        "furigana": "日本[にほん]では、家[いえ]に入[はい]る前[まえ]にくつをぬがなければなりません。",
        "reading": "nihondeha、ienihairumaenikutsuonuganakerebanarimasen。",
        "translation": "Ở Nhật thì phải cởi giày trước khi vào nhà."
      }
    ]
  },
  {
    "id": "ja-g-n5-48-nakute-mo-ii",
    "language": "ja",
    "level": "N5",
    "pattern": "〜なくてもいい (nakute mo ii)",
    "meaning": "không cần; không cần",
    "formula": "Động từ thể ない (V-nai) stem + なくてもいい",
    "note": "Ngược lại với 〜なければならない. Hỏi với 〜なくてもいいですか (Tôi không hỏi thì có được không?).",
    "examples": [
      {
        "text": "明日[あした]は学校[がっこう]へ来[こ]なくてもいいです。",
        "furigana": "明日[あした]は学校[がっこう]へ来[こ]なくてもいいです。",
        "reading": "ashitahagakkouhekonakutemoiidesu。",
        "translation": "Ngày mai bạn không cần phải đến trường."
      },
      {
        "text": "名前[なまえ]は書[か]かなくてもいいです。",
        "furigana": "名前[なまえ]は書[か]かなくてもいいです。",
        "reading": "namaehakakanakutemoiidesu。",
        "translation": "Bạn không cần phải viết tên mình."
      },
      {
        "text": "今日[きょう]は料理[りょうり]をしなくてもいいですよ。",
        "furigana": "今日[きょう]は料理[りょうり]をしなくてもいいですよ。",
        "reading": "kyouharyourioshinakutemoiidesuyo。",
        "translation": "Hôm nay bạn không cần phải nấu ăn."
      }
    ]
  },
  {
    "id": "ja-g-n5-49-te-iru",
    "language": "ja",
    "level": "N5",
    "pattern": "〜ている (te iru)",
    "meaning": "đang làm (hành động đang diễn ra); ở trong trạng thái (kết quả của một sự thay đổi); làm thường xuyên",
    "formula": "Động từ thể て (V-te) + いる",
    "note": "Với động từ hành động (食べる, 読む) nó thể hiện một hành động đang diễn ra; với động từ thay đổi (結婚する, 開く, 知る) nó hiển thị trạng thái kết quả. Lịch sự: 〜ています.",
    "examples": [
      {
        "text": "弟[おとうと]は今[いま]、部屋[へや]でゲームをしています。",
        "furigana": "弟[おとうと]は今[いま]、部屋[へや]でゲームをしています。",
        "reading": "otoutohaima、heyadeゲームoshiteimasu。",
        "translation": "Hiện tại anh trai tôi đang chơi game trong phòng."
      },
      {
        "text": "姉[あね]は結婚[けっこん]しています。",
        "furigana": "姉[あね]は結婚[けっこん]しています。",
        "reading": "anehakekkonshiteimasu。",
        "translation": "Chị tôi lấy chồng rồi."
      },
      {
        "text": "窓[まど]が開[あ]いています。",
        "furigana": "窓[まど]が開[あ]いています。",
        "reading": "madogaaiteimasu。",
        "translation": "Cửa sổ đang mở."
      }
    ]
  },
  {
    "id": "ja-g-n5-50-te",
    "language": "ja",
    "level": "N5",
    "pattern": "〜て (te)",
    "meaning": "và; và sau đó (liên kết các hành động theo thứ tự)",
    "formula": "Động từ thể て (V-te) + Câu",
    "note": "Động từ cuối cùng thiết lập thì cho cả câu. 書く→書いて, 飲む→飲んで, 話す→話して, 買う→買って, 行く→行って (không đều).",
    "examples": [
      {
        "text": "朝[あさ]起[お]きて、顔[かお]を洗[あら]います。",
        "furigana": "朝[あさ]起[お]きて、顔[かお]を洗[あら]います。",
        "reading": "asaokite、kaooaraimasu。",
        "translation": "Sáng dậy rửa mặt."
      },
      {
        "text": "デパートへ行[い]って、セーターを買[か]いました。",
        "furigana": "デパートへ行[い]って、セーターを買[か]いました。",
        "reading": "デパートheitte、セーターokaimashita。",
        "translation": "Tôi đến cửa hàng bách hóa và mua một chiếc áo len."
      },
      {
        "text": "家[いえ]に帰[かえ]って、晩[ばん]ご飯[はん]を食[た]べて、寝[ね]ました。",
        "furigana": "家[いえ]に帰[かえ]って、晩[ばん]ご飯[はん]を食[た]べて、寝[ね]ました。",
        "reading": "ienikaette、bangohanotabete、nemashita。",
        "translation": "Tôi về nhà, ăn tối rồi đi ngủ."
      }
    ]
  },
  {
    "id": "ja-g-n5-51-te-kara",
    "language": "ja",
    "level": "N5",
    "pattern": "〜てから (te kara)",
    "meaning": "sau khi làm; (làm A) rồi đến (B); kể từ",
    "formula": "Động từ thể て (V-te) + から",
    "note": "Nhấn mạnh rằng A kết thúc trước khi B bắt đầu, rõ ràng hơn so với て đơn giản. Với ている trong mệnh đề chính nó thường có nghĩa là 'kể từ'.",
    "examples": [
      {
        "text": "手[て]を洗[あら]ってから、ご飯[はん]を食[た]べましょう。",
        "furigana": "手[て]を洗[あら]ってから、ご飯[はん]を食[た]べましょう。",
        "reading": "teoarattekara、gohanotabemashou。",
        "translation": "Rửa tay trước khi ăn."
      },
      {
        "text": "宿題[しゅくだい]をしてから、テレビを見[み]ます。",
        "furigana": "宿題[しゅくだい]をしてから、テレビを見[み]ます。",
        "reading": "shukudaioshitekara、テレビomimasu。",
        "translation": "Mình sẽ làm bài tập về nhà rồi xem TV."
      },
      {
        "text": "日本[にほん]に来[き]てから、毎日[まいにち]日本語[にほんご]を勉強[べんきょう]しています。",
        "furigana": "日本[にほん]に来[き]てから、毎日[まいにち]日本語[にほんご]を勉強[べんきょう]しています。",
        "reading": "nihonnikitekara、mainichinihongoobenkyoushiteimasu。",
        "translation": "Tôi đã học tiếng Nhật hàng ngày kể từ khi tôi đến Nhật Bản."
      }
    ]
  },
  {
    "id": "ja-g-n5-52-tari-tari-suru",
    "language": "ja",
    "level": "N5",
    "pattern": "〜たり〜たりする (tari ... tari suru)",
    "meaning": "làm những việc như A và B; mặc dù đôi khi A, đôi khi B",
    "formula": "Động từ thể た (V-ta) + り + Động từ thể た (V-ta) + りする",
    "note": "Chọn ra một vài hành động từ nhiều hành động. Căng thẳng và lịch sự diễn ra ở phần cuối cùng する: 〜たりしました.",
    "examples": [
      {
        "text": "日曜日[にちようび]はそうじをしたり、洗濯[せんたく]をしたりします。",
        "furigana": "日曜日[にちようび]はそうじをしたり、洗濯[せんたく]をしたりします。",
        "reading": "nichiyoubihasoujioshitari、sentakuoshitarishimasu。",
        "translation": "Chủ nhật, tôi dọn dẹp nhà cửa và giặt giũ."
      },
      {
        "text": "休[やす]みの日[ひ]は本[ほん]を読[よ]んだり、音楽[おんがく]を聞[き]いたりします。",
        "furigana": "休[やす]みの日[ひ]は本[ほん]を読[よ]んだり、音楽[おんがく]を聞[き]いたりします。",
        "reading": "yasuminohihahonoyondari、ongakuokiitarishimasu。",
        "translation": "Ngày nghỉ tôi đọc sách và nghe nhạc."
      },
      {
        "text": "夏休[なつやす]みは海[うみ]で泳[およ]いだり、山[やま]に登[のぼ]ったりしました。",
        "furigana": "夏休[なつやす]みは海[うみ]で泳[およ]いだり、山[やま]に登[のぼ]ったりしました。",
        "reading": "natsuyasumihaumideoyoidari、yamaninobottarishimashita。",
        "translation": "Trong kỳ nghỉ hè, tôi đã bơi dưới biển và leo núi."
      }
    ]
  },
  {
    "id": "ja-g-n5-53-ta-koto-ga-aru",
    "language": "ja",
    "level": "N5",
    "pattern": "〜たことがある (ta koto ga aru)",
    "meaning": "đã (đã từng) thực hiện; có kinh nghiệm làm",
    "formula": "Động từ thể た (V-ta) + ことがある",
    "note": "Nói về kinh nghiệm sống chứ không phải việc vừa làm: きのう食べたことがある là sai. Phủ định 〜たことがありません có nghĩa là 'chưa bao giờ'.",
    "examples": [
      {
        "text": "富士山[ふじさん]に登[のぼ]ったことがあります。",
        "furigana": "富士山[ふじさん]に登[のぼ]ったことがあります。",
        "reading": "fujisanninobottakotogaarimasu。",
        "translation": "Tôi đã leo núi Phú Sĩ."
      },
      {
        "text": "日本[にほん]の映画[えいが]を見[み]たことがありますか。",
        "furigana": "日本[にほん]の映画[えいが]を見[み]たことがありますか。",
        "reading": "nihonnoeigaomitakotogaarimasuka。",
        "translation": "Bạn đã từng xem phim Nhật chưa?"
      },
      {
        "text": "私[わたし]は馬[うま]に乗[の]ったことがありません。",
        "furigana": "私[わたし]は馬[うま]に乗[の]ったことがありません。",
        "reading": "watashihaumaninottakotogaarimasen。",
        "translation": "Tôi chưa bao giờ cưỡi ngựa."
      }
    ]
  },
  {
    "id": "ja-g-n5-54-mae-ni",
    "language": "ja",
    "level": "N5",
    "pattern": "〜前に (mae ni)",
    "meaning": "trước (làm); trước (một sự kiện); trước",
    "formula": "Động từ thể từ điển (V-dict) + 前に / Danh từ (N) + の + 前に",
    "note": "Động từ trước 前に luôn ở dạng từ điển, ngay cả khi nói về quá khứ. Với khoảng thời gian dài không có の: 3年前に (ba năm trước).",
    "examples": [
      {
        "text": "寝[ね]る前[まえ]に歯[は]をみがきます。",
        "furigana": "寝[ね]る前[まえ]に歯[は]をみがきます。",
        "reading": "nerumaenihaomigakimasu。",
        "translation": "Mình đánh răng trước khi đi ngủ."
      },
      {
        "text": "授業[じゅぎょう]の前[まえ]にコーヒーを飲[の]みます。",
        "furigana": "授業[じゅぎょう]の前[まえ]にコーヒーを飲[の]みます。",
        "reading": "jugyounomaeniコーヒーonomimasu。",
        "translation": "Tôi sẽ uống cà phê trước khi vào lớp."
      },
      {
        "text": "3年[ねん]前[まえ]に日本[にほん]へ来[き]ました。",
        "furigana": "3年[ねん]前[まえ]に日本[にほん]へ来[き]ました。",
        "reading": "3nenmaeninihonhekimashita。",
        "translation": "Tôi đến Nhật Bản cách đây ba năm."
      }
    ]
  },
  {
    "id": "ja-g-n5-55-ato-de",
    "language": "ja",
    "level": "N5",
    "pattern": "〜後で (ato de)",
    "meaning": "sau (làm); sau (một sự kiện)",
    "formula": "Động từ thể た (V-ta) + 後で / Danh từ (N) + の + 後で",
    "note": "Động từ trước 後で luôn ở dạng た, ngay cả đối với những kế hoạch trong tương lai. Bản thân 後で có nghĩa là 'sau'.",
    "examples": [
      {
        "text": "晩[ばん]ご飯[はん]を食[た]べた後[あと]で、散歩[さんぽ]をします。",
        "furigana": "晩[ばん]ご飯[はん]を食[た]べた後[あと]で、散歩[さんぽ]をします。",
        "reading": "bangohanotabetaatode、sanpooshimasu。",
        "translation": "Ăn tối xong mình sẽ đi dạo."
      },
      {
        "text": "仕事[しごと]の後[あと]で、いっしょに飲[の]みに行[い]きませんか。",
        "furigana": "仕事[しごと]の後[あと]で、いっしょに飲[の]みに行[い]きませんか。",
        "reading": "shigotonoatode、isshoninominiikimasenka。",
        "translation": "Bạn có muốn đi uống nước sau giờ làm việc không?"
      },
      {
        "text": "テストが終[お]わった後[あと]で、友達[ともだち]と遊[あそ]びました。",
        "furigana": "テストが終[お]わった後[あと]で、友達[ともだち]と遊[あそ]びました。",
        "reading": "テストgaowattaatode、tomodachitoasobimashita。",
        "translation": "Sau khi kiểm tra xong, tôi chơi với bạn bè."
      }
    ]
  },
  {
    "id": "ja-g-n5-56-nagara",
    "language": "ja",
    "level": "N5",
    "pattern": "〜ながら（while） (nagara)",
    "meaning": "while (thực hiện hai hành động cùng một lúc)",
    "formula": "Động từ thể ます bỏ ます (V-masu) + ながら",
    "note": "Cả hai hành động đều được thực hiện bởi cùng một người. Hành động chính diễn ra sau cùng: trong A-ながら B, B là hành động chính.",
    "examples": [
      {
        "text": "音楽[おんがく]を聞[き]きながら勉強[べんきょう]します。",
        "furigana": "音楽[おんがく]を聞[き]きながら勉強[べんきょう]します。",
        "reading": "ongakuokikinagarabenkyoushimasu。",
        "translation": "Mình vừa học vừa nghe nhạc."
      },
      {
        "text": "父[ちち]はいつも新聞[しんぶん]を読[よ]みながら朝[あさ]ご飯[はん]を食[た]べます。",
        "furigana": "父[ちち]はいつも新聞[しんぶん]を読[よ]みながら朝[あさ]ご飯[はん]を食[た]べます。",
        "reading": "chichihaitsumoshinbunoyominagaraasagohanotabemasu。",
        "translation": "Bố tôi luôn ăn sáng trong khi đọc báo."
      },
      {
        "text": "コーヒーを飲[の]みながら話[はな]しましょう。",
        "furigana": "コーヒーを飲[の]みながら話[はな]しましょう。",
        "reading": "コーヒーonominagarahanashimashou。",
        "translation": "Cà phê nói chuyện nhé."
      }
    ]
  },
  {
    "id": "ja-g-n5-57-ni-iku",
    "language": "ja",
    "level": "N5",
    "pattern": "〜に行く (ni iku)",
    "meaning": "đi (đi đâu đó) để làm",
    "formula": "Động từ thể ます bỏ ます (V-masu) + に行く / Danh từ (N) + に行く",
    "note": "来る và 帰る hoạt động giống nhau: 遊びに来る. Với danh từ する, danh từ có thể đi trực tiếp: 買い物に行く, 散歩に行く.",
    "examples": [
      {
        "text": "デパートへ服[ふく]を買[か]いに行[い]きます。",
        "furigana": "デパートへ服[ふく]を買[か]いに行[い]きます。",
        "reading": "デパートhefukuokainiikimasu。",
        "translation": "Tôi đang đi đến cửa hàng bách hóa để mua quần áo."
      },
      {
        "text": "週末[しゅうまつ]、海[うみ]へ泳[およ]ぎに行[い]きました。",
        "furigana": "週末[しゅうまつ]、海[うみ]へ泳[およ]ぎに行[い]きました。",
        "reading": "shuumatsu、umiheoyoginiikimashita。",
        "translation": "Cuối tuần tôi đi tắm biển."
      },
      {
        "text": "友達[ともだち]がうちへ遊[あそ]びに来[き]ました。",
        "furigana": "友達[ともだち]がうちへ遊[あそ]びに来[き]ました。",
        "reading": "tomodachigauchiheasobinikimashita。",
        "translation": "Một người bạn đến thăm nhà tôi."
      }
    ]
  },
  {
    "id": "ja-g-n5-58-ga-suki-ga-kirai",
    "language": "ja",
    "level": "N5",
    "pattern": "〜が好き / 〜が嫌い (ga suki / ga kirai)",
    "meaning": "like; không thích",
    "formula": "Danh từ (N) + が好き / Danh từ (N) + が嫌い / Động từ thể từ điển (V-dict) + の + が好き",
    "note": "好き và 嫌い là tính từ な, nên từ thích dùng が, không phải を. 大好き và 大嫌い mạnh hơn. 嫌い nghe có vẻ thẳng thừng; あまり好きじゃない thì nhẹ nhàng hơn.",
    "examples": [
      {
        "text": "私[わたし]は甘[あま]いものが好[す]きです。",
        "furigana": "私[わたし]は甘[あま]いものが好[す]きです。",
        "reading": "watashihaamaimonogasukidesu。",
        "translation": "Tôi thích đồ ngọt."
      },
      {
        "text": "弟[おとうと]は野菜[やさい]が嫌[きら]いです。",
        "furigana": "弟[おとうと]は野菜[やさい]が嫌[きら]いです。",
        "reading": "otoutohayasaigakiraidesu。",
        "translation": "Em trai tôi ghét rau."
      },
      {
        "text": "母[はは]は料理[りょうり]をするのが好[す]きです。",
        "furigana": "母[はは]は料理[りょうり]をするのが好[す]きです。",
        "reading": "hahaharyouriosurunogasukidesu。",
        "translation": "Mẹ tôi thích nấu ăn."
      }
    ]
  },
  {
    "id": "ja-g-n5-59-ga-jouzu-ga-heta",
    "language": "ja",
    "level": "N5",
    "pattern": "〜が上手 / 〜が下手 (ga jouzu / ga heta)",
    "meaning": "giỏi; tệ",
    "formula": "Danh từ (N) + が上手 / Danh từ (N) + が下手",
    "note": "Chủ yếu được sử dụng về người khác; tự gọi mình là 上手 nghe có vẻ giống như khoe khoang. Cả hai đều là tính từ な: 料理が上手な人.",
    "examples": [
      {
        "text": "姉[あね]はピアノが上手[じょうず]です。",
        "furigana": "姉[あね]はピアノが上手[じょうず]です。",
        "reading": "anehaピアノgajouzudesu。",
        "translation": "Em gái tôi chơi piano giỏi."
      },
      {
        "text": "私[わたし]は歌[うた]が下手[へた]です。",
        "furigana": "私[わたし]は歌[うた]が下手[へた]です。",
        "reading": "watashihautagahetadesu。",
        "translation": "Tôi hát không hay."
      },
      {
        "text": "マイクさんは日本語[にほんご]が上手[じょうず]ですね。",
        "furigana": "マイクさんは日本語[にほんご]が上手[じょうず]ですね。",
        "reading": "マイクsanhanihongogajouzudesune。",
        "translation": "Mike-san nói tiếng Nhật tốt."
      }
    ]
  },
  {
    "id": "ja-g-n5-60-ga-aru-ga-iru",
    "language": "ja",
    "level": "N5",
    "pattern": "〜がある / 〜がいる (ga aru / ga iru)",
    "meaning": "thì có; có; có (ある cho đồ vật, いる cho người và động vật)",
    "formula": "Danh từ (N) + がある / Danh từ (N) + がいる",
    "note": "ある dùng để chỉ đồ vật, thực vật và sự kiện; いる dành cho người và động vật. Phủ định: ない / いない (lịch sự: ありません / いません).",
    "examples": [
      {
        "text": "公園[こうえん]に大[おお]きい木[き]があります。",
        "furigana": "公園[こうえん]に大[おお]きい木[き]があります。",
        "reading": "kouenniookiikigaarimasu。",
        "translation": "Có một cái cây lớn trong công viên."
      },
      {
        "text": "私[わたし]は妹[いもうと]が一人[ひとり]います。",
        "furigana": "私[わたし]は妹[いもうと]が一人[ひとり]います。",
        "reading": "watashihaimoutogahitoriimasu。",
        "translation": "Tôi có một em gái."
      },
      {
        "text": "明日[あした]、日本語[にほんご]のテストがあります。",
        "furigana": "明日[あした]、日本語[にほんご]のテストがあります。",
        "reading": "ashita、nihongonoテストgaarimasu。",
        "translation": "Ngày mai tôi có bài kiểm tra tiếng Nhật."
      }
    ]
  },
  {
    "id": "ja-g-n5-61-kara-reason",
    "language": "ja",
    "level": "N5",
    "pattern": "〜から（reason） (kara (reason))",
    "meaning": "bởi vì; từ; thế nên",
    "formula": "Câu + から",
    "note": "Lý do đến trước: A から B (A, vậy B). Trả lời どうして bằng 〜からです. Danh từ và tính từ な cần だ: 雨だから.",
    "examples": [
      {
        "text": "今日[きょう]は寒[さむ]いから、コートを着[き]ます。",
        "furigana": "今日[きょう]は寒[さむ]いから、コートを着[き]ます。",
        "reading": "kyouhasamuikara、コートokimasu。",
        "translation": "Hôm nay trời lạnh nên tôi sẽ mặc áo khoác vào."
      },
      {
        "text": "時間[じかん]がありませんから、タクシーで行[い]きましょう。",
        "furigana": "時間[じかん]がありませんから、タクシーで行[い]きましょう。",
        "reading": "jikangaarimasenkara、タクシーdeikimashou。",
        "translation": "Chúng ta không có nhiều thời gian nên hãy đi taxi nhé."
      },
      {
        "text": "「どうして休[やす]みましたか。」「頭[あたま]が痛[いた]かったからです。」",
        "furigana": "「どうして休[やす]みましたか。」「頭[あたま]が痛[いた]かったからです。」",
        "reading": "「doushiteyasumimashitaka。」「atamagaitakattakaradesu。」",
        "translation": "``Tại sao bạn lại nghỉ ngày?'' ``Bởi vì tôi bị đau đầu.''"
      }
    ]
  },
  {
    "id": "ja-g-n5-62-ga-but",
    "language": "ja",
    "level": "N5",
    "pattern": "〜が（but） (ga (but))",
    "meaning": "nhưng; mặc dù",
    "formula": "Câu + が",
    "note": "Cũng được sử dụng chỉ để làm dịu đi một yêu cầu hoặc dẫn dắt vào một chủ đề: すみませんが…. Trang trọng hơn một chút so với けど (N4).",
    "examples": [
      {
        "text": "この店[みせ]は安[やす]いですが、あまりおいしくないです。",
        "furigana": "この店[みせ]は安[やす]いですが、あまりおいしくないです。",
        "reading": "konomisehayasuidesuga、amarioishikunaidesu。",
        "translation": "Quán này rẻ nhưng không ngon lắm."
      },
      {
        "text": "日本語[にほんご]は難[むずか]しいですが、おもしろいです。",
        "furigana": "日本語[にほんご]は難[むずか]しいですが、おもしろいです。",
        "reading": "nihongohamuzukashiidesuga、omoshiroidesu。",
        "translation": "Tiếng Nhật tuy khó nhưng lại rất thú vị."
      },
      {
        "text": "すみませんが、ちょっと静[しず]かにしてください。",
        "furigana": "すみませんが、ちょっと静[しず]かにしてください。",
        "reading": "sumimasenga、chottoshizukanishitekudasai。",
        "translation": "Xin lỗi, nhưng xin hãy im lặng một lát."
      }
    ]
  },
  {
    "id": "ja-g-n5-63-deshou",
    "language": "ja",
    "level": "N5",
    "pattern": "〜でしょう (deshou)",
    "meaning": "; tôi nghĩ; ..., Phải?",
    "formula": "Động từ thể thông thường (V thường) / Tính từ đuôi い (A-i) / Tính từ đuôi な (A-na) / Danh từ (N) + でしょう",
    "note": "Điển hình của dự báo thời tiết. Nói với ngữ điệu lên cao, nó yêu cầu người nghe đồng ý. Dạng thông thường: だろう (N4).",
    "examples": [
      {
        "text": "明日[あした]は雨[あめ]が降[ふ]るでしょう。",
        "furigana": "明日[あした]は雨[あめ]が降[ふ]るでしょう。",
        "reading": "ashitahaamegafurudeshou。",
        "translation": "Ngày mai trời sẽ mưa."
      },
      {
        "text": "山[やま]の上[うえ]は寒[さむ]いでしょう。",
        "furigana": "山[やま]の上[うえ]は寒[さむ]いでしょう。",
        "reading": "yamanouehasamuideshou。",
        "translation": "Lên núi chắc lạnh lắm."
      },
      {
        "text": "このかばん、かわいいでしょう？",
        "furigana": "このかばん、かわいいでしょう？",
        "reading": "konokaban、kawaiideshou？",
        "translation": "Chiếc túi này có dễ thương không?"
      }
    ]
  },
  {
    "id": "ja-g-n5-64-ku-naru-ni-naru",
    "language": "ja",
    "level": "N5",
    "pattern": "〜くなる / 〜になる (ku naru / ni naru)",
    "meaning": "trở thành; lấy; bật",
    "formula": "Tính từ đuôi い (A-i)-ku + なる / Tính từ đuôi な (A-na) + になる / Danh từ (N) + になる",
    "note": "いい trở thành よくなる. Thường được dùng trong quá khứ để mô tả một sự thay đổi đã xảy ra: 大きくなりました.",
    "examples": [
      {
        "text": "あたたかくなりましたね。",
        "furigana": "あたたかくなりましたね。",
        "reading": "atatakakunarimashitane。",
        "translation": "Trời ngày càng ấm hơn phải không?"
      },
      {
        "text": "部屋[へや]がきれいになりました。",
        "furigana": "部屋[へや]がきれいになりました。",
        "reading": "heyagakireininarimashita。",
        "translation": "Phòng bây giờ sạch sẽ rồi."
      },
      {
        "text": "兄[あに]は来年[らいねん]、医者[いしゃ]になります。",
        "furigana": "兄[あに]は来年[らいねん]、医者[いしゃ]になります。",
        "reading": "aniharainen、ishaninarimasu。",
        "translation": "Anh trai tôi sẽ trở thành bác sĩ vào năm tới."
      }
    ]
  },
  {
    "id": "ja-g-n5-65-ni-suru",
    "language": "ja",
    "level": "N5",
    "pattern": "〜にする（decide） (ni suru)",
    "meaning": "; chọn; Tôi sẽ có",
    "formula": "Danh từ (N) + にする",
    "note": "Phổ biến khi đặt món ăn hoặc chọn từ các lựa chọn. Quá khứ: 〜にしました (Tôi đã quyết định về...).",
    "examples": [
      {
        "text": "私[わたし]はカレーにします。",
        "furigana": "私[わたし]はカレーにします。",
        "reading": "watashihaカレーnishimasu。",
        "translation": "Tôi sẽ làm cà ri."
      },
      {
        "text": "飲[の]み物[もの]は何[なに]にしますか。",
        "furigana": "飲[の]み物[もの]は何[なに]にしますか。",
        "reading": "nomimonohananinishimasuka。",
        "translation": "Bạn muốn uống gì."
      },
      {
        "text": "旅行[りょこう]は来月[らいげつ]にしましょう。",
        "furigana": "旅行[りょこう]は来月[らいげつ]にしましょう。",
        "reading": "ryokouharaigetsunishimashou。",
        "translation": "Hãy thực hiện chuyến đi vào tháng sau nhé."
      }
    ]
  },
  {
    "id": "ja-g-n5-66-mada-te-inai",
    "language": "ja",
    "level": "N5",
    "pattern": "まだ〜ていない (mada ... te inai)",
    "meaning": "chưa (đã làm)",
    "formula": "まだ + Động từ thể て (V-te) + いない / まだ + Động từ thể て (V-te) + いません",
    "note": "Sử dụng ていない, không phải ませんでした, cho một điều gì đó vẫn có thể xảy ra. Câu trả lời ngắn gọn là いいえ、まだです.",
    "examples": [
      {
        "text": "まだ昼[ひる]ご飯[はん]を食[た]べていません。",
        "furigana": "まだ昼[ひる]ご飯[はん]を食[た]べていません。",
        "reading": "madahirugohanotabeteimasen。",
        "translation": "Tôi chưa ăn trưa."
      },
      {
        "text": "「宿題[しゅくだい]はもうしましたか。」「いいえ、まだしていません。」",
        "furigana": "「宿題[しゅくだい]はもうしましたか。」「いいえ、まだしていません。」",
        "reading": "「shukudaihamoushimashitaka。」「iie、madashiteimasen。」",
        "translation": "``Bạn đã làm bài tập về nhà chưa?'' ``Chưa, tôi chưa làm.''"
      },
      {
        "text": "電車[でんしゃ]はまだ来[き]ていません。",
        "furigana": "電車[でんしゃ]はまだ来[き]ていません。",
        "reading": "denshahamadakiteimasen。",
        "translation": "Tàu chưa đến."
      }
    ]
  },
  {
    "id": "ja-g-n5-67-mou-ta",
    "language": "ja",
    "level": "N5",
    "pattern": "もう〜た (mou ... ta)",
    "meaning": "rồi (đã làm); (trong câu hỏi) chưa",
    "formula": "もう + Động từ thể た (V-ta) / もう + Động từ thể ます bỏ ます (V-masu) + ました",
    "note": "Trong câu hỏi もう có nghĩa là 'chưa'. Với động từ phủ định, もう có nghĩa là 'không còn nữa': もう食べません.",
    "examples": [
      {
        "text": "「もう晩[ばん]ご飯[はん]を食[た]べましたか。」「はい、もう食[た]べました。」",
        "furigana": "「もう晩[ばん]ご飯[はん]を食[た]べましたか。」「はい、もう食[た]べました。」",
        "reading": "「moubangohanotabemashitaka。」「hai、moutabemashita。」",
        "translation": "“Bạn đã ăn tối chưa?” Có, tôi đã ăn rồi."
      },
      {
        "text": "妹[いもうと]はもう寝[ね]ました。",
        "furigana": "妹[いもうと]はもう寝[ね]ました。",
        "reading": "imoutohamounemashita。",
        "translation": "Em gái tôi đã đi ngủ rồi."
      },
      {
        "text": "映画[えいが]はもう始[はじ]まりましたよ。",
        "furigana": "映画[えいが]はもう始[はじ]まりましたよ。",
        "reading": "eigahamouhajimarimashitayo。",
        "translation": "Phim đã bắt đầu rồi."
      }
    ]
  },
  {
    "id": "ja-g-n5-68-amari-nai",
    "language": "ja",
    "level": "N5",
    "pattern": "あまり〜ない (amari ... nai)",
    "meaning": "không hẳn; không nhiều; không thường xuyên",
    "formula": "あまり + Động từ thể ない (V-nai) / あまり + Tính từ đuôi い (A-i)-ku + ない / あまり + Tính từ đuôi な (A-na) + じゃない",
    "note": "Luôn theo sau là dạng phủ định. あまり好きじゃない là một cách nhẹ nhàng hơn để nói rằng bạn không thích điều gì đó.",
    "examples": [
      {
        "text": "私[わたし]はあまりテレビを見[み]ません。",
        "furigana": "私[わたし]はあまりテレビを見[み]ません。",
        "reading": "watashihaamariテレビomimasen。",
        "translation": "Tôi không xem TV nhiều."
      },
      {
        "text": "このりんごはあまり甘[あま]くないです。",
        "furigana": "このりんごはあまり甘[あま]くないです。",
        "reading": "konoringohaamariamakunaidesu。",
        "translation": "Táo này không ngọt lắm đâu."
      },
      {
        "text": "今日[きょう]はあまり忙[いそが]しくありません。",
        "furigana": "今日[きょう]はあまり忙[いそが]しくありません。",
        "reading": "kyouhaamariisogashikuarimasen。",
        "translation": "Hôm nay tôi không bận lắm."
      }
    ]
  },
  {
    "id": "ja-g-n5-69-zenzen-nai",
    "language": "ja",
    "level": "N5",
    "pattern": "全然〜ない (zenzen ... nai)",
    "meaning": "hoàn toàn không; ít nhất không phải vì",
    "formula": "全然 + Động từ thể ない (V-nai) / 全然 + Tính từ đuôi い (A-i)-ku + ない / 全然 + Tính từ đuôi な (A-na) + じゃない",
    "note": "Mạnh hơn あまり〜ない. Trong lời nói thông thường, 全然 đôi khi được sử dụng với những từ tích cực (全然大丈夫), nhưng với từ phủ định là cách sử dụng tiêu chuẩn.",
    "examples": [
      {
        "text": "この問題[もんだい]は全然[ぜんぜん]わかりません。",
        "furigana": "この問題[もんだい]は全然[ぜんぜん]わかりません。",
        "reading": "konomondaihazenzenwakarimasen。",
        "translation": "Mình không hiểu vấn đề này chút nào."
      },
      {
        "text": "今日[きょう]は全然[ぜんぜん]寒[さむ]くないです。",
        "furigana": "今日[きょう]は全然[ぜんぜん]寒[さむ]くないです。",
        "reading": "kyouhazenzensamukunaidesu。",
        "translation": "Hôm nay trời không lạnh chút nào."
      },
      {
        "text": "弟[おとうと]は全然[ぜんぜん]勉強[べんきょう]しません。",
        "furigana": "弟[おとうと]は全然[ぜんぜん]勉強[べんきょう]しません。",
        "reading": "otoutohazenzenbenkyoushimasen。",
        "translation": "Em trai tôi không học gì cả."
      }
    ]
  },
  {
    "id": "ja-g-n5-70-dake",
    "language": "ja",
    "level": "N5",
    "pattern": "〜だけ (dake)",
    "meaning": "; chỉ là",
    "formula": "Danh từ (N) + だけ / Động từ thể từ điển (V-dict) + だけ",
    "note": "Giọng điệu trung tính. So sánh しか〜ない (N4), nhấn mạnh rằng số lượng là nhỏ.",
    "examples": [
      {
        "text": "財布[さいふ]に100円[えん]だけあります。",
        "furigana": "財布[さいふ]に100円[えん]だけあります。",
        "reading": "saifuni100endakearimasu。",
        "translation": "Tôi chỉ có 100 yên trong ví."
      },
      {
        "text": "朝[あさ]はコーヒーだけ飲[の]みます。",
        "furigana": "朝[あさ]はコーヒーだけ飲[の]みます。",
        "reading": "asahaコーヒーdakenomimasu。",
        "translation": "Tôi chỉ uống cà phê vào buổi sáng."
      },
      {
        "text": "日曜日[にちようび]だけ休[やす]みです。",
        "furigana": "日曜日[にちようび]だけ休[やす]みです。",
        "reading": "nichiyoubidakeyasumidesu。",
        "translation": "Chúng tôi chỉ đóng cửa vào Chủ Nhật."
      }
    ]
  },
  {
    "id": "ja-g-n5-71-kurai-gurai",
    "language": "ja",
    "level": "N5",
    "pattern": "〜くらい / 〜ぐらい（approximately） (kurai / gurai)",
    "meaning": "về; khoảng (một lượng hoặc khoảng thời gian)",
    "formula": "Danh từ (N) + くらい / Danh từ (N) + ぐらい",
    "note": "Được sử dụng với số lượng và thời lượng. Đối với một thời điểm (khoảng ba giờ), hãy sử dụng ごろ: 3時ごろ.",
    "examples": [
      {
        "text": "駅[えき]まで歩[ある]いて10分[ぷん]ぐらいです。",
        "furigana": "駅[えき]まで歩[ある]いて10分[ぷん]ぐらいです。",
        "reading": "ekimadearuite10punguraidesu。",
        "translation": "Đến ga mất khoảng 10 phút đi bộ."
      },
      {
        "text": "毎日[まいにち]2時間[じかん]くらい勉強[べんきょう]します。",
        "furigana": "毎日[まいにち]2時間[じかん]くらい勉強[べんきょう]します。",
        "reading": "mainichi2jikankuraibenkyoushimasu。",
        "translation": "Mình học khoảng 2 tiếng mỗi ngày."
      },
      {
        "text": "このかばんは5000円[えん]ぐらいでした。",
        "furigana": "このかばんは5000円[えん]ぐらいでした。",
        "reading": "konokabanha5000enguraideshita。",
        "translation": "Chiếc túi này có giá khoảng 5000 yên."
      }
    ]
  },
  {
    "id": "ja-g-n5-72-goro",
    "language": "ja",
    "level": "N5",
    "pattern": "〜ごろ (goro)",
    "meaning": "xung quanh; về (một thời điểm)",
    "formula": "Danh từ (N) + ごろ",
    "note": "Gắn vào đồng hồ thời gian, ngày tháng. に sau ごろ là tùy chọn: 7時ごろ(に)起きます.",
    "examples": [
      {
        "text": "毎晩[まいばん]11時[じ]ごろ寝[ね]ます。",
        "furigana": "毎晩[まいばん]11時[じ]ごろ寝[ね]ます。",
        "reading": "maiban11jigoronemasu。",
        "translation": "Mỗi tối tôi đi ngủ vào khoảng 11 giờ."
      },
      {
        "text": "4月[がつ]ごろ、桜[さくら]が咲[さ]きます。",
        "furigana": "4月[がつ]ごろ、桜[さくら]が咲[さ]きます。",
        "reading": "4gatsugoro、sakuragasakimasu。",
        "translation": "Hoa anh đào nở vào khoảng tháng 4."
      },
      {
        "text": "夕方[ゆうがた]6時[じ]ごろに家[いえ]に帰[かえ]ります。",
        "furigana": "夕方[ゆうがた]6時[じ]ごろに家[いえ]に帰[かえ]ります。",
        "reading": "yuugata6jigoroniienikaerimasu。",
        "translation": "Tôi sẽ về nhà vào khoảng 6 giờ chiều."
      }
    ]
  },
  {
    "id": "ja-g-n5-73-nani-mo-nai-dare-mo-nai",
    "language": "ja",
    "level": "N5",
    "pattern": "何も〜ない / 誰も〜ない (nani mo ... nai / dare mo ... nai)",
    "meaning": "không có gì cả; không ai; không phải bất cứ điều gì; không phải ai",
    "formula": "何も + Động từ thể ない (V-nai) / 誰も + Động từ thể ない (V-nai)",
    "note": "Với địa điểm, trợ từ đứng trước も: どこにも / どこへも行きません (không đi đến đâu). 誰 thường được viết bằng hiragana: だれ.",
    "examples": [
      {
        "text": "けさは何[なに]も食[た]べませんでした。",
        "furigana": "けさは何[なに]も食[た]べませんでした。",
        "reading": "kesahananimotabemasendeshita。",
        "translation": "Kesa chưa ăn gì cả."
      },
      {
        "text": "教室[きょうしつ]にはだれもいません。",
        "furigana": "教室[きょうしつ]にはだれもいません。",
        "reading": "kyoushitsunihadaremoimasen。",
        "translation": "Trong lớp không có ai cả."
      },
      {
        "text": "冷蔵庫[れいぞうこ]の中[なか]には何[なに]もありません。",
        "furigana": "冷蔵庫[れいぞうこ]の中[なか]には何[なに]もありません。",
        "reading": "reizoukononakanihananimoarimasen。",
        "translation": "Trong tủ lạnh chẳng có gì cả."
      }
    ]
  },
  {
    "id": "ja-g-n5-74-nani-ka-dare-ka-doko-ka",
    "language": "ja",
    "level": "N5",
    "pattern": "何か / 誰か / どこか (nani ka / dare ka / doko ka)",
    "meaning": "điều gì đó; người nào đó; ở đâu đó",
    "formula": "Từ để hỏi + か",
    "note": "Từ để hỏi + か cho từ 'some-'; từ để hỏi + も + phủ định cho từ 'không-'. が và を sau 何か / だれか thường bị lược bỏ.",
    "examples": [
      {
        "text": "何[なに]か飲[の]みますか。",
        "furigana": "何[なに]か飲[の]みますか。",
        "reading": "nanikanomimasuka。",
        "translation": "bạn có muốn uống gì không."
      },
      {
        "text": "だれか来[き]ましたよ。",
        "furigana": "だれか来[き]ましたよ。",
        "reading": "darekakimashitayo。",
        "translation": "Có người tới."
      },
      {
        "text": "夏休[なつやす]みにどこかへ行[い]きましたか。",
        "furigana": "夏休[なつやす]みにどこかへ行[い]きましたか。",
        "reading": "natsuyasuminidokokaheikimashitaka。",
        "translation": "Bạn có đi đâu trong kỳ nghỉ hè không?"
      }
    ]
  },
  {
    "id": "ja-g-n5-75-kore-sore-are-dore",
    "language": "ja",
    "level": "N5",
    "pattern": "これ / それ / あれ / どれ (kore / sore / are / dore)",
    "meaning": "cái này; cái đó (gần bạn); cái đó (ở đằng kia); cái nào",
    "formula": "これ / それ / あれ / どれ",
    "note": "こ = ở gần người nói, そ = ở gần người nghe, あ = ở xa cả hai, ど = câu hỏi. Họ đứng một mình; làm chủ ngữ どれ lấy が, không phải は.",
    "examples": [
      {
        "text": "これは私[わたし]の辞書[じしょ]です。",
        "furigana": "これは私[わたし]の辞書[じしょ]です。",
        "reading": "korehawatashinojishodesu。",
        "translation": "Đây là từ điển của tôi."
      },
      {
        "text": "それは何[なに]ですか。",
        "furigana": "それは何[なに]ですか。",
        "reading": "sorehananidesuka。",
        "translation": "Nó là gì?"
      },
      {
        "text": "「あなたのかさはどれですか。」「あれです。」",
        "furigana": "「あなたのかさはどれですか。」「あれです。」",
        "reading": "「anatanokasahadoredesuka。」「aredesu。」",
        "translation": "\"Chiếc ô nào của bạn?\" \"Đó là nó.\""
      }
    ]
  },
  {
    "id": "ja-g-n5-76-kono-sono-ano-dono",
    "language": "ja",
    "level": "N5",
    "pattern": "この / その / あの / どの (kono / sono / ano / dono)",
    "meaning": "thế này; cái đó (gần bạn); cái đó... đằng kia; cái nào (trước danh từ)",
    "formula": "この / その / あの / どの + Danh từ (N)",
    "note": "Luôn theo sau bởi một danh từ: この本, không bao giờ この đứng một mình. これ / それ / あれ / どれ được sử dụng khi không có danh từ.",
    "examples": [
      {
        "text": "このケーキはおいしいです。",
        "furigana": "このケーキはおいしいです。",
        "reading": "konoケーキhaoishiidesu。",
        "translation": "Bánh này ngon quá."
      },
      {
        "text": "その本[ほん]はだれのですか。",
        "furigana": "その本[ほん]はだれのですか。",
        "reading": "sonohonhadarenodesuka。",
        "translation": "Sách của ai thế?"
      },
      {
        "text": "「どの人[ひと]が先生[せんせい]ですか。」「あの人[ひと]です。」",
        "furigana": "「どの人[ひと]が先生[せんせい]ですか。」「あの人[ひと]です。」",
        "reading": "「donohitogasenseidesuka。」「anohitodesu。」",
        "translation": "``Thầy là ai?'' ``Người đó.''"
      }
    ]
  },
  {
    "id": "ja-g-n5-77-koko-soko-asoko-doko",
    "language": "ja",
    "level": "N5",
    "pattern": "ここ / そこ / あそこ / どこ (koko / soko / asoko / doko)",
    "meaning": "ở đây; ở đó (gần bạn); ở đằng kia; ở đâu",
    "formula": "ここ / そこ / あそこ / どこ",
    "note": "こちら / そちら / あちら / どちら là phiên bản lịch sự hơn: お国はどちらですか (Bạn đến từ đâu?).",
    "examples": [
      {
        "text": "ここは私[わたし]の学校[がっこう]です。",
        "furigana": "ここは私[わたし]の学校[がっこう]です。",
        "reading": "kokohawatashinogakkoudesu。",
        "translation": "Đây là trường của tôi."
      },
      {
        "text": "トイレはあそこです。",
        "furigana": "トイレはあそこです。",
        "reading": "トイレhaasokodesu。",
        "translation": "Nhà vệ sinh ở đằng kia."
      },
      {
        "text": "すみません、駅[えき]はどこですか。",
        "furigana": "すみません、駅[えき]はどこですか。",
        "reading": "sumimasen、ekihadokodesuka。",
        "translation": "Xin lỗi, nhà ga ở đâu?"
      }
    ]
  },
  {
    "id": "ja-g-n5-78-ku-nai-katta-ku-nakatta",
    "language": "ja",
    "level": "N5",
    "pattern": "〜くない / 〜かった / 〜くなかった (ku nai / katta / ku nakatta)",
    "meaning": "dạng phủ định và dạng quá khứ của tính từ i (is not; was; was not)",
    "formula": "Tính từ đuôi い (A-i) stem + くない / Tính từ đuôi い (A-i) stem + かった / Tính từ đuôi い (A-i) stem + くなかった",
    "note": "高い→高くない, 高かった, 高くなかった. Thêm です để lịch sự. いい là không đều: よくない, よかった, よくなかった.",
    "examples": [
      {
        "text": "この部屋[へや]はあまり広[ひろ]くないです。",
        "furigana": "この部屋[へや]はあまり広[ひろ]くないです。",
        "reading": "konoheyahaamarihirokunaidesu。",
        "translation": "Căn phòng này không rộng lắm."
      },
      {
        "text": "きのうのテストは難[むずか]しかったです。",
        "furigana": "きのうのテストは難[むずか]しかったです。",
        "reading": "kinounoテストhamuzukashikattadesu。",
        "translation": "Bài kiểm tra hôm qua khó quá."
      },
      {
        "text": "先週[せんしゅう]見[み]た映画[えいが]はおもしろくなかったです。",
        "furigana": "先週[せんしゅう]見[み]た映画[えいが]はおもしろくなかったです。",
        "reading": "senshuumitaeigahaomoshirokunakattadesu。",
        "translation": "Bộ phim tôi xem tuần trước không thú vị chút nào."
      }
    ]
  },
  {
    "id": "ja-g-n5-79-na-na-adjective",
    "language": "ja",
    "level": "N5",
    "pattern": "〜な（na-adjective） (na (na-adjective))",
    "meaning": "tính từ na là gì: dùng な trước danh từ và です hoặc だ ở cuối mỗi câu",
    "formula": "Tính từ đuôi な (A-na) + な + Danh từ (N) / Tính từ đuôi な (A-na) + です / Tính từ đuôi な (A-na) + ではありません / Tính từ đuôi な (A-na) + でした",
    "note": "Trước danh từ, thêm な: 静かな部屋. Ở cuối câu chúng thay đổi như danh từ. きれい và きらい kết thúc bằng い nhưng là tính từ な.",
    "examples": [
      {
        "text": "京都[きょうと]は有名[ゆうめい]な町[まち]です。",
        "furigana": "京都[きょうと]は有名[ゆうめい]な町[まち]です。",
        "reading": "kyoutohayuumeinamachidesu。",
        "translation": "Kyoto là một thị trấn nổi tiếng."
      },
      {
        "text": "きのうは暇[ひま]でした。",
        "furigana": "きのうは暇[ひま]でした。",
        "reading": "kinouhahimadeshita。",
        "translation": "Hôm qua tôi rảnh."
      },
      {
        "text": "この部屋[へや]はあまり静[しず]かではありません。",
        "furigana": "この部屋[へや]はあまり静[しず]かではありません。",
        "reading": "konoheyahaamarishizukadehaarimasen。",
        "translation": "Căn phòng này không yên tĩnh lắm."
      }
    ]
  },
  {
    "id": "ja-g-n5-80-kute-de",
    "language": "ja",
    "level": "N5",
    "pattern": "〜くて / 〜で (kute / de)",
    "meaning": "và (nối tính từ hoặc danh từ)",
    "formula": "Tính từ đuôi い (A-i)-ku + て / Tính từ đuôi な (A-na) + で / Danh từ (N) + で",
    "note": "いい trở thành よくて. Kết hợp những phẩm chất chỉ ra cùng một hướng (cả tốt hoặc cả xấu); để tương phản, hãy sử dụng が thay thế.",
    "examples": [
      {
        "text": "この店[みせ]は安[やす]くておいしいです。",
        "furigana": "この店[みせ]は安[やす]くておいしいです。",
        "reading": "konomisehayasukuteoishiidesu。",
        "translation": "Quán này rẻ và ngon."
      },
      {
        "text": "私[わたし]の町[まち]は静[しず]かできれいです。",
        "furigana": "私[わたし]の町[まち]は静[しず]かできれいです。",
        "reading": "watashinomachihashizukadekireidesu。",
        "translation": "Thị trấn của tôi yên tĩnh và sạch sẽ."
      },
      {
        "text": "兄[あに]は大学生[だいがくせい]で、妹[いもうと]は高校生[こうこうせい]です。",
        "furigana": "兄[あに]は大学生[だいがくせい]で、妹[いもうと]は高校生[こうこうせい]です。",
        "reading": "anihadaigakuseide、imoutohakoukouseidesu。",
        "translation": "Anh trai tôi là sinh viên đại học còn em gái tôi là học sinh cấp 3."
      }
    ]
  },
  {
    "id": "ja-g-n5-81-to-iu-named",
    "language": "ja",
    "level": "N5",
    "pattern": "〜という（named） (to iu (named))",
    "meaning": "gọi; có tên",
    "formula": "Danh từ (N) + という + Danh từ (N)",
    "note": "Giới thiệu một cái tên mà người nghe có thể không biết.",
    "examples": [
      {
        "text": "これは「すきやき」という料理[りょうり]です。",
        "furigana": "これは「すきやき」という料理[りょうり]です。",
        "reading": "koreha「sukiyaki」toiuryouridesu。",
        "translation": "Đây là món ăn tên là \"sukiyaki.\""
      },
      {
        "text": "「さくら」という店[みせ]でアルバイトをしています。",
        "furigana": "「さくら」という店[みせ]でアルバイトをしています。",
        "reading": "「sakura」toiumisedeアルバイトoshiteimasu。",
        "translation": "Tôi làm việc bán thời gian tại một cửa hàng tên là \"Sakura\"."
      },
      {
        "text": "山田[やまだ]さんという人[ひと]から電話[でんわ]がありました。",
        "furigana": "山田[やまだ]さんという人[ひと]から電話[でんわ]がありました。",
        "reading": "yamadasantoiuhitokaradenwagaarimashita。",
        "translation": "Tôi nhận được cuộc gọi từ một người tên là anh Yamada."
      }
    ]
  },
  {
    "id": "ja-g-n4-01-ageru-kureru-morau",
    "language": "ja",
    "level": "N4",
    "pattern": "あげる / くれる / もらう (ageru / kureru / morau)",
    "meaning": "đưa (cho người khác); đưa (cho tôi hoặc nhóm của tôi); nhận",
    "formula": "Danh từ người nhận + に + Danh từ (N) + を + あげる / Danh từ người tặng + が + Danh từ (N) + を + くれる / Danh từ người tặng + に + Danh từ (N) + を + もらう",
    "note": "くれる chỉ được sử dụng khi người nhận là người nói hoặc ai đó trong nhóm người nói. Với もらう người tặng có thể được đánh dấu bằng に hoặc から.",
    "examples": [
      {
        "text": "私[わたし]は弟[おとうと]に古[ふる]いゲームをあげた。",
        "furigana": "私[わたし]は弟[おとうと]に古[ふる]いゲームをあげた。",
        "reading": "watashihaotoutonifuruiゲームoageta。",
        "translation": "Tôi đã tặng anh trai tôi một trò chơi cũ."
      },
      {
        "text": "姉[あね]が誕生[たんじょう]日[び]にかわいいかばんをくれました。",
        "furigana": "姉[あね]が誕生[たんじょう]日[び]にかわいいかばんをくれました。",
        "reading": "anegatanjoubinikawaiikabanokuremashita。",
        "translation": "Chị tặng tôi một chiếc túi xinh xắn nhân dịp sinh nhật."
      },
      {
        "text": "友達[ともだち]から旅行[りょこう]のおみやげをもらった。",
        "furigana": "友達[ともだち]から旅行[りょこう]のおみやげをもらった。",
        "reading": "tomodachikararyokounoomiyageomoratta。",
        "translation": "Tôi đã nhận được một món quà lưu niệm sau chuyến đi từ một người bạn."
      }
    ]
  },
  {
    "id": "ja-g-n4-02-te-ageru",
    "language": "ja",
    "level": "N4",
    "pattern": "〜てあげる (te ageru)",
    "meaning": "làm điều gì đó cho ai đó (như một ân huệ)",
    "formula": "Động từ thể て (V-te) + あげる",
    "note": "Nói thẳng với cấp trên nghe có vẻ trịch thượng; thay vào đó hãy sử dụng お〜しましょうか (お持ちしましょうか) khiêm tốn.",
    "examples": [
      {
        "text": "妹[いもうと]の宿題[しゅくだい]を手伝[てつだ]ってあげました。",
        "furigana": "妹[いもうと]の宿題[しゅくだい]を手伝[てつだ]ってあげました。",
        "reading": "imoutonoshukudaiotetsudatteagemashita。",
        "translation": "Tôi đã giúp em gái tôi làm bài tập về nhà."
      },
      {
        "text": "道[みち]に迷[まよ]っている人[ひと]に、駅[えき]までの行[い]き方[かた]を教[おし]えてあげた。",
        "furigana": "道[みち]に迷[まよ]っている人[ひと]に、駅[えき]までの行[い]き方[かた]を教[おし]えてあげた。",
        "reading": "michinimayotteiruhitoni、ekimadenoikikataooshieteageta。",
        "translation": "Tôi đã chỉ cho một người bị lạc đường đi đến ga."
      },
      {
        "text": "重[おも]そうだね。持[も]ってあげようか。",
        "furigana": "重[おも]そうだね。持[も]ってあげようか。",
        "reading": "omosoudane。motteageyouka。",
        "translation": "Có vẻ nặng nề. Tôi mang nó đến cho bạn nhé?"
      }
    ]
  },
  {
    "id": "ja-g-n4-03-te-kureru",
    "language": "ja",
    "level": "N4",
    "pattern": "〜てくれる (te kureru)",
    "meaning": "có ai đó làm điều gì đó cho tôi (hoặc nhóm của tôi)",
    "formula": "Động từ thể て (V-te) + くれる",
    "note": "Chủ ngữ là người làm việc giúp đỡ; người được lợi là người nói hoặc người thân thiết với họ.",
    "examples": [
      {
        "text": "友達[ともだち]が引[ひ]っ越[こ]しを手伝[てつだ]ってくれた。",
        "furigana": "友達[ともだち]が引[ひ]っ越[こ]しを手伝[てつだ]ってくれた。",
        "reading": "tomodachigahikkoshiotetsudattekureta。",
        "translation": "Một người bạn đã giúp tôi chuyển nhà."
      },
      {
        "text": "父[ちち]が駅[えき]まで車[くるま]で送[おく]ってくれました。",
        "furigana": "父[ちち]が駅[えき]まで車[くるま]で送[おく]ってくれました。",
        "reading": "chichigaekimadekurumadeokuttekuremashita。",
        "translation": "Bố tôi chở tôi ra ga."
      },
      {
        "text": "母[はは]が毎朝[まいあさ]お弁当[べんとう]を作[つく]ってくれます。",
        "furigana": "母[はは]が毎朝[まいあさ]お弁当[べんとう]を作[つく]ってくれます。",
        "reading": "hahagamaiasaobentouotsukuttekuremasu。",
        "translation": "Mẹ tôi làm hộp cơm trưa cho tôi mỗi sáng."
      }
    ]
  },
  {
    "id": "ja-g-n4-04-te-morau",
    "language": "ja",
    "level": "N4",
    "pattern": "〜てもらう (te morau)",
    "meaning": "nhờ ai đó làm điều gì đó (cho tôi); nhờ ai đó làm",
    "formula": "Động từ thể て (V-te) + もらう",
    "note": "Người nhận sự giúp đỡ là chủ ngữ và người thực hiện hành động được đánh dấu bằng に.",
    "examples": [
      {
        "text": "先輩[せんぱい]にレポートを見[み]てもらった。",
        "furigana": "先輩[せんぱい]にレポートを見[み]てもらった。",
        "reading": "senpainiレポートomitemoratta。",
        "translation": "Tôi nhờ cấp trên xem báo cáo."
      },
      {
        "text": "友達[ともだち]に写真[しゃしん]を撮[と]ってもらった。",
        "furigana": "友達[ともだち]に写真[しゃしん]を撮[と]ってもらった。",
        "reading": "tomodachinishashinotottemoratta。",
        "translation": "Mình nhờ một người bạn chụp ảnh cho mình."
      },
      {
        "text": "分[わ]からないところを先生[せんせい]に説明[せつめい]してもらいました。",
        "furigana": "分[わ]からないところを先生[せんせい]に説明[せつめい]してもらいました。",
        "reading": "wakaranaitokoroosenseinisetsumeishitemoraimashita。",
        "translation": "Mình nhờ thầy giải thích chỗ mình chưa hiểu."
      }
    ]
  },
  {
    "id": "ja-g-n4-05-te-kudasaru-te-itadaku",
    "language": "ja",
    "level": "N4",
    "pattern": "〜てくださる / 〜ていただく (te kudasaru / te itadaku)",
    "meaning": "(kính trọng) ai đó tử tế làm cho tôi; (khiêm tốn) Tôi nhận được sự ưu ái của người làm",
    "formula": "Động từ thể て (V-te) + くださる / Động từ thể て (V-te) + いただく",
    "note": "くださる là phiên bản kính ngữ của くれる (ます-dạng: くださいます); いただく là phiên bản khiêm tốn của もらう.",
    "examples": [
      {
        "text": "先生[せんせい]が私[わたし]の作文[さくぶん]を直[なお]してくださいました。",
        "furigana": "先生[せんせい]が私[わたし]の作文[さくぶん]を直[なお]してくださいました。",
        "reading": "senseigawatashinosakubunonaoshitekudasaimashita。",
        "translation": "Thầy sửa bài của em rồi."
      },
      {
        "text": "ホテルの方[かた]に、おいしい店[みせ]を教[おし]えていただきました。",
        "furigana": "ホテルの方[かた]に、おいしい店[みせ]を教[おし]えていただきました。",
        "reading": "ホテルnokatani、oishiimiseooshieteitadakimashita。",
        "translation": "Nhân viên khách sạn giới thiệu cho chúng tôi một số nhà hàng ngon."
      },
      {
        "text": "今日[きょう]は来[き]ていただいて、ありがとうございました。",
        "furigana": "今日[きょう]は来[き]ていただいて、ありがとうございました。",
        "reading": "kyouhakiteitadaite、arigatougozaimashita。",
        "translation": "Cảm ơn bạn đã đến ngày hôm nay."
      }
    ]
  },
  {
    "id": "ja-g-n4-06-te-iku",
    "language": "ja",
    "level": "N4",
    "pattern": "〜ていく (te iku)",
    "meaning": "làm việc gì đó rồi đi; cứ làm đi (từ bây giờ tới tương lai)",
    "formula": "Động từ thể て (V-te) + いく",
    "note": "Chuyển động hoặc thay đổi khỏi người nói, hoặc từ hiện tại hướng tới tương lai. So sánh 〜てくる.",
    "examples": [
      {
        "text": "雨[あめ]が降[ふ]りそうだから、傘[かさ]を持[も]っていきます。",
        "furigana": "雨[あめ]が降[ふ]りそうだから、傘[かさ]を持[も]っていきます。",
        "reading": "amegafurisoudakara、kasaomotteikimasu。",
        "translation": "Có vẻ như trời sắp mưa nên tôi sẽ mang theo ô."
      },
      {
        "text": "これからもっと寒[さむ]くなっていくでしょう。",
        "furigana": "これからもっと寒[さむ]くなっていくでしょう。",
        "reading": "korekaramottosamukunatteikudeshou。",
        "translation": "Từ nay trời sẽ lạnh hơn."
      },
      {
        "text": "時間[じかん]があるなら、お茶[ちゃ]を飲[の]んでいきませんか。",
        "furigana": "時間[じかん]があるなら、お茶[ちゃ]を飲[の]んでいきませんか。",
        "reading": "jikangaarunara、ochaonondeikimasenka。",
        "translation": "Nếu có thời gian, bạn có muốn uống trà không?"
      }
    ]
  },
  {
    "id": "ja-g-n4-07-te-kuru",
    "language": "ja",
    "level": "N4",
    "pattern": "〜てくる (te kuru)",
    "meaning": "làm gì đó rồi quay lại; đến làm ; (thay đổi) cho đến nay; bắt đầu",
    "formula": "Động từ thể て (V-te) + くる",
    "note": "Sự chuyển động hoặc thay đổi hướng về phía người nói, hoặc từ quá khứ đến hiện tại. 行ってきます nghĩa đen là 'Tôi sẽ đi và quay lại.'",
    "examples": [
      {
        "text": "ちょっとコンビニに行[い]ってきます。",
        "furigana": "ちょっとコンビニに行[い]ってきます。",
        "reading": "chottoコンビニniittekimasu。",
        "translation": "Tôi đi cửa hàng tiện lợi một lát."
      },
      {
        "text": "日本語[にほんご]が少[すこ]しずつ分[わ]かってきた。",
        "furigana": "日本語[にほんご]が少[すこ]しずつ分[わ]かってきた。",
        "reading": "nihongogasukoshizutsuwakattekita。",
        "translation": "Tôi đang bắt đầu hiểu được tiếng Nhật từng chút một."
      },
      {
        "text": "おなかがすいてきた。",
        "furigana": "おなかがすいてきた。",
        "reading": "onakagasuitekita。",
        "translation": "Tôi đói quá."
      }
    ]
  },
  {
    "id": "ja-g-n4-08-te-shimau-chau",
    "language": "ja",
    "level": "N4",
    "pattern": "〜てしまう / 〜ちゃう (te shimau / chau)",
    "meaning": "kết thúc hoàn toàn; làm một cách tình cờ; cuối cùng làm (với sự hối tiếc)",
    "formula": "Động từ thể て (V-te) + しまう",
    "note": "Trong lời nói, 〜てしまう hợp âm thành 〜ちゃう, và 〜でしまう thành 〜じゃう (飲んじゃう).",
    "examples": [
      {
        "text": "電車[でんしゃ]に傘[かさ]を忘[わす]れてしまいました。",
        "furigana": "電車[でんしゃ]に傘[かさ]を忘[わす]れてしまいました。",
        "reading": "denshanikasaowasureteshimaimashita。",
        "translation": "Tôi quên ô trên tàu."
      },
      {
        "text": "この本[ほん]はおもしろくて、一晩[ひとばん]で読[よ]んでしまった。",
        "furigana": "この本[ほん]はおもしろくて、一晩[ひとばん]で読[よ]んでしまった。",
        "reading": "konohonhaomoshirokute、hitobandeyondeshimatta。",
        "translation": "Cuốn sách này rất thú vị và tôi đã đọc nó trong một đêm."
      },
      {
        "text": "あ、ケーキを全部[ぜんぶ]食[た]べちゃった。",
        "furigana": "あ、ケーキを全部[ぜんぶ]食[た]べちゃった。",
        "reading": "a、ケーキozenbutabechatta。",
        "translation": "Ôi tôi ăn hết cái bánh rồi."
      }
    ]
  },
  {
    "id": "ja-g-n4-09-te-oku",
    "language": "ja",
    "level": "N4",
    "pattern": "〜ておく (te oku)",
    "meaning": "làm trước (để chuẩn bị); làm và để nguyên như vậy",
    "formula": "Động từ thể て (V-te) + おく",
    "note": "Trong cách nói thông thường 〜ておく thường trở thành 〜とく (買っとく), và 〜でおく trở thành 〜どく (読んどく).",
    "examples": [
      {
        "text": "旅行[りょこう]の前[まえ]に、ホテルを予約[よやく]しておきます。",
        "furigana": "旅行[りょこう]の前[まえ]に、ホテルを予約[よやく]しておきます。",
        "reading": "ryokounomaeni、ホテルoyoyakushiteokimasu。",
        "translation": "Hãy đặt phòng khách sạn trước chuyến đi."
      },
      {
        "text": "パーティーのために、飲[の]み物[もの]を冷[ひ]やしておいた。",
        "furigana": "パーティーのために、飲[の]み物[もの]を冷[ひ]やしておいた。",
        "reading": "パーティーnotameni、nomimonoohiyashiteoita。",
        "translation": "Tôi đã giữ lạnh đồ uống cho bữa tiệc."
      },
      {
        "text": "エアコンはつけておいてください。",
        "furigana": "エアコンはつけておいてください。",
        "reading": "エアコンhatsuketeoitekudasai。",
        "translation": "Hãy để điều hòa bật."
      }
    ]
  },
  {
    "id": "ja-g-n4-10-te-miru",
    "language": "ja",
    "level": "N4",
    "pattern": "〜てみる (te miru)",
    "meaning": "thử làm (để xem nó như thế nào)",
    "formula": "Động từ thể て (V-te) + みる",
    "note": "Có nghĩa là thử làm việc gì đó để xem kết quả, không nỗ lực làm việc gì khó khăn.",
    "examples": [
      {
        "text": "このシャツ、着[き]てみてもいいですか。",
        "furigana": "このシャツ、着[き]てみてもいいですか。",
        "reading": "konoシャツ、kitemitemoiidesuka。",
        "translation": "Tôi có thể thử chiếc áo này được không?"
      },
      {
        "text": "新[あたら]しくできたラーメン屋[や]に行[い]ってみた。",
        "furigana": "新[あたら]しくできたラーメン屋[や]に行[い]ってみた。",
        "reading": "atarashikudekitaラーメンyaniittemita。",
        "translation": "Mình đến quán ramen mới."
      },
      {
        "text": "日本[にほん]の料理[りょうり]を自分[じぶん]で作[つく]ってみたいです。",
        "furigana": "日本[にほん]の料理[りょうり]を自分[じぶん]で作[つく]ってみたいです。",
        "reading": "nihonnoryouriojibundetsukuttemitaidesu。",
        "translation": "Tôi muốn thử tự mình làm món Nhật."
      }
    ]
  },
  {
    "id": "ja-g-n4-11-te-aru",
    "language": "ja",
    "level": "N4",
    "pattern": "〜てある (te aru)",
    "meaning": "đã được thực hiện (và vẫn như vậy); trạng thái kết quả của một hành động có chủ ý",
    "formula": "Động từ thể て (V-te) + ある",
    "note": "Được sử dụng với động từ chuyển tiếp và tân ngữ thường dùng が. Nó ngụ ý ai đó đã cố tình làm điều đó, không giống như 〜ている với nội động từ (窓が開いている).",
    "examples": [
      {
        "text": "入[い]り口[ぐち]に地図[ちず]がはってあります。",
        "furigana": "入[い]り口[ぐち]に地図[ちず]がはってあります。",
        "reading": "iriguchinichizugahattearimasu。",
        "translation": "Có một tấm bản đồ ở lối vào."
      },
      {
        "text": "テーブルの上[うえ]にお皿[さら]が並[なら]べてあった。",
        "furigana": "テーブルの上[うえ]にお皿[さら]が並[なら]べてあった。",
        "reading": "テーブルnoueniosaraganarabeteatta。",
        "translation": "Trên bàn có những chiếc đĩa xếp thành hàng."
      },
      {
        "text": "ビールなら冷蔵庫[れいぞうこ]に入[い]れてあるよ。",
        "furigana": "ビールなら冷蔵庫[れいぞうこ]に入[い]れてあるよ。",
        "reading": "ビールnarareizoukoniiretearuyo。",
        "translation": "Tôi có bia trong tủ lạnh."
      }
    ]
  },
  {
    "id": "ja-g-n4-12-toki",
    "language": "ja",
    "level": "N4",
    "pattern": "〜とき (toki)",
    "meaning": "khi nào; tại thời điểm",
    "formula": "Động từ thể thông thường (V thường) / Tính từ đuôi い (A-i) / Tính từ đuôi な (A-na) + な / Danh từ (N) + の + とき",
    "note": "Thì của động từ thể hiện thứ tự: 行くとき nghĩa là trước hoặc trên đường (việc đi vẫn chưa kết thúc); 行ったとき có nghĩa là sau khi đến nơi. Thường được viết 時 bằng chữ Hán.",
    "examples": [
      {
        "text": "子[こ]どものとき、よく川[かわ]で泳[およ]ぎました。",
        "furigana": "子[こ]どものとき、よく川[かわ]で泳[およ]ぎました。",
        "reading": "kodomonotoki、yokukawadeoyogimashita。",
        "translation": "Hồi nhỏ tôi hay tắm sông."
      },
      {
        "text": "日本[にほん]へ行[い]くとき、新[あたら]しいかばんを買[か]いました。",
        "furigana": "日本[にほん]へ行[い]くとき、新[あたら]しいかばんを買[か]いました。",
        "reading": "nihonheikutoki、atarashiikabanokaimashita。",
        "translation": "Mình đã mua một chiếc túi mới khi sang Nhật."
      },
      {
        "text": "日本[にほん]へ行[い]ったとき、友達[ともだち]にお土産[みやげ]を買[か]いました。",
        "furigana": "日本[にほん]へ行[い]ったとき、友達[ともだち]にお土産[みやげ]を買[か]いました。",
        "reading": "nihonheittatoki、tomodachiniomiyageokaimashita。",
        "translation": "Lúc sang Nhật mình có mua quà lưu niệm cho bạn mình."
      }
    ]
  },
  {
    "id": "ja-g-n4-13-aida-aida-ni",
    "language": "ja",
    "level": "N4",
    "pattern": "〜間 / 〜間に (aida / aida ni)",
    "meaning": "while; trong suốt (toàn bộ thời gian); tại một thời điểm nào đó trong",
    "formula": "Động từ thể て (V-te) + いる / Động từ thể từ điển (V-dict) / Danh từ (N) + の + 間（に）",
    "note": "間 có nghĩa là hành động tiếp tục trong suốt thời gian; 間に có nghĩa là nó xảy ra vào một thời điểm nào đó trong một khoảng thời gian.",
    "examples": [
      {
        "text": "夏休[なつやす]みの間[あいだ]、祖父[そふ]の家[いえ]にいました。",
        "furigana": "夏休[なつやす]みの間[あいだ]、祖父[そふ]の家[いえ]にいました。",
        "reading": "natsuyasuminoaida、sofunoieniimashita。",
        "translation": "Tôi ở nhà ông nội trong kỳ nghỉ hè."
      },
      {
        "text": "母[はは]が寝[ね]ている間[あいだ]に、部屋[へや]を掃除[そうじ]した。",
        "furigana": "母[はは]が寝[ね]ている間[あいだ]に、部屋[へや]を掃除[そうじ]した。",
        "reading": "hahaganeteiruaidani、heyaosoujishita。",
        "translation": "Mình dọn phòng lúc mẹ đang ngủ."
      },
      {
        "text": "電車[でんしゃ]を待[ま]っている間[あいだ]、ずっと本[ほん]を読[よ]んでいた。",
        "furigana": "電車[でんしゃ]を待[ま]っている間[あいだ]、ずっと本[ほん]を読[よ]んでいた。",
        "reading": "denshaomatteiruaida、zuttohonoyondeita。",
        "translation": "Tôi đã đọc sách suốt thời gian chờ tàu."
      }
    ]
  },
  {
    "id": "ja-g-n4-14-sou-da-appearance",
    "language": "ja",
    "level": "N4",
    "pattern": "〜そうだ（appearance） (sou da (appearance))",
    "meaning": "trông giống như; có vẻ ; có vẻ như",
    "formula": "Động từ thể ます bỏ ます (V-masu) / Tính từ đuôi い (A-i) stem / Tính từ đuôi な (A-na) + そうだ",
    "note": "Một sự phán xét từ những gì bạn nhìn thấy. いい → よさそう, ない → なさそう. Không dùng với tính từ chỉ những đặc điểm dễ thấy (赤い, かわいい); かわいそう có nghĩa là 'đáng thương'.",
    "examples": [
      {
        "text": "そのカレー、辛[から]そうだね。",
        "furigana": "そのカレー、辛[から]そうだね。",
        "reading": "sonoカレー、karasoudane。",
        "translation": "Món cà ri đó có vẻ cay."
      },
      {
        "text": "空[そら]が暗[くら]いですね。雨[あめ]が降[ふ]りそうです。",
        "furigana": "空[そら]が暗[くら]いですね。雨[あめ]が降[ふ]りそうです。",
        "reading": "soragakuraidesune。amegafurisoudesu。",
        "translation": "Trời tối rồi. Có vẻ như trời sắp mưa."
      },
      {
        "text": "久[ひさ]しぶりに会[あ]った祖父[そふ]は元気[げんき]そうだった。",
        "furigana": "久[ひさ]しぶりに会[あ]った祖父[そふ]は元気[げんき]そうだった。",
        "reading": "hisashiburiniattasofuhagenkisoudatta。",
        "translation": "Ông tôi có vẻ rất vui vẻ khi tôi gặp ông lần đầu tiên sau một thời gian."
      }
    ]
  },
  {
    "id": "ja-g-n4-15-sou-da-hearsay",
    "language": "ja",
    "level": "N4",
    "pattern": "〜そうだ（hearsay） (sou da (hearsay))",
    "meaning": "Tôi nghe nói vậy; họ nói rằng",
    "formula": "Động từ thể thông thường (V thường) / Tính từ đuôi い (A-i) + そうだ / Tính từ đuôi な (A-na) + だ + そうだ / Danh từ (N) + だ + そうだ",
    "note": "Gắn vào các dạng đơn giản hoàn toàn, không giống như 'trông giống' そうだ, gắn vào thân cây. Nó không có hình thức quá khứ hoặc tiêu cực.",
    "examples": [
      {
        "text": "天気[てんき]予報[よほう]では、明日[あした]は雪[ゆき]が降[ふ]るそうです。",
        "furigana": "天気[てんき]予報[よほう]では、明日[あした]は雪[ゆき]が降[ふ]るそうです。",
        "reading": "tenkiyohoudeha、ashitahayukigafurusoudesu。",
        "translation": "Theo dự báo thời tiết thì ngày mai trời sẽ có tuyết."
      },
      {
        "text": "駅前[えきまえ]の本屋[ほんや]は来月[らいげつ]なくなるそうだ。",
        "furigana": "駅前[えきまえ]の本屋[ほんや]は来月[らいげつ]なくなるそうだ。",
        "reading": "ekimaenohonyaharaigetsunakunarusouda。",
        "translation": "Có vẻ như hiệu sách trước nhà ga sẽ đóng cửa vào tháng sau."
      },
      {
        "text": "リンさんのお兄[にい]さんは医者[いしゃ]だそうです。",
        "furigana": "リンさんのお兄[にい]さんは医者[いしゃ]だそうです。",
        "reading": "リンsannooniisanhaishadasoudesu。",
        "translation": "Có vẻ như anh trai của Rin là bác sĩ."
      }
    ]
  },
  {
    "id": "ja-g-n4-16-rashii",
    "language": "ja",
    "level": "N4",
    "pattern": "〜らしい（hearsay/conjecture） (rashii)",
    "meaning": "rõ ràng; có vẻ như; Tôi nghe thấy",
    "formula": "Động từ thể thông thường (V thường) / Tính từ đuôi い (A-i) / Tính từ đuôi な (A-na) / Danh từ (N) + らしい",
    "note": "Dựa vào nội dung đã nghe hoặc đọc nên loa phát ra âm thanh hơi tách biệt. 'Điển hình của' らしい (男らしい) là một điểm N3 riêng biệt.",
    "examples": [
      {
        "text": "駅[えき]の近[ちか]くに新[あたら]しいカフェができたらしい。",
        "furigana": "駅[えき]の近[ちか]くに新[あたら]しいカフェができたらしい。",
        "reading": "ekinochikakuniatarashiiカフェgadekitarashii。",
        "translation": "Hình như có một quán cà phê mới mở gần nhà ga."
      },
      {
        "text": "部屋[へや]の電気[でんき]が消[き]えている。もう寝[ね]たらしい。",
        "furigana": "部屋[へや]の電気[でんき]が消[き]えている。もう寝[ね]たらしい。",
        "reading": "heyanodenkigakieteiru。mounetarashii。",
        "translation": "Đèn trong phòng tắt. Có vẻ như anh ấy đã ngủ rồi."
      },
      {
        "text": "あの店[みせ]のラーメンはとても有名[ゆうめい]らしいです。",
        "furigana": "あの店[みせ]のラーメンはとても有名[ゆうめい]らしいです。",
        "reading": "anomisenoラーメンhatotemoyuumeirashiidesu。",
        "translation": "Có vẻ như món ramen của nhà hàng đó rất nổi tiếng."
      }
    ]
  },
  {
    "id": "ja-g-n4-17-you-da",
    "language": "ja",
    "level": "N4",
    "pattern": "〜ようだ (you da)",
    "meaning": "; nó xuất hiện (đánh giá từ bằng chứng)",
    "formula": "Động từ thể thông thường (V thường) / Tính từ đuôi い (A-i) + ようだ / Tính từ đuôi な (A-na) + な + ようだ / Danh từ (N) + の + ようだ",
    "note": "Một cách hơi trang trọng để đưa ra đánh giá dựa trên những gì bạn quan sát hoặc cảm nhận; みたいだ là từ tương đương thông thường. Việc sử dụng 'like, as if' được đề cập ở N3.",
    "examples": [
      {
        "text": "誰[だれ]もいないようですね。",
        "furigana": "誰[だれ]もいないようですね。",
        "reading": "daremoinaiyoudesune。",
        "translation": "Có vẻ như không có ai ở đây."
      },
      {
        "text": "かぜをひいたようで、朝[あさ]からのどが痛[いた]い。",
        "furigana": "かぜをひいたようで、朝[あさ]からのどが痛[いた]い。",
        "reading": "kazeohiitayoude、asakaranodogaitai。",
        "translation": "Tôi cảm thấy như bị cảm lạnh và cổ họng đau rát từ sáng."
      },
      {
        "text": "外[そと]は寒[さむ]いようだ。みんなコートを着[き]ている。",
        "furigana": "外[そと]は寒[さむ]いようだ。みんなコートを着[き]ている。",
        "reading": "sotohasamuiyouda。minnaコートokiteiru。",
        "translation": "Ngoài trời có vẻ lạnh. Mọi người đều mặc áo khoác."
      }
    ]
  },
  {
    "id": "ja-g-n4-18-mitai",
    "language": "ja",
    "level": "N4",
    "pattern": "〜みたい (mitai)",
    "meaning": "có vẻ như thế; trông giống như; thích (thông thường)",
    "formula": "Động từ thể thông thường (V thường) / Tính từ đuôi い (A-i) / Tính từ đuôi な (A-na) / Danh từ (N) + みたい",
    "note": "Thông thường tương đương với ようだ. Nó gắn trực tiếp vào danh từ và tính từ na (静かみたい) mà không cần な hoặc の. Trước danh từ nó trở thành みたいな.",
    "examples": [
      {
        "text": "隣[となり]の部屋[へや]に誰[だれ]か来[き]たみたい。",
        "furigana": "隣[となり]の部屋[へや]に誰[だれ]か来[き]たみたい。",
        "reading": "tonarinoheyanidarekakitamitai。",
        "translation": "Hình như có người sang phòng bên cạnh."
      },
      {
        "text": "今日[きょう]の彼女[かのじょ]は元気[げんき]がないみたいだね。",
        "furigana": "今日[きょう]の彼女[かのじょ]は元気[げんき]がないみたいだね。",
        "reading": "kyounokanojohagenkiganaimitaidane。",
        "translation": "Hôm nay cô ấy có vẻ không được khỏe."
      },
      {
        "text": "このケーキ、お店[みせ]のケーキみたい！",
        "furigana": "このケーキ、お店[みせ]のケーキみたい！",
        "reading": "konoケーキ、omisenoケーキmitai！",
        "translation": "Cái bánh này nhìn giống bánh mua ngoài tiệm quá!"
      }
    ]
  },
  {
    "id": "ja-g-n4-19-sugiru",
    "language": "ja",
    "level": "N4",
    "pattern": "〜すぎる (sugiru)",
    "meaning": "; quá nhiều; quá mức",
    "formula": "Động từ thể ます bỏ ます (V-masu) / Tính từ đuôi い (A-i) stem / Tính từ đuôi な (A-na) + すぎる",
    "note": "Liên hợp như động từ Nhóm 2 (すぎた, すぎて). いい → よすぎる và tính từ ない → なさすぎる.",
    "examples": [
      {
        "text": "ゆうべ飲[の]みすぎて、頭[あたま]が痛[いた]い。",
        "furigana": "ゆうべ飲[の]みすぎて、頭[あたま]が痛[いた]い。",
        "reading": "yuubenomisugite、atamagaitai。",
        "translation": "Tôi uống nhiều quá và đau đầu."
      },
      {
        "text": "この靴[くつ]は私[わたし]には大[おお]きすぎます。",
        "furigana": "この靴[くつ]は私[わたし]には大[おお]きすぎます。",
        "reading": "konokutsuhawatashinihaookisugimasu。",
        "translation": "Đôi giày này quá to so với tôi."
      },
      {
        "text": "この問題[もんだい]は簡単[かんたん]すぎて、つまらない。",
        "furigana": "この問題[もんだい]は簡単[かんたん]すぎて、つまらない。",
        "reading": "konomondaihakantansugite、tsumaranai。",
        "translation": "Vấn đề này quá dễ và nhàm chán."
      }
    ]
  },
  {
    "id": "ja-g-n4-20-kata",
    "language": "ja",
    "level": "N4",
    "pattern": "〜方 (kata)",
    "meaning": "làm thế nào; cách làm",
    "formula": "Động từ thể ます bỏ ます (V-masu) + 方",
    "note": "Kết quả là một danh từ nên tân ngữ lấy の thay vì を (日本語の話し方). Với động từ する: 勉強のしかた.",
    "examples": [
      {
        "text": "この機械[きかい]の使[つか]い方[かた]を教[おし]えてください。",
        "furigana": "この機械[きかい]の使[つか]い方[かた]を教[おし]えてください。",
        "reading": "konokikainotsukaikataooshietekudasai。",
        "translation": "Xin cho biết cách sử dụng chiếc máy này."
      },
      {
        "text": "この漢字[かんじ]の読[よ]み方[かた]が分[わ]かりません。",
        "furigana": "この漢字[かんじ]の読[よ]み方[かた]が分[わ]かりません。",
        "reading": "konokanjinoyomikatagawakarimasen。",
        "translation": "Tôi không biết đọc chữ kanji này như thế nào."
      },
      {
        "text": "祖母[そぼ]においしいみそ汁[しる]の作[つく]り方[かた]を習[なら]った。",
        "furigana": "祖母[そぼ]においしいみそ汁[しる]の作[つく]り方[かた]を習[なら]った。",
        "reading": "sobonioishiimisoshirunotsukurikataonaratta。",
        "translation": "Mình học cách nấu súp miso thơm ngon từ bà ngoại."
      }
    ]
  },
  {
    "id": "ja-g-n4-21-chuu-juu",
    "language": "ja",
    "level": "N4",
    "pattern": "〜中 (chuu / juu)",
    "meaning": "ở giữa; trong thời gian (ちゅう); khắp; khắp nơi (じゅう)",
    "formula": "Danh từ (N) + 中",
    "note": "ちゅう đánh dấu một hoạt động đang diễn ra hoặc một khoảng thời gian (会議中, 午前中, 今週中); じゅう có nghĩa là 'xuyên suốt' một thời gian hoặc địa điểm (一日中, 世界中).",
    "examples": [
      {
        "text": "父[ちち]は今[いま]、電話[でんわ]中[ちゅう]です。",
        "furigana": "父[ちち]は今[いま]、電話[でんわ]中[ちゅう]です。",
        "reading": "chichihaima、denwachuudesu。",
        "translation": "Lúc này bố tôi đang nghe điện thoại."
      },
      {
        "text": "昨日[きのう]は一日中[いちにちじゅう]雨[あめ]が降[ふ]っていた。",
        "furigana": "昨日[きのう]は一日中[いちにちじゅう]雨[あめ]が降[ふ]っていた。",
        "reading": "kinouhaichinichijuuamegafutteita。",
        "translation": "Hôm qua trời mưa cả ngày."
      },
      {
        "text": "この歌[うた]は世界中[せかいじゅう]で知[し]られている。",
        "furigana": "この歌[うた]は世界中[せかいじゅう]で知[し]られている。",
        "reading": "konoutahasekaijuudeshirareteiru。",
        "translation": "Bài hát này được cả thế giới biết đến."
      }
    ]
  },
  {
    "id": "ja-g-n4-22-tsumori",
    "language": "ja",
    "level": "N4",
    "pattern": "〜つもり (tsumori)",
    "meaning": "có ý định; lên kế hoạch",
    "formula": "Động từ thể từ điển (V-dict) / Động từ thể ない (V-nai) + つもり",
    "note": "Nêu rõ ý định cá nhân chắc chắn. 〜つもりはない có nghĩa là 'không có ý định'. Hỏi cấp trên 〜つもりですか nghe có vẻ thẳng thừng.",
    "examples": [
      {
        "text": "夏休[なつやす]みは北海道[ほっかいどう]を旅行[りょこう]するつもりです。",
        "furigana": "夏休[なつやす]みは北海道[ほっかいどう]を旅行[りょこう]するつもりです。",
        "reading": "natsuyasumihahokkaidouoryokousurutsumoridesu。",
        "translation": "Tôi đang có ý định đi du lịch Hokkaido vào dịp nghỉ hè."
      },
      {
        "text": "今日[きょう]はお酒[さけ]を飲[の]まないつもりです。",
        "furigana": "今日[きょう]はお酒[さけ]を飲[の]まないつもりです。",
        "reading": "kyouhaosakeonomanaitsumoridesu。",
        "translation": "Hôm nay tôi không định uống rượu."
      },
      {
        "text": "大学[だいがく]を出[で]たら、どうするつもりですか。",
        "furigana": "大学[だいがく]を出[で]たら、どうするつもりですか。",
        "reading": "daigakuodetara、dousurutsumoridesuka。",
        "translation": "Bạn dự định làm gì sau khi tốt nghiệp đại học?"
      }
    ]
  },
  {
    "id": "ja-g-n4-23-yotei",
    "language": "ja",
    "level": "N4",
    "pattern": "〜予定 (yotei)",
    "meaning": "có kế hoạch; được lên lịch",
    "formula": "Động từ thể từ điển (V-dict) + 予定 / Danh từ (N) + の + 予定",
    "note": "Đề cập đến một lịch trình hoặc sự sắp xếp cố định, thường có sự tham gia của người khác; khách quan hơn つもり.",
    "examples": [
      {
        "text": "来月[らいげつ]、大阪[おおさか]に引[ひ]っ越[こ]す予定[よてい]です。",
        "furigana": "来月[らいげつ]、大阪[おおさか]に引[ひ]っ越[こ]す予定[よてい]です。",
        "reading": "raigetsu、oosakanihikkosuyoteidesu。",
        "translation": "Tôi dự định sẽ chuyển đến Osaka vào tháng sau."
      },
      {
        "text": "会議[かいぎ]は三[さん]時[じ]に終[お]わる予定[よてい]です。",
        "furigana": "会議[かいぎ]は三[さん]時[じ]に終[お]わる予定[よてい]です。",
        "reading": "kaigihasanjiniowaruyoteidesu。",
        "translation": "Cuộc họp dự kiến ​​kết thúc vào lúc ba giờ."
      },
      {
        "text": "出発[しゅっぱつ]は朝[あさ]八[はち]時[じ]の予定[よてい]です。",
        "furigana": "出発[しゅっぱつ]は朝[あさ]八[はち]時[じ]の予定[よてい]です。",
        "reading": "shuppatsuhaasahachijinoyoteidesu。",
        "translation": "Chúng tôi dự kiến ​​khởi hành lúc 8 giờ sáng."
      }
    ]
  },
  {
    "id": "ja-g-n4-24-koto-ni-suru",
    "language": "ja",
    "level": "N4",
    "pattern": "〜ことにする (koto ni suru)",
    "meaning": "quyết định",
    "formula": "Động từ thể từ điển (V-dict) / Động từ thể ない (V-nai) + ことにする",
    "note": "Một quyết định của người nói; so sánh 〜ことになる. 〜ことにしている (N3) có nghĩa là 'đặt nó thành quy tắc'.",
    "examples": [
      {
        "text": "健康[けんこう]のために、毎朝[まいあさ]歩[ある]くことにした。",
        "furigana": "健康[けんこう]のために、毎朝[まいあさ]歩[ある]くことにした。",
        "reading": "kenkounotameni、maiasaarukukotonishita。",
        "translation": "Tôi quyết định đi bộ mỗi sáng vì sức khỏe của mình."
      },
      {
        "text": "高[たか]かったので、買[か]わないことにしました。",
        "furigana": "高[たか]かったので、買[か]わないことにしました。",
        "reading": "takakattanode、kawanaikotonishimashita。",
        "translation": "Đắt quá nên tôi quyết định không mua."
      },
      {
        "text": "もう遅[おそ]いから、タクシーで帰[かえ]ることにしよう。",
        "furigana": "もう遅[おそ]いから、タクシーで帰[かえ]ることにしよう。",
        "reading": "mouosoikara、タクシーdekaerukotonishiyou。",
        "translation": "Giờ cũng muộn rồi nên tôi sẽ bắt taxi về nhà."
      }
    ]
  },
  {
    "id": "ja-g-n4-25-koto-ni-naru",
    "language": "ja",
    "level": "N4",
    "pattern": "〜ことになる (koto ni naru)",
    "meaning": "nó đã được quyết định rồi; hóa ra",
    "formula": "Động từ thể từ điển (V-dict) / Động từ thể ない (V-nai) + ことになる",
    "note": "Trình bày một quyết định được đưa ra bởi người khác hoặc bởi hoàn cảnh. Mọi người cũng sử dụng nó cho các quyết định của riêng họ để có vẻ ít quyết đoán hơn.",
    "examples": [
      {
        "text": "来年[らいねん]の春[はる]から、名古屋[なごや]の店[みせ]で働[はたら]くことになりました。",
        "furigana": "来年[らいねん]の春[はる]から、名古屋[なごや]の店[みせ]で働[はたら]くことになりました。",
        "reading": "rainennoharukara、nagoyanomisedehatarakukotoninarimashita。",
        "translation": "Bắt đầu từ mùa xuân tới, tôi sẽ làm việc tại một cửa hàng ở Nagoya."
      },
      {
        "text": "今度[こんど]の日曜日[にちようび]、クラスのみんなでバーベキューをすることになった。",
        "furigana": "今度[こんど]の日曜日[にちようび]、クラスのみんなでバーベキューをすることになった。",
        "reading": "kondononichiyoubi、クラスnominnadeバーベキューosurukotoninatta。",
        "translation": "Chủ nhật tuần này lớp sẽ có tiệc nướng."
      },
      {
        "text": "友達[ともだち]の結婚式[けっこんしき]で、私[わたし]がスピーチをすることになりました。",
        "furigana": "友達[ともだち]の結婚式[けっこんしき]で、私[わたし]がスピーチをすることになりました。",
        "reading": "tomodachinokekkonshikide、watashigaスピーチosurukotoninarimashita。",
        "translation": "Tôi sẽ có bài phát biểu tại đám cưới của bạn tôi."
      }
    ]
  },
  {
    "id": "ja-g-n4-26-koto-ga-dekiru",
    "language": "ja",
    "level": "N4",
    "pattern": "〜ことができる (koto ga dekiru)",
    "meaning": "có thể; có thể ; có thể",
    "formula": "Động từ thể từ điển (V-dict) + ことができる",
    "note": "Trang trọng hơn một chút so với hình thức tiềm năng. Cũng được dùng cho những việc có thể hoặc được phép (ここでたばこを吸うことはできません).",
    "examples": [
      {
        "text": "この図書館[としょかん]では、本[ほん]を二[に]週間[しゅうかん]借[か]りることができます。",
        "furigana": "この図書館[としょかん]では、本[ほん]を二[に]週間[しゅうかん]借[か]りることができます。",
        "reading": "konotoshokandeha、hononishuukankarirukotogadekimasu。",
        "translation": "Bạn có thể mượn sách trong hai tuần tại thư viện này."
      },
      {
        "text": "妹[いもうと]はピアノを弾[ひ]くことができる。",
        "furigana": "妹[いもうと]はピアノを弾[ひ]くことができる。",
        "reading": "imoutohaピアノohikukotogadekiru。",
        "translation": "Em gái tôi có thể chơi piano."
      },
      {
        "text": "ここからは富士山[ふじさん]を見[み]ることができません。",
        "furigana": "ここからは富士山[ふじさん]を見[み]ることができません。",
        "reading": "kokokarahafujisanomirukotogadekimasen。",
        "translation": "Bạn không thể nhìn thấy Núi Phú Sĩ từ đây."
      }
    ]
  },
  {
    "id": "ja-g-n4-27-eru-rareru-potential",
    "language": "ja",
    "level": "N4",
    "pattern": "〜える / 〜られる（potential） (eru / rareru (potential))",
    "meaning": "; có thể (dạng tiềm năng)",
    "formula": "Động từ thể từ điển (V-dict) (Group 1: final u → e) + る / Động từ thể ない (V-nai) stem + られる (Group 2)",
    "note": "Bất quy tắc: する → できる, 来る → 来られる. Tân ngữ thường lấy が thay vì を. Trong lời nói thông thường, động từ Nhóm 2 thường bỏ ら (見れる).",
    "examples": [
      {
        "text": "私[わたし]は漢字[かんじ]が二[に]百[ひゃく]ぐらい読[よ]めます。",
        "furigana": "私[わたし]は漢字[かんじ]が二[に]百[ひゃく]ぐらい読[よ]めます。",
        "reading": "watashihakanjiganihyakuguraiyomemasu。",
        "translation": "Tôi có thể đọc được khoảng 200 chữ kanji."
      },
      {
        "text": "兄[あに]は辛[から]い料理[りょうり]が食[た]べられない。",
        "furigana": "兄[あに]は辛[から]い料理[りょうり]が食[た]べられない。",
        "reading": "anihakarairyourigataberarenai。",
        "translation": "Anh tôi không ăn được đồ cay."
      },
      {
        "text": "明日[あした]のパーティーに来[こ]られますか。",
        "furigana": "明日[あした]のパーティーに来[こ]られますか。",
        "reading": "ashitanoパーティーnikoraremasuka。",
        "translation": "Bạn có thể đến dự bữa tiệc ngày mai được không?"
      }
    ]
  },
  {
    "id": "ja-g-n4-28-reru-rareru-passive",
    "language": "ja",
    "level": "N4",
    "pattern": "〜れる / 〜られる（passive） (reru / rareru (passive))",
    "meaning": "được thực hiện (bởi ai đó); giọng nói bị động",
    "formula": "Động từ thể ない (V-nai) stem + れる (Group 1) / Động từ thể ない (V-nai) stem + られる (Group 2)",
    "note": "Bất quy tắc: する → される, 来る → 来られる. Người thực hiện được đánh dấu bằng に. Thường thể hiện rằng đối tượng gặp rắc rối trước hành động của ai đó (雨に降られた).",
    "examples": [
      {
        "text": "先生[せんせい]に作文[さくぶん]をほめられました。",
        "furigana": "先生[せんせい]に作文[さくぶん]をほめられました。",
        "reading": "senseinisakubunohomeraremashita。",
        "translation": "Cô giáo khen bài luận của tôi."
      },
      {
        "text": "電車[でんしゃ]の中[なか]で足[あし]を踏[ふ]まれた。",
        "furigana": "電車[でんしゃ]の中[なか]で足[あし]を踏[ふ]まれた。",
        "reading": "denshanonakadeashiofumareta。",
        "translation": "Chân tôi bị dẫm lên tàu."
      },
      {
        "text": "この寺[てら]は六百[ろっぴゃく]年[ねん]前[まえ]に建[た]てられました。",
        "furigana": "この寺[てら]は六百[ろっぴゃく]年[ねん]前[まえ]に建[た]てられました。",
        "reading": "konoteraharoppyakunenmaenitateraremashita。",
        "translation": "Ngôi chùa này được xây dựng cách đây 600 năm."
      }
    ]
  },
  {
    "id": "ja-g-n4-29-seru-saseru",
    "language": "ja",
    "level": "N4",
    "pattern": "〜せる / 〜させる (seru / saseru)",
    "meaning": "bắt ai đó làm; để ai đó làm (nguyên nhân)",
    "formula": "Động từ thể ない (V-nai) stem + せる (Group 1) / Động từ thể ない (V-nai) stem + させる (Group 2)",
    "note": "Bất quy tắc: する → させる, 来る → 来させる. Với nội động từ người ta dùng を; với động từ chuyển tiếp, に. Bối cảnh quyết định 'làm' hoặc 'cho phép'.",
    "examples": [
      {
        "text": "母[はは]は毎日[まいにち]弟[おとうと]に野菜[やさい]を食[た]べさせる。",
        "furigana": "母[はは]は毎日[まいにち]弟[おとうと]に野菜[やさい]を食[た]べさせる。",
        "reading": "hahahamainichiotoutoniyasaiotabesaseru。",
        "translation": "Mẹ tôi bắt em trai tôi ăn rau mỗi ngày."
      },
      {
        "text": "コーチは毎日[まいにち]、選手[せんしゅ]たちを走[はし]らせた。",
        "furigana": "コーチは毎日[まいにち]、選手[せんしゅ]たちを走[はし]らせた。",
        "reading": "コーチhamainichi、senshutachiohashiraseta。",
        "translation": "Huấn luyện viên bắt các cầu thủ chạy mỗi ngày."
      },
      {
        "text": "息子[むすこ]が行[い]きたいと言[い]ったので、一人[ひとり]で旅行[りょこう]に行[い]かせました。",
        "furigana": "息子[むすこ]が行[い]きたいと言[い]ったので、一人[ひとり]で旅行[りょこう]に行[い]かせました。",
        "reading": "musukogaikitaitoittanode、hitorideryokouniikasemashita。",
        "translation": "Con trai tôi muốn đi nên tôi để cháu tự đi du lịch."
      }
    ]
  },
  {
    "id": "ja-g-n4-30-serareru-saserareru",
    "language": "ja",
    "level": "N4",
    "pattern": "〜せられる / 〜させられる (serareru / saserareru)",
    "meaning": "bị bắt phải làm (trái với ý muốn của ai đó)",
    "formula": "Động từ thể ない (V-nai) stem + せられる (Group 1; short form される) / Động từ thể ない (V-nai) stem + させられる (Group 2)",
    "note": "Bất quy tắc: する → させられる, 来る → 来させられる. Dạng ngắn Nhóm 1 (待たされる) phổ biến trong lời nói, nhưng không phổ biến với các động từ kết thúc bằng す (話させられる).",
    "examples": [
      {
        "text": "子[こ]どものころ、母[はは]に毎日[まいにち]ピアノを練習[れんしゅう]させられた。",
        "furigana": "子[こ]どものころ、母[はは]に毎日[まいにち]ピアノを練習[れんしゅう]させられた。",
        "reading": "kodomonokoro、hahanimainichiピアノorenshuusaserareta。",
        "translation": "Khi tôi còn nhỏ, mẹ tôi bắt tôi tập piano hàng ngày."
      },
      {
        "text": "駅[えき]で三十分[さんじゅっぷん]も待[ま]たされました。",
        "furigana": "駅[えき]で三十分[さんじゅっぷん]も待[ま]たされました。",
        "reading": "ekidesanjuppunmomatasaremashita。",
        "translation": "Tôi phải đợi ba mươi phút ở ga."
      },
      {
        "text": "会社[かいしゃ]の飲[の]み会[かい]で歌[うた]を歌[うた]わされた。",
        "furigana": "会社[かいしゃ]の飲[の]み会[かい]で歌[うた]を歌[うた]わされた。",
        "reading": "kaishanonomikaideutaoutawasareta。",
        "translation": "Tôi bị bắt hát một bài hát trong bữa tiệc rượu của công ty."
      }
    ]
  },
  {
    "id": "ja-g-n4-31-ou-you",
    "language": "ja",
    "level": "N4",
    "pattern": "〜おう / 〜よう (ou / you)",
    "meaning": "let's (casual); Tôi sẽ (dạng ý chí)",
    "formula": "Động từ thể từ điển (V-dict) (Group 1: final u → o) + う / Động từ thể ます bỏ ます (V-masu) + よう (Group 2)",
    "note": "Bất quy tắc: する → しよう, 来る → 来よう. Tương đương với 〜ましょう.",
    "examples": [
      {
        "text": "疲[つか]れたね。少[すこ]し休[やす]もう。",
        "furigana": "疲[つか]れたね。少[すこ]し休[やす]もう。",
        "reading": "tsukaretane。sukoshiyasumou。",
        "translation": "Tôi mệt quá. Chúng ta hãy nghỉ ngơi một chút."
      },
      {
        "text": "週末[しゅうまつ]、一緒[いっしょ]に映画[えいが]を見[み]ようよ。",
        "furigana": "週末[しゅうまつ]、一緒[いっしょ]に映画[えいが]を見[み]ようよ。",
        "reading": "shuumatsu、isshonieigaomiyouyo。",
        "translation": "Cuối tuần này chúng ta cùng nhau xem phim nhé."
      },
      {
        "text": "よし、今日[きょう]から毎日[まいにち]日記[にっき]を書[か]こう。",
        "furigana": "よし、今日[きょう]から毎日[まいにち]日記[にっき]を書[か]こう。",
        "reading": "yoshi、kyoukaramainichinikkiokakou。",
        "translation": "Được rồi, bắt đầu từ hôm nay, tôi sẽ viết nhật ký hàng ngày."
      }
    ]
  },
  {
    "id": "ja-g-n4-32-you-to-omou",
    "language": "ja",
    "level": "N4",
    "pattern": "〜(よ)うと思う (you to omou)",
    "meaning": "đang nghĩ tới việc làm; dự định",
    "formula": "Động từ thể ý chí (V-ý chí) + と思う",
    "note": "〜と思う thường báo cáo một quyết định vừa được đưa ra; 〜と思っている thể hiện một kế hoạch được thực hiện trong một thời gian. Nhẹ nhàng hơn つもり.",
    "examples": [
      {
        "text": "今年[ことし]の夏[なつ]は海[うみ]に行[い]こうと思[おも]っています。",
        "furigana": "今年[ことし]の夏[なつ]は海[うみ]に行[い]こうと思[おも]っています。",
        "reading": "kotoshinonatsuhauminiikoutoomotteimasu。",
        "translation": "Tôi đang nghĩ đến việc đi biển vào mùa hè này."
      },
      {
        "text": "明日[あした]は早[はや]く起[お]きて、公園[こうえん]を走[はし]ろうと思[おも]う。",
        "furigana": "明日[あした]は早[はや]く起[お]きて、公園[こうえん]を走[はし]ろうと思[おも]う。",
        "reading": "ashitahahayakuokite、kouenohashiroutoomou。",
        "translation": "Tôi nghĩ ngày mai tôi sẽ dậy sớm và chạy trong công viên."
      },
      {
        "text": "新[あたら]しいパソコンを買[か]おうと思[おも]ったけど、やめました。",
        "furigana": "新[あたら]しいパソコンを買[か]おうと思[おも]ったけど、やめました。",
        "reading": "atarashiiパソコンokaoutoomottakedo、yamemashita。",
        "translation": "Tôi đã nghĩ đến việc mua một chiếc máy tính mới, nhưng tôi quyết định không làm vậy."
      }
    ]
  },
  {
    "id": "ja-g-n4-33-e-ro",
    "language": "ja",
    "level": "N4",
    "pattern": "〜え / 〜ろ (e / ro)",
    "meaning": "làm đi! (dạng mệnh lệnh; lệnh thẳng thừng)",
    "formula": "Động từ thể từ điển (V-dict) (Group 1: final u → e) / Động từ thể ます bỏ ます (V-masu) + ろ (Group 2)",
    "note": "Bất quy tắc: する → しろ, 来る → 来い, くれる → くれ. Rất thẳng thừng; chủ yếu được nghe từ nam giới, trên các biển báo, trong trường hợp khẩn cấp và trong tiếng cổ vũ (がんばれ).",
    "examples": [
      {
        "text": "早[はや]く起[お]きろ！遅刻[ちこく]するぞ。",
        "furigana": "早[はや]く起[お]きろ！遅刻[ちこく]するぞ。",
        "reading": "hayakuokiro！chikokusuruzo。",
        "translation": "Dậy sớm đi! Tôi sẽ bị trễ mất."
      },
      {
        "text": "危[あぶ]ない！止[と]まれ！",
        "furigana": "危[あぶ]ない！止[と]まれ！",
        "reading": "abunai！tomare！",
        "translation": "Nguy hiểm! dừng lại!"
      },
      {
        "text": "がんばれ！あと少[すこ]しだ！",
        "furigana": "がんばれ！あと少[すこ]しだ！",
        "reading": "ganbare！atosukoshida！",
        "translation": "cố lên nhé! Chỉ một chút nữa thôi!"
      }
    ]
  },
  {
    "id": "ja-g-n4-34-na-prohibition",
    "language": "ja",
    "level": "N4",
    "pattern": "〜な（prohibition） (na (prohibition))",
    "meaning": "thì không! (cấm mạnh)",
    "formula": "Động từ thể từ điển (V-dict) + な",
    "note": "Rất mạnh mẽ và thẳng thừng. Đừng nhầm lẫn nó với đuôi câu な diễn tả cảm xúc (いいな).",
    "examples": [
      {
        "text": "危[あぶ]ないから、この川[かわ]では泳[およ]ぐな。",
        "furigana": "危[あぶ]ないから、この川[かわ]では泳[およ]ぐな。",
        "reading": "abunaikara、konokawadehaoyoguna。",
        "translation": "Đừng bơi ở sông này, nguy hiểm lắm."
      },
      {
        "text": "もう泣[な]くな。大丈夫[だいじょうぶ]だよ。",
        "furigana": "もう泣[な]くな。大丈夫[だいじょうぶ]だよ。",
        "reading": "mounakuna。daijoubudayo。",
        "translation": "Đừng khóc nữa. Không sao đâu."
      },
      {
        "text": "壁[かべ]に「ここにごみを捨[す]てるな」と書[か]いてある。",
        "furigana": "壁[かべ]に「ここにごみを捨[す]てるな」と書[か]いてある。",
        "reading": "kabeni「kokonigomiosuteruna」tokaitearu。",
        "translation": "Có một tấm biển trên tường ghi: ``Đừng vứt rác ở đây.''"
      }
    ]
  },
  {
    "id": "ja-g-n4-35-nasai",
    "language": "ja",
    "level": "N4",
    "pattern": "〜なさい (nasai)",
    "meaning": "làm (hướng dẫn của phụ huynh, giáo viên, v.v.)",
    "formula": "Động từ thể ます bỏ ます (V-masu) + なさい",
    "note": "Nhẹ nhàng hơn dạng mệnh lệnh nhưng vẫn mang tính chỉ dẫn chắc chắn; được phụ huynh, giáo viên và trong các buổi hướng dẫn thi cử, không bao giờ hướng tới cấp trên.",
    "examples": [
      {
        "text": "もう九[く]時[じ]よ。早[はや]く寝[ね]なさい。",
        "furigana": "もう九[く]時[じ]よ。早[はや]く寝[ね]なさい。",
        "reading": "moukujiyo。hayakunenasai。",
        "translation": "Đã chín giờ rồi. Đi ngủ sớm đi."
      },
      {
        "text": "次[つぎ]の文[ぶん]を読[よ]んで、質問[しつもん]に答[こた]えなさい。",
        "furigana": "次[つぎ]の文[ぶん]を読[よ]んで、質問[しつもん]に答[こた]えなさい。",
        "reading": "tsuginobunoyonde、shitsumonnikotaenasai。",
        "translation": "Đọc đoạn văn sau và trả lời câu hỏi."
      },
      {
        "text": "ご飯[はん]の前[まえ]に手[て]を洗[あら]いなさい。",
        "furigana": "ご飯[はん]の前[まえ]に手[て]を洗[あら]いなさい。",
        "reading": "gohannomaeniteoarainasai。",
        "translation": "Rửa tay trước khi ăn."
      }
    ]
  },
  {
    "id": "ja-g-n4-36-ba",
    "language": "ja",
    "level": "N4",
    "pattern": "〜ば (ba)",
    "meaning": "nếu",
    "formula": "Verb-ba / Tính từ đuôi い (A-i) stem + ければ / Tính từ đuôi な (A-na) + なら / Danh từ (N) + なら",
    "note": "Tập trung vào điều kiện cần thiết để đạt được kết quả. Khi mệnh đề chính là một yêu cầu hoặc lời mời, たら thường tự nhiên hơn trừ khi mệnh đề ば là một trạng thái (ある, いる, tính từ).",
    "examples": [
      {
        "text": "この道[みち]をまっすぐ行[い]けば、駅[えき]に着[つ]きます。",
        "furigana": "この道[みち]をまっすぐ行[い]けば、駅[えき]に着[つ]きます。",
        "reading": "konomichiomassuguikeba、ekinitsukimasu。",
        "translation": "Nếu đi thẳng theo con đường này sẽ tới nhà ga."
      },
      {
        "text": "安[やす]ければ、買[か]いたいです。",
        "furigana": "安[やす]ければ、買[か]いたいです。",
        "reading": "yasukereba、kaitaidesu。",
        "translation": "Nếu rẻ thì tôi cũng muốn mua."
      },
      {
        "text": "分[わ]からないことがあれば、いつでも聞[き]いてください。",
        "furigana": "分[わ]からないことがあれば、いつでも聞[き]いてください。",
        "reading": "wakaranaikotogaareba、itsudemokiitekudasai。",
        "translation": "Có gì không hiểu thì cứ hỏi nhé."
      }
    ]
  },
  {
    "id": "ja-g-n4-37-tara",
    "language": "ja",
    "level": "N4",
    "pattern": "〜たら (tara)",
    "meaning": "nếu; khi; sau",
    "formula": "Động từ thể た (V-ta) + ら / Tính từ đuôi い (A-i) stem + かったら / Tính từ đuôi な (A-na) + だったら / Danh từ (N) + だったら",
    "note": "Câu điều kiện linh hoạt nhất và rất phổ biến trong lời nói. Với những sự kiện chắc chắn sẽ xảy ra, nó có nghĩa là 'khi/sau'.",
    "examples": [
      {
        "text": "駅[えき]に着[つ]いたら、電話[でんわ]してください。",
        "furigana": "駅[えき]に着[つ]いたら、電話[でんわ]してください。",
        "reading": "ekinitsuitara、denwashitekudasai。",
        "translation": "Hãy gọi cho tôi khi bạn đến ga."
      },
      {
        "text": "もし明日[あした]雨[あめ]だったら、家[いえ]で映画[えいが]を見[み]よう。",
        "furigana": "もし明日[あした]雨[あめ]だったら、家[いえ]で映画[えいが]を見[み]よう。",
        "reading": "moshiashitaamedattara、iedeeigaomiyou。",
        "translation": "Nếu ngày mai trời mưa thì chúng ta cùng xem phim ở nhà nhé."
      },
      {
        "text": "暑[あつ]かったら、窓[まど]を開[あ]けてもいいですよ。",
        "furigana": "暑[あつ]かったら、窓[まど]を開[あ]けてもいいですよ。",
        "reading": "atsukattara、madooaketemoiidesuyo。",
        "translation": "Nếu trời nóng thì có thể mở cửa sổ."
      }
    ]
  },
  {
    "id": "ja-g-n4-38-nara",
    "language": "ja",
    "level": "N4",
    "pattern": "〜なら (nara)",
    "meaning": "if (là trường hợp đó); nếu bạn đang nói về",
    "formula": "Động từ thể thông thường (V thường) / Tính từ đuôi い (A-i) / Tính từ đuôi な (A-na) / Danh từ (N) + なら",
    "note": "Tiếp thu những gì người nghe đã nói hoặc một tình huống được cho là đúng, sau đó đưa ra lời khuyên hoặc ý kiến. Không giống như たら, hành động chính có thể xảy ra trước mệnh đề なら.",
    "examples": [
      {
        "text": "京都[きょうと]へ行[い]くなら、秋[あき]がいいですよ。",
        "furigana": "京都[きょうと]へ行[い]くなら、秋[あき]がいいですよ。",
        "reading": "kyoutoheikunara、akigaiidesuyo。",
        "translation": "Mùa thu là thời điểm đẹp nhất để đi Kyoto."
      },
      {
        "text": "パソコンのことなら、兄[あに]に聞[き]くといいよ。",
        "furigana": "パソコンのことなら、兄[あに]に聞[き]くといいよ。",
        "reading": "パソコンnokotonara、aninikikutoiiyo。",
        "translation": "Về vấn đề máy tính, bạn có thể hỏi anh trai mình."
      },
      {
        "text": "そんなに眠[ねむ]いなら、今日[きょう]は早[はや]く寝[ね]たら？",
        "furigana": "そんなに眠[ねむ]いなら、今日[きょう]は早[はや]く寝[ね]たら？",
        "reading": "sonnaninemuinara、kyouhahayakunetara？",
        "translation": "Nếu buồn ngủ quá thì hôm nay sao bạn không đi ngủ sớm nhỉ?"
      }
    ]
  },
  {
    "id": "ja-g-n4-39-to",
    "language": "ja",
    "level": "N4",
    "pattern": "〜と（conditional） (to)",
    "meaning": "khi nào; nếu như; bất cứ khi nào (kết quả tự nhiên hoặc tự động)",
    "formula": "Động từ thể từ điển (V-dict) / Động từ thể ない (V-nai) / Tính từ đuôi い (A-i) + と / Tính từ đuôi な (A-na) + だ + と / Danh từ (N) + だ + と",
    "note": "Để có kết quả tự nhiên, cách máy móc hoạt động, hướng dẫn và thói quen. Mệnh đề chính không thể là một yêu cầu, mong muốn hay lời mời.",
    "examples": [
      {
        "text": "このボタンを押[お]すと、お茶[ちゃ]が出[で]ます。",
        "furigana": "このボタンを押[お]すと、お茶[ちゃ]が出[で]ます。",
        "reading": "konoボタンoosuto、ochagademasu。",
        "translation": "Nhấn nút này và trà sẽ được phục vụ."
      },
      {
        "text": "春[はる]になると、桜[さくら]が咲[さ]きます。",
        "furigana": "春[はる]になると、桜[さくら]が咲[さ]きます。",
        "reading": "haruninaruto、sakuragasakimasu。",
        "translation": "Vào mùa xuân, hoa anh đào nở rộ."
      },
      {
        "text": "この道[みち]を右[みぎ]に曲[ま]がると、左[ひだり]に郵便[ゆうびん]局[きょく]があります。",
        "furigana": "この道[みち]を右[みぎ]に曲[ま]がると、左[ひだり]に郵便[ゆうびん]局[きょく]があります。",
        "reading": "konomichiomiginimagaruto、hidariniyuubinkyokugaarimasu。",
        "translation": "Rẽ phải vào con đường này và bưu điện sẽ ở bên trái bạn."
      }
    ]
  },
  {
    "id": "ja-g-n4-40-te-mo-de-mo",
    "language": "ja",
    "level": "N4",
    "pattern": "〜ても / 〜でも (te mo / de mo)",
    "meaning": "ngay cả khi; mặc dù",
    "formula": "Động từ thể て (V-te) + も / Tính từ đuôi い (A-i)-ku + ても / Tính từ đuôi な (A-na) + でも / Danh từ (N) + でも",
    "note": "Với từ để hỏi hoặc いくら nó có nghĩa là 'không có vấn đề gì ...' (何を食べても, いくら待っても).",
    "examples": [
      {
        "text": "雨[あめ]が降[ふ]っても、試合[しあい]はあります。",
        "furigana": "雨[あめ]が降[ふ]っても、試合[しあい]はあります。",
        "reading": "amegafuttemo、shiaihaarimasu。",
        "translation": "Dù trời có mưa thì vẫn có trò chơi."
      },
      {
        "text": "いくら練習[れんしゅう]しても、なかなか上手[じょうず]になりません。",
        "furigana": "いくら練習[れんしゅう]しても、なかなか上手[じょうず]になりません。",
        "reading": "ikurarenshuushitemo、nakanakajouzuninarimasen。",
        "translation": "Dù bạn có luyện tập bao nhiêu đi nữa thì bạn cũng sẽ không bao giờ giỏi được."
      },
      {
        "text": "日曜日[にちようび]でも、この店[みせ]は開[あ]いています。",
        "furigana": "日曜日[にちようび]でも、この店[みせ]は開[あ]いています。",
        "reading": "nichiyoubidemo、konomisehaaiteimasu。",
        "translation": "Cửa hàng này mở cửa cả vào Chủ Nhật."
      }
    ]
  },
  {
    "id": "ja-g-n4-41-noni-although",
    "language": "ja",
    "level": "N4",
    "pattern": "〜のに（although） (noni (although))",
    "meaning": "mặc dù; mặc dù (với sự ngạc nhiên hoặc không hài lòng)",
    "formula": "Động từ thể thông thường (V thường) / Tính từ đuôi い (A-i) + のに / Tính từ đuôi な (A-na) + な + のに / Danh từ (N) + な + のに",
    "note": "Mang đến sự ngạc nhiên, thất vọng hoặc phàn nàn. Mệnh đề chính không thể là một yêu cầu hay ý định; sử dụng けど hoặc ても ở đó.",
    "examples": [
      {
        "text": "一生懸命[いっしょうけんめい]勉強[べんきょう]したのに、試験[しけん]に落[お]ちてしまった。",
        "furigana": "一生懸命[いっしょうけんめい]勉強[べんきょう]したのに、試験[しけん]に落[お]ちてしまった。",
        "reading": "isshoukenmeibenkyoushitanoni、shikenniochiteshimatta。",
        "translation": "Dù học chăm chỉ nhưng tôi vẫn trượt kỳ thi."
      },
      {
        "text": "日曜日[にちようび]なのに、会社[かいしゃ]に行[い]かなければならない。",
        "furigana": "日曜日[にちようび]なのに、会社[かいしゃ]に行[い]かなければならない。",
        "reading": "nichiyoubinanoni、kaishaniikanakerebanaranai。",
        "translation": "Dù là chủ nhật nhưng tôi vẫn phải đi làm."
      },
      {
        "text": "約束[やくそく]したのに、彼[かれ]は来[こ]なかった。",
        "furigana": "約束[やくそく]したのに、彼[かれ]は来[こ]なかった。",
        "reading": "yakusokushitanoni、karehakonakatta。",
        "translation": "Dù đã hứa nhưng anh ấy vẫn không đến."
      }
    ]
  },
  {
    "id": "ja-g-n4-42-noni-purpose",
    "language": "ja",
    "level": "N4",
    "pattern": "〜のに（purpose） (noni (purpose))",
    "meaning": "for; để (với mục đích sử dụng, thời gian hoặc chi phí)",
    "formula": "Động từ thể từ điển (V-dict) + のに / Danh từ (N) + に",
    "note": "Thường theo sau là các từ như 使う, いい, 便利, 必要 hoặc かかる. Với danh từ, chỉ dùng に (旅行に便利).",
    "examples": [
      {
        "text": "このかばんは旅行[りょこう]に行[い]くのに便利[べんり]です。",
        "furigana": "このかばんは旅行[りょこう]に行[い]くのに便利[べんり]です。",
        "reading": "konokabanharyokouniikunonibenridesu。",
        "translation": "Túi này tiện lợi khi đi du lịch."
      },
      {
        "text": "家[いえ]から駅[えき]まで歩[ある]くのに二十分[にじゅっぷん]かかります。",
        "furigana": "家[いえ]から駅[えき]まで歩[ある]くのに二十分[にじゅっぷん]かかります。",
        "reading": "iekaraekimadearukunoninijuppunkakarimasu。",
        "translation": "Từ nhà tôi đi bộ tới ga mất hai mươi phút."
      },
      {
        "text": "引[ひ]っ越[こ]しするのに十[じゅう]万[まん]円[えん]ぐらいかかった。",
        "furigana": "引[ひ]っ越[こ]しするのに十[じゅう]万[まん]円[えん]ぐらいかかった。",
        "reading": "hikkoshisurunonijuumanenguraikakatta。",
        "translation": "Tôi tốn khoảng 100.000 yên để di chuyển."
      }
    ]
  },
  {
    "id": "ja-g-n4-43-node",
    "language": "ja",
    "level": "N4",
    "pattern": "〜ので (node)",
    "meaning": "bởi vì; vì",
    "formula": "Động từ thể thông thường (V thường) / Tính từ đuôi い (A-i) + ので / Tính từ đuôi な (A-na) + な + ので / Danh từ (N) + な + ので",
    "note": "Nghe nhẹ nhàng và khách quan hơn から nên nó được ưa chuộng hơn khi đưa ra lý do một cách lịch sự hoặc khi xin lỗi.",
    "examples": [
      {
        "text": "頭[あたま]が痛[いた]いので、今日[きょう]は早[はや]く帰[かえ]ります。",
        "furigana": "頭[あたま]が痛[いた]いので、今日[きょう]は早[はや]く帰[かえ]ります。",
        "reading": "atamagaitainode、kyouhahayakukaerimasu。",
        "translation": "Đau đầu quá nên hôm nay về nhà sớm."
      },
      {
        "text": "明日[あした]はテストなので、今夜[こんや]は勉強[べんきょう]します。",
        "furigana": "明日[あした]はテストなので、今夜[こんや]は勉強[べんきょう]します。",
        "reading": "ashitahaテストnanode、konyahabenkyoushimasu。",
        "translation": "Mai mình có bài kiểm tra nên tối nay mình sẽ học."
      },
      {
        "text": "道[みち]がこんでいたので、少[すこ]し遅[おく]れました。",
        "furigana": "道[みち]がこんでいたので、少[すこ]し遅[おく]れました。",
        "reading": "michigakondeitanode、sukoshiokuremashita。",
        "translation": "Đường tắc nên mình đến hơi muộn."
      }
    ]
  },
  {
    "id": "ja-g-n4-44-te-reason",
    "language": "ja",
    "level": "N4",
    "pattern": "〜て（reason） (te (reason))",
    "meaning": "bởi vì; vì vậy (nguyên nhân của một cảm giác hoặc trạng thái)",
    "formula": "Động từ thể て (V-te) / Tính từ đuôi い (A-i) stem + くて / Tính từ đuôi な (A-na) + で / Danh từ (N) + で",
    "note": "Phần thứ hai thường là cảm giác, hình thức tiềm ẩn hoặc kết quả, không phải là yêu cầu hay ý định (dùng から hoặc ので cho những điều đó). Phủ định: 〜なくて (会えなくて寂しい).",
    "examples": [
      {
        "text": "ニュースを聞[き]いて、びっくりしました。",
        "furigana": "ニュースを聞[き]いて、びっくりしました。",
        "reading": "ニュースokiite、bikkurishimashita。",
        "translation": "Tôi rất ngạc nhiên khi biết tin."
      },
      {
        "text": "このスープは熱[あつ]くて、飲[の]めません。",
        "furigana": "このスープは熱[あつ]くて、飲[の]めません。",
        "reading": "konoスープhaatsukute、nomemasen。",
        "translation": "Món súp này nóng quá không thể uống được."
      },
      {
        "text": "かぜで学校[がっこう]を休[やす]みました。",
        "furigana": "かぜで学校[がっこう]を休[やす]みました。",
        "reading": "kazedegakkouoyasumimashita。",
        "translation": "Mình nghỉ học vì bị cảm."
      }
    ]
  },
  {
    "id": "ja-g-n4-45-shi",
    "language": "ja",
    "level": "N4",
    "pattern": "〜し (shi)",
    "meaning": "và hơn thế nữa; và bên cạnh đó (liệt kê lý do)",
    "formula": "Động từ thể thông thường (V thường) / Tính từ đuôi い (A-i) + し / Tính từ đuôi な (A-na) + だ + し / Danh từ (N) + だ + し",
    "note": "Liệt kê một số lý do hoặc điểm. Một chữ し gợi ý rằng còn có những lý do khác.",
    "examples": [
      {
        "text": "この部屋[へや]は広[ひろ]いし、駅[えき]から近[ちか]いし、とても気[き]に入[い]っています。",
        "furigana": "この部屋[へや]は広[ひろ]いし、駅[えき]から近[ちか]いし、とても気[き]に入[い]っています。",
        "reading": "konoheyahahiroishi、ekikarachikaishi、totemokiniitteimasu。",
        "translation": "Phòng này rộng rãi và gần ga nên mình rất thích."
      },
      {
        "text": "今日[きょう]は雨[あめ]だし、疲[つか]れているし、どこにも行[い]きたくない。",
        "furigana": "今日[きょう]は雨[あめ]だし、疲[つか]れているし、どこにも行[い]きたくない。",
        "reading": "kyouhaamedashi、tsukareteirushi、dokonimoikitakunai。",
        "translation": "Hôm nay trời mưa, tôi mệt, chẳng muốn đi đâu cả."
      },
      {
        "text": "もう遅[おそ]いし、そろそろ帰[かえ]ろうか。",
        "furigana": "もう遅[おそ]いし、そろそろ帰[かえ]ろうか。",
        "reading": "mouosoishi、sorosorokaerouka。",
        "translation": "Giờ đã muộn rồi nên tôi nghĩ mình nên về nhà sớm thôi."
      }
    ]
  },
  {
    "id": "ja-g-n4-46-kedo-keredomo",
    "language": "ja",
    "level": "N4",
    "pattern": "〜けど / 〜けれども (kedo / keredomo)",
    "meaning": "Nhưng; mặc dù; (dẫn vào mềm)",
    "formula": "Câu + けど / けれども",
    "note": "Mang tính trò chuyện nhiều hơn が; けれども trang trọng hơn けど một chút. Thường được sử dụng như một lời mở đầu nhẹ nhàng trước một câu hỏi hoặc yêu cầu.",
    "examples": [
      {
        "text": "この店[みせ]は高[たか]いけど、おいしい。",
        "furigana": "この店[みせ]は高[たか]いけど、おいしい。",
        "reading": "konomisehatakaikedo、oishii。",
        "translation": "Nhà hàng này đắt tiền nhưng ngon."
      },
      {
        "text": "すみません、駅[えき]に行[い]きたいんですけど、どう行[い]けばいいですか。",
        "furigana": "すみません、駅[えき]に行[い]きたいんですけど、どう行[い]けばいいですか。",
        "reading": "sumimasen、ekiniikitaindesukedo、douikebaiidesuka。",
        "translation": "Xin lỗi, tôi muốn đến ga nhưng phải đi bằng cách nào?"
      },
      {
        "text": "何[なん]度[ど]も電話[でんわ]したけれども、誰[だれ]も出[で]なかった。",
        "furigana": "何[なん]度[ど]も電話[でんわ]したけれども、誰[だれ]も出[で]なかった。",
        "reading": "nandomodenwashitakeredomo、daremodenakatta。",
        "translation": "Tôi gọi nhiều lần nhưng không ai trả lời."
      }
    ]
  },
  {
    "id": "ja-g-n4-47-tame-ni",
    "language": "ja",
    "level": "N4",
    "pattern": "〜ために (tame ni)",
    "meaning": "để; vì (vì lợi ích của); vì",
    "formula": "Động từ thể từ điển (V-dict) / Động từ thể た (V-ta) / Danh từ (N) + の + ために",
    "note": "Vì mục đích, động từ phải là thứ mà chủ ngữ có thể kiểm soát được (so sánh 〜ように). Việc sử dụng 'vì' nghe có vẻ khá trang trọng.",
    "examples": [
      {
        "text": "日本[にほん]の大学[だいがく]に入[はい]るために、毎日[まいにち]勉強[べんきょう]しています。",
        "furigana": "日本[にほん]の大学[だいがく]に入[はい]るために、毎日[まいにち]勉強[べんきょう]しています。",
        "reading": "nihonnodaigakunihairutameni、mainichibenkyoushiteimasu。",
        "translation": "Mình đang học mỗi ngày để vào được trường đại học Nhật Bản."
      },
      {
        "text": "家族[かぞく]のために、一生懸命[いっしょうけんめい]働[はたら]いている。",
        "furigana": "家族[かぞく]のために、一生懸命[いっしょうけんめい]働[はたら]いている。",
        "reading": "kazokunotameni、isshoukenmeihataraiteiru。",
        "translation": "Anh ấy làm việc chăm chỉ vì gia đình."
      },
      {
        "text": "大雪[おおゆき]のために、電車[でんしゃ]が止[と]まりました。",
        "furigana": "大雪[おおゆき]のために、電車[でんしゃ]が止[と]まりました。",
        "reading": "ooyukinotameni、denshagatomarimashita。",
        "translation": "Tàu dừng lại vì tuyết dày."
      }
    ]
  },
  {
    "id": "ja-g-n4-48-you-ni",
    "language": "ja",
    "level": "N4",
    "pattern": "〜ように（purpose） (you ni)",
    "meaning": "vậy đó; để",
    "formula": "Động từ thể từ điển (V-dict) / Động từ thể ない (V-nai) + ように",
    "note": "Dùng với các động từ mà chủ ngữ không thể trực tiếp điều khiển: dạng tiềm năng, 分かる, 見える, phủ định. Với những hành động có chủ ý, hãy sử dụng ために.",
    "examples": [
      {
        "text": "後[うし]ろの人[ひと]にも聞[き]こえるように、大[おお]きな声[こえ]で話[はな]してください。",
        "furigana": "後[うし]ろの人[ひと]にも聞[き]こえるように、大[おお]きな声[こえ]で話[はな]してください。",
        "reading": "ushironohitonimokikoeruyouni、ookinakoedehanashitekudasai。",
        "translation": "Hãy nói to để người đứng sau có thể nghe thấy."
      },
      {
        "text": "忘[わす]れないように、手[て]にメモを書[か]いた。",
        "furigana": "忘[わす]れないように、手[て]にメモを書[か]いた。",
        "reading": "wasurenaiyouni、teniメモokaita。",
        "translation": "Mình viết note lên tay cho khỏi quên."
      },
      {
        "text": "かぜをひかないように、暖[あたた]かくして寝[ね]てください。",
        "furigana": "かぜをひかないように、暖[あたた]かくして寝[ね]てください。",
        "reading": "kazeohikanaiyouni、atatakakushitenetekudasai。",
        "translation": "Hãy ngủ ấm để tránh bị cảm lạnh."
      }
    ]
  },
  {
    "id": "ja-g-n4-49-you-ni-suru",
    "language": "ja",
    "level": "N4",
    "pattern": "〜ようにする (you ni suru)",
    "meaning": "cố gắng; đảm bảo ; tạo thói quen",
    "formula": "Động từ thể từ điển (V-dict) / Động từ thể ない (V-nai) + ようにする",
    "note": "〜ようにしている mô tả một thói quen mà bạn duy trì. So sánh 〜ようになる, một sự thay đổi xảy ra.",
    "examples": [
      {
        "text": "毎日[まいにち]野菜[やさい]を食[た]べるようにしています。",
        "furigana": "毎日[まいにち]野菜[やさい]を食[た]べるようにしています。",
        "reading": "mainichiyasaiotaberuyounishiteimasu。",
        "translation": "Mình cố gắng ăn rau mỗi ngày."
      },
      {
        "text": "これからは遅刻[ちこく]しないようにします。",
        "furigana": "これからは遅刻[ちこく]しないようにします。",
        "reading": "korekarahachikokushinaiyounishimasu。",
        "translation": "Từ giờ tôi sẽ cố gắng không đến muộn."
      },
      {
        "text": "寝[ね]る前[まえ]にスマホを見[み]ないようにしている。",
        "furigana": "寝[ね]る前[まえ]にスマホを見[み]ないようにしている。",
        "reading": "nerumaeniスマホominaiyounishiteiru。",
        "translation": "Tôi cố gắng không nhìn vào điện thoại thông minh của mình trước khi đi ngủ."
      }
    ]
  },
  {
    "id": "ja-g-n4-50-you-ni-naru",
    "language": "ja",
    "level": "N4",
    "pattern": "〜ようになる (you ni naru)",
    "meaning": "đến; đạt tới mức (thay đổi về khả năng hoặc thói quen)",
    "formula": "Động từ thể từ điển (V-dict) / Động từ thể ない (V-nai) + ようになる",
    "note": "Thường được sử dụng với các động từ tiềm năng. Đối với 'không còn nữa', 〜なくなる thường tự nhiên hơn 〜ないようになる.",
    "examples": [
      {
        "text": "練習[れんしゅう]して、自転車[じてんしゃ]に乗[の]れるようになりました。",
        "furigana": "練習[れんしゅう]して、自転車[じてんしゃ]に乗[の]れるようになりました。",
        "reading": "renshuushite、jitenshaninoreruyouninarimashita。",
        "translation": "Sau khi tập luyện, bây giờ tôi đã có thể đi xe đạp."
      },
      {
        "text": "日本[にほん]に来[き]てから、朝[あさ]ご飯[はん]を食[た]べるようになった。",
        "furigana": "日本[にほん]に来[き]てから、朝[あさ]ご飯[はん]を食[た]べるようになった。",
        "reading": "nihonnikitekara、asagohanotaberuyouninatta。",
        "translation": "Sau khi đến Nhật Bản, tôi bắt đầu ăn sáng."
      },
      {
        "text": "赤[あか]ちゃんが少[すこ]しずつ話[はな]せるようになってきた。",
        "furigana": "赤[あか]ちゃんが少[すこ]しずつ話[はな]せるようになってきた。",
        "reading": "akachangasukoshizutsuhanaseruyouninattekita。",
        "translation": "Bé bắt đầu biết nói từng chút một."
      }
    ]
  },
  {
    "id": "ja-g-n4-51-te-hoshii",
    "language": "ja",
    "level": "N4",
    "pattern": "〜てほしい (te hoshii)",
    "meaning": "muốn ai đó làm",
    "formula": "Động từ thể て (V-te) + ほしい / Động từ thể ない (V-nai) + で + ほしい",
    "note": "Người bạn muốn hành động được đánh dấu bằng に. Nói với cấp trên điều đó nghe có vẻ khắt khe; 〜ていただきたいです lịch sự hơn.",
    "examples": [
      {
        "text": "もう少[すこ]しゆっくり話[はな]してほしいです。",
        "furigana": "もう少[すこ]しゆっくり話[はな]してほしいです。",
        "reading": "mousukoshiyukkurihanashitehoshiidesu。",
        "translation": "Mong bạn nói chậm lại một chút."
      },
      {
        "text": "この話[はなし]は誰[だれ]にも言[い]わないでほしい。",
        "furigana": "この話[はなし]は誰[だれ]にも言[い]わないでほしい。",
        "reading": "konohanashihadarenimoiwanaidehoshii。",
        "translation": "Xin đừng kể cho ai biết về câu chuyện này."
      },
      {
        "text": "早[はや]く春[はる]が来[き]てほしいなあ。",
        "furigana": "早[はや]く春[はる]が来[き]てほしいなあ。",
        "reading": "hayakuharugakitehoshiinaa。",
        "translation": "Mong mùa xuân đến sớm."
      }
    ]
  },
  {
    "id": "ja-g-n4-52-tagaru",
    "language": "ja",
    "level": "N4",
    "pattern": "〜たがる (tagaru)",
    "meaning": "(người khác) muốn",
    "formula": "Động từ thể ます bỏ ます (V-masu) + たがる",
    "note": "Dùng cho người khác, vì bạn không thể trực tiếp biết được mong muốn của họ. Mong muốn hiện tại thường được thể hiện bằng 〜たがっている.",
    "examples": [
      {
        "text": "子[こ]どもたちは外[そと]で遊[あそ]びたがっている。",
        "furigana": "子[こ]どもたちは外[そと]で遊[あそ]びたがっている。",
        "reading": "kodomotachihasotodeasobitagatteiru。",
        "translation": "Bọn trẻ muốn ra ngoài chơi."
      },
      {
        "text": "弟[おとうと]はいつも私[わたし]のゲームをやりたがる。",
        "furigana": "弟[おとうと]はいつも私[わたし]のゲームをやりたがる。",
        "reading": "otoutohaitsumowatashinoゲームoyaritagaru。",
        "translation": "Anh trai tôi luôn muốn chơi game của tôi."
      },
      {
        "text": "犬[いぬ]が散歩[さんぽ]に行[い]きたがっています。",
        "furigana": "犬[いぬ]が散歩[さんぽ]に行[い]きたがっています。",
        "reading": "inugasanponiikitagatteimasu。",
        "translation": "Con chó muốn đi dạo."
      }
    ]
  },
  {
    "id": "ja-g-n4-53-garu",
    "language": "ja",
    "level": "N4",
    "pattern": "〜がる (garu)",
    "meaning": "(người khác) cảm thấy; có biểu hiện cảm xúc",
    "formula": "Tính từ đuôi い (A-i) stem / Tính từ đuôi な (A-na) + がる",
    "note": "Chuyển các tính từ cảm giác (怖い, 寂しい, ほしい) thành động từ mô tả cảm giác của người khác. Đối tượng của cảm giác lấy を.",
    "examples": [
      {
        "text": "妹[いもうと]は暗[くら]い所[ところ]を怖[こわ]がる。",
        "furigana": "妹[いもうと]は暗[くら]い所[ところ]を怖[こわ]がる。",
        "reading": "imoutohakuraitokorookowagaru。",
        "translation": "Em gái tôi sợ những nơi tối tăm."
      },
      {
        "text": "祖母[そぼ]は孫[まご]に会[あ]えなくて寂[さび]しがっている。",
        "furigana": "祖母[そぼ]は孫[まご]に会[あ]えなくて寂[さび]しがっている。",
        "reading": "sobohamagoniaenakutesabishigatteiru。",
        "translation": "Bà nội nhớ cháu lắm."
      },
      {
        "text": "息子[むすこ]は新[あたら]しい自転車[じてんしゃ]をほしがっている。",
        "furigana": "息子[むすこ]は新[あたら]しい自転車[じてんしゃ]をほしがっている。",
        "reading": "musukohaatarashiijitenshaohoshigatteiru。",
        "translation": "Con trai tôi muốn có một chiếc xe đạp mới."
      }
    ]
  },
  {
    "id": "ja-g-n4-54-kamo-shirenai",
    "language": "ja",
    "level": "N4",
    "pattern": "〜かもしれない (kamo shirenai)",
    "meaning": "có thể; có thể; có thể nhiều nhất là",
    "formula": "Động từ thể thông thường (V thường) / Tính từ đuôi い (A-i) / Tính từ đuôi な (A-na) / Danh từ (N) + かもしれない",
    "note": "Chắc chắn khoảng 50% hoặc ít hơn. Trong cách nói thông thường, nó thường được rút ngắn thành かも.",
    "examples": [
      {
        "text": "午後[ごご]から雨[あめ]が降[ふ]るかもしれません。",
        "furigana": "午後[ごご]から雨[あめ]が降[ふ]るかもしれません。",
        "reading": "gogokaraamegafurukamoshiremasen。",
        "translation": "Trời có thể mưa vào buổi chiều."
      },
      {
        "text": "かぎがない。電車[でんしゃ]の中[なか]で落[お]としたかもしれない。",
        "furigana": "かぎがない。電車[でんしゃ]の中[なか]で落[お]としたかもしれない。",
        "reading": "kagiganai。denshanonakadeotoshitakamoshirenai。",
        "translation": "Không có chìa khóa. Có lẽ tôi đã đánh rơi nó trên tàu."
      },
      {
        "text": "その話[はなし]は本当[ほんとう]かもしれない。",
        "furigana": "その話[はなし]は本当[ほんとう]かもしれない。",
        "reading": "sonohanashihahontoukamoshirenai。",
        "translation": "Câu chuyện đó có thể là sự thật."
      }
    ]
  },
  {
    "id": "ja-g-n4-55-darou",
    "language": "ja",
    "level": "N4",
    "pattern": "〜だろう (darou)",
    "meaning": "có lẽ; Tôi cho rằng (dạng đơn giản của でしょう)",
    "formula": "Động từ thể thông thường (V thường) / Tính từ đuôi い (A-i) / Tính từ đuôi な (A-na) / Danh từ (N) + だろう",
    "note": "Phổ biến trong văn viết và lời nói thông thường của nam giới; でしょう là hình thức lịch sự. Thường dùng với たぶん hoặc きっと, hoặc như 〜だろうと思う.",
    "examples": [
      {
        "text": "明日[あした]はたぶん晴[は]れるだろう。",
        "furigana": "明日[あした]はたぶん晴[は]れるだろう。",
        "reading": "ashitahatabunharerudarou。",
        "translation": "Ngày mai chắc trời sẽ nắng."
      },
      {
        "text": "彼女[かのじょ]はもう家[いえ]に着[つ]いただろう。",
        "furigana": "彼女[かのじょ]はもう家[いえ]に着[つ]いただろう。",
        "reading": "kanojohamouienitsuitadarou。",
        "translation": "Đáng lẽ bây giờ cô ấy đã về đến nhà rồi."
      },
      {
        "text": "この問題[もんだい]は子[こ]どもには難[むずか]しいだろうと思[おも]います。",
        "furigana": "この問題[もんだい]は子[こ]どもには難[むずか]しいだろうと思[おも]います。",
        "reading": "konomondaihakodomonihamuzukashiidaroutoomoimasu。",
        "translation": "Tôi nghĩ vấn đề này sẽ khó khăn với trẻ."
      }
    ]
  },
  {
    "id": "ja-g-n4-56-hazu-da",
    "language": "ja",
    "level": "N4",
    "pattern": "〜はずだ (hazu da)",
    "meaning": "nên có; được mong đợi (dựa trên lý luận)",
    "formula": "Động từ thể thông thường (V thường) / Tính từ đuôi い (A-i) + はずだ / Tính từ đuôi な (A-na) + な + はずだ / Danh từ (N) + の + はずだ",
    "note": "Một kỳ vọng tự tin dựa trên sự thật hoặc logic, không phải là phỏng đoán. Nó không có nghĩa là 'nên' như một nghĩa vụ.",
    "examples": [
      {
        "text": "荷物[にもつ]は明日[あした]届[とど]くはずです。",
        "furigana": "荷物[にもつ]は明日[あした]届[とど]くはずです。",
        "reading": "nimotsuhaashitatodokuhazudesu。",
        "translation": "Gói hàng sẽ đến vào ngày mai."
      },
      {
        "text": "彼[かれ]は十[じゅう]年[ねん]もアメリカに住[す]んでいたから、英語[えいご]が上手[じょうず]なはずだ。",
        "furigana": "彼[かれ]は十[じゅう]年[ねん]もアメリカに住[す]んでいたから、英語[えいご]が上手[じょうず]なはずだ。",
        "reading": "karehajuunenmoアメリカnisundeitakara、eigogajouzunahazuda。",
        "translation": "Anh ấy sống ở Mỹ được 10 năm nên chắc chắn anh ấy phải giỏi tiếng Anh."
      },
      {
        "text": "おかしいな。かぎはここに置[お]いたはずなのに。",
        "furigana": "おかしいな。かぎはここに置[お]いたはずなのに。",
        "reading": "okashiina。kagihakokonioitahazunanoni。",
        "translation": "Thật lạ. Lẽ ra tôi nên để chìa khóa ở đây."
      }
    ]
  },
  {
    "id": "ja-g-n4-57-hazu-ga-nai",
    "language": "ja",
    "level": "N4",
    "pattern": "〜はずがない (hazu ga nai)",
    "meaning": "không thể; không có cách nào mà",
    "formula": "Động từ thể thông thường (V thường) / Tính từ đuôi い (A-i) + はずがない / Tính từ đuôi な (A-na) + な + はずがない / Danh từ (N) + の + はずがない",
    "note": "Phủ nhận mạnh mẽ dựa trên lý luận. 〜ないはずだ ('không nên') là một sự mong đợi nhẹ nhàng hơn.",
    "examples": [
      {
        "text": "あんなにまじめな人[ひと]がうそをつくはずがない。",
        "furigana": "あんなにまじめな人[ひと]がうそをつくはずがない。",
        "reading": "annanimajimenahitogausootsukuhazuganai。",
        "translation": "Một người nghiêm túc như vậy không thể nào nói dối được."
      },
      {
        "text": "今日[きょう]は日曜日[にちようび]だから、銀行[ぎんこう]が開[あ]いているはずがない。",
        "furigana": "今日[きょう]は日曜日[にちようび]だから、銀行[ぎんこう]が開[あ]いているはずがない。",
        "reading": "kyouhanichiyoubidakara、ginkougaaiteiruhazuganai。",
        "translation": "Hôm nay là chủ nhật nên ngân hàng không mở cửa được."
      },
      {
        "text": "かぎはちゃんとかけたから、ドアが開[あ]いているはずがない。",
        "furigana": "かぎはちゃんとかけたから、ドアが開[あ]いているはずがない。",
        "reading": "kagihachantokaketakara、ドアgaaiteiruhazuganai。",
        "translation": "Mình đã khóa cửa đàng hoàng rồi nên không thể nào cửa mở được."
      }
    ]
  },
  {
    "id": "ja-g-n4-58-n-desu-no-desu",
    "language": "ja",
    "level": "N4",
    "pattern": "〜んです / 〜のです (n desu / no desu)",
    "meaning": "là thế đó...; (giải thích hoặc yêu cầu giải thích)",
    "formula": "Động từ thể thông thường (V thường) / Tính từ đuôi い (A-i) + んです / Tính từ đuôi な (A-na) + な + んです / Danh từ (N) + な + んです",
    "note": "Thêm ý nghĩa giải thích một tình huống hoặc hỏi thông tin cơ bản. Các hình thức thông thường là 〜んだ và 〜の. Việc sử dụng quá mức nó có thể nghe có vẻ tự đề cao.",
    "examples": [
      {
        "text": "どうしたんですか。顔色[かおいろ]が悪[わる]いですよ。",
        "furigana": "どうしたんですか。顔色[かおいろ]が悪[わる]いですよ。",
        "reading": "doushitandesuka。kaoirogawaruidesuyo。",
        "translation": "Có chuyện gì thế? Bạn trông nhợt nhạt."
      },
      {
        "text": "すみません、遅[おく]れました。電車[でんしゃ]が止[と]まっていたんです。",
        "furigana": "すみません、遅[おく]れました。電車[でんしゃ]が止[と]まっていたんです。",
        "reading": "sumimasen、okuremashita。denshagatomatteitandesu。",
        "translation": "Xin lỗi, tôi đến muộn. Tàu đã dừng lại."
      },
      {
        "text": "日本語[にほんご]で手紙[てがみ]を書[か]きたいんですが、手伝[てつだ]ってくれませんか。",
        "furigana": "日本語[にほんご]で手紙[てがみ]を書[か]きたいんですが、手伝[てつだ]ってくれませんか。",
        "reading": "nihongodetegamiokakitaindesuga、tetsudattekuremasenka。",
        "translation": "Tôi muốn viết một lá thư bằng tiếng Nhật, bạn có thể giúp tôi được không?"
      }
    ]
  },
  {
    "id": "ja-g-n4-59-ka-dou-ka",
    "language": "ja",
    "level": "N4",
    "pattern": "〜かどうか (ka dou ka)",
    "meaning": "có hay không",
    "formula": "Động từ thể thông thường (V thường) / Tính từ đuôi い (A-i) / Tính từ đuôi な (A-na) / Danh từ (N) + かどうか",
    "note": "Nhúng câu hỏi có-không vào câu. Đối với các câu hỏi có từ để hỏi, chỉ sử dụng 〜か (何時に来るか).",
    "examples": [
      {
        "text": "明日[あした]行[い]けるかどうか、まだ分[わ]かりません。",
        "furigana": "明日[あした]行[い]けるかどうか、まだ分[わ]かりません。",
        "reading": "ashitaikerukadouka、madawakarimasen。",
        "translation": "Còn không biết ngày mai có đi được không nữa."
      },
      {
        "text": "この服[ふく]が似合[にあ]うかどうか、ちょっと着[き]てみます。",
        "furigana": "この服[ふく]が似合[にあ]うかどうか、ちょっと着[き]てみます。",
        "reading": "konofukuganiaukadouka、chottokitemimasu。",
        "translation": "Mình sẽ thử xem có hợp với mình không."
      },
      {
        "text": "そのレストランがおいしいかどうか、友達[ともだち]に聞[き]いてみよう。",
        "furigana": "そのレストランがおいしいかどうか、友達[ともだち]に聞[き]いてみよう。",
        "reading": "sonoレストランgaoishiikadouka、tomodachinikiitemiyou。",
        "translation": "Hỏi bạn bè xem nhà hàng có ngon không."
      }
    ]
  },
  {
    "id": "ja-g-n4-60-ka-embedded-question",
    "language": "ja",
    "level": "N4",
    "pattern": "〜か（embedded question） (ka (embedded question))",
    "meaning": "(cái gì, ở đâu, ai, v.v.)",
    "formula": "Từ để hỏi + ... + Động từ thể thông thường (V thường) / Tính từ đuôi い (A-i) / Tính từ đuôi な (A-na) / Danh từ (N) + か",
    "note": "Sau danh từ hoặc tính từ na, だ bị lược bỏ (誰の傘か知らない).",
    "examples": [
      {
        "text": "会議[かいぎ]が何[なん]時[じ]に始[はじ]まるか、教[おし]えてください。",
        "furigana": "会議[かいぎ]が何[なん]時[じ]に始[はじ]まるか、教[おし]えてください。",
        "reading": "kaigigananjinihajimaruka、oshietekudasai。",
        "translation": "Vui lòng cho tôi biết cuộc họp bắt đầu lúc mấy giờ."
      },
      {
        "text": "どこで財布[さいふ]をなくしたか、覚[おぼ]えていません。",
        "furigana": "どこで財布[さいふ]をなくしたか、覚[おぼ]えていません。",
        "reading": "dokodesaifuonakushitaka、oboeteimasen。",
        "translation": "Tôi không nhớ mình đã đánh mất ví ở đâu."
      },
      {
        "text": "誰[だれ]が窓[まど]を割[わ]ったか、知[し]っていますか。",
        "furigana": "誰[だれ]が窓[まど]を割[わ]ったか、知[し]っていますか。",
        "reading": "daregamadoowattaka、shitteimasuka。",
        "translation": "Bạn có biết ai đã phá vỡ cửa sổ không?"
      }
    ]
  },
  {
    "id": "ja-g-n4-61-to-omou",
    "language": "ja",
    "level": "N4",
    "pattern": "〜と思う (to omou)",
    "meaning": "Tôi nghĩ rằng",
    "formula": "Động từ thể thông thường (V thường) / Tính từ đuôi い (A-i) + と思う / Tính từ đuôi な (A-na) + だ + と思う / Danh từ (N) + だ + と思う",
    "note": "Người Nhật thường phủ định mệnh đề trích dẫn (来ないと思う) hơn là 思う. Đối với ý kiến ​​của người khác, hãy sử dụng 〜と思っている.",
    "examples": [
      {
        "text": "この映画[えいが]はきっと人気[にんき]が出[で]ると思[おも]う。",
        "furigana": "この映画[えいが]はきっと人気[にんき]が出[で]ると思[おも]う。",
        "reading": "konoeigahakittoninkigaderutoomou。",
        "translation": "Tôi nghĩ bộ phim này chắc chắn sẽ nổi tiếng."
      },
      {
        "text": "彼女[かのじょ]は今日[きょう]は来[こ]ないと思[おも]います。",
        "furigana": "彼女[かのじょ]は今日[きょう]は来[こ]ないと思[おも]います。",
        "reading": "kanojohakyouhakonaitoomoimasu。",
        "translation": "Tôi không nghĩ hôm nay cô ấy sẽ đến."
      },
      {
        "text": "日本[にほん]の電車[でんしゃ]はとても便利[べんり]だと思[おも]います。",
        "furigana": "日本[にほん]の電車[でんしゃ]はとても便利[べんり]だと思[おも]います。",
        "reading": "nihonnodenshahatotemobenridatoomoimasu。",
        "translation": "Mình thấy tàu Nhật rất tiện lợi."
      }
    ]
  },
  {
    "id": "ja-g-n4-62-to-iu-say",
    "language": "ja",
    "level": "N4",
    "pattern": "〜と言う (to iu (say))",
    "meaning": "hãy nói điều đó; kể (trích dẫn)",
    "formula": "「Câu」 + と言う / Câu (plain) + と言う",
    "note": "Trích dẫn trực tiếp đi vào bên trong 「」; trích dẫn gián tiếp sử dụng các hình thức đơn giản. 〜と言っていた được dùng phổ biến khi truyền lại điều ai đó đã nói.",
    "examples": [
      {
        "text": "先生[せんせい]は「明日[あした]はテストがあります」と言[い]いました。",
        "furigana": "先生[せんせい]は「明日[あした]はテストがあります」と言[い]いました。",
        "reading": "senseiha「ashitahaテストgaarimasu」toiimashita。",
        "translation": "Cô giáo nói: ``Ngày mai chúng ta có bài kiểm tra.''"
      },
      {
        "text": "兄[あに]は今晩[こんばん]、帰[かえ]りが遅[おそ]くなると言[い]っていた。",
        "furigana": "兄[あに]は今晩[こんばん]、帰[かえ]りが遅[おそ]くなると言[い]っていた。",
        "reading": "anihakonban、kaerigaosokunarutoitteita。",
        "translation": "Anh tôi bảo tối nay anh ấy sẽ về muộn."
      },
      {
        "text": "日本[にほん]では食[た]べる前[まえ]に「いただきます」と言[い]います。",
        "furigana": "日本[にほん]では食[た]べる前[まえ]に「いただきます」と言[い]います。",
        "reading": "nihondehataberumaeni「itadakimasu」toiimasu。",
        "translation": "Ở Nhật Bản, chúng tôi nói \"itadakimasu\" trước khi ăn."
      }
    ]
  },
  {
    "id": "ja-g-n4-63-shika-nai",
    "language": "ja",
    "level": "N4",
    "pattern": "〜しか〜ない (shika ... nai)",
    "meaning": "; không có gì ngoài",
    "formula": "Danh từ (N) + しか + Động từ thể ない (V-nai)",
    "note": "Luôn đi đôi với động từ phủ định. So với だけ, nó nhấn mạnh số lượng ít hoặc không đủ.",
    "examples": [
      {
        "text": "財布[さいふ]に五[ご]百[ひゃく]円[えん]しかない。",
        "furigana": "財布[さいふ]に五[ご]百[ひゃく]円[えん]しかない。",
        "reading": "saifunigohyakuenshikanai。",
        "translation": "Trong ví tôi chỉ có 500 yên thôi."
      },
      {
        "text": "このことは、あなたにしか話[はな]していません。",
        "furigana": "このことは、あなたにしか話[はな]していません。",
        "reading": "konokotoha、anatanishikahanashiteimasen。",
        "translation": "Tôi chỉ nói với bạn điều này thôi."
      },
      {
        "text": "朝[あさ]はコーヒーしか飲[の]みません。",
        "furigana": "朝[あさ]はコーヒーしか飲[の]みません。",
        "reading": "asahaコーヒーshikanomimasen。",
        "translation": "Tôi chỉ uống cà phê vào buổi sáng."
      }
    ]
  },
  {
    "id": "ja-g-n4-64-bakari",
    "language": "ja",
    "level": "N4",
    "pattern": "〜ばかり (bakari)",
    "meaning": "không có gì ngoài; chỉ một; tất cả",
    "formula": "Danh từ (N) + ばかり",
    "note": "Thường ngụ ý có quá nhiều thứ. 〜てばかりいる (N3) và 〜たばかり ('vừa làm') là những điểm riêng biệt.",
    "examples": [
      {
        "text": "弟[おとうと]は肉[にく]ばかり食[た]べて、野菜[やさい]を食[た]べない。",
        "furigana": "弟[おとうと]は肉[にく]ばかり食[た]べて、野菜[やさい]を食[た]べない。",
        "reading": "otoutohanikubakaritabete、yasaiotabenai。",
        "translation": "Em trai tôi chỉ ăn thịt và không ăn rau."
      },
      {
        "text": "このクラスは女[おんな]の子[こ]ばかりだ。",
        "furigana": "このクラスは女[おんな]の子[こ]ばかりだ。",
        "reading": "konoクラスhaonnanokobakarida。",
        "translation": "Lớp này chỉ có con gái thôi."
      },
      {
        "text": "最近[さいきん]は雨[あめ]の日[ひ]ばかりで、洗濯[せんたく]ができない。",
        "furigana": "最近[さいきん]は雨[あめ]の日[ひ]ばかりで、洗濯[せんたく]ができない。",
        "reading": "saikinhaamenohibakaride、sentakugadekinai。",
        "translation": "Gần đây trời mưa nhiều nên tôi không thể giặt đồ được."
      }
    ]
  },
  {
    "id": "ja-g-n4-65-ta-bakari",
    "language": "ja",
    "level": "N4",
    "pattern": "〜たばかり (ta bakari)",
    "meaning": "vừa mới làm xong",
    "formula": "Động từ thể た (V-ta) + ばかり",
    "note": "Cho thấy người nói cảm thấy thời gian đã trôi qua rất ít, ngay cả khi đó là vài tuần trước. 〜たところ chỉ đề cập đến khoảnh khắc trước đây.",
    "examples": [
      {
        "text": "日本[にほん]に来[き]たばかりなので、まだ日本語[にほんご]がよく分[わ]かりません。",
        "furigana": "日本[にほん]に来[き]たばかりなので、まだ日本語[にほんご]がよく分[わ]かりません。",
        "reading": "nihonnikitabakarinanode、madanihongogayokuwakarimasen。",
        "translation": "Mình mới sang Nhật nên chưa hiểu tiếng Nhật lắm."
      },
      {
        "text": "さっき昼[ひる]ご飯[はん]を食[た]べたばかりだから、おなかがいっぱいだ。",
        "furigana": "さっき昼[ひる]ご飯[はん]を食[た]べたばかりだから、おなかがいっぱいだ。",
        "reading": "sakkihirugohanotabetabakaridakara、onakagaippaida。",
        "translation": "Mình mới ăn trưa nên no rồi."
      },
      {
        "text": "買[か]ったばかりの傘[かさ]をなくしてしまった。",
        "furigana": "買[か]ったばかりの傘[かさ]をなくしてしまった。",
        "reading": "kattabakarinokasaonakushiteshimatta。",
        "translation": "Tôi bị mất chiếc ô vừa mới mua."
      }
    ]
  },
  {
    "id": "ja-g-n4-66-tokoro-da",
    "language": "ja",
    "level": "N4",
    "pattern": "〜ところだ (tokoro da)",
    "meaning": "be about to; ở giữa; vừa thực hiện",
    "formula": "Động từ thể từ điển (V-dict) / Động từ thể て (V-te) + いる / Động từ thể た (V-ta) + ところだ",
    "note": "Dạng từ điển: sắp. 〜ているところ: ở giữa. 〜たところ: vừa xong. Nó xác định chính xác giai đoạn của một hành động.",
    "examples": [
      {
        "text": "今[いま]から出[で]かけるところです。",
        "furigana": "今[いま]から出[で]かけるところです。",
        "reading": "imakaradekakerutokorodesu。",
        "translation": "Tôi đang chuẩn bị rời đi."
      },
      {
        "text": "今[いま]、晩[ばん]ご飯[はん]を作[つく]っているところだから、後[あと]で電話[でんわ]するね。",
        "furigana": "今[いま]、晩[ばん]ご飯[はん]を作[つく]っているところだから、後[あと]で電話[でんわ]するね。",
        "reading": "ima、bangohanotsukutteirutokorodakara、atodedenwasurune。",
        "translation": "Bây giờ tôi đang nấu bữa tối nên sẽ gọi cho bạn sau."
      },
      {
        "text": "ちょうど今[いま]、駅[えき]に着[つ]いたところです。",
        "furigana": "ちょうど今[いま]、駅[えき]に着[つ]いたところです。",
        "reading": "choudoima、ekinitsuitatokorodesu。",
        "translation": "Tôi vừa tới ga."
      }
    ]
  },
  {
    "id": "ja-g-n4-67-yasui-nikui",
    "language": "ja",
    "level": "N4",
    "pattern": "〜やすい / 〜にくい (yasui / nikui)",
    "meaning": "dễ dàng; khó",
    "formula": "Động từ thể ます bỏ ます (V-masu) + やすい / Động từ thể ます bỏ ます (V-masu) + にくい",
    "note": "Cả hai liên hợp như tính từ i. やすい cũng có thể có nghĩa là 'có xu hướng' (この服は汚れやすい).",
    "examples": [
      {
        "text": "このペンは書[か]きやすいです。",
        "furigana": "このペンは書[か]きやすいです。",
        "reading": "konoペンhakakiyasuidesu。",
        "translation": "Cây bút này rất dễ viết."
      },
      {
        "text": "先生[せんせい]の説明[せつめい]は分[わ]かりやすい。",
        "furigana": "先生[せんせい]の説明[せつめい]は分[わ]かりやすい。",
        "reading": "senseinosetsumeihawakariyasui。",
        "translation": "Thầy giảng rất dễ hiểu."
      },
      {
        "text": "この魚[さかな]は骨[ほね]が多[おお]くて食[た]べにくい。",
        "furigana": "この魚[さかな]は骨[ほね]が多[おお]くて食[た]べにくい。",
        "reading": "konosakanahahonegaookutetabenikui。",
        "translation": "Cá này nhiều xương và khó ăn."
      }
    ]
  },
  {
    "id": "ja-g-n4-68-hajimeru-owaru-tsuzukeru",
    "language": "ja",
    "level": "N4",
    "pattern": "〜始める / 〜終わる / 〜続ける (hajimeru / owaru / tsuzukeru)",
    "meaning": "bắt đầu thực hiện; làm xong; tiếp tục làm",
    "formula": "Động từ thể ます bỏ ます (V-masu) + 始める / Động từ thể ます bỏ ます (V-masu) + 終わる / Động từ thể ます bỏ ます (V-masu) + 続ける",
    "note": "〜終わる được dùng với những hành động có kết thúc rõ ràng (読む, 食べる, 書く). 〜終える là một cách thay thế trang trọng hơn.",
    "examples": [
      {
        "text": "去年[きょねん]からギターを習[なら]い始[はじ]めました。",
        "furigana": "去年[きょねん]からギターを習[なら]い始[はじ]めました。",
        "reading": "kyonenkaraギターonaraihajimemashita。",
        "translation": "Mình bắt đầu học guitar từ năm ngoái."
      },
      {
        "text": "その本[ほん]、読[よ]み終[お]わったら貸[か]してくれない？",
        "furigana": "その本[ほん]、読[よ]み終[お]わったら貸[か]してくれない？",
        "reading": "sonohon、yomiowattarakashitekurenai？",
        "translation": "Bạn sẽ cho tôi mượn cuốn sách đó khi bạn đọc xong chứ?"
      },
      {
        "text": "三[さん]時間[じかん]も歩[ある]き続[つづ]けて、足[あし]が痛[いた]くなった。",
        "furigana": "三[さん]時間[じかん]も歩[ある]き続[つづ]けて、足[あし]が痛[いた]くなった。",
        "reading": "sanjikanmoarukitsuzukete、ashigaitakunatta。",
        "translation": "Đi bộ được ba tiếng đồng hồ, chân tôi đau nhức."
      }
    ]
  },
  {
    "id": "ja-g-n4-69-dasu",
    "language": "ja",
    "level": "N4",
    "pattern": "〜出す (dasu)",
    "meaning": "đột nhiên bắt đầu làm; bật ra",
    "formula": "Động từ thể ます bỏ ます (V-masu) + 出す",
    "note": "Ngụ ý sự khởi đầu đột ngột, thường không kiểm soát được. Không giống như 〜始める, nó không được sử dụng cho các hành động đã được lên kế hoạch hoặc trong các yêu cầu.",
    "examples": [
      {
        "text": "赤[あか]ちゃんが急[きゅう]に泣[な]き出[だ]した。",
        "furigana": "赤[あか]ちゃんが急[きゅう]に泣[な]き出[だ]した。",
        "reading": "akachangakyuuninakidashita。",
        "translation": "Bé đột nhiên khóc."
      },
      {
        "text": "さっきまで晴[は]れていたのに、急[きゅう]に雨[あめ]が降[ふ]り出[だ]した。",
        "furigana": "さっきまで晴[は]れていたのに、急[きゅう]に雨[あめ]が降[ふ]り出[だ]した。",
        "reading": "sakkimadehareteitanoni、kyuuniamegafuridashita。",
        "translation": "Vừa nãy trời đang nắng mà đột nhiên trời bắt đầu mưa."
      }
    ]
  },
  {
    "id": "ja-g-n4-70-hodo-nai",
    "language": "ja",
    "level": "N4",
    "pattern": "〜ほど〜ない (hodo ... nai)",
    "meaning": "không phải như ... như",
    "formula": "Danh từ (N) / Động từ thể thông thường (V thường) + ほど + Tính từ đuôi い (A-i)-ku + ない / Tính từ đuôi な (A-na) + ではない",
    "note": "Mệnh đề trước ほど là tiêu chuẩn so sánh. Luôn luôn theo sau là một tiêu cực.",
    "examples": [
      {
        "text": "今年[ことし]の夏[なつ]は去年[きょねん]ほど暑[あつ]くない。",
        "furigana": "今年[ことし]の夏[なつ]は去年[きょねん]ほど暑[あつ]くない。",
        "reading": "kotoshinonatsuhakyonenhodoatsukunai。",
        "translation": "Mùa hè năm nay không nóng như năm ngoái."
      },
      {
        "text": "私[わたし]の町[まち]は東京[とうきょう]ほどにぎやかではありません。",
        "furigana": "私[わたし]の町[まち]は東京[とうきょう]ほどにぎやかではありません。",
        "reading": "watashinomachihatoukyouhodonigiyakadehaarimasen。",
        "translation": "Thị trấn của tôi không sôi động như Tokyo."
      },
      {
        "text": "テストは思[おも]ったほど難[むずか]しくなかった。",
        "furigana": "テストは思[おも]ったほど難[むずか]しくなかった。",
        "reading": "テストhaomottahodomuzukashikunakatta。",
        "translation": "Bài kiểm tra không khó như tôi nghĩ."
      }
    ]
  },
  {
    "id": "ja-g-n4-71-nakanaka-nai",
    "language": "ja",
    "level": "N4",
    "pattern": "なかなか〜ない (nakanaka ... nai)",
    "meaning": "không hề dễ dàng; sẽ không; không dễ dàng",
    "formula": "なかなか + Động từ thể ない (V-nai)",
    "note": "Cho thấy điều gì đó không xảy ra nhanh chóng và dễ dàng như mong đợi. Với dạng khẳng định, なかなか có nghĩa là 'khá' (なかなかおいしい).",
    "examples": [
      {
        "text": "バスがなかなか来[こ]ない。",
        "furigana": "バスがなかなか来[こ]ない。",
        "reading": "バスganakanakakonai。",
        "translation": "Xe buýt không đến dễ dàng đâu."
      },
      {
        "text": "漢字[かんじ]がなかなか覚[おぼ]えられません。",
        "furigana": "漢字[かんじ]がなかなか覚[おぼ]えられません。",
        "reading": "kanjiganakanakaoboeraremasen。",
        "translation": "Mình khó nhớ chữ kanji lắm."
      },
      {
        "text": "子[こ]どもがなかなか寝[ね]てくれない。",
        "furigana": "子[こ]どもがなかなか寝[ね]てくれない。",
        "reading": "kodomoganakanakanetekurenai。",
        "translation": "Con tôi khó ngủ."
      }
    ]
  },
  {
    "id": "ja-g-n4-72-zutsu",
    "language": "ja",
    "level": "N4",
    "pattern": "〜ずつ (zutsu)",
    "meaning": "; tại một thời điểm; từng chút một",
    "formula": "Danh từ (N) (quantity) + ずつ",
    "note": null,
    "examples": [
      {
        "text": "りんごを一人[ひとり]に二[ふた]つずつ配[くば]った。",
        "furigana": "りんごを一人[ひとり]に二[ふた]つずつ配[くば]った。",
        "reading": "ringoohitorinifutatsuzutsukubatta。",
        "translation": "Tôi đưa cho mỗi người hai quả táo."
      },
      {
        "text": "毎日[まいにち]少[すこ]しずつ漢字[かんじ]を覚[おぼ]えています。",
        "furigana": "毎日[まいにち]少[すこ]しずつ漢字[かんじ]を覚[おぼ]えています。",
        "reading": "mainichisukoshizutsukanjiooboeteimasu。",
        "translation": "Tôi ghi nhớ chữ Hán từng chút một mỗi ngày."
      },
      {
        "text": "一人[ひとり]ずつ部屋[へや]に入[はい]ってください。",
        "furigana": "一人[ひとり]ずつ部屋[へや]に入[はい]ってください。",
        "reading": "hitorizutsuheyanihaittekudasai。",
        "translation": "Mời từng người vào phòng."
      }
    ]
  },
  {
    "id": "ja-g-n4-73-mo-emphasis",
    "language": "ja",
    "level": "N4",
    "pattern": "〜も（emphasis） (mo (emphasis))",
    "meaning": "nhiều nhất có thể; nhiều như ; (với số âm) thậm chí không một",
    "formula": "Danh từ (N) (number + counter) + も",
    "note": "Cho thấy người nói cảm thấy số lượng lớn. Với 一 + counter và động từ phủ định, nó có nghĩa là 'thậm chí không một'.",
    "examples": [
      {
        "text": "昨日[きのう]は十[じゅう]時間[じかん]も寝[ね]てしまった。",
        "furigana": "昨日[きのう]は十[じゅう]時間[じかん]も寝[ね]てしまった。",
        "reading": "kinouhajuujikanmoneteshimatta。",
        "translation": "Hôm qua tôi đã ngủ được mười tiếng."
      },
      {
        "text": "このかばんは五[ご]万[まん]円[えん]もするんですか。",
        "furigana": "このかばんは五[ご]万[まん]円[えん]もするんですか。",
        "reading": "konokabanhagomanenmosurundesuka。",
        "translation": "Cái túi này có giá 50.000 yên phải không?"
      },
      {
        "text": "財布[さいふ]の中[なか]に一[いち]円[えん]もない。",
        "furigana": "財布[さいふ]の中[なか]に一[いち]円[えん]もない。",
        "reading": "saifunonakaniichienmonai。",
        "translation": "Tôi không còn một xu nào trong ví."
      }
    ]
  },
  {
    "id": "ja-g-n4-74-made-ni",
    "language": "ja",
    "level": "N4",
    "pattern": "〜までに (made ni)",
    "meaning": "trước (thời hạn); trước",
    "formula": "Danh từ (N) / Động từ thể từ điển (V-dict) + までに",
    "note": "までに đánh dấu thời hạn cho một hành động diễn ra một lần; まで đánh dấu thời gian một việc nào đó tiếp tục (六時まで働く).",
    "examples": [
      {
        "text": "レポートは金曜日[きんようび]までに出[だ]してください。",
        "furigana": "レポートは金曜日[きんようび]までに出[だ]してください。",
        "reading": "レポートhakinyoubimadenidashitekudasai。",
        "translation": "Vui lòng gửi báo cáo của bạn trước thứ Sáu."
      },
      {
        "text": "六[ろく]時[じ]までに家[いえ]に帰[かえ]らなければならない。",
        "furigana": "六[ろく]時[じ]までに家[いえ]に帰[かえ]らなければならない。",
        "reading": "rokujimadeniienikaeranakerebanaranai。",
        "translation": "Tôi phải về nhà trước 6 giờ."
      },
      {
        "text": "暗[くら]くなるまでに山[やま]を下[お]りよう。",
        "furigana": "暗[くら]くなるまでに山[やま]を下[お]りよう。",
        "reading": "kurakunarumadeniyamaooriyou。",
        "translation": "Hãy xuống núi trước khi trời tối nhé."
      }
    ]
  },
  {
    "id": "ja-g-n4-75-koto-ga-aru",
    "language": "ja",
    "level": "N4",
    "pattern": "〜ことがある (koto ga aru)",
    "meaning": "đôi khi; có những lúc",
    "formula": "Động từ thể từ điển (V-dict) / Động từ thể ない (V-nai) + ことがある",
    "note": "Sử dụng từ điển hoặc dạng ない. Với dạng quá khứ (〜たことがある) nó có nghĩa là 'đã từng làm trước đây'.",
    "examples": [
      {
        "text": "忙[いそが]しいときは、朝[あさ]ご飯[はん]を食[た]べないことがあります。",
        "furigana": "忙[いそが]しいときは、朝[あさ]ご飯[はん]を食[た]べないことがあります。",
        "reading": "isogashiitokiha、asagohanotabenaikotogaarimasu。",
        "translation": "Lúc bận có khi tôi không ăn sáng."
      },
      {
        "text": "この道[みち]は冬[ふゆ]になると、雪[ゆき]で通[とお]れなくなることがある。",
        "furigana": "この道[みち]は冬[ふゆ]になると、雪[ゆき]で通[とお]れなくなることがある。",
        "reading": "konomichihafuyuninaruto、yukidetoorenakunarukotogaaru。",
        "translation": "Con đường này có thể không thể đi lại vào mùa đông do có tuyết."
      },
      {
        "text": "週末[しゅうまつ]は家族[かぞく]で料理[りょうり]をすることがある。",
        "furigana": "週末[しゅうまつ]は家族[かぞく]で料理[りょうり]をすることがある。",
        "reading": "shuumatsuhakazokuderyouriosurukotogaaru。",
        "translation": "Thỉnh thoảng tôi nấu ăn cùng gia đình vào cuối tuần."
      }
    ]
  },
  {
    "id": "ja-g-n4-76-nai-to-ikenai-nakucha",
    "language": "ja",
    "level": "N4",
    "pattern": "〜ないといけない / 〜なくちゃ (nai to ikenai / nakucha)",
    "meaning": "must to; phải (đàm thoại)",
    "formula": "Động từ thể ない (V-nai) + といけない / Động từ thể ない (V-nai) stem + なくちゃ",
    "note": "Các lựa chọn thay thế hàng ngày cho なければならない. なくちゃ xuất phát từ なくては; なきゃ (từ なければ) cũng rất phổ biến.",
    "examples": [
      {
        "text": "明日[あした]は早[はや]いから、もう寝[ね]ないといけない。",
        "furigana": "明日[あした]は早[はや]いから、もう寝[ね]ないといけない。",
        "reading": "ashitahahayaikara、mounenaitoikenai。",
        "translation": "Ngày mai trời còn sớm nên tôi phải đi ngủ rồi."
      },
      {
        "text": "あ、もうこんな時間[じかん]！帰[かえ]らなくちゃ。",
        "furigana": "あ、もうこんな時間[じかん]！帰[かえ]らなくちゃ。",
        "reading": "a、moukonnajikan！kaeranakucha。",
        "translation": "À, đã lâu thế rồi! Tôi phải về nhà."
      },
      {
        "text": "この薬[くすり]は毎日[まいにち]飲[の]まないといけません。",
        "furigana": "この薬[くすり]は毎日[まいにち]飲[の]まないといけません。",
        "reading": "konokusurihamainichinomanaitoikemasen。",
        "translation": "Bạn phải uống thuốc này hàng ngày."
      }
    ]
  },
  {
    "id": "ja-g-n4-77-sasete-kudasai",
    "language": "ja",
    "level": "N4",
    "pattern": "〜させてください (sasete kudasai)",
    "meaning": "ngoài ra hãy để tôi (làm)",
    "formula": "Động từ thể ない (V-nai) stem + せてください (Group 1) / Động từ thể ない (V-nai) stem + させてください (Group 2)",
    "note": "Được xây dựng trên dạng nguyên nhân て (する → させて). 〜させていただけませんか thì lịch sự hơn.",
    "examples": [
      {
        "text": "少[すこ]し考[かんが]えさせてください。",
        "furigana": "少[すこ]し考[かんが]えさせてください。",
        "reading": "sukoshikangaesasetekudasai。",
        "translation": "Để tôi suy nghĩ một lát nhé."
      },
      {
        "text": "今日[きょう]は私[わたし]に払[はら]わせてください。",
        "furigana": "今日[きょう]は私[わたし]に払[はら]わせてください。",
        "reading": "kyouhawatashiniharawasetekudasai。",
        "translation": "Hãy để tôi thanh toán ngay hôm nay."
      },
      {
        "text": "体[からだ]の調子[ちょうし]が悪[わる]いので、今日[きょう]は早[はや]く帰[かえ]らせてください。",
        "furigana": "体[からだ]の調子[ちょうし]が悪[わる]いので、今日[きょう]は早[はや]く帰[かえ]らせてください。",
        "reading": "karadanochoushigawaruinode、kyouhahayakukaerasetekudasai。",
        "translation": "Tôi thấy không khỏe nên hôm nay cho tôi về sớm nhé."
      }
    ]
  },
  {
    "id": "ja-g-n4-78-sonkeigo",
    "language": "ja",
    "level": "N4",
    "pattern": "尊敬語 (sonkeigo)",
    "meaning": "động từ kính ngữ; ngôn ngữ tôn trọng hành động của người khác",
    "formula": "いらっしゃる（行く・来る・いる） / 召し上がる（食べる・飲む） / おっしゃる（言う） / なさる（する） / ご覧になる（見る） / くださる（くれる）",
    "note": "Nâng cao hành động của những người bạn tôn trọng, chẳng hạn như khách hàng, giáo viên và cấp trên. Đừng bao giờ sử dụng nó cho hành động của riêng bạn.",
    "examples": [
      {
        "text": "社長[しゃちょう]は何[なん]時[じ]ごろいらっしゃいますか。",
        "furigana": "社長[しゃちょう]は何[なん]時[じ]ごろいらっしゃいますか。",
        "reading": "shachouhananjigoroirasshaimasuka。",
        "translation": "Mấy giờ tổng thống sẽ đến?"
      },
      {
        "text": "先生[せんせい]、どうぞ召[め]し上[あ]がってください。",
        "furigana": "先生[せんせい]、どうぞ召[め]し上[あ]がってください。",
        "reading": "sensei、douzomeshiagattekudasai。",
        "translation": "Mời thầy thưởng thức."
      },
      {
        "text": "部長[ぶちょう]は会議[かいぎ]でそうおっしゃいました。",
        "furigana": "部長[ぶちょう]は会議[かいぎ]でそうおっしゃいました。",
        "reading": "buchouhakaigidesouosshaimashita。",
        "translation": "Tại cuộc họp, người quản lý đã nói như vậy."
      }
    ]
  },
  {
    "id": "ja-g-n4-79-kenjougo",
    "language": "ja",
    "level": "N4",
    "pattern": "謙譲語 (kenjougo)",
    "meaning": "động từ khiêm tốn là không đúng; ngôn ngữ khiêm tốn cho hành động của chính mình",
    "formula": "参る（行く・来る） / おる（いる） / いただく（食べる・飲む・もらう） / 申す（言う） / いたす（する） / 拝見する（見る） / 伺う（聞く・訪ねる）",
    "note": "Giảm bớt hành động của chính bạn hoặc của nhóm bạn đối với người mà bạn tôn trọng. 参る, おる, 申す và いたす cũng làm cho lời nói nói chung có vẻ trang trọng.",
    "examples": [
      {
        "text": "明日[あした]の午後[ごご]、そちらに伺[うかが]います。",
        "furigana": "明日[あした]の午後[ごご]、そちらに伺[うかが]います。",
        "reading": "ashitanogogo、sochiraniukagaimasu。",
        "translation": "Chiều mai anh sẽ đến thăm em."
      },
      {
        "text": "初[はじ]めまして。リンと申[もう]します。",
        "furigana": "初[はじ]めまして。リンと申[もう]します。",
        "reading": "hajimemashite。リンtomoushimasu。",
        "translation": "Rất vui được gặp bạn. Tên tôi là Rin."
      },
      {
        "text": "お手紙[てがみ]、拝見[はいけん]しました。",
        "furigana": "お手紙[てがみ]、拝見[はいけん]しました。",
        "reading": "otegami、haikenshimashita。",
        "translation": "Tôi đã thấy thư của bạn."
      }
    ]
  },
  {
    "id": "ja-g-n4-80-o-ni-naru",
    "language": "ja",
    "level": "N4",
    "pattern": "お〜になる (o ... ni naru)",
    "meaning": "(kính ngữ) có người được kính trọng thì",
    "formula": "お + Động từ thể ます bỏ ます (V-masu) + になる",
    "note": "Không dùng với gốc một âm tiết (見る, 寝る) hoặc động từ có dạng đặc biệt (行く → いらっしゃる). する-danh từ lấy ご + Danh từ + になる (ご利用になる).",
    "examples": [
      {
        "text": "先生[せんせい]はもうお帰[かえ]りになりました。",
        "furigana": "先生[せんせい]はもうお帰[かえ]りになりました。",
        "reading": "senseihamouokaerininarimashita。",
        "translation": "Cô giáo đã về nhà rồi."
      },
      {
        "text": "この本[ほん]をお読[よ]みになりましたか。",
        "furigana": "この本[ほん]をお読[よ]みになりましたか。",
        "reading": "konohonooyomininarimashitaka。",
        "translation": "Bạn đã đọc cuốn sách này chưa?"
      },
      {
        "text": "社長[しゃちょう]はいつもこのホテルにお泊[と]まりになります。",
        "furigana": "社長[しゃちょう]はいつもこのホテルにお泊[と]まりになります。",
        "reading": "shachouhaitsumokonoホテルniotomarininarimasu。",
        "translation": "Tổng thống luôn ở khách sạn này."
      }
    ]
  },
  {
    "id": "ja-g-n4-81-o-suru",
    "language": "ja",
    "level": "N4",
    "pattern": "お〜する (o ... suru)",
    "meaning": "(khiêm tốn) tôi làm (đối với người được kính trọng)",
    "formula": "お + Động từ thể ます bỏ ます (V-masu) + する / ご + Danh từ (N) + する",
    "note": "Chỉ dành cho những hành động có ảnh hưởng hoặc có lợi cho người khác. お〜いたします thậm chí còn trang trọng hơn.",
    "examples": [
      {
        "text": "重[おも]そうですね。お持[も]ちしましょうか。",
        "furigana": "重[おも]そうですね。お持[も]ちしましょうか。",
        "reading": "omosoudesune。omochishimashouka。",
        "translation": "Có vẻ nặng nề. Tôi mang nó đến cho bạn nhé?"
      },
      {
        "text": "後[あと]で詳[くわ]しくご説明[せつめい]します。",
        "furigana": "後[あと]で詳[くわ]しくご説明[せつめい]します。",
        "reading": "atodekuwashikugosetsumeishimasu。",
        "translation": "Mình sẽ giải thích chi tiết sau."
      },
      {
        "text": "駅[えき]までお送[おく]りします。",
        "furigana": "駅[えき]までお送[おく]りします。",
        "reading": "ekimadeookurishimasu。",
        "translation": "Tôi sẽ thả bạn ra ga."
      }
    ]
  },
  {
    "id": "ja-g-n4-82-de-gozaimasu",
    "language": "ja",
    "level": "N4",
    "pattern": "〜でございます (de gozaimasu)",
    "meaning": "là; là; are (copula rất lịch sự)",
    "formula": "Danh từ (N) / Tính từ đuôi な (A-na) + でございます",
    "note": "Phiên bản rất lịch sự của です, điển hình của nhân viên cửa hàng và khách sạn nói chuyện với khách hàng. ございます bản thân nó là hình thức lịch sự của あります.",
    "examples": [
      {
        "text": "お手洗[てあら]いはあちらでございます。",
        "furigana": "お手洗[てあら]いはあちらでございます。",
        "reading": "otearaihaachiradegozaimasu。",
        "translation": "Nhà vệ sinh ở đằng kia."
      },
      {
        "text": "こちらが、お部屋[へや]のかぎでございます。",
        "furigana": "こちらが、お部屋[へや]のかぎでございます。",
        "reading": "kochiraga、oheyanokagidegozaimasu。",
        "translation": "Đây là chìa khóa phòng của bạn."
      },
      {
        "text": "はい、山田[やまだ]商店[しょうてん]でございます。",
        "furigana": "はい、山田[やまだ]商店[しょうてん]でございます。",
        "reading": "hai、yamadashoutendegozaimasu。",
        "translation": "Vâng, đây là Yamada Shoten."
      }
    ]
  },
  {
    "id": "ja-g-n4-83-te-mo-kamawanai",
    "language": "ja",
    "level": "N4",
    "pattern": "〜ても構わない (te mo kamawanai)",
    "meaning": "đừng bận tâm nếu; sẽ ổn thôi nếu",
    "formula": "Động từ thể て (V-te) + も構わない / Tính từ đuôi い (A-i)-ku + ても構わない / Tính từ đuôi な (A-na) + でも構わない / Danh từ (N) + でも構わない",
    "note": "Trang trọng hơn 〜てもいい một chút. 〜なくても構わない có nghĩa là 'không sao đâu'.",
    "examples": [
      {
        "text": "ここに荷物[にもつ]を置[お]いても構[かま]いませんか。",
        "furigana": "ここに荷物[にもつ]を置[お]いても構[かま]いませんか。",
        "reading": "kokoninimotsuooitemokamaimasenka。",
        "translation": "Tôi để hành lý ở đây có được không?"
      },
      {
        "text": "少[すこ]しぐらい高[たか]くても構[かま]わないから、いい辞書[じしょ]を買[か]いたい。",
        "furigana": "少[すこ]しぐらい高[たか]くても構[かま]わないから、いい辞書[じしょ]を買[か]いたい。",
        "reading": "sukoshiguraitakakutemokamawanaikara、iijishookaitai。",
        "translation": "Tôi muốn mua một cuốn từ điển tốt, dù đắt một chút."
      },
      {
        "text": "返事[へんじ]は明日[あした]でも構[かま]いませんよ。",
        "furigana": "返事[へんじ]は明日[あした]でも構[かま]いませんよ。",
        "reading": "henjihaashitademokamaimasenyo。",
        "translation": "Bạn có thể trả lời vào ngày mai."
      }
    ]
  },
  {
    "id": "ja-g-n4-84-no-koto-nominalizer",
    "language": "ja",
    "level": "N4",
    "pattern": "〜の / 〜こと（nominalizer） (no / koto (nominalizer))",
    "meaning": "hành động làm (chuyển cụm động từ thành danh từ)",
    "formula": "Động từ thể thông thường (V thường) + の / Động từ thể thông thường (V thường) + こと",
    "note": "の được ưa chuộng hơn với các động từ nhận thức (見る, 聞こえる) và trong lời nói thông thường; こと cần được dùng trước です/だ và trong các mẫu cố định như 〜ことができる.",
    "examples": [
      {
        "text": "私[わたし]は写真[しゃしん]を撮[と]るのが好[す]きです。",
        "furigana": "私[わたし]は写真[しゃしん]を撮[と]るのが好[す]きです。",
        "reading": "watashihashashinotorunogasukidesu。",
        "translation": "Tôi thích chụp ảnh."
      },
      {
        "text": "趣味[しゅみ]は古[ふる]い映画[えいが]を見[み]ることです。",
        "furigana": "趣味[しゅみ]は古[ふる]い映画[えいが]を見[み]ることです。",
        "reading": "shumihafuruieigaomirukotodesu。",
        "translation": "Sở thích của tôi là xem phim xưa."
      },
      {
        "text": "かぎをかけるのを忘[わす]れました。",
        "furigana": "かぎをかけるのを忘[わす]れました。",
        "reading": "kagiokakerunoowasuremashita。",
        "translation": "Mình quên khóa nó."
      }
    ]
  },
  {
    "id": "ja-g-n4-85-ba-yokatta",
    "language": "ja",
    "level": "N4",
    "pattern": "〜ばよかった (ba yokatta)",
    "meaning": "nên có (thực hiện); Tôi ước gì tôi có",
    "formula": "Verb-ba + よかった / Động từ thể ない (V-nai) stem + なければよかった",
    "note": "Thể hiện sự tiếc nuối về quá khứ. 〜たらよかった là một từ thay thế trong hội thoại phổ biến.",
    "examples": [
      {
        "text": "もっと早[はや]く家[いえ]を出[で]ればよかった。",
        "furigana": "もっと早[はや]く家[いえ]を出[で]ればよかった。",
        "reading": "mottohayakuieoderebayokatta。",
        "translation": "Lẽ ra tôi nên rời nhà sớm hơn."
      },
      {
        "text": "あんなこと、言[い]わなければよかった。",
        "furigana": "あんなこと、言[い]わなければよかった。",
        "reading": "annakoto、iwanakerebayokatta。",
        "translation": "Lẽ ra tôi không nên nói thế."
      },
      {
        "text": "傘[かさ]を持[も]ってくればよかったなあ。",
        "furigana": "傘[かさ]を持[も]ってくればよかったなあ。",
        "reading": "kasaomottekurebayokattanaa。",
        "translation": "Ước gì tôi đã mang theo ô."
      }
    ]
  },
  {
    "id": "ja-g-n4-86-tara-dou",
    "language": "ja",
    "level": "N4",
    "pattern": "〜たらどう (tara dou)",
    "meaning": "tại sao bạn không ...?; bạn nghĩ thế nào về ...?",
    "formula": "Động từ thể た (V-ta) + らどう",
    "note": "Thường được rút gọn thành 〜たら？. Có thể tỏ ra tự đề cao cấp trên; 〜たらいかがですか là phiên bản lịch sự.",
    "examples": [
      {
        "text": "疲[つか]れているなら、少[すこ]し休[やす]んだらどう？",
        "furigana": "疲[つか]れているなら、少[すこ]し休[やす]んだらどう？",
        "reading": "tsukareteirunara、sukoshiyasundaradou？",
        "translation": "Nếu mệt thì sao không nghỉ ngơi?"
      },
      {
        "text": "分[わ]からなければ、先生[せんせい]に聞[き]いてみたらどうですか。",
        "furigana": "分[わ]からなければ、先生[せんせい]に聞[き]いてみたらどうですか。",
        "reading": "wakaranakereba、senseinikiitemitaradoudesuka。",
        "translation": "Không biết sao bạn không hỏi thầy cô?"
      }
    ]
  },
  {
    "id": "ja-g-n4-87-hou-ga-ii",
    "language": "ja",
    "level": "N4",
    "pattern": "〜ほうがいい (hou ga ii)",
    "meaning": "tốt hơn; nên",
    "formula": "Động từ thể た (V-ta) / Động từ thể ない (V-nai) + ほうがいい",
    "note": "Để được tư vấn, dạng quá khứ (行ったほうがいい) là lựa chọn thông thường và nghe mạnh mẽ hơn. Thể phủ định sử dụng dạng ない, không phải quá khứ.",
    "examples": [
      {
        "text": "熱[ねつ]があるなら、病院[びょういん]に行[い]ったほうがいいですよ。",
        "furigana": "熱[ねつ]があるなら、病院[びょういん]に行[い]ったほうがいいですよ。",
        "reading": "netsugaarunara、byouinniittahougaiidesuyo。",
        "translation": "Nếu sốt thì nên đến bệnh viện."
      },
      {
        "text": "夜[よる]遅[おそ]くに一人[ひとり]で歩[ある]かないほうがいい。",
        "furigana": "夜[よる]遅[おそ]くに一人[ひとり]で歩[ある]かないほうがいい。",
        "reading": "yoruosokunihitoridearukanaihougaii。",
        "translation": "Tốt nhất đừng đi bộ một mình vào đêm khuya."
      },
      {
        "text": "大事[だいじ]な書類[しょるい]は、コピーしておいたほうがいいですよ。",
        "furigana": "大事[だいじ]な書類[しょるい]は、コピーしておいたほうがいいですよ。",
        "reading": "daijinashoruiha、コピーshiteoitahougaiidesuyo。",
        "translation": "Nên sao chép các tài liệu quan trọng."
      }
    ]
  },
  {
    "id": "ja-g-n4-88-toka-toka",
    "language": "ja",
    "level": "N4",
    "pattern": "〜とか〜とか (toka ... toka)",
    "meaning": "những thứ như A và B; A, B, v.v. (thông thường)",
    "formula": "Danh từ (N) + とか + Danh từ (N) + とか / Động từ thể từ điển (V-dict) + とか + Động từ thể từ điển (V-dict) + とか",
    "note": "Bình thường hơn 〜や〜など, và nó cũng có thể liệt kê các động từ hoặc cả cụm từ.",
    "examples": [
      {
        "text": "冷蔵庫[れいぞうこ]に卵[たまご]とか牛乳[ぎゅうにゅう]とかが入[はい]っています。",
        "furigana": "冷蔵庫[れいぞうこ]に卵[たまご]とか牛乳[ぎゅうにゅう]とかが入[はい]っています。",
        "reading": "reizoukonitamagotokagyuunyuutokagahaitteimasu。",
        "translation": "Trong tủ lạnh có trứng và sữa."
      },
      {
        "text": "休[やす]みの日[ひ]は、映画[えいが]とか買[か]い物[もの]とかに行[い]きます。",
        "furigana": "休[やす]みの日[ひ]は、映画[えいが]とか買[か]い物[もの]とかに行[い]きます。",
        "reading": "yasuminohiha、eigatokakaimonotokaniikimasu。",
        "translation": "Vào những ngày nghỉ tôi đi xem phim hoặc đi mua sắm."
      },
      {
        "text": "健康[けんこう]のために、野菜[やさい]を食[た]べるとか運動[うんどう]するとか、何[なに]かしたほうがいい。",
        "furigana": "健康[けんこう]のために、野菜[やさい]を食[た]べるとか運動[うんどう]するとか、何[なに]かしたほうがいい。",
        "reading": "kenkounotameni、yasaiotaberutokaundousurutoka、nanikashitahougaii。",
        "translation": "Bạn nên làm gì đó để giữ sức khỏe, như ăn rau và tập thể dục."
      }
    ]
  },
  {
    "id": "ja-g-n4-89-nado",
    "language": "ja",
    "level": "N4",
    "pattern": "〜など (nado)",
    "meaning": "v.v.; vân vân; chẳng hạn như",
    "formula": "Danh từ (N) + など",
    "note": "Thường kết hợp với や (AやBなど). Sau một danh từ, nó làm dịu đi một gợi ý.",
    "examples": [
      {
        "text": "机[つくえ]の上[うえ]に本[ほん]やノートなどがあります。",
        "furigana": "机[つくえ]の上[うえ]に本[ほん]やノートなどがあります。",
        "reading": "tsukuenouenihonyaノートnadogaarimasu。",
        "translation": "Trên bàn có sách và vở."
      },
      {
        "text": "夏休[なつやす]みに京都[きょうと]や奈良[なら]などに行[い]きました。",
        "furigana": "夏休[なつやす]みに京都[きょうと]や奈良[なら]などに行[い]きました。",
        "reading": "natsuyasuminikyoutoyanaranadoniikimashita。",
        "translation": "Tôi đã đến Kyoto và Nara trong kỳ nghỉ hè."
      },
      {
        "text": "お茶[ちゃ]など、いかがですか。",
        "furigana": "お茶[ちゃ]など、いかがですか。",
        "reading": "ochanado、ikagadesuka。",
        "translation": "Bạn có muốn uống trà không?"
      }
    ]
  },
  {
    "id": "ja-g-n4-90-de-mo-suggestion",
    "language": "ja",
    "level": "N4",
    "pattern": "〜でも（suggestion） (de mo (suggestion))",
    "meaning": "hoặc gì đó (làm dịu một gợi ý)",
    "formula": "Danh từ (N) + でも",
    "note": "Đưa ra một ví dụ trong khi vẫn để ngỏ các tùy chọn khác, điều này làm cho lời mời và lời khuyên nghe có vẻ ít thuyết phục hơn.",
    "examples": [
      {
        "text": "ちょっと休[やす]んで、コーヒーでも飲[の]みませんか。",
        "furigana": "ちょっと休[やす]んで、コーヒーでも飲[の]みませんか。",
        "reading": "chottoyasunde、コーヒーdemonomimasenka。",
        "translation": "Bạn có muốn nghỉ ngơi và uống cà phê không?"
      },
      {
        "text": "雨[あめ]だから、家[いえ]でゲームでもしよう。",
        "furigana": "雨[あめ]だから、家[いえ]でゲームでもしよう。",
        "reading": "amedakara、iedeゲームdemoshiyou。",
        "translation": "Trời mưa nên ở nhà chơi vài trò chơi nhé."
      },
      {
        "text": "暇[ひま]なら、本[ほん]でも読[よ]んだら？",
        "furigana": "暇[ひま]なら、本[ほん]でも読[よ]んだら？",
        "reading": "himanara、hondemoyondara？",
        "translation": "Nếu có thời gian rảnh tại sao bạn không đọc sách?"
      }
    ]
  },
  {
    "id": "ja-g-n4-91-sa",
    "language": "ja",
    "level": "N4",
    "pattern": "〜さ (sa)",
    "meaning": "-ness (chuyển tính từ thành danh từ chỉ mức độ)",
    "formula": "Tính từ đuôi い (A-i) stem + さ / Tính từ đuôi な (A-na) + さ",
    "note": "いい trở thành よさ. Thường dùng cho các phép đo (高さ, 重さ, 大きさ, 長さ).",
    "examples": [
      {
        "text": "この橋[はし]の長[なが]さはどのくらいですか。",
        "furigana": "この橋[はし]の長[なが]さはどのくらいですか。",
        "reading": "konohashinonagasahadonokuraidesuka。",
        "translation": "Cây cầu này dài bao nhiêu?"
      },
      {
        "text": "山[やま]の上[うえ]の寒[さむ]さにびっくりした。",
        "furigana": "山[やま]の上[うえ]の寒[さむ]さにびっくりした。",
        "reading": "yamanouenosamusanibikkurishita。",
        "translation": "Tôi ngạc nhiên vì trên núi lạnh đến thế nào."
      },
      {
        "text": "この仕事[しごと]の大変[たいへん]さは、やってみないと分[わ]からない。",
        "furigana": "この仕事[しごと]の大変[たいへん]さは、やってみないと分[わ]からない。",
        "reading": "konoshigotonotaihensaha、yatteminaitowakaranai。",
        "translation": "Bạn sẽ không hiểu được công việc này khó đến mức nào cho đến khi thử sức."
      }
    ]
  },
  {
    "id": "ja-g-n4-92-me",
    "language": "ja",
    "level": "N4",
    "pattern": "〜目 (me)",
    "meaning": "-th (thứ tự: thứ nhất, thứ hai, thứ ba ...)",
    "formula": "Danh từ (N) (number + counter) + 目",
    "note": null,
    "examples": [
      {
        "text": "右[みぎ]から三[みっ]つ目[め]の建物[たてもの]が図書館[としょかん]です。",
        "furigana": "右[みぎ]から三[みっ]つ目[め]の建物[たてもの]が図書館[としょかん]です。",
        "reading": "migikaramittsumenotatemonogatoshokandesu。",
        "translation": "Tòa nhà thứ ba từ phải sang là thư viện."
      },
      {
        "text": "日本[にほん]に来[く]るのは今回[こんかい]で二[に]回[かい]目[め]です。",
        "furigana": "日本[にほん]に来[く]るのは今回[こんかい]で二[に]回[かい]目[め]です。",
        "reading": "nihonnikurunohakonkaidenikaimedesu。",
        "translation": "Đây là lần thứ hai tôi đến Nhật Bản."
      },
      {
        "text": "二[ふた]つ目[め]の角[かど]を左[ひだり]に曲[ま]がってください。",
        "furigana": "二[ふた]つ目[め]の角[かど]を左[ひだり]に曲[ま]がってください。",
        "reading": "futatsumenokadoohidarinimagattekudasai。",
        "translation": "Rẽ trái ở góc thứ hai."
      }
    ]
  },
  {
    "id": "ja-g-n4-93-oki-ni",
    "language": "ja",
    "level": "N4",
    "pattern": "〜おきに (oki ni)",
    "meaning": "nhau; trong khoảng thời gian",
    "formula": "Danh từ (N) (number + counter) + おきに",
    "note": "Với ngày (一日おき) nó bỏ qua một đơn vị, nghĩa là 'cách ngày'. Với số phút hoặc khoảng cách, nó thường chỉ có nghĩa là 'mọi X'.",
    "examples": [
      {
        "text": "このバスは十[じゅう]五[ご]分[ふん]おきに来[き]ます。",
        "furigana": "このバスは十[じゅう]五[ご]分[ふん]おきに来[き]ます。",
        "reading": "konoバスhajuugofunokinikimasu。",
        "translation": "Xe buýt này cứ mười lăm phút lại có một chuyến."
      },
      {
        "text": "一[いち]日[にち]おきにジョギングをしています。",
        "furigana": "一[いち]日[にち]おきにジョギングをしています。",
        "reading": "ichinichiokiniジョギングoshiteimasu。",
        "translation": "Tôi chạy bộ cách ngày."
      },
      {
        "text": "道[みち]の両側[りょうがわ]に、木[き]が五[ご]メートルおきに植[う]えてある。",
        "furigana": "道[みち]の両側[りょうがわ]に、木[き]が五[ご]メートルおきに植[う]えてある。",
        "reading": "michinoryougawani、kigagoメートルokiniuetearu。",
        "translation": "Cây xanh được trồng mỗi 5 mét ở hai bên đường."
      }
    ]
  },
  {
    "id": "ja-g-n4-94-ku-suru-ni-suru",
    "language": "ja",
    "level": "N4",
    "pattern": "〜くする / 〜にする（make） (ku suru / ni suru)",
    "meaning": "tạo ra (cái gì đó) ...; thay đổi thứ gì đó sang trạng thái",
    "formula": "Tính từ đuôi い (A-i)-ku + する / Tính từ đuôi な (A-na) + に + する / Danh từ (N) + に + する",
    "note": "Ai đó cố tình thay đổi một cái gì đó. So sánh 〜くなる / 〜になる, nơi mà sự thay đổi tự xảy ra.",
    "examples": [
      {
        "text": "テレビの音[おと]を小[ちい]さくしてください。",
        "furigana": "テレビの音[おと]を小[ちい]さくしてください。",
        "reading": "テレビnootoochiisakushitekudasai。",
        "translation": "Vui lòng giảm âm lượng TV."
      },
      {
        "text": "お客[きゃく]さんが来[く]るから、部屋[へや]をきれいにしよう。",
        "furigana": "お客[きゃく]さんが来[く]るから、部屋[へや]をきれいにしよう。",
        "reading": "okyakusangakurukara、heyaokireinishiyou。",
        "translation": "Nhà có khách tới nên dọn phòng thôi."
      },
      {
        "text": "暑[あつ]いので、髪[かみ]を短[みじか]くしました。",
        "furigana": "暑[あつ]いので、髪[かみ]を短[みじか]くしました。",
        "reading": "atsuinode、kamiomijikakushimashita。",
        "translation": "Trời nóng nên cắt tóc ngắn."
      }
    ]
  },
  {
    "id": "ja-g-n4-95-ga-suru",
    "language": "ja",
    "level": "N4",
    "pattern": "〜がする (ga suru)",
    "meaning": "(một mùi, âm thanh, vị hoặc cảm giác) được cảm nhận",
    "formula": "Danh từ (N) + がする",
    "note": "Được sử dụng với におい, 音, 声, 味 và 気 (〜気がする: 'có cảm giác như vậy').",
    "examples": [
      {
        "text": "台所[だいどころ]からいいにおいがする。",
        "furigana": "台所[だいどころ]からいいにおいがする。",
        "reading": "daidokorokaraiinioigasuru。",
        "translation": "Có mùi thơm ngào ngạt tỏa ra từ bếp."
      },
      {
        "text": "外[そと]で変[へん]な音[おと]がしました。",
        "furigana": "外[そと]で変[へん]な音[おと]がしました。",
        "reading": "sotodehennaotogashimashita。",
        "translation": "Tôi nghe thấy tiếng động lạ ở bên ngoài."
      },
      {
        "text": "このお茶[ちゃ]は少[すこ]し甘[あま]い味[あじ]がする。",
        "furigana": "このお茶[ちゃ]は少[すこ]し甘[あま]い味[あじ]がする。",
        "reading": "konoochahasukoshiamaiajigasuru。",
        "translation": "Trà này có vị hơi ngọt."
      }
    ]
  },
  {
    "id": "ja-g-n4-96-kana-kashira",
    "language": "ja",
    "level": "N4",
    "pattern": "〜かな / 〜かしら (kana / kashira)",
    "meaning": "tôi tự hỏi",
    "formula": "Động từ thể thông thường (V thường) / Tính từ đuôi い (A-i) / Tính từ đuôi な (A-na) / Danh từ (N) + かな / かしら",
    "note": "Một câu hỏi nhẹ nhàng, thường tự nói với chính mình. かしら nghe có vẻ nữ tính và hơi lỗi thời. 〜ないかな có thể diễn tả một điều ước (早く来ないかな).",
    "examples": [
      {
        "text": "明日[あした]は晴[は]れるかな。",
        "furigana": "明日[あした]は晴[は]れるかな。",
        "reading": "ashitahaharerukana。",
        "translation": "Không biết ngày mai trời có nắng không."
      },
      {
        "text": "このお菓子[かし]、誰[だれ]が買[か]ってきたのかな。",
        "furigana": "このお菓子[かし]、誰[だれ]が買[か]ってきたのかな。",
        "reading": "konookashi、daregakattekitanokana。",
        "translation": "Không biết ai đã mua những chiếc kẹo này."
      },
      {
        "text": "この服[ふく]、私[わたし]に似合[にあ]うかしら。",
        "furigana": "この服[ふく]、私[わたし]に似合[にあ]うかしら。",
        "reading": "konofuku、watashininiaukashira。",
        "translation": "Chiếc váy này có hợp với tôi không?"
      }
    ]
  },
  {
    "id": "ja-g-n4-97-te-kuremasen-ka-te-itadakemasen-ka",
    "language": "ja",
    "level": "N4",
    "pattern": "〜てくれませんか / 〜ていただけませんか (te kuremasen ka / te itadakemasen ka)",
    "meaning": "bạn có thể vui lòng không ...? (yêu cầu lịch sự)",
    "formula": "Động từ thể て (V-te) + くれませんか / Động từ thể て (V-te) + いただけませんか",
    "note": "Nhẹ nhàng hơn 〜てください. Sự lịch sự tăng từ 〜てくれませんか lên 〜てもらえませんか đến 〜ていただけませんか.",
    "examples": [
      {
        "text": "すみません、写真[しゃしん]を撮[と]ってくれませんか。",
        "furigana": "すみません、写真[しゃしん]を撮[と]ってくれませんか。",
        "reading": "sumimasen、shashinotottekuremasenka。",
        "translation": "Xin lỗi, bạn có thể chụp một bức ảnh được không?"
      },
      {
        "text": "この書類[しょるい]の書[か]き方[かた]を教[おし]えていただけませんか。",
        "furigana": "この書類[しょるい]の書[か]き方[かた]を教[おし]えていただけませんか。",
        "reading": "konoshoruinokakikataooshieteitadakemasenka。",
        "translation": "Bạn có thể cho tôi biết cách viết tài liệu này không?"
      },
      {
        "text": "もう少[すこ]し大[おお]きい声[こえ]で話[はな]していただけませんか。",
        "furigana": "もう少[すこ]し大[おお]きい声[こえ]で話[はな]していただけませんか。",
        "reading": "mousukoshiookiikoedehanashiteitadakemasenka。",
        "translation": "Bạn có thể nói to hơn một chút được không?"
      }
    ]
  },
  {
    "id": "ja-g-n4-98-naide",
    "language": "ja",
    "level": "N4",
    "pattern": "〜ないで (naide)",
    "meaning": "mà không làm; thay vì thực hiện việc xem xét",
    "formula": "Động từ thể ない (V-nai) + で",
    "note": "〜ずに (N3) có nghĩa tương tự nhưng trang trọng hơn. Khác với 〜なくて, nó đưa ra lý do.",
    "examples": [
      {
        "text": "今朝[けさ]は朝[あさ]ご飯[はん]を食[た]べないで学校[がっこう]に行[い]った。",
        "furigana": "今朝[けさ]は朝[あさ]ご飯[はん]を食[た]べないで学校[がっこう]に行[い]った。",
        "reading": "kesahaasagohanotabenaidegakkouniitta。",
        "translation": "Sáng nay tôi đi học mà không ăn sáng."
      },
      {
        "text": "傘[かさ]を持[も]たないで出[で]かけて、雨[あめ]にぬれてしまった。",
        "furigana": "傘[かさ]を持[も]たないで出[で]かけて、雨[あめ]にぬれてしまった。",
        "reading": "kasaomotanaidedekakete、ameninureteshimatta。",
        "translation": "Tôi ra ngoài mà không mang ô và bị ướt mưa."
      },
      {
        "text": "エレベーターを使[つか]わないで、階段[かいだん]で上[あ]がりましょう。",
        "furigana": "エレベーターを使[つか]わないで、階段[かいだん]で上[あ]がりましょう。",
        "reading": "エレベーターotsukawanaide、kaidandeagarimashou。",
        "translation": "Hãy đi cầu thang bộ thay vì dùng thang máy nhé."
      }
    ]
  },
  {
    "id": "ja-g-n3-01-wake-da",
    "language": "ja",
    "level": "N3",
    "pattern": "〜わけだ (wake da)",
    "meaning": "không có gì lạ; đó là lý do tại sao; mặc dù vậy thì",
    "formula": "Động từ thể thông thường (V thường) / Tính từ đuôi い (A-i) / Tính từ đuôi な (A-na) + な / Danh từ (N) + という + わけだ",
    "note": "Đưa ra kết luận một cách tự nhiên dựa trên những sự kiện đã biết, thường với cảm giác 'bây giờ tôi đã hiểu'. Thường đứng trước だから, それで hoặc どうりで.",
    "examples": [
      {
        "text": "三[さん]年[ねん]も中国[ちゅうごく]に住[す]んでいたんですか。だから中国[ちゅうごく]語[ご]が上手[じょうず]なわけですね。",
        "furigana": "三[さん]年[ねん]も中国[ちゅうごく]に住[す]んでいたんですか。だから中国[ちゅうごく]語[ご]が上手[じょうず]なわけですね。",
        "reading": "sannenmochuugokunisundeitandesuka。dakarachuugokugogajouzunawakedesune。",
        "translation": "Bạn sống ở Trung Quốc được ba năm? Đó là lý do tại sao tôi giỏi tiếng Trung."
      },
      {
        "text": "窓[まど]が全部[ぜんぶ]開[あ]いている。どうりで寒[さむ]いわけだ。",
        "furigana": "窓[まど]が全部[ぜんぶ]開[あ]いている。どうりで寒[さむ]いわけだ。",
        "reading": "madogazenbuaiteiru。douridesamuiwakeda。",
        "translation": "Tất cả các cửa sổ đều mở. Không có gì ngạc nhiên khi trời lạnh."
      },
      {
        "text": "この本[ほん]は三百[さんびゃく]ページだから、一[いち]日[にち]に二[に]十[じゅう]ページ読[よ]めば、十[じゅう]五[ご]日[にち]で読[よ]み終[お]わるわけだ。",
        "furigana": "この本[ほん]は三百[さんびゃく]ページだから、一[いち]日[にち]に二[に]十[じゅう]ページ読[よ]めば、十[じゅう]五[ご]日[にち]で読[よ]み終[お]わるわけだ。",
        "reading": "konohonhasanbyakuページdakara、ichinichininijuuページyomeba、juugonichideyomiowaruwakeda。",
        "translation": "Sách này có 300 trang nên nếu bạn đọc 20 trang một ngày thì trong 15 ngày có thể đọc xong."
      }
    ]
  },
  {
    "id": "ja-g-n3-02-wake-de-wa-nai",
    "language": "ja",
    "level": "N3",
    "pattern": "〜わけではない (wake de wa nai)",
    "meaning": "nó không có nghĩa như vậy; nó không phải vậy; không nhất thiết phải có",
    "formula": "Động từ thể thông thường (V thường) / Tính từ đuôi い (A-i) / Tính từ đuôi な (A-na) + な / Danh từ (N) + という + わけではない",
    "note": "Sự phủ nhận một phần hoặc nhẹ nhàng những gì người nghe có thể giả định. Thường đi kèm với いつも, 全部 hoặc 必ずしも. Không giống như 〜わけがない, loại trừ một cách thẳng thừng điều gì đó.",
    "examples": [
      {
        "text": "料理[りょうり]が嫌[きら]いなわけではないが、毎日[まいにち]作[つく]る時間[じかん]がない。",
        "furigana": "料理[りょうり]が嫌[きら]いなわけではないが、毎日[まいにち]作[つく]る時間[じかん]がない。",
        "reading": "ryourigakirainawakedehanaiga、mainichitsukurujikanganai。",
        "translation": "Không phải tôi không thích nấu ăn mà là tôi không có thời gian nấu nướng hàng ngày."
      },
      {
        "text": "値段[ねだん]が高[たか]ければおいしいというわけではない。",
        "furigana": "値段[ねだん]が高[たか]ければおいしいというわけではない。",
        "reading": "nedangatakakerebaoishiitoiuwakedehanai。",
        "translation": "Giá cao không có nghĩa là ngon."
      },
      {
        "text": "全然[ぜんぜん]分[わ]からないわけではありませんが、もう少[すこ]しゆっくり話[はな]していただけますか。",
        "furigana": "全然[ぜんぜん]分[わ]からないわけではありませんが、もう少[すこ]しゆっくり話[はな]していただけますか。",
        "reading": "zenzenwakaranaiwakedehaarimasenga、mousukoshiyukkurihanashiteitadakemasuka。",
        "translation": "Không phải là tôi không hiểu gì cả, nhưng bạn có thể nói chậm hơn một chút được không?"
      }
    ]
  },
  {
    "id": "ja-g-n3-03-wake-ga-nai",
    "language": "ja",
    "level": "N3",
    "pattern": "〜わけがない (wake ga nai)",
    "meaning": "không thể nào như vậy được; không thể nào",
    "formula": "Động từ thể thông thường (V thường) / Tính từ đuôi い (A-i) / Tính từ đuôi な (A-na) + な / Danh từ (N) + の + わけがない",
    "note": "Niềm tin chắc chắn của người nói rằng điều gì đó là không thể. Bình thường: 〜わけない. Gần giống với 〜はずがない, nhưng nghe có vẻ cảm xúc hơn và ít dựa trên lý lẽ hơn.",
    "examples": [
      {
        "text": "こんなに練習[れんしゅう]したんだから、負[ま]けるわけがない。",
        "furigana": "こんなに練習[れんしゅう]したんだから、負[ま]けるわけがない。",
        "reading": "konnanirenshuushitandakara、makeruwakeganai。",
        "translation": "Tôi đã luyện tập rất nhiều rồi, không thể nào tôi lại thua được."
      },
      {
        "text": "あんなにまじめな人[ひと]が、約束[やくそく]を忘[わす]れるわけがありません。",
        "furigana": "あんなにまじめな人[ひと]が、約束[やくそく]を忘[わす]れるわけがありません。",
        "reading": "annanimajimenahitoga、yakusokuowasureruwakegaarimasen。",
        "translation": "Một người nghiêm túc như vậy không thể nào quên được lời hứa của mình."
      },
      {
        "text": "一[いち]日[にち]で漢字[かんじ]を百[ひゃく]個[こ]覚[おぼ]えるなんて、できるわけがないよ。",
        "furigana": "一[いち]日[にち]で漢字[かんじ]を百[ひゃく]個[こ]覚[おぼ]えるなんて、できるわけがないよ。",
        "reading": "ichinichidekanjiohyakukooboerunante、dekiruwakeganaiyo。",
        "translation": "Không thể nào bạn có thể ghi nhớ 100 chữ kanji trong một ngày."
      }
    ]
  },
  {
    "id": "ja-g-n3-04-wake-ni-wa-ikanai",
    "language": "ja",
    "level": "N3",
    "pattern": "〜わけにはいかない (wake ni wa ikanai)",
    "meaning": "không đủ khả năng; không thể tốt lắm; không được (vì lý do xã hội hoặc đạo đức)",
    "formula": "Động từ thể từ điển (V-dict) / Động từ thể ない (V-nai) + わけにはいかない",
    "note": "Hành động này có thể thực hiện được nhưng bị loại trừ bởi nghĩa vụ, hoàn cảnh hoặc lẽ thường. 〜ないわけにはいかない có nghĩa là 'phải; không thể tránh khỏi việc làm'.",
    "examples": [
      {
        "text": "明日[あした]は大事[だいじ]な会議[かいぎ]があるから、休[やす]むわけにはいかない。",
        "furigana": "明日[あした]は大事[だいじ]な会議[かいぎ]があるから、休[やす]むわけにはいかない。",
        "reading": "ashitahadaijinakaigigaarukara、yasumuwakenihaikanai。",
        "translation": "Ngày mai tôi có cuộc họp quan trọng nên không thể nghỉ được."
      },
      {
        "text": "友達[ともだち]に頼[たの]まれたことだから、断[ことわ]るわけにはいかなかった。",
        "furigana": "友達[ともだち]に頼[たの]まれたことだから、断[ことわ]るわけにはいかなかった。",
        "reading": "tomodachinitanomaretakotodakara、kotowaruwakenihaikanakatta。",
        "translation": "Bạn tôi nhờ tôi làm nên tôi không thể từ chối."
      },
      {
        "text": "招待[しょうたい]されたのだから、パーティーに行[い]かないわけにはいかない。",
        "furigana": "招待[しょうたい]されたのだから、パーティーに行[い]かないわけにはいかない。",
        "reading": "shoutaisaretanodakara、パーティーniikanaiwakenihaikanai。",
        "translation": "Vì đã được mời nên tôi không còn cách nào khác là phải đi dự tiệc."
      }
    ]
  },
  {
    "id": "ja-g-n3-05-mono-da",
    "language": "ja",
    "level": "N3",
    "pattern": "〜ものだ (mono da)",
    "meaning": "đó là điều tự nhiên; người ta nên; đã từng (nỗi nhớ); Làm sao ...! (cảm giác sâu sắc)",
    "formula": "Động từ thể từ điển (V-dict) / Động từ thể た (V-ta) / Tính từ đuôi い (A-i) / Tính từ đuôi な (A-na) + な + ものだ",
    "note": "Công dụng chính: sự thật chung hoặc xu hướng tự nhiên, chuẩn mực xã hội (nên), thói quen hoài niệm về quá khứ với 〜たものだ, và cảm giác sâu sắc (時間がたつのは早いものだ). Bình thường: 〜もんだ.",
    "examples": [
      {
        "text": "子[こ]どものころは、この川[かわ]でよく泳[およ]いだものだ。",
        "furigana": "子[こ]どものころは、この川[かわ]でよく泳[およ]いだものだ。",
        "reading": "kodomonokoroha、konokawadeyokuoyoidamonoda。",
        "translation": "Hồi nhỏ tôi hay bơi ở sông này lắm."
      },
      {
        "text": "新[あたら]しい環境[かんきょう]に慣[な]れるには、時間[じかん]がかかるものだ。",
        "furigana": "新[あたら]しい環境[かんきょう]に慣[な]れるには、時間[じかん]がかかるものだ。",
        "reading": "atarashiikankyouninareruniha、jikangakakarumonoda。",
        "translation": "Cần có thời gian để làm quen với môi trường mới."
      },
      {
        "text": "目上[めうえ]の人[ひと]には敬語[けいご]を使[つか]うものだ。",
        "furigana": "目上[めうえ]の人[ひと]には敬語[けいご]を使[つか]うものだ。",
        "reading": "meuenohitonihakeigootsukaumonoda。",
        "translation": "Bạn nên dùng kính ngữ với cấp trên nhé."
      }
    ]
  },
  {
    "id": "ja-g-n3-06-mono-de-wa-nai",
    "language": "ja",
    "level": "N3",
    "pattern": "〜ものではない (mono de wa nai)",
    "meaning": "người ta không nên;",
    "formula": "Động từ thể từ điển (V-dict) + ものではない",
    "note": "Lời khuyên dựa trên lẽ thường hoặc chuẩn mực xã hội, thường là từ người lớn tuổi. Bình thường: 〜もんじゃない. Nghe có vẻ giống sự hiểu biết thông thường hơn là 〜べきではない.",
    "examples": [
      {
        "text": "人[ひと]の失敗[しっぱい]を笑[わら]うものではない。",
        "furigana": "人[ひと]の失敗[しっぱい]を笑[わら]うものではない。",
        "reading": "hitonoshippaiowaraumonodehanai。",
        "translation": "Đừng cười nhạo lỗi lầm của người khác."
      },
      {
        "text": "出[だ]された食[た]べ物[もの]を残[のこ]すものじゃないよ。",
        "furigana": "出[だ]された食[た]べ物[もの]を残[のこ]すものじゃないよ。",
        "reading": "dasaretatabemonoonokosumonojanaiyo。",
        "translation": "Bạn không để lại đồ ăn đã được phục vụ."
      },
      {
        "text": "夜[よる]遅[おそ]くに人[ひと]の家[いえ]に電話[でんわ]をかけるものではありません。",
        "furigana": "夜[よる]遅[おそ]くに人[ひと]の家[いえ]に電話[でんわ]をかけるものではありません。",
        "reading": "yoruosokunihitonoienidenwaokakerumonodehaarimasen。",
        "translation": "Đó không phải là thứ bạn gọi là nhà người ta vào đêm khuya."
      }
    ]
  },
  {
    "id": "ja-g-n3-07-mono-mon",
    "language": "ja",
    "level": "N3",
    "pattern": "〜もの / 〜もん (mono / mon)",
    "meaning": "bởi vì (lý do thông thường hoặc tự biện minh)",
    "formula": "Câu + もの / もん",
    "note": "Nghe có vẻ bĩu môi hoặc tự biện minh; thường bắt đầu bằng だって. もん thông tục hơn. Được sử dụng bởi trẻ em và giữa những người bạn thân; tránh ở nơi làm việc.",
    "examples": [
      {
        "text": "「どうして食[た]べないの？」「だって、ピーマン嫌[きら]いなんだもん。」",
        "furigana": "「どうして食[た]べないの？」「だって、ピーマン嫌[きら]いなんだもん。」",
        "reading": "「doushitetabenaino？」「datte、ピーマンkirainandamon。」",
        "translation": "``Sao bạn không ăn chúng?'' ``Bởi vì tôi không thích ớt xanh.''"
      },
      {
        "text": "一人[ひとり]で行[い]けるよ。もう子[こ]どもじゃないもん。",
        "furigana": "一人[ひとり]で行[い]けるよ。もう子[こ]どもじゃないもん。",
        "reading": "hitorideikeruyo。moukodomojanaimon。",
        "translation": "Tôi có thể đi một mình. Tôi không còn là một đứa trẻ nữa."
      },
      {
        "text": "ケーキ、全部[ぜんぶ]食[た]べちゃった。だって、すごくおいしかったんだもん。",
        "furigana": "ケーキ、全部[ぜんぶ]食[た]べちゃった。だって、すごくおいしかったんだもん。",
        "reading": "ケーキ、zenbutabechatta。datte、sugokuoishikattandamon。",
        "translation": "Tôi ăn hết cái bánh rồi. Bởi vì nó thực sự rất ngon."
      }
    ]
  },
  {
    "id": "ja-g-n3-08-mono-dakara-mono-de",
    "language": "ja",
    "level": "N3",
    "pattern": "〜ものだから / 〜もので (mono dakara / mono de)",
    "meaning": "bởi vì; vì (giải thích hoặc bào chữa cho một tình huống)",
    "formula": "Động từ thể thông thường (V thường) / Tính từ đuôi い (A-i) / Tính từ đuôi な (A-na) + な / Danh từ (N) + な + ものだから / もので",
    "note": "Giải thích hoặc bào chữa cho điều gì đó không hoàn toàn nằm trong tầm kiểm soát của người nói. Mệnh đề chính không thể là một mệnh lệnh hoặc yêu cầu. もので thường dùng trong lời xin lỗi lịch sự.",
    "examples": [
      {
        "text": "道[みち]がすごく混[こ]んでいたものだから、約束[やくそく]の時間[じかん]に間[ま]に合[あ]わなかった。",
        "furigana": "道[みち]がすごく混[こ]んでいたものだから、約束[やくそく]の時間[じかん]に間[ま]に合[あ]わなかった。",
        "reading": "michigasugokukondeitamonodakara、yakusokunojikannimaniawanakatta。",
        "translation": "Đường đông đúc đến mức tôi không thể đến đúng giờ hẹn."
      },
      {
        "text": "すみません、急[いそ]いでいたもので、書類[しょるい]を持[も]ってくるのを忘[わす]れてしまいました。",
        "furigana": "すみません、急[いそ]いでいたもので、書類[しょるい]を持[も]ってくるのを忘[わす]れてしまいました。",
        "reading": "sumimasen、isoideitamonode、shoruiomottekurunoowasureteshimaimashita。",
        "translation": "Xin lỗi, tôi vội quá quên mang theo hồ sơ."
      },
      {
        "text": "初[はじ]めての海外[かいがい]旅行[りょこう]だったものだから、見[み]るものすべてが珍[めずら]しかった。",
        "furigana": "初[はじ]めての海外[かいがい]旅行[りょこう]だったものだから、見[み]るものすべてが珍[めずら]しかった。",
        "reading": "hajimetenokaigairyokoudattamonodakara、mirumonosubetegamezurashikatta。",
        "translation": "Đó là chuyến đi nước ngoài đầu tiên của tôi nên mọi thứ tôi thấy đều không bình thường."
      }
    ]
  },
  {
    "id": "ja-g-n3-09-koto-da",
    "language": "ja",
    "level": "N3",
    "pattern": "〜ことだ (koto da)",
    "meaning": "; điều tốt nhất là (lời khuyên)",
    "formula": "Động từ thể từ điển (V-dict) / Động từ thể ない (V-nai) + ことだ",
    "note": "Lời khuyên cá nhân từ một người ở vị trí có thể đưa ra lời khuyên đó (giáo viên, phụ huynh, cấp trên). Không dùng với cấp trên. So sánh 〜ものだ, cái nào phù hợp với những chuẩn mực chung.",
    "examples": [
      {
        "text": "日本語[にほんご]が上手[じょうず]になりたいなら、毎日[まいにち]少[すこ]しずつでも話[はな]すことだ。",
        "furigana": "日本語[にほんご]が上手[じょうず]になりたいなら、毎日[まいにち]少[すこ]しずつでも話[はな]すことだ。",
        "reading": "nihongogajouzuninaritainara、mainichisukoshizutsudemohanasukotoda。",
        "translation": "Muốn giỏi tiếng Nhật thì mỗi ngày hãy nói một chút."
      },
      {
        "text": "風邪[かぜ]を早[はや]く治[なお]したければ、無理[むり]をしないでゆっくり休[やす]むことです。",
        "furigana": "風邪[かぜ]を早[はや]く治[なお]したければ、無理[むり]をしないでゆっくり休[やす]むことです。",
        "reading": "kazeohayakunaoshitakereba、murioshinaideyukkuriyasumukotodesu。",
        "translation": "Nếu bạn muốn khỏi cảm lạnh nhanh chóng, đừng quá cố gắng và hãy nghỉ ngơi thật tốt."
      },
      {
        "text": "人[ひと]の話[はなし]は最後[さいご]までよく聞[き]くことだ。",
        "furigana": "人[ひと]の話[はなし]は最後[さいご]までよく聞[き]くことだ。",
        "reading": "hitonohanashihasaigomadeyokukikukotoda。",
        "translation": "Hãy lắng nghe thật kỹ đến cuối những gì người khác nói."
      }
    ]
  },
  {
    "id": "ja-g-n3-10-koto-wa-nai",
    "language": "ja",
    "level": "N3",
    "pattern": "〜ことはない (koto wa nai)",
    "meaning": "thì không cần thiết; không cần phải chỉ",
    "formula": "Động từ thể từ điển (V-dict) + ことはない",
    "note": "Trấn an hoặc khuyên nhủ rằng điều gì đó là không cần thiết. Đừng nhầm lẫn với 〜たことはない ('chưa bao giờ làm').",
    "examples": [
      {
        "text": "簡単[かんたん]な手術[しゅじゅつ]ですから、そんなに心配[しんぱい]することはありませんよ。",
        "furigana": "簡単[かんたん]な手術[しゅじゅつ]ですから、そんなに心配[しんぱい]することはありませんよ。",
        "reading": "kantannashujutsudesukara、sonnanishinpaisurukotohaarimasenyo。",
        "translation": "Đây là một phẫu thuật đơn giản nên không có gì phải lo lắng."
      },
      {
        "text": "駅[えき]までは歩[ある]いて五[ご]分[ふん]だから、タクシーを使[つか]うことはない。",
        "furigana": "駅[えき]までは歩[ある]いて五[ご]分[ふん]だから、タクシーを使[つか]うことはない。",
        "reading": "ekimadehaaruitegofundakara、タクシーotsukaukotohanai。",
        "translation": "Đến ga mất năm phút đi bộ nên tôi không cần phải bắt taxi."
      },
      {
        "text": "一回[いっかい]失敗[しっぱい]したくらいで、あきらめることはないよ。",
        "furigana": "一回[いっかい]失敗[しっぱい]したくらいで、あきらめることはないよ。",
        "reading": "ikkaishippaishitakuraide、akiramerukotohanaiyo。",
        "translation": "Tôi sẽ không bỏ cuộc chỉ vì tôi đã thất bại một lần."
      }
    ]
  },
  {
    "id": "ja-g-n3-11-koto-ni-shite-iru",
    "language": "ja",
    "level": "N3",
    "pattern": "〜ことにしている (koto ni shite iru)",
    "meaning": "làm cho nó trở thành một quy tắc; đưa ra quan điểm về",
    "formula": "Động từ thể từ điển (V-dict) / Động từ thể ない (V-nai) + ことにしている",
    "note": "Một quy tắc cá nhân mà người nói (hoặc chủ đề) đã quyết định và tuân theo. So sánh 〜ことになっている, một quy tắc hoặc kế hoạch do người khác đặt ra.",
    "examples": [
      {
        "text": "健康[けんこう]のために、週[しゅう]に三[さん]回[かい]はジムに通[かよ]うことにしている。",
        "furigana": "健康[けんこう]のために、週[しゅう]に三[さん]回[かい]はジムに通[かよ]うことにしている。",
        "reading": "kenkounotameni、shuunisankaihaジムnikayoukotonishiteiru。",
        "translation": "Vì sức khỏe của mình, tôi cố gắng đến phòng gym ba lần một tuần."
      },
      {
        "text": "夜[よる]十[じゅう]時[じ]以降[いこう]は、スマホを見[み]ないことにしています。",
        "furigana": "夜[よる]十[じゅう]時[じ]以降[いこう]は、スマホを見[み]ないことにしています。",
        "reading": "yorujuujiikouha、スマホominaikotonishiteimasu。",
        "translation": "Tôi cố gắng không nhìn vào điện thoại thông minh của mình sau 10 giờ tối."
      },
      {
        "text": "父[ちち]は、給料[きゅうりょう]日[び]には家族[かぞく]を外食[がいしょく]に連[つ]れていくことにしている。",
        "furigana": "父[ちち]は、給料[きゅうりょう]日[び]には家族[かぞく]を外食[がいしょく]に連[つ]れていくことにしている。",
        "reading": "chichiha、kyuuryoubinihakazokuogaishokunitsureteikukotonishiteiru。",
        "translation": "Bố tôi luôn đưa cả nhà đi ăn vào ngày lãnh lương."
      }
    ]
  },
  {
    "id": "ja-g-n3-12-koto-ni-natte-iru",
    "language": "ja",
    "level": "N3",
    "pattern": "〜ことになっている (koto ni natte iru)",
    "meaning": "thì đã được sắp xếp rồi; đó là quy luật; được cho là",
    "formula": "Động từ thể từ điển (V-dict) / Động từ thể ない (V-nai) + ことになっている",
    "note": "Các quy tắc, phong tục hay kế hoạch do người khác (công ty, trường học, xã hội) quyết định chứ không phải là lựa chọn cá nhân. So sánh 〜ことにしている.",
    "examples": [
      {
        "text": "この寮[りょう]では、夜[よる]十[じゅう]一[いち]時[じ]までに戻[もど]ることになっている。",
        "furigana": "この寮[りょう]では、夜[よる]十[じゅう]一[いち]時[じ]までに戻[もど]ることになっている。",
        "reading": "konoryoudeha、yorujuuichijimadenimodorukotoninatteiru。",
        "translation": "Ở ký túc xá này, bạn phải trở về trước 11 giờ đêm."
      },
      {
        "text": "来月[らいげつ]から大阪[おおさか]の支社[ししゃ]で働[はたら]くことになっています。",
        "furigana": "来月[らいげつ]から大阪[おおさか]の支社[ししゃ]で働[はたら]くことになっています。",
        "reading": "raigetsukaraoosakanoshishadehatarakukotoninatteimasu。",
        "translation": "Tôi sẽ làm việc tại văn phòng chi nhánh ở Osaka bắt đầu từ tháng sau."
      },
      {
        "text": "図書館[としょかん]の中[なか]では、飲[の]み物[もの]を飲[の]んではいけないことになっている。",
        "furigana": "図書館[としょかん]の中[なか]では、飲[の]み物[もの]を飲[の]んではいけないことになっている。",
        "reading": "toshokannonakadeha、nomimonoonondehaikenaikotoninatteiru。",
        "translation": "Không được mang đồ uống vào thư viện."
      }
    ]
  },
  {
    "id": "ja-g-n3-13-koto-instruction",
    "language": "ja",
    "level": "N3",
    "pattern": "〜こと（instruction） (koto (instruction))",
    "meaning": "phải; làm (quy tắc hoặc hướng dẫn bằng văn bản)",
    "formula": "Động từ thể từ điển (V-dict) / Động từ thể ない (V-nai) + こと",
    "note": "Kết thúc câu bằng こと để nêu một quy tắc. Được tìm thấy trong các thông báo, quy định và hướng dẫn giữa giáo viên và học sinh. Vô tư; không được sử dụng đối với cấp trên.",
    "examples": [
      {
        "text": "レポートは、来週[らいしゅう]の金曜日[きんようび]までに提出[ていしゅつ]すること。",
        "furigana": "レポートは、来週[らいしゅう]の金曜日[きんようび]までに提出[ていしゅつ]すること。",
        "reading": "レポートha、raishuunokinyoubimadeniteishutsusurukoto。",
        "translation": "Báo cáo phải được gửi trước thứ Sáu tuần sau."
      },
      {
        "text": "図書館[としょかん]の本[ほん]に、線[せん]を引[ひ]かないこと。",
        "furigana": "図書館[としょかん]の本[ほん]に、線[せん]を引[ひ]かないこと。",
        "reading": "toshokannohonni、senohikanaikoto。",
        "translation": "Không gạch chân sách trong thư viện."
      },
      {
        "text": "試験[しけん]中[ちゅう]は、スマホの電源[でんげん]を切[き]っておくこと。",
        "furigana": "試験[しけん]中[ちゅう]は、スマホの電源[でんげん]を切[き]っておくこと。",
        "reading": "shikenchuuha、スマホnodengenokitteokukoto。",
        "translation": "Vui lòng tắt điện thoại thông minh của bạn trong khi thi."
      }
    ]
  },
  {
    "id": "ja-g-n3-14-you-ni-iu-you-ni-tanomu",
    "language": "ja",
    "level": "N3",
    "pattern": "〜ように言う / 〜ように頼む (you ni iu / you ni tanomu)",
    "meaning": "bảo người khác làm; nhờ ai đó làm (báo cáo lệnh hoặc yêu cầu)",
    "formula": "Động từ thể từ điển (V-dict) / Động từ thể ない (V-nai) + ように言う / ように頼む",
    "note": "Báo cáo một hướng dẫn hoặc yêu cầu một cách gián tiếp. Cũng có tác dụng với các động từ khác: 伝える, 注意する, お願いする. Phiên bản trích dẫn trực tiếp: 「〜てください」と言う.",
    "examples": [
      {
        "text": "医者[いしゃ]に、お酒[さけ]を飲[の]みすぎないように言[い]われた。",
        "furigana": "医者[いしゃ]に、お酒[さけ]を飲[の]みすぎないように言[い]われた。",
        "reading": "ishani、osakeonomisuginaiyouniiwareta。",
        "translation": "Bác sĩ dặn không được uống nhiều rượu."
      },
      {
        "text": "隣[となり]の部屋[へや]の人[ひと]に、夜[よる]は音楽[おんがく]の音[おと]を小[ちい]さくするように頼[たの]んだ。",
        "furigana": "隣[となり]の部屋[へや]の人[ひと]に、夜[よる]は音楽[おんがく]の音[おと]を小[ちい]さくするように頼[たの]んだ。",
        "reading": "tonarinoheyanohitoni、yoruhaongakunootoochiisakusuruyounitanonda。",
        "translation": "Mình nhờ người phòng bên cạnh tắt nhạc vào buổi tối."
      },
      {
        "text": "山下[やました]さんに、明日[あした]の会議[かいぎ]に遅[おく]れないように伝[つた]えてください。",
        "furigana": "山下[やました]さんに、明日[あした]の会議[かいぎ]に遅[おく]れないように伝[つた]えてください。",
        "reading": "yamashitasanni、ashitanokaiginiokurenaiyounitsutaetekudasai。",
        "translation": "Hãy nhắn với anh Yamashita đừng đến muộn trong cuộc họp ngày mai nhé."
      }
    ]
  },
  {
    "id": "ja-g-n3-15-you-to-suru",
    "language": "ja",
    "level": "N3",
    "pattern": "〜ようとする (you to suru)",
    "meaning": "cố gắng là điều đương nhiên; cố gắng ; sắp",
    "formula": "Động từ thể ý chí (V-ý chí) + とする",
    "note": "Thường thì một nỗ lực không thành công hoặc bị gián đoạn. 〜ようとしない = 'thậm chí sẽ không thử' (không sẵn lòng). So sánh 〜てみる, có nghĩa là thực sự làm một việc gì đó để xem mọi việc diễn ra như thế nào.",
    "examples": [
      {
        "text": "ドアを開[あ]けようとしたが、鍵[かぎ]がかかっていて開[あ]かなかった。",
        "furigana": "ドアを開[あ]けようとしたが、鍵[かぎ]がかかっていて開[あ]かなかった。",
        "reading": "ドアoakeyoutoshitaga、kagigakakatteiteakanakatta。",
        "translation": "Mình thử mở cửa nhưng nó bị khóa nên không mở được."
      },
      {
        "text": "家[いえ]を出[で]ようとしたとき、急[きゅう]に雨[あめ]が降[ふ]り出[だ]した。",
        "furigana": "家[いえ]を出[で]ようとしたとき、急[きゅう]に雨[あめ]が降[ふ]り出[だ]した。",
        "reading": "ieodeyoutoshitatoki、kyuuniamegafuridashita。",
        "translation": "Khi tôi đang định ra khỏi nhà thì trời bỗng đổ mưa."
      },
      {
        "text": "弟[おとうと]は何[なん]度[ど]注意[ちゅうい]しても、部屋[へや]を片付[かたづ]けようとしない。",
        "furigana": "弟[おとうと]は何[なん]度[ど]注意[ちゅうい]しても、部屋[へや]を片付[かたづ]けようとしない。",
        "reading": "otoutohanandochuuishitemo、heyaokatazukeyoutoshinai。",
        "translation": "Em trai tôi không chịu dọn phòng dù tôi có cảnh cáo bao nhiêu lần đi chăng nữa."
      }
    ]
  },
  {
    "id": "ja-g-n3-16-sou-ni-nai-sou-mo-nai",
    "language": "ja",
    "level": "N3",
    "pattern": "〜そうにない / 〜そうもない (sou ni nai / sou mo nai)",
    "meaning": "không chắc; có vẻ như nó sẽ không",
    "formula": "Động từ thể ます bỏ ます (V-masu) + そうにない / そうもない",
    "note": "Bề ngoài phủ định 〜そうだ với động từ, dựa trên những gì người nói quan sát được. Nhấn mạnh hơn: 〜そうにもない. Với tính từ dùng 〜なさそうだ thay thế.",
    "examples": [
      {
        "text": "この雨[あめ]は、夕方[ゆうがた]までやみそうにない。",
        "furigana": "この雨[あめ]は、夕方[ゆうがた]までやみそうにない。",
        "reading": "konoameha、yuugatamadeyamisouninai。",
        "translation": "Cơn mưa này hình như mãi đến tối mới tạnh."
      },
      {
        "text": "仕事[しごと]が多[おお]すぎて、今日中[きょうじゅう]には終[お]わりそうもない。",
        "furigana": "仕事[しごと]が多[おお]すぎて、今日中[きょうじゅう]には終[お]わりそうもない。",
        "reading": "shigotogaoosugite、kyoujuunihaowarisoumonai。",
        "translation": "Tôi có quá nhiều việc nên tôi không nghĩ mình sẽ hoàn thành nó trong hôm nay."
      },
      {
        "text": "こんなにたくさんの料理[りょうり]、二人[ふたり]では食[た]べきれそうにないね。",
        "furigana": "こんなにたくさんの料理[りょうり]、二人[ふたり]では食[た]べきれそうにないね。",
        "reading": "konnanitakusannoryouri、futaridehatabekiresouninaine。",
        "translation": "Tôi không nghĩ hai chúng ta có thể ăn được nhiều đồ ăn như vậy."
      }
    ]
  },
  {
    "id": "ja-g-n3-17-ippou-da",
    "language": "ja",
    "level": "N3",
    "pattern": "〜一方だ (ippou da)",
    "meaning": "tiếp tục -ing; ngày càng nhiều (thay đổi theo một hướng)",
    "formula": "Động từ thể từ điển (V-dict) + 一方だ",
    "note": "Thay đổi ổn định theo một hướng, thường (không phải luôn luôn) theo chiều hướng xấu hơn. Dùng với các động từ thay đổi như 増える, 減る, 上がる, 悪くなる.",
    "examples": [
      {
        "text": "この町[まち]の人口[じんこう]は、減[へ]る一方[いっぽう]だ。",
        "furigana": "この町[まち]の人口[じんこう]は、減[へ]る一方[いっぽう]だ。",
        "reading": "konomachinojinkouha、heruippouda。",
        "translation": "Dân số của thị trấn này đang giảm dần."
      },
      {
        "text": "物価[ぶっか]は上[あ]がる一方[いっぽう]なのに、給料[きゅうりょう]は全然[ぜんぜん]上[あ]がらない。",
        "furigana": "物価[ぶっか]は上[あ]がる一方[いっぽう]なのに、給料[きゅうりょう]は全然[ぜんぜん]上[あ]がらない。",
        "reading": "bukkahaagaruippounanoni、kyuuryouhazenzenagaranai。",
        "translation": "Giá cả đang tăng lên nhưng tiền lương lại không tăng chút nào."
      },
      {
        "text": "勉強[べんきょう]をさぼっていたら、成績[せいせき]は下[さ]がる一方[いっぽう]だった。",
        "furigana": "勉強[べんきょう]をさぼっていたら、成績[せいせき]は下[さ]がる一方[いっぽう]だった。",
        "reading": "benkyouosabotteitara、seisekihasagaruippoudatta。",
        "translation": "Nếu trốn học thì điểm số của tôi sẽ chỉ đi xuống mà thôi."
      }
    ]
  },
  {
    "id": "ja-g-n3-18-ippou-de",
    "language": "ja",
    "level": "N3",
    "pattern": "〜一方で (ippou de)",
    "meaning": "while; mặt khác; đồng thời",
    "formula": "Động từ thể thông thường (V thường) / Tính từ đuôi い (A-i) / Tính từ đuôi な (A-na) + な / Danh từ (N) + である + 一方で",
    "note": "Trình bày hai mặt của một sự vật hoặc hai hoạt động song song. So sánh 〜に対して, sự tương phản giữa hai chủ đề khác nhau.",
    "examples": [
      {
        "text": "インターネットは便利[べんり]な一方[いっぽう]で、危険[きけん]な面[めん]もある。",
        "furigana": "インターネットは便利[べんり]な一方[いっぽう]で、危険[きけん]な面[めん]もある。",
        "reading": "インターネットhabenrinaippoude、kikennamenmoaru。",
        "translation": "Internet tuy tiện lợi nhưng cũng có thể nguy hiểm."
      },
      {
        "text": "この会社[かいしゃ]は給料[きゅうりょう]が高[たか]い一方[いっぽう]で、休[やす]みがとても少[すく]ない。",
        "furigana": "この会社[かいしゃ]は給料[きゅうりょう]が高[たか]い一方[いっぽう]で、休[やす]みがとても少[すく]ない。",
        "reading": "konokaishahakyuuryougatakaiippoude、yasumigatotemosukunai。",
        "translation": "Công ty này lương cao nhưng ngày nghỉ lại rất ít."
      },
      {
        "text": "彼女[かのじょ]は会社[かいしゃ]で働[はたら]く一方[いっぽう]で、夜[よる]は大学院[だいがくいん]に通[かよ]っている。",
        "furigana": "彼女[かのじょ]は会社[かいしゃ]で働[はたら]く一方[いっぽう]で、夜[よる]は大学院[だいがくいん]に通[かよ]っている。",
        "reading": "kanojohakaishadehatarakuippoude、yoruhadaigakuinnikayotteiru。",
        "translation": "Vừa làm ở công ty vừa đi học cao học vào buổi tối."
      }
    ]
  },
  {
    "id": "ja-g-n3-19-ni-taishite",
    "language": "ja",
    "level": "N3",
    "pattern": "〜に対して (ni taishite)",
    "meaning": "hướng tới; chống lại; trái ngược với",
    "formula": "Danh từ (N) + に対して / Danh từ (N) + に対する + Danh từ (N) / Động từ thể thông thường (V thường) / Tính từ đuôi い (A-i) / Tính từ đuôi な (A-na) + な + のに対して",
    "note": "Đánh dấu mục tiêu của một hành động, thái độ hoặc cảm giác, hoặc đối chiếu hai sự vật. So sánh 〜について, đánh dấu chủ đề đang được thảo luận hơn là mục tiêu.",
    "examples": [
      {
        "text": "お客様[きゃくさま]に対[たい]して、そんな言[い]い方[かた]をしてはいけない。",
        "furigana": "お客様[きゃくさま]に対[たい]して、そんな言[い]い方[かた]をしてはいけない。",
        "reading": "okyakusamanitaishite、sonnaiikataoshitehaikenai。",
        "translation": "Đừng nói những điều như vậy với khách hàng."
      },
      {
        "text": "新[あたら]しい税金[ぜいきん]に対[たい]する反対[はんたい]の声[こえ]が高[たか]まっている。",
        "furigana": "新[あたら]しい税金[ぜいきん]に対[たい]する反対[はんたい]の声[こえ]が高[たか]まっている。",
        "reading": "atarashiizeikinnitaisuruhantainokoegatakamatteiru。",
        "translation": "Sự phản đối thuế mới ngày càng tăng."
      },
      {
        "text": "東京[とうきょう]は晴[は]れているのに対[たい]して、大阪[おおさか]は朝[あさ]から大雨[おおあめ]だ。",
        "furigana": "東京[とうきょう]は晴[は]れているのに対[たい]して、大阪[おおさか]は朝[あさ]から大雨[おおあめ]だ。",
        "reading": "toukyouhahareteirunonitaishite、oosakahaasakaraooameda。",
        "translation": "Tokyo nắng nhưng Osaka mưa to từ sáng."
      }
    ]
  },
  {
    "id": "ja-g-n3-20-ni-tsuite",
    "language": "ja",
    "level": "N3",
    "pattern": "〜について (ni tsuite)",
    "meaning": "về; liên quan đến; thậm chí liên quan đến",
    "formula": "Danh từ (N) + について / Danh từ (N) + についての + Danh từ (N)",
    "note": "Đánh dấu chủ đề nói, suy nghĩ hoặc nghiên cứu. Trang trọng hơn: 〜に関して. So sánh 〜に対して (mục tiêu của thái độ hoặc hành động).",
    "examples": [
      {
        "text": "今日[きょう]の授業[じゅぎょう]では、日本[にほん]の食[しょく]文化[ぶんか]について話[はな]し合[あ]いました。",
        "furigana": "今日[きょう]の授業[じゅぎょう]では、日本[にほん]の食[しょく]文化[ぶんか]について話[はな]し合[あ]いました。",
        "reading": "kyounojugyoudeha、nihonnoshokubunkanitsuitehanashiaimashita。",
        "translation": "Trong lớp hôm nay chúng ta đã thảo luận về văn hóa ẩm thực Nhật Bản."
      },
      {
        "text": "新[あたら]しい商品[しょうひん]についての質問[しつもん]は、こちらのメールアドレスまでお送[おく]りください。",
        "furigana": "新[あたら]しい商品[しょうひん]についての質問[しつもん]は、こちらのメールアドレスまでお送[おく]りください。",
        "reading": "atarashiishouhinnitsuitenoshitsumonha、kochiranoメールアドレスmadeookurikudasai。",
        "translation": "Mọi thắc mắc về sản phẩm mới vui lòng gửi tới địa chỉ email này."
      },
      {
        "text": "その事件[じけん]について、警察[けいさつ]はまだ何[なに]も発表[はっぴょう]していない。",
        "furigana": "その事件[じけん]について、警察[けいさつ]はまだ何[なに]も発表[はっぴょう]していない。",
        "reading": "sonojikennitsuite、keisatsuhamadananimohappyoushiteinai。",
        "translation": "Cảnh sát vẫn chưa đưa ra bất cứ thông tin gì về vụ việc."
      }
    ]
  },
  {
    "id": "ja-g-n3-21-ni-yotte-ni-yoru",
    "language": "ja",
    "level": "N3",
    "pattern": "〜によって / 〜による (ni yotte / ni yoru)",
    "meaning": "bởi (đại lý); bằng cách; bởi vì; tùy thuộc vào",
    "formula": "Danh từ (N) + によって / Danh từ (N) + による + Danh từ (N)",
    "note": "Công dụng: tác nhân của thể bị động (trang trọng, để tạo ra hoặc khám phá), nguyên nhân, phương tiện và 'thay đổi tùy theo'. 〜によっては = 'trong một số trường hợp, tùy thuộc vào'.",
    "examples": [
      {
        "text": "この橋[はし]は、有名[ゆうめい]な建築[けんちく]家[か]によって設計[せっけい]された。",
        "furigana": "この橋[はし]は、有名[ゆうめい]な建築[けんちく]家[か]によって設計[せっけい]された。",
        "reading": "konohashiha、yuumeinakenchikukaniyottesekkeisareta。",
        "translation": "Cây cầu này được thiết kế bởi một kiến ​​trúc sư nổi tiếng."
      },
      {
        "text": "台風[たいふう]による被害[ひがい]は、まだ正確[せいかく]には分[わ]かっていない。",
        "furigana": "台風[たいふう]による被害[ひがい]は、まだ正確[せいかく]には分[わ]かっていない。",
        "reading": "taifuuniyoruhigaiha、madaseikakunihawakatteinai。",
        "translation": "Hiện chưa rõ thiệt hại chính xác do bão gây ra."
      },
      {
        "text": "国[くに]によって、食事[しょくじ]のマナーはずいぶん違[ちが]う。",
        "furigana": "国[くに]によって、食事[しょくじ]のマナーはずいぶん違[ちが]う。",
        "reading": "kuniniyotte、shokujinoマナーhazuibunchigau。",
        "translation": "Nghi thức ăn uống rất khác nhau tùy theo quốc gia."
      }
    ]
  },
  {
    "id": "ja-g-n3-22-ni-yoru-to-ni-yoreba",
    "language": "ja",
    "level": "N3",
    "pattern": "〜によると / 〜によれば (ni yoru to / ni yoreba)",
    "meaning": "theo",
    "formula": "Danh từ (N) + によると / Danh từ (N) + によれば",
    "note": "Nêu tên nguồn thông tin. Câu thường kết thúc bằng cách diễn đạt tin đồn như 〜そうだ, 〜らしい hoặc 〜ということだ.",
    "examples": [
      {
        "text": "天気[てんき]予報[よほう]によると、週末[しゅうまつ]は大雪[おおゆき]になるそうだ。",
        "furigana": "天気[てんき]予報[よほう]によると、週末[しゅうまつ]は大雪[おおゆき]になるそうだ。",
        "reading": "tenkiyohouniyoruto、shuumatsuhaooyukininarusouda。",
        "translation": "Theo dự báo thời tiết thì cuối tuần sẽ có tuyết rơi dày đặc."
      },
      {
        "text": "ニュースによれば、事故[じこ]の原因[げんいん]はまだ分[わ]かっていないらしい。",
        "furigana": "ニュースによれば、事故[じこ]の原因[げんいん]はまだ分[わ]かっていないらしい。",
        "reading": "ニュースniyoreba、jikonogeninhamadawakatteinairashii。",
        "translation": "Theo tin tức, nguyên nhân vụ tai nạn vẫn chưa được xác định."
      },
      {
        "text": "姉[あね]の話[はなし]によると、あのレストランは予約[よやく]がないと入[はい]れないということだ。",
        "furigana": "姉[あね]の話[はなし]によると、あのレストランは予約[よやく]がないと入[はい]れないということだ。",
        "reading": "anenohanashiniyoruto、anoレストランhayoyakuganaitohairenaitoiukotoda。",
        "translation": "Theo chị tôi thì không thể vào nhà hàng đó nếu không đặt trước."
      }
    ]
  },
  {
    "id": "ja-g-n3-23-bakari-de-naku",
    "language": "ja",
    "level": "N3",
    "pattern": "〜ばかりでなく (bakari de naku)",
    "meaning": "không chỉ ... mà còn cả",
    "formula": "Động từ thể thông thường (V thường) / Tính từ đuôi い (A-i) / Tính từ đuôi な (A-na) + な / Danh từ (N) + ばかりでなく",
    "note": "Ý nghĩa tương tự như 〜だけでなく nhưng trang trọng hơn một chút. Phần thứ hai thường chứa も hoặc まで.",
    "examples": [
      {
        "text": "この映画[えいが]は子[こ]どもばかりでなく、大人[おとな]も楽[たの]しめる。",
        "furigana": "この映画[えいが]は子[こ]どもばかりでなく、大人[おとな]も楽[たの]しめる。",
        "reading": "konoeigahakodomobakaridenaku、otonamotanoshimeru。",
        "translation": "Phim này không chỉ trẻ em mà người lớn cũng có thể yêu thích."
      },
      {
        "text": "新[あたら]しいスマホは画面[がめん]が大[おお]きいばかりでなく、電池[でんち]も長持[ながも]ちする。",
        "furigana": "新[あたら]しいスマホは画面[がめん]が大[おお]きいばかりでなく、電池[でんち]も長持[ながも]ちする。",
        "reading": "atarashiiスマホhagamengaookiibakaridenaku、denchimonagamochisuru。",
        "translation": "Những chiếc smartphone mới không chỉ có màn hình lớn hơn mà còn có pin lâu hơn."
      },
      {
        "text": "運動[うんどう]は体[からだ]にいいばかりでなく、ストレスを減[へ]らす効果[こうか]もある。",
        "furigana": "運動[うんどう]は体[からだ]にいいばかりでなく、ストレスを減[へ]らす効果[こうか]もある。",
        "reading": "undouhakaradaniiibakaridenaku、ストレスoherasukoukamoaru。",
        "translation": "Tập thể dục không chỉ tốt cho cơ thể mà còn làm giảm căng thẳng."
      }
    ]
  },
  {
    "id": "ja-g-n3-24-dake-de-naku",
    "language": "ja",
    "level": "N3",
    "pattern": "〜だけでなく (dake de naku)",
    "meaning": "không chỉ ... mà còn cả",
    "formula": "Động từ thể thông thường (V thường) / Tính từ đuôi い (A-i) / Tính từ đuôi な (A-na) + な / Danh từ (N) + だけでなく",
    "note": "Phổ biến trong cả lời nói và văn viết. Bình thường: 〜だけじゃなくて. Ít trang trọng hơn 〜ばかりでなく.",
    "examples": [
      {
        "text": "この店[みせ]は料理[りょうり]がおいしいだけでなく、値段[ねだん]も安[やす]い。",
        "furigana": "この店[みせ]は料理[りょうり]がおいしいだけでなく、値段[ねだん]も安[やす]い。",
        "reading": "konomiseharyourigaoishiidakedenaku、nedanmoyasui。",
        "translation": "Đồ ăn ở nhà hàng này không chỉ ngon mà giá cả cũng rẻ."
      },
      {
        "text": "地震[じしん]の後[あと]、水[みず]だけでなく電気[でんき]も止[と]まってしまった。",
        "furigana": "地震[じしん]の後[あと]、水[みず]だけでなく電気[でんき]も止[と]まってしまった。",
        "reading": "jishinnoato、mizudakedenakudenkimotomatteshimatta。",
        "translation": "Sau trận động đất, không chỉ nước mà cả điện cũng ngừng hoạt động."
      },
      {
        "text": "彼女[かのじょ]は歌[うた]が上手[じょうず]なだけでなく、自分[じぶん]で曲[きょく]も作[つく]っている。",
        "furigana": "彼女[かのじょ]は歌[うた]が上手[じょうず]なだけでなく、自分[じぶん]で曲[きょく]も作[つく]っている。",
        "reading": "kanojohautagajouzunadakedenaku、jibundekyokumotsukutteiru。",
        "translation": "Cô ấy không chỉ hát hay mà còn viết nhạc cho riêng mình."
      }
    ]
  },
  {
    "id": "ja-g-n3-25-mo-ba-mo",
    "language": "ja",
    "level": "N3",
    "pattern": "〜も〜ば〜も (mo ... ba ... mo)",
    "meaning": "cả ... và ...; không chỉ ... mà còn",
    "formula": "Danh từ (N) + も + Verb-ba + Danh từ (N) + も / Danh từ (N) + も + Tính từ đuôi い (A-i) stem + ければ + Danh từ (N) + も",
    "note": "Liệt kê hai sự kiện cùng loại để nhấn mạnh; các cặp tương phản (いいときも悪いときも) rất phổ biến. So sánh 〜し, trong đó liệt kê lý do.",
    "examples": [
      {
        "text": "彼女[かのじょ]は歌[うた]も歌[うた]えば、ピアノも弾[ひ]く。",
        "furigana": "彼女[かのじょ]は歌[うた]も歌[うた]えば、ピアノも弾[ひ]く。",
        "reading": "kanojohautamoutaeba、ピアノmohiku。",
        "translation": "Cô ấy còn hát và chơi piano nữa."
      },
      {
        "text": "この町[まち]には、海[うみ]もあれば山[やま]もある。",
        "furigana": "この町[まち]には、海[うみ]もあれば山[やま]もある。",
        "reading": "konomachiniha、umimoarebayamamoaru。",
        "translation": "Thị trấn này có cả biển và núi."
      },
      {
        "text": "人生[じんせい]には、いいときもあれば悪[わる]いときもある。",
        "furigana": "人生[じんせい]には、いいときもあれば悪[わる]いときもある。",
        "reading": "jinseiniha、iitokimoarebawaruitokimoaru。",
        "translation": "Trong cuộc sống có lúc vui lúc buồn."
      }
    ]
  },
  {
    "id": "ja-g-n3-26-rashii-typical-of",
    "language": "ja",
    "level": "N3",
    "pattern": "〜らしい（typical of） (rashii (typical of))",
    "meaning": "điển hình của; phù hợp; thực sự thích",
    "formula": "Danh từ (N) + らしい",
    "note": "Có những phẩm chất mà bạn mong đợi ở danh từ. Phủ định: 〜らしくない ('không thích'). Khác với tin đồn 〜らしい (N4) và 〜っぽい (trông giống X nhưng không phải).",
    "examples": [
      {
        "text": "今日[きょう]は春[はる]らしい暖[あたた]かい一[いち]日[にち]だった。",
        "furigana": "今日[きょう]は春[はる]らしい暖[あたた]かい一[いち]日[にち]だった。",
        "reading": "kyouhaharurashiiatatakaiichinichidatta。",
        "translation": "Hôm nay là một ngày ấm áp như mùa xuân."
      },
      {
        "text": "文句[もんく]ばかり言[い]うなんて、君[きみ]らしくないね。",
        "furigana": "文句[もんく]ばかり言[い]うなんて、君[きみ]らしくないね。",
        "reading": "monkubakariiunante、kimirashikunaine。",
        "translation": "Không phải lúc nào bạn cũng phàn nàn đâu."
      },
      {
        "text": "もっと学生[がくせい]らしい服装[ふくそう]で来[き]てください。",
        "furigana": "もっと学生[がくせい]らしい服装[ふくそう]で来[き]てください。",
        "reading": "mottogakuseirashiifukusoudekitekudasai。",
        "translation": "Hãy ăn mặc giống học sinh hơn nhé."
      }
    ]
  },
  {
    "id": "ja-g-n3-27-ppoi",
    "language": "ja",
    "level": "N3",
    "pattern": "〜っぽい (ppoi)",
    "meaning": "-ish; -giống; có xu hướng (thông thường)",
    "formula": "Danh từ (N) / Động từ thể ます bỏ ます (V-masu) / Tính từ đuôi い (A-i) stem + っぽい",
    "note": "Danh từ + っぽい: trông giống X nhưng thực ra không phải (大人っぽい). Thân động từ + っぽい: có xu hướng (怒りっぽい). So sánh 〜らしい, có nghĩa là thực sự điển hình của X.",
    "examples": [
      {
        "text": "この服[ふく]はちょっと子[こ]どもっぽいから、別[べつ]のにしよう。",
        "furigana": "この服[ふく]はちょっと子[こ]どもっぽいから、別[べつ]のにしよう。",
        "reading": "konofukuhachottokodomoppoikara、betsunonishiyou。",
        "translation": "Bộ đồ này hơi trẻ con nên mình sẽ chọn bộ khác."
      },
      {
        "text": "最近[さいきん]忘[わす]れっぽくなって、困[こま]っている。",
        "furigana": "最近[さいきん]忘[わす]れっぽくなって、困[こま]っている。",
        "reading": "saikinwasureppokunatte、komatteiru。",
        "translation": "Gần đây tôi hay quên, điều này làm tôi khó chịu."
      },
      {
        "text": "あの白[しろ]っぽいビルが、新[あたら]しい市役所[しやくしょ]です。",
        "furigana": "あの白[しろ]っぽいビルが、新[あたら]しい市役所[しやくしょ]です。",
        "reading": "anoshiroppoiビルga、atarashiishiyakushodesu。",
        "translation": "Tòa nhà màu trắng đó là tòa thị chính mới."
      }
    ]
  },
  {
    "id": "ja-g-n3-28-teki",
    "language": "ja",
    "level": "N3",
    "pattern": "〜的 (teki)",
    "meaning": "-ic; -al; về mặt",
    "formula": "Danh từ (N) + 的な + Danh từ (N) / Danh từ (N) + 的に",
    "note": "Biến một danh từ (thường là kanji) thành tính từ na: 的な trước danh từ, 的に trước động từ và tính từ. Nhiều từ được học tốt nhất dưới dạng từ: 具体的, 基本的, 積極的.",
    "examples": [
      {
        "text": "日本[にほん]の伝統[でんとう]的[てき]な料理[りょうり]を食[た]べてみたい。",
        "furigana": "日本[にほん]の伝統[でんとう]的[てき]な料理[りょうり]を食[た]べてみたい。",
        "reading": "nihonnodentoutekinaryouriotabetemitai。",
        "translation": "Tôi muốn thử ẩm thực truyền thống của Nhật Bản."
      },
      {
        "text": "この問題[もんだい]は、経済[けいざい]的[てき]な理由[りゆう]で解決[かいけつ]が難[むずか]しい。",
        "furigana": "この問題[もんだい]は、経済[けいざい]的[てき]な理由[りゆう]で解決[かいけつ]が難[むずか]しい。",
        "reading": "konomondaiha、keizaitekinariyuudekaiketsugamuzukashii。",
        "translation": "Vấn đề này khó giải quyết vì lý do kinh tế."
      },
      {
        "text": "個人[こじん]的[てき]には、この案[あん]に賛成[さんせい]です。",
        "furigana": "個人[こじん]的[てき]には、この案[あん]に賛成[さんせい]です。",
        "reading": "kojintekiniha、konoannisanseidesu。",
        "translation": "Cá nhân tôi đồng ý với ý kiến ​​này."
      }
    ]
  },
  {
    "id": "ja-g-n3-29-you-na-you-ni-like",
    "language": "ja",
    "level": "N3",
    "pattern": "〜ような / 〜ように（like） (you na / you ni (like))",
    "meaning": "like; BẰNG; chẳng hạn như",
    "formula": "Động từ thể thông thường (V thường) / Danh từ (N) + の + ような / ように",
    "note": "ような đứng trước danh từ, ように đứng trước động từ và tính từ. AのようなB cũng có thể có nghĩa là 'B chẳng hạn như A'. Bình thường: 〜みたいな / 〜みたいに.",
    "examples": [
      {
        "text": "私[わたし]も、あなたのような優[やさ]しい看護[かんご]師[し]になりたいです。",
        "furigana": "私[わたし]も、あなたのような優[やさ]しい看護[かんご]師[し]になりたいです。",
        "reading": "watashimo、anatanoyounayasashiikangoshininaritaidesu。",
        "translation": "Em cũng muốn trở thành một y tá tốt bụng như chị."
      },
      {
        "text": "先生[せんせい]が言[い]ったように、この文法[ぶんぽう]はテストによく出[で]る。",
        "furigana": "先生[せんせい]が言[い]ったように、この文法[ぶんぽう]はテストによく出[で]る。",
        "reading": "senseigaittayouni、konobunpouhaテストniyokuderu。",
        "translation": "Như thầy đã nói, ngữ pháp này thường xuất hiện trong các bài kiểm tra."
      },
      {
        "text": "東京[とうきょう]のような大[おお]きな都市[とし]では、家賃[やちん]がとても高[たか]い。",
        "furigana": "東京[とうきょう]のような大[おお]きな都市[とし]では、家賃[やちん]がとても高[たか]い。",
        "reading": "toukyounoyounaookinatoshideha、yachingatotemotakai。",
        "translation": "Giá thuê rất đắt ở các thành phố lớn như Tokyo."
      }
    ]
  },
  {
    "id": "ja-g-n3-30-marude-you-da",
    "language": "ja",
    "level": "N3",
    "pattern": "まるで〜ようだ (marude ... you da)",
    "meaning": "giống như vậy; như thể",
    "formula": "まるで + Động từ thể thông thường (V thường) / Danh từ (N) + の + ようだ",
    "note": "まるで báo hiệu một sự so sánh mang tính biểu tượng: nó chỉ có vẻ như vậy thôi. Bình thường: まるで〜みたいだ. So sánh N2 〜かのようだ.",
    "examples": [
      {
        "text": "この部屋[へや]は広[ひろ]くて明[あか]るくて、まるでホテルのようだ。",
        "furigana": "この部屋[へや]は広[ひろ]くて明[あか]るくて、まるでホテルのようだ。",
        "reading": "konoheyahahirokuteakarukute、marudeホテルnoyouda。",
        "translation": "Căn phòng này rộng và sáng sủa, gần giống như một khách sạn."
      },
      {
        "text": "久[ひさ]しぶりに会[あ]った友達[ともだち]は、まるで別人[べつじん]のように変[か]わっていた。",
        "furigana": "久[ひさ]しぶりに会[あ]った友達[ともだち]は、まるで別人[べつじん]のように変[か]わっていた。",
        "reading": "hisashiburiniattatomodachiha、marudebetsujinnoyounikawatteita。",
        "translation": "Khi tôi gặp lại người bạn của mình lần đầu tiên sau một thời gian, anh ấy như một người hoàn toàn khác."
      },
      {
        "text": "三月[さんがつ]なのに、今日[きょう]はまるで真夏[まなつ]のように暑[あつ]い。",
        "furigana": "三月[さんがつ]なのに、今日[きょう]はまるで真夏[まなつ]のように暑[あつ]い。",
        "reading": "sangatsunanoni、kyouhamarudemanatsunoyouniatsui。",
        "translation": "Dù đang là tháng 3 nhưng hôm nay trời nóng như giữa hè."
      }
    ]
  },
  {
    "id": "ja-g-n3-31-ni-chigai-nai",
    "language": "ja",
    "level": "N3",
    "pattern": "〜に違いない (ni chigai nai)",
    "meaning": "phải có; chắc chắn ; chắc chắn là",
    "formula": "Động từ thể thông thường (V thường) / Tính từ đuôi い (A-i) / Tính từ đuôi な (A-na) / Danh từ (N) + に違いない",
    "note": "Niềm tin mạnh mẽ dựa trên bằng chứng hoặc trực giác; một giọng điệu hơi viết. So sánh 〜に決まっている, cái nào mang tính chủ quan và mang tính đối thoại hơn.",
    "examples": [
      {
        "text": "隣[となり]の家[いえ]は何[なん]日[にち]も電気[でんき]が消[き]えている。家族[かぞく]で旅行[りょこう]に出[で]かけたに違[ちが]いない。",
        "furigana": "隣[となり]の家[いえ]は何[なん]日[にち]も電気[でんき]が消[き]えている。家族[かぞく]で旅行[りょこう]に出[で]かけたに違[ちが]いない。",
        "reading": "tonarinoiehanannichimodenkigakieteiru。kazokuderyokounidekaketanichigainai。",
        "translation": "Nhà bên cạnh cúp điện mấy ngày rồi. Chắc hẳn gia đình đã đi du lịch."
      },
      {
        "text": "こんなに人[ひと]が並[なら]んでいるんだから、この店[みせ]のラーメンはおいしいに違[ちが]いない。",
        "furigana": "こんなに人[ひと]が並[なら]んでいるんだから、この店[みせ]のラーメンはおいしいに違[ちが]いない。",
        "reading": "konnanihitoganarandeirundakara、konomisenoラーメンhaoishiinichigainai。",
        "translation": "Ramen ở quán này chắc ngon lắm vì có rất nhiều người xếp hàng."
      },
      {
        "text": "この手紙[てがみ]の字[じ]は、父[ちち]の字[じ]に違[ちが]いない。",
        "furigana": "この手紙[てがみ]の字[じ]は、父[ちち]の字[じ]に違[ちが]いない。",
        "reading": "konotegaminojiha、chichinojinichigainai。",
        "translation": "Chữ viết trong bức thư này chắc chắn là của bố tôi."
      }
    ]
  },
  {
    "id": "ja-g-n3-32-ni-kimatte-iru",
    "language": "ja",
    "level": "N3",
    "pattern": "〜に決まっている (ni kimatte iru)",
    "meaning": "chắc chắn; bị ràng buộc; tất nhiên",
    "formula": "Động từ thể thông thường (V thường) / Tính từ đuôi い (A-i) / Tính từ đuôi な (A-na) / Danh từ (N) + に決まっている",
    "note": "Một phán đoán rất tự tin, chủ quan, thường gặp trong hội thoại (〜に決まってる). Quyết đoán hơn 〜に違いない và không phù hợp với cách viết trang trọng.",
    "examples": [
      {
        "text": "練習[れんしゅう]もしないで試合[しあい]に出[で]たら、負[ま]けるに決[き]まっている。",
        "furigana": "練習[れんしゅう]もしないで試合[しあい]に出[で]たら、負[ま]けるに決[き]まっている。",
        "reading": "renshuumoshinaideshiainidetara、makerunikimatteiru。",
        "translation": "Vào game mà không luyện tập thì chắc chắn sẽ thua."
      },
      {
        "text": "一人[ひとり]で富士山[ふじさん]に登[のぼ]るなんて、お母[かあ]さんが心配[しんぱい]するに決[き]まってるでしょう。",
        "furigana": "一人[ひとり]で富士山[ふじさん]に登[のぼ]るなんて、お母[かあ]さんが心配[しんぱい]するに決[き]まってるでしょう。",
        "reading": "hitoridefujisanninoborunante、okaasangashinpaisurunikimatterudeshou。",
        "translation": "Tôi chắc chắn mẹ bạn sẽ lo lắng về việc bạn một mình leo núi Phú Sĩ."
      },
      {
        "text": "そんなうまい話[はなし]、うそに決[き]まっているよ。",
        "furigana": "そんなうまい話[はなし]、うそに決[き]まっているよ。",
        "reading": "sonnaumaihanashi、usonikimatteiruyo。",
        "translation": "Đó là một câu chuyện hay nhưng chắc chắn là nói dối."
      }
    ]
  },
  {
    "id": "ja-g-n3-33-ki-ga-suru",
    "language": "ja",
    "level": "N3",
    "pattern": "〜気がする (ki ga suru)",
    "meaning": "có cảm giác rằng; cảm giác như",
    "formula": "Động từ thể thông thường (V thường) / Tính từ đuôi い (A-i) / Tính từ đuôi な (A-na) + な + 気がする / Động từ thể thông thường (V thường) / Danh từ (N) + の + ような + 気がする",
    "note": "Một ấn tượng trực quan, mơ hồ hơn là một phán đoán chắc chắn; ような気がする thậm chí còn nhẹ nhàng hơn. Khác với N4 〜がする (mùi, âm thanh hoặc vị).",
    "examples": [
      {
        "text": "この人[ひと]とは、どこかで会[あ]ったことがある気[き]がする。",
        "furigana": "この人[ひと]とは、どこかで会[あ]ったことがある気[き]がする。",
        "reading": "konohitotoha、dokokadeattakotogaarukigasuru。",
        "translation": "Tôi có cảm giác như đã gặp người này ở đâu rồi."
      },
      {
        "text": "今日[きょう]は何[なに]か、いいことがありそうな気[き]がする。",
        "furigana": "今日[きょう]は何[なに]か、いいことがありそうな気[き]がする。",
        "reading": "kyouhananika、iikotogaarisounakigasuru。",
        "translation": "Tôi cảm thấy hôm nay sẽ có điều gì đó tốt đẹp xảy ra."
      },
      {
        "text": "ドアの鍵[かぎ]をかけ忘[わす]れたような気[き]がして、家[いえ]に戻[もど]った。",
        "furigana": "ドアの鍵[かぎ]をかけ忘[わす]れたような気[き]がして、家[いえ]に戻[もど]った。",
        "reading": "ドアnokagiokakewasuretayounakigashite、ienimodotta。",
        "translation": "Tôi hình như quên khóa cửa nên quay vào nhà."
      }
    ]
  },
  {
    "id": "ja-g-n3-34-zu-ni",
    "language": "ja",
    "level": "N3",
    "pattern": "〜ずに (zu ni)",
    "meaning": "mà không làm",
    "formula": "Động từ thể ない (V-nai) stem + ずに",
    "note": "Trang trọng hơn, viết theo phong cách tương đương với 〜ないで. Bất quy tắc: する → せずに (không phải しずに), 来る → 来ずに (こずに).",
    "examples": [
      {
        "text": "けさは朝[あさ]ご飯[はん]を食[た]べずに家[いえ]を出[で]た。",
        "furigana": "けさは朝[あさ]ご飯[はん]を食[た]べずに家[いえ]を出[で]た。",
        "reading": "kesahaasagohanotabezuniieodeta。",
        "translation": "Kesa rời nhà mà không ăn sáng."
      },
      {
        "text": "辞書[じしょ]を使[つか]わずに、この新聞[しんぶん]記事[きじ]が読[よ]めますか。",
        "furigana": "辞書[じしょ]を使[つか]わずに、この新聞[しんぶん]記事[きじ]が読[よ]めますか。",
        "reading": "jishootsukawazuni、konoshinbunkijigayomemasuka。",
        "translation": "Bạn có thể đọc bài báo này mà không cần dùng từ điển không?"
      },
      {
        "text": "彼[かれ]は誰[だれ]にも相談[そうだん]せずに、会社[かいしゃ]を辞[や]めてしまった。",
        "furigana": "彼[かれ]は誰[だれ]にも相談[そうだん]せずに、会社[かいしゃ]を辞[や]めてしまった。",
        "reading": "karehadarenimosoudansezuni、kaishaoyameteshimatta。",
        "translation": "Anh ấy rời công ty mà không hỏi ý kiến ​​ai."
      }
    ]
  },
  {
    "id": "ja-g-n3-35-mama",
    "language": "ja",
    "level": "N3",
    "pattern": "〜まま (mama)",
    "meaning": "như nó vốn có; không thay đổi; trong khi vẫn (trong trạng thái)",
    "formula": "Động từ thể た (V-ta) / Động từ thể ない (V-nai) / Tính từ đuôi い (A-i) / Tính từ đuôi な (A-na) + な / Danh từ (N) + の + まま",
    "note": "Một thay đổi dự kiến ​​đã không xảy ra và trạng thái vẫn tiếp tục. Thường gợi ý điều gì đó bất thường hoặc không mong muốn (để đèn sáng, mang giày vào trong nhà).",
    "examples": [
      {
        "text": "エアコンをつけたまま寝[ね]てしまい、風邪[かぜ]をひいた。",
        "furigana": "エアコンをつけたまま寝[ね]てしまい、風邪[かぜ]をひいた。",
        "reading": "エアコンotsuketamamaneteshimai、kazeohiita。",
        "translation": "Tôi ngủ quên khi bật điều hòa và bị cảm lạnh."
      },
      {
        "text": "この町[まち]は、私[わたし]が子[こ]どもだったころのままだ。",
        "furigana": "この町[まち]は、私[わたし]が子[こ]どもだったころのままだ。",
        "reading": "konomachiha、watashigakodomodattakoronomamada。",
        "translation": "Thị trấn này vẫn giống như khi tôi còn nhỏ."
      },
      {
        "text": "靴[くつ]のまま部屋[へや]に入[はい]らないでください。",
        "furigana": "靴[くつ]のまま部屋[へや]に入[はい]らないでください。",
        "reading": "kutsunomamaheyanihairanaidekudasai。",
        "translation": "Vui lòng không mang giày vào phòng."
      }
    ]
  },
  {
    "id": "ja-g-n3-36-uchi-ni",
    "language": "ja",
    "level": "N3",
    "pattern": "〜うちに (uchi ni)",
    "meaning": "while (trước khi nó thay đổi); trước khi quá muộn; trong quá trình",
    "formula": "Động từ thể từ điển (V-dict) / Động từ thể て (V-te) + いる / Động từ thể ない (V-nai) / Tính từ đuôi い (A-i) / Tính từ đuôi な (A-na) + な / Danh từ (N) + の + うちに",
    "note": "Hãy làm điều gì đó khi điều kiện còn tồn tại, trước khi nó thay đổi; hoặc một sự thay đổi xảy ra mà không được chú ý trong một hoạt động. So sánh 〜間に, đánh dấu một khoảng thời gian cố định mà không có tính khẩn cấp.",
    "examples": [
      {
        "text": "若[わか]いうちに、いろいろな国[くに]を旅行[りょこう]したほうがいい。",
        "furigana": "若[わか]いうちに、いろいろな国[くに]を旅行[りょこう]したほうがいい。",
        "reading": "wakaiuchini、iroironakunioryokoushitahougaii。",
        "translation": "Sẽ tốt hơn nếu bạn đi du lịch đến nhiều quốc gia khi còn trẻ."
      },
      {
        "text": "スープが冷[さ]めないうちに、どうぞ召[め]し上[あ]がってください。",
        "furigana": "スープが冷[さ]めないうちに、どうぞ召[め]し上[あ]がってください。",
        "reading": "スープgasamenaiuchini、douzomeshiagattekudasai。",
        "translation": "Hãy thưởng thức món súp kẻo nguội nhé."
      },
      {
        "text": "音楽[おんがく]を聞[き]いているうちに、いつの間[ま]にか眠[ねむ]ってしまった。",
        "furigana": "音楽[おんがく]を聞[き]いているうちに、いつの間[ま]にか眠[ねむ]ってしまった。",
        "reading": "ongakuokiiteiruuchini、itsunomanikanemutteshimatta。",
        "translation": "Đang nghe nhạc thì tôi ngủ quên mất."
      }
    ]
  },
  {
    "id": "ja-g-n3-37-tokoro-ni-tokoro-e-tokoro-o",
    "language": "ja",
    "level": "N3",
    "pattern": "〜ところに / 〜ところへ / 〜ところを (tokoro ni / tokoro e / tokoro o)",
    "meaning": "đúng lúc; vào lúc này (ai đó đến hoặc có gì đó làm gián đoạn)",
    "formula": "Động từ thể từ điển (V-dict) / Động từ thể て (V-te) + いる / Động từ thể た (V-ta) + ところに / ところへ / ところを",
    "note": "ところに/へ: có chuyện gì đó xảy ra hoặc có người đến đúng lúc, thường làm gián đoạn. ところを: cảnh là tân ngữ của động từ như 見る, 見つかる, 助ける. Đặt cụm từ: お忙しいところを.",
    "examples": [
      {
        "text": "出[で]かけようとしているところに、友達[ともだち]から電話[でんわ]がかかってきた。",
        "furigana": "出[で]かけようとしているところに、友達[ともだち]から電話[でんわ]がかかってきた。",
        "reading": "dekakeyoutoshiteirutokoroni、tomodachikaradenwagakakattekita。",
        "translation": "Vừa định rời đi thì nhận được điện thoại của bạn tôi."
      },
      {
        "text": "みんなで君[きみ]の話[はなし]をしているところへ、ちょうど君[きみ]が来[き]た。",
        "furigana": "みんなで君[きみ]の話[はなし]をしているところへ、ちょうど君[きみ]が来[き]た。",
        "reading": "minnadekiminohanashioshiteirutokorohe、choudokimigakita。",
        "translation": "Mọi người đang nói về bạn và bạn vừa đến."
      },
      {
        "text": "授業[じゅぎょう]中[ちゅう]にスマホを見[み]ているところを、先生[せんせい]に見[み]られてしまった。",
        "furigana": "授業[じゅぎょう]中[ちゅう]にスマホを見[み]ているところを、先生[せんせい]に見[み]られてしまった。",
        "reading": "jugyouchuuniスマホomiteirutokoroo、senseinimirareteshimatta。",
        "translation": "Giáo viên của tôi bắt gặp tôi đang nhìn vào điện thoại thông minh trong giờ học."
      }
    ]
  },
  {
    "id": "ja-g-n3-38-ba-hodo",
    "language": "ja",
    "level": "N3",
    "pattern": "〜ば〜ほど (ba ... hodo)",
    "meaning": "càng... càng nhiều",
    "formula": "Verb-ba + Động từ thể từ điển (V-dict) + ほど / Tính từ đuôi い (A-i) stem + ければ + Tính từ đuôi い (A-i) + ほど / Tính từ đuôi な (A-na) + なら + Tính từ đuôi な (A-na) + な + ほど",
    "note": "Từ đó được lặp lại, đầu tiên ở dạng ば/なら, sau đó ở dạng thông thường. Phần đầu tiên có thể bỏ đi: 考えるほど分からなくなる.",
    "examples": [
      {
        "text": "日本語[にほんご]は、勉強[べんきょう]すればするほど面白[おもしろ]くなる。",
        "furigana": "日本語[にほんご]は、勉強[べんきょう]すればするほど面白[おもしろ]くなる。",
        "reading": "nihongoha、benkyousurebasuruhodoomoshirokunaru。",
        "translation": "Càng học tiếng Nhật càng thấy thú vị."
      },
      {
        "text": "スマホの画面[がめん]は大[おお]きければ大[おお]きいほど見[み]やすいが、持[も]ち歩[ある]くのは大変[たいへん]だ。",
        "furigana": "スマホの画面[がめん]は大[おお]きければ大[おお]きいほど見[み]やすいが、持[も]ち歩[ある]くのは大変[たいへん]だ。",
        "reading": "スマホnogamenhaookikerebaookiihodomiyasuiga、mochiarukunohataihenda。",
        "translation": "Màn hình smartphone càng lớn thì càng dễ nhìn nhưng lại khó mang theo."
      },
      {
        "text": "部屋[へや]が静[しず]かなら静[しず]かなほど、よく眠[ねむ]れる。",
        "furigana": "部屋[へや]が静[しず]かなら静[しず]かなほど、よく眠[ねむ]れる。",
        "reading": "heyagashizukanarashizukanahodo、yokunemureru。",
        "translation": "Phòng càng yên tĩnh thì càng ngủ ngon."
      }
    ]
  },
  {
    "id": "ja-g-n3-39-hodo",
    "language": "ja",
    "level": "N3",
    "pattern": "〜ほど (hodo)",
    "meaning": "đến mức đó; vì vậy ... tốt nhất là",
    "formula": "Động từ thể thông thường (V thường) / Tính từ đuôi い (A-i) / Tính từ đuôi な (A-na) + な / Danh từ (N) + ほど",
    "note": "Hiển thị mức độ với một ví dụ hoặc so sánh. Thường có thể hoán đổi với 〜くらい, nhưng ほど nghe trang trọng hơn và phù hợp với mức độ cao hơn; nó không thể đánh dấu một cái gì đó là tối thiểu.",
    "examples": [
      {
        "text": "昨日[きのう]は、立[た]っていられないほど疲[つか]れていた。",
        "furigana": "昨日[きのう]は、立[た]っていられないほど疲[つか]れていた。",
        "reading": "kinouha、tatteirarenaihodotsukareteita。",
        "translation": "Hôm qua tôi mệt quá không đứng nổi."
      },
      {
        "text": "試験[しけん]に合格[ごうかく]したと聞[き]いて、涙[なみだ]が出[で]るほどうれしかった。",
        "furigana": "試験[しけん]に合格[ごうかく]したと聞[き]いて、涙[なみだ]が出[で]るほどうれしかった。",
        "reading": "shikennigoukakushitatokiite、namidagaderuhodoureshikatta。",
        "translation": "Lúc nghe tin mình thi đậu, mình mừng đến phát khóc."
      },
      {
        "text": "このあたりは、夜[よる]になると怖[こわ]いほど静[しず]かだ。",
        "furigana": "このあたりは、夜[よる]になると怖[こわ]いほど静[しず]かだ。",
        "reading": "konoatariha、yoruninarutokowaihodoshizukada。",
        "translation": "Ở đây về đêm yên tĩnh đến đáng sợ."
      }
    ]
  },
  {
    "id": "ja-g-n3-40-kurai-gurai-extent",
    "language": "ja",
    "level": "N3",
    "pattern": "〜くらい / 〜ぐらい（extent） (kurai / gurai (extent))",
    "meaning": "đến mức đó; để có thể; ít nhất (điều gì đó tối thiểu)",
    "formula": "Động từ thể thông thường (V thường) / Tính từ đuôi い (A-i) / Tính từ đuôi な (A-na) + な / Danh từ (N) + くらい",
    "note": "Giống như 〜ほど, thể hiện mức độ. くらい cũng có thể đánh dấu một việc gì đó nhỏ nhặt hoặc dễ dàng ('ít nhất; một việc đơn giản như vậy'), cách sử dụng ほど không có.",
    "examples": [
      {
        "text": "おなかが痛[いた]くて、歩[ある]けないくらいだった。",
        "furigana": "おなかが痛[いた]くて、歩[ある]けないくらいだった。",
        "reading": "onakagaitakute、arukenaikuraidatta。",
        "translation": "Bụng tôi đau quá, đi không nổi."
      },
      {
        "text": "隣[となり]の部屋[へや]の音楽[おんがく]がうるさくて、自分[じぶん]の声[こえ]も聞[き]こえないぐらいだ。",
        "furigana": "隣[となり]の部屋[へや]の音楽[おんがく]がうるさくて、自分[じぶん]の声[こえ]も聞[き]こえないぐらいだ。",
        "reading": "tonarinoheyanoongakugaurusakute、jibunnokoemokikoenaiguraida。",
        "translation": "Tiếng nhạc ở phòng bên cạnh to đến mức tôi không thể nghe rõ."
      },
      {
        "text": "自分[じぶん]の部屋[へや]ぐらい、自分[じぶん]で掃除[そうじ]しなさい。",
        "furigana": "自分[じぶん]の部屋[へや]ぐらい、自分[じぶん]で掃除[そうじ]しなさい。",
        "reading": "jibunnoheyagurai、jibundesoujishinasai。",
        "translation": "Tự dọn phòng của mình."
      }
    ]
  },
  {
    "id": "ja-g-n3-41-sae",
    "language": "ja",
    "level": "N3",
    "pattern": "〜さえ (sae)",
    "meaning": "thậm chí",
    "formula": "Danh từ (N) + さえ / Danh từ (N) + でさえ / Danh từ (N) + にさえ",
    "note": "Đưa ra một ví dụ cực đoan, ngụ ý 'tất nhiên những người khác cũng vậy'. Trang trọng hơn 〜も hoặc 〜でも theo nghĩa này. Là chủ ngữ: 〜でさえ. So sánh N1 〜すら.",
    "examples": [
      {
        "text": "忙[いそが]しくて、昼[ひる]ご飯[はん]を食[た]べる時間[じかん]さえなかった。",
        "furigana": "忙[いそが]しくて、昼[ひる]ご飯[はん]を食[た]べる時間[じかん]さえなかった。",
        "reading": "isogashikute、hirugohanotaberujikansaenakatta。",
        "translation": "Tôi bận đến mức không có thời gian ăn trưa."
      },
      {
        "text": "こんな簡単[かんたん]な問題[もんだい]は、小学生[しょうがくせい]でさえ解[と]ける。",
        "furigana": "こんな簡単[かんたん]な問題[もんだい]は、小学生[しょうがくせい]でさえ解[と]ける。",
        "reading": "konnakantannamondaiha、shougakuseidesaetokeru。",
        "translation": "Ngay cả học sinh tiểu học cũng có thể giải được bài toán đơn giản như vậy."
      },
      {
        "text": "彼女[かのじょ]は親友[しんゆう]にさえ本当[ほんとう]のことを話[はな]さなかった。",
        "furigana": "彼女[かのじょ]は親友[しんゆう]にさえ本当[ほんとう]のことを話[はな]さなかった。",
        "reading": "kanojohashinyuunisaehontounokotoohanasanakatta。",
        "translation": "Cô ấy thậm chí còn không nói sự thật với người bạn thân nhất của mình."
      }
    ]
  },
  {
    "id": "ja-g-n3-42-sae-ba",
    "language": "ja",
    "level": "N3",
    "pattern": "〜さえ〜ば (sae ... ba)",
    "meaning": "nếu chỉ; chừng nào ; với điều kiện là",
    "formula": "Danh từ (N) + さえ + Verb-ba / Động từ thể ます bỏ ます (V-masu) + さえ + すれば / Động từ thể て (V-te) + さえ + いれば",
    "note": "Nhấn mạnh rằng chỉ riêng điều kiện này là đủ hoặc là điều kiện duy nhất còn thiếu.",
    "examples": [
      {
        "text": "このアプリさえあれば、どこでも日本語[にほんご]の勉強[べんきょう]ができる。",
        "furigana": "このアプリさえあれば、どこでも日本語[にほんご]の勉強[べんきょう]ができる。",
        "reading": "konoアプリsaeareba、dokodemonihongonobenkyougadekiru。",
        "translation": "Chỉ cần có ứng dụng này là bạn có thể học tiếng Nhật ở bất cứ đâu."
      },
      {
        "text": "時間[じかん]さえあれば、もっと旅行[りょこう]に行[い]きたいんですが。",
        "furigana": "時間[じかん]さえあれば、もっと旅行[りょこう]に行[い]きたいんですが。",
        "reading": "jikansaeareba、mottoryokouniikitaindesuga。",
        "translation": "Nếu có thời gian, tôi muốn đi du lịch nhiều hơn."
      },
      {
        "text": "薬[くすり]を飲[の]んで寝[ね]てさえいれば、すぐに治[なお]りますよ。",
        "furigana": "薬[くすり]を飲[の]んで寝[ね]てさえいれば、すぐに治[なお]りますよ。",
        "reading": "kusurionondenetesaeireba、suguninaorimasuyo。",
        "translation": "Chỉ cần bạn uống thuốc và ngủ một giấc là sẽ ổn thôi."
      }
    ]
  },
  {
    "id": "ja-g-n3-43-koso",
    "language": "ja",
    "level": "N3",
    "pattern": "〜こそ (koso)",
    "meaning": "; nó là... cái đó; (nhấn mạnh)",
    "formula": "Danh từ (N) + こそ",
    "note": "Chọn ra một điều là điều quan trọng nhất. こちらこそ là một câu trả lời cố định: 'cảm ơn/niềm vui là của tôi'. Các dạng N2 liên quan: 〜からこそ, 〜てこそ.",
    "examples": [
      {
        "text": "「いつもありがとう。」「いえ、こちらこそ。」",
        "furigana": "「いつもありがとう。」「いえ、こちらこそ。」",
        "reading": "「itsumoarigatou。」「ie、kochirakoso。」",
        "translation": "\"Cảm ơn vì tất cả.\" \"Không, cảm ơn.\""
      },
      {
        "text": "今年[ことし]こそ、たばこをやめるつもりだ。",
        "furigana": "今年[ことし]こそ、たばこをやめるつもりだ。",
        "reading": "kotoshikoso、tabakooyamerutsumorida。",
        "translation": "Tôi đang có ý định bỏ thuốc lá trong năm nay."
      },
      {
        "text": "毎日[まいにち]の小[ちい]さな努力[どりょく]こそが、大[おお]きな成功[せいこう]につながる。",
        "furigana": "毎日[まいにち]の小[ちい]さな努力[どりょく]こそが、大[おお]きな成功[せいこう]につながる。",
        "reading": "mainichinochiisanadoryokukosoga、ookinaseikounitsunagaru。",
        "translation": "Những nỗ lực nhỏ hàng ngày sẽ dẫn đến thành công lớn."
      }
    ]
  },
  {
    "id": "ja-g-n3-44-to-shite",
    "language": "ja",
    "level": "N3",
    "pattern": "〜として (to shite)",
    "meaning": "là; trong vai trò hoặc năng lực của",
    "formula": "Danh từ (N) + として / Danh từ (N) + としての + Danh từ (N)",
    "note": "Nêu rõ vai trò, trạng thái hoặc danh mục. So sánh 〜にとって, thể hiện sự phán xét được đưa ra từ quan điểm của ai.",
    "examples": [
      {
        "text": "兄[あに]は、エンジニアとしてアメリカの会社[かいしゃ]で働[はたら]いている。",
        "furigana": "兄[あに]は、エンジニアとしてアメリカの会社[かいしゃ]で働[はたら]いている。",
        "reading": "aniha、エンジニアtoshiteアメリカnokaishadehataraiteiru。",
        "translation": "Anh trai tôi làm kỹ sư tại một công ty của Mỹ."
      },
      {
        "text": "この町[まち]は、温泉[おんせん]地[ち]として有名[ゆうめい]です。",
        "furigana": "この町[まち]は、温泉[おんせん]地[ち]として有名[ゆうめい]です。",
        "reading": "konomachiha、onsenchitoshiteyuumeidesu。",
        "translation": "Thị trấn này nổi tiếng với suối nước nóng."
      },
      {
        "text": "社会[しゃかい]人[じん]としての責任[せきにん]を持[も]って行動[こうどう]してください。",
        "furigana": "社会[しゃかい]人[じん]としての責任[せきにん]を持[も]って行動[こうどう]してください。",
        "reading": "shakaijintoshitenosekininomottekoudoushitekudasai。",
        "translation": "Hãy hành động có trách nhiệm với tư cách là một thành viên của xã hội."
      }
    ]
  },
  {
    "id": "ja-g-n3-45-ni-totte",
    "language": "ja",
    "level": "N3",
    "pattern": "〜にとって (ni totte)",
    "meaning": "cho; đến (từ quan điểm của)",
    "formula": "Danh từ (N) + にとって / Danh từ (N) + にとっての + Danh từ (N)",
    "note": "Tiếp theo là sự đánh giá (大切だ, 難しい, 便利だ). Không dùng cho hành động hay thái độ đối với ai đó; sử dụng 〜に対して cho những điều đó.",
    "examples": [
      {
        "text": "私[わたし]にとって、家族[かぞく]は何[なに]よりも大切[たいせつ]なものです。",
        "furigana": "私[わたし]にとって、家族[かぞく]は何[なに]よりも大切[たいせつ]なものです。",
        "reading": "watashinitotte、kazokuhananiyorimotaisetsunamonodesu。",
        "translation": "Gia đình là điều quan trọng nhất với tôi."
      },
      {
        "text": "このあたりの坂道[さかみち]は、お年寄[としよ]りにとってはかなり大変[たいへん]だ。",
        "furigana": "このあたりの坂道[さかみち]は、お年寄[としよ]りにとってはかなり大変[たいへん]だ。",
        "reading": "konoatarinosakamichiha、otoshiyorinitottehakanaritaihenda。",
        "translation": "Những con dốc quanh đây khá khó khăn với người già."
      },
      {
        "text": "留学[りゅうがく]は、彼[かれ]にとっていい経験[けいけん]になったようだ。",
        "furigana": "留学[りゅうがく]は、彼[かれ]にとっていい経験[けいけん]になったようだ。",
        "reading": "ryuugakuha、karenitotteiikeikenninattayouda。",
        "translation": "Có vẻ như việc du học là một trải nghiệm thú vị đối với anh ấy."
      }
    ]
  },
  {
    "id": "ja-g-n3-46-ni-shite-wa",
    "language": "ja",
    "level": "N3",
    "pattern": "〜にしては (ni shite wa)",
    "meaning": "for (xem xét nó); bất ngờ cho",
    "formula": "Động từ thể thông thường (V thường) / Danh từ (N) + にしては",
    "note": "Kết quả khác với những gì bạn mong đợi ở X. Không theo sau tính từ; so sánh 〜わりに, có thể và tập trung vào mức độ (giá cả, độ tuổi, nỗ lực).",
    "examples": [
      {
        "text": "初[はじ]めて作[つく]ったにしては、このケーキはよくできている。",
        "furigana": "初[はじ]めて作[つく]ったにしては、このケーキはよくできている。",
        "reading": "hajimetetsukuttanishiteha、konoケーキhayokudekiteiru。",
        "translation": "Chiếc bánh này hóa ra rất ngon vì đây là lần đầu tiên tôi làm nó."
      },
      {
        "text": "彼[かれ]は小学生[しょうがくせい]にしては、ずいぶん難[むずか]しい言葉[ことば]を知[し]っている。",
        "furigana": "彼[かれ]は小学生[しょうがくせい]にしては、ずいぶん難[むずか]しい言葉[ことば]を知[し]っている。",
        "reading": "karehashougakuseinishiteha、zuibunmuzukashiikotobaoshitteiru。",
        "translation": "Anh ấy biết một số từ rất khó đối với một học sinh tiểu học."
      },
      {
        "text": "十月[じゅうがつ]にしては、今日[きょう]はずいぶん暑[あつ]いね。",
        "furigana": "十月[じゅうがつ]にしては、今日[きょう]はずいぶん暑[あつ]いね。",
        "reading": "juugatsunishiteha、kyouhazuibunatsuine。",
        "translation": "Hôm nay trời khá nóng trong tháng 10."
      }
    ]
  },
  {
    "id": "ja-g-n3-47-ni-shite-mo",
    "language": "ja",
    "level": "N3",
    "pattern": "〜にしても (ni shite mo)",
    "meaning": "ngay cả khi; thậm chí còn xem xét; cấp điều đó",
    "formula": "Động từ thể thông thường (V thường) / Danh từ (N) + にしても",
    "note": "Chấp nhận một quan điểm và nói rằng điều đó không làm thay đổi quan điểm của người nói. Thường chấp nhận một sự thật; so sánh 〜としても, nó thuần túy mang tính giả thuyết hơn.",
    "examples": [
      {
        "text": "忙[いそが]しかったにしても、電話[でんわ]一本[いっぽん]ぐらいできたでしょう。",
        "furigana": "忙[いそが]しかったにしても、電話[でんわ]一本[いっぽん]ぐらいできたでしょう。",
        "reading": "isogashikattanishitemo、denwaipponguraidekitadeshou。",
        "translation": "Dù bận thì tôi cũng có thể gọi ít nhất một cuộc điện thoại."
      },
      {
        "text": "冗談[じょうだん]にしても、そんな言[い]い方[かた]はひどいよ。",
        "furigana": "冗談[じょうだん]にしても、そんな言[い]い方[かた]はひどいよ。",
        "reading": "joudannishitemo、sonnaiikatahahidoiyo。",
        "translation": "Đó là một điều khủng khiếp để nói, ngay cả khi đó là một trò đùa."
      },
      {
        "text": "引[ひ]っ越[こ]すにしても、来年[らいねん]の春[はる]以降[いこう]になると思[おも]います。",
        "furigana": "引[ひ]っ越[こ]すにしても、来年[らいねん]の春[はる]以降[いこう]になると思[おも]います。",
        "reading": "hikkosunishitemo、rainennoharuikouninarutoomoimasu。",
        "translation": "Dù có chuyển đi thì tôi nghĩ cũng phải sau mùa xuân năm sau."
      }
    ]
  },
  {
    "id": "ja-g-n3-48-ni-kanshite-ni-kansuru",
    "language": "ja",
    "level": "N3",
    "pattern": "〜に関して / 〜に関する (ni kanshite / ni kansuru)",
    "meaning": "liên quan; liên quan đến; liên quan đến",
    "formula": "Danh từ (N) + に関して / Danh từ (N) + に関する + Danh từ (N)",
    "note": "Trang trọng hơn 〜について; phổ biến trong kinh doanh, tin tức và văn bản. Trước danh từ, dùng に関する (hoặc に関しての).",
    "examples": [
      {
        "text": "新[あたら]しいサービスに関[かん]してご質問[しつもん]がある方[かた]は、受付[うけつけ]までどうぞ。",
        "furigana": "新[あたら]しいサービスに関[かん]してご質問[しつもん]がある方[かた]は、受付[うけつけ]までどうぞ。",
        "reading": "atarashiiサービスnikanshitegoshitsumongaarukataha、uketsukemadedouzo。",
        "translation": "Nếu bạn có thắc mắc về dịch vụ mới, vui lòng liên hệ lễ tân."
      },
      {
        "text": "彼[かれ]は日本[にほん]の歴史[れきし]に関[かん]する本[ほん]をたくさん持[も]っている。",
        "furigana": "彼[かれ]は日本[にほん]の歴史[れきし]に関[かん]する本[ほん]をたくさん持[も]っている。",
        "reading": "karehanihonnorekishinikansuruhonotakusanmotteiru。",
        "translation": "Anh ấy có rất nhiều sách về lịch sử Nhật Bản."
      },
      {
        "text": "事故[じこ]の原因[げんいん]に関[かん]しては、現在[げんざい]調査[ちょうさ]中[ちゅう]です。",
        "furigana": "事故[じこ]の原因[げんいん]に関[かん]しては、現在[げんざい]調査[ちょうさ]中[ちゅう]です。",
        "reading": "jikonogeninnikanshiteha、genzaichousachuudesu。",
        "translation": "Nguyên nhân vụ tai nạn hiện đang được điều tra."
      }
    ]
  },
  {
    "id": "ja-g-n3-49-ni-kurabete",
    "language": "ja",
    "level": "N3",
    "pattern": "〜に比べて (ni kurabete)",
    "meaning": "so với; so với",
    "formula": "Danh từ (N) + に比べて / Động từ thể từ điển (V-dict) + のに比べて",
    "note": "Ngoài ra còn có 〜と比べて, 〜に比べると và 〜に比べれば. Đặt hai thứ cạnh nhau rõ ràng hơn 〜より.",
    "examples": [
      {
        "text": "今年[ことし]の夏[なつ]は、去年[きょねん]に比[くら]べてずいぶん涼[すず]しい。",
        "furigana": "今年[ことし]の夏[なつ]は、去年[きょねん]に比[くら]べてずいぶん涼[すず]しい。",
        "reading": "kotoshinonatsuha、kyonennikurabetezuibunsuzushii。",
        "translation": "Mùa hè năm nay mát hơn năm ngoái nhiều."
      },
      {
        "text": "都会[とかい]に比[くら]べて、田舎[いなか]は家賃[やちん]が安[やす]い。",
        "furigana": "都会[とかい]に比[くら]べて、田舎[いなか]は家賃[やちん]が安[やす]い。",
        "reading": "tokainikurabete、inakahayachingayasui。",
        "translation": "Giá thuê nhà ở nông thôn rẻ hơn ở thành phố."
      },
      {
        "text": "電車[でんしゃ]で行[い]くのに比[くら]べて、車[くるま]で行[い]くと三十分[さんじゅっぷん]ほど長[なが]くかかる。",
        "furigana": "電車[でんしゃ]で行[い]くのに比[くら]べて、車[くるま]で行[い]くと三十分[さんじゅっぷん]ほど長[なが]くかかる。",
        "reading": "denshadeikunonikurabete、kurumadeikutosanjuppunhodonagakukakaru。",
        "translation": "Đi bằng ô tô mất nhiều thời gian hơn khoảng 30 phút so với đi tàu."
      }
    ]
  },
  {
    "id": "ja-g-n3-50-ni-kawatte",
    "language": "ja",
    "level": "N3",
    "pattern": "〜に代わって (ni kawatte)",
    "meaning": "thay vì; thay mặt cho; thay thế",
    "formula": "Danh từ (N) + に代わって / Danh từ (N) + に代わり",
    "note": "Ai đó hành động vì người khác, hoặc một cái gì đó mới thay thế một cái gì đó cũ. Dạng viết: 〜に代わり. So sánh 〜代わりに (thay vì làm; đổi lấy).",
    "examples": [
      {
        "text": "入院[にゅういん]中[ちゅう]の社長[しゃちょう]に代[か]わって、副[ふく]社長[しゃちょう]があいさつをした。",
        "furigana": "入院[にゅういん]中[ちゅう]の社長[しゃちょう]に代[か]わって、副[ふく]社長[しゃちょう]があいさつをした。",
        "reading": "nyuuinchuunoshachounikawatte、fukushachougaaisatsuoshita。",
        "translation": "Phó chủ tịch thay mặt tổng thống đưa lời chào khi nhập viện."
      },
      {
        "text": "最近[さいきん]は、紙[かみ]の新聞[しんぶん]に代[か]わって、スマホでニュースを読[よ]む人[ひと]が増[ふ]えている。",
        "furigana": "最近[さいきん]は、紙[かみ]の新聞[しんぶん]に代[か]わって、スマホでニュースを読[よ]む人[ひと]が増[ふ]えている。",
        "reading": "saikinha、kaminoshinbunnikawatte、スマホdeニュースoyomuhitogafueteiru。",
        "translation": "Gần đây, ngày càng có nhiều người đọc tin tức trên điện thoại thông minh thay vì đọc báo giấy."
      },
      {
        "text": "父[ちち]に代[か]わって、私[わたし]が町内[ちょうない]会[かい]の会議[かいぎ]に出席[しゅっせき]しました。",
        "furigana": "父[ちち]に代[か]わって、私[わたし]が町内[ちょうない]会[かい]の会議[かいぎ]に出席[しゅっせき]しました。",
        "reading": "chichinikawatte、watashigachounaikainokaiginishussekishimashita。",
        "translation": "Tôi đã thay mặt bố tôi tham dự cuộc họp hội khu phố."
      }
    ]
  },
  {
    "id": "ja-g-n3-51-kawari-ni",
    "language": "ja",
    "level": "N3",
    "pattern": "〜代わりに (kawari ni)",
    "meaning": "thay vì; để đổi lấy; để bù đắp cho",
    "formula": "Động từ thể thông thường (V thường) / Tính từ đuôi い (A-i) / Tính từ đuôi な (A-na) + な / Danh từ (N) + の + 代わりに",
    "note": "Ba cách sử dụng: thay thế (thay vì), trao đổi (đổi lại) và bù đắp (một nhược điểm được cân bằng bởi một nhược điểm).",
    "examples": [
      {
        "text": "今日[きょう]は外[そと]で食[た]べる代[か]わりに、家[いえ]でカレーを作[つく]った。",
        "furigana": "今日[きょう]は外[そと]で食[た]べる代[か]わりに、家[いえ]でカレーを作[つく]った。",
        "reading": "kyouhasotodetaberukawarini、iedeカレーotsukutta。",
        "translation": "Hôm nay mình làm cà ri ở nhà thay vì đi ăn ngoài."
      },
      {
        "text": "友達[ともだち]に英語[えいご]を教[おし]える代[か]わりに、ギターを教[おし]えてもらっている。",
        "furigana": "友達[ともだち]に英語[えいご]を教[おし]える代[か]わりに、ギターを教[おし]えてもらっている。",
        "reading": "tomodachinieigoooshierukawarini、ギターooshietemoratteiru。",
        "translation": "Thay vì bạn tôi dạy tôi tiếng Anh, tôi nhờ anh ấy dạy tôi chơi guitar."
      },
      {
        "text": "このアパートは駅[えき]から遠[とお]い代[か]わりに、家賃[やちん]が安[やす]い。",
        "furigana": "このアパートは駅[えき]から遠[とお]い代[か]わりに、家賃[やちん]が安[やす]い。",
        "reading": "konoアパートhaekikaratooikawarini、yachingayasui。",
        "translation": "Căn hộ này tuy xa ga nhưng giá thuê lại rẻ."
      }
    ]
  },
  {
    "id": "ja-g-n3-52-ni-shitagatte",
    "language": "ja",
    "level": "N3",
    "pattern": "〜に従って (ni shitagatte)",
    "meaning": "theo quy định; tiếp theo; như ... (vì vậy ...)",
    "formula": "Danh từ (N) + に従って / Động từ thể từ điển (V-dict) + に従って",
    "note": "Với những danh từ như quy tắc hay chỉ dẫn: 'theo sau, tuân theo'. Với Verb-dict: thay đổi tỷ lệ như 〜につれて, với giọng trang trọng hơn.",
    "examples": [
      {
        "text": "係[かかり]の人[ひと]の指示[しじ]に従[したが]って、落[お]ち着[つ]いて避難[ひなん]してください。",
        "furigana": "係[かかり]の人[ひと]の指示[しじ]に従[したが]って、落[お]ち着[つ]いて避難[ひなん]してください。",
        "reading": "kakarinohitonoshijinishitagatte、ochitsuitehinanshitekudasai。",
        "translation": "Hãy làm theo hướng dẫn của người phụ trách và bình tĩnh sơ tán."
      },
      {
        "text": "高[たか]く登[のぼ]るに従[したが]って、気温[きおん]が下[さ]がっていった。",
        "furigana": "高[たか]く登[のぼ]るに従[したが]って、気温[きおん]が下[さ]がっていった。",
        "reading": "takakunoborunishitagatte、kiongasagatteitta。",
        "translation": "Nhiệt độ giảm dần khi chúng tôi leo lên cao hơn."
      },
      {
        "text": "町[まち]が大[おお]きくなるに従[したが]って、交通[こうつう]の問題[もんだい]も増[ふ]えてきた。",
        "furigana": "町[まち]が大[おお]きくなるに従[したが]って、交通[こうつう]の問題[もんだい]も増[ふ]えてきた。",
        "reading": "machigaookikunarunishitagatte、koutsuunomondaimofuetekita。",
        "translation": "Khi thị trấn phát triển, các vấn đề về giao thông cũng tăng theo."
      }
    ]
  },
  {
    "id": "ja-g-n3-53-ni-tsurete",
    "language": "ja",
    "level": "N3",
    "pattern": "〜につれて (ni tsurete)",
    "meaning": "vì (một điều thay đổi, một điều khác cũng thay đổi)",
    "formula": "Động từ thể từ điển (V-dict) / Danh từ (N) + につれて",
    "note": "Cả hai nửa đều mô tả sự thay đổi dần dần. Mệnh đề chính không thể là một yêu cầu hoặc ý định của người nói. Gần với 〜に従って và 〜とともに.",
    "examples": [
      {
        "text": "年[とし]をとるにつれて、朝[あさ]早[はや]く目[め]が覚[さ]めるようになった。",
        "furigana": "年[とし]をとるにつれて、朝[あさ]早[はや]く目[め]が覚[さ]めるようになった。",
        "reading": "toshiotorunitsurete、asahayakumegasameruyouninatta。",
        "translation": "Khi tôi lớn hơn, tôi bắt đầu dậy sớm hơn."
      },
      {
        "text": "日本[にほん]での生活[せいかつ]に慣[な]れるにつれて、友達[ともだち]も増[ふ]えていった。",
        "furigana": "日本[にほん]での生活[せいかつ]に慣[な]れるにつれて、友達[ともだち]も増[ふ]えていった。",
        "reading": "nihondenoseikatsuninarerunitsurete、tomodachimofueteitta。",
        "translation": "Khi đã quen với cuộc sống ở Nhật, tôi bắt đầu kết bạn nhiều hơn."
      },
      {
        "text": "時間[じかん]がたつにつれて、その事故[じこ]のことは忘[わす]れられていった。",
        "furigana": "時間[じかん]がたつにつれて、その事故[じこ]のことは忘[わす]れられていった。",
        "reading": "jikangatatsunitsurete、sonojikonokotohawasurerareteitta。",
        "translation": "Thời gian trôi qua, vụ tai nạn cũng bị lãng quên."
      }
    ]
  },
  {
    "id": "ja-g-n3-54-to-tomo-ni",
    "language": "ja",
    "level": "N3",
    "pattern": "〜とともに (to tomo ni)",
    "meaning": "cùng với; cùng với ; BẰNG; cùng lúc với",
    "formula": "Danh từ (N) + とともに / Động từ thể từ điển (V-dict) + とともに",
    "note": "Phiên bản chính thức của 〜と一緒に. Đồng thời đánh dấu các sự kiện xảy ra cùng lúc hoặc thay đổi tỷ lệ như 〜につれて.",
    "examples": [
      {
        "text": "社長[しゃちょう]は、社員[しゃいん]とともに新[あたら]しい工場[こうじょう]の完成[かんせい]を喜[よろこ]んだ。",
        "furigana": "社長[しゃちょう]は、社員[しゃいん]とともに新[あたら]しい工場[こうじょう]の完成[かんせい]を喜[よろこ]んだ。",
        "reading": "shachouha、shaintotomoniatarashiikoujounokanseioyorokonda。",
        "translation": "Chủ tịch rất vui mừng với việc hoàn thành nhà máy mới cùng với các nhân viên của mình."
      },
      {
        "text": "経済[けいざい]の発展[はってん]とともに、人々[ひとびと]の生活[せいかつ]も大[おお]きく変[か]わった。",
        "furigana": "経済[けいざい]の発展[はってん]とともに、人々[ひとびと]の生活[せいかつ]も大[おお]きく変[か]わった。",
        "reading": "keizainohattentotomoni、hitobitonoseikatsumoookikukawatta。",
        "translation": "Cùng với sự phát triển kinh tế, đời sống người dân cũng có sự thay đổi đáng kể."
      },
      {
        "text": "ベルが鳴[な]るとともに、学生[がくせい]たちは教室[きょうしつ]を飛[と]び出[だ]した。",
        "furigana": "ベルが鳴[な]るとともに、学生[がくせい]たちは教室[きょうしつ]を飛[と]び出[だ]した。",
        "reading": "ベルganarutotomoni、gakuseitachihakyoushitsuotobidashita。",
        "translation": "Học sinh ùa ra khỏi lớp khi chuông reo."
      }
    ]
  },
  {
    "id": "ja-g-n3-55-tabi-ni",
    "language": "ja",
    "level": "N3",
    "pattern": "〜たびに (tabi ni)",
    "meaning": "mọi lúc; bất cứ khi nào",
    "formula": "Động từ thể từ điển (V-dict) / Danh từ (N) + の + たびに",
    "note": "Mỗi lần A xảy ra thì B cũng xảy ra. Nhấn mạnh hơn 〜と hoặc 〜ときはいつも.",
    "examples": [
      {
        "text": "この写真[しゃしん]を見[み]るたびに、大学[だいがく]時代[じだい]を思[おも]い出[だ]す。",
        "furigana": "この写真[しゃしん]を見[み]るたびに、大学[だいがく]時代[じだい]を思[おも]い出[だ]す。",
        "reading": "konoshashinomirutabini、daigakujidaioomoidasu。",
        "translation": "Mỗi lần nhìn ảnh này lại nhớ về thời đại học."
      },
      {
        "text": "姉[あね]は出張[しゅっちょう]のたびに、お土産[みやげ]を買[か]ってきてくれる。",
        "furigana": "姉[あね]は出張[しゅっちょう]のたびに、お土産[みやげ]を買[か]ってきてくれる。",
        "reading": "anehashucchounotabini、omiyageokattekitekureru。",
        "translation": "Mỗi lần tôi đi công tác chị đều mua quà lưu niệm cho tôi."
      },
      {
        "text": "この川[かわ]は、大雨[おおあめ]が降[ふ]るたびにあふれて、道[みち]が通[とお]れなくなる。",
        "furigana": "この川[かわ]は、大雨[おおあめ]が降[ふ]るたびにあふれて、道[みち]が通[とお]れなくなる。",
        "reading": "konokawaha、ooamegafurutabiniafurete、michigatoorenakunaru。",
        "translation": "Mỗi khi có mưa lớn, dòng sông này tràn bờ và không thể đi qua được."
      }
    ]
  },
  {
    "id": "ja-g-n3-56-goto-ni",
    "language": "ja",
    "level": "N3",
    "pattern": "〜ごとに (goto ni)",
    "meaning": "; mỗi; vào khoảng thời gian",
    "formula": "Danh từ (N) + ごとに / Động từ thể từ điển (V-dict) + ごとに",
    "note": "Lặp lại đều đặn hoặc lần lượt từng đơn vị. Với Verb-dict nó gần với 〜たびに. Cẩn thận: 一日ごとに = hàng ngày, nhưng 一日おきに (N4) = cách ngày.",
    "examples": [
      {
        "text": "このバスは十[じゅう]五[ご]分[ふん]ごとに出[で]ています。",
        "furigana": "このバスは十[じゅう]五[ご]分[ふん]ごとに出[で]ています。",
        "reading": "konoバスhajuugofungotonideteimasu。",
        "translation": "Xe buýt này khởi hành cứ mười lăm phút một lần."
      },
      {
        "text": "季節[きせつ]ごとに、店[みせ]の飾[かざ]りが変[か]わる。",
        "furigana": "季節[きせつ]ごとに、店[みせ]の飾[かざ]りが変[か]わる。",
        "reading": "kisetsugotoni、misenokazarigakawaru。",
        "translation": "Cách trang trí của cửa hàng thay đổi theo mùa."
      },
      {
        "text": "一回[いっかい]使[つか]うごとにポイントがたまるカードです。",
        "furigana": "一回[いっかい]使[つか]うごとにポイントがたまるカードです。",
        "reading": "ikkaitsukaugotoniポイントgatamaruカードdesu。",
        "translation": "Đây là thẻ giúp bạn kiếm được điểm mỗi khi sử dụng."
      }
    ]
  },
  {
    "id": "ja-g-n3-57-saichuu-ni",
    "language": "ja",
    "level": "N3",
    "pattern": "〜最中に (saichuu ni)",
    "meaning": "ngay giữa; while (bận với)",
    "formula": "Động từ thể て (V-te) + いる / Danh từ (N) + の + 最中に",
    "note": "Nhấn mạnh mức độ cao của một hoạt động, thường là khi có điều gì đó bất ngờ làm gián đoạn hoạt động đó. Mạnh hơn 〜中に hoặc 〜ている間に. Ngoài ra 〜最中だ.",
    "examples": [
      {
        "text": "大事[だいじ]な会議[かいぎ]の最中[さいちゅう]に、携帯[けいたい]電話[でんわ]が鳴[な]ってしまった。",
        "furigana": "大事[だいじ]な会議[かいぎ]の最中[さいちゅう]に、携帯[けいたい]電話[でんわ]が鳴[な]ってしまった。",
        "reading": "daijinakaiginosaichuuni、keitaidenwaganatteshimatta。",
        "translation": "Giữa cuộc họp quan trọng, điện thoại của tôi reo lên."
      },
      {
        "text": "料理[りょうり]をしている最中[さいちゅう]に、停電[ていでん]になった。",
        "furigana": "料理[りょうり]をしている最中[さいちゅう]に、停電[ていでん]になった。",
        "reading": "ryourioshiteirusaichuuni、teidenninatta。",
        "translation": "Đang nấu ăn thì mất điện."
      },
      {
        "text": "今[いま]、試験[しけん]の最中[さいちゅう]だから、廊下[ろうか]では静[しず]かにしてください。",
        "furigana": "今[いま]、試験[しけん]の最中[さいちゅう]だから、廊下[ろうか]では静[しず]かにしてください。",
        "reading": "ima、shikennosaichuudakara、roukadehashizukanishitekudasai。",
        "translation": "Xin hãy im lặng ở hành lang vì bài thi đang diễn ra."
      }
    ]
  },
  {
    "id": "ja-g-n3-58-tsuide-ni",
    "language": "ja",
    "level": "N3",
    "pattern": "〜ついでに (tsuide ni)",
    "meaning": "while (at it); nhân dịp; vì dù sao thì người ta cũng đang làm việc đó",
    "formula": "Động từ thể từ điển (V-dict) / Động từ thể た (V-ta) / Danh từ (N) + の + ついでに",
    "note": "Hành động chính vẫn xảy ra; cái thứ hai được thêm vào vì nó thuận tiện. So sánh N1 〜がてら.",
    "examples": [
      {
        "text": "郵便[ゆうびん]局[きょく]へ行[い]くついでに、この手紙[てがみ]も出[だ]してきてくれる？",
        "furigana": "郵便[ゆうびん]局[きょく]へ行[い]くついでに、この手紙[てがみ]も出[だ]してきてくれる？",
        "reading": "yuubinkyokuheikutsuideni、konotegamimodashitekitekureru？",
        "translation": "Bạn có thể vui lòng gửi cho tôi lá thư này khi bạn đến bưu điện được không?"
      },
      {
        "text": "京都[きょうと]へ出張[しゅっちょう]したついでに、昔[むかし]の友達[ともだち]に会[あ]ってきた。",
        "furigana": "京都[きょうと]へ出張[しゅっちょう]したついでに、昔[むかし]の友達[ともだち]に会[あ]ってきた。",
        "reading": "kyoutoheshucchoushitatsuideni、mukashinotomodachiniattekita。",
        "translation": "Khi đang đi công tác ở Kyoto, tôi gặp lại một người bạn cũ."
      },
      {
        "text": "買[か]い物[もの]のついでに、図書館[としょかん]に本[ほん]を返[かえ]した。",
        "furigana": "買[か]い物[もの]のついでに、図書館[としょかん]に本[ほん]を返[かえ]した。",
        "reading": "kaimononotsuideni、toshokannihonokaeshita。",
        "translation": "Trong lúc đi mua sắm, tôi đã trả sách cho thư viện."
      }
    ]
  },
  {
    "id": "ja-g-n3-59-okage-de",
    "language": "ja",
    "level": "N3",
    "pattern": "〜おかげで (okage de)",
    "meaning": "nhờ; vì (kết quả tốt)",
    "formula": "Động từ thể thông thường (V thường) / Tính từ đuôi い (A-i) / Tính từ đuôi な (A-na) + な / Danh từ (N) + の + おかげで",
    "note": "Nguyên nhân của một kết quả tốt đẹp, với một cảm giác biết ơn. Đôi khi được sử dụng một cách mỉa mai khi mang lại kết quả xấu (君のおかげで遅刻したよ). So sánh 〜せいで (đổ lỗi).",
    "examples": [
      {
        "text": "先輩[せんぱい]が手伝[てつだ]ってくれたおかげで、仕事[しごと]が早[はや]く終[お]わった。",
        "furigana": "先輩[せんぱい]が手伝[てつだ]ってくれたおかげで、仕事[しごと]が早[はや]く終[お]わった。",
        "reading": "senpaigatetsudattekuretaokagede、shigotogahayakuowatta。",
        "translation": "Nhờ sự giúp đỡ của tiền bối nên tôi đã hoàn thành công việc của mình một cách nhanh chóng."
      },
      {
        "text": "薬[くすり]が効[き]いたおかげで、熱[ねつ]が下[さ]がった。",
        "furigana": "薬[くすり]が効[き]いたおかげで、熱[ねつ]が下[さ]がった。",
        "reading": "kusurigakiitaokagede、netsugasagatta。",
        "translation": "Nhờ có thuốc mà cơn sốt của tôi đã giảm."
      },
      {
        "text": "駅[えき]が近[ちか]いおかげで、雨[あめ]の日[ひ]も楽[らく]に通勤[つうきん]できる。",
        "furigana": "駅[えき]が近[ちか]いおかげで、雨[あめ]の日[ひ]も楽[らく]に通勤[つうきん]できる。",
        "reading": "ekigachikaiokagede、amenohimorakunitsuukindekiru。",
        "translation": "Vì ga gần nên tôi có thể đi lại dễ dàng ngay cả trong những ngày mưa."
      }
    ]
  },
  {
    "id": "ja-g-n3-60-sei-de",
    "language": "ja",
    "level": "N3",
    "pattern": "〜せいで (sei de)",
    "meaning": "vì; do (kết quả xấu, đổ lỗi)",
    "formula": "Động từ thể thông thường (V thường) / Tính từ đuôi い (A-i) / Tính từ đuôi な (A-na) + な / Danh từ (N) + の + せいで",
    "note": "Nguyên nhân dẫn đến kết quả xấu, đổ lỗi. 〜のせいにする = 'đổ lỗi cho điều gì đó'. Cảm giác trái ngược với 〜おかげで.",
    "examples": [
      {
        "text": "電車[でんしゃ]が遅[おく]れたせいで、面接[めんせつ]に遅刻[ちこく]してしまった。",
        "furigana": "電車[でんしゃ]が遅[おく]れたせいで、面接[めんせつ]に遅刻[ちこく]してしまった。",
        "reading": "denshagaokuretaseide、mensetsunichikokushiteshimatta。",
        "translation": "Tôi đến phỏng vấn muộn vì tàu bị trễ."
      },
      {
        "text": "夜中[よなか]に犬[いぬ]がうるさかったせいで、ほとんど眠[ねむ]れなかった。",
        "furigana": "夜中[よなか]に犬[いぬ]がうるさかったせいで、ほとんど眠[ねむ]れなかった。",
        "reading": "yonakaniinugaurusakattaseide、hotondonemurenakatta。",
        "translation": "Tôi gần như không thể ngủ được vì con chó gây ra quá nhiều tiếng ồn trong đêm."
      },
      {
        "text": "私[わたし]が道[みち]を間違[まちが]えたせいで、みんなを待[ま]たせてしまった。",
        "furigana": "私[わたし]が道[みち]を間違[まちが]えたせいで、みんなを待[ま]たせてしまった。",
        "reading": "watashigamichiomachigaetaseide、minnaomataseteshimatta。",
        "translation": "Mình rẽ nhầm khiến mọi người phải chờ đợi."
      }
    ]
  },
  {
    "id": "ja-g-n3-61-ta-totan-ta-totan-ni",
    "language": "ja",
    "level": "N3",
    "pattern": "〜たとたん / 〜たとたんに (ta totan / ta totan ni)",
    "meaning": "thời điểm; giống như (điều gì đó bất ngờ xảy ra)",
    "formula": "Động từ thể た (V-ta) + とたん / とたんに",
    "note": "Sự kiện thứ hai xảy ra đột ngột và nằm ngoài tầm kiểm soát của người nói. Không được sử dụng cho các hành động, yêu cầu hoặc ý định đã được lên kế hoạch của người nói.",
    "examples": [
      {
        "text": "立[た]ち上[あ]がったとたんに、めまいがした。",
        "furigana": "立[た]ち上[あ]がったとたんに、めまいがした。",
        "reading": "tachiagattatotanni、memaigashita。",
        "translation": "Vừa đứng dậy đã thấy choáng váng."
      },
      {
        "text": "家[いえ]を出[で]たとたん、雨[あめ]が降[ふ]り出[だ]した。",
        "furigana": "家[いえ]を出[で]たとたん、雨[あめ]が降[ふ]り出[だ]した。",
        "reading": "ieodetatotan、amegafuridashita。",
        "translation": "Vừa ra khỏi nhà thì trời bắt đầu mưa."
      },
      {
        "text": "その歌手[かしゅ]がステージに現[あらわ]れたとたん、会場[かいじょう]から大[おお]きな拍手[はくしゅ]が起[お]こった。",
        "furigana": "その歌手[かしゅ]がステージに現[あらわ]れたとたん、会場[かいじょう]から大[おお]きな拍手[はくしゅ]が起[お]こった。",
        "reading": "sonokashugaステージniarawaretatotan、kaijoukaraookinahakushugaokotta。",
        "translation": "Ngay khi ca sĩ xuất hiện trên sân khấu, đã có một tràng pháo tay lớn từ khán phòng."
      }
    ]
  },
  {
    "id": "ja-g-n3-62-tara-ta",
    "language": "ja",
    "level": "N3",
    "pattern": "〜たら〜た (tara ... ta)",
    "meaning": "khi tôi làm A, (tôi thấy rằng) B; khi làm thì tôi phát hiện ra",
    "formula": "Động từ thể た (V-ta) + ら ... Động từ thể た (V-ta)",
    "note": "Sau một hành động, người nói nhận thấy hoặc phát hiện ra điều gì đó. Mệnh đề thứ hai là quá khứ và nằm ngoài tầm kiểm soát của người nói. 〜と〜た là từ viết tương đương hơn.",
    "examples": [
      {
        "text": "窓[まど]を開[あ]けたら、外[そと]は一[いち]面[めん]の雪[ゆき]だった。",
        "furigana": "窓[まど]を開[あ]けたら、外[そと]は一[いち]面[めん]の雪[ゆき]だった。",
        "reading": "madooaketara、sotohaichimennoyukidatta。",
        "translation": "Khi tôi mở cửa sổ ra, bên ngoài đã có một lớp tuyết dày."
      },
      {
        "text": "久[ひさ]しぶりに実家[じっか]に帰[かえ]ったら、近所[きんじょ]に大[おお]きなマンションが建[た]っていた。",
        "furigana": "久[ひさ]しぶりに実家[じっか]に帰[かえ]ったら、近所[きんじょ]に大[おお]きなマンションが建[た]っていた。",
        "reading": "hisashiburinijikkanikaettara、kinjoniookinaマンションgatatteita。",
        "translation": "Khi tôi trở về nhà bố mẹ tôi lần đầu tiên sau một thời gian dài, một tòa nhà chung cư lớn đã được xây dựng ở khu phố của tôi."
      },
      {
        "text": "かばんの中[なか]を探[さが]してみたら、なくしたと思[おも]っていた鍵[かぎ]が出[で]てきた。",
        "furigana": "かばんの中[なか]を探[さが]してみたら、なくしたと思[おも]っていた鍵[かぎ]が出[で]てきた。",
        "reading": "kabannonakaosagashitemitara、nakushitatoomotteitakagigadetekita。",
        "translation": "Khi lục túi xách, tôi tìm thấy chiếc chìa khóa mà tôi tưởng mình đã đánh mất."
      }
    ]
  },
  {
    "id": "ja-g-n3-63-tatte-datte",
    "language": "ja",
    "level": "N3",
    "pattern": "〜たって / 〜だって (tatte / datte)",
    "meaning": "ngay cả khi; bất kể (thông thường)",
    "formula": "Động từ thể た (V-ta) + って / Tính từ đuôi い (A-i)-ku + たって / Tính từ đuôi な (A-na) / Danh từ (N) + だって",
    "note": "Dạng thông tục của 〜ても / 〜でも, thường đi kèm với いくら hoặc từ để hỏi. だって cũng có nghĩa là 'vì' ở đầu câu và 'thậm chí' sau danh từ.",
    "examples": [
      {
        "text": "今[いま]から急[いそ]いだって、もう間[ま]に合[あ]わないよ。",
        "furigana": "今[いま]から急[いそ]いだって、もう間[ま]に合[あ]わないよ。",
        "reading": "imakaraisoidatte、moumaniawanaiyo。",
        "translation": "Dù bây giờ có vội lên thì cũng không kịp đâu."
      },
      {
        "text": "高[たか]くたって、欲[ほ]しいものは欲[ほ]しい。",
        "furigana": "高[たか]くたって、欲[ほ]しいものは欲[ほ]しい。",
        "reading": "takakutatte、hoshiimonohahoshii。",
        "translation": "Tôi muốn những gì tôi muốn ngay cả khi nó đắt tiền."
      },
      {
        "text": "いくら便利[べんり]だって、使[つか]い方[かた]が分[わ]からなければ意味[いみ]がない。",
        "furigana": "いくら便利[べんり]だって、使[つか]い方[かた]が分[わ]からなければ意味[いみ]がない。",
        "reading": "ikurabenridatte、tsukaikatagawakaranakerebaimiganai。",
        "translation": "Dù một thứ gì đó có tiện lợi đến đâu thì cũng sẽ vô nghĩa nếu bạn không biết cách sử dụng nó."
      }
    ]
  },
  {
    "id": "ja-g-n3-64-nai-koto-wa-nai",
    "language": "ja",
    "level": "N3",
    "pattern": "〜ないことはない (nai koto wa nai)",
    "meaning": "không phải vậy... không phải; có thể nếu cần thiết; không phải là không thể",
    "formula": "Động từ thể ない (V-nai) / Tính từ đuôi い (A-i)-ku + ない / Tính từ đuôi な (A-na) + でない + ことはない",
    "note": "Một sự phủ định kép đưa ra một tiếng 'có' do dự. Ngoài ra 〜ないこともない. Đừng nhầm lẫn với Động từ-dict + ことはない ('không cần đâu').",
    "examples": [
      {
        "text": "辛[から]い料理[りょうり]は食[た]べられないことはないけど、あまり好[す]きじゃない。",
        "furigana": "辛[から]い料理[りょうり]は食[た]べられないことはないけど、あまり好[す]きじゃない。",
        "reading": "karairyourihataberarenaikotohanaikedo、amarisukijanai。",
        "translation": "Không phải là tôi không ăn được cay mà là tôi không thích lắm."
      },
      {
        "text": "今[いま]から急[いそ]げば、間[ま]に合[あ]わないことはないと思[おも]う。",
        "furigana": "今[いま]から急[いそ]げば、間[ま]に合[あ]わないことはないと思[おも]う。",
        "reading": "imakaraisogeba、maniawanaikotohanaitoomou。",
        "translation": "Tôi không nghĩ bạn sẽ bỏ lỡ nó kịp thời nếu bạn nhanh lên."
      },
      {
        "text": "この服[ふく]、少[すこ]し派手[はで]だけど、似合[にあ]わないことはないよ。",
        "furigana": "この服[ふく]、少[すこ]し派手[はで]だけど、似合[にあ]わないことはないよ。",
        "reading": "konofuku、sukoshihadedakedo、niawanaikotohanaiyo。",
        "translation": "Bộ đồ này hơi lòe loẹt nhưng mình thấy không hợp chút nào."
      }
    ]
  },
  {
    "id": "ja-g-n3-65-te-shou-ga-nai-te-shikata-ga-nai",
    "language": "ja",
    "level": "N3",
    "pattern": "〜てしょうがない / 〜てしかたがない (te shou ga nai / te shikata ga nai)",
    "meaning": "cực kỳ; không thể giúp được (cảm giác); không chịu nổi",
    "formula": "Động từ thể て (V-te) / Tính từ đuôi い (A-i)-ku + て / Tính từ đuôi な (A-na) + で + しょうがない / しかたがない",
    "note": "Đối với những cảm giác và cảm giác mà người nói không thể kiểm soát được. しょうがない thì bình thường hơn. Không giống như 〜てたまらない, nó cũng có tác dụng với các động từ tự phát như 気になる hoặc 涙が出る.",
    "examples": [
      {
        "text": "昨日[きのう]あまり寝[ね]ていないので、眠[ねむ]くてしょうがない。",
        "furigana": "昨日[きのう]あまり寝[ね]ていないので、眠[ねむ]くてしょうがない。",
        "reading": "kinouamarineteinainode、nemukuteshouganai。",
        "translation": "Đêm qua tôi không ngủ được nhiều nên không khỏi buồn ngủ."
      },
      {
        "text": "来週[らいしゅう]の旅行[りょこう]が楽[たの]しみでしかたがない。",
        "furigana": "来週[らいしゅう]の旅行[りょこう]が楽[たの]しみでしかたがない。",
        "reading": "raishuunoryokougatanoshimideshikataganai。",
        "translation": "Không khỏi mong chờ chuyến đi tuần sau."
      },
      {
        "text": "一人暮[ひとりぐ]らしを始[はじ]めたばかりのころは、家族[かぞく]のことが気[き]になってしかたがなかった。",
        "furigana": "一人暮[ひとりぐ]らしを始[はじ]めたばかりのころは、家族[かぞく]のことが気[き]になってしかたがなかった。",
        "reading": "hitorigurashiohajimetabakarinokoroha、kazokunokotogakininatteshikataganakatta。",
        "translation": "Khi mới bắt đầu sống một mình, tôi không khỏi lo lắng cho gia đình mình."
      }
    ]
  },
  {
    "id": "ja-g-n3-66-te-tamaranai",
    "language": "ja",
    "level": "N3",
    "pattern": "〜てたまらない (te tamaranai)",
    "meaning": "không thể chịu nổi; sắp chết ; cực kỳ (cảm giác)",
    "formula": "Động từ thể て (V-te) / Tính từ đuôi い (A-i)-ku + て / Tính từ đuôi な (A-na) + で + たまらない",
    "note": "Cảm giác mạnh mẽ, trực tiếp hoặc cảm giác cơ thể; rất phổ biến với ham muốn (〜たくてたまらない). Không được sử dụng cho sự thật khách quan. So sánh 〜てしかたがない.",
    "examples": [
      {
        "text": "この部屋[へや]はエアコンがなくて、暑[あつ]くてたまらない。",
        "furigana": "この部屋[へや]はエアコンがなくて、暑[あつ]くてたまらない。",
        "reading": "konoheyahaエアコンganakute、atsukutetamaranai。",
        "translation": "Phòng này không có điều hòa nên nóng không chịu nổi."
      },
      {
        "text": "三[さん]年[ねん]ぶりに国[くに]の家族[かぞく]に会[あ]えるので、うれしくてたまらない。",
        "furigana": "三[さん]年[ねん]ぶりに国[くに]の家族[かぞく]に会[あ]えるので、うれしくてたまらない。",
        "reading": "sannenburinikuninokazokuniaerunode、ureshikutetamaranai。",
        "translation": "Tôi rất vui vì tôi sẽ có thể gặp gia đình mình ở đất nước mình lần đầu tiên sau ba năm."
      },
      {
        "text": "試合[しあい]に負[ま]けたのが悔[くや]しくてたまらなかった。",
        "furigana": "試合[しあい]に負[ま]けたのが悔[くや]しくてたまらなかった。",
        "reading": "shiainimaketanogakuyashikutetamaranakatta。",
        "translation": "Tôi rất thất vọng vì thua trận."
      }
    ]
  },
  {
    "id": "ja-g-n3-67-te-hajimete",
    "language": "ja",
    "level": "N3",
    "pattern": "〜てはじめて (te hajimete)",
    "meaning": "chỉ sau; phải đến khi",
    "formula": "Động từ thể て (V-te) + はじめて",
    "note": "Điều gì đó chỉ được nhận ra hoặc trở thành khả thi sau một trải nghiệm; thường theo sau là 分かる, 気づく hoặc 知る. Cũng được viết là 〜て初めて.",
    "examples": [
      {
        "text": "病気[びょうき]になってはじめて、健康[けんこう]のありがたさが分[わ]かった。",
        "furigana": "病気[びょうき]になってはじめて、健康[けんこう]のありがたさが分[わ]かった。",
        "reading": "byoukininattehajimete、kenkounoarigatasagawakatta。",
        "translation": "Phải đến khi bị bệnh tôi mới nhận ra giá trị của sức khỏe tốt."
      },
      {
        "text": "一人[ひとり]で暮[く]らしてはじめて、親[おや]の苦労[くろう]が分[わ]かった。",
        "furigana": "一人[ひとり]で暮[く]らしてはじめて、親[おや]の苦労[くろう]が分[わ]かった。",
        "reading": "hitoridekurashitehajimete、oyanokurougawakatta。",
        "translation": "Phải đến khi sống một mình tôi mới hiểu được những vất vả mà bố mẹ tôi đã phải trải qua."
      },
      {
        "text": "実際[じっさい]に使[つか]ってみてはじめて、この機械[きかい]の便利[べんり]さに気[き]づいた。",
        "furigana": "実際[じっさい]に使[つか]ってみてはじめて、この機械[きかい]の便利[べんり]さに気[き]づいた。",
        "reading": "jissainitsukattemitehajimete、konokikainobenrisanikizuita。",
        "translation": "Phải đến khi thực sự sử dụng tôi mới nhận ra chiếc máy này tiện lợi đến nhường nào."
      }
    ]
  },
  {
    "id": "ja-g-n3-68-te-bakari-iru",
    "language": "ja",
    "level": "N3",
    "pattern": "〜てばかりいる (te bakari iru)",
    "meaning": "không làm gì khác ngoài việc; tiếp tục làm (quan trọng)",
    "formula": "Động từ thể て (V-te) + ばかりいる",
    "note": "Một hành động lặp đi lặp lại hoặc liên tục, thường kèm theo sự chỉ trích hoặc không hài lòng. So sánh Danh từ N4 + ばかり (甘い物ばかり食べる).",
    "examples": [
      {
        "text": "弟[おとうと]は休[やす]みの日[ひ]、ゲームをしてばかりいる。",
        "furigana": "弟[おとうと]は休[やす]みの日[ひ]、ゲームをしてばかりいる。",
        "reading": "otoutohayasuminohi、ゲームoshitebakariiru。",
        "translation": "Em trai tôi luôn chơi game vào những ngày nghỉ."
      },
      {
        "text": "泣[な]いてばかりいないで、どうしたのか話[はな]してごらん。",
        "furigana": "泣[な]いてばかりいないで、どうしたのか話[はな]してごらん。",
        "reading": "naitebakariinaide、doushitanokahanashitegoran。",
        "translation": "Đừng chỉ khóc, hãy kể cho tôi nghe chuyện gì đã xảy ra."
      },
      {
        "text": "休[やす]みの間[あいだ]、寝[ね]てばかりいたら、かえって疲[つか]れてしまった。",
        "furigana": "休[やす]みの間[あいだ]、寝[ね]てばかりいたら、かえって疲[つか]れてしまった。",
        "reading": "yasuminoaida、netebakariitara、kaettetsukareteshimatta。",
        "translation": "Tôi đã ngủ suốt trong giờ nghỉ nhưng cuối cùng lại thấy mệt."
      }
    ]
  },
  {
    "id": "ja-g-n3-69-ba-ii",
    "language": "ja",
    "level": "N3",
    "pattern": "〜ばいい (ba ii)",
    "meaning": "nên; tất cả những gì bạn cần làm là; Tôi hy vọng (với のに/けど: Tôi ước)",
    "formula": "Verb-ba + いい / Tính từ đuôi い (A-i) stem + ければ + いい",
    "note": "Yêu cầu hoặc đưa ra lời khuyên (〜ばいいですか = 'tôi nên làm gì?'). 〜ばいいのに = 'Tôi ước gì'. 〜たらいい là từ gần đồng nghĩa; 〜ほうがいい nghe có vẻ kiên quyết hơn.",
    "examples": [
      {
        "text": "「この書類[しょるい]、どこに出[だ]せばいいですか。」「二[に]階[かい]の受付[うけつけ]に出[だ]してください。」",
        "furigana": "「この書類[しょるい]、どこに出[だ]せばいいですか。」「二[に]階[かい]の受付[うけつけ]に出[だ]してください。」",
        "reading": "「konoshorui、dokonidasebaiidesuka。」「nikainouketsukenidashitekudasai。」",
        "translation": "``Tôi nên nộp tài liệu này ở đâu?'' ``Xin vui lòng nộp nó tại quầy lễ tân trên tầng hai.''"
      },
      {
        "text": "分[わ]からないことがあったら、遠慮[えんりょ]しないで私[わたし]に聞[き]けばいいよ。",
        "furigana": "分[わ]からないことがあったら、遠慮[えんりょ]しないで私[わたし]に聞[き]けばいいよ。",
        "reading": "wakaranaikotogaattara、enryoshinaidewatashinikikebaiiyo。",
        "translation": "Nếu có gì không hiểu thì đừng ngại hỏi mình nhé."
      },
      {
        "text": "明日[あした]、雨[あめ]が降[ふ]らなければいいんだけど。",
        "furigana": "明日[あした]、雨[あめ]が降[ふ]らなければいいんだけど。",
        "reading": "ashita、amegafuranakerebaiindakedo。",
        "translation": "Mong ngày mai trời không mưa."
      }
    ]
  },
  {
    "id": "ja-g-n3-70-baai-wa",
    "language": "ja",
    "level": "N3",
    "pattern": "〜場合（は） (baai wa)",
    "meaning": "trong trường hợp; nếu như; trong trường hợp",
    "formula": "Động từ thể thông thường (V thường) / Tính từ đuôi い (A-i) / Tính từ đuôi な (A-na) + な / Danh từ (N) + の + 場合（は）",
    "note": "Điển hình của các hướng dẫn, quy tắc và thông báo về các tình huống có thể xảy ra. Không giống như 〜たら, nó không được sử dụng để kể lại một sự kiện xảy ra một lần trong quá khứ.",
    "examples": [
      {
        "text": "雨[あめ]の場合[ばあい]は、試合[しあい]は中止[ちゅうし]になります。",
        "furigana": "雨[あめ]の場合[ばあい]は、試合[しあい]は中止[ちゅうし]になります。",
        "reading": "amenobaaiha、shiaihachuushininarimasu。",
        "translation": "Trong trường hợp trời mưa, trò chơi sẽ bị hủy."
      },
      {
        "text": "カードをなくした場合[ばあい]は、すぐに銀行[ぎんこう]に連絡[れんらく]してください。",
        "furigana": "カードをなくした場合[ばあい]は、すぐに銀行[ぎんこう]に連絡[れんらく]してください。",
        "reading": "カードonakushitabaaiha、suguniginkounirenrakushitekudasai。",
        "translation": "Nếu bị mất thẻ hãy liên hệ ngay với ngân hàng của bạn."
      },
      {
        "text": "予約[よやく]の時間[じかん]に遅[おく]れる場合[ばあい]は、お電話[でんわ]でお知[し]らせください。",
        "furigana": "予約[よやく]の時間[じかん]に遅[おく]れる場合[ばあい]は、お電話[でんわ]でお知[し]らせください。",
        "reading": "yoyakunojikanniokurerubaaiha、odenwadeoshirasekudasai。",
        "translation": "Nếu bạn đến trễ cuộc hẹn, vui lòng thông báo cho chúng tôi qua điện thoại."
      }
    ]
  },
  {
    "id": "ja-g-n3-71-to-sureba-to-shitara",
    "language": "ja",
    "level": "N3",
    "pattern": "〜とすれば / 〜としたら (to sureba / to shitara)",
    "meaning": "if; giả sử điều đó ; giả sử",
    "formula": "Động từ thể thông thường (V thường) / Tính từ đuôi い (A-i) / Tính từ đuôi な (A-na) + だ / Danh từ (N) + だ + とすれば / としたら",
    "note": "Đặt ra một giả thuyết và xem xét những gì tiếp theo. Thường dùng với もし hoặc 仮に. としたら mang tính đàm thoại nhiều hơn; とすれば nghe giống lý luận logic hơn.",
    "examples": [
      {
        "text": "もし宝[たから]くじで一[いち]億[おく]円[えん]当[あ]たったとしたら、何[なに]に使[つか]いますか。",
        "furigana": "もし宝[たから]くじで一[いち]億[おく]円[えん]当[あ]たったとしたら、何[なに]に使[つか]いますか。",
        "reading": "moshitakarakujideichiokuenatattatoshitara、naninitsukaimasuka。",
        "translation": "Nếu bạn trúng xổ số 100 triệu yên, bạn sẽ tiêu số tiền đó vào việc gì?"
      },
      {
        "text": "今[いま]から出発[しゅっぱつ]するとすれば、向[む]こうに着[つ]くのは夜[よる]の九時[くじ]ごろになる。",
        "furigana": "今[いま]から出発[しゅっぱつ]するとすれば、向[む]こうに着[つ]くのは夜[よる]の九時[くじ]ごろになる。",
        "reading": "imakarashuppatsusurutosureba、mukounitsukunohayorunokujigoroninaru。",
        "translation": "Nếu chúng ta rời đi bây giờ, chúng ta sẽ đến đó vào khoảng chín giờ tối."
      },
      {
        "text": "彼[かれ]の話[はなし]が本当[ほんとう]だとしたら、大変[たいへん]なことになる。",
        "furigana": "彼[かれ]の話[はなし]が本当[ほんとう]だとしたら、大変[たいへん]なことになる。",
        "reading": "karenohanashigahontoudatoshitara、taihennakotoninaru。",
        "translation": "Nếu câu chuyện của anh ấy là sự thật thì sẽ là chuyện lớn."
      }
    ]
  },
  {
    "id": "ja-g-n3-72-to-shite-mo",
    "language": "ja",
    "level": "N3",
    "pattern": "〜としても (to shite mo)",
    "meaning": "ngay cả khi; thậm chí giả sử",
    "formula": "Động từ thể thông thường (V thường) / Tính từ đuôi い (A-i) / Tính từ đuôi な (A-na) + だ / Danh từ (N) + だ + としても",
    "note": "Nhượng bộ giả định: ngay cả khi giả sử A, B vẫn đúng. Nhiều giả thuyết hơn 〜ても; so sánh 〜にしても, thường chấp nhận một sự thật.",
    "examples": [
      {
        "text": "親[おや]に反対[はんたい]されたとしても、私[わたし]は留学[りゅうがく]するつもりだ。",
        "furigana": "親[おや]に反対[はんたい]されたとしても、私[わたし]は留学[りゅうがく]するつもりだ。",
        "reading": "oyanihantaisaretatoshitemo、watashiharyuugakusurutsumorida。",
        "translation": "Mình dự định đi du học dù bố mẹ có phản đối."
      },
      {
        "text": "今[いま]からタクシーに乗[の]ったとしても、九時[くじ]の飛行機[ひこうき]には間[ま]に合[あ]わないだろう。",
        "furigana": "今[いま]からタクシーに乗[の]ったとしても、九時[くじ]の飛行機[ひこうき]には間[ま]に合[あ]わないだろう。",
        "reading": "imakaraタクシーninottatoshitemo、kujinohikoukinihamaniawanaidarou。",
        "translation": "Kể cả bây giờ có bắt taxi thì tôi cũng không thể kịp chuyến bay lúc chín giờ."
      },
      {
        "text": "それが本当[ほんとう]だとしても、ほかの人[ひと]に話[はな]すべきではない。",
        "furigana": "それが本当[ほんとう]だとしても、ほかの人[ひと]に話[はな]すべきではない。",
        "reading": "soregahontoudatoshitemo、hokanohitonihanasubekidehanai。",
        "translation": "Cho dù đó là sự thật thì bạn cũng không nên nói cho người khác biết."
      }
    ]
  },
  {
    "id": "ja-g-n3-73-toka-hearsay",
    "language": "ja",
    "level": "N3",
    "pattern": "〜とか（hearsay） (toka (hearsay))",
    "meaning": "tôi đã nghe thấy điều gì đó như; rõ ràng là",
    "formula": "Câu + とか",
    "note": "Tin đồn mơ hồ; nhẹ nhàng hơn và ít chắc chắn hơn 〜そうだ. Thường là 〜とかいう話だ, 〜とか聞いた, hoặc 〜とかで (đưa ra lý do được báo cáo). Khác với việc liệt kê 〜とか〜とか.",
    "examples": [
      {
        "text": "駅前[えきまえ]の本屋[ほんや]、今月[こんげつ]で閉店[へいてん]するとか。寂[さび]しくなりますね。",
        "furigana": "駅前[えきまえ]の本屋[ほんや]、今月[こんげつ]で閉店[へいてん]するとか。寂[さび]しくなりますね。",
        "reading": "ekimaenohonya、kongetsudeheitensurutoka。sabishikunarimasune。",
        "translation": "Hiệu sách trước nhà ga sẽ đóng cửa trong tháng này. Tôi sẽ nhớ bạn."
      },
      {
        "text": "今年[ことし]の冬[ふゆ]は、例年[れいねん]より寒[さむ]くなるとかいう話[はなし]だよ。",
        "furigana": "今年[ことし]の冬[ふゆ]は、例年[れいねん]より寒[さむ]くなるとかいう話[はなし]だよ。",
        "reading": "kotoshinofuyuha、reinenyorisamukunarutokaiuhanashidayo。",
        "translation": "Mình nghe nói mùa đông năm nay sẽ lạnh hơn mọi khi."
      },
      {
        "text": "部長[ぶちょう]は今日[きょう]、熱[ねつ]があるとかで休[やす]んでいます。",
        "furigana": "部長[ぶちょう]は今日[きょう]、熱[ねつ]があるとかで休[やす]んでいます。",
        "reading": "buchouhakyou、netsugaarutokadeyasundeimasu。",
        "translation": "Hôm nay quản lý xin nghỉ vì bị sốt."
      }
    ]
  },
  {
    "id": "ja-g-n3-74-tte",
    "language": "ja",
    "level": "N3",
    "pattern": "〜って (tte)",
    "meaning": "(trích dẫn thông thường) nói rằng; Tôi đã nghe; như ;",
    "formula": "Câu + って / Danh từ (N) + って",
    "note": "Thay thế ngẫu nhiên cho と (trích dẫn), そうだ (tin đồn, thường là 〜んだって) và は (chủ đề, đặc biệt là 'X là gì?'). Phổ biến trong lời nói; tránh trong văn bản chính thức.",
    "examples": [
      {
        "text": "彼女[かのじょ]、今日[きょう]は来[こ]られないって。",
        "furigana": "彼女[かのじょ]、今日[きょう]は来[こ]られないって。",
        "reading": "kanojo、kyouhakorarenaitte。",
        "translation": "Cô ấy nói hôm nay cô ấy không thể đến được."
      },
      {
        "text": "駅前[えきまえ]に新[あたら]しいカフェができたんだって。行[い]ってみない？",
        "furigana": "駅前[えきまえ]に新[あたら]しいカフェができたんだって。行[い]ってみない？",
        "reading": "ekimaeniatarashiiカフェgadekitandatte。itteminai？",
        "translation": "Tôi nghe nói có một quán cà phê mới mở trước nhà ga. Bạn có muốn đi không?"
      },
      {
        "text": "「ふろしき」って何[なん]ですか。",
        "furigana": "「ふろしき」って何[なん]ですか。",
        "reading": "「furoshiki」ttenandesuka。",
        "translation": "\"furoshiki\" là gì?"
      }
    ]
  },
  {
    "id": "ja-g-n3-75-to-iu-koto-da",
    "language": "ja",
    "level": "N3",
    "pattern": "〜ということだ (to iu koto da)",
    "meaning": "tôi nghe nói vậy; nó có nghĩa là; nói cách khác",
    "formula": "Câu + ということだ",
    "note": "Hai cách sử dụng: báo cáo thông tin (trang trọng hơn 〜そうだ) và đưa ra kết luận ('vậy điều đó có nghĩa là ...'). Việc sử dụng kết thúc thường kết thúc bằng ということですね.",
    "examples": [
      {
        "text": "駅員[えきいん]さんの話[はなし]では、事故[じこ]のため電車[でんしゃ]は一[いち]時間[じかん]ほど止[と]まるということです。",
        "furigana": "駅員[えきいん]さんの話[はなし]では、事故[じこ]のため電車[でんしゃ]は一[いち]時間[じかん]ほど止[と]まるということです。",
        "reading": "ekiinsannohanashideha、jikonotamedenshahaichijikanhodotomarutoiukotodesu。",
        "translation": "Theo nhân viên nhà ga, tàu sẽ dừng khoảng 1 tiếng do xảy ra tai nạn."
      },
      {
        "text": "「申[もう]し込[こ]みは明日[あした]までです。」「じゃあ、今日中[きょうじゅう]に書類[しょるい]を準備[じゅんび]しなければならないということですね。」",
        "furigana": "「申[もう]し込[こ]みは明日[あした]までです。」「じゃあ、今日中[きょうじゅう]に書類[しょるい]を準備[じゅんび]しなければならないということですね。」",
        "reading": "「moushikomihaashitamadedesu。」「jaa、kyoujuunishoruiojunbishinakerebanaranaitoiukotodesune。」",
        "translation": "``Hạn nộp đơn vào ngày mai.'' ``Vậy thì hôm nay cậu phải chuẩn bị hồ sơ.''"
      },
      {
        "text": "全員[ぜんいん]が賛成[さんせい]したということは、この計画[けいかく]で進[すす]めてもいいということだ。",
        "furigana": "全員[ぜんいん]が賛成[さんせい]したということは、この計画[けいかく]で進[すす]めてもいいということだ。",
        "reading": "zeningasanseishitatoiukotoha、konokeikakudesusumetemoiitoiukotoda。",
        "translation": "Việc mọi người đều đồng ý có nghĩa là chúng ta có thể tiến hành kế hoạch này."
      }
    ]
  },
  {
    "id": "ja-g-n3-76-to-iu-no-wa",
    "language": "ja",
    "level": "N3",
    "pattern": "〜というのは (to iu no wa)",
    "meaning": "ý nghĩa của ... là; ... có nghĩa; lý do là",
    "formula": "Danh từ (N) / Câu + というのは",
    "note": "Giới thiệu một từ để định nghĩa hoặc một tình huống để nhận xét. Bình thường: 〜って. Khi bắt đầu câu, というのは giới thiệu lý do kết thúc bằng 〜からだ. Được viết: 〜とは.",
    "examples": [
      {
        "text": "「割[わ]り勘[かん]」というのは、食事[しょくじ]代[だい]などをみんなで同[おな]じ金額[きんがく]ずつ払[はら]うことです。",
        "furigana": "「割[わ]り勘[かん]」というのは、食事[しょくじ]代[だい]などをみんなで同[おな]じ金額[きんがく]ずつ払[はら]うことです。",
        "reading": "「warikan」toiunoha、shokujidainadoominnadeonajikingakuzutsuharaukotodesu。",
        "translation": "\"Chia hóa đơn\" có nghĩa là mọi người đều trả số tiền như nhau cho các bữa ăn, v.v."
      },
      {
        "text": "一人[ひとり]で海外[かいがい]に住[す]むというのは、思[おも]ったより大変[たいへん]なことだ。",
        "furigana": "一人[ひとり]で海外[かいがい]に住[す]むというのは、思[おも]ったより大変[たいへん]なことだ。",
        "reading": "hitoridekaigainisumutoiunoha、omottayoritaihennakotoda。",
        "translation": "Sống ở nước ngoài một mình khó khăn hơn tôi tưởng."
      },
      {
        "text": "来週[らいしゅう]の旅行[りょこう]には行[い]けなくなった。というのは、急[きゅう]に出張[しゅっちょう]が入[はい]ったからだ。",
        "furigana": "来週[らいしゅう]の旅行[りょこう]には行[い]けなくなった。というのは、急[きゅう]に出張[しゅっちょう]が入[はい]ったからだ。",
        "reading": "raishuunoryokounihaikenakunatta。toiunoha、kyuunishucchougahaittakarada。",
        "translation": "Tuần sau tôi không thể đi du lịch được. Đó là bởi vì tôi đột nhiên phải đi công tác."
      }
    ]
  },
  {
    "id": "ja-g-n3-77-to-iu-yori",
    "language": "ja",
    "level": "N3",
    "pattern": "〜というより (to iu yori)",
    "meaning": "chứ không phải; không nhiều A như B",
    "formula": "Động từ thể thông thường (V thường) / Tính từ đuôi い (A-i) / Tính từ đuôi な (A-na) / Danh từ (N) + というより",
    "note": "Sửa hoặc tinh chỉnh mô tả: mô tả thứ hai phù hợp hơn. Thường theo sau là むしろ.",
    "examples": [
      {
        "text": "今日[きょう]は涼[すず]しいというより、寒[さむ]いくらいだ。",
        "furigana": "今日[きょう]は涼[すず]しいというより、寒[さむ]いくらいだ。",
        "reading": "kyouhasuzushiitoiuyori、samuikuraida。",
        "translation": "Hôm nay trời có vẻ lạnh hơn là mát."
      },
      {
        "text": "彼女[かのじょ]は友達[ともだち]というより、家族[かぞく]のような存在[そんざい]だ。",
        "furigana": "彼女[かのじょ]は友達[ともだち]というより、家族[かぞく]のような存在[そんざい]だ。",
        "reading": "kanojohatomodachitoiuyori、kazokunoyounasonzaida。",
        "translation": "Cô ấy giống gia đình hơn là một người bạn."
      },
      {
        "text": "それは意見[いけん]というより、ただの文句[もんく]だよ。",
        "furigana": "それは意見[いけん]というより、ただの文句[もんく]だよ。",
        "reading": "sorehaikentoiuyori、tadanomonkudayo。",
        "translation": "Cái đó giống phàn nàn hơn là góp ý."
      }
    ]
  },
  {
    "id": "ja-g-n3-78-wari-ni-wari-ni-wa",
    "language": "ja",
    "level": "N3",
    "pattern": "〜わりに / 〜わりには (wari ni / wari ni wa)",
    "meaning": "; vì (ngạc nhiên thay)",
    "formula": "Động từ thể thông thường (V thường) / Tính từ đuôi い (A-i) / Tính từ đuôi な (A-na) + な / Danh từ (N) + の + わりに",
    "note": "Kết quả không khớp với mức độ bạn mong đợi từ A (giá, tuổi, nỗ lực). Có thể theo sau tính từ, không giống như 〜にしては.",
    "examples": [
      {
        "text": "この店[みせ]は値段[ねだん]のわりに、量[りょう]が多[おお]くておいしい。",
        "furigana": "この店[みせ]は値段[ねだん]のわりに、量[りょう]が多[おお]くておいしい。",
        "reading": "konomisehanedannowarini、ryougaookuteoishii。",
        "translation": "Nhà hàng này có rất nhiều đồ ăn so với mức giá và rất ngon."
      },
      {
        "text": "兄[あに]はよく食[た]べるわりには、全然[ぜんぜん]太[ふと]らない。",
        "furigana": "兄[あに]はよく食[た]べるわりには、全然[ぜんぜん]太[ふと]らない。",
        "reading": "anihayokutaberuwariniha、zenzenfutoranai。",
        "translation": "Mặc dù anh trai tôi ăn rất nhiều nhưng anh ấy không bao giờ tăng cân."
      },
      {
        "text": "このホテルは駅[えき]から近[ちか]いわりに、静[しず]かでよく眠[ねむ]れた。",
        "furigana": "このホテルは駅[えき]から近[ちか]いわりに、静[しず]かでよく眠[ねむ]れた。",
        "reading": "konoホテルhaekikarachikaiwarini、shizukadeyokunemureta。",
        "translation": "Mặc dù khách sạn này gần ga nhưng lại yên tĩnh và tôi ngủ rất ngon."
      }
    ]
  },
  {
    "id": "ja-g-n3-79-kuse-ni",
    "language": "ja",
    "level": "N3",
    "pattern": "〜くせに (kuse ni)",
    "meaning": "; bất chấp (chỉ trích, trách móc)",
    "formula": "Động từ thể thông thường (V thường) / Tính từ đuôi い (A-i) / Tính từ đuôi な (A-na) + な / Danh từ (N) + の + くせに",
    "note": "Giống như 〜のに, nhưng với sự khinh miệt hoặc trách móc đối với chủ ngữ. Cả hai mệnh đề đều có cùng một chủ đề; hiếm khi được sử dụng về bản thân. Bình thường.",
    "examples": [
      {
        "text": "自分[じぶん]では何[なに]もしないくせに、人[ひと]の仕事[しごと]には文句[もんく]ばかり言[い]う。",
        "furigana": "自分[じぶん]では何[なに]もしないくせに、人[ひと]の仕事[しごと]には文句[もんく]ばかり言[い]う。",
        "reading": "jibundehananimoshinaikuseni、hitonoshigotonihamonkubakariiu。",
        "translation": "Dù bản thân tôi không làm gì nhưng tôi luôn phàn nàn về việc làm của người khác."
      },
      {
        "text": "知[し]っているくせに、どうして教[おし]えてくれなかったの？",
        "furigana": "知[し]っているくせに、どうして教[おし]えてくれなかったの？",
        "reading": "shitteirukuseni、doushiteoshietekurenakattano？",
        "translation": "Nếu biết sao không nói cho tôi biết?"
      },
      {
        "text": "弟[おとうと]は体[からだ]が大[おお]きいくせに、小[ちい]さな虫[むし]をこわがる。",
        "furigana": "弟[おとうと]は体[からだ]が大[おお]きいくせに、小[ちい]さな虫[むし]をこわがる。",
        "reading": "otoutohakaradagaookiikuseni、chiisanamushiokowagaru。",
        "translation": "Em trai tôi tuy lớn nhưng lại sợ côn trùng nhỏ."
      }
    ]
  },
  {
    "id": "ja-g-n3-80-kara-ni-kakete",
    "language": "ja",
    "level": "N3",
    "pattern": "〜から〜にかけて (kara ... ni kakete)",
    "meaning": "từ ... đến; trên (một khoảng thời gian hoặc khu vực)",
    "formula": "Danh từ (N) + から + Danh từ (N) + にかけて",
    "note": "Một khoảng thời gian hoặc không gian gồ ghề có các cạnh không chính xác; phổ biến trong các bản tin thời tiết. So sánh 〜から〜まで, đánh dấu điểm bắt đầu và điểm kết thúc rõ ràng.",
    "examples": [
      {
        "text": "今夜[こんや]から明日[あした]の朝[あさ]にかけて、強[つよ]い雨[あめ]が降[ふ]るでしょう。",
        "furigana": "今夜[こんや]から明日[あした]の朝[あさ]にかけて、強[つよ]い雨[あめ]が降[ふ]るでしょう。",
        "reading": "konyakaraashitanoasanikakete、tsuyoiamegafurudeshou。",
        "translation": "Dự kiến ​​từ tối nay đến sáng mai sẽ có mưa lớn."
      },
      {
        "text": "関東[かんとう]から東北[とうほく]にかけての広[ひろ]い地域[ちいき]で、強[つよ]い揺[ゆ]れが観測[かんそく]された。",
        "furigana": "関東[かんとう]から東北[とうほく]にかけての広[ひろ]い地域[ちいき]で、強[つよ]い揺[ゆ]れが観測[かんそく]された。",
        "reading": "kantoukaratouhokunikaketenohiroichiikide、tsuyoiyuregakansokusareta。",
        "translation": "Rung chuyển mạnh được quan sát thấy trên một khu vực rộng lớn từ Kanto đến Tohoku."
      },
      {
        "text": "この花[はな]は、三月[さんがつ]から四月[しがつ]にかけてきれいに咲[さ]く。",
        "furigana": "この花[はな]は、三月[さんがつ]から四月[しがつ]にかけてきれいに咲[さ]く。",
        "reading": "konohanaha、sangatsukarashigatsunikaketekireinisaku。",
        "translation": "Loài hoa này nở đẹp từ tháng 3 đến tháng 4."
      }
    ]
  },
  {
    "id": "ja-g-n3-81-buri",
    "language": "ja",
    "level": "N3",
    "pattern": "〜ぶり (buri)",
    "meaning": "lần đầu tiên trong (một khoảng thời gian); cách thức, cách làm",
    "formula": "Danh từ (N) + ぶり / Động từ thể ます bỏ ます (V-masu) + ぶり",
    "note": "Khoảng thời gian + ぶり: lần đầu tiên trong thời gian dài như vậy (〜ぶりに / 〜ぶりの). Danh từ hoặc Thân động từ + ぶり: cách ai đó làm việc gì đó (仕事ぶり, 話しぶり).",
    "examples": [
      {
        "text": "五[ご]年[ねん]ぶりに高校[こうこう]の友達[ともだち]に会[あ]って、話[はなし]が止[と]まらなかった。",
        "furigana": "五[ご]年[ねん]ぶりに高校[こうこう]の友達[ともだち]に会[あ]って、話[はなし]が止[と]まらなかった。",
        "reading": "gonenburinikoukounotomodachiniatte、hanashigatomaranakatta。",
        "translation": "Tôi gặp lại những người bạn cấp ba của mình lần đầu tiên sau 5 năm và chúng tôi không thể ngừng nói chuyện."
      },
      {
        "text": "久[ひさ]しぶりですね。お元気[げんき]でしたか。",
        "furigana": "久[ひさ]しぶりですね。お元気[げんき]でしたか。",
        "reading": "hisashiburidesune。ogenkideshitaka。",
        "translation": "Đã được một thời gian rồi. Bạn thế nào rồi?"
      },
      {
        "text": "新入[しんにゅう]社員[しゃいん]の仕事[しごと]ぶりを見[み]て、部長[ぶちょう]は安心[あんしん]したようだ。",
        "furigana": "新入[しんにゅう]社員[しゃいん]の仕事[しごと]ぶりを見[み]て、部長[ぶちょう]は安心[あんしん]したようだ。",
        "reading": "shinnyuushainnoshigotoburiomite、buchouhaanshinshitayouda。",
        "translation": "Người quản lý có vẻ nhẹ nhõm hơn sau khi thấy hiệu suất làm việc của nhân viên mới."
      }
    ]
  },
  {
    "id": "ja-g-n3-82-kke",
    "language": "ja",
    "level": "N3",
    "pattern": "〜っけ (kke)",
    "meaning": "phải không?; tôi phải không?; (cố nhớ lại)",
    "formula": "Động từ thể た (V-ta) / Danh từ (N) + だ / Danh từ (N) + だった + っけ",
    "note": "Kiểm tra điều gì đó bạn đã quên hoặc nhớ lại quá khứ một cách trìu mến (〜たっけ). Hình thức lịch sự: 〜でしたっけ, 〜ましたっけ.",
    "examples": [
      {
        "text": "あれ、会議[かいぎ]って何[なん]時[じ]からだっけ？",
        "furigana": "あれ、会議[かいぎ]って何[なん]時[じ]からだっけ？",
        "reading": "are、kaigittenanjikaradakke？",
        "translation": "Ừm, cuộc họp bắt đầu lúc mấy giờ?"
      },
      {
        "text": "すみません、お名前[なまえ]、何[なん]とおっしゃいましたっけ。",
        "furigana": "すみません、お名前[なまえ]、何[なん]とおっしゃいましたっけ。",
        "reading": "sumimasen、onamae、nantoosshaimashitakke。",
        "translation": "Xin lỗi, tên bạn là gì?"
      },
      {
        "text": "子[こ]どものころ、よくこの公園[こうえん]で遊[あそ]んだっけ。",
        "furigana": "子[こ]どものころ、よくこの公園[こうえん]で遊[あそ]んだっけ。",
        "reading": "kodomonokoro、yokukonokouendeasondakke。",
        "translation": "Hồi nhỏ bạn có thường chơi ở công viên này không?"
      }
    ]
  },
  {
    "id": "ja-g-n3-83-masu-you-ni",
    "language": "ja",
    "level": "N3",
    "pattern": "〜ますように (masu you ni)",
    "meaning": "tôi hy vọng; may (ước muốn, cầu nguyện)",
    "formula": "Động từ thể ます bỏ ます (V-masu) + ますように / Động từ thể ます bỏ ます (V-masu) + ませんように",
    "note": "Được sử dụng cho những lời chúc và lời cầu nguyện, ví dụ: tại một ngôi đền hoặc trên dải tanabata, và ở cuối bức thư chúc ai đó mọi điều tốt lành.",
    "examples": [
      {
        "text": "試験[しけん]に合格[ごうかく]できますように。",
        "furigana": "試験[しけん]に合格[ごうかく]できますように。",
        "reading": "shikennigoukakudekimasuyouni。",
        "translation": "Tôi hy vọng bạn có thể vượt qua kỳ thi."
      },
      {
        "text": "明日[あした]の遠足[えんそく]、雨[あめ]が降[ふ]りませんように。",
        "furigana": "明日[あした]の遠足[えんそく]、雨[あめ]が降[ふ]りませんように。",
        "reading": "ashitanoensoku、amegafurimasenyouni。",
        "translation": "Mong chuyến dã ngoại ngày mai trời không mưa."
      },
      {
        "text": "家族[かぞく]みんなが元気[げんき]で過[す]ごせますように。",
        "furigana": "家族[かぞく]みんなが元気[げんき]で過[す]ごせますように。",
        "reading": "kazokuminnagagenkidesugosemasuyouni。",
        "translation": "Mong mọi người trong gia đình bạn luôn khỏe mạnh."
      }
    ]
  },
  {
    "id": "ja-g-n3-84-furi-o-suru",
    "language": "ja",
    "level": "N3",
    "pattern": "〜ふりをする (furi o suru)",
    "meaning": "giả vờ; hành động như thể",
    "formula": "Động từ thể thông thường (V thường) / Tính từ đuôi い (A-i) / Tính từ đuôi な (A-na) + な / Danh từ (N) + の + ふりをする",
    "note": "Cố tình tạo ấn tượng sai. Động từ-ta phổ biến: 寝たふり, 死んだふり.",
    "examples": [
      {
        "text": "母[はは]に呼[よ]ばれたが、聞[き]こえないふりをしてゲームを続[つづ]けた。",
        "furigana": "母[はは]に呼[よ]ばれたが、聞[き]こえないふりをしてゲームを続[つづ]けた。",
        "reading": "hahaniyobaretaga、kikoenaifurioshiteゲームotsuzuketa。",
        "translation": "Mẹ tôi gọi điện nhưng tôi giả vờ như không nghe thấy và tiếp tục chơi game."
      },
      {
        "text": "彼[かれ]は本当[ほんとう]は知[し]っているのに、知[し]らないふりをしている。",
        "furigana": "彼[かれ]は本当[ほんとう]は知[し]っているのに、知[し]らないふりをしている。",
        "reading": "karehahontouhashitteirunoni、shiranaifurioshiteiru。",
        "translation": "Anh ấy giả vờ như không biết khi thực sự biết."
      },
      {
        "text": "電車[でんしゃ]の中[なか]で、寝[ね]たふりをして席[せき]を譲[ゆず]らない人[ひと]がいる。",
        "furigana": "電車[でんしゃ]の中[なか]で、寝[ね]たふりをして席[せき]を譲[ゆず]らない人[ひと]がいる。",
        "reading": "denshanonakade、netafurioshitesekioyuzuranaihitogairu。",
        "translation": "Một số người giả vờ ngủ trên tàu và không chịu nhường ghế."
      }
    ]
  },
  {
    "id": "ja-g-n3-85-muki-muke",
    "language": "ja",
    "level": "N3",
    "pattern": "〜向き / 〜向け (muki / muke)",
    "meaning": "phù hợp với/nhằm tới; dành cho",
    "formula": "Danh từ (N) + 向き / Danh từ (N) + 向け",
    "note": "向き: rất hợp với X. 向け: được làm nhằm mục đích dành cho X. 向き cũng có nghĩa là 'đối diện' (南向きの部屋).",
    "examples": [
      {
        "text": "この料理[りょうり]は作[つく]り方[かた]が簡単[かんたん]なので、初心者[しょしんしゃ]向[む]きだ。",
        "furigana": "この料理[りょうり]は作[つく]り方[かた]が簡単[かんたん]なので、初心者[しょしんしゃ]向[む]きだ。",
        "reading": "konoryourihatsukurikatagakantannanode、shoshinshamukida。",
        "translation": "Món này dễ làm nên thích hợp cho người mới bắt đầu."
      },
      {
        "text": "この雑誌[ざっし]は、若[わか]い女性[じょせい]向[む]けに作[つく]られている。",
        "furigana": "この雑誌[ざっし]は、若[わか]い女性[じょせい]向[む]けに作[つく]られている。",
        "reading": "konozasshiha、wakaijoseimukenitsukurareteiru。",
        "translation": "Tạp chí này hướng đến đối tượng phụ nữ trẻ."
      },
      {
        "text": "子[こ]ども向[む]けの番組[ばんぐみ]だが、大人[おとな]が見[み]ても十分[じゅうぶん]楽[たの]しめる。",
        "furigana": "子[こ]ども向[む]けの番組[ばんぐみ]だが、大人[おとな]が見[み]ても十分[じゅうぶん]楽[たの]しめる。",
        "reading": "kodomomukenobangumidaga、otonagamitemojuubuntanoshimeru。",
        "translation": "Đây là chương trình dành cho trẻ em nhưng người lớn cũng có thể thưởng thức."
      }
    ]
  },
  {
    "id": "ja-g-n3-86-gachi",
    "language": "ja",
    "level": "N3",
    "pattern": "〜がち (gachi)",
    "meaning": "có xu hướng; có xu hướng; thường",
    "formula": "Động từ thể ます bỏ ます (V-masu) / Danh từ (N) + がち",
    "note": "Có xu hướng thường xuyên hướng tới điều gì đó không mong muốn. So sánh 〜やすい (dễ xảy ra, có thể bình thường) và 〜気味 (dấu hiệu nhẹ của tình trạng hiện tại).",
    "examples": [
      {
        "text": "冬[ふゆ]になると、つい家[いえ]にこもりがちになる。",
        "furigana": "冬[ふゆ]になると、つい家[いえ]にこもりがちになる。",
        "reading": "fuyuninaruto、tsuiienikomorigachininaru。",
        "translation": "Khi mùa đông đến, tôi có xu hướng ở nhà."
      },
      {
        "text": "娘[むすめ]は小[ちい]さいころ病気[びょうき]がちだったが、今[いま]はとても元気[げんき]だ。",
        "furigana": "娘[むすめ]は小[ちい]さいころ病気[びょうき]がちだったが、今[いま]はとても元気[げんき]だ。",
        "reading": "musumehachiisaikorobyoukigachidattaga、imahatotemogenkida。",
        "translation": "Con gái tôi khi còn nhỏ thường hay ốm đau nhưng hiện tại cháu đã khỏe lại rất nhiều."
      },
      {
        "text": "一人暮[ひとりぐ]らしだと、野菜[やさい]が不足[ふそく]しがちです。",
        "furigana": "一人暮[ひとりぐ]らしだと、野菜[やさい]が不足[ふそく]しがちです。",
        "reading": "hitorigurashidato、yasaigafusokushigachidesu。",
        "translation": "Nếu bạn sống một mình, bạn có xu hướng hết rau."
      }
    ]
  },
  {
    "id": "ja-g-n3-87-gimi",
    "language": "ja",
    "level": "N3",
    "pattern": "〜気味 (gimi)",
    "meaning": "một chút; nhẹ nhàng; phần nào (trong tình trạng đó)",
    "formula": "Danh từ (N) / Động từ thể ます bỏ ます (V-masu) + 気味",
    "note": "Một dấu hiệu nhẹ của tình trạng (thường là tiêu cực) hiện tại. So sánh 〜がち, có nghĩa là việc gì đó xảy ra thường xuyên.",
    "examples": [
      {
        "text": "少[すこ]し風邪[かぜ]気味[ぎみ]なので、今日[きょう]は早[はや]めに帰[かえ]ります。",
        "furigana": "少[すこ]し風邪[かぜ]気味[ぎみ]なので、今日[きょう]は早[はや]めに帰[かえ]ります。",
        "reading": "sukoshikazegiminanode、kyouhahayamenikaerimasu。",
        "translation": "Mình thấy hơi lạnh nên hôm nay về nhà sớm nhé."
      },
      {
        "text": "最近[さいきん]、仕事[しごと]が忙[いそが]しくて疲[つか]れ気味[ぎみ]だ。",
        "furigana": "最近[さいきん]、仕事[しごと]が忙[いそが]しくて疲[つか]れ気味[ぎみ]だ。",
        "reading": "saikin、shigotogaisogashikutetsukaregimida。",
        "translation": "dạo này mình bận công việc quá, cảm thấy mệt mỏi."
      },
      {
        "text": "人手[ひとで]が足[た]りず、工事[こうじ]は予定[よてい]より遅[おく]れ気味[ぎみ]だ。",
        "furigana": "人手[ひとで]が足[た]りず、工事[こうじ]は予定[よてい]より遅[おく]れ気味[ぎみ]だ。",
        "reading": "hitodegatarizu、koujihayoteiyoriokuregimida。",
        "translation": "Do thiếu nhân lực nên việc thi công chậm tiến độ."
      }
    ]
  },
  {
    "id": "ja-g-n3-88-darake",
    "language": "ja",
    "level": "N3",
    "pattern": "〜だらけ (darake)",
    "meaning": "đầy; được bao phủ bởi; đánh đố với",
    "formula": "Danh từ (N) + だらけ",
    "note": "Một lượng lớn thứ gì đó che phủ hoặc lấp đầy một nơi; thường tiêu cực. So sánh N1 〜まみれ (được bao phủ bởi thứ gì đó dính hoặc bẩn).",
    "examples": [
      {
        "text": "子[こ]どもたちは、泥[どろ]だらけになって帰[かえ]ってきた。",
        "furigana": "子[こ]どもたちは、泥[どろ]だらけになって帰[かえ]ってきた。",
        "reading": "kodomotachiha、dorodarakeninattekaettekita。",
        "translation": "Bọn trẻ về nhà người đầy bùn."
      },
      {
        "text": "急[いそ]いで書[か]いたレポートは、間違[まちが]いだらけだった。",
        "furigana": "急[いそ]いで書[か]いたレポートは、間違[まちが]いだらけだった。",
        "reading": "isoidekaitaレポートha、machigaidarakedatta。",
        "translation": "Bản báo cáo tôi viết vội đầy sai sót."
      },
      {
        "text": "引[ひ]っ越[こ]したばかりで、部屋[へや]はまだ段[だん]ボールだらけだ。",
        "furigana": "引[ひ]っ越[こ]したばかりで、部屋[へや]はまだ段[だん]ボールだらけだ。",
        "reading": "hikkoshitabakaride、heyahamadadanボールdarakeda。",
        "translation": "Mình mới chuyển đi và phòng mình vẫn còn đầy bìa cứng."
      }
    ]
  },
  {
    "id": "ja-g-n3-89-kiru-kirenai",
    "language": "ja",
    "level": "N3",
    "pattern": "〜切る / 〜切れない (kiru / kirenai)",
    "meaning": "làm hoàn toàn; kết thúc/không thể kết thúc; quá nhiều đến",
    "formula": "Động từ thể ます bỏ ます (V-masu) + 切る / Động từ thể ます bỏ ます (V-masu) + 切れない",
    "note": "Làm một việc gì đó cho đến tận cùng. Cũng mô tả một trạng thái hoàn toàn: 疲れ切る ('hoàn toàn kiệt sức'). Thường được viết bằng kana: 〜きる / 〜きれない.",
    "examples": [
      {
        "text": "三[さん]時間[じかん]かけて、長[なが]い小説[しょうせつ]を最後[さいご]まで読[よ]み切[き]った。",
        "furigana": "三[さん]時間[じかん]かけて、長[なが]い小説[しょうせつ]を最後[さいご]まで読[よ]み切[き]った。",
        "reading": "sanjikankakete、nagaishousetsuosaigomadeyomikitta。",
        "translation": "Tôi phải mất ba tiếng mới đọc xong một cuốn tiểu thuyết dài."
      },
      {
        "text": "注文[ちゅうもん]しすぎて、料理[りょうり]を食[た]べ切[き]れなかった。",
        "furigana": "注文[ちゅうもん]しすぎて、料理[りょうり]を食[た]べ切[き]れなかった。",
        "reading": "chuumonshisugite、ryouriotabekirenakatta。",
        "translation": "Tôi gọi quá nhiều và không thể ăn hết."
      },
      {
        "text": "山[やま]の上[うえ]では、数[かぞ]え切[き]れないほどの星[ほし]が見[み]えた。",
        "furigana": "山[やま]の上[うえ]では、数[かぞ]え切[き]れないほどの星[ほし]が見[み]えた。",
        "reading": "yamanouedeha、kazoekirenaihodonohoshigamieta。",
        "translation": "Trên núi tôi có thể nhìn thấy vô số ngôi sao."
      }
    ]
  },
  {
    "id": "ja-g-n3-90-kakeru",
    "language": "ja",
    "level": "N3",
    "pattern": "〜かける (kakeru)",
    "meaning": "chưa xong một nửa; bắt đầu ; sắp",
    "formula": "Động từ thể ます bỏ ます (V-masu) + かける / Động từ thể ます bỏ ます (V-masu) + かけの + Danh từ (N)",
    "note": "Một hành động đã bắt đầu nhưng chưa kết thúc, hoặc một việc gì đó sắp xảy ra (死にかける). Thân động từ + かけの + danh từ mô tả sự việc chưa hoàn thành.",
    "examples": [
      {
        "text": "読[よ]みかけの本[ほん]が、机[つくえ]の上[うえ]に置[お]いてある。",
        "furigana": "読[よ]みかけの本[ほん]が、机[つくえ]の上[うえ]に置[お]いてある。",
        "reading": "yomikakenohonga、tsukuenouenioitearu。",
        "translation": "Trên bàn có một cuốn sách tôi chưa đọc."
      },
      {
        "text": "彼女[かのじょ]は何[なに]か言[い]いかけたが、そのまま黙[だま]ってしまった。",
        "furigana": "彼女[かのじょ]は何[なに]か言[い]いかけたが、そのまま黙[だま]ってしまった。",
        "reading": "kanojohananikaiikaketaga、sonomamadamatteshimatta。",
        "translation": "Cô ấy định nói gì đó nhưng lại im lặng."
      },
      {
        "text": "この花[はな]は枯[か]れかけていたが、水[みず]をやったら元気[げんき]になった。",
        "furigana": "この花[はな]は枯[か]れかけていたが、水[みず]をやったら元気[げんき]になった。",
        "reading": "konohanahakarekaketeitaga、mizuoyattaragenkininatta。",
        "translation": "Bông hoa này đang chết dần, nhưng sau khi tôi tưới nước cho nó, nó đã sống lại."
      }
    ]
  },
  {
    "id": "ja-g-n3-91-au",
    "language": "ja",
    "level": "N3",
    "pattern": "〜合う (au)",
    "meaning": "làm với nhau; làm cùng nhau",
    "formula": "Động từ thể ます bỏ ます (V-masu) + 合う",
    "note": "Hành động tương hỗ hoặc chia sẻ. Nhiều từ ghép được tạo thành từ: 話し合う, 知り合う, 付き合う, 助け合う.",
    "examples": [
      {
        "text": "困[こま]ったときは、お互[たが]いに助[たす]け合[あ]いましょう。",
        "furigana": "困[こま]ったときは、お互[たが]いに助[たす]け合[あ]いましょう。",
        "reading": "komattatokiha、otagainitasukeaimashou。",
        "translation": "Hãy giúp đỡ nhau khi gặp khó khăn."
      },
      {
        "text": "旅行[りょこう]の計画[けいかく]について、家族[かぞく]で話[はな]し合[あ]った。",
        "furigana": "旅行[りょこう]の計画[けいかく]について、家族[かぞく]で話[はな]し合[あ]った。",
        "reading": "ryokounokeikakunitsuite、kazokudehanashiatta。",
        "translation": "Gia đình tôi bàn về kế hoạch du lịch."
      },
      {
        "text": "優勝[ゆうしょう]が決[き]まると、選手[せんしゅ]たちは抱[だ]き合[あ]って喜[よろこ]んだ。",
        "furigana": "優勝[ゆうしょう]が決[き]まると、選手[せんしゅ]たちは抱[だ]き合[あ]って喜[よろこ]んだ。",
        "reading": "yuushougakimaruto、senshutachihadakiatteyorokonda。",
        "translation": "Khi đã xác định được người chiến thắng, các tuyển thủ đã ôm nhau vui sướng."
      }
    ]
  },
  {
    "id": "ja-g-n3-92-naosu",
    "language": "ja",
    "level": "N3",
    "pattern": "〜直す (naosu)",
    "meaning": "làm lại; làm lại (để sửa chữa hoặc cải thiện)",
    "formula": "Động từ thể ます bỏ ます (V-masu) + 直す",
    "note": "Làm lại điều gì đó để sửa chữa hoặc cải thiện nó. Sự lặp lại đơn giản (もう一度〜する) không mang lại cảm giác sửa chữa.",
    "examples": [
      {
        "text": "名前[なまえ]を間違[まちが]えたので、書類[しょるい]を書[か]き直[なお]した。",
        "furigana": "名前[なまえ]を間違[まちが]えたので、書類[しょるい]を書[か]き直[なお]した。",
        "reading": "namaeomachigaetanode、shoruiokakinaoshita。",
        "translation": "Mình viết nhầm tên nên viết lại tài liệu."
      },
      {
        "text": "すみません、電波[でんぱ]が悪[わる]いので、あとでかけ直[なお]します。",
        "furigana": "すみません、電波[でんぱ]が悪[わる]いので、あとでかけ直[なお]します。",
        "reading": "sumimasen、denpagawaruinode、atodekakenaoshimasu。",
        "translation": "Xin lỗi, tín hiệu kém nên tôi sẽ gọi lại sau."
      },
      {
        "text": "一[いち]度[ど]はあきらめた夢[ゆめ]だが、もう一度[いちど]考[かんが]え直[なお]してみることにした。",
        "furigana": "一[いち]度[ど]はあきらめた夢[ゆめ]だが、もう一度[いちど]考[かんが]え直[なお]してみることにした。",
        "reading": "ichidohaakirametayumedaga、mouichidokangaenaoshitemirukotonishita。",
        "translation": "Đó là giấc mơ mà tôi đã từng từ bỏ, nhưng tôi quyết định nghĩ lại về nó."
      }
    ]
  },
  {
    "id": "ja-g-n3-93-zurai",
    "language": "ja",
    "level": "N3",
    "pattern": "〜づらい (zurai)",
    "meaning": "chăm chỉ; khó khăn hoặc không thoải mái khi",
    "formula": "Động từ thể ます bỏ ます (V-masu) + づらい",
    "note": "Nhấn mạnh sự khó chịu về thể chất hoặc tâm lý của người thực hiện. 〜にくい (N4) khách quan hơn, mô tả bản chất của sự vật. N2 trang trọng: 〜がたい.",
    "examples": [
      {
        "text": "この靴[くつ]は少[すこ]し小[ちい]さくて、歩[ある]きづらい。",
        "furigana": "この靴[くつ]は少[すこ]し小[ちい]さくて、歩[ある]きづらい。",
        "reading": "konokutsuhasukoshichiisakute、arukizurai。",
        "translation": "Đôi giày này hơi nhỏ, đi vào khó khăn."
      },
      {
        "text": "先輩[せんぱい]にお金[かね]を貸[か]してほしいとは、ちょっと言[い]いづらい。",
        "furigana": "先輩[せんぱい]にお金[かね]を貸[か]してほしいとは、ちょっと言[い]いづらい。",
        "reading": "senpainiokaneokashitehoshiitoha、chottoiizurai。",
        "translation": "Hỏi tiền bối cho vay hơi khó đấy."
      },
      {
        "text": "字[じ]が小[ちい]さくて読[よ]みづらいので、もう少[すこ]し大[おお]きくしてもらえますか。",
        "furigana": "字[じ]が小[ちい]さくて読[よ]みづらいので、もう少[すこ]し大[おお]きくしてもらえますか。",
        "reading": "jigachiisakuteyomizurainode、mousukoshiookikushitemoraemasuka。",
        "translation": "Font chữ nhỏ và khó đọc. Bạn có thể vui lòng làm cho nó lớn hơn một chút được không?"
      }
    ]
  },
  {
    "id": "ja-g-n3-94-beki-da-beki-de-wa-nai",
    "language": "ja",
    "level": "N3",
    "pattern": "〜べきだ / 〜べきではない (beki da / beki de wa nai)",
    "meaning": "nên; nên / không nên",
    "formula": "Động từ thể từ điển (V-dict) + べきだ / Động từ thể từ điển (V-dict) + べきではない",
    "note": "Có quan điểm mạnh mẽ về điều gì là đúng hoặc nghĩa vụ của một người; quá thẳng thừng để sử dụng đối với cấp trên. する → すべき hoặc するべき. So sánh 〜ほうがいい (lời khuyên) và 〜ものだ (chuẩn mực xã hội).",
    "examples": [
      {
        "text": "自分[じぶん]が悪[わる]いと思[おも]ったら、すぐに謝[あやま]るべきだ。",
        "furigana": "自分[じぶん]が悪[わる]いと思[おも]ったら、すぐに謝[あやま]るべきだ。",
        "reading": "jibungawaruitoomottara、suguniayamarubekida。",
        "translation": "Nếu bạn cho rằng đó là lỗi của mình thì bạn nên xin lỗi ngay."
      },
      {
        "text": "環境[かんきょう]のために、私[わたし]たちはもっとエネルギーを大切[たいせつ]に使[つか]うべきだ。",
        "furigana": "環境[かんきょう]のために、私[わたし]たちはもっとエネルギーを大切[たいせつ]に使[つか]うべきだ。",
        "reading": "kankyounotameni、watashitachihamottoエネルギーotaisetsunitsukaubekida。",
        "translation": "Chúng ta nên sử dụng năng lượng cẩn thận hơn vì lợi ích của môi trường."
      },
      {
        "text": "病院[びょういん]の中[なか]では、大[おお]きな声[こえ]で話[はな]すべきではない。",
        "furigana": "病院[びょういん]の中[なか]では、大[おお]きな声[こえ]で話[はな]すべきではない。",
        "reading": "byouinnonakadeha、ookinakoedehanasubekidehanai。",
        "translation": "Bạn không nên nói chuyện lớn tiếng trong bệnh viện."
      }
    ]
  },
  {
    "id": "ja-g-n3-95-hodo-wa-nai",
    "language": "ja",
    "level": "N3",
    "pattern": "〜ほど〜はない (hodo ... wa nai)",
    "meaning": "không có gì bằng ... như; không có ... như",
    "formula": "Danh từ (N) + ほど + Tính từ đuôi い (A-i) / Tính từ đuôi な (A-na) + な + Danh từ (N) + はない",
    "note": "Nói X là ... nhiều nhất, thường là từ kinh nghiệm hoặc cảm nhận cá nhân. Ngoài ra 〜くらい〜はない.",
    "examples": [
      {
        "text": "仕事[しごと]の後[あと]に飲[の]む冷[つめ]たいビールほどおいしいものはない。",
        "furigana": "仕事[しごと]の後[あと]に飲[の]む冷[つめ]たいビールほどおいしいものはない。",
        "reading": "shigotonoatoninomutsumetaiビールhodooishiimonohanai。",
        "translation": "Không có gì tuyệt hơn một ly bia lạnh sau giờ làm việc."
      },
      {
        "text": "この町[まち]で、あの店[みせ]ほど安[やす]くておいしいラーメン屋[や]はない。",
        "furigana": "この町[まち]で、あの店[みせ]ほど安[やす]くておいしいラーメン屋[や]はない。",
        "reading": "konomachide、anomisehodoyasukuteoishiiラーメンyahanai。",
        "translation": "Ở thị trấn này không có quán mì ramen nào rẻ và ngon như quán đó."
      },
      {
        "text": "健康[けんこう]ほど大切[たいせつ]なものはないと、病気[びょうき]になって気[き]づいた。",
        "furigana": "健康[けんこう]ほど大切[たいせつ]なものはないと、病気[びょうき]になって気[き]づいた。",
        "reading": "kenkouhodotaisetsunamonohanaito、byoukininattekizuita。",
        "translation": "Khi bị bệnh tôi mới nhận ra rằng không có gì quan trọng hơn sức khỏe."
      }
    ]
  },
  {
    "id": "ja-g-n3-96-shika-nai-no-choice",
    "language": "ja",
    "level": "N3",
    "pattern": "〜しかない (shika nai (no choice))",
    "meaning": "không còn cách nào khác; chỉ có thể",
    "formula": "Động từ thể từ điển (V-dict) + しかない",
    "note": "Không có lựa chọn nào khác nên người nói chấp nhận lựa chọn này. Khác với Danh từ + しか〜ない ('chỉ'). Tương đương N2 trang trọng: 〜ほかない.",
    "examples": [
      {
        "text": "終電[しゅうでん]に乗[の]り遅[おく]れたから、タクシーで帰[かえ]るしかない。",
        "furigana": "終電[しゅうでん]に乗[の]り遅[おく]れたから、タクシーで帰[かえ]るしかない。",
        "reading": "shuudenninoriokuretakara、タクシーdekaerushikanai。",
        "translation": "Tôi bị lỡ chuyến tàu cuối cùng nên không còn cách nào khác là bắt taxi về nhà."
      },
      {
        "text": "誰[だれ]も手伝[てつだ]ってくれないなら、一人[ひとり]でやるしかない。",
        "furigana": "誰[だれ]も手伝[てつだ]ってくれないなら、一人[ひとり]でやるしかない。",
        "reading": "daremotetsudattekurenainara、hitorideyarushikanai。",
        "translation": "Nếu không ai giúp được thì bạn phải làm một mình."
      },
      {
        "text": "ここまで来[き]たら、もう最後[さいご]まで頑張[がんば]るしかないね。",
        "furigana": "ここまで来[き]たら、もう最後[さいご]まで頑張[がんば]るしかないね。",
        "reading": "kokomadekitara、mousaigomadeganbarushikanaine。",
        "translation": "Nếu đã đi xa đến mức này thì bạn không còn cách nào khác ngoài việc cố gắng hết sức mình cho đến cuối cùng."
      }
    ]
  },
  {
    "id": "ja-g-n3-97-made-even",
    "language": "ja",
    "level": "N3",
    "pattern": "〜まで（even） (made (even))",
    "meaning": "thậm chí (trường hợp cực đoan)",
    "formula": "Danh từ (N) + まで / Danh từ (N) + にまで",
    "note": "Thêm một mục cực đoan lên trên những mục khác, thường gây ngạc nhiên hoặc mất tinh thần. So sánh 〜さえ, tự nó chọn ra một ví dụ cực đoan.",
    "examples": [
      {
        "text": "最近[さいきん]は、小学生[しょうがくせい]までスマホを持[も]っている。",
        "furigana": "最近[さいきん]は、小学生[しょうがくせい]までスマホを持[も]っている。",
        "reading": "saikinha、shougakuseimadeスマホomotteiru。",
        "translation": "Ngày nay, ngay cả học sinh tiểu học cũng có điện thoại thông minh."
      },
      {
        "text": "親友[しんゆう]にまでうそをつかれて、とてもショックだった。",
        "furigana": "親友[しんゆう]にまでうそをつかれて、とてもショックだった。",
        "reading": "shinyuunimadeusootsukarete、totemoショックdatta。",
        "translation": "Tôi sốc đến mức ngay cả người bạn thân nhất của tôi cũng nói dối tôi."
      },
      {
        "text": "雨[あめ]だけでなく、風[かぜ]まで強[つよ]くなってきた。",
        "furigana": "雨[あめ]だけでなく、風[かぜ]まで強[つよ]くなってきた。",
        "reading": "amedakedenaku、kazemadetsuyokunattekita。",
        "translation": "Không chỉ mưa mà gió cũng ngày càng mạnh hơn."
      }
    ]
  },
  {
    "id": "ja-g-n3-98-tokoro-datta",
    "language": "ja",
    "level": "N3",
    "pattern": "〜ところだった (tokoro datta)",
    "meaning": "gần như vậy; gần như (nhưng không)",
    "formula": "Động từ thể từ điển (V-dict) + ところだった",
    "note": "Một điều gì đó (thường là tồi tệ) đã suýt xảy ra nhưng đã không xảy ra. Thường đi kèm với mệnh đề もう少しで, 危うく hoặc mệnh đề 〜たら. So sánh 〜そうになった.",
    "examples": [
      {
        "text": "考[かんが]え事[ごと]をしていて、もう少[すこ]しで車[くるま]にひかれるところだった。",
        "furigana": "考[かんが]え事[ごと]をしていて、もう少[すこ]しで車[くるま]にひかれるところだった。",
        "reading": "kangaegotooshiteite、mousukoshidekurumanihikarerutokorodatta。",
        "translation": "Tôi đang suy nghĩ điều gì đó thì suýt bị ô tô đâm."
      },
      {
        "text": "目覚[めざ]ましが鳴[な]らなくて、危[あや]うく飛行機[ひこうき]に乗[の]り遅[おく]れるところだった。",
        "furigana": "目覚[めざ]ましが鳴[な]らなくて、危[あや]うく飛行機[ひこうき]に乗[の]り遅[おく]れるところだった。",
        "reading": "mezamashiganaranakute、ayaukuhikoukininoriokurerutokorodatta。",
        "translation": "Tôi suýt lỡ chuyến bay vì chuông báo thức không kêu."
      },
      {
        "text": "君[きみ]が教[おし]えてくれなかったら、大事[だいじ]な書類[しょるい]を出[だ]し忘[わす]れるところだったよ。",
        "furigana": "君[きみ]が教[おし]えてくれなかったら、大事[だいじ]な書類[しょるい]を出[だ]し忘[わす]れるところだったよ。",
        "reading": "kimigaoshietekurenakattara、daijinashoruiodashiwasurerutokorodattayo。",
        "translation": "Nếu bạn không nói với tôi, tôi đã quên đưa một tài liệu quan trọng."
      }
    ]
  },
  {
    "id": "ja-g-n3-99-kara-to-itte",
    "language": "ja",
    "level": "N3",
    "pattern": "〜からといって (kara to itte)",
    "meaning": "chỉ vì (... không có nghĩa); đơn giản vì",
    "formula": "Câu + からといって",
    "note": "Phủ nhận rằng một lý do sẽ tự động dẫn đến một kết luận. Thường theo sau là phủ định như 〜わけではない hoặc 〜とは限らない. Bình thường: 〜からって.",
    "examples": [
      {
        "text": "日本人[にほんじん]だからといって、みんなが敬語[けいご]を正[ただ]しく使[つか]えるわけではない。",
        "furigana": "日本人[にほんじん]だからといって、みんなが敬語[けいご]を正[ただ]しく使[つか]えるわけではない。",
        "reading": "nihonjindakaratoitte、minnagakeigootadashikutsukaeruwakedehanai。",
        "translation": "Chỉ vì bạn là người Nhật không có nghĩa là mọi người đều có thể sử dụng kính ngữ một cách chính xác."
      },
      {
        "text": "忙[いそが]しいからといって、朝[あさ]ご飯[はん]を食[た]べないのは体[からだ]によくない。",
        "furigana": "忙[いそが]しいからといって、朝[あさ]ご飯[はん]を食[た]べないのは体[からだ]によくない。",
        "reading": "isogashiikaratoitte、asagohanotabenainohakaradaniyokunai。",
        "translation": "Bỏ bữa sáng chỉ vì bận rộn sẽ không tốt cho cơ thể đâu."
      },
      {
        "text": "一回[いっかい]負[ま]けたからといって、あきらめる必要[ひつよう]はない。",
        "furigana": "一回[いっかい]負[ま]けたからといって、あきらめる必要[ひつよう]はない。",
        "reading": "ikkaimaketakaratoitte、akirameruhitsuyouhanai。",
        "translation": "Không cần phải bỏ cuộc chỉ vì bạn đã thua một lần."
      }
    ]
  },
  {
    "id": "ja-g-n3-100-toori-ni-doori-ni",
    "language": "ja",
    "level": "N3",
    "pattern": "〜とおりに / 〜どおりに (toori ni / doori ni)",
    "meaning": "as; theo cách đó; chính xác như",
    "formula": "Động từ thể từ điển (V-dict) / Động từ thể た (V-ta) / Danh từ (N) + の + とおりに / Danh từ (N) + どおりに",
    "note": "Làm điều gì đó giống hệt như một mô hình, hướng dẫn hoặc dự đoán. Ngay sau danh từ nó trở thành どおり (予定どおり, 思いどおり). に thường bị bỏ đi. そのとおりだ = 'chính xác'.",
    "examples": [
      {
        "text": "説明[せつめい]書[しょ]に書[か]いてあるとおりに組[く]み立[た]てたのに、うまく動[うご]かない。",
        "furigana": "説明[せつめい]書[しょ]に書[か]いてあるとおりに組[く]み立[た]てたのに、うまく動[うご]かない。",
        "reading": "setsumeishonikaitearutoorinikumitatetanoni、umakuugokanai。",
        "translation": "Mình đã lắp ráp theo hướng dẫn nhưng không được."
      },
      {
        "text": "先生[せんせい]が言[い]ったとおり、試験[しけん]には去年[きょねん]と似[に]た問題[もんだい]が出[で]た。",
        "furigana": "先生[せんせい]が言[い]ったとおり、試験[しけん]には去年[きょねん]と似[に]た問題[もんだい]が出[で]た。",
        "reading": "senseigaittatoori、shikennihakyonentonitamondaigadeta。",
        "translation": "Đúng như thầy nói, đề thi có câu hỏi tương tự như năm ngoái."
      },
      {
        "text": "工事[こうじ]は予定[よてい]どおりに進[すす]んでいる。",
        "furigana": "工事[こうじ]は予定[よてい]どおりに進[すす]んでいる。",
        "reading": "koujihayoteidoorinisusundeiru。",
        "translation": "Việc xây dựng đang tiến triển theo đúng kế hoạch."
      }
    ]
  },
  {
    "id": "ja-g-n3-101-nanka-nante",
    "language": "ja",
    "level": "N3",
    "pattern": "〜なんか / 〜なんて (nanka / nante)",
    "meaning": "những thứ như; thích (bác bỏ hoặc khiêm tốn); Làm sao ...! (ngạc nhiên)",
    "formula": "Danh từ (N) + なんか / Danh từ (N) + なんて / Câu + なんて",
    "note": "Phiên bản thông thường của など với giọng điệu khinh miệt, khiêm tốn hoặc ngạc nhiên. なんか cũng làm dịu đi những gợi ý (お茶なんかどう？). Câu + なんて thể hiện sự ngạc nhiên hoặc không tin tưởng.",
    "examples": [
      {
        "text": "私[わたし]なんか、まだまだ初心者[しょしんしゃ]です。",
        "furigana": "私[わたし]なんか、まだまだ初心者[しょしんしゃ]です。",
        "reading": "watashinanka、madamadashoshinshadesu。",
        "translation": "Tôi vẫn là người mới bắt đầu."
      },
      {
        "text": "幽霊[ゆうれい]なんて、いるわけがないよ。",
        "furigana": "幽霊[ゆうれい]なんて、いるわけがないよ。",
        "reading": "yuureinante、iruwakeganaiyo。",
        "translation": "Không có thứ gì gọi là ma cả."
      },
      {
        "text": "あの二人[ふたり]が結婚[けっこん]するなんて、びっくりした。",
        "furigana": "あの二人[ふたり]が結婚[けっこん]するなんて、びっくりした。",
        "reading": "anofutarigakekkonsurunante、bikkurishita。",
        "translation": "Tôi không ngờ hai người đó lại kết hôn."
      }
    ]
  },
  {
    "id": "ja-g-n2-01-ni-saishite",
    "language": "ja",
    "level": "N2",
    "pattern": "〜に際して (ni saishite)",
    "meaning": "nhân dịp; khi; tại thời điểm",
    "formula": "Danh từ (N) + に際して / Động từ thể từ điển (V-dict) + に際して / Danh từ (N) + に際しての + Danh từ (N)",
    "note": "Chính thức; cho những dịp đặc biệt, chỉ diễn ra một lần (nghi lễ, khởi hành, hợp đồng). Gần đồng nghĩa với 〜にあたって, mang lại cảm giác chuẩn bị hoặc đối mặt với sự kiện; に際して chỉ đơn giản là đánh dấu sự kiện.",
    "examples": [
      {
        "text": "新[しん]製品[せいひん]の発売[はつばい]に際[さい]して、記者[きしゃ]会見[かいけん]が開[ひら]かれた。",
        "furigana": "新[しん]製品[せいひん]の発売[はつばい]に際[さい]して、記者[きしゃ]会見[かいけん]が開[ひら]かれた。",
        "reading": "shinseihinnohatsubainisaishite、kishakaikengahirakareta。",
        "translation": "Một buổi họp báo đã được tổ chức để đánh dấu sự ra mắt sản phẩm mới."
      },
      {
        "text": "海外[かいがい]へ渡航[とこう]するに際[さい]しては、現地[げんち]の安全[あんぜん]情報[じょうほう]を必[かなら]ず確認[かくにん]してください。",
        "furigana": "海外[かいがい]へ渡航[とこう]するに際[さい]しては、現地[げんち]の安全[あんぜん]情報[じょうほう]を必[かなら]ず確認[かくにん]してください。",
        "reading": "kaigaihetokousurunisaishiteha、genchinoanzenjouhouokanarazukakuninshitekudasai。",
        "translation": "Khi đi du lịch nước ngoài, hãy nhớ kiểm tra thông tin an toàn tại địa phương."
      },
      {
        "text": "契約[けいやく]の更新[こうしん]に際[さい]しての注意[ちゅうい]事項[じこう]をまとめました。",
        "furigana": "契約[けいやく]の更新[こうしん]に際[さい]しての注意[ちゅうい]事項[じこう]をまとめました。",
        "reading": "keiyakunokoushinnisaishitenochuuijikouomatomemashita。",
        "translation": "Chúng tôi đã tóm tắt những lưu ý cần thực hiện khi gia hạn hợp đồng của bạn."
      }
    ]
  },
  {
    "id": "ja-g-n2-02-ni-tomonatte",
    "language": "ja",
    "level": "N2",
    "pattern": "〜に伴って (ni tomonatte)",
    "meaning": "cùng; BẰNG; đi cùng",
    "formula": "Danh từ (N) + に伴って / Động từ thể từ điển (V-dict) + の + に伴って / Danh từ (N) + に伴う + Danh từ (N)",
    "note": "〜に伴い là dạng viết nhiều hơn. Giống như 〜につれて nó có thể mô tả sự thay đổi dần dần, nhưng nó cũng bao gồm các sự kiện xảy ra một lần dẫn đến một sự kiện khác (ví dụ: chuyển địa điểm).",
    "examples": [
      {
        "text": "高齢[こうれい]化[か]に伴[ともな]って、医療[いりょう]費[ひ]は年々[ねんねん]増加[ぞうか]している。",
        "furigana": "高齢[こうれい]化[か]に伴[ともな]って、医療[いりょう]費[ひ]は年々[ねんねん]増加[ぞうか]している。",
        "reading": "koureikanitomonatte、iryouhihanennenzoukashiteiru。",
        "translation": "Chi phí y tế đang tăng lên hàng năm khi dân số già đi."
      },
      {
        "text": "工場[こうじょう]の移転[いてん]に伴[ともな]い、約[やく]二[に]百[ひゃく]人[にん]の従業[じゅうぎょう]員[いん]が転勤[てんきん]することになった。",
        "furigana": "工場[こうじょう]の移転[いてん]に伴[ともな]い、約[やく]二[に]百[ひゃく]人[にん]の従業[じゅうぎょう]員[いん]が転勤[てんきん]することになった。",
        "reading": "koujounoitennitomonai、yakunihyakuninnojuugyouingatenkinsurukotoninatta。",
        "translation": "Khoảng 200 nhân viên sẽ được điều chuyển do di dời nhà máy."
      },
      {
        "text": "台風[たいふう]の接近[せっきん]に伴[ともな]う大雨[おおあめ]に注意[ちゅうい]してください。",
        "furigana": "台風[たいふう]の接近[せっきん]に伴[ともな]う大雨[おおあめ]に注意[ちゅうい]してください。",
        "reading": "taifuunosekkinnitomonauooamenichuuishitekudasai。",
        "translation": "Hãy cẩn thận với mưa lớn khi bão đến gần."
      }
    ]
  },
  {
    "id": "ja-g-n2-03-ni-oujite",
    "language": "ja",
    "level": "N2",
    "pattern": "〜に応じて (ni oujite)",
    "meaning": "theo; tùy thuộc vào ; đáp lại",
    "formula": "Danh từ (N) + に応じて / Danh từ (N) + に応じた + Danh từ (N)",
    "note": "B được điều chỉnh để phù hợp với A (khả năng, ngân sách, mùa giải, yêu cầu). So sánh 〜次第で, nhấn mạnh rằng kết quả hoàn toàn do A quyết định.",
    "examples": [
      {
        "text": "この奨学[しょうがく]金[きん]は、家庭[かてい]の収入[しゅうにゅう]に応[おう]じて支給[しきゅう]額[がく]が変[か]わる。",
        "furigana": "この奨学[しょうがく]金[きん]は、家庭[かてい]の収入[しゅうにゅう]に応[おう]じて支給[しきゅう]額[がく]が変[か]わる。",
        "reading": "konoshougakukinha、kateinoshuunyuunioujiteshikyuugakugakawaru。",
        "translation": "Số tiền học bổng này sẽ thay đổi tùy theo thu nhập của gia đình bạn."
      },
      {
        "text": "お客様[きゃくさま]のご予算[よさん]に応[おう]じたプランをご提案[ていあん]いたします。",
        "furigana": "お客様[きゃくさま]のご予算[よさん]に応[おう]じたプランをご提案[ていあん]いたします。",
        "reading": "okyakusamanogoyosannioujitaプランogoteianitashimasu。",
        "translation": "Chúng tôi sẽ đề xuất phương án phù hợp với ngân sách của bạn."
      },
      {
        "text": "会社[かいしゃ]は社員[しゃいん]の要望[ようぼう]に応[おう]じて、在宅[ざいたく]勤務[きんむ]の制度[せいど]を導入[どうにゅう]した。",
        "furigana": "会社[かいしゃ]は社員[しゃいん]の要望[ようぼう]に応[おう]じて、在宅[ざいたく]勤務[きんむ]の制度[せいど]を導入[どうにゅう]した。",
        "reading": "kaishahashainnoyoubounioujite、zaitakukinmunoseidoodounyuushita。",
        "translation": "Công ty đã triển khai hệ thống làm việc tại nhà nhằm đáp ứng yêu cầu của nhân viên."
      }
    ]
  },
  {
    "id": "ja-g-n2-04-ni-hanshite",
    "language": "ja",
    "level": "N2",
    "pattern": "〜に反して (ni hanshite)",
    "meaning": "trái với; chống lại; vi phạm",
    "formula": "Danh từ (N) + に反して / Danh từ (N) + に反する + Danh từ (N) / Danh từ (N) + に反した + Danh từ (N)",
    "note": "Dùng với các danh từ như 予想, 期待, 意思, 規則. Với một quy tắc hoặc luật là danh từ, nó có nghĩa là 'vi phạm'.",
    "examples": [
      {
        "text": "大方[おおかた]の予想[よそう]に反[はん]して、無名[むめい]の新人[しんじん]が優勝[ゆうしょう]した。",
        "furigana": "大方[おおかた]の予想[よそう]に反[はん]して、無名[むめい]の新人[しんじん]が優勝[ゆうしょう]した。",
        "reading": "ookatanoyosounihanshite、mumeinoshinjingayuushoushita。",
        "translation": "Trái ngược với hầu hết mọi mong đợi, một người mới vô danh đã giành chiến thắng."
      },
      {
        "text": "本人[ほんにん]の意思[いし]に反[はん]して、彼[かれ]は地方[ちほう]の支店[してん]に異動[いどう]させられた。",
        "furigana": "本人[ほんにん]の意思[いし]に反[はん]して、彼[かれ]は地方[ちほう]の支店[してん]に異動[いどう]させられた。",
        "reading": "honninnoishinihanshite、karehachihounoshitenniidousaserareta。",
        "translation": "Chống lại ý muốn của mình, anh ta đã được chuyển đến một chi nhánh địa phương."
      },
      {
        "text": "たとえ上司[じょうし]の指示[しじ]であっても、法律[ほうりつ]に反[はん]することはすべきではない。",
        "furigana": "たとえ上司[じょうし]の指示[しじ]であっても、法律[ほうりつ]に反[はん]することはすべきではない。",
        "reading": "tatoejoushinoshijideattemo、houritsunihansurukotohasubekidehanai。",
        "translation": "Bạn không nên làm bất cứ điều gì trái pháp luật, ngay cả khi sếp bảo bạn làm như vậy."
      }
    ]
  },
  {
    "id": "ja-g-n2-05-ni-motozuite",
    "language": "ja",
    "level": "N2",
    "pattern": "〜に基づいて (ni motozuite)",
    "meaning": "dựa vào; trên cơ sở",
    "formula": "Danh từ (N) + に基づいて / Danh từ (N) + に基づく + Danh từ (N) / Danh từ (N) + に基づいた + Danh từ (N)",
    "note": "Cơ sở là một tiêu chuẩn vững chắc như dữ liệu, luật, sự kiện hoặc kinh nghiệm và B tuân thủ chặt chẽ các tiêu chuẩn đó. So sánh 〜をもとに, được sử dụng cho vật liệu mà từ đó một cái gì đó mới được tạo ra.",
    "examples": [
      {
        "text": "この映画[えいが]は実際[じっさい]に起[お]きた事件[じけん]に基[もと]づいて制作[せいさく]された。",
        "furigana": "この映画[えいが]は実際[じっさい]に起[お]きた事件[じけん]に基[もと]づいて制作[せいさく]された。",
        "reading": "konoeigahajissainiokitajikennimotozuiteseisakusareta。",
        "translation": "Phim này dựa trên một sự việc có thật."
      },
      {
        "text": "アンケートの結果[けっか]に基[もと]づき、来年度[らいねんど]の計画[けいかく]を見直[みなお]すことにした。",
        "furigana": "アンケートの結果[けっか]に基[もと]づき、来年度[らいねんど]の計画[けいかく]を見直[みなお]すことにした。",
        "reading": "アンケートnokekkanimotozuki、rainendonokeikakuominaosukotonishita。",
        "translation": "Dựa trên kết quả khảo sát, chúng tôi quyết định xem xét lại kế hoạch của mình cho năm tới."
      },
      {
        "text": "科学[かがく]的[てき]な根拠[こんきょ]に基[もと]づいた判断[はんだん]が求[もと]められている。",
        "furigana": "科学[かがく]的[てき]な根拠[こんきょ]に基[もと]づいた判断[はんだん]が求[もと]められている。",
        "reading": "kagakutekinakonkyonimotozuitahandangamotomerareteiru。",
        "translation": "Cần phải có những phán đoán dựa trên bằng chứng khoa học."
      }
    ]
  },
  {
    "id": "ja-g-n2-06-ni-watatte",
    "language": "ja",
    "level": "N2",
    "pattern": "〜にわたって (ni watatte)",
    "meaning": "đã qua; khắp; kéo dài (cả một khoảng thời gian hoặc một khu vực)",
    "formula": "Danh từ (N) + にわたって / Danh từ (N) + にわたる + Danh từ (N)",
    "note": "Nhấn mạnh toàn bộ khoảng thời gian dài, một khu vực rộng hoặc nhiều đồ vật (多岐にわたる). Không được sử dụng cho nhịp ngắn hoặc nhỏ.",
    "examples": [
      {
        "text": "工事[こうじ]は三[さん]か月[げつ]にわたって行[おこな]われる予定[よてい]だ。",
        "furigana": "工事[こうじ]は三[さん]か月[げつ]にわたって行[おこな]われる予定[よてい]だ。",
        "reading": "koujihasankagetsuniwatatteokonawareruyoteida。",
        "translation": "Việc xây dựng dự kiến ​​diễn ra trong ba tháng."
      },
      {
        "text": "昨夜[さくや]の大雪[おおゆき]で、関東[かんとう]地方[ちほう]の広[ひろ]い範囲[はんい]にわたって交通[こうつう]が乱[みだ]れた。",
        "furigana": "昨夜[さくや]の大雪[おおゆき]で、関東[かんとう]地方[ちほう]の広[ひろ]い範囲[はんい]にわたって交通[こうつう]が乱[みだ]れた。",
        "reading": "sakuyanoooyukide、kantouchihounohiroihaniniwatattekoutsuugamidareta。",
        "translation": "Tuyết rơi dày đặc đêm qua đã làm gián đoạn giao thông trên một khu vực rộng lớn của vùng Kanto."
      },
      {
        "text": "両国[りょうこく]の首脳[しゅのう]は、二日間[ふつかかん]にわたる会談[かいだん]を終[お]えた。",
        "furigana": "両国[りょうこく]の首脳[しゅのう]は、二日間[ふつかかん]にわたる会談[かいだん]を終[お]えた。",
        "reading": "ryoukokunoshunouha、futsukakanniwatarukaidanooeta。",
        "translation": "Lãnh đạo hai nước kết thúc hai ngày hội đàm."
      }
    ]
  },
  {
    "id": "ja-g-n2-07-ni-sotte",
    "language": "ja",
    "level": "N2",
    "pattern": "〜に沿って (ni sotte)",
    "meaning": "dọc theo; phù hợp với; theo sau",
    "formula": "Danh từ (N) + に沿って / Danh từ (N) + に沿った + Danh từ (N)",
    "note": "Nghĩa đen: dọc theo một con đường, con sông hoặc bờ biển. Cách sử dụng trừu tượng: tuân theo một kế hoạch, chính sách hoặc mong muốn của ai đó.",
    "examples": [
      {
        "text": "川[かわ]に沿[そ]って桜[さくら]並木[なみき]が二[に]キロほど続[つづ]いている。",
        "furigana": "川[かわ]に沿[そ]って桜[さくら]並木[なみき]が二[に]キロほど続[つづ]いている。",
        "reading": "kawanisottesakuranamikiganiキロhodotsuzuiteiru。",
        "translation": "Một hàng cây hoa anh đào trải dài khoảng hai cây số dọc theo bờ sông."
      },
      {
        "text": "マニュアルに沿[そ]って作業[さぎょう]を進[すす]めてください。",
        "furigana": "マニュアルに沿[そ]って作業[さぎょう]を進[すす]めてください。",
        "reading": "マニュアルnisottesagyouosusumetekudasai。",
        "translation": "Vui lòng thực hiện theo hướng dẫn."
      },
      {
        "text": "お客様[きゃくさま]のご要望[ようぼう]に沿[そ]ったデザインを考[かんが]えます。",
        "furigana": "お客様[きゃくさま]のご要望[ようぼう]に沿[そ]ったデザインを考[かんが]えます。",
        "reading": "okyakusamanogoyoubounisottaデザインokangaemasu。",
        "translation": "Chúng tôi sẽ đưa ra thiết kế phù hợp với nhu cầu của bạn."
      }
    ]
  },
  {
    "id": "ja-g-n2-08-ni-kuwaete",
    "language": "ja",
    "level": "N2",
    "pattern": "〜に加えて (ni kuwaete)",
    "meaning": "ngoài ra; trên cùng",
    "formula": "Danh từ (N) + に加えて",
    "note": "Hơi trang trọng; 〜に加え là dạng viết. Mục được thêm vào thường được đánh dấu bằng も.",
    "examples": [
      {
        "text": "今年[ことし]は猛暑[もうしょ]に加[くわ]えて雨不足[あめぶそく]が続[つづ]き、野菜[やさい]の価格[かかく]が高騰[こうとう]している。",
        "furigana": "今年[ことし]は猛暑[もうしょ]に加[くわ]えて雨不足[あめぶそく]が続[つづ]き、野菜[やさい]の価格[かかく]が高騰[こうとう]している。",
        "reading": "kotoshihamoushonikuwaeteamebusokugatsuzuki、yasainokakakugakoutoushiteiru。",
        "translation": "Năm nay, ngoài nắng nóng gay gắt, tình trạng thiếu mưa tiếp tục kéo dài, giá rau củ tăng vọt."
      },
      {
        "text": "この仕事[しごと]には、語学[ごがく]力[りょく]に加[くわ]えて交渉[こうしょう]力[りょく]も必要[ひつよう]だ。",
        "furigana": "この仕事[しごと]には、語学[ごがく]力[りょく]に加[くわ]えて交渉[こうしょう]力[りょく]も必要[ひつよう]だ。",
        "reading": "konoshigotoniha、gogakuryokunikuwaetekoushouryokumohitsuyouda。",
        "translation": "Công việc này yêu cầu kỹ năng đàm phán bên cạnh kỹ năng ngôn ngữ."
      }
    ]
  },
  {
    "id": "ja-g-n2-09-o-megutte",
    "language": "ja",
    "level": "N2",
    "pattern": "〜をめぐって (o megutte)",
    "meaning": "kết thúc; liên quan đến; xung quanh (vấn đề tranh chấp)",
    "formula": "Danh từ (N) + をめぐって / Danh từ (N) + をめぐる + Danh từ (N)",
    "note": "Động từ theo sau là về tranh luận, xung đột hoặc cạnh tranh (議論する, 対立する, 争う). Không giống như 〜について, nó không được sử dụng để giải thích một chủ đề đơn giản.",
    "examples": [
      {
        "text": "新[あたら]しい空港[くうこう]の建設[けんせつ]をめぐって、住民[じゅうみん]の意見[いけん]が二[ふた]つに分[わ]かれている。",
        "furigana": "新[あたら]しい空港[くうこう]の建設[けんせつ]をめぐって、住民[じゅうみん]の意見[いけん]が二[ふた]つに分[わ]かれている。",
        "reading": "atarashiikuukounokensetsuomegutte、juuminnoikengafutatsuniwakareteiru。",
        "translation": "Người dân chia thành hai luồng ý kiến ​​liên quan đến việc xây dựng sân bay mới."
      },
      {
        "text": "父[ちち]の遺産[いさん]をめぐって、兄弟[きょうだい]の間[あいだ]でもめごとが起[お]きた。",
        "furigana": "父[ちち]の遺産[いさん]をめぐって、兄弟[きょうだい]の間[あいだ]でもめごとが起[お]きた。",
        "reading": "chichinoisanomegutte、kyoudainoaidademomegotogaokita。",
        "translation": "Một cuộc tranh chấp nổ ra giữa hai anh em về quyền thừa kế của cha."
      },
      {
        "text": "首相[しゅしょう]の発言[はつげん]をめぐる議論[ぎろん]は、今[いま]も続[つづ]いている。",
        "furigana": "首相[しゅしょう]の発言[はつげん]をめぐる議論[ぎろん]は、今[いま]も続[つづ]いている。",
        "reading": "shushounohatsugenomegurugironha、imamotsuzuiteiru。",
        "translation": "Cuộc tranh luận về phát biểu của thủ tướng vẫn tiếp tục."
      }
    ]
  },
  {
    "id": "ja-g-n2-10-o-tsuujite-o-tooshite",
    "language": "ja",
    "level": "N2",
    "pattern": "〜を通じて / 〜を通して (o tsuujite / o tooshite)",
    "meaning": "đến; thông qua; bằng cách ; trong suốt (một khoảng thời gian)",
    "formula": "Danh từ (N) + を通じて / Danh từ (N) + を通して",
    "note": "Có thể hoán đổi cho nhau. 〜を通して có xu hướng nhấn mạnh một quá trình hoặc trải nghiệm có chủ ý; 〜を通じて trang trọng hơn một chút và phổ biến hơn với phương tiện truyền thông, địa chỉ liên lạc và thời gian (一年を通じて).",
    "examples": [
      {
        "text": "共通[きょうつう]の友人[ゆうじん]を通[つう]じて、今[いま]の妻[つま]と知[し]り合[あ]った。",
        "furigana": "共通[きょうつう]の友人[ゆうじん]を通[つう]じて、今[いま]の妻[つま]と知[し]り合[あ]った。",
        "reading": "kyoutsuunoyuujinotsuujite、imanotsumatoshiriatta。",
        "translation": "Tôi quen người vợ hiện tại của mình thông qua một người bạn chung."
      },
      {
        "text": "ボランティア活動[かつどう]を通[とお]して、地域[ちいき]の人々[ひとびと]とのつながりが深[ふか]まった。",
        "furigana": "ボランティア活動[かつどう]を通[とお]して、地域[ちいき]の人々[ひとびと]とのつながりが深[ふか]まった。",
        "reading": "ボランティアkatsudouotooshite、chiikinohitobitotonotsunagarigafukamatta。",
        "translation": "Thông qua các hoạt động tình nguyện, tôi đã kết nối sâu sắc hơn với người dân địa phương."
      },
      {
        "text": "この地域[ちいき]は一[いち]年[ねん]を通[つう]じて雨[あめ]が少[すく]ない。",
        "furigana": "この地域[ちいき]は一[いち]年[ねん]を通[つう]じて雨[あめ]が少[すく]ない。",
        "reading": "konochiikihaichinenotsuujiteamegasukunai。",
        "translation": "Khu vực này quanh năm ít mưa."
      }
    ]
  },
  {
    "id": "ja-g-n2-11-o-kikkake-ni",
    "language": "ja",
    "level": "N2",
    "pattern": "〜をきっかけに (o kikkake ni)",
    "meaning": "tận dụng cơ hội; được kích hoạt bởi; với ... khi bắt đầu",
    "formula": "Danh từ (N) + をきっかけに / Danh từ (N) + をきっかけとして / Động từ thể thông thường (V thường) + の + をきっかけに",
    "note": "Đánh dấu một sự kiện dẫn đến một sự khởi đầu hoặc thay đổi mới. Từ tương đương chính thức 〜を契機に thường được sử dụng trong văn viết.",
    "examples": [
      {
        "text": "大学[だいがく]時代[じだい]の留学[りゅうがく]をきっかけに、国際[こくさい]協力[きょうりょく]の仕事[しごと]に興味[きょうみ]を持[も]つようになった。",
        "furigana": "大学[だいがく]時代[じだい]の留学[りゅうがく]をきっかけに、国際[こくさい]協力[きょうりょく]の仕事[しごと]に興味[きょうみ]を持[も]つようになった。",
        "reading": "daigakujidainoryuugakuokikkakeni、kokusaikyouryokunoshigotonikyoumiomotsuyouninatta。",
        "translation": "Sau khi đi du học trong thời gian học đại học, tôi bắt đầu có hứng thú với công việc hợp tác quốc tế."
      },
      {
        "text": "引[ひ]っ越[こ]したのをきっかけに、家具[かぐ]をすべて買[か]い替[か]えた。",
        "furigana": "引[ひ]っ越[こ]したのをきっかけに、家具[かぐ]をすべて買[か]い替[か]えた。",
        "reading": "hikkoshitanookikkakeni、kaguosubetekaikaeta。",
        "translation": "Sau khi chuyển đi tôi đã thay toàn bộ đồ đạc của mình."
      }
    ]
  },
  {
    "id": "ja-g-n2-12-o-nozoite",
    "language": "ja",
    "level": "N2",
    "pattern": "〜を除いて (o nozoite)",
    "meaning": "ngoại trừ; loại trừ; ngoại trừ",
    "formula": "Danh từ (N) + を除いて / Danh từ (N) + を除き / Danh từ (N) + を除く + Danh từ (N)",
    "note": "Trang trọng hơn 〜以外. 〜を除き là dạng viết.",
    "examples": [
      {
        "text": "年末年始[ねんまつねんし]を除[のぞ]いて、図書館[としょかん]は毎日[まいにち]開[あ]いている。",
        "furigana": "年末年始[ねんまつねんし]を除[のぞ]いて、図書館[としょかん]は毎日[まいにち]開[あ]いている。",
        "reading": "nenmatsunenshionozoite、toshokanhamainichiaiteiru。",
        "translation": "Thư viện mở cửa hàng ngày trừ dịp lễ cuối năm và đầu năm mới."
      },
      {
        "text": "一部[いちぶ]の地域[ちいき]を除[のぞ]き、明日[あした]は全国[ぜんこく]的[てき]に晴[は]れるでしょう。",
        "furigana": "一部[いちぶ]の地域[ちいき]を除[のぞ]き、明日[あした]は全国[ぜんこく]的[てき]に晴[は]れるでしょう。",
        "reading": "ichibunochiikionozoki、ashitahazenkokutekiniharerudeshou。",
        "translation": "Ngày mai trời sẽ nắng trên khắp cả nước, ngoại trừ một số khu vực."
      },
      {
        "text": "この件[けん]について知[し]っているのは、私[わたし]を除[のぞ]いて三[さん]人[にん]しかいない。",
        "furigana": "この件[けん]について知[し]っているのは、私[わたし]を除[のぞ]いて三[さん]人[にん]しかいない。",
        "reading": "konokennitsuiteshitteirunoha、watashionozoitesanninshikainai。",
        "translation": "Chỉ có ba người ngoại trừ tôi biết về chuyện này."
      }
    ]
  },
  {
    "id": "ja-g-n2-13-ka-no-you-da",
    "language": "ja",
    "level": "N2",
    "pattern": "〜かのようだ (ka no you da)",
    "meaning": "như thể; như thể (khi nó không thực sự như vậy)",
    "formula": "Động từ thể thông thường (V thường) / Tính từ đuôi い (A-i) + かのようだ / Tính từ đuôi な (A-na) + である + かのようだ / Danh từ (N) + である + かのようだ",
    "note": "Mang tính văn chương nhiều hơn 〜ようだ và báo hiệu rõ ràng rằng sự so sánh này không đúng theo nghĩa đen. Thường kết hợp với まるで. Ngoài ra 〜かのように / 〜かのような.",
    "examples": [
      {
        "text": "彼[かれ]はまるで何[なに]も知[し]らないかのような顔[かお]をしていた。",
        "furigana": "彼[かれ]はまるで何[なに]も知[し]らないかのような顔[かお]をしていた。",
        "reading": "karehamarudenanimoshiranaikanoyounakaooshiteita。",
        "translation": "Anh ấy nhìn như không biết gì cả."
      },
      {
        "text": "三月[さんがつ]なのに、真冬[まふゆ]に戻[もど]ったかのような寒[さむ]さだ。",
        "furigana": "三月[さんがつ]なのに、真冬[まふゆ]に戻[もど]ったかのような寒[さむ]さだ。",
        "reading": "sangatsunanoni、mafuyunimodottakanoyounasamusada。",
        "translation": "Dù đang là tháng 3 nhưng trời lạnh đến mức có cảm giác như chúng ta đang về giữa mùa đông vậy."
      },
      {
        "text": "その記者[きしゃ]は、うわさをまるで事実[じじつ]であるかのように報[ほう]じた。",
        "furigana": "その記者[きしゃ]は、うわさをまるで事実[じじつ]であるかのように報[ほう]じた。",
        "reading": "sonokishaha、uwasaomarudejijitsudearukanoyounihoujita。",
        "translation": "Phóng viên đưa tin đồn như thể đó là sự thật."
      }
    ]
  },
  {
    "id": "ja-g-n2-14-kanenai",
    "language": "ja",
    "level": "N2",
    "pattern": "〜かねない (kanenai)",
    "meaning": "cũng có thể; có thể (dẫn đến điều gì đó tồi tệ)",
    "formula": "Động từ thể ます bỏ ます (V-masu) + かねない",
    "note": "Chỉ cho kết quả không mong muốn. Mặc dù có ない nhưng ý nghĩa vẫn tích cực: 'có nguy cơ thực sự là ...'. Đừng nhầm lẫn với 〜かねる (không thể).",
    "examples": [
      {
        "text": "そんな無理[むり]な運転[うんてん]をしていたら、大[だい]事故[じこ]を起[お]こしかねない。",
        "furigana": "そんな無理[むり]な運転[うんてん]をしていたら、大[だい]事故[じこ]を起[お]こしかねない。",
        "reading": "sonnamurinauntenoshiteitara、daijikoookoshikanenai。",
        "translation": "Lái xe như vậy có thể gây ra tai nạn nghiêm trọng."
      },
      {
        "text": "不用意[ふようい]な一言[ひとこと]が、会社[かいしゃ]の信用[しんよう]を失[うしな]うことにつながりかねない。",
        "furigana": "不用意[ふようい]な一言[ひとこと]が、会社[かいしゃ]の信用[しんよう]を失[うしな]うことにつながりかねない。",
        "reading": "fuyouinahitokotoga、kaishanoshinyououshinaukotonitsunagarikanenai。",
        "translation": "Một lời nói bất cẩn có thể dẫn đến mất niềm tin vào công ty."
      },
      {
        "text": "あの人[ひと]なら、平気[へいき]でうそをつきかねない。",
        "furigana": "あの人[ひと]なら、平気[へいき]でうそをつきかねない。",
        "reading": "anohitonara、heikideusootsukikanenai。",
        "translation": "Người đó có thể dễ dàng nói dối."
      }
    ]
  },
  {
    "id": "ja-g-n2-15-kaneru",
    "language": "ja",
    "level": "N2",
    "pattern": "〜かねる (kaneru)",
    "meaning": "không thể; không thể (từ chối lịch sự); khó kết hợp với",
    "formula": "Động từ thể ます bỏ ます (V-masu) + かねる",
    "note": "Một cách từ chối nhẹ nhàng, trang trọng, rất phổ biến trong dịch vụ khách hàng. Nó thể hiện sự miễn cưỡng hoặc khó khăn của người nói chứ không phải sự bất lực về thể chất.",
    "examples": [
      {
        "text": "申[もう]し訳[わけ]ございませんが、そのご質問[しつもん]にはお答[こた]えしかねます。",
        "furigana": "申[もう]し訳[わけ]ございませんが、そのご質問[しつもん]にはお答[こた]えしかねます。",
        "reading": "moushiwakegozaimasenga、sonogoshitsumonnihaokotaeshikanemasu。",
        "translation": "Tôi xin lỗi, nhưng tôi không thể trả lời câu hỏi đó."
      },
      {
        "text": "個人[こじん]情報[じょうほう]に関[かん]するお問[と]い合[あ]わせには、お電話[でんわ]では対応[たいおう]いたしかねます。",
        "furigana": "個人[こじん]情報[じょうほう]に関[かん]するお問[と]い合[あ]わせには、お電話[でんわ]では対応[たいおう]いたしかねます。",
        "reading": "kojinjouhounikansuruotoiawaseniha、odenwadehataiouitashikanemasu。",
        "translation": "Chúng tôi không thể trả lời các câu hỏi liên quan đến thông tin cá nhân qua điện thoại."
      },
      {
        "text": "彼[かれ]のやり方[かた]には、どうしても賛成[さんせい]しかねる。",
        "furigana": "彼[かれ]のやり方[かた]には、どうしても賛成[さんせい]しかねる。",
        "reading": "karenoyarikataniha、doushitemosanseishikaneru。",
        "translation": "Tôi không thể đồng ý với cách tiếp cận của anh ấy."
      }
    ]
  },
  {
    "id": "ja-g-n2-16-zu-ni-wa-irarenai",
    "language": "ja",
    "level": "N2",
    "pattern": "〜ずにはいられない (zu ni wa irarenai)",
    "meaning": "không thể không làm; không thể cưỡng lại việc làm",
    "formula": "Động từ thể ない (V-nai) stem + ずにはいられない",
    "note": "する trở thành せずにはいられない. 〜ないではいられない là một từ tương đương mang tính đàm thoại hơn một chút. Sự thôi thúc bên trong, không giống như 〜ざるを得ない (do hoàn cảnh ép buộc).",
    "examples": [
      {
        "text": "あまりにひどいニュースに、怒[いか]りを感[かん]じずにはいられなかった。",
        "furigana": "あまりにひどいニュースに、怒[いか]りを感[かん]じずにはいられなかった。",
        "reading": "amarinihidoiニュースni、ikariokanjizunihairarenakatta。",
        "translation": "Tin tức khủng khiếp đến mức tôi không khỏi tức giận."
      },
      {
        "text": "彼女[かのじょ]の苦労[くろう]話[ばなし]を聞[き]いて、泣[な]かずにはいられなかった。",
        "furigana": "彼女[かのじょ]の苦労[くろう]話[ばなし]を聞[き]いて、泣[な]かずにはいられなかった。",
        "reading": "kanojonokuroubanashiokiite、nakazunihairarenakatta。",
        "translation": "Tôi không cầm được nước mắt khi nghe câu chuyện khó khăn của chị."
      },
      {
        "text": "このシリーズは、一度[いちど]読[よ]み始[はじ]めたら最後[さいご]まで読[よ]まずにはいられない。",
        "furigana": "このシリーズは、一度[いちど]読[よ]み始[はじ]めたら最後[さいご]まで読[よ]まずにはいられない。",
        "reading": "konoシリーズha、ichidoyomihajimetarasaigomadeyomazunihairarenai。",
        "translation": "Khi bắt đầu đọc bộ truyện này, bạn sẽ không thể không đọc đến cuối."
      }
    ]
  },
  {
    "id": "ja-g-n2-17-zaru-o-enai",
    "language": "ja",
    "level": "N2",
    "pattern": "〜ざるを得ない (zaru o enai)",
    "meaning": "không còn lựa chọn nào khác; không thể không",
    "formula": "Động từ thể ない (V-nai) stem + ざるを得ない",
    "note": "Hoàn cảnh buộc người nói phải thực hiện một hành động không thực sự muốn thực hiện. する trở thành せざるを得ない. Trang trọng hơn 〜しかない.",
    "examples": [
      {
        "text": "予算[よさん]が足[た]りないので、計画[けいかく]を縮小[しゅくしょう]せざるを得[え]ない。",
        "furigana": "予算[よさん]が足[た]りないので、計画[けいかく]を縮小[しゅくしょう]せざるを得[え]ない。",
        "reading": "yosangatarinainode、keikakuoshukushousezaruoenai。",
        "translation": "Do thiếu ngân sách nên chúng tôi không còn lựa chọn nào khác ngoài việc thu nhỏ lại kế hoạch của mình."
      },
      {
        "text": "上司[じょうし]の命令[めいれい]だったので、気[き]が進[すす]まなくても行[い]かざるを得[え]なかった。",
        "furigana": "上司[じょうし]の命令[めいれい]だったので、気[き]が進[すす]まなくても行[い]かざるを得[え]なかった。",
        "reading": "joushinomeireidattanode、kigasusumanakutemoikazaruoenakatta。",
        "translation": "Đó là lệnh của sếp nên tôi không còn cách nào khác là phải đi mặc dù không muốn."
      },
      {
        "text": "彼[かれ]の努力[どりょく]だけは認[みと]めざるを得[え]ない。",
        "furigana": "彼[かれ]の努力[どりょく]だけは認[みと]めざるを得[え]ない。",
        "reading": "karenodoryokudakehamitomezaruoenai。",
        "translation": "Tôi phải ghi nhận nỗ lực của anh ấy."
      }
    ]
  },
  {
    "id": "ja-g-n2-18-te-wa-irarenai",
    "language": "ja",
    "level": "N2",
    "pattern": "〜てはいられない (te wa irarenai)",
    "meaning": "không đủ khả năng để (tiếp tục) làm; không thể chỉ dựa vào",
    "formula": "Động từ thể て (V-te) + はいられない",
    "note": "Hoàn cảnh không cho phép người ta ở trạng thái A nên người ta cảm thấy bị thúc đẩy phải hành động. Bình thường: 〜ちゃいられない / 〜てらんない.",
    "examples": [
      {
        "text": "締[し]め切[き]りが迫[せま]っているので、のんびりしてはいられない。",
        "furigana": "締[し]め切[き]りが迫[せま]っているので、のんびりしてはいられない。",
        "reading": "shimekirigasematteirunode、nonbirishitehairarenai。",
        "translation": "Thời hạn đang đến gần nên tôi không thể dễ dàng được."
      },
      {
        "text": "困[こま]っている人[ひと]を見[み]ると、黙[だま]ってはいられない性格[せいかく]だ。",
        "furigana": "困[こま]っている人[ひと]を見[み]ると、黙[だま]ってはいられない性格[せいかく]だ。",
        "reading": "komatteiruhitoomiruto、damattehairarenaiseikakuda。",
        "translation": "Khi thấy ai đó gặp khó khăn, tôi không thể im lặng."
      }
    ]
  },
  {
    "id": "ja-g-n2-19-mono-ka",
    "language": "ja",
    "level": "N2",
    "pattern": "〜ものか (mono ka)",
    "meaning": "không thể nào (tôi sẽ); như thể ; Tôi thậm chí sẽ không bao giờ",
    "formula": "Động từ thể từ điển (V-dict) / Tính từ đuôi い (A-i) / Tính từ đuôi な (A-na) + な + ものか",
    "note": "Từ chối hoặc từ chối cảm xúc mạnh mẽ; không phải là một câu hỏi thực sự Dạng hội thoại: 〜もんか; lịch sự/nữ tính: 〜ものですか.",
    "examples": [
      {
        "text": "あんな失礼[しつれい]な店[みせ]には、二度[にど]と行[い]くものか。",
        "furigana": "あんな失礼[しつれい]な店[みせ]には、二度[にど]と行[い]くものか。",
        "reading": "annashitsureinamiseniha、nidotoikumonoka。",
        "translation": "Liệu tôi có bao giờ đến một nhà hàng thô lỗ như vậy nữa không?"
      },
      {
        "text": "一[いち]度[ど]や二[に]度[ど]失敗[しっぱい]したくらいで、諦[あきら]めるもんか。",
        "furigana": "一[いち]度[ど]や二[に]度[ど]失敗[しっぱい]したくらいで、諦[あきら]めるもんか。",
        "reading": "ichidoyanidoshippaishitakuraide、akiramerumonka。",
        "translation": "Tại sao lại bỏ cuộc sau khi thất bại một hoặc hai lần?"
      },
      {
        "text": "あの人[ひと]の気持[きも]ちなんて、君[きみ]に分[わ]かるものか。",
        "furigana": "あの人[ひと]の気持[きも]ちなんて、君[きみ]に分[わ]かるものか。",
        "reading": "anohitonokimochinante、kiminiwakarumonoka。",
        "translation": "Bạn có biết người đó cảm thấy thế nào không?"
      }
    ]
  },
  {
    "id": "ja-g-n2-20-mono-no",
    "language": "ja",
    "level": "N2",
    "pattern": "〜ものの (mono no)",
    "meaning": "; mặc dù (nhưng kết quả mong đợi không theo sau)",
    "formula": "Động từ thể thông thường (V thường) / Tính từ đuôi い (A-i) / Tính từ đuôi な (A-na) + な / Tính từ đuôi な (A-na) + である / Danh từ (N) + である + ものの",
    "note": "Thừa nhận sự thật đầu tiên, sau đó nói rằng mọi thứ không diễn ra như nó tưởng. Được viết nhiều hơn 〜けれども.",
    "examples": [
      {
        "text": "免許[めんきょ]は取[と]ったものの、怖[こわ]くてまだ一[いち]度[ど]も運転[うんてん]していない。",
        "furigana": "免許[めんきょ]は取[と]ったものの、怖[こわ]くてまだ一[いち]度[ど]も運転[うんてん]していない。",
        "reading": "menkyohatottamonono、kowakutemadaichidomountenshiteinai。",
        "translation": "Mình đã có bằng nhưng chưa lái xe bao giờ vì sợ."
      },
      {
        "text": "新[あたら]しい制度[せいど]は導入[どうにゅう]されたものの、十分[じゅうぶん]に活用[かつよう]されていないのが現状[げんじょう]だ。",
        "furigana": "新[あたら]しい制度[せいど]は導入[どうにゅう]されたものの、十分[じゅうぶん]に活用[かつよう]されていないのが現状[げんじょう]だ。",
        "reading": "atarashiiseidohadounyuusaretamonono、juubunnikatsuyousareteinainogagenjouda。",
        "translation": "Mặc dù hệ thống mới đã được giới thiệu nhưng tình hình hiện tại là nó chưa được tận dụng triệt để."
      },
      {
        "text": "この部屋[へや]は駅[えき]から近[ちか]いものの、日当[ひあ]たりが悪[わる]いのが難点[なんてん]だ。",
        "furigana": "この部屋[へや]は駅[えき]から近[ちか]いものの、日当[ひあ]たりが悪[わる]いのが難点[なんてん]だ。",
        "reading": "konoheyahaekikarachikaimonono、hiatarigawaruinoganantenda。",
        "translation": "Tuy phòng này gần ga nhưng vấn đề là không nhận được nhiều ánh nắng."
      }
    ]
  },
  {
    "id": "ja-g-n2-21-mono-nara",
    "language": "ja",
    "level": "N2",
    "pattern": "〜ものなら (mono nara)",
    "meaning": "if (có thể); giá như chỉ có một thì",
    "formula": "Động từ thể từ điển (V-dict) (potential form) + ものなら",
    "note": "Đối với một việc gì đó khó hoặc không thể làm được; mệnh đề chính thường là 〜たい hoặc một lời thách thức. Đừng nhầm lẫn với N1 〜(よ)うものなら ('nếu ai dám..., sẽ có chuyện không hay xảy ra').",
    "examples": [
      {
        "text": "できるものなら、学生[がくせい]時代[じだい]に戻[もど]ってもう一度[いちど]やり直[なお]したい。",
        "furigana": "できるものなら、学生[がくせい]時代[じだい]に戻[もど]ってもう一度[いちど]やり直[なお]したい。",
        "reading": "dekirumononara、gakuseijidainimodottemouichidoyarinaoshitai。",
        "translation": "Nếu có thể, tôi muốn quay lại thời sinh viên và thử lại."
      },
      {
        "text": "行[い]けるものなら行[い]きたいが、その日[ひ]はどうしても仕事[しごと]を休[やす]めない。",
        "furigana": "行[い]けるものなら行[い]きたいが、その日[ひ]はどうしても仕事[しごと]を休[やす]めない。",
        "reading": "ikerumononaraikitaiga、sonohihadoushitemoshigotooyasumenai。",
        "translation": "Tôi muốn đi nếu có thể, nhưng tôi không đủ khả năng để nghỉ làm vào ngày hôm đó."
      },
      {
        "text": "止[と]められるものなら止[と]めてみろ。",
        "furigana": "止[と]められるものなら止[と]めてみろ。",
        "reading": "tomerarerumononaratometemiro。",
        "translation": "Nếu ngăn được thì hãy cố gắng dừng lại."
      }
    ]
  },
  {
    "id": "ja-g-n2-22-kurai-nara-gurai-nara",
    "language": "ja",
    "level": "N2",
    "pattern": "〜くらいなら / 〜ぐらいなら (kurai nara / gurai nara)",
    "meaning": "mà là; nếu phải làm việc đó thì tôi thà",
    "formula": "Động từ thể từ điển (V-dict) + くらいなら / Động từ thể từ điển (V-dict) + ぐらいなら",
    "note": "A là điều mà người nói cực kỳ không thích; B là lựa chọn ít xấu xa hơn hoặc tốt hơn, thường đi kèm với 〜ほうがいい / 〜ほうがましだ.",
    "examples": [
      {
        "text": "あんな人[ひと]に頭[あたま]を下[さ]げるくらいなら、会社[かいしゃ]を辞[や]めたほうがましだ。",
        "furigana": "あんな人[ひと]に頭[あたま]を下[さ]げるくらいなら、会社[かいしゃ]を辞[や]めたほうがましだ。",
        "reading": "annahitoniatamaosagerukurainara、kaishaoyametahougamashida。",
        "translation": "Tôi thà rời công ty còn hơn cúi đầu trước một người như vậy."
      },
      {
        "text": "途中[とちゅう]で投[な]げ出[だ]すぐらいなら、最初[さいしょ]から引[ひ]き受[う]けないほうがいい。",
        "furigana": "途中[とちゅう]で投[な]げ出[だ]すぐらいなら、最初[さいしょ]から引[ひ]き受[う]けないほうがいい。",
        "reading": "tochuudenagedasugurainara、saishokarahikiukenaihougaii。",
        "translation": "Thà không chấp nhận lời đề nghị ngay từ đầu còn hơn là bỏ cuộc giữa chừng."
      }
    ]
  },
  {
    "id": "ja-g-n2-23-mono-ga-aru",
    "language": "ja",
    "level": "N2",
    "pattern": "〜ものがある (mono ga aru)",
    "meaning": "có cái gì đó (về nó là thế) ...; thực sự là",
    "formula": "Động từ thể từ điển (V-dict) / Tính từ đuôi い (A-i) / Tính từ đuôi な (A-na) + な + ものがある",
    "note": "Diễn tả ấn tượng mạnh mẽ của người nói về chất lượng cảm nhận được ở điều gì đó. Đó là một sự đánh giá, không phải là một tuyên bố về sự tồn tại theo nghĩa đen.",
    "examples": [
      {
        "text": "この画家[がか]の初期[しょき]の作品[さくひん]には、見[み]る人[ひと]の心[こころ]を強[つよ]く打[う]つものがある。",
        "furigana": "この画家[がか]の初期[しょき]の作品[さくひん]には、見[み]る人[ひと]の心[こころ]を強[つよ]く打[う]つものがある。",
        "reading": "konogakanoshokinosakuhinniha、miruhitonokokorootsuyokuutsumonogaaru。",
        "translation": "Những tác phẩm đầu tay của nghệ sĩ này có tác động mạnh mẽ đến người xem."
      },
      {
        "text": "毎日[まいにち]二[に]時間[じかん]かけて通勤[つうきん]するのは、正直[しょうじき]つらいものがある。",
        "furigana": "毎日[まいにち]二[に]時間[じかん]かけて通勤[つうきん]するのは、正直[しょうじき]つらいものがある。",
        "reading": "mainichinijikankaketetsuukinsurunoha、shoujikitsuraimonogaaru。",
        "translation": "Thành thật mà nói, việc đi lại hai giờ mỗi ngày có thể là một điều khó khăn."
      },
      {
        "text": "若[わか]い選手[せんしゅ]たちの成長[せいちょう]ぶりには、目[め]を見張[みは]るものがある。",
        "furigana": "若[わか]い選手[せんしゅ]たちの成長[せいちょう]ぶりには、目[め]を見張[みは]るものがある。",
        "reading": "wakaisenshutachinoseichouburiniha、meomiharumonogaaru。",
        "translation": "Sự trưởng thành của những cầu thủ trẻ này là một điều đáng chú ý."
      }
    ]
  },
  {
    "id": "ja-g-n2-24-koto-ka",
    "language": "ja",
    "level": "N2",
    "pattern": "〜ことか (koto ka)",
    "meaning": "làm sao ...!; bao nhiêu ...!",
    "formula": "Từ để hỏi + … + Động từ thể thông thường (V thường) / Tính từ đuôi い (A-i) / Tính từ đuôi な (A-na) + な + ことか",
    "note": "Thường đi kèm với どんなに, どれほど, 何度, v.v. Không phải là một câu hỏi thực sự; nó truyền tải cảm xúc sâu sắc. Giọng điệu nhẹ nhàng hoặc kịch tính.",
    "examples": [
      {
        "text": "この日[ひ]が来[く]るのを、どれほど待[ま]ち望[のぞ]んだことか。",
        "furigana": "この日[ひ]が来[く]るのを、どれほど待[ま]ち望[のぞ]んだことか。",
        "reading": "konohigakurunoo、dorehodomachinozondakotoka。",
        "translation": "Tôi đã chờ đợi ngày này đến bao lâu rồi."
      },
      {
        "text": "一人暮[ひとりぐ]らしを始[はじ]めて、家族[かぞく]のありがたさを何[なん]度[ど]感[かん]じたことか。",
        "furigana": "一人暮[ひとりぐ]らしを始[はじ]めて、家族[かぞく]のありがたさを何[なん]度[ど]感[かん]じたことか。",
        "reading": "hitorigurashiohajimete、kazokunoarigatasaonandokanjitakotoka。",
        "translation": "Đã bao nhiêu lần tôi cảm thấy biết ơn gia đình mình kể từ khi tôi bắt đầu sống một mình?"
      },
      {
        "text": "無事[ぶじ]だと聞[き]いて、どんなに安心[あんしん]したことか。",
        "furigana": "無事[ぶじ]だと聞[き]いて、どんなに安心[あんしん]したことか。",
        "reading": "bujidatokiite、donnanianshinshitakotoka。",
        "translation": "Tôi thật nhẹ nhõm biết bao khi biết rằng bạn vẫn an toàn."
      }
    ]
  },
  {
    "id": "ja-g-n2-25-koto-ni-wa",
    "language": "ja",
    "level": "N2",
    "pattern": "〜ことに（は） (koto ni wa)",
    "meaning": "(cảm xúc)-ly; điều gì là (ngạc nhiên, buồn, v.v.) là",
    "formula": "Động từ thể た (V-ta) / Tính từ đuôi い (A-i) / Tính từ đuôi な (A-na) + な + ことに（は）",
    "note": "Một từ cảm xúc (驚いた, 残念な, うれしい, 不思議な) thể hiện cảm xúc của người nói trước khi đưa ra sự thật. Viết khá.",
    "examples": [
      {
        "text": "驚[おどろ]いたことに、彼[かれ]は会社[かいしゃ]を辞[や]めてパン屋[や]を開[ひら]いたそうだ。",
        "furigana": "驚[おどろ]いたことに、彼[かれ]は会社[かいしゃ]を辞[や]めてパン屋[や]を開[ひら]いたそうだ。",
        "reading": "odoroitakotoni、karehakaishaoyameteパンyaohiraitasouda。",
        "translation": "Tôi rất ngạc nhiên khi thấy anh ấy đã nghỉ việc và mở một tiệm bánh."
      },
      {
        "text": "残念[ざんねん]なことに、その美[うつく]しい建物[たてもの]は来月[らいげつ]取[と]り壊[こわ]されることになった。",
        "furigana": "残念[ざんねん]なことに、その美[うつく]しい建物[たてもの]は来月[らいげつ]取[と]り壊[こわ]されることになった。",
        "reading": "zannennakotoni、sonoutsukushiitatemonoharaigetsutorikowasarerukotoninatta。",
        "translation": "Thật không may, tòa nhà đẹp đẽ này sẽ bị phá bỏ vào tháng tới."
      },
      {
        "text": "うれしいことには、応募[おうぼ]作品[さくひん]が予想[よそう]の倍[ばい]以上[いじょう]も集[あつ]まった。",
        "furigana": "うれしいことには、応募[おうぼ]作品[さくひん]が予想[よそう]の倍[ばい]以上[いじょう]も集[あつ]まった。",
        "reading": "ureshiikotoniha、oubosakuhingayosounobaiijoumoatsumatta。",
        "translation": "Chúng tôi rất vui mừng khi nhận được số lượng bài dự thi nhiều hơn gấp đôi so với mong đợi."
      }
    ]
  },
  {
    "id": "ja-g-n2-26-koto-dakara",
    "language": "ja",
    "level": "N2",
    "pattern": "〜ことだから (koto dakara)",
    "meaning": "biết (ai đó); vì đó là (ai đó), chắc chắn là",
    "formula": "Danh từ (N) + の + ことだから",
    "note": "Từ những gì người nói biết về tính cách của một người, nó sẽ dẫn đến phỏng đoán về hành vi của họ. Thường theo sau là だろう, きっと hoặc に違いない.",
    "examples": [
      {
        "text": "几帳面[きちょうめん]な彼[かれ]のことだから、書類[しょるい]はもう準備[じゅんび]してあるだろう。",
        "furigana": "几帳面[きちょうめん]な彼[かれ]のことだから、書類[しょるい]はもう準備[じゅんび]してあるだろう。",
        "reading": "kichoumennakarenokotodakara、shoruihamoujunbishitearudarou。",
        "translation": "Anh ấy là người tỉ mỉ nên tôi chắc chắn rằng anh ấy đã chuẩn bị sẵn hồ sơ rồi."
      },
      {
        "text": "あの子[こ]のことだから、きっとどこかで寄[よ]り道[みち]をしているんだよ。",
        "furigana": "あの子[こ]のことだから、きっとどこかで寄[よ]り道[みち]をしているんだよ。",
        "reading": "anokonokotodakara、kittodokokadeyorimichioshiteirundayo。",
        "translation": "Vì là về thằng nhóc đó nên tôi chắc chắn nó đang đi đường vòng đâu đó."
      }
    ]
  },
  {
    "id": "ja-g-n2-27-koto-naku",
    "language": "ja",
    "level": "N2",
    "pattern": "〜ことなく (koto naku)",
    "meaning": "không có (làm); không bao giờ",
    "formula": "Động từ thể từ điển (V-dict) + ことなく",
    "note": "Một cách viết tương đương với 〜ないで / 〜ずに, thường ngụ ý rằng điều gì đó mà người ta mong đợi sẽ không xảy ra.",
    "examples": [
      {
        "text": "彼[かれ]は三[さん]十[じゅう]年間[ねんかん]、一[いち]日[にち]も休[やす]むことなく店[みせ]を開[あ]け続[つづ]けた。",
        "furigana": "彼[かれ]は三[さん]十[じゅう]年間[ねんかん]、一[いち]日[にち]も休[やす]むことなく店[みせ]を開[あ]け続[つづ]けた。",
        "reading": "karehasanjuunenkan、ichinichimoyasumukotonakumiseoaketsuzuketa。",
        "translation": "Ông ấy đã mở cửa hàng suốt ba mươi năm không một ngày nghỉ."
      },
      {
        "text": "失敗[しっぱい]を恐[おそ]れることなく、新[あたら]しいことに挑戦[ちょうせん]してほしい。",
        "furigana": "失敗[しっぱい]を恐[おそ]れることなく、新[あたら]しいことに挑戦[ちょうせん]してほしい。",
        "reading": "shippaioosorerukotonaku、atarashiikotonichousenshitehoshii。",
        "translation": "Tôi muốn bạn thử những điều mới mà không sợ thất bại."
      }
    ]
  },
  {
    "id": "ja-g-n2-28-koto-kara",
    "language": "ja",
    "level": "N2",
    "pattern": "〜ことから (koto kara)",
    "meaning": "từ thực tế đó; bởi vì; đánh giá từ",
    "formula": "Động từ thể thông thường (V thường) / Tính từ đuôi い (A-i) / Tính từ đuôi な (A-na) + な / Tính từ đuôi な (A-na) + である / Danh từ (N) + である + ことから",
    "note": "Đưa ra bằng chứng hoặc nguồn gốc đằng sau một cái tên, phán đoán hoặc kết luận. Phổ biến trong việc giải thích tên địa danh và trong các báo cáo.",
    "examples": [
      {
        "text": "この坂[さか]は、昔[むかし]から桜[さくら]の名所[めいしょ]であることから「桜[さくら]坂[ざか]」と呼[よ]ばれている。",
        "furigana": "この坂[さか]は、昔[むかし]から桜[さくら]の名所[めいしょ]であることから「桜[さくら]坂[ざか]」と呼[よ]ばれている。",
        "reading": "konosakaha、mukashikarasakuranomeishodearukotokara「sakurazaka」toyobareteiru。",
        "translation": "Con dốc này được gọi là ``Sakurazaka'' vì từ lâu đã trở thành địa điểm nổi tiếng để ngắm hoa anh đào."
      },
      {
        "text": "現場[げんば]に靴[くつ]の跡[あと]が残[のこ]っていたことから、犯人[はんにん]は外[そと]から侵入[しんにゅう]したと考[かんが]えられる。",
        "furigana": "現場[げんば]に靴[くつ]の跡[あと]が残[のこ]っていたことから、犯人[はんにん]は外[そと]から侵入[しんにゅう]したと考[かんが]えられる。",
        "reading": "genbanikutsunoatoganokotteitakotokara、hanninhasotokarashinnyuushitatokangaerareru。",
        "translation": "Vì dấu giày còn sót lại tại hiện trường vụ án nên người ta tin rằng thủ phạm đã vào từ bên ngoài."
      }
    ]
  },
  {
    "id": "ja-g-n2-29-nai-koto-ni-wa",
    "language": "ja",
    "level": "N2",
    "pattern": "〜ないことには (nai koto ni wa)",
    "meaning": "trừ khi; if ... not (thì điều đó không thể xảy ra)",
    "formula": "Động từ thể ない (V-nai) / Tính từ đuôi い (A-i)-ku + ない / Tính từ đuôi な (A-na) + でない / Danh từ (N) + でない + ことには",
    "note": "Mệnh đề chính phủ định (分からない, できない, 始まらない): không có A thì B không thể xảy ra. Nhấn mạnh hơn 〜なければ.",
    "examples": [
      {
        "text": "実際[じっさい]に会[あ]って話[はな]してみないことには、どんな人[ひと]か分[わ]からない。",
        "furigana": "実際[じっさい]に会[あ]って話[はな]してみないことには、どんな人[ひと]か分[わ]からない。",
        "reading": "jissainiattehanashiteminaikotoniha、donnahitokawakaranai。",
        "translation": "Bạn sẽ không biết ai đó là người như thế nào cho đến khi bạn thực sự gặp và nói chuyện với họ."
      },
      {
        "text": "社長[しゃちょう]の許可[きょか]が出[で]ないことには、このプロジェクトは始[はじ]められない。",
        "furigana": "社長[しゃちょう]の許可[きょか]が出[で]ないことには、このプロジェクトは始[はじ]められない。",
        "reading": "shachounokyokagadenaikotoniha、konoプロジェクトhahajimerarenai。",
        "translation": "Dự án này không thể bắt đầu nếu không có sự cho phép của chủ tịch."
      }
    ]
  },
  {
    "id": "ja-g-n2-30-koto-wa-ga",
    "language": "ja",
    "level": "N2",
    "pattern": "〜ことは〜が (koto wa ... ga)",
    "meaning": "đúng là ..., nhưng; (Tôi) làm ..., nhưng",
    "formula": "Động từ thể thông thường (V thường) + ことは + Động từ thể thông thường (V thường) + が / Tính từ đuôi い (A-i) + ことは + Tính từ đuôi い (A-i) + が / Tính từ đuôi な (A-na) + な + ことは + Tính từ đuôi な (A-na) + だ + が",
    "note": "Cùng một từ được lặp lại để thừa nhận điều gì đó chỉ một phần trước khi thêm sự bảo lưu. けど thay thế が trong lời nói.",
    "examples": [
      {
        "text": "あの映画[えいが]、見[み]たことは見[み]たけど、途中[とちゅう]で寝[ね]てしまった。",
        "furigana": "あの映画[えいが]、見[み]たことは見[み]たけど、途中[とちゅう]で寝[ね]てしまった。",
        "reading": "anoeiga、mitakotohamitakedo、tochuudeneteshimatta。",
        "translation": "Mình xem phim đó rồi mà ngủ quên giữa chừng."
      },
      {
        "text": "この部屋[へや]は広[ひろ]いことは広[ひろ]いが、駅[えき]からかなり遠[とお]い。",
        "furigana": "この部屋[へや]は広[ひろ]いことは広[ひろ]いが、駅[えき]からかなり遠[とお]い。",
        "reading": "konoheyahahiroikotohahiroiga、ekikarakanaritooi。",
        "translation": "Phòng này rộng rãi nhưng lại khá xa ga."
      },
      {
        "text": "彼[かれ]の説明[せつめい]は、分[わ]かることは分[わ]かるが、納得[なっとく]はできない。",
        "furigana": "彼[かれ]の説明[せつめい]は、分[わ]かることは分[わ]かるが、納得[なっとく]はできない。",
        "reading": "karenosetsumeiha、wakarukotohawakaruga、nattokuhadekinai。",
        "translation": "Tôi hiểu lời giải thích của anh ấy có lý, nhưng tôi không hiểu."
      }
    ]
  },
  {
    "id": "ja-g-n2-31-ageku",
    "language": "ja",
    "level": "N2",
    "pattern": "〜あげく (ageku)",
    "meaning": "sau (một quá trình lâu dài và rắc rối); cuối cùng",
    "formula": "Động từ thể た (V-ta) + あげく / Danh từ (N) + の + あげく",
    "note": "Kết quả thường là tiêu cực hoặc đáng thất vọng. 〜末(に) mang tính trung lập và có thể kết thúc tốt đẹp; あげく nhấn mạnh sự thất vọng. あげくの果てに là dạng tăng cường.",
    "examples": [
      {
        "text": "さんざん迷[まよ]ったあげく、結局[けっきょく]どちらも買[か]わなかった。",
        "furigana": "さんざん迷[まよ]ったあげく、結局[けっきょく]どちらも買[か]わなかった。",
        "reading": "sanzanmayottaageku、kekkyokudochiramokawanakatta。",
        "translation": "Sau nhiều đắn đo, cuối cùng tôi cũng không mua."
      },
      {
        "text": "長時間[ちょうじかん]の話[はな]し合[あ]いのあげく、計画[けいかく]は白紙[はくし]に戻[もど]された。",
        "furigana": "長時間[ちょうじかん]の話[はな]し合[あ]いのあげく、計画[けいかく]は白紙[はくし]に戻[もど]された。",
        "reading": "choujikannohanashiainoageku、keikakuhahakushinimodosareta。",
        "translation": "Sau một thời gian dài thảo luận, kế hoạch đã bị hủy bỏ."
      },
      {
        "text": "彼[かれ]は無理[むり]を重[かさ]ねたあげく、体[からだ]を壊[こわ]して入院[にゅういん]してしまった。",
        "furigana": "彼[かれ]は無理[むり]を重[かさ]ねたあげく、体[からだ]を壊[こわ]して入院[にゅういん]してしまった。",
        "reading": "karehamuriokasanetaageku、karadaokowashitenyuuinshiteshimatta。",
        "translation": "Sau khi cố gắng quá sức, anh ấy suy sụp và phải nhập viện."
      }
    ]
  },
  {
    "id": "ja-g-n2-32-amari-ni",
    "language": "ja",
    "level": "N2",
    "pattern": "〜あまり（に） (amari ni)",
    "meaning": "nhiều thế; quá mức; vì quá nhiều",
    "formula": "Động từ thể từ điển (V-dict) / Động từ thể た (V-ta) / Tính từ đuôi な (A-na) + な / Danh từ (N) + の + あまり（に）",
    "note": "Mức độ cực đoan của một cảm giác hoặc trạng thái dẫn đến một kết quả bất thường, thường không mong muốn. Chủ yếu là với các danh từ chỉ cảm xúc (緊張, 心配, 驚き, 悲しみ).",
    "examples": [
      {
        "text": "彼女[かのじょ]は緊張[きんちょう]のあまり、スピーチの内容[ないよう]を忘[わす]れてしまった。",
        "furigana": "彼女[かのじょ]は緊張[きんちょう]のあまり、スピーチの内容[ないよう]を忘[わす]れてしまった。",
        "reading": "kanojohakinchounoamari、スピーチnonaiyouowasureteshimatta。",
        "translation": "Cô ấy lo lắng đến mức quên mất nội dung bài phát biểu của mình."
      },
      {
        "text": "子[こ]どもの将来[しょうらい]を心配[しんぱい]するあまり、親[おや]が口[くち]を出[だ]しすぎることがある。",
        "furigana": "子[こ]どもの将来[しょうらい]を心配[しんぱい]するあまり、親[おや]が口[くち]を出[だ]しすぎることがある。",
        "reading": "kodomonoshouraioshinpaisuruamari、oyagakuchiodashisugirukotogaaru。",
        "translation": "Cha mẹ đôi khi quá lo lắng cho tương lai của con cái đến mức quan tâm quá mức."
      },
      {
        "text": "うれしさのあまり、思[おも]わず涙[なみだ]が出[で]た。",
        "furigana": "うれしさのあまり、思[おも]わず涙[なみだ]が出[で]た。",
        "reading": "ureshisanoamari、omowazunamidagadeta。",
        "translation": "Tôi mừng đến mức bật khóc."
      }
    ]
  },
  {
    "id": "ja-g-n2-33-ue-ni",
    "language": "ja",
    "level": "N2",
    "pattern": "〜上（に） (ue ni)",
    "meaning": "; ở trên ; ngoài ra",
    "formula": "Động từ thể thông thường (V thường) / Tính từ đuôi い (A-i) / Tính từ đuôi な (A-na) + な / Danh từ (N) + である + 上（に）",
    "note": "Thêm điểm thứ hai cùng loại (tốt + tốt, xấu + xấu). に có thể được viết ra bằng văn bản. Nó thường không được theo sau bởi một mệnh lệnh hoặc yêu cầu.",
    "examples": [
      {
        "text": "あのレストランは料理[りょうり]がおいしい上[うえ]に、値段[ねだん]も手頃[てごろ]だ。",
        "furigana": "あのレストランは料理[りょうり]がおいしい上[うえ]に、値段[ねだん]も手頃[てごろ]だ。",
        "reading": "anoレストランharyourigaoishiiueni、nedanmotegoroda。",
        "translation": "Đồ ăn ở nhà hàng đó ngon và giá cả hợp lý."
      },
      {
        "text": "道[みち]に迷[まよ]った上[うえ]に、雨[あめ]まで降[ふ]ってきた。",
        "furigana": "道[みち]に迷[まよ]った上[うえ]に、雨[あめ]まで降[ふ]ってきた。",
        "reading": "michinimayottaueni、amemadefuttekita。",
        "translation": "Tôi không chỉ bị lạc mà trời còn bắt đầu mưa."
      },
      {
        "text": "彼女[かのじょ]は仕事[しごと]が速[はや]い上[うえ]、ミスもほとんどない。",
        "furigana": "彼女[かのじょ]は仕事[しごと]が速[はや]い上[うえ]、ミスもほとんどない。",
        "reading": "kanojohashigotogahayaiue、ミスmohotondonai。",
        "translation": "Cô ấy làm việc nhanh và ít mắc lỗi."
      }
    ]
  },
  {
    "id": "ja-g-n2-34-ue-de",
    "language": "ja",
    "level": "N2",
    "pattern": "〜上で (ue de)",
    "meaning": "sau (làm), trên; trong (làm), khi nói đến",
    "formula": "Động từ thể た (V-ta) + 上で / Danh từ (N) + の + 上で / Động từ thể từ điển (V-dict) + 上で",
    "note": "Động từ-ta + 上で: làm A trước, sau đó làm B. Động từ-dict + 上で: 'trong quá trình / vì mục đích của A'. Văn bản kinh doanh thường rút ngắn nó thành ご確認の上.",
    "examples": [
      {
        "text": "家族[かぞく]とよく相談[そうだん]した上[うえ]で、お返事[へんじ]いたします。",
        "furigana": "家族[かぞく]とよく相談[そうだん]した上[うえ]で、お返事[へんじ]いたします。",
        "reading": "kazokutoyokusoudanshitauede、ohenjiitashimasu。",
        "translation": "Mình sẽ phản hồi sau khi hỏi ý kiến ​​gia đình."
      },
      {
        "text": "内容[ないよう]を確認[かくにん]した上[うえ]で、契約[けいやく]書[しょ]に署名[しょめい]してください。",
        "furigana": "内容[ないよう]を確認[かくにん]した上[うえ]で、契約[けいやく]書[しょ]に署名[しょめい]してください。",
        "reading": "naiyouokakuninshitauede、keiyakushonishomeishitekudasai。",
        "translation": "Vui lòng đọc nội dung và ký hợp đồng."
      },
      {
        "text": "外国[がいこく]語[ご]を学[まな]ぶ上[うえ]で大切[たいせつ]なのは、間違[まちが]いを恐[おそ]れないことだ。",
        "furigana": "外国[がいこく]語[ご]を学[まな]ぶ上[うえ]で大切[たいせつ]なのは、間違[まちが]いを恐[おそ]れないことだ。",
        "reading": "gaikokugoomanabuuedetaisetsunanoha、machigaioosorenaikotoda。",
        "translation": "Điều quan trọng khi học ngoại ngữ là không sợ mắc lỗi."
      }
    ]
  },
  {
    "id": "ja-g-n2-35-ijou-wa",
    "language": "ja",
    "level": "N2",
    "pattern": "〜以上（は） (ijou wa)",
    "meaning": "kể từ đó; bây giờ đó; miễn là",
    "formula": "Động từ thể thông thường (V thường) / Tính từ đuôi な (A-na) + である / Danh từ (N) + である + 以上（は）",
    "note": "Từ một tình huống nhất định, rút ​​ra một nghĩa vụ, quyết tâm hoặc phán đoán chắc chắn. Gần đồng nghĩa với 〜からには; 以上は nghe trang trọng và logic hơn, からには giống quyết tâm cá nhân hơn.",
    "examples": [
      {
        "text": "引[ひ]き受[う]けた以上[いじょう]は、最後[さいご]まで責任[せきにん]を持[も]ってやり遂[と]げるつもりだ。",
        "furigana": "引[ひ]き受[う]けた以上[いじょう]は、最後[さいご]まで責任[せきにん]を持[も]ってやり遂[と]げるつもりだ。",
        "reading": "hikiuketaijouha、saigomadesekininomotteyaritogerutsumorida。",
        "translation": "Bây giờ tôi đã nhận công việc, tôi dự định sẽ chịu trách nhiệm và theo đuổi nó đến cùng."
      },
      {
        "text": "プロである以上[いじょう]、言[い]い訳[わけ]は許[ゆる]されない。",
        "furigana": "プロである以上[いじょう]、言[い]い訳[わけ]は許[ゆる]されない。",
        "reading": "プロdearuijou、iiwakehayurusarenai。",
        "translation": "Chỉ cần bạn là người chuyên nghiệp thì việc bào chữa là không thể chấp nhận được."
      },
      {
        "text": "証拠[しょうこ]がない以上[いじょう]、彼[かれ]を犯人[はんにん]と決[き]めつけることはできない。",
        "furigana": "証拠[しょうこ]がない以上[いじょう]、彼[かれ]を犯人[はんにん]と決[き]めつけることはできない。",
        "reading": "shoukoganaiijou、kareohannintokimetsukerukotohadekinai。",
        "translation": "Vì không có bằng chứng nên chúng tôi không thể kết luận anh ta là thủ phạm."
      }
    ]
  },
  {
    "id": "ja-g-n2-36-kara-ni-wa",
    "language": "ja",
    "level": "N2",
    "pattern": "〜からには (kara ni wa)",
    "meaning": "bây giờ; vì (đã làm/đang..., người ta phải)",
    "formula": "Động từ thể thông thường (V thường) / Danh từ (N) + である + からには",
    "note": "Thể hiện quyết tâm: đã đạt đến tình huống này, người ta nên nhìn thấu nó. Thường kết thúc bằng 〜たい, 〜つもりだ, 〜なければならない. So sánh 〜以上(は), trang trọng và trung lập hơn.",
    "examples": [
      {
        "text": "オリンピックに出[で]るからには、メダルを狙[ねら]いたい。",
        "furigana": "オリンピックに出[で]るからには、メダルを狙[ねら]いたい。",
        "reading": "オリンピックniderukaraniha、メダルoneraitai。",
        "translation": "Khi tham dự Thế vận hội, tôi muốn hướng tới huy chương."
      },
      {
        "text": "自分[じぶん]で決[き]めたからには、途中[とちゅう]で投[な]げ出[だ]すわけにはいかない。",
        "furigana": "自分[じぶん]で決[き]めたからには、途中[とちゅう]で投[な]げ出[だ]すわけにはいかない。",
        "reading": "jibundekimetakaraniha、tochuudenagedasuwakenihaikanai。",
        "translation": "Vì tôi đã tự mình đưa ra quyết định nên tôi không thể vứt bỏ nó giữa chừng được."
      }
    ]
  },
  {
    "id": "ja-g-n2-37-kara-koso",
    "language": "ja",
    "level": "N2",
    "pattern": "〜からこそ (kara koso)",
    "meaning": "chính xác là vì; là vì… mà",
    "formula": "Động từ thể thông thường (V thường) / Tính từ đuôi い (A-i) / Tính từ đuôi な (A-na) + だ / Danh từ (N) + だ + からこそ",
    "note": "Nhấn mạnh rằng lý do này chứ không phải lý do nào khác là lý do thực sự, thường là lý do mà người nghe không mong đợi. Thường kết thúc bằng 〜のだ.",
    "examples": [
      {
        "text": "君[きみ]のことを思[おも]っているからこそ、厳[きび]しいことを言[い]うんだ。",
        "furigana": "君[きみ]のことを思[おも]っているからこそ、厳[きび]しいことを言[い]うんだ。",
        "reading": "kiminokotooomotteirukarakoso、kibishiikotooiunda。",
        "translation": "Tôi nói những điều khắc nghiệt vì tôi quan tâm đến bạn."
      },
      {
        "text": "苦[くる]しい時期[じき]があったからこそ、今[いま]の成功[せいこう]があるのだと思[おも]う。",
        "furigana": "苦[くる]しい時期[じき]があったからこそ、今[いま]の成功[せいこう]があるのだと思[おも]う。",
        "reading": "kurushiijikigaattakarakoso、imanoseikougaarunodatoomou。",
        "translation": "Tôi nghĩ chính nhờ thời điểm khó khăn mà tôi mới có được thành công như hiện tại."
      },
      {
        "text": "小[ちい]さな会社[かいしゃ]だからこそできるサービスもある。",
        "furigana": "小[ちい]さな会社[かいしゃ]だからこそできるサービスもある。",
        "reading": "chiisanakaishadakarakosodekiruサービスmoaru。",
        "translation": "Có một số dịch vụ mà chỉ một công ty nhỏ mới có thể cung cấp."
      }
    ]
  },
  {
    "id": "ja-g-n2-38-kara-shite",
    "language": "ja",
    "level": "N2",
    "pattern": "〜からして (kara shite)",
    "meaning": "đánh giá; (bắt đầu) ngay cả với; chỉ bắt đầu bằng",
    "formula": "Danh từ (N) + からして",
    "note": "Hai cách sử dụng: 'đánh giá từ X' (cơ sở để phỏng đoán) và 'kể cả X, chứ đừng nói đến phần còn lại', trong đó một ví dụ đại diện cho tổng thể, thường mang tính phê phán.",
    "examples": [
      {
        "text": "空[そら]の様子[ようす]からして、午後[ごご]は雨[あめ]になりそうだ。",
        "furigana": "空[そら]の様子[ようす]からして、午後[ごご]は雨[あめ]になりそうだ。",
        "reading": "soranoyousukarashite、gogohaameninarisouda。",
        "translation": "Nhìn từ trên trời thì có vẻ như trời sẽ mưa vào buổi chiều."
      },
      {
        "text": "あの店[みせ]は、店員[てんいん]の態度[たいど]からして感[かん]じが悪[わる]い。",
        "furigana": "あの店[みせ]は、店員[てんいん]の態度[たいど]からして感[かん]じが悪[わる]い。",
        "reading": "anomiseha、teninnotaidokarashitekanjigawarui。",
        "translation": "Cửa hàng đó có cảm giác không tốt, xét từ thái độ của nhân viên."
      },
      {
        "text": "彼[かれ]の話[はなし]は、最初[さいしょ]の前提[ぜんてい]からして間違[まちが]っている。",
        "furigana": "彼[かれ]の話[はなし]は、最初[さいしょ]の前提[ぜんてい]からして間違[まちが]っている。",
        "reading": "karenohanashiha、saishonozenteikarashitemachigatteiru。",
        "translation": "Câu chuyện của anh đã sai ngay từ tiền đề đầu tiên."
      }
    ]
  },
  {
    "id": "ja-g-n2-39-kara-suru-to-kara-sureba",
    "language": "ja",
    "level": "N2",
    "pattern": "〜からすると / 〜からすれば (kara suru to / kara sureba)",
    "meaning": "xét xử; từ quan điểm của",
    "formula": "Danh từ (N) + からすると / Danh từ (N) + からすれば",
    "note": "Đưa ra bằng chứng cho một phán đoán hoặc quan điểm của một người. Gần 〜から見ると; không giống như 〜からいうと, nó có thể cần một người.",
    "examples": [
      {
        "text": "あの話[はな]し方[かた]からすると、彼[かれ]は関西[かんさい]の出身[しゅっしん]だろう。",
        "furigana": "あの話[はな]し方[かた]からすると、彼[かれ]は関西[かんさい]の出身[しゅっしん]だろう。",
        "reading": "anohanashikatakarasuruto、karehakansainoshusshindarou。",
        "translation": "Qua cách nói chuyện thì chắc hẳn anh ấy là người Kansai."
      },
      {
        "text": "親[おや]からすれば、子[こ]どもはいくつになっても子[こ]どもだ。",
        "furigana": "親[おや]からすれば、子[こ]どもはいくつになっても子[こ]どもだ。",
        "reading": "oyakarasureba、kodomohaikutsuninattemokodomoda。",
        "translation": "Với cha mẹ, con cái dù có bao nhiêu tuổi vẫn là trẻ con."
      }
    ]
  },
  {
    "id": "ja-g-n2-40-kara-miru-to-kara-mireba",
    "language": "ja",
    "level": "N2",
    "pattern": "〜から見ると / 〜から見れば (kara miru to / kara mireba)",
    "meaning": "theo quan điểm của; đánh giá từ ; nhìn từ",
    "formula": "Danh từ (N) + から見ると / Danh từ (N) + から見れば",
    "note": "Nhìn vào điều gì đó từ vị trí của một người hoặc từ bằng chứng nhất định. 〜から見て và 〜から見ても cũng rất phổ biến.",
    "examples": [
      {
        "text": "外国[がいこく]人[じん]から見[み]ると、日本[にほん]の習慣[しゅうかん]には不思議[ふしぎ]なものが多[おお]いらしい。",
        "furigana": "外国[がいこく]人[じん]から見[み]ると、日本[にほん]の習慣[しゅうかん]には不思議[ふしぎ]なものが多[おお]いらしい。",
        "reading": "gaikokujinkaramiruto、nihonnoshuukannihafushiginamonogaooirashii。",
        "translation": "Từ góc nhìn của người nước ngoài, nhiều phong tục của người Nhật có vẻ kỳ lạ."
      },
      {
        "text": "今[いま]の成績[せいせき]から見[み]れば、第[だい]一[いち]志望[しぼう]の合格[ごうかく]は十分[じゅうぶん]可能[かのう]だ。",
        "furigana": "今[いま]の成績[せいせき]から見[み]れば、第[だい]一[いち]志望[しぼう]の合格[ごうかく]は十分[じゅうぶん]可能[かのう]だ。",
        "reading": "imanoseisekikaramireba、daiichishibounogoukakuhajuubunkanouda。",
        "translation": "Xét theo điểm số hiện tại của tôi thì tôi có khả năng đậu môn đầu tiên."
      }
    ]
  },
  {
    "id": "ja-g-n2-41-kara-iu-to-kara-itte",
    "language": "ja",
    "level": "N2",
    "pattern": "〜からいうと / 〜からいって (kara iu to / kara itte)",
    "meaning": "về mặt; từ quan điểm của; theo đánh giá của",
    "formula": "Danh từ (N) + からいうと / Danh từ (N) + からいって",
    "note": "Danh từ là tiêu chí hay quan điểm (立場, 経験, 値段), không phải là người: nói 親からすると, không phải ×親からいうと. 〜からいえば cũng được sử dụng.",
    "examples": [
      {
        "text": "立地[りっち]からいうと、駅前[えきまえ]のマンションのほうが便利[べんり]だ。",
        "furigana": "立地[りっち]からいうと、駅前[えきまえ]のマンションのほうが便利[べんり]だ。",
        "reading": "ricchikaraiuto、ekimaenoマンションnohougabenrida。",
        "translation": "Xét về vị trí thì căn hộ phía trước ga thuận tiện hơn."
      },
      {
        "text": "これまでの経験[けいけん]からいって、この計画[けいかく]はうまくいかないと思[おも]う。",
        "furigana": "これまでの経験[けいけん]からいって、この計画[けいかく]はうまくいかないと思[おも]う。",
        "reading": "koremadenokeikenkaraitte、konokeikakuhaumakuikanaitoomou。",
        "translation": "Dựa trên kinh nghiệm của tôi cho đến nay, tôi không nghĩ kế hoạch này sẽ hiệu quả."
      }
    ]
  },
  {
    "id": "ja-g-n2-42-sai-ni",
    "language": "ja",
    "level": "N2",
    "pattern": "〜際（に） (sai ni)",
    "meaning": "khi nào; vào thời điểm đó; nhân dịp",
    "formula": "Động từ thể từ điển (V-dict) / Động từ thể た (V-ta) / Danh từ (N) + の + 際（に）",
    "note": "Phiên bản trang trọng của 〜とき, phổ biến trong các thông báo và hướng dẫn. Không giống như 〜に際して, nó phù hợp cho những dịp hàng ngày.",
    "examples": [
      {
        "text": "お降[ふ]りの際[さい]は、お忘[わす]れ物[もの]のないようご注意[ちゅうい]ください。",
        "furigana": "お降[ふ]りの際[さい]は、お忘[わす]れ物[もの]のないようご注意[ちゅうい]ください。",
        "reading": "ofurinosaiha、owasuremonononaiyougochuuikudasai。",
        "translation": "Các bạn hãy cẩn thận đừng để lại bất cứ thứ gì khi xuống tàu nhé."
      },
      {
        "text": "以前[いぜん]京都[きょうと]を訪[おとず]れた際[さい]に、この寺[てら]にも立[た]ち寄[よ]った。",
        "furigana": "以前[いぜん]京都[きょうと]を訪[おとず]れた際[さい]に、この寺[てら]にも立[た]ち寄[よ]った。",
        "reading": "izenkyoutoootozuretasaini、konoteranimotachiyotta。",
        "translation": "Tôi cũng từng ghé qua ngôi chùa này khi đến thăm Kyoto trước đây."
      },
      {
        "text": "パスポートを申請[しんせい]する際[さい]には、写真[しゃしん]と本人[ほんにん]確認[かくにん]書類[しょるい]が必要[ひつよう]です。",
        "furigana": "パスポートを申請[しんせい]する際[さい]には、写真[しゃしん]と本人[ほんにん]確認[かくにん]書類[しょるい]が必要[ひつよう]です。",
        "reading": "パスポートoshinseisurusainiha、shashintohonninkakuninshoruigahitsuyoudesu。",
        "translation": "Khi đi xin hộ chiếu bạn sẽ cần có ảnh và giấy tờ tùy thân."
      }
    ]
  },
  {
    "id": "ja-g-n2-43-shidai",
    "language": "ja",
    "level": "N2",
    "pattern": "〜次第 (shidai)",
    "meaning": "nào ngay khi (sau đó ngay lập tức)",
    "formula": "Động từ thể ます bỏ ます (V-masu) + 次第 / Danh từ (N) + 次第",
    "note": "Trang trọng, dùng để chỉ một hành động được lên kế hoạch trong tương lai ngay sau A (liên hệ, bắt đầu). Không dùng khi mệnh đề chính ở quá khứ. So sánh 〜次第で (tùy theo).",
    "examples": [
      {
        "text": "詳[くわ]しい日程[にってい]が決[き]まり次第[しだい]、皆様[みなさま]にご連絡[れんらく]いたします。",
        "furigana": "詳[くわ]しい日程[にってい]が決[き]まり次第[しだい]、皆様[みなさま]にご連絡[れんらく]いたします。",
        "reading": "kuwashiinitteigakimarishidai、minasamanigorenrakuitashimasu。",
        "translation": "Chúng tôi sẽ liên hệ với mọi người ngay khi lịch trình chi tiết được quyết định."
      },
      {
        "text": "資料[しりょう]が届[とど]き次第[しだい]、内容[ないよう]を確認[かくにん]してお返事[へんじ]します。",
        "furigana": "資料[しりょう]が届[とど]き次第[しだい]、内容[ないよう]を確認[かくにん]してお返事[へんじ]します。",
        "reading": "shiryougatodokishidai、naiyouokakuninshiteohenjishimasu。",
        "translation": "Sau khi nhận được tài liệu chúng tôi sẽ kiểm tra nội dung và phản hồi lại cho các bạn."
      },
      {
        "text": "定員[ていいん]になり次第[しだい]、受付[うけつけ]を締[し]め切[き]らせていただきます。",
        "furigana": "定員[ていいん]になり次第[しだい]、受付[うけつけ]を締[し]め切[き]らせていただきます。",
        "reading": "teiinninarishidai、uketsukeoshimekiraseteitadakimasu。",
        "translation": "Đăng ký sẽ đóng ngay khi đủ số lượng."
      }
    ]
  },
  {
    "id": "ja-g-n2-44-shidai-da-shidai-de",
    "language": "ja",
    "level": "N2",
    "pattern": "〜次第だ / 〜次第で (shidai da / shidai de)",
    "meaning": "tùy theo; nó phụ thuộc vào",
    "formula": "Danh từ (N) + 次第だ / Danh từ (N) + 次第で / Danh từ (N) + 次第では",
    "note": "Kết quả được quyết định bởi A. 〜次第では chỉ ra một kết quả có thể xảy ra trong số nhiều kết quả.",
    "examples": [
      {
        "text": "合格[ごうかく]できるかどうかは、これからの努力[どりょく]次第[しだい]だ。",
        "furigana": "合格[ごうかく]できるかどうかは、これからの努力[どりょく]次第[しだい]だ。",
        "reading": "goukakudekirukadoukaha、korekaranodoryokushidaida。",
        "translation": "Có đậu được hay không phụ thuộc vào nỗ lực của bạn từ bây giờ."
      },
      {
        "text": "天気[てんき]次第[しだい]で、明日[あした]の予定[よてい]を変[か]えるかもしれない。",
        "furigana": "天気[てんき]次第[しだい]で、明日[あした]の予定[よてい]を変[か]えるかもしれない。",
        "reading": "tenkishidaide、ashitanoyoteiokaerukamoshirenai。",
        "translation": "Tùy thuộc vào thời tiết, lịch trình ngày mai có thể thay đổi."
      },
      {
        "text": "考[かんが]え方[かた]次第[しだい]では、失敗[しっぱい]も貴重[きちょう]な経験[けいけん]になる。",
        "furigana": "考[かんが]え方[かた]次第[しだい]では、失敗[しっぱい]も貴重[きちょう]な経験[けいけん]になる。",
        "reading": "kangaekatashidaideha、shippaimokichounakeikenninaru。",
        "translation": "Tùy vào tư duy của bạn mà ngay cả thất bại cũng có thể là một trải nghiệm quý giá."
      }
    ]
  },
  {
    "id": "ja-g-n2-45-sue-ni",
    "language": "ja",
    "level": "N2",
    "pattern": "〜末（に） (sue ni)",
    "meaning": "sau (một quá trình dài); cuối cùng, ở cuối",
    "formula": "Động từ thể た (V-ta) + 末（に） / Danh từ (N) + の + 末（に）",
    "note": "Trung lập: kết quả có thể tốt hoặc xấu và thường là một quyết định hoặc kết luận. Sử dụng 〜あげく khi kết quả không tốt hoặc gây khó chịu.",
    "examples": [
      {
        "text": "半年[はんとし]にわたる交渉[こうしょう]の末[すえ]、両社[りょうしゃ]はようやく合意[ごうい]に達[たっ]した。",
        "furigana": "半年[はんとし]にわたる交渉[こうしょう]の末[すえ]、両社[りょうしゃ]はようやく合意[ごうい]に達[たっ]した。",
        "reading": "hantoshiniwatarukoushounosue、ryoushahayouyakugouinitasshita。",
        "translation": "Sau sáu tháng đàm phán, cuối cùng hai công ty đã đạt được thỏa thuận."
      },
      {
        "text": "散々[さんざん]悩[なや]んだ末[すえ]に、彼[かれ]は留学[りゅうがく]をあきらめることにした。",
        "furigana": "散々[さんざん]悩[なや]んだ末[すえ]に、彼[かれ]は留学[りゅうがく]をあきらめることにした。",
        "reading": "sanzannayandasueni、kareharyuugakuoakiramerukotonishita。",
        "translation": "Sau nhiều suy nghĩ, anh quyết định từ bỏ việc du học."
      },
      {
        "text": "試行錯誤[しこうさくご]の末[すえ]に完成[かんせい]したのが、この新[あたら]しいエンジンだ。",
        "furigana": "試行錯誤[しこうさくご]の末[すえ]に完成[かんせい]したのが、この新[あたら]しいエンジンだ。",
        "reading": "shikousakugonosuenikanseishitanoga、konoatarashiiエンジンda。",
        "translation": "Engine mới này đã được hoàn thiện sau nhiều lần thử nghiệm và sai sót."
      }
    ]
  },
  {
    "id": "ja-g-n2-46-ta-tokoro-de",
    "language": "ja",
    "level": "N2",
    "pattern": "〜たところで (ta tokoro de)",
    "meaning": "ngay cả khi (nó sẽ không có tác dụng); dù có bao nhiêu",
    "formula": "Động từ thể た (V-ta) + ところで",
    "note": "Mệnh đề chính nói rằng nỗ lực đó là vô ích hoặc kết quả sẽ không quan trọng lắm. Thường đi kèm với いくら, どんなに, 今さら. Khác với 〜たところ (khi tôi làm thì tôi đã tìm thấy).",
    "examples": [
      {
        "text": "今[いま]から急[いそ]いだところで、終電[しゅうでん]には間[ま]に合[あ]わないだろう。",
        "furigana": "今[いま]から急[いそ]いだところで、終電[しゅうでん]には間[ま]に合[あ]わないだろう。",
        "reading": "imakaraisoidatokorode、shuudennihamaniawanaidarou。",
        "translation": "Dù bây giờ có vội đi nữa thì tôi cũng không thể bắt kịp chuyến tàu cuối cùng."
      },
      {
        "text": "いくら説明[せつめい]したところで、あの人[ひと]は聞[き]く耳[みみ]を持[も]たない。",
        "furigana": "いくら説明[せつめい]したところで、あの人[ひと]は聞[き]く耳[みみ]を持[も]たない。",
        "reading": "ikurasetsumeishitatokorode、anohitohakikumimiomotanai。",
        "translation": "Dù bạn có giải thích thế nào thì người đó cũng không nghe."
      },
      {
        "text": "失敗[しっぱい]したところで、失[うしな]うものは何[なに]もない。",
        "furigana": "失敗[しっぱい]したところで、失[うしな]うものは何[なに]もない。",
        "reading": "shippaishitatokorode、ushinaumonohananimonai。",
        "translation": "Bạn không có gì để mất nếu thất bại."
      }
    ]
  },
  {
    "id": "ja-g-n2-47-ta-tokoro",
    "language": "ja",
    "level": "N2",
    "pattern": "〜たところ (ta tokoro)",
    "meaning": "khi (tôi) đã làm ..., (tôi đã tìm thấy điều đó); khi thực hiện",
    "formula": "Động từ thể た (V-ta) + ところ",
    "note": "Báo cáo những gì xảy ra sau một hành động, thường là một khám phá. Kết quả là một sự kiện trong quá khứ nằm ngoài tầm kiểm soát của người nói. Trang trọng hơn 〜たら.",
    "examples": [
      {
        "text": "駅[えき]の窓口[まどぐち]で問[と]い合[あ]わせたところ、その電車[でんしゃ]は運休[うんきゅう]しているとのことだった。",
        "furigana": "駅[えき]の窓口[まどぐち]で問[と]い合[あ]わせたところ、その電車[でんしゃ]は運休[うんきゅう]しているとのことだった。",
        "reading": "ekinomadoguchidetoiawasetatokoro、sonodenshahaunkyuushiteirutonokotodatta。",
        "translation": "Khi hỏi tại quầy ga thì được biết tàu bị đình chỉ."
      },
      {
        "text": "試[ため]しに新[あたら]しい肥料[ひりょう]を使[つか]ってみたところ、トマトがよく育[そだ]った。",
        "furigana": "試[ため]しに新[あたら]しい肥料[ひりょう]を使[つか]ってみたところ、トマトがよく育[そだ]った。",
        "reading": "tameshiniatarashiihiryouotsukattemitatokoro、トマトgayokusodatta。",
        "translation": "Khi tôi thử sử dụng loại phân bón mới, cà chua của tôi phát triển tốt."
      }
    ]
  },
  {
    "id": "ja-g-n2-48-bakari-ka",
    "language": "ja",
    "level": "N2",
    "pattern": "〜ばかりか (bakari ka)",
    "meaning": "không chỉ ... mà còn cả",
    "formula": "Động từ thể thông thường (V thường) / Tính từ đuôi い (A-i) / Tính từ đuôi な (A-na) + な / Danh từ (N) + ばかりか",
    "note": "Mạnh hơn 〜だけでなく; mục thứ hai thường gây ngạc nhiên hơn và được đánh dấu bằng も, まで hoặc さえ. Không giống như 〜だけでなく, nó không được theo sau bởi mệnh lệnh hoặc yêu cầu.",
    "examples": [
      {
        "text": "彼[かれ]は約束[やくそく]の時間[じかん]に遅[おく]れたばかりか、謝[あやま]りもしなかった。",
        "furigana": "彼[かれ]は約束[やくそく]の時間[じかん]に遅[おく]れたばかりか、謝[あやま]りもしなかった。",
        "reading": "karehayakusokunojikanniokuretabakarika、ayamarimoshinakatta。",
        "translation": "Anh ấy không những đến muộn mà còn không xin lỗi."
      },
      {
        "text": "この薬[くすり]は効果[こうか]がないばかりか、副作用[ふくさよう]まであるそうだ。",
        "furigana": "この薬[くすり]は効果[こうか]がないばかりか、副作用[ふくさよう]まであるそうだ。",
        "reading": "konokusurihakoukaganaibakarika、fukusayoumadearusouda。",
        "translation": "Rõ ràng loại thuốc này không những không có tác dụng mà còn có tác dụng phụ."
      },
      {
        "text": "その歌手[かしゅ]は国内[こくない]ばかりか、アジア各国[かっこく]でも人気[にんき]がある。",
        "furigana": "その歌手[かしゅ]は国内[こくない]ばかりか、アジア各国[かっこく]でも人気[にんき]がある。",
        "reading": "sonokashuhakokunaibakarika、アジアkakkokudemoninkigaaru。",
        "translation": "Ca sĩ nổi tiếng không chỉ ở Nhật Bản mà còn ở nhiều nước châu Á khác nhau."
      }
    ]
  },
  {
    "id": "ja-g-n2-49-bakari-ni",
    "language": "ja",
    "level": "N2",
    "pattern": "〜ばかりに (bakari ni)",
    "meaning": "đơn giản vì; chỉ vì (có kết quả xấu)",
    "formula": "Động từ thể thông thường (V thường) / Tính từ đuôi い (A-i) / Tính từ đuôi な (A-na) + な / Tính từ đuôi な (A-na) + である / Danh từ (N) + である + ばかりに",
    "note": "Mệnh đề chính là một kết quả không mong muốn, thường kèm theo sự tiếc nuối. Dạng cố định 〜たいばかりに ('chỉ vì ai đó muốn') giải thích một động cơ mạnh mẽ.",
    "examples": [
      {
        "text": "確認[かくにん]を一[ひと]つ怠[おこた]ったばかりに、大[おお]きな損害[そんがい]を出[だ]してしまった。",
        "furigana": "確認[かくにん]を一[ひと]つ怠[おこた]ったばかりに、大[おお]きな損害[そんがい]を出[だ]してしまった。",
        "reading": "kakuninohitotsuokotattabakarini、ookinasongaiodashiteshimatta。",
        "translation": "Chỉ cần sơ suất kiểm tra một điều là mình đã gây ra tổn thất lớn."
      },
      {
        "text": "正直[しょうじき]に話[はな]したばかりに、かえって彼女[かのじょ]を傷[きず]つけてしまった。",
        "furigana": "正直[しょうじき]に話[はな]したばかりに、かえって彼女[かのじょ]を傷[きず]つけてしまった。",
        "reading": "shoujikinihanashitabakarini、kaettekanojookizutsuketeshimatta。",
        "translation": "Tôi chỉ nói sự thật với cô ấy nhưng cuối cùng lại làm tổn thương cô ấy."
      },
      {
        "text": "英語[えいご]ができないばかりに、せっかくのチャンスを逃[のが]した。",
        "furigana": "英語[えいご]ができないばかりに、せっかくのチャンスを逃[のが]した。",
        "reading": "eigogadekinaibakarini、sekkakunoチャンスonogashita。",
        "translation": "Tôi đã bỏ lỡ cơ hội tuyệt vời này vì tôi không nói được tiếng Anh."
      }
    ]
  },
  {
    "id": "ja-g-n2-50-bakari-da",
    "language": "ja",
    "level": "N2",
    "pattern": "〜ばかりだ (bakari da)",
    "meaning": "keep (trở nên tệ hơn); chỉ tiếp tục",
    "formula": "Động từ thể từ điển (V-dict) + ばかりだ",
    "note": "Thay đổi liên tục theo một hướng, hầu như luôn theo hướng tồi tệ hơn. 〜一方だ (N3) cũng tương tự nhưng cũng có thể diễn tả xu hướng trung tính hoặc tốt.",
    "examples": [
      {
        "text": "駅前[えきまえ]の商店[しょうてん]街[がい]は、客[きゃく]が減[へ]るばかりだ。",
        "furigana": "駅前[えきまえ]の商店[しょうてん]街[がい]は、客[きゃく]が減[へ]るばかりだ。",
        "reading": "ekimaenoshoutengaiha、kyakugaherubakarida。",
        "translation": "Lượng khách hàng ở khu mua sắm trước nhà ga ngày càng giảm."
      },
      {
        "text": "薬[くすり]を飲[の]んでいるのに、症状[しょうじょう]は悪[わる]くなるばかりだ。",
        "furigana": "薬[くすり]を飲[の]んでいるのに、症状[しょうじょう]は悪[わる]くなるばかりだ。",
        "reading": "kusurionondeirunoni、shoujouhawarukunarubakarida。",
        "translation": "Dù tôi có uống thuốc nhưng triệu chứng của tôi chỉ ngày càng nặng hơn."
      }
    ]
  },
  {
    "id": "ja-g-n2-51-wa-mochiron-wa-motoyori",
    "language": "ja",
    "level": "N2",
    "pattern": "〜はもちろん / 〜はもとより (wa mochiron / wa motoyori)",
    "meaning": "không được đề cập đến; tất nhiên ... và cả",
    "formula": "Danh từ (N) + はもちろん / Danh từ (N) + はもとより",
    "note": "A là trường hợp hiển nhiên; B được thêm vào bằng も hoặc まで. 〜はもとより trang trọng và được viết hơn 〜はもちろん.",
    "examples": [
      {
        "text": "この公園[こうえん]は、週末[しゅうまつ]はもちろん平日[へいじつ]も家族[かぞく]連[づ]れでにぎわう。",
        "furigana": "この公園[こうえん]は、週末[しゅうまつ]はもちろん平日[へいじつ]も家族[かぞく]連[づ]れでにぎわう。",
        "reading": "konokouenha、shuumatsuhamochironheijitsumokazokuzuredenigiwau。",
        "translation": "Công viên này đông đúc các gia đình không chỉ vào cuối tuần mà cả ngày thường."
      },
      {
        "text": "この料理[りょうり]教室[きょうしつ]では、基本[きほん]の調理[ちょうり]法[ほう]はもとより、盛[も]り付[つ]けのコツまで教[おし]えてもらえる。",
        "furigana": "この料理[りょうり]教室[きょうしつ]では、基本[きほん]の調理[ちょうり]法[ほう]はもとより、盛[も]り付[つ]けのコツまで教[おし]えてもらえる。",
        "reading": "konoryourikyoushitsudeha、kihonnochourihouhamotoyori、moritsukenoコツmadeoshietemoraeru。",
        "translation": "Trong lớp học nấu ăn này, bạn không chỉ được học các phương pháp nấu ăn cơ bản mà còn được học các mẹo bày biện."
      },
      {
        "text": "地震[じしん]の後[あと]、電気[でんき]はもちろん、水道[すいどう]もガスも止[と]まってしまった。",
        "furigana": "地震[じしん]の後[あと]、電気[でんき]はもちろん、水道[すいどう]もガスも止[と]まってしまった。",
        "reading": "jishinnoato、denkihamochiron、suidoumoガスmotomatteshimatta。",
        "translation": "Sau trận động đất, không chỉ điện mà cả nước và gas đều bị cắt."
      }
    ]
  },
  {
    "id": "ja-g-n2-52-wa-tomokaku",
    "language": "ja",
    "level": "N2",
    "pattern": "〜はともかく (wa tomokaku)",
    "meaning": "sang một bên; bất kể ; bất cứ điều gì về",
    "formula": "Danh từ (N) + はともかく / Danh từ (N) + はともかくとして",
    "note": "Đặt A sang một bên để tập trung vào B, điều mà người nói cho là quan trọng hơn. So sánh 〜はさておき, được sử dụng nhiều hơn để tạm gác một chủ đề và tiếp tục.",
    "examples": [
      {
        "text": "見[み]た目[め]はともかく、味[あじ]はなかなかいい。",
        "furigana": "見[み]た目[め]はともかく、味[あじ]はなかなかいい。",
        "reading": "mitamehatomokaku、ajihanakanakaii。",
        "translation": "Dù nhìn bề ngoài thế nào thì hương vị cũng khá ngon."
      },
      {
        "text": "結果[けっか]はともかくとして、最後[さいご]まで諦[あきら]めなかったことは評価[ひょうか]したい。",
        "furigana": "結果[けっか]はともかくとして、最後[さいご]まで諦[あきら]めなかったことは評価[ひょうか]したい。",
        "reading": "kekkahatomokakutoshite、saigomadeakiramenakattakotohahyoukashitai。",
        "translation": "Dù kết quả thế nào tôi cũng xin khen ngợi anh ấy vì đã không bỏ cuộc cho đến phút cuối cùng."
      }
    ]
  },
  {
    "id": "ja-g-n2-53-wa-sateoki",
    "language": "ja",
    "level": "N2",
    "pattern": "〜はさておき (wa sateoki)",
    "meaning": "để sang một bên; gạt sang một bên (bây giờ)",
    "formula": "Danh từ (N) + はさておき",
    "note": "Thường được dùng để chuyển sang ý chính, như trong 冗談はさておき hoặc それはさておき. Trang trọng hơn 〜はともかく một chút.",
    "examples": [
      {
        "text": "冗談[じょうだん]はさておき、そろそろ本題[ほんだい]に入[はい]りましょう。",
        "furigana": "冗談[じょうだん]はさておき、そろそろ本題[ほんだい]に入[はい]りましょう。",
        "reading": "joudanhasateoki、sorosorohondainihairimashou。",
        "translation": "Đùa thôi, bắt tay vào công việc thôi."
      },
      {
        "text": "費用[ひよう]の問題[もんだい]はさておき、まずは実現[じつげん]可能[かのう]かどうかを検討[けんとう]すべきだ。",
        "furigana": "費用[ひよう]の問題[もんだい]はさておき、まずは実現[じつげん]可能[かのう]かどうかを検討[けんとう]すべきだ。",
        "reading": "hiyounomondaihasateoki、mazuhajitsugenkanoukadoukaokentousubekida。",
        "translation": "Gạt vấn đề chi phí sang một bên, trước tiên chúng ta nên xem xét liệu nó có khả thi hay không."
      }
    ]
  },
  {
    "id": "ja-g-n2-54-hanmen",
    "language": "ja",
    "level": "N2",
    "pattern": "〜反面 / 〜半面 (hanmen)",
    "meaning": "; while (đó là ...)",
    "formula": "Động từ thể thông thường (V thường) / Tính từ đuôi い (A-i) / Tính từ đuôi な (A-na) + な / Tính từ đuôi な (A-na) + である / Danh từ (N) + である + 反面",
    "note": "Trình bày hai mặt đối lập của cùng một sự việc. 〜一方で (N3) rộng hơn và cũng có thể tương phản hai thứ khác nhau.",
    "examples": [
      {
        "text": "都会[とかい]の暮[く]らしは便利[べんり]な反面[はんめん]、ストレスも多[おお]い。",
        "furigana": "都会[とかい]の暮[く]らしは便利[べんり]な反面[はんめん]、ストレスも多[おお]い。",
        "reading": "tokainokurashihabenrinahanmen、ストレスmoooi。",
        "translation": "Sống ở thành phố thuận tiện nhưng cũng căng thẳng."
      },
      {
        "text": "インターネットは情報[じょうほう]を手軽[てがる]に得[え]られる反面[はんめん]、誤[あやま]った情報[じょうほう]も広[ひろ]まりやすい。",
        "furigana": "インターネットは情報[じょうほう]を手軽[てがる]に得[え]られる反面[はんめん]、誤[あやま]った情報[じょうほう]も広[ひろ]まりやすい。",
        "reading": "インターネットhajouhouotegarunierareruhanmen、ayamattajouhoumohiromariyasui。",
        "translation": "Mặc dù Internet giúp việc lấy thông tin trở nên dễ dàng nhưng nó cũng khiến thông tin sai lệch dễ dàng lan truyền."
      },
      {
        "text": "彼[かれ]は仕事[しごと]には厳[きび]しい反面[はんめん]、部下[ぶか]思[おも]いの一[いち]面[めん]もある。",
        "furigana": "彼[かれ]は仕事[しごと]には厳[きび]しい反面[はんめん]、部下[ぶか]思[おも]いの一[いち]面[めん]もある。",
        "reading": "karehashigotonihakibishiihanmen、bukaomoinoichimenmoaru。",
        "translation": "Dù nghiêm khắc trong công việc nhưng anh cũng rất quan tâm đến cấp dưới."
      }
    ]
  },
  {
    "id": "ja-g-n2-55-nagara-mo",
    "language": "ja",
    "level": "N2",
    "pattern": "〜ながら（も） (nagara mo)",
    "meaning": "mặc dù; cho dù; while (trái với mong đợi)",
    "formula": "Động từ thể ます bỏ ます (V-masu) / Động từ thể ない (V-nai) / Tính từ đuôi い (A-i) / Tính từ đuôi な (A-na) / Danh từ (N) + ながら（も）",
    "note": "Không phải 'trong khi làm' ながら: chủ ngữ ở trạng thái A, nhưng B lại đúng. Đặt các cụm từ: 残念ながら, 知りながら, 及ばずながら.",
    "examples": [
      {
        "text": "狭[せま]いながらも、日当[ひあ]たりのいい快適[かいてき]な部屋[へや]だ。",
        "furigana": "狭[せま]いながらも、日当[ひあ]たりのいい快適[かいてき]な部屋[へや]だ。",
        "reading": "semainagaramo、hiatarinoiikaitekinaheyada。",
        "translation": "Đó là một căn phòng nhỏ nhưng tiện nghi, có nhiều ánh sáng mặt trời."
      },
      {
        "text": "悪[わる]いと知[し]りながら、つい嘘[うそ]をついてしまった。",
        "furigana": "悪[わる]いと知[し]りながら、つい嘘[うそ]をついてしまった。",
        "reading": "waruitoshirinagara、tsuiusootsuiteshimatta。",
        "translation": "Tôi đã nói dối dù biết là sai."
      },
      {
        "text": "彼女[かのじょ]は若[わか]いながらも、しっかりした考[かんが]えを持[も]っている。",
        "furigana": "彼女[かのじょ]は若[わか]いながらも、しっかりした考[かんが]えを持[も]っている。",
        "reading": "kanojohawakainagaramo、shikkarishitakangaeomotteiru。",
        "translation": "Tuy còn trẻ nhưng cô ấy có những ý tưởng mạnh mẽ."
      }
    ]
  },
  {
    "id": "ja-g-n2-56-tsutsu-tsutsu-mo",
    "language": "ja",
    "level": "N2",
    "pattern": "〜つつ / 〜つつも (tsutsu / tsutsu mo)",
    "meaning": "while (làm); mặc dù, ngay cả khi",
    "formula": "Động từ thể ます bỏ ます (V-masu) + つつ / Động từ thể ます bỏ ます (V-masu) + つつも",
    "note": "riêng つつ là viết 〜ながら (hai hành động cùng một lúc). つつも có nghĩa là 'mặc dù', thường đi kèm với các động từ chỉ biết hoặc suy nghĩ (思いつつ, 知りつつ).",
    "examples": [
      {
        "text": "今年[ことし]の業績[ぎょうせき]を振[ふ]り返[かえ]りつつ、来年[らいねん]の目標[もくひょう]を考[かんが]えたい。",
        "furigana": "今年[ことし]の業績[ぎょうせき]を振[ふ]り返[かえ]りつつ、来年[らいねん]の目標[もくひょう]を考[かんが]えたい。",
        "reading": "kotoshinogyousekiofurikaeritsutsu、rainennomokuhyouokangaetai。",
        "translation": "Tôi xin nhìn lại những thành tựu đã đạt được trong năm nay và nghĩ về những mục tiêu của năm sau."
      },
      {
        "text": "体[からだ]に悪[わる]いと分[わ]かりつつも、夜更[よふ]かしがやめられない。",
        "furigana": "体[からだ]に悪[わる]いと分[わ]かりつつも、夜更[よふ]かしがやめられない。",
        "reading": "karadaniwaruitowakaritsutsumo、yofukashigayamerarenai。",
        "translation": "Dù biết điều đó có hại cho sức khỏe nhưng tôi vẫn không thể ngừng thức khuya."
      },
      {
        "text": "早[はや]く返事[へんじ]をしなければと思[おも]いつつ、もう一週間[いっしゅうかん]もたってしまった。",
        "furigana": "早[はや]く返事[へんじ]をしなければと思[おも]いつつ、もう一週間[いっしゅうかん]もたってしまった。",
        "reading": "hayakuhenjioshinakerebatoomoitsutsu、mouisshuukanmotatteshimatta。",
        "translation": "Đã một tuần rồi tôi nghĩ mình nên trả lời nhanh."
      }
    ]
  },
  {
    "id": "ja-g-n2-57-tsutsu-aru",
    "language": "ja",
    "level": "N2",
    "pattern": "〜つつある (tsutsu aru)",
    "meaning": "đang trong quá trình; dần dần (thay đổi)",
    "formula": "Động từ thể ます bỏ ます (V-masu) + つつある",
    "note": "Phong cách viết dành cho sự thay đổi đang được tiến hành hướng tới một kết quả nào đó. Được sử dụng với động từ thay đổi (増える, 回復する, 変わる), không phải với những hành động đơn giản đang diễn ra như 食べる.",
    "examples": [
      {
        "text": "地球[ちきゅう]の平均[へいきん]気温[きおん]は、年々[ねんねん]上昇[じょうしょう]しつつある。",
        "furigana": "地球[ちきゅう]の平均[へいきん]気温[きおん]は、年々[ねんねん]上昇[じょうしょう]しつつある。",
        "reading": "chikyuunoheikinkionha、nennenjoushoushitsutsuaru。",
        "translation": "Nhiệt độ trung bình của trái đất đang tăng dần qua từng năm."
      },
      {
        "text": "この地域[ちいき]の伝統[でんとう]的[てき]な祭[まつ]りは、若者[わかもの]の減少[げんしょう]とともに失[うしな]われつつある。",
        "furigana": "この地域[ちいき]の伝統[でんとう]的[てき]な祭[まつ]りは、若者[わかもの]の減少[げんしょう]とともに失[うしな]われつつある。",
        "reading": "konochiikinodentoutekinamatsuriha、wakamononogenshoutotomoniushinawaretsutsuaru。",
        "translation": "Các lễ hội truyền thống ở vùng này đang dần biến mất khi số lượng người trẻ ngày càng giảm."
      }
    ]
  },
  {
    "id": "ja-g-n2-58-ppanashi",
    "language": "ja",
    "level": "N2",
    "pattern": "〜っぱなし (ppanashi)",
    "meaning": "rời khỏi (cái gì đó) như cũ; tiếp tục (làm) không ngừng nghỉ",
    "formula": "Động từ thể ます bỏ ます (V-masu) + っぱなし",
    "note": "Hoặc là có việc gì đó chưa được làm xong mà lẽ ra phải được giải quyết (thường là lời phàn nàn) hoặc là một trạng thái tiếp diễn không ngừng nghỉ. Đàm thoại.",
    "examples": [
      {
        "text": "部屋[へや]の電気[でんき]をつけっぱなしにして出[で]かけてしまった。",
        "furigana": "部屋[へや]の電気[でんき]をつけっぱなしにして出[で]かけてしまった。",
        "reading": "heyanodenkiotsukeppanashinishitedekaketeshimatta。",
        "translation": "Mình để đèn trong phòng rồi đi ra ngoài."
      },
      {
        "text": "今日[きょう]は朝[あさ]から立[た]ちっぱなしで、足[あし]が痛[いた]い。",
        "furigana": "今日[きょう]は朝[あさ]から立[た]ちっぱなしで、足[あし]が痛[いた]い。",
        "reading": "kyouhaasakaratachippanashide、ashigaitai。",
        "translation": "Mình đứng từ sáng tới giờ, chân đau quá."
      },
      {
        "text": "窓[まど]を開[あ]けっぱなしにしないでください。",
        "furigana": "窓[まど]を開[あ]けっぱなしにしないでください。",
        "reading": "madooakeppanashinishinaidekudasai。",
        "translation": "Đừng để cửa sổ mở."
      }
    ]
  },
  {
    "id": "ja-g-n2-59-nuku",
    "language": "ja",
    "level": "N2",
    "pattern": "〜抜く (nuku)",
    "meaning": "làm đến cùng; nhìn xuyên qua; làm thật kỹ",
    "formula": "Động từ thể ます bỏ ます (V-masu) + 抜く",
    "note": "Nhấn mạnh việc hoàn thành một việc gì đó dù khó khăn hay khó khăn, hoặc làm nó một cách trọn vẹn (考え抜く, 生き抜く).",
    "examples": [
      {
        "text": "足[あし]を痛[いた]めていたが、彼[かれ]は最後[さいご]まで走[はし]り抜[ぬ]いた。",
        "furigana": "足[あし]を痛[いた]めていたが、彼[かれ]は最後[さいご]まで走[はし]り抜[ぬ]いた。",
        "reading": "ashioitameteitaga、karehasaigomadehashirinuita。",
        "translation": "Dù chân bị thương nhưng anh ấy vẫn chạy đến cuối cùng."
      },
      {
        "text": "悩[なや]み抜[ぬ]いた末[すえ]に出[だ]した結論[けつろん]なので、後悔[こうかい]はない。",
        "furigana": "悩[なや]み抜[ぬ]いた末[すえ]に出[だ]した結論[けつろん]なので、後悔[こうかい]はない。",
        "reading": "nayaminuitasuenidashitaketsuronnanode、koukaihanai。",
        "translation": "Tôi không hề hối hận vì đã đi đến kết luận này sau rất nhiều suy nghĩ."
      },
      {
        "text": "チームは苦[くる]しい試合[しあい]で一点[いってん]のリードを守[まも]り抜[ぬ]いた。",
        "furigana": "チームは苦[くる]しい試合[しあい]で一点[いってん]のリードを守[まも]り抜[ぬ]いた。",
        "reading": "チームhakurushiishiaideittennoリードomamorinuita。",
        "translation": "Đội đã dẫn trước một điểm trong một trận đấu khó khăn."
      }
    ]
  },
  {
    "id": "ja-g-n2-60-uru-enai",
    "language": "ja",
    "level": "N2",
    "pattern": "〜得る / 〜得ない (uru / enai)",
    "meaning": "can; có thể/không thể; không thể",
    "formula": "Động từ thể ます bỏ ます (V-masu) + 得る / Động từ thể ます bỏ ます (V-masu) + 得ない",
    "note": "Khả năng logic, không phải kỹ năng cá nhân (không phải ×泳ぎ得る nghĩa là 'có thể bơi'). Tích cực được đọc là うる hoặc える; các dạng khác sử dụng え- (えない, えた).",
    "examples": [
      {
        "text": "どんなに注意[ちゅうい]していても、事故[じこ]は起[お]こり得[え]る。",
        "furigana": "どんなに注意[ちゅうい]していても、事故[じこ]は起[お]こり得[え]る。",
        "reading": "donnanichuuishiteitemo、jikohaokorieru。",
        "translation": "Dù bạn có cẩn thận đến đâu thì tai nạn vẫn có thể xảy ra."
      },
      {
        "text": "あの真面目[まじめ]な彼[かれ]が犯人[はんにん]だなんて、あり得[え]ない。",
        "furigana": "あの真面目[まじめ]な彼[かれ]が犯人[はんにん]だなんて、あり得[え]ない。",
        "reading": "anomajimenakaregahannindanante、arienai。",
        "translation": "Không thể nào cái gã nghiêm túc đó lại có thể là thủ phạm được."
      },
      {
        "text": "今回[こんかい]の調査[ちょうさ]で、これまで知[し]り得[え]なかった事実[じじつ]が明[あき]らかになった。",
        "furigana": "今回[こんかい]の調査[ちょうさ]で、これまで知[し]り得[え]なかった事実[じじつ]が明[あき]らかになった。",
        "reading": "konkainochousade、koremadeshirienakattajijitsugaakirakaninatta。",
        "translation": "Cuộc điều tra này đã tiết lộ những sự thật mà trước đây chưa được biết đến."
      }
    ]
  },
  {
    "id": "ja-g-n2-61-gatai",
    "language": "ja",
    "level": "N2",
    "pattern": "〜がたい (gatai)",
    "meaning": "khó; gần như không thể (về mặt cảm xúc)",
    "formula": "Động từ thể ます bỏ ます (V-masu) + がたい",
    "note": "Dùng với động từ chỉ sự suy nghĩ và cảm xúc (信じる, 理解する, 許す, 離れる). Không giống như 〜にくい, không phải vì khó khăn về thể chất (×この肉は食べがたい).",
    "examples": [
      {
        "text": "あの誠実[せいじつ]な人[ひと]が不正[ふせい]をしたとは、信[しん]じがたい。",
        "furigana": "あの誠実[せいじつ]な人[ひと]が不正[ふせい]をしたとは、信[しん]じがたい。",
        "reading": "anoseijitsunahitogafuseioshitatoha、shinjigatai。",
        "translation": "Thật khó tin một người lương thiện như vậy lại có thể lừa dối."
      },
      {
        "text": "彼[かれ]の失礼[しつれい]な態度[たいど]は、どうにも許[ゆる]しがたい。",
        "furigana": "彼[かれ]の失礼[しつれい]な態度[たいど]は、どうにも許[ゆる]しがたい。",
        "reading": "karenoshitsureinataidoha、dounimoyurushigatai。",
        "translation": "Hành vi thô lỗ của anh ta thật không thể chấp nhận được."
      },
      {
        "text": "生[う]まれ育[そだ]った町[まち]は、やはり離[はな]れがたいものだ。",
        "furigana": "生[う]まれ育[そだ]った町[まち]は、やはり離[はな]れがたいものだ。",
        "reading": "umaresodattamachiha、yaharihanaregataimonoda。",
        "translation": "Thật khó để rời khỏi thị trấn nơi bạn sinh ra và lớn lên."
      }
    ]
  },
  {
    "id": "ja-g-n2-62-you-ga-nai",
    "language": "ja",
    "level": "N2",
    "pattern": "〜ようがない (you ga nai)",
    "meaning": "không có cách nào; có vẻ như không thể (không có phương tiện nào)",
    "formula": "Động từ thể ます bỏ ます (V-masu) + ようがない / Danh từ (N) + の + しようがない",
    "note": "Không có phương pháp nào cả, ngay cả khi người ta muốn. 〜ようもない được nhấn mạnh hơn. Với danh từ suru: 説明のしようがない.",
    "examples": [
      {
        "text": "連絡[れんらく]先[さき]が分[わ]からないので、知[し]らせようがない。",
        "furigana": "連絡[れんらく]先[さき]が分[わ]からないので、知[し]らせようがない。",
        "reading": "renrakusakigawakaranainode、shiraseyouganai。",
        "translation": "Mình không biết thông tin liên hệ của bạn nên không thể cho bạn biết."
      },
      {
        "text": "これだけ証拠[しょうこ]がそろっていては、言[い]い訳[わけ]のしようがない。",
        "furigana": "これだけ証拠[しょうこ]がそろっていては、言[い]い訳[わけ]のしようがない。",
        "reading": "koredakeshoukogasorotteiteha、iiwakenoshiyouganai。",
        "translation": "Với rất nhiều bằng chứng, không có lời bào chữa nào cả."
      },
      {
        "text": "壊[こわ]れた部品[ぶひん]がもう生産[せいさん]されていないので、直[なお]しようがない。",
        "furigana": "壊[こわ]れた部品[ぶひん]がもう生産[せいさん]されていないので、直[なお]しようがない。",
        "reading": "kowaretabuhingamouseisansareteinainode、naoshiyouganai。",
        "translation": "Vì bộ phận bị hỏng không còn được sản xuất nên không có cách nào khắc phục được."
      }
    ]
  },
  {
    "id": "ja-g-n2-63-you-de-wa",
    "language": "ja",
    "level": "N2",
    "pattern": "〜ようでは (you de wa)",
    "meaning": "nếu (bạn vẫn như thế này / cứ làm thế này), (không ổn đâu)",
    "formula": "Động từ thể thông thường (V thường) + ようでは",
    "note": "Chỉ trích một trạng thái không mong muốn và dự đoán một kết quả xấu; mệnh đề chính là phủ định (〜ない, 困る, だめだ).",
    "examples": [
      {
        "text": "こんな簡単[かんたん]なミスをするようでは、大[おお]きな仕事[しごと]は任[まか]せられない。",
        "furigana": "こんな簡単[かんたん]なミスをするようでは、大[おお]きな仕事[しごと]は任[まか]せられない。",
        "reading": "konnakantannaミスosuruyoudeha、ookinashigotohamakaserarenai。",
        "translation": "Nếu mắc phải một lỗi đơn giản như vậy, bạn sẽ không được giao phó một công việc lớn lao nào."
      },
      {
        "text": "毎朝[まいあさ]遅刻[ちこく]しているようでは、信頼[しんらい]を得[え]られないよ。",
        "furigana": "毎朝[まいあさ]遅刻[ちこく]しているようでは、信頼[しんらい]を得[え]られないよ。",
        "reading": "maiasachikokushiteiruyoudeha、shinraioerarenaiyo。",
        "translation": "Bạn sẽ không có được sự tin tưởng nếu mỗi sáng bạn đều đến muộn."
      }
    ]
  },
  {
    "id": "ja-g-n2-64-te-naranai",
    "language": "ja",
    "level": "N2",
    "pattern": "〜てならない (te naranai)",
    "meaning": "không nhịn được (cảm giác); cảm thấy khủng khiếp; cực kỳ",
    "formula": "Động từ thể て (V-te) + ならない / Tính từ đuôi い (A-i)-ku + てならない / Tính từ đuôi な (A-na) + でならない",
    "note": "Dành cho những cảm xúc hoặc ấn tượng tự nảy sinh (気がする, 思われる, 心配だ, 残念だ). Trang trọng và được viết hơn 〜てたまらない / 〜てしょうがない.",
    "examples": [
      {
        "text": "故郷[こきょう]の母[はは]のことが心配[しんぱい]でならない。",
        "furigana": "故郷[こきょう]の母[はは]のことが心配[しんぱい]でならない。",
        "reading": "kokyounohahanokotogashinpaidenaranai。",
        "translation": "Tôi không khỏi lo lắng cho mẹ ở quê nhà."
      },
      {
        "text": "あのとき本当[ほんとう]のことを言[い]わなかったのが、悔[く]やまれてならない。",
        "furigana": "あのとき本当[ほんとう]のことを言[い]わなかったのが、悔[く]やまれてならない。",
        "reading": "anotokihontounokotooiwanakattanoga、kuyamaretenaranai。",
        "translation": "Tôi rất tiếc đã không nói cho bạn sự thật vào thời điểm đó."
      },
      {
        "text": "この計画[けいかく]には何[なに]か裏[うら]があるような気[き]がしてならない。",
        "furigana": "この計画[けいかく]には何[なに]か裏[うら]があるような気[き]がしてならない。",
        "reading": "konokeikakunihananikauragaaruyounakigashitenaranai。",
        "translation": "Tôi không khỏi cảm thấy như có điều gì đó đằng sau kế hoạch này."
      }
    ]
  },
  {
    "id": "ja-g-n2-65-te-koso",
    "language": "ja",
    "level": "N2",
    "pattern": "〜てこそ (te koso)",
    "meaning": "chỉ bằng (làm); chỉ khi",
    "formula": "Động từ thể て (V-te) + こそ",
    "note": "Nhấn mạnh rằng A là điều kiện thiết yếu cho giá trị thực hoặc kết quả tạo ra B. 〜てはじめて (N3) trung tính hơn, tập trung vào thời điểm.",
    "examples": [
      {
        "text": "自分[じぶん]で経験[けいけん]してこそ、本当[ほんとう]の意味[いみ]で理解[りかい]できるのだ。",
        "furigana": "自分[じぶん]で経験[けいけん]してこそ、本当[ほんとう]の意味[いみ]で理解[りかい]できるのだ。",
        "reading": "jibundekeikenshitekoso、hontounoimiderikaidekirunoda。",
        "translation": "Chỉ khi tự mình trải nghiệm thì bạn mới thực sự hiểu được."
      },
      {
        "text": "お互[たが]いに協力[きょうりょく]し合[あ]ってこそ、チームは強[つよ]くなる。",
        "furigana": "お互[たが]いに協力[きょうりょく]し合[あ]ってこそ、チームは強[つよ]くなる。",
        "reading": "otagainikyouryokushiattekoso、チームhatsuyokunaru。",
        "translation": "Một nhóm trở nên mạnh mẽ hơn khi chúng ta hợp tác với nhau."
      }
    ]
  },
  {
    "id": "ja-g-n2-66-te-kara-de-nai-to",
    "language": "ja",
    "level": "N2",
    "pattern": "〜てからでないと (te kara de nai to)",
    "meaning": "cho đến khi (sau khi thực hiện); chỉ sau",
    "formula": "Động từ thể て (V-te) + からでないと / Động từ thể て (V-te) + からでなければ",
    "note": "Mệnh đề chính mang tính phủ định hoặc thể hiện sự khó khăn: B không thể xảy ra trừ khi A được thực hiện trước.",
    "examples": [
      {
        "text": "実物[じつぶつ]を見[み]てからでないと、買[か]うかどうか決[き]められない。",
        "furigana": "実物[じつぶつ]を見[み]てからでないと、買[か]うかどうか決[き]められない。",
        "reading": "jitsubutsuomitekaradenaito、kaukadoukakimerarenai。",
        "translation": "Tôi không thể quyết định có nên mua hay không cho đến khi tận mắt nhìn thấy nó."
      },
      {
        "text": "この薬[くすり]は、医師[いし]に相談[そうだん]してからでなければ服用[ふくよう]しないでください。",
        "furigana": "この薬[くすり]は、医師[いし]に相談[そうだん]してからでなければ服用[ふくよう]しないでください。",
        "reading": "konokusuriha、ishinisoudanshitekaradenakerebafukuyoushinaidekudasai。",
        "translation": "Đừng dùng thuốc này trừ khi bạn hỏi ý kiến ​​​​bác sĩ."
      }
    ]
  },
  {
    "id": "ja-g-n2-67-te-irai",
    "language": "ja",
    "level": "N2",
    "pattern": "〜て以来 (te irai)",
    "meaning": "kể từ",
    "formula": "Động từ thể て (V-te) + 以来 / Danh từ (N) + 以来",
    "note": "Mệnh đề chính là một trạng thái hoặc một thói quen tiếp diễn từ thời điểm quá khứ đó đến nay, không một sự kiện nào sau đó. Trang trọng hơn 〜てから.",
    "examples": [
      {
        "text": "大学[だいがく]を卒業[そつぎょう]して以来[いらい]、彼[かれ]とは一[いち]度[ど]も会[あ]っていない。",
        "furigana": "大学[だいがく]を卒業[そつぎょう]して以来[いらい]、彼[かれ]とは一[いち]度[ど]も会[あ]っていない。",
        "reading": "daigakuosotsugyoushiteirai、karetohaichidomoatteinai。",
        "translation": "Tôi chưa gặp anh ấy lần nào kể từ khi tôi tốt nghiệp đại học."
      },
      {
        "text": "この町[まち]に越[こ]してきて以来[いらい]、毎朝[まいあさ]川[かわ]沿[ぞ]いを散歩[さんぽ]するのが日課[にっか]になっている。",
        "furigana": "この町[まち]に越[こ]してきて以来[いらい]、毎朝[まいあさ]川[かわ]沿[ぞ]いを散歩[さんぽ]するのが日課[にっか]になっている。",
        "reading": "konomachinikoshitekiteirai、maiasakawazoiosanposurunoganikkaninatteiru。",
        "translation": "Kể từ khi tôi chuyển đến thị trấn này, việc đi dạo dọc bờ sông mỗi sáng đã trở thành thói quen hàng ngày của tôi."
      },
      {
        "text": "創業[そうぎょう]以来[いらい]、この店[みせ]は同[おな]じ味[あじ]を守[まも]り続[つづ]けている。",
        "furigana": "創業[そうぎょう]以来[いらい]、この店[みせ]は同[おな]じ味[あじ]を守[まも]り続[つづ]けている。",
        "reading": "sougyouirai、konomisehaonajiajiomamoritsuzuketeiru。",
        "translation": "Kể từ khi thành lập đến nay, nhà hàng này vẫn giữ nguyên hương vị đó."
      }
    ]
  },
  {
    "id": "ja-g-n2-68-ni-suginai",
    "language": "ja",
    "level": "N2",
    "pattern": "〜に過ぎない (ni suginai)",
    "meaning": "; không có gì hơn; chỉ một",
    "formula": "Động từ thể thông thường (V thường) / Danh từ (N) + に過ぎない",
    "note": "Hạ thấp một cái gì đó nhỏ hoặc không quan trọng. Thường đi kèm với ただ hoặc 単なる.",
    "examples": [
      {
        "text": "それは単[たん]なるうわさに過[す]ぎない。",
        "furigana": "それは単[たん]なるうわさに過[す]ぎない。",
        "reading": "sorehatannaruuwasanisuginai。",
        "translation": "Đó chỉ là tin đồn thôi."
      },
      {
        "text": "私[わたし]は自分[じぶん]の仕事[しごと]をしたに過[す]ぎません。",
        "furigana": "私[わたし]は自分[じぶん]の仕事[しごと]をしたに過[す]ぎません。",
        "reading": "watashihajibunnoshigotooshitanisugimasen。",
        "translation": "Tôi chỉ đang làm công việc của mình thôi."
      },
      {
        "text": "今回[こんかい]明[あき]らかになった問題[もんだい]は、氷山[ひょうざん]の一角[いっかく]に過[す]ぎない。",
        "furigana": "今回[こんかい]明[あき]らかになった問題[もんだい]は、氷山[ひょうざん]の一角[いっかく]に過[す]ぎない。",
        "reading": "konkaiakirakaninattamondaiha、hyouzannoikkakunisuginai。",
        "translation": "Những vấn đề được bộc lộ lần này chỉ là phần nổi của tảng băng trôi."
      }
    ]
  },
  {
    "id": "ja-g-n2-69-ni-kagiru",
    "language": "ja",
    "level": "N2",
    "pattern": "〜に限る (ni kagiru)",
    "meaning": "không có gì nhịp nhàng; điều tốt nhất là",
    "formula": "Động từ thể từ điển (V-dict) / Động từ thể ない (V-nai) / Danh từ (N) + に限る",
    "note": "Niềm tin cá nhân của người nói rằng điều gì đó là sự lựa chọn tốt nhất; đàm thoại. Để nói chung chung hơn, hãy sử dụng 〜に越したことはない.",
    "examples": [
      {
        "text": "疲[つか]れたときは、早[はや]く寝[ね]るに限[かぎ]る。",
        "furigana": "疲[つか]れたときは、早[はや]く寝[ね]るに限[かぎ]る。",
        "reading": "tsukaretatokiha、hayakunerunikagiru。",
        "translation": "Mệt quá thì đi ngủ sớm thôi."
      },
      {
        "text": "夏[なつ]の暑[あつ]い日[ひ]は、冷[つめ]たいビールに限[かぎ]る。",
        "furigana": "夏[なつ]の暑[あつ]い日[ひ]は、冷[つめ]たいビールに限[かぎ]る。",
        "reading": "natsunoatsuihiha、tsumetaiビールnikagiru。",
        "translation": "Vào ngày hè nóng nực, tất cả những gì bạn cần là một cốc bia lạnh."
      },
      {
        "text": "面倒[めんどう]なことには関[かか]わらないに限[かぎ]る。",
        "furigana": "面倒[めんどう]なことには関[かか]わらないに限[かぎ]る。",
        "reading": "mendounakotonihakakawaranainikagiru。",
        "translation": "Chỉ cần bạn không vướng vào những chuyện rắc rối."
      }
    ]
  },
  {
    "id": "ja-g-n2-70-ni-kagirazu",
    "language": "ja",
    "level": "N2",
    "pattern": "〜に限らず (ni kagirazu)",
    "meaning": "không chỉ; không giới hạn ở",
    "formula": "Danh từ (N) + に限らず",
    "note": "Mở rộng phạm vi ra ngoài A; phần thứ hai thường có も. Gần giống với 〜だけでなく nhưng trang trọng hơn một chút.",
    "examples": [
      {
        "text": "この遊園[ゆうえん]地[ち]は、子[こ]どもに限[かぎ]らず大人[おとな]にも人気[にんき]がある。",
        "furigana": "この遊園[ゆうえん]地[ち]は、子[こ]どもに限[かぎ]らず大人[おとな]にも人気[にんき]がある。",
        "reading": "konoyuuenchiha、kodomonikagirazuotonanimoninkigaaru。",
        "translation": "Công viên giải trí này được yêu thích không chỉ với trẻ em mà cả người lớn."
      },
      {
        "text": "日本[にほん]に限[かぎ]らず、多[おお]くの先進[せんしん]国[こく]が少子化[しょうしか]の問題[もんだい]を抱[かか]えている。",
        "furigana": "日本[にほん]に限[かぎ]らず、多[おお]くの先進[せんしん]国[こく]が少子化[しょうしか]の問題[もんだい]を抱[かか]えている。",
        "reading": "nihonnikagirazu、ookunosenshinkokugashoushikanomondaiokakaeteiru。",
        "translation": "Nhiều nước phát triển chứ không riêng gì Nhật Bản đang phải đối mặt với vấn đề tỷ lệ sinh giảm."
      }
    ]
  },
  {
    "id": "ja-g-n2-71-ni-kagitte",
    "language": "ja",
    "level": "N2",
    "pattern": "〜に限って (ni kagitte)",
    "meaning": "của tất cả (lần/người); chính xác là khi nào; (ai đó) trong số tất cả mọi người sẽ không",
    "formula": "Danh từ (N) + に限って",
    "note": "Hai cách sử dụng: (1) 'đúng lúc', phàn nàn rằng vận rủi ập đến vào thời điểm tồi tệ nhất; (2) với はずがない / ない, tin tưởng chắc chắn rằng một người cụ thể sẽ không làm điều gì đó.",
    "examples": [
      {
        "text": "傘[かさ]を持[も]っていない日[ひ]に限[かぎ]って、雨[あめ]が降[ふ]るんだよね。",
        "furigana": "傘[かさ]を持[も]っていない日[ひ]に限[かぎ]って、雨[あめ]が降[ふ]るんだよね。",
        "reading": "kasaomotteinaihinikagitte、amegafurundayone。",
        "translation": "Trời chỉ mưa vào những ngày bạn không có ô."
      },
      {
        "text": "急[いそ]いでいるときに限[かぎ]って、電車[でんしゃ]が遅[おく]れる。",
        "furigana": "急[いそ]いでいるときに限[かぎ]って、電車[でんしゃ]が遅[おく]れる。",
        "reading": "isoideirutokinikagitte、denshagaokureru。",
        "translation": "Tàu chỉ bị delay khi bạn đang vội."
      },
      {
        "text": "うちの子[こ]に限[かぎ]って、そんなことをするはずがない。",
        "furigana": "うちの子[こ]に限[かぎ]って、そんなことをするはずがない。",
        "reading": "uchinokonikagitte、sonnakotoosuruhazuganai。",
        "translation": "Không thể nào có người lại làm điều đó với con tôi."
      }
    ]
  },
  {
    "id": "ja-g-n2-72-ni-kagiri",
    "language": "ja",
    "level": "N2",
    "pattern": "〜に限り (ni kagiri)",
    "meaning": "giới hạn ở ; chỉ (đối với)",
    "formula": "Danh từ (N) + に限り",
    "note": "Chính thức; điển hình của các thông báo, quảng cáo và quy tắc để nêu rõ điều kiện áp dụng cho ai hoặc cái gì.",
    "examples": [
      {
        "text": "本日[ほんじつ]ご来店[らいてん]のお客様[きゃくさま]に限[かぎ]り、全[ぜん]商品[しょうひん]を二[に]割[わり]引[び]きいたします。",
        "furigana": "本日[ほんじつ]ご来店[らいてん]のお客様[きゃくさま]に限[かぎ]り、全[ぜん]商品[しょうひん]を二[に]割[わり]引[び]きいたします。",
        "reading": "honjitsugoraitennookyakusamanikagiri、zenshouhinoniwaribikiitashimasu。",
        "translation": "Chúng tôi giảm giá 20% cho tất cả các sản phẩm cho khách hàng ghé thăm cửa hàng của chúng tôi ngay hôm nay."
      },
      {
        "text": "先着[せんちゃく]百[ひゃく]名[めい]様[さま]に限[かぎ]り、記念[きねん]品[ひん]を差[さ]し上[あ]げます。",
        "furigana": "先着[せんちゃく]百[ひゃく]名[めい]様[さま]に限[かぎ]り、記念[きねん]品[ひん]を差[さ]し上[あ]げます。",
        "reading": "senchakuhyakumeisamanikagiri、kinenhinosashiagemasu。",
        "translation": "Chỉ 100 người đầu tiên mới được nhận quà kỷ niệm."
      },
      {
        "text": "この駐車[ちゅうしゃ]場[じょう]は、住民[じゅうみん]に限[かぎ]り無料[むりょう]で利用[りよう]できる。",
        "furigana": "この駐車[ちゅうしゃ]場[じょう]は、住民[じゅうみん]に限[かぎ]り無料[むりょう]で利用[りよう]できる。",
        "reading": "konochuushajouha、juuminnikagirimuryouderiyoudekiru。",
        "translation": "Bãi đậu xe này chỉ miễn phí cho cư dân."
      }
    ]
  },
  {
    "id": "ja-g-n2-73-kagiri",
    "language": "ja",
    "level": "N2",
    "pattern": "〜かぎり (kagiri)",
    "meaning": "miễn là; đến mức (đến giới hạn)",
    "formula": "Động từ thể từ điển (V-dict) / Động từ thể て (V-te) + いる / Tính từ đuôi い (A-i) / Tính từ đuôi な (A-na) + である / Danh từ (N) + である + かぎり",
    "note": "'Miễn là' có điều kiện, hoặc 'trong chừng mực' giới hạn của kiến ​​thức hoặc khả năng (私の知るかぎり, できるかぎり). Cũng được viết là 限り. Khác với 〜に限り (giới hạn).",
    "examples": [
      {
        "text": "私[わたし]の知[し]るかぎり、彼[かれ]が約束[やくそく]を破[やぶ]ったことは一[いち]度[ど]もない。",
        "furigana": "私[わたし]の知[し]るかぎり、彼[かれ]が約束[やくそく]を破[やぶ]ったことは一[いち]度[ど]もない。",
        "reading": "watashinoshirukagiri、karegayakusokuoyabuttakotohaichidomonai。",
        "translation": "Theo tôi được biết thì anh ấy chưa bao giờ thất hứa."
      },
      {
        "text": "体[からだ]が動[うご]くかぎり、この仕事[しごと]を続[つづ]けたい。",
        "furigana": "体[からだ]が動[うご]くかぎり、この仕事[しごと]を続[つづ]けたい。",
        "reading": "karadagaugokukagiri、konoshigotootsuzuketai。",
        "translation": "Tôi muốn tiếp tục công việc này miễn là cơ thể tôi còn cử động được."
      },
      {
        "text": "できるかぎりのことはやったので、結果[けっか]がどうなっても悔[く]いはない。",
        "furigana": "できるかぎりのことはやったので、結果[けっか]がどうなっても悔[く]いはない。",
        "reading": "dekirukagirinokotohayattanode、kekkagadounattemokuihanai。",
        "translation": "Tôi đã làm tất cả những gì có thể nên dù kết quả có ra sao tôi cũng không hề hối hận."
      }
    ]
  },
  {
    "id": "ja-g-n2-74-nai-kagiri",
    "language": "ja",
    "level": "N2",
    "pattern": "〜ないかぎり (nai kagiri)",
    "meaning": "trừ khi; miễn là... không phải",
    "formula": "Động từ thể ない (V-nai) + かぎり",
    "note": "B giữ được chừng nào A không xảy ra. Nhấn mạnh và trang trọng hơn 〜なければ.",
    "examples": [
      {
        "text": "よほどのことがないかぎり、明日[あした]の会議[かいぎ]には出席[しゅっせき]します。",
        "furigana": "よほどのことがないかぎり、明日[あした]の会議[かいぎ]には出席[しゅっせき]します。",
        "reading": "yohodonokotoganaikagiri、ashitanokaiginihashussekishimasu。",
        "translation": "Tôi sẽ tham dự cuộc họp ngày mai trừ khi có vấn đề nghiêm trọng."
      },
      {
        "text": "本人[ほんにん]が反省[はんせい]しないかぎり、同[おな]じ問題[もんだい]は何[なん]度[ど]でも起[お]こるだろう。",
        "furigana": "本人[ほんにん]が反省[はんせい]しないかぎり、同[おな]じ問題[もんだい]は何[なん]度[ど]でも起[お]こるだろう。",
        "reading": "honningahanseishinaikagiri、onajimondaihanandodemookorudarou。",
        "translation": "Trừ khi bản thân người đó ăn năn, nếu không vấn đề tương tự sẽ xảy ra nhiều lần."
      }
    ]
  },
  {
    "id": "ja-g-n2-75-ni-kakete-wa",
    "language": "ja",
    "level": "N2",
    "pattern": "〜にかけては (ni kakete wa)",
    "meaning": "khi nói đến; về mặt (kỹ năng)",
    "formula": "Danh từ (N) + にかけては / Danh từ (N) + にかけても",
    "note": "Khen ngợi khả năng của ai đó trong một lĩnh vực cụ thể; thường được theo sau bởi 誰にも負けない, 一番だ, 自信がある.",
    "examples": [
      {
        "text": "料理[りょうり]の腕[うで]にかけては、うちの父[ちち]は誰[だれ]にも負[ま]けない。",
        "furigana": "料理[りょうり]の腕[うで]にかけては、うちの父[ちち]は誰[だれ]にも負[ま]けない。",
        "reading": "ryourinoudenikaketeha、uchinochichihadarenimomakenai。",
        "translation": "Tài nấu ăn của bố tôi không ai sánh bằng."
      },
      {
        "text": "彼女[かのじょ]は数字[すうじ]の分析[ぶんせき]にかけては、社内[しゃない]で右[みぎ]に出[で]る者[もの]がいない。",
        "furigana": "彼女[かのじょ]は数字[すうじ]の分析[ぶんせき]にかけては、社内[しゃない]で右[みぎ]に出[で]る者[もの]がいない。",
        "reading": "kanojohasuujinobunsekinikaketeha、shanaidemiginiderumonogainai。",
        "translation": "Cô ấy là người đứng thứ hai trong công ty về khả năng phân tích các con số."
      }
    ]
  },
  {
    "id": "ja-g-n2-76-ni-kotaete",
    "language": "ja",
    "level": "N2",
    "pattern": "〜にこたえて (ni kotaete)",
    "meaning": "để đáp lại; cuộc họp (kỳ vọng, yêu cầu)",
    "formula": "Danh từ (N) + にこたえて / Danh từ (N) + にこたえる + Danh từ (N)",
    "note": "Dùng với các danh từ như 期待, 要望, 声援, 要求. Cũng được viết là 〜に応えて. So sánh 〜に応じて, có nghĩa là điều chỉnh theo một điều kiện.",
    "examples": [
      {
        "text": "ファンの声援[せいえん]にこたえて、選手[せんしゅ]たちは手[て]を振[ふ]った。",
        "furigana": "ファンの声援[せいえん]にこたえて、選手[せんしゅ]たちは手[て]を振[ふ]った。",
        "reading": "ファンnoseiennikotaete、senshutachihateofutta。",
        "translation": "Các cầu thủ vẫy tay đáp lại sự cổ vũ của người hâm mộ."
      },
      {
        "text": "利用[りよう]者[しゃ]の要望[ようぼう]にこたえて、図書館[としょかん]の開館[かいかん]時間[じかん]が延長[えんちょう]された。",
        "furigana": "利用[りよう]者[しゃ]の要望[ようぼう]にこたえて、図書館[としょかん]の開館[かいかん]時間[じかん]が延長[えんちょう]された。",
        "reading": "riyoushanoyoubounikotaete、toshokannokaikanjikangaenchousareta。",
        "translation": "Để đáp ứng yêu cầu của người dùng, giờ mở cửa của thư viện đã được kéo dài."
      },
      {
        "text": "彼[かれ]は周囲[しゅうい]の期待[きたい]にこたえる結果[けっか]を出[だ]した。",
        "furigana": "彼[かれ]は周囲[しゅうい]の期待[きたい]にこたえる結果[けっか]を出[だ]した。",
        "reading": "karehashuuinokitainikotaerukekkaodashita。",
        "translation": "Anh ấy đã đạt được những kết quả đáp ứng được sự mong đợi của những người xung quanh."
      }
    ]
  },
  {
    "id": "ja-g-n2-77-ni-sakidatte",
    "language": "ja",
    "level": "N2",
    "pattern": "〜に先立って (ni sakidatte)",
    "meaning": "trước; trước",
    "formula": "Danh từ (N) + に先立って / Động từ thể từ điển (V-dict) + に先立って / Danh từ (N) + に先立つ + Danh từ (N)",
    "note": "Chính thức; để chuẩn bị hoặc sự kiện xảy ra trước một dịp quan trọng. 〜に先立ち là dạng viết.",
    "examples": [
      {
        "text": "新作[しんさく]映画[えいが]の公開[こうかい]に先立[さきだ]って、完成[かんせい]披露[ひろう]試写[ししゃ]会[かい]が開[ひら]かれた。",
        "furigana": "新作[しんさく]映画[えいが]の公開[こうかい]に先立[さきだ]って、完成[かんせい]披露[ひろう]試写[ししゃ]会[かい]が開[ひら]かれた。",
        "reading": "shinsakueiganokoukainisakidatte、kanseihiroushishakaigahirakareta。",
        "translation": "Trước khi ra mắt bộ phim mới, một buổi chiếu thử đã được tổ chức để giới thiệu thành phẩm."
      },
      {
        "text": "試合[しあい]開始[かいし]に先立[さきだ]ち、全員[ぜんいん]で黙[もく]とうをささげた。",
        "furigana": "試合[しあい]開始[かいし]に先立[さきだ]ち、全員[ぜんいん]で黙[もく]とうをささげた。",
        "reading": "shiaikaishinisakidachi、zenindemokutouosasageta。",
        "translation": "Trước khi trận đấu bắt đầu, mọi người đều im lặng một lúc."
      }
    ]
  },
  {
    "id": "ja-g-n2-78-ni-shiro-ni-seyo",
    "language": "ja",
    "level": "N2",
    "pattern": "〜にしろ / 〜にせよ (ni shiro / ni seyo)",
    "meaning": "ngay cả khi; liệu ... hay ...; trong mọi trường hợp",
    "formula": "Động từ thể thông thường (V thường) / Tính từ đuôi い (A-i) / Tính từ đuôi な (A-na) / Danh từ (N) + にしろ・にせよ",
    "note": "Cùng nghĩa với 〜にしても (N3) nhưng trang trọng hơn; にせよ được viết nhiều nhất. Dạng ghép AにしろBにしろ có nghĩa là 'A hay B'.",
    "examples": [
      {
        "text": "たとえ冗談[じょうだん]にしろ、そんなことを言[い]うべきではない。",
        "furigana": "たとえ冗談[じょうだん]にしろ、そんなことを言[い]うべきではない。",
        "reading": "tatoejoudannishiro、sonnakotooiubekidehanai。",
        "translation": "Bạn không nên nói vậy, kể cả khi bạn nói đùa."
      },
      {
        "text": "参加[さんか]するにせよしないにせよ、今週[こんしゅう]中[ちゅう]に返事[へんじ]をください。",
        "furigana": "参加[さんか]するにせよしないにせよ、今週[こんしゅう]中[ちゅう]に返事[へんじ]をください。",
        "reading": "sankasuruniseyoshinainiseyo、konshuuchuunihenjiokudasai。",
        "translation": "Hãy phản hồi trong tuần này dù bạn có tham gia hay không."
      },
      {
        "text": "いずれにせよ、もう一度[いちど]話[はな]し合[あ]う必要[ひつよう]がある。",
        "furigana": "いずれにせよ、もう一度[いちど]話[はな]し合[あ]う必要[ひつよう]がある。",
        "reading": "izureniseyo、mouichidohanashiauhitsuyougaaru。",
        "translation": "Dù sao thì chúng ta cũng cần nói chuyện lại."
      }
    ]
  },
  {
    "id": "ja-g-n2-79-ni-sureba-ni-shitara",
    "language": "ja",
    "level": "N2",
    "pattern": "〜にすれば / 〜にしたら (ni sureba / ni shitara)",
    "meaning": "theo quan điểm của; cho (ai đó), (có vẻ như)",
    "formula": "Danh từ (N) + にすれば / Danh từ (N) + にしたら",
    "note": "Tưởng tượng mọi thứ sẽ cảm thấy như thế nào từ vị trí của người khác (thường không phải của người nói). Không giống như 〜にとって, nó tập trung vào cảm xúc hoặc quan điểm của người đó.",
    "examples": [
      {
        "text": "子[こ]どもにすれば、親[おや]の小言[こごと]はうるさいだけなのだろう。",
        "furigana": "子[こ]どもにすれば、親[おや]の小言[こごと]はうるさいだけなのだろう。",
        "reading": "kodomonisureba、oyanokogotohaurusaidakenanodarou。",
        "translation": "Đối với trẻ con, việc cha mẹ cằn nhằn có lẽ chỉ là điều khó chịu mà thôi."
      },
      {
        "text": "毎日[まいにち]遅[おそ]くまで残業[ざんぎょう]させられる社員[しゃいん]にしたら、たまったものではない。",
        "furigana": "毎日[まいにち]遅[おそ]くまで残業[ざんぎょう]させられる社員[しゃいん]にしたら、たまったものではない。",
        "reading": "mainichiosokumadezangyousaserarerushainnishitara、tamattamonodehanai。",
        "translation": "Sẽ thật không thể chịu nổi khi có một nhân viên ngày nào cũng bị buộc phải làm thêm giờ đến khuya."
      }
    ]
  },
  {
    "id": "ja-g-n2-80-ni-soui-nai",
    "language": "ja",
    "level": "N2",
    "pattern": "〜に相違ない (ni soui nai)",
    "meaning": "không còn nghi ngờ gì nữa; phải thế; chắc chắn",
    "formula": "Động từ thể thông thường (V thường) / Tính từ đuôi い (A-i) / Tính từ đuôi な (A-na) / Danh từ (N) + に相違ない",
    "note": "Một dạng viết, trang trọng tương đương với 〜に違いない (N3). Cũng thấy trên các biểu mẫu: 上記の通り相違ありません ('điều trên là chính xác').",
    "examples": [
      {
        "text": "この筆跡[ひっせき]は、父[ちち]のものに相違[そうい]ない。",
        "furigana": "この筆跡[ひっせき]は、父[ちち]のものに相違[そうい]ない。",
        "reading": "konohissekiha、chichinomononisouinai。",
        "translation": "Chữ viết này chắc chắn là của bố tôi."
      },
      {
        "text": "彼[かれ]の証言[しょうげん]が事実[じじつ]なら、事件[じけん]の背後[はいご]には別[べつ]の人物[じんぶつ]がいるに相違[そうい]ない。",
        "furigana": "彼[かれ]の証言[しょうげん]が事実[じじつ]なら、事件[じけん]の背後[はいご]には別[べつ]の人物[じんぶつ]がいるに相違[そうい]ない。",
        "reading": "karenoshougengajijitsunara、jikennohaigonihabetsunojinbutsugairunisouinai。",
        "translation": "Nếu lời khai của anh ta là đúng thì chắc chắn phải có người khác đứng sau vụ việc."
      }
    ]
  },
  {
    "id": "ja-g-n2-81-ni-koshita-koto-wa-nai",
    "language": "ja",
    "level": "N2",
    "pattern": "〜に越したことはない (ni koshita koto wa nai)",
    "meaning": "; không có gì tốt hơn",
    "formula": "Động từ thể từ điển (V-dict) / Động từ thể ない (V-nai) / Tính từ đuôi い (A-i) / Tính từ đuôi な (A-na) / Danh từ (N) + に越したことはない",
    "note": "Thể hiện sự ưa thích thông thường, thường theo sau là が / けれど và một sự dè dặt thực tế. So sánh 〜に限る, đó là sự lựa chọn cá nhân hơn.",
    "examples": [
      {
        "text": "どんなに健康[けんこう]でも、定期[ていき]的[てき]に検診[けんしん]を受[う]けるに越[こ]したことはない。",
        "furigana": "どんなに健康[けんこう]でも、定期[ていき]的[てき]に検診[けんしん]を受[う]けるに越[こ]したことはない。",
        "reading": "donnanikenkoudemo、teikitekinikenshinoukerunikoshitakotohanai。",
        "translation": "Dù bạn có khỏe mạnh đến đâu thì việc kiểm tra sức khỏe định kỳ luôn là điều nên làm."
      },
      {
        "text": "旅行[りょこう]の荷物[にもつ]は、軽[かる]いに越[こ]したことはない。",
        "furigana": "旅行[りょこう]の荷物[にもつ]は、軽[かる]いに越[こ]したことはない。",
        "reading": "ryokounonimotsuha、karuinikoshitakotohanai。",
        "translation": "Tốt hơn hết là bạn nên mang theo hành lý gọn nhẹ khi đi du lịch."
      },
      {
        "text": "住[す]まいは駅[えき]に近[ちか]いに越[こ]したことはないが、その分[ぶん]家賃[やちん]が高[たか]くなる。",
        "furigana": "住[す]まいは駅[えき]に近[ちか]いに越[こ]したことはないが、その分[ぶん]家賃[やちん]が高[たか]くなる。",
        "reading": "sumaihaekinichikainikoshitakotohanaiga、sonobunyachingatakakunaru。",
        "translation": "Sống gần ga thì tốt hơn nhưng giá thuê nhà cũng sẽ cao hơn."
      }
    ]
  },
  {
    "id": "ja-g-n2-82-ni-hoka-naranai",
    "language": "ja",
    "level": "N2",
    "pattern": "〜にほかならない (ni hoka naranai)",
    "meaning": "không có gì khác hơn; không ai khác hơn là; chính xác là",
    "formula": "Danh từ (N) + にほかならない / Động từ thể thông thường (V thường) + から + にほかならない",
    "note": "Khẳng định mạnh mẽ rằng điều này và không có gì khác là trường hợp. 〜からにほかならない nhấn mạnh một lý do. Chính thức/bằng văn bản.",
    "examples": [
      {
        "text": "今回[こんかい]の成功[せいこう]は、社員[しゃいん]一人[ひとり]ひとりの努力[どりょく]の結果[けっか]にほかならない。",
        "furigana": "今回[こんかい]の成功[せいこう]は、社員[しゃいん]一人[ひとり]ひとりの努力[どりょく]の結果[けっか]にほかならない。",
        "reading": "konkainoseikouha、shainhitorihitorinodoryokunokekkanihokanaranai。",
        "translation": "Thành công này là kết quả của sự nỗ lực của mỗi nhân viên."
      },
      {
        "text": "彼[かれ]が厳[きび]しく指導[しどう]するのは、選手[せんしゅ]の才能[さいのう]を信[しん]じているからにほかならない。",
        "furigana": "彼[かれ]が厳[きび]しく指導[しどう]するのは、選手[せんしゅ]の才能[さいのう]を信[しん]じているからにほかならない。",
        "reading": "karegakibishikushidousurunoha、senshunosainouoshinjiteirukaranihokanaranai。",
        "translation": "Sở dĩ ông đưa ra huấn luyện nghiêm khắc là vì ông tin vào tài năng của các cầu thủ."
      }
    ]
  },
  {
    "id": "ja-g-n2-83-ni-mo-kakawarazu",
    "language": "ja",
    "level": "N2",
    "pattern": "〜にもかかわらず (ni mo kakawarazu)",
    "meaning": "mặc dù; mặc dù; mặc dù",
    "formula": "Động từ thể thông thường (V thường) / Tính từ đuôi い (A-i) / Tính từ đuôi な (A-na) + である / Danh từ (N) + にもかかわらず",
    "note": "Một dạng tương đương trang trọng của 〜のに, phổ biến trong tin tức và văn viết; nhấn mạnh rằng kết quả đi ngược lại với những gì A mong đợi. Đừng nhầm lẫn với 〜にかかわらず (bất kể cái nào).",
    "examples": [
      {
        "text": "悪天候[あくてんこう]にもかかわらず、大勢[おおぜい]の観客[かんきゃく]が会場[かいじょう]に集[あつ]まった。",
        "furigana": "悪天候[あくてんこう]にもかかわらず、大勢[おおぜい]の観客[かんきゃく]が会場[かいじょう]に集[あつ]まった。",
        "reading": "akutenkounimokakawarazu、oozeinokankyakugakaijouniatsumatta。",
        "translation": "Bất chấp thời tiết xấu nhưng rất đông khán giả vẫn tập trung tại địa điểm thi đấu."
      },
      {
        "text": "何[なん]度[ど]も注意[ちゅうい]されたにもかかわらず、彼[かれ]は同[おな]じミスを繰[く]り返[かえ]した。",
        "furigana": "何[なん]度[ど]も注意[ちゅうい]されたにもかかわらず、彼[かれ]は同[おな]じミスを繰[く]り返[かえ]した。",
        "reading": "nandomochuuisaretanimokakawarazu、karehaonajiミスokurikaeshita。",
        "translation": "Dù đã được cảnh cáo nhiều lần nhưng anh vẫn tiếp tục mắc lỗi tương tự."
      }
    ]
  },
  {
    "id": "ja-g-n2-84-ni-atatte",
    "language": "ja",
    "level": "N2",
    "pattern": "〜にあたって (ni atatte)",
    "meaning": "khi nào; vào thời điểm đó; nhân dịp (bắt đầu một việc gì đó quan trọng)",
    "formula": "Danh từ (N) + にあたって / Động từ thể từ điển (V-dict) + にあたって / Danh từ (N) + にあたっての + Danh từ (N)",
    "note": "Chính thức; được sử dụng khi phải đối mặt với một công việc quan trọng, thường với ý thức chuẩn bị hoặc quyết tâm. 〜に際して cũng tương tự nhưng chỉ đơn giản là đánh dấu sự kiện. Dạng viết: 〜にあたり.",
    "examples": [
      {
        "text": "新[しん]生活[せいかつ]を始[はじ]めるにあたって、必要[ひつよう]な物[もの]をリストにまとめた。",
        "furigana": "新[しん]生活[せいかつ]を始[はじ]めるにあたって、必要[ひつよう]な物[もの]をリストにまとめた。",
        "reading": "shinseikatsuohajimeruniatatte、hitsuyounamonooリストnimatometa。",
        "translation": "Tôi đã tổng hợp danh sách những thứ bạn cần để bắt đầu cuộc sống mới."
      },
      {
        "text": "開会[かいかい]にあたり、主催[しゅさい]者[しゃ]を代表[だいひょう]して一言[ひとこと]ご挨拶[あいさつ]申[もう]し上[あ]げます。",
        "furigana": "開会[かいかい]にあたり、主催[しゅさい]者[しゃ]を代表[だいひょう]して一言[ひとこと]ご挨拶[あいさつ]申[もう]し上[あ]げます。",
        "reading": "kaikainiatari、shusaishaodaihyoushitehitokotogoaisatsumoushiagemasu。",
        "translation": "Để mở đầu sự kiện, thay mặt ban tổ chức tôi xin gửi vài lời chào mừng."
      },
      {
        "text": "論文[ろんぶん]を書[か]くにあたっては、引用[いんよう]のルールを守[まも]らなければならない。",
        "furigana": "論文[ろんぶん]を書[か]くにあたっては、引用[いんよう]のルールを守[まも]らなければならない。",
        "reading": "ronbunokakuniatatteha、inyounoルールomamoranakerebanaranai。",
        "translation": "Khi viết bài phải tuân thủ quy định trích dẫn."
      }
    ]
  },
  {
    "id": "ja-g-n2-85-ni-oite-ni-okeru",
    "language": "ja",
    "level": "N2",
    "pattern": "〜において / 〜における (ni oite / ni okeru)",
    "meaning": "trong; Tại; trong lĩnh vực (chính thức)",
    "formula": "Danh từ (N) + において / Danh từ (N) + における + Danh từ (N)",
    "note": "Phiên bản trang trọng của で dùng để chỉ địa điểm, thời gian, lĩnh vực hoặc tình huống. Trước một danh từ, có dạng 〜における.",
    "examples": [
      {
        "text": "卒業[そつぎょう]式[しき]は大[だい]講堂[こうどう]において行[おこな]われます。",
        "furigana": "卒業[そつぎょう]式[しき]は大[だい]講堂[こうどう]において行[おこな]われます。",
        "reading": "sotsugyoushikihadaikoudounioiteokonawaremasu。",
        "translation": "Lễ tốt nghiệp sẽ được tổ chức tại khán phòng lớn."
      },
      {
        "text": "現代[げんだい]社会[しゃかい]における家族[かぞく]の役割[やくわり]について考[かんが]えてみたい。",
        "furigana": "現代[げんだい]社会[しゃかい]における家族[かぞく]の役割[やくわり]について考[かんが]えてみたい。",
        "reading": "gendaishakainiokerukazokunoyakuwarinitsuitekangaetemitai。",
        "translation": "Tôi xin suy nghĩ về vai trò của gia đình trong xã hội hiện đại."
      },
      {
        "text": "彼女[かのじょ]はデザインの分野[ぶんや]において高[たか]く評価[ひょうか]されている。",
        "furigana": "彼女[かのじょ]はデザインの分野[ぶんや]において高[たか]く評価[ひょうか]されている。",
        "reading": "kanojohaデザインnobunyanioitetakakuhyoukasareteiru。",
        "translation": "Cô được đánh giá cao trong lĩnh vực thiết kế."
      }
    ]
  },
  {
    "id": "ja-g-n2-86-ni-kakawarazu",
    "language": "ja",
    "level": "N2",
    "pattern": "〜にかかわらず (ni kakawarazu)",
    "meaning": "bất kể; bất kể",
    "formula": "Danh từ (N) + にかかわらず / Động từ thể từ điển (V-dict) + Động từ thể ない (V-nai) + にかかわらず",
    "note": "Dùng với các danh từ ám chỉ một phạm vi hoặc một cặp đối lập (年齢, 天候, 有無, 男女). Rất gần với 〜を問わず. Đừng nhầm lẫn với 〜にもかかわらず (mặc dù).",
    "examples": [
      {
        "text": "このセミナーは、経験[けいけん]の有無[うむ]にかかわらず、どなたでも参加[さんか]できます。",
        "furigana": "このセミナーは、経験[けいけん]の有無[うむ]にかかわらず、どなたでも参加[さんか]できます。",
        "reading": "konoセミナーha、keikennoumunikakawarazu、donatademosankadekimasu。",
        "translation": "Hội thảo này dành cho tất cả mọi người, bất kể kinh nghiệm."
      },
      {
        "text": "天候[てんこう]にかかわらず、試合[しあい]は予定[よてい]通[どお]り行[おこな]います。",
        "furigana": "天候[てんこう]にかかわらず、試合[しあい]は予定[よてい]通[どお]り行[おこな]います。",
        "reading": "tenkounikakawarazu、shiaihayoteidooriokonaimasu。",
        "translation": "Trò chơi sẽ diễn ra theo lịch trình bất kể thời tiết."
      },
      {
        "text": "出席[しゅっせき]するしないにかかわらず、必[かなら]ず返信[へんしん]してください。",
        "furigana": "出席[しゅっせき]するしないにかかわらず、必[かなら]ず返信[へんしん]してください。",
        "reading": "shussekisurushinainikakawarazu、kanarazuhenshinshitekudasai。",
        "translation": "Hãy chắc chắn trả lời dù bạn có tham dự hay không."
      }
    ]
  },
  {
    "id": "ja-g-n2-87-ni-kakawaru",
    "language": "ja",
    "level": "N2",
    "pattern": "〜にかかわる (ni kakawaru)",
    "meaning": "cụ thể nào ảnh hưởng; liên quan (điều gì đó quan trọng); liên quan đến",
    "formula": "Danh từ (N) + にかかわる",
    "note": "Dùng cho những việc gây hậu quả nghiêm trọng: 命, 名誉, 信用, 将来. Cũng được viết 〜に関わる.",
    "examples": [
      {
        "text": "これは人[ひと]の命[いのち]にかかわる問題[もんだい]だから、慎重[しんちょう]に判断[はんだん]しなければならない。",
        "furigana": "これは人[ひと]の命[いのち]にかかわる問題[もんだい]だから、慎重[しんちょう]に判断[はんだん]しなければならない。",
        "reading": "korehahitonoinochinikakawarumondaidakara、shinchounihandanshinakerebanaranai。",
        "translation": "Đây là vấn đề ảnh hưởng đến đời sống người dân nên chúng ta phải đưa ra quyết định một cách thận trọng."
      },
      {
        "text": "会社[かいしゃ]の信用[しんよう]にかかわるようなミスは、絶対[ぜったい]に避[さ]けたい。",
        "furigana": "会社[かいしゃ]の信用[しんよう]にかかわるようなミスは、絶対[ぜったい]に避[さ]けたい。",
        "reading": "kaishanoshinyounikakawaruyounaミスha、zettainisaketai。",
        "translation": "Tôi nhất định muốn tránh mắc phải những sai sót làm ảnh hưởng đến uy tín của công ty."
      }
    ]
  },
  {
    "id": "ja-g-n2-88-ni-tsuki",
    "language": "ja",
    "level": "N2",
    "pattern": "〜につき (ni tsuki)",
    "meaning": "mỗi; cho mỗi người; do (trong các thông báo trang trọng)",
    "formula": "Danh từ (N) + につき",
    "note": "Hai cách sử dụng riêng biệt: 'per' với số lượng và 'vì' trên các thông báo và biển hiệu (工事中につき). Lý do sử dụng là rất trang trọng.",
    "examples": [
      {
        "text": "駐車[ちゅうしゃ]料金[りょうきん]は、一[いち]時間[じかん]につき三百[さんびゃく]円[えん]です。",
        "furigana": "駐車[ちゅうしゃ]料金[りょうきん]は、一[いち]時間[じかん]につき三百[さんびゃく]円[えん]です。",
        "reading": "chuusharyoukinha、ichijikannitsukisanbyakuendesu。",
        "translation": "Phí đỗ xe là 300 yên mỗi giờ."
      },
      {
        "text": "本日[ほんじつ]は定休[ていきゅう]日[び]につき、お休[やす]みさせていただきます。",
        "furigana": "本日[ほんじつ]は定休[ていきゅう]日[び]につき、お休[やす]みさせていただきます。",
        "reading": "honjitsuhateikyuubinitsuki、oyasumisaseteitadakimasu。",
        "translation": "Hôm nay chúng tôi sẽ đóng cửa vì đây là ngày nghỉ lễ bình thường."
      },
      {
        "text": "工事[こうじ]中[ちゅう]につき、この先[さき]は通行止[つうこうど]めです。",
        "furigana": "工事[こうじ]中[ちゅう]につき、この先[さき]は通行止[つうこうど]めです。",
        "reading": "koujichuunitsuki、konosakihatsuukoudomedesu。",
        "translation": "Do đang thi công nên con đường phía trước bị đóng."
      }
    ]
  },
  {
    "id": "ja-g-n2-89-ni-mukete",
    "language": "ja",
    "level": "N2",
    "pattern": "〜に向けて (ni mukete)",
    "meaning": "hướng tới; nhằm vào; đang chuẩn bị cho; gửi đến",
    "formula": "Danh từ (N) + に向けて / Danh từ (N) + に向けた + Danh từ (N)",
    "note": "Đánh dấu một mục tiêu hoặc sự kiện đang được hướng tới hoặc khán giả có điều gì đó hướng tới. Khác với 〜向け (N3), 'được thiết kế cho'.",
    "examples": [
      {
        "text": "来年[らいねん]の全国[ぜんこく]大会[たいかい]に向[む]けて、毎日[まいにち]練習[れんしゅう]に励[はげ]んでいる。",
        "furigana": "来年[らいねん]の全国[ぜんこく]大会[たいかい]に向[む]けて、毎日[まいにち]練習[れんしゅう]に励[はげ]んでいる。",
        "reading": "rainennozenkokutaikainimukete、mainichirenshuunihagendeiru。",
        "translation": "Tôi đang luyện tập chăm chỉ mỗi ngày để chuẩn bị cho giải đấu quốc gia năm sau."
      },
      {
        "text": "政府[せいふ]は、温室[おんしつ]効果[こうか]ガス削減[さくげん]に向[む]けた新[あたら]しい計画[けいかく]を発表[はっぴょう]した。",
        "furigana": "政府[せいふ]は、温室[おんしつ]効果[こうか]ガス削減[さくげん]に向[む]けた新[あたら]しい計画[けいかく]を発表[はっぴょう]した。",
        "reading": "seifuha、onshitsukoukaガスsakugennimuketaatarashiikeikakuohappyoushita。",
        "translation": "Chính phủ đã công bố kế hoạch mới nhằm giảm khí thải nhà kính."
      },
      {
        "text": "大統領[だいとうりょう]は国民[こくみん]に向[む]けてメッセージを発表[はっぴょう]した。",
        "furigana": "大統領[だいとうりょう]は国民[こくみん]に向[む]けてメッセージを発表[はっぴょう]した。",
        "reading": "daitouryouhakokuminnimuketeメッセージohappyoushita。",
        "translation": "Chủ tịch nước gửi thông điệp tới toàn dân."
      }
    ]
  },
  {
    "id": "ja-g-n2-90-no-moto-de-no-moto-ni",
    "language": "ja",
    "level": "N2",
    "pattern": "〜のもとで / 〜のもとに (no moto de / no moto ni)",
    "meaning": "dưới (sự hướng dẫn, ảnh hưởng, một quy luật); với",
    "formula": "Danh từ (N) + のもとで / Danh từ (N) + のもとに",
    "note": "Dưới sự hướng dẫn, bảo vệ hoặc ảnh hưởng của ai đó, hoặc dưới một quy tắc hoặc điều kiện. Thường được viết là 〜の下で / 〜の下に.",
    "examples": [
      {
        "text": "私[わたし]は大学院[だいがくいん]で、有名[ゆうめい]な教授[きょうじゅ]のもとで研究[けんきゅう]を続[つづ]けた。",
        "furigana": "私[わたし]は大学院[だいがくいん]で、有名[ゆうめい]な教授[きょうじゅ]のもとで研究[けんきゅう]を続[つづ]けた。",
        "reading": "watashihadaigakuinde、yuumeinakyoujunomotodekenkyuuotsuzuketa。",
        "translation": "Tôi tiếp tục nghiên cứu ở trường cao học dưới sự hướng dẫn của một giáo sư nổi tiếng."
      },
      {
        "text": "明[あか]るい太陽[たいよう]のもとで、子[こ]どもたちが元気[げんき]に遊[あそ]んでいる。",
        "furigana": "明[あか]るい太陽[たいよう]のもとで、子[こ]どもたちが元気[げんき]に遊[あそ]んでいる。",
        "reading": "akaruitaiyounomotode、kodomotachigagenkiniasondeiru。",
        "translation": "Trẻ em đang vui đùa vui vẻ dưới ánh nắng chói chang."
      },
      {
        "text": "すべての国民[こくみん]は、法[ほう]のもとに平等[びょうどう]である。",
        "furigana": "すべての国民[こくみん]は、法[ほう]のもとに平等[びょうどう]である。",
        "reading": "subetenokokuminha、hounomotonibyoudoudearu。",
        "translation": "Mọi công dân đều bình đẳng trước pháp luật."
      }
    ]
  },
  {
    "id": "ja-g-n2-91-nuki-de-nuki-ni",
    "language": "ja",
    "level": "N2",
    "pattern": "〜抜きで / 〜抜きに (nuki de / nuki ni)",
    "meaning": "không có; bỏ",
    "formula": "Danh từ (N) + 抜きで / Danh từ (N) + 抜きに / Danh từ (N) + 抜きの + Danh từ (N)",
    "note": "Bỏ đi một số thứ thường được đưa vào. 〜抜きには〜ない / 〜を抜きにしては〜ない có nghĩa là 'không thể... không có'.",
    "examples": [
      {
        "text": "今日[きょう]は仕事[しごと]の話[はなし]抜[ぬ]きで、ゆっくり楽[たの]しみましょう。",
        "furigana": "今日[きょう]は仕事[しごと]の話[はなし]抜[ぬ]きで、ゆっくり楽[たの]しみましょう。",
        "reading": "kyouhashigotonohanashinukide、yukkuritanoshimimashou。",
        "translation": "Hôm nay hãy vui vẻ chút mà không nói chuyện công việc nhé."
      },
      {
        "text": "彼[かれ]の協力[きょうりょく]抜[ぬ]きには、このプロジェクトは成功[せいこう]しなかっただろう。",
        "furigana": "彼[かれ]の協力[きょうりょく]抜[ぬ]きには、このプロジェクトは成功[せいこう]しなかっただろう。",
        "reading": "karenokyouryokunukiniha、konoプロジェクトhaseikoushinakattadarou。",
        "translation": "Nếu không có sự giúp đỡ của anh ấy thì dự án này đã không thể thành công."
      },
      {
        "text": "朝食[ちょうしょく]抜[ぬ]きで出勤[しゅっきん]する人[ひと]が増[ふ]えている。",
        "furigana": "朝食[ちょうしょく]抜[ぬ]きで出勤[しゅっきん]する人[ひと]が増[ふ]えている。",
        "reading": "choushokunukideshukkinsuruhitogafueteiru。",
        "translation": "Số người đi làm không ăn sáng ngày càng tăng."
      }
    ]
  },
  {
    "id": "ja-g-n2-92-o-komete",
    "language": "ja",
    "level": "N2",
    "pattern": "〜をこめて (o komete)",
    "meaning": "với (cảm giác); đầy ; đưa ... vào",
    "formula": "Danh từ (N) + をこめて",
    "note": "Dùng với cảm xúc hoặc ý định (愛, 感謝, 願い, 心). Cũng được viết là 〜を込めて.",
    "examples": [
      {
        "text": "母[はは]の誕生[たんじょう]日[び]に、感謝[かんしゃ]の気持[きも]ちをこめて手紙[てがみ]を書[か]いた。",
        "furigana": "母[はは]の誕生[たんじょう]日[び]に、感謝[かんしゃ]の気持[きも]ちをこめて手紙[てがみ]を書[か]いた。",
        "reading": "hahanotanjoubini、kanshanokimochiokometetegamiokaita。",
        "translation": "Nhân ngày sinh nhật của mẹ, tôi đã viết một lá thư để bày tỏ lòng biết ơn."
      },
      {
        "text": "職人[しょくにん]が一[ひと]つ一[ひと]つ心[こころ]をこめて作[つく]った器[うつわ]です。",
        "furigana": "職人[しょくにん]が一[ひと]つ一[ひと]つ心[こころ]をこめて作[つく]った器[うつわ]です。",
        "reading": "shokuningahitotsuhitotsukokorookometetsukuttautsuwadesu。",
        "translation": "Mỗi tác phẩm đều được người nghệ nhân làm một cách hết sức cẩn thận."
      }
    ]
  },
  {
    "id": "ja-g-n2-93-o-chuushin-ni",
    "language": "ja",
    "level": "N2",
    "pattern": "〜を中心に (o chuushin ni)",
    "meaning": "tập trung vào; tập trung vào; chủ yếu là",
    "formula": "Danh từ (N) + を中心に / Danh từ (N) + を中心として / Danh từ (N) + を中心とした + Danh từ (N)",
    "note": "A là phần cốt lõi hoặc phần chính của một khu vực, nhóm hoặc hoạt động rộng hơn.",
    "examples": [
      {
        "text": "今回[こんかい]の地震[じしん]では、沿岸[えんがん]部[ぶ]を中心[ちゅうしん]に大[おお]きな被害[ひがい]が出[で]た。",
        "furigana": "今回[こんかい]の地震[じしん]では、沿岸[えんがん]部[ぶ]を中心[ちゅうしん]に大[おお]きな被害[ひがい]が出[で]た。",
        "reading": "konkainojishindeha、enganbuochuushinniookinahigaigadeta。",
        "translation": "Trận động đất này gây thiệt hại lớn chủ yếu ở khu vực ven biển."
      },
      {
        "text": "この講座[こうざ]では、会話[かいわ]を中心[ちゅうしん]に実践[じっせん]的[てき]な日本語[にほんご]を学[まな]びます。",
        "furigana": "この講座[こうざ]では、会話[かいわ]を中心[ちゅうしん]に実践[じっせん]的[てき]な日本語[にほんご]を学[まな]びます。",
        "reading": "konokouzadeha、kaiwaochuushinnijissentekinanihongoomanabimasu。",
        "translation": "Trong khóa học này, bạn sẽ học tiếng Nhật thực tế, tập trung vào hội thoại."
      },
      {
        "text": "若者[わかもの]を中心[ちゅうしん]とした新[あたら]しいファッションが広[ひろ]がっている。",
        "furigana": "若者[わかもの]を中心[ちゅうしん]とした新[あたら]しいファッションが広[ひろ]がっている。",
        "reading": "wakamonoochuushintoshitaatarashiiファッションgahirogatteiru。",
        "translation": "Thời trang mới đang lan rộng, đặc biệt là trong giới trẻ."
      }
    ]
  },
  {
    "id": "ja-g-n2-94-o-moto-ni",
    "language": "ja",
    "level": "N2",
    "pattern": "〜をもとに (o moto ni)",
    "meaning": "; sử dụng… làm cơ sở hoặc nguồn",
    "formula": "Danh từ (N) + をもとに / Danh từ (N) + をもとにして / Danh từ (N) + をもとにした + Danh từ (N)",
    "note": "A là chất liệu hoặc gợi ý để từ đó tạo ra một điều gì đó mới mẻ. 〜に基づいて được sử dụng khi tuân thủ nghiêm ngặt một quy tắc hoặc thực tế nào đó như một tiêu chuẩn.",
    "examples": [
      {
        "text": "この小説[しょうせつ]は、作者[さくしゃ]自身[じしん]の体験[たいけん]をもとに書[か]かれている。",
        "furigana": "この小説[しょうせつ]は、作者[さくしゃ]自身[じしん]の体験[たいけん]をもとに書[か]かれている。",
        "reading": "konoshousetsuha、sakushajishinnotaikenomotonikakareteiru。",
        "translation": "Cuốn tiểu thuyết này được viết dựa trên trải nghiệm của chính tác giả."
      },
      {
        "text": "集[あつ]めたデータをもとにして、グラフを作成[さくせい]した。",
        "furigana": "集[あつ]めたデータをもとにして、グラフを作成[さくせい]した。",
        "reading": "atsumetaデータomotonishite、グラフosakuseishita。",
        "translation": "Tôi đã tạo biểu đồ dựa trên dữ liệu được thu thập."
      }
    ]
  },
  {
    "id": "ja-g-n2-95-o-towazu",
    "language": "ja",
    "level": "N2",
    "pattern": "〜を問わず (o towazu)",
    "meaning": "bất kể; bất kể",
    "formula": "Danh từ (N) + を問わず",
    "note": "Dùng với các danh từ hàm ý một phạm vi hoặc một cặp đối lập (男女, 昼夜, 国内外). Rất gần với 〜にかかわらず; を問わず là điển hình của các quảng cáo và thông báo việc làm.",
    "examples": [
      {
        "text": "この仕事[しごと]は、年齢[ねんれい]や経験[けいけん]を問[と]わず応募[おうぼ]できます。",
        "furigana": "この仕事[しごと]は、年齢[ねんれい]や経験[けいけん]を問[と]わず応募[おうぼ]できます。",
        "reading": "konoshigotoha、nenreiyakeikenotowazuoubodekimasu。",
        "translation": "Công việc này dành cho mọi lứa tuổi và kinh nghiệm."
      },
      {
        "text": "この曲[きょく]は国内外[こくないがい]を問[と]わず、多[おお]くの人々[ひとびと]に愛[あい]されている。",
        "furigana": "この曲[きょく]は国内外[こくないがい]を問[と]わず、多[おお]くの人々[ひとびと]に愛[あい]されている。",
        "reading": "konokyokuhakokunaigaiotowazu、ookunohitobitoniaisareteiru。",
        "translation": "Bài hát này được rất nhiều người ở Nhật Bản và nước ngoài yêu thích."
      },
      {
        "text": "救急[きゅうきゅう]隊員[たいいん]は、昼夜[ちゅうや]を問[と]わず出動[しゅつどう]に備[そな]えている。",
        "furigana": "救急[きゅうきゅう]隊員[たいいん]は、昼夜[ちゅうや]を問[と]わず出動[しゅつどう]に備[そな]えている。",
        "reading": "kyuukyuutaiinha、chuuyaotowazushutsudounisonaeteiru。",
        "translation": "Lực lượng cấp cứu sẵn sàng điều động ngày đêm."
      }
    ]
  },
  {
    "id": "ja-g-n2-96-o-hajime",
    "language": "ja",
    "level": "N2",
    "pattern": "〜をはじめ (o hajime)",
    "meaning": "bắt đầu bằng; bao gồm; chẳng hạn như (một ví dụ điển hình)",
    "formula": "Danh từ (N) + をはじめ / Danh từ (N) + をはじめとして / Danh từ (N) + をはじめとする + Danh từ (N)",
    "note": "Nêu tên thành viên tiêu biểu nhất của nhóm, sau đó đề cập đến cả nhóm. Mệnh đề chính bao gồm nhiều mục, không chỉ A.",
    "examples": [
      {
        "text": "京都[きょうと]には、金閣寺[きんかくじ]をはじめ、多[おお]くの有名[ゆうめい]な寺[てら]がある。",
        "furigana": "京都[きょうと]には、金閣寺[きんかくじ]をはじめ、多[おお]くの有名[ゆうめい]な寺[てら]がある。",
        "reading": "kyoutoniha、kinkakujiohajime、ookunoyuumeinateragaaru。",
        "translation": "Kyoto có nhiều ngôi chùa nổi tiếng, trong đó có Kinkaku-ji."
      },
      {
        "text": "社長[しゃちょう]をはじめとして、社員[しゃいん]全員[ぜんいん]がこの計画[けいかく]に賛成[さんせい]した。",
        "furigana": "社長[しゃちょう]をはじめとして、社員[しゃいん]全員[ぜんいん]がこの計画[けいかく]に賛成[さんせい]した。",
        "reading": "shachouohajimetoshite、shainzeningakonokeikakunisanseishita。",
        "translation": "Tất cả nhân viên, kể cả chủ tịch đều đồng tình với kế hoạch này."
      },
      {
        "text": "米[こめ]をはじめとする農産物[のうさんぶつ]の価格[かかく]が上昇[じょうしょう]している。",
        "furigana": "米[こめ]をはじめとする農産物[のうさんぶつ]の価格[かかく]が上昇[じょうしょう]している。",
        "reading": "komeohajimetosurunousanbutsunokakakugajoushoushiteiru。",
        "translation": "Giá gạo và các nông sản khác đang tăng cao."
      }
    ]
  },
  {
    "id": "ja-g-n2-97-o-to-shite",
    "language": "ja",
    "level": "N2",
    "pattern": "〜を〜として (o ... to shite)",
    "meaning": "coi (A) là (B); với A là B",
    "formula": "Danh từ (N) + を + Danh từ (N) + として / Danh từ (N) + を + Danh từ (N) + とする",
    "note": "Đặt A vào vai trò hoặc chức năng của B; Các danh từ B phổ biến là 目的, 目標, 中心, 対象, 条件. 〜を〜にして là một biến thể thông thường hơn.",
    "examples": [
      {
        "text": "この大会[たいかい]は、地域[ちいき]の活性[かっせい]化[か]を目的[もくてき]として開[ひら]かれている。",
        "furigana": "この大会[たいかい]は、地域[ちいき]の活性[かっせい]化[か]を目的[もくてき]として開[ひら]かれている。",
        "reading": "konotaikaiha、chiikinokasseikaomokutekitoshitehirakareteiru。",
        "translation": "Giải đấu này được tổ chức với mục đích hồi sinh khu vực."
      },
      {
        "text": "私[わたし]たちのチームは、営業[えいぎょう]部[ぶ]の山口[やまぐち]さんをリーダーとして新[あたら]しい企画[きかく]に取[と]り組[く]んでいる。",
        "furigana": "私[わたし]たちのチームは、営業[えいぎょう]部[ぶ]の山口[やまぐち]さんをリーダーとして新[あたら]しい企画[きかく]に取[と]り組[く]んでいる。",
        "reading": "watashitachinoチームha、eigyoubunoyamaguchisanoリーダーtoshiteatarashiikikakunitorikundeiru。",
        "translation": "Nhóm của chúng tôi đang thực hiện một dự án mới với anh Yamaguchi từ bộ phận bán hàng là trưởng nhóm."
      }
    ]
  },
  {
    "id": "ja-g-n2-98-ka-to-iu-to",
    "language": "ja",
    "level": "N2",
    "pattern": "〜かというと (ka to iu to)",
    "meaning": "nếu bạn hỏi có (thực ra là không); lý do tại sao... là",
    "formula": "Động từ thể thông thường (V thường) / Tính từ đuôi い (A-i) / Tính từ đuôi な (A-na) / Danh từ (N) + かというと / Từ để hỏi + … + かというと",
    "note": "Với từ để hỏi (なぜ, どうして) nó đưa ra lời giải thích. Không có ai, nó chỉ đặt ra một câu hỏi để phủ nhận giả định dễ dàng (〜かというと、そうではない). Ngoài ra 〜かといえば.",
    "examples": [
      {
        "text": "高[たか]い料理[りょうり]ならおいしいかというと、必[かなら]ずしもそうではない。",
        "furigana": "高[たか]い料理[りょうり]ならおいしいかというと、必[かなら]ずしもそうではない。",
        "reading": "takairyourinaraoishiikatoiuto、kanarazushimosoudehanai。",
        "translation": "Đồ ăn đắt tiền chưa chắc đã ngon."
      },
      {
        "text": "なぜこの仕事[しごと]を選[えら]んだかというと、人[ひと]の役[やく]に立[た]ちたかったからです。",
        "furigana": "なぜこの仕事[しごと]を選[えら]んだかというと、人[ひと]の役[やく]に立[た]ちたかったからです。",
        "reading": "nazekonoshigotooerandakatoiuto、hitonoyakunitachitakattakaradesu。",
        "translation": "Lý do tôi chọn công việc này là vì tôi muốn giúp đỡ mọi người."
      },
      {
        "text": "では、彼[かれ]の意見[いけん]に全面[ぜんめん]的[てき]に賛成[さんせい]かというと、そういうわけでもない。",
        "furigana": "では、彼[かれ]の意見[いけん]に全面[ぜんめん]的[てき]に賛成[さんせい]かというと、そういうわけでもない。",
        "reading": "deha、karenoikennizenmentekinisanseikatoiuto、souiuwakedemonai。",
        "translation": "À, điều đó không có nghĩa là tôi hoàn toàn đồng ý với ý kiến ​​của anh ấy."
      }
    ]
  },
  {
    "id": "ja-g-n2-99-ka-to-omottara-ka-to-omou-to",
    "language": "ja",
    "level": "N2",
    "pattern": "〜かと思ったら / 〜かと思うと (ka to omottara / ka to omou to)",
    "meaning": "chỉ khi nào; không sớm hơn; khoảnh khắc",
    "formula": "Động từ thể た (V-ta) + かと思ったら / Động từ thể た (V-ta) + かと思うと",
    "note": "B đi theo A ngay lập tức và bất ngờ. Nó mô tả những gì người nói quan sát được, vì vậy nó không được sử dụng cho hành động của chính người nói.",
    "examples": [
      {
        "text": "空[そら]が急[きゅう]に暗[くら]くなったかと思[おも]ったら、激[はげ]しい雨[あめ]が降[ふ]り出[だ]した。",
        "furigana": "空[そら]が急[きゅう]に暗[くら]くなったかと思[おも]ったら、激[はげ]しい雨[あめ]が降[ふ]り出[だ]した。",
        "reading": "soragakyuunikurakunattakatoomottara、hageshiiamegafuridashita。",
        "translation": "Bầu trời đột nhiên tối sầm lại, sau đó bắt đầu mưa to."
      },
      {
        "text": "息子[むすこ]は帰[かえ]ってきたかと思[おも]うと、すぐにまた遊[あそ]びに出[で]かけた。",
        "furigana": "息子[むすこ]は帰[かえ]ってきたかと思[おも]うと、すぐにまた遊[あそ]びに出[で]かけた。",
        "reading": "musukohakaettekitakatoomouto、sugunimataasobinidekaketa。",
        "translation": "Vừa nghĩ con trai đã về đến nhà, nó lại ra ngoài chơi."
      },
      {
        "text": "やっと静[しず]かになったかと思[おも]ったら、また隣[となり]の工事[こうじ]が始[はじ]まった。",
        "furigana": "やっと静[しず]かになったかと思[おも]ったら、また隣[となり]の工事[こうじ]が始[はじ]まった。",
        "reading": "yattoshizukaninattakatoomottara、matatonarinokoujigahajimatta。",
        "translation": "Ngay khi tôi tưởng mọi chuyện cuối cùng đã yên tĩnh lại thì công việc xây dựng nhà bên cạnh lại bắt đầu."
      }
    ]
  },
  {
    "id": "ja-g-n2-100-ka-nai-ka-no-uchi-ni",
    "language": "ja",
    "level": "N2",
    "pattern": "〜か〜ないかのうちに (ka ... nai ka no uchi ni)",
    "meaning": "một lần; hầu như không ... khi",
    "formula": "Động từ thể từ điển (V-dict) + か + Động từ thể ない (V-nai) + かのうちに / Động từ thể た (V-ta) + か + Động từ thể ない (V-nai) + かのうちに",
    "note": "Động từ tương tự được lặp lại ở dạng tích cực và tiêu cực: không rõ liệu A có hoàn thành trước khi B xảy ra hay không. Mô tả các sự kiện được quan sát.",
    "examples": [
      {
        "text": "ベルが鳴[な]るか鳴[な]らないかのうちに、生徒[せいと]たちは教室[きょうしつ]を飛[と]び出[だ]した。",
        "furigana": "ベルが鳴[な]るか鳴[な]らないかのうちに、生徒[せいと]たちは教室[きょうしつ]を飛[と]び出[だ]した。",
        "reading": "ベルganarukanaranaikanouchini、seitotachihakyoushitsuotobidashita。",
        "translation": "Học sinh có chạy ra khỏi lớp trước khi chuông reo hay không."
      },
      {
        "text": "彼[かれ]は布団[ふとん]に入[はい]ったか入[はい]らないかのうちに、いびきをかき始[はじ]めた。",
        "furigana": "彼[かれ]は布団[ふとん]に入[はい]ったか入[はい]らないかのうちに、いびきをかき始[はじ]めた。",
        "reading": "karehafutonnihaittakahairanaikanouchini、ibikiokakihajimeta。",
        "translation": "Anh ấy bắt đầu ngáy khi đang đắp chăn."
      }
    ]
  },
  {
    "id": "ja-g-n2-101-kiri",
    "language": "ja",
    "level": "N2",
    "pattern": "〜きり (kiri)",
    "meaning": "kể từ (và không có gì sau đó); chỉ một; chỉ",
    "formula": "Động từ thể た (V-ta) + きり / Danh từ (N) + きり",
    "note": "Động từ-ta + きり: điều gì đó đã xảy ra và điều tiếp theo được mong đợi không bao giờ đến (thường đi kèm với ない). Danh từ + きり: 'chỉ' (一度きり, 二人きり). Bình thường: 〜っきり.",
    "examples": [
      {
        "text": "兄[あに]は十[じゅう]年[ねん]前[まえ]に家[いえ]を出[で]たきり、一[いち]度[ど]も連絡[れんらく]をよこさない。",
        "furigana": "兄[あに]は十[じゅう]年[ねん]前[まえ]に家[いえ]を出[で]たきり、一[いち]度[ど]も連絡[れんらく]をよこさない。",
        "reading": "anihajuunenmaeniieodetakiri、ichidomorenrakuoyokosanai。",
        "translation": "Anh trai tôi đã bỏ nhà đi mười năm rồi và chưa bao giờ liên lạc với tôi."
      },
      {
        "text": "今度[こんど]の休[やす]みは、久[ひさ]しぶりに二人[ふたり]きりで旅行[りょこう]したい。",
        "furigana": "今度[こんど]の休[やす]みは、久[ひさ]しぶりに二人[ふたり]きりで旅行[りょこう]したい。",
        "reading": "kondonoyasumiha、hisashiburinifutarikirideryokoushitai。",
        "translation": "Trong kỳ nghỉ tiếp theo, lần đầu tiên tôi muốn đi du lịch một mình."
      },
      {
        "text": "チャンスは一[いち]度[ど]きりだから、絶対[ぜったい]に失敗[しっぱい]できない。",
        "furigana": "チャンスは一[いち]度[ど]きりだから、絶対[ぜったい]に失敗[しっぱい]できない。",
        "reading": "チャンスhaichidokiridakara、zettainishippaidekinai。",
        "translation": "Bạn chỉ có một cơ hội, vì vậy bạn không thể thất bại."
      }
    ]
  },
  {
    "id": "ja-g-n2-102-ge",
    "language": "ja",
    "level": "N2",
    "pattern": "〜げ (ge)",
    "meaning": "; nhìn (như thể); với bầu không khí",
    "formula": "Tính từ đuôi い (A-i) stem + げ / Tính từ đuôi な (A-na) + げ / Động từ thể ます bỏ ます (V-masu) + たげ",
    "note": "Mô tả cảm giác hiện rõ trên khuôn mặt hoặc thái độ của ai đó; liên hợp giống như tính từ na (〜げな, 〜げに). Đúng hơn là văn học.",
    "examples": [
      {
        "text": "彼女[かのじょ]は窓[まど]の外[そと]を寂[さび]しげに見[み]つめていた。",
        "furigana": "彼女[かのじょ]は窓[まど]の外[そと]を寂[さび]しげに見[み]つめていた。",
        "reading": "kanojohamadonosotoosabishigenimitsumeteita。",
        "translation": "Cô đau khổ nhìn ra ngoài cửa sổ."
      },
      {
        "text": "少年[しょうねん]は得意[とくい]げな顔[かお]で、描[えが]いた絵[え]を見[み]せてくれた。",
        "furigana": "少年[しょうねん]は得意[とくい]げな顔[かお]で、描[えが]いた絵[え]を見[み]せてくれた。",
        "reading": "shounenhatokuigenakaode、egaitaeomisetekureta。",
        "translation": "Cậu bé cho tôi xem bức tranh cậu đã vẽ với vẻ mặt đầy tự hào."
      },
      {
        "text": "何[なに]か言[い]いたげな様子[ようす]だったが、彼[かれ]は黙[だま]って帰[かえ]っていった。",
        "furigana": "何[なに]か言[い]いたげな様子[ようす]だったが、彼[かれ]は黙[だま]って帰[かえ]っていった。",
        "reading": "nanikaiitagenayousudattaga、karehadamattekaetteitta。",
        "translation": "Anh ấy trông như muốn nói điều gì đó nhưng lại bỏ đi mà không nói gì."
      }
    ]
  },
  {
    "id": "ja-g-n2-103-kko-nai",
    "language": "ja",
    "level": "N2",
    "pattern": "〜っこない (kko nai)",
    "meaning": "không đời nào; hoàn toàn không có cơ hội",
    "formula": "Động từ thể ます bỏ ます (V-masu) + っこない",
    "note": "Chỉ lời nói thông thường; thường đi kèm với động từ tiềm năng (できっこない, 分かりっこない). Một cách thông thường tương đương với 〜わけがない.",
    "examples": [
      {
        "text": "こんな量[りょう]の仕事[しごと]、一[いち]日[にち]で終[お]わりっこないよ。",
        "furigana": "こんな量[りょう]の仕事[しごと]、一[いち]日[にち]で終[お]わりっこないよ。",
        "reading": "konnaryounoshigoto、ichinichideowarikkonaiyo。",
        "translation": "Khối lượng công việc này không thể hoàn thành trong một ngày được."
      },
      {
        "text": "宝[たから]くじなんて当[あ]たりっこないと思[おも]いながら、毎年[まいとし]買[か]っている。",
        "furigana": "宝[たから]くじなんて当[あ]たりっこないと思[おも]いながら、毎年[まいとし]買[か]っている。",
        "reading": "takarakujinanteatarikkonaitoomoinagara、maitoshikatteiru。",
        "translation": "Năm nào tôi cũng mua vé số, cứ tưởng mình sẽ không bao giờ trúng."
      }
    ]
  },
  {
    "id": "ja-g-n2-104-dokoro-ka",
    "language": "ja",
    "level": "N2",
    "pattern": "〜どころか (dokoro ka)",
    "meaning": "xa; huống chi ; ngược lại",
    "formula": "Động từ thể thông thường (V thường) / Tính từ đuôi い (A-i) / Tính từ đuôi な (A-na) / Danh từ (N) + どころか",
    "note": "Hoặc thực tế đối lập với A, hoặc thậm chí không thể có thứ gì nhỏ hơn A (AどころかBも〜ない).",
    "examples": [
      {
        "text": "薬[くすり]を飲[の]んだが、熱[ねつ]は下[さ]がるどころか、ますます高[たか]くなった。",
        "furigana": "薬[くすり]を飲[の]んだが、熱[ねつ]は下[さ]がるどころか、ますます高[たか]くなった。",
        "reading": "kusurionondaga、netsuhasagarudokoroka、masumasutakakunatta。",
        "translation": "Mình đã uống thuốc nhưng thay vì hạ sốt thì lại sốt cao hơn."
      },
      {
        "text": "忙[いそが]しくて、旅行[りょこう]どころか週末[しゅうまつ]に休[やす]むこともできない。",
        "furigana": "忙[いそが]しくて、旅行[りょこう]どころか週末[しゅうまつ]に休[やす]むこともできない。",
        "reading": "isogashikute、ryokoudokorokashuumatsuniyasumukotomodekinai。",
        "translation": "Tôi bận đến mức không thể nghỉ một ngày cuối tuần chứ đừng nói đến việc đi du lịch."
      },
      {
        "text": "彼[かれ]は謝[あやま]るどころか、逆[ぎゃく]に私[わたし]を責[せ]めてきた。",
        "furigana": "彼[かれ]は謝[あやま]るどころか、逆[ぎゃく]に私[わたし]を責[せ]めてきた。",
        "reading": "karehaayamarudokoroka、gyakuniwatashiosemetekita。",
        "translation": "Thay vì xin lỗi, anh ấy lại đổ lỗi cho tôi."
      }
    ]
  },
  {
    "id": "ja-g-n2-105-dokoro-de-wa-nai",
    "language": "ja",
    "level": "N2",
    "pattern": "〜どころではない (dokoro de wa nai)",
    "meaning": "đây không phải là lúc dành cho; không còn nghi ngờ gì nữa",
    "formula": "Động từ thể từ điển (V-dict) / Danh từ (N) + どころではない",
    "note": "Hoàn cảnh khiến A không thể hoặc không thể tưởng tượng được vào lúc này. Bình thường: 〜どころじゃない.",
    "examples": [
      {
        "text": "来週[らいしゅう]は試験[しけん]なので、遊[あそ]びに行[い]くどころではない。",
        "furigana": "来週[らいしゅう]は試験[しけん]なので、遊[あそ]びに行[い]くどころではない。",
        "reading": "raishuuhashikennanode、asobiniikudokorodehanai。",
        "translation": "Tuần sau em thi rồi nên không thể ra ngoài chơi cho vui được."
      },
      {
        "text": "引[ひ]っ越[こ]しの準備[じゅんび]に追[お]われて、花見[はなみ]どころではなかった。",
        "furigana": "引[ひ]っ越[こ]しの準備[じゅんび]に追[お]われて、花見[はなみ]どころではなかった。",
        "reading": "hikkoshinojunbiniowarete、hanamidokorodehanakatta。",
        "translation": "Mình không ngắm hoa được vì bận chuẩn bị chuyển nhà."
      }
    ]
  },
  {
    "id": "ja-g-n2-106-to-wa-kagiranai",
    "language": "ja",
    "level": "N2",
    "pattern": "〜とは限らない (to wa kagiranai)",
    "meaning": "không nhất thiết; không phải lúc nào cũng nên",
    "formula": "Động từ thể thông thường (V thường) / Tính từ đuôi い (A-i) / Tính từ đuôi な (A-na) / Danh từ (N) + とは限らない",
    "note": "Phủ nhận rằng điều gì đó luôn đúng; thường đi kèm với 必ずしも hoặc 〜からといって.",
    "examples": [
      {
        "text": "値段[ねだん]が高[たか]いからといって、品質[ひんしつ]がいいとは限[かぎ]らない。",
        "furigana": "値段[ねだん]が高[たか]いからといって、品質[ひんしつ]がいいとは限[かぎ]らない。",
        "reading": "nedangatakaikaratoitte、hinshitsugaiitohakagiranai。",
        "translation": "Thứ gì đó đắt tiền không nhất thiết có nghĩa là nó có chất lượng tốt."
      },
      {
        "text": "専門[せんもん]家[か]の意見[いけん]がいつも正[ただ]しいとは限[かぎ]らない。",
        "furigana": "専門[せんもん]家[か]の意見[いけん]がいつも正[ただ]しいとは限[かぎ]らない。",
        "reading": "senmonkanoikengaitsumotadashiitohakagiranai。",
        "translation": "Ý kiến ​​của các chuyên gia không phải lúc nào cũng đúng."
      }
    ]
  },
  {
    "id": "ja-g-n2-107-to-iu-mono-da",
    "language": "ja",
    "level": "N2",
    "pattern": "〜というものだ (to iu mono da)",
    "meaning": "đó chính là (A); nó vốn là vậy đó; đó thực sự là câu hỏi được nhúng",
    "formula": "Động từ thể thông thường (V thường) / Tính từ đuôi い (A-i) / Tính từ đuôi な (A-na) / Danh từ (N) + というものだ",
    "note": "Một quan điểm chắc chắn về cái gì đó thực sự là gì hoặc mọi thứ diễn ra một cách tự nhiên như thế nào. Thường dùng để chỉ trích một thái độ.",
    "examples": [
      {
        "text": "困[こま]っている人[ひと]がいたら助[たす]ける。それが人情[にんじょう]というものだ。",
        "furigana": "困[こま]っている人[ひと]がいたら助[たす]ける。それが人情[にんじょう]というものだ。",
        "reading": "komatteiruhitogaitaratasukeru。soreganinjoutoiumonoda。",
        "translation": "Nếu ai đó gặp khó khăn, hãy giúp đỡ họ. Đó là nhân loại."
      },
      {
        "text": "何[なん]の準備[じゅんび]もせずに合格[ごうかく]しようなんて、虫[むし]がよすぎるというものだ。",
        "furigana": "何[なん]の準備[じゅんび]もせずに合格[ごうかく]しようなんて、虫[むし]がよすぎるというものだ。",
        "reading": "nannojunbimosezunigoukakushiyounante、mushigayosugirutoiumonoda。",
        "translation": "Sẽ là quá ngu ngốc nếu cố gắng vượt qua kỳ thi mà không có sự chuẩn bị gì."
      },
      {
        "text": "一人[ひとり]で全部[ぜんぶ]やろうとするのは無理[むり]というものだ。",
        "furigana": "一人[ひとり]で全部[ぜんぶ]やろうとするのは無理[むり]というものだ。",
        "reading": "hitoridezenbuyaroutosurunohamuritoiumonoda。",
        "translation": "Không thể tự mình cố gắng làm mọi việc."
      }
    ]
  },
  {
    "id": "ja-g-n2-108-to-iu-mono-de-wa-nai",
    "language": "ja",
    "level": "N2",
    "pattern": "〜というものではない (to iu mono de wa nai)",
    "meaning": "(nhất thiết) không phải như vậy; nó không tuân theo điều đó",
    "formula": "Động từ thể thông thường (V thường) / Tính từ đuôi い (A-i) / Tính từ đuôi な (A-na) / Danh từ (N) + というものではない",
    "note": "Từ chối một niềm tin đơn giản hóa quá mức; thường đi kèm với 〜ばいい hoặc 〜さえ〜ば. 〜というものでもない là một biến thể nhẹ nhàng hơn.",
    "examples": [
      {
        "text": "練習[れんしゅう]は長[なが]くやればいいというものではない。",
        "furigana": "練習[れんしゅう]は長[なが]くやればいいというものではない。",
        "reading": "renshuuhanagakuyarebaiitoiumonodehanai。",
        "translation": "Thực hành không cần phải lâu."
      },
      {
        "text": "お金[かね]さえあれば幸[しあわ]せになれるというものではない。",
        "furigana": "お金[かね]さえあれば幸[しあわ]せになれるというものではない。",
        "reading": "okanesaearebashiawaseninarerutoiumonodehanai。",
        "translation": "Tiền không làm bạn hạnh phúc."
      }
    ]
  },
  {
    "id": "ja-g-n2-109-to-itte-mo",
    "language": "ja",
    "level": "N2",
    "pattern": "〜といっても (to itte mo)",
    "meaning": "mặc dù tôi nói; mặc dù (nó được gọi là)",
    "formula": "Động từ thể thông thường (V thường) / Tính từ đuôi い (A-i) / Tính từ đuôi な (A-na) / Danh từ (N) + といっても",
    "note": "Sửa hoặc giới hạn những gì người nghe có thể thừa nhận từ câu nói đầu tiên. Thường theo sau là たった, ただ hoặc 〜しか〜ない.",
    "examples": [
      {
        "text": "料理[りょうり]ができるといっても、簡単[かんたん]なものしか作[つく]れません。",
        "furigana": "料理[りょうり]ができるといっても、簡単[かんたん]なものしか作[つく]れません。",
        "reading": "ryourigadekirutoittemo、kantannamonoshikatsukuremasen。",
        "translation": "Dù tôi có thể nấu ăn nhưng tôi chỉ có thể làm những món đơn giản."
      },
      {
        "text": "海外[かいがい]に住[す]んでいたといっても、たった半年[はんとし]のことだ。",
        "furigana": "海外[かいがい]に住[す]んでいたといっても、たった半年[はんとし]のことだ。",
        "reading": "kaigainisundeitatoittemo、tattahantoshinokotoda。",
        "translation": "Dù tôi sống ở nước ngoài nhưng cũng chỉ được nửa năm thôi."
      }
    ]
  },
  {
    "id": "ja-g-n2-110-to-ieba-to-iu-to",
    "language": "ja",
    "level": "N2",
    "pattern": "〜といえば / 〜というと (to ieba / to iu to)",
    "meaning": "nói đến; khi bạn nghĩ đến; nếu bạn đề cập đến",
    "formula": "Danh từ (N) + といえば / Danh từ (N) + というと",
    "note": "Giới thiệu điều gì đó liên quan chặt chẽ đến một chủ đề hoặc chọn một từ vừa được đề cập để chuyển cuộc trò chuyện. 〜といったら là một biến thể giàu cảm xúc hơn.",
    "examples": [
      {
        "text": "日本[にほん]の夏[なつ]の風物詩[ふうぶつし]といえば、やはり花火[はなび]大会[たいかい]だろう。",
        "furigana": "日本[にほん]の夏[なつ]の風物詩[ふうぶつし]といえば、やはり花火[はなび]大会[たいかい]だろう。",
        "reading": "nihonnonatsunofuubutsushitoieba、yaharihanabitaikaidarou。",
        "translation": "Khi nhắc đến truyền thống mùa hè của Nhật Bản thì chắc chắn đó là màn bắn pháo hoa."
      },
      {
        "text": "北海道[ほっかいどう]というと、広[ひろ]い大地[だいち]とおいしい海産物[かいさんぶつ]を思[おも]い浮[う]かべる人[ひと]が多[おお]い。",
        "furigana": "北海道[ほっかいどう]というと、広[ひろ]い大地[だいち]とおいしい海産物[かいさんぶつ]を思[おも]い浮[う]かべる人[ひと]が多[おお]い。",
        "reading": "hokkaidoutoiuto、hiroidaichitooishiikaisanbutsuoomoiukaberuhitogaooi。",
        "translation": "Khi nhắc đến Hokkaido, nhiều người nghĩ đến vùng đất rộng lớn và hải sản thơm ngon."
      },
      {
        "text": "旅行[りょこう]といえば、来月[らいげつ]の出張[しゅっちょう]の件[けん]はどうなりましたか。",
        "furigana": "旅行[りょこう]といえば、来月[らいげつ]の出張[しゅっちょう]の件[けん]はどうなりましたか。",
        "reading": "ryokoutoieba、raigetsunoshucchounokenhadounarimashitaka。",
        "translation": "Nhắc đến du lịch, chuyến công tác tháng sau của bạn thế nào?"
      }
    ]
  },
  {
    "id": "ja-g-n2-111-hoka-nai",
    "language": "ja",
    "level": "N2",
    "pattern": "〜ほかない (hoka nai)",
    "meaning": "không có lựa chọn nào khác ngoài; không có gì để làm ngoại trừ",
    "formula": "Động từ thể từ điển (V-dict) + ほかない / Động từ thể từ điển (V-dict) + よりほかない",
    "note": "Tương đương một cách trang trọng với 〜しかない (N3). Các biến thể: 〜ほかはない, 〜よりほかない, 〜ほかしかたがない.",
    "examples": [
      {
        "text": "終電[しゅうでん]を逃[のが]してしまったので、タクシーで帰[かえ]るほかない。",
        "furigana": "終電[しゅうでん]を逃[のが]してしまったので、タクシーで帰[かえ]るほかない。",
        "reading": "shuudenonogashiteshimattanode、タクシーdekaeruhokanai。",
        "translation": "Tôi bị lỡ chuyến tàu cuối cùng nên không còn cách nào khác là bắt taxi về nhà."
      },
      {
        "text": "自分[じぶん]で決[き]めた道[みち]なのだから、前[まえ]に進[すす]むよりほかない。",
        "furigana": "自分[じぶん]で決[き]めた道[みち]なのだから、前[まえ]に進[すす]むよりほかない。",
        "reading": "jibundekimetamichinanodakara、maenisusumuyorihokanai。",
        "translation": "Vì đây là con đường tôi đã chọn cho mình nên tôi không còn cách nào khác là phải tiến về phía trước."
      }
    ]
  },
  {
    "id": "ja-g-n2-112-mai",
    "language": "ja",
    "level": "N2",
    "pattern": "〜まい (mai)",
    "meaning": "sẽ không (giải quyết); có lẽ sẽ không (phỏng đoán)",
    "formula": "Động từ thể từ điển (V-dict) + まい / Động từ thể ます bỏ ます (V-masu) (ichidan verbs) + まい",
    "note": "Viết/chính thức. Ngôi thứ nhất: kiên quyết không làm (〜ないつもりだ). Khác: đoán tiêu cực (〜ないだろう). する → するまい / すまい. Thường là 〜まいと思う / 〜まいと決心する.",
    "examples": [
      {
        "text": "あんな恥[は]ずかしい思[おも]いは、二度[にど]とするまいと心[こころ]に誓[ちか]った。",
        "furigana": "あんな恥[は]ずかしい思[おも]いは、二度[にど]とするまいと心[こころ]に誓[ちか]った。",
        "reading": "annahazukashiiomoiha、nidotosurumaitokokoronichikatta。",
        "translation": "Tôi đã thề với bản thân rằng sẽ không bao giờ gặp phải trải nghiệm đáng xấu hổ như vậy nữa."
      },
      {
        "text": "この大雨[おおあめ]では、今日[きょう]はもう誰[だれ]も来[く]るまい。",
        "furigana": "この大雨[おおあめ]では、今日[きょう]はもう誰[だれ]も来[く]るまい。",
        "reading": "konoooamedeha、kyouhamoudaremokurumai。",
        "translation": "Với cơn mưa lớn này thì hôm nay sẽ không có ai đến."
      }
    ]
  },
  {
    "id": "ja-g-n2-113-you-de-wa-nai-ka",
    "language": "ja",
    "level": "N2",
    "pattern": "〜（よ）うではないか (you de wa nai ka)",
    "meaning": "hãy (lời kêu gọi hành động chính thức); tại sao chúng ta không",
    "formula": "Động từ thể ý chí (V-ý chí) + ではないか / Động từ thể ý chí (V-ý chí) + ではありませんか",
    "note": "Lời kêu gọi mạnh mẽ, trang trọng đối với một nhóm, điển hình trong các bài phát biểu và bài xã luận. Phiên bản thông thường là 〜(よ)うじゃないか.",
    "examples": [
      {
        "text": "この町[まち]の未来[みらい]のために、皆[みな]で力[ちから]を合[あ]わせようではないか。",
        "furigana": "この町[まち]の未来[みらい]のために、皆[みな]で力[ちから]を合[あ]わせようではないか。",
        "reading": "konomachinomirainotameni、minadechikaraoawaseyoudehanaika。",
        "translation": "Tất cả chúng ta hãy cùng nhau nỗ lực vì tương lai của thị trấn này."
      },
      {
        "text": "失敗[しっぱい]を恐[おそ]れず、新[あたら]しいことに挑戦[ちょうせん]してみようではありませんか。",
        "furigana": "失敗[しっぱい]を恐[おそ]れず、新[あたら]しいことに挑戦[ちょうせん]してみようではありませんか。",
        "reading": "shippaioosorezu、atarashiikotonichousenshitemiyoudehaarimasenka。",
        "translation": "Hãy thử những điều mới mà không sợ thất bại."
      }
    ]
  },
  {
    "id": "ja-g-n2-114-mo-kamawazu",
    "language": "ja",
    "level": "N2",
    "pattern": "〜もかまわず (mo kamawazu)",
    "meaning": "mà không quan tâm; bất kể ; không để ý đến",
    "formula": "Danh từ (N) + もかまわず / Động từ thể thông thường (V thường) + の + もかまわず",
    "note": "Làm việc gì đó mà không quan tâm đến điều mọi người thường quan tâm (人目, 周囲, 雨). Thường hàm ý không tán thành.",
    "examples": [
      {
        "text": "彼女[かのじょ]は人目[ひとめ]もかまわず、駅[えき]のホームで大声[おおごえ]で泣[な]いた。",
        "furigana": "彼女[かのじょ]は人目[ひとめ]もかまわず、駅[えき]のホームで大声[おおごえ]で泣[な]いた。",
        "reading": "kanojohahitomemokamawazu、ekinoホームdeoogoedenaita。",
        "translation": "Cô ấy khóc rất to trên sân ga mà không lo người khác nhìn thấy mình."
      },
      {
        "text": "服[ふく]が汚[よご]れるのもかまわず、子[こ]どもたちは泥[どろ]の中[なか]で遊[あそ]び続[つづ]けた。",
        "furigana": "服[ふく]が汚[よご]れるのもかまわず、子[こ]どもたちは泥[どろ]の中[なか]で遊[あそ]び続[つづ]けた。",
        "reading": "fukugayogorerunomokamawazu、kodomotachihadorononakadeasobitsuzuketa。",
        "translation": "Bọn trẻ vẫn tiếp tục chơi đùa trong bùn, không quan tâm đến việc quần áo chúng bị bẩn."
      }
    ]
  },
  {
    "id": "ja-g-n2-115-jou",
    "language": "ja",
    "level": "N2",
    "pattern": "〜上 (jou)",
    "meaning": "theo quan điểm của; về mặt ; vì lý do",
    "formula": "Danh từ (N) + 上 / Danh từ (N) + 上の + Danh từ (N)",
    "note": "Gắn với các danh từ Hán-Nhật (歴史上, 経験上, 健康上, 表面上). Đọc じょう, không phải うえ.",
    "examples": [
      {
        "text": "この映画[えいが]には、教育[きょういく]上[じょう]好[この]ましくない場面[ばめん]が多[おお]い。",
        "furigana": "この映画[えいが]には、教育[きょういく]上[じょう]好[この]ましくない場面[ばめん]が多[おお]い。",
        "reading": "konoeiganiha、kyouikujoukonomashikunaibamengaooi。",
        "translation": "Phim này có nhiều cảnh phản cảm về mặt giáo dục."
      },
      {
        "text": "安全[あんぜん]上[じょう]の理由[りゆう]から、この先[さき]には立[た]ち入[い]らないでください。",
        "furigana": "安全[あんぜん]上[じょう]の理由[りゆう]から、この先[さき]には立[た]ち入[い]らないでください。",
        "reading": "anzenjounoriyuukara、konosakinihatachiiranaidekudasai。",
        "translation": "Vì lý do an toàn, vui lòng không vượt quá điểm này."
      },
      {
        "text": "法律[ほうりつ]上[じょう]は問題[もんだい]がなくても、道徳[どうとく]的[てき]に許[ゆる]されないこともある。",
        "furigana": "法律[ほうりつ]上[じょう]は問題[もんだい]がなくても、道徳[どうとく]的[てき]に許[ゆる]されないこともある。",
        "reading": "houritsujouhamondaiganakutemo、doutokutekiniyurusarenaikotomoaru。",
        "translation": "Ngay cả khi không có vấn đề gì về mặt pháp lý, nó có thể không được chấp nhận về mặt đạo đức."
      }
    ]
  },
  {
    "id": "ja-g-n2-116-osore-ga-aru",
    "language": "ja",
    "level": "N2",
    "pattern": "〜おそれがある (osore ga aru)",
    "meaning": "có nguy cơ đó; có thể (kết quả xấu)",
    "formula": "Động từ thể từ điển (V-dict) + おそれがある / Danh từ (N) + の + おそれがある",
    "note": "Đối với những khả năng không mong muốn; điển hình của tin tức, báo cáo thời tiết và cảnh báo chính thức. Cũng được viết là 〜恐れがある. 〜かねない nghe giống sự đánh giá của chính người nói hơn.",
    "examples": [
      {
        "text": "台風[たいふう]の影響[えいきょう]で、今夜[こんや]から大雨[おおあめ]になるおそれがあります。",
        "furigana": "台風[たいふう]の影響[えいきょう]で、今夜[こんや]から大雨[おおあめ]になるおそれがあります。",
        "reading": "taifuunoeikyoude、konyakaraooameninaruosoregaarimasu。",
        "translation": "Có nguy cơ sẽ có mưa lớn bắt đầu từ tối nay do bão."
      },
      {
        "text": "この薬[くすり]は眠[ねむ]くなるおそれがあるので、服用[ふくよう]後[ご]の運転[うんてん]は避[さ]けてください。",
        "furigana": "この薬[くすり]は眠[ねむ]くなるおそれがあるので、服用[ふくよう]後[ご]の運転[うんてん]は避[さ]けてください。",
        "reading": "konokusurihanemukunaruosoregaarunode、fukuyougonountenhasaketekudasai。",
        "translation": "Thuốc này có thể gây buồn ngủ, nên tránh lái xe sau khi uống."
      },
      {
        "text": "沿岸[えんがん]部[ぶ]には津波[つなみ]のおそれがあるため、避難[ひなん]指示[しじ]が出[だ]された。",
        "furigana": "沿岸[えんがん]部[ぶ]には津波[つなみ]のおそれがあるため、避難[ひなん]指示[しじ]が出[だ]された。",
        "reading": "enganbunihatsunaminoosoregaarutame、hinanshijigadasareta。",
        "translation": "Lệnh sơ tán đã được ban hành đối với các khu vực ven biển do nguy cơ xảy ra sóng thần."
      }
    ]
  },
  {
    "id": "ja-g-n2-117-sei-ka",
    "language": "ja",
    "level": "N2",
    "pattern": "〜せいか (sei ka)",
    "meaning": "có lẽ vì; có thể do",
    "formula": "Động từ thể thông thường (V thường) / Tính từ đuôi い (A-i) / Tính từ đuôi な (A-na) + な / Danh từ (N) + の + せいか",
    "note": "Người nói không chắc chắn về nguyên nhân. Chủ yếu là cho kết quả xấu hoặc trung tính; để có kết quả tốt, おかげか cũng được sử dụng.",
    "examples": [
      {
        "text": "年[とし]のせいか、最近[さいきん]疲[つか]れが取[と]れにくくなった。",
        "furigana": "年[とし]のせいか、最近[さいきん]疲[つか]れが取[と]れにくくなった。",
        "reading": "toshinoseika、saikintsukaregatorenikukunatta。",
        "translation": "Có lẽ là do tuổi tác của tôi, nhưng gần đây thật khó để thoát khỏi sự mệt mỏi của tôi."
      },
      {
        "text": "昨夜[さくや]遅[おそ]くまで起[お]きていたせいか、今日[きょう]は頭[あたま]がぼんやりしている。",
        "furigana": "昨夜[さくや]遅[おそ]くまで起[お]きていたせいか、今日[きょう]は頭[あたま]がぼんやりしている。",
        "reading": "sakuyaosokumadeokiteitaseika、kyouhaatamagabonyarishiteiru。",
        "translation": "Hôm nay đầu óc tôi có sương mù, chắc là do tối qua thức khuya."
      },
      {
        "text": "気[き]のせいか、彼女[かのじょ]は少[すこ]し元気[げんき]がないように見[み]えた。",
        "furigana": "気[き]のせいか、彼女[かのじょ]は少[すこ]し元気[げんき]がないように見[み]えた。",
        "reading": "kinoseika、kanojohasukoshigenkiganaiyounimieta。",
        "translation": "Có lẽ đó chỉ là tôi tưởng tượng thôi, nhưng cô ấy có vẻ hơi thờ ơ."
      }
    ]
  },
  {
    "id": "ja-g-n2-118-dake-atte-dake-ni",
    "language": "ja",
    "level": "N2",
    "pattern": "〜だけあって / 〜だけに (dake atte / dake ni)",
    "meaning": "như mong đợi (vì); chính xác là vì; hơn thế nữa vì",
    "formula": "Động từ thể thông thường (V thường) / Tính từ đuôi い (A-i) / Tính từ đuôi な (A-na) + な / Danh từ (N) + だけあって・だけに",
    "note": "だけあって khen ngợi một kết quả phù hợp với mong đợi (thường đi kèm với さすが). だけに còn có nghĩa là 'thêm vì' và có thể dẫn đến những kết quả tiêu cực.",
    "examples": [
      {
        "text": "さすが一流[いちりゅう]ホテルだけあって、サービスが行[い]き届[とど]いている。",
        "furigana": "さすが一流[いちりゅう]ホテルだけあって、サービスが行[い]き届[とど]いている。",
        "reading": "sasugaichiryuuホテルdakeatte、サービスgaikitodoiteiru。",
        "translation": "Đúng như mong đợi từ một khách sạn hạng nhất, dịch vụ rất chu đáo."
      },
      {
        "text": "十[じゅう]年[ねん]も日本[にほん]に住[す]んでいただけあって、彼[かれ]の日本語[にほんご]はとても自然[しぜん]だ。",
        "furigana": "十[じゅう]年[ねん]も日本[にほん]に住[す]んでいただけあって、彼[かれ]の日本語[にほんご]はとても自然[しぜん]だ。",
        "reading": "juunenmonihonnisundeitadakeatte、karenonihongohatotemoshizenda。",
        "translation": "Đã sống ở Nhật được mười năm nên tiếng Nhật của anh ấy rất tự nhiên."
      },
      {
        "text": "期待[きたい]していただけに、落選[らくせん]の知[し]らせはショックだった。",
        "furigana": "期待[きたい]していただけに、落選[らくせん]の知[し]らせはショックだった。",
        "reading": "kitaishiteitadakeni、rakusennoshirasehaショックdatta。",
        "translation": "Tôi đã rất mong chờ nên tin tôi bị từ chối là một cú sốc."
      }
    ]
  },
  {
    "id": "ja-g-n2-119-dake-no-koto-wa-aru",
    "language": "ja",
    "level": "N2",
    "pattern": "〜だけのことはある (dake no koto wa aru)",
    "meaning": "không có gì lạ; nó sống theo; đúng như mong đợi của",
    "formula": "Động từ thể thông thường (V thường) / Tính từ đuôi い (A-i) / Tính từ đuôi な (A-na) + な / Danh từ (N) + だけのことはある",
    "note": "Đánh giá một kết quả được chứng minh hoàn toàn bằng công sức, giá cả hoặc danh tiếng; thường đi kèm với さすが. Giống như 〜だけあって nhưng đặt ở cuối câu.",
    "examples": [
      {
        "text": "この料理[りょうり]は本当[ほんとう]においしい。人気[にんき]店[てん]だけのことはある。",
        "furigana": "この料理[りょうり]は本当[ほんとう]においしい。人気[にんき]店[てん]だけのことはある。",
        "reading": "konoryourihahontounioishii。ninkitendakenokotohaaru。",
        "translation": "Món này ngon thật. Có một số thứ chỉ có ở các cửa hàng bình dân."
      },
      {
        "text": "素晴[すば]らしい演奏[えんそう]だった。さすが毎日[まいにち]練習[れんしゅう]しているだけのことはある。",
        "furigana": "素晴[すば]らしい演奏[えんそう]だった。さすが毎日[まいにち]練習[れんしゅう]しているだけのことはある。",
        "reading": "subarashiiensoudatta。sasugamainichirenshuushiteirudakenokotohaaru。",
        "translation": "Đó là một màn trình diễn tuyệt vời. Đúng như dự đoán, vấn đề chỉ là luyện tập hàng ngày mà thôi."
      }
    ]
  },
  {
    "id": "ja-g-n2-120-tatoe-te-mo",
    "language": "ja",
    "level": "N2",
    "pattern": "たとえ〜ても (tatoe ... te mo)",
    "meaning": "ngay cả khi; bất kể",
    "formula": "たとえ + Động từ thể て (V-te) + も / たとえ + Tính từ đuôi い (A-i)-ku + ても / たとえ + Tính từ đuôi な (A-na) + でも / たとえ + Danh từ (N) + でも",
    "note": "たとえ báo hiệu trước một giả thuyết 'ngay cả khi' và củng cố nó. Một biến thể được viết nhiều hơn là たとえ〜としても.",
    "examples": [
      {
        "text": "たとえ反対[はんたい]されても、自分[じぶん]の夢[ゆめ]を諦[あきら]めるつもりはない。",
        "furigana": "たとえ反対[はんたい]されても、自分[じぶん]の夢[ゆめ]を諦[あきら]めるつもりはない。",
        "reading": "tatoehantaisaretemo、jibunnoyumeoakiramerutsumorihanai。",
        "translation": "Dù có bị phản đối thì tôi cũng không có ý định từ bỏ ước mơ của mình."
      },
      {
        "text": "たとえ小[ちい]さな会社[かいしゃ]でも、やりがいのある仕事[しごと]がしたい。",
        "furigana": "たとえ小[ちい]さな会社[かいしゃ]でも、やりがいのある仕事[しごと]がしたい。",
        "reading": "tatoechiisanakaishademo、yarigainoarushigotogashitai。",
        "translation": "Tôi muốn làm một công việc xứng đáng, dù là công ty nhỏ."
      },
      {
        "text": "たとえ給料[きゅうりょう]が安[やす]くても、好[す]きな仕事[しごと]なら続[つづ]けられる。",
        "furigana": "たとえ給料[きゅうりょう]が安[やす]くても、好[す]きな仕事[しごと]なら続[つづ]けられる。",
        "reading": "tatoekyuuryougayasukutemo、sukinashigotonaratsuzukerareru。",
        "translation": "Dù lương có thấp thì bạn vẫn có thể tiếp tục làm công việc mình thích."
      }
    ]
  },
  {
    "id": "ja-g-n2-121-yara-yara",
    "language": "ja",
    "level": "N2",
    "pattern": "〜やら〜やら (yara ... yara)",
    "meaning": "thì sao với ... và ...; và ... và (trong số những thứ khác)",
    "formula": "Danh từ (N) + やら + Danh từ (N) + やら / Động từ thể từ điển (V-dict) + やら + Động từ thể từ điển (V-dict) + やら / Tính từ đuôi い (A-i) + やら + Tính từ đuôi い (A-i) + やら",
    "note": "Liệt kê một vài ví dụ trong số rất nhiều ví dụ, thường gợi ý sự hỗn loạn hoặc cảm xúc lẫn lộn. Thường được theo sau bởi で + 大変だ / 忙しい.",
    "examples": [
      {
        "text": "引[ひ]っ越[こ]しの前[まえ]は、荷造[にづく]りやら手続[てつづ]きやらで目[め]が回[まわ]るほど忙[いそが]しかった。",
        "furigana": "引[ひ]っ越[こ]しの前[まえ]は、荷造[にづく]りやら手続[てつづ]きやらで目[め]が回[まわ]るほど忙[いそが]しかった。",
        "reading": "hikkoshinomaeha、nizukuriyaratetsuzukiyarademegamawaruhodoisogashikatta。",
        "translation": "Trước khi chuyển đi, tôi bận rộn với việc đóng gói và thủ tục đến mức chóng mặt."
      },
      {
        "text": "財布[さいふ]をなくして、情[なさ]けないやら腹[はら]が立[た]つやらで、泣[な]きたくなった。",
        "furigana": "財布[さいふ]をなくして、情[なさ]けないやら腹[はら]が立[た]つやらで、泣[な]きたくなった。",
        "reading": "saifuonakushite、nasakenaiyaraharagatatsuyarade、nakitakunatta。",
        "translation": "Tôi bị mất ví, cảm thấy thật thảm hại và tức giận đến mức muốn khóc."
      }
    ]
  },
  {
    "id": "ja-g-n2-122-zu-ni-sumu-naide-sumu",
    "language": "ja",
    "level": "N2",
    "pattern": "〜ずに済む / 〜ないで済む (zu ni sumu / naide sumu)",
    "meaning": "mà không có; không cần phải làm vậy; được tha khỏi",
    "formula": "Động từ thể ない (V-nai) stem + ずに済む / Động từ thể ない (V-nai) + で済む",
    "note": "Một cái gì đó khó chịu hoặc tốn kém hóa ra lại không cần thiết. する → せずに済む. So sánh Danh từ + で済む, 'chỉ cần ...'.",
    "examples": [
      {
        "text": "友人[ゆうじん]が車[くるま]で送[おく]ってくれたので、タクシーを使[つか]わずに済[す]んだ。",
        "furigana": "友人[ゆうじん]が車[くるま]で送[おく]ってくれたので、タクシーを使[つか]わずに済[す]んだ。",
        "reading": "yuujingakurumadeokuttekuretanode、タクシーotsukawazunisunda。",
        "translation": "Bạn tôi chở tôi đi nên tôi không phải đi taxi."
      },
      {
        "text": "早[はや]めに治療[ちりょう]を始[はじ]めたおかげで、手術[しゅじゅつ]しないで済[す]んだ。",
        "furigana": "早[はや]めに治療[ちりょう]を始[はじ]めたおかげで、手術[しゅじゅつ]しないで済[す]んだ。",
        "reading": "hayamenichiryouohajimetaokagede、shujutsushinaidesunda。",
        "translation": "Nhờ điều trị sớm nên tôi không cần phải phẫu thuật."
      }
    ]
  },
  {
    "id": "ja-g-n2-123-you-ni-yotte-wa",
    "language": "ja",
    "level": "N2",
    "pattern": "〜ようによっては (you ni yotte wa)",
    "meaning": "tùy thuộc vào cách (người ta thực hiện)",
    "formula": "Động từ thể ます bỏ ます (V-masu) + ようによっては",
    "note": "Chủ yếu với 考え, 見, 言い, 使い: kết quả thay đổi tùy theo cách thực hiện A. Thường đưa ra cách giải thích tích cực.",
    "examples": [
      {
        "text": "考[かんが]えようによっては、今回[こんかい]の失敗[しっぱい]はいい教訓[きょうくん]になったとも言[い]える。",
        "furigana": "考[かんが]えようによっては、今回[こんかい]の失敗[しっぱい]はいい教訓[きょうくん]になったとも言[い]える。",
        "reading": "kangaeyouniyotteha、konkainoshippaihaiikyoukunninattatomoieru。",
        "translation": "Tùy cách nghĩ, có thể nói rằng thất bại này đã dạy cho chúng ta một bài học hay."
      },
      {
        "text": "古[ふる]い家具[かぐ]も、使[つか]いようによってはおしゃれなインテリアになる。",
        "furigana": "古[ふる]い家具[かぐ]も、使[つか]いようによってはおしゃれなインテリアになる。",
        "reading": "furuikagumo、tsukaiyouniyottehaosharenaインテリアninaru。",
        "translation": "Đồ nội thất cũ cũng có thể trở thành một món đồ nội thất đầy phong cách tùy thuộc vào cách bạn sử dụng nó."
      }
    ]
  },
  {
    "id": "ja-g-n1-01-gatera",
    "language": "ja",
    "level": "N1",
    "pattern": "〜がてら (gatera)",
    "meaning": "while; trên đường đi; tận dụng cơ hội",
    "formula": "Động từ thể ます bỏ ます (V-masu) / Danh từ (N) + がてら",
    "note": "Một chuyến đi chơi phục vụ hai mục đích; mệnh đề chính thường là chuyển động (行く, 寄る, 歩く). So sánh 〜かたがた (trang trọng, chào hỏi và thăm hỏi) và 〜かたわら (hai hoạt động dài hạn).",
    "examples": [
      {
        "text": "散歩[さんぽ]がてら、駅前[えきまえ]の本屋[ほんや]に寄[よ]って新刊[しんかん]をのぞいてきた。",
        "furigana": "散歩[さんぽ]がてら、駅前[えきまえ]の本屋[ほんや]に寄[よ]って新刊[しんかん]をのぞいてきた。",
        "reading": "sanpogatera、ekimaenohonyaniyotteshinkanonozoitekita。",
        "translation": "Khi đang đi dạo, tôi ghé qua hiệu sách trước nhà ga và xem những cuốn sách mới."
      },
      {
        "text": "お客[きゃく]さんを駅[えき]まで送[おく]りがてら、郵便[ゆうびん]局[きょく]で小包[こづつみ]を出[だ]してきた。",
        "furigana": "お客[きゃく]さんを駅[えき]まで送[おく]りがてら、郵便[ゆうびん]局[きょく]で小包[こづつみ]を出[だ]してきた。",
        "reading": "okyakusanoekimadeokurigatera、yuubinkyokudekozutsumiodashitekita。",
        "translation": "Sau khi trả khách ở ga, tôi gửi một gói hàng ở bưu điện."
      }
    ]
  },
  {
    "id": "ja-g-n1-02-katawara",
    "language": "ja",
    "level": "N1",
    "pattern": "〜かたわら (katawara)",
    "meaning": "trong khi đó; cùng với (nghề nghiệp chính của một người)",
    "formula": "Động từ thể từ điển (V-dict) / Danh từ (N) + の + かたわら",
    "note": "Hai hoạt động được theo đuổi song song trong một thời gian dài (một công việc và một việc theo đuổi bên lề), không phải là hành động chỉ thực hiện một lần. Là một danh từ đơn giản, かたわら cũng có nghĩa là 'bên cạnh'.",
    "examples": [
      {
        "text": "彼女[かのじょ]は会社[かいしゃ]勤[づと]めのかたわら、週末[しゅうまつ]は日本語[にほんご]教室[きょうしつ]でボランティアをしている。",
        "furigana": "彼女[かのじょ]は会社[かいしゃ]勤[づと]めのかたわら、週末[しゅうまつ]は日本語[にほんご]教室[きょうしつ]でボランティアをしている。",
        "reading": "kanojohakaishazutomenokatawara、shuumatsuhanihongokyoushitsudeボランティアoshiteiru。",
        "translation": "Khi đang làm việc tại một công ty, cô tình nguyện tham gia lớp học tiếng Nhật vào cuối tuần."
      },
      {
        "text": "祖父[そふ]は農業[のうぎょう]を営[いとな]むかたわら、地元[じもと]の歴史[れきし]を研究[けんきゅう]して三[さん]冊[さつ]の本[ほん]にまとめた。",
        "furigana": "祖父[そふ]は農業[のうぎょう]を営[いとな]むかたわら、地元[じもと]の歴史[れきし]を研究[けんきゅう]して三[さん]冊[さつ]の本[ほん]にまとめた。",
        "reading": "sofuhanougyouoitonamukatawara、jimotonorekishiokenkyuushitesansatsunohonnimatometa。",
        "translation": "Khi ông nội tôi còn là nông dân, ông đã nghiên cứu lịch sử địa phương và biên soạn thành ba cuốn sách."
      }
    ]
  },
  {
    "id": "ja-g-n1-03-ga-hayai-ka",
    "language": "ja",
    "level": "N1",
    "pattern": "〜が早いか (ga hayai ka)",
    "meaning": "; không sớm hơn ... hơn",
    "formula": "Động từ thể từ điển (V-dict) + が早いか",
    "note": "Hành động thứ hai diễn ra gần như ngay lập tức; nó nêu lên một sự kiện trong quá khứ, không bao giờ là một yêu cầu hay ý định. Từ gần đồng nghĩa: 〜や否や (trang trọng nhất), 〜なり (cùng chủ đề, thường gây ngạc nhiên), 〜そばから (lặp lại).",
    "examples": [
      {
        "text": "子[こ]どもたちは玄関[げんかん]を開[あ]けるが早[はや]いか、ランドセルを放[ほう]り出[だ]して遊[あそ]びに行[い]ってしまった。",
        "furigana": "子[こ]どもたちは玄関[げんかん]を開[あ]けるが早[はや]いか、ランドセルを放[ほう]り出[だ]して遊[あそ]びに行[い]ってしまった。",
        "reading": "kodomotachihagenkanoakerugahayaika、ランドセルohouridashiteasobiniitteshimatta。",
        "translation": "Bọn trẻ vội vàng mở cửa trước nhưng lại vứt cặp đi học và ra ngoài chơi."
      },
      {
        "text": "開店[かいてん]のベルが鳴[な]るが早[はや]いか、客[きゃく]たちは目当[めあ]ての売[う]り場[ば]へ駆[か]け出[だ]した。",
        "furigana": "開店[かいてん]のベルが鳴[な]るが早[はや]いか、客[きゃく]たちは目当[めあ]ての売[う]り場[ば]へ駆[か]け出[だ]した。",
        "reading": "kaitennoベルganarugahayaika、kyakutachihameatenouribahekakedashita。",
        "translation": "Ngay khi tiếng chuông khai mạc vang lên, khách hàng đã đổ xô đến tầng bán hàng mà mình mong muốn."
      },
      {
        "text": "彼[かれ]は給料[きゅうりょう]をもらうが早[はや]いか、全部[ぜんぶ]競馬[けいば]につぎ込[こ]んでしまった。",
        "furigana": "彼[かれ]は給料[きゅうりょう]をもらうが早[はや]いか、全部[ぜんぶ]競馬[けいば]につぎ込[こ]んでしまった。",
        "reading": "karehakyuuryouomoraugahayaika、zenbukeibanitsugikondeshimatta。",
        "translation": "Anh ấy nhận lương sớm nhưng lại tiêu hết vào việc đua ngựa."
      }
    ]
  },
  {
    "id": "ja-g-n1-04-sura",
    "language": "ja",
    "level": "N1",
    "pattern": "〜すら (sura)",
    "meaning": "; thậm chí không (một ví dụ cực đoan)",
    "formula": "Danh từ (N) (+ particle) + すら",
    "note": "Một 〜さえ mang tính văn học hơn. Không giống như さえ, nó không được sử dụng trong cấu trúc 〜さえ〜ば ('giá như').",
    "examples": [
      {
        "text": "高熱[こうねつ]が三日[みっか]も続[つづ]き、水[みず]を飲[の]むことすらつらかった。",
        "furigana": "高熱[こうねつ]が三日[みっか]も続[つづ]き、水[みず]を飲[の]むことすらつらかった。",
        "reading": "kounetsugamikkamotsuzuki、mizuonomukotosuratsurakatta。",
        "translation": "Tôi sốt cao ba ngày liền, ngay cả nước cũng khó uống."
      },
      {
        "text": "この漢字[かんじ]は、専門[せんもん]家[か]ですら読[よ]み間違[まちが]えることがある。",
        "furigana": "この漢字[かんじ]は、専門[せんもん]家[か]ですら読[よ]み間違[まちが]えることがある。",
        "reading": "konokanjiha、senmonkadesurayomimachigaerukotogaaru。",
        "translation": "Ngay cả các chuyên gia đôi khi cũng có thể đọc nhầm chữ kanji này."
      },
      {
        "text": "彼[かれ]は長年[ながねん]連[つ]れ添[そ]った妻[つま]にすら、病気[びょうき]のことを打[う]ち明[あ]けなかった。",
        "furigana": "彼[かれ]は長年[ながねん]連[つ]れ添[そ]った妻[つま]にすら、病気[びょうき]のことを打[う]ち明[あ]けなかった。",
        "reading": "karehanaganentsuresottatsumanisura、byoukinokotoouchiakenakatta。",
        "translation": "Anh ấy thậm chí còn không nói với vợ mình nhiều năm về căn bệnh của mình."
      }
    ]
  },
  {
    "id": "ja-g-n1-05-zukume",
    "language": "ja",
    "level": "N1",
    "pattern": "〜ずくめ (zukume)",
    "meaning": "không có gì ngoài; toàn bộ; cái này ... nối tiếp cái khác",
    "formula": "Danh từ (N) + ずくめ",
    "note": "Hoạt động với một số danh từ hạn chế (黒, いいこと, 規則, ごちそう, 結構). Không giống như だらけ hay まみれ nó có thể mang nghĩa tích cực và không có nghĩa là được che chắn về mặt vật lý.",
    "examples": [
      {
        "text": "昇進[しょうしん]に結婚[けっこん]、新居[しんきょ]の購入[こうにゅう]と、今年[ことし]はいいことずくめの一[いち]年[ねん]だった。",
        "furigana": "昇進[しょうしん]に結婚[けっこん]、新居[しんきょ]の購入[こうにゅう]と、今年[ことし]はいいことずくめの一[いち]年[ねん]だった。",
        "reading": "shoushinnikekkon、shinkyonokounyuuto、kotoshihaiikotozukumenoichinendatta。",
        "translation": "Năm nay đầy rẫy những điều tốt đẹp: Tôi được thăng chức, kết hôn và mua được một căn nhà mới."
      },
      {
        "text": "黒[くろ]ずくめの服[ふく]を着[き]た男[おとこ]が、店[みせ]の前[まえ]をうろうろしている。",
        "furigana": "黒[くろ]ずくめの服[ふく]を着[き]た男[おとこ]が、店[みせ]の前[まえ]をうろうろしている。",
        "reading": "kurozukumenofukuokitaotokoga、misenomaeourouroshiteiru。",
        "translation": "Một người đàn ông mặc đồ đen đang lảng vảng trước cửa hàng."
      },
      {
        "text": "規則[きそく]ずくめの寮[りょう]生活[せいかつ]に、入学[にゅうがく]早々[そうそう]うんざりしてしまった。",
        "furigana": "規則[きそく]ずくめの寮[りょう]生活[せいかつ]に、入学[にゅうがく]早々[そうそう]うんざりしてしまった。",
        "reading": "kisokuzukumenoryouseikatsuni、nyuugakusousouunzarishiteshimatta。",
        "translation": "Tôi đã cảm thấy mệt mỏi khi phải sống trong ký túc xá với quá nhiều nội quy ngay khi bước vào trường."
      }
    ]
  },
  {
    "id": "ja-g-n1-06-tara-saigo-ga-saigo",
    "language": "ja",
    "level": "N1",
    "pattern": "〜たら最後 / 〜が最後 (tara saigo / ga saigo)",
    "meaning": "một lần ... (không thể quay lại); nếu có ..., đó là kết thúc",
    "formula": "Động từ thể た (V-ta) + ら最後 / Động từ thể た (V-ta) + が最後",
    "note": "Kết quả là xấu hoặc không thể đảo ngược và được tuyên bố một cách chắc chắn. 〜が最後 mang tính văn chương hơn một chút.",
    "examples": [
      {
        "text": "この子[こ]は一度[いちど]泣[な]き出[だ]したら最後[さいご]、何[なに]をしても一[いち]時間[じかん]は泣[な]きやまない。",
        "furigana": "この子[こ]は一度[いちど]泣[な]き出[だ]したら最後[さいご]、何[なに]をしても一[いち]時間[じかん]は泣[な]きやまない。",
        "reading": "konokohaichidonakidashitarasaigo、nanioshitemoichijikanhanakiyamanai。",
        "translation": "Một khi đứa trẻ này bắt đầu khóc thì dù bạn có làm gì đi nữa, nó sẽ không ngừng khóc suốt một tiếng đồng hồ."
      },
      {
        "text": "あの人[ひと]に秘密[ひみつ]を話[はな]したが最後[さいご]、翌日[よくじつ]には社内[しゃない]中[じゅう]に知[し]れ渡[わた]っているだろう。",
        "furigana": "あの人[ひと]に秘密[ひみつ]を話[はな]したが最後[さいご]、翌日[よくじつ]には社内[しゃない]中[じゅう]に知[し]れ渡[わた]っているだろう。",
        "reading": "anohitonihimitsuohanashitagasaigo、yokujitsunihashanaijuunishirewatatteirudarou。",
        "translation": "Sau khi tôi kể cho người đó biết bí mật của mình thì có lẽ ngày hôm sau nó sẽ được cả công ty biết đến."
      },
      {
        "text": "この契約[けいやく]書[しょ]に一[いち]度[ど]判[はん]を押[お]したら最後[さいご]、後[あと]から取[と]り消[け]すことはできない。",
        "furigana": "この契約[けいやく]書[しょ]に一[いち]度[ど]判[はん]を押[お]したら最後[さいご]、後[あと]から取[と]り消[け]すことはできない。",
        "reading": "konokeiyakushoniichidohanooshitarasaigo、atokaratorikesukotohadekinai。",
        "translation": "Hợp đồng này một khi đã ký thì sau này không thể hủy được."
      }
    ]
  },
  {
    "id": "ja-g-n1-07-te-kara-to-iu-mono",
    "language": "ja",
    "level": "N1",
    "pattern": "〜てからというもの (te kara to iu mono)",
    "meaning": "kể từ",
    "formula": "Động từ thể て (V-te) + からというもの",
    "note": "Nhấn mạnh một sự thay đổi lâu dài, rõ rệt bắt đầu từ sự kiện đó; nhiều cảm xúc hơn so với 〜て以来 trung tính.",
    "examples": [
      {
        "text": "犬[いぬ]を飼[か]い始[はじ]めてからというもの、父[ちち]は毎朝[まいあさ]六[ろく]時[じ]に起[お]きるようになった。",
        "furigana": "犬[いぬ]を飼[か]い始[はじ]めてからというもの、父[ちち]は毎朝[まいあさ]六[ろく]時[じ]に起[お]きるようになった。",
        "reading": "inuokaihajimetekaratoiumono、chichihamaiasarokujiniokiruyouninatta。",
        "translation": "Kể từ khi có một chú chó, bố tôi bắt đầu thức dậy lúc 6 giờ sáng mỗi sáng."
      },
      {
        "text": "彼女[かのじょ]は留学[りゅうがく]から戻[もど]ってからというもの、見違[みちが]えるほど積極[せっきょく]的[てき]になった。",
        "furigana": "彼女[かのじょ]は留学[りゅうがく]から戻[もど]ってからというもの、見違[みちが]えるほど積極[せっきょく]的[てき]になった。",
        "reading": "kanojoharyuugakukaramodottekaratoiumono、michigaeruhodosekkyokutekininatta。",
        "translation": "Kể từ khi đi du học về, cô ấy trở nên năng động đến không ngờ."
      },
      {
        "text": "スマートフォンを手[て]にしてからというもの、紙[かみ]の本[ほん]をほとんど読[よ]まなくなった。",
        "furigana": "スマートフォンを手[て]にしてからというもの、紙[かみ]の本[ほん]をほとんど読[よ]まなくなった。",
        "reading": "スマートフォンotenishitekaratoiumono、kaminohonohotondoyomanakunatta。",
        "translation": "Từ khi có smartphone, tôi hầu như không đọc sách giấy nữa."
      }
    ]
  },
  {
    "id": "ja-g-n1-08-te-yamanai",
    "language": "ja",
    "level": "N1",
    "pattern": "〜てやまない (te yamanai)",
    "meaning": "không bao giờ ngừng; trân trọng; sâu sắc (hy vọng, tôn trọng, yêu thương)",
    "formula": "Động từ thể て (V-te) + やまない",
    "note": "Dùng với các động từ chỉ cảm giác như 願う, 祈る, 愛する, 尊敬する, 期待する. Điển hình của các bài phát biểu, thư từ và văn bản trang trọng.",
    "examples": [
      {
        "text": "皆様[みなさま]のご健康[けんこう]とご多幸[たこう]を心[こころ]より願[ねが]ってやみません。",
        "furigana": "皆様[みなさま]のご健康[けんこう]とご多幸[たこう]を心[こころ]より願[ねが]ってやみません。",
        "reading": "minasamanogokenkoutogotakouokokoroyorinegatteyamimasen。",
        "translation": "Xin chân thành chúc mọi người sức khỏe và hạnh phúc."
      },
      {
        "text": "恩師[おんし]は、私[わたし]が今[いま]も尊敬[そんけい]してやまない人物[じんぶつ]だ。",
        "furigana": "恩師[おんし]は、私[わたし]が今[いま]も尊敬[そんけい]してやまない人物[じんぶつ]だ。",
        "reading": "onshiha、watashigaimamosonkeishiteyamanaijinbutsuda。",
        "translation": "Người cố vấn của tôi là người mà tôi vẫn vô cùng kính trọng."
      },
      {
        "text": "この作家[さっか]は、生涯[しょうがい]故郷[こきょう]の海[うみ]を愛[あい]してやまなかったという。",
        "furigana": "この作家[さっか]は、生涯[しょうがい]故郷[こきょう]の海[うみ]を愛[あい]してやまなかったという。",
        "reading": "konosakkaha、shougaikokyounoumioaishiteyamanakattatoiu。",
        "translation": "Người ta nói rằng nhà văn này đã yêu biển cả quê hương mình cả đời."
      }
    ]
  },
  {
    "id": "ja-g-n1-09-to-aimatte",
    "language": "ja",
    "level": "N1",
    "pattern": "〜と相まって (to aimatte)",
    "meaning": "; cùng với",
    "formula": "Danh từ (N) + と相まって / Danh từ (N) + も相まって",
    "note": "Hai yếu tố củng cố lẫn nhau để tạo ra hiệu ứng mạnh mẽ hơn. Ngoài ra còn có AとBが相まって và 〜も相まって.",
    "examples": [
      {
        "text": "色[いろ]づいた紅葉[こうよう]が澄[す]んだ秋空[あきぞら]と相[あい]まって、息[いき]をのむような景色[けしき]をつくり出[だ]していた。",
        "furigana": "色[いろ]づいた紅葉[こうよう]が澄[す]んだ秋空[あきぞら]と相[あい]まって、息[いき]をのむような景色[けしき]をつくり出[だ]していた。",
        "reading": "irozuitakouyougasundaakizoratoaimatte、ikionomuyounakeshikiotsukuridashiteita。",
        "translation": "Màu sắc thay đổi của lá mùa thu kết hợp với bầu trời mùa thu trong trẻo đã tạo nên một khung cảnh ngoạn mục."
      },
      {
        "text": "円安[えんやす]に規制[きせい]緩和[かんわ]も相[あい]まって、訪日[ほうにち]客[きゃく]の数[かず]は過去[かこ]最高[さいこう]を記録[きろく]した。",
        "furigana": "円安[えんやす]に規制[きせい]緩和[かんわ]も相[あい]まって、訪日[ほうにち]客[きゃく]の数[かず]は過去[かこ]最高[さいこう]を記録[きろく]した。",
        "reading": "enyasunikiseikanwamoaimatte、hounichikyakunokazuhakakosaikouokirokushita。",
        "translation": "Số lượng du khách đến Nhật Bản đã đạt mức cao nhất mọi thời đại do đồng Yên yếu và việc bãi bỏ quy định."
      },
      {
        "text": "誠実[せいじつ]な人柄[ひとがら]と確[たし]かな技術[ぎじゅつ]が相[あい]まって、彼[かれ]の店[みせ]は地元[じもと]で厚[あつ]い信頼[しんらい]を得[え]ている。",
        "furigana": "誠実[せいじつ]な人柄[ひとがら]と確[たし]かな技術[ぎじゅつ]が相[あい]まって、彼[かれ]の店[みせ]は地元[じもと]で厚[あつ]い信頼[しんらい]を得[え]ている。",
        "reading": "seijitsunahitogaratotashikanagijutsugaaimatte、karenomisehajimotodeatsuishinraioeteiru。",
        "translation": "Nhờ tính cách chân thành và kỹ năng đáng tin cậy nên cửa hàng của anh đã nhận được sự tin tưởng của cộng đồng địa phương."
      }
    ]
  },
  {
    "id": "ja-g-n1-10-tomo-naru-to-tomo-nareba",
    "language": "ja",
    "level": "N1",
    "pattern": "〜ともなると / 〜ともなれば (tomo naru to / tomo nareba)",
    "meaning": "khi nói đến; một lần (một cấp độ hoặc giai đoạn nhất định) đạt được",
    "formula": "Danh từ (N) / Động từ thể từ điển (V-dict) + ともなると / Danh từ (N) / Động từ thể từ điển (V-dict) + ともなれば",
    "note": "Danh từ đánh dấu một địa vị, thời gian hoặc số lượng cao đáng kể; phần còn lại nêu rõ những gì tự nhiên đi kèm với nó.",
    "examples": [
      {
        "text": "大[だい]企業[きぎょう]の社長[しゃちょう]ともなると、分[ふん]刻[きざ]みのスケジュールで動[うご]かなければならない。",
        "furigana": "大[だい]企業[きぎょう]の社長[しゃちょう]ともなると、分[ふん]刻[きざ]みのスケジュールで動[うご]かなければならない。",
        "reading": "daikigyounoshachoutomonaruto、funkizaminoスケジュールdeugokanakerebanaranai。",
        "translation": "Là chủ tịch của một công ty lớn, bạn phải làm việc theo lịch trình từng phút một."
      },
      {
        "text": "十二月[じゅうにがつ]ともなれば、この辺[あた]りの山[やま]はすっかり雪[ゆき]に覆[おお]われる。",
        "furigana": "十二月[じゅうにがつ]ともなれば、この辺[あた]りの山[やま]はすっかり雪[ゆき]に覆[おお]われる。",
        "reading": "juunigatsutomonareba、konoatarinoyamahasukkariyukinioowareru。",
        "translation": "Vào tháng 12, những ngọn núi xung quanh đây được bao phủ hoàn toàn bởi tuyết."
      },
      {
        "text": "子[こ]どもが三[さん]人[にん]ともなると、毎月[まいつき]の食費[しょくひ]だけでも相当[そうとう]な額[がく]になる。",
        "furigana": "子[こ]どもが三[さん]人[にん]ともなると、毎月[まいつき]の食費[しょくひ]だけでも相当[そうとう]な額[がく]になる。",
        "reading": "kodomogasannintomonaruto、maitsukinoshokuhidakedemosoutounagakuninaru。",
        "translation": "Nếu bạn có ba con thì riêng chi phí ăn uống hàng tháng sẽ khá lớn."
      }
    ]
  },
  {
    "id": "ja-g-n1-11-nara-de-wa",
    "language": "ja",
    "level": "N1",
    "pattern": "〜ならでは (nara de wa)",
    "meaning": "duy nhất; điều đó chỉ ... mới có thể cung cấp",
    "formula": "Danh từ (N) + ならではの + Danh từ (N) / Danh từ (N) + ならではだ",
    "note": "Hầu như luôn luôn khen ngợi. Văn học AならではBない có nghĩa là 'chỉ A mới có thể B'.",
    "examples": [
      {
        "text": "港町[みなとまち]ならではの新鮮[しんせん]な魚介[ぎょかい]料理[りょうり]を、心[こころ]ゆくまで味[あじ]わった。",
        "furigana": "港町[みなとまち]ならではの新鮮[しんせん]な魚介[ぎょかい]料理[りょうり]を、心[こころ]ゆくまで味[あじ]わった。",
        "reading": "minatomachinaradehanoshinsennagyokairyourio、kokoroyukumadeajiwatta。",
        "translation": "Tôi rất thích thú với những món hải sản tươi sống chỉ có thể tìm thấy ở phố cảng."
      },
      {
        "text": "細部[さいぶ]まで行[い]き届[とど]いたこの仕上[しあ]がりは、熟練[じゅくれん]の職人[しょくにん]ならではだ。",
        "furigana": "細部[さいぶ]まで行[い]き届[とど]いたこの仕上[しあ]がりは、熟練[じゅくれん]の職人[しょくにん]ならではだ。",
        "reading": "saibumadeikitodoitakonoshiagariha、jukurennoshokuninnaradehada。",
        "translation": "Sự chú ý đến từng chi tiết này là kết quả của một người thợ lành nghề."
      },
      {
        "text": "子[こ]どもならではの自由[じゆう]な発想[はっそう]に、大人[おとな]たちは驚[おどろ]かされた。",
        "furigana": "子[こ]どもならではの自由[じゆう]な発想[はっそう]に、大人[おとな]たちは驚[おどろ]かされた。",
        "reading": "kodomonaradehanojiyuunahassouni、otonatachihaodorokasareta。",
        "translation": "Người lớn rất ngạc nhiên trước lối suy nghĩ tự do mà chỉ trẻ em mới có được."
      }
    ]
  },
  {
    "id": "ja-g-n1-12-beku",
    "language": "ja",
    "level": "N1",
    "pattern": "〜べく (beku)",
    "meaning": "để; với mục đích",
    "formula": "Động từ thể từ điển (V-dict) + べく (する → すべく)",
    "note": "Phong cách viết trang trọng; する thường trở thành すべく. Mệnh đề chính không thể là một yêu cầu hoặc mệnh lệnh.",
    "examples": [
      {
        "text": "同社[どうしゃ]は海外[かいがい]市場[しじょう]に進出[しんしゅつ]すべく、現地[げんち]に新[あら]たな拠点[きょてん]を設[もう]けた。",
        "furigana": "同社[どうしゃ]は海外[かいがい]市場[しじょう]に進出[しんしゅつ]すべく、現地[げんち]に新[あら]たな拠点[きょてん]を設[もう]けた。",
        "reading": "doushahakaigaishijounishinshutsusubeku、genchiniaratanakyotenomouketa。",
        "translation": "Công ty đã thành lập cơ sở mới tại địa phương để mở rộng ra thị trường nước ngoài."
      },
      {
        "text": "彼[かれ]は医師[いし]になるべく、働[はたら]きながら夜間[やかん]の予備校[よびこう]に通[かよ]っている。",
        "furigana": "彼[かれ]は医師[いし]になるべく、働[はたら]きながら夜間[やかん]の予備校[よびこう]に通[かよ]っている。",
        "reading": "karehaishininarubeku、hatarakinagarayakannoyobikounikayotteiru。",
        "translation": "Anh ấy đang đi làm và theo học trường dự bị ban đêm với hy vọng trở thành bác sĩ."
      },
      {
        "text": "被災[ひさい]地[ち]の復興[ふっこう]を支援[しえん]すべく、全国[ぜんこく]から多[おお]くのボランティアが集[あつ]まった。",
        "furigana": "被災[ひさい]地[ち]の復興[ふっこう]を支援[しえん]すべく、全国[ぜんこく]から多[おお]くのボランティアが集[あつ]まった。",
        "reading": "hisaichinofukkouoshiensubeku、zenkokukaraookunoボランティアgaatsumatta。",
        "translation": "Nhiều tình nguyện viên đã tập trung từ khắp nơi trên cả nước để hỗ trợ tái thiết các khu vực bị thiên tai."
      }
    ]
  },
  {
    "id": "ja-g-n1-13-you-mono-nara",
    "language": "ja",
    "level": "N1",
    "pattern": "〜(よ)うものなら (you mono nara)",
    "meaning": "nếu một người (làm), (điều gì đó khủng khiếp sẽ xảy ra)",
    "formula": "Động từ thể ý chí (V-ý chí) + ものなら",
    "note": "Phóng đại sự nguy hiểm của một hành động. Đừng nhầm lẫn với 〜ものなら (N2), có dạng tiềm năng cho một điều ước không thể xảy ra: 行けるものなら行きたい.",
    "examples": [
      {
        "text": "父[ちち]の前[まえ]で母[はは]の料理[りょうり]に文句[もんく]でも言[い]おうものなら、大変[たいへん]なことになる。",
        "furigana": "父[ちち]の前[まえ]で母[はは]の料理[りょうり]に文句[もんく]でも言[い]おうものなら、大変[たいへん]なことになる。",
        "reading": "chichinomaedehahanoryourinimonkudemoioumononara、taihennakotoninaru。",
        "translation": "Nếu tôi mà phàn nàn việc mẹ nấu trước mặt bố thì tôi sẽ gặp rắc rối."
      },
      {
        "text": "この辺[あた]りは、少[すこ]しでも雨[あめ]が降[ふ]ろうものなら、すぐに道路[どうろ]が冠水[かんすい]してしまう。",
        "furigana": "この辺[あた]りは、少[すこ]しでも雨[あめ]が降[ふ]ろうものなら、すぐに道路[どうろ]が冠水[かんすい]してしまう。",
        "reading": "konoatariha、sukoshidemoamegafuroumononara、sugunidourogakansuishiteshimau。",
        "translation": "Nếu trời mưa dù chỉ một chút ở khu vực này, đường sẽ ngập ngay lập tức."
      },
      {
        "text": "締[し]め切[き]りに一[いち]日[にち]でも遅[おく]れようものなら、二度[にど]と仕事[しごと]をもらえなくなるだろう。",
        "furigana": "締[し]め切[き]りに一[いち]日[にち]でも遅[おく]れようものなら、二度[にど]と仕事[しごと]をもらえなくなるだろう。",
        "reading": "shimekiriniichinichidemookureyoumononara、nidotoshigotoomoraenakunarudarou。",
        "translation": "Nếu trễ deadline dù chỉ một ngày, bạn sẽ không bao giờ có được công việc khác."
      }
    ]
  },
  {
    "id": "ja-g-n1-14-ni-itaru-ni-itatte-ni-itatte-wa",
    "language": "ja",
    "level": "N1",
    "pattern": "〜に至る / 〜に至って / 〜に至っては (ni itaru / ni itatte / ni itatte wa)",
    "meaning": "Reach; dẫn đến ; chỉ khi nó đến; đối với (trường hợp cực đoan nhất)",
    "formula": "Danh từ (N) / Động từ thể từ điển (V-dict) + に至る / Danh từ (N) / Động từ thể từ điển (V-dict) + に至って / Danh từ (N) + に至っては",
    "note": "に至る: đạt đến điểm (nghiêm trọng). に至って: chỉ một lần mọi việc đến mức đó. に至っては: giới thiệu ví dụ cực đoan nhất, thường là tiêu cực. Liên quan: 〜に至るまで 'xuống, thậm chí'.",
    "examples": [
      {
        "text": "小[ちい]さな行[い]き違[ちが]いが、ついには両社[りょうしゃ]の提携[ていけい]解消[かいしょう]にまで至[いた]った。",
        "furigana": "小[ちい]さな行[い]き違[ちが]いが、ついには両社[りょうしゃ]の提携[ていけい]解消[かいしょう]にまで至[いた]った。",
        "reading": "chiisanaikichigaiga、tsuiniharyoushanoteikeikaishounimadeitatta。",
        "translation": "Một sự hiểu lầm nhỏ cuối cùng đã dẫn đến việc chấm dứt quan hệ đối tác giữa hai công ty."
      },
      {
        "text": "死者[ししゃ]が出[で]るに至[いた]って、市[し]はようやく危険[きけん]な交差点[こうさてん]の改良[かいりょう]に乗[の]り出[だ]した。",
        "furigana": "死者[ししゃ]が出[で]るに至[いた]って、市[し]はようやく危険[きけん]な交差点[こうさてん]の改良[かいりょう]に乗[の]り出[だ]した。",
        "reading": "shishagaderuniitatte、shihayouyakukikennakousatennokairyouninoridashita。",
        "translation": "Chỉ sau khi có số người chết, thành phố mới bắt đầu cải thiện nút giao thông nguy hiểm."
      },
      {
        "text": "最近[さいきん]の若者[わかもの]は新聞[しんぶん]を読[よ]まないと言[い]われるが、弟[おとうと]に至[いた]ってはテレビのニュースさえ見[み]ない。",
        "furigana": "最近[さいきん]の若者[わかもの]は新聞[しんぶん]を読[よ]まないと言[い]われるが、弟[おとうと]に至[いた]ってはテレビのニュースさえ見[み]ない。",
        "reading": "saikinnowakamonohashinbunoyomanaitoiwareruga、otoutoniitattehaテレビnoニュースsaeminai。",
        "translation": "Người ta nói giới trẻ ngày nay không đọc báo, nhưng em trai tôi thậm chí còn không xem thời sự trên TV."
      }
    ]
  },
  {
    "id": "ja-g-n1-15-o-kinjienai",
    "language": "ja",
    "level": "N1",
    "pattern": "〜を禁じ得ない (o kinjienai)",
    "meaning": "không khỏi cảm động; không thể kìm nén (một cảm xúc)",
    "formula": "Danh từ (N) + を禁じ得ない",
    "note": "Dùng với các danh từ chỉ cảm xúc như 怒り, 憤り, 同情, 驚き, 涙, 疑問. Chính thức; kỳ lạ đối với những cảm xúc tầm thường hàng ngày.",
    "examples": [
      {
        "text": "罪[つみ]のない子[こ]どもたちが犠牲[ぎせい]になったことに、深[ふか]い憤[いきどお]りを禁[きん]じ得[え]ない。",
        "furigana": "罪[つみ]のない子[こ]どもたちが犠牲[ぎせい]になったことに、深[ふか]い憤[いきどお]りを禁[きん]じ得[え]ない。",
        "reading": "tsuminonaikodomotachigagiseininattakotoni、fukaiikidooriokinjienai。",
        "translation": "Tôi không khỏi phẫn nộ trước sự hy sinh của những đứa trẻ vô tội."
      },
      {
        "text": "長年[ながねん]の苦労[くろう]の末[すえ]に夢[ゆめ]をかなえた彼[かれ]の姿[すがた]に、涙[なみだ]を禁[きん]じ得[え]なかった。",
        "furigana": "長年[ながねん]の苦労[くろう]の末[すえ]に夢[ゆめ]をかなえた彼[かれ]の姿[すがた]に、涙[なみだ]を禁[きん]じ得[え]なかった。",
        "reading": "naganennokurounosueniyumeokanaetakarenosugatani、namidaokinjienakatta。",
        "translation": "Tôi không khỏi rơi nước mắt khi chứng kiến ​​anh ấy biến ước mơ của mình thành hiện thực sau nhiều năm làm việc chăm chỉ."
      },
      {
        "text": "当局[とうきょく]の対応[たいおう]の遅[おそ]さには、疑問[ぎもん]を禁[きん]じ得[え]ない。",
        "furigana": "当局[とうきょく]の対応[たいおう]の遅[おそ]さには、疑問[ぎもん]を禁[きん]じ得[え]ない。",
        "reading": "toukyokunotaiounoososaniha、gimonokinjienai。",
        "translation": "Chúng tôi không khỏi thắc mắc về phản ứng chậm chạp của cơ quan chức năng."
      }
    ]
  },
  {
    "id": "ja-g-n1-16-o-yogi-naku-sareru",
    "language": "ja",
    "level": "N1",
    "pattern": "〜を余儀なくされる (o yogi naku sareru)",
    "meaning": "bị ép buộc; không có lựa chọn nào khác ngoài",
    "formula": "Danh từ (N) + を余儀なくされる",
    "note": "Danh từ thường là danh từ suru chỉ một hành động không mong muốn (中止, 撤退, 変更, 入院). Chủ động 〜を余儀なくさせる có nghĩa là 'ép buộc (ai đó) phải'.",
    "examples": [
      {
        "text": "大型[おおがた]台風[たいふう]の接近[せっきん]により、多[おお]くの便[びん]が欠航[けっこう]を余儀[よぎ]なくされた。",
        "furigana": "大型[おおがた]台風[たいふう]の接近[せっきん]により、多[おお]くの便[びん]が欠航[けっこう]を余儀[よぎ]なくされた。",
        "reading": "oogatataifuunosekkinniyori、ookunobingakekkouoyoginakusareta。",
        "translation": "Nhiều chuyến bay buộc phải hủy do bão lớn đang đến gần."
      },
      {
        "text": "主力[しゅりょく]選手[せんしゅ]の相次[あいつ]ぐ負傷[ふしょう]で、チームは戦術[せんじゅつ]の大幅[おおはば]な変更[へんこう]を余儀[よぎ]なくされた。",
        "furigana": "主力[しゅりょく]選手[せんしゅ]の相次[あいつ]ぐ負傷[ふしょう]で、チームは戦術[せんじゅつ]の大幅[おおはば]な変更[へんこう]を余儀[よぎ]なくされた。",
        "reading": "shuryokusenshunoaitsugufushoude、チームhasenjutsunooohabanahenkouoyoginakusareta。",
        "translation": "Đội buộc phải thực hiện những thay đổi lớn về chiến thuật do hàng loạt cầu thủ chủ chốt bị chấn thương."
      },
      {
        "text": "住民[じゅうみん]たちは避難[ひなん]生活[せいかつ]を余儀[よぎ]なくされ、今[いま]も仮設[かせつ]住宅[じゅうたく]で暮[く]らしている。",
        "furigana": "住民[じゅうみん]たちは避難[ひなん]生活[せいかつ]を余儀[よぎ]なくされ、今[いま]も仮設[かせつ]住宅[じゅうたく]で暮[く]らしている。",
        "reading": "juumintachihahinanseikatsuoyoginakusare、imamokasetsujuutakudekurashiteiru。",
        "translation": "Người dân buộc phải sơ tán và vẫn đang sống trong những khu nhà tạm bợ."
      }
    ]
  },
  {
    "id": "ja-g-n1-17-atte-no",
    "language": "ja",
    "level": "N1",
    "pattern": "〜あっての (atte no)",
    "meaning": "(chỉ) có thể vì; nợ mọi thứ với",
    "formula": "Danh từ (N) + あっての + Danh từ (N) / Danh từ (N) + あってのことだ",
    "note": "AあってのB: B chỉ tồn tại nhờ có A nên A là tất yếu. Thường bày tỏ lòng biết ơn.",
    "examples": [
      {
        "text": "お客様[きゃくさま]あっての商売[しょうばい]ですから、どんな小[ちい]さな声[こえ]にも耳[みみ]を傾[かたむ]けなければならない。",
        "furigana": "お客様[きゃくさま]あっての商売[しょうばい]ですから、どんな小[ちい]さな声[こえ]にも耳[みみ]を傾[かたむ]けなければならない。",
        "reading": "okyakusamaattenoshoubaidesukara、donnachiisanakoenimomimiokatamukenakerebanaranai。",
        "translation": "Chúng tôi kinh doanh vì khách hàng nên chúng tôi phải lắng nghe tiếng nói của họ, dù nhỏ đến đâu."
      },
      {
        "text": "今日[こんにち]の私[わたし]があるのも、支[ささ]えてくれた家族[かぞく]あってのことだ。",
        "furigana": "今日[こんにち]の私[わたし]があるのも、支[ささ]えてくれた家族[かぞく]あってのことだ。",
        "reading": "konnichinowatashigaarunomo、sasaetekuretakazokuattenokotoda。",
        "translation": "Tôi có được như ngày hôm nay là nhờ gia đình đã ủng hộ tôi."
      },
      {
        "text": "健康[けんこう]あっての人生[じんせい]だ。体[からだ]を壊[こわ]すまで働[はたら]いてはいけない。",
        "furigana": "健康[けんこう]あっての人生[じんせい]だ。体[からだ]を壊[こわ]すまで働[はたら]いてはいけない。",
        "reading": "kenkouattenojinseida。karadaokowasumadehataraitehaikenai。",
        "translation": "Cuộc sống là có sức khỏe. Đừng làm việc cho đến khi cơ thể bạn suy sụp."
      }
    ]
  },
  {
    "id": "ja-g-n1-18-ikan-de-ikan-ni-yorazu",
    "language": "ja",
    "level": "N1",
    "pattern": "〜いかんで / 〜いかんによらず (ikan de / ikan ni yorazu)",
    "meaning": "tùy thuộc vào; bất kể",
    "formula": "Danh từ (N) (+ の) + いかんで / Danh từ (N) (+ の) + いかんによらず",
    "note": "Rất trang trọng (いかん = 'như thế nào, cái gì'). Các biến thể: 〜いかんによって / いかんでは (tùy theo); 〜いかんにかかわらず / いかんを問わず (bất kể).",
    "examples": [
      {
        "text": "来季[らいき]の契約[けいやく]は、今[こん]シーズンの成績[せいせき]いかんで決[き]まる。",
        "furigana": "来季[らいき]の契約[けいやく]は、今[こん]シーズンの成績[せいせき]いかんで決[き]まる。",
        "reading": "raikinokeiyakuha、konシーズンnoseisekiikandekimaru。",
        "translation": "Hợp đồng ở mùa giải tới sẽ được xác định dựa trên thành tích ở mùa giải này."
      },
      {
        "text": "試験[しけん]の結果[けっか]いかんでは、留年[りゅうねん]もあり得[え]る。",
        "furigana": "試験[しけん]の結果[けっか]いかんでは、留年[りゅうねん]もあり得[え]る。",
        "reading": "shikennokekkaikandeha、ryuunenmoarieru。",
        "translation": "Tùy theo kết quả bài thi mà có khả năng bị lưu ban."
      },
      {
        "text": "理由[りゆう]のいかんによらず、無断[むだん]欠勤[けっきん]は認[みと]められない。",
        "furigana": "理由[りゆう]のいかんによらず、無断[むだん]欠勤[けっきん]は認[みと]められない。",
        "reading": "riyuunoikanniyorazu、mudankekkinhamitomerarenai。",
        "translation": "Vắng mặt trái phép sẽ không được chấp nhận bất kể lý do."
      }
    ]
  },
  {
    "id": "ja-g-n1-19-you-ga-you-to",
    "language": "ja",
    "level": "N1",
    "pattern": "〜(よ)うが / 〜(よ)うと (you ga / you to)",
    "meaning": "bất kể (cái gì, như thế nào); ngay cả khi",
    "formula": "Động từ thể ý chí (V-ý chí) + が / Động từ thể ý chí (V-ý chí) + と / Tính từ đuôi い (A-i) stem + かろうが / Tính từ đuôi な (A-na) + だろうが / Danh từ (N) + だろうが",
    "note": "Nhấn mạnh hơn 〜ても; thường đi kèm với các từ để hỏi (何を, どこへ, いくら) hoặc どんなに. Mệnh đề chính thể hiện kết quả không bị ảnh hưởng.",
    "examples": [
      {
        "text": "周[まわ]りに何[なん]と言[い]われようが、自分[じぶん]で決[き]めた道[みち]を進[すす]むつもりだ。",
        "furigana": "周[まわ]りに何[なん]と言[い]われようが、自分[じぶん]で決[き]めた道[みち]を進[すす]むつもりだ。",
        "reading": "mawarininantoiwareyouga、jibundekimetamichiosusumutsumorida。",
        "translation": "Dù người ta có nói gì thì tôi vẫn sẽ đi theo con đường mà mình đã tự quyết định."
      },
      {
        "text": "どんなに忙[いそが]しかろうと、彼[かれ]は毎晩[まいばん]必[かなら]ず子[こ]どもに絵本[えほん]を読[よ]んでやる。",
        "furigana": "どんなに忙[いそが]しかろうと、彼[かれ]は毎晩[まいばん]必[かなら]ず子[こ]どもに絵本[えほん]を読[よ]んでやる。",
        "reading": "donnaniisogashikarouto、karehamaibankanarazukodomoniehonoyondeyaru。",
        "translation": "Dù bận đến đâu anh vẫn luôn đọc truyện tranh cho con nghe mỗi tối."
      },
      {
        "text": "相手[あいて]が上司[じょうし]だろうが、間違[まちが]っていることははっきり指摘[してき]すべきだ。",
        "furigana": "相手[あいて]が上司[じょうし]だろうが、間違[まちが]っていることははっきり指摘[してき]すべきだ。",
        "reading": "aitegajoushidarouga、machigatteirukotohahakkirishitekisubekida。",
        "translation": "Dù người kia có là sếp của bạn thì bạn cũng nên chỉ ra rõ ràng chỗ sai."
      }
    ]
  },
  {
    "id": "ja-g-n1-20-you-ga-mai-ga-you-to-mai-to",
    "language": "ja",
    "level": "N1",
    "pattern": "〜(よ)うが〜まいが / 〜(よ)うと〜まいと (you ga ... mai ga / you to ... mai to)",
    "meaning": "có hay không; bất kể",
    "formula": "Động từ thể ý chí (V-ý chí) + が + Động từ thể từ điển (V-dict) + まいが / Động từ thể ý chí (V-ý chí) + と + Động từ thể từ điển (V-dict) + まいと",
    "note": "Động từ tương tự được lặp lại. Đối với động từ ichidan và する/来る, まい có thể gắn vào gốc nai: 認めまい, しまい (hoặc すまい), こまい.",
    "examples": [
      {
        "text": "君[きみ]が賛成[さんせい]しようがしまいが、この計画[けいかく]はもう動[うご]き出[だ]している。",
        "furigana": "君[きみ]が賛成[さんせい]しようがしまいが、この計画[けいかく]はもう動[うご]き出[だ]している。",
        "reading": "kimigasanseishiyougashimaiga、konokeikakuhamouugokidashiteiru。",
        "translation": "Dù bạn có đồng ý hay không thì kế hoạch này cũng đã được thực hiện rồi."
      },
      {
        "text": "雨[あめ]が降[ふ]ろうと降[ふ]るまいと、試合[しあい]は予定[よてい]どおり行[おこな]われる。",
        "furigana": "雨[あめ]が降[ふ]ろうと降[ふ]るまいと、試合[しあい]は予定[よてい]どおり行[おこな]われる。",
        "reading": "amegafuroutofurumaito、shiaihayoteidooriokonawareru。",
        "translation": "Dù trời mưa hay không trận đấu vẫn diễn ra như dự kiến."
      },
      {
        "text": "本人[ほんにん]が認[みと]めようが認[みと]めまいが、証拠[しょうこ]は明[あき]らかだ。",
        "furigana": "本人[ほんにん]が認[みと]めようが認[みと]めまいが、証拠[しょうこ]は明[あき]らかだ。",
        "reading": "honningamitomeyougamitomemaiga、shoukohaakirakada。",
        "translation": "Dù anh ta có thừa nhận hay không thì bằng chứng đều rõ ràng."
      }
    ]
  },
  {
    "id": "ja-g-n1-21-you-ni-mo-nai",
    "language": "ja",
    "level": "N1",
    "pattern": "〜(よ)うにも〜ない (you ni mo ... nai)",
    "meaning": "muốn (làm) mà không được; ngay cả khi một người cố gắng, người ta không thể",
    "formula": "Động từ thể ý chí (V-ý chí) + にも + Động từ thể ない (V-nai) (potential of the same verb)",
    "note": "Một số hoàn cảnh bên ngoài cản trở hành động dự định. Động từ thứ hai thường là thế âm của cùng một động từ, hoặc 〜ようがない.",
    "examples": [
      {
        "text": "財布[さいふ]を家[いえ]に忘[わす]れてきたので、昼[ひる]ご飯[はん]を買[か]おうにも買[か]えなかった。",
        "furigana": "財布[さいふ]を家[いえ]に忘[わす]れてきたので、昼[ひる]ご飯[はん]を買[か]おうにも買[か]えなかった。",
        "reading": "saifuoieniwasuretekitanode、hirugohanokaounimokaenakatta。",
        "translation": "Mình quên ví ở nhà nên không mua được đồ ăn trưa."
      },
      {
        "text": "大雪[おおゆき]で電車[でんしゃ]が止[と]まってしまい、帰[かえ]ろうにも帰[かえ]れない。",
        "furigana": "大雪[おおゆき]で電車[でんしゃ]が止[と]まってしまい、帰[かえ]ろうにも帰[かえ]れない。",
        "reading": "ooyukidedenshagatomatteshimai、kaerounimokaerenai。",
        "translation": "Tàu dừng do tuyết rơi dày nên dù có cố gắng tôi cũng không thể về nhà."
      },
      {
        "text": "当時[とうじ]の記録[きろく]がすべて失[うしな]われており、確[たし]かめようにも確[たし]かめようがない。",
        "furigana": "当時[とうじ]の記録[きろく]がすべて失[うしな]われており、確[たし]かめようにも確[たし]かめようがない。",
        "reading": "toujinokirokugasubeteushinawareteori、tashikameyounimotashikameyouganai。",
        "translation": "Tất cả hồ sơ từ thời điểm đó đã bị mất và không có cách nào để xác minh."
      }
    ]
  },
  {
    "id": "ja-g-n1-22-kagiri-da",
    "language": "ja",
    "level": "N1",
    "pattern": "〜かぎりだ (kagiri da)",
    "meaning": "cực kỳ; Tôi cảm thấy vậy (cảm xúc)",
    "formula": "Tính từ đuôi い (A-i) / Tính từ đuôi な (A-na) + な + かぎりだ",
    "note": "Thể hiện cảm xúc mạnh mẽ của người nói bằng các tính từ cảm xúc (うれしい, 寂しい, 心細い, うらやましい, 残念な). Không sử dụng cho cảm xúc của người khác.",
    "examples": [
      {
        "text": "長年[ながねん]の夢[ゆめ]だった自分[じぶん]の店[みせ]をついに開[ひら]くことができ、うれしいかぎりだ。",
        "furigana": "長年[ながねん]の夢[ゆめ]だった自分[じぶん]の店[みせ]をついに開[ひら]くことができ、うれしいかぎりだ。",
        "reading": "naganennoyumedattajibunnomiseotsuinihirakukotogadeki、ureshiikagirida。",
        "translation": "Tôi rất vui vì cuối cùng cũng có thể mở cửa hàng của riêng mình, đây là ước mơ của tôi trong nhiều năm."
      },
      {
        "text": "頼[たよ]りにしていた先輩[せんぱい]が来月[らいげつ]で退職[たいしょく]されるとは、心細[こころぼそ]いかぎりです。",
        "furigana": "頼[たよ]りにしていた先輩[せんぱい]が来月[らいげつ]で退職[たいしょく]されるとは、心細[こころぼそ]いかぎりです。",
        "reading": "tayorinishiteitasenpaigaraigetsudetaishokusarerutoha、kokorobosoikagiridesu。",
        "translation": "Thật đau buồn khi đồng nghiệp cấp cao của tôi, người mà tôi luôn tin cậy, sẽ nghỉ hưu vào tháng tới."
      },
      {
        "text": "若[わか]いのに三[さん]か国[こく]語[ご]を自在[じざい]に操[あやつ]るなんて、うらやましいかぎりだ。",
        "furigana": "若[わか]いのに三[さん]か国[こく]語[ご]を自在[じざい]に操[あやつ]るなんて、うらやましいかぎりだ。",
        "reading": "wakainonisankakokugoojizainiayatsurunante、urayamashiikagirida。",
        "translation": "Tôi rất ghen tị khi bạn có thể nói ba thứ tiếng một cách thoải mái như vậy dù bạn còn rất trẻ."
      }
    ]
  },
  {
    "id": "ja-g-n1-23-katagata",
    "language": "ja",
    "level": "N1",
    "pattern": "〜かたがた (katagata)",
    "meaning": "while well; một phần nhằm mục đích",
    "formula": "Danh từ (N) + かたがた",
    "note": "Chính thức; thường đi kèm với お礼, ご挨拶, ご報告, お見舞い cộng với động từ thăm viếng (伺う, 訪ねる). So sánh 〜がてら thông thường và 〜かたわら (hoạt động dài hạn song song).",
    "examples": [
      {
        "text": "先日[せんじつ]のお礼[れい]かたがた、ご挨拶[あいさつ]に伺[うかが]いたいと存[ぞん]じます。",
        "furigana": "先日[せんじつ]のお礼[れい]かたがた、ご挨拶[あいさつ]に伺[うかが]いたいと存[ぞん]じます。",
        "reading": "senjitsunooreikatagata、goaisatsuniukagaitaitozonjimasu。",
        "translation": "Mình xin gửi lời chào tới các bạn đã cảm ơn mình hôm nọ."
      },
      {
        "text": "退院[たいいん]のご報告[ほうこく]かたがた、入院[にゅういん]中[ちゅう]のお見舞[みま]いのお礼[れい]を申[もう]し上[あ]げます。",
        "furigana": "退院[たいいん]のご報告[ほうこく]かたがた、入院[にゅういん]中[ちゅう]のお見舞[みま]いのお礼[れい]を申[もう]し上[あ]げます。",
        "reading": "taiinnogohoukokukatagata、nyuuinchuunoomimainooreiomoushiagemasu。",
        "translation": "Cảm ơn bạn đã báo cáo việc xuất viện và đã đến thăm chúng tôi trong thời gian bạn nằm viện."
      },
      {
        "text": "出張[しゅっちょう]かたがた、久[ひさ]しぶりに恩師[おんし]のお宅[たく]を訪[たず]ねた。",
        "furigana": "出張[しゅっちょう]かたがた、久[ひさ]しぶりに恩師[おんし]のお宅[たく]を訪[たず]ねた。",
        "reading": "shucchoukatagata、hisashiburinionshinootakuotazuneta。",
        "translation": "Trong một lần đi công tác, lần đầu tiên tôi đã đến thăm nhà thầy sau một thời gian dài."
      }
    ]
  },
  {
    "id": "ja-g-n1-24-ka-to-omoikiya",
    "language": "ja",
    "level": "N1",
    "pattern": "〜かと思いきや (ka to omoikiya)",
    "meaning": "ngay khi người ta nghĩ ...; trái với mong đợi",
    "formula": "Động từ thể thông thường (V thường) / Tính từ đuôi い (A-i) / Tính từ đuôi な (A-na) / Danh từ (N) + かと思いきや",
    "note": "Kết quả trái ngược với những gì được mong đợi. Ngoài ra 〜と思いきや. Được tìm thấy trong bài viết và bài luận sinh động hơn là trong bài phát biểu.",
    "examples": [
      {
        "text": "今年[ことし]の冬[ふゆ]は暖[あたた]かいかと思[おも]いきや、二月[にがつ]に入[はい]って記録[きろく]的[てき]な大雪[おおゆき]に見舞[みま]われた。",
        "furigana": "今年[ことし]の冬[ふゆ]は暖[あたた]かいかと思[おも]いきや、二月[にがつ]に入[はい]って記録[きろく]的[てき]な大雪[おおゆき]に見舞[みま]われた。",
        "reading": "kotoshinofuyuhaatatakaikatoomoikiya、nigatsunihaittekirokutekinaooyukinimimawareta。",
        "translation": "Tôi cứ tưởng mùa đông năm nay sẽ ấm áp nhưng vào tháng 2 chúng tôi đã phải hứng chịu một lượng tuyết kỷ lục."
      },
      {
        "text": "予約[よやく]が取[と]れないことで有名[ゆうめい]な店[みせ]なので断[ことわ]られるかと思[おも]いきや、あっさり席[せき]が取[と]れた。",
        "furigana": "予約[よやく]が取[と]れないことで有名[ゆうめい]な店[みせ]なので断[ことわ]られるかと思[おも]いきや、あっさり席[せき]が取[と]れた。",
        "reading": "yoyakugatorenaikotodeyuumeinamisenanodekotowararerukatoomoikiya、assarisekigatoreta。",
        "translation": "Tưởng mình sẽ bị từ chối vì nhà hàng này nổi tiếng là không nhận đặt chỗ trước nhưng lại dễ dàng có được chỗ ngồi."
      },
      {
        "text": "息子[むすこ]は宿題[しゅくだい]をしているのかと思[おも]いきや、机[つくえ]の下[した]でゲームに夢中[むちゅう]になっていた。",
        "furigana": "息子[むすこ]は宿題[しゅくだい]をしているのかと思[おも]いきや、机[つくえ]の下[した]でゲームに夢中[むちゅう]になっていた。",
        "reading": "musukohashukudaioshiteirunokatoomoikiya、tsukuenoshitadeゲームnimuchuuninatteita。",
        "translation": "Tôi tưởng con trai tôi đang làm bài tập về nhà nhưng nó lại đang mải mê chơi game dưới gầm bàn."
      }
    ]
  },
  {
    "id": "ja-g-n1-25-kirai-ga-aru",
    "language": "ja",
    "level": "N1",
    "pattern": "〜きらいがある (kirai ga aru)",
    "meaning": "có xu hướng (xấu)",
    "formula": "Động từ thể từ điển (V-dict) / Động từ thể ない (V-nai) / Danh từ (N) + の + きらいがある",
    "note": "Luôn phê phán; phổ biến trong bình luận về thói quen hoặc thể chế của mọi người. So sánh 〜がち đàm thoại và 〜傾向がある trung tính.",
    "examples": [
      {
        "text": "彼[かれ]は何事[なにごと]も自分[じぶん]一人[ひとり]で抱[かか]え込[こ]むきらいがある。",
        "furigana": "彼[かれ]は何事[なにごと]も自分[じぶん]一人[ひとり]で抱[かか]え込[こ]むきらいがある。",
        "reading": "karehananigotomojibunhitoridekakaekomukiraigaaru。",
        "translation": "Anh ấy có xu hướng giữ mọi thứ cho riêng mình."
      },
      {
        "text": "最近[さいきん]の報道[ほうどう]は、視聴[しちょう]者[しゃ]の不安[ふあん]をいたずらにあおるきらいがある。",
        "furigana": "最近[さいきん]の報道[ほうどう]は、視聴[しちょう]者[しゃ]の不安[ふあん]をいたずらにあおるきらいがある。",
        "reading": "saikinnohoudouha、shichoushanofuanoitazuraniaorukiraigaaru。",
        "translation": "Các bản tin gần đây có xu hướng gây lo lắng một cách không cần thiết cho người xem."
      },
      {
        "text": "この教授[きょうじゅ]の論文[ろんぶん]は、結論[けつろん]を急[いそ]ぎすぎるきらいがある。",
        "furigana": "この教授[きょうじゅ]の論文[ろんぶん]は、結論[けつろん]を急[いそ]ぎすぎるきらいがある。",
        "reading": "konokyoujunoronbunha、ketsuronoisogisugirukiraigaaru。",
        "translation": "Bài viết của giáo sư này có xu hướng đưa ra những kết luận quá vội vàng."
      }
    ]
  },
  {
    "id": "ja-g-n1-26-kiwamaru-kiwamari-nai",
    "language": "ja",
    "level": "N1",
    "pattern": "〜極まる / 〜極まりない (kiwamaru / kiwamari nai)",
    "meaning": "vô cùng; hoàn toàn",
    "formula": "Tính từ đuôi な (A-na) + 極まる / Tính từ đuôi な (A-na) + 極まりない",
    "note": "Cả hai đều có nghĩa giống nhau; 極まりない ngày nay phổ biến hơn. Chủ yếu đi kèm với tính từ na phủ định (失礼, 危険, 不愉快, 退屈). 感極まる 'vượt qua cảm xúc' là một cụm từ cố định.",
    "examples": [
      {
        "text": "公共[こうきょう]の場[ば]で大声[おおごえ]で電話[でんわ]をするなんて、迷惑[めいわく]極[きわ]まりない。",
        "furigana": "公共[こうきょう]の場[ば]で大声[おおごえ]で電話[でんわ]をするなんて、迷惑[めいわく]極[きわ]まりない。",
        "reading": "koukyounobadeoogoededenwaosurunante、meiwakukiwamarinai。",
        "translation": "Thật khó chịu khi gọi điện thoại ồn ào ở nơi công cộng."
      },
      {
        "text": "雨[あめ]の夜[よる]に無灯火[むとうか]で自転車[じてんしゃ]に乗[の]るのは、危険[きけん]極[きわ]まりない行為[こうい]だ。",
        "furigana": "雨[あめ]の夜[よる]に無灯火[むとうか]で自転車[じてんしゃ]に乗[の]るのは、危険[きけん]極[きわ]まりない行為[こうい]だ。",
        "reading": "amenoyorunimutoukadejitenshaninorunoha、kikenkiwamarinaikouida。",
        "translation": "Đi xe đạp không đèn vào đêm mưa là cực kỳ nguy hiểm."
      },
      {
        "text": "被害[ひがい]者[しゃ]を嘲笑[ちょうしょう]するような彼[かれ]の発言[はつげん]は、不謹慎[ふきんしん]極[きわ]まる。",
        "furigana": "被害[ひがい]者[しゃ]を嘲笑[ちょうしょう]するような彼[かれ]の発言[はつげん]は、不謹慎[ふきんしん]極[きわ]まる。",
        "reading": "higaishaochoushousuruyounakarenohatsugenha、fukinshinkiwamaru。",
        "translation": "Anh bình luận giễu cợt nạn nhân là vô cùng thiếu tôn trọng."
      }
    ]
  },
  {
    "id": "ja-g-n1-27-no-kiwami",
    "language": "ja",
    "level": "N1",
    "pattern": "〜の極み (no kiwami)",
    "meaning": "; quyết định tối đa",
    "formula": "Danh từ (N) + の極み",
    "note": "Phổ biến với 光栄, 感激, 痛恨, ぜいたく, 疲労. So sánh 〜の至り, vốn được giới hạn ở một vài cụm từ cố định về cảm xúc của chính người nói.",
    "examples": [
      {
        "text": "決勝[けっしょう]戦[せん]であのような凡[ぼん]ミスをしたことは、まさに痛恨[つうこん]の極[きわ]みだ。",
        "furigana": "決勝[けっしょう]戦[せん]であのような凡[ぼん]ミスをしたことは、まさに痛恨[つうこん]の極[きわ]みだ。",
        "reading": "kesshousendeanoyounabonミスoshitakotoha、masanitsuukonnokiwamida。",
        "translation": "Mắc phải một sai lầm đơn giản như vậy trong trận đấu cuối cùng quả thực là đáng tiếc."
      },
      {
        "text": "徹夜[てつや]が三日[みっか]続[つづ]き、チームの全員[ぜんいん]が疲労[ひろう]の極[きわ]みに達[たっ]していた。",
        "furigana": "徹夜[てつや]が三日[みっか]続[つづ]き、チームの全員[ぜんいん]が疲労[ひろう]の極[きわ]みに達[たっ]していた。",
        "reading": "tetsuyagamikkatsuzuki、チームnozeningahirounokiwaminitasshiteita。",
        "translation": "Đã ba ngày thức trắng đêm, mọi người trong đội đều kiệt sức."
      },
      {
        "text": "一泊[いっぱく]百[ひゃく]万[まん]円[えん]のスイートとは、まさにぜいたくの極[きわ]みだ。",
        "furigana": "一泊[いっぱく]百[ひゃく]万[まん]円[えん]のスイートとは、まさにぜいたくの極[きわ]みだ。",
        "reading": "ippakuhyakumanennoスイートtoha、masanizeitakunokiwamida。",
        "translation": "Một căn phòng có giá 1 triệu yên mỗi đêm là thứ xa xỉ nhất."
      }
    ]
  },
  {
    "id": "ja-g-n1-28-gotoki-gotoku",
    "language": "ja",
    "level": "N1",
    "pattern": "〜ごとき / 〜ごとく (gotoki / gotoku)",
    "meaning": "thích; BẰNG; (sau một người) lượt thích",
    "formula": "Danh từ (N) + の + ごとく / Động từ thể thông thường (V thường) + (が) + ごとく / Danh từ (N) + (の) + ごとき + Danh từ (N)",
    "note": "Văn học tương đương với 〜ように / 〜ような. ごとき ngay sau khi một người tỏ ra khinh thường (お前ごとき) hoặc, đối với bản thân, sự khiêm tốn (私ごとき).",
    "examples": [
      {
        "text": "彼女[かのじょ]は何事[なにごと]もなかったかのごとく、静[しず]かに微笑[ほほえ]んでいた。",
        "furigana": "彼女[かのじょ]は何事[なにごと]もなかったかのごとく、静[しず]かに微笑[ほほえ]んでいた。",
        "reading": "kanojohananigotomonakattakanogotoku、shizukanihohoendeita。",
        "translation": "Cô ấy chỉ cười lặng lẽ như không có chuyện gì xảy ra."
      },
      {
        "text": "前述[ぜんじゅつ]のごとく、本[ほん]研究[けんきゅう]の対象[たいしょう]は二[に]十[じゅう]代[だい]の社会[しゃかい]人[じん]に限定[げんてい]している。",
        "furigana": "前述[ぜんじゅつ]のごとく、本[ほん]研究[けんきゅう]の対象[たいしょう]は二[に]十[じゅう]代[だい]の社会[しゃかい]人[じん]に限定[げんてい]している。",
        "reading": "zenjutsunogotoku、honkenkyuunotaishouhanijuudainoshakaijinnigenteishiteiru。",
        "translation": "Như đã đề cập ở trên, đối tượng của nghiên cứu này chỉ giới hạn ở những người trưởng thành đang đi làm ở độ tuổi 20."
      },
      {
        "text": "私[わたし]ごとき若輩[じゃくはい]者[もの]が、このような大役[たいやく]を務[つと]めてよいのでしょうか。",
        "furigana": "私[わたし]ごとき若輩[じゃくはい]者[もの]が、このような大役[たいやく]を務[つと]めてよいのでしょうか。",
        "reading": "watashigotokijakuhaimonoga、konoyounataiyakuotsutometeyoinodeshouka。",
        "translation": "Một người trẻ như tôi mà đóng vai trò quan trọng như vậy liệu có ổn không?"
      }
    ]
  },
  {
    "id": "ja-g-n1-29-koto-tote",
    "language": "ja",
    "level": "N1",
    "pattern": "〜こととて (koto tote)",
    "meaning": "bởi vì; vì (như một cái cớ hoặc một lời xin lỗi)",
    "formula": "Động từ thể thông thường (V thường) / Tính từ đuôi な (A-na) + な / Danh từ (N) + の + こととて",
    "note": "Cổ hủ và trang trọng, chủ yếu là trong lời xin lỗi hoặc yêu cầu sự hiểu biết. Thường dùng với ぬ (知らぬこととて 'vì tôi không biết').",
    "examples": [
      {
        "text": "何分[なにぶん]にも不慣[ふな]れなこととて、至[いた]らぬ点[てん]があればご容赦[ようしゃ]ください。",
        "furigana": "何分[なにぶん]にも不慣[ふな]れなこととて、至[いた]らぬ点[てん]があればご容赦[ようしゃ]ください。",
        "reading": "nanibunnimofunarenakototote、itaranutengaarebagoyoushakudasai。",
        "translation": "Xin hãy tha thứ cho tôi nếu có bất kỳ sai sót nào vì tôi không quen với điều này."
      },
      {
        "text": "子[こ]どものしたこととて、今回[こんかい]ばかりは大目[おおめ]に見[み]てやってください。",
        "furigana": "子[こ]どものしたこととて、今回[こんかい]ばかりは大目[おおめ]に見[み]てやってください。",
        "reading": "kodomonoshitakototote、konkaibakarihaoomenimiteyattekudasai。",
        "translation": "Hãy bỏ qua những gì con bạn đã làm lần này."
      },
      {
        "text": "急[きゅう]なこととて、十分[じゅうぶん]なおもてなしもできず失礼[しつれい]いたしました。",
        "furigana": "急[きゅう]なこととて、十分[じゅうぶん]なおもてなしもできず失礼[しつれい]いたしました。",
        "reading": "kyuunakototote、juubunnaomotenashimodekizushitsureiitashimashita。",
        "translation": "Tôi xin lỗi vì đã không thể tiếp đãi bạn đầy đủ do sự cố bất ngờ."
      }
    ]
  },
  {
    "id": "ja-g-n1-30-koto-nashi-ni",
    "language": "ja",
    "level": "N1",
    "pattern": "〜ことなしに (koto nashi ni)",
    "meaning": "không có (làm)",
    "formula": "Động từ thể từ điển (V-dict) + ことなしに",
    "note": "Thường theo sau là điều không thể xảy ra (“không có A thì B không thể xảy ra”). Gần với 〜ことなく (N2), nghĩa đơn giản là “không làm gì”.",
    "examples": [
      {
        "text": "基礎[きそ]を固[かた]めることなしに、応用[おうよう]力[りょく]は身[み]につかない。",
        "furigana": "基礎[きそ]を固[かた]めることなしに、応用[おうよう]力[りょく]は身[み]につかない。",
        "reading": "kisookatamerukotonashini、ouyouryokuhaminitsukanai。",
        "translation": "Bạn không thể tiếp thu các kỹ năng ứng dụng nếu không củng cố kiến ​​thức cơ bản."
      },
      {
        "text": "彼[かれ]は誰[だれ]にも相談[そうだん]することなしに、会社[かいしゃ]を辞[や]めてしまった。",
        "furigana": "彼[かれ]は誰[だれ]にも相談[そうだん]することなしに、会社[かいしゃ]を辞[や]めてしまった。",
        "reading": "karehadarenimosoudansurukotonashini、kaishaoyameteshimatta。",
        "translation": "Anh ấy rời công ty mà không hỏi ý kiến ​​ai."
      },
      {
        "text": "痛[いた]みを伴[ともな]うことなしに、この改革[かいかく]を成[な]し遂[と]げることはできない。",
        "furigana": "痛[いた]みを伴[ともな]うことなしに、この改革[かいかく]を成[な]し遂[と]げることはできない。",
        "reading": "itamiotomonaukotonashini、konokaikakuonashitogerukotohadekinai。",
        "translation": "Cuộc cải cách này không thể thực hiện được nếu không có đau đớn."
      }
    ]
  },
  {
    "id": "ja-g-n1-31-shimatsu-da",
    "language": "ja",
    "level": "N1",
    "pattern": "〜始末だ (shimatsu da)",
    "meaning": "cuối cùng (trong tình trạng tồi tệ); (sự việc) có đến mức này",
    "formula": "Động từ thể từ điển (V-dict) + 始末だ / この + 始末だ",
    "note": "Một kết cục tồi tệ sau một loạt sự kiện, được kể lại với vẻ bực tức. Thường đi kèm với とうとう, ついには, 挙げ句の果てに.",
    "examples": [
      {
        "text": "弟[おとうと]は遊[あそ]んでばかりいて、とうとう単位[たんい]が足[た]りずに留年[りゅうねん]する始末[しまつ]だ。",
        "furigana": "弟[おとうと]は遊[あそ]んでばかりいて、とうとう単位[たんい]が足[た]りずに留年[りゅうねん]する始末[しまつ]だ。",
        "reading": "otoutohaasondebakariite、toutoutanigatarizuniryuunensurushimatsuda。",
        "translation": "Em trai tôi chỉ chơi đùa và cuối cùng phải lưu lại một lớp vì không đủ tín chỉ."
      },
      {
        "text": "何[なん]度[ど]注意[ちゅうい]しても聞[き]かず、ついには客[きゃく]の前[まえ]で居眠[いねむ]りをする始末[しまつ]だった。",
        "furigana": "何[なん]度[ど]注意[ちゅうい]しても聞[き]かず、ついには客[きゃく]の前[まえ]で居眠[いねむ]りをする始末[しまつ]だった。",
        "reading": "nandochuuishitemokikazu、tsuinihakyakunomaedeinemuriosurushimatsudatta。",
        "translation": "Dù tôi có cảnh cáo bao nhiêu lần thì anh ấy vẫn không nghe và cuối cùng ngủ gục trước mặt khách."
      },
      {
        "text": "あれだけ準備[じゅんび]は万全[ばんぜん]だと言[い]っていたのに、この始末[しまつ]だ。",
        "furigana": "あれだけ準備[じゅんび]は万全[ばんぜん]だと言[い]っていたのに、この始末[しまつ]だ。",
        "reading": "aredakejunbihabanzendatoitteitanoni、konoshimatsuda。",
        "translation": "Dù tôi đã nói là mình đã chuẩn bị đầy đủ nhưng mọi chuyện lại kết thúc như thế này đây."
      }
    ]
  },
  {
    "id": "ja-g-n1-32-zu-jimai",
    "language": "ja",
    "level": "N1",
    "pattern": "〜ずじまい (zu jimai)",
    "meaning": "cuối cùng không bao giờ làm được; chưa bao giờ đến gần",
    "formula": "Động từ thể ない (V-nai) stem + ずじまい (する → せずじまい)",
    "note": "Tiếc nuối vì một hành động dự định đã không bao giờ xảy ra trước khi cơ hội trôi qua. Thông thường là 〜ずじまいだった / 〜ずじまいになった.",
    "examples": [
      {
        "text": "旅行[りょこう]中[ちゅう]は雨[あめ]続[つづ]きで、楽[たの]しみにしていた山[やま]には登[のぼ]らずじまいだった。",
        "furigana": "旅行[りょこう]中[ちゅう]は雨[あめ]続[つづ]きで、楽[たの]しみにしていた山[やま]には登[のぼ]らずじまいだった。",
        "reading": "ryokouchuuhaametsuzukide、tanoshiminishiteitayamanihanoborazujimaidatta。",
        "translation": "Trong suốt chuyến đi trời cứ mưa liên tục nên tôi không thể leo được ngọn núi mà mình mong đợi."
      },
      {
        "text": "忙[いそが]しさに追[お]われ、結局[けっきょく]恩師[おんし]にお礼[れい]を言[い]わずじまいになってしまった。",
        "furigana": "忙[いそが]しさに追[お]われ、結局[けっきょく]恩師[おんし]にお礼[れい]を言[い]わずじまいになってしまった。",
        "reading": "isogashisanioware、kekkyokuonshinioreioiwazujimaininatteshimatta。",
        "translation": "Tôi bận quá nên không cảm ơn được thầy."
      },
      {
        "text": "彼女[かのじょ]の本当[ほんとう]の気持[きも]ちは、とうとう聞[き]けずじまいだった。",
        "furigana": "彼女[かのじょ]の本当[ほんとう]の気持[きも]ちは、とうとう聞[き]けずじまいだった。",
        "reading": "kanojonohontounokimochiha、toutoukikezujimaidatta。",
        "translation": "Cuối cùng, tôi không thể nghe được cảm xúc thật sự của cô ấy."
      }
    ]
  },
  {
    "id": "ja-g-n1-33-zu-ni-wa-okanai-nai-de-wa-okanai",
    "language": "ja",
    "level": "N1",
    "pattern": "〜ずにはおかない / 〜ないではおかない (zu ni wa okanai / nai de wa okanai)",
    "meaning": "chắc chắn sẽ (làm); mặt khác không thể không (gây ra phản ứng)",
    "formula": "Động từ thể ない (V-nai) stem + ずにはおかない (する → せずにはおかない) / Động từ thể ない (V-nai) + ではおかない",
    "note": "Hai cách sử dụng: quyết tâm kiên quyết, hoặc điều gì đó chắc chắn gây ra cảm giác hoặc phản ứng. So sánh 〜ずにはいられない (N2), sự thôi thúc không thể cưỡng lại của bản thân.",
    "examples": [
      {
        "text": "彼女[かのじょ]の力強[ちからづよ]い歌声[うたごえ]は、聴[き]く者[もの]の心[こころ]を揺[ゆ]さぶらずにはおかない。",
        "furigana": "彼女[かのじょ]の力強[ちからづよ]い歌声[うたごえ]は、聴[き]く者[もの]の心[こころ]を揺[ゆ]さぶらずにはおかない。",
        "reading": "kanojonochikarazuyoiutagoeha、kikumononokokorooyusaburazunihaokanai。",
        "translation": "Giọng hát đầy nội lực của cô ấy không khỏi lay động trái tim người nghe."
      },
      {
        "text": "今度[こんど]という今度[こんど]は、真相[しんそう]を突[つ]き止[と]めずにはおかないぞ。",
        "furigana": "今度[こんど]という今度[こんど]は、真相[しんそう]を突[つ]き止[と]めずにはおかないぞ。",
        "reading": "kondotoiukondoha、shinsouotsukitomezunihaokanaizo。",
        "translation": "Lần này tôi không còn cách nào khác là phải tìm ra sự thật."
      },
      {
        "text": "政府[せいふ]の今回[こんかい]の決定[けってい]は、国民[こくみん]の反発[はんぱつ]を招[まね]かずにはおかないだろう。",
        "furigana": "政府[せいふ]の今回[こんかい]の決定[けってい]は、国民[こくみん]の反発[はんぱつ]を招[まね]かずにはおかないだろう。",
        "reading": "seifunokonkainoketteiha、kokuminnohanpatsuomanekazunihaokanaidarou。",
        "translation": "Quyết định của chính phủ có thể sẽ gây ra phản ứng dữ dội từ công chúng."
      }
    ]
  },
  {
    "id": "ja-g-n1-34-zu-ni-wa-sumanai-nai-de-wa-sumanai",
    "language": "ja",
    "level": "N1",
    "pattern": "〜ずにはすまない / 〜ないではすまない (zu ni wa sumanai / nai de wa sumanai)",
    "meaning": "phải (làm); sẽ không thoát khỏi nếu không (làm)",
    "formula": "Động từ thể ない (V-nai) stem + ずにはすまない (する → せずにはすまない) / Động từ thể ない (V-nai) + ではすまない",
    "note": "Nghĩa vụ xuất phát từ các chuẩn mực xã hội hoặc hoàn cảnh chứ không phải mong muốn cá nhân. 〜ずには済まされない là một biến thể mạnh hơn.",
    "examples": [
      {
        "text": "大切[たいせつ]な花瓶[かびん]を割[わ]ってしまったのだから、弁償[べんしょう]せずにはすまないだろう。",
        "furigana": "大切[たいせつ]な花瓶[かびん]を割[わ]ってしまったのだから、弁償[べんしょう]せずにはすまないだろう。",
        "reading": "taisetsunakabinowatteshimattanodakara、benshousezunihasumanaidarou。",
        "translation": "Tôi đã làm vỡ một chiếc bình quý giá nên tôi đoán là không thể không đền bù."
      },
      {
        "text": "これほどの不祥事[ふしょうじ]となれば、社長[しゃちょう]が責任[せきにん]を取[と]らずにはすまない。",
        "furigana": "これほどの不祥事[ふしょうじ]となれば、社長[しゃちょう]が責任[せきにん]を取[と]らずにはすまない。",
        "reading": "korehodonofushoujitonareba、shachougasekininotorazunihasumanai。",
        "translation": "Khi xảy ra vụ bê bối tầm cỡ này, tổng thống không thể không chịu trách nhiệm."
      },
      {
        "text": "取引[とりひき]先[さき]に迷惑[めいわく]をかけた以上[いじょう]、直接[ちょくせつ]謝[あやま]りに行[い]かないではすまない。",
        "furigana": "取引[とりひき]先[さき]に迷惑[めいわく]をかけた以上[いじょう]、直接[ちょくせつ]謝[あやま]りに行[い]かないではすまない。",
        "reading": "torihikisakinimeiwakuokaketaijou、chokusetsuayamariniikanaidehasumanai。",
        "translation": "Vì bạn đã gây rắc rối cho đối tác kinh doanh của mình nên không cần phải xin lỗi trực tiếp."
      }
    ]
  },
  {
    "id": "ja-g-n1-35-soba-kara",
    "language": "ja",
    "level": "N1",
    "pattern": "〜そばから (soba kara)",
    "meaning": "ngay khi (và lặp đi lặp lại)",
    "formula": "Động từ thể từ điển (V-dict) / Động từ thể た (V-ta) + そばから",
    "note": "Một mô hình lặp đi lặp lại trong đó hành động thứ hai hủy bỏ hành động đầu tiên, thường gây thất vọng. Không giống như 〜や否や hay 〜なり, nó không được sử dụng cho một sự kiện diễn ra một lần.",
    "examples": [
      {
        "text": "片付[かたづ]けるそばから、子[こ]どもたちがおもちゃを散[ち]らかしていく。",
        "furigana": "片付[かたづ]けるそばから、子[こ]どもたちがおもちゃを散[ち]らかしていく。",
        "reading": "katazukerusobakara、kodomotachigaomochaochirakashiteiku。",
        "translation": "Khi tôi đang dọn dẹp thì bọn trẻ bắt đầu vứt đồ chơi của chúng xuống."
      },
      {
        "text": "新[あたら]しい単語[たんご]は、覚[おぼ]えたそばから忘[わす]れてしまう。",
        "furigana": "新[あたら]しい単語[たんご]は、覚[おぼ]えたそばから忘[わす]れてしまう。",
        "reading": "atarashiitangoha、oboetasobakarawasureteshimau。",
        "translation": "Học từ mới là quên luôn."
      },
      {
        "text": "母[はは]がクッキーを焼[や]くそばから、弟[おとうと]がつまみ食[ぐ]いしてしまう。",
        "furigana": "母[はは]がクッキーを焼[や]くそばから、弟[おとうと]がつまみ食[ぐ]いしてしまう。",
        "reading": "hahagaクッキーoyakusobakara、otoutogatsumamiguishiteshimau。",
        "translation": "Trong khi mẹ tôi nướng bánh quy, em trai tôi lại ăn một ít."
      }
    ]
  },
  {
    "id": "ja-g-n1-36-tari-tomo",
    "language": "ja",
    "level": "N1",
    "pattern": "〜たりとも (tari tomo)",
    "meaning": "thậm chí không (một); không một",
    "formula": "Danh từ (N) (一 + counter) + たりとも",
    "note": "Gắn vào 一 + bộ đếm (一円, 一日, 一人, 一瞬) và theo sau là một câu phủ định hoặc cấm đoán. Ngoài ra 何人たりとも 'không có ai cả'.",
    "examples": [
      {
        "text": "税金[ぜいきん]を一[いち]円[えん]たりとも無駄[むだ]にしてはならない。",
        "furigana": "税金[ぜいきん]を一[いち]円[えん]たりとも無駄[むだ]にしてはならない。",
        "reading": "zeikinoichientaritomomudanishitehanaranai。",
        "translation": "Không nên lãng phí một đồng tiền thuế nào cả."
      },
      {
        "text": "手術[しゅじゅつ]中[ちゅう]は、一瞬[いっしゅん]たりとも気[き]を抜[ぬ]くことができない。",
        "furigana": "手術[しゅじゅつ]中[ちゅう]は、一瞬[いっしゅん]たりとも気[き]を抜[ぬ]くことができない。",
        "reading": "shujutsuchuuha、isshuntaritomokionukukotogadekinai。",
        "translation": "Trong quá trình phẫu thuật, bạn không thể thư giãn dù chỉ một giây."
      },
      {
        "text": "故郷[こきょう]で待[ま]つ家族[かぞく]のことを、一[いち]日[にち]たりとも忘[わす]れたことはない。",
        "furigana": "故郷[こきょう]で待[ま]つ家族[かぞく]のことを、一[いち]日[にち]たりとも忘[わす]れたことはない。",
        "reading": "kokyoudematsukazokunokotoo、ichinichitaritomowasuretakotohanai。",
        "translation": "Tôi chưa bao giờ quên, dù chỉ một ngày, việc gia đình đang chờ tôi ở quê nhà."
      }
    ]
  },
  {
    "id": "ja-g-n1-37-dani",
    "language": "ja",
    "level": "N1",
    "pattern": "〜だに (dani)",
    "meaning": "(chỉ); thậm chí không",
    "formula": "Động từ thể từ điển (V-dict) + だに / Danh từ (N) + だに",
    "note": "Cổ xưa; tồn tại chủ yếu trong các cụm từ cố định: 想像するだに / 考えるだに ('chỉ nghĩ về nó thôi'), 微動だにしない, 想像だにしない /夢想だにしない ('thậm chí không bao giờ tưởng tượng được').",
    "examples": [
      {
        "text": "あの事故[じこ]の瞬間[しゅんかん]は、思[おも]い出[だ]すだに身震[みぶる]いがする。",
        "furigana": "あの事故[じこ]の瞬間[しゅんかん]は、思[おも]い出[だ]すだに身震[みぶる]いがする。",
        "reading": "anojikonoshunkanha、omoidasudanimiburuigasuru。",
        "translation": "Tôi rùng mình khi nhớ lại khoảnh khắc xảy ra tai nạn đó."
      },
      {
        "text": "衛兵[えいへい]は一[いち]時間[じかん]、微動[びどう]だにせず立[た]ち続[つづ]けた。",
        "furigana": "衛兵[えいへい]は一[いち]時間[じかん]、微動[びどう]だにせず立[た]ち続[つづ]けた。",
        "reading": "eiheihaichijikan、bidoudanisezutachitsuzuketa。",
        "translation": "Người bảo vệ đứng bất động suốt một tiếng đồng hồ."
      },
      {
        "text": "自分[じぶん]の書[か]いた小説[しょうせつ]が映画[えいが]化[か]されるとは、想像[そうぞう]だにしなかった。",
        "furigana": "自分[じぶん]の書[か]いた小説[しょうせつ]が映画[えいが]化[か]されるとは、想像[そうぞう]だにしなかった。",
        "reading": "jibunnokaitashousetsugaeigakasarerutoha、souzoudanishinakatta。",
        "translation": "Tôi chưa bao giờ tưởng tượng rằng cuốn tiểu thuyết mình viết sẽ được dựng thành phim."
      }
    ]
  },
  {
    "id": "ja-g-n1-38-taru",
    "language": "ja",
    "level": "N1",
    "pattern": "〜たる (taru)",
    "meaning": "như (một ở vị trí của); phù hợp",
    "formula": "Danh từ (N) + たる + Danh từ (N) / Danh từ (N) + たるもの",
    "note": "Nhấn mạnh các nhiệm vụ hoặc phẩm giá được mong đợi ở một vai trò. 〜たる者 / 〜たるもの được theo sau bởi những gì một người như vậy nên (không) làm.",
    "examples": [
      {
        "text": "教師[きょうし]たる者[もの]、生徒[せいと]の前[まえ]で模範[もはん]を示[しめ]さなければならない。",
        "furigana": "教師[きょうし]たる者[もの]、生徒[せいと]の前[まえ]で模範[もはん]を示[しめ]さなければならない。",
        "reading": "kyoushitarumono、seitonomaedemohanoshimesanakerebanaranai。",
        "translation": "Là giáo viên thì phải làm gương trước mặt học sinh."
      },
      {
        "text": "一国[いっこく]の首相[しゅしょう]たる人物[じんぶつ]が、このような軽率[けいそつ]な発言[はつげん]をするとは嘆[なげ]かわしい。",
        "furigana": "一国[いっこく]の首相[しゅしょう]たる人物[じんぶつ]が、このような軽率[けいそつ]な発言[はつげん]をするとは嘆[なげ]かわしい。",
        "reading": "ikkokunoshushoutarujinbutsuga、konoyounakeisotsunahatsugenosurutohanagekawashii。",
        "translation": "Thật đáng trách khi một người là thủ tướng của một nước lại có thể phát biểu thiếu suy nghĩ như vậy."
      },
      {
        "text": "王者[おうじゃ]たる風格[ふうかく]が、彼[かれ]の立[た]ち姿[すがた]から漂[ただよ]っていた。",
        "furigana": "王者[おうじゃ]たる風格[ふうかく]が、彼[かれ]の立[た]ち姿[すがた]から漂[ただよ]っていた。",
        "reading": "oujatarufuukakuga、karenotachisugatakaratadayotteita。",
        "translation": "Khí chất của một vị vua tỏa ra từ thế đứng của anh ta."
      }
    ]
  },
  {
    "id": "ja-g-n1-39-tsu-tsu",
    "language": "ja",
    "level": "N1",
    "pattern": "〜つ〜つ (tsu ... tsu)",
    "meaning": "(làm) A và B luân phiên nhau; qua lại",
    "formula": "Động từ thể ます bỏ ます (V-masu) + つ + Động từ thể ます bỏ ます (V-masu) + つ",
    "note": "Chỉ trong các cụm từ có động từ trái nghĩa hoặc cặp chủ động/thụ động: 行きつ戻りつ, 持ちつ持たれつ, 抜きつ抜かれつ, 浮きつ沈みつ.",
    "examples": [
      {
        "text": "近所[きんじょ]の人[ひと]たちとは、持[も]ちつ持[も]たれつの関係[かんけい]でやってきた。",
        "furigana": "近所[きんじょ]の人[ひと]たちとは、持[も]ちつ持[も]たれつの関係[かんけい]でやってきた。",
        "reading": "kinjonohitotachitoha、mochitsumotaretsunokankeideyattekita。",
        "translation": "Tôi đến khu phố của mình trong mối quan hệ một đối một."
      },
      {
        "text": "彼[かれ]は決心[けっしん]がつかず、店[みせ]の前[まえ]を行[い]きつ戻[もど]りつしていた。",
        "furigana": "彼[かれ]は決心[けっしん]がつかず、店[みせ]の前[まえ]を行[い]きつ戻[もど]りつしていた。",
        "reading": "karehakesshingatsukazu、misenomaeoikitsumodoritsushiteita。",
        "translation": "Anh ấy đang đi đi lại lại trước cửa hàng, chưa quyết định được."
      },
      {
        "text": "ゴール直前[ちょくぜん]まで、二[に]台[だい]の車[くるま]は抜[ぬ]きつ抜[ぬ]かれつの接戦[せっせん]を繰[く]り広[ひろ]げた。",
        "furigana": "ゴール直前[ちょくぜん]まで、二[に]台[だい]の車[くるま]は抜[ぬ]きつ抜[ぬ]かれつの接戦[せっせん]を繰[く]り広[ひろ]げた。",
        "reading": "ゴールchokuzenmade、nidainokurumahanukitsunukaretsunosessenokurihirogeta。",
        "translation": "Cho đến ngay trước vạch đích, hai chiếc xe đã cận chiến, chiếc này vượt qua chiếc kia."
      }
    ]
  },
  {
    "id": "ja-g-n1-40-de-are-de-are-de-are",
    "language": "ja",
    "level": "N1",
    "pattern": "〜であれ / 〜であれ〜であれ (de are / de are ... de are)",
    "meaning": "sao cũng được (nó là vậy); bất cứ ai; dù A hay B",
    "formula": "Danh từ (N) + であれ / Từ để hỏi + であれ / Danh từ (N) + であれ + Danh từ (N) + であれ",
    "note": "Chữ viết tương đương với 〜でも / 〜だろうと. 〜であろうと và 〜であろうが là những biến thể gần giống nhau.",
    "examples": [
      {
        "text": "理由[りゆう]が何[なん]であれ、暴力[ぼうりょく]は決[けっ]して許[ゆる]されない。",
        "furigana": "理由[りゆう]が何[なん]であれ、暴力[ぼうりょく]は決[けっ]して許[ゆる]されない。",
        "reading": "riyuuganandeare、bouryokuhakesshiteyurusarenai。",
        "translation": "Dù vì lý do gì thì bạo lực cũng không bao giờ được dung thứ."
      },
      {
        "text": "相手[あいて]が誰[だれ]であれ、礼儀[れいぎ]をわきまえて接[せっ]するべきだ。",
        "furigana": "相手[あいて]が誰[だれ]であれ、礼儀[れいぎ]をわきまえて接[せっ]するべきだ。",
        "reading": "aitegadaredeare、reigiowakimaetesessurubekida。",
        "translation": "Dù người kia là ai thì bạn cũng nên đối xử lịch sự với họ."
      },
      {
        "text": "正社員[せいしゃいん]であれアルバイトであれ、安全[あんぜん]研修[けんしゅう]は全員[ぜんいん]が受[う]けなければならない。",
        "furigana": "正社員[せいしゃいん]であれアルバイトであれ、安全[あんぜん]研修[けんしゅう]は全員[ぜんいん]が受[う]けなければならない。",
        "reading": "seishaindeareアルバイトdeare、anzenkenshuuhazeningaukenakerebanaranai。",
        "translation": "Tất cả mọi người, dù làm việc toàn thời gian hay bán thời gian, đều phải trải qua khóa đào tạo về an toàn."
      }
    ]
  },
  {
    "id": "ja-g-n1-41-te-shikaru-beki-da",
    "language": "ja",
    "level": "N1",
    "pattern": "〜てしかるべきだ (te shikaru beki da)",
    "meaning": "nên làm; việc",
    "formula": "Động từ thể て (V-te) + しかるべきだ / Tính từ đuôi い (A-i)-ku + て + しかるべきだ / Tính từ đuôi な (A-na) + であって + しかるべきだ",
    "note": "Nói rõ điều gì là đúng đắn, thường ở dạng thụ động và thường hàm ý chỉ trích rằng điều đó đã không xảy ra. Tính từ しかるべき cũng có nghĩa là 'thích hợp'.",
    "examples": [
      {
        "text": "これだけの損害[そんがい]を出[だ]したのだから、経営[けいえい]陣[じん]は責任[せきにん]を問[と]われてしかるべきだ。",
        "furigana": "これだけの損害[そんがい]を出[だ]したのだから、経営[けいえい]陣[じん]は責任[せきにん]を問[と]われてしかるべきだ。",
        "reading": "koredakenosongaiodashitanodakara、keieijinhasekininotowareteshikarubekida。",
        "translation": "Ban quản lý phải chịu trách nhiệm vì đã gây ra thiệt hại lớn như vậy."
      },
      {
        "text": "長年[ながねん]会社[かいしゃ]に貢献[こうけん]してきた彼女[かのじょ]は、もっと評価[ひょうか]されてしかるべきだ。",
        "furigana": "長年[ながねん]会社[かいしゃ]に貢献[こうけん]してきた彼女[かのじょ]は、もっと評価[ひょうか]されてしかるべきだ。",
        "reading": "naganenkaishanikoukenshitekitakanojoha、mottohyoukasareteshikarubekida。",
        "translation": "Cô ấy xứng đáng được ghi nhận nhiều hơn vì những đóng góp của mình cho công ty trong những năm qua."
      },
      {
        "text": "子[こ]どもの安全[あんぜん]にかかわる問題[もんだい]なのだから、もっと早[はや]く対策[たいさく]が講[こう]じられてしかるべきだった。",
        "furigana": "子[こ]どもの安全[あんぜん]にかかわる問題[もんだい]なのだから、もっと早[はや]く対策[たいさく]が講[こう]じられてしかるべきだった。",
        "reading": "kodomonoanzennikakawarumondainanodakara、mottohayakutaisakugakoujirareteshikarubekidatta。",
        "translation": "Vì đây là vấn đề an toàn cho trẻ em nên cần có biện pháp ứng phó sớm hơn."
      }
    ]
  },
  {
    "id": "ja-g-n1-42-de-wa-aru-mai-shi",
    "language": "ja",
    "level": "N1",
    "pattern": "〜ではあるまいし (de wa aru mai shi)",
    "meaning": "nó không phải như thể (một); vì (một) không phải là",
    "formula": "Danh từ (N) + ではあるまいし / Động từ thể từ điển (V-dict) + の + ではあるまいし",
    "note": "Tiếp theo là một bản án, lời khuyên hoặc mệnh lệnh. Mặc dù là まい trang trọng nhưng nó vẫn phổ biến trong lời nói, đặc biệt là 〜じゃあるまいし.",
    "examples": [
      {
        "text": "子[こ]どもではあるまいし、自分[じぶん]のことくらい自分[じぶん]で決[き]めなさい。",
        "furigana": "子[こ]どもではあるまいし、自分[じぶん]のことくらい自分[じぶん]で決[き]めなさい。",
        "reading": "kodomodehaarumaishi、jibunnokotokuraijibundekimenasai。",
        "translation": "Bạn không phải là trẻ con nên hãy tự mình đưa ra quyết định."
      },
      {
        "text": "一生[いっしょう]会[あ]えなくなるわけではあるまいし、そんなに泣[な]かないで。",
        "furigana": "一生[いっしょう]会[あ]えなくなるわけではあるまいし、そんなに泣[な]かないで。",
        "reading": "isshouaenakunaruwakedehaarumaishi、sonnaninakanaide。",
        "translation": "Không phải là anh sẽ không bao giờ gặp lại em đâu nên đừng khóc nhiều nhé."
      },
      {
        "text": "神様[かみさま]じゃあるまいし、未来[みらい]のことなんか分[わ]かるわけがないよ。",
        "furigana": "神様[かみさま]じゃあるまいし、未来[みらい]のことなんか分[わ]かるわけがないよ。",
        "reading": "kamisamajaarumaishi、mirainokotonankawakaruwakeganaiyo。",
        "translation": "Tôi không phải là Chúa, và tôi không thể nào biết trước được điều gì về tương lai."
      }
    ]
  },
  {
    "id": "ja-g-n1-43-temae",
    "language": "ja",
    "level": "N1",
    "pattern": "〜手前 (temae)",
    "meaning": "kể từ đó (xem xét nó trông như thế nào đối với người khác); vì",
    "formula": "Động từ thể thông thường (V thường) / Danh từ (N) + の + 手前",
    "note": "Bởi vì những gì một người đã nói hoặc vị trí của một người trước mặt người khác, người ta cảm thấy buộc phải hành động theo một cách nhất định. Thường theo sau là 〜わけにはいかない hoặc 〜しかない.",
    "examples": [
      {
        "text": "部下[ぶか]の手前[てまえ]、上司[じょうし]の私[わたし]が弱音[よわね]を吐[は]くことはできなかった。",
        "furigana": "部下[ぶか]の手前[てまえ]、上司[じょうし]の私[わたし]が弱音[よわね]を吐[は]くことはできなかった。",
        "reading": "bukanotemae、joushinowatashigayowaneohakukotohadekinakatta。",
        "translation": "Là cấp trên, tôi không thể phàn nàn trước mặt cấp dưới."
      },
      {
        "text": "必[かなら]ず合格[ごうかく]すると宣言[せんげん]した手前[てまえ]、今[いま]さら受験[じゅけん]をやめるとは言[い]えない。",
        "furigana": "必[かなら]ず合格[ごうかく]すると宣言[せんげん]した手前[てまえ]、今[いま]さら受験[じゅけん]をやめるとは言[い]えない。",
        "reading": "kanarazugoukakusurutosengenshitatemae、imasarajukenoyamerutohaienai。",
        "translation": "Tôi không thể nói rằng bây giờ tôi sẽ dừng thi, mặc dù tôi đã tuyên bố rằng mình chắc chắn sẽ đậu."
      },
      {
        "text": "子[こ]どもたちに約束[やくそく]を守[まも]れと言[い]っている手前[てまえ]、親[おや]が約束[やくそく]を破[やぶ]るわけにはいかない。",
        "furigana": "子[こ]どもたちに約束[やくそく]を守[まも]れと言[い]っている手前[てまえ]、親[おや]が約束[やくそく]を破[やぶ]るわけにはいかない。",
        "reading": "kodomotachiniyakusokuomamoretoitteirutemae、oyagayakusokuoyaburuwakenihaikanai。",
        "translation": "Dù cha mẹ luôn dặn dò con cái phải giữ lời hứa nhưng họ không thể thất hứa."
      }
    ]
  },
  {
    "id": "ja-g-n1-44-te-mo-sashitsukae-nai",
    "language": "ja",
    "level": "N1",
    "pattern": "〜てもさしつかえない (te mo sashitsukae nai)",
    "meaning": "không sao cả; không có vấn đề gì nếu",
    "formula": "Động từ thể て (V-te) + もさしつかえない / Tính từ đuôi い (A-i)-ku + て + もさしつかえない / Tính từ đuôi な (A-na) + でもさしつかえない / Danh từ (N) + でもさしつかえない",
    "note": "Một 〜てもいい / 〜ても構わない trang trọng hơn, phổ biến trong kinh doanh, thông báo và hướng dẫn chính thức. Thường được viết 差し支えない.",
    "examples": [
      {
        "text": "書類[しょるい]は鉛筆[えんぴつ]で記入[きにゅう]してもさしつかえありません。",
        "furigana": "書類[しょるい]は鉛筆[えんぴつ]で記入[きにゅう]してもさしつかえありません。",
        "reading": "shoruihaenpitsudekinyuushitemosashitsukaearimasen。",
        "translation": "Bạn có thể điền tài liệu bằng bút chì."
      },
      {
        "text": "急[いそ]ぎの件[けん]でなければ、お返事[へんじ]は来週[らいしゅう]になってもさしつかえない。",
        "furigana": "急[いそ]ぎの件[けん]でなければ、お返事[へんじ]は来週[らいしゅう]になってもさしつかえない。",
        "reading": "isoginokendenakereba、ohenjiharaishuuninattemosashitsukaenai。",
        "translation": "Nếu không phải việc gấp thì bạn có thể trả lời đến tuần sau."
      },
      {
        "text": "応募[おうぼ]資格[しかく]は特[とく]にありませんので、未[み]経験[けいけん]の方[かた]でもさしつかえありません。",
        "furigana": "応募[おうぼ]資格[しかく]は特[とく]にありませんので、未[み]経験[けいけん]の方[かた]でもさしつかえありません。",
        "reading": "ouboshikakuhatokuniarimasennode、mikeikennokatademosashitsukaearimasen。",
        "translation": "Không có bằng cấp cụ thể để ứng tuyển nên những người chưa có kinh nghiệm đều được chào đón."
      }
    ]
  },
  {
    "id": "ja-g-n1-45-to-atte",
    "language": "ja",
    "level": "N1",
    "pattern": "〜とあって (to atte)",
    "meaning": "vì (trong một tình huống đặc biệt); chính xác là",
    "formula": "Động từ thể thông thường (V thường) / Tính từ đuôi い (A-i) / Tính từ đuôi な (A-na) / Danh từ (N) + とあって",
    "note": "Nguyên nhân là một tình huống đặc biệt, đáng chú ý và mệnh đề chính tường thuật kết quả tự nhiên, được quan sát thấy của nó. Phổ biến trong tin tức; không được dùng cho mong muốn hoặc yêu cầu của chính người nói.",
    "examples": [
      {
        "text": "三[さん]連休[れんきゅう]の初日[しょにち]とあって、高速[こうそく]道路[どうろ]はどこも大[だい]渋滞[じゅうたい]だった。",
        "furigana": "三[さん]連休[れんきゅう]の初日[しょにち]とあって、高速[こうそく]道路[どうろ]はどこも大[だい]渋滞[じゅうたい]だった。",
        "reading": "sanrenkyuunoshonichitoatte、kousokudourohadokomodaijuutaidatta。",
        "translation": "Đó là ngày đầu tiên của ba ngày cuối tuần nên khắp nơi trên đường cao tốc đều có lượng xe cộ đông đúc."
      },
      {
        "text": "人気[にんき]俳優[はいゆう]が来店[らいてん]するとあって、店[みせ]の前[まえ]には早朝[そうちょう]から長[なが]い行列[ぎょうれつ]ができた。",
        "furigana": "人気[にんき]俳優[はいゆう]が来店[らいてん]するとあって、店[みせ]の前[まえ]には早朝[そうちょう]から長[なが]い行列[ぎょうれつ]ができた。",
        "reading": "ninkihaiyuugaraitensurutoatte、misenomaenihasouchoukaranagaigyouretsugadekita。",
        "translation": "Vì một diễn viên nổi tiếng đang ghé thăm cửa hàng nên hàng dài người đã xếp hàng trước cửa hàng từ sáng sớm."
      },
      {
        "text": "十[じゅう]年[ねん]ぶりの再会[さいかい]とあって、二人[ふたり]は夜[よる]遅[おそ]くまで語[かた]り合[あ]った。",
        "furigana": "十[じゅう]年[ねん]ぶりの再会[さいかい]とあって、二人[ふたり]は夜[よる]遅[おそ]くまで語[かた]り合[あ]った。",
        "reading": "juunenburinosaikaitoatte、futarihayoruosokumadekatariatta。",
        "translation": "Vì đây là lần đoàn tụ đầu tiên sau mười năm nên cả hai đã trò chuyện đến khuya."
      }
    ]
  },
  {
    "id": "ja-g-n1-46-to-areba",
    "language": "ja",
    "level": "N1",
    "pattern": "〜とあれば (to areba)",
    "meaning": "nếu nó (cho); nếu (trường hợp đặc biệt như vậy) là",
    "formula": "Động từ thể thông thường (V thường) / Danh từ (N) + とあれば",
    "note": "Một điều kiện đặc biệt mà theo đó một người sẽ có một ngoại lệ hoặc làm điều gì đó khó khăn. Thường xuyên 〜のためとあれば.",
    "examples": [
      {
        "text": "子[こ]どもの命[いのち]を救[すく]うためとあれば、どんな犠牲[ぎせい]も惜[お]しまない。",
        "furigana": "子[こ]どもの命[いのち]を救[すく]うためとあれば、どんな犠牲[ぎせい]も惜[お]しまない。",
        "reading": "kodomonoinochiosukuutametoareba、donnagiseimooshimanai。",
        "translation": "Tôi sẽ không tiếc hy sinh để cứu mạng sống của một đứa trẻ."
      },
      {
        "text": "社長[しゃちょう]直々[じきじき]の頼[たの]みとあれば、断[ことわ]るわけにはいかない。",
        "furigana": "社長[しゃちょう]直々[じきじき]の頼[たの]みとあれば、断[ことわ]るわけにはいかない。",
        "reading": "shachoujikijikinotanomitoareba、kotowaruwakenihaikanai。",
        "translation": "Nếu nhận được yêu cầu trực tiếp từ chủ tịch thì tôi không thể từ chối được."
      },
      {
        "text": "好[す]きな作家[さっか]のサイン会[かい]とあれば、多少[たしょう]遠[とお]くても行[い]かずにはいられない。",
        "furigana": "好[す]きな作家[さっか]のサイン会[かい]とあれば、多少[たしょう]遠[とお]くても行[い]かずにはいられない。",
        "reading": "sukinasakkanoサインkaitoareba、tashoutookutemoikazunihairarenai。",
        "translation": "Nếu có buổi ký tặng của tác giả mình yêu thích thì mình cũng không thể không đi, dù có hơi xa một chút."
      }
    ]
  },
  {
    "id": "ja-g-n1-47-to-ii-to-ii",
    "language": "ja",
    "level": "N1",
    "pattern": "〜といい〜といい (to ii ... to ii)",
    "meaning": "cả A và B; về mặt A cũng như B",
    "formula": "Danh từ (N) + といい + Danh từ (N) + といい",
    "note": "Chọn ra hai khía cạnh làm bằng chứng cho đánh giá tổng thể, tích cực hoặc tiêu cực. Không giống như 〜も〜も thông thường, nó mang ý nghĩa phán đoán của người nói.",
    "examples": [
      {
        "text": "この旅館[りょかん]は、料理[りょうり]といい接客[せっきゃく]といい、申[もう]し分[ぶん]ない。",
        "furigana": "この旅館[りょかん]は、料理[りょうり]といい接客[せっきゃく]といい、申[もう]し分[ぶん]ない。",
        "reading": "konoryokanha、ryouritoiisekkyakutoii、moushibunnai。",
        "translation": "Nhà trọ này hoàn hảo vì đồ ăn và dịch vụ khách hàng tốt."
      },
      {
        "text": "色[いろ]といい形[かたち]といい、この器[うつわ]は私[わたし]の好[この]みにぴったりだ。",
        "furigana": "色[いろ]といい形[かたち]といい、この器[うつわ]は私[わたし]の好[この]みにぴったりだ。",
        "reading": "irotoiikatachitoii、konoutsuwahawatashinokonominipittarida。",
        "translation": "Chiếc bát này rất hợp khẩu vị của tôi, cả về màu sắc lẫn hình dáng."
      },
      {
        "text": "兄[あに]といい弟[おとうと]といい、あの家[いえ]の息子[むすこ]たちはどうしてこうも時間[じかん]にルーズなのだろう。",
        "furigana": "兄[あに]といい弟[おとうと]といい、あの家[いえ]の息子[むすこ]たちはどうしてこうも時間[じかん]にルーズなのだろう。",
        "reading": "anitoiiotoutotoii、anoienomusukotachihadoushitekoumojikanniルーズnanodarou。",
        "translation": "Không hiểu sao các con trai của gia đình đó, anh trai và em trai tôi lại buông thả thời gian đến thế."
      }
    ]
  },
  {
    "id": "ja-g-n1-48-to-itta-tokoro-da",
    "language": "ja",
    "level": "N1",
    "pattern": "〜といったところだ (to itta tokoro da)",
    "meaning": "; Về; ít nhiều",
    "formula": "Danh từ (N) / Động từ thể từ điển (V-dict) + といったところだ",
    "note": "Ước tính sơ bộ, khiêm tốn: số lượng hoặc mức độ không lớn. Thường đi kèm với せいぜい hoặc まあ. Ngoài ra 〜というところだ.",
    "examples": [
      {
        "text": "私[わたし]の料理[りょうり]の腕前[うでまえ]は、せいぜいカレーが作[つく]れるといったところだ。",
        "furigana": "私[わたし]の料理[りょうり]の腕前[うでまえ]は、せいぜいカレーが作[つく]れるといったところだ。",
        "reading": "watashinoryourinoudemaeha、seizeiカレーgatsukurerutoittatokoroda。",
        "translation": "Kỹ năng nấu nướng của tôi chỉ giới hạn ở việc nấu cà ri."
      },
      {
        "text": "通勤[つうきん]時間[じかん]は、ドアからドアまで三十分[さんじゅっぷん]といったところです。",
        "furigana": "通勤[つうきん]時間[じかん]は、ドアからドアまで三十分[さんじゅっぷん]といったところです。",
        "reading": "tsuukinjikanha、ドアkaraドアmadesanjuppuntoittatokorodesu。",
        "translation": "Thời gian đi lại từ nhà đến nhà khoảng 30 phút."
      },
      {
        "text": "今年[ことし]の売[う]り上[あ]げは、ほぼ昨年[さくねん]並[な]みといったところだ。",
        "furigana": "今年[ことし]の売[う]り上[あ]げは、ほぼ昨年[さくねん]並[な]みといったところだ。",
        "reading": "kotoshinouriageha、hobosakunennamitoittatokoroda。",
        "translation": "Doanh thu năm nay cũng xấp xỉ năm ngoái."
      }
    ]
  },
  {
    "id": "ja-g-n1-49-to-iedomo",
    "language": "ja",
    "level": "N1",
    "pattern": "〜といえども (to iedomo)",
    "meaning": "mặc dù; thậm chí (có người thích)",
    "formula": "Động từ thể thông thường (V thường) / Tính từ đuôi い (A-i) / Tính từ đuôi な (A-na) / Danh từ (N) + といえども",
    "note": "Phiên bản chính thức của 〜といっても / 〜であっても: ngay cả người có địa vị đó cũng không được miễn. Thường đi kèm với いかなる hoặc たとえ.",
    "examples": [
      {
        "text": "子[こ]どもといえども、一人[ひとり]の人間[にんげん]として尊重[そんちょう]されなければならない。",
        "furigana": "子[こ]どもといえども、一人[ひとり]の人間[にんげん]として尊重[そんちょう]されなければならない。",
        "reading": "kodomotoiedomo、hitorinoningentoshitesonchousarenakerebanaranai。",
        "translation": "Ngay cả trẻ em cũng phải được tôn trọng như một con người."
      },
      {
        "text": "いかなる権力[けんりょく]者[しゃ]といえども、法[ほう]の上[うえ]に立[た]つことは許[ゆる]されない。",
        "furigana": "いかなる権力[けんりょく]者[しゃ]といえども、法[ほう]の上[うえ]に立[た]つことは許[ゆる]されない。",
        "reading": "ikanarukenryokushatoiedomo、hounouenitatsukotohayurusarenai。",
        "translation": "Dù có quyền lực đến mấy cũng không thể đứng trên pháp luật."
      },
      {
        "text": "経験[けいけん]豊[ゆた]かなベテランといえども、この天候[てんこう]での登山[とざん]は危険[きけん]だ。",
        "furigana": "経験[けいけん]豊[ゆた]かなベテランといえども、この天候[てんこう]での登山[とざん]は危険[きけん]だ。",
        "reading": "keikenyutakanaベテランtoiedomo、konotenkoudenotozanhakikenda。",
        "translation": "Leo núi trong thời tiết này rất nguy hiểm, ngay cả đối với những cựu chiến binh giàu kinh nghiệm."
      }
    ]
  },
  {
    "id": "ja-g-n1-50-to-ittara-nai",
    "language": "ja",
    "level": "N1",
    "pattern": "〜といったらない (to ittara nai)",
    "meaning": "không thể diễn tả được; vô cùng; không thể diễn tả bằng lời",
    "formula": "Tính từ đuôi い (A-i) / Tính từ đuôi な (A-na) / Danh từ (N) + といったらない",
    "note": "Hoạt động cho cả cảm giác tích cực và tiêu cực. Hình thức thông thường: 〜ったらない, và 〜といったらありゃしない (chỉ phủ định).",
    "examples": [
      {
        "text": "決勝[けっしょう]戦[せん]で一点[いってん]差[さ]で負[ま]けたときの悔[くや]しさといったらなかった。",
        "furigana": "決勝[けっしょう]戦[せん]で一点[いってん]差[さ]で負[ま]けたときの悔[くや]しさといったらなかった。",
        "reading": "kesshousendeittensademaketatokinokuyashisatoittaranakatta。",
        "translation": "Tôi không thể nói rằng tôi thất vọng khi chúng tôi thua một điểm trong trận chung kết."
      },
      {
        "text": "新[あたら]しい部屋[へや]から見[み]る夜景[やけい]の美[うつく]しさといったらない。",
        "furigana": "新[あたら]しい部屋[へや]から見[み]る夜景[やけい]の美[うつく]しさといったらない。",
        "reading": "atarashiiheyakaramiruyakeinoutsukushisatoittaranai。",
        "translation": "Tôi không thể diễn tả hết vẻ đẹp của cảnh đêm từ căn phòng mới của tôi."
      },
      {
        "text": "あの人[ひと]の話[はなし]は同[おな]じことの繰[く]り返[かえ]しで、退屈[たいくつ]といったらない。",
        "furigana": "あの人[ひと]の話[はなし]は同[おな]じことの繰[く]り返[かえ]しで、退屈[たいくつ]といったらない。",
        "reading": "anohitonohanashihaonajikotonokurikaeshide、taikutsutoittaranai。",
        "translation": "Chuyện của người đó cứ lặp đi lặp lại một chuyện thôi, không hề nhàm chán chút nào."
      }
    ]
  },
  {
    "id": "ja-g-n1-51-to-kitara",
    "language": "ja",
    "level": "N1",
    "pattern": "〜ときたら (to kitara)",
    "meaning": "khi nói đến; đối với (khiếu nại)",
    "formula": "Danh từ (N) + ときたら",
    "note": "Giới thiệu một người hoặc vật quen thuộc mà người nói đã chán ngán; những gì tiếp theo là một lời phàn nàn. Đàm thoại.",
    "examples": [
      {
        "text": "うちの夫[おっと]ときたら、休[やす]みの日[ひ]は一日中[いちにちじゅう]ソファでごろごろしている。",
        "furigana": "うちの夫[おっと]ときたら、休[やす]みの日[ひ]は一日中[いちにちじゅう]ソファでごろごろしている。",
        "reading": "uchinoottotokitara、yasuminohihaichinichijuuソファdegorogoroshiteiru。",
        "translation": "Chồng tôi suốt ngày nghỉ nằm dài trên ghế sofa."
      },
      {
        "text": "最近[さいきん]のテレビ番組[ばんぐみ]ときたら、どの局[きょく]も似[に]たような内容[ないよう]ばかりだ。",
        "furigana": "最近[さいきん]のテレビ番組[ばんぐみ]ときたら、どの局[きょく]も似[に]たような内容[ないよう]ばかりだ。",
        "reading": "saikinnoテレビbangumitokitara、donokyokumonitayounanaiyoubakarida。",
        "translation": "Nói đến các chương trình truyền hình hiện nay đều có nội dung tương tự nhau."
      },
      {
        "text": "このパソコンときたら、肝心[かんじん]なときに限[かぎ]って固[かた]まってしまう。",
        "furigana": "このパソコンときたら、肝心[かんじん]なときに限[かぎ]って固[かた]まってしまう。",
        "reading": "konoパソコンtokitara、kanjinnatokinikagittekatamatteshimau。",
        "translation": "Máy tính này chỉ bị treo vào những thời điểm quan trọng."
      }
    ]
  },
  {
    "id": "ja-g-n1-52-to-shita-tokoro-de-ni-shita-tokoro-de",
    "language": "ja",
    "level": "N1",
    "pattern": "〜としたところで / 〜にしたところで (to shita tokoro de / ni shita tokoro de)",
    "meaning": "ngay cả khi; thậm chí giả sử; ngay cả đối với (ai đó)",
    "formula": "Động từ thể thông thường (V thường) / Danh từ (N) + としたところで / Danh từ (N) + にしたところで",
    "note": "Giống như 〜としても / 〜にしても, nhưng nhấn mạnh rằng kết quả sẽ không thay đổi. Bình thường: 〜としたって / 〜にしたって.",
    "examples": [
      {
        "text": "今[いま]から急[いそ]いだとしたところで、最終[さいしゅう]電車[でんしゃ]には間[ま]に合[あ]わないだろう。",
        "furigana": "今[いま]から急[いそ]いだとしたところで、最終[さいしゅう]電車[でんしゃ]には間[ま]に合[あ]わないだろう。",
        "reading": "imakaraisoidatoshitatokorode、saishuudenshanihamaniawanaidarou。",
        "translation": "Dù bây giờ có vội đi nữa thì tôi cũng không thể bắt kịp chuyến tàu cuối cùng."
      },
      {
        "text": "部長[ぶちょう]にしたところで、この問題[もんだい]の解決[かいけつ]策[さく]を持[も]っているわけではない。",
        "furigana": "部長[ぶちょう]にしたところで、この問題[もんだい]の解決[かいけつ]策[さく]を持[も]っているわけではない。",
        "reading": "buchounishitatokorode、konomondainokaiketsusakuomotteiruwakedehanai。",
        "translation": "Ngay cả khi bạn trở thành người quản lý, bạn cũng sẽ không có giải pháp cho vấn đề này."
      },
      {
        "text": "仮[かり]に予算[よさん]が倍[ばい]になったとしたところで、人手[ひとで]が足[た]りなければ計画[けいかく]は進[すす]まない。",
        "furigana": "仮[かり]に予算[よさん]が倍[ばい]になったとしたところで、人手[ひとで]が足[た]りなければ計画[けいかく]は進[すす]まない。",
        "reading": "kariniyosangabaininattatoshitatokorode、hitodegatarinakerebakeikakuhasusumanai。",
        "translation": "Ngay cả khi ngân sách tăng gấp đôi, kế hoạch sẽ không thể tiến hành nếu không đủ nhân lực."
      }
    ]
  },
  {
    "id": "ja-g-n1-53-to-wa",
    "language": "ja",
    "level": "N1",
    "pattern": "〜とは (to wa)",
    "meaning": "(nghĩ) rằng...!; Tôi ngạc nhiên rằng",
    "formula": "Động từ thể thông thường (V thường) / Tính từ đuôi い (A-i) / Tính từ đuôi な (A-na) / Danh từ (N) + とは",
    "note": "Có thể kết thúc câu, không để lại phản ứng, hoặc theo sau là 思わなかった, 驚いた, v.v. Khác với định nghĩa 〜とは ('X có nghĩa là ...').",
    "examples": [
      {
        "text": "あの真面目[まじめ]な彼[かれ]が、会社[かいしゃ]の金[かね]に手[て]をつけていたとは。",
        "furigana": "あの真面目[まじめ]な彼[かれ]が、会社[かいしゃ]の金[かね]に手[て]をつけていたとは。",
        "reading": "anomajimenakarega、kaishanokaneniteotsuketeitatoha。",
        "translation": "Tôi không biết rằng anh chàng nghiêm túc này đã nhúng tay vào tiền của công ty."
      },
      {
        "text": "十[じゅう]年[ねん]ぶりに訪[おとず]れた故郷[こきょう]が、これほど様変[さまが]わりしているとは思[おも]いもしなかった。",
        "furigana": "十[じゅう]年[ねん]ぶりに訪[おとず]れた故郷[こきょう]が、これほど様変[さまが]わりしているとは思[おも]いもしなかった。",
        "reading": "juunenburiniotozuretakokyouga、korehodosamagawarishiteirutohaomoimoshinakatta。",
        "translation": "Tôi không bao giờ ngờ rằng quê hương, nơi tôi đến thăm lần đầu tiên sau mười năm, lại khác đến thế."
      },
      {
        "text": "初[はじ]めて出場[しゅつじょう]した大会[たいかい]でいきなり優勝[ゆうしょう]するとは、本人[ほんにん]も驚[おどろ]いているに違[ちが]いない。",
        "furigana": "初[はじ]めて出場[しゅつじょう]した大会[たいかい]でいきなり優勝[ゆうしょう]するとは、本人[ほんにん]も驚[おどろ]いているに違[ちが]いない。",
        "reading": "hajimeteshutsujoushitataikaideikinariyuushousurutoha、honninmoodoroiteirunichigainai。",
        "translation": "Anh ấy chắc hẳn rất ngạc nhiên khi bất ngờ giành chiến thắng trong giải đấu lần đầu tiên mình tham gia."
      }
    ]
  },
  {
    "id": "ja-g-n1-54-to-bakari-ni",
    "language": "ja",
    "level": "N1",
    "pattern": "〜とばかりに (to bakari ni)",
    "meaning": "như muốn nói",
    "formula": "Câu + とばかりに",
    "note": "Mô tả thái độ hoặc cử chỉ của người khác dường như muốn nói điều gì đó không cần lời nói; không được sử dụng về bản thân. So sánh 〜んばかり (gần đạt đến trạng thái cực đoan).",
    "examples": [
      {
        "text": "店員[てんいん]は「早[はや]く帰[かえ]れ」とばかりに、私[わたし]たちのテーブルを片付[かたづ]け始[はじ]めた。",
        "furigana": "店員[てんいん]は「早[はや]く帰[かえ]れ」とばかりに、私[わたし]たちのテーブルを片付[かたづ]け始[はじ]めた。",
        "reading": "teninha「hayakukaere」tobakarini、watashitachinoテーブルokatazukehajimeta。",
        "translation": "Người phục vụ bắt đầu dọn bàn, bảo chúng tôi về nhà sớm."
      },
      {
        "text": "相手[あいて]のミスを見[み]て、彼[かれ]はここぞとばかりに攻[せ]め込[こ]んだ。",
        "furigana": "相手[あいて]のミスを見[み]て、彼[かれ]はここぞとばかりに攻[せ]め込[こ]んだ。",
        "reading": "aitenoミスomite、karehakokozotobakarinisemekonda。",
        "translation": "Nhận thấy sai lầm của đối thủ, anh ta tấn công bằng toàn lực."
      },
      {
        "text": "息子[むすこ]は待[ま]ってましたとばかりに、誕生[たんじょう]日[び]プレゼントの包[つつ]みを開[あ]けた。",
        "furigana": "息子[むすこ]は待[ま]ってましたとばかりに、誕生[たんじょう]日[び]プレゼントの包[つつ]みを開[あ]けた。",
        "reading": "musukohamattemashitatobakarini、tanjoubiプレゼントnotsutsumioaketa。",
        "translation": "Con trai tôi mở quà sinh nhật như thể nó đã chờ đợi từ lâu."
      }
    ]
  },
  {
    "id": "ja-g-n1-55-to-mo-naku-to-mo-nashi-ni",
    "language": "ja",
    "level": "N1",
    "pattern": "〜ともなく / 〜ともなしに (to mo naku / to mo nashi ni)",
    "meaning": "không có ý gì; nhàn rỗi; (với các từ để hỏi) không có",
    "formula": "Động từ thể từ điển (V-dict) + ともなく / Động từ thể từ điển (V-dict) + ともなしに / Từ để hỏi + (particle) + ともなく",
    "note": "Động từ tương tự thường được lặp lại (見るともなく見る). Với các từ để hỏi: どこからともなく 'đặc biệt là từ hư không', 誰からともなく 'ai đó hay ai đó'.",
    "examples": [
      {
        "text": "電車[でんしゃ]の中[なか]で、隣[となり]の二人[ふたり]の会話[かいわ]を聞[き]くともなく聞[き]いていた。",
        "furigana": "電車[でんしゃ]の中[なか]で、隣[となり]の二人[ふたり]の会話[かいわ]を聞[き]くともなく聞[き]いていた。",
        "reading": "denshanonakade、tonarinofutarinokaiwaokikutomonakukiiteita。",
        "translation": "Trên tàu, tôi đang nghe cuộc trò chuyện giữa hai người bên cạnh mà không hề suy nghĩ."
      },
      {
        "text": "窓[まど]の外[そと]を見[み]るともなしに眺[なが]めていると、雪[ゆき]がちらつき始[はじ]めた。",
        "furigana": "窓[まど]の外[そと]を見[み]るともなしに眺[なが]めていると、雪[ゆき]がちらつき始[はじ]めた。",
        "reading": "madonosotoomirutomonashininagameteiruto、yukigachiratsukihajimeta。",
        "translation": "Khi tôi nhìn ra ngoài cửa sổ, tuyết bắt đầu rơi."
      },
      {
        "text": "どこからともなく、焼[や]き魚[ざかな]のいい匂[にお]いが漂[ただよ]ってきた。",
        "furigana": "どこからともなく、焼[や]き魚[ざかな]のいい匂[にお]いが漂[ただよ]ってきた。",
        "reading": "dokokaratomonaku、yakizakananoiinioigatadayottekita。",
        "translation": "Mùi cá nướng không biết từ đâu bay ra."
      }
    ]
  },
  {
    "id": "ja-g-n1-56-nai-made-mo",
    "language": "ja",
    "level": "N1",
    "pattern": "〜ないまでも (nai made mo)",
    "meaning": "ngay cả khi không (ở mức độ đó), ít nhất là chỉ",
    "formula": "Động từ thể ない (V-nai) + までも",
    "note": "Phần đầu nêu tên một mức độ cao chưa đạt được; thứ hai là mức độ thấp hơn, có thể chấp nhận được, thường kèm theo せめて, 少なくとも hoặc lời khuyên.",
    "examples": [
      {
        "text": "毎日[まいにち]とは言[い]わないまでも、週[しゅう]に一[いち]度[ど]くらいは実家[じっか]に電話[でんわ]しなさい。",
        "furigana": "毎日[まいにち]とは言[い]わないまでも、週[しゅう]に一[いち]度[ど]くらいは実家[じっか]に電話[でんわ]しなさい。",
        "reading": "mainichitohaiwanaimademo、shuuniichidokuraihajikkanidenwashinasai。",
        "translation": "Hãy gọi cho bố mẹ bạn ít nhất một lần một tuần, nếu không phải là hàng ngày."
      },
      {
        "text": "優勝[ゆうしょう]はできないまでも、せめて決勝[けっしょう]までは勝[か]ち進[すす]みたい。",
        "furigana": "優勝[ゆうしょう]はできないまでも、せめて決勝[けっしょう]までは勝[か]ち進[すす]みたい。",
        "reading": "yuushouhadekinaimademo、semetekesshoumadehakachisusumitai。",
        "translation": "Dù không thể thắng thì ít nhất tôi cũng muốn lọt vào trận chung kết."
      },
      {
        "text": "完璧[かんぺき]には理解[りかい]できないまでも、大[おお]まかな流[なが]れはつかんでおくべきだ。",
        "furigana": "完璧[かんぺき]には理解[りかい]できないまでも、大[おお]まかな流[なが]れはつかんでおくべきだ。",
        "reading": "kanpekiniharikaidekinaimademo、oomakananagarehatsukandeokubekida。",
        "translation": "Ngay cả khi bạn không hiểu nó hoàn toàn, bạn cũng nên nắm được ý tưởng chung về dòng chảy."
      }
    ]
  },
  {
    "id": "ja-g-n1-57-nai-mono-de-mo-nai",
    "language": "ja",
    "level": "N1",
    "pattern": "〜ないものでもない (nai mono de mo nai)",
    "meaning": "điều đó không phải là không thể; có thể (trong một số điều kiện)",
    "formula": "Động từ thể ない (V-nai) + ものでもない",
    "note": "Một cách vòng vo, có phần miễn cưỡng để thừa nhận một khả năng. Tương tự như 〜ないことはない (N3) nhưng cứng hơn.",
    "examples": [
      {
        "text": "条件[じょうけん]次第[しだい]では、その仕事[しごと]を引[ひ]き受[う]けないものでもない。",
        "furigana": "条件[じょうけん]次第[しだい]では、その仕事[しごと]を引[ひ]き受[う]けないものでもない。",
        "reading": "joukenshidaideha、sonoshigotoohikiukenaimonodemonai。",
        "translation": "Không phải là tôi sẽ không nhận công việc tùy theo điều kiện."
      },
      {
        "text": "今[いま]から全力[ぜんりょく]で走[はし]れば、終電[しゅうでん]に間[ま]に合[あ]わないものでもない。",
        "furigana": "今[いま]から全力[ぜんりょく]で走[はし]れば、終電[しゅうでん]に間[ま]に合[あ]わないものでもない。",
        "reading": "imakarazenryokudehashireba、shuudennimaniawanaimonodemonai。",
        "translation": "Nếu từ bây giờ bạn chạy nhanh nhất có thể thì bạn sẽ không bị lỡ chuyến tàu cuối cùng."
      },
      {
        "text": "彼[かれ]の言[い]い分[ぶん]も分[わ]からないものでもないが、やはり規則[きそく]は規則[きそく]だ。",
        "furigana": "彼[かれ]の言[い]い分[ぶん]も分[わ]からないものでもないが、やはり規則[きそく]は規則[きそく]だ。",
        "reading": "karenoiibunmowakaranaimonodemonaiga、yaharikisokuhakisokuda。",
        "translation": "Không phải là tôi không hiểu anh ấy đang nói gì, nhưng quy tắc rốt cuộc vẫn là quy tắc."
      }
    ]
  },
  {
    "id": "ja-g-n1-58-nagara-ni-nagara-no",
    "language": "ja",
    "level": "N1",
    "pattern": "〜ながらに / 〜ながらの (nagara ni / nagara no)",
    "meaning": "như (đã từng); trong khi còn lại; kể từ khi (sinh)",
    "formula": "Danh từ (N) + ながらに / Danh từ (N) + ながらの + Danh từ (N) / Động từ thể ます bỏ ます (V-masu) + ながらに",
    "note": "Giới hạn trong việc thiết lập các biểu thức: 昔ながら, 涙ながら, 生まれながら, いつもながら, いながらにして ('không rời khỏi chỗ của mình').",
    "examples": [
      {
        "text": "この町[まち]には、昔[むかし]ながらの手作[てづく]りの和菓子[わがし]屋[や]が今[いま]も残[のこ]っている。",
        "furigana": "この町[まち]には、昔[むかし]ながらの手作[てづく]りの和菓子[わがし]屋[や]が今[いま]も残[のこ]っている。",
        "reading": "konomachiniha、mukashinagaranotezukurinowagashiyagaimamonokotteiru。",
        "translation": "Thị trấn này vẫn còn những cửa hàng bánh kẹo Nhật Bản thủ công kiểu cũ."
      },
      {
        "text": "被害[ひがい]者[しゃ]の母親[ははおや]は、涙[なみだ]ながらに事件[じけん]当日[とうじつ]の様子[ようす]を語[かた]った。",
        "furigana": "被害[ひがい]者[しゃ]の母親[ははおや]は、涙[なみだ]ながらに事件[じけん]当日[とうじつ]の様子[ようす]を語[かた]った。",
        "reading": "higaishanohahaoyaha、namidanagaranijikentoujitsunoyousuokatatta。",
        "translation": "Mẹ nạn nhân rơi nước mắt kể lại chuyện xảy ra vào ngày xảy ra vụ việc."
      },
      {
        "text": "彼女[かのじょ]は生[う]まれながらに優[すぐ]れた音感[おんかん]を持[も]っていた。",
        "furigana": "彼女[かのじょ]は生[う]まれながらに優[すぐ]れた音感[おんかん]を持[も]っていた。",
        "reading": "kanojohaumarenagaranisuguretaonkanomotteita。",
        "translation": "Cô ấy sinh ra đã có khả năng cảm thụ cao độ tuyệt vời."
      }
    ]
  },
  {
    "id": "ja-g-n1-59-nakushite-wa",
    "language": "ja",
    "level": "N1",
    "pattern": "〜なくして(は) (nakushite wa)",
    "meaning": "không có (thứ gì đó thiết yếu), (không thể)",
    "formula": "Danh từ (N) + なくして(は)",
    "note": "Tiếp theo là tiêu cực hoặc không thể; nhấn mạnh rằng danh từ là không thể thiếu. Nhấn mạnh và mang tính văn học hơn 〜なしに(は).",
    "examples": [
      {
        "text": "地域[ちいき]住民[じゅうみん]の理解[りかい]なくして、この計画[けいかく]の成功[せいこう]はあり得[え]ない。",
        "furigana": "地域[ちいき]住民[じゅうみん]の理解[りかい]なくして、この計画[けいかく]の成功[せいこう]はあり得[え]ない。",
        "reading": "chiikijuuminnorikainakushite、konokeikakunoseikouhaarienai。",
        "translation": "Kế hoạch này không thể thành công nếu không có sự thấu hiểu của người dân địa phương."
      },
      {
        "text": "失敗[しっぱい]なくしては、本当[ほんとう]の成長[せいちょう]は得[え]られない。",
        "furigana": "失敗[しっぱい]なくしては、本当[ほんとう]の成長[せいちょう]は得[え]られない。",
        "reading": "shippainakushiteha、hontounoseichouhaerarenai。",
        "translation": "Không thể đạt được sự tăng trưởng thực sự nếu không có thất bại."
      },
      {
        "text": "多[おお]くの支援[しえん]者[しゃ]の協力[きょうりょく]なくしては、この映画[えいが]は完成[かんせい]しなかっただろう。",
        "furigana": "多[おお]くの支援[しえん]者[しゃ]の協力[きょうりょく]なくしては、この映画[えいが]は完成[かんせい]しなかっただろう。",
        "reading": "ookunoshienshanokyouryokunakushiteha、konoeigahakanseishinakattadarou。",
        "translation": "Bộ phim này sẽ không thể hoàn thành nếu không có sự hợp tác của rất nhiều người ủng hộ."
      }
    ]
  },
  {
    "id": "ja-g-n1-60-nashi-ni-wa",
    "language": "ja",
    "level": "N1",
    "pattern": "〜なしに(は) (nashi ni wa)",
    "meaning": "không có",
    "formula": "Danh từ (N) + なしに(は)",
    "note": "なしに đơn giản có nghĩa là 'không có'; なしには được theo sau bởi âm ('không thể ... không có'). Hội thoại thường sử dụng 〜なしで.",
    "examples": [
      {
        "text": "彼[かれ]は何[なん]の連絡[れんらく]もなしに、三日間[みっかかん]会社[かいしゃ]を休[やす]んだ。",
        "furigana": "彼[かれ]は何[なん]の連絡[れんらく]もなしに、三日間[みっかかん]会社[かいしゃ]を休[やす]んだ。",
        "reading": "karehanannorenrakumonashini、mikkakankaishaoyasunda。",
        "translation": "Anh ấy đã vắng mặt ba ngày mà không báo trước."
      },
      {
        "text": "事前[じぜん]の許可[きょか]なしには、この区域[くいき]に立[た]ち入[い]ることはできません。",
        "furigana": "事前[じぜん]の許可[きょか]なしには、この区域[くいき]に立[た]ち入[い]ることはできません。",
        "reading": "jizennokyokanashiniha、konokuikinitachiirukotohadekimasen。",
        "translation": "Không ai được vào khu vực này nếu không có sự cho phép trước."
      },
      {
        "text": "この話[はなし]は、涙[なみだ]なしには聞[き]けない。",
        "furigana": "この話[はなし]は、涙[なみだ]なしには聞[き]けない。",
        "reading": "konohanashiha、namidanashinihakikenai。",
        "translation": "Nghe câu chuyện này mà không cầm được nước mắt."
      }
    ]
  },
  {
    "id": "ja-g-n1-61-nara-iza-shirazu-wa-iza-shirazu",
    "language": "ja",
    "level": "N1",
    "pattern": "〜ならいざしらず / 〜はいざしらず (nara iza shirazu / wa iza shirazu)",
    "meaning": "nó có thể khác đối với ..., nhưng; Tôi không biết về ..., nhưng",
    "formula": "Danh từ (N) + ならいざしらず / Danh từ (N) + はいざしらず / Động từ thể thông thường (V thường) + (の) + ならいざしらず",
    "note": "Trường hợp đầu tiên có thể được miễn hoặc không xác định được; trường hợp thực tế được xét xử nghiêm khắc hơn. Gần giống với 〜ならまだしも, nhưng mang tính văn chương hơn.",
    "examples": [
      {
        "text": "子[こ]どもならいざしらず、大人[おとな]がこんな簡単[かんたん]な漢字[かんじ]も読[よ]めないとは情[なさ]けない。",
        "furigana": "子[こ]どもならいざしらず、大人[おとな]がこんな簡単[かんたん]な漢字[かんじ]も読[よ]めないとは情[なさ]けない。",
        "reading": "kodomonaraizashirazu、otonagakonnakantannakanjimoyomenaitohanasakenai。",
        "translation": "Thật thảm hại khi người lớn thậm chí có thể đọc được những chữ kanji đơn giản như vậy, ngay cả khi họ là trẻ em."
      },
      {
        "text": "昔[むかし]はいざしらず、今[いま]の時代[じだい]に手書[てが]きの履歴[りれき]書[しょ]にこだわる必要[ひつよう]はないだろう。",
        "furigana": "昔[むかし]はいざしらず、今[いま]の時代[じだい]に手書[てが]きの履歴[りれき]書[しょ]にこだわる必要[ひつよう]はないだろう。",
        "reading": "mukashihaizashirazu、imanojidainitegakinorirekishonikodawaruhitsuyouhanaidarou。",
        "translation": "Ngày nay không cần thiết phải nhấn mạnh vào sơ yếu lý lịch viết tay."
      },
      {
        "text": "素人[しろうと]ならいざしらず、プロの料理[りょうり]人[にん]が塩[しお]と砂糖[さとう]を間違[まちが]えるなんて。",
        "furigana": "素人[しろうと]ならいざしらず、プロの料理[りょうり]人[にん]が塩[しお]と砂糖[さとう]を間違[まちが]えるなんて。",
        "reading": "shiroutonaraizashirazu、プロnoryouriningashiotosatouomachigaerunante。",
        "translation": "Không cần phải là dân nghiệp dư cũng biết đầu bếp chuyên nghiệp có thể nhầm muối với đường."
      }
    ]
  },
  {
    "id": "ja-g-n1-62-nara-mada-shimo",
    "language": "ja",
    "level": "N1",
    "pattern": "〜ならまだしも (nara mada shimo)",
    "meaning": "nếu là ..., nó sẽ là một chuyện (nhưng)",
    "formula": "Danh từ (N) + ならまだしも / Động từ thể thông thường (V thường) + (の) + ならまだしも",
    "note": "Trường hợp đầu tiên có thể chấp nhận được; tình hình thực tế còn tồi tệ hơn. Mang tính trò chuyện nhiều hơn 〜ならいざしらず. Biến thể: 〜はまだしも.",
    "examples": [
      {
        "text": "一[いち]度[ど]ならまだしも、同[おな]じミスを三[さん]度[ど]も繰[く]り返[かえ]すのは問題[もんだい]だ。",
        "furigana": "一[いち]度[ど]ならまだしも、同[おな]じミスを三[さん]度[ど]も繰[く]り返[かえ]すのは問題[もんだい]だ。",
        "reading": "ichidonaramadashimo、onajiミスosandomokurikaesunohamondaida。",
        "translation": "Làm một lần thì không sao, nhưng nếu mắc cùng một lỗi ba lần thì sẽ thành vấn đề."
      },
      {
        "text": "遅刻[ちこく]するならまだしも、連絡[れんらく]もせずに休[やす]むのは社会[しゃかい]人[じん]として失格[しっかく]だ。",
        "furigana": "遅刻[ちこく]するならまだしも、連絡[れんらく]もせずに休[やす]むのは社会[しゃかい]人[じん]として失格[しっかく]だ。",
        "reading": "chikokusurunaramadashimo、renrakumosezuniyasumunohashakaijintoshiteshikkakuda。",
        "translation": "Nếu bạn đến muộn thì không sao, nhưng bạn sẽ bị loại khỏi tư cách thành viên của xã hội nếu bạn nghỉ một ngày mà không báo cho tôi."
      },
      {
        "text": "冗談[じょうだん]で言[い]うならまだしも、本気[ほんき]でそう思[おも]っているのなら問題[もんだい]だ。",
        "furigana": "冗談[じょうだん]で言[い]うならまだしも、本気[ほんき]でそう思[おも]っているのなら問題[もんだい]だ。",
        "reading": "joudandeiunaramadashimo、honkidesouomotteirunonaramondaida。",
        "translation": "Bạn đùa thì không sao, nhưng nếu bạn thực sự muốn nói như vậy thì đó là vấn đề."
      }
    ]
  },
  {
    "id": "ja-g-n1-63-nari",
    "language": "ja",
    "level": "N1",
    "pattern": "〜なり (nari)",
    "meaning": "ngay một lần; khoảnh khắc",
    "formula": "Động từ thể từ điển (V-dict) + なり",
    "note": "Cả hai hành động đều có cùng chủ đề (thường là ngôi thứ ba) và hành động thứ hai thường bất ngờ. Không dành cho hành động hoặc kế hoạch tương lai của chính người nói. Khác với 〜なり〜なり và 〜なりに.",
    "examples": [
      {
        "text": "娘[むすめ]は学校[がっこう]から帰[かえ]ってくるなり、自分[じぶん]の部屋[へや]に閉[と]じこもってしまった。",
        "furigana": "娘[むすめ]は学校[がっこう]から帰[かえ]ってくるなり、自分[じぶん]の部屋[へや]に閉[と]じこもってしまった。",
        "reading": "musumehagakkoukarakaettekurunari、jibunnoheyanitojikomotteshimatta。",
        "translation": "Con gái tôi vừa đi học về là nhốt mình trong phòng."
      },
      {
        "text": "彼[かれ]は受話器[じゅわき]を取[と]るなり、大声[おおごえ]で怒鳴[どな]り始[はじ]めた。",
        "furigana": "彼[かれ]は受話器[じゅわき]を取[と]るなり、大声[おおごえ]で怒鳴[どな]り始[はじ]めた。",
        "reading": "karehajuwakiotorunari、oogoededonarihajimeta。",
        "translation": "Anh ta nhấc máy và bắt đầu la hét."
      },
      {
        "text": "父[ちち]は一口[ひとくち]食[た]べるなり、「懐[なつ]かしい味[あじ]だ」とつぶやいた。",
        "furigana": "父[ちち]は一口[ひとくち]食[た]べるなり、「懐[なつ]かしい味[あじ]だ」とつぶやいた。",
        "reading": "chichihahitokuchitaberunari、「natsukashiiajida」totsubuyaita。",
        "translation": "Bố tôi vừa cắn một miếng, ông đã lẩm bẩm: ``Thật hoài niệm.''"
      }
    ]
  },
  {
    "id": "ja-g-n1-64-nari-nari",
    "language": "ja",
    "level": "N1",
    "pattern": "〜なり〜なり (nari ... nari)",
    "meaning": "A hoặc B; A hay B hay gì đó",
    "formula": "Danh từ (N) + なり + Danh từ (N) + なり / Động từ thể từ điển (V-dict) + なり + Động từ thể từ điển (V-dict) + なり",
    "note": "Đưa ra các lựa chọn mẫu và thường được theo sau bởi một gợi ý, yêu cầu hoặc mệnh lệnh chứ không phải một sự kiện trong quá khứ. Một 〜なり có thể có nghĩa là 'hoặc cái gì đó' (お茶なり).",
    "examples": [
      {
        "text": "分[わ]からないことがあれば、先生[せんせい]に聞[き]くなり辞書[じしょ]で調[しら]べるなりしなさい。",
        "furigana": "分[わ]からないことがあれば、先生[せんせい]に聞[き]くなり辞書[じしょ]で調[しら]べるなりしなさい。",
        "reading": "wakaranaikotogaareba、senseinikikunarijishodeshiraberunarishinasai。",
        "translation": "Có gì không hiểu thì hỏi giáo viên hoặc tra từ điển."
      },
      {
        "text": "週末[しゅうまつ]は、映画[えいが]なり買[か]い物[もの]なり、好[す]きなことをして過[す]ごすといい。",
        "furigana": "週末[しゅうまつ]は、映画[えいが]なり買[か]い物[もの]なり、好[す]きなことをして過[す]ごすといい。",
        "reading": "shuumatsuha、eiganarikaimononari、sukinakotooshitesugosutoii。",
        "translation": "Bạn nên dành những ngày cuối tuần để làm những việc mình thích như xem phim hoặc mua sắm."
      },
      {
        "text": "結果[けっか]が出[で]たら、電話[でんわ]なりメールなりで知[し]らせてください。",
        "furigana": "結果[けっか]が出[で]たら、電話[でんわ]なりメールなりで知[し]らせてください。",
        "reading": "kekkagadetara、denwanariメールnarideshirasetekudasai。",
        "translation": "Khi nhận được kết quả, vui lòng cho chúng tôi biết qua điện thoại hoặc email."
      }
    ]
  },
  {
    "id": "ja-g-n1-65-nari-ni-nari-no",
    "language": "ja",
    "level": "N1",
    "pattern": "〜なりに / 〜なりの (nari ni / nari no)",
    "meaning": "theo cách riêng của mình; trong chừng mực (giới hạn của một người) cho phép",
    "formula": "Danh từ (N) + なりに / Danh từ (N) + なりの + Danh từ (N) / Tính từ đuôi い (A-i) + なりに / Động từ thể thông thường (V thường) + なりに",
    "note": "Chấp nhận một giới hạn (tuổi, khả năng, kích thước) và nói rằng điều gì đó đã được thực hiện hoặc có giá trị trong giới hạn đó. Có thể nghe có vẻ trịch thượng nếu dùng về cấp trên.",
    "examples": [
      {
        "text": "子[こ]どもは子[こ]どもなりに、親[おや]のことを心配[しんぱい]しているものだ。",
        "furigana": "子[こ]どもは子[こ]どもなりに、親[おや]のことを心配[しんぱい]しているものだ。",
        "reading": "kodomohakodomonarini、oyanokotooshinpaishiteirumonoda。",
        "translation": "Trẻ lo lắng cho bố mẹ theo cách riêng của mình."
      },
      {
        "text": "自分[じぶん]なりに努力[どりょく]したつもりだが、結果[けっか]は思[おも]わしくなかった。",
        "furigana": "自分[じぶん]なりに努力[どりょく]したつもりだが、結果[けっか]は思[おも]わしくなかった。",
        "reading": "jibunnarinidoryokushitatsumoridaga、kekkahaomowashikunakatta。",
        "translation": "Tôi tưởng mình đã cố gắng hết sức nhưng kết quả lại không như tôi mong đợi."
      },
      {
        "text": "狭[せま]い部屋[へや]には狭[せま]いなりの良[よ]さがある。",
        "furigana": "狭[せま]い部屋[へや]には狭[せま]いなりの良[よ]さがある。",
        "reading": "semaiheyanihasemainarinoyosagaaru。",
        "translation": "Phòng nhỏ cũng có cái lợi của nó."
      }
    ]
  },
  {
    "id": "ja-g-n1-66-ni-wa-ataranai",
    "language": "ja",
    "level": "N1",
    "pattern": "〜には当たらない (ni wa ataranai)",
    "meaning": "không cần; nó không có giá trị (ngạc nhiên, v.v.)",
    "formula": "Động từ thể từ điển (V-dict) + には当たらない / Danh từ (N) + には当たらない",
    "note": "Dùng với các động từ phản ứng: 驚く, 責める, 非難する, 心配する, 悲しむ, 賞賛する. Tình hình không đảm bảo cho phản ứng đó.",
    "examples": [
      {
        "text": "彼[かれ]の実力[じつりょく]を考[かんが]えれば、今回[こんかい]の優勝[ゆうしょう]は驚[おどろ]くには当[あ]たらない。",
        "furigana": "彼[かれ]の実力[じつりょく]を考[かんが]えれば、今回[こんかい]の優勝[ゆうしょう]は驚[おどろ]くには当[あ]たらない。",
        "reading": "karenojitsuryokuokangaereba、konkainoyuushouhaodorokunihaataranai。",
        "translation": "Xét về khả năng của anh thì chiến thắng này không có gì bất ngờ."
      },
      {
        "text": "新人[しんじん]のうちは誰[だれ]でも失敗[しっぱい]するものだから、それほど責[せ]めるには当[あ]たらない。",
        "furigana": "新人[しんじん]のうちは誰[だれ]でも失敗[しっぱい]するものだから、それほど責[せ]めるには当[あ]たらない。",
        "reading": "shinjinnouchihadaredemoshippaisurumonodakara、sorehodosemerunihaataranai。",
        "translation": "Lúc mới vào ai cũng mắc sai lầm nên thực sự tôi cũng không thể trách họ nhiều đến thế được."
      },
      {
        "text": "多少[たしょう]の遅[おく]れは想定[そうてい]内[ない]であり、心配[しんぱい]するには当[あ]たらない。",
        "furigana": "多少[たしょう]の遅[おく]れは想定[そうてい]内[ない]であり、心配[しんぱい]するには当[あ]たらない。",
        "reading": "tashounookurehasouteinaideari、shinpaisurunihaataranai。",
        "translation": "Có thể sẽ có một số sự chậm trễ và bạn không cần phải lo lắng."
      }
    ]
  },
  {
    "id": "ja-g-n1-67-ni-atte",
    "language": "ja",
    "level": "N1",
    "pattern": "〜にあって (ni atte)",
    "meaning": "trong (một tình huống hoặc vị trí); tại (một thời điểm)",
    "formula": "Danh từ (N) + にあって(は / も)",
    "note": "Một 〜で / 〜において trang trọng nhấn mạnh việc đang ở trong một tình huống đặc biệt. にあっても = 'đồng đều'; にあっては = 'ở (vị trí như vậy)'.",
    "examples": [
      {
        "text": "物価[ぶっか]が上[あ]がり続[つづ]ける状況[じょうきょう]にあって、家計[かけい]の見直[みなお]しは避[さ]けられない。",
        "furigana": "物価[ぶっか]が上[あ]がり続[つづ]ける状況[じょうきょう]にあって、家計[かけい]の見直[みなお]しは避[さ]けられない。",
        "reading": "bukkagaagaritsuzukerujoukyouniatte、kakeinominaoshihasakerarenai。",
        "translation": "Khi giá cả tiếp tục tăng thì việc xem xét lại tài chính hộ gia đình là điều khó tránh khỏi."
      },
      {
        "text": "彼女[かのじょ]は逆境[ぎゃっきょう]にあっても、決[けっ]して笑顔[えがお]を絶[た]やさなかった。",
        "furigana": "彼女[かのじょ]は逆境[ぎゃっきょう]にあっても、決[けっ]して笑顔[えがお]を絶[た]やさなかった。",
        "reading": "kanojohagyakkyouniattemo、kesshiteegaootayasanakatta。",
        "translation": "Ngay cả khi đối mặt với nghịch cảnh, cô vẫn không ngừng mỉm cười."
      },
      {
        "text": "責任[せきにん]ある立場[たちば]にあっては、軽率[けいそつ]な言動[げんどう]は慎[つつし]むべきだ。",
        "furigana": "責任[せきにん]ある立場[たちば]にあっては、軽率[けいそつ]な言動[げんどう]は慎[つつし]むべきだ。",
        "reading": "sekininarutachibaniatteha、keisotsunagendouhatsutsushimubekida。",
        "translation": "Đã ở vị trí có trách nhiệm thì nên kiềm chế những lời nói và hành động hấp tấp."
      }
    ]
  },
  {
    "id": "ja-g-n1-68-ni-kataku-nai",
    "language": "ja",
    "level": "N1",
    "pattern": "〜に難くない (ni kataku nai)",
    "meaning": "không khó để (tưởng tượng, hiểu)",
    "formula": "Động từ thể từ điển (V-dict) + に難くない / Danh từ (N) + に難くない",
    "note": "Giới hạn trong một vài từ: 想像, 理解, 察する, 予想. Phong cách viết chính thức.",
    "examples": [
      {
        "text": "突然[とつぜん]家族[かぞく]を失[うしな]った遺族[いぞく]の悲[かな]しみは、想像[そうぞう]に難[かた]くない。",
        "furigana": "突然[とつぜん]家族[かぞく]を失[うしな]った遺族[いぞく]の悲[かな]しみは、想像[そうぞう]に難[かた]くない。",
        "reading": "totsuzenkazokuoushinattaizokunokanashimiha、souzounikatakunai。",
        "translation": "Không khó để hình dung nỗi đau buồn của những gia đình có tang quyến đột ngột mất đi người thân."
      },
      {
        "text": "当時[とうじ]の彼[かれ]がどれほど追[お]い詰[つ]められていたかは、察[さっ]するに難[かた]くない。",
        "furigana": "当時[とうじ]の彼[かれ]がどれほど追[お]い詰[つ]められていたかは、察[さっ]するに難[かた]くない。",
        "reading": "toujinokaregadorehodooitsumerareteitakaha、sassurunikatakunai。",
        "translation": "Không khó để tưởng tượng lúc đó anh ấy đã bị dồn vào chân tường như thế nào."
      },
      {
        "text": "この条件[じょうけん]で工事[こうじ]を強行[きょうこう]すれば、事故[じこ]が起[お]きることは予想[よそう]に難[かた]くない。",
        "furigana": "この条件[じょうけん]で工事[こうじ]を強行[きょうこう]すれば、事故[じこ]が起[お]きることは予想[よそう]に難[かた]くない。",
        "reading": "konojoukendekoujiokyoukousureba、jikogaokirukotohayosounikatakunai。",
        "translation": "Nếu ép buộc thi công trong những điều kiện này thì không khó để dự đoán sẽ xảy ra tai nạn."
      }
    ]
  },
  {
    "id": "ja-g-n1-69-ni-shite",
    "language": "ja",
    "level": "N1",
    "pattern": "〜にして (ni shite)",
    "meaning": "(tại/với); thậm chí cho ; cả A và B",
    "formula": "Danh từ (N) + にして",
    "note": "Cách sử dụng chính: đã đạt đến một giai đoạn, thường là 〜にして初めて ('chỉ tại/với'); 'ngay cả đối với (ai đó đặc biệt)' (名人にしてなお解けない); và AにしてB 'cả A và B'.",
    "examples": [
      {
        "text": "彼女[かのじょ]は四十歳[よんじゅっさい]にして、初[はじ]めて小説[しょうせつ]を書[か]き上[あ]げた。",
        "furigana": "彼女[かのじょ]は四十歳[よんじゅっさい]にして、初[はじ]めて小説[しょうせつ]を書[か]き上[あ]げた。",
        "reading": "kanojohayonjussainishite、hajimeteshousetsuokakiageta。",
        "translation": "Cô ấy hoàn thành cuốn tiểu thuyết đầu tiên của mình ở tuổi bốn mươi."
      },
      {
        "text": "このような精密[せいみつ]な作業[さぎょう]は、熟練[じゅくれん]の職人[しょくにん]にしてはじめて可能[かのう]になる。",
        "furigana": "このような精密[せいみつ]な作業[さぎょう]は、熟練[じゅくれん]の職人[しょくにん]にしてはじめて可能[かのう]になる。",
        "reading": "konoyounaseimitsunasagyouha、jukurennoshokuninnishitehajimetekanouninaru。",
        "translation": "Công việc chính xác như vậy chỉ có thể được thực hiện bởi những người thợ lành nghề."
      },
      {
        "text": "彼[かれ]は医師[いし]にして作家[さっか]でもあり、多方面[たほうめん]で活躍[かつやく]している。",
        "furigana": "彼[かれ]は医師[いし]にして作家[さっか]でもあり、多方面[たほうめん]で活躍[かつやく]している。",
        "reading": "karehaishinishitesakkademoari、tahoumendekatsuyakushiteiru。",
        "translation": "Ông là bác sĩ, nhà văn và hoạt động tích cực trong nhiều lĩnh vực."
      }
    ]
  },
  {
    "id": "ja-g-n1-70-ni-sokushite",
    "language": "ja",
    "level": "N1",
    "pattern": "〜に即して (ni sokushite)",
    "meaning": "phù hợp với; dựa trên (sự kiện, điều kiện thực tế)",
    "formula": "Danh từ (N) + に即して / Danh từ (N) + に即した + Danh từ (N)",
    "note": "Danh từ điển hình: 事実, 実情, 現実, 実態, 状況. Với luật lệ, 〜に則して hoặc 〜に則って được sử dụng.",
    "examples": [
      {
        "text": "規則[きそく]を機械[きかい]的[てき]に当[あ]てはめるのではなく、実情[じつじょう]に即[そく]して判断[はんだん]すべきだ。",
        "furigana": "規則[きそく]を機械[きかい]的[てき]に当[あ]てはめるのではなく、実情[じつじょう]に即[そく]して判断[はんだん]すべきだ。",
        "reading": "kisokuokikaitekiniatehamerunodehanaku、jitsujounisokushitehandansubekida。",
        "translation": "Thay vì áp dụng quy định một cách máy móc, nên đưa ra quyết định dựa trên tình hình thực tế."
      },
      {
        "text": "本書[ほんしょ]は、実際[じっさい]の職場[しょくば]の場面[ばめん]に即[そく]した会話[かいわ]例[れい]を数多[かずおお]く取[と]り上[あ]げている。",
        "furigana": "本書[ほんしょ]は、実際[じっさい]の職場[しょくば]の場面[ばめん]に即[そく]した会話[かいわ]例[れい]を数多[かずおお]く取[と]り上[あ]げている。",
        "reading": "honshoha、jissainoshokubanobamennisokushitakaiwareiokazuookutoriageteiru。",
        "translation": "Cuốn sách này chứa nhiều ví dụ về các cuộc hội thoại dựa trên các tình huống thực tế tại nơi làm việc."
      },
      {
        "text": "事実[じじつ]に即[そく]して報道[ほうどう]することが、記者[きしゃ]の最低限[さいていげん]の責任[せきにん]である。",
        "furigana": "事実[じじつ]に即[そく]して報道[ほうどう]することが、記者[きしゃ]の最低限[さいていげん]の責任[せきにん]である。",
        "reading": "jijitsunisokushitehoudousurukotoga、kishanosaiteigennosekinindearu。",
        "translation": "Báo cáo dựa trên sự thật là trách nhiệm tối thiểu của người báo cáo."
      }
    ]
  },
  {
    "id": "ja-g-n1-71-ni-taeru-ni-taenai",
    "language": "ja",
    "level": "N1",
    "pattern": "〜に堪える / 〜に堪えない (ni taeru / ni taenai)",
    "meaning": "có giá trị (làm); không thể chịu nổi (nhìn, nghe); (cảm nhận) sâu sắc",
    "formula": "Động từ thể từ điển (V-dict) + に堪える / Danh từ (N) + に堪える / Động từ thể từ điển (V-dict) + に堪えない / Danh từ (N) + に堪えない",
    "note": "に堪える: 'đáng (đọc, nhìn thấy)'. Động từ + に堪えない: 'quá khủng khiếp để (nhìn, nghe)'. Danh từ cảm xúc + に堪えない (感謝, 遺憾): 'cảm nhận sâu sắc', trong cách nói trang trọng.",
    "examples": [
      {
        "text": "この作品[さくひん]は、大人[おとな]の鑑賞[かんしょう]にも十分[じゅうぶん]堪[た]える完成[かんせい]度[ど]の高[たか]いアニメだ。",
        "furigana": "この作品[さくひん]は、大人[おとな]の鑑賞[かんしょう]にも十分[じゅうぶん]堪[た]える完成[かんせい]度[ど]の高[たか]いアニメだ。",
        "reading": "konosakuhinha、otonanokanshounimojuubuntaerukanseidonotakaiアニメda。",
        "translation": "Tác phẩm này là một bộ anime có độ hoàn thiện cao mà người lớn cũng có thể yêu thích."
      },
      {
        "text": "被災[ひさい]地[ち]の惨状[さんじょう]は、見[み]るに堪[た]えないものだった。",
        "furigana": "被災[ひさい]地[ち]の惨状[さんじょう]は、見[み]るに堪[た]えないものだった。",
        "reading": "hisaichinosanjouha、mirunitaenaimonodatta。",
        "translation": "Sự tàn phá ở khu vực thảm họa là điều đáng chú ý."
      },
      {
        "text": "皆様[みなさま]から温[あたた]かいご支援[しえん]をいただき、感謝[かんしゃ]に堪[た]えません。",
        "furigana": "皆様[みなさま]から温[あたた]かいご支援[しえん]をいただき、感謝[かんしゃ]に堪[た]えません。",
        "reading": "minasamakaraatatakaigoshienoitadaki、kanshanitaemasen。",
        "translation": "Tôi không thể cảm ơn đủ vì sự hỗ trợ nồng nhiệt của bạn."
      }
    ]
  },
  {
    "id": "ja-g-n1-72-ni-taru",
    "language": "ja",
    "level": "N1",
    "pattern": "〜に足る (ni taru)",
    "meaning": "xứng đáng; đủ để",
    "formula": "Động từ thể từ điển (V-dict) + に足る + Danh từ (N) / Danh từ (N) + に足る + Danh từ (N)",
    "note": "Hầu hết đứng trước danh từ (信頼に足る人物). Câu phủ định 取るに足らない ('tầm thường') là một cụm từ phổ biến.",
    "examples": [
      {
        "text": "彼[かれ]は、部下[ぶか]からも取引[とりひき]先[さき]からも信頼[しんらい]に足[た]る人物[じんぶつ]だと評価[ひょうか]されている。",
        "furigana": "彼[かれ]は、部下[ぶか]からも取引[とりひき]先[さき]からも信頼[しんらい]に足[た]る人物[じんぶつ]だと評価[ひょうか]されている。",
        "reading": "kareha、bukakaramotorihikisakikaramoshinrainitarujinbutsudatohyoukasareteiru。",
        "translation": "Ông được cả cấp dưới và đối tác kinh doanh đánh giá là người đáng tin cậy."
      },
      {
        "text": "残念[ざんねん]ながら、その主張[しゅちょう]を裏付[うらづ]けるに足[た]る証拠[しょうこ]は見[み]つかっていない。",
        "furigana": "残念[ざんねん]ながら、その主張[しゅちょう]を裏付[うらづ]けるに足[た]る証拠[しょうこ]は見[み]つかっていない。",
        "reading": "zannennagara、sonoshuchouourazukerunitarushoukohamitsukatteinai。",
        "translation": "Thật không may, không có bằng chứng nào được tìm thấy để hỗ trợ cho tuyên bố đó."
      },
      {
        "text": "取[と]るに足[た]らないうわさなど、気[き]にする必要[ひつよう]はない。",
        "furigana": "取[と]るに足[た]らないうわさなど、気[き]にする必要[ひつよう]はない。",
        "reading": "torunitaranaiuwasanado、kinisuruhitsuyouhanai。",
        "translation": "Không cần lo lắng về những lời đồn thổi tầm thường."
      }
    ]
  },
  {
    "id": "ja-g-n1-73-ni-todomarazu",
    "language": "ja",
    "level": "N1",
    "pattern": "〜にとどまらず (ni todomarazu)",
    "meaning": "không giới hạn; không dừng lại ở; vượt xa",
    "formula": "Danh từ (N) / Động từ thể thông thường (V thường) + にとどまらず",
    "note": "Nhấn mạnh rằng điều gì đó lan rộng ra ngoài phạm vi hoặc khu vực dự kiến. Gần với 〜に限らず (N2) nhưng có cảm giác mở rộng mạnh mẽ hơn.",
    "examples": [
      {
        "text": "感染[かんせん]症[しょう]の影響[えいきょう]は一国[いっこく]にとどまらず、世界[せかい]経済[けいざい]全体[ぜんたい]に及[およ]んだ。",
        "furigana": "感染[かんせん]症[しょう]の影響[えいきょう]は一国[いっこく]にとどまらず、世界[せかい]経済[けいざい]全体[ぜんたい]に及[およ]んだ。",
        "reading": "kansenshounoeikyouhaikkokunitodomarazu、sekaikeizaizentainioyonda。",
        "translation": "Tác động của dịch bệnh truyền nhiễm không chỉ giới hạn ở một quốc gia mà ảnh hưởng đến toàn bộ nền kinh tế toàn cầu."
      },
      {
        "text": "この運動[うんどう]は一時[いちじ]的[てき]なブームにとどまらず、社会[しゃかい]の意識[いしき]を大[おお]きく変[か]えた。",
        "furigana": "この運動[うんどう]は一時[いちじ]的[てき]なブームにとどまらず、社会[しゃかい]の意識[いしき]を大[おお]きく変[か]えた。",
        "reading": "konoundouhaichijitekinaブームnitodomarazu、shakainoishikioookikukaeta。",
        "translation": "Phong trào này không chỉ là sự bùng nổ nhất thời mà nó còn làm thay đổi đáng kể nhận thức của xã hội."
      },
      {
        "text": "彼[かれ]の研究[けんきゅう]は、学問[がくもん]の世界[せかい]にとどまらず、産業[さんぎょう]界[かい]からも注目[ちゅうもく]を集[あつ]めている。",
        "furigana": "彼[かれ]の研究[けんきゅう]は、学問[がくもん]の世界[せかい]にとどまらず、産業[さんぎょう]界[かい]からも注目[ちゅうもく]を集[あつ]めている。",
        "reading": "karenokenkyuuha、gakumonnosekainitodomarazu、sangyoukaikaramochuumokuoatsumeteiru。",
        "translation": "Nghiên cứu của ông đã thu hút được sự chú ý không chỉ từ giới học thuật mà còn từ giới công nghiệp."
      }
    ]
  },
  {
    "id": "ja-g-n1-74-ni-hikikae",
    "language": "ja",
    "level": "N1",
    "pattern": "〜にひきかえ (ni hikikae)",
    "meaning": "ngược lại với; không giống như",
    "formula": "Danh từ (N) + にひきかえ / Động từ thể thông thường (V thường) + の + にひきかえ",
    "note": "Đối chiếu hai điều trái ngược nhau với sự đánh giá của người nói (một tốt, một xấu). Chủ quan hơn 〜に対して.",
    "examples": [
      {
        "text": "しっかり者[もの]の姉[あね]にひきかえ、妹[いもうと]はのんびり屋[や]でいつも忘[わす]れ物[もの]ばかりしている。",
        "furigana": "しっかり者[もの]の姉[あね]にひきかえ、妹[いもうと]はのんびり屋[や]でいつも忘[わす]れ物[もの]ばかりしている。",
        "reading": "shikkarimononoanenihikikae、imoutohanonbiriyadeitsumowasuremonobakarishiteiru。",
        "translation": "Ngược lại với chị gái là người đáng tin cậy hơn, em gái tôi lại thoải mái hơn và luôn quên mọi chuyện."
      },
      {
        "text": "去年[きょねん]の猛暑[もうしょ]にひきかえ、今年[ことし]の夏[なつ]はずいぶん過[す]ごしやすい。",
        "furigana": "去年[きょねん]の猛暑[もうしょ]にひきかえ、今年[ことし]の夏[なつ]はずいぶん過[す]ごしやすい。",
        "reading": "kyonennomoushonihikikae、kotoshinonatsuhazuibunsugoshiyasui。",
        "translation": "Ngược lại với cái nóng gay gắt của năm ngoái, mùa hè năm nay dễ chịu hơn rất nhiều."
      },
      {
        "text": "兄[あに]が勉強[べんきょう]熱心[ねっしん]なのにひきかえ、弟[おとうと]は漫画[まんが]ばかり読[よ]んでいる。",
        "furigana": "兄[あに]が勉強[べんきょう]熱心[ねっしん]なのにひきかえ、弟[おとうと]は漫画[まんが]ばかり読[よ]んでいる。",
        "reading": "anigabenkyounesshinnanonihikikae、otoutohamangabakariyondeiru。",
        "translation": "Trong khi anh trai tôi chăm chỉ học tập thì em trai tôi chỉ đọc manga."
      }
    ]
  },
  {
    "id": "ja-g-n1-75-ni-mo-mashite",
    "language": "ja",
    "level": "N1",
    "pattern": "〜にもまして (ni mo mashite)",
    "meaning": "thậm chí nhiều hơn; trên hết là",
    "formula": "Danh từ (N) + にもまして / Từ để hỏi + にもまして",
    "note": "Thường là 以前にもまして, 例年にもまして. Với từ để hỏi (何にもまして, 誰にもまして) nó có nghĩa là 'hơn bất cứ thứ gì/bất cứ ai'.",
    "examples": [
      {
        "text": "今年[ことし]の夏[なつ]は、例年[れいねん]にもまして暑[あつ]さが厳[きび]しい。",
        "furigana": "今年[ことし]の夏[なつ]は、例年[れいねん]にもまして暑[あつ]さが厳[きび]しい。",
        "reading": "kotoshinonatsuha、reinennimomashiteatsusagakibishii。",
        "translation": "Mùa hè năm nay nóng hơn thường lệ."
      },
      {
        "text": "合格[ごうかく]の知[し]らせは、何[なに]にもましてうれしかった。",
        "furigana": "合格[ごうかく]の知[し]らせは、何[なに]にもましてうれしかった。",
        "reading": "goukakunoshiraseha、naninimomashiteureshikatta。",
        "translation": "Tôi rất vui khi biết rằng mình đã vượt qua kỳ thi."
      },
      {
        "text": "前回[ぜんかい]にもまして、今回[こんかい]の選挙[せんきょ]は投票[とうひょう]率[りつ]の低[ひく]さが目立[めだ]った。",
        "furigana": "前回[ぜんかい]にもまして、今回[こんかい]の選挙[せんきょ]は投票[とうひょう]率[りつ]の低[ひく]さが目立[めだ]った。",
        "reading": "zenkainimomashite、konkainosenkyohatouhyouritsunohikusagamedatta。",
        "translation": "Thậm chí còn nhiều hơn lần trước, tỷ lệ cử tri đi bỏ phiếu trong cuộc bầu cử này thấp đáng kể."
      }
    ]
  },
  {
    "id": "ja-g-n1-76-no-itari",
    "language": "ja",
    "level": "N1",
    "pattern": "〜の至り (no itari)",
    "meaning": "tối đa; chiều cao của (trong các cụm từ cố định)",
    "formula": "Danh từ (N) + の至り",
    "note": "Chủ yếu là trong các cụm từ cố định: 光栄の至り, 恐縮の至り, 感激の至り, và 若気の至り ('tuổi trẻ điên rồ'). Được sử dụng trong các bài phát biểu và thư từ trang trọng.",
    "examples": [
      {
        "text": "このような席[せき]でご挨拶[あいさつ]させていただけるとは、光栄[こうえい]の至[いた]りでございます。",
        "furigana": "このような席[せき]でご挨拶[あいさつ]させていただけるとは、光栄[こうえい]の至[いた]りでございます。",
        "reading": "konoyounasekidegoaisatsusaseteitadakerutoha、koueinoitaridegozaimasu。",
        "translation": "Thật vinh dự khi được nói chuyện với bạn ở vị trí này."
      },
      {
        "text": "学生[がくせい]時代[じだい]に派手[はで]な髪型[かみがた]をしていたのは、若気[わかげ]の至[いた]りだった。",
        "furigana": "学生[がくせい]時代[じだい]に派手[はで]な髪型[かみがた]をしていたのは、若気[わかげ]の至[いた]りだった。",
        "reading": "gakuseijidainihadenakamigataoshiteitanoha、wakagenoitaridatta。",
        "translation": "Kiểu tóc lòe loẹt mà tôi để khi còn là sinh viên là kết quả của tuổi trẻ."
      },
      {
        "text": "皆様[みなさま]にご迷惑[めいわく]をおかけし、誠[まこと]に恐縮[きょうしゅく]の至[いた]りです。",
        "furigana": "皆様[みなさま]にご迷惑[めいわく]をおかけし、誠[まこと]に恐縮[きょうしゅく]の至[いた]りです。",
        "reading": "minasamanigomeiwakuookakeshi、makotonikyoushukunoitaridesu。",
        "translation": "Chúng tôi xin lỗi vì bất kỳ sự bất tiện nào gây ra."
      }
    ]
  },
  {
    "id": "ja-g-n1-77-nomi-narazu",
    "language": "ja",
    "level": "N1",
    "pattern": "〜のみならず (nomi narazu)",
    "meaning": "không chỉ ... mà còn cả",
    "formula": "Danh từ (N) / Động từ thể thông thường (V thường) / Tính từ đuôi い (A-i) + のみならず / Tính từ đuôi な (A-na) + である + のみならず / Danh từ (N) + である + のみならず",
    "note": "Văn viết trang trọng tương đương với 〜だけでなく / 〜ばかりでなく. Cũng có thể mở câu: のみならず、…",
    "examples": [
      {
        "text": "この問題[もんだい]は日本[にほん]のみならず、多[おお]くの先進[せんしん]国[こく]が抱[かか]える課題[かだい]である。",
        "furigana": "この問題[もんだい]は日本[にほん]のみならず、多[おお]くの先進[せんしん]国[こく]が抱[かか]える課題[かだい]である。",
        "reading": "konomondaihanihonnominarazu、ookunosenshinkokugakakaerukadaidearu。",
        "translation": "Vấn đề này không chỉ Nhật Bản mà nhiều nước phát triển cũng gặp phải."
      },
      {
        "text": "彼女[かのじょ]は優[すぐ]れた研究[けんきゅう]者[しゃ]であるのみならず、学生[がくせい]の指導[しどう]にも熱心[ねっしん]だ。",
        "furigana": "彼女[かのじょ]は優[すぐ]れた研究[けんきゅう]者[しゃ]であるのみならず、学生[がくせい]の指導[しどう]にも熱心[ねっしん]だ。",
        "reading": "kanojohasuguretakenkyuushadearunominarazu、gakuseinoshidounimonesshinda。",
        "translation": "Cô không chỉ là một nhà nghiên cứu xuất sắc mà còn rất tâm huyết trong việc giảng dạy học sinh."
      },
      {
        "text": "震災[しんさい]は建物[たてもの]を破壊[はかい]したのみならず、住民[じゅうみん]の暮[く]らしそのものを奪[うば]った。",
        "furigana": "震災[しんさい]は建物[たてもの]を破壊[はかい]したのみならず、住民[じゅうみん]の暮[く]らしそのものを奪[うば]った。",
        "reading": "shinsaihatatemonoohakaishitanominarazu、juuminnokurashisonomonooubatta。",
        "translation": "Trận động đất không chỉ phá hủy các tòa nhà mà còn tước đi sinh kế của người dân."
      }
    ]
  },
  {
    "id": "ja-g-n1-78-wa-oroka",
    "language": "ja",
    "level": "N1",
    "pattern": "〜はおろか (wa oroka)",
    "meaning": "chứ đừng nói gì; chưa kể đến",
    "formula": "Danh từ (N) + はおろか",
    "note": "AはおろかBも / さえ / まで: B thậm chí còn là trường hợp cơ bản hơn; thường là về những sự thật tiêu cực hoặc đáng ngạc nhiên. Không giống như 〜どころか, không được dùng với mệnh lệnh hoặc lời chúc.",
    "examples": [
      {
        "text": "足[あし]を骨折[こっせつ]してしまい、走[はし]ることはおろか、歩[ある]くことさえままならない。",
        "furigana": "足[あし]を骨折[こっせつ]してしまい、走[はし]ることはおろか、歩[ある]くことさえままならない。",
        "reading": "ashiokossetsushiteshimai、hashirukotohaoroka、arukukotosaemamanaranai。",
        "translation": "Anh ấy bị gãy chân và không thể đi được chứ đừng nói đến việc chạy."
      },
      {
        "text": "祖父[そふ]は海外[かいがい]はおろか、東京[とうきょう]にも行[い]ったことがない。",
        "furigana": "祖父[そふ]は海外[かいがい]はおろか、東京[とうきょう]にも行[い]ったことがない。",
        "reading": "sofuhakaigaihaoroka、toukyounimoittakotoganai。",
        "translation": "Ông tôi chưa bao giờ đến Tokyo chứ đừng nói đến nước ngoài."
      },
      {
        "text": "給料[きゅうりょう]日[び]前[まえ]で、外食[がいしょく]はおろか、コンビニの弁当[べんとう]を買[か]う余裕[よゆう]もない。",
        "furigana": "給料[きゅうりょう]日[び]前[まえ]で、外食[がいしょく]はおろか、コンビニの弁当[べんとう]を買[か]う余裕[よゆう]もない。",
        "reading": "kyuuryoubimaede、gaishokuhaoroka、コンビニnobentouokauyoyuumonai。",
        "translation": "Ngay trước ngày lãnh lương, tôi còn không đủ tiền để mua hộp cơm trưa ở cửa hàng tiện lợi chứ đừng nói đến việc đi ăn ngoài."
      }
    ]
  },
  {
    "id": "ja-g-n1-79-ba-koso",
    "language": "ja",
    "level": "N1",
    "pattern": "〜ばこそ (ba koso)",
    "meaning": "chính xác là vì; chỉ vì",
    "formula": "Verb-ba + こそ / Tính từ đuôi い (A-i) stem + ければこそ / Tính từ đuôi な (A-na) + であればこそ / Danh từ (N) + であればこそ",
    "note": "Nhấn mạnh một lý do tích cực hoặc có ý tốt, thường là để giải thích điều gì đó có thể bị hiểu lầm. Văn chương hơn 〜からこそ.",
    "examples": [
      {
        "text": "君[きみ]の将来[しょうらい]を思[おも]えばこそ、厳[きび]しいことを言[い]うのだ。",
        "furigana": "君[きみ]の将来[しょうらい]を思[おも]えばこそ、厳[きび]しいことを言[い]うのだ。",
        "reading": "kiminoshouraioomoebakoso、kibishiikotooiunoda。",
        "translation": "Chỉ khi nghĩ đến tương lai của em, anh mới nói những điều cay nghiệt như vậy."
      },
      {
        "text": "健康[けんこう]であればこそ、好[す]きな仕事[しごと]にも打[う]ち込[こ]める。",
        "furigana": "健康[けんこう]であればこそ、好[す]きな仕事[しごと]にも打[う]ち込[こ]める。",
        "reading": "kenkoudearebakoso、sukinashigotonimouchikomeru。",
        "translation": "Có sức khỏe thì mới có thể cống hiến hết mình cho công việc mình yêu thích."
      },
      {
        "text": "信頼[しんらい]していればこそ、この大役[たいやく]を彼女[かのじょ]に任[まか]せたのです。",
        "furigana": "信頼[しんらい]していればこそ、この大役[たいやく]を彼女[かのじょ]に任[まか]せたのです。",
        "reading": "shinraishiteirebakoso、konotaiyakuokanojonimakasetanodesu。",
        "translation": "Tôi rất tin tưởng cô ấy nên đã giao cho cô ấy vai trò quan trọng này."
      }
    ]
  },
  {
    "id": "ja-g-n1-80-ba-sore-made-da",
    "language": "ja",
    "level": "N1",
    "pattern": "〜ばそれまでだ (ba sore made da)",
    "meaning": "nếu ..., thế là xong; tất cả sẽ chẳng là gì nếu",
    "formula": "Verb-ba + それまでだ",
    "note": "Hai cách sử dụng: mọi nỗ lực sẽ bị lãng phí nếu X xảy ra; hoặc 〜と言ってしまえばそれまでだ, 'nói X kết thúc cuộc thảo luận (nhưng ...)'. Thường đi kèm với 〜てしまえば.",
    "examples": [
      {
        "text": "どんなに高価[こうか]な機械[きかい]でも、壊[こわ]れてしまえばそれまでだ。",
        "furigana": "どんなに高価[こうか]な機械[きかい]でも、壊[こわ]れてしまえばそれまでだ。",
        "reading": "donnanikoukanakikaidemo、kowareteshimaebasoremadeda。",
        "translation": "Máy có đắt đến mấy mà hỏng thì thế thôi."
      },
      {
        "text": "いくら準備[じゅんび]をしても、本番[ほんばん]で緊張[きんちょう]して何[なに]も言[い]えなければそれまでだ。",
        "furigana": "いくら準備[じゅんび]をしても、本番[ほんばん]で緊張[きんちょう]して何[なに]も言[い]えなければそれまでだ。",
        "reading": "ikurajunbioshitemo、honbandekinchoushitenanimoienakerebasoremadeda。",
        "translation": "Cho dù bạn có chuẩn bị bao nhiêu đi chăng nữa, nếu bạn cảm thấy lo lắng và không thể nói được gì trong buổi biểu diễn thực tế thì thôi."
      },
      {
        "text": "運[うん]が悪[わる]かったと言[い]ってしまえばそれまでだが、防[ふせ]げた事故[じこ]だったのではないか。",
        "furigana": "運[うん]が悪[わる]かったと言[い]ってしまえばそれまでだが、防[ふせ]げた事故[じこ]だったのではないか。",
        "reading": "ungawarukattatoitteshimaebasoremadedaga、fusegetajikodattanodehanaika。",
        "translation": "Có thể nói là xui xẻo cũng đủ, nhưng tôi nghĩ tai nạn lẽ ra đã có thể ngăn chặn được."
      }
    ]
  },
  {
    "id": "ja-g-n1-81-bekarazu-bekarazaru",
    "language": "ja",
    "level": "N1",
    "pattern": "〜べからず / 〜べからざる (bekarazu / bekarazaru)",
    "meaning": "không được phép; không (trên biển báo); (trước danh từ) không được là",
    "formula": "Động từ thể từ điển (V-dict) + べからず / Động từ thể từ điển (V-dict) + べからざる + Danh từ (N) (する → すべからず)",
    "note": "Cổ xưa; chủ yếu là về các dấu hiệu, các quy tắc và các cụm từ cố định. べからざる trước danh từ xuất hiện trong 欠くべからざる ('không thể thiếu') và 許すべからざる ('không thể tha thứ').",
    "examples": [
      {
        "text": "境内[けいだい]の池[いけ]のほとりには、「魚[さかな]にえさを与[あた]えるべからず」と書[か]かれた立[た]て札[ふだ]がある。",
        "furigana": "境内[けいだい]の池[いけ]のほとりには、「魚[さかな]にえさを与[あた]えるべからず」と書[か]かれた立[た]て札[ふだ]がある。",
        "reading": "keidainoikenohotoriniha、「sakananiesaoataerubekarazu」tokakaretatatefudagaaru。",
        "translation": "Có một tấm biển bên ao trong khuôn viên chùa ghi: ``Không cho cá ăn.''"
      },
      {
        "text": "彼[かれ]の発言[はつげん]は、公職[こうしょく]にある者[もの]として許[ゆる]すべからざるものだ。",
        "furigana": "彼[かれ]の発言[はつげん]は、公職[こうしょく]にある者[もの]として許[ゆる]すべからざるものだ。",
        "reading": "karenohatsugenha、koushokuniarumonotoshiteyurusubekarazarumonoda。",
        "translation": "Những bình luận của ông ấy là không thể chấp nhận được đối với bất kỳ ai đang giữ chức vụ công."
      },
      {
        "text": "水[みず]は人間[にんげん]の生活[せいかつ]にとって欠[か]くべからざるものである。",
        "furigana": "水[みず]は人間[にんげん]の生活[せいかつ]にとって欠[か]くべからざるものである。",
        "reading": "mizuhaningennoseikatsunitottekakubekarazarumonodearu。",
        "translation": "Nước rất cần thiết cho cuộc sống con người."
      }
    ]
  },
  {
    "id": "ja-g-n1-82-beku-mo-nai",
    "language": "ja",
    "level": "N1",
    "pattern": "〜べくもない (beku mo nai)",
    "meaning": "thì không thể; không có cách nào để",
    "formula": "Động từ thể từ điển (V-dict) + べくもない (する → すべくもない)",
    "note": "Phổ biến với 望む, 知る, 比べる (cũng là 比ぶべくもない cổ điển). Văn học; sự không thể đến từ hoàn cảnh.",
    "examples": [
      {
        "text": "プロの演奏[えんそう]と私[わたし]の演奏[えんそう]とでは、比[くら]べるべくもない。",
        "furigana": "プロの演奏[えんそう]と私[わたし]の演奏[えんそう]とでは、比[くら]べるべくもない。",
        "reading": "プロnoensoutowatashinoensoutodeha、kuraberubekumonai。",
        "translation": "Không có gì có thể so sánh giữa thành tích của một người chuyên nghiệp và thành tích của tôi."
      },
      {
        "text": "都心[としん]の一等地[いっとうち]に家[いえ]を買[か]うなど、今[いま]の収入[しゅうにゅう]では望[のぞ]むべくもない。",
        "furigana": "都心[としん]の一等地[いっとうち]に家[いえ]を買[か]うなど、今[いま]の収入[しゅうにゅう]では望[のぞ]むべくもない。",
        "reading": "toshinnoittouchiniieokaunado、imanoshuunyuudehanozomubekumonai。",
        "translation": "Với thu nhập hiện tại của tôi, tôi không thể hy vọng mua được một căn nhà ở vị trí đắc địa trung tâm thành phố."
      },
      {
        "text": "当事者[とうじしゃ]が全員[ぜんいん]亡[な]くなった今[いま]となっては、事故[じこ]の真相[しんそう]は知[し]るべくもない。",
        "furigana": "当事者[とうじしゃ]が全員[ぜんいん]亡[な]くなった今[いま]となっては、事故[じこ]の真相[しんそう]は知[し]るべくもない。",
        "reading": "toujishagazeninnakunattaimatonatteha、jikonoshinsouhashirubekumonai。",
        "translation": "Bây giờ tất cả những người liên quan đều đã qua đời, không cách nào biết được sự thật đằng sau vụ tai nạn."
      }
    ]
  },
  {
    "id": "ja-g-n1-83-majiki",
    "language": "ja",
    "level": "N1",
    "pattern": "〜まじき (majiki)",
    "meaning": "không được chấp nhận đối với (ai đó ở vị trí đó); không nên",
    "formula": "Danh từ (N) + に + あるまじき + Danh từ (N) / Động từ thể từ điển (V-dict) + まじき + Danh từ (N)",
    "note": "Chủ yếu là 〜にあるまじき / 〜としてあるまじき + 行為, 発言, 態度: hành vi không xứng đáng với vai trò. Mạnh mẽ quan trọng và chính thức.",
    "examples": [
      {
        "text": "生徒[せいと]に暴言[ぼうげん]を吐[は]くなど、教育[きょういく]者[しゃ]にあるまじき行為[こうい]だ。",
        "furigana": "生徒[せいと]に暴言[ぼうげん]を吐[は]くなど、教育[きょういく]者[しゃ]にあるまじき行為[こうい]だ。",
        "reading": "seitonibougenohakunado、kyouikushaniarumajikikouida。",
        "translation": "Nhà giáo dục mà la mắng học sinh bằng những lời lẽ xúc phạm là điều không nên."
      },
      {
        "text": "賄賂[わいろ]を受[う]け取[と]るとは、政治[せいじ]家[か]としてあるまじきことである。",
        "furigana": "賄賂[わいろ]を受[う]け取[と]るとは、政治[せいじ]家[か]としてあるまじきことである。",
        "reading": "wairoouketorutoha、seijikatoshitearumajikikotodearu。",
        "translation": "Nhận hối lộ là điều mà không một chính trị gia nào nên làm."
      }
    ]
  },
  {
    "id": "ja-g-n1-84-made-mo-nai",
    "language": "ja",
    "level": "N1",
    "pattern": "〜までもない (made mo nai)",
    "meaning": "không cần thiết; không cần phải (đi xa đến mức)",
    "formula": "Động từ thể từ điển (V-dict) + までもない",
    "note": "Vấn đề quá rõ ràng hoặc quá nhỏ để cần hành động. 言うまでもなく ('không cần phải nói') là một cụm từ phổ biến.",
    "examples": [
      {
        "text": "言[い]うまでもないが、試験[しけん]中[ちゅう]の私語[しご]は禁止[きんし]だ。",
        "furigana": "言[い]うまでもないが、試験[しけん]中[ちゅう]の私語[しご]は禁止[きんし]だ。",
        "reading": "iumademonaiga、shikenchuunoshigohakinshida。",
        "translation": "Không cần phải nói, việc nói chuyện riêng trong giờ thi là bị cấm."
      },
      {
        "text": "この程度[ていど]の傷[きず]なら、わざわざ病院[びょういん]へ行[い]くまでもない。",
        "furigana": "この程度[ていど]の傷[きず]なら、わざわざ病院[びょういん]へ行[い]くまでもない。",
        "reading": "konoteidonokizunara、wazawazabyouinheikumademonai。",
        "translation": "Vết thương cỡ này thì không cần phải đến bệnh viện đâu."
      },
      {
        "text": "彼女[かのじょ]の実力[じつりょく]は、改[あらた]めて説明[せつめい]するまでもないだろう。",
        "furigana": "彼女[かのじょ]の実力[じつりょく]は、改[あらた]めて説明[せつめい]するまでもないだろう。",
        "reading": "kanojonojitsuryokuha、aratametesetsumeisurumademonaidarou。",
        "translation": "Không cần phải giải thích lại khả năng của cô ấy nữa."
      }
    ]
  },
  {
    "id": "ja-g-n1-85-made-da-made-no-koto-da",
    "language": "ja",
    "level": "N1",
    "pattern": "〜までだ / 〜までのことだ (made da / made no koto da)",
    "meaning": "(tôi sẽ) chỉ (làm); Tôi chỉ (đã)",
    "formula": "Động từ thể từ điển (V-dict) + までだ / Động từ thể た (V-ta) + までだ / Động từ thể từ điển (V-dict) + までのことだ",
    "note": "Với Verb-dict: bình tĩnh quyết tâm thực hiện lựa chọn duy nhất còn lại. Với Verb-ta: 'Tôi chỉ làm X, không làm gì hơn', biện minh cho hành động của một người.",
    "examples": [
      {
        "text": "電車[でんしゃ]が動[うご]かないなら、歩[ある]いて帰[かえ]るまでだ。",
        "furigana": "電車[でんしゃ]が動[うご]かないなら、歩[ある]いて帰[かえ]るまでだ。",
        "reading": "denshagaugokanainara、aruitekaerumadeda。",
        "translation": "Nếu tàu không di chuyển thì tôi sẽ phải đi bộ về nhà."
      },
      {
        "text": "今回[こんかい]だめでも、また来年[らいねん]挑戦[ちょうせん]するまでのことだ。",
        "furigana": "今回[こんかい]だめでも、また来年[らいねん]挑戦[ちょうせん]するまでのことだ。",
        "reading": "konkaidamedemo、matarainenchousensurumadenokotoda。",
        "translation": "Ngay cả khi lần này nó không thành công, điều đó có nghĩa là tôi có thể thử lại vào năm sau."
      },
      {
        "text": "別[べつ]に怒[おこ]っているわけではない。事実[じじつ]を言[い]ったまでだ。",
        "furigana": "別[べつ]に怒[おこ]っているわけではない。事実[じじつ]を言[い]ったまでだ。",
        "reading": "betsuniokotteiruwakedehanai。jijitsuoittamadeda。",
        "translation": "Tôi không đặc biệt tức giận. Tôi chỉ nói sự thật thôi."
      }
    ]
  },
  {
    "id": "ja-g-n1-86-mamire",
    "language": "ja",
    "level": "N1",
    "pattern": "〜まみれ (mamire)",
    "meaning": "được bao phủ; bôi nhọ",
    "formula": "Danh từ (N) + まみれ",
    "note": "Có cái gì đó (bùn, máu, mồ hôi, dầu, bụi, nợ nần) dính đầy khắp nơi. So sánh だらけ (nhiều thứ, thậm chí sai sót) và ずくめ (hoàn toàn có thể tích cực).",
    "examples": [
      {
        "text": "子[こ]どもたちは泥[どろ]まみれになって、日[ひ]が暮[く]れるまで遊[あそ]んでいた。",
        "furigana": "子[こ]どもたちは泥[どろ]まみれになって、日[ひ]が暮[く]れるまで遊[あそ]んでいた。",
        "reading": "kodomotachihadoromamireninatte、higakurerumadeasondeita。",
        "translation": "Bọn trẻ lấm bùn khắp người và chơi đùa đến tận hoàng hôn."
      },
      {
        "text": "救助[きゅうじょ]隊員[たいいん]は汗[あせ]まみれになりながら、がれきの中[なか]を捜索[そうさく]し続[つづ]けた。",
        "furigana": "救助[きゅうじょ]隊員[たいいん]は汗[あせ]まみれになりながら、がれきの中[なか]を捜索[そうさく]し続[つづ]けた。",
        "reading": "kyuujotaiinhaasemamireninarinagara、garekinonakaosousakushitsuzuketa。",
        "translation": "Các nhân viên cứu hộ tiếp tục tìm kiếm trong đống đổ nát, người đầy mồ hôi."
      },
      {
        "text": "彼[かれ]は事業[じぎょう]に失敗[しっぱい]して以来[いらい]、借金[しゃっきん]まみれの生活[せいかつ]を送[おく]っている。",
        "furigana": "彼[かれ]は事業[じぎょう]に失敗[しっぱい]して以来[いらい]、借金[しゃっきん]まみれの生活[せいかつ]を送[おく]っている。",
        "reading": "karehajigyounishippaishiteirai、shakkinmamirenoseikatsuookutteiru。",
        "translation": "Kể từ khi công việc kinh doanh thất bại, anh ấy phải sống một cuộc sống nợ nần chồng chất."
      }
    ]
  },
  {
    "id": "ja-g-n1-87-meku",
    "language": "ja",
    "level": "N1",
    "pattern": "〜めく (meku)",
    "meaning": "đều có dấu hiệu; trở nên giống như; -ish",
    "formula": "Danh từ (N) + めく / Danh từ (N) + めいた + Danh từ (N)",
    "note": "Giới hạn ở một số danh từ nhất định: 春めく, 秋めく, 謎めく, 皮肉めく, 冗談めく, 言い訳めく. Văn chương hơn 〜らしい / 〜っぽい.",
    "examples": [
      {
        "text": "三月[さんがつ]に入[はい]り、日差[ひざ]しもだいぶ春[はる]めいてきた。",
        "furigana": "三月[さんがつ]に入[はい]り、日差[ひざ]しもだいぶ春[はる]めいてきた。",
        "reading": "sangatsunihairi、hizashimodaibuharumeitekita。",
        "translation": "Bây giờ là tháng 3, nắng bắt đầu như mùa xuân."
      },
      {
        "text": "彼女[かのじょ]は謎[なぞ]めいた微笑[ほほえ]みを浮[う]かべて、何[なに]も答[こた]えなかった。",
        "furigana": "彼女[かのじょ]は謎[なぞ]めいた微笑[ほほえ]みを浮[う]かべて、何[なに]も答[こた]えなかった。",
        "reading": "kanojohanazomeitahohoemioukabete、nanimokotaenakatta。",
        "translation": "Cô ấy cười thần bí và không trả lời."
      },
      {
        "text": "先輩[せんぱい]の皮肉[ひにく]めいた言[い]い方[かた]が、どうも気[き]になった。",
        "furigana": "先輩[せんぱい]の皮肉[ひにく]めいた言[い]い方[かた]が、どうも気[き]になった。",
        "reading": "senpainohinikumeitaiikataga、doumokininatta。",
        "translation": "Cách nói mỉa mai của Senpai khiến tôi chú ý."
      }
    ]
  },
  {
    "id": "ja-g-n1-88-mo-saru-koto-nagara",
    "language": "ja",
    "level": "N1",
    "pattern": "〜もさることながら (mo saru koto nagara)",
    "meaning": "không chỉ ... mà còn (thậm chí nhiều hơn); ... sang một bên",
    "formula": "Danh từ (N) + もさることながら",
    "note": "Thừa nhận A, sau đó nhấn mạnh B là quan trọng hơn hoặc đáng chú ý hơn. Thông thường đánh giá tích cực.",
    "examples": [
      {
        "text": "この店[みせ]は、料理[りょうり]の味[あじ]もさることながら、器[うつわ]の美[うつく]しさにも心[こころ]を奪[うば]われる。",
        "furigana": "この店[みせ]は、料理[りょうり]の味[あじ]もさることながら、器[うつわ]の美[うつく]しさにも心[こころ]を奪[うば]われる。",
        "reading": "konomiseha、ryourinoajimosarukotonagara、utsuwanoutsukushisanimokokorooubawareru。",
        "translation": "Đến nhà hàng này, bạn sẽ bị hớp hồn không chỉ bởi hương vị món ăn mà còn bởi vẻ đẹp của món ăn."
      },
      {
        "text": "彼[かれ]の成功[せいこう]は、才能[さいのう]もさることながら、人一倍[ひといちばい]の努力[どりょく]によるものだ。",
        "furigana": "彼[かれ]の成功[せいこう]は、才能[さいのう]もさることながら、人一倍[ひといちばい]の努力[どりょく]によるものだ。",
        "reading": "karenoseikouha、sainoumosarukotonagara、hitoichibainodoryokuniyorumonoda。",
        "translation": "Thành công của anh không chỉ nhờ vào tài năng mà còn nhờ vào sự chăm chỉ của anh."
      },
      {
        "text": "この本[ほん]は内容[ないよう]もさることながら、装丁[そうてい]の美[うつく]しさが話題[わだい]を呼[よ]んだ。",
        "furigana": "この本[ほん]は内容[ないよう]もさることながら、装丁[そうてい]の美[うつく]しさが話題[わだい]を呼[よ]んだ。",
        "reading": "konohonhanaiyoumosarukotonagara、souteinoutsukushisagawadaioyonda。",
        "translation": "Cuốn sách này thu hút sự chú ý không chỉ vì nội dung mà còn vì bìa đẹp."
      }
    ]
  },
  {
    "id": "ja-g-n1-89-mono-o",
    "language": "ja",
    "level": "N1",
    "pattern": "〜ものを (mono o)",
    "meaning": "nếu chỉ (..., nhưng); mặc dù (tiếc nuối hay trách móc)",
    "formula": "Động từ thể thông thường (V thường) / Tính từ đuôi い (A-i) / Tính từ đuôi な (A-na) + な + ものを",
    "note": "Hối tiếc, không hài lòng hoặc trách móc vì mọi việc đã không diễn ra như lẽ ra phải có. Thường đi kèm với 〜ば / 〜たら; có thể kết thúc câu: 言ってくれればよかったものを.",
    "examples": [
      {
        "text": "一言[ひとこと]相談[そうだん]してくれれば手伝[てつだ]ったものを、どうして一人[ひとり]で抱[かか]え込[こ]んだのか。",
        "furigana": "一言[ひとこと]相談[そうだん]してくれれば手伝[てつだ]ったものを、どうして一人[ひとり]で抱[かか]え込[こ]んだのか。",
        "reading": "hitokotosoudanshitekurerebatetsudattamonoo、doushitehitoridekakaekondanoka。",
        "translation": "Tại sao bạn lại phải giải quyết một việc mà lẽ ra bạn có thể giúp được nếu nói chuyện với tôi?"
      },
      {
        "text": "すぐに病院[びょういん]へ行[い]けば軽[かる]く済[す]んだものを、我慢[がまん]したせいで入院[にゅういん]する羽目[はめ]になった。",
        "furigana": "すぐに病院[びょういん]へ行[い]けば軽[かる]く済[す]んだものを、我慢[がまん]したせいで入院[にゅういん]する羽目[はめ]になった。",
        "reading": "sugunibyouinheikebakarukusundamonoo、gamanshitaseidenyuuinsuruhameninatta。",
        "translation": "Cuối cùng tôi phải nhập viện vì đã kìm nén một điều gì đó mà lẽ ra tôi có thể thuyên giảm nếu đến bệnh viện ngay."
      },
      {
        "text": "黙[だま]っていればいいものを、彼[かれ]は余計[よけい]なことを言[い]って話[はなし]をこじらせた。",
        "furigana": "黙[だま]っていればいいものを、彼[かれ]は余計[よけい]なことを言[い]って話[はなし]をこじらせた。",
        "reading": "damatteirebaiimonoo、karehayokeinakotooittehanashiokojiraseta。",
        "translation": "Lẽ ra anh ấy nên im lặng nhưng lại khiến cuộc trò chuyện trở nên phức tạp hơn khi nói những điều không cần thiết."
      }
    ]
  },
  {
    "id": "ja-g-n1-90-ya-ina-ya",
    "language": "ja",
    "level": "N1",
    "pattern": "〜や否や (ya ina ya)",
    "meaning": "càng sớm càng; khoảnh khắc; không sớm hơn ... là",
    "formula": "Động từ thể từ điển (V-dict) + や否や / Động từ thể từ điển (V-dict) + や",
    "note": "Được viết nhiều nhất trong nhóm 'ngay sau'; chỉ sự thật trong quá khứ, không phải ý định hoặc mệnh lệnh. Cũng được rút gọn thành 〜や. So sánh 〜なり (cùng chủ đề) và 〜そばから (lặp lại).",
    "examples": [
      {
        "text": "首相[しゅしょう]が会見[かいけん]場[じょう]に姿[すがた]を現[あらわ]すや否[いな]や、一斉[いっせい]にカメラのフラッシュがたかれた。",
        "furigana": "首相[しゅしょう]が会見[かいけん]場[じょう]に姿[すがた]を現[あらわ]すや否[いな]や、一斉[いっせい]にカメラのフラッシュがたかれた。",
        "reading": "shushougakaikenjounisugataoarawasuyainaya、isseiniカメラnoフラッシュgatakareta。",
        "translation": "Ngay khi thủ tướng xuất hiện tại cuộc họp báo, đèn flash của máy ảnh đồng loạt bắn lên."
      },
      {
        "text": "新[しん]製品[せいひん]は発売[はつばい]されるや否[いな]や、たちまち品切[しなぎ]れになった。",
        "furigana": "新[しん]製品[せいひん]は発売[はつばい]されるや否[いな]や、たちまち品切[しなぎ]れになった。",
        "reading": "shinseihinhahatsubaisareruyainaya、tachimachishinagireninatta。",
        "translation": "Sản phẩm mới vừa ra mắt đã nhanh chóng cháy hàng."
      },
      {
        "text": "終業[しゅうぎょう]のベルが鳴[な]るや、生徒[せいと]たちは教室[きょうしつ]を飛[と]び出[だ]していった。",
        "furigana": "終業[しゅうぎょう]のベルが鳴[な]るや、生徒[せいと]たちは教室[きょうしつ]を飛[と]び出[だ]していった。",
        "reading": "shuugyounoベルganaruya、seitotachihakyoushitsuotobidashiteitta。",
        "translation": "Chuông tan học vừa vang lên, học sinh đã ùa ra khỏi lớp."
      }
    ]
  },
  {
    "id": "ja-g-n1-91-yue-ni",
    "language": "ja",
    "level": "N1",
    "pattern": "〜ゆえ(に) (yue ni)",
    "meaning": "vì; bởi vì; do đó",
    "formula": "Danh từ (N) + (の) + ゆえ(に) / Động từ thể thông thường (V thường) + (が) + ゆえ(に) / Tính từ đuôi い (A-i) + (が) + ゆえ(に) / Tính từ đuôi な (A-na) + である + がゆえに",
    "note": "Trang trọng viết 'bởi vì'; 〜がゆえに mang tính nhấn mạnh và 〜ゆえの + Danh từ bổ nghĩa cho danh từ. Khi bắt đầu câu, ゆえに có nghĩa là 'do đó' (logic, toán học).",
    "examples": [
      {
        "text": "若[わか]さゆえの無謀[むぼう]な挑戦[ちょうせん]だったが、今[いま]ではいい思[おも]い出[で]だ。",
        "furigana": "若[わか]さゆえの無謀[むぼう]な挑戦[ちょうせん]だったが、今[いま]ではいい思[おも]い出[で]だ。",
        "reading": "wakasayuenomubounachousendattaga、imadehaiiomoideda。",
        "translation": "Đó là một thử thách liều lĩnh vì tuổi trẻ của tôi, nhưng bây giờ tôi có những kỷ niệm đẹp về nó."
      },
      {
        "text": "彼[かれ]は正直[しょうじき]すぎるがゆえに、損[そん]をすることも多[おお]い。",
        "furigana": "彼[かれ]は正直[しょうじき]すぎるがゆえに、損[そん]をすることも多[おお]い。",
        "reading": "karehashoujikisugirugayueni、sonosurukotomoooi。",
        "translation": "Vì quá lương thiện nên thường xuyên thua lỗ."
      },
      {
        "text": "資源[しげん]が乏[とぼ]しいがゆえに、この国[くに]は技術[ぎじゅつ]開発[かいはつ]に力[ちから]を注[そそ]いできた。",
        "furigana": "資源[しげん]が乏[とぼ]しいがゆえに、この国[くに]は技術[ぎじゅつ]開発[かいはつ]に力[ちから]を注[そそ]いできた。",
        "reading": "shigengatoboshiigayueni、konokunihagijutsukaihatsunichikaraososoidekita。",
        "translation": "Vì khan hiếm tài nguyên nên đất nước này đã tập trung phát triển công nghệ."
      }
    ]
  },
  {
    "id": "ja-g-n1-92-o-oite",
    "language": "ja",
    "level": "N1",
    "pattern": "〜をおいて (o oite)",
    "meaning": "ngoài; ngoài (không có ai / không có gì khác)",
    "formula": "Danh từ (N) + をおいて(ほかに)〜ない",
    "note": "Ca ngợi điều gì đó là sự lựa chọn khả thi duy nhất; theo sau là âm (いない, ない). Không liên quan đến 置いて 'bỏ lại phía sau'.",
    "examples": [
      {
        "text": "この難[むずか]しい手術[しゅじゅつ]を任[まか]せられるのは、彼[かれ]をおいてほかにいない。",
        "furigana": "この難[むずか]しい手術[しゅじゅつ]を任[まか]せられるのは、彼[かれ]をおいてほかにいない。",
        "reading": "konomuzukashiishujutsuomakaserarerunoha、kareooitehokaniinai。",
        "translation": "Không còn ai có thể giao phó ca phẫu thuật khó khăn này cho tôi nữa."
      },
      {
        "text": "次[つぎ]の大会[たいかい]を開[ひら]くなら、この町[まち]をおいてふさわしい場所[ばしょ]はない。",
        "furigana": "次[つぎ]の大会[たいかい]を開[ひら]くなら、この町[まち]をおいてふさわしい場所[ばしょ]はない。",
        "reading": "tsuginotaikaiohirakunara、konomachiooitefusawashiibashohanai。",
        "translation": "Không có nơi nào tốt hơn thị trấn này để tổ chức giải đấu tiếp theo."
      },
      {
        "text": "今[いま]をおいて、改革[かいかく]を断行[だんこう]する機会[きかい]はないだろう。",
        "furigana": "今[いま]をおいて、改革[かいかく]を断行[だんこう]する機会[きかい]はないだろう。",
        "reading": "imaooite、kaikakuodankousurukikaihanaidarou。",
        "translation": "Bây giờ sẽ không còn cơ hội để tiến hành cải cách nữa."
      }
    ]
  },
  {
    "id": "ja-g-n1-93-o-kawakiri-ni",
    "language": "ja",
    "level": "N1",
    "pattern": "〜を皮切りに (o kawakiri ni)",
    "meaning": "bắt đầu bằng; bắt đầu bằng (tiếp theo là một loạt)",
    "formula": "Danh từ (N) + を皮切りに / Động từ thể thông thường (V thường) + の + を皮切りに",
    "note": "Đánh dấu sự kiện đầu tiên trong một chuỗi các sự kiện tương tự được mở rộng hoặc lan rộng. Ngoài ra còn có 〜を皮切りとして.",
    "examples": [
      {
        "text": "バンドは来月[らいげつ]の東京[とうきょう]公演[こうえん]を皮切[かわき]りに、全国[ぜんこく]二十[にじゅっ]か所[しょ]を回[まわ]るツアーを行[おこな]う。",
        "furigana": "バンドは来月[らいげつ]の東京[とうきょう]公演[こうえん]を皮切[かわき]りに、全国[ぜんこく]二十[にじゅっ]か所[しょ]を回[まわ]るツアーを行[おこな]う。",
        "reading": "バンドharaigetsunotoukyoukouenokawakirini、zenkokunijukkashoomawaruツアーookonau。",
        "translation": "Ban nhạc sẽ lưu diễn 20 địa điểm trên khắp đất nước, bắt đầu bằng buổi biểu diễn ở Tokyo vào tháng tới."
      },
      {
        "text": "彼女[かのじょ]の発言[はつげん]を皮切[かわき]りに、会議[かいぎ]ではさまざまな不満[ふまん]が噴[ふ]き出[だ]した。",
        "furigana": "彼女[かのじょ]の発言[はつげん]を皮切[かわき]りに、会議[かいぎ]ではさまざまな不満[ふまん]が噴[ふ]き出[だ]した。",
        "reading": "kanojonohatsugenokawakirini、kaigidehasamazamanafumangafukidashita。",
        "translation": "Bắt đầu từ nhận xét của cô ấy, nhiều lời phàn nàn đã nổ ra trong cuộc họp."
      },
      {
        "text": "この店[みせ]は、駅前[えきまえ]への出店[しゅってん]を皮切[かわき]りに、市内[しない]で次々[つぎつぎ]と支店[してん]を増[ふ]やしていった。",
        "furigana": "この店[みせ]は、駅前[えきまえ]への出店[しゅってん]を皮切[かわき]りに、市内[しない]で次々[つぎつぎ]と支店[してん]を増[ふ]やしていった。",
        "reading": "konomiseha、ekimaehenoshuttenokawakirini、shinaidetsugitsugitoshitenofuyashiteitta。",
        "translation": "Cửa hàng này bắt đầu bằng việc mở một cửa hàng trước nhà ga, sau đó mở hết chi nhánh này đến chi nhánh khác trong thành phố."
      }
    ]
  },
  {
    "id": "ja-g-n1-94-o-ki-ni",
    "language": "ja",
    "level": "N1",
    "pattern": "〜を機に (o ki ni)",
    "meaning": "tận dụng cơ hội; với (một sự kiện) là một bước ngoặt",
    "formula": "Danh từ (N) + を機に / Động từ thể thông thường (V thường) + の + を機に",
    "note": "Trang trọng hơn 〜をきっかけに (N2), thường dùng để chỉ một bước ngoặt quan trọng. Ngoài ra 〜を機として.",
    "examples": [
      {
        "text": "還暦[かんれき]を機[き]に、父[ちち]は長年[ながねん]勤[つと]めた会社[かいしゃ]を退職[たいしょく]した。",
        "furigana": "還暦[かんれき]を機[き]に、父[ちち]は長年[ながねん]勤[つと]めた会社[かいしゃ]を退職[たいしょく]した。",
        "reading": "kanrekiokini、chichihanaganentsutometakaishaotaishokushita。",
        "translation": "Vào sinh nhật lần thứ 60, bố tôi nghỉ hưu ở công ty mà ông đã gắn bó nhiều năm."
      },
      {
        "text": "子[こ]どもが生[う]まれたのを機[き]に、郊外[こうがい]の一戸建[いっこだ]てに引[ひ]っ越[こ]した。",
        "furigana": "子[こ]どもが生[う]まれたのを機[き]に、郊外[こうがい]の一戸建[いっこだ]てに引[ひ]っ越[こ]した。",
        "reading": "kodomogaumaretanookini、kougainoikkodatenihikkoshita。",
        "translation": "Sau khi sinh con, tôi chuyển đến một ngôi nhà ở ngoại ô."
      },
      {
        "text": "今回[こんかい]の事故[じこ]を機[き]に、社内[しゃない]の安全[あんぜん]管理[かんり]体制[たいせい]が全面[ぜんめん]的[てき]に見直[みなお]された。",
        "furigana": "今回[こんかい]の事故[じこ]を機[き]に、社内[しゃない]の安全[あんぜん]管理[かんり]体制[たいせい]が全面[ぜんめん]的[てき]に見直[みなお]された。",
        "reading": "konkainojikookini、shanainoanzenkanritaiseigazenmentekiniminaosareta。",
        "translation": "Để đối phó với vụ tai nạn này, hệ thống quản lý an toàn của công ty đã được xem xét lại toàn bộ."
      }
    ]
  },
  {
    "id": "ja-g-n1-95-o-kagiri-ni",
    "language": "ja",
    "level": "N1",
    "pattern": "〜を限りに (o kagiri ni)",
    "meaning": "kể từ (và không còn nữa); lần cuối cùng; ở đầu (giọng nói)",
    "formula": "Danh từ (N) + を限りに",
    "note": "Đánh dấu điểm cuối cùng trước khi điều gì đó kết thúc (本日を限りに, 今回を限りに). 声を限りに 'to nhất có thể' là một cụm từ cố định.",
    "examples": [
      {
        "text": "本日[ほんじつ]を限[かぎ]りに、当店[とうてん]は四[よん]十[じゅう]年[ねん]の歴史[れきし]に幕[まく]を下[お]ろします。",
        "furigana": "本日[ほんじつ]を限[かぎ]りに、当店[とうてん]は四[よん]十[じゅう]年[ねん]の歴史[れきし]に幕[まく]を下[お]ろします。",
        "reading": "honjitsuokagirini、toutenhayonjuunennorekishinimakuooroshimasu。",
        "translation": "Kể từ hôm nay, cửa hàng của chúng tôi sẽ kết thúc lịch sử 40 năm hoạt động."
      },
      {
        "text": "彼[かれ]はこの試合[しあい]を限[かぎ]りに、現役[げんえき]を引退[いんたい]すると発表[はっぴょう]した。",
        "furigana": "彼[かれ]はこの試合[しあい]を限[かぎ]りに、現役[げんえき]を引退[いんたい]すると発表[はっぴょう]した。",
        "reading": "karehakonoshiaiokagirini、genekiointaisurutohappyoushita。",
        "translation": "Anh ấy tuyên bố sẽ nghỉ hưu sau trận đấu này."
      },
      {
        "text": "遭難[そうなん]者[しゃ]は声[こえ]を限[かぎ]りに助[たす]けを求[もと]めたが、誰[だれ]にも届[とど]かなかった。",
        "furigana": "遭難[そうなん]者[しゃ]は声[こえ]を限[かぎ]りに助[たす]けを求[もと]めたが、誰[だれ]にも届[とど]かなかった。",
        "reading": "sounanshahakoeokagirinitasukeomotometaga、darenimotodokanakatta。",
        "translation": "Nạn nhân hét to kêu cứu nhưng không ai đến được."
      }
    ]
  },
  {
    "id": "ja-g-n1-96-o-motte",
    "language": "ja",
    "level": "N1",
    "pattern": "〜をもって (o motte)",
    "meaning": "với; bằng cách; kể từ (một thời điểm)",
    "formula": "Danh từ (N) + をもって",
    "note": "Hai cách sử dụng: phương tiện (書面をもって, 実力をもって) và một điểm kết thúc trang trọng (本日をもって). 〜をもちまして thường dùng trong các thông báo; 〜をもってすれば = 'với ..., (bất cứ điều gì đều có thể)'.",
    "examples": [
      {
        "text": "以上[いじょう]をもちまして、本日[ほんじつ]の説明[せつめい]会[かい]を終了[しゅうりょう]いたします。",
        "furigana": "以上[いじょう]をもちまして、本日[ほんじつ]の説明[せつめい]会[かい]を終了[しゅうりょう]いたします。",
        "reading": "ijouomochimashite、honjitsunosetsumeikaioshuuryouitashimasu。",
        "translation": "Với điều này, chúng tôi kết thúc phiên họp giao ban ngày hôm nay."
      },
      {
        "text": "選考[せんこう]の結果[けっか]は、後日[ごじつ]書面[しょめん]をもってお知[し]らせいたします。",
        "furigana": "選考[せんこう]の結果[けっか]は、後日[ごじつ]書面[しょめん]をもってお知[し]らせいたします。",
        "reading": "senkounokekkaha、gojitsushomenomotteoshiraseitashimasu。",
        "translation": "Kết quả tuyển chọn sẽ được thông báo bằng văn bản sau."
      },
      {
        "text": "彼[かれ]はその圧倒的[あっとうてき]な実力[じつりょく]をもって、並[な]み居[い]る強豪[きょうごう]を次々[つぎつぎ]と打[う]ち破[やぶ]った。",
        "furigana": "彼[かれ]はその圧倒的[あっとうてき]な実力[じつりょく]をもって、並[な]み居[い]る強豪[きょうごう]を次々[つぎつぎ]と打[う]ち破[やぶ]った。",
        "reading": "karehasonoattoutekinajitsuryokuomotte、namiirukyougouotsugitsugitouchiyabutta。",
        "translation": "Với khả năng áp đảo của mình, anh lần lượt đánh bại nhiều đối thủ mạnh."
      }
    ]
  },
  {
    "id": "ja-g-n1-97-o-mono-tomo-sezu",
    "language": "ja",
    "level": "N1",
    "pattern": "〜をものともせず (o mono tomo sezu)",
    "meaning": "bất chấp; không nản lòng trước",
    "formula": "Danh từ (N) + をものともせず(に)",
    "note": "Mô tả ngưỡng mộ về người khác vượt qua khó khăn; không được sử dụng về bản thân. So sánh 〜をよそに (không quan tâm đến sự quan tâm của người khác, thường chỉ trích).",
    "examples": [
      {
        "text": "選手[せんしゅ]たちは激[はげ]しい雨[あめ]をものともせず、最後[さいご]まで全力[ぜんりょく]で戦[たたか]い抜[ぬ]いた。",
        "furigana": "選手[せんしゅ]たちは激[はげ]しい雨[あめ]をものともせず、最後[さいご]まで全力[ぜんりょく]で戦[たたか]い抜[ぬ]いた。",
        "reading": "senshutachihahageshiiameomonotomosezu、saigomadezenryokudetatakainuita。",
        "translation": "Các cầu thủ đã bất chấp cơn mưa lớn và chiến đấu hết mình cho đến phút cuối cùng."
      },
      {
        "text": "彼女[かのじょ]は周囲[しゅうい]の反対[はんたい]をものともせず、単身[たんしん]で海外[かいがい]へ渡[わた]った。",
        "furigana": "彼女[かのじょ]は周囲[しゅうい]の反対[はんたい]をものともせず、単身[たんしん]で海外[かいがい]へ渡[わた]った。",
        "reading": "kanojohashuuinohantaiomonotomosezu、tanshindekaigaihewatatta。",
        "translation": "Bất chấp sự phản đối của những người xung quanh, cô vẫn tự mình ra nước ngoài."
      },
      {
        "text": "救助[きゅうじょ]隊[たい]は余震[よしん]の危険[きけん]をものともせずに、倒壊[とうかい]した建物[たてもの]に入[はい]っていった。",
        "furigana": "救助[きゅうじょ]隊[たい]は余震[よしん]の危険[きけん]をものともせずに、倒壊[とうかい]した建物[たてもの]に入[はい]っていった。",
        "reading": "kyuujotaihayoshinnokikenomonotomosezuni、toukaishitatatemononihaitteitta。",
        "translation": "Đội cứu hộ tiến vào tòa nhà bị sập bất chấp nguy cơ xảy ra dư chấn."
      }
    ]
  },
  {
    "id": "ja-g-n1-98-o-yoso-ni",
    "language": "ja",
    "level": "N1",
    "pattern": "〜をよそに (o yoso ni)",
    "meaning": "bỏ qua; không chú ý tới; quên",
    "formula": "Danh từ (N) + をよそに",
    "note": "Danh từ thường là cảm xúc hoặc phản ứng của người khác (心配, 期待, 反対, 批判) mà chủ ngữ bỏ qua; thường phê bình nhẹ nhàng.",
    "examples": [
      {
        "text": "親[おや]の心配[しんぱい]をよそに、息子[むすこ]は連日[れんじつ]夜[よる]遅[おそ]くまで遊[あそ]び歩[ある]いている。",
        "furigana": "親[おや]の心配[しんぱい]をよそに、息子[むすこ]は連日[れんじつ]夜[よる]遅[おそ]くまで遊[あそ]び歩[ある]いている。",
        "reading": "oyanoshinpaioyosoni、musukoharenjitsuyoruosokumadeasobiaruiteiru。",
        "translation": "Bất chấp sự lo lắng của bố mẹ, con trai anh ngày nào cũng chơi đùa đến tận khuya."
      },
      {
        "text": "住民[じゅうみん]の反対[はんたい]をよそに、高層[こうそう]マンションの建設[けんせつ]が始[はじ]まった。",
        "furigana": "住民[じゅうみん]の反対[はんたい]をよそに、高層[こうそう]マンションの建設[けんせつ]が始[はじ]まった。",
        "reading": "juuminnohantaioyosoni、kousouマンションnokensetsugahajimatta。",
        "translation": "Việc xây dựng chung cư cao tầng được bắt đầu bất chấp sự phản đối của người dân."
      },
      {
        "text": "世間[せけん]の騒[さわ]ぎをよそに、当[とう]の本人[ほんにん]はのんびりと釣[つ]りを楽[たの]しんでいた。",
        "furigana": "世間[せけん]の騒[さわ]ぎをよそに、当[とう]の本人[ほんにん]はのんびりと釣[つ]りを楽[たの]しんでいた。",
        "reading": "sekennosawagioyosoni、tounohonninhanonbiritotsuriotanoshindeita。",
        "translation": "Bất chấp sự hỗn loạn trên thế giới, người được đề cập vẫn thư giãn và thích câu cá."
      }
    ]
  },
  {
    "id": "ja-g-n1-99-n-ga-tame-ni",
    "language": "ja",
    "level": "N1",
    "pattern": "〜んがため(に) (n ga tame ni)",
    "meaning": "để; vì (quyết tâm mạnh mẽ)",
    "formula": "Động từ thể ない (V-nai) stem + んがため(に) (する → せんがため)",
    "note": "Cổ xưa và nhấn mạnh, thể hiện quyết tâm mạnh mẽ; không phải vì những mục tiêu tầm thường. 〜んがための + Danh từ bổ nghĩa cho danh từ.",
    "examples": [
      {
        "text": "彼[かれ]は夢[ゆめ]をかなえんがため、全[ぜん]財産[ざいさん]をなげうって留学[りゅうがく]した。",
        "furigana": "彼[かれ]は夢[ゆめ]をかなえんがため、全[ぜん]財産[ざいさん]をなげうって留学[りゅうがく]した。",
        "reading": "karehayumeokanaengatame、zenzaisanonageutteryuugakushita。",
        "translation": "Để biến ước mơ thành hiện thực, anh đã từ bỏ toàn bộ tài sản và đi du học."
      },
      {
        "text": "勝[か]たんがための卑劣[ひれつ]な手段[しゅだん]は、スポーツマンシップに反[はん]する。",
        "furigana": "勝[か]たんがための卑劣[ひれつ]な手段[しゅだん]は、スポーツマンシップに反[はん]する。",
        "reading": "katangatamenohiretsunashudanha、スポーツマンシップnihansuru。",
        "translation": "Những phương pháp giành chiến thắng hèn hạ là phi thể thao."
      },
      {
        "text": "真実[しんじつ]を明[あき]らかにせんがために、記者[きしゃ]たちは危険[きけん]を顧[かえり]みず取材[しゅざい]を続[つづ]けた。",
        "furigana": "真実[しんじつ]を明[あき]らかにせんがために、記者[きしゃ]たちは危険[きけん]を顧[かえり]みず取材[しゅざい]を続[つづ]けた。",
        "reading": "shinjitsuoakirakanisengatameni、kishatachihakikenokaerimizushuzaiotsuzuketa。",
        "translation": "Các phóng viên tiếp tục đưa tin, bất chấp rủi ro, nhằm tìm ra sự thật."
      }
    ]
  },
  {
    "id": "ja-g-n1-100-n-bakari",
    "language": "ja",
    "level": "N1",
    "pattern": "〜んばかり (n bakari)",
    "meaning": "như thể sắp làm vậy; gần như (đến mức)",
    "formula": "Động từ thể ない (V-nai) stem + んばかり (する → せんばかり)",
    "note": "Một trạng thái cực đoan đến mức dường như có điều gì đó sắp xảy ra nhưng thực tế không phải vậy. Các dạng: 〜んばかりに, 〜んばかりだ, 〜んばかりの + Danh từ. 言わんばかり trùng với 〜とばかりに.",
    "examples": [
      {
        "text": "優勝[ゆうしょう]が決[き]まった瞬間[しゅんかん]、スタジアムは割[わ]れんばかりの拍手[はくしゅ]に包[つつ]まれた。",
        "furigana": "優勝[ゆうしょう]が決[き]まった瞬間[しゅんかん]、スタジアムは割[わ]れんばかりの拍手[はくしゅ]に包[つつ]まれた。",
        "reading": "yuushougakimattashunkan、スタジアムhawarenbakarinohakushunitsutsumareta。",
        "translation": "Giây phút phân thắng bại, sân vận động tràn ngập tiếng vỗ tay như sấm."
      },
      {
        "text": "彼女[かのじょ]は今[いま]にも泣[な]き出[だ]さんばかりの顔[かお]で、事情[じじょう]を説明[せつめい]した。",
        "furigana": "彼女[かのじょ]は今[いま]にも泣[な]き出[だ]さんばかりの顔[かお]で、事情[じじょう]を説明[せつめい]した。",
        "reading": "kanojohaimanimonakidasanbakarinokaode、jijouosetsumeishita。",
        "translation": "Cô ấy trông như sắp bật khóc khi giải thích tình hình."
      },
      {
        "text": "課長[かちょう]は「君[きみ]のせいだ」と言[い]わんばかりに、私[わたし]をにらみつけた。",
        "furigana": "課長[かちょう]は「君[きみ]のせいだ」と言[い]わんばかりに、私[わたし]をにらみつけた。",
        "reading": "kachouha「kiminoseida」toiwanbakarini、watashioniramitsuketa。",
        "translation": "Người quản lý trừng mắt nhìn tôi như muốn nói: \"Đó là lỗi của anh.\""
      }
    ]
  },
  {
    "id": "ja-g-n1-101-ue-wa",
    "language": "ja",
    "level": "N1",
    "pattern": "〜うえは (ue wa)",
    "meaning": "bây giờ mà; vì (người ta phải)",
    "formula": "Động từ thể từ điển (V-dict) / Động từ thể た (V-ta) + うえは",
    "note": "Giống như 〜以上(は) và 〜からには (N2) nhưng cứng hơn; nửa sau thể hiện quyết tâm, nghĩa vụ hoặc lời khuyên. Cũng được viết 上は.",
    "examples": [
      {
        "text": "引[ひ]き受[う]けたうえは、最後[さいご]まで責任[せきにん]を持[も]ってやり遂[と]げるつもりだ。",
        "furigana": "引[ひ]き受[う]けたうえは、最後[さいご]まで責任[せきにん]を持[も]ってやり遂[と]げるつもりだ。",
        "reading": "hikiuketaueha、saigomadesekininomotteyaritogerutsumorida。",
        "translation": "Sau khi nhận việc, tôi dự định sẽ chịu trách nhiệm và theo đuổi nó đến cùng."
      },
      {
        "text": "契約[けいやく]を結[むす]んだうえは、条件[じょうけん]は必[かなら]ず守[まも]っていただきます。",
        "furigana": "契約[けいやく]を結[むす]んだうえは、条件[じょうけん]は必[かなら]ず守[まも]っていただきます。",
        "reading": "keiyakuomusundaueha、joukenhakanarazumamotteitadakimasu。",
        "translation": "Khi đã ký hợp đồng thì phải tuân thủ các điều khoản và điều kiện."
      },
      {
        "text": "こうなったうえは、正直[しょうじき]にすべてを話[はな]すしかない。",
        "furigana": "こうなったうえは、正直[しょうじき]にすべてを話[はな]すしかない。",
        "reading": "kounattaueha、shoujikinisubeteohanasushikanai。",
        "translation": "Giờ việc này đã xảy ra rồi, tôi không còn cách nào khác ngoài việc phải thành thật kể cho bạn nghe mọi chuyện."
      }
    ]
  },
  {
    "id": "ja-g-n1-102-tada-nomi",
    "language": "ja",
    "level": "N1",
    "pattern": "ただ〜のみ (tada ... nomi)",
    "meaning": "; chỉ; không có gì ngoài",
    "formula": "ただ + Danh từ (N) + のみ / ただ + Động từ thể từ điển (V-dict) + のみ",
    "note": "Phiên bản trang trọng của ただ〜だけ. Thường kết thúc câu bằng 〜のみだ ('tất cả những gì một người có thể làm là ...'). riêng のみ cũng có nghĩa là 'chỉ' trong văn viết.",
    "examples": [
      {
        "text": "今[いま]はただ、手術[しゅじゅつ]の成功[せいこう]を祈[いの]るのみだ。",
        "furigana": "今[いま]はただ、手術[しゅじゅつ]の成功[せいこう]を祈[いの]るのみだ。",
        "reading": "imahatada、shujutsunoseikouoinorunomida。",
        "translation": "Tất cả những gì tôi có thể làm bây giờ là cầu nguyện cho ca phẫu thuật thành công."
      },
      {
        "text": "やるべきことはすべてやった。あとはただ結果[けっか]を待[ま]つのみだ。",
        "furigana": "やるべきことはすべてやった。あとはただ結果[けっか]を待[ま]つのみだ。",
        "reading": "yarubekikotohasubeteyatta。atohatadakekkaomatsunomida。",
        "translation": "Tôi đã làm tất cả những gì tôi phải làm. Việc còn lại là chờ kết quả."
      },
      {
        "text": "この洞窟[どうくつ]に入[はい]ることを許[ゆる]されたのは、ただ調査[ちょうさ]隊[たい]の隊員[たいいん]のみであった。",
        "furigana": "この洞窟[どうくつ]に入[はい]ることを許[ゆる]されたのは、ただ調査[ちょうさ]隊[たい]の隊員[たいいん]のみであった。",
        "reading": "konodoukutsunihairukotooyurusaretanoha、tadachousatainotaiinnomideatta。",
        "translation": "Chỉ có thành viên của nhóm nghiên cứu mới được phép vào hang động này."
      }
    ]
  },
  {
    "id": "ja-g-n1-103-dano-dano",
    "language": "ja",
    "level": "N1",
    "pattern": "〜だの〜だの (dano ... dano)",
    "meaning": "những thứ như A và B (danh sách phàn nàn)",
    "formula": "Danh từ (N) / Động từ thể thông thường (V thường) / Tính từ đuôi い (A-i) / Tính từ đuôi な (A-na) + だの + ... + だの",
    "note": "Liệt kê các ví dụ với sự khó chịu hoặc không tán thành, thường theo sau là と(言う). So sánh 〜やら〜やら trung tính (N2) và 〜とか〜とか.",
    "examples": [
      {
        "text": "息子[むすこ]は、野菜[やさい]は苦[にが]いだの肉[にく]は硬[かた]いだのと文句[もんく]ばかり言[い]って、なかなか食[た]べない。",
        "furigana": "息子[むすこ]は、野菜[やさい]は苦[にが]いだの肉[にく]は硬[かた]いだのと文句[もんく]ばかり言[い]って、なかなか食[た]べない。",
        "reading": "musukoha、yasaihanigaidanonikuhakataidanotomonkubakariitte、nakanakatabenai。",
        "translation": "Con trai tôi ăn không nhiều, kêu rau đắng, thịt dai."
      },
      {
        "text": "部屋[へや]の中[なか]は、古[ふる]い雑誌[ざっし]だの壊[こわ]れた家電[かでん]だので足[あし]の踏[ふ]み場[ば]もない。",
        "furigana": "部屋[へや]の中[なか]は、古[ふる]い雑誌[ざっし]だの壊[こわ]れた家電[かでん]だので足[あし]の踏[ふ]み場[ば]もない。",
        "reading": "heyanonakaha、furuizasshidanokowaretakadendanodeashinofumibamonai。",
        "translation": "Trong phòng toàn tạp chí cũ và đồ gia dụng hỏng nên không còn chỗ nào để bước."
      },
      {
        "text": "彼女[かのじょ]は、疲[つか]れただの眠[ねむ]いだのと言[い]って、なかなか宿題[しゅくだい]を始[はじ]めない。",
        "furigana": "彼女[かのじょ]は、疲[つか]れただの眠[ねむ]いだのと言[い]って、なかなか宿題[しゅくだい]を始[はじ]めない。",
        "reading": "kanojoha、tsukaretadanonemuidanotoitte、nakanakashukudaiohajimenai。",
        "translation": "Cô ấy không bắt đầu làm bài tập, nói rằng cô ấy chỉ mệt và buồn ngủ."
      }
    ]
  },
  {
    "id": "ja-g-n1-104-te-habakaranai",
    "language": "ja",
    "level": "N1",
    "pattern": "〜てはばからない (te habakaranai)",
    "meaning": "không ngần ngại; công khai (nói, tuyên bố)",
    "formula": "Động từ thể て (V-te) + はばからない",
    "note": "Với động từ nói (言う, 公言する, 断言する); thường ám chỉ sự táo bạo là quá mức. Thông thường là về người thứ ba.",
    "examples": [
      {
        "text": "彼[かれ]は自分[じぶん]こそが業界[ぎょうかい]一[いち]の技術[ぎじゅつ]者[しゃ]だと公言[こうげん]してはばからない。",
        "furigana": "彼[かれ]は自分[じぶん]こそが業界[ぎょうかい]一[いち]の技術[ぎじゅつ]者[しゃ]だと公言[こうげん]してはばからない。",
        "reading": "karehajibunkosogagyoukaiichinogijutsushadatokougenshitehabakaranai。",
        "translation": "Anh ấy không ngần ngại tuyên bố rằng mình là kỹ sư giỏi nhất trong ngành."
      },
      {
        "text": "その評論[ひょうろん]家[か]は、現[げん]政権[せいけん]の政策[せいさく]を失敗[しっぱい]だと断言[だんげん]してはばからない。",
        "furigana": "その評論[ひょうろん]家[か]は、現[げん]政権[せいけん]の政策[せいさく]を失敗[しっぱい]だと断言[だんげん]してはばからない。",
        "reading": "sonohyouronkaha、genseikennoseisakuoshippaidatodangenshitehabakaranai。",
        "translation": "Người phê bình không ngại tuyên bố các chính sách của chính quyền hiện tại là thất bại."
      },
      {
        "text": "監督[かんとく]は、このチームは必[かなら]ず優勝[ゆうしょう]すると言[い]ってはばからなかった。",
        "furigana": "監督[かんとく]は、このチームは必[かなら]ず優勝[ゆうしょう]すると言[い]ってはばからなかった。",
        "reading": "kantokuha、konoチームhakanarazuyuushousurutoittehabakaranakatta。",
        "translation": "Huấn luyện viên không ngại nói rằng đội bóng này nhất định sẽ giành chức vô địch."
      }
    ]
  },
  {
    "id": "ja-g-n1-105-tomo-arou",
    "language": "ja",
    "level": "N1",
    "pattern": "〜ともあろう (tomo arou)",
    "meaning": "của tất cả mọi người; ai đó (có địa vị như vậy) như",
    "formula": "Danh từ (N) + ともあろう + Danh từ (N)",
    "note": "Danh từ là một vai trò hoặc tổ chức được tôn trọng; câu phê phán hành vi không xứng đáng với nó. Thông thường là 〜ともあろう者が / 人が.",
    "examples": [
      {
        "text": "警察官[けいさつかん]ともあろう者[もの]が、飲酒[いんしゅ]運転[うんてん]で捕[つか]まるとは。",
        "furigana": "警察官[けいさつかん]ともあろう者[もの]が、飲酒[いんしゅ]運転[うんてん]で捕[つか]まるとは。",
        "reading": "keisatsukantomoaroumonoga、inshuuntendetsukamarutoha。",
        "translation": "Thật khó tin rằng một người có thể được coi là cảnh sát lại bị bắt vì lái xe trong tình trạng say rượu."
      },
      {
        "text": "一流[いちりゅう]ホテルともあろうものが、こんな初歩[しょほ]的[てき]なミスをするなんて信[しん]じられない。",
        "furigana": "一流[いちりゅう]ホテルともあろうものが、こんな初歩[しょほ]的[てき]なミスをするなんて信[しん]じられない。",
        "reading": "ichiryuuホテルtomoaroumonoga、konnashohotekinaミスosurunanteshinjirarenai。",
        "translation": "Tôi không thể tin được rằng nơi được cho là khách sạn hạng nhất lại mắc phải một sai lầm cơ bản như vậy."
      },
      {
        "text": "大臣[だいじん]ともあろう人[ひと]が、記者[きしゃ]の質問[しつもん]から逃[に]げるべきではない。",
        "furigana": "大臣[だいじん]ともあろう人[ひと]が、記者[きしゃ]の質問[しつもん]から逃[に]げるべきではない。",
        "reading": "daijintomoarouhitoga、kishanoshitsumonkaranigerubekidehanai。",
        "translation": "Một người có thể coi là bộ trưởng thì không nên trốn tránh câu hỏi của phóng viên."
      }
    ]
  },
  {
    "id": "ja-g-n1-106-ni-kakotsukete",
    "language": "ja",
    "level": "N1",
    "pattern": "〜にかこつけて (ni kakotsukete)",
    "meaning": "có thể sử dụng (cái gì đó) làm cái cớ hoặc cái cớ",
    "formula": "Danh từ (N) + にかこつけて",
    "note": "Lý do đã nêu là cái cớ cho điều người đó thực sự muốn làm. Gần 〜を口実に.",
    "examples": [
      {
        "text": "彼[かれ]は出張[しゅっちょう]にかこつけて、地方[ちほう]の温泉[おんせん]を巡[めぐ]っているらしい。",
        "furigana": "彼[かれ]は出張[しゅっちょう]にかこつけて、地方[ちほう]の温泉[おんせん]を巡[めぐ]っているらしい。",
        "reading": "karehashucchounikakotsukete、chihounoonsenomegutteirurashii。",
        "translation": "Có vẻ như anh ta đang đến thăm suối nước nóng địa phương dưới vỏ bọc một chuyến công tác."
      },
      {
        "text": "体調[たいちょう]不良[ふりょう]にかこつけて、面倒[めんどう]な会議[かいぎ]を欠席[けっせき]した。",
        "furigana": "体調[たいちょう]不良[ふりょう]にかこつけて、面倒[めんどう]な会議[かいぎ]を欠席[けっせき]した。",
        "reading": "taichoufuryounikakotsukete、mendounakaigiokessekishita。",
        "translation": "Tôi giả vờ ốm và bỏ lỡ cuộc họp rắc rối."
      },
      {
        "text": "子[こ]どもの誕生[たんじょう]日[び]にかこつけて、自分[じぶん]が食[た]べたかったケーキを買[か]ってきた。",
        "furigana": "子[こ]どもの誕生[たんじょう]日[び]にかこつけて、自分[じぶん]が食[た]べたかったケーキを買[か]ってきた。",
        "reading": "kodomonotanjoubinikakotsukete、jibungatabetakattaケーキokattekita。",
        "translation": "Tôi đã mua chiếc bánh tôi muốn ăn nhân ngày sinh nhật của con tôi."
      }
    ]
  },
  {
    "id": "ja-g-n1-107-ni-iwasereba",
    "language": "ja",
    "level": "N1",
    "pattern": "〜に言わせれば (ni iwasereba)",
    "meaning": "nếu bạn hỏi (ai đó); theo ý kiến ​​của (ai đó)",
    "formula": "Danh từ (N) + に言わせれば / Danh từ (N) + に言わせると",
    "note": "Đưa ra quan điểm cá nhân, có quan điểm mạnh mẽ và có thể khác với quan điểm của người khác. Không giống như 〜によれば trung lập, nó nhấn mạnh quan điểm của cá nhân.",
    "examples": [
      {
        "text": "祖母[そぼ]に言[い]わせれば、最近[さいきん]の若者[わかもの]は我慢[がまん]が足[た]りないそうだ。",
        "furigana": "祖母[そぼ]に言[い]わせれば、最近[さいきん]の若者[わかもの]は我慢[がまん]が足[た]りないそうだ。",
        "reading": "soboniiwasereba、saikinnowakamonohagamangatarinaisouda。",
        "translation": "Theo bà tôi, giới trẻ ngày nay thiếu kiên nhẫn."
      },
      {
        "text": "専門[せんもん]家[か]に言[い]わせれば、この程度[ていど]の揺[ゆ]れで建物[たてもの]が倒[たお]れることはまずないという。",
        "furigana": "専門[せんもん]家[か]に言[い]わせれば、この程度[ていど]の揺[ゆ]れで建物[たてもの]が倒[たお]れることはまずないという。",
        "reading": "senmonkaniiwasereba、konoteidonoyuredetatemonogataorerukotohamazunaitoiu。",
        "translation": "Các chuyên gia cho rằng rất khó có khả năng một tòa nhà sẽ sụp đổ do chấn động ở cường độ này."
      },
      {
        "text": "私[わたし]に言[い]わせれば、あの映画[えいが]は評判[ひょうばん]ほど面白[おもしろ]くない。",
        "furigana": "私[わたし]に言[い]わせれば、あの映画[えいが]は評判[ひょうばん]ほど面白[おもしろ]くない。",
        "reading": "watashiniiwasereba、anoeigahahyoubanhodoomoshirokunai。",
        "translation": "Theo mình thì phim đó không thú vị bằng danh tiếng của nó."
      }
    ]
  },
  {
    "id": "ja-g-n1-108-ni-kamakete",
    "language": "ja",
    "level": "N1",
    "pattern": "〜にかまけて (ni kamakete)",
    "meaning": "quá bị cuốn vào (để quan tâm đến những thứ khác)",
    "formula": "Danh từ (N) + にかまけて",
    "note": "Kết quả là mệnh đề chính nêu tên một điều gì đó bị bỏ quên; thường tự phê bình hoặc viện cớ.",
    "examples": [
      {
        "text": "仕事[しごと]にかまけて、家族[かぞく]と過[す]ごす時間[じかん]をおろそかにしてしまった。",
        "furigana": "仕事[しごと]にかまけて、家族[かぞく]と過[す]ごす時間[じかん]をおろそかにしてしまった。",
        "reading": "shigotonikamakete、kazokutosugosujikanoorosokanishiteshimatta。",
        "translation": "Tôi bận rộn với công việc đến mức bỏ bê việc dành thời gian cho gia đình."
      },
      {
        "text": "新[あたら]しいゲームにかまけて、試験[しけん]勉強[べんきょう]がまったく進[すす]んでいない。",
        "furigana": "新[あたら]しいゲームにかまけて、試験[しけん]勉強[べんきょう]がまったく進[すす]んでいない。",
        "reading": "atarashiiゲームnikamakete、shikenbenkyougamattakususundeinai。",
        "translation": "Tôi không tiến bộ gì trong việc ôn thi vì tôi quá bận chơi trò chơi mới."
      },
      {
        "text": "育児[いくじ]にかまけて、自分[じぶん]の健康[けんこう]診断[しんだん]を何[なん]年[ねん]も受[う]けていなかった。",
        "furigana": "育児[いくじ]にかまけて、自分[じぶん]の健康[けんこう]診断[しんだん]を何[なん]年[ねん]も受[う]けていなかった。",
        "reading": "ikujinikamakete、jibunnokenkoushindanonannenmouketeinakatta。",
        "translation": "Nhiều năm rồi tôi không đi khám sức khỏe vì bận nuôi con."
      }
    ]
  },
  {
    "id": "ja-g-n1-109-kai-mo-naku",
    "language": "ja",
    "level": "N1",
    "pattern": "〜かいもなく (kai mo naku)",
    "meaning": "mặc dù (nỗ lực); vô ích",
    "formula": "Động từ thể た (V-ta) + かいもなく / Danh từ (N) + の + かいもなく",
    "note": "Nỗ lực đã không được đền đáp. Từ tích cực 〜かいがあって có nghĩa là 'nỗ lực đó thật xứng đáng'. Cũng được viết 甲斐もなく.",
    "examples": [
      {
        "text": "家族[かぞく]の懸命[けんめい]な看病[かんびょう]のかいもなく、祖父[そふ]は静[しず]かに息[いき]を引[ひ]き取[と]った。",
        "furigana": "家族[かぞく]の懸命[けんめい]な看病[かんびょう]のかいもなく、祖父[そふ]は静[しず]かに息[いき]を引[ひ]き取[と]った。",
        "reading": "kazokunokenmeinakanbyounokaimonaku、sofuhashizukaniikiohikitotta。",
        "translation": "Ông nội tôi đã ra đi thanh thản mà không cần sự giúp đỡ của gia đình."
      },
      {
        "text": "必死[ひっし]に練習[れんしゅう]したかいもなく、一回戦[いっかいせん]で敗退[はいたい]してしまった。",
        "furigana": "必死[ひっし]に練習[れんしゅう]したかいもなく、一回戦[いっかいせん]で敗退[はいたい]してしまった。",
        "reading": "hisshinirenshuushitakaimonaku、ikkaisendehaitaishiteshimatta。",
        "translation": "Dù luyện tập chăm chỉ nhưng tôi đã bị loại ngay từ vòng đầu tiên."
      },
      {
        "text": "早起[はやお]きして並[なら]んだかいもなく、目当[めあ]ての限定[げんてい]品[ひん]は目[め]の前[まえ]で売[う]り切[き]れた。",
        "furigana": "早起[はやお]きして並[なら]んだかいもなく、目当[めあ]ての限定[げんてい]品[ひん]は目[め]の前[まえ]で売[う]り切[き]れた。",
        "reading": "hayaokishitenarandakaimonaku、meatenogenteihinhamenomaedeurikireta。",
        "translation": "Tôi thậm chí không cần phải dậy sớm xếp hàng chờ đợi, và món đồ phiên bản giới hạn mà tôi đang tìm kiếm đã được bán hết ngay trước mắt tôi."
      }
    ]
  },
  {
    "id": "ja-g-n1-110-kitte-no",
    "language": "ja",
    "level": "N1",
    "pattern": "〜きっての (kitte no)",
    "meaning": "nhất ... ở; điều tốt nhất trong",
    "formula": "Danh từ (N) + きっての + Danh từ (N)",
    "note": "Danh từ chỉ một nhóm hoặc một địa điểm (社内, 町内, 学校, 業界, 国内). Được sử dụng để khen ngợi, thường là của một người hoặc một tổ chức.",
    "examples": [
      {
        "text": "彼女[かのじょ]は社内[しゃない]きっての切[き]れ者[もの]として知[し]られている。",
        "furigana": "彼女[かのじょ]は社内[しゃない]きっての切[き]れ者[もの]として知[し]られている。",
        "reading": "kanojohashanaikittenokiremonotoshiteshirareteiru。",
        "translation": "Cô được biết đến là người thông minh nhất công ty."
      },
      {
        "text": "この旅館[りょかん]は、温泉[おんせん]街[がい]きっての老舗[しにせ]だ。",
        "furigana": "この旅館[りょかん]は、温泉[おんせん]街[がい]きっての老舗[しにせ]だ。",
        "reading": "konoryokanha、onsengaikittenoshiniseda。",
        "translation": "Nhà trọ này là một trong những nhà trọ lâu đời nhất ở thị trấn suối nước nóng."
      },
      {
        "text": "学年[がくねん]きっての秀才[しゅうさい]と言[い]われた兄[あに]も、社会[しゃかい]に出[で]てからは苦労[くろう]している。",
        "furigana": "学年[がくねん]きっての秀才[しゅうさい]と言[い]われた兄[あに]も、社会[しゃかい]に出[で]てからは苦労[くろう]している。",
        "reading": "gakunenkittenoshuusaitoiwaretaanimo、shakainidetekarahakuroushiteiru。",
        "translation": "Anh trai tôi, người được cho là người tài năng nhất lớp, đã gặp khó khăn kể từ khi bước vào lực lượng lao động."
      }
    ]
  },
  {
    "id": "ja-g-n1-111-zu-tomo",
    "language": "ja",
    "level": "N1",
    "pattern": "〜ずとも (zu tomo)",
    "meaning": "thậm chí không có; không cần phải",
    "formula": "Động từ thể ない (V-nai) stem + ずとも (する → せずとも)",
    "note": "Phiên bản văn học của 〜なくても. 〜ずともよい có nghĩa là 'không cần'.",
    "examples": [
      {
        "text": "わざわざ言[い]わずとも、彼[かれ]なら状況[じょうきょう]を察[さっ]してくれるだろう。",
        "furigana": "わざわざ言[い]わずとも、彼[かれ]なら状況[じょうきょう]を察[さっ]してくれるだろう。",
        "reading": "wazawazaiwazutomo、karenarajoukyouosasshitekurerudarou。",
        "translation": "Dù bạn không cố gắng nói ra thì chắc chắn anh ấy cũng sẽ hiểu được sự tình."
      },
      {
        "text": "これくらいの距離[きょり]なら、車[くるま]を使[つか]わずとも歩[ある]いて行[い]ける。",
        "furigana": "これくらいの距離[きょり]なら、車[くるま]を使[つか]わずとも歩[ある]いて行[い]ける。",
        "reading": "korekurainokyorinara、kurumaotsukawazutomoaruiteikeru。",
        "translation": "Bạn có thể đi bộ quãng đường này mà không cần sử dụng ô tô."
      },
      {
        "text": "急[いそ]がずとも、会議[かいぎ]にはまだ十分[じゅうぶん]間[ま]に合[あ]いますよ。",
        "furigana": "急[いそ]がずとも、会議[かいぎ]にはまだ十分[じゅうぶん]間[ま]に合[あ]いますよ。",
        "reading": "isogazutomo、kaiginihamadajuubunmaniaimasuyo。",
        "translation": "Dù không nhanh lên thì bạn vẫn còn nhiều thời gian cho cuộc họp."
      }
    ]
  },
  {
    "id": "ja-g-n1-112-to-wa-ie",
    "language": "ja",
    "level": "N1",
    "pattern": "〜とはいえ (to wa ie)",
    "meaning": "; mặc dù; mà nói",
    "formula": "Động từ thể thông thường (V thường) / Tính từ đuôi い (A-i) / Tính từ đuôi な (A-na) / Danh từ (N) + とはいえ",
    "note": "Thừa nhận một sự thật, sau đó nói rằng kết quả mong đợi không hoàn toàn như vậy. Có thể mở một câu ('điều đó đã nói'). Trang trọng hơn 〜といっても.",
    "examples": [
      {
        "text": "春[はる]とはいえ、朝晩[あさばん]はまだ冷[ひ]え込[こ]む。",
        "furigana": "春[はる]とはいえ、朝晩[あさばん]はまだ冷[ひ]え込[こ]む。",
        "reading": "harutohaie、asabanhamadahiekomu。",
        "translation": "Dù đang là mùa xuân nhưng trời vẫn lạnh vào buổi sáng và buổi tối."
      },
      {
        "text": "締[し]め切[き]りまで一[いっ]か月[げつ]あるとはいえ、そろそろ準備[じゅんび]を始[はじ]めたほうがいい。",
        "furigana": "締[し]め切[き]りまで一[いっ]か月[げつ]あるとはいえ、そろそろ準備[じゅんび]を始[はじ]めたほうがいい。",
        "reading": "shimekirimadeikkagetsuarutohaie、sorosorojunbiohajimetahougaii。",
        "translation": "Dù còn một tháng nữa mới đến hạn chót nhưng tốt hơn hết là hãy bắt đầu chuẩn bị ngay bây giờ."
      },
      {
        "text": "景気[けいき]は回復[かいふく]傾向[けいこう]にある。とはいえ、中小[ちゅうしょう]企業[きぎょう]の経営[けいえい]は依然[いぜん]として厳[きび]しい。",
        "furigana": "景気[けいき]は回復[かいふく]傾向[けいこう]にある。とはいえ、中小[ちゅうしょう]企業[きぎょう]の経営[けいえい]は依然[いぜん]として厳[きび]しい。",
        "reading": "keikihakaifukukeikouniaru。tohaie、chuushoukigyounokeieihaizentoshitekibishii。",
        "translation": "Nền kinh tế đang có xu hướng phục hồi. Tuy nhiên, việc quản lý doanh nghiệp vừa và nhỏ còn gặp nhiều khó khăn."
      }
    ]
  },
  {
    "id": "ja-g-n1-113-beku-shite",
    "language": "ja",
    "level": "N1",
    "pattern": "〜べくして (beku shite)",
    "meaning": "như điều chắc chắn sẽ xảy ra; chắc chắn",
    "formula": "Động từ thể từ điển (V-dict) + べくして + Động từ thể た (V-ta) (same verb)",
    "note": "Động từ tương tự được lặp lại (起こるべくして起こる); kết quả là hệ quả tự nhiên của hoàn cảnh.",
    "examples": [
      {
        "text": "安全[あんぜん]点検[てんけん]を怠[おこた]っていたのだから、あの事故[じこ]は起[お]こるべくして起[お]こったと言[い]える。",
        "furigana": "安全[あんぜん]点検[てんけん]を怠[おこた]っていたのだから、あの事故[じこ]は起[お]こるべくして起[お]こったと言[い]える。",
        "reading": "anzentenkenookotatteitanodakara、anojikohaokorubekushiteokottatoieru。",
        "translation": "Vì việc kiểm tra an toàn đã bị bỏ qua nên có thể nói rằng tai nạn đã xảy ra."
      },
      {
        "text": "誰[だれ]よりも練習[れんしゅう]を重[かさ]ねてきた彼女[かのじょ]は、勝[か]つべくして勝[か]ったのだ。",
        "furigana": "誰[だれ]よりも練習[れんしゅう]を重[かさ]ねてきた彼女[かのじょ]は、勝[か]つべくして勝[か]ったのだ。",
        "reading": "dareyorimorenshuuokasanetekitakanojoha、katsubekushitekattanoda。",
        "translation": "Cô ấy đã luyện tập nhiều hơn bất kỳ ai khác nên cô ấy thắng vì muốn thắng."
      },
      {
        "text": "もともと無理[むり]のある計画[けいかく]だったので、失敗[しっぱい]すべくして失敗[しっぱい]した。",
        "furigana": "もともと無理[むり]のある計画[けいかく]だったので、失敗[しっぱい]すべくして失敗[しっぱい]した。",
        "reading": "motomotomurinoarukeikakudattanode、shippaisubekushiteshippaishita。",
        "translation": "Đó là một kế hoạch bất khả thi ngay từ đầu, nên nó đã thất bại mặc dù định mệnh sẽ thất bại."
      }
    ]
  },
  {
    "id": "ja-g-n1-114-jimiru-jimita",
    "language": "ja",
    "level": "N1",
    "pattern": "〜じみる / 〜じみた (jimiru / jimita)",
    "meaning": "; có vẻ như (theo cách xấu); -ish",
    "formula": "Danh từ (N) + じみる / Danh từ (N) + じみた + Danh từ (N)",
    "note": "Sắc thái tiêu cực: 子どもじみた, 年寄りじみた, 説教じみた, 芝居じみた. So sánh 〜めく trung tính và 〜っぽい thông thường. Với 汗 hoặc 油 nó có nghĩa là 'vết bẩn'.",
    "examples": [
      {
        "text": "いい大人[おとな]が、そんな子[こ]どもじみた言[い]い訳[わけ]をするものではない。",
        "furigana": "いい大人[おとな]が、そんな子[こ]どもじみた言[い]い訳[わけ]をするものではない。",
        "reading": "iiotonaga、sonnakodomojimitaiiwakeosurumonodehanai。",
        "translation": "Một người lớn tốt sẽ không bao giờ đưa ra những lời bào chữa trẻ con như vậy."
      },
      {
        "text": "彼[かれ]の話[はなし]はどこか説教[せっきょう]じみていて、素直[すなお]に聞[き]く気[き]になれない。",
        "furigana": "彼[かれ]の話[はなし]はどこか説教[せっきょう]じみていて、素直[すなお]に聞[き]く気[き]になれない。",
        "reading": "karenohanashihadokokasekkyoujimiteite、sunaonikikukininarenai。",
        "translation": "Câu chuyện của anh nghe hơi giống một bài thuyết pháp, tôi nghe cũng không có hứng."
      },
      {
        "text": "彼[かれ]はまだ二[に]十[じゅう]代[だい]なのに、年寄[としよ]りじみたことばかり言[い]う。",
        "furigana": "彼[かれ]はまだ二[に]十[じゅう]代[だい]なのに、年寄[としよ]りじみたことばかり言[い]う。",
        "reading": "karehamadanijuudainanoni、toshiyorijimitakotobakariiu。",
        "translation": "Dù chỉ mới đôi mươi nhưng anh ấy luôn nói những điều nghe như một ông già."
      }
    ]
  },
  {
    "id": "ja-g-n1-115-gurumi",
    "language": "ja",
    "level": "N1",
    "pattern": "〜ぐるみ (gurumi)",
    "meaning": "bao gồm tất cả; cả (nhóm) cùng nhau",
    "formula": "Danh từ (N) + ぐるみ",
    "note": "Hoạt động với một số danh từ hạn chế: 家族, 町, 地域, 会社, 組織, 身ぐるみ. 会社ぐるみ / 組織ぐるみ thường mô tả hành vi sai trái có tổ chức.",
    "examples": [
      {
        "text": "隣[となり]の家[いえ]とは、家族[かぞく]ぐるみで付[つ]き合[あ]っている。",
        "furigana": "隣[となり]の家[いえ]とは、家族[かぞく]ぐるみで付[つ]き合[あ]っている。",
        "reading": "tonarinoietoha、kazokugurumidetsukiatteiru。",
        "translation": "Hàng xóm của tôi và tôi là bạn bè như một gia đình."
      },
      {
        "text": "この地域[ちいき]では、町[まち]ぐるみで子[こ]どもたちの登[とう]下校[げこう]を見守[みまも]っている。",
        "furigana": "この地域[ちいき]では、町[まち]ぐるみで子[こ]どもたちの登[とう]下校[げこう]を見守[みまも]っている。",
        "reading": "konochiikideha、machigurumidekodomotachinotougekouomimamotteiru。",
        "translation": "Khu vực này cả thị trấn trông chừng trẻ em đi học."
      },
      {
        "text": "調査[ちょうさ]の結果[けっか]、会社[かいしゃ]ぐるみの不正[ふせい]であったことが明[あき]らかになった。",
        "furigana": "調査[ちょうさ]の結果[けっか]、会社[かいしゃ]ぐるみの不正[ふせい]であったことが明[あき]らかになった。",
        "reading": "chousanokekka、kaishaguruminofuseideattakotogaakirakaninatta。",
        "translation": "Kết quả điều tra cho thấy đây là một vụ lừa đảo trên toàn công ty."
      }
    ]
  },
  {
    "id": "ja-g-n1-116-ni-mo-hodo-ga-aru",
    "language": "ja",
    "level": "N1",
    "pattern": "〜にもほどがある (ni mo hodo ga aru)",
    "meaning": "có giới hạn; quá ... (ngoài mức có thể chấp nhận được)",
    "formula": "Danh từ (N) / Tính từ đuôi な (A-na) / Tính từ đuôi い (A-i) / Động từ thể từ điển (V-dict) + にもほどがある",
    "note": "Chỉ trích mạnh mẽ hoặc phẫn nộ rằng điều gì đó đã đi quá xa. Trò chuyện và cảm xúc.",
    "examples": [
      {
        "text": "約束[やくそく]の時間[じかん]に二[に]時間[じかん]も遅[おく]れてくるなんて、非常識[ひじょうしき]にもほどがある。",
        "furigana": "約束[やくそく]の時間[じかん]に二[に]時間[じかん]も遅[おく]れてくるなんて、非常識[ひじょうしき]にもほどがある。",
        "reading": "yakusokunojikanninijikanmookuretekurunante、hijoushikinimohodogaaru。",
        "translation": "Trễ hai giờ trong cuộc hẹn là một điều quá điên rồ."
      },
      {
        "text": "初対面[しょたいめん]の人[ひと]に年収[ねんしゅう]を聞[き]くなんて、失礼[しつれい]にもほどがある。",
        "furigana": "初対面[しょたいめん]の人[ひと]に年収[ねんしゅう]を聞[き]くなんて、失礼[しつれい]にもほどがある。",
        "reading": "shotaimennohitoninenshuuokikunante、shitsureinimohodogaaru。",
        "translation": "Sẽ cực kỳ thô lỗ khi hỏi thu nhập hàng năm của ai đó khi bạn gặp họ lần đầu tiên."
      },
      {
        "text": "冗談[じょうだん]にもほどがある。そんな話[はなし]、誰[だれ]が信[しん]じるものか。",
        "furigana": "冗談[じょうだん]にもほどがある。そんな話[はなし]、誰[だれ]が信[しん]じるものか。",
        "reading": "joudannimohodogaaru。sonnahanashi、daregashinjirumonoka。",
        "translation": "Trò đùa có lý đấy. Ai sẽ tin một câu chuyện như vậy?"
      }
    ]
  },
  {
    "id": "ja-g-n1-117-o-ii-koto-ni",
    "language": "ja",
    "level": "N1",
    "pattern": "〜をいいことに (o ii koto ni)",
    "meaning": "lợi dụng (không công bằng); có thể sử dụng (một tình huống) làm giấy phép cho",
    "formula": "Danh từ (N) + をいいことに / Động từ thể thông thường (V thường) + の + をいいことに",
    "note": "Quan trọng: ai đó lợi dụng tình huống để làm điều gì đó không đúng đắn. Với cách 'nắm bắt cơ hội' một cách trung lập, hãy sử dụng 〜を機に hoặc 〜をきっかけに.",
    "examples": [
      {
        "text": "親[おや]が留守[るす]なのをいいことに、息子[むすこ]は友達[ともだち]を呼[よ]んで夜通[よどお]し騒[さわ]いでいた。",
        "furigana": "親[おや]が留守[るす]なのをいいことに、息子[むすこ]は友達[ともだち]を呼[よ]んで夜通[よどお]し騒[さわ]いでいた。",
        "reading": "oyagarusunanooiikotoni、musukohatomodachioyondeyodooshisawaideita。",
        "translation": "Lợi dụng lúc bố mẹ đi vắng, con trai tôi đã gọi bạn bè đến và gây ồn ào cả đêm."
      },
      {
        "text": "上司[じょうし]が何[なに]も言[い]わないのをいいことに、彼[かれ]は毎日[まいにち]のように遅刻[ちこく]してくる。",
        "furigana": "上司[じょうし]が何[なに]も言[い]わないのをいいことに、彼[かれ]は毎日[まいにち]のように遅刻[ちこく]してくる。",
        "reading": "joushigananimoiwanainooiikotoni、karehamainichinoyounichikokushitekuru。",
        "translation": "Hầu như ngày nào anh ta cũng về muộn, lợi dụng việc sếp không nói gì."
      },
      {
        "text": "高齢[こうれい]者[しゃ]の知識[ちしき]不足[ふそく]をいいことに、業者[ぎょうしゃ]は高額[こうがく]な契約[けいやく]を結[むす]ばせていた。",
        "furigana": "高齢[こうれい]者[しゃ]の知識[ちしき]不足[ふそく]をいいことに、業者[ぎょうしゃ]は高額[こうがく]な契約[けいやく]を結[むす]ばせていた。",
        "reading": "koureishanochishikifusokuoiikotoni、gyoushahakougakunakeiyakuomusubaseteita。",
        "translation": "Lợi dụng sự thiếu hiểu biết của người cao tuổi, doanh nghiệp ép họ ký những hợp đồng đắt giá."
      }
    ]
  },
  {
    "id": "ja-g-n1-118-ni-nottotte",
    "language": "ja",
    "level": "N1",
    "pattern": "〜に則って (ni nottotte)",
    "meaning": "theo (nội quy, luật lệ, truyền thống)",
    "formula": "Danh từ (N) + に則って / Danh từ (N) + に則った + Danh từ (N)",
    "note": "Danh từ là chuẩn mực hoặc hình mẫu: 法律, 規則, 伝統, しきたり, 手順. So sánh 〜に即して, dùng với sự kiện và điều kiện thực tế.",
    "examples": [
      {
        "text": "大会[たいかい]は、国際[こくさい]ルールに則[のっと]って公正[こうせい]に運営[うんえい]される。",
        "furigana": "大会[たいかい]は、国際[こくさい]ルールに則[のっと]って公正[こうせい]に運営[うんえい]される。",
        "reading": "taikaiha、kokusaiルールninottottekouseiniuneisareru。",
        "translation": "Giải đấu sẽ được vận hành công bằng theo đúng luật lệ quốc tế."
      },
      {
        "text": "二人[ふたり]の結婚式[けっこんしき]は、古[ふる]くからのしきたりに則[のっと]って神社[じんじゃ]で執[と]り行[おこな]われた。",
        "furigana": "二人[ふたり]の結婚式[けっこんしき]は、古[ふる]くからのしきたりに則[のっと]って神社[じんじゃ]で執[と]り行[おこな]われた。",
        "reading": "futarinokekkonshikiha、furukukaranoshikitarininottottejinjadetoriokonawareta。",
        "translation": "Đám cưới của họ được tổ chức tại một ngôi đền theo phong tục cổ xưa."
      },
      {
        "text": "本件[ほんけん]については、社内[しゃない]規定[きてい]に則[のっと]った処分[しょぶん]が下[くだ]される予定[よてい]だ。",
        "furigana": "本件[ほんけん]については、社内[しゃない]規定[きてい]に則[のっと]った処分[しょぶん]が下[くだ]される予定[よてい]だ。",
        "reading": "honkennitsuiteha、shanaikiteininottottashobungakudasareruyoteida。",
        "translation": "Về vấn đề này sẽ xử lý kỷ luật theo quy định nội bộ."
      }
    ]
  },
  {
    "id": "ja-g-n1-119-kare-kare",
    "language": "ja",
    "level": "N1",
    "pattern": "〜かれ〜かれ (kare ... kare)",
    "meaning": "dù là A hay B; A hoặc B giống nhau (cặp cố định) chỉ",
    "formula": "Tính từ đuôi い (A-i) stem + かれ + Tính từ đuôi い (A-i) stem + かれ",
    "note": "Một dạng tính từ cổ điển chỉ tồn tại khi có các cặp đối lập cố định: 遅かれ早かれ, 多かれ少なかれ, 良かれあしかれ. Không hiệu quả.",
    "examples": [
      {
        "text": "遅[おそ]かれ早[はや]かれ、この秘密[ひみつ]はみんなに知[し]られることになるだろう。",
        "furigana": "遅[おそ]かれ早[はや]かれ、この秘密[ひみつ]はみんなに知[し]られることになるだろう。",
        "reading": "osokarehayakare、konohimitsuhaminnanishirarerukotoninarudarou。",
        "translation": "Sớm hay muộn thì bí mật này cũng sẽ bị mọi người biết đến."
      },
      {
        "text": "多[おお]かれ少[すく]なかれ、誰[だれ]にでも人[ひと]に言[い]えない悩[なや]みはあるものだ。",
        "furigana": "多[おお]かれ少[すく]なかれ、誰[だれ]にでも人[ひと]に言[い]えない悩[なや]みはあるものだ。",
        "reading": "ookaresukunakare、darenidemohitoniienainayamihaarumonoda。",
        "translation": "Ít nhiều ai cũng có những nỗi lo không thể kể với ai."
      },
      {
        "text": "良[よ]かれあしかれ、あの人[ひと]の一言[ひとこと]が会社[かいしゃ]の方向[ほうこう]を決[き]めてきた。",
        "furigana": "良[よ]かれあしかれ、あの人[ひと]の一言[ひとこと]が会社[かいしゃ]の方向[ほうこう]を決[き]めてきた。",
        "reading": "yokareashikare、anohitonohitokotogakaishanohoukouokimetekita。",
        "translation": "Dù tốt hay xấu thì lời nói của người đó đã quyết định hướng đi của công ty."
      }
    ]
  },
  {
    "id": "ja-g-n1-120-koto-kono-ue-nai",
    "language": "ja",
    "level": "N1",
    "pattern": "〜ことこの上ない (koto kono ue nai)",
    "meaning": "cực kỳ; không gì có thể cao hơn",
    "formula": "Tính từ đuôi い (A-i) + ことこの上ない / Tính từ đuôi な (A-na) + な + ことこの上ない",
    "note": "Một cách viết cứng nhắc để nói 'cực kỳ'. Ngoài ra この上ない + Danh từ (この上ない喜び 'niềm vui lớn nhất'). Gần 〜極まりない.",
    "examples": [
      {
        "text": "深夜[しんや]の山道[やまみち]を一人[ひとり]で運転[うんてん]するのは、心細[こころぼそ]いことこの上[うえ]ない。",
        "furigana": "深夜[しんや]の山道[やまみち]を一人[ひとり]で運転[うんてん]するのは、心細[こころぼそ]いことこの上[うえ]ない。",
        "reading": "shinyanoyamamichiohitorideuntensurunoha、kokorobosoikotokonouenai。",
        "translation": "Lái xe một mình trên đường núi vào đêm khuya có thể cực kỳ đáng lo ngại."
      },
      {
        "text": "彼[かれ]の説明[せつめい]は回[まわ]りくどく、分[わ]かりにくいことこの上[うえ]ない。",
        "furigana": "彼[かれ]の説明[せつめい]は回[まわ]りくどく、分[わ]かりにくいことこの上[うえ]ない。",
        "reading": "karenosetsumeihamawarikudoku、wakarinikuikotokonouenai。",
        "translation": "Anh giải thích vòng vo và khó hiểu."
      },
      {
        "text": "会議[かいぎ]中[ちゅう]に何[なん]度[ど]も携帯[けいたい]電話[でんわ]が鳴[な]り、迷惑[めいわく]なことこの上[うえ]なかった。",
        "furigana": "会議[かいぎ]中[ちゅう]に何[なん]度[ど]も携帯[けいたい]電話[でんわ]が鳴[な]り、迷惑[めいわく]なことこの上[うえ]なかった。",
        "reading": "kaigichuuninandomokeitaidenwaganari、meiwakunakotokonouenakatta。",
        "translation": "Điện thoại di động của tôi reo nhiều lần trong cuộc họp, điều này cực kỳ khó chịu."
      }
    ]
  },
  {
    "id": "ja-g-n1-121-to-mieru-to-miete",
    "language": "ja",
    "level": "N1",
    "pattern": "〜とみえる / 〜とみえて (to mieru / to miete)",
    "meaning": "(đánh giá từ bằng chứng); hình như",
    "formula": "Động từ thể thông thường (V thường) / Tính từ đuôi い (A-i) / Tính từ đuôi な (A-na) / Danh từ (N) + とみえる / Động từ thể thông thường (V thường) / Tính từ đuôi い (A-i) / Tính từ đuôi な (A-na) / Danh từ (N) + とみえて",
    "note": "Một suy luận từ những gì người ta quan sát được; với 〜とみえて, bằng chứng quan sát được sẽ theo sau. Văn chương hơn 〜らしい / 〜ようだ. Cũng được viết là と見える.",
    "examples": [
      {
        "text": "息子[むすこ]はよほど疲[つか]れていたとみえて、夕食[ゆうしょく]も食[た]べずに眠[ねむ]ってしまった。",
        "furigana": "息子[むすこ]はよほど疲[つか]れていたとみえて、夕食[ゆうしょく]も食[た]べずに眠[ねむ]ってしまった。",
        "reading": "musukohayohodotsukareteitatomiete、yuushokumotabezuninemutteshimatta。",
        "translation": "Con trai tôi có vẻ rất mệt và ngủ quên khi chưa ăn tối."
      },
      {
        "text": "隣[となり]の家[いえ]は留守[るす]とみえて、何[なん]度[ど]チャイムを鳴[な]らしても返事[へんじ]がない。",
        "furigana": "隣[となり]の家[いえ]は留守[るす]とみえて、何[なん]度[ど]チャイムを鳴[な]らしても返事[へんじ]がない。",
        "reading": "tonarinoieharusutomiete、nandoチャイムonarashitemohenjiganai。",
        "translation": "Nhà bên cạnh hình như đi vắng, bấm chuông bao nhiêu lần cũng không có phản hồi."
      },
      {
        "text": "彼[かれ]はこの結果[けっか]にかなり満足[まんぞく]しているとみえる。",
        "furigana": "彼[かれ]はこの結果[けっか]にかなり満足[まんぞく]しているとみえる。",
        "reading": "karehakonokekkanikanarimanzokushiteirutomieru。",
        "translation": "Anh ấy có vẻ khá hài lòng với kết quả này."
      }
    ]
  },
  {
    "id": "ja-g-n1-122-o-fumaete",
    "language": "ja",
    "level": "N1",
    "pattern": "〜を踏まえて (o fumaete)",
    "meaning": "dựa trên; có tính đến; vì",
    "formula": "Danh từ (N) + を踏まえて / Danh từ (N) + を踏まえた + Danh từ (N)",
    "note": "Phổ biến trong kinh doanh và văn bản chính thức. Không giống như 〜に基づいて (N2), theo sát cơ sở, nó có nghĩa là dựa trên hoặc phản ánh điều gì đó.",
    "examples": [
      {
        "text": "アンケートの結果[けっか]を踏[ふ]まえて、来年度[らいねんど]のサービス内容[ないよう]を見直[みなお]すことにした。",
        "furigana": "アンケートの結果[けっか]を踏[ふ]まえて、来年度[らいねんど]のサービス内容[ないよう]を見直[みなお]すことにした。",
        "reading": "アンケートnokekkaofumaete、rainendonoサービスnaiyouominaosukotonishita。",
        "translation": "Dựa trên kết quả khảo sát, chúng tôi đã quyết định xem xét lại nội dung dịch vụ cho năm tới."
      },
      {
        "text": "過去[かこ]の失敗[しっぱい]を踏[ふ]まえたうえで、新[あら]たな計画[けいかく]を立[た]てるべきだ。",
        "furigana": "過去[かこ]の失敗[しっぱい]を踏[ふ]まえたうえで、新[あら]たな計画[けいかく]を立[た]てるべきだ。",
        "reading": "kakonoshippaiofumaetauede、aratanakeikakuotaterubekida。",
        "translation": "Những kế hoạch mới nên được thực hiện dựa trên những thất bại trong quá khứ."
      },
      {
        "text": "委員[いいん]会[かい]は現地[げんち]調査[ちょうさ]の結果[けっか]を踏[ふ]まえ、報告[ほうこく]書[しょ]をまとめた。",
        "furigana": "委員[いいん]会[かい]は現地[げんち]調査[ちょうさ]の結果[けっか]を踏[ふ]まえ、報告[ほうこく]書[しょ]をまとめた。",
        "reading": "iinkaihagenchichousanokekkaofumae、houkokushoomatometa。",
        "translation": "Ủy ban đã biên soạn báo cáo dựa trên kết quả khảo sát thực địa."
      }
    ]
  },
  {
    "id": "ja-g-n1-123-nai-to-mo-kagiranai",
    "language": "ja",
    "level": "N1",
    "pattern": "〜ないとも限らない (nai to mo kagiranai)",
    "meaning": "điều đó không phải là không thể; có khả năng là",
    "formula": "Động từ thể ない (V-nai) + とも限らない",
    "note": "Cảnh báo về một khả năng nhỏ nhưng có thật, thường là không mong muốn và thường kèm theo biện pháp phòng ngừa. Khác với 〜とは限らない ('không nhất thiết').",
    "examples": [
      {
        "text": "途中[とちゅう]で渋滞[じゅうたい]に巻[ま]き込[こ]まれないとも限[かぎ]らないから、早[はや]めに出発[しゅっぱつ]しよう。",
        "furigana": "途中[とちゅう]で渋滞[じゅうたい]に巻[ま]き込[こ]まれないとも限[かぎ]らないから、早[はや]めに出発[しゅっぱつ]しよう。",
        "reading": "tochuudejuutainimakikomarenaitomokagiranaikara、hayamenishuppatsushiyou。",
        "translation": "Không có gì đảm bảo rằng bạn sẽ không bị kẹt xe trên đường nên hãy xuất phát sớm nhé."
      },
      {
        "text": "誰[だれ]が聞[き]いていないとも限[かぎ]らないので、ここで仕事[しごと]の話[はなし]はやめておこう。",
        "furigana": "誰[だれ]が聞[き]いていないとも限[かぎ]らないので、ここで仕事[しごと]の話[はなし]はやめておこう。",
        "reading": "daregakiiteinaitomokagiranainode、kokodeshigotonohanashihayameteokou。",
        "translation": "Hãy ngừng nói về công việc ở đây vì không có gì đảm bảo rằng không có ai lắng nghe."
      },
      {
        "text": "大[おお]きな地震[じしん]がいつ起[お]きないとも限[かぎ]らない。日頃[ひごろ]から備[そな]えておくことが大切[たいせつ]だ。",
        "furigana": "大[おお]きな地震[じしん]がいつ起[お]きないとも限[かぎ]らない。日頃[ひごろ]から備[そな]えておくことが大切[たいせつ]だ。",
        "reading": "ookinajishingaitsuokinaitomokagiranai。higorokarasonaeteokukotogataisetsuda。",
        "translation": "Không có gì đảm bảo rằng một trận động đất lớn sẽ xảy ra bất cứ lúc nào. Điều quan trọng là phải chuẩn bị hàng ngày."
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
