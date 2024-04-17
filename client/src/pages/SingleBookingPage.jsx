import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import AddressLink from "../AddressLink";
import PlaceGallery from "../PlaceGallery";
import BookingDates from "../BookingDates";
import { useTranslation } from "react-i18next";
import Swal from 'sweetalert2';

// a page to see a single booking
export default function SingleBookingPage() {
  // get the id from the url
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  // a state for the redirect
  const navigate = useNavigate();
   // a constant for the translation
   const { t } = useTranslation();
  // get the booking from the database
  useEffect(() => {
    if (id) {
      // get the booking from the database
      axios.get("/bookings").then((response) => {
        const foundBooking = response.data.find(({ _id }) => _id === id);
        if (foundBooking) {
          setBooking(foundBooking);
        }
      });
    }
  }, [id]);

  //function to delete the booking
  async function deleteBooking() {
    // ask the user if they are sure
    Swal.fire({
      title: t("Sure"),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: t("Yes"),
      cancelButtonText: t("No"),
    }).then(async (result) => {
      if (result.isConfirmed) {
        // User clicked 'Yes', delete the booking
        await axios.delete(`/bookings/${id}`);
        // Show success message and redirect to the home page
        Swal.fire({
          icon: 'success',
          title: t("Cancelled"),
        }).then(() => {
          navigate("/");
        });
      }
    });
  }

  // if the booking is empty display loading
  if (!booking) {
    return <div className="text-lg my-5">{t("Loading")}</div>;
  }

  return (
    <div className="my-8 max-w-7xl flex flex-col mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl">{booking.place.title}</h1>
        <button onClick={deleteBooking} className="p-4 text-white rounded-2xl bg-red-500 hover:bg-red-600">
        {t("Cancel")}
        </button>
      </div>
      <AddressLink className=" block">{booking.place.address}</AddressLink>
      <div className="bg-gray-200 p-6 mb-4 rounded-2xl flex items-center justify-between">
        <div>
          <h2 className="text-2xl mb-2">{t("BookingInfo")}</h2>
          <BookingDates booking={booking} />
        </div>
        <div className="bg-primary p-4 text-white rounded-2xl">
          <div>{t("TotalPrice")}:</div>
          <div className="text-2xl">€{booking.price}</div>
        </div>
      </div>
      <PlaceGallery place={booking.place} />
      <div className="bg-gray-200 p-6 mb-4 rounded-2xl mt-5">
        <h2 className="text-lg mb-2">{t("Description")}:</h2>
        <div className="">{booking.place.description}</div>
      </div>
      <div className="flex">
        <div className="bg-gray-200 p-6 mb-4 rounded-2xl">
          <h2 className="text-lg">{t("CheckIn")}: {booking.place.checkIn}</h2>
          <h2 className="text-lg">{t("CheckOut")}: {booking.place.checkOut}</h2>
          <h2 className="text-lg">{t("MaxGuests")}: {booking.place.maxGuests}</h2>
        </div>
      </div>
    </div>
  );
}
