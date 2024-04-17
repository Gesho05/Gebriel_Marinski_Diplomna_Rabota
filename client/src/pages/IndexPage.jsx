import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../Header";
import axios from "axios";
import { useTranslation } from "react-i18next";
import Image from "../Image";
import Swal from 'sweetalert2';

export default function IndexPage() {
  //a state that grabs the created places
  const [places, setPlaces] = useState([]);
  //a state for the search bar
  const [searchTerm, setSearchTerm] = useState("");

  //constants for pagination
  const [currentPage, setCurrentPage] = useState(1);
  //a constant for the number of places per page
  const itemsPerPage = 10;
  // a constant for the translation
  const { t } = useTranslation();

  //an effect that grabs the places
  useEffect(() => {
    //a popup that shows a warning message
    if (!localStorage.getItem('alertShown')) {
      Swal.fire({
        title: t("Warning"),
        text: t("Message"),
        icon: 'warning',
        confirmButtonText: 'OK'
      });
      localStorage.setItem('alertShown', 'true');
    }
    axios.get("/places").then((response) => {
      setPlaces(response.data);
    });
  }, []);

  //an effect that resets the page number when the search bar is used
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  // a function for the search bar
  function handleSearch(event) {
    setSearchTerm(event.target.value);
  }

  return (
    <div>
      {/* Displaying the search bar */}
      <div className="flex gap-2 mt-5 border border-gray-300 rounded-2xl py-2 px-4 shadow-md shadow-gray-300 mx-auto w-3/4 md:w-1/2 lg:w-1/3">
        <input
          type="search"
          placeholder={t("Search")}
          className="h-6 border-b focus:outline-none focus:border-b-2 focus:border-primary w-full"
          value={searchTerm}
          onChange={handleSearch}
        />
        <div className="bg-primary text-white py-1 px-3 rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </div>
      </div>
      <div className="mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {/* Displays the set amount of places and filters them if search bar is used */}
        {places
          .filter(
            (place) =>
              place.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
              place.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
              place.owner.username
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
          )
          // displays the places for the current page
          .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
          .map((place) => (
            <Link
              to={"/place/" + place._id}
              key={place._id}
              className="border shadow-sm hover:shadow-lg overflow-hidden rounded-xl border-primary transition-all duration-700 ease-in-out transform hover:scale-105"
            >
              <div className="bg-primary mb-2 rounded-2xl flex">
                {/* checks if photos exist and displays the first one */}
                {place.photos?.[0] && (
                  <div>
                    <Image
                      className=" object-cover aspect-rect"
                      src={place.photos?.[0]}
                      alt=""
                    />
                  </div>
                )}
              </div>
              <div className="p-3 -mt-2 bg-gray-50">
                <h3 className="font-bold truncate">{place.title}</h3>
                <h2 className="text-sm leading-4 text-gray-500 truncate">
                  {place.address}
                </h2>
                <h2 className="text-sm flex items-center pb-1 gap-1 underline leading-4 text-gray-500 truncate">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-3 h-3 mt-1"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z"
                    />
                  </svg>

                  {place.owner.username}
                </h2>
                <div className="mt-3 text-right mr-2 mb-1">
                  <span className="font-bold bg-mint py-1 px-2 text-white rounded-md">
                    €{place.price} /{t("Night")}
                  </span>
                </div>
              </div>
            </Link>
          ))}
      </div>
      <div className="flex justify-center mt-4">
        {/* displays the buttons for the pages */}
        {Array.from({ length: Math.ceil(places.length / itemsPerPage) }, (_, index) => (
          <button 
          key={index}
          //if the current page is the same as the index, the button will be highlighted
          className={`mx-1 px-3 py-2 border rounded-xl mb-5 mt-3 ${currentPage === index + 1 ? "bg-primary text-white" : ""}`}
          onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
