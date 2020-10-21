import * as React from "react";
import { ScrollView, ActivityIndicator } from "react-native";

import { FormatedValuableObject } from "../../models/reducers/inventory";
import { Box, SearchBar } from "../../components";
import { InventoryRoutes, StackNavigationProps } from "../../navigation/types";

import Card from "./Card";
import { useInventoryValuable } from "./useInventoryValuable";

const PLACEHOLDER_TEXT = "Search 4 items";

const Inventory = ({
  navigation,
}: StackNavigationProps<InventoryRoutes, "Inventory">) => {
  const {
    inventory,
    isLoading,
    searchQuery,
    setSearchQuery,
  } = useInventoryValuable();

  const onChangeSearch = (query: string) => {
    setSearchQuery(query);
  };

  const navigateToValuableDetails = (
    valuableObject: FormatedValuableObject
  ) => () => navigation.navigate("ValuableDetails", { valuableObject });

  if (isLoading || inventory === undefined) {
    return (
      <ScrollView contentContainerStyle={{ flex: 1 }}>
        <Box
          paddingHorizontal="ml"
          paddingTop="s"
          paddingBottom="ml"
          backgroundColor="white"
        >
          <SearchBar
            placeholder={PLACEHOLDER_TEXT}
            onChangeText={onChangeSearch}
            value={searchQuery}
          />
        </Box>
        <Box
          paddingTop="ml"
          paddingHorizontal="ml"
          flex={1}
          alignItems="center"
          justifyContent="center"
        >
          <ActivityIndicator size="small" color="#0000ff" />
        </Box>
      </ScrollView>
    );
  }

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
    </ScrollView>
  );
};

export default Inventory;
