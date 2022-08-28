import styled from "styled-components";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/AuthProvider";
import SignOut from "../auth/SignOut";
import ShortenURL from "../reusable/ShortenURL";
import logo from "../../assets/logo.png";
import Help from "../Issues";
import { Icon } from "semantic-ui-react";

const Nav = () => {
  const { user } = useAuth();

  const [modalDisplay, setModalDisplay] = useState(false);


  return (
    <Container>


      <StyledLink to="/"><Icon name="home" />Home</StyledLink>



      {user ? <StyledLink to="/dashboard"><Icon name="dashboard" />Dashboard</StyledLink> : null}

      <TempLink
        onClick={(e) => setModalDisplay(!modalDisplay)}
      >
        <Icon name="plus" />
        Add Short Link
      </TempLink>

      <TempLink>
        <Icon name="history" />
        Link History
      </TempLink>

      <TempLink className="top">
        <Icon name="setting" />
        Settings
      </TempLink>



      <TempLink>
        <Icon name="linkify" />
        Links
      </TempLink>

      <TempLink className="right">
        Archived Links
      </TempLink>

      <TempLink className="right">
        Expired Links
      </TempLink>

      <TempLink className="right">
        Branded Domain
      </TempLink>

      {modalDisplay &&

        <div style={{ position: "absolute", left: "25vw" }}>
          <ShortenURL />
        </div>

      }

      <StyledLink className="bottom" to="/issues">Help</StyledLink>

      {!user ? (
        <>
          <AuthLink className="bottom" to="/register">Sign Up</AuthLink>
          <AuthLink className="bottom" to="/auth">Login</AuthLink>

        </>
      ) : (
        <SignOut className="bottom"/>
      )}



    </Container>
  );
};

const Container = styled.div`
  height: 100%;
  background-color: darkgray;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 10px;
`;

const TempLink = styled.div`
  color: #0E6EB8;
  margin: 20px 10px 0 10px;

  &.top {
    margin-top: 50px;
  }

  &.right {
    position: relative;
    left: 20px;
    font-size: 90%;
  }

`;


const StyledLink = styled(Link)`

  margin: 20px 10px 0 10px;
`;

const AuthLink = styled(Link)`
  margin: 20px 10px 0 10px;
`;

export default Nav;
