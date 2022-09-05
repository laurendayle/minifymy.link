import axios from "../../api/axios";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import {  Icon, Form } from "semantic-ui-react";
import { useAuth } from "../hooks/AuthProvider.jsx";
const Login = () => {


  const navigate = useNavigate();
  const { login } = useAuth();

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
      const res = await axios.post("/auth", userData);
      const accessToken = res?.data?.accessToken;
      await login({ accessToken });
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
        <Card>

          <Headers>
            <Spans> Welcome back! </Spans>

            <Spans className="login">Login</Spans>
          </Headers>


          <OAuth>
            <span>or continue with</span>
            <Icons>
              <Icon name="facebook" size="big" />
              <Icon name="apple" size="big" />
              <Icon name="google" size="big" />
            </Icons>
          </OAuth>

          <StyledForm>
            <Form.Field>
              <label for="username">Enter your email address</label>
              <Form.Input
                style={inputStyle}
                defaultValue={userData.email || ""}
                icon="at"
                iconPosition="left"
                name="username"
                type="email"
                placeholder="Email Address"
                aria-label="Your email address"
                required
              />

            </Form.Field>

            <Form.Field>
              <label for="password">Enter your password</label>
              <Form.Input
                style={inputStyle}
                defaultValue={userData.password || ""}
                icon="lock"
                iconPosition="left"
                name="password"
                placeholder="Password"
                type="password"
                aria-label="Your password"
                required
              />

            </Form.Field>

            <Button
              onClick={(e) => handleLogin(e)}
            >Log In</Button>

          </StyledForm>

        </Card>
      </Container>
    </>
  );
};

const Container = styled.div`
  height: 100vh;
  width: 100%;
  margin-left: 5vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledForm = styled(Form)`
  width: 100%;
`;

const Card = styled.div`
  border: 1px solid #50A08D;
  width: 40vw;
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  border-radius: 20px;
  background-color: rgba(19, 78, 72, 0.1);
  padding: 3vw;
`;

const Spans = styled.span`
  margin-top: 4vh;
  font-size: 1.3em;

  &.login {
    font-size: 3em;
  }
`;

const Headers = styled.div`
  display: flex;
  flex-direction: column;
`;

const OAuth = styled.p`
  height: 10vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const Icons = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
`;

const Button = styled.button`
  color: white;
  background-color: #50A08D;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  width: 12vw;
  border-radius: 8px;
  font-family: inherit;
  padding: 1vh;
  border: 1px solid #50A08D;

`;
const inputStyle = {
  width: "90%",
  marginTop: "1vh",
 };

const buttonStyle = {
  color: "white",
  backgroundColor: "#50A08D",
  display: "inline-flex",
  justifySelf: "flex-end",
  boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
  width: "12vw",
  borderRadius: "12px",
};

export default Login;
