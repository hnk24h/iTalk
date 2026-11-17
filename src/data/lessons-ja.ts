import { Lesson } from '../types'

export const japaneseLessons: Lesson[] = [
  {
    id: 'ja-01',
    language: 'ja',
    title: 'Hội thoại làm quen & Giới thiệu bản thân',
    level: 'N5 - Cơ bản',
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
    id: 'ja-02',
    language: 'ja',
    title: 'Đặt hàng & Mua sắm tại siêu thị / Convenience store',
    level: 'N4 - Sơ trung cấp',
    category: 'Đời sống thường nhật',
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
    id: 'ja-03',
    language: 'ja',
    title: 'Ý kiến trong công việc & Thảo luận dự án',
    level: 'N3 - Trung cấp',
    category: 'Môi trường làm việc (Business)',
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
  }
]
