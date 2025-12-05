"use client";
import { Star } from "lucide-react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "../Hooks/Loader";

const MovieGrid = () => {
  const { allMovies, movieLoading } = useSelector((state) => state.movie);
  // console.log(allMovies);

  if (movieLoading) {
    return <Loader />;
  }

  return (
    <div className="  relative  min-h-screen flex items-center flex-col justify-center bg-black text-white py-2 px-6">
      <div className="absolute  inset-0 w-full h-full">
        <img
          src="https://i.pinimg.com/1200x/94/8f/21/948f21546374fb0ecf6c6c664908b429.jpg"
          alt=""
          className="w-full h-full object-cover object-center bg-cover brightness-30"
        />
      </div>
      <div className="relative w-full flex flex-row  justify-between lg:px-24 lg:py-12">
        <h2 className="text-2xl font-extrabold text-center text-white">
          Now Showing
        </h2>

        <button className="text-red-400">
          View All{" "}
          <span className="hover:text-blue-400 hover:animate-bounce cursor-pointer">
            🡢
          </span>
        </button>
      </div>

      <div className=" relative justify-center flex-wrap flex md:flex-wrap lg:flex-wrap w-full lg:justify-center items-center gap-14 ">
        <div className=" relative justify-center flex-wrap flex md:flex-wrap lg:flex-wrap lg:w-[85%] lg:justify-center items-center gap-14 ">
          {allMovies?.map((movie) => (
            <div
              key={movie._id}
              className="bg-gray-900 rounded-2xl overflow-hidden w-[270px] shadow-lg hover:scale-105 transition-transform"
            >
              <img
                src={movie.poster}
                alt={movie.title}
                className="w-full h-72 object-cover"
              />
              <div className="p-4 space-y-">
                <h3 className="text-lg font-semibold overflow-hidden ">
                  {movie.title}
                </h3>
                <p className="text-sm text-slate-400">
                  • {movie.genre} • {movie.duration}
                </p>
                <div className="flex justify-between items-center pt-2">
                  <Link
                    to={`/details/${movie._id}`}
                    className="bg-red-500 hover:bg-red-600 text-white text-sm font-bold px-4 py-2 rounded-full"
                  >
                    Buy Tickets
                  </Link>
                  <div className="flex items-center gap-1 text-pink-400 font-semibold">
                    <Star size={16} fill="currentColor" />
                    {movie.rating}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <Link
          to="/movies"
          className="mt-10 hover:shadow-blue-800 hover:text-red-800 bg-red-500 p-3 flex relative px-9 rounded-2xl lg:mt-10"
        >
          Show More
        </Link>
      </div>
    </div>
  );
};

export default MovieGrid;
