"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  AddBooking,
  CreateTicket,
  GetShowBookings,
  resetSeatsSuccess,
} from "../featurse/booking/seatSlice";
import { GetAllShow } from "../featurse/show/showSlice";
import Loader from "../Hooks/Loader";
import { toast } from "react-toastify";
// import { unwrapResult } from "@reduxjs/toolkit";

export default function SeatSelector() {
  const dispatch = useDispatch();
  const { allShow } = useSelector((state) => state.show);

  const { showId } = useParams();
  // console.log(showId);

  const { bookedSeats, seatsSucces, seatsLoading } = useSelector(
    (state) => state.seat
  );
  const [selectedSeats, setSelectedSeats] = useState([]);
  console.log(seatsSucces);

  useEffect(() => {
    dispatch(GetShowBookings(showId));
    dispatch(GetAllShow());
    if (seatsSucces) {
      toast.success("Seat Booked");
    }
  }, [showId, seatsSucces]);

  if (seatsSucces) {
    setTimeout(() => {
      dispatch(resetSeatsSuccess());
    }, 1500);
  }

  const toggleSeat = (seatId) => {
    if (bookedSeats.includes(seatId)) return;

    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seatId));
    } else {
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };

  const bookNow = async () => {
    if (selectedSeats.length === 0) {
      alert("Please select a seat!");
      return;
    }

    const bookingResult = await dispatch(AddBooking({ showId, selectedSeats }));
    console.log("BOOKING RESULT => ", bookingResult);

    if (bookingResult.payload?.addbooking?._id) {
      const bookingId = bookingResult.payload.addbooking._id;
      await dispatch(CreateTicket(bookingId));
    }

    setSelectedSeats([]);
  };

  const seatButton = (id) => {
    let color = "bg-gray-700";

    if (bookedSeats.includes(id)) color = "bg-red-900";
    else if (selectedSeats.includes(id)) color = "bg-yellow-500";

    return (
      <button
        onClick={() => toggleSeat(id)}
        className={`${color} p-3 rounded w-14`}
      >
        {id}
      </button>
    );
  };

  const showData = allShow?.find((s) => s._id === showId);

  // console.log(showData);

  if (!showData) {
    return <Loader />;
  }

  const price = showData.price * selectedSeats.length;
  // console.log(price);

  return (
    <div className="flex flex-col items-center gap-">
      <div className="flex flex-row gap-8">
        <div className="flex items-center justify-center flex-col">
          <div className="w-8 h-8 bg-red-900 rounded-sm"></div>
          <p className="text-gray-200 ">Sold</p>
        </div>{" "}
        <div className="flex items-center justify-center flex-col">
          <div className="w-8 h-8 bg-gray-700 rounded-sm"></div>
          <p className="text-gray-200 ">Available</p>
        </div>
      </div>
      <div className="text-center mb-4 w-full text-white">
        <div className="inline-block p-1.5 h-2 w-[60%] rounded-t-3xl bg-slate-500 opacity-50" />
        <p className="text-slate-400 text-sm mt-2"> SCREEN</p>
        <p className="text-slate-400 text-[10px] "> {showData?.screenType}</p>
      </div>

      <div className="flex gap-3 mb-3">
        {seatButton("A1")}
        {seatButton("A2")}
        {seatButton("A3")}
        {seatButton("A4")}
        {seatButton("A5")}
        {seatButton("A6")}
      </div>

      <div className="flex gap-3 mb-3">
        {seatButton("B1")}
        {seatButton("B2")}
        {seatButton("B3")}
        {seatButton("B4")}
        {seatButton("B5")}
        {seatButton("B6")}
      </div>

      <div className="flex gap-3 mb-3">
        {seatButton("C1")}
        {seatButton("C2")}
        {seatButton("C3")}
        {seatButton("C4")}
        {seatButton("C5")}
        {seatButton("C6")}
      </div>

      <span className="text-white">₹{price}</span>

      {seatsLoading ? (
        <button className="bg-blue-600 px-6 py-3 px-8 rounded-lg font-semibold hover:bg-green-700">
          Wait..
        </button>
      ) : (
        <button
          onClick={bookNow}
          className="bg-red-600 px-6 py-3 text-gray-800 rounded-lg font-semibold hover:bg-red-700"
        >
          Book Tickets
        </button>
      )}

      <p className="text-slate-400 text-sm">Selected: {selectedSeats.length}</p>
    </div>
  );
}
