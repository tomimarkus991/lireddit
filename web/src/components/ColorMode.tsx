import { IconButton, useColorMode } from "@chakra-ui/react";
import React from "react";
import { FaMoon, FaSun } from "react-icons/fa";

interface ColorModeProps {
  buttonSize: string;
  mLeft?: string;
}

const ColorMode: React.FC<ColorModeProps> = ({ buttonSize, mLeft }) => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <IconButton
      icon={colorMode === "light" ? <FaMoon /> : <FaSun />}
      onClick={toggleColorMode}
      aria-label="Switch color-mode"
      variant="outline"
      size={buttonSize}
      ml={mLeft}
    />
  );
};
export default ColorMode;
