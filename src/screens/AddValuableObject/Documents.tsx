import * as React from "react";
import { StyleProp, StyleSheet, ViewStyle } from "react-native";

import { Box, Text, ImagePicker } from "../../components";
import { useReTheme } from "../../theme";

import { hasError } from "./helpers";

type FormikHandleChange = {
  (e: React.ChangeEvent<never>): void;
  <T_1 = string | React.ChangeEvent<never>>(
    field: T_1
  ): T_1 extends React.ChangeEvent<never>
    ? void
    : (e: string | React.ChangeEvent<never>) => void;
};

interface DocumentsProps {
  containerStyle?: StyleProp<ViewStyle>;
  label: string;
  documents?: {
    receipt?: string;
    picture?: string;
  };
  onDocumentPick: FormikHandleChange;
  errors?: {
    receipt?: string;
    picture?: string;
  };
  touched?: {
    receipt?: boolean;
    picture?: boolean;
  };
  setFieldTouched: (
    field: string,
    touched?: boolean | undefined,
    shouldValidate?: boolean | undefined
  ) => void;
}

const Documents = ({
  containerStyle,
  label,
  documents,
  onDocumentPick,
  errors,
  touched,
  setFieldTouched,
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
          error={hasError(errors?.receipt, touched?.receipt)}
          setTouched={() => setFieldTouched("documents.receipt", true, false)}
        />
        <ImagePicker
          label="Add Photos"
          image={documents?.picture}
          onImagePick={onDocumentPick("documents.picture")}
          error={hasError(errors?.picture, touched?.picture)}
          setTouched={() => setFieldTouched("documents.picture", true, false)}
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
