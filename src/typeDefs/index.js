import query from './query'
import mutations from './mutations'
import scalars from './scalars'
import { categoryTypes, productTypes, promoTypes } from './types'

export const typeDefs = [query, mutations, scalars, categoryTypes, productTypes, promoTypes]
