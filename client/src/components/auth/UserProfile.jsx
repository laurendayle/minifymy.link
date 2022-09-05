import { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import axios from "../../api/axios";
import { useNavigate } from "react-router-dom";
import SignOut from "./SignOut";
import ShortenURL from "../reusable/ShortenURL";
import LinksDisplay from "../auth/LinksDisplay";
import Modal from "../reusable/Modal";
import { useAuth } from "../hooks/AuthProvider.jsx";
import { useDataContext } from "../hooks/DataProvider.jsx";
import { InputProvider } from "../hooks/InputProvider";
import MetricsGrid from "./MetricsGrid";

const UserProfile = (props) => {
  const { user } = useAuth();
  const { userLinks, setLinks } = useDataContext();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/dashboard", {
          headers: { "Authorization": `Bearer ${user.accessToken}` }
        });
        console.log(response, "response from fetchData");
        setUserData(response?.data);
        await setLinks(response?.data);
        setLoading(false);
      } catch (err) {
        setError(err?.message);
      }
    };

    if (user) {
      fetchData();
    }
  }, []);

  return (
    <Container>
      <Card
      >
      <Header>
        <span>Overview</span>
        <span>Referrers</span>
        <span>Locations</span>
        <span>Languages</span>
        <span>Devices</span>
        <span>Platforms</span>
      </Header>

      {/* <InputProvider>
        <ShortenURL />
      </InputProvider> */}
      <MetricsGrid/>
      <LinksDisplay />
      </Card>
    </Container>
  );
};

const Container = styled.div`
  height: 100%;
  width: 100%;
  margin-left: 3vw;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 3vh;
`;

const Header = styled.div`
  height: 5vh;
  margin-bottom: 2vh;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  border-radius: 15px 15px 0 0;
  width: 100%;
  background-color: white;
`;

const Card = styled.div`
  height: 90%;
  width: 85%;
  border-radius: 15px;
  background-color: lightgray;
  display: flex;
  flex-direction: column;
  margin-top: 5vh;
  align-items: center;
`;

export default UserProfile;
