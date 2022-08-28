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
import { Dimmer, Loader } from "semantic-ui-react";

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
      <InputProvider>
        <ShortenURL />
      </InputProvider>
      <LinksDisplay />
    </Container>
  );
};

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

export default UserProfile;
