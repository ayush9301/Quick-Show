import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Hero from "./Pages/Hero";
import AllMovies from "./Pages/AllMovies";
import Footer from "./Pages/Footer";
import MovieDetails from "./components/MovieDetailse";
import BookTickets from "./components/BookTickets";
// import SeatSelector from "./components/seat-selector";
import Login from "./Pages/Login";
import SeatSelector from "./components/Seat-Selector";
import Navbar from "./Pages/Navbar";
import AdminPanel from "./components/AdminPanel";
import Profile from "./Pages/Profile";
import PrivateComponent from "./Hooks/PrivateComponent";
import Register from "../src/Pages/Register";
import { ToastContainer } from "react-toastify";
import { UpcomingMoviesGrid } from "./Pages/MovieCard";
// import Admin from "./components/admin-dashboard";

const App = () => {
  return (
    <BrowserRouter>
      <div className="bg-black">
        <Navbar />

        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/movies" element={<AllMovies />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route element={<PrivateComponent />}>
            <Route path="profile" element={<Profile />} />
            <Route path="admin" element={<AdminPanel />} />
            <Route path="movie/:id/theater" element={<BookTickets />} />
            <Route path="details/:id" element={<MovieDetails />} />
            <Route path="upcoming" element={<UpcomingMoviesGrid />} />

            <Route
              path="movie/:id/theater/:id/show/:showId/seats"
              element={<SeatSelector />}
            />
          </Route>
        </Routes>
        <ToastContainer />
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
