import { MockNodeCacheService } from '@/infra/services'

import { InMemoryPersonRepository } from '../../../infra/database'
import { ListPeopleUseCase } from '../../../application/use-cases'

describe('ListPersonUseCase', () => {
  let personRepoitory: InMemoryPersonRepository
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let cacheService: MockNodeCacheService<any>
  let listPeopleUseCase: ListPeopleUseCase

  beforeEach(() => {
    personRepoitory = new InMemoryPersonRepository()
    cacheService = new MockNodeCacheService()
    listPeopleUseCase = new ListPeopleUseCase(personRepoitory, cacheService)
  })

  it('should be possible to list all people', async () => {
    const result = await listPeopleUseCase.execute({
      name: undefined,
      page: 1,
      pageSize: 10,
    })

    const { people } = result

    expect(people.length).toBeGreaterThan(0)

    const person = people[0]

    expect(person).toEqual(
      expect.objectContaining({
        name: expect.any(String),
        documentNumber: expect.any(String),
      }),
    )
    expect(result).toEqual(
      expect.objectContaining({
        total: expect.any(Number),
        page: expect.any(Number),
        count: expect.any(Number),
        perPage: expect.any(Number),
        totalPages: expect.any(Number),
        hasNext: expect.any(Boolean),
        cacheValue: expect.any(String),
      }),
    )
  })
})
