import * as React from "react";
import { StyleProp, StyleSheet, ViewStyle } from "react-native";

import { Box, Text } from "../../components";
import { useReTheme } from "../../theme";

import Camera from "./Camera";

interface DocumentsProps {
  containerStyle?: StyleProp<ViewStyle>;
  label: string;
  documents?: {
    receipt?: string;
    picture?: string;
  };
  onDocumentPick: (type: string) => (decodeURI: string) => void;
}

const Documents = ({
  containerStyle,
  label,
  documents,
  onDocumentPick,
}: DocumentsProps) => {
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
          image={documents?.receipt}
          onImagePick={onDocumentPick("receipt")}
        />
        <Camera
          label="Add Photos"
          image={documents?.picture}
          onImagePick={onDocumentPick("picture")}
        />
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
