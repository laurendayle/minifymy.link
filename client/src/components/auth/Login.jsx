import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useRecoilState } from "recoil";
import sessionAtom from "../../recoil/atoms/sessionAtom";
import styled from "styled-components";
import { Input, Button, Icon } from "semantic-ui-react";

const url = import.meta.env.VITE_URL;
const config = import.meta.env.VITE_AXIOS_CONFIG;
const inputStyle = { margin: "7px" };
const buttonStyle = {
  color: "#909090",
  border: "1px solid#909090",
  backgroundColor: "transparent",
  margin: "5px",
};

const Login = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({});
  const [error, setError] = useState(null);
  const [session, setSession] = useRecoilState(sessionAtom);

  useEffect(() => {
    if (error) console.log(error, "error");
    if (session) console.log(session, "session");
  });

  const handleInputChange = (e) => {
    const newState = { ...userData };
    newState[e.target.name] = e.target.value;
    setUserData(newState);
  };

  const handleLogin = (e) => {
    const username = userData.email;
    delete userData["email"];
    userData["username"] = username;
    axios
      .get(`${url}/user/login`, { auth: userData, headers: { config } })
      .then((res) => {
        if (res.data.authenticated) {
          window.localStorage.setItem("minifymylink", JSON.stringify(res.data.session.token));
          setSession(res.data.session.token);
          navigate("/user/profile");
        } else {
          setError({
            message:
              "Something went wrong. Please confirm your email and password and try again.",
          });
        }
      })
      .catch((err) => {
        if (err.message) {
          setError(err.message);
        }
      });
  };

  return (
    <Container onChange={(e) => handleInputChange(e)}>
      <Modal>
        <StyledHeader>Log In</StyledHeader>
        <ModalInner>
          <Form>
            <Input
              value={userData.email || ""}
              style={inputStyle}
              icon="at"
              iconPosition="left"
              name="email"
              type="email"
              placeholder="Email"
              aria-label="Your email"
              required
            />
            <Input
              value={userData.password || ""}
              style={inputStyle}
              icon="lock"
              iconPosition="left"
              name="password"
              placeholder="Password"
              type="password"
              aria-label="Your password"
              required
            />

            <Button
              style={buttonStyle}
              animated
              onClick={(e) => handleLogin(e)}
            >
              <Button.Content visible>Log In</Button.Content>
              <Button.Content hidden>
                <Icon name="arrow right" />
              </Button.Content>
            </Button>

            <Button
              style={buttonStyle}
              animated
              onClick={() => navigate("/user/signup")}
            >
              <Button.Content visible>Create An Account</Button.Content>
              <Button.Content hidden>
                <Icon name="arrow right" />
              </Button.Content>
            </Button>
            {error && <ErrorAlert>{error}</ErrorAlert>}
          </Form>
        </ModalInner>
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

export default Login;
