import { AppProps } from "next/app";
import * as React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import customTheme from "../theme";
import "../styles/global.css";

const App = ({ Component, pageProps }: AppProps): React.ReactNode => {
  return (
    <ChakraProvider theme={customTheme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
};

export default App;
