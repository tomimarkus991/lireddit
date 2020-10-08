import { IconButton, useColorMode } from "@chakra-ui/core";
import React from "react";

interface ColorModeProps {}

const ColorMode: React.FC<ColorModeProps> = ({}) => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <IconButton
      icon={colorMode === "light" ? "moon" : "sun"}
      onClick={toggleColorMode}
      aria-label="Switch color-mode"
      variant="outline"
    />
  );
};
export default ColorMode;
