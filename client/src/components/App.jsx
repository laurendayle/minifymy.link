import { Routes, Route, Link } from "react-router-dom";
import { Sidebar, Icon } from "semantic-ui-react";
import { useState } from "react";
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

  const [displayNav, setDisplayNav] = useState(false);

  return (
      <Container>
        <SideNav
          onMouseEnter={() => setDisplayNav(!displayNav)}
        >
          <StyledIcon size="large" name="home" color="grey" />
          <StyledIcon size="large" name="plus" color="grey" />
          <StyledIcon size="large" name="dashboard" color="grey" />
          <StyledIcon size="large" name="linkify" color="grey" />
          <StyledIcon size="large" name="setting" color="grey" />

        </SideNav>


        <Sidebar
          onHide={() => setDisplayNav(!displayNav)}
          visible={displayNav}
          vertical="true"
          width="thin"
          animation="overlay"
          onMouseLeave={() => setDisplayNav(!displayNav)}
        >
          <Nav />
        </Sidebar>

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
      </Container>
  );
};

const Container = styled.div`
  height: auto;
  width: 100%;
`;

const SideNav = styled.div`
  height: 100%;
  width: 5%;
  display: flex;
  background-color: #0B132B;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
`;

const StyledIcon = styled(Icon)`
  padding: 25px 0 25px 0;
`;

export default App;
