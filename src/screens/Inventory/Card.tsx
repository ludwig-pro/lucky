import * as React from "react";
import { StyleSheet, View, Image } from "react-native";
import { BorderlessButton } from "react-native-gesture-handler";

import { makeStyles, Theme } from "../../theme";
import { Box, Text } from "../../components";

interface CardProps {
  title: string;
  price: string;
  source: string;
  onPress: () => void;
}

const Card = ({ title, price, source, onPress }: CardProps) => {
  const styles = useStyles();
  return (
    <View style={styles.container}>
      <BorderlessButton onPress={() => onPress()}>
        <Box
          height={262}
          width={157}
          backgroundColor="white"
          borderRadius="ml"
          overflow="hidden"
        >
          <Box
            height={158}
            backgroundColor="primary"
            borderBottomColor="border"
            borderBottomWidth={StyleSheet.hairlineWidth}
          >
            <Image
              source={{ uri: source }}
              style={{
                ...StyleSheet.absoluteFillObject,
                width: undefined,
                height: undefined,
              }}
            />
          </Box>
          <Box
            flex={1}
            paddingHorizontal="ml"
            paddingVertical="m"
            justifyContent="space-between"
          >
            <Text variant="title3" numberOfLines={2}>
              {title || "title"}
            </Text>
            <Text variant="label1">{`${price || "price"} €`}</Text>
          </Box>
        </Box>
      </BorderlessButton>
    </View>
  );
};

export default Card;

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    opacity: 1,
    shadowRadius: 4,
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    borderRadius: theme.borderRadii.ml,
    backgroundColor: theme.colors.white,
  },
}));
