import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import BookingWidget from "../BookingWidget";
import PlaceGallery from "../PlaceGallery";
import AddressLink from "../AddressLink";
import { UserContext } from "../UserContext";
import { useNavigate } from 'react-router-dom';
import { useRef } from "react";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";
import {
  WiFiSVG,
  FreeParkingSVG,
  TVSVG,
  PetsAllowedSVG,
  NoSoundLimitSVG,
  AirConditioningSVG,
} from "../PerkIcons";

export default function PlacePage() {
  //get the id from the url
  const { id } = useParams();
  //a state for the place
  const [place, setPlace] = useState(null);
  //a state for the contact info of the owner
  const [showContact, setShowContact] = useState(false);
  // a state for the user data
  const { user } = useContext(UserContext);
  // a constant for the translation
  const { t } = useTranslation();
  // a referance to the contact info
  const contactRef = useRef();
  // a mapping of the perks to icons
  const perkIcons = {
    "Wi-Fi": <WiFiSVG />,
    "Free parking": <FreeParkingSVG />,
    TV: <TVSVG />,
    "Pets allowed": <PetsAllowedSVG />,
    "No sound limit": <NoSoundLimitSVG />,
    "Air conditioning": <AirConditioningSVG />,
  };
  const navigate = useNavigate();

  //function to add the place to the liked database
  async function addToLiked() {
    if (!user) {
      // Redirect to the login page
      navigate("/login");
    } else {
      try {
        //post the place to the liked database
        const response = await axios.post("/liked", {
          place: place._id,
        });
        //if the status is 200 display a message
        if (response.status === 200) {
          Swal.fire({
            icon: "success",
            title: t("AddLike"),
          });
        }
      } catch (error) {
        // if the status is 409 display a message
        if (error.response && error.response.status === 409) {
          Swal.fire({
            icon: "info",
            title: t("AlreadyLike"),
          });
          console.clear(); // clear the error from the console
        } else {
          console.error("Error:", error);
        }
      }
    }
  }

  // function to close the contact info if the user clicks outside of it
  function useOnClickOutside(ref, handler) {
    //a useEffect to check if the user clicked outside of the contact info
    useEffect(() => {
      const listener = (event) => {
        if (!ref.current || ref.current.contains(event.target)) {
          return;
        }
        handler();
      };
      //add event listeners
      document.addEventListener("mousedown", listener);
      document.addEventListener("touchstart", listener);
      //remove event listeners
      return () => {
        document.removeEventListener("mousedown", listener);
        document.removeEventListener("touchstart", listener);
      };
    }, [ref, handler]);
  }
  //uses the function to close the popup if the user clicks outside of it
  useOnClickOutside(contactRef, () => setShowContact(false));

  //an effect to get the place by id
  useEffect(() => {
    if (!id) {
      return;
    }
    //get the place by id
    axios.get(`/places/${id}`).then((response) => {
      setPlace(response.data);
    });
  }, [id]);
  //if the place is empty display loading
  if (!place) {
    return <div className="mb-80">{t("Loading")}</div>;
  }

  return (
    <div className=" bg-gray-100 -mx-8 px-8 pt-8 ">
      <div className="max-w-5xl flex flex-col mt-4 mx-auto">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl">{place.title}</h1>
          <button
            className="flex  gap-2 bg-primary hover:bg-mint text-white py-2 pr-4 pl-2 rounded-xl"
            onClick={() => addToLiked(place.id)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
              />
            </svg>
            {t("AddToLiked")}
          </button>
        </div>
        <AddressLink>{place.address}</AddressLink>
        <PlaceGallery place={place} />
        <div className="flex flex-col">
          <div className="flex items-center gap-1 mt-6 underline">
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
                d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z"
              />
            </svg>

            <button
              className="text-lg bg-transparent"
              // if the user clicks on the button the contact info will be displayed
              onClick={() => setShowContact(!showContact)}
            >
              <span className="font-semibold">{t("Owner")}:</span>{" "}
              {place.owner.username}
            </button>
          </div>
        </div>
        <div className="mt-6 mb-8 grid gap-8 grid-cols-1 md:grid-cols-[2fr_1fr]">
          <div>
            <div className="relative">
              {showContact && (
                <div
                  className="bg-white border p-3 rounded-xl max-w-xs absolute -mt-7 shadow-lg"
                  ref={contactRef}
                >
                  <button
                    className="absolute top-1 right-3 hover:text-red-500 text-lg bg-transparent"
                    onClick={() => setShowContact(false)}
                  >
                    ✕
                  </button>
                  <h2 className="font-semibold text-xl mb-2 text-center">
                    {t("Contacts")}
                  </h2>
                  <span className="font-semibold">{t("Name")}:</span>{" "}
                  {place.owner.name}
                  <br />
                  <span className="font-semibold">{t("Email")}:</span>{" "}
                  {place.owner.email}
                  <br />
                  <span className="font-semibold">{t("Phone")}:</span>{" "}
                  {place.owner.phone}
                </div>
              )}
              <div className="my-5">
                <h2 className="font-semibold text-2xl mb-2">
                  {t("Description")}
                </h2>
                {place.description}
              </div>
            </div>
            {t("CheckIn")}: {place.checkIn} <br />
            {t("CheckOut")}: {place.checkOut} <br />
            {t("MaxGuests")}: {place.maxGuests}
          </div>
          <div>
            {/* referance to the boking widget */}
            <BookingWidget place={place} />
          </div>
        </div>
        <div className="bg-white -mx-7 mb-12 p-5 border  rounded-xl">
          {/* className="bg-white -mx-7 p-5 border-t border-l border-r rounded-t-xl" */}
          <div>
            <h2 className="font-semibold text-2xl mb-2">{t("Perks")}</h2>
            {place.perks.length > 0 ? (
              <ul className="list-disc list-inside grid grid-cols-2 gap-2">
                {/* maps the perks */}
                {place.perks.map((perk, index) => (
                  <li
                    className="flex gap-2 my-1 border p-2 rounded-2xl"
                    key={index}
                  >
                    {perkIcons[perk]}
                    {/* checks if the name of the per is in the db and displays the translation */}
                    {perk === "Free parking"
                      ? t("FreeParking")
                      : perk === "Pets allowed"
                      ? t("PetsAllowed")
                      : perk === "No sound limit"
                      ? t("NoSoundLimit")
                      : perk === "Air conditioning"
                      ? t("AirConditioning")
                      : perk}
                  </li>
                ))}
              </ul>
            ) : (
              // if there are no perks display this
              <p className="mb-4 mt-2 text-sm text-gray-700 leading-5">
                {t("NoPerks")}
              </p>
            )}
          </div>
          <div className="mt-2">
            <h2 className="font-semibold text-2xl">{t("ExtraInfo")}</h2>
          </div>
          <div className="mb-4 mt-2 text-sm text-gray-700 leading-5">
            {place.extraInfo.trim() ? place.extraInfo : t("NoExtra")}
          </div>
          <div className="mt-2">
            <h2 className="font-semibold text-2xl">{t("LocalLandmarks")}</h2>
          </div>
          <div className="mb-4 mt-2 text-sm text-gray-700 leading-5">
            {/* checks if there are any local landmarks */}
            {place.localLandmarks.trim()
              ? place.localLandmarks
              : t("NoLandmarks")}
          </div>
        </div>
      </div>
    </div>
  );
}
