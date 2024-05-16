import type { Category } from './types'

export interface ProductInterface {
  _id: string
  createdAt: string
  title: string
  image: string
  prix: number
  description: string
  category: Category
}
