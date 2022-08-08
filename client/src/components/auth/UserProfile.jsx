import { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import axios from "../../api/axios";
import { useNavigate } from "react-router-dom";
import SignOut from "./SignOut";
import ShortenURL from "../home/ShortenURL";
import LinksDisplay from "../auth/LinksDisplay";
import Metrics from "../auth/Metrics";
import Modal from "../reusable/Modal";
import { useAuth } from "../hooks/AuthProvider.jsx";
import { useDataContext } from "../hooks/DataProvider.jsx";

const UserProfile = (props) => {
  const { user } = useAuth();
  const { userLinks, setLinks } = useDataContext();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/dashboard", {
          headers: { "Authorization": user.refreshToken },
        });
        console.log(response, "response from fetchData");
        setUserData(response.data);
        setLinks(response.data);
      } catch (err) {
        if (!err?.response) {
          setError("No server response");
        } else if (err?.message) {
          setError(err.message);
        } else {
          setError(err);
        }
      }
    };

    if (user) {
      fetchData();
    }
  }, []);

  return (
    <>
      <Container>
        <Metrics />

        <LinksDisplay links={userLinks} />

      </Container>
    </>
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
