"use client";
import { Star, Clock, Calendar, Globe, Film } from "lucide-react"; // Added new icons
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { GetAllMovie } from "../featurse/movie/movieSlice";
import Loader from "../Hooks/Loader";

const AllMovies = () => {
  const { allMovies, movieLoading } = useSelector((state) => state.movie);
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    dispatch(GetAllMovie());
  }, [dispatch]); // Added dispatch to dependency array

  if (movieLoading) {
    return <Loader />;
  }
  
  // Helper function to format date
  const formatDate = (dateString) => {
      try {
          return new Date(dateString).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
          });
      } catch (e) {
          return "TBA";
      }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-black text-white py-10 sm:py-20 px-4 md:px-6">
      
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src="https://i.pinimg.com/1200x/94/8f/21/948f21546374fb0ecf6c6c664908b429.jpg"
          alt="Cinematic Background"
          className="w-full h-full object-cover object-center bg-cover brightness-30"
        />
      </div>

      {/* Header Section */}
      <div className="relative z-10 w-full mb-8 pt-10">
        <h2 className="text-2xl sm:text-2xl font-extrabold text-center text-red-500 tracking-wider uppercase  border-red-500 pb-3 inline-block">
          🍿 Now Showing
        </h2>
      </div>

      {/* Movies Grid: Highly Responsive */}
      <div className="relative z-10 w-[90%] max-w-7xl grid **grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4** gap-8 justify-items-center">
        {allMovies?.map((movie) => (
          <div
            key={movie._id}
            className="bg-gray-900/90 rounded-xl overflow-hidden **w-full max-w-xs** shadow-2xl **border-t-4 border-red-600** hover:scale-[1.03] transition-all duration-300 transform hover:shadow-red-500/30"
          >
            {/* Poster Image */}
            <img
              src={movie.poster}
              alt={movie.title}
              className="w-full h-80 object-cover"
            />
            
            <div className="p-5 space-y-3">
              {/* Title & Rating */}
              <div className="flex justify-between items-start">
                <h3 className="text-xl font-bold text-white truncate max-w-[80%]">
                  {movie.title}
                </h3>
                <div className="flex items-center gap-1 text-yellow-400 font-bold bg-gray-800 px-2 py-1 rounded-full text-sm flex-shrink-0">
                  <Star size={14} fill="currentColor" />
                  {movie.rating}
                </div>
              </div>
              
              {/* Metadata Grid (Genre, Duration, Release Date, Language) */}
              <div className="grid grid-cols-2 gap-2 text-sm text-slate-400 border-t border-gray-700 pt-3">
                {/* Genre */}
                <p className="flex items-center gap-1">
                  <Film size={14} className="text-blue-400" />
                  <span className="truncate">{movie.genre}</span>
                </p>
                
                {/* Duration */}
                <p className="flex items-center gap-1">
                  <Clock size={14} className="text-pink-400" />
                  {movie.duration} min
                </p>
                
                {/* Release Date */}
                <p className="flex items-center gap-1">
                  <Calendar size={14} className="text-green-400" />
                  <span className="truncate">{formatDate(movie.releaseDate)}</span>
                </p>
                
                {/* Language */}
                <p className="flex items-center gap-1">
                  <Globe size={14} className="text-orange-400" />
                  <span className="truncate">
                    {Array.isArray(movie.language) ? movie.language.join(', ') : movie.language}
                  </span>
                </p>
              </div>

              {/* Buy Tickets Button */}
              <Link
                to={`/details/${movie._id}`}
                className="mt-4 w-full text-center bg-red-600 hover:bg-red-700 text-white text-md font-bold px-4 py-3 rounded-lg block shadow-lg shadow-red-500/30 transition-colors duration-200"
              >
                Book Now
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllMovies;