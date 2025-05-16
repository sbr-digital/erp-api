import { ERROR_CATEGORY, HTTP_STATUS_CODE } from '@/constants/errors'
import { IFastifyError, IFastifyErrorPayload } from '@/interfaces'

import { CustomError } from '../config/custom.error'

export class AddressNotFoundError extends CustomError {
  constructor(context: unknown) {
    const errorPayload: IFastifyErrorPayload = {
      errorText: ERROR_CATEGORY.ADDRESS_ERROR.NOT_FOUND_ERROR.MESSAGE.PT_BR,
      errorCode: ERROR_CATEGORY.ADDRESS_ERROR.NOT_FOUND_ERROR.ERROR_CODE,
      context,
    }

    const error: IFastifyError = {
      message: errorPayload,
      statusCode: HTTP_STATUS_CODE.NOT_FOUND,
    }

    super(error)

    console.log(
      'report',
      `${this.name}: ${errorPayload.errorCode}\n${JSON.stringify(error)}`,
    )
  }
}
