const WORDS_PER_MINUTE = 225

export default function readingTime(wordcount) {
  const words = Math.max(0, Number(wordcount) || 0)
  const minutes = Math.max(1, Math.ceil(words / WORDS_PER_MINUTE))

  return `${minutes} min read`
}
