import styled from "styled-components";
import { Statistic, Card } from "semantic-ui-react";
import { sumClicks, getTotalClicks } from "../../utils/clickUtils";
import { useDataContext } from "../hooks/DataProvider.jsx";

const Metrics = (props) => {
  const { userLinks } = useDataContext();

  return (

    <Container>
      <Statistic color="teal" size="large">
        <Statistic.Value>{sumClicks(props?.oneMonthClicks)}</Statistic.Value>
        <Statistic.Label>7 Day Clicks</Statistic.Label>
      </Statistic>

      <Statistic color="teal" size="large">
        <Statistic.Value>{sumClicks(props?.oneMonthClicks)}</Statistic.Value>
        <Statistic.Label>30 Day Clicks</Statistic.Label>
      </Statistic>

      // TODO total clicks causes crash on initial load
      {/* <Statistic color="teal" size="large">
        <Statistic.Value>{getTotalClicks(userLinks?.links)}</Statistic.Value>
        <Statistic.Label>Total Clicks</Statistic.Label>
      </Statistic> */}

    </Container>
  );
};
const Container = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

export default Metrics;
