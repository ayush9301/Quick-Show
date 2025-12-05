import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AllMovies from "../../Pages/AllMovies";
import axios from "axios";

const TheaterSlice = createSlice({
  name: "theater",
  initialState: {
    allTheater: null,
    theater: null,
    movieLoading: false,
    movieSucces: false,
    movieError: false,
    movieMessage: {},
  },

  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetAllTheater.pending, (state, action) => {
        (state.movieLoading = true),
          (state.movieSucces = false),
          (state.movieError = false);
      })
      .addCase(GetAllTheater.fulfilled, (state, action) => {
        (state.movieLoading = false),
          (state.movieSucces = true),
          (state.movieError = false);
        state.allTheater = action.payload.getalltheater;
      })
      .addCase(GetAllTheater.rejected, (state, action) => {
        (state.movieLoading = false),
          (state.movieSucces = false),
          (state.movieError = true);
        state.movieMessage = action.payload;
      })

      .addCase(GetSingleTheater.pending, (state, action) => {
        (state.movieLoading = true),
          (state.movieSucces = false),
          (state.movieError = false);
      })
      .addCase(GetSingleTheater.fulfilled, (state, action) => {
        (state.movieLoading = false),
          (state.movieSucces = true),
          (state.movieError = false);
        state.movie = action.payload.getsingelmovie;
      })
      .addCase(GetSingleTheater.rejected, (state, action) => {
        (state.movieLoading = false),
          (state.movieSucces = false),
          (state.movieError = true);
        state.movieMessage = action.payload;
      });
  },
});

export const GetAllTheater = createAsyncThunk(
  "ALL/THEATER",
  async (_, thunkAPI) => {
    try {
      const responce = await axios.get(
        "https://quick-show-backend.onrender.com" + "/api/theater"
      );
      //   console.log(responce.data);
      return responce.data;
    } catch (error) {}
  }
);

export const GetSingleTheater = createAsyncThunk(
  "SINGLE/THEATER",
  async (_id, thunkAPI) => {
    try {
      const responce = await axios.get(
        "https://quick-show-backend.onrender.com" + "/api/movies/" + _id
      );
      //   console.log(responce.data);
      return responce.data;
    } catch (error) {}
  }
);

export default TheaterSlice.reducer;
