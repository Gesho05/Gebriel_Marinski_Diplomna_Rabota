import { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import { Navigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import axios from "axios";
import PlacesPage from "./PlacesPage";
import AccountNav from "../AccountNav";

export default function AccountPage() {
  // a state to redirect to homepage
  const [redirect, setRedirect] = useState(null);
  //grabs user information
  const { ready, user, setUser } = useContext(UserContext);
  // a constant for the translation
  const { t } = useTranslation();4
  // a constant for the pop-up window
  const [isModalOpen, setIsModalOpen] = useState(false);
  // a state for the new email
  const [newEmail, setNewEmail] = useState("");

  //grabs the subpages
  let { subpage } = useParams();
  //checks if subpage is undefined
  if (subpage === undefined) {
    subpage = "profile";
  }

  //async function for loging out
  //connects to api and cookie
  async function logout() {
    await axios.post("/logout");
    //sets the state to the index page
    setRedirect("/");
    //logs out the user
    setUser(null);
  }
  //function for updating email
  async function handleFormSubmit(e) {
    //prevents the page from refreshing
    e.preventDefault();
    try {
      //connects to api and cookie
      const response = await axios.put("/update-email", { newEmail });
      //sets the new email
      setUser(response.data);
      setIsModalOpen(false);
      console.clear();
    } catch (error) {
      console.error(error);
    }
  }

  //if info about user is loading this happenes
  if (!ready) {
    return "Loading...";
  }

  //checks if user is loged in and if there are no other redirections
  //if not redirects to /login
  if (ready && !user && !redirect) {
    return <Navigate to={"/login"} />;
  }

  //checks if there is redirect(logout) and redirects to homepage
  if (redirect) {
    return <Navigate to={redirect} />;
  }
  return (
    <div>
      <AccountNav />
      {/* checks if user is in profile menu and displays info */}
      {subpage === "profile" && (
        <div className="max-w-lg mx-auto">
          <div>
            <div className="text-3xl text-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-7 h-7 text-center inline-block mr-1 mb-1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                />
              </svg>
              {t("Profile")}
            </div>
            <div className="bg-gray-100 p-5 rounded-2xl">
              <p className="text-xl mb-2">
                {t("Username")}: {user.username}
              </p>
              <hr />
              <p className="text-xl mb-1">
                {t("Name")}: {user.name}
              </p>
              <hr />
              <p className="text-xl mb-1">
                {t("Phone")}: {user.phone}
              </p>
              <hr />
              <p className="text-xl mb-1 flex items-center gap-2">
                {t("Email")}: {user.email}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 mt-1 hover:text-mint"
                  onClick={() => setIsModalOpen(true)}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
                
              </p>
            </div>
          </div>
          <div className="text-center mt-3">
            <button onClick={logout} className="primary hover:bg-mint max-w-sm mt-2">
              {t("Logout")}
            </button>
          </div>
          {isModalOpen && (
                  <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <form
                      onSubmit={handleFormSubmit}
                      className="p-6 bg-gray-100 rounded-xl shadow-lg"
                    >
                      <label className="block mb-2">
                      {t("NewEmail")}:
                        <input
                          type="email"
                          value={newEmail}
                          onChange={(e) => setNewEmail(e.target.value)}
                          required
                        />
                      </label>
                      <div className="flex gap-2">
                        <button
                          type="submit"
                          className="primary hover:bg-mint max-w-md"
                        >
                          {t("Change")}
                        </button>
                        <button
                        onClick={() => setIsModalOpen(false)}
                        className="delete hover:bg-red-600"
                        >
                        {t("CancelEmail")}
                        </button>
                      </div>
                    </form>
                    
                  </div>
                )}
        </div>
        
      )}
      {/* checks if user is in accomodations menu and connects the PlacesPage.jsx*/}
      {subpage === "places" && <PlacesPage />}
    </div>
  );
}
