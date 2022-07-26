import axios from "../../api/axios";
import { useState, useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import ShortenURL from "../reusable/ShortenURL";
import SignOut from "../auth/SignOut";
import { useAuth } from "../hooks/AuthProvider";
import HomeFooter from "../home/HomeFooter";
import HomeMidSection from "../home/HomeMidSection";
import { InputProvider } from "../hooks/InputProvider";

const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [error, setError] = useState(null);

  return (
    <Container className="App">
      <InputProvider>
        <ShortenURL />
      </InputProvider>
      <HomeMidSection />
      <HomeFooter />
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  left: 5%;
  
`;

export default Home;
