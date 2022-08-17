import { Routes, Route, Link } from "react-router-dom";
import Login from "./auth/Login";
import Home from "../components/home/Home";
import SignUp from "./auth/SignUp";
import SignOut from "./auth/SignUp";
import UserProfile from "./auth/UserProfile";
import { ProtectedRoute } from "./auth/ProtectedRoute";
import { useAuth, AuthProvider } from "./hooks/AuthProvider.jsx";
import { DataProvider } from "./hooks/DataProvider.jsx";
import styled from "styled-components";
import Nav from "../components/home/Nav";
import Issues from "./Issues";

const App = () => {
  const { user } = useAuth();

  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Login />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/issues" element={<Issues />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DataProvider>
                <UserProfile />
              </DataProvider>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <SignOut />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
};

export default App;
