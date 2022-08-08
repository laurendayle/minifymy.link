import styled from "styled-components";
import { Image, Icon } from "semantic-ui-react";

const HomeFooter = () => {
  return (
  <>
    <Container>
      <Section>
        <Image src="https://fakeimg.pl/400x250" alt="" />
        <Paragraph>
        Reprehenderit magna est id officia eu minim voluptate do minim reprehenderit sunt excepteur dolor in. Pariatur laboris proident sint cupidatat dolor sint velit tempor proident aliqua irure. Magna commodo adipisicing laborum est cillum deserunt irure nisi ad proident deserunt officia Lorem Lorem. Ex fugiat et duis do magna laborum nisi sit exercitation nulla magna amet. Lorem ex reprehenderit laboris qui quis nostrud nulla amet nisi. Eu ipsum minim esse do occaecat sit.
        </Paragraph>
      </Section>

      <Section>
      <ParagraphLeft>
        Reprehenderit magna est id officia eu minim voluptate do minim reprehenderit sunt excepteur dolor in. Pariatur laboris proident sint cupidatat dolor sint velit tempor proident aliqua irure. Magna commodo adipisicing laborum est cillum deserunt irure nisi ad proident deserunt officia Lorem Lorem. Ex fugiat et duis do magna laborum nisi sit exercitation nulla magna amet. Lorem ex reprehenderit laboris qui quis nostrud nulla amet nisi. Eu ipsum minim esse do occaecat sit.
        </ParagraphLeft>
        <Image src="https://fakeimg.pl/400x250" alt="" />
      </Section>

      <Section>
        <Image src="https://fakeimg.pl/400x250" alt="" />
        <Paragraph>
        Reprehenderit magna est id officia eu minim voluptate do minim reprehenderit sunt excepteur dolor in. Pariatur laboris proident sint cupidatat dolor sint velit tempor proident aliqua irure. Magna commodo adipisicing laborum est cillum deserunt irure nisi ad proident deserunt officia Lorem Lorem. Ex fugiat et duis do magna laborum nisi sit exercitation nulla magna amet. Lorem ex reprehenderit laboris qui quis nostrud nulla amet nisi. Eu ipsum minim esse do occaecat sit.
        </Paragraph>
      </Section>


    </Container>
          <Footer>
          <span><Icon name="copyright outline" /> 2022 Lauren Anderson | MIT License <a href="/"><br />Terms of Use & Privacy Policy</a></span>
        </Footer>
   </>
  );
};

const Container = styled.div`
  padding-top: 50px;
  padding-bottom: 50px;
  width: 100%;
  height: auto;
  background-color: #8ebcbc;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Section = styled.div`
  height: 30%;
  width: 80%;
  margin: 10px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding: 10px;
  margin: 5px;
`;

const Paragraph = styled.p`
  padding-left: 65px;
  text-align: center;
`;

const ParagraphLeft = styled.p`
  padding-right: 65px;
  text-align: center;
`;

const Footer = styled.div`
  height: 8vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: gray;
  background-color: #8ebcbc;
`;

export default HomeFooter;
