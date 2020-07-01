import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Camera as ExpoCamera } from "expo-camera";
import * as Device from "expo-device";

import { Feather } from "@expo/vector-icons";

const Camera: React.FC = () => {
  const [hasPermission, setHasPermission] = useState(false);
  const [type, setType] = useState(ExpoCamera.Constants.Type.back);

  console.log(Device.brand);

  useEffect(() => {
    (async () => {
      if (Device.brand === null) {
        const retorno = await ExpoCamera.isAvailableAsync();
        setHasPermission(retorno);

        setType(await ExpoCamera.getAvailableCameraTypesAsync());
      } else {
        const { status } = await ExpoCamera.requestPermissionsAsync();
        setHasPermission(status === "granted");
      }
    })();
  }, []);

  if (hasPermission === false) {
    return (
      <View style={{ padding: 24 }}>
        <Text> Permissão Negada</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <ExpoCamera style={{ flex: 1 }} type={type}>
        <View
          style={{
            flex: 1,
            backgroundColor: "transparent",
            flexDirection: "row",
          }}
        >
          <TouchableOpacity
            style={{
              flex: 0.1,
              alignSelf: "flex-end",
              alignItems: "center",
            }}
            onPress={() => {
              setType(
                type === ExpoCamera.Constants.Type.back
                  ? ExpoCamera.Constants.Type.front
                  : ExpoCamera.Constants.Type.back
              );
            }}
          >
            <Text
              style={{
                fontSize: 18,
                marginBottom: 20,
                marginLeft: 10,
                color: "white",
              }}
            >
              <Feather name="camera" size={20} color="#fff" />
            </Text>
          </TouchableOpacity>
        </View>
      </ExpoCamera>
    </View>
  );
};

export default Camera;
