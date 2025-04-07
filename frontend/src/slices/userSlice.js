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
  "users/listUsers",
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
  "users/getByID",
  async (id, { rejectWithValue }) => {
    try {
      const res = await instance.get(`${URLS.USERS}/${id}`, {
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

export const getProfile = createAsyncThunk(
  "users/getProfile",
  async (_, { rejectWithValue }) => {
    try {
      const res = await instance.get(`${URLS.USERS}/profile`, {
        headers: { access_token: getItem() },
      });
      return res.data; 
    } catch (e) {
      console.error("API Error:", e);
      console.error("Response Data:", e?.response?.data);
      return rejectWithValue({
        data: e?.response?.data?.msg ?? "Something went wrong",
      });
    }
  }
);

export const userBlock = createAsyncThunk(
  "users/userBlock",
  async (id, { rejectWithValue }) => {
    try {
      const accessToken = getItem();
      if (!accessToken) {
        return rejectWithValue({
          data: "Access token is missing",
        });
      }

      const res = await instance.patch(`${URLS.USERS}/${id}/block`, null, {
        headers: {
          access_token: accessToken,
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
export const changePassword = createAsyncThunk(
  "users/changePassword",
  async (payload, { rejectWithValue }) => {
    try {
      console.log("Sending Request to API:", payload);
      const res = await instance.put(`${URLS.USERS}/change-password`, payload, {
        headers: {
          "Content-Type": "application/json",
          access_token: getItem(), 
        },
      });
      console.log("Response:", res.data);
      return res.data;
    } catch (e) {
      console.error("API Error:", e.response?.data);
      return rejectWithValue({
        data: e.response?.data?.msg ?? "Something went wrong",
      });
    }
  }
);
export const updateUserRole = createAsyncThunk(
  "users/updateUserRole",
  async ({ id, roles }, { rejectWithValue }) => {
    try {
      console.log("Sending Request to API:", { id, roles });
      const res = await instance.patch(
        `${URLS.USERS}/${id}/roles`,
        { roles },
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
export const resetPassword = createAsyncThunk(
  "users/resetPassword",
  async (payload, { rejectWithValue }) => {
    try {
      console.log("Sending Request to API:", payload);
      const res = await instance.put(`${URLS.USERS}/reset-password`, payload, {
        headers: {
          "Content-Type": "application/json",
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
      })

      //getBYID///////////////////////////////////////////

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
      })

      //getProfile///////////////////////////////////////////

      .addCase(getProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action?.payload?.data;
      })
      .addCase(getProfile.pending, (state) => {
        state.loading = true;
        state.error = "";
        state.user = {};
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.data;
      })

      //block user/////
      .addCase(userBlock.fulfilled, (state, action) => {
        state.loading = false;
        const remaining = state.users.filter(
          (user) => user?._id !== action.meta.arg
        );
        state.users = remaining;
      })
      .addCase(userBlock.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(userBlock.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.data;
      })
      ///Change Password/////
      .addCase(changePassword.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload?.data;
      })
      .addCase(changePassword.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.data;
      }) //
      //update user role/////
      .addCase(updateUserRole.fulfilled, (state, action) => {
        state.loading = false;
        state.user = { ...state.user, roles: action.payload.data};
      })
      .addCase(updateUserRole.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUserRole.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.data;
      })

      //reset password/////
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data; 
      })
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.data;
      })
  },
});

export const { setCurrentPage, setLimit } = userSlice.actions;

export const userReducer = userSlice.reducer;
