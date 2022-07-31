import { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { Navigate } from "react-router";
import { useRecoilState } from "recoil";
import sessionAtom from "../../recoil/atoms/sessionAtom";
import { Input, Button, Icon } from "semantic-ui-react";

const URL = import.meta.env.VITE_URL;
const config = import.meta.env.VITE_AXIOS_CONFIG;
const inputStyle = { margin: "7px" };
const buttonStyle = { color: "#909090", border: "1px solid#909090", backgroundColor: "transparent" };

const SignUp = () => {
  const [userData, setUserData] = useState({});
  const [error, setError] = useState(null);
  const [session, setSession] = useRecoilState(sessionAtom);
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
          if (res.data.authenticated) {
            console.log(res.data);
            setSession(res.data);
          }
        })
        .catch((err) => setError(err));
    }
  };

  return (
    <Container>
      <Modal>
        <StyledHeader>Create an Account</StyledHeader>
        <ModalInner>
          <Form onChange={(e) => handleInputChange(e)}>
            <Input
              style={inputStyle}
              icon="at"
              iconPosition="left"
              name="email"
              placeholder="Email"
              aria-label="Your Email"
              required
            />
            <Input
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
              placeholder="Verify Password"
              aria-label="Verify your password"
              type="password"
              required
            />
            {/* <Button onClick={(e) => handleSignUp(e)}>Create Account</Button> */}

            <Button style={buttonStyle} animated onClick={(e) => handleSignUp(e)}>
              <Button.Content visible>Create Account</Button.Content>
              <Button.Content hidden>
                <Icon name="arrow right" />
              </Button.Content>
            </Button>
          </Form>
        </ModalInner>
        {error && <div>{error}</div>}
        {session && <Navigate replace to="/user/profile" />}
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
  background: no-repeat url(https://images.unsplash.com/photo-1598266488814-e458d57cdc0d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE0fHx8ZW58MHx8fHw%3D&w=1000&q=80);
  background-size: cover;
`;

const Modal = styled.div`
  height: 70%;
  width: 60%;
  background-color: #ffffff88;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
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
  background-color: #ffffffc3;
  width: 60%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 12px;

`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 80%;
`;

export default SignUp;
