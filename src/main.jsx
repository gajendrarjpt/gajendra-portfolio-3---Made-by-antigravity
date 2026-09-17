import React from "react";
import ReactDOM from "react-dom/client";
import "@fontsource-variable/outfit";
import "@fontsource-variable/manrope";
import App from "./App.jsx";
import ErrorBoundary from "./components/layout/ErrorBoundary.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
);
