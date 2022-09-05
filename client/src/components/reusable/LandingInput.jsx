import styled from "styled-components";
import { Input } from "semantic-ui-react";

const LandingInput = () => {

  return (
    <Container>
      <Border>
        <StyledInput transparent placeholder="Paste long URL here..."/>
      </Border>
      <Button>Shorten</Button>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  height: auto;
  width: 65%;
  justify-content: space-evenly;
`;

const Border = styled.div`
  width: 70%;
  padding: 3px;
  border: 2px solid #0E9384;
  border-radius: 8px;
  display: inline;
`;

const StyledInput = styled.input`
  background-color: #125D56;
  width: 100%;
  border: 2px solid white;
  border-radius: 8px;
  padding: 10px;
  transform: translate(0.9rem, -0.8rem);
  font-weight: 500;
  
`;

/*
box-shadow: none|h-offset v-offset blur spread color |inset|initial|inherit;

*/

const Button = styled.button`
  display: inline;
  background-color: #0E9384;
  border: 1px solid #0E9384;
  color: white;
  border-radius: 8px;
  box-shadow: 0 1px 2px 0px #101828 initial;
  width: 14%;
  height: 6vh;
  font-size: 1.3em;
  padding-top: 1vh;
`;




export default LandingInput;