// a separate component for the perks part of the form for uploading a accommodation
import { useTranslation } from "react-i18next";
export default function Perks({ selected, onChange }) {
   // a constant for the translation
   const { t } = useTranslation();
  // function that handles the checkbox click
  function handleCbClick(ev) {
    const { checked, name } = ev.target;
    if (checked) {
      onChange([...selected, name]); // Add the name of the perk
    } else {
      onChange(selected.filter((selectedName) => selectedName !== name));
    }
  }
  return (
    <>
      <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
        <input
          checked={selected.includes("Wi-Fi")}
          name="Wi-Fi"
          onChange={handleCbClick}
          type="checkbox"
        />
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
            d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z"
          />
        </svg>
        <span>Wi-Fi</span>
      </label>
      <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
        <input
          checked={selected.includes("Free parking")}
          name="Free parking"
          onChange={handleCbClick}
          type="checkbox"
        />
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
            d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
          />
        </svg>
        <span>{t("FreeParking")}</span>
      </label>
      <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
        <input
          checked={selected.includes("TV")}
          name="TV"
          onChange={handleCbClick}
          type="checkbox"
        />
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
            d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125z"
          />
        </svg>
        <span>TV</span>
      </label>
      <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
        <input
          checked={selected.includes("Pets allowed")}
          name="Pets allowed"
          onChange={handleCbClick}
          type="checkbox"
        />
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
            d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
          />
        </svg>
        <span>{t("PetsAllowed")}</span>
      </label>
      <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
        <input
          checked={selected.includes("No sound limit")}
          name="No sound limit"
          onChange={handleCbClick}
          type="checkbox"
        />
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
            d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0M3.124 7.5A8.969 8.969 0 015.292 3m13.416 0a8.969 8.969 0 012.168 4.5"
          />
        </svg>
        <span>{t("NoSoundLimit")}</span>
      </label>
      <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
        <input
          checked={selected.includes("Air conditioning")}
          name="Air conditioning"
          onChange={handleCbClick}
          type="checkbox"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            id="primary"
            d="M21,11H18.87l1-1.45a1,1,0,1,0-1.66-1.1L16.46,11H13V7.54l2.55-1.71a1,1,0,0,0-1.1-1.66L13,5.13V3a1,1,0,0,0-2,0V5.13l-1.45-1a1,1,0,0,0-1.1,1.66L11,7.54V11H7.54L5.83,8.45a1,1,0,0,0-1.66,1.1l1,1.45H3a1,1,0,0,0,0,2H5.13l-1,1.45a1,1,0,0,0,.28,1.38A.94.94,0,0,0,5,16a1,1,0,0,0,.83-.45L7.54,13H11v3.46L8.45,18.17a1,1,0,0,0,1.1,1.66l1.45-1V21a1,1,0,0,0,2,0V18.87l1.45,1A.94.94,0,0,0,15,20a1,1,0,0,0,.55-1.83L13,16.46V13h3.46l1.71,2.55A1,1,0,0,0,19,16a.94.94,0,0,0,.55-.17,1,1,0,0,0,.28-1.38l-1-1.45H21a1,1,0,0,0,0-2Z"
            style={{
              fill: "rgb(0, 0, 0)",
            }}
          />
        </svg>
        <span>{t("AirConditioning")}</span>
      </label>
    </>
  );
}
