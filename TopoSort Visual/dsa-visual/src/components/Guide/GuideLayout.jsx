import React, { useState, useEffect } from "react";
import Avatar from "../../assets/avatar.png";

const GuideLayout = ({ message }) => {
  const [visibleMessage, setVisibleMessage] = useState(null);

  useEffect(() => {
    if (message) {
      setVisibleMessage(message);
      const timer = setTimeout(() => {
        setVisibleMessage(null);
      }, 10000);

      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <div className="absolute bottom-5 right-5 flex items-center justify-center gap-x-2">
      {visibleMessage && (
        <div className="bg-gray-800 text-white p-3 rounded shadow-md">
          {visibleMessage}
        </div>
      )}
      <div className="h-16 w-16 flex justify-center items-center border rounded-full border-black shadow-md bg-gray-100">
        <img src={Avatar} alt="Avatar" className="h-12 w-auto" />
      </div>
    </div>
  );
};

export default GuideLayout;
