import axios from 'axios';
import { useState } from 'react';
import { Navigate } from 'react-router';
import styled from 'styled-components';

const url = import.meta.env.VITE_URL;
const config = import.meta.env.VITE_AXIOS_CONFIG;

const Login = () => {

  const [userData, setUserData] = useState({});
  const [shouldRedirect, setRedirect] = useState(false);

  console.log(shouldRedirect, 'shouldRedirect');

  const handleInputChange = (e) => {
    const newState = {...userData};
    newState[e.target.name] = e.target.value;
    setUserData(newState);
  }

  const handleLogin = (e) => {
    axios.post(url + '/login', userData, config)
      .then((session) => {
        if (session.data.cookie) {
          setRedirect(true);
        }
      })
      .catch((err) => console.error(err));
  }

  return (
    <Container onChange={(e) => handleInputChange(e)}>
      <input name="email" placeholder="Email" aria-label="Your email" required/>
      <input name="password" placeholder="Password" aria-label="Your password" required/>
      <button onClick={(e) => handleLogin(e)}>Login</button>
      {shouldRedirect && <Navigate replace to="/user" />}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 10px;
`;

export default Login;