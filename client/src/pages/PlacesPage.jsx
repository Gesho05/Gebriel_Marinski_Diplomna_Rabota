import { Link, useParams } from "react-router-dom";
import AccountNav from "../AccountNav";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import PlaceImg from "../PlaceImg";
import { useTranslation } from 'react-i18next';

//page for the places tab in the profile page
export default function PlacesPage() {
  //grabs the created places
  const [places, setPlaces] = useState([]);
   // a constant for the translation
   const { t } = useTranslation();

  //grabs the places
  useEffect(() => {
    axios.get("/user-places").then(({ data }) => {
      setPlaces(data);
    });
  }, []);


  return (
    <div>
      <AccountNav />
      <div className="text-center">
        <Link
          className="inline-flex gap-2 bg-primary text-white py-2 pl-2 pr-4 rounded-xl hover:bg-mint"
          to={"/account/places/new"}
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
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          {t('AddNewPlace')}
        </Link>
      </div>

      <div className="flex flex-col items-center mt-4 mx-auto">
        {places.map((place) => (
          <Link
            key={place._id}
            to={`/account/places/${place._id}`}
            className="flex gap-4 mb-5 cursor-pointer bg-gray-100 p-4 rounded-2xl max-w-6xl w-full"
          >
            <div>
              <div className="flex w-32 h-32 bg-gray-300 grow shrink-0">
                {/* Display the title and a photo of the place */}
                <PlaceImg
                  place={place}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
            <div className="grow-0 shrink grid grid-cols-1">
              <h2 className="text-xl line-clamp-1">{place.title}</h2>
              <p className="text-sm mt-2 line-clamp-3">{place.description}</p>
              <h3 className="">€{place.price}/ {t('Night')}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
