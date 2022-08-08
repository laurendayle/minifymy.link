import styled from "styled-components";
import { Image, Statistic } from "semantic-ui-react";

const src =
  "https://www.cera.org.au/wp-content/uploads/2021/06/placeholder-images-image_large.png";
const imgStyle = {
  minWidth: "100px",
  minHeight: "125px",
};
const Metrics = () => {
  return (
    <Container>
      {[
        { label: "7 Day Clicks", value: 232, color: "teal", divider: false },
        { label: "30 Day Clicks", value: 542, color: "teal", divider: true },
        { label: "Total Clicks", value: 2231, color: "teal", divider: true },
      ].map((metric) => (

          <Statistic color={metric.color} size="large" key={metric.label}>
            <Statistic.Value>{metric.value}</Statistic.Value>
            <Statistic.Label>{metric.label}</Statistic.Label>
          </Statistic>

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
  z-index: 1.2;
  min-width: fit-content;
  min-height: 40px;
`;

export default Metrics;
