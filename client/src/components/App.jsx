import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useRecoilState } from "recoil";
import styled from "styled-components";
import sessionAtom from "../recoil/atoms/sessionAtom";

const URL = import.meta.env.VITE_URL;
const config = import.meta.env.VITE_AXIOS_CONFIG;

const App = () => {

  const [inputUrl, setUrl] = useState('');
  const [shortenedUrl, setShortenedUrl] = useState('');
  const [session, setSession] = useRecoilState(sessionAtom);
  const [error, setError] = useState(null);

  console.log(session, 'session');

  const handleSubmit = (e) => {
    axios.post(URL + '/shortenurl/new', data, config)
      .then(res => setShortenedUrl(res.data.shortened_url))
      .catch(err => setError(err));
  }

  return (
    <div className="App">
      <StyledNav>
        <StyledLink to="/user/login">Login</StyledLink>
        <StyledLink to="/user/signup">Sign Up</StyledLink>
        <StyledLink to="/user/logout">Sign Out</StyledLink>
      </StyledNav>
      <input
        onChange={(e) => setUrl(e.target.value)}
        defaultValue={inputUrl}
        placeholder="URL"/>
      <button onClick={(e) => handleSubmit(e)}>Shorten</button>

      {error && <div>{error}</div>}
    </div>
  )
}

const StyledNav = styled.nav`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

const StyledLink = styled(Link)`
  margin: 5px;
  text-decoration: none;
`;

export default App;
