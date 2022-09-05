import { ThemeProvider } from "styled-components";

const theme = {
  colors: {

  },
  fonts: ["sans-serif", "Droid Sans"]
}

const Theme = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

export default Theme;