import React, { useContext } from "react";
import AccountNav from "../AccountNav";
import { useEffect, useState } from "react";
import { UserContext } from "../UserContext";
import { useTranslation } from 'react-i18next';
import axios from "axios";
import PlaceImg from "../PlaceImg";
import { Link } from "react-router-dom";
import BookingDates from "../BookingDates";

// a page for the booked places by the user
export default function BookingsPage() {
  //grabs user information
  const { ready, user } = useContext(UserContext);
  const [bookings, setBookings] = useState([]);
   // a constant for the translation
   const { t } = useTranslation();
  useEffect(() => {
    axios.get("/bookings").then((response) => {
      setBookings(response.data);
    });
  }, []);
  return (
    <div>
      <AccountNav />
      <h1 className="text-center mb-2 py-2 text-2xl font-bold">{t('SBookingsBg')}{user ? user.name : "Loading..."}{t('SBookings')}</h1>
      <div className="max-w-6xl flex flex-col mx-auto gap-4">
        {/* checks if there are any bookings */}
        {bookings?.length > 0 &&
          bookings.map((booking) => (
            <Link
              to={`/account/bookings/${booking._id}`}
              className="flex gap-4 bg-gray-100 rounded-2xl overflow-hidden"
              key={booking._id}
            >
              <div className="w-48">
                <PlaceImg place={booking.place} className="object-cover w-full h-full"/>
              </div>
              <div className="py-3 grow pr-3 ">
                <h2 className="text-xl border-b pb-2 mb-2 border-gray-400">
                  {booking.place.title}
                </h2>

                {/* calcolates number of nights */}
                <BookingDates booking={booking} className="text-gray-500 items-center"/>
                <div className="text-xl flex items-center gap-1 mt-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-7 h-7"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
                    />
                  </svg>
                  {t('TotalPrice')}: €{booking.price}
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}
