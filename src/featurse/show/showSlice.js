import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AllMovies from "../../Pages/AllMovies";
import axios from "axios";

const showSlice = createSlice({
  name: "show",
  initialState: {
    allShow: null,
    show: null,
    showloading: false,
    showSucces: false,
    showError: false,
    showMessage: {},
  },

  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetAllShow.pending, (state, action) => {
        (state.movieLoading = true),
          (state.movieSucces = false),
          (state.movieError = false);
      })
      .addCase(GetAllShow.fulfilled, (state, action) => {
        (state.movieLoading = false),
          (state.movieSucces = true),
          (state.movieError = false);
        state.allShow = action.payload.getallShow;
      })
      .addCase(GetAllShow.rejected, (state, action) => {
        (state.movieLoading = false),
          (state.movieSucces = false),
          (state.movieError = true);
        state.movieMessage = action.payload;
      })

      .addCase(GetSingleShow.pending, (state, action) => {
        (state.movieLoading = true),
          (state.movieSucces = false),
          (state.movieError = false);
      })
      .addCase(GetSingleShow.fulfilled, (state, action) => {
        (state.movieLoading = false),
          (state.movieSucces = true),
          (state.movieError = false);
        state.movie = action.payload.getsingelshow;
      })
      .addCase(GetSingleShow.rejected, (state, action) => {
        (state.movieLoading = false),
          (state.movieSucces = false),
          (state.movieError = true);
        state.movieMessage = action.payload;
      });
  },
});

export const GetAllShow = createAsyncThunk("ALL/SHOW", async (_, thunkAPI) => {
  try {
    const responce = await axios.get(
      "https://quick-show-backend.onrender.com" + "/api/show"
    );
    // console.log(responce.data);
    return responce.data;
  } catch (error) {}
});

export const GetSingleShow = createAsyncThunk(
  "SINGLE/SHOW",
  async (_id, thunkAPI) => {
    try {
      const responce = await axios.get(
        "https://quick-show-backend.onrender.com" + "/api/show/" + _id
      );
      console.log(responce.data);
      return responce.data;
    } catch (error) {}
  }
);

export default showSlice.reducer;
