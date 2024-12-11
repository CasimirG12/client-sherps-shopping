import React from "react";

const ActivityIndicator = () => {
  return (
    <div className="relative flex items-center space-x-2">
      <span
        className="w-2 h-2 bg-slate-400 rounded-full animate-sineWave"
        style={{ animationDelay: "0s" }}
      ></span>
      <span
        className="w-2 h-2 bg-slate-400 rounded-full animate-sineWave"
        style={{ animationDelay: "0.3s" }}
      ></span>
      <span
        className="w-2 h-2  bg-slate-400 rounded-full animate-sineWave"
        style={{ animationDelay: "0.6s" }}
      ></span>
    </div>
  );
};

export default ActivityIndicator;
