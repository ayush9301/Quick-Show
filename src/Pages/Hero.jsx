import { ArrowRight, Clock, Calendar } from "lucide-react";
import MovieGrid from "../components/MovieGrid";
import { useEffect } from "react";
import { GetAllMovie } from "../featurse/movie/movieSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "../Hooks/Loader";

const Hero = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetAllMovie());
  }, []);

  return (
    <>
      <div className="relative w-full min-h-screen overflow-hidden">
        {/* Background effect */}
        {/* <div className="absolute ">
        <div className="absolute "></div>
        <div className="absolute "></div>
      </div> */}

        {/* Background Image */}
        <div className="absolute  inset-0 w-full h-full">
          <img
            src="https://i.pinimg.com/1200x/8b/1a/81/8b1a8135eee3694af7ce0b673c1cd154.jpg"
            alt="Cinematic Background"
            className="w-full h-full object-cover object-center bg-cover brightness-50"
          />
        </div>

        <div className="relative z-10 pt-32 px-8 max-w-7xl mx-auto flex items-center justify-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center justify-center ">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20 ">
                <div className="bg-red-600 rounded-xl px-2 py-1 font-bold text-white text-sm">
                  MARVEL
                </div>
                <span className="text-white font-semibold text-sm">
                  STUDIOS
                </span>
              </div>

              {/* Title */}
              <h1 className="text-6xl lg:text-5xl font-bold text-white leading-tight">
                Spider-Man: <br />
                Brand New
                <br />
                Day
              </h1>

              {/* Metadata */}
              <div className="flex items-center gap-2 text-white/80 text-sm font-medium">
                <span>Adventure | Sci-fi </span>
                <div className="flex items-center gap-1">
                  <Calendar size={16} />
                  <span>july 31, 2026</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock size={16} />
                  <span>2h 39m</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-white text-l font-sans leading-relaxed max-w-md">
                Peter Parker tries to focus on college and leave Spider-Man
                behind. But when a new threat endangers his friends, he must
                break his promise and suit up again, teaming with an unexpected
                ally to protect those he loves.
              </p>

              {/* CTA Button */}
              <Link
                to="/movies"
                className="inline-flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-bold px-8 py-3 rounded-full transition-colors group"
              >
                Explore Movies
                <ArrowRight
                  size={20}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>
            </div>

            {/* Right Content - Movie Characters */}
            {/* <div className="relative h-full hidden lg:block">
              <div className="absolute inset-0 bg-gradient-to-l from-blue-500/20 to-transparent rounded-3xl"></div>
              <img
                src="/action-movie-poster-explosion-fight-hero.jpg"
                alt="Guardians of the Galaxy"
                className="w-full h-full object-cover rounded-3xl"
              />
            </div> */}
          </div>
        </div>
      </div>

      <MovieGrid />
      {/* <Loader /> */}

      {/* <AdminDashboard /> */}
    </>
  );
};

export default Hero;
