
import { configureStore } from "@reduxjs/toolkit";
import genderReducer from '../genders/genderSlice'
import categoryReducer from '../categories/categorySlice'
import productReducer from '../products/productSlice'
export const store = configureStore({
    reducer: {
        gender: genderReducer,
        category: categoryReducer,
        product: productReducer 
    }
})