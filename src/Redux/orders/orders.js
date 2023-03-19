import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../../api/http'
import { ORDERS} from '../../config/api'
const initialState = {
  orders: [],
}


export const fetchOrders = createAsyncThunk('orders/fetchOrders', ({page, limit}) => {
  return axios.get(`${ORDERS}?_page=${page}&_limit=${limit}`)
    .then((res) =>res.data)
    .catch((error) => error.message)
})


export const addOrder = createAsyncThunk('orders/addOrder' , (newOrder) => {
  return axios.post(ORDERS, newOrder)
  .then(res => res.data)
  .catch(error => error.message)
})
export const deliveredOrders = createAsyncThunk('orders/deliveredOrders', ({page, limit })=> {
  return axios.get(`${ORDERS}/?delivered=true&_page=${page}&_limit=${limit}`)
  .then((res) =>res.data)
  .catch((error) => error.message)
})

export const handleDeliver = createAsyncThunk('handleDeliver/deliveredOrders', ({id, time})=> {
  return axios.patch(`${ORDERS}/${id}`, {delivered: true, deliveredAt: `${time}`})
  .then((res) =>res.data)
  .catch((error) => error.message)
})

export const pendingOrders = createAsyncThunk('orders/pendingOrders', ({page, limit}) => {
  return axios.get(`${ORDERS}/?delivered=false&_page=${page}&_limit=${limit}`)
  .then((res) =>res.data)
  .catch((error) => error.message)
})
export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchOrders.fulfilled, (state, action) => {
      state.orders = action.payload
    })

    builder.addCase(deliveredOrders.fulfilled, (state, action) => {
      state.orders = action.payload
    })


    builder.addCase(pendingOrders.fulfilled, (state, action) => {
      state.orders = action.payload
    })
// ADD ORDER
    builder.addCase(addOrder.fulfilled, (state, action) => {
      state.loading = false;
      state.orders.push(action.payload)
      state.error = action.error.message;

    })

    // DELIVERED
    builder.addCase(handleDeliver.fulfilled, (state, action) => {
      const {id, time} = action.payload
      state.loading = false;
      state.orders = state.orders.map(order => order.id === id ?
         order = action.payload
          : null)
      state.error = action.error.message;

    })

    
}})
export default ordersSlice.reducer
