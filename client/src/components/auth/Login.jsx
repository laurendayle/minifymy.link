import axios from "../../api/axios";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { Input, Button, Icon, Form } from "semantic-ui-react";
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
    // <Container onChange={(e) => handleInputChange(e)}>
    //   <StyledForm>
    //     <Input
    //       defaultValue={userData.email || ""}
    //       style={inputStyle}
    //       icon="at"
    //       iconPosition="left"
    //       name="username"
    //       type="email"
    //       placeholder="Email"
    //       aria-label="Your email"
    //       required
    //     />
    //     <Input
    //       defaultValue={userData.password || ""}
    //       style={inputStyle}
    //       icon="lock"
    //       iconPosition="left"
    //       name="password"
    //       placeholder="Password"
    //       type="password"
    //       aria-label="Your password"
    //       required
    //     />

    //     <Button
    //       style={buttonStyle}
    //       animated
    //       onClick={(e) => handleLogin(e)}
    //     >
    //       <Button.Content visible>Log In</Button.Content>
    //       <Button.Content hidden>
    //         <Icon name="arrow right" />
    //       </Button.Content>
    //     </Button>

    //     <Button
    //       style={buttonStyle}
    //       animated
    //       onClick={() => navigate("/register")}
    //     >
    //       <Button.Content visible>Create An Account</Button.Content>
    //       <Button.Content hidden>
    //         <Icon name="arrow right" />
    //       </Button.Content>
    //     </Button>
    //     {error && <ErrorAlert>{error}</ErrorAlert>}
    //   </StyledForm>
    //   <div style={{ borderLeft: "2px dotted gray", color: "white", width: "100%" }}>
    //     <span>Here's how it works!</span>
    //   </div>
    // </Container>

    <Container onChange={(e) => handleInputChange(e)}>
      <Card>
        <h1>Login</h1>
        <StyledForm>
          <Form.Field>
            <Input
              defaultValue={userData.email || ""}
              style={inputStyle}
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
          </Form.Field>

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

        <p>
          Don't have an account yet?
          <a href="/register"> Create one here</a>
        </p>
        </StyledForm>

      </Card>
    </Container>
  );
};

const Container = styled.div`
  height: auto;
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-content: center;
  position: relative;
  top: 25vh;
`;

const StyledForm = styled(Form)`
  width: 50%;
  text-align: center;
`;

const Card = styled.div`
  background-color: lightgray;
  width: 70%;
  height: 50vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
`;

const ErrorAlert = styled.div`
  color: red;
  text-align: center;
`;

export default Login;
