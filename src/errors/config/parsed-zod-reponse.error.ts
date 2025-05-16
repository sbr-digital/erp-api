type ErrorMessage = {
  code: string
  minimum?: number | bigint
  type?: string
  inclusive?: boolean
  exact?: boolean
  message: string
  path: (string | number)[]
  expected?: unknown
  received?: unknown
}

type ParsedZodError = {
  total: string
  errors: Record<string, string>
}

export function parsedZodErrors(errors_: ErrorMessage[]): ParsedZodError {
  return {
    total: `${errors_.length} errors found`,
    errors: errors_.reduce(
      (acc, { path, message }) => {
        acc[path.join('.')] = message
        return acc
      },
      {} as Record<string, string>,
    ),
  }
}
