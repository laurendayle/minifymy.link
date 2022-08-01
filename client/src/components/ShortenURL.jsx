import { useState } from "react";
import axios from "axios";
import { useRecoilState } from "recoil";
import sessionAtom from "../recoil/atoms/sessionAtom";
import { Input, Button, Icon } from "semantic-ui-react";
import SignOut from "./auth/SignOut";
import styled from "styled-components";

const config = import.meta.env.VITE_AXIOS_CONFIG;
const url = import.meta.env.VITE_URL;
const inputStyle = {
  width: "60%"
}
const buttonStyle = {
  color: "#909090",
  border: "1px solid#909090",
  backgroundColor: "transparent",
  margin: "10px",
  width: "50%",
};

const ShortenURL = () => {
  const [inputUrl, setUrl] = useState("");
  const [shortenedUrl, setShortenedUrl] = useState("");
  const [session, setSession] = useRecoilState(sessionAtom);
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    axios
      .post(`${url}/shortenurl/new`, { url: inputUrl }, { config })
      .then((res) => {
        setShortenedUrl(res.data.shortened_url)
      })
      .catch((err) => {
        console.log(err, 'err');
        if (err.message) {
          setError(err.message);
        } else {
          setError({ message: "Something went wrong" });
        }
      });
  };

  return (
    <Container>
      <Input
        name="url"
        label="https://"
        placeholder="long-website-name.com"
        required
        onChange={(e) => setUrl(e.target.value)}
        value={inputUrl}
        style={inputStyle}
      />
      <Button style={buttonStyle} animated onClick={(e) => handleSubmit(e)}>
        <Button.Content visible>Shorten</Button.Content>
        <Button.Content hidden>
          <Icon name="cut" />
        </Button.Content>
      </Button>
      {error && <ErrorAlert>{error}</ErrorAlert>}
      <div>{shortenedUrl ? shortenedUrl : ""}</div>
    </Container>
  );
};

const Container = styled.div`
  height: 50%;
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ErrorAlert = styled.div`
  color: red;
  text-align: center;
`;

export default ShortenURL;
