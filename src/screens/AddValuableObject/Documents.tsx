import * as React from "react";
import { StyleProp, ViewStyle } from "react-native";

import { Box, WithLabel } from "../../components";
import { useReTheme } from "../../theme";
import ImagePicker from "../../components/ImagePicker";

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
    <WithLabel label={label} containerStyle={containerStyle} opacity={1}>
      <Box paddingTop="m" flexDirection="row">
        <ImagePicker
          containerStyle={{ paddingRight: theme.spacing.m }}
          iconName="ios-document"
          label="Add Receipt"
          image={documents?.receipt}
          onImagePick={onDocumentPick("receipt")}
        />
        <ImagePicker
          label="Add Photos"
          image={documents?.picture}
          onImagePick={onDocumentPick("picture")}
        />
      </Box>
    </WithLabel>
  );
};

export default Documents;
