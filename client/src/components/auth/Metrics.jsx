import styled from "styled-components";
import { Statistic, Card } from "semantic-ui-react";
import sumClicks from "../../utils/sumClicks";

const Metrics = (props) => {
  console.log(props, "props");

  return (
    <Container>

      <Statistic color="teal" size="large">
        <Statistic.Value>{sumClicks(props.oneMonthClicks)}</Statistic.Value>
        <Statistic.Label>7 Day Clicks</Statistic.Label>
      </Statistic>

      <Statistic color="teal" size="large">
        <Statistic.Value>{sumClicks(props?.oneMonthClicks)}</Statistic.Value>
        <Statistic.Label>30 Day Clicks</Statistic.Label>
      </Statistic>

      <Statistic color="teal" size="large">
        <Statistic.Value>{props.totalClicks}</Statistic.Value>
        <Statistic.Label>Total Clicks</Statistic.Label>
      </Statistic>

    </Container>
  );
};
const Container = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

export default Metrics;
