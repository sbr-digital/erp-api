import { inject, injectable } from 'tsyringe'

import { CONTAINER } from '@/constants'
import { UserNotFoundError } from '@/errors'

import { IPersonRepository } from '../../../domain'
import { PeopleWithAddressAndEmailResponse } from '../../../domain/types/people.types'
import { ListPersonInfoInput } from '../../../dtos'

interface PersonOutput extends PeopleWithAddressAndEmailResponse {}
@injectable()
export class ListPersonInfoUseCase {
  constructor(
    @inject(CONTAINER.REPOSITORIES.PERSON)
    private personRepository: IPersonRepository,
  ) {}

  async execute({ personId }: ListPersonInfoInput): Promise<PersonOutput> {
    const person = await this.personRepository.findByPersonID({
      id: personId,
    })

    if (!person) {
      throw new UserNotFoundError({
        resource: 'ListPersonInfoUseCase',
        data: { personId },
      })
    }

    return person
  }
}
