import { Feather } from "@expo/vector-icons";
import * as React from "react";
import { StyleSheet, Image } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import { Box, Text, ModalContainer } from "../../components";
import { InventoryRoutes, StackNavigationProps } from "../../navigation/types";
import { useReTheme } from "../../theme";

import Documents from "./Documents";
import Section from "./Section";

const ValuableDetails = ({
  navigation: { goBack, navigate },
  route,
}: StackNavigationProps<InventoryRoutes, "ValuableDetails">) => {
  const theme = useReTheme();
  const { valuableObject } = route.params;
  const navigateToDocument = (id: number) =>
    navigate("Document", { documentId: id });

  return (
    <ModalContainer goBack={goBack}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Box height={375} width={375} backgroundColor="primary">
          <Image
            source={valuableObject.mainImage}
            style={{
              ...StyleSheet.absoluteFillObject,
              width: undefined,
              height: undefined,
            }}
          />
        </Box>
        <Box padding="ml">
          <Text variant="label2" paddingBottom="s">
            {valuableObject.category.toUpperCase()}
          </Text>
          <Box
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Text variant="title1">{valuableObject.name}</Text>
            <Feather name="edit" size={24} color={theme.colors.primary} />
          </Box>
          <Section
            title="Information"
            sectionData={valuableObject.information}
          />
          <Section title="Price" sectionData={valuableObject.price} />
          <Documents
            title="Documents"
            documents={valuableObject.documents}
            onPress={navigateToDocument}
          />
        </Box>
      </ScrollView>
    </ModalContainer>
  );
};

export default ValuableDetails;
