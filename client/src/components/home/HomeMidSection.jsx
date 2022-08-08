import styled from "styled-components";
import { Image } from "semantic-ui-react";

const HomeMidSection = () => {


  return (
    <Container>

      <Section>
        <Image src="https://fakeimg.pl/300x200" alt="" />
        <Label>
          Ipsum velit consectetur adipisicing do.
        </Label>
      </Section>

      <Section>
        <Image src="https://fakeimg.pl/300x200" alt="" />
        <Label>
          Nostrud dolore dolor id officia aute irure pariatur.
        </Label>
      </Section>

      <Section>
        <Image src="https://fakeimg.pl/300x200" alt="" />
        <Label>
          Ipsum velit consectetur adipisicing do.
        </Label>
      </Section>

    </Container>
  )
}

const Container = styled.div`
  height: 50vh;
  width: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 35px;
`;

const Label = styled.div`
  height: 20%;
  width: 80%;
  background-color:#8ebcbc;
  padding: 10px;
  border-radius: 5px;
  position: relative;
  top: -15px;
  text-align: center;
  overflow: hidden;
  max-width: 240px;
  max-height: 60px;
`;

export default HomeMidSection;