import styled from "styled-components";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/AuthProvider";
import SignOut from "../auth/SignOut";
import logo from "../../assets/logo.png";
import Help from "../Issues";


const Nav = () => {
  const { user } = useAuth();
  return (
    <Container>

        <div style={{display: "flex", justifyContent: "center", width: "85%"}}>

          <StyledLink to="/">Home</StyledLink>
          <StyledLink to="/">How It Works</StyledLink>
          {user ? <StyledLink to="/dashboard">Dashboard</StyledLink> : null}

          <StyledLink to="/issues">Help</StyledLink>
        </div>
        <div style={{display: "flex" }}>

          {!user ? (
            <>
              <AuthLink to="/auth">Login</AuthLink>
              <AuthLink to="/register">Sign Up</AuthLink>
            </>
          ) : (
            <SignOut />
          )}


        </div>

    </Container>
  );
};

const Container = styled.nav`
  width: 100%;
  height: 7vh;
  background-color: #8ebcbc;
  display: flex;
  align-items: center;
  box-shadow: 0 2px 2px -2px rgba(0, 0, 0, 0.2);
  position: fixed;
  top: 0;
  z-index: 1;
`;

// const StyledLink = styled(Link)`
//   margin: 0 10px 0 10px;
//   text-decoration: none;
//   color: white;
// `;

// const AuthLink = styled(Link)`
//   position: relative;
//   float: right;
//   margin: 0 10px 0 10px;
//   text-decoration: none;
//   border: 1px dotted teal;
//   color: white;
//   padding: 7px;
//   height: 35px;
//   min-width: fit-content;
//   border-radius: 5px;
//   cursor: pointer;

const TempLink = styled.div`
  color: white;
  margin: 20px 10px 0 10px;

  &.top {
    margin-top: 50px;
  }

  &.right {
    position: relative;
    left: 20px;
    font-size: 90%;
  }

  &:hover {
    color:#5BC0BE;
  }
`;


const StyledLink = styled(Link)`
  color: white;
  margin: 20px 10px 0 10px;
  &:hover {
    color:#5BC0BE;
  }
`;

const AuthLink = styled(Link)`
  color: white;
  &:hover {
    color:#5BC0BE;
  }
  margin: 20px 10px 0 10px;

`;

export default Nav;
