import styled from "styled-components";
import { Image } from "semantic-ui-react";

const src =
  "https://www.cera.org.au/wp-content/uploads/2021/06/placeholder-images-image_large.png";
const imgStyle = {
  minWidth: "100px",
  minHeight: "125px",
}
const MetricsItem = () => {
  return (
    <Container>
      {["Total Clicks", "30 Day Clicks", "Other"].map((metric) => (
        <div key={metric}>
          <ImageContainer>
            <Image src={src} style={imgStyle}/>
          </ImageContainer>
          <Label>{metric}</Label>
        </div>
      ))}
    </Container>
  );
};
const Container = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

const ImageContainer = styled.div`
  height: 10vh;
  width: 10vw;
  display: flex;
  flex-direction: column;
`;

const Label = styled.div`
  background-color: #8ebcbc;
  color: white;
  height: 40px;
  width: 70%;
  border-radius: 5px;
  top: 40px;
  left: 20px;
  position: relative;
  text-align: center;
  line-height: 40px;
  z-index: 99;
  min-width: fit-content;
  min-height: 40px;
`;

export default MetricsItem;
