import * as React from "react";
import { Image, StyleSheet } from "react-native";

import { Box, ModalContainer } from "../components";
import { InventoryRoutes, StackNavigationProps } from "../navigation/types";

const Document = ({
  navigation: { goBack },
  route,
}: StackNavigationProps<InventoryRoutes, "Document">) => {
  const { source } = route.params;
  return (
    <ModalContainer goBack={goBack}>
      <Box
        flex={1}
        alignItems="center"
        justifyContent="center"
        backgroundColor="dark"
      >
        <Box width={375} height={375} backgroundColor="white">
          <Image
            source={{ uri: source }}
            style={{
              ...StyleSheet.absoluteFillObject,

              resizeMode: "contain",
              width: undefined,
              height: undefined,
            }}
          />
        </Box>
      </Box>
    </ModalContainer>
  );
};

export default Document;
