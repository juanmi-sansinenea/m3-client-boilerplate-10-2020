import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";

import { AuthProvider } from "./context/auth-context";
// We wrap the <App /> around the <AuthProvider> in order to be able to pass
// auth-related variables anywhere around the app thru the <Consumer>

ReactDOM.render(
  <Router>
    <AuthProvider>
      <App />
    </AuthProvider>
  </Router>,
  document.getElementById("root")
);
