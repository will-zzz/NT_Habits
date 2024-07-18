const MenuDropdown = ({ showTexts, setShowTexts }) => {
  // ... (rest of your code)

  return (
    <div className="relative">
      {/* Button to toggle the visibility of texts */}
      <button
        className="bg-black text-white border-white border border-[0.5px] px-3 py-1 rounded-lg text-sm"
        onClick={() => setShowTexts(!showTexts)} // Toggle the value of showTexts on click
      >
        Stats
      </button>

      {/* Show the texts if showTexts is true */}
      {showTexts && (
        <div className="absolute top-12 left-0 bg-black text-white w-full px-4 py-2">
          {/* Your middle section text elements */}
          {/* For example */}
          <span className="text-white">Location: Gas Station</span>
          <span className="text-white">gBYTES: 0 / 1100</span>
          <span className="text-white">Daily Streak: 0</span>
          <span className="text-white">Days Until BYTES Claim: 0</span>
        </div>
      )}
    </div>
  );
};

export default MenuDropdown;
