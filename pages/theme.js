import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const styles = {
  global: (props) => ({
    body: {
      bg: mode("#F9F7F7", "#202023")(props),
      color: mode("#222831", "#d2d2d3")(props),
      minHeight: "100vh",
    },
  }),
};

const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

export const theme = extendTheme({
  styles,
  config,
});
