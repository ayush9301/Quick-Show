import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AllMovies from "../../Pages/AllMovies";
import axios from "axios";
const userExist = JSON.parse(localStorage.getItem("user"));

const AdminSlice = createSlice({
  name: "auth",
  initialState: {
    user: userExist || null,
    alluser: null,
    allMovies: null,
    allShow: null,
    allBookings: null,
    allTheater: null,
    editmovie: { movie: {}, isedit: false },
    edittheater: { theater: {}, isedit: false },
    editshow: { show: {}, isedit: false },

    adminLoading: false,
    adminSucces: false,
    adminError: false,
    adminMessage: {},
  },
  reducers: {
    SetEditMovie: (state, action) => {
      state.editmovie = { movie: action.payload, isedit: true };
    },

    SetEditTheater: (state, action) => {
      state.edittheater = { theater: action.payload, isedit: true };
    },
    SetEditShow: (state, action) => {
      state.editshow = { show: action.payload, isedit: true };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(GetAllUser.pending, (state, action) => {
        (state.userLoading = true),
          (state.userSucces = false),
          (state.userError = false);
      })
      .addCase(GetAllUser.fulfilled, (state, action) => {
        (state.userLoading = false),
          (state.userSucces = true),
          (state.userError = false);
        state.alluser = action.payload.alluser;
      })
      .addCase(GetAllUser.rejected, (state, action) => {
        (state.userLoading = false),
          (state.userSucces = false),
          (state.userError = true);
        state.userMessage = action.payload;
      })

      .addCase(AddMovie.pending, (state, action) => {
        (state.userLoading = true),
          (state.userSucces = false),
          (state.userError = false);
      })
      .addCase(AddMovie.fulfilled, (state, action) => {
        (state.userLoading = false),
          (state.userSucces = true),
          (state.userError = false);
        state.allMovies = action.payload.allmovies;
      })
      .addCase(AddMovie.rejected, (state, action) => {
        (state.userLoading = false),
          (state.userSucces = false),
          (state.userError = true);
        state.userMessage = action.payload;
      })

      .addCase(AddShow.pending, (state, action) => {
        (state.adminLoading = true),
          (state.adminSucces = false),
          (state.adminError = false);
      })
      .addCase(AddShow.fulfilled, (state, action) => {
        (state.adminLoading = false),
          (state.adminSucces = true),
          (state.adminError = false);
        state.allMovies = action.payload.allShow;
      })
      .addCase(AddShow.rejected, (state, action) => {
        (state.adminLoading = false),
          (state.adminSucces = false),
          (state.adminError = true);
        state.userMessage = action.payload;
      })

      .addCase(AddTheater.pending, (state, action) => {
        (state.adminLoading = true),
          (state.adminSucces = false),
          (state.adminError = false);
      })
      .addCase(AddTheater.fulfilled, (state, action) => {
        (state.adminLoading = false),
          (state.adminSucces = true),
          (state.adminError = false);
        state.allTheater = action.payload;
      })
      .addCase(AddTheater.rejected, (state, action) => {
        (state.adminLoading = false),
          (state.adminSucces = false),
          (state.adminError = true);
        state.adminMessage = action.payload;
      })

      .addCase(GetAllBookings.pending, (state, action) => {
        (state.adminLoading = true),
          (state.adminSucces = false),
          (state.adminError = false);
      })
      .addCase(GetAllBookings.fulfilled, (state, action) => {
        (state.adminLoading = false),
          (state.adminSucces = true),
          (state.allBookings = action.payload.getallbooking);
      })
      .addCase(GetAllBookings.rejected, (state, action) => {
        (state.adminLoading = false),
          (state.adminSucces = false),
          (state.adminError = true);
        state.adminMessage = action.payload;
      })

      .addCase(UpdateMovie.pending, (state, action) => {
        (state.adminLoading = true),
          (state.adminSucces = false),
          (state.adminError = false);
      })
      .addCase(UpdateMovie.fulfilled, (state, action) => {
        (state.adminLoading = false),
          (state.adminSucces = true),
          (state.allMovies = state.allMovies?.map((m) =>
            m > _id === action.payload._id ? action.payload : m
          ));
        state.editmovie = { movie: {}, isedit: false };
      })
      .addCase(UpdateMovie.rejected, (state, action) => {
        (state.adminLoading = false),
          (state.adminSucces = false),
          (state.adminError = true);
        state.userMessage = action.payload;
      })

      .addCase(UpdateTheater.pending, (state, action) => {
        (state.adminLoading = true),
          (state.adminSucces = false),
          (state.adminError = false);
      })
      .addCase(UpdateTheater.fulfilled, (state, action) => {
        (state.adminLoading = false),
          (state.adminSucces = true),
          (state.allTheater = state.allTheater?.map((m) =>
            m > _id === action.payload._id ? action.payload : m
          ));
        state.edittheater = { theater: {}, isedit: false };
      })
      .addCase(UpdateTheater.rejected, (state, action) => {
        (state.adminLoading = false),
          (state.adminSucces = false),
          (state.adminError = true);
        state.userMessage = action.payload;
      })

      .addCase(UpdateShow.pending, (state, action) => {
        (state.adminLoading = true),
          (state.adminSucces = false),
          (state.adminError = false);
      })
      .addCase(UpdateShow.fulfilled, (state, action) => {
        (state.adminLoading = false),
          (state.adminSucces = true),
          (state.allShow = state.allShow?.map((m) =>
            m > _id === action.payload._id ? action.payload : m
          ));
        state.editshow = { show: {}, isedit: false };
      })
      .addCase(UpdateShow.rejected, (state, action) => {
        (state.adminLoading = false),
          (state.adminSucces = false),
          (state.adminError = true);
        state.userMessage = action.payload;
      });

    // .addCase(GetAllBookings.pending, (state, action) => {
    //   (state.adminLoading = true),
    //     (state.adminSucces = false),
    //     (state.adminError = false);
    // })
    // .addCase(GetAllBookings.fulfilled, (state, action) => {
    //   (state.adminLoading = false),
    //     (state.adminSucces = true),
    //     (state.adminError = false);
    //   state.allBookings = action.payload.getallbooking;
    // })
    // .addCase(GetAllBookings.rejected, (state, action) => {
    //   (state.adminLoading = false),
    //     (state.adminSucces = false),
    //     (state.adminError = true);
    //   state.userMessage = action.payload;
    // });
  },
});
export const { SetEditMovie, SetEditTheater, SetEditShow } = AdminSlice.actions;
export const GetAllUser = createAsyncThunk(
  "GetAllUser",
  async (_, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;

    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const responce = await axios.get(
        "https://quick-show-backend.onrender.com" + "/api/auth/all",
        options
      );
      // console.log(responce.data);
      return responce.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const AddMovie = createAsyncThunk(
  "SINGLE/MOVIE",
  async (formdata, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;

    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const responce = await axios.post(
        "https://quick-show-backend.onrender.com" + "/api/movies",
        formdata,
        options
      );
      return responce.data;
    } catch (error) {}
  }
);

export const AddShow = createAsyncThunk(
  "ADD/SHOW",
  async (formdata, thunkAPI) => {
    console.log(formdata);

    const token = thunkAPI.getState().auth.user.token;

    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const responce = await axios.post(
        "https://quick-show-backend.onrender.com" + "/api/show/",
        formdata,
        options
      );
      console.log(responce.data);
      return responce.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const AddTheater = createAsyncThunk(
  "SINGLE/THEATER",
  async (formdata, thunkAPI) => {
    console.log(formdata);
    const token = thunkAPI.getState().auth.user.token;

    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const responce = await axios.post(
        "https://quick-show-backend.onrender.com" + "/api/theater",
        formdata,
        options
      );
      console.log(responce.data);
      return responce.data;
    } catch (error) {}
  }
);

export const GetAllBookings = createAsyncThunk(
  "All/Booking",
  async (_, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;

    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const res = await axios.get(
        "https://quick-show-backend.onrender.com" + "/api/booking",
        options
      );
      // console.log(res.data);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const UpdateMovie = createAsyncThunk(
  "UPDATE/MOVIE",
  async (formdata, thunkAPI) => {
    console.log(formdata);

    const token = thunkAPI.getState().auth.user.token;

    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const cleanData = { ...formdata };

      delete cleanData._id;
      delete cleanData.createdAt;
      delete cleanData.updatedAt;
      delete cleanData.__v;

      const responce = await axios.put(
        "https://quick-show-backend.onrender.com" +
          "/api/movies/" +
          formdata._id,
        cleanData,
        options
      );
      console.log(responce.data);

      return responce.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const UpdateTheater = createAsyncThunk(
  "UPDATE/THEATER",
  async (formdata, thunkAPI) => {
    console.log(formdata);

    const token = thunkAPI.getState().auth.user.token;

    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const cleanData = { ...formdata };

      delete cleanData._id;
      delete cleanData.createdAt;
      delete cleanData.updatedAt;
      delete cleanData.__v;

      const responce = await axios.put(
        "https://quick-show-backend.onrender.com" +
          "/api/theater/" +
          formdata._id,
        cleanData,
        options
      );
      console.log(responce.data);

      return responce.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const UpdateShow = createAsyncThunk(
  "UPDATE/SHOW",
  async (formdata, thunkAPI) => {
    console.log(formdata);

    const token = thunkAPI.getState().auth.user.token;

    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const cleanData = { ...formdata };

      delete cleanData._id;
      delete cleanData.createdAt;
      delete cleanData.updatedAt;
      delete cleanData.__v;

      const responce = await axios.put(
        "https://quick-show-backend.onrender.com" + "/api/show/" + formdata._id,
        cleanData,
        options
      );
      console.log(responce.data);

      return responce.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const DeleteShow = createAsyncThunk(
  "UPDATE/SHOW",
  async (id, thunkAPI) => {
    console.log(id);

    const token = thunkAPI.getState().auth.user.token;

    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const responce = await axios.delete(
        "https://quick-show-backend.onrender.com" + "/api/show/" + id,
        options
      );
      console.log(responce.data);

      return responce.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export default AdminSlice.reducer;
