import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AllMovies from "../../Pages/AllMovies";
import axios from "axios";

const movieSlice = createSlice({
  name: "movie",
  initialState: {
    allMovies: null,
    movie: null,
    movieLoading: false,
    movieSucces: false,
    movieError: false,
    movieMessage: {},
  },

  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetAllMovie.pending, (state, action) => {
        (state.movieLoading = true),
          (state.movieSucces = false),
          (state.movieError = false);
      })
      .addCase(GetAllMovie.fulfilled, (state, action) => {
        (state.movieLoading = false),
          (state.movieSucces = true),
          (state.movieError = false);
        state.allMovies = action.payload.getallmovies;
      })
      .addCase(GetAllMovie.rejected, (state, action) => {
        (state.movieLoading = false),
          (state.movieSucces = false),
          (state.movieError = true);
        state.movieMessage = action.payload;
      })

      .addCase(GetSingleMovie.pending, (state, action) => {
        (state.movieLoading = true),
          (state.movieSucces = false),
          (state.movieError = false);
      })
      .addCase(GetSingleMovie.fulfilled, (state, action) => {
        (state.movieLoading = false),
          (state.movieSucces = true),
          (state.movieError = false);
        state.movie = action.payload.getsingelmovie;
      })
      .addCase(GetSingleMovie.rejected, (state, action) => {
        (state.movieLoading = false),
          (state.movieSucces = false),
          (state.movieError = true);
        state.movieMessage = action.payload;
      });
  },
});

export const GetAllMovie = createAsyncThunk(
  "ALL/MOVIE",
  async (_, thunkAPI) => {
    try {
      const responce = await axios.get(  "https://quick-show-backend.onrender.com" + "/api/movies");
      // console.log(responce.data);
      return responce.data;
    } catch (error) {}
  }
);

export const GetSingleMovie = createAsyncThunk(
  "SINGLE/MOVIE",
  async (_id, thunkAPI) => {
    try {
      const responce = await axios.get(  "https://quick-show-backend.onrender.com" + "/api/movies/" + _id);
      // console.log(responce.data);
      return responce.data;
    } catch (error) {}
  }
);



export default movieSlice.reducer;
