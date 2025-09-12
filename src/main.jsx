import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
<<<<<<< HEAD
import { AppContextProvider } from "./context/AppContext.jsx";
=======
import AppContextProvider from "./context/AppContext.jsx";
>>>>>>> 4e9394cf74f7fa26675f14cf85e23f91f8d6168d
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AppContextProvider>
        <App />
      </AppContextProvider>
    </BrowserRouter>
  </StrictMode>
);
