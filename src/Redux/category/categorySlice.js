import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../../api/http'
import { CATEGORY} from '../../config/api'


const initialState = {
    categories: [],
}


export const fetchCategory = createAsyncThunk('category/fetchCategory', () => {
  return axios.get(`${CATEGORY}`)
    .then((res) =>{
    const result =  res.data
    return result
  })
    .catch((error) => error.message)
})
export const categorySlice = createSlice({
  name: 'categories',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchCategory.fulfilled, (state, action) => {
      state.categories = action.payload
    })
  },
})
export default categorySlice.reducer
