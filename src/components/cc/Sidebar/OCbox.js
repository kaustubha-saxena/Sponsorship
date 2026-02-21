import React from "react";
import OCbtn from "./OCbtn";

const OCbox = ({ loading, ocs, setSelectedOCid, selectedOCid }) => {
  return (
    <div className="w-full h-100   mt-2">
      <div
        className="space-y-3 
       
        border border-blue-500/10 
        rounded-xl 
        p-4 
        max-h-full        overflow-y-auto 
        shadow-lg 
        no-scrollbar"
      >
        {/* Title */}
        <p className="text-[11px] tracking-wider text-gray-400 uppercase">
          Organizing Committees
        </p>

        {/* Loading */}
        {loading && (
          <div className="text-xs text-gray-400 animate-pulse">
            Loading OCs...
          </div>
        )}

        {/* Empty State */}
        {!loading && ocs.length === 0 && (
          <div className="text-xs text-gray-500 italic">
            No OCs found
          </div>
        )}

        {/* OC List */}
        {!loading &&
          ocs.map((item) => (
            <OCbtn
              key={item.uid}
              item={item}
              setSelectedOCid={setSelectedOCid}
              selectedOCid={selectedOCid}
            />
          ))}
      </div>
    </div>
  );
};

export default OCbox;