import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Feed from "./Feed";
import Carteira from "./Carteira";
import Perfil from "./Perfil";
import Anotacoes from "./Anotacoes";
import { Entypo, MaterialIcons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export default function Principal({ route }) {
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      screenOptions={{
        tabBarActiveTintColor: "#00958D",
        headerShown: false,
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="Feed"
        initialParams={{ tela: "principal", atualizar: false }}
        component={Feed}
        options={{
          tabBarLabel: "Feed",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Carteira"
        initialParams={{ atualizar: false }}
        component={Carteira}
        options={{
          tabBarLabel: "Carteira",
          tabBarIcon: ({ color, size }) => (
            <Entypo name="wallet" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Anotações"
        initialParams={{ atualizar: false }}
        component={Anotacoes}
        options={{
          tabBarLabel: "Anotações",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="notes" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Perfil"
        initialParams={{}}
        component={Perfil}
        options={{
          tabBarLabel: "Perfil",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
