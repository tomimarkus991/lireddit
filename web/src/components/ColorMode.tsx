import { FaSun, FaMoon } from "react-icons/fa";
import { IconButton, useColorMode } from "@chakra-ui/react";
import React from "react";

interface ColorModeProps {
  buttonSize: string;
}

const ColorMode: React.FC<ColorModeProps> = ({ buttonSize }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <IconButton
      icon={colorMode === "light" ? <FaMoon /> : <FaSun />}
      onClick={toggleColorMode}
      aria-label="Switch color-mode"
      variant="outline"
      size={buttonSize}
    />
  );
};
export default ColorMode;
