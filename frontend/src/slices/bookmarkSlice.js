import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bookmarks: [],
  quantity: 0,
};

const bookmarkSlice = createSlice({
  initialState,
  name: "bookmarks",
  reducers: {
    addBookmark: (state, action) => {
      const { content, image, ...rest } = action.payload;
      // Check if the bookmark is already done
      const alreadyBookmarked = state.bookmarks.find(
        (item) => item.slug === rest.slug
      );
      // Add the bookmark to the state
      if (!alreadyBookmarked) {
        state.bookmarks.push({ ...rest });
        state.quantity++;
      }
    },
    removeBookmark: (state, action) => {
      const existingItems = state.bookmarks.filter(
        (item) => item.slug !== action.payload
      );
      state.bookmarks = existingItems;
      state.quantity = existingItems.length;
    },
    removeAll: (state) => {
      state.bookmarks = [];
      state.quantity = 0;
    },
  },
});

// Latest Data
export const { addBookmark, removeBookmark, removeAll } = bookmarkSlice.actions;

// Store available functions
export const bookmarkReducer = bookmarkSlice.reducer;
