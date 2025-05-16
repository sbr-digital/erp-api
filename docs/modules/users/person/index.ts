import { createPerson } from './create'
import { deletePerson } from './delete'
import { listPeople } from './list'
import { listPersonInfo } from './list-person-info'
import { updatePerson } from './update'

const combinedPersonPath = {
  '/person': {
    ...createPerson['/person'],
    ...listPeople['/person'],
  },
  '/person/{id}': {
    ...updatePerson['/person/{id}'],
    ...deletePerson['/person/{id}'],
  },
  '/person/info/{id}': {
    ...listPersonInfo['/person/info/{id}'],
  },
}

export const person = {
  ...combinedPersonPath,
}
