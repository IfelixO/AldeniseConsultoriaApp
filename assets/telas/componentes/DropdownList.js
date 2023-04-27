import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Image,
  TouchableOpacity,
  Animated,
  Keyboard,
  SafeAreaView,
  ScrollView,
  StatusBar,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { TextInputMask } from "react-native-masked-text";
import { Input } from "react-native-elements";

export default function DropdownList(params) {
  const [visibilidade, setAVisibilidade] = useState(false);
  const [placeholder, setPlaceholder] = useState("Tipo de movimentação");
  const [cor, setCor] = useState("gray");

  return (
    <>
      <View style={styles.dropdown}>
        <Text
          style={{
            fontFamily: "Montserratb",
            textAlign: "center",
            fontSize: 15,
            color: cor,
          }}
        >
          {placeholder}
        </Text>
        <Entypo
          style={styles.listarBt}
          name="chevron-small-down"
          size={30}
          color="black"
          onPress={() => {
            setAVisibilidade(!visibilidade);
          }}
        />
      </View>
      {visibilidade ? (
        <View style={styles.lista}>
          <Text
            style={styles.listaItem}
            onPress={() => {
              setPlaceholder("Lazer");
              setAVisibilidade(!visibilidade);
              params.setTipo("Lazer");
              setCor('black')
            }}
          >
            Lazer
          </Text>
          <Text
            style={styles.listaItem}
            onPress={() => {
              setPlaceholder("Compras");
              setAVisibilidade(!visibilidade);
              params.setTipo("Compras");
              setCor('black')
            }}
          >
            Compras
          </Text>
          <Text
            style={styles.listaItem}
            onPress={() => {
              setPlaceholder("Alimentação");
              setAVisibilidade(!visibilidade);
              params.setTipo("Alimentação");
              setCor('black')
            }}
          >
            Alimentação
          </Text>
          <Text
            style={styles.listaItem}
            onPress={() => {
              setPlaceholder("Estética");
              setAVisibilidade(!visibilidade);
              params.setTipo("Estética");
              setCor('black')
            }}
          >
            Estética
          </Text>
          <Text
            style={styles.listaItem}
            onPress={() => {
              setPlaceholder("Transporte");
              setAVisibilidade(!visibilidade);
              params.setTipo("Transporte");
              setCor('black')
            }}
          >
            Transporte
          </Text>
        </View>
      ) : null}
    </>
  );
}

const styles = StyleSheet.create({
  dropdown: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    backgroundColor: "#DFE0DF",
    height: 28,
    width: 250,
    marginTop: 10,
    borderRadius: 6,
  },

  listarBt: {
    borderLeftColor: "#032140",
    borderLeftWidth: 1,
    position: "absolute",
    right: 0,
  },

  lista: {
    width: 150,
    backgroundColor: "#DFE0DF",
    marginTop: 5,
    borderRadius: 6,
    alignSelf: "flex-end",
    marginRight: 20,
  },

  listaItem: {
    fontFamily: "Montserratb",
    textAlign: "center",
    fontSize: 15,
    color: "black",
    marginTop: 3,
    marginBottom: 3,
  },
});
