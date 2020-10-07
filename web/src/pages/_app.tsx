import React from "react";
import { ThemeProvider, CSSReset, ColorModeProvider } from "@chakra-ui/core";
import { AppProps } from "next/app";
import customTheme from "../theme";
import { createClient, Provider } from "urql";
// import "../styles/global.css";

const client = createClient({
  url: "http://localhost:5000/graphql",
  fetchOptions: { credentials: "include" },
});

function App({ Component, pageProps }: AppProps): React.ReactNode {
  return (
    <Provider value={client}>
      <ThemeProvider theme={customTheme}>
        <ColorModeProvider>
          <CSSReset />
          <Component {...pageProps} />
        </ColorModeProvider>
      </ThemeProvider>
    </Provider>
  );
}
export default App;
