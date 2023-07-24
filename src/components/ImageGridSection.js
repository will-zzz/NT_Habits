import React from "react";

const ImageGridSection = () => {
  return (
    <div className="flex flex-col items-center justify-center w-1/3 bg-gray-300">
      <div className="grid grid-cols-3 gap-4">
        {/* Image grid */}
        <img
          src="img/sword.jpeg"
          alt="Image 1"
          className="w-24 h-24 object-contain"
        />
        <img
          src="img/sword.jpeg"
          alt="Image 2"
          className="w-24 h-24 object-contain"
        />
        <img
          src="img/sword.jpeg"
          alt="Image 3"
          className="w-24 h-24 object-contain"
        />
        {/* Add more images as needed */}
      </div>
    </div>
  );
};

export default ImageGridSection;
