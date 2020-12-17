import React from "react";

function Splash() {
  setTimeout(() => {
    window.location.href = "/login";
  }, 4000);
  return (
    <div className="auth">
      <img className="logo" src="/img/logo.svg" alt="logo" />
      <div className="splash-image">
        <img src="/img/login.png" alt="bg" />
      </div>
    </div>
  );
}

export default Splash;
