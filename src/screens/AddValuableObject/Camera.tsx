import * as React from "react";

import { Box, Icon, Text } from "../../components";

const Camera = () => (
  <Box paddingHorizontal="ml" paddingVertical="ml">
    <Box alignItems="center" justifyContent="center">
      <Box
        marginVertical="ml"
        height={128}
        width={128}
        borderRadius="ml"
        alignItems="center"
        justifyContent="center"
        borderStyle="dashed"
        borderWidth={2}
        borderColor="dash"
      >
        <Icon
          name="ios-camera"
          size={48}
          color="primary"
          backgroundColor="white"
        />
        <Text variant="title3">Add Photo</Text>
      </Box>
    </Box>
  </Box>
);

export default Camera;
