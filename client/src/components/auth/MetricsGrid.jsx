import { Grid, Segment, Card } from "semantic-ui-react";
import styled from "styled-components";
import ReferrerImg from "../../assets/referrer.png";
import LanguageImg from "../../assets/language.png";
import LocationsImg from "../../assets/locations.png";

const MetricsGrid = () => {


  return (
    <StyledGrid>
      <Grid.Row>
        <Grid.Column width={6} stretched={true}>
          <Card>
            <img src={ReferrerImg} height="100%" width="100%" />
          </Card>
        </Grid.Column>

        <Grid.Column width={3}>
          <Card style={{padding: "15px", height: "30vh" }} >
            <img src={LanguageImg} height="100%" width="100%" />
          </Card>
        </Grid.Column>
        <Grid.Column width={3}>
          <Card style={{padding: "15px", height: "30vh" }}>
            <img src={LocationsImg} height="100%" width="100%" />
          </Card>
        </Grid.Column>
        <Grid.Column width={3}>
          <Card style={{padding: "15px", height: "30vh" }}>
            <span>Windows</span>
            <span>iOS</span>
            <span>Chrome OS</span>
            <span>OS X</span>
            <span>Android</span>
            <span>Blackberry OS</span>
          </Card>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row stretched columns={2}>
        <Grid.Column>
          <Segment>Devices</Segment>
        </Grid.Column>
        <Grid.Column>
          <Segment>Customize Layout</Segment>
        </Grid.Column>
      </Grid.Row>
    </StyledGrid>
  )
}

const StyledGrid = styled(Grid)`
  width: 95%;
`;

export default MetricsGrid;