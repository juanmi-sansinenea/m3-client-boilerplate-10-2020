import React from "react";

function Splash() {
  setTimeout(() => {
    window.location.href ="/login";
  }, 2000)
  return (
    <div>
      <h1>Splash Page</h1>
      
    </div>
  );
}

export default Splash;
