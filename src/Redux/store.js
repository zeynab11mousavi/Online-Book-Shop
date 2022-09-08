import { configureStore } from '@reduxjs/toolkit'
import ordersSlice from './orders/orders'
import booksSlice from './books/books'
import categorySlice from './category/categorySlice'
import  subCategorySlice  from './subCategory/subCategory'
import usersSlice from './user/userSlice'
import  homeSlice  from './home/homeSlice'
import  dividedProductsSlide  from './dividedProducts/dividedProducts'
export default configureStore({
  reducer: {
    orders: ordersSlice,
    books: booksSlice,
    categories: categorySlice,
    subCategories: subCategorySlice,
    users: usersSlice,
    booksDividedBySubcategory: homeSlice,
    dividedProducts: dividedProductsSlide,
  },
})
