import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { AppContextProvider } from "./context/AppContext";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthContextProvider } from "./context/authContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <AuthContextProvider>
        <AppContextProvider>
          <App />
        </AppContextProvider>
      </AuthContextProvider>
    </Router>
  </React.StrictMode>
);
