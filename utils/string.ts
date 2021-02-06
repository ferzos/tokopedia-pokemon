export const toTitleCase = (text: string) => {
  const [firstChar, ...rest] = text

  return [firstChar.toUpperCase(), ...rest].join('')
}