import React from "react";
import { fetchCitizen } from "../NT/fetchCitizen";
import { useState, useEffect } from "react";
import { set } from "firebase/database";

const Citizen = () => {
  const [body, setBody] = useState(null);
  const [citizenImgs, setCitizen] = useState(null);

  useEffect(() => {
    getCitizenImages();
  }, []);

  const getCitizenImages = async () => {
    try {
      const citizen = await fetchCitizen(2, 84);
      // get link from citizen array that ends with /background/
      const backgroundImageHref = citizen.find((href) =>
        /\/background\/\d+\.png$/.test(href)
      );
      // remove background image from array
      const citizenImages = citizen.filter(
        (href) => href !== backgroundImageHref
      );
      setCitizen(citizenImages);
    } catch (error) {
      console.error("Error fetching citizen:", error);
    }
  };

  return (
    <div>
      {/* Overlay Images */}
      {citizenImgs &&
        citizenImgs.map((link, index) => (
          <img
            key={index}
            src={link}
            alt={`Overlay ${index + 1}`}
            className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/5 object-cover pointer-events-none z-${
              index + 1
            }`}
          />
        ))}
    </div>
  );
};

export default Citizen;
