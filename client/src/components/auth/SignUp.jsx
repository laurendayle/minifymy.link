import { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { Navigate } from 'react-router';

const URL = import.meta.env.VITE_URL;
const config = import.meta.env.VITE_AXIOS_CONFIG;
const SignUp = () => {
  const [userData, setUserData] = useState({});
  const [error, setError] = useState(null);
  const [shouldRedirect, setRedirect] = useState(false);

  const handleInputChange = (e) => {
    const newState = { ...userData };
    newState[e.target.name] = e.target.value;
    setUserData(newState);
  };

  const handleSignUp = (e) => {
    if (userData.password !== userData.verifyPassword) {
      setError("Please ensure the passwords match");
    } else {
      axios
        .post(URL + "/user/signup", userData, config)
        .then((res) => {
          if (res.data) {
            setRedirect(true);
          }
        })
        .catch((err) => setError(err));
    }
  };

  return (
    <Container onChange={(e) => handleInputChange(e)}>
      <input
        name="email"
        placeholder="Email"
        aria-label="Your Email"
        required
      />
      <input
        name="fullName"
        placeholder="Full Name"
        aria-label="Your First and Last Name"
        required
      />
      <input
        name="password"
        placeholder="Password"
        aria-label="Your Password"
        required
      />
      <input
        name="verifyPassword"
        placeholder="Verify Password"
        aria-label="Verify your password"
        required
      />
      <button onClick={(e) => handleSignUp(e)}>Create Account</button>

      {error && (
        <div>{error}</div>
      )}

      {shouldRedirect && <Navigate replace to="/user/dashboard" />}
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

export default SignUp;
