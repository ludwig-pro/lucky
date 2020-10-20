import * as React from "react";
import { Ionicons } from "@expo/vector-icons";

import { Theme, useReTheme } from "../theme";

import { Box } from "./Themed";

export interface IconProps {
  name: string;
  size: number;
  iconRatio?: number;
  color: keyof Theme["colors"];
  backgroundColor: keyof Theme["colors"]; // string
}

const Icon = ({
  name,
  size,
  color,
  backgroundColor,
  iconRatio = 1,
}: IconProps) => {
  const iconSize = size * iconRatio;
  const theme = useReTheme();

  return (
    <Box
      backgroundColor={backgroundColor}
      width={size}
      height={size}
      justifyContent="center"
      alignItems="center"
      style={{ borderRadius: size / 2 }}
    >
      <Box flex={1} justifyContent="center" alignItems="center">
        <Ionicons name={name} size={iconSize} color={theme.colors[color]} />
      </Box>
    </Box>
  );
};

Icon.defaultProps = {
  iconRatio: 1,
};

export default Icon;
