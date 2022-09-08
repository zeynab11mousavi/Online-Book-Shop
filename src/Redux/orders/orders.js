import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../../api/http'
import { ORDERS} from '../../config/api'
const initialState = {
  orders: [],
}


export const fetchOrders = createAsyncThunk('orders/fetchOrders', () => {
  return axios.get(`${ORDERS}`)
    .then((res) =>{
    const result =  res.data
    return result
  })
    .catch((error) => error.message)
})
export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchOrders.fulfilled, (state, action) => {
      state.orders = action.payload
    })
  },
})
export default ordersSlice.reducer
