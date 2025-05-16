import { ERROR_CATEGORY, HTTP_STATUS_CODE } from '@/constants/errors'
import { IFastifyError, IFastifyErrorPayload } from '@/interfaces'

import { CustomError } from '../config/custom.error'

export class AuthenticationError extends CustomError {
  constructor(context: unknown) {
    const errorPayload: IFastifyErrorPayload = {
      errorText:
        ERROR_CATEGORY.AUTHENTICATION_ERROR.UNAUTHORIZED_ERROR.MESSAGE.PT_BR,
      errorCode:
        ERROR_CATEGORY.AUTHENTICATION_ERROR.UNAUTHORIZED_ERROR.ERROR_CODE,
      context,
    }

    const error: IFastifyError = {
      message: errorPayload,
      statusCode: HTTP_STATUS_CODE.UNAUTHORIZED,
    }

    super(error)

    console.log(
      'report',
      `${this.name}: ${errorPayload.errorCode}\n${JSON.stringify(error)}`,
    )
  }
}
