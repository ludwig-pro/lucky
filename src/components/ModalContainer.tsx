import * as React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import IconButton from "./IconButton";
import { Box } from "./Themed";

interface ModalContainerProps {
  goBack: () => void;
  children: React.ReactNode;
}

const ModalContainer = ({ goBack, children }: ModalContainerProps) => {
  const insets = useSafeAreaInsets();

  return (
    <Box flex={1}>
      {children}
      <Box
        position="absolute"
        paddingLeft="ml"
        style={{ paddingTop: insets.top }}
      >
        <IconButton
          name="ios-close"
          size={32}
          color="white"
          backgroundColor="tabIconDefault"
          onPress={() => goBack()}
        />
      </Box>
    </Box>
  );
};

export default ModalContainer;
