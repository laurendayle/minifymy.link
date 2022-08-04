import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./components/App";
import Login from "./components/auth/Login";
import SignUp from "./components/auth/SignUp";
import UserProfile from "./components/auth/UserProfile";
import ErrorBoundary from "./components/ErrorBoundary";
// import { AuthProvider } from "./components/context/AuthProvider";
import { AuthProvider } from "./components/hooks/AuthProvider";
import "./components/styles/index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <ErrorBoundary>
  //   <BrowserRouter>
  //     <AuthProvider>
  //       <Routes>
  //         <Route path="/" element={<App />} />
  //         <Route path="/auth" element={<Login />} />
  //         <Route path="/register" element={<SignUp />} />
  //         <Route path="/logout" element={<SignOut />} />
  //         <Route
  //           path="/dashboard"
  //           element={
  //             <ProtectedRoute>
  //               <UserProfile />
  //             </ProtectedRoute>
  //           }
  //         />
  //       </Routes>
  //     </AuthProvider>
  //   </BrowserRouter>
  // </ErrorBoundary>
  <ErrorBoundary>
  <BrowserRouter>
    <AuthProvider>
      <App />
    </AuthProvider>
  </BrowserRouter>
</ErrorBoundary>
);
