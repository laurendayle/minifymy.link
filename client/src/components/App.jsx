import { Routes, Route, Link } from "react-router-dom";
import Login from "./auth/Login";
import Home from "./Home";
import SignUp from "./auth/SignUp";
import SignOut from "./auth/SignUp";
import UserProfile from "./auth/UserProfile";
import { ProtectedRoute } from "./auth/ProtectedRoute";
import { useAuth } from "./hooks/AuthProvider.jsx";
import { DataProvider } from "./hooks/DataProvider.jsx";
import styled from "styled-components";
import Nav from "./Nav";

const App = () => {
  const { user } = useAuth();

  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Login />} />
        <Route path="/register" element={<SignUp />} />
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
      </Routes>
    </>
  );
};

const StyledNav = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  height: 5vh;
  background-color: darkgray;
`;

export default App;
