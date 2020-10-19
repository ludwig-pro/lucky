import * as React from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";

const Protection = () => {
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text>Protection</Text>
      </View>
    </ScrollView>
  );
};

export default Protection;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
