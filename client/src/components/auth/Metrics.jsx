import styled from "styled-components";
import MetricsItem from "./MetricsItem";

const MetricsDisplay = () => {


  return (
    <Container>
      <MetricsItem />
    </Container>
  )
}

const Container = styled.div`
  width: 60%;
  min-width: 60%;
  min-height: 20vh;
  height: 20vh;
  margin-bottom: 10px;
`;

export default MetricsDisplay;