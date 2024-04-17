import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";
// library for date and time
import { differenceInCalendarDays } from "date-fns";
import { UserContext } from "./UserContext";
import { Navigate } from "react-router-dom";
import ReactDatePicker from "react-datepicker";
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

import "react-datepicker/dist/react-datepicker.css";

// a separate component for the booking widget and booking functionality
export default function BookingWidget({ place }) {
  // states for the booking widget functionality
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  // a state for the info of the user that is booking
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  // a state for the redirect
  const [redirect, setRedirect] = useState("");
  // a state for the loading
  const [loading, setLoading] = useState(false);
  // a state for the booked dates
  const [bookedDates, setBookedDates] = useState([]);
  // get the id from the url
  const { id } = useParams();
  // a state for the user data
  const { user } = useContext(UserContext);
  // a constant for the translation
  const { t } = useTranslation();
  const navigate = useNavigate();


  //effect to set the name of the user
  useEffect(() => {
    if (user) {
      setName(user.name);
      setMobile(user.phone);
    }
  }, [user]);
  // effect to get the booked dates for the place
  useEffect(() => {
    axios.get("/bookings").then((response) => {
      const bookings = response.data;
      const bookedDatesForPlace = getBookedDates(bookings, id);
      setBookedDates(bookedDatesForPlace);
    });
  }, [id]);

  // a state for the number of days
  let numberOfNights = 0;
  if (checkIn && checkOut) {
    numberOfNights = differenceInCalendarDays(
      new Date(checkOut),
      new Date(checkIn)
    );
  }

  // function to validate the form
  function validateForm() {
    if (
      !checkIn.trim() ||
      !checkOut.trim() ||
      !numberOfGuests ||
      !name.trim() ||
      !mobile.trim()
    ) {
      alert(t("AllFields"));
      return false;
    }
    return true;
  }

  // function to book the place
  async function bookThisPlace() {
    if (!user) {
      // Redirect to the login page
      navigate("/login");
    } else {
      // checks if the form is valid
      if (!validateForm()) {
        return;
      }

      const booking = {
        checkOut,
        numberOfGuests,
        name,
        mobile,
        place: place._id,
        price: numberOfNights * place.price,
      };
      try {
        // sends the booking to the db
        const response = await axios.post("/bookings", {
          checkIn,
          checkOut,
          numberOfGuests,
          name,
          mobile,
          place: place._id,
          price: numberOfNights * place.price,
        });
        const bookingId = response.data._id;
        setLoading(true);
        // trys to book the place

        // Prepare the email message for the owner
        const ownerMessage = `Dear ${place.owner.name},\n\nYour place ${place.title}\n has been booked.\n\nFrom: ${checkIn}\nTo: ${checkOut}\nGuests: ${numberOfGuests}\nBooked by: ${user.name}\nContact ${mobile}\n\nBest regards,\nJourneyMapper Team`;

        // Send the notification to the owner
        const ownerEmailResponse = await axios.post("/send-email", {
          to: place.owner.email,
          subject: "Your place has been booked",
          text: ownerMessage,
        });

        if (ownerEmailResponse.status !== 200) {
          throw new Error("Failed to send email to the owner");
        }
        // Prepare the email message to the user
        const message = `Dear ${user.name},\n\nYour booking has been confirmed.\n\nYou chose ${place.title}\nFrom: ${checkIn}\nTo: ${checkOut}\n Guests: ${numberOfGuests}\n\nThank you for choosing our service.\nIf there is any problem be sure to contact us\n\nBest regards,\nJourneyMapper Team`;

        // Send the notification
        const emailResponse = await axios.post("/send-email", {
          to: user.email,
          subject: "Booking confirmation",
          text: message,
        });

        if (emailResponse.status !== 200) {
          throw new Error("Failed to send email");
        }

        setRedirect(`/account/bookings/${bookingId}`);

        setLoading(false);
      } catch (error) {
        setLoading(false);
        if (
          error.response &&
          error.response.status === 400 &&
          error.response.data === "Invalid email address"
        ) {
          alert("The email of the owner or your email is invalid");
          console.clear(); // clear the error from the console
        } else {
          console.error(error);
        }
      }
    }
  }
  // function to get the booked dates and return them in an array
  function getBookedDates(bookings, id) {
    // Filter the bookings for the specific place
    const bookingsForPlace = bookings.filter(({ place }) => place._id === id);
    const dates = [];
    // Loop through the bookings and add the dates to the array
    bookingsForPlace.forEach((booking) => {
      const start = new Date(booking.checkIn);
      const end = new Date(booking.checkOut);
      end.setDate(end.getDate() + 1); // Add one day to the end date
      for (
        let day = new Date(start);
        day < end;
        day.setDate(day.getDate() + 1)
      ) {
        dates.push(new Date(day));
      }
    });
    return dates;
  }
  function dateClassName(date) {
    const isBooked = bookedDates.some(
      bookedDate => bookedDate.toISOString().split('T')[0] === date.toISOString().split('T')[0]
    );
  
    return isBooked ? {backgroundColor: 'red'} : {};
  }

  // if the site is loading displays a loading message
  if (loading) {
    return <div className="bg-white shadow p-4 rounded-2xl">{t("Wait")}</div>;
  }
  // if a booking is made redirects to the booking page of this booking
  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div className="bg-white shadow p-4 rounded-2xl">
      <div className="text-xl text-center ">
        {t("Price")}: {place.price}€ / {t("Night")}
      </div>
      <div className="border rounded-2xl mt-4">
        <div className="flex">
          <div className="py-3 px-4">
            <label>{t("CheckIn")}:</label>
            <ReactDatePicker
              // sets the selected date to the checkIn date
              selected={checkIn ? new Date(checkIn) : new Date()}
              // sets the checkIn date to the selected date
              onChange={(date) => setCheckIn(date.toISOString().split("T")[0])}
              dateFormat="dd.MM.yyyy"
              // sets the min date to today
              minDate={new Date()}
              // excludes the booked dates
              excludeDates={bookedDates}
            />
          </div>
          <div className="py-3 px-4 border-l">
            <label>{t("CheckOut")}:</label>
            <ReactDatePicker
              // sets the selected date to the checkOut date
              selected={checkOut ? new Date(checkOut) : new Date()}
              // sets the checkOut date
              onChange={(date) => setCheckOut(date.toISOString().split("T")[0])}
              dateFormat="dd.MM.yyyy"
              // sets the min date to today
              minDate={new Date()}
              // excludes the booked dates
              excludeDates={bookedDates}
            />
          </div>
        </div>
        <div className="py-3 px-4 border-t">
          <label>{t("Guests")}:</label>
          <input
            type="number"
            value={numberOfGuests}
            onChange={(ev) => {
              const value = parseInt(ev.target.value);
              //validation for the number of guests
              if (!isNaN(value) && value > 0 && value <= 15) {
                setNumberOfGuests(value);
              }
            }}
          />
        </div>
        {/* if check in and out are changed
        displays these inputs */}
        {checkIn && checkOut && (
          <div className="py-3 px-4 border-t">
            <label>{t("FullName")}:</label>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(ev) => {
                const value = ev.target.value;
                //validation for not allowing numbers
                const regex = /^[a-zA-Z\s]*$/;
                if (regex.test(value)) {
                  setName(value);
                }
              }}
            />
            <label>{t("PhoneNum")}:</label>
            <input
              type="tel"
              value={mobile}
              onChange={(ev) => {
                const value = ev.target.value;
                //validation for max length and only numbers
                const regex = /^[0-9]*$/;
                if (value.length <= 10 && regex.test(value)) {
                  setMobile(value);
                }
              }}
            />
          </div>
        )}
      </div>
      <button onClick={bookThisPlace} className="mt-4 primary hover:bg-mint">
        {t("Book")}
        {/* if number of days is bigger rhan 0 calcolates the price times days differance*/}
        {numberOfNights > 0 && (
          <span>
            {" "}
            {t("For")} {numberOfNights * place.price}€
          </span>
        )}
      </button>
    </div>
  );
}
