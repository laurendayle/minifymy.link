import { useState, useContext } from "react";
import axios from "../../api/axios";
import { Input, Button, Icon, Radio } from "semantic-ui-react";
import SignOut from "../auth/SignOut";
import styled from "styled-components";
import { useAuth } from "../hooks/AuthProvider";
import { useDataContext } from "../hooks/DataProvider";
import { useInput } from "../hooks/InputProvider";
import DetailsButton from "./DetailsButton";

const ShortenURL = (props) => {
  const { user } = useAuth();
  const { userInput, setInput } = useInput();
  const { userLinks, setLinks } = useDataContext();

  const [userData, setUserData] = useState({});
  const [shortenedUrl, setShortenedUrl] = useState("");
  const [error, setError] = useState(null);

  const handleInputChange = async (e) => {
    try {
      const newState = { ...userData };
      newState[e.target.name] = e.target.value;
      setUserData(newState);
      await setInput(newState);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/shorten/new", { ...userInput }, {
        headers: { "Authorization": `Bearer ${user.accessToken}` }
      });
      setShortenedUrl(res.data.shortened_url);
      const newLinks = userLinks.slice();
      newLinks?.links?.docs.push(res?.data);
      await setLinks(links);
    } catch (err) {
      if (err?.message) setError(err.message);
    }
  };

  return (
    <Container>
      <Inner>
        <Input
          name="original_url"
          label="https://"
          placeholder="www.long-website-name.com"
          required
          onChange={(e) => handleInputChange(e)}
          defaultValue={userData.original_url}
          style={inputStyle}
        />

        <Button style={buttonStyle} animated onClick={(e) => handleSubmit(e)}>
          <Button.Content visible>Shorten</Button.Content>
          <Button.Content hidden>
            <Icon name="cut" />
          </Button.Content>
        </Button>
      </Inner>

      <Details>
        <DetailsButton
          name="Title"
          label="title"
          handleInputChange={handleInputChange}
          error={error}
        />
        <DetailsButton
          name="Custom Backhalf"
          label="urlKey"
          error={error}
          handleInputChange={handleInputChange}
        />
      </Details>
      {error && <ErrorAlert>{error.message}</ErrorAlert>}
      {shortenedUrl ? <Display>Short URL: {shortenedUrl}</Display> : ""}
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  top: 35px;
  height: 35vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #8ebcbc83;
  padding: 15px;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  min-width: 450px;
`;

const Inner = styled.div`
  width: 70%;
  display: flex;
  align-items: center;
  background-color: #8ebcbc;
  padding: 15px;
  padding-bottom: 0px;
  border-radius: 5px 5px 0 0;
  min-width: 450px;
  max-width: 620px;
`;


const Display = styled.span`
  border: 1.5px dotted teal;
  padding: 5px;
  border-radius: 5px;
  min-width: fit-content;
`;

const Details = styled.div`
  background-color: #8ebcbc;
  width: 70%;
  border-radius: 0 0 5px 5px;
  display: flex;
  justify-content: space-evenly;
  padding: 15px;
  padding-top: 0px;
  min-width: 450px;
  max-width: 620px;
  height: 11vh;
`;

const ErrorAlert = styled.div`
  color: white;
  text-align: center;
  font-size: 15px;
  padding: 10px;
  -webkit-text-stroke-width: 1.2px;
  -webkit-text-stroke-color: #c87171b9;
`;

const inputStyle = {
  margin: "10px",
  width: "80%",
};

const buttonStyle = {
  color: "white",
  border: "1px dotted teal",
  backgroundColor: "transparent",
  width: "30%",
  zIndex: 0,
};

const buttonDetail = {
  width: "fit-content",
  backgroundColor: "transparent",
  color: "white",
  border: "1px dotted white",
  fontSize: "12px",
  margin: "5px",
  height: "35px",
};

const buttons = {
  name: "custom backhalf",
};

export default ShortenURL;
