import * as React from "react";
import { StyleProp, StyleSheet, ViewStyle } from "react-native";

import { Box, Text } from "../../components";
import { useReTheme } from "../../theme";

import Camera from "./Camera";

interface DocumentsProps {
  containerStyle?: StyleProp<ViewStyle>;
  label: string;
}

const Documents = ({ containerStyle, label }: DocumentsProps) => {
  const theme = useReTheme();
  return (
    <Box style={containerStyle}>
      <Text variant="label3" style={styles.label}>
        {label}
      </Text>
      <Box paddingTop="m" flexDirection="row">
        <Camera
          containerStyle={{ paddingRight: theme.spacing.m }}
          iconName="ios-document"
          label="Add Receipt"
        />
        <Camera label="Add Photos" />
      </Box>
    </Box>
  );
};

export default Documents;

const styles = StyleSheet.create({
  label: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    zIndex: 9999,
  },
});
