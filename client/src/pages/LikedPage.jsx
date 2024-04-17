// file for visualizing the places that the user has liked
import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { UserContext } from "../UserContext";
import AccountNav from "../AccountNav";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import axios from "axios";
import Swal from 'sweetalert2';
import Image from "../Image";

export default function LikedPage() {
  //a state for the liked places
  const [likedPlaces, setLikedPlaces] = useState([]);
  //a state for the user data
  const { userId } = useContext(UserContext);
  // a constant for the translation
  const { t } = useTranslation();

  //function to remove the place from the liked database
  async function removeFromLiked(userId, placeId) {
    // trys to delete the place from the liked database
    try {
      const response = await axios.delete("/liked", {
        data: { userId, placeId },
      });
      //if the status is 200 display a message and remove the place from the liked database
      if (response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: t('RemovedLike'),
        })
        // remove the place from the liked places page
        setLikedPlaces(
          likedPlaces.filter((liked) => liked.place._id !== placeId)
        );
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  //get the liked places
  useEffect(() => {
    axios.get("/liked").then((response) => {
      setLikedPlaces(response.data);
    });
  }, []);

  return (
    <div>
      <AccountNav />
      {/* a link to the full information about the liked place */}
      <div className="max-w-6xl flex flex-col mx-auto gap-4">
        {likedPlaces.length > 0 ? (
        likedPlaces.map((liked) => (
          liked.place && (
          <div
            key={liked.place._id}
            className="flex gap-4 bg-gray-100 rounded-2xl overflow-hidden"
          >
            <div className="flex">
              <div>
                <div className="w-48">
                  {/* Display the title and a photo of the place */}
                  {liked.place.photos?.[0] && (
                    <div>
                      <Image
                        className="object-cover aspect-rect w-full h-full"
                        src={
                          liked.place.photos?.[0]
                        }
                        alt=""
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className="grow p-3 mt-2">
                <h2 className="text-xl line-clamp-1">{liked.place.title}</h2>
                <div className="flex gap-2">
                    <p className="text-sm line-clamp-1">{t('MaxGuests')}: {liked.place.maxGuests}</p>
                    <p className="text-sm line-clamp-1">{t('CheckIn')}: {liked.place.checkIn}</p>
                    <p className="text-sm line-clamp-1">{t('CheckOut')}: {liked.place.checkOut}</p>
                </div>
                <h3 className="mt-1">€{liked.place.price}/ {t('Night')}</h3>
                <div className="flex gap-2 mt-2">
                    <Link to={"/place/" + liked.place._id}>
                        <button className="px-2 py-1 text-white rounded-lg bg-primary hover:bg-mint">
                        {t('GoToPlace')}
                        </button>
                    </Link>
                    <button
                      onClick={() => removeFromLiked(userId, liked.place._id)}
                      className="px-2 py-1 text-white rounded-lg bg-red-500 hover:bg-red-600"
                    >
                      {t('Dislike')}
                    </button>
                </div>
              </div>
            </div>
          </div>
        ))
        )
    ):(<p className="text-center">
        {t('NoLikes')}
    </p>)}
      </div>
    </div>
  );
}
