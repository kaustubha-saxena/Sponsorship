import React from "react";

const OCbox = ({ item, selectedOCid, setSelectedOCid }) => {

  const handleClick = () => {
    setSelectedOCid(item.uid);
  };

  const isActive = selectedOCid === item.uid;

  return (
    <button
      onClick={handleClick}
      className={`p-2 rounded-md w-full flex items-center justify-start cursor-pointer transition-all duration-200
        ${
          isActive
            ? "bg-blue-600 text-white"
            : "bg-amber-50 text-black hover:bg-white/10 hover:text-white"
        }`}
    >
      <p className="text-sm font-medium">{item.name}</p>
    </button>
  );
};

export default OCbox;
