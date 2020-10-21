import * as React from "react";
import {
  StyleProp,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from "react-native";

import { Theme } from "../theme";

import { Box, Text } from "./Themed";

interface ButtonProps {
  onPress?: () => void;
  containerStyle?: StyleProp<ViewStyle>;
  backgroundColor?: keyof Theme["colors"];
  textStyle?: StyleProp<TextStyle>;
  label: string;
}
const Button = ({
  onPress,
  containerStyle,
  backgroundColor = "primary",
  textStyle,
  label,
  ...rest
}: ButtonProps) => {
  return (
    <Box style={containerStyle}>
      <TouchableOpacity onPress={onPress} {...rest}>
        <Box
          backgroundColor={backgroundColor}
          padding="sm"
          height={48}
          width={315}
          justifyContent="center"
          alignItems="center"
          borderRadius="s"
        >
          <Text variant="button" style={textStyle}>
            {label}
          </Text>
        </Box>
      </TouchableOpacity>
    </Box>
  );
};

export default Button;
