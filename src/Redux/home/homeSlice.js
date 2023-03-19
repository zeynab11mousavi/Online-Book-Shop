import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {BOOKS, } from '../../config/api'
import { NewInstance } from '../../api/http'

const initialState = {
  loading: false,
  booksDividedBySubcategory: [],
}

//HEADER 
export const subcategoryHeader = createAsyncThunk('subcategoryApi/subcategoryHeader', (subcategoryId) => {
  return NewInstance.get(`${BOOKS}?subcategory=${subcategoryId}&_limit=1`)
    .then((res) => res.headers['x-total-count'])})   

// GET  
export const getWithSubcategory = createAsyncThunk('subcategoryApi/getWithSubcategory', (n) => {
    return NewInstance.get(`${BOOKS}?subcategory=${n}&_limit=6`)
      .then((res) => res.data)
    })

      
// SLICE
export const homeSlice = createSlice({
  name: 'subcategoryApi',
  initialState,
  extraReducers: (builder) => {

    // HEADER
    builder.addCase(subcategoryHeader.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
    });

    // GET
    builder.addCase(getWithSubcategory.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getWithSubcategory.fulfilled, (state, action) => {
      state.loading = false;
      state.booksDividedBySubcategory =  action.payload;
      state.error = "";
    });
    builder.addCase(getWithSubcategory.rejected, (state, action) => {
      state.loading = false;
      state.booksDividedBySubcategory = [];
      state.error = action.error.message;
    });
 
}})

export default homeSlice.reducer
