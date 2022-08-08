import styled from "styled-components";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/AuthProvider";
import SignOut from "../auth/SignOut";
import logo from "../../assets/logo.png";


const Nav = () => {
  const { user } = useAuth();
  return (
    <>

      <Container>
      <div style={{height: "65px", width: "100px", position: "relative", left: "-430px", top: "-10px"}}>
        <img src={logo} alt="" width="100%"/>
      </div>

        <nav>

          <StyledLink to="/">Home</StyledLink>
          {/* // FIXME change to correct "How it works" & "Help" path */}
          <StyledLink to="/">How It Works</StyledLink>
          <StyledLink to="/">Help</StyledLink>
        </nav>
        </Container>
        <AuthLinks>
        {user ? (
          <SignOut />
        ) : (
          <>
            <StyledLink to="/auth">Login</StyledLink>
            <StyledLink to="/register">Sign Up</StyledLink>
          </>
        )}
        </AuthLinks>

    </>
  );
};

const Container = styled.div`
  width: 100%;
  height: 7vh;
  background-color: #8ebcbc;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 2px 2px -2px rgba(0,0,0,.2);
  position: fixed;
  top: 0;
  z-index: 1;
`;

const AuthLinks = styled.div`
  top: -55px;
  position: relative;
  margin: 15px;
`;

const StyledLink = styled(Link)`
  margin: 15px;
  text-decoration: none;
  color: white;
`;

export default Nav;
