import axios from "../../../api/axios";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { Input, Button, Icon } from "semantic-ui-react";
import { useAuth } from "../hooks/AuthProvider.jsx";

const Login = () => {
  const inputStyle = { margin: "7px" };
  const buttonStyle = {
    color: "#909090",
    border: "1px solid#909090",
    backgroundColor: "transparent",
    margin: "5px",
  };

  const navigate = useNavigate();
  const { login }= useAuth();

  const [userData, setUserData] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    if (error) console.log(error, "error");
  });

  const handleInputChange = (e) => {
    const newState = { ...userData };
    newState[e.target.name] = e.target.value;
    setUserData(newState);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/auth", userData, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      const accessToken = res?.data?.accessToken;
      const roles = res?.data?.roles;
      await login({ username: userData.username, accessToken, roles, refreshToken: res.data.refreshToken, id: res.data.id});
      navigate("/dashboard");
    } catch (err) {
      if (!err?.response) {
        setError("No server response");
      } else if (err.response?.status === 400) {
        setError("Username and password are required");
      } else if (err.response?.status === 401) {
        setError("Unauthorized");
      } else {
        setError("Login Failed");
      }
    }
  };

  return (
    <>
      <Container onChange={(e) => handleInputChange(e)}>
        <Modal>
          <StyledHeader>Log In</StyledHeader>
          <ModalInner>
            <Form>
              <Input
                defaultValue={userData.email || ""}
                style={inputStyle}
                icon="at"
                iconPosition="left"
                name="username"
                type="email"
                placeholder="Email"
                aria-label="Your email"
                required
              />
              <Input
                defaultValue={userData.password || ""}
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
                onClick={() => navigate("/register")}
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
    </>
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
