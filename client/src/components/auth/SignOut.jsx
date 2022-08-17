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
      const res = await axios.post( "/logout", {});
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
  padding: 7px;
  border-radius: 5px;
  cursor: pointer;
  background-color: transparent;
  color: white;
  height: 35px;
  min-width: fit-content;
  border: 1px dotted teal;
  z-index: 1;
  &:hover {
    color: teal;
  }
`;

export default SignOut;
