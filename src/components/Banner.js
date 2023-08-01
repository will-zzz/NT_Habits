import React from "react";

const Banner = () => {
  const imageUrl = "/img/gas_station.png";

  return (
    <div className="h-screen w-screen mt-12">
      {/* Location */}
      <img src={imageUrl} alt="Banner Image" className="w-full object-cover" />
      {/* Content inside the banner, if any */}
    </div>
  );
};

export default Banner;
