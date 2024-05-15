import type { ProductInterface } from './product.i'

export interface ProductCartInterface extends ProductInterface {
  quantity: number
}
