import { Feather } from "@expo/vector-icons";
import * as React from "react";
import { StyleSheet, Image } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Box, Text, IconButton } from "../../components";
import { InventoryRoutes, StackNavigationProps } from "../../navigation/types";
import { useReTheme } from "../../theme";

import Documents from "./Documents";
import Section from "./Section";

const CARTIER_RING = {
  id: 1,
  rank: 1,
  name: "Cartier Ring",
  type: "Jewelry",
  source: require("../../../assets/cartier_ring.png"),
  information: {
    category: "Jewelry",
    purchaseDate: "01/01/2019",
    endWarranty: "01/01/2020",
  },
  price: {
    estimation: "4890 - 5150",
    purchasePrice: "5780",
  },
  documents: [
    { id: 1, rank: 1, source: require("../../../assets/fake_bill.jpg") },
    { id: 2, rank: 2, source: require("../../../assets/cartier_ring.png") },
  ],
};

const ValuableDetails = ({
  navigation,
}: StackNavigationProps<InventoryRoutes, "ValuableDetails">) => {
  const insets = useSafeAreaInsets();
  const theme = useReTheme();

  return (
    <Box>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Box height={375} width={375} backgroundColor="primary">
          <Image
            source={CARTIER_RING.source}
            style={{
              ...StyleSheet.absoluteFillObject,
              width: undefined,
              height: undefined,
            }}
          />
        </Box>
        <Box padding="ml">
          <Text variant="label2" paddingBottom="s">
            {CARTIER_RING.type.toUpperCase()}
          </Text>
          <Box
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Text variant="title1">{CARTIER_RING.name}</Text>
            <Feather name="edit" size={24} color={theme.colors.primary} />
          </Box>
          <Section
            title="Information"
            sectionData={Object.entries(CARTIER_RING.information)}
          />
          <Section
            title="Price"
            sectionData={Object.entries(CARTIER_RING.price)}
          />
          <Documents title="Documents" documents={CARTIER_RING.documents} />
        </Box>
      </ScrollView>
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
          onPress={() => navigation.goBack()}
        />
      </Box>
    </Box>
  );
};

export default ValuableDetails;
