import axios from "../../api/axios";
import { useState, useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import ErrorBoundary from "./ErrorBoundary";
import ShortenURL from "./ShortenURL";
import SignOut from "./auth/SignOut";
import { useAuth } from "./hooks/AuthProvider";

const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  if (user) navigate("/dashboard");

  const [error, setError] = useState(null);

  return (
    <>
      <Container className="App">
        <ShortenURL />
      </Container>
    </>
  );
};

const Container = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;
const StyledNav = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  height: 10vh;
  background-color: darkgray;
`;

const StyledLink = styled(Link)`
  margin: 5px;
  text-decoration: none;
  color: #909090;
`;

export default Home;
