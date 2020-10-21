import * as React from "react";
import { BorderlessButton } from "react-native-gesture-handler";

import Icon, { IconProps } from "./Icon";

interface IconButtonProps extends IconProps {
  onPress: () => void;
}

const IconButton = ({ onPress, ...rest }: IconButtonProps) => {
  return (
    <BorderlessButton
      onPress={onPress}
      hitSlop={{ vertical: 22, horizontal: 22 }}
    >
      <Icon {...rest} />
    </BorderlessButton>
  );
};

export default IconButton;
