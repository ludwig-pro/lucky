import * as React from "react";
import { Image } from "react-native";

import { Box, ModalContainer } from "../components";
import { InventoryRoutes, StackNavigationProps } from "../navigation/types";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const bill = require("../../assets/fake_bill.jpg");

// const aspectRatio = 750 / 1000; // ?

const Document = ({
  navigation: { goBack },
}: StackNavigationProps<InventoryRoutes, "Document">) => {
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
            source={bill}
            style={{
              resizeMode: "center",
              width: 375,
              height: 375,
            }}
          />
        </Box>
      </Box>
    </ModalContainer>
  );
};

export default Document;
