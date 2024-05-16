import type { Category } from './Filters.i'

export interface ProductInterface {
  id: number
  title: string
  image: string
  prix: number
  description: string
  category: Category
}
