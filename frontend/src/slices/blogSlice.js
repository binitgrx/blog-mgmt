import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../utils/axios";
import { URLS } from "../constants";
import { getItem } from "../utils/session";

const initialState = {
  blogs: [],
  blog: {},
  total: 0,
  currentPage: 1,
  limit: 10,
  error: "",
  loading: false,
};

export const createBlog = createAsyncThunk(
  "blogs/createBlog",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await instance.post(URLS.BLOGS, payload, {
        headers: {
          "Content-Type": "multipart/form-data",
          access_token: getItem(),
        },
      });
      return res.data;
    } catch (e) {
      return rejectWithValue({
        data: e?.response?.data?.msg ?? "Something went wrong",
      });
    }
  }
);

export const listBlogs = createAsyncThunk(
  "blogs/listBlogs",
  async ({ limit, page }, { rejectWithValue }) => {
    try {
      const res = await instance.get(
        `${URLS.BLOGS}?limit=${limit}&page=${page}`,
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
  "blogs/getById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await instance.get(`${URLS.BLOGS}/admin/${id}`, {
        headers: {
          access_token: getItem(),
        },
      });
      return res.data;
    } catch (e) {
      return rejectWithValue({
        data: e?.response?.data?.msg ?? "Something went wrong",
      });
    }
  }
);

export const getMyBlogs = createAsyncThunk(
  "blogs/getMyBlogs",
  async ({ limit, page }, { rejectWithValue }) => {
    try {
      const res = await instance.get(
        `${URLS.BLOGS}/my-blogs?limit=${limit}&page=${page}`,
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

export const updateBySlug = createAsyncThunk(
  "blogs/updateBySlug",
  async ({ slug, payload }, { rejectWithValue }) => {
    try {
      const res = await instance.put(`${URLS.BLOGS}/${slug}`, payload, {
        headers: {
          "Content-Type": "multipart/form-data",
          access_token: getItem(),
        },
      });
      return res.data;
    } catch (e) {
      return rejectWithValue({
        data: e?.response?.data?.msg ?? "Something went wrong",
      });
    }
  }
);

export const updateStatusBySlug = createAsyncThunk(
  "blogs/updateStatusBySlug",
  async (slug, { rejectWithValue }) => {
    try {
      const res = await instance.patch(
        `${URLS.BLOGS}/${slug}`,
        {},
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

export const removeBySlug = createAsyncThunk(
  "blogs/removeBySlug",
  async (slug, { rejectWithValue }) => {
    try {
      const res = await instance.delete(`${URLS.BLOGS}/${slug}`, {
        headers: {
          access_token: getItem(),
        },
      });
      return res.data;
    } catch (e) {
      return rejectWithValue({
        data: e?.response?.data?.msg ?? "Something went wrong",
      });
    }
  }
);

const blogSlice = createSlice({
  name: "blogs",
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
      .addCase(createBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.blog = action.payload.data;
        // state.blogs.unshift(action.payload.data)
      })
      .addCase(createBlog.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(createBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.data;
      }) //
      .addCase(listBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.total = action.payload.data.total;
        state.blogs = action.payload.data.data;
      })
      .addCase(listBlogs.pending, (state) => {
        state.loading = true;
        state.error = "";
        state.blogs = [];
        state.total = 0;
      })
      .addCase(listBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.data;
      }) //
      .addCase(getById.fulfilled, (state, action) => {
        state.loading = false;
        state.blog = action.payload.data;
      })
      .addCase(getById.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(getById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.data;
      }) //
      .addCase(updateStatusBySlug.fulfilled, (state, action) => {
        state.loading = false;
        const existing = state.blogs.find(
          (blog) => blog.slug === action.payload.data.slug
        );
        existing.status = action.payload.data.status;
      })
      .addCase(updateStatusBySlug.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(updateStatusBySlug.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.data;
      }) //
      .addCase(removeBySlug.fulfilled, (state, action) => {
        state.loading = false;
        const remaining = state.blogs.filter(
          (blog) => blog?.slug !== action.meta.arg
        );
        state.blogs = remaining;
      })
      .addCase(removeBySlug.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(removeBySlug.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.data;
      }) //
      .addCase(updateBySlug.fulfilled, (state, action) => {
        state.loading = false;
        state.blog = action.payload.data;
      })
      .addCase(updateBySlug.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(updateBySlug.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.data;
      }) //
      .addCase(getMyBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.total = action.payload.data.total;
        state.blogs = action.payload.data.data;
      })
      .addCase(getMyBlogs.pending, (state) => {
        state.loading = true;
        state.error = "";
        state.blogs = [];
        state.total = 0;
      })
      .addCase(getMyBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.data;
      });
  },
});

export const { setCurrentPage, setLimit } = blogSlice.actions;

export const blogReducer = blogSlice.reducer;
