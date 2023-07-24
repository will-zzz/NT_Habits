import React from "react";

const ChecklistSection = () => {
  return (
    <div className="flex flex-col items-center justify-center w-1/3 bg-gray-200">
      <div className="flex flex-col items-center">
        {/* Checklist content */}
        <label className="flex items-center">
          <input type="checkbox" className="form-checkbox mr-2" />
          Task 1
        </label>
        <label className="flex items-center">
          <input type="checkbox" className="form-checkbox mr-2" />
          Task 2
        </label>
        <label className="flex items-center">
          <input type="checkbox" className="form-checkbox mr-2" />
          Task 3
        </label>
        {/* Add more tasks as needed */}
      </div>
    </div>
  );
};

export default ChecklistSection;
