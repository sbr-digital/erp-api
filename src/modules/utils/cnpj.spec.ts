import { INVALID_CNPJ, VALID_CNPJ } from '@/constants'
import { CNPJ } from './cnpj'

describe('CNPJ.calculaDV', () => {
  it('should calculate DV correctly', () => {
    expect(CNPJ.calculaDV('000000000001')).toBe('91')
    expect(CNPJ.calculaDV('12.ABC.345/01DE')).toBe('35')
  })

  it('should throw an error for invalid inputs', () => {
    expect(() => CNPJ.calculaDV('')).toThrow(Error)
    expect(() => CNPJ.calculaDV("'!@#$%&*-_=+^~")).toThrow(Error)
    expect(() => CNPJ.calculaDV('$0123456789A')).toThrow(Error)
    expect(() => CNPJ.calculaDV('012345?6789A')).toThrow(Error)
    expect(() => CNPJ.calculaDV('0123456789A#')).toThrow(Error)
    expect(() => CNPJ.calculaDV('12ABc34501DE')).toThrow(Error)
    expect(() => CNPJ.calculaDV('00000000000')).toThrow(Error)
    expect(() => CNPJ.calculaDV('00000000000191')).toThrow(Error)
  })
})

describe('CNPJ.isValid', () => {
  it('should return true for valid CNPJs', () => {
    const validCNPJs = VALID_CNPJ
    validCNPJs.forEach((cnpj) => {
      expect(CNPJ.isValid(cnpj)).toBe(true)
    })
  })

  it('should return false for invalid CNPJs', () => {
    const invalidCNPJs = INVALID_CNPJ
    invalidCNPJs.forEach((cnpj) => {
      expect(CNPJ.isValid(cnpj)).toBe(false)
    })
  })
})
