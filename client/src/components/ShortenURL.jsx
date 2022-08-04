import { useState, useContext } from "react";
import axios from "../../api/axios";
import { Input, Button, Icon } from "semantic-ui-react";
import SignOut from "./auth/SignOut";
import styled from "styled-components";
import { useAuth } from "./hooks/AuthProvider";
import { useDataContext } from "./hooks/DataProvider";

const inputStyle = {
  width: "60%",
};
const buttonStyle = {
  color: "white",
  border: "1px dotted teal",
  backgroundColor: "transparent",
  margin: "5px",
  width: "50%",
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

const ShortenURL = (props) => {
  const { user } = useAuth();
  const { userLinks, setLinks } = useDataContext();

  const [inputUrl, setUrl] = useState("");
  const [userData, setUserData] = useState({});
  const [shortenedUrl, setShortenedUrl] = useState("");
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [buttonState, setButtonState] = useState(false);

  const handleInputChange = (e) => {
    const newState = { ...userData };
    newState[e.target.name] = e.target.value;
    setUserData(newState);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "/shorten/new",
        { original_url: inputUrl },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      setLinks([...userLinks, res.data]);
      setShortenedUrl(res.data.shortened_url);
    } catch (err) {
      console.log(err, "err");
    }
  };

  return (
    <Container>
      <Input
        name="url"
        label="https://"
        placeholder="www.long-website-name.com"
        required
        onChange={(e) => setUrl(e.target.value)}
        value={inputUrl}
        style={inputStyle}
      />
      <div>
        {buttonState ? (
          <Input
            name="title"
            placeholder="Title"
            onChange={(e) => setUserData(e.target.value)}
            value={userData.title}
          />
        ) : (
          ""
        )}
        <Button
          content="Title"
          icon={!buttonState ? "plus" : "minus"}
          style={buttonDetail}
          onClick={(e) => setButtonState(!buttonState)}
        />
      </div>
      <Button style={buttonStyle} animated onClick={(e) => handleSubmit(e)}>
        <Button.Content visible>Shorten</Button.Content>
        <Button.Content hidden>
          <Icon name="cut" />
        </Button.Content>
      </Button>
      {error && <ErrorAlert>{error}</ErrorAlert>}
      {shortenedUrl ? <Display>Short URL: {shortenedUrl}</Display> : ""}
    </Container>
  );
};

const Container = styled.div`
  height: 25vh;
  width: 60%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  background-color: #8ebcbc;
  margin: 10px;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 15px;
`;

const Display = styled.span`
  border: 1.5px dotted teal;
  padding: 5px;
  border-radius: 5px;
`;

const ErrorAlert = styled.div`
  color: red;
  text-align: center;
`;

export default ShortenURL;
