/* eslint-disable no-shadow */
import * as React from "react";
import Reanimated, {
  useCode,
  Value,
  cond,
  Clock,
  eq,
  add,
  interpolate,
  Extrapolate,
  startClock,
  not,
  set,
  proc,
} from "react-native-reanimated";

const { useRef } = React;

function useReanimatedOpacity() {
  const clock = useRef(new Clock()).current;
  const startAnimation = useRef(new Value(0)).current;
  const startTime = useRef(new Value(0)).current;
  const duration = 200;
  const endTime = add(startTime, duration);
  const from = useRef(new Value(1)).current;
  const to = useRef(new Value(0)).current;

  const opacity = interpolate(clock, {
    inputRange: [startTime, endTime],
    outputRange: [from, to],
    extrapolate: Extrapolate.CLAMP,
  });

  const runAnimation = proc(
    (
      startAnimation: Reanimated.Value<number>,
      clock: Reanimated.Clock,
      from: Reanimated.Value<number>,
      to: Reanimated.Value<number>,
      startTime: Reanimated.Value<number>,
      opacity: Reanimated.Node<number>
    ) =>
      cond(eq(startAnimation, 1), [
        startClock(clock),
        set(from, opacity),
        set(to, not(to)),
        set(startTime, clock),
        set(startAnimation, 0),
      ])
  );

  useCode(
    () => [runAnimation(startAnimation, clock, from, to, startTime, opacity)],
    [clock, from, opacity, startAnimation, startTime, to]
  );
  return { startAnimation, opacity };
}

export default useReanimatedOpacity;
