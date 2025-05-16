import { createAddress } from './create'
import { deleteAddress } from './delete'
import { listAddress } from './list'
import { updateAddress } from './update'

const combinedAddressPath = {
  '/address': {
    ...createAddress['/address'],
  },
  '/address/{id}': {
    ...listAddress['/address/{id}'],
    ...deleteAddress['/address/{id}'],
    ...updateAddress['/address/{id}'],
  },
}
export const address = {
  ...combinedAddressPath,
}
