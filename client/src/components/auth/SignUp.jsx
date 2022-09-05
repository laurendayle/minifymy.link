import { useState, useEffect, useContext } from "react";
import axios from "../../api/axios";
import styled from "styled-components";
import { useNavigate } from "react-router";
import { Button, Icon, Form, Placeholder } from "semantic-ui-react";
import { useAuth } from "../hooks/AuthProvider";

const SignUp = (props) => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [userData, setUserData] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log(error);
  });

  const handleInputChange = (e) => {
    const newState = { ...userData };
    newState[e.target.name] = e.target.value;
    setUserData(newState);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!userData.username || !userData.password || !userData.fullName) {
      setError({ message: "Please fill out all required fields." });
    }
    try {
      const res = await axios.post("/register", userData);
      navigate("/auth");
    } catch (err) {
      console.log(err, 'err');
      if (err.message) setError(err.message);
      else setError("Something went wrong. Please try again.")
    }
  };

  return (
    <Container >
    <Modal>

        <StyledForm onChange={(e) => handleInputChange(e)}>
        <StyledHeader>Sign Up</StyledHeader>
          <Form.Input
            icon="at"
            iconPosition="left"
            name="username"
            type="email"
            placeholder="Email"
            aria-label="Your Email"
            required
          />
          <Form.Input
            icon="user outline"
            iconPosition="left"
            name="fullName"
            placeholder="Full Name"
            aria-label="Your First and Last Name"
            required
            type="text"
          />
          <Form.Input
            icon="lock"
            iconPosition="left"
            name="password"
            minLength="5"
            placeholder="Password"
            aria-label="Your Password"
            type="password"
            required
          />
          <Form.Input
            icon="lock"
            iconPosition="left"
            name="verifyPassword"
            minLength="5"
            placeholder="Verify Password"
            aria-label="Verify your password"
            type="password"
            required
          />

          <Button
            style={buttonStyle}
            animated
            onClick={(e) => handleSignUp(e)}
          >
            <Button.Content visible>Sign Up</Button.Content>
            <Button.Content hidden>
              <Icon name="arrow right" />
            </Button.Content>
          </Button>

          <p>
            <span>Already have an account?</span>
            <a href="/auth"> Log in</a>
          </p>

        </StyledForm>

        <div style={{width: "50%", borderLeft: "1.8px dashed black", padding: "25px", display: "flex", flexDirection: "column", justifyContent: "space-evenly", alignItems: "center"}}>
          <h3>Here's how it works!</h3>
        <div style={{border: "1px solid black", borderRadius: "15px", height: "80%", width: "100%"}}>
          <img style={{borderRadius: "15px", height: "100%", width: "100%" }} src="https://isminc-public-assets.s3.amazonaws.com/2021-06/default-video-image_0.png"/>
        </div>

        </div>

      {error && <ErrorAlert>{error}</ErrorAlert>}
    </Modal>
  </Container>
  );
};

const Container = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(../../assets/login-bg.png);
`;

const Modal = styled.div`
  height: 55%;
  width: 80%;
  border-radius: 15px;
  display: flex;
  border: 1px solid black;
  min-width: fit-content;
  min-height: 415px;
`;

const StyledHeader = styled.h1`
  // position: relative;
  // top: -15px;
  // font-size: 3em;
  // color: white;
  // font-weight: 400;

`;

const ModalInner = styled.div`
  // height: 60%;
  // background-color: #e6ededb8;
  // width: 60%;
  // display: flex;
  // justify-content: center;
  // align-items: center;
  // border-radius: 12px;
  // min-width: 270px;
  // min-height: 270px;
`;

const StyledForm = styled(Form)`
  // display: flex;
  // flex-direction: column;
  // width: 80%;
  padding: 25px;
  width: 50%;
  text-align: center;
`;

const ErrorAlert = styled.div`
  // color: red;
  // text-align: center;
`;


const inputStyle = { margin: "0px" };

const buttonStyle = {
  color: "white",
  backgroundColor: "#5BC0BE",
};

export default SignUp;
