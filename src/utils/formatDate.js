export default (date, isMonth) => {
  const now = new Date(date)
  const m = now.getMonth() + 1
  const d = now.getDate()
  const value = []
  value.push(now.getFullYear())
  value.push(m > 9 ? `${m}` : `0${m}`)
  if (!isMonth) value.push(d > 9 ? `${d}` : `0${d}`)
  return value.join('-')
}
