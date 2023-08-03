import React from "react";
import Citizen from "./Citizen";

const Banner = () => {
  const imageUrl = "/img/gas_station.png";

  return (
    <div className="relative w-screen mt-12">
      {/* Location */}
      <img src={imageUrl} alt="Banner Image" className="w-full object-cover" />
      {/* Content inside the banner, if any */}
      {/* Button that calls fetchCitizen */}
      <Citizen />
    </div>
  );
};

export default Banner;
