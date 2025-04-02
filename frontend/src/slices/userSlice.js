import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../utils/axios";
import { URLS } from "../constants";
import { getItem } from "../utils/session";

const initialState = {
  users: [],
  user: {},
  total: 0,
  currentPage: 1,
  limit: 10,
  error: "",
  loading: false,
};

export const listUsers = createAsyncThunk(
    "blogs/listUsers",
    async ({ limit, page }, { rejectWithValue }) => {
      try {
        const res = await instance.get(
          `${URLS.USERS}/?limit=${limit}&page=${page}`,
          {
            headers: {
              access_token: getItem(),
            },
          }
        );
        return res.data;
      } catch (e) {
        return rejectWithValue({
          data: e?.response?.data?.msg ?? "Something went wrong",
        });
      }
    }
  );

  export const getById = createAsyncThunk(
    "blogs/getByID",
    async (id, { rejectWithValue }) => {
      try {
        const res = await instance.get(
          `${URLS.USERS}/${id}`,
          {
            headers: {
              access_token: getItem(),
            },
          }
        );
        return res.data;
      } catch (e) {
        return rejectWithValue({
          data: e?.response?.data?.msg ?? "Something went wrong",
        });
      }
    }
  );

  const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
      setCurrentPage: (state, action) => {
        state.currentPage = action.payload;
      },
      setLimit: (state, action) => {
        state.currentPage = 1;
        state.limit = action.payload;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(listUsers.fulfilled, (state, action) => {
          state.loading = false;
          state.total = action.payload.data.total;
          state.users = action.payload.data.data;
        })
        .addCase(listUsers.pending, (state) => {
          state.loading = true;
          state.error = "";
          state.users = [];
          state.total = 0;
        })
        .addCase(listUsers.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload.data;
        }) //
        .addCase(getById.fulfilled, (state, action) => {
          state.loading = false;
          state.user = action.payload.data;
        })
        .addCase(getById.pending, (state) => {
          state.loading = true;
          state.error = "";
        })
        .addCase(getById.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload.data;
        }) //
        // .addCase(updateStatusBySlug.fulfilled, (state, action) => {
        //   state.loading = false;
        //   const existing = state.blogs.find(
        //     (blog) => blog.slug === action.payload.data.slug
        //   );
        //   existing.status = action.payload.data.status;
        // })
        // .addCase(updateStatusBySlug.pending, (state) => {
        //   state.loading = true;
        //   state.error = "";
        // })
        // .addCase(updateStatusBySlug.rejected, (state, action) => {
        //   state.loading = false;
        //   state.error = action.payload.data;
        // }) //
        // .addCase(removeBySlug.fulfilled, (state, action) => {
        //   state.loading = false;
        //   const remaining = state.blogs.filter(
        //     (blog) => blog?.slug !== action.meta.arg
        //   );
        //   state.blogs = remaining;
        // })
        // .addCase(removeBySlug.pending, (state) => {
        //   state.loading = true;
        //   state.error = "";
        // })
        // .addCase(removeBySlug.rejected, (state, action) => {
        //   state.loading = false;
        //   state.error = action.payload.data;
        // }) //
        // .addCase(updateBySlug.fulfilled, (state, action) => {
        //   state.loading = false;
        //   state.blog = action.payload.data;
        // })
        // .addCase(updateBySlug.pending, (state) => {
        //   state.loading = true;
        //   state.error = "";
        // })
        // .addCase(updateBySlug.rejected, (state, action) => {
        //   state.loading = false;
        //   state.error = action.payload.data;
        // }) //
        // .addCase(getMyBlogs.fulfilled, (state, action) => {
        //   state.loading = false;
        //   state.total = action.payload.data.total;
        //   state.blogs = action.payload.data.data;
        // })
        // .addCase(getMyBlogs.pending, (state) => {
        //   state.loading = true;
        //   state.error = "";
        //   state.blogs = [];
        //   state.total = 0;
        // })
        // .addCase(getMyBlogs.rejected, (state, action) => {
        //   state.loading = false;
        //   state.error = action.payload.data;
        // });
    },
  });
  
  export const { setCurrentPage, setLimit } = userSlice.actions;
  
  export const userReducer = userSlice.reducer;