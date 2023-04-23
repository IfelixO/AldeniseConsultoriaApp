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
} from "react-native";
import { Input } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Entypo, AntDesign } from "@expo/vector-icons";
import anotacoesService from "../services/AnotacoesServices";

export default function Feed({ navigation, route }) {
  const [edit, setEdit] = useState(false);
  const [novoTitulo, setNovoTitulo] = useState("");
  const [novoTexto, setNovoTexto] = useState("");
  const [erroTexto, setErroTexto] = useState(null);
  const [erroTitulo, setErroTitulo] = useState(null);
  const [texto, setTexto] = useState(route.params.nota.texto);
  const [titulo, setTitulo] = useState(route.params.nota.titulo);

  function cuidarEdit() {
    let erro = false;

    if (!novoTexto) {
      erro = true;
      setErroTexto("Preencha uma nota válida");
    }
    if (!novoTitulo) {
      erro = true;
      setErroTitulo("Preencha um título válido");
    }
    if (!erro) {
      let meses = [
        "jan",
        "fev",
        "mar",
        "abr",
        "mai",
        "jun",
        "ago",
        "out",
        "nov",
        "dez",
      ];
      const dataCompleta = new Date();
      const dataHoje =
        dataCompleta.getDate() +
        " de " +
        meses[dataCompleta.getMonth()] +
        ", " +
        dataCompleta.getFullYear();

      let data = {
        id: route.params.nota.id,
        nota: route.params.nota.nota,
        titulo: novoTitulo,
        texto: novoTexto,
        data: dataHoje,
      };
      anotacoesService
        .atualizar(data)
        .then((res) => {
          setTexto(novoTexto);
          setTitulo(novoTitulo);
          setEdit(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  return (
    <SafeAreaView style={styles.tela}>
      <StatusBar barStyle="light-content" backgroundColor="#032140" />
      <TouchableOpacity
        style={styles.voltar}
        onPress={() => {
          navigation.goBack({});
        }}
      >
        <Entypo name="back" size={30} color="rgb(50,50,50)" />
      </TouchableOpacity>
      <ScrollView>
        <View style={styles.cabecalho}>
          {edit ? (
            <>
              <View style={styles.editTituloV}>
                <Input
                  style={styles.editTitulo}
                  placeholder={titulo}
                  autoCorrect={false}
                  onChangeText={(value) => {
                    setErroTitulo(null);
                    setNovoTitulo(value);
                  }}
                />
                <Text style={styles.erro}>{erroTitulo}</Text>
              </View>
              <Entypo
                style={styles.cabecalhoIcone}
                name="check"
                size={30}
                color="rgb(50,50,50)"
                onPress={() => {
                  cuidarEdit();
                }}
              />
            </>
          ) : (
            <>
              <Text style={styles.cabecalhoTitulo}>{titulo}</Text>
              <AntDesign
                style={styles.cabecalhoIcone}
                name="edit"
                size={25}
                color="rgb(50,50,50)"
                onPress={() => {
                  setEdit(true);
                }}
              />
            </>
          )}
        </View>
        <View style={styles.textoArea}>
          {edit ? (
            <>
              <TextInput
                style={styles.editTexto}
                multiline={true}
                numberOfLines={10}
                placeholder={texto}
                maxLength={255}
                textAlignVertical="top"
                onChangeText={(e) => {
                  setErroTexto(null);
                  setNovoTexto(e);
                }}
              />
              <Text style={styles.erro}>{erroTexto}</Text>
            </>
          ) : (
            <Text style={styles.texto}>{texto}</Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: "rgba(0, 58, 54, 0.15)",
  },

  voltar: {
    position: "absolute",
    top: 10,
    left: 10,
    zIndex: 1,
  },

  cabecalho: {
    alignItems: "center",
    marginTop: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },

  cabecalhoTitulo: {
    color: "rgb(50,50,50)",
    fontFamily: "Montserratb",
    fontSize: 25,
  },

  editTituloV: {
    width: 200,
    height: 50,
  },

  editTitulo: {
    paddingLeft: 10,
    borderBottomColor: "rgb(200,200,200)",
    borderBottomWidth: 1,
    fontSize: 25,
    textAlign: "center",
    color: "rgb(50,50,50)",
  },

  textoArea: {
    width: "100%",
    alignItems: "center",
  },

  texto: {
    fontSize: 20,
    color: "rgb(50,50,50)",
    fontFamily: "Montserratn",
    margin: 30,
  },

  editTexto: {
    // backgroundColor: "red",
    width: "80%",
    margin: 30,
    borderBottomColor: "rgb(150,150,150)",
    borderBottomWidth: 1,
    fontSize: 20,
    color: "rgb(50,50,50)",
    fontFamily: "Montserratn",
    textAlign: "justify",
  },

  erro: {
    color: "red",
    fontSize: 13,
    fontFamily: "Montserratn",
    width: "100%",
    textAlign: "center",
    marginTop: -20,
  },
});
