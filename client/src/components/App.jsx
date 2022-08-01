import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import sessionAtom from "../recoil/atoms/sessionAtom";
import ShortenURL from "./ShortenURL";
import SignOut from "./auth/SignOut";

const URL = import.meta.env.VITE_URL;
const config = import.meta.env.VITE_AXIOS_CONFIG;

const App = () => {
  const [session, setSession] = useRecoilState(sessionAtom);
  const [error, setError] = useState(null);

  console.log(session, "session");

  return (
    <>
      <StyledNav>
        { session ? <SignOut /> : (
          <>
            <StyledLink to="/user/login">Login</StyledLink>
            <StyledLink to="/user/signup">Sign Up</StyledLink>
          </>
        )}

      </StyledNav>

      <Container className="App">
        <ShortenURL />
      </Container>
    </>
  );
};
const Container = styled.div`
  background-color: tan;
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;
const StyledNav = styled.nav`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

const StyledLink = styled(Link)`
  margin: 5px;
  text-decoration: none;
  color: #909090;
`;

export default App;
