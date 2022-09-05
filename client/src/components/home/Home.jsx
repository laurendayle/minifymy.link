
import styled from "styled-components";
import ShortenURL from "../reusable/ShortenURL";
import HomeFooter from "../home/HomeFooter";
import HomeMidSection from "../home/HomeMidSection";
import { InputProvider } from "../hooks/InputProvider";
import LandingDisplay from "./LandingDisplay";
// import Theme from "../ThemeProvider";

const Home = () => {

  return (

    // <Theme>
    //   <Container className="App">
    //     <InputProvider>
    //       <ShortenURL />
    //     </InputProvider>


    //     <HomeMidSection />
    //     <HomeFooter />
    //   </Container>
    // </Theme>

    <Container className="app">

      <LandingDisplay />

    </Container>
  );
};

const Container = styled.div`
  height: 100%;
  width: 100%;
`;

export default Home;
