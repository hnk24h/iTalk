import json, os, re, time, urllib.request, urllib.parse

OPENJLPT_DIR = '/home/hoank/workspace/iTalk/src/data/openjlpt'
CACHE_FILE = '/home/hoank/workspace/iTalk/src/data/openjlpt/translation_cache.json'

cache = {}
if os.path.exists(CACHE_FILE):
    try:
        with open(CACHE_FILE, 'r', encoding='utf-8') as f:
            cache = json.load(f)
    except Exception as e:
        print('Error loading cache:', e)

def save_cache():
    with open(CACHE_FILE, 'w', encoding='utf-8') as f:
        json.dump(cache, f, ensure_ascii=False, indent=2)

def translate_single(text, sl='en', tl='vi', retries=3):
    text = text.strip()
    if not text:
        return ''
    key = f'{sl}:{tl}:{text}'
    if key in cache:
        return cache[key]

    for attempt in range(retries):
        try:
            url = f'https://translate.googleapis.com/translate_a/single?client=gtx&sl={sl}&tl={tl}&dt=t&q=' + urllib.parse.quote(text)
            req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
            with urllib.request.urlopen(req, timeout=10) as resp:
                res = json.loads(resp.read().decode('utf-8'))
                translated = ''.join([part[0] for part in res[0] if part[0]]).strip()
                cache[key] = translated
                return translated
        except Exception as e:
            time.sleep(1 + attempt)
    return text

def translate_batch(texts, sl='ja', tl='vi', batch_size=20):
    results = {}
    to_fetch = []
    for t in texts:
        t_clean = t.strip()
        key = f'{sl}:{tl}:{t_clean}'
        if key in cache:
            results[t] = cache[key]
        else:
            to_fetch.append(t_clean)

    if not to_fetch:
        for t in texts:
            results[t] = cache.get(f'{sl}:{tl}:{t.strip()}', t)
        return results

    print(f'Translating {len(to_fetch)} items ({sl} -> {tl})...')
    for i in range(0, len(to_fetch), batch_size):
        chunk = to_fetch[i:i+batch_size]
        delimiter = ' @#@ '
        combined = delimiter.join(chunk)
        try:
            url = f'https://translate.googleapis.com/translate_a/single?client=gtx&sl={sl}&tl={tl}&dt=t&q=' + urllib.parse.quote(combined)
            req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
            with urllib.request.urlopen(req, timeout=15) as resp:
                res = json.loads(resp.read().decode('utf-8'))
                full = ''.join([part[0] for part in res[0] if part[0]])
                parts = [p.strip() for p in full.split('@#@')]
                if len(parts) == len(chunk):
                    for orig, trans in zip(chunk, parts):
                        cache[f'{sl}:{tl}:{orig}'] = trans
                        results[orig] = trans
                else:
                    for item in chunk:
                        results[item] = translate_single(item, sl=sl, tl=tl)
            save_cache()
            time.sleep(0.3)
        except Exception as e:
            print(f'Batch error: {e}, falling back to single')
            for item in chunk:
                results[item] = translate_single(item, sl=sl, tl=tl)
            save_cache()
            time.sleep(0.5)

    for t in texts:
        if t not in results:
            results[t] = cache.get(f'{sl}:{tl}:{t.strip()}', t)
    return results

def format_formula(formation):
    if not formation:
        return ''
    f = formation
    replacements = [
        ('Noun (receiver)', 'Danh từ người nhận'),
        ('Noun (giver)', 'Danh từ người tặng'),
        ('Noun (topic)', 'Danh từ chủ đề'),
        ('Noun (place)', 'Danh từ địa điểm'),
        ('Noun (time)', 'Danh từ thời gian'),
        ('Noun', 'Danh từ (N)'),
        ('Verb-te form', 'Động từ thể て (V-te)'),
        ('Verb-te', 'Động từ thể て (V-te)'),
        ('Verb-dict form', 'Động từ thể từ điển (V-dict)'),
        ('Verb-dict', 'Động từ thể từ điển (V-dict)'),
        ('Verb-dictionary form', 'Động từ thể từ điển (V-dict)'),
        ('Verb-stem', 'Động từ thể ます bỏ ます (V-masu)'),
        ('Verb-masu stem', 'Động từ thể ます bỏ ます (V-masu)'),
        ('Verb-nai form', 'Động từ thể ない (V-nai)'),
        ('Verb-nai', 'Động từ thể ない (V-nai)'),
        ('Verb-ta form', 'Động từ thể た (V-ta)'),
        ('Verb-ta', 'Động từ thể た (V-ta)'),
        ('Verb-plain form', 'Động từ thể thông thường (V thường)'),
        ('Verb-plain', 'Động từ thể thông thường (V thường)'),
        ('Verb-volitional', 'Động từ thể ý chí (V-ý chí)'),
        ('Verb-potential', 'Động từ thể khả năng (V khả năng)'),
        ('Verb-passive', 'Động từ thể bị động (V bị động)'),
        ('Verb-causative', 'Động từ thể sai khiến (V sai khiến)'),
        ('Verb-imperative', 'Động từ thể mệnh lệnh (V mệnh lệnh)'),
        ('Verb-conditional', 'Động từ thể điều kiện (V thể điều kiện)'),
        ('i-Adj', 'Tính từ đuôi い (A-i)'),
        ('na-Adj', 'Tính từ đuôi な (A-na)'),
        ('Phrase', 'Mệnh đề câu'),
        ('Plain form', 'Thể thông thường'),
        ('Sentence', 'Câu'),
        ('Question word', 'Từ để hỏi'),
    ]
    for en, vi in replacements:
        f = f.replace(en, vi)
    return f

def convert_furigana(furi_str):
    return re.sub(r'\{([^|}]+)\|([^}]+)\}', r'\1[\2]', furi_str)

def furigana_to_kana(furi_str):
    return re.sub(r'\{[^|}]+\|([^}]+)\}', r'\1', furi_str)

KANA_MAP = {
    'きゃ': 'kya', 'きゅ': 'kyu', 'きょ': 'kyo',
    'しゃ': 'sha', 'しゅ': 'shu', 'しょ': 'sho',
    'ちゃ': 'cha', 'ちゅ': 'chu', 'ちょ': 'cho',
    'にゃ': 'nya', 'にゅ': 'nyu', 'にょ': 'nyo',
    'ひゃ': 'hya', 'ひゅ': 'hyu', 'ひょ': 'hyo',
    'みゃ': 'mya', 'みゅ': 'myu', 'みょ': 'myo',
    'りゃ': 'rya', 'りゅ': 'ryu', 'りょ': 'ryo',
    'ぎゃ': 'gya', 'ぎゅ': 'gyu', 'ぎょ': 'gyo',
    'じゃ': 'ja', 'じゅ': 'ju', 'じょ': 'jo',
    'びゃ': 'bya', 'びゅ': 'byu', 'びょ': 'byo',
    'ぴゃ': 'pya', 'ぴゅ': 'pyu', 'ぴょ': 'pyo',
    'あ': 'a', 'い': 'i', 'う': 'u', 'え': 'e', 'お': 'o',
    'か': 'ka', 'き': 'ki', 'く': 'ku', 'け': 'ke', 'こ': 'ko',
    'さ': 'sa', 'し': 'shi', 'す': 'su', 'せ': 'se', 'そ': 'so',
    'た': 'ta', 'ち': 'chi', 'つ': 'tsu', 'て': 'te', 'と': 'to',
    'な': 'na', 'に': 'ni', 'ぬ': 'nu', 'ね': 'ne', 'の': 'no',
    'は': 'ha', 'ひ': 'hi', 'ふ': 'fu', 'へ': 'he', 'ほ': 'ho',
    'ま': 'ma', 'み': 'mi', 'む': 'mu', 'め': 'me', 'も': 'mo',
    'や': 'ya', 'ゆ': 'yu', 'よ': 'yo',
    'ら': 'ra', 'り': 'ri', 'る': 'ru', 'れ': 're', 'ろ': 'ro',
    'わ': 'wa', 'を': 'o', 'ん': 'n',
    'が': 'ga', 'ぎ': 'gi', 'ぐ': 'gu', 'げ': 'ge', 'ご': 'go',
    'ざ': 'za', 'じ': 'ji', 'ず': 'zu', 'ぜ': 'ze', 'ぞ': 'zo',
    'だ': 'da', 'ぢ': 'ji', 'づ': 'zu', 'で': 'de', 'ど': 'do',
    'ば': 'ba', 'び': 'bi', 'ぶ': 'bu', 'べ': 'be', 'ぼ': 'bo',
    'ぱ': 'pa', 'ぴ': 'pi', 'ぷ': 'pu', 'ぺ': 'pe', 'ぽ': 'po',
}

def kana_to_romaji(kana_str):
    res = []
    i = 0
    n = len(kana_str)
    while i < n:
        if kana_str[i] == 'っ' and i + 1 < n:
            next_ch = kana_str[i+1:i+3]
            rom = KANA_MAP.get(next_ch) or KANA_MAP.get(kana_str[i+1])
            if rom:
                res.append(rom[0])
            i += 1
            continue
        if i + 1 < n and kana_str[i:i+2] in KANA_MAP:
            res.append(KANA_MAP[kana_str[i:i+2]])
            i += 2
        elif kana_str[i] in KANA_MAP:
            res.append(KANA_MAP[kana_str[i]])
            i += 1
        elif kana_str[i] in '。、！？':
            res.append(kana_str[i])
            i += 1
        else:
            res.append(kana_str[i])
            i += 1
    return ''.join(res)

print('Setup complete')

def main():
    levels = ['n5', 'n4', 'n3', 'n2', 'n1']
    all_level_data = {}

    total_patterns = 0
    total_examples = 0

    # 1. Load data
    for lvl in levels:
        file_path = os.path.join(OPENJLPT_DIR, f'{lvl}.json')
        with open(file_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
        all_level_data[lvl] = data
        total_patterns += len(data)
        for item in data:
            total_examples += len(item.get('examples', []))

    print(f'Total patterns to process: {total_patterns}, Total examples: {total_examples}')

    # 2. Collect texts to translate
    meanings_to_translate = []
    examples_to_translate = []

    for lvl in levels:
        for item in all_level_data[lvl]:
            meaning = item.get('meaning', '').strip()
            if meaning:
                meanings_to_translate.append(meaning)
            for ex in item.get('examples', []):
                ja_text = ex.get('ja', '').strip()
                if ja_text:
                    examples_to_translate.append(ja_text)

    # 3. Batch translate
    print('Starting translation of meanings (en -> vi)...')
    translated_meanings = translate_batch(list(set(meanings_to_translate)), sl='en', tl='vi', batch_size=20)
    print('Done translating meanings.')

    print('Starting translation of example sentences (ja -> vi)...')
    translated_examples = translate_batch(list(set(examples_to_translate)), sl='ja', tl='vi', batch_size=20)
    print('Done translating examples.')

    save_cache()

    # 4. Build output GrammarPattern objects
    output_patterns = []

    for lvl in levels:
        lvl_upper = lvl.upper()
        for idx, item in enumerate(all_level_data[lvl]):
            pat_id = f"ja-g-{lvl}-{idx+1:02d}-{item.get('id', 'item')}"
            pattern_name = item.get('pattern', '')
            romaji = item.get('romaji', '')
            meaning_en = item.get('meaning', '').strip()
            meaning_vi = translated_meanings.get(meaning_en, meaning_en)

            formation_raw = item.get('formation', '')
            formula_vi = format_formula(formation_raw)

            notes_raw = item.get('notes', '')
            note_vi = ''
            if notes_raw:
                note_vi = translate_single(notes_raw, sl='en', tl='vi')

            # Examples
            ex_objs = []
            for ex in item.get('examples', []):
                ja_text = ex.get('ja', '').strip()
                furi_raw = ex.get('furigana', '')
                furi_formatted = convert_furigana(furi_raw) if furi_raw else ja_text
                kana = furigana_to_kana(furi_raw) if furi_raw else ja_text
                rom = kana_to_romaji(kana)

                trans_vi = translated_examples.get(ja_text, ex.get('en', ''))
                if not trans_vi:
                    trans_vi = ex.get('en', '')

                ex_objs.append({
                    "text": furi_formatted,
                    "furigana": furi_formatted,
                    "reading": rom,
                    "translation": trans_vi
                })

            output_patterns.append({
                "id": pat_id,
                "language": "ja",
                "level": lvl_upper,
                "pattern": f"{pattern_name} ({romaji})" if romaji and romaji not in pattern_name else pattern_name,
                "meaning": meaning_vi,
                "formula": formula_vi or "Theo ngữ cảnh ngữ pháp thực tế",
                "note": note_vi or None,
                "examples": ex_objs
            })

    # Read existing japaneseKaiwa from grammar-ja.ts
    grammar_ja_file = '/home/hoank/workspace/iTalk/src/data/grammar-ja.ts'
    kaiwa_content = ''
    if os.path.exists(grammar_ja_file):
        with open(grammar_ja_file, 'r', encoding='utf-8') as f:
            old_content = f.read()
        k_idx = old_content.find('export const japaneseKaiwa')
        if k_idx != -1:
            kaiwa_content = old_content[k_idx:]

    # If no kaiwa found, fallback
    if not kaiwa_content:
        kaiwa_content = 'export const japaneseKaiwa: KaiwaGroup[] = []\n'

    # 5. Format TypeScript file
    ts_code = "import { GrammarPattern, KaiwaGroup } from '../types'\n\n"
    ts_code += "export const japaneseGrammar: GrammarPattern[] = "
    ts_code += json.dumps(output_patterns, ensure_ascii=False, indent=2)
    ts_code += "\n\n"
    ts_code += kaiwa_content

    with open(grammar_ja_file, 'w', encoding='utf-8') as f:
        f.write(ts_code)

    print(f'Successfully generated {grammar_ja_file} with {len(output_patterns)} grammar patterns!')

if __name__ == '__main__':
    main()
