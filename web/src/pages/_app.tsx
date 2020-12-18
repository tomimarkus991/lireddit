import { AppProps } from "next/app";
import * as React from "react";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

const config = {
  useSystemColorMode: false,
  initialColorMode: "dark",
};

const customTheme = extendTheme({ config });

const App = ({ Component, pageProps }: AppProps): React.ReactNode => {
  return (
    <ChakraProvider theme={customTheme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
};

export default App;
