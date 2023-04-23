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

export default function EditDespesa(params) {
  const [valor, setValor] = useState();
  const [nome, setNome] = useState();
  const [top, setTop] = useState(10);
  const [placeholderValor, setPlaceholderValor] = useState(
    params.valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    })
  );

  useEffect(() => {
    if (params.id > 1 && params.id < 8) {
      let t = params.id * 40 - 28;
      setTop(t);
    }
    if (params.id > 7) {
      let t = params.id * 40 - 22;
      setTop(t);
    }
  });

  return (
    <View
      style={{
        alignItems: "center",
        backgroundColor: "#CDD3D9",
        width: "80%",
        height: 31,
        borderRadius: 10,
        position: "absolute",
        top: top,
      }}
    >
      <View style={styles.inputs}>
        <Entypo
          style={styles.check}
          name="check"
          size={20}
          color="black"
          onPress={() => {
            params.handleEditDespesa(params.id, nome, valor);
          }}
        />
        <TextInput
          maxLength={12}
          style={styles.inputNome}
          placeholder={params.nome}
          autoCorrect={false}
          onChangeText={(value) => {
            setNome(value);
          }}
        />
        <TextInputMask
          style={styles.inputValor}
          type={"money"}
          placeholder={placeholderValor}
          autoCorrect={false}
          onChangeText={(value) => {
            setValor(value)
          }}
          keyboardType="number-pad"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputs: {
    flexDirection: "row",
    justifyContent: "flex-end",
    width: "100%",
    gap: 20,
  },

  check: {
    alignSelf: "center",
    marginRight: -15,
  },

  inputNome: {
    color: "black",
    width: 130,
    fontSize: 16,
    borderRadius: 10,
    fontFamily: "Montserratb",
    textAlign: "left",
  },

  inputValor: {
    color: "red",
    width: 130,
    fontSize: 16,
    borderRadius: 10,
    paddingRight: 15,
    fontFamily: "Montserratb",
    textAlign: "right",
  },
});
