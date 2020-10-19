import * as React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
// import { useSafeAreaInsets } from "react-native-safe-area-context";

const Insurance = () => {
  // const someContent = Array.from({ length: 50 }, (v, i) => i);

  // const scrollRef = React.useRef(null);

  // const statusBarInset = useSafeAreaInsets().top;

  // const smallHeaderInset = statusBarInset + 44;
  // const largeHeaderInset = statusBarInset + 96;

  // function onPress() {
  //   scrollRef.current?.scrollTo({
  //     animated: true,
  //     y: -largeHeaderInset,
  //   });
  // }

  // return (
  //   <ScrollView
  //     ref={scrollRef}
  //     contentInsetAdjustmentBehavior="automatic"
  //     scrollToOverflowEnabled
  //   >
  //     {someContent.map((x) => (
  //       <Button title="Click me" key={x} onPress={onPress} />
  //     ))}
  //   </ScrollView>
  // );

  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          <Text>Insurance</Text>
        </View>
      </ScrollView>
    </>
  );
};

export default Insurance;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
