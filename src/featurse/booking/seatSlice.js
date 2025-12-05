import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AllMovies from "../../Pages/AllMovies";
import axios from "axios";

const seatSlice = createSlice({
  name: "seat",
  initialState: {
    allSeats: null,
    allbooking: null,
    seats: null,
    bookedSeats: [],
    // addbooking: null,
    mySeats: null,
    seatsLoading: false,
    seatsSucces: false,
    seatsError: false,
    seatsMessage: {},
  },

  reducers: {
    resetSeatsSuccess: (state) => {
      state.seatsSucces = false;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(GetShowBookings.fulfilled, (state, action) => {
        state.bookedSeats = action.payload;
      })
      .addCase(AddBooking.fulfilled, (state, action) => {
        state.seatsLoading = false;
        state.seatsSucces = true;
        state.seatsError = false;
        state.bookedSeats.push(...action.payload.addbooking.seats);
      })
      .addCase(AddBooking.pending, (state, action) => {
        state.seatsLoading = true;
        state.seatsSucces = false;
        state.seatsError = false;
      })
      .addCase(AddBooking.rejected, (state, action) => {
        state.seatsLoading = false;
        state.seatsSucces = true;
        state.seatsError = false;
        state.seatsMessage = action.payload;
      })
      .addCase(GetMyTickets.pending, (state, action) => {
        state.seatsLoading = true;
        state.seatsSucces = false;
        state.seatsError = false;
        state.bookedSeats = action.payload;
      })
      .addCase(GetMyTickets.fulfilled, (state, action) => {
        state.seatsLoading = false;
        state.seatsSucces = true;
        state.seatsError = false;
        state.bookedSeats = action.payload.tickets;
      })
      .addCase(GetMyTickets.rejected, (state, action) => {
        state.seatsLoading = false;
        state.seatsSucces = false;
        state.seatsError = true;
        state.seatsMessage = action.payload;
      });
  },
});

export const { resetSeatsSuccess } = seatSlice.actions;

export const AddBooking = createAsyncThunk(
  "ADD/Booking",
  async (formdata, thunkAPI) => {
    console.log(formdata);

    const token = thunkAPI.getState().auth.user.token;
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const payload = {
      show: formdata.showId,
      seats: formdata.selectedSeats,
    };
    try {
      const response = await axios.post(
        "https://quick-show-backend.onrender.com" + "/api/booking",
        payload,
        options
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
);

export const GetShowBookings = createAsyncThunk(
  "booking/show",
  async (showId) => {
    const res = await axios.get(
      "https://quick-show-backend.onrender.com" + `/api/booking/show/${showId}`
    );
    return res.data.bookedSeats;
  }
);

export const CreateTicket = createAsyncThunk(
  "CREATE/TICKET",
  async (bookingId, thunkAPI) => {
    console.log("run", bookingId);
    const token = thunkAPI.getState().auth.user.token;
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const res = await axios.post(
        "https://quick-show-backend.onrender.com" + "/api/ticket/",
        { bookingId },
        options
      );
      console.log(res.data);

      return res.data.ticket;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const GetMyTickets = createAsyncThunk(
  "booking/ticket",
  async (_, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const res = await axios.get(
        "https://quick-show-backend.onrender.com" + "/api/ticket",
        options
      );
      // console.log(res.data);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export default seatSlice.reducer;
