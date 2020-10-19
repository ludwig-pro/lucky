import * as React from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";

const Inventory = () => {
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text>Inventory</Text>
      </View>
    </ScrollView>
  );
};

export default Inventory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
