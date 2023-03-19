import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {BOOKS, } from '../../config/api'
import { NewInstance } from '../../api/http'

const initialState = {
  loading: false,
  dividedProducts: [],
  total: 0,
}

// http://localhost:3001/products?subcategory=3&_page=1&_limit=10
// GET  
export const dividedProductWithSub = createAsyncThunk('dividedSubcategoryApi/dividedProductWithSub',
 async ({page, id}) => {
    return NewInstance.get(`${BOOKS}?subcategory=${id}&_page=${page}&_limit=10`)
      .then((res) => {
        return {
            dividedProducts: res.data,
            total: res.headers['x-total-count']
          }
        })
    // return res;
    })

// SLICE
export const dividedProductsSlide = createSlice({
  name: 'dividedSubcategoryApi',
  initialState,
  extraReducers: (builder) => {

    // GET
    builder.addCase(dividedProductWithSub.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(dividedProductWithSub.fulfilled, (state, action) => {
      state.loading = false;
      state.dividedProducts =  action.payload.dividedProducts;
      state.total = action.payload.total;
      state.error = "";
    });
    builder.addCase(dividedProductWithSub.rejected, (state, action) => {
      state.loading = false;
      state.dividedProducts = [];
      state.error = action.error.message;
    });
 
}})

export default dividedProductsSlide.reducer
