/* eslint-disable @typescript-eslint/no-explicit-any */
import { pickBy } from 'lodash'

import { PAGINATION } from '@/constants'

export * from './cpf'
export * from './cnpj'

/**
 * Filters out any properties from the given object that have a value of `undefined`.
 *
 * @param {Record<string, any>} data - The object to filter.
 * @return {T} - A new object with only the properties that have a value different from `undefined`.
 */
export const filterUndefinedValues = <T extends Record<string, any>>(
  data: T,
): T => {
  return pickBy(data, (value) => value !== undefined) as T
}

/**
 * Parses the given string as a page number. If the string is empty or not a number,
 * returns the default offset.
 *
 * @param {string | undefined} pageString - The string to parse.
 * @returns {number} - The parsed page number.
 */
export const parsePage = (pageString: string | undefined): number => {
  const pageNumber = parseInt(pageString ?? '', 10) || PAGINATION.OFFSET

  return pageNumber === 0 ? 1 : pageNumber
}

/**
 * Removes the specified keys from the given object.
 *
 * @template T - The type of the object.
 * @param {T} obj - The object from which to remove keys.
 * @param {(keyof T)[]} keys - The keys to remove.
 * @return {Omit<T, keyof typeof keys>} - The object with the specified keys removed.
 */
export function removeObjectKeys<T extends Record<string, any>>(
  obj: T,
  keys: (keyof T)[],
): Omit<T, keyof typeof keys> {
  const newObj: Partial<T> = {}

  for (const key in obj) {
    if (!keys.includes(key as keyof T)) {
      newObj[key] = obj[key]
    }
  }

  return newObj as Omit<T, keyof typeof keys>
}

export function mergeAndRemoveDuplicates<T>(
  key: keyof T,
  ...arrays: T[][]
): T[] {
  const mergedArray: T[] = []

  arrays.forEach((array) => {
    array.forEach((item) => {
      const index = mergedArray.findIndex(
        (existingItem) => existingItem[key] === item[key],
      )

      if (index > -1) {
        // Merge the existing item with the new item, prioritizing values from the new item
        mergedArray[index] = { ...mergedArray[index], ...item }
      } else {
        mergedArray.push(item)
      }
    })
  })

  return mergedArray
}

export function combineUniqueItems(arrays: (any[] | any)[]): any[] {
  if (!arrays || !Array.isArray(arrays)) return []

  return arrays.reduce<any[]>((result, element) => {
    return [...result, ...(Array.isArray(element) ? element : [element])]
  }, [])
}

export function getYearQuery(year: number) {
  if (!Number.isInteger(year) || year < 1500 || year > 9999) {
    throw new Error('Ano inválido. Deve ser um número entre 1500 e 9999.')
  }

  const startDate = new Date(Date.UTC(year, 0, 1, 0, 0, 0, 0))
  const endDate = new Date(Date.UTC(year, 11, 31, 23, 59, 59, 999))

  return {
    gte: startDate,
    lte: endDate,
  }
}
