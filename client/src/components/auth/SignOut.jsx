import axios from "../../api/axios";
import { useState } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { useAuth } from "../hooks/AuthProvider.jsx";

const SignOut = (props) => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [error, setError] = useState(null);

  const handleClick = async (e) => {
    try {
      const res = await axios.post(
        "/logout", { ...user }, {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      logout();
      navigate("/");
    } catch (err) {
      if (!err?.message) {
        setError("No server response");
      } else if (err?.message) {
        setError(err.message);
      } else {
        setError(null);
      }
    }

  };
  return <StyledButton onClick={(e) => handleClick(e)}>Sign Out</StyledButton>;
};

const StyledButton = styled.button`
  position: absolute;
  top: 50px;
  left: 1075px;
  border: 1.5px dotted teal;
  padding: 7px;
  border-radius: 5px;
  cursor: pointer;
  background-color: transparent;
  color: white;
  height: 35px;
  z-index: 99;
  &:hover {
    color: lightblue;
  }
`;

export default SignOut;
