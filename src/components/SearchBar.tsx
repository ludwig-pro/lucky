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
  placeholderText: string;
}

const SearchBar = ({ placeholderText }: SearchBarProps) => {
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
          placeholder={placeholderText}
          placeholderTextColor={theme.colors.placeholder}
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
