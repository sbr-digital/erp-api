import {
  // combineUniqueItems,
  filterUndefinedValues,
  mergeAndRemoveDuplicates,
  parsePage,
  removeObjectKeys,
  getYearQuery,
} from '.'

describe('filterUndefinedValues', () => {
  it('should return an empty object for an empty object', () => {
    const data = {}
    const result = filterUndefinedValues(data)
    expect(result).toEqual({})
  })

  it('should return an object with only defined properties', () => {
    const data = {
      a: 1,
      b: undefined,
      c: 'hello',
      d: null,
    }
    const result = filterUndefinedValues(data)
    expect(result).toEqual({ a: 1, c: 'hello', d: null })
  })

  it('should work with nested objects', () => {
    const data = {
      a: 1,
      b: undefined,
      c: {
        d: 'hello',
        e: undefined,
      },
    }
    const result = filterUndefinedValues(data)
    expect(result).toEqual({ a: 1, c: { d: 'hello' } })
  })
})

describe('parsePage', () => {
  it('should return the value 1 pagestring is empty', () => {
    expect(parsePage('')).toBe(1)
  })

  it('should return the value 1 offset when the pageString is not a number', () => {
    expect(parsePage('abc')).toBe(1)
  })

  it('should return 1 when the pageString is 0', () => {
    expect(parsePage('0')).toBe(1)
  })

  it('should return the parsed page number when the pageString is a valid number', () => {
    expect(parsePage('42')).toBe(42)
  })
})

describe('removeObjectKeys', () => {
  it('should remove specified keys from the object', () => {
    const obj = { a: 1, b: 2, c: 3 }
    const result = removeObjectKeys(obj, ['a', 'c'])

    expect(result).toEqual({ b: 2 })
  })

  it('should return an empty object if all keys are removed', () => {
    const obj = { a: 1, b: 2, c: 3 }
    const result = removeObjectKeys(obj, ['a', 'b', 'c'])

    expect(result).toEqual({})
  })

  it('should return the original object if no keys are specified', () => {
    const obj = { a: 1, b: 2, c: 3 }
    const keys: (keyof typeof obj)[] = []
    const result = removeObjectKeys(obj, keys)

    expect(result).toEqual(obj)
  })
})

describe('mergeAndRemoveDuplicates', () => {
  it('should return an empty array when input arrays are empty', () => {
    const result = mergeAndRemoveDuplicates('id', [], [])
    expect(result).toEqual([])
  })

  it('should return a single array with unique items', () => {
    const array1 = [
      { id: 1, name: 'John' },
      { id: 2, name: 'Jane' },
    ]
    const result = mergeAndRemoveDuplicates('id', array1)
    expect(result).toEqual(array1)
  })

  it('should merge multiple arrays with unique items', () => {
    const array1 = [
      { id: 1, name: 'John' },
      { id: 2, name: 'Jane' },
    ]
    const array2 = [
      { id: 3, name: 'Bob' },
      { id: 4, name: 'Alice' },
    ]
    const result = mergeAndRemoveDuplicates('id', array1, array2)
    expect(result).toEqual([...array1, ...array2])
  })

  it('should remove duplicates and merge items from multiple arrays', () => {
    const array1 = [
      { id: 1, name: 'John' },
      { id: 2, name: 'Jane' },
    ]
    const array2 = [
      { id: 1, name: 'John', age: 30 },
      { id: 3, name: 'Bob' },
    ]
    const result = mergeAndRemoveDuplicates('id', array1, array2)
    expect(result).toEqual([
      { id: 1, name: 'John', age: 30 },
      { id: 2, name: 'Jane' },
      { id: 3, name: 'Bob' },
    ])
  })

  it('should handle input arrays with different types of items', () => {
    const array1 = [
      { id: 1, name: 'John' },
      { id: 2, name: 'Jane' },
    ]
    const array2 = [
      { id: 1, age: 30 },
      { id: 3, occupation: 'Developer' },
    ]
    const result = mergeAndRemoveDuplicates('id', array1, array2 as never)
    expect(result).toEqual([
      { id: 1, name: 'John', age: 30 },
      { id: 2, name: 'Jane' },
      { id: 3, occupation: 'Developer' },
    ])
  })
})

describe('getYearQuery', () => {
  it('returns correct start and end dates for valid year', () => {
    const year = 2022
    const result = getYearQuery(year)
    expect(result.gte).toEqual(new Date(Date.UTC(year, 0, 1, 0, 0, 0, 0)))
    expect(result.lte).toEqual(
      new Date(Date.UTC(year, 11, 31, 23, 59, 59, 999)),
    )
  })

  it('throws error for invalid year', () => {
    expect(() => getYearQuery(100)).toThrowError(
      'Ano inválido. Deve ser um número entre 1500 e 9999.',
    )
  })

  it('throws error for year less than 1500', () => {
    expect(() => getYearQuery(1200)).toThrowError(
      'Ano inválido. Deve ser um número entre 1500 e 9999.',
    )
  })

  it('throws error for year greater than 9999', () => {
    expect(() => getYearQuery(10000)).toThrowError(
      'Ano inválido. Deve ser um número entre 1500 e 9999.',
    )
  })

  it('throws error for non-integer year', () => {
    expect(() => getYearQuery(2022.5)).toThrowError(
      'Ano inválido. Deve ser um número entre 1500 e 9999.',
    )
  })
})
