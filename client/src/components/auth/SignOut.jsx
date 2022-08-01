
import axios from "axios";
import sessionAtom from "../../recoil/atoms/sessionAtom";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router";
import styled from "styled-components";

const url = import.meta.env.VITE_URL;
const config = import.meta.env.VITE_AXIOS_CONFIG;

const SignOut = (props) => {

  const navigate = useNavigate();

  const [session, setSession] = useRecoilState(sessionAtom);
  const [error, setError] = useState(null);

  const handleClick = (e) => {
    axios.post(`${url}/user/logout`, {token: props.session}, { config })
      .then(res => {
        if (res) setSession(null);
        window.localStorage.removeItem("minifymy.link");
        navigate("/");
      })
      .catch(err => {
        if (err.message) {
          setError(err.message);
        } else {
          setError({ message: "Something went wrong" });
        }
      })
  }
  return (
    <div>
      <StyledButton onClick={(e) => handleClick(e)}>Sign Out</StyledButton>
    </div>

  )
};

const StyledButton = styled.button`
  float: right;
  border: none;
  color:#909090;
  cursor: pointer;
  background-color: transparent;
  &:hover {
    color: lightblue;
  }
`;

export default SignOut;
