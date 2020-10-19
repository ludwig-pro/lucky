import * as React from "react";

import { Box, Text } from "../../components";

interface SectionProps {
  title: string;
  sectionData: [string, string][];
}

interface RowProps {
  children: React.ReactNode;
}

const Row = ({ children }: RowProps) => (
  <Box
    paddingTop="sm"
    flexDirection="row"
    alignItems="center"
    justifyContent="space-between"
  >
    {children}
  </Box>
);

const Section = ({ title, sectionData }: SectionProps) => (
  <Box paddingVertical="ml" borderBottomColor="separator" borderBottomWidth={1}>
    <Text variant="title2">{title}</Text>
    {sectionData.map(([key, value]) => (
      <Row>
        <Text variant="title3">{key}</Text>
        <Text variant="body">{value}</Text>
      </Row>
    ))}
  </Box>
);

export default Section;
