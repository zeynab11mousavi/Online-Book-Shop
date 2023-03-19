import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../../api/http'
import {BOOKS, URL} from '../../config/api'
const initialState = {
  loading: false,
  books: [],
  oneBook: '',
  total: '',
}

//  HEADER
export const header = createAsyncThunk('booksApi/header', () => {
  return axios.get(`${BOOKS}?_page=1&_limit=1`)
    .then((res) => res.headers['x-total-count'])})    


// GET ONE BOOK
export const fetchOneBook = createAsyncThunk('booksApi/fetchOneBook', (id) => {
  return axios.get(`${BOOKS}?id=${id}`)
    .then((res) => res.data)})


//  GET DATA
export const fetchBooks = createAsyncThunk('booksApi/fetchBooks', (currentPage, limitPage) => {
  return axios.get(`${BOOKS}?_page=${currentPage}&_limit=5`)
    .then((res) => res.data)})
 

// DELETE ITEM
export const fetchDeleteBook = createAsyncThunk('booksApi/fetchDeleteBook', (id) => {
  return axios.delete(`${BOOKS}/${id}`).then(res => res.data)
})



// GET DATA FOR PRICE AND QUANTITY 
export const fetchPriceAndQuantity = createAsyncThunk('booksApi/fetchPriceAndQuantity', () => {
  return axios.get(`${BOOKS}`)
    .then((res) => res.data)})


    
//  EDIT PRICE OR QUANTITY
export const fetchEditPriceOrQuantity = createAsyncThunk('booksApi/fetchEditPriceOrQuantity', ({id, newData}) => {
  return axios.patch(`${BOOKS}/${id}`, {price: newData.price, quantity: newData.quantity})
  .then(res => res.data)
} )


// EDIT BOOK
export const fetchEditBook = createAsyncThunk('booksApi/fetchEditBook', ( mockBook) => {
  return axios.put(`${BOOKS}/${mockBook.id}`, mockBook)
  .then(res => (res.data) )
} )


// ADD
export const fetchAddBook = createAsyncThunk("booksApi/fetchAddBook", (newBook) => {
  const body = 
    { name: newBook.name,
    author: newBook.author,
    image: newBook.image,
    thumbnail: newBook.thumbnail,
    price: newBook.price,
    quantity: newBook.quantity,
    // createdAt: newBook.createdAt,
    category: newBook.category,
    subcategory: newBook.subcategory,
    description: newBook.description 
  };
  return axios.post(BOOKS, body).then((res) => (res.data));
});


// SLICE
export const booksSlice = createSlice({
  name: 'booksApi',
  initialState,
  extraReducers: (builder) => {

    // HEADER
    builder.addCase(header.fulfilled, (state, action) => {
      state.loading = false;
      state.total = action.payload
      state.error = "";
    });

    // ONE BOOK 
    builder.addCase(fetchOneBook.fulfilled, (state, action) => {
      state.loading = false;
      state.oneBook = action.payload
      state.error = "";
    });

    // GET
    builder.addCase(fetchBooks.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchBooks.fulfilled, (state, action) => {
      state.loading = false;
      state.books =  action.payload;
      // state.header = action
      state.error = "";
    });
    builder.addCase(fetchBooks.rejected, (state, action) => {
      state.loading = false;
      state.books = [];
      state.error = action.error.message;
    });
    // ADD
    builder.addCase(fetchAddBook.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAddBook.fulfilled, (state, action) => {
      state.loading = false;
      state.books.push(action.payload);
      state.error = "";
    });
    builder.addCase(fetchAddBook.rejected, (state, action) => {
      state.loading = false;
      state.books = [];
      state.error = action.error.message;
    });
    // DELETE
    builder.addCase(fetchDeleteBook.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchDeleteBook.fulfilled, (state, action) => {
      state.loading = false;
      state.books = state.books.filter((book) => book.id !== action.payload.id);
      state.error = "";
    });
    builder.addCase(fetchDeleteBook.rejected, (state, action) => {
      state.loading = false;
      state.books = [];
      state.error = action.error.message;
    });
    // EDIT PRICE AND QUANTITY 
    // builder.addCase(fetchEditPriceOrQuantity.pending, (state) => {
    //   state.loading = true;
    // });
    // builder.addCase(fetchEditPriceOrQuantity.fulfilled, (state, action) => {
    //   state.loading = false;
    //   const idx = state.books.findIndex(
    //     (book) => book.id === action.payload.id
    //   );
    //   state.books[idx].done = true;
    //   state.error = "";
    // });
    // builder.addCase(fetchEditPriceOrQuantity.rejected, (state, action) => {
    //   state.loading = false;
    //   state.books = [];
    //   state.error = action.error.message;
    // });

    // EDIT BOOKS
    builder.addCase(fetchEditBook.pending, (state) => {
      // state.loading = true;
      return { ...state, loading: true };
    });
    builder.addCase(fetchEditBook.fulfilled, (state, action) => {
       const { mockBook } = action.payload;
      // return {
  
        state.books= state.books.map((book) =>
          book.id === mockBook.id
            ?  mockBook
            : book
        )
      // }; 
    });
    builder.addCase(fetchEditBook.rejected, (state, action) => {
      // state.loading = false;
      // state.books = [];
      // state.error = action.error.message;
      return { posts: [], loading: false, error: action.payload };
    });
}})

export default booksSlice.reducer
