import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { NewInstance } from '../../api/http'
import { SUBCATEGORY } from '../../config/api'
// import NewInstance from '../../api/http'


const initialState = {
    subCategories: [],
}
 

export const fetchSubCategory = createAsyncThunk('subCategory/fetchSubCategory', () => {
  return NewInstance.get(`${SUBCATEGORY}`)
    .then((res) =>{
    const result =  res.data
    return result
  })
    .catch((error) => error.message)
})
export const subCategorySlice = createSlice({
  name: 'subCategory',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchSubCategory.fulfilled, (state, action) => {
      state.subCategories = action.payload
    })
  },
})
export default subCategorySlice.reducer
