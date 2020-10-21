import * as React from "react";
import { ScrollView } from "react-native";

import { Box, SearchBar } from "../../components";

interface ContainerProps {
  children: React.ReactNode;
  searchQuery: string;
  onChangeSearch: (query: string) => void;
}

const PLACEHOLDER_TEXT = "Search 4 items";

const Container = ({
  children,
  onChangeSearch,
  searchQuery,
}: ContainerProps) => {
  return (
    <ScrollView>
      <Box
        paddingHorizontal="ml"
        paddingTop="ml"
        paddingBottom="ml"
        backgroundColor="white"
      >
        <SearchBar
          placeholder={PLACEHOLDER_TEXT}
          onChangeText={onChangeSearch}
          value={searchQuery}
        />
      </Box>
      {children}
    </ScrollView>
  );
};

export default Container;
