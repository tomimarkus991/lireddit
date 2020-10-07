import React from "react";
import { ThemeProvider, CSSReset, ColorModeProvider } from "@chakra-ui/core";
import { AppProps } from "next/app";
import customTheme from "../theme";
// import "../styles/global.css";

function App({ Component, pageProps }: AppProps): React.ReactNode {
  return (
    <ThemeProvider theme={customTheme}>
      <ColorModeProvider>
        <CSSReset />
        <Component {...pageProps} />
      </ColorModeProvider>
    </ThemeProvider>
  );
}
export default App;
