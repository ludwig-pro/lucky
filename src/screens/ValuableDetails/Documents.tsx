import * as React from "react";
import { StyleSheet, Image, ScrollView } from "react-native";
import { BorderlessButton } from "react-native-gesture-handler";

import { Box, Text } from "../../components";
import { useReTheme } from "../../theme";

type Document = {
  id: number;
  rank: number;
  source: string;
};

interface DocumentsProps {
  title: string;
  documents: Document[];
  onPress: (source: string) => void;
}

const Documents = ({ title, documents, onPress }: DocumentsProps) => {
  const theme = useReTheme();
  return (
    <Box paddingVertical="ml">
      <Text variant="title2">{title}</Text>
      <ScrollView
        horizontal
        contentContainerStyle={{ paddingTop: theme.spacing.sm }}
      >
        {documents.map(({ id, source }) => (
          <BorderlessButton key={id} onPress={() => onPress(source)}>
            <Box
              height={128}
              width={128}
              marginRight="sm"
              backgroundColor="placeholder"
              borderRadius="ml"
              overflow="hidden"
            >
              <Image
                source={{ uri: source }}
                style={{
                  ...StyleSheet.absoluteFillObject,
                  width: undefined,
                  height: undefined,
                }}
              />
            </Box>
          </BorderlessButton>
        ))}
      </ScrollView>
    </Box>
  );
};

export default Documents;
