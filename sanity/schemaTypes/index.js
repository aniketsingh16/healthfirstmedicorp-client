import { allProductsType } from "./productSchema"
import { categoryType } from './categorySchema'
import { reviewType } from './reviewSchema'

export const schema = {
  types: [allProductsType, categoryType, reviewType],
}
