import { Address } from '../../../domain'

export class AddressDomainAdapter {
  static toDatabase({
    id,
    country,
    enable,
    state,
    street,
    number,
    details,
    city,
    zipCode,
    district,
    updatedAt,
  }: Partial<Address>) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data: any = { id }

    return {
      ...data,
      ...(country !== undefined && { country }),
      ...(enable !== undefined && { enable }),
      ...(street !== undefined && { street }),
      ...(number !== undefined && { number }),
      ...(details !== undefined && { details }),
      ...(city !== undefined && { city }),
      ...(state !== undefined && { state }),
      ...(zipCode !== undefined && { zip_code: zipCode }),
      ...(district !== undefined && { district }),
      ...(updatedAt && { updated_at: updatedAt }),
    }
  }
}
