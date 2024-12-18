import React from "react";

const ChristmasLight = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="96"
      height="40"
      fill="none"
      className="xmas"
    >
      <circle
        cx="32"
        cy="19"
        r="2"
        fill="#26D97F"
        className="xmas-green"
      ></circle>
      <circle
        cx="76"
        cy="22"
        r="2"
        fill="#26D97F"
        className="xmas-green"
      ></circle>
      <circle
        cx="10"
        cy="24"
        r="2"
        fill="#FF4C4D"
        className="xmas-red"
      ></circle>
      <circle
        cx="69"
        cy="13"
        r="2"
        fill="#FF4C4D"
        className="xmas-red"
      ></circle>
      <circle
        cx="40"
        cy="26"
        r="2"
        fill="#6EB3F7"
        className="xmas-blue"
      ></circle>
      <circle
        cx="86"
        cy="17"
        r="2"
        fill="#6EB3F7"
        className="xmas-blue"
      ></circle>
      <circle
        cx="54"
        cy="16"
        r="2"
        fill="#FFBF00"
        className="xmas-yellow"
      ></circle>
      <circle
        cx="15"
        cy="10"
        r="2"
        fill="#FFBF00"
        className="xmas-yellow"
      ></circle>
      <circle
        cx="62"
        cy="25"
        r="2"
        fill="#ED5EC9"
        style={{
          filter: "drop-shadow(0 0 2px #ed5ec9)",
          animation: "combination 8s infinite",
          animationDelay: "0.8s",
        }}
      ></circle>
    </svg>
  );
};

export default ChristmasLight;
