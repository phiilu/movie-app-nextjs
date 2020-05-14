import React from "react";

const Rating = ({ rating }) => {
  return (
    <div className="flex flex-col items-center">
      <svg
        fill="currentColor"
        viewBox="0 0 20 20"
        className={`w-6 h-6 mx-auto ${
          rating > 6.0 ? "text-green-500" : "text-red-500"
        }`}
      >
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z"
          clipRule="evenodd"
        ></path>
      </svg>
      <span
        className={`inline-block ${
          rating > 6.0 ? "text-green-500" : "text-red-500"
        }`}
      >
        {rating}
      </span>
    </div>
  );
};

export default Rating;
