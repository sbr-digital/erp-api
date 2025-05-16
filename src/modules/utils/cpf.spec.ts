import { INVALID_CPF, VALID_CPF } from '@/constants'
import { CPF } from './cpf'

describe('CPF.calculaDV', () => {
  it('should calculate DV correctly', () => {
    expect(CPF.calculaDV('000000000')).toBe('00')
    expect(CPF.calculaDV('123456789')).toBe('09')
  })

  it('should throw an error for invalid inputs', () => {
    expect(() => CPF.calculaDV('')).toThrow(Error)
    expect(() => CPF.calculaDV('abcdefghij')).toThrow(Error)
    expect(() => CPF.calculaDV('12345678')).toThrow(Error)
    expect(() => CPF.calculaDV('123456789012')).toThrow(Error)
    expect(() => CPF.calculaDV('00000000000')).toThrow(Error)
  })
})

describe('CPF.isValid', () => {
  it('should return true for valid CPFs', () => {
    const validCPFs = VALID_CPF
    validCPFs.forEach((cpf) => {
      expect(CPF.isValid(cpf)).toBe(true)
    })
  })

  it('should return false for invalid CPFs', () => {
    const invalidCPFs = INVALID_CPF
    invalidCPFs.forEach((cpf) => {
      expect(CPF.isValid(cpf)).toBe(false)
    })
  })
})
