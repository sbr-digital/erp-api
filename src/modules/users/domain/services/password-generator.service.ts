export class Password {
  private static readonly LOWERCASE_LETTERS = 'abcdefghijklmnopqrstuvwxyz'
  private static readonly UPPERCASE_LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  private static readonly DIGITS = '0123456789'
  private static readonly SYMBOLS = '!@#$%^&*()_+-=[]{};\':"\\|,.<>/?'

  private static getCharacters(): string {
    return `${Password.LOWERCASE_LETTERS}${Password.UPPERCASE_LETTERS}${Password.DIGITS}${Password.SYMBOLS}`
  }

  static generate(): string {
    const password: string[] = [
      Password.randomChar(Password.UPPERCASE_LETTERS),
      Password.randomChar(Password.LOWERCASE_LETTERS),
      Password.randomChar(Password.DIGITS),
      Password.randomChar(Password.SYMBOLS),
    ]

    while (password.length < 12) {
      password.push(Password.randomChar(Password.getCharacters()))
    }

    Password.shuffle(password)

    return password.join('')
  }

  static randomChar(characters: string): string {
    return characters[Math.floor(Math.random() * characters.length)]
  }

  static shuffle(array: unknown[]): void {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[array[i], array[j]] = [array[j], array[i]]
    }
  }
}
