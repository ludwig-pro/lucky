import * as React from "react";
import { StyleSheet } from "react-native";

import Icon from "../Icon";
import { Box, Text } from "../Themed";

interface HeaderProps {
  title: string;
  icon: string;
}

const Header = ({ title, icon }: HeaderProps) => (
  <Box justifyContent="center" alignItems="center">
    <Box marginBottom="l" width={112} height={112}>
      <Box
        width={112}
        height={112}
        borderWidth={4}
        borderRadius="xl"
        borderColor="borderModal"
      />
      <Box
        style={{ ...StyleSheet.absoluteFillObject }}
        justifyContent="center"
        alignItems="center"
      >
        <Icon name={icon} size={56} color="primary" backgroundColor="white" />
      </Box>
    </Box>
    <Text variant="title2" paddingBottom="m">
      {title}
    </Text>
  </Box>
);

export default Header;
