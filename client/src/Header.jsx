import { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";
import { useTranslation } from "react-i18next";
import logo from "../images/JourneyMapper-logo.png";
import i18n from "./i18n";

// Destructure the `className` prop from the props object.
// If `className` is not provided, it defaults to an empty string.
export default function Header({ className = "" }) {
  //a state for the search bar
  const [searchTerm, setSearchTerm] = useState("");
  //grabs user information for displaying name
  const { user } = useContext(UserContext);
  // a constant for the translation function
  const { i18n } = useTranslation();
  // a constant for the translation
  const { t } = useTranslation();

  //function for the search bar
  function handleSearch(event) {
    setSearchTerm(event.target.value);
  }

  // an effect that grabs the language from local storage
  // and the language stays even after refresh
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    }
  }, []);

  return (
    //
    <header
      className={`flex bg-white shadow-md shadow-gray-200 -mx-8 px-6  py-4 justify-between ${className}`}
    >
      {/* logo */}
      <div className="flex items-center">
        <Link to={"/"} href="" className="flex items-center">
          <img src={logo} alt="logo" className="w-10 h-10" />
          <span className="font-bold text-xl font-merienda">JourneyMapper</span>
        </Link>
      </div>
      {/* search bar */}
      <div className="flex gap-2 border border-gray-300 rounded-2xl py-2 px-4 shadow-md shadow-gray-300 hidden md:flex">
        <div>{t("Slogan")}</div>
      </div>
      <div className="flex gap-2 items-center">
        <button
          onClick={() => {
            const newLanguage = i18n.language === "en" ? "bg" : "en";
            i18n.changeLanguage(newLanguage);
            localStorage.setItem("language", newLanguage);
          }}
          className="flex gap-1 border border-gray-300 bg-white rounded-2xl py-2 px-2 items-center"
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
              d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
            />
          </svg>
          {t("Lang")}
        </button>
        {/* log in icon */}
        {/* Links the login page to the icon */}
        {/* if there is user gos to /account otherwise to /login*/}
        <Link
          to={user ? "/account" : "/login"}
          className="flex gap-1 border border-gray-300 rounded-2xl py-2 px-2 items-center"
        >
          <div className="text-gray-700 justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path
                fillRule="evenodd"
                d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          {/* if user is loged in do this */}
          {!!user && <div className="pr-1">{user.username}</div>}
        </Link>
      </div>
    </header>
  );
}
