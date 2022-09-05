import styled from "styled-components";
import { Button, Image } from "semantic-ui-react";
import Lines from "../../assets/line-pattern.png";
import DecorationImg from "../reusable/DecorationImg";
import LandingInput from "../reusable/LandingInput";
import LandingImg from "../../assets/landing-center.png";
import ActiveUsersImg from "../../assets/landing-activeUsers.png";

const LandingDisplay = () => {

  return (
    <Container>

    <InnerDisplay>
      <DecorationImg src={Lines} top="8vh" right="2vw"/>
      <Header>
        <HeaderText className="first">Grow your audience.</HeaderText>
        <HeaderText className="second">Simple.</HeaderText>
        <DescText>A powerful, self-serve product with advanced analytics to help you convert, engage, anad retain your users. Understand your data.</DescText>
      </Header>
      <DecorationImg src={Lines} top="65vh" left="8vw" transform="scale(-1)"/>
      <LandingInput />
    </InnerDisplay>

    <ImageContainer>
      <Image src={LandingImg} height="auto" width="100%" alt="" />
    </ImageContainer>

    <ActiveUsersContainer>
      <Image src={ActiveUsersImg} height="auto" width="100%" alt="" />
    </ActiveUsersContainer>
    </Container>
  )
}

const Container = styled.div`
  height: 100%;
  width: 100%;
  margin-left: 5vw;
  display: flex;
  justify-content: center;
`;

const InnerDisplay = styled.div`
  background-color: #125D56;
  height: 82vh;
  width: 90vw;
  min-width: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 24px;
  text-align: center;
  margin-top: 12vh;
  margin-right: 5vw;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  height: 60%;
  width: 74%;
  justify-content: space-evenly;
  min-width: 891px;
`;

const HeaderText = styled.span`
  font-size: 6.3em;
  letter-spacing: 4px;
  font-weight: 800;
  color: #ffffffe3;
  flex-shrink: 3;

  &.first {
      margin-top: 6vh;
    }

    &.second {
      margin-top: 2vh;
      color: #D3F8DF;
    }

`;

const DescText = styled.span`
  font-size: 1.5em;
  color: #D3F8DF;
  font-weight: 600;
`;

const ImageContainer = styled.div`
  position: absolute;
  top: 73vh;
`;

const ActiveUsersContainer = styled.div`
  position: absolute;
  top: 113vh;
  right: 5vw;

`;


export default LandingDisplay;