import { inject, injectable } from 'tsyringe'

import { CACHE_KEYS, CONTAINER } from '@/constants'
import { ICacheService } from '@/core/domain'
import { Paginate } from '@/core/types/Generic.types'

import { IPersonRepository } from '../../../domain'
import { PeopleWithAddressAndEmailResponse } from '../../../domain/types/people.types'

type ListPeopleOutput = PeopleWithAddressAndEmailResponse

type ListPersonInput = {
  name: string | undefined
  page: number
  pageSize: number
}

@injectable()
export class ListPeopleUseCase {
  constructor(
    @inject(CONTAINER.REPOSITORIES.PERSON)
    private personRepository: IPersonRepository,
    @inject(CONTAINER.SERVICES.CACHE)
    private cacheService: ICacheService<Paginate<ListPeopleOutput, 'people'>>,
  ) {}

  async execute({
    name,
    page,
    pageSize,
  }: ListPersonInput): Promise<Paginate<ListPeopleOutput, 'people'>> {
    const cache = this.cacheService.get(CACHE_KEYS.PERSON)
    const cacheValue = `${name}-${page}-${pageSize}`

    if (cache && cache.cacheValue === cacheValue) {
      return this.cacheService.get(CACHE_KEYS.PERSON)
    }

    const result = await this.personRepository.listAll({
      name,
      page: (page - 1) * pageSize,
      pageSize,
    })

    const { people, total } = result

    const totalPages = Math.ceil(total / pageSize)

    const response = {
      people,
      page,
      count: people.length,
      perPage: pageSize,
      totalPages,
      hasNext: page !== totalPages && page < totalPages,
      total,
      cacheValue,
    }

    this.cacheService.set(CACHE_KEYS.PERSON, response)

    return response
  }
}
