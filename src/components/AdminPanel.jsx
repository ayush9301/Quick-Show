import { useEffect, useState } from "react";
import {
  Plus,
  Film,
  Building2,
  CalendarClock,
  Users,
  Edit,
  Delete,
  Receipt,
  DeleteIcon,
  Book,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { GetAllMovie } from "../featurse/movie/movieSlice";
import { GetAllTheater } from "../featurse/theater/theaterSlice";
import { GetAllShow } from "../featurse/show/showSlice";
import {
  AddMovie,
  AddShow,
  AddTheater,
  DeleteShow,
  GetAllBookings,
  GetAllUser,
  SetEditMovie,
  SetEditShow,
  SetEditTheater,
  UpdateMovie,
  UpdateShow,
  UpdateTheater,
} from "../featurse/admin/adminSlice";
import MovieGrid from "./MovieGrid";
import Loader from "../Hooks/Loader";

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="min-h-screen bg-black text-white flex **flex-col md:flex-row**">
      {/* Sidebar */}
      <aside className="**w-full md:w-64** bg-[#0b0f19] border-r border-blue-900 p-6 **md:h-screen md:sticky md:top-0**">
        <h1 className="text-2xl font-bold text-blue-400 mb-4">Admin Panel</h1>

        <nav className="flex flex-col md:flex-col gap-2 md:gap-4 overflow-x-auto pb-2">
          {/* admine dashboard */}
          <button
            className={`text-left px-3 py-2 rounded-lg ${
              activeTab === "dashboard" ? "bg-gray-800" : "bg-blue-900/30"
            }`}
            onClick={() => setActiveTab("dashboard")}
          >
            📊 Dashboard
          </button>
          {/* Movies Tab */}
          <button
            className={`text-center **whitespace-nowrap** px-3 py-2 rounded-lg ${
              activeTab === "movies" ? "bg-gray-800" : "bg-blue-900/30"
            }`}
            onClick={() => setActiveTab("movies")}
          >
            🎬 Movies
          </button>

          {/* Theaters Tab */}
          <button
            className={`text-center **whitespace-nowrap** px-3 py-2 rounded-lg ${
              activeTab === "theaters" ? "bg-gray-800" : "bg-blue-900/30"
            }`}
            onClick={() => setActiveTab("theaters")}
          >
            🏢 Theaters
          </button>

          {/* Shows Tab */}
          <button
            className={`text-center **whitespace-nowrap** px-3 py-2 rounded-lg ${
              activeTab === "shows" ? "bg-gray-800" : "bg-blue-900/30"
            }`}
            onClick={() => setActiveTab("shows")}
          >
            🎟 Shows
          </button>

          {/* Bookings Tab */}
          <button
            className={`text-center **whitespace-nowrap** px-3 py-2 rounded-lg ${
              activeTab === "bookings" ? "bg-gray-800" : "bg-blue-900/30"
            }`}
            onClick={() => setActiveTab("bookings")}
          >
            🧾 Bookings
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-black overflow-y-auto">
        {activeTab === "dashboard" && <AdminDashboard />}
        {activeTab === "movies" && <Movies />}
        {activeTab === "theaters" && <Theaters />}
        {activeTab === "shows" && <Shows />}
        {activeTab === "bookings" && <Bookings />}
        {/* {activeTab === "tickets" && <Tickets />} */}
      </main>
    </div>
  );
}

// /////////////Admin Dashboard////////////////////

const dashboardData = {
  totalUsers: 1250,
  totalMovies: 45,
  totalTheaters: 15,
  totalShows: 280,
  pendingBookings: 8,
};

const DashboardCard = ({ icon: Icon, title, value, colorClass }) => (
  <div
    className={`p-6 rounded-xl border border-gray-800 shadow-lg flex flex-col justify-between transition-all duration-300 hover:scale-[1.02] ${colorClass}`}
  >
    <div className="flex items-center justify-between">
      <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
        {title}
      </h3>
      <Icon className="w-8 h-8 opacity-50" />
    </div>
    <p className="text-4xl font-bold mt-4 text-white">
      {value?.toLocaleString()}
    </p>
  </div>
);

// Main Dashboard Component
export function AdminDashboard() {
  const { allMovies } = useSelector((state) => state.movie);
  const { allTheater } = useSelector((state) => state.theater);
  const { allShow } = useSelector((state) => state.show);
  const { alluser } = useSelector((state) => state.admin);
  const { allBookings } = useSelector((state) => state.admin);
  // console.log(allBookings);

  const totalRevenue = allBookings?.reduce((a, booking) => {
    const totalForThisBooking = booking?.show?.price * booking.seats.length;
    return a + totalForThisBooking;
  }, 0);
  const total = `₹ ${totalRevenue}`;
  console.log(total);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetAllMovie());
    dispatch(GetAllUser());
    dispatch(GetAllTheater());
    dispatch(GetAllShow());
    dispatch(GetAllBookings());
  }, []);

  return (
    <div className="w-full p-2">
      <h2 className="text-3xl font-extrabold text-blue-400 mb-8 flex items-center gap-2">
        📊 Overview Dashboard
      </h2>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Users Card */}
        <DashboardCard
          icon={Users}
          title="Total Users"
          value={alluser?.length || "0"}
          colorClass="bg-[#101423] text-blue-400 border-blue-900/50"
        />

        {/* Total Movies Card */}
        <DashboardCard
          icon={Film}
          title="Total Movies"
          value={allTheater?.length || "0"}
          colorClass="bg-[#101423] text-green-400 border-green-900/50"
        />

        {/* Total Theaters Card */}
        <DashboardCard
          icon={Building2}
          title="Total Theaters"
          value={allMovies?.length || "0"}
          colorClass="bg-[#101423] text-yellow-400 border-yellow-900/50"
        />

        {/* Total Shows Card */}
        <DashboardCard
          icon={CalendarClock}
          title="Total Shows"
          value={allShow?.length || "0"}
          colorClass="bg-[#101423] text-pink-400 border-pink-900/50"
        />

         <DashboardCard
          icon={Book}
          title="Total Bookings"
          value={allBookings?.length || "0"}
          colorClass="bg-[#101423] text-pink-400 border-pink-900/50"
        />

        {/* Example: Important Status Card (Pending Bookings) */}
        <div className="col-span-2 lg:col-span-4">
          <DashboardCard
            icon={Receipt}
            title="Revenue"
            value={total}
            colorClass="bg-red-900/20 text-red-400 border-red-700/50"
          />
        </div>
      </div>

      {/* <div className="mt-10 p-6 bg-[#0f172a] rounded-xl border border-gray-800">
        <h3 className="text-xl font-semibold text-white mb-4">
          Quick Actions & Recent Activity
        </h3>
        <p className="text-gray-400">
          [ यहां Recent Bookings की लिस्ट, या Add Movie के लिए एक बड़ा बटन आ सकता
          है ]
        </p>
      </div> */}
    </div>
  );
}

/* ---------------------------------------------------
	MOVIES
--------------------------------------------------- */
function Movies() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    duration: "",
    rating: "",
    genre: "",
    price: "",
    language: "",
    releaseDate: "",
    isActive: true,
    poster: "",
    trailerUrl: "",
  });
  // console.log(form);

  const dispatch = useDispatch();
  const { allMovies } = useSelector((state) => state.movie);
  const { editmovie } = useSelector((state) => state.admin);

  const handleAddMovie = (e) => {
    e.preventDefault();

    editmovie?.isedit ? dispatch(UpdateMovie(form)) : dispatch(AddMovie(form));

    setForm({
      title: "",
      description: "",
      duration: "",
      rating: "",
      genre: "",
      price: "",
      language: "",
      releaseDate: "",
      isActive: true,
      poster: "",
      trailerUrl: "",
    });
  };

  useEffect(() => {
    dispatch(GetAllMovie());
    if (editmovie.isedit) {
      setForm(editmovie.movie);
    }
  }, [editmovie, dispatch]);

  const handleEdit = (m) => {
    // e.preventDefault();
    dispatch(SetEditMovie(m));
  };

  // console.log(editmovie);

  return (
    <section className="w-full max-w-4xl mx-auto p-2">
      <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-2">
        <Film /> Add Movie
      </h2>
      <div className="gap-6 w-full bg-[#000] justify-center flex flex-col p-4 sm:p-6 rounded-xl border border-gray-600">
        <div className="flex flex-wrap p-2 sm:p-6 gap-4 md:gap-6">
          <input
            type="text"
            placeholder="title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="p-3 bg-black w-full **md:w-[calc(50%-12px)]** border border-[#65769fa7] rounded-2xl"
          />
          <input
            type="text"
            placeholder="description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="p-3 bg-black w-full **md:w-[calc(50%-12px)]** border border-[#65769fa7] rounded-2xl"
          />
          <input
            type="text"
            placeholder="duration"
            value={form.duration}
            onChange={(e) => setForm({ ...form, duration: e.target.value })}
            className="p-3 bg-black w-full **md:w-[calc(50%-12px)]** border border-[#65769fa7] rounded-2xl"
          />
          <input
            type="text"
            placeholder="rating"
            value={form.rating}
            onChange={(e) => setForm({ ...form, rating: e.target.value })}
            className="p-3 bg-black w-full **md:w-[calc(50%-12px)]** border border-[#65769fa7] rounded-2xl"
          />
          <input
            type="text"
            placeholder="genre"
            value={form.genre}
            onChange={(e) => setForm({ ...form, genre: e.target.value })}
            className="p-3 bg-black w-full **md:w-[calc(50%-12px)]** border border-[#65769fa7] rounded-2xl"
          />
          <input
            type="text"
            placeholder="price"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            className="p-3 bg-black w-full **md:w-[calc(50%-12px)]** border border-[#65769fa7] rounded-2xl"
          />
          <input
            type="text"
            placeholder="language"
            value={form.language}
            onChange={(e) => setForm({ ...form, language: e.target.value })}
            className="p-3 bg-black w-full **md:w-[calc(50%-12px)]** border border-[#65769fa7] rounded-2xl"
          />
          <input
            type="date"
            placeholder="releaseDate"
            value={form.releaseDate || ""}
            onChange={(e) => setForm({ ...form, releaseDate: e.target.value })}
            className="p-3 bg-black w-full **md:w-[calc(50%-12px)]** border border-[#65769fa7] rounded-2xl"
          />
          <input
            type="text"
            placeholder="poster"
            value={form.poster}
            onChange={(e) => setForm({ ...form, poster: e.target.value })}
            className="p-3 bg-black w-full **md:w-[calc(50%-12px)]** border border-[#65769fa7] rounded-2xl"
          />
          <input
            type="text"
            placeholder="trailerUrl"
            value={form.trailerUrl}
            onChange={(e) => setForm({ ...form, trailerUrl: e.target.value })}
            className="p-3 bg-black w-full **md:w-[calc(50%-12px)]** border border-[#65769fa7] rounded-2xl"
          />
        </div>
        <button
          onClick={handleAddMovie}
          className="w-full bg-gray-500 hover:bg-blue-400 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 mt-4"
        >
          {editmovie.isedit ? "Edit Movie" : "Add Movie"}
        </button>
      </div>
      {/* Movie List */}
      <div className="m-4 gap-5 flex flex-col">
        {allMovies?.map((m) => (
          <div
            key={m._id}
            className="w-full border border-gray-700 p-3 flex **flex-col sm:flex-row** items-start sm:items-center justify-between rounded-lg hover:bg-gray-800 transition"
          >
            <span className="text-lg font-medium text-gray-400 truncate w-full sm:w-auto mb-2 sm:mb-0">
              {m.title}
            </span>
            <div className="gap-3.5 flex items-center">
              <span className="text-lg font-medium text-gray-400">
                {new Date(m.releaseDate).toLocaleDateString()}
              </span>

              <button
                onClick={() => handleEdit(m)}
                className="p-2 rounded-lg hover:bg-gray-300 transition"
              >
                <Edit className="w-5 h-5 text-gray-400" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------------------------------------------------
	THEATERS
--------------------------------------------------- */
function Theaters() {
  const [form, setForm] = useState({
    name: "",
    location: "",
    screenTypes: "",
    isActive: "true",
  });
  const dispatch = useDispatch();

  const handleAdd = (e) => {
    e.preventDefault();

    const finalForm = {
      ...form,
      screenTypes: Array.isArray(form.screenTypes)
        ? form.screenTypes
        : form.screenTypes.split(",").map((s) => s.trim()),
      isActive: form.isActive === "true" || form.isActive === true,
    };

    edittheater.isedit
      ? dispatch(UpdateTheater(finalForm))
      : dispatch(AddTheater(finalForm));

    setForm({
      name: "",
      location: "",
      screenTypes: "",
      isActive: "true",
    });
  };

  const { edittheater } = useSelector((state) => state.admin);
  const { allTheater } = useSelector((state) => state.theater);
  // console.log(edittheater);

  useEffect(() => {
    dispatch(GetAllTheater());
    if (edittheater.isedit) {
      // Convert boolean isActive back to string for the select input
      const theaterToEdit = {
        ...edittheater.theater,
        isActive: String(edittheater.theater.isActive),
      };
      setForm(theaterToEdit);
    }
  }, [edittheater, dispatch]);

  const handleEdit = (m) => {
    // e.preventDefault();
    dispatch(SetEditTheater(m));
  };

  return (
    <div className="w-full p-2 sm:p-0">
      <h2 className="text-3xl font-bold text-blue-400 mb-6 flex items-center gap-2">
        <Plus /> {edittheater.isedit ? "Edit Theater" : "Add Theater"}
      </h2>
      {/* Theater Form: Responsive Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-[#0f172a] p-6 rounded-xl border border-blue-900">
        <input
          placeholder="Name"
          value={form.name}
          className="p-3 bg-black border outline-none border-blue-800 rounded w-full"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          value={form.location}
          placeholder="Location"
          className="p-3 bg-black border outline-none border-blue-800 rounded w-full"
          onChange={(e) => setForm({ ...form, location: e.target.value })}
        />
        <input
          value={
            Array.isArray(form.screenTypes)
              ? form.screenTypes.join(", ")
              : form.screenTypes
          }
          placeholder="Screen Types (comma separated: e.g., 2D, 3D, IMAX)"
          className="p-3 bg-black border outline-none border-blue-800 rounded w-full **md:col-span-2**"
          onChange={(e) => setForm({ ...form, screenTypes: e.target.value })}
        />

        {/* Usability Improvement: Using Select for isActive */}
        <select
          value={form.isActive}
          className="p-3 bg-black border outline-none border-blue-800 rounded w-full appearance-none"
          onChange={(e) => setForm({ ...form, isActive: e.target.value })}
        >
          <option value="true" className="bg-[#0f172a]">
            Active
          </option>
          <option value="false" className="bg-[#0f172a]">
            Inactive
          </option>
        </select>

        {/* Empty div for alignment on desktop, otherwise the select won't span full width */}
        <div className="hidden md:block"></div>

        <button
          className="col-span-1 md:col-span-2 bg-blue-600 hover:bg-blue-700 py-3 rounded-lg w-full mt-2"
          onClick={handleAdd}
        >
          {edittheater.isedit ? "Edit Theater" : "Add Theater"}
        </button>
      </div>
      {/* Theater List: Responsive Layout */}
      <div className="m-4 gap-5 flex flex-col">
        <h3 className="text-xl font-semibold text-white mb-2">
          Existing Theaters
        </h3>
        {allTheater?.map((m) => (
          <div
            key={m._id}
            className="w-full border border-gray-700 p-3 flex **flex-col sm:flex-row** items-start sm:items-center justify-between rounded-lg hover:bg-gray-800 transition"
          >
            <div className="flex flex-col mb-2 sm:mb-0">
              <span className="text-lg font-medium text-white">{m.name}</span>
              <span className="text-sm font-medium text-gray-400">
                {m.location}
              </span>
            </div>

            <div className="gap-3.5 flex items-center">
              <span className="text-sm font-medium text-gray-400">
                {Array.isArray(m.screenTypes)
                  ? m.screenTypes.join(", ")
                  : m.screenTypes}
              </span>

              <button
                onClick={() => handleEdit(m)}
                className="p-2 rounded-lg hover:bg-gray-300 transition"
              >
                <Edit className="w-5 h-5 text-gray-400" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
/* ---------------------------------------------------
	SHOWS
--------------------------------------------------- */
function Shows() {
  const dispatch = useDispatch();
  const { allMovies } = useSelector((state) => state.movie);
  const { allTheater } = useSelector((state) => state.theater);
  const { allShow } = useSelector((state) => state.show);
  const { editshow } = useSelector((state) => state.admin);
  // console.log(allShow);

  const [form, setForm] = useState({
    movie: "",
    theater: "",
    screenType: "",
    date: "",
    time: "",
    language: "",
    price: "",
    isActive: "true", // Use string for select input
  });

  const formatDateForInput = (dateString) => {
    if (!dateString) return "";
    try {
      return dateString.split("T")[0];
    } catch (error) {
      return dateString;
    }
  };

  useEffect(() => {
    dispatch(GetAllMovie());
    dispatch(GetAllTheater());
    dispatch(GetAllShow());

    if (editshow.isedit) {
      setForm({
        ...editshow.show,
        date: formatDateForInput(editshow.show.date),
        isActive: String(editshow.show.isActive),
      });
    }
  }, [editshow, dispatch]);

  const handleAdd = (e) => {
    e.preventDefault();

    const finalForm = {
      ...form,
      isActive: form.isActive === "true",
      price: parseFloat(form.price),
    };

    editshow.isedit
      ? dispatch(UpdateShow(finalForm))
      : dispatch(AddShow(finalForm));

    setForm({
      movie: "",
      theater: "",
      screenType: "",
      date: "",
      time: "",
      language: "",
      price: "",
      isActive: "true",
    });
  };

  const handleEdit = (m) => {
    dispatch(SetEditShow(m));
  };

  const handleDelete = (id) => {
    // dispatch(DeleteShow(id));
    console.log(`Deleting show with ID: ${id}`);
  };

  return (
    <div className="w-full p-2">
      <h2 className="text-3xl font-extrabold text-blue-400 mb-6 flex items-center gap-2">
        <CalendarClock /> {editshow.isedit ? "Edit Show" : "Add New Show"}
      </h2>

      {/* Form: Added responsive gap */}
      <div className="flex flex-wrap justify-between gap-4 bg-[#0f172a] p-6 rounded-xl border border-blue-900 shadow-xl">
        {/* MOVIE SELECT */}
        <select
          value={form.movie}
          className="p-3 bg-black border border-blue-800 rounded outline-none appearance-none cursor-pointer text-gray-400 focus:ring-2 focus:ring-blue-500 w-full **sm:w-[calc(50%-8px)] lg:w-[calc(33.33%-11px)]**"
          onChange={(e) => setForm({ ...form, movie: e.target.value })}
        >
          <option value="" disabled className="bg-[#0f172a] text-gray-500">
            Select Movie
          </option>
          {allMovies?.map((m) => (
            <option
              key={m._id}
              value={m._id}
              className="bg-[#0f172a] text-white"
            >
              {m.title}
            </option>
          ))}
        </select>

        {/* THEATER SELECT */}
        <select
          value={form.theater}
          className="p-3 bg-black border border-blue-800 rounded outline-none appearance-none cursor-pointer text-gray-400 focus:ring-2 focus:ring-blue-500 w-full **sm:w-[calc(50%-8px)] lg:w-[calc(33.33%-11px)]**"
          onChange={(e) => setForm({ ...form, theater: e.target.value })}
        >
          <option value="" disabled className="bg-[#0f172a] text-gray-500">
            Select Theater
          </option>
          {allTheater?.map((t) => (
            <option
              key={t._id}
              value={t._id}
              className="bg-[#0f172a] text-white"
            >
              {t.name} - {t.location}
            </option>
          ))}
        </select>

        {/* SCREEN TYPE */}
        <input
          required
          value={form.screenType}
          placeholder="Screen Type (e.g., 3D, IMAX)"
          className="p-3 bg-black border border-blue-800 rounded placeholder-gray-500 focus:ring-2 focus:ring-blue-500 w-full **sm:w-[calc(50%-8px)] lg:w-[calc(33.33%-11px)]**"
          onChange={(e) => setForm({ ...form, screenType: e.target.value })}
        />

        {/* DATE */}
        <input
          required
          value={form.date}
          type="date"
          className="p-3 bg-black border border-blue-800 rounded text-gray-400 focus:ring-2 focus:ring-blue-500 w-full **sm:w-[calc(50%-8px)] lg:w-[calc(33.33%-11px)]**"
          onChange={(e) => setForm({ ...form, date: e.target.value })}
        />

        {/* TIME */}
        <input
          required
          value={form.time}
          // type="time"
          placeholder="Show Time"
          className="p-3 bg-black border border-blue-800 rounded text-gray-400 focus:ring-2 focus:ring-blue-500 w-full **sm:w-[calc(50%-8px)] lg:w-[calc(33.33%-11px)]**"
          onChange={(e) => setForm({ ...form, time: e.target.value })}
        />

        {/* LANGUAGE */}
        <input
          required
          value={form.language}
          placeholder="Language (e.g., Hindi, English)"
          className="p-3 bg-black border border-blue-800 rounded placeholder-gray-500 focus:ring-2 focus:ring-blue-500 w-full **sm:w-[calc(50%-8px)] lg:w-[calc(33.33%-11px)]**"
          onChange={(e) => setForm({ ...form, language: e.target.value })}
        />

        {/* PRICE */}
        <input
          required
          value={form.price}
          placeholder="Price (e.g., 250)"
          type="number"
          className="p-3 bg-black border border-blue-800 rounded placeholder-gray-500 focus:ring-2 focus:ring-blue-500 w-full **sm:w-[calc(50%-8px)] lg:w-[calc(33.33%-11px)]**"
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />

        {/* IS ACTIVE SELECT */}
        <select
          value={form.isActive}
          className="p-3 bg-black border border-blue-800 rounded outline-none appearance-none cursor-pointer text-gray-400 focus:ring-2 focus:ring-blue-500 w-full **sm:w-[calc(50%-8px)] lg:w-[calc(33.33%-11px)]**"
          onChange={(e) => setForm({ ...form, isActive: e.target.value })}
        >
          <option value="true" className="bg-[#0f172a] text-white">
            Active
          </option>
          <option value="false" className="bg-[#0f172a] text-white">
            Inactive
          </option>
        </select>

        <button
          onClick={handleAdd}
          className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-lg font-semibold transition-colors duration-200 mt-2"
        >
          {editshow.isedit ? "Save Changes" : "Create Show"}
        </button>
      </div>

      {/* Scheduled Shows List: Responsive List Items */}
      <div className="m-4 gap-5 flex flex-col">
        <h3 className="text-xl font-semibold text-white mt-4 mb-2">
          Scheduled Shows
        </h3>
        {allShow?.map((m) => (
          <div
            key={m._id}
            className="w-full border border-gray-700 p-3 flex **flex-col sm:flex-row** items-start sm:items-center justify-between rounded-lg hover:bg-gray-800 transition"
          >
            {/* Show Details (Stacked on Mobile, Inline on Desktop) */}
            <div className="flex flex-col sm:flex-row sm:space-x-4 w-full sm:w-auto mb-2 sm:mb-0">
              <span className="text-lg font-medium text-white truncate max-w-xs sm:max-w-none">
                {m.movie?.title || "N/A"}
              </span>
              <span className="text-sm font-medium text-gray-400 sm:hidden">
                - {m?.time} - {m?.screenType}
              </span>
              <span className="text-base font-medium text-gray-400 hidden sm:block">
                {m?.time} | {m?.screenType} | ₹{m?.price}
              </span>
            </div>

            {/* Actions */}
            <div className="gap-3.5 flex items-center mt-2 sm:mt-0">
              <span
                className={`text-sm font-bold ${
                  m.isActive ? "text-green-400" : "text-red-400"
                }`}
              >
                {m.isActive ? "Active" : "Inactive"}
              </span>

              <button
                onClick={() => handleEdit(m)}
                className="p-2 rounded-lg hover:bg-gray-700 transition"
              >
                <Edit className="w-5 h-5 text-blue-400" />
              </button>

              <button
                onClick={() => dispatch(DeleteShow(m._id))}
                className="p-2 rounded-lg hover:bg-gray-700 transition"
              >
                <DeleteIcon className="w-5 h-5 text-red-400" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------------------------------------------
	BOOKINGS LIST
--------------------------------------------------- */
function Bookings() {
  const { allBookings, adminLoading } = useSelector((state) => state.admin);
  const { allMovies } = useSelector((state) => state.movie);

  const finalBookings = allBookings?.map((b) => {
    const movie = allMovies?.find((m) => m._id === b.show?.movie);
    return {
      ...b,
      movieName: movie ? movie.title : "Not Found",
    };
  });

  const dispatch = useDispatch();
  // console.log(allBookings);

  useEffect(() => {
    dispatch(GetAllBookings());
    dispatch(GetAllMovie());
  }, [dispatch]);

  if (adminLoading) {
    return <Loader />;
  }

  const formatShowTime = (date, time) => {
    const showDate = new Date(date).toLocaleDateString();
    return `${showDate} @ ${time}`;
  };

  return (
    <div className="w-full p-2">
      <h2 className="text-3xl font-extrabold text-blue-400 mb-6 flex items-center gap-2">
        <Receipt /> All Bookings
      </h2>

      <div className="bg-[#0f172a] p-4 sm:p-6 rounded-xl border border-blue-900 shadow-xl">
        <h3 className="text-xl font-semibold text-white mb-4">
          Total Bookings: {allBookings?.length || 0}
        </h3>

        {/* Bookings List */}
        <div className="m-2 sm:m-4 gap-4 flex flex-col">
          {finalBookings?.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No bookings found.</p>
          ) : (
            finalBookings?.map((m) => (
              <div
                key={m._id} // Using m._id as the list key
                className="w-full border border-gray-700 p-3 flex **flex-col sm:flex-row** items-start sm:items-center justify-between rounded-lg hover:bg-gray-800 transition"
              >
                <div className="flex flex-col w-full sm:w-auto mb-2 sm:mb-0">
                  <span className="text-lg font-bold text-white truncate max-w-xs sm:max-w-none">
                    {m?.movieName || "Movie N/A"}
                  </span>
                  <span className="text-sm font-medium text-blue-300">
                    Booked by: {m.user?.name || "User N/A"}
                  </span>
                  <span className="text-xs font-light text-gray-500 **sm:hidden**">
                    {m.show?.theater?.name || "Theater N/A"} |{" "}
                    {m.show?.screenType || "N/A"}
                  </span>
                </div>

                <div className="gap-4 flex flex-col sm:flex-row items-start sm:items-center w-full sm:w-auto">
                  {/* Show Time & Date */}
                  <span className="text-sm font-medium text-gray-400 hidden sm:block">
                    {formatShowTime(m.show?.date, m.show?.time)}
                  </span>

                  {/* Seats & Price */}
                  <div className="flex flex-wrap gap-2 sm:gap-4 text-sm">
                    <span className="font-semibold text-yellow-300">
                      Seats: {m.seats?.join(", ") || "N/A"}
                    </span>
                    <span className="font-bold text-green-400">
                      {/* Using safe access for calculation */}
                      Price: ₹{m?.show?.price * m?.seats?.length || "0.00"}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
