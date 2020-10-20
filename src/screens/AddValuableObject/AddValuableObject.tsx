import * as React from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { Box, Header } from "../../components";
import { InventoryRoutes, StackNavigationProps } from "../../navigation/types";

import TextInput from "./TextInput";
import Camera from "./Camera";

const AddValuableObject = ({
  navigation,
}: StackNavigationProps<InventoryRoutes, "Inventory">) => {
  const [name, setName] = React.useState("");
  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{ flex: 1 }}
      scrollEnabled={false}
    >
      <Box flex={1} backgroundColor="white">
        <Header
          left={{
            icon: "ios-close",
            onPress: () => navigation.goBack(),
          }}
          right={{
            label: "Save",
            onPress: () => true,
            disabled: true,
          }}
          title="New Object"
        />
        <Camera />
        <Box paddingHorizontal="ml">
          <TextInput
            value={name}
            label="Name"
            placeholder="Name"
            onChangeText={(text) => setName(text)}
          />
        </Box>
      </Box>
    </KeyboardAwareScrollView>
  );
};

export default AddValuableObject;
