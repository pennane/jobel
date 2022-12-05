import { isNil } from 'ramda'
import { TConfig, TUnvalidatedConfig } from '.'

export const validateConfig = (c: TUnvalidatedConfig): TConfig => {
  const nullishEntries = Object.entries(c).filter(([_, value]) => isNil(value))

  if (nullishEntries.length > 0)
    throw new Error(
      'MISSING CONFIG VALUES' + nullishEntries.map(([key]) => key).join(', ')
    )

  return c as TConfig
}
