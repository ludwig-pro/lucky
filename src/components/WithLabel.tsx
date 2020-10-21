import * as React from "react";
import { StyleSheet, StyleProp, ViewStyle } from "react-native";
import Animated, {
  Extrapolate,
  add,
  block,
  cond,
  eq,
  interpolate,
  not,
  proc,
  set,
  startClock,
  useCode,
} from "react-native-reanimated";
import { useClock, useValues } from "react-native-redash";

import { Box, Text } from "./Themed";

const duration = 200;
const runAnimation = proc(
  (
    clock: Animated.Clock,
    from: Animated.Value<number>,
    to: Animated.Value<number>,
    startTime: Animated.Value<number>,
    startAnimation: Animated.Value<number>,
    opacity: Animated.Node<number>
  ) =>
    block([
      startClock(clock),
      cond(eq(startAnimation, 1), [
        set(from, opacity),
        set(to, not(to)),
        set(startTime, clock),
        set(startAnimation, 0),
      ]),
    ])
);

export interface WithLabelProps {
  label?: string;
  containerStyle?: StyleProp<ViewStyle>;
  show: boolean;
  children: React.ReactNode;
}

const WithLabel = ({
  label,
  containerStyle,
  show,
  children,
}: WithLabelProps) => {
  const clock = useClock();
  const [startTime, from, to, startAnimation] = useValues(0, 0, 1, 0);
  const endTime = add(startTime, duration);
  const opacity = interpolate(clock, {
    inputRange: [startTime, endTime],
    outputRange: [from, to],
    extrapolate: Extrapolate.CLAMP,
  });
  useCode(() => set(startAnimation, 1), [show]);
  useCode(
    () => runAnimation(clock, from, to, startTime, startAnimation, opacity),
    [clock, from, opacity, startAnimation, startTime, to]
  );

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
