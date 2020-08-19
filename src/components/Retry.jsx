import React from "react";

export const Retry = ({ onClick }) => {
  return (
    <div className="retry">
      <p>something went wrong</p>
      <button onClick={onClick}>Retry</button>
    </div>
  );
};
