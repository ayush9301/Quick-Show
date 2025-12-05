import { ChevronLeft, ChevronRight, DollarSign } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Heart, Tag, Ticket, Search, ChevronDown, Info } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { GetAllTheater } from "../featurse/theater/theaterSlice";
import { GetAllShow } from "../featurse/show/showSlice";
import { Link, useParams } from "react-router-dom";

const BookTickets = () => {
  const dispatch = useDispatch();
  const { allTheater } = useSelector((state) => state.theater);
  const { allShow } = useSelector((state) => state.show);
  // console.log(allShow);

  const uniqueDates = [...new Set(allShow?.map((show) => show.date))];
  const [selectedDate, setSelectedDate] = useState();
  // console.log(selectedDate);

  if (selectedDate?.length === 0) {
    return <h1>please select date</h1>;
  }

  // console.log(uniqueDates);

  const getMonthName = (dateString) => {
    if (!dateString) return "";

    const monthNumber = parseInt(dateString.slice(5, 7));

    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    return months[monthNumber - 1];
  };

  const finalDates = uniqueDates.map((d) => ({
    full: d,
    day: d.slice(8, 10),
    month: getMonthName(d),
  }));

  // console.log(finalDates);

  useEffect(() => {
    dispatch(GetAllShow());
    dispatch(GetAllTheater());
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const { id } = useParams();

  const theaterWiseShows = allTheater?.map((theater) => {
    const relatedShows = allShow?.filter((show) => {
      const matchMovie = show.movie._id === id;
      const matchTheater = show.theater === theater._id;
      const matchDate = show.date === selectedDate;

      return matchMovie && matchTheater && matchDate;
    });

    return {
      ...theater,
      shows: relatedShows,
    };
  });

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  console.log(theaterWiseShows);

  return (
    <>
      <div className="min-h-screen bg-black">
        <div className="flex gap-3 px-8">
          {/* {finalDates.length === 0 ? ( */}
          {finalDates?.map((d) => (
            <button
              key={d.full}
              onClick={() => handleDateSelect(d.full)}
              className={`px-4 py-2 rounded-lg border 
        ${
          selectedDate === d
            ? "bg-yellow-500 text-black border-yellow-400"
            : "bg-gray-800 text-white border-gray-600"
        }`}
            >
              {d.day}
            </button>
          ))}
        </div>

   

<div className="max-w-7xl px-4 sm:px-6 lg:px-8 py-2">
  <div className="space-y-6"> {/* Increased vertical space */}
    {theaterWiseShows?.map((theater) => (
      <div
        key={theater._id}
        className="bg-gray-900 border border-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
      >
        <div className="p-4 sm:p-6">
          
          {/* THEATER HEADER */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 border-b border-gray-800 pb-4">
            <div className="flex items-center gap-4">
              {/* Theater Initial Icon */}
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-600/20 border-2 border-blue-500 rounded-full flex items-center justify-center text-blue-400 font-bold text-lg flex-shrink-0">
                {theater.name[0]}
              </div>
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  {theater.name}
                  {/* Info Icon for Location/Details */}
                  <Info className="w-4 h-4 text-gray-400 hover:text-blue-400 cursor-help transition-colors" />
                </h3>
                <p className="text-sm text-gray-400 flex items-center gap-1">
                  {theater.location}
                  {/* Display screen types here or on hover */}
                  <span className="ml-2 text-xs text-gray-500 hidden sm:inline">
                      {/* ({theater.screenTypes?.join(', ') || 'Various Screens'}) */}
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* SHOWTIMES LIST */}
          <div className="flex flex-wrap gap-4 mb-6 justify-start">
            {theater?.shows?.length > 0 ? (
              theater.shows.map((show) => (
                <div key={show._id} className="flex flex-col items-center">
                  <Link
                    to={`/movie/${id}/theater/${theater._id}/show/${show._id}/seats`}
                    // Enhanced Showtime Button Styling
                    className={`
                      w-24 h-16 rounded-lg border-2 
                      px-2 py-1 font-extrabold text-center transition-all duration-200 
                      flex flex-col justify-center items-center shadow-md
                      ${
                        // Check if show is available (using isActive from data)
                        show.isActive
                          ? "text-blue-200 bg-blue-700/30 border[1px] border-gray-600 hover:bg-gray-600/50 hover:border-gray-500"
                          : "text-gray-500 bg-gray-800 border-gray-700 cursor-not-allowed opacity-70"
                      }
                    `}
                  >
                    {/* Time */}
                    <div className="text-lg leading-tight">
                        {show.time}
                    </div>
                    {/* Language and Screen Type (Smaller) */}
                    <div className="text-xs text-gray-400 font-normal mt-0.5 leading-tight">
                      {show.language?.toUpperCase()} | {show.screenType?.toUpperCase()}
                    </div>
                  </Link>
                  
                  {/* Price Tag below the time slot */}
                  <span className="text-xs font-semibold text-yellow-500 mt-1 flex items-center gap-1">
                      {/* <DollarSign className="w-3 h-3" /> */}
                      ₹{show.price || 'N/A'}
                  </span>
                </div>
              ))
            ) : (
              <>
                {selectedDate === undefined || selectedDate?.length === 0 ? (
                  <h1 className="text-gray-500 text-lg">Please select a date to view shows.</h1>
                ) : (
                  <p className="text-gray-500 text-lg">
                    No shows are scheduled for this date at this cinema.
                  </p>
                )}
              </>
            )}
          </div>

          {/* FOOTER ACTIONS */}
          <div className="flex items-center gap-6 text-sm pt-4 border-t border-gray-800">
            {/* Added Offers/Food buttons for better call-to-action */}
            <div className="flex gap-3">
              <button className="flex items-center gap-2 text-yellow-400 hover:text-yellow-300 font-semibold transition-colors">
                <Tag className="w-4 h-4" />
                Offers Available
              </button>
              <button className="flex items-center gap-2 text-green-400 hover:text-green-300 font-semibold transition-colors">
                <Ticket className="w-4 h-4" />
                Pre-book Food
              </button>
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>

        <style>{`
            .scrollbar-hide::-webkit-scrollbar { display: none; }
            .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        `}</style>
      </div>
    </>
  );
};

export default BookTickets;
