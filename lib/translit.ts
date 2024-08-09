export default function translit(word: string) {
  const converter = {
    а: 'a',
    б: 'b',
    в: 'v',
    г: 'g',
    д: 'd',
    е: 'e',
    ё: 'e',
    ж: 'zh',
    з: 'z',
    и: 'i',
    й: 'y',
    к: 'k',
    л: 'l',
    м: 'm',
    н: 'n',
    о: 'o',
    п: 'p',
    р: 'r',
    с: 's',
    т: 't',
    у: 'u',
    ф: 'f',
    х: 'h',
    ц: 'c',
    ч: 'ch',
    ш: 'sh',
    щ: 'sch',
    ь: '',
    ы: 'y',
    ъ: '',
    э: 'e',
    ю: 'yu',
    я: 'ya',
  }

  word = word.toLowerCase() // eslint-disable-line no-param-reassign

  let answer: string = ''
  if (word?.length > 0) {
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < word.length; ++i) {
      if (converter[word[i] as keyof typeof converter] === undefined) {
        answer += word[i]
      } else {
        answer += converter[word[i] as keyof typeof converter]
      }
    }
  }

  answer = answer.replace(/[^-0-9a-z]/g, '-')
  answer = answer.replace(/[-]+/g, '-')
  // eslint-disable-next-line no-useless-escape
  answer = answer.replace(/^\-|-$/g, '')
  return answer
}
