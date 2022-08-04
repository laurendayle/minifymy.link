import styled from "styled-components";
import { Link } from "react-router-dom";
import { useAuth } from "./hooks/AuthProvider.jsx";
import SignOut from "./auth/SignOut";

const Nav = () => {
  const { user } = useAuth();

  return (
    <>

      <Container>
        <nav>
          <StyledLink to="/">Home</StyledLink>
          {/* // FIXME change to correct "How it works" & "Help" path */}
          <StyledLink to="/">How It Works</StyledLink>
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
