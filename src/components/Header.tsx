import * as React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StyleSheet, TouchableOpacity } from "react-native";

import { Box, Text } from "./Themed";
import IconButton from "./IconButton";

interface HeaderProps {
  left: {
    icon: string;
    onPress: () => void;
  };
  title: string;
  right: {
    label?: string;
    disabled?: boolean;
    onPress: () => void;
  };
  dark?: boolean;
}

const Header = ({ left, right, title, dark = false }: HeaderProps) => {
  const insets = useSafeAreaInsets();
  const color = dark ? "white" : "dark";
  const backgroundColor = dark ? "iosBackground" : "white";
  // eslint-disable-next-line no-nested-ternary
  const labelColor = right.disabled ? "placeholder" : dark ? "white" : "dark";
  return (
    <Box
      paddingHorizontal="ml"
      justifyContent="space-between"
      flexDirection="row"
      alignItems="center"
      style={{ marginTop: insets.top + 8 }}
      borderBottomWidth={StyleSheet.hairlineWidth}
      borderBottomColor="secondary"
    >
      <Box alignItems="flex-start" justifyContent="center" width={120}>
        <IconButton
          size={38}
          iconRatio={1}
          name={left.icon}
          color={color}
          backgroundColor={backgroundColor}
          onPress={() => left.onPress()}
        />
      </Box>
      <Text color={dark ? "white" : "dark"} variant="header">
        {title}
      </Text>
      <TouchableOpacity
        onPress={right.onPress}
        disabled={right.disabled}
        style={styles.button}
      >
        <Text color={labelColor} variant="header">
          {right.label || "label"}
        </Text>
      </TouchableOpacity>
    </Box>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 38,
    width: 120,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "flex-end",
  },
});

export default Header;
