import { useState, useEffect, useContext } from "react";
import axios from "../../api/axios";
import styled from "styled-components";
import { useNavigate } from "react-router";
import { Input, Button, Icon, Form } from "semantic-ui-react";
import { useAuth } from "../hooks/AuthProvider";

const SignUp = () => {
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
    <Container>
      <Modal>
        <StyledHeader>Create an Account</StyledHeader>
        <ModalInner>
          <StyledForm onChange={(e) => handleInputChange(e)}>

            <Form.Input
              style={inputStyle}
              icon="at"
              iconPosition="left"
              name="username"
              type="email"
              placeholder="Email"
              aria-label="Your Email"
              required
            />
            <Form.Input
              style={inputStyle}
              icon="user outline"
              iconPosition="left"
              name="fullName"
              placeholder="Full Name"
              aria-label="Your First and Last Name"
              required
            />
            <Input
              style={inputStyle}
              icon="lock"
              iconPosition="left"
              name="password"
              minLength="5"
              placeholder="Password"
              aria-label="Your Password"
              type="password"
              required
            />
            <Input
              style={inputStyle}
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
              <Button.Content visible>Create Account</Button.Content>
              <Button.Content hidden>
                <Icon name="arrow right" />
              </Button.Content>
            </Button>
          </StyledForm>
        </ModalInner>
        {error && <ErrorAlert>{error}</ErrorAlert>}
      </Modal>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 10px;
  height: 100vh;
  width: 100%;

`;

const Modal = styled.div`
  height: 70%;
  width: 60%;
  background-color: #8ebcbc;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  min-width: 440px;
  min-height: 360px;
  max-width: 750px;
`;

const StyledHeader = styled.h1`
  position: relative;
  top: -15px;
  font-size: 3em;
  color: white;
  font-weight: 400;

`;

const ModalInner = styled.div`
  height: 60%;
  background-color: #e6ededb8;
  width: 60%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  min-width: 270px;
  min-height: 270px;
`;

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  width: 80%;
`;

const ErrorAlert = styled.div`
  color: red;
  text-align: center;
`;

const inputStyle = { margin: "7px" };

const buttonStyle = {
  color: "#909090",
  border: "1px solid#909090",
  backgroundColor: "transparent",
};

export default SignUp;
