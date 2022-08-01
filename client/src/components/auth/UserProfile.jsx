import { useRecoilState } from "recoil";
import sessionAtom from "../../recoil/atoms/sessionAtom";
import SignOut from "./SignOut";
import ShortenURL from "../ShortenURL";
import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const url = import.meta.env.VITE_URL;
const config = import.meta.env.VITE_AXIOS_CONFIG;

const UserProfile = () => {
  const navigate = useNavigate();

  const [session, setSession] = useRecoilState(sessionAtom);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState([]);

  console.log("session", session);

  useEffect(() => {
    const token = window.localStorage.getItem("minifymylink");
    if (!session) setSession(token);

    axios
      .get(`${url}/user/profile`, { auth: session, headers: { config } })
      .then((res) => setUserData(res.data))
      .catch((err) => {
        if (err.message) {
          setError(err.message);
        } else {
          setError({ message: "Something went wrong" });
        }
      });
  }, []);

  return (
    <>
      {session !== null ? (
        <>
          <SignOut session={session} />
          <Container>
            <ShortenURL />
          </Container>
          <div>
            {userData.length
              ? userData.map((link) => <div>{link.shortened_url}</div>)
              : ""}
          </div>
          <div>{error}</div>
        </>
      ) : (
        navigate("/")
      )}
    </>
  );
};

const Container = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default UserProfile;
