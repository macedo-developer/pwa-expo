import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";

const Share: React.FC = () => {
  function testUpload() {}

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={testUpload}>Test Upload</TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "transparent",
    paddingVertical: 200,
  },
});

export default Share;
