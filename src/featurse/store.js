import { configureStore } from "@reduxjs/toolkit";

import movie from "../featurse/movie/movieSlice";
import theater from "../featurse/theater/theaterSlice";
import show from "../featurse/show/showSlice";
import auth from "../featurse/auth/authSlice";
import seat from "../featurse/booking/seatSlice";
import admin from "../featurse/admin/adminSlice";

const store = configureStore({
  reducer: { auth, movie, theater, show, seat, admin },
});

export default store;
