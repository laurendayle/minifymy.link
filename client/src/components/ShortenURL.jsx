import { useState } from "react";
import axios from "axios";
import { useRecoilState } from "recoil";
import sessionAtom from "../recoil/atoms/sessionAtom";
import { Input, Button, Icon } from "semantic-ui-react";
import SignOut from "./auth/SignOut";
import styled from "styled-components";

const buttonStyle = {
  color: "#909090",
  border: "1px solid#909090",
  backgroundColor: "transparent",
  margin: "5px",
  width: "50%",
};

const ShortenURL = () => {
  const [inputUrl, setUrl] = useState("");
  const [shortenedUrl, setShortenedUrl] = useState("");
  const [session, setSession] = useRecoilState(sessionAtom);
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    axios
      .post(URL + "/shortenurl/new", data, config)
      .then((res) => setShortenedUrl(res.data.shortened_url))
      .catch((err) => {
        if (err.message) {
          setError(err.message);
        } else {
          setError({ message: "Something went wrong" });
        }
      });
  };

  return (
    <Container>
      <Modal>
        <ModalInner>
          <Input
            name="link"
            label="https://"
            placeholder="long-website-name.com"
            required
            onChange={(e) => setUrl(e.target.value)}
            value={inputUrl}
          />
          <Button style={buttonStyle} animated onClick={(e) => handleSubmit(e)}>
            <Button.Content visible>Shorten</Button.Content>
            <Button.Content hidden>
              <Icon name="cut" />
            </Button.Content>
          </Button>
          <div>{shortenedUrl ? shortenedUrl : ""}</div>
          {error && <div>{error}</div>}
        </ModalInner>
      </Modal>
    </Container>
  );
};

const Container = styled.div`
  height: 60%;
  width: 60%;
`;

const Modal = styled.div`
  background-color: #ffffff88;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  height: 100%;
  width: 100%;
`;

const StyledHeader = styled.h1`
  position: relative;
  font-size: 3em;
  color: white;
  font-weight: 400;
`;

const ModalInner = styled.div`
  background-color: #ffffffc3;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  height: 70%;
  width: 60%;
`;

export default ShortenURL;
