import { configureStore, createSlice } from "@reduxjs/toolkit";
import { INITIAL_BOOKS } from "../data/books";

const booksSlice = createSlice({
  name: "books",
  initialState: {
    list: INITIAL_BOOKS,
  },
  reducers: {
    addBook: (state, action) => {
      const newBook = {
        ...action.payload,
        id: Date.now(),
        popular: false,
        cover: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=300&h=400&fit=crop",
      };
      state.list.unshift(newBook);
    },
  },
});

export const { addBook } = booksSlice.actions;

const store = configureStore({
  reducer: {
    books: booksSlice.reducer,
  },
});

export default store;
