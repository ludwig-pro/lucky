import * as React from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";

const Profile = () => {
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text>Profile</Text>
      </View>
    </ScrollView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
