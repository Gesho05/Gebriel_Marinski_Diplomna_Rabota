//a file with the form to create a new accommodation
import React, { useEffect, useState } from "react";
import Perks from "../Perks";
import axios from "axios";
import PhotosUploader from "../PhotosUploader";
import AccountNav from "../AccountNav";
import { Navigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Swal from 'sweetalert2';

export default function PlacesFormPage() {
  //grabs the id of the place if it exists
  const { id } = useParams();
  //a state for every question on the form using them to send the info to the db
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  //photos state is an array to display the allready added photos
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [description, setDescription] = useState("");
  //array becouse of the multiple checkboxes
  const [perks, setPerks] = useState([]);
  //a state for the landmarks
  const [localLandmarks, setLocalLandmarks] = useState("");
  // a state for the textarea
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  //default is 1
  const [maxGuests, setMaxGuests] = useState(1);
  //a state for the price
  const [price, setPrice] = useState(100);
  //a state for the redirect
  const [redirect, setRedirect] = useState(false); 
  // a constant for the translation
  const { t } = useTranslation();
  

  //function to save the place
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/places/" + id).then((response) => {
      const { data } = response;
      setTitle(data.title);
      setAddress(data.address);
      setAddedPhotos(data.photos);
      setDescription(data.description);
      setPerks(data.perks);
      setLocalLandmarks(data.localLandmarks);
      setExtraInfo(data.extraInfo);
      setCheckIn(data.checkIn);
      setCheckOut(data.checkOut);
      setMaxGuests(data.maxGuests);
      setPrice(data.price);
    });
  }, [id]);

  //functions to use for the title and descriptions of the inputs
  function inputHeader(text) {
    return <h2 className="text-2xl mt-4">{text}</h2>;
  }

  // Input Description function
  function inputDescription(text) {
    return <p className="text-gray-400 text-sm">{text}</p>;
  }

  //a function combining the above functions
  function preInput(header, description) {
    return (
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    );
  }

  //function to validate that the form fields are not empty
  function validateForm() {
    //checks if the fields are empty
    if (!title.trim()) {
      Swal.fire({
        icon: 'error',
        title: t("TitleRequired"),
      });
      return false;
    }
    if (!address.trim()) {
      Swal.fire({
        icon: 'error',
        title: t("AddressRequired"),
      });
      return false;
    }
    if (!description.trim()) {
      Swal.fire({
        icon: 'error',
        title: t("DescriptionRequired"),
      });
      return false;
    }
    if (addedPhotos.length < 3) {
      Swal.fire({
        icon: 'error',
        title: t("PhotosRequired"),
      });
      return false;
    }
    if (!checkIn.trim() || !checkOut.trim()) {
      Swal.fire({
        icon: 'error',
        title: t("CheckInOutRequired"),
      });
      return false;
    }
    return true;
  }

  //function to add a new place
    async function savePlace(ev) {
      //prevents the page from reloading
      ev.preventDefault();
      //checks if the form is valid
      if (!validateForm()) {
        return;
      }
      //prevents the page from reloading
      ev.preventDefault();
      const placeData = {
        title,
        address,
        addedPhotos,
        description,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
        localLandmarks,
        price,
      };
      // checks if the place exists
      if (id) {
        // sends the changes to the db
        await axios.put("/places", {
          id,
          ...placeData,
        });
        setRedirect(true);
      } else {
        //sends the data to the db
        await axios.post("/places", placeData);
        setRedirect(true);
      }
    }
  //function to delete a place
  async function deletePlace() {
    if (id) {
      // Check if the place exists
      try {
        // Send a DELETE request to the server
        await axios.delete(`/places/${id}`);
        // Redirect to the places page after successful deletion
        setRedirect(true);
        alert(t("DeletedPlace"));
      } catch (error) {
        console.error("Failed to delete place:", error);
      }
    }
  }

  if (redirect) {
    return <Navigate to={"/account/places"} />;
  }

  return (
    <div className="flex flex-col items-center mb-4">
      <AccountNav />
      <form onSubmit={savePlace} className="max-w-6xl w-full">
        {preInput(
          t("Title"),
          t("TitleDesc")
        )}
        <input
          type="text"
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
          placeholder={t("ExampleTitle")}
        />
        {preInput(
          t("Address"),
          t("AddressDesc")
        )}
        <input
          type="text"
          value={address}
          onChange={(ev) => setAddress(ev.target.value)}
          placeholder={t("Address")}
        />
        {preInput(
          t("Photos"),
          t("PhotosDesc")
        )}
        <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />
        {preInput(
          t("Description"),
          t("DescriptionDesc")
        )}
        <textarea
          value={description}
          onChange={(ev) => setDescription(ev.target.value)}
        />
        {preInput(
          t("Perks"),
          t("PerksDesc")
        )}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 mt-2">
          <Perks selected={perks} onChange={setPerks} />
        </div>
        {preInput(
          t("LocalLandmarks"),
          t("LocalLandmarksDesc")
        )}
        <input
          type="text"
          value={localLandmarks}
          onChange={(ev) => setLocalLandmarks(ev.target.value)}
          placeholder={t("LLExample")}
        />
        {preInput(
          t("CheckInOutMaxGuests"),
          t("CheckInOutMaxGuestsDesc")
        )}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          <div className="mt-2 -mb-2">
            <h3>{t("CheckInTime")}</h3>
            <input
              type="text"
              value={checkIn}
              required
              onChange={(ev) => {
                let value = ev.target.value;
                const regex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
                //regex for the partial time
                const partialRegex = /^([01]?[0-9]|2[0-3])?:?[0-5]?[0-9]?$/;
                if (value.length === 2 && !value.includes(':') && checkIn.length !== 3) {
                  //adds a colon after the first 2 numbers
                  value = value + ':';
                }
                if (regex.test(value) || partialRegex.test(value)) {
                  setCheckIn(value);
                }
              }}
              placeholder="12:00"
            />
          </div>
          <div className="mt-2 -mb-2">
            <h3>{t("CheckOutTime")}</h3>
            <input
              type="text"
              value={checkOut}
              required
              onChange={(ev) => {
                let value = ev.target.value;
                const regex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
                const partialRegex = /^([01]?[0-9]|2[0-3])?:?[0-5]?[0-9]?$/;
                if (value.length === 2 && !value.includes(':') && checkOut.length !== 3) {
                  value = value + ':';
                }
                if (regex.test(value) || partialRegex.test(value)) {
                  setCheckOut(value);
                }
              }}
              placeholder="11:00"
            />
          </div>
          <div className="mt-2 -mb-2">
            <h3>{t("MaxGuests")}</h3>
            <input
              type="number"
              required
              value={maxGuests}
              onChange={(ev) => {
                const value = parseInt(ev.target.value);
                if (!isNaN(value) && value > 0 && value <= 20) {
                  setMaxGuests(value);
                }
              }}
            />
          </div>
          <div className="mt-2 -mb-2">
            <h3>{t("PricePerNight")}</h3>
            <input
              type="number"
              value={price}
              required
              onChange={(ev) => {
                const value = ev.target.value;
                if (value === '') {
                  setPrice(value);
                } else {
                  const number = parseFloat(value);
                  if (!isNaN(number) && number >= 0) {
                    setPrice(number);
                  }
                }
              }}
            />
          </div>
        </div>
        {preInput(
          t("ExtraInfo"),
          t("ExtraInfoDesc")
        )}
        <textarea
          value={extraInfo}
          onChange={(ev) => setExtraInfo(ev.target.value)}
        />
        <div>
          <button className="primary mt-4 hover:bg-mint"> {t("Publish")}</button>
        </div>
        {id && (
          <button
            type="button"
            onClick={deletePlace}
            className="delete mt-4 hover:bg-red-600"
          >
            {t("Delete")}
          </button>
        )}
      </form>
    </div>
  );
}
