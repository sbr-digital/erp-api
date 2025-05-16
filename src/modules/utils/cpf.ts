export class CPF {
  private static readonly tamanhoCPF: number = 11
  private static readonly regexCPF: RegExp = /^\d{11}$/
  private static readonly regexCaracteresNaoPermitidos: RegExp = /\D/g
  private static readonly cpfZerado: string = '00000000000'

  static isValid(cpf: string): boolean {
    const cpfSemMascara = this.removeMascaraCPF(cpf)

    // Verifica se é uma sequência repetida de números (000.000.000-00, 111.111.111-11, etc.)
    if (/^(\d)\1{10}$/.test(cpfSemMascara)) {
      return false
    }

    if (cpfSemMascara.length !== 11 || cpfSemMascara === this.cpfZerado) {
      return false
    }

    const dvCalculado = this.calculaDV(cpfSemMascara.substring(0, 9))
    return cpfSemMascara.endsWith(dvCalculado)
  }

  static calculaDV(cpf: string): string {
    if (cpf.length !== 9 || this.isSequenciaRepetida(cpf)) {
      throw new Error(
        'Não é possível calcular o DV pois o CPF fornecido é inválido',
      )
    }

    const dv1 = this.calculaDigitoVerificador(cpf, 10)
    const dv2 = this.calculaDigitoVerificador(cpf + dv1, 11)

    return `${dv1}${dv2}`
  }

  private static removeMascaraCPF(cpf: string): string {
    return cpf.replace(this.regexCaracteresNaoPermitidos, '')
  }

  private static isSequenciaRepetida(cpf: string): boolean {
    return /^(0-9)\1{10}$/.test(cpf)
  }

  private static calculaDigitoVerificador(
    base: string,
    pesoInicial: number,
  ): number {
    let sum = 0
    for (let i = 0; i < base.length; i++) {
      sum += parseInt(base[i]) * (pesoInicial - i)
    }
    const remainder = (sum * 10) % 11
    return remainder === 10 ? 0 : remainder
  }
}
