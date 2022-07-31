import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from "recoil";
import App from "./components/App";
import Login from "./components/auth/Login";
import SignUp from "./components/auth/SignUp";
import UserProfile from "./components/auth/UserProfile";
import "./components/styles/index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/user/login" element={<Login />} />
        <Route path="/user/signup" element={<SignUp />} />
        <Route path="/user/dashboard" element={<UserProfile />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
