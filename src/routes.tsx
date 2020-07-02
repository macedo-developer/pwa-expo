import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { Feather } from "@expo/vector-icons";

import Main from "./pages/Main";
import Camera from "./pages/Camera";
import Books from "./pages/Books";
import DetailBook from "./pages/DetailBook";

const Tab = createBottomTabNavigator();
const AppStack = createStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: "#36a397",
          inactiveTintColor: "#b8b8b8",
        }}
      >
        <Tab.Screen
          options={{
            tabBarIcon: ({ color }) => (
              <Feather name="home" size={20} color={color} />
            ),
          }}
          name="Home"
          component={Main}
        />
        <Tab.Screen
          options={{
            tabBarIcon: ({ color }) => (
              <Feather name="book" size={20} color={color} />
            ),
          }}
          name="Books"
          component={Books}
        />
        <Tab.Screen
          options={{
            tabBarIcon: ({ color }) => (
              <Feather name="camera" size={20} color={color} />
            ),
          }}
          name="Camera"
          component={Camera}
        />
      </Tab.Navigator>
      {/* <AppStack.Navigator
        headerMode="none"
        screenOptions={{
          cardStyle: {
            backgroundColor: "#f0f0f5",
          },
        }}
      >
        <AppStack.Screen name="Details" component={DetailBook} />
      </AppStack.Navigator> */}
    </NavigationContainer>
  );
}
