import { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import axios from "../../../api/axios";
import { useNavigate } from "react-router-dom";
import SignOut from "./SignOut";
import ShortenURL from "../ShortenURL";
import LinksDisplay from "./LinksDisplay";
import Metrics from "./Metrics";
import { useAuth } from "../hooks/AuthProvider.jsx";
import { DataProvider, useDataContext } from "../hooks/DataProvider.jsx";

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
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });
        console.log(response.data, "response from fetchData");
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
    fetchData();
  }, []);

  return (
    <>
      <Container>
        <Metrics />
        <ShortenURL />

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
