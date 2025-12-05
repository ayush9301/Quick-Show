import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AllMovies from "../../Pages/AllMovies";
import axios from "axios";
const userExist = JSON.parse(localStorage.getItem("user"));

const movieSlice = createSlice({
  name: "auth",
  initialState: {
    user: userExist || null,
    userLoading: false,
    userSucces: false,
    userError: false,
    userMessage: {},
  },

  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(LoginUser.pending, (state, action) => {
        (state.userLoading = true),
          (state.userSucces = false),
          (state.userError = false);
      })
      .addCase(LoginUser.fulfilled, (state, action) => {
        (state.userLoading = false),
          (state.userSucces = true),
          (state.userError = false);
        state.user = action.payload;
      })
      .addCase(LoginUser.rejected, (state, action) => {
        (state.userLoading = false),
          (state.userSucces = false),
          (state.userError = true);
        state.userMessage = action.payload;
      })

      .addCase(RegisterUser.pending, (state, action) => {
        (state.userLoading = true),
          (state.userSucces = false),
          (state.userError = false);
      })
      .addCase(RegisterUser.fulfilled, (state, action) => {
        (state.userLoading = false),
          (state.userSucces = true),
          (state.userError = false);
        state.user = action.payload;
      })
      .addCase(RegisterUser.rejected, (state, action) => {
        (state.userLoading = false),
          (state.userSucces = false),
          (state.userError = true);
        state.userMessage = action.payload;
      })

      .addCase(LogOut.fulfilled, (state, action) => {
        (state.isLoading = false),
          (state.isSucces = false),
          (state.isError = true);
        state.user = null;
      });
  },
});

export const LoginUser = createAsyncThunk(
  "LOGIN",
  async (formdata, thunkAPI) => {
    // console.log(formdata);

    try {
      const responce = await axios.post(
        "https://quick-show-backend.onrender.com" + "/api/auth/login",
        formdata
      );
      localStorage.setItem("user", JSON.stringify(responce.data));
      console.log(responce.data);
      return responce.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const RegisterUser = createAsyncThunk(
  "REGISTER",
  async (formdata, thunkAPI) => {
    console.log(formdata);
    try {
      const responce = await axios.post(
        "https://quick-show-backend.onrender.com" + "/api/auth/register",
        formdata
      );
      localStorage.setItem("user", JSON.stringify(responce.data));
      console.log(responce.data);
      return responce.data;
    } catch (error) {
      console.log(error.response.data.message);

      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const LogOut = createAsyncThunk("LOGOUT/USER", async () => {
  localStorage.removeItem("user");
});
export default movieSlice.reducer;
