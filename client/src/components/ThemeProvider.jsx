import { ThemeProvider } from "styled-components";

const theme = {
  colors: {
    navy: "#0B132B",
    lightNavy: "#1C2541",
    gray: "#3A506B",
    darkBlue: "#5BC0BE",
    teal: "#6FFFE9",
  },
  fontSizes: {
    small: "1em",
    medium: "2em",
    large: "3em",
  }
}

const Theme = ({ children }) => {

  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  )

}

export default Theme;