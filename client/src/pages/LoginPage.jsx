import axios from "axios";
import { useContext, useState } from "react";
import { Link, redirect } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext.jsx";
import logo from "/images/JourneyMapper-logo.png";
import image from "/images/logpic.svg";
import { useTranslation } from "react-i18next";
import i18n from "i18next";
import { useEffect } from "react";
import Swal from 'sweetalert2';

export default function LoginPage() {
  //creates constatnt states of the imputed value
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
   // a constant for the translation
   const { t } = useTranslation();
  async function handleLoginSubmit(ev) {
    ev.preventDefault();
    try {
      const { data } = await axios.post("/login", {
        //sends information to api
        email,
        password,
      });
      setUser(data); //gets data of the user to use in design
      Swal.fire({
        icon: 'success',
        title: t("Welcome"),
        text: t("LoginSuccesfull"),
      });
      navigate("/");
    } catch (e) {
      //chatches the error code status to inform user that the login was not succesfull
      Swal.fire({
        icon: 'error',
        title: t("LoginFail"),
      });
    }
  }

  // an effect that grabs the language from local storage
  // and the language stays even after refresh
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language");
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
          <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12  ">
            <div className="mt-12 flex flex-col items-center">
              {/* logo */}
              <div className="flex items-center justify-center p-5">
                <img src={logo} alt="logo" className="w-12 h-12" />
                <span className="font-bold text-2xl font-merienda">
                  JourneyMapper
                </span>
              </div>
              <h1 className="text-2xl xl:text-3xl font-extrabold">{t("Login")}</h1>
              <p className="text-sm mt-2 text-gray-500">
              {t("Continue")}
              </p>
              <div className="w-full flex-1 mt-6 ">
                <form className="mx-auto max-w-xs" onSubmit={handleLoginSubmit}>
                  <input
                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="email"
                    placeholder={t("Email")}
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
                    <span className="ml-3">{t("Login")}</span>
                  </button>
                  <p className="mt-6 text-s text-gray-600 text-center">
                  {t("NoAccount")}{" "}
                    <Link className="text-black " to={"/register"}>
                     {t("RegisterNow")}
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
      {/* old design */}
      {/* <div className="mb-64">
        <div className="flex items-center justify-center p-5">
          <img src={logo} alt="logo" className="w-12 h-12" />
          <span className="font-bold text-2xl font-merienda">
            JourneyMapper
          </span>
        </div>
        <form
          action=""
          className="max-w-md mx-auto border py-10 px-10 rounded-3xl bg-gray-100 shadow-md shadow-gray-300"
          onSubmit={handleLoginSubmit}
        >
          <h1 className="text-4xl text-center mb-4">Login</h1>
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
            required
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
            required
          />
          <button className="primary mt-2">Login</button>
          <div className="text-center py-2 text-gray-500">
            Don't have an account?{" "}
            <Link className="text-black " to={"/register"}>
              Register now
            </Link>
          </div>
        </form>
      </div> */}
    </div>
  );
}
