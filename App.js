import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./assets/telas/Login";
import Principal from "./assets/telas/Principal";
import FeedMeta from "./assets/telas/FeedMeta";
import ConfigurarMeta from "./assets/telas/ConfigurarMeta";
import FeedSaude from "./assets/telas/FeedSaude";
import CarteiraMapa from "./assets/telas/CarteiraMapa";
import CarteiraTempo from "./assets/telas/CarteiraTempo";
import Cadastro from "./assets/telas/Cadastro";
import Informativo from "./assets/telas/Informativo";
import Anotacoes from "./assets/telas/Anotacoes";
import AnotacoesNota from "./assets/telas/AnotacoesNota";
import { useFonts } from "expo-font";


const Stack = createStackNavigator();

function MyStack() {
  const [fontsLoaded] = useFonts({
    'Montserratn': require("./assets/fonts/Montserrat-Regular.ttf"),
    'Montserratb': require("./assets/fonts/Montserrat-SemiBold.ttf"),
  });


  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerMode: "none",
      }}
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Principal" component={Principal} />
      <Stack.Screen name="FeedMeta" component={FeedMeta} />
      <Stack.Screen name="ConfigurarMeta" component={ConfigurarMeta} />
      <Stack.Screen name="FeedSaude" component={FeedSaude} />
      <Stack.Screen name="CarteiraMapa" component={CarteiraMapa} />
      <Stack.Screen name="CarteiraTempo" component={CarteiraTempo} />
      {/* <Stack.Screen name="Cadastro" component={Cadastro} /> */}
      {/* <Stack.Screen name="Informativo" component={Informativo} /> */}
      <Stack.Screen name="Anotacoes" component={Anotacoes} />
      <Stack.Screen name="AnotacoesNota" component={AnotacoesNota} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}
