import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./components/App";
import ErrorBoundary from "./components/ErrorBoundary";
import { AuthProvider } from "./components/hooks/AuthProvider";
import "./components/styles/index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ErrorBoundary>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </ErrorBoundary>
);
