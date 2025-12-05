import { useEffect, useState } from "react";
import { Star, Play, Heart } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GetSingleMovie } from "../featurse/movie/movieSlice";

export default function MovieDetails() {
  const [currentDateIndex, setCurrentDateIndex] = useState(0);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetSingleMovie(id));
  }, [id]);

  const { movie } = useSelector((state) => state.movie);

  // duration convert
  const mins = movie?.duration || 0;
  const hours = Math.floor(mins / 60);
  const remainingMins = mins % 60;

  return (
    <div className="min-h-screen bg-black text-white px-4 sm:px-6 md:px-10 py-20">
      <div className="max-w-7xl mx-auto mt-8">
        {/* -------- MAIN GRID -------- */}
        <div className="grid grid-cols-1 items-center justify-center flex lg:grid-cols-5 gap-10 mb-16">
          {/* -------- POSTER -------- */}
          <div className="lg:col-span-2 flex justify-center  items-center justify-center flex ">
            <div className="relative rounded-2xl overflow-hidden  items-center justify-center flex  shadow-xl w-full max-w-md">
              <img
                src={movie?.poster}
                alt={movie?.title}
                className="w-[70%] h-[90%] object-cover transform transition duration-500 hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 hover:bg-black/5 transition duration-300"></div>
            </div>
          </div>

          {/* -------- DETAILS -------- */}
          <div className="lg:col-span-3 flex flex-col justify-between gap-6">
            <div>
              <p className="text-gray-400 font-semibold text-sm mb-2">
                {Array.isArray(movie?.language)
                  ? movie.language.join(" , ")
                  : movie?.language}
              </p>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-4">
                {movie?.title}
              </h1>

              <div className="flex items-center gap-2 mb-4">
                <Star className="w-6 h-6 fill-yellow-500 text-yellow-500" />
                <span className="text-lg font-semibold">
                  {movie?.rating} IMDB Rating
                </span>
              </div>

              <p className="text-gray-300 text-base sm:text-lg mb-3 leading-relaxed">
                {movie?.description}
              </p>

              {/* Duration */}
              <p className="text-gray-300 text-base mb-1">
                ⏱ {hours}h {remainingMins}m
              </p>

              {/* Release Date */}
              <p className="text-gray-300 text-base">
                📅{" "}
                {movie?.releaseDate
                  ? new Date(movie.releaseDate).toLocaleDateString()
                  : "N/A"}
              </p>
            </div>

            {/* -------- BUTTONS -------- */}
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <button
                className="flex items-center justify-center gap-2 px-6 py-3
                bg-gray-900/50 border border-gray-700 rounded-xl
                hover:bg-gray-800 transition w-full sm:w-auto"
              >
                <Play className="w-5 h-5" />
                {/* <li className="font-semibold">Watch Trailer</span> */}
                <a href={movie?.trailerUrl}>Watch Trailer</a>
              </button>

              <Link
                to={`/movie/${movie?._id}/theater`}
                className="flex items-center justify-center gap-2 px-8 py-3
                bg-red-500 hover:bg-red-600 rounded-xl font-bold transition
                w-full sm:w-auto"
              >
                Buy Tickets
              </Link>

              {/* <button
                className="px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl
                hover:bg-gray-800 transition w-full sm:w-auto flex items-center justify-center"
              >
                <Heart className="w-6 h-6" />
              </button> */}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}
