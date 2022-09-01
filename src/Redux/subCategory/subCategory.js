import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../../api/http'
import { SUBCATEGORY} from '../../config/api'


const initialState = {
    subCategories: [],
}
 

export const fetchSubCategory = createAsyncThunk('subCategory/fetchSubCategory', () => {
  return axios.get(`${SUBCATEGORY}`)
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
