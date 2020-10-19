import * as React from "react";
import {
  StyleSheet,
  TextInput,
  TextInputProps as RNTextInputProps,
} from "react-native";

import { useReTheme } from "../theme";

import Icon from "./Icon";
import { Box } from "./Themed";

interface SearchBarProps extends RNTextInputProps {
  placeholder?: string;
  value: string;
}

const SearchBar = ({ placeholder, value, ...rest }: SearchBarProps) => {
  const theme = useReTheme();
  return (
    <Box
      flexDirection="row"
      padding="s"
      backgroundColor="iosBackground"
      borderRadius="m"
      alignItems="center"
      height={40}
    >
      <Box padding="s">
        <Icon
          name="ios-search"
          size={24}
          color="placeholder"
          backgroundColor="iosBackground"
        />
      </Box>
      <Box flex={1}>
        <TextInput
          style={styles.text}
          placeholder={placeholder || ""}
          placeholderTextColor={theme.colors.placeholder}
          returnKeyType="search"
          value={value}
          {...rest}
        />
      </Box>
    </Box>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    fontFamily: "SFProDisplay-Regular",
  },
});
