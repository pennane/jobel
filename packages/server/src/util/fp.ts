import { isNil, pathSatisfies } from 'ramda'

export const pathIsNil = pathSatisfies(isNil)
