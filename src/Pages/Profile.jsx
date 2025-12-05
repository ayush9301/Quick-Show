import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Calendar,
  Ticket,
  Film,
  MapPin,
  Clock,
  Monitor,
  Languages,
  LogOutIcon,
  Mail,
} from "lucide-react";
import { GetMyTickets } from "../featurse/booking/seatSlice";
import { GetAllMovie } from "../featurse/movie/movieSlice";
import { LogOut } from "../featurse/auth/authSlice";
import { retry } from "@reduxjs/toolkit/query";
import Loader from "../Hooks/Loader";

export default function Profile() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { bookedSeats, seatsLoading } = useSelector((state) => state.seat);
  const { allMovies } = useSelector((state) => state.movie);

  useEffect(() => {
    dispatch(GetMyTickets());
    dispatch(GetAllMovie());
  }, []);
  const movieDetails = allMovies?.find(
    (movie) => String(movie._id) == String(bookedSeats?.show?.movie)
  );
  console.log(bookedSeats);

  if (seatsLoading) {
    return <Loader />;
  }
  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* USER CARD */}
      <div className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 flex **flex-col sm:flex-row** items-start sm:items-center justify-between gap-6 shadow-xl">
        {/* User Details Section */}
        <div className="flex flex-col gap-1 w-full sm:w-auto">
          <h1 className="text-2xl  text-white font-bold tracking-wide">
           👤 {user?.name || "Guest User"} {/* Name is bigger and white */}
          </h1>

          <p className="text-gray-300 font-medium ">
            ✉️ Email:{" "}
            <span className="text-gray-300">
              {user?.email || "No Email Provided"}{" "}
            </span>
          </p>

          <p className="text-gray-400 text-sm mt-1">
            📞 Phone:{" "}
            <span className="text-gray-300">{user?.phone || "Not added"}</span>
          </p>
        </div>

        {/* LogOut Button Section */}
        <div className="flex-shrink-0 w-full sm:w-auto mt-4 sm:mt-0">
          <button
            className="w-full sm:w-auto **flex items-center justify-center gap-2** text-white **bg-red-600** hover:bg-red-300/10 **shadow-lg shadow-red-900/40** rounded-full p-3 px-6 font-semibold transition duration-200"
            onClick={() => dispatch(LogOut())}
          >
            ⏻ LogOut
          </button>
        </div>
      </div>

      {/* TICKETS SECTION */}
      <h2 className="text-2xl font-bold mt-10 mb-4">Your Booked Tickets</h2>

      {bookedSeats?.length === 0 ? (
        <p className="text-gray-400">No tickets booked yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {bookedSeats?.map((t) => (
            <div
              key={t._id}
              className="bg-[#0f172a] shadow-2xl rounded-2xl border border-blue-800/50 overflow-hidden transition-all duration-300 hover:scale-[1.02]"
            >
              <div className="p-2 sm:p-3 bg-red-800/10 border-b border-gray-700/50">
                <div className="flex items-center gap-4">
                  <Film className="text-red-400 w-6 h-6" />
                  <h3 className="text-xl sm:text-2xl text-white font-bold tracking-wide truncate">
                    {t.movie?.title}
                  </h3>
                </div>
              </div>

              {/* DETAILS SECTION */}
              <div className="p-4 sm:p-5 space-y-3 text-gray-300">
                {/* Theater Name & Location */}
                <div className="space-y-1 ">
                  <p className="flex items-center gap-2 text-white font-semibold text-lg">
                    <MapPin size={20} className="text-blue-400" />
                    {t.theater?.name || "Theater N/A"}
                  </p>
                  <p className="pl-7 text-sm text-gray-400">
                    {t.theater?.location || "Location N/A"}
                  </p>
                </div>

                {/* Date, Time, Screen Type, Language (Flexbox for responsiveness) */}
                <div className="flex flex-wrap justify-between gap-y-2 text-sm sm:text-base pt-2 border-t border-gray-700/50">
                  <p className="flex items-center gap-2 w-full sm:w-1/2">
                    <Calendar size={18} className="text-blue-400" />
                    <span className="text-white font-medium">
                      {new Date(t.show?.date || t.date).toLocaleDateString()}
                    </span>
                  </p>
                  <p className="flex items-center gap-2 w-1/2 sm:w-auto">
                    <Clock size={18} className="text-blue-400" />
                    <span className="text-white font-medium">
                      {t.show?.time || "Time N/A"}
                    </span>
                  </p>
                  <p className="flex items-center gap-2 w-full sm:w-1/2">
                    <Monitor size={18} className="text-blue-400" />{" "}
                    <span className="font-medium">
                      {t.show?.screenType?.toUpperCase() || "N/A"}
                    </span>
                  </p>
                  <p className="flex items-center gap-2 w-1/2 sm:w-auto">
                    <Languages size={18} className="text-blue-400" />
                    <span className="font-medium">
                      {t.show?.language || "N/A"}
                    </span>
                  </p>
                </div>

                <div className="flex flex-wrap justify-between pt-2 border-t border-gray-700/50">
                  <p className="flex items-center gap-2 text-lg font-bold text-yellow-400">
                    <Ticket size={20} />
                    Seats: {t.seats?.join(" , ") || "N/A"}
                  </p>
                  {/* <p className="text-xs text-gray-500 flex items-center gap-1">
                    Booking ID:
                    <span className="font-mono text-gray-400">
                      {t.booking?._id || t._id || "N/A"}
                    </span>
                  </p> */}
                </div>
              </div>

              <div className="p-2 sm:p-3 bg-blue-800/20 border-t border-blue-700/50 flex justify-between items-center">
                <span className="text-sm font-semibold text-gray-300 uppercase">
                  Total Price
                </span>
                <div className="font-extrabold text-2xl text-green-400">
                  ₹{(t.seats?.length * t.show?.price)?.toFixed(2) || "0.00"}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
