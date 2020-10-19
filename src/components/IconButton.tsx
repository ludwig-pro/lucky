import * as React from "react";
import { BorderlessButton } from "react-native-gesture-handler";

import Icon, { IconProps } from "./Icon";

interface IconButtonProps extends IconProps {
  onPress: () => void;
}

const IconButton = ({ onPress, ...rest }: IconButtonProps) => {
  return (
    <BorderlessButton onPress={onPress}>
      <Icon {...rest} />
    </BorderlessButton>
  );
};

export default IconButton;
