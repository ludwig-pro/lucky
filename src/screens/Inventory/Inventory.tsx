import * as React from "react";
import { ActivityIndicator } from "react-native";

import { FormatedValuableObject } from "../../models/Inventory";
import { Box } from "../../components";
import { InventoryRoutes, StackNavigationProps } from "../../navigation/types";
import { useReTheme } from "../../theme";

import Card from "./Card";
import { useInventoryValuable } from "./useInventoryValuable";
import Container from "./Container";
import SuccessModal from "./SuccessModal";
import useSuccessModal from "./useSuccessModal";

const Inventory = ({
  navigation,
}: StackNavigationProps<InventoryRoutes, "Inventory">) => {
  const theme = useReTheme();
  const {
    inventory,
    isLoading,
    searchQuery,
    setSearchQuery,
  } = useInventoryValuable();

  const { handleSuccessModal, successModalVisible, data } = useSuccessModal();

  const onChangeSearch = (query: string) => {
    setSearchQuery(query);
  };

  const navigateToValuableDetails = (
    valuableObject: FormatedValuableObject
  ) => () => navigation.navigate("ValuableDetails", { valuableObject });

  if (isLoading || inventory === undefined) {
    return (
      <Container searchQuery={searchQuery} onChangeSearch={onChangeSearch}>
        <Box
          paddingTop="ml"
          paddingHorizontal="ml"
          flex={1}
          alignItems="center"
          justifyContent="center"
        >
          <ActivityIndicator size="small" color={theme.colors.primary} />
        </Box>
      </Container>
    );
  }

  return (
    <Container searchQuery={searchQuery} onChangeSearch={onChangeSearch}>
      <Box
        paddingTop="ml"
        paddingHorizontal="ml"
        flex={1}
        flexDirection="row"
        flexWrap="wrap"
        justifyContent="space-between"
      >
        {inventory.map((item) => (
          <Box key={item.id} paddingBottom="ml">
            <Card
              title={item.name}
              price={item.purchaseValue}
              source={item.mainImage}
              onPress={navigateToValuableDetails(item)}
            />
          </Box>
        ))}
      </Box>
      <SuccessModal
        visible={successModalVisible}
        onPress={handleSuccessModal}
        name={data?.name}
        price={data?.estimation}
      />
    </Container>
  );
};

export default Inventory;
