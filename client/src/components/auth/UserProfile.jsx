import { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import axios from "../../api/axios";
import { useNavigate } from "react-router-dom";
import SignOut from "./SignOut";
import ShortenURL from "../reusable/ShortenURL";
import LinksDisplay from "../auth/LinksDisplay";
import Metrics from "../auth/Metrics";
import Modal from "../reusable/Modal";
import { useAuth } from "../hooks/AuthProvider.jsx";
import { useDataContext } from "../hooks/DataProvider.jsx";
import { InputProvider } from "../hooks/InputProvider";

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
          headers: { "Authorization": `Bearer ${user.accessToken}` }
        });
        console.log(response, "response from fetchData");
        setUserData(response?.data);
        await setLinks(response?.data);
      } catch (err) {
        if (!err?.response) {
          setError("No server response");
        } else if (err?.message) {
          setError(err.message);
        } else {
          setError("Something went wrong");
        }
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
      <Metrics
        oneMonthClicks={userLinks?.oneMonthClicks || "--"}
        oneWeekClicks={userLinks?.oneWeekClicks || "--"}
        totalClicks={userLinks?.links?.totalClicks || "--"}
      />
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
