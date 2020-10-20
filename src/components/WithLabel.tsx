import * as React from "react";
import { StyleSheet, StyleProp, ViewStyle } from "react-native";
import Animated from "react-native-reanimated";

import { Box, Text } from ".";

export interface WithLabelProps {
  label?: string;
  containerStyle?: StyleProp<ViewStyle>;
  opacity: Animated.Node<number> | number;
  children: React.ReactNode;
}

const WithLabel = ({
  label,
  containerStyle,
  opacity,
  children,
}: WithLabelProps) => {
  return (
    <Box style={containerStyle}>
      {label && (
        <Animated.View style={{ opacity }}>
          <Text variant="label3" style={styles.label}>
            {label}
          </Text>
        </Animated.View>
      )}
      {children}
    </Box>
  );
};

export default WithLabel;

const styles = StyleSheet.create({
  label: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    zIndex: 9999,
  },
});
