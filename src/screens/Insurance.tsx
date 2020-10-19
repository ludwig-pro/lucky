import * as React from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";

const Insurance = () => {
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text>Insurance</Text>
      </View>
    </ScrollView>
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
