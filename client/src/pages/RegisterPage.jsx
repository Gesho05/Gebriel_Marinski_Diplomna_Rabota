import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "/images/JourneyMapper-logo.png";
import image from "/images/login.svg";
import { useTranslation } from "react-i18next";
import Swal from 'sweetalert2';
import i18n from "i18next";
import { useEffect } from "react";

export default function RegisterPage() {
  // constants of the inputed values
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
   // a constant for the translation
   const { t } = useTranslation();
  const navigate = useNavigate();
  // sends request to the api
  async function registerUser(ev) {
    ev.preventDefault();

    try {
      await axios.post("/register", {
        //post request that sends the input data
        name,
        username,
        phone,
        email,
        password,
      });
      Swal.fire({
        icon: 'success',
        title: t("RegistrationSuccess"),
      });
      navigate("/login");
    } catch (e) {
      //if there is an error, displays message
      Swal.fire({
        icon: 'error',
        title: t("Ops"),
        text: t("RegisterFail"),
      });
    }
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
    <div>
      <Link
        to="/"
        className="absolute top-0 left-0 m-6 flex gap-1 items-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-5 h-5"
        >
          <path
            fillRule="evenodd"
            d="M11.03 3.97a.75.75 0 010 1.06l-6.22 6.22H21a.75.75 0 010 1.5H4.81l6.22 6.22a.75.75 0 11-1.06 1.06l-7.5-7.5a.75.75 0 010-1.06l7.5-7.5a.75.75 0 011.06 0z"
            clipRule="evenodd"
          />
        </svg>
        {t("Back")}
      </Link>

      <div className="min-h-screen bg-gray-100 -mx-8 text-gray-900 flex justify-center">
        <div className="max-w-screen-xl m-0 sm:m-16 bg-white shadow sm:rounded-lg flex justify-center flex-1 ">
          <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12 ">
            <div className="mt-1 flex flex-col items-center">
              {/* logo */}
              <div className="flex items-center justify-center p-5">
                <img src={logo} alt="logo" className="w-12 h-12" />
                <span className="font-bold text-2xl font-merienda">
                  JourneyMapper
                </span>
              </div>
              <h1 className="text-2xl xl:text-3xl font-extrabold">{t("Register")}</h1>
              <p className="text-sm mt-2 text-gray-500">{t("StartMapping")}</p>
              <div className="w-full flex-1 mt-6 ">
                <form className="mx-auto max-w-xs" onSubmit={registerUser}>
                  <input
                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="text"
                    placeholder={t("FullName")}
                    // reads what is writen in the input
                    value={name}
                    onChange={(ev) => setName(ev.target.value)}
                    required
                  />
                  <input
                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="text"
                    placeholder={t("Username")}
                    // reads what is writen in the input
                    value={username}
                    onChange={(ev) => setUsername(ev.target.value)}
                    required
                    maxLength={8}
                  />
                  <input
                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="text"
                    placeholder={t("PhoneNum")}
                    // reads what is writen in the input
                    value={phone}
                    onChange={(ev) => setPhone(ev.target.value)}
                    required
                  />
                  <input
                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="email"
                    placeholder={t("EmailReal")}
                    value={email}
                    onChange={(ev) => setEmail(ev.target.value)}
                    required
                  />
                  <input
                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                    type="password"
                    placeholder={t("Password")}
                    value={password}
                    onChange={(ev) => setPassword(ev.target.value)}
                    required
                  />
                  <button className="mt-5 tracking-wide font-semibold bg-primary text-white w-full py-4 rounded-lg hover:bg-mint transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                    <span className="ml-3">{t("Register")}</span>
                  </button>
                  <p className="mt-6 text-s text-gray-600 text-center">
                    {t("Member")}{" "}
                    <Link className="text-black " to={"/login"}>
                    {t("Login")}
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
          <div className="flex-1 bg-gray-50 text-center hidden items-center justify-center lg:flex">
            <div className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat">
              <img src={image} alt="" />
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
