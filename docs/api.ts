import { components, header } from './config'

import { address } from './modules/address'
import { authentication } from './modules/auth'
import { privateRoute } from './modules/private/private-route'
import { person, users } from './modules/users'

export const apiDocs = {
  ...header,
  paths: {
    ...authentication,
    ...users,
    ...person,
    ...privateRoute,
    ...address,
  },

  components,
}
