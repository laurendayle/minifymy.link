import axios from "axios";
import { useState } from "react";
import { Navigate } from "react-router";
import { useRecoilState } from "recoil";
import sessionAtom from "../../recoil/atoms/sessionAtom";
import styled from "styled-components";

const url = import.meta.env.VITE_URL;
const config = import.meta.env.VITE_AXIOS_CONFIG;

const Login = () => {
  const [userData, setUserData] = useState({});
  const [error, setError] = useState(null);
  const [session, setSession] = useState(sessionAtom);
  const [shouldRedirect, setRedirect] = useState(false);

  console.log(session, "session from login");

  const handleInputChange = (e) => {
    const newState = { ...userData };
    newState[e.target.name] = e.target.value;
    setUserData(newState);
  };

  const handleLogin = (e) => {
    console.log(userData, config);
    axios
      .get(url + "/user/login", userData, config)
      .then((res) => {
        if (res.data.authenticated) {
          console.log(res.data, 'res.data in login');
          setSession(res.data);
        }
      })
      .catch((err) => setError(err));
  };

  return (
    <Container onChange={(e) => handleInputChange(e)}>
      <input
        name="email"
        placeholder="Email"
        aria-label="Your email"
        required
      />
      <input
        name="password"
        placeholder="Password"
        aria-label="Your password"
        required
      />
      <button onClick={(e) => handleLogin(e)}>Login</button>
      {/* {error && <div>{error}</div>}
      {session && <Navigate replace to="/user/profile" />} */}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 10px;
`;

export default Login;
