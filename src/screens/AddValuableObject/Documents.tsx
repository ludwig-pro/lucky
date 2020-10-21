import * as React from "react";
import { StyleProp, StyleSheet, ViewStyle } from "react-native";

import { Box, Text } from "../../components";
import { useReTheme } from "../../theme";
import ImagePicker from "../../components/ImagePicker";

import { FormikHandleChange } from "./AddValuableObject";

interface DocumentsProps {
  containerStyle?: StyleProp<ViewStyle>;
  label: string;
  documents?: {
    receipt?: string;
    picture?: string;
  };
  onDocumentPick: FormikHandleChange;
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
      {label && (
        <Text variant="label3" style={styles.label}>
          {label}
        </Text>
      )}
      <Box paddingTop="m" flexDirection="row">
        <ImagePicker
          containerStyle={{ paddingRight: theme.spacing.m }}
          iconName="ios-document"
          label="Add Receipt"
          image={documents?.receipt}
          onImagePick={onDocumentPick("documents.receipt")}
        />
        <ImagePicker
          label="Add Photos"
          image={documents?.picture}
          onImagePick={onDocumentPick("documents.picture")}
        />
      </Box>
    </Box>
  );
};

const styles = StyleSheet.create({
  label: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    zIndex: 9999,
  },
});

export default Documents;
