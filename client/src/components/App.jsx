import { Routes, Route } from "react-router-dom";
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
// import Theme from "./ThemeProvider";
import Logo from "../assets/logo.png";
import { useState } from "react";
import { Icon, Sidebar } from "semantic-ui-react";

const App = (props) => {
  const { user } = useAuth();
  const [displayNav, setDisplayNav] = useState(false);

  return (
    // <Theme>
      <Container>
        <SideNav
          onMouseEnter={() => setDisplayNav(!displayNav)}
        >

          <img src={Logo} height="auto" width="50%"/>
          {/* <StyledIcon size="large" name="home" color="grey" />
          <StyledIcon size="large" name="plus" color="grey"/>
          <StyledIcon size="large" name="dashboard" color="grey" />
          <StyledIcon size="large" name="linkify" color="grey" />
          <StyledIcon size="large" name="setting" color="grey" /> */}

        </SideNav>


        <Sidebar
          onHide={() => setDisplayNav(!displayNav)}
          visible={displayNav}
          vertical="true"
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
    // </Theme>
  );
};

const Container = styled.div`
  height: auto;
  width: 100%;
`;

const SideNav = styled.div`
  text-align: center;
  padding-top: 20vh;
  height: 100%;
  background-color: #FFFFFF;
  border: 1px solid #EAECF0;
  width: 5vw;
  max-width: 5vw;
  position: fixed;
`;

const StyledIcon = styled(Icon)`
  padding: 30px 0 25px 0;

`;


export default App;
