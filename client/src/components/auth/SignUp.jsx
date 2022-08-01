import { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router";
import { useRecoilState } from "recoil";
import sessionAtom from "../../recoil/atoms/sessionAtom";
import { Input, Button, Icon } from "semantic-ui-react";

const URL = import.meta.env.VITE_URL;
const config = import.meta.env.VITE_AXIOS_CONFIG;

const inputStyle = { margin: "7px" };
const buttonStyle = {
  color: "#909090",
  border: "1px solid#909090",
  backgroundColor: "transparent",
};

const SignUp = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({});
  const [error, setError] = useState(null);
  const [session, setSession] = useRecoilState(sessionAtom);
  const [shouldRedirect, setRedirect] = useState(false);

  useEffect(() => {
    console.log(session);
    console.log(error);
  });

  const handleInputChange = (e) => {
    const newState = { ...userData };
    newState[e.target.name] = e.target.value;
    setUserData(newState);
  };

  const handleSignUp = (e) => {
    if (userData.password !== userData.verifyPassword) {
      setError({ message: "Please ensure the passwords match" });
    } else {
      axios({
        method: "post",
        data: userData,
        headers: { config },
        url: `${URL}/user/signup`,
      })
        .then((res) => {
          if (res.data.authenticated) {
            window.localStorage.setItem("minifymylink", res.data.session.token);
            setSession(res.data.session.token);
            navigate("/user/profile");
          }
        })
        .catch((err) => {
          if (err.message) {
            setError(err.message);
          } else {
            setError("Unknown error");
          }
        });
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
          </Form>
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

const Form = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
`;

const ErrorAlert = styled.div`
  color: red;
  text-align: center;
`;
export default SignUp;
