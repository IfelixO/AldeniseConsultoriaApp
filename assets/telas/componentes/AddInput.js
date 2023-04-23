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
import DropdownList from "./DropdownList";

export default function AddInput(params) {
  const [addVisibilidade, setAddVisibilidade] = useState(false);
  const [valor, setValor] = useState();
  const [nome, setNome] = useState();
  const [tipo, setTipo] = useState();


  function direcionarHandle(valor, nome, tipo){
    switch (params.tela) {
      case "FeedMeta":
        params.handleAddParcela(valor);
        break;
      case "CarteiraMapa":
        params.handleAddDespesa(valor, nome);
        break;
      case "CarteiraTempo":
        params.handleAddMovimentacao(valor, nome, tipo);
        break;
      default:
        break;
    }
  }
  return (
    <View style={styles.add}>
      {addVisibilidade && params.tela == "FeedMeta" ? (
        <TextInputMask
          style={styles.input}
          type={"money"}
          value={valor}
          placeholder="Valor da parcela"
          autoCorrect={false}
          onChangeText={(value) => {
            value = value.replace("R$", "");
            value = value.replace(".", "");
            value = value.replace(",", ".");
            setValor(Number(value));
          }}
          keyboardType="number-pad"
          // returnKeyType="done"
        />
      ) : null}

      {addVisibilidade && params.tela == "CarteiraMapa" ? (
        <>
          <TextInput
            maxLength={12}
            style={styles.input}
            placeholder="Título da despesa"
            autoCorrect={false}
            onChangeText={(value) => {
              setNome(value);
            }}
          />
          <TextInputMask
            style={styles.input}
            type={"money"}
            value={valor}
            placeholder="Valor da despesa"
            autoCorrect={false}
            onChangeText={(value) => {
              value = value.replace("R$", "R$ ");
              setValor(value);
            }}
            keyboardType="number-pad"
            // returnKeyType="done"
          />
        </>
      ) : null}

      {addVisibilidade && params.tela == "CarteiraTempo" ? (
        <>
          <TextInput
            maxLength={12}
            style={styles.input}
            placeholder="Título da movimentação"
            autoCorrect={false}
            onChangeText={(value) => {
              setNome(value);
            }}
          />
          <TextInputMask
            style={styles.input}
            type={"money"}
            value={valor}
            placeholder="Valor da movimentação"
            autoCorrect={false}
            onChangeText={(value) => {
              value = value.replace("R$", "");
              value = value.replace(".", "");
              value = value.replace(",", ".");
              setValor(Number(value));
            }}
            keyboardType="number-pad"
            // returnKeyType="done"
          />
          <DropdownList setTipo={setTipo} />
        </>
      ) : null}

      {addVisibilidade ? (
        <TouchableOpacity
          style={{
            backgroundColor: '#003a36',
            width: "90%",
            height: 30,
            borderRadius: 15,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 10,
          }}
          onPress={() => {
            setAddVisibilidade(false);
            direcionarHandle(valor, nome, tipo)
          }}
        >
          <Text style={styles.textoBotao}>Inserir</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={{
            backgroundColor: '#003a36',
            width: "90%",
            height: 30,
            borderRadius: 15,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 10,
          }}
          onPress={() => setAddVisibilidade(true)}
        >
          <Text style={styles.textoBotao}>Adicionar nova {params.item}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  add: {
    alignItems: "center",
    marginTop: 20,
  },

  carregando: {
    marginTop: 20,
  },

  input: {
    backgroundColor: "#DFE0DF",
    color: "#222",
    width: 250,
    marginTop: 10,
    fontSize: 15,
    borderRadius: 6,
    fontFamily: "Montserratb",
    textAlign: "center",
  },

  textoBotao: {
    color: "#FFF",
    fontSize: 15,
    fontFamily: "Montserratb",
  },
});
