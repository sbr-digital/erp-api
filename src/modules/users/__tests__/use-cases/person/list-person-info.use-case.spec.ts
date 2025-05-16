import { UserNotFoundError } from '@/errors'

import { ListPersonInfoUseCase } from '../../../application/use-cases'
import { InMemoryPersonRepository } from '../../../infra/database'
import { fakePeople } from './../../mocks/fake-people'

let personRepository: InMemoryPersonRepository
let listPersonInfoUseCase: ListPersonInfoUseCase

beforeEach(() => {
  personRepository = new InMemoryPersonRepository()
  listPersonInfoUseCase = new ListPersonInfoUseCase(personRepository)
})

describe('ListPersonInfoUseCase', () => {
  it('should be possible to list a person info', async () => {
    const result = await listPersonInfoUseCase.execute({
      personId: fakePeople[0].id,
    })

    expect(result).toEqual(
      expect.objectContaining({
        email: expect.any(String),
        userId: expect.any(String),
      }),
    )
  })

  it('should be not possibe to list user info if user not found', async () => {
    await expect(() =>
      listPersonInfoUseCase.execute({
        personId: 999,
      }),
    ).rejects.toBeInstanceOf(UserNotFoundError)
  })
})
