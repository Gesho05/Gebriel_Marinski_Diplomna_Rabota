// file for all the different routes of the app
import { Route, Routes } from "react-router-dom";
import "./App.css";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import Layout from "./Layout";
import RegisterPage from "./pages/RegisterPage";
import axios from "axios";
import { UserContextProvider } from "./UserContext";
import AccountPage from "./pages/AccountPage";
import PlacesPage from "./pages/PlacesPage";
import PlacesFormPage from "./pages/PlacesFormPage";
import PlacePage from "./pages/PlacePage";
import BookingsPage from "./pages/BookingsPage";
import SingleBookingPage from "./pages/SingleBookingPage";
import LikedPage from "./pages/LikedPage";

//makes this localhost a default
axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
axios.defaults.withCredentials = true; //to accept cookies by default

function App() {
  return (
    <UserContextProvider>
      {/* route to the main page and login page */}
      <Routes>
        {/* Layout will always appear */}
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/account/places" element={<PlacesPage />} />
          <Route path="/account/places/new" element={<PlacesFormPage />} />
          <Route path="/account/places/:id" element={<PlacesFormPage />} />
          <Route path="/place/:id" element={<PlacePage />}/>
          <Route path="/account/bookings" element={<BookingsPage />}/>
          <Route path="/account/bookings/:id" element={<SingleBookingPage />}/>
          <Route path="/account/liked" element={<LikedPage />}/>
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
