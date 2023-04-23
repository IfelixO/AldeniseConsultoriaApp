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
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import anotacoesService from "../services/AnotacoesServices";
import { Skeleton } from "@rneui/themed";

export default function Feed({ navigation, route }) {
  const [nota1, setNota1] = useState({});
  const [nota2, setNota2] = useState({});
  const [nota3, setNota3] = useState({});
  const [nota4, setNota4] = useState({});
  const [nota5, setNota5] = useState({});
  const [nota6, setNota6] = useState({});
  const [nota7, setNota7] = useState({});
  const [nota8, setNota8] = useState({});
  const [nota9, setNota9] = useState({});
  const [nota10, setNota10] = useState({});
  const [notaNova, setNotaNova] = useState({});
  const [renderiza, setRenderiza] = useState(true);
  const [confirma, setConfirma] = useState(false);
  const [visibilidadeBotao, setVisibilidadeBotao] = useState(true);

  function listar() {
    AsyncStorage.getItem("USUARIO")
      .then((res_usuario) => {
        let data = JSON.parse(res_usuario);
        anotacoesService
          .listar(data)
          .then((resA) => {
            setNota1({
              id: resA.data.id,
              nota: 1,
              titulo: resA.data.tituloNota1,
              texto: resA.data.nota1,
              data: resA.data.dataNota1,
            });
            setNota2({
              id: resA.data.id,
              nota: 2,
              titulo: resA.data.tituloNota2,
              texto: resA.data.nota2,
              data: resA.data.dataNota2,
            });
            setNota3({
              id: resA.data.id,
              nota: 3,
              titulo: resA.data.tituloNota3,
              texto: resA.data.nota3,
              data: resA.data.dataNota3,
            });
            setNota4({
              id: resA.data.id,
              nota: 4,
              titulo: resA.data.tituloNota4,
              texto: resA.data.nota4,
              data: resA.data.dataNota4,
            });
            setNota5({
              id: resA.data.id,
              nota: 5,
              titulo: resA.data.tituloNota5,
              texto: resA.data.nota5,
              data: resA.data.dataNota5,
            });
            setNota6({
              id: resA.data.id,
              nota: 6,
              titulo: resA.data.tituloNota6,
              texto: resA.data.nota6,
              data: resA.data.dataNota6,
            });
            setNota7({
              id: resA.data.id,
              nota: 7,
              titulo: resA.data.tituloNota7,
              texto: resA.data.nota7,
              data: resA.data.dataNota7,
            });
            setNota8({
              id: resA.data.id,
              nota: 8,
              titulo: resA.data.tituloNota8,
              texto: resA.data.nota8,
              data: resA.data.dataNota8,
            });
            setNota9({
              id: resA.data.id,
              nota: 9,
              titulo: resA.data.tituloNota9,
              texto: resA.data.nota9,
              data: resA.data.dataNota9,
            });
            setNota10({
              id: resA.data.id,
              nota: 10,
              titulo: resA.data.tituloNota10,
              texto: resA.data.nota10,
              data: resA.data.dataNota10,
            });
            setNotaNova({
              id: resA.data.id,
              nota: 0,
              titulo: "Nova nota",
              texto: "Clique no botão para editar...",
            });
            if (
              resA.data.tituloNota1 &&
              resA.data.tituloNota2 &&
              resA.data.tituloNota3 &&
              resA.data.tituloNota4 &&
              resA.data.tituloNota5 &&
              resA.data.tituloNota6 &&
              resA.data.tituloNota7 &&
              resA.data.tituloNota8 &&
              resA.data.tituloNota9 &&
              resA.data.tituloNota10
            ) {
              setVisibilidadeBotao(false);
            }
            setConfirma(true);
          })
          .catch((errA) => {
            console.log(errA);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    if (renderiza) {
      listar();
    }
    if (confirma) {
      setRenderiza(false)
    }
  });

  return (
    <SafeAreaView style={styles.tela}>
      <StatusBar barStyle="light-content" backgroundColor="#032140" />
      <ScrollView style={styles.conteiner}>
        <TouchableOpacity
          style={styles.atualizar}
          onPress={() => {
            listar();
            setRenderiza(true)
          }}
        >
          <MaterialCommunityIcons
            name="reload"
            size={30}
            color="rgb(50,50,50)"
          />
        </TouchableOpacity>

        <View style={styles.cabecalho}>
          <Text style={styles.cabecalhoTitulo}>Anotações</Text>
        </View>
        {renderiza ? (
          <Skeleton
            style={styles.listaSkeleton}
            height={60}
            animation="pulse"
          />
        ) : (
          <View style={styles.lista}>
            {nota1.titulo ? (
              <TouchableOpacity
                style={styles.listaItem}
                onPress={() => {
                  navigation.navigate("AnotacoesNota", {
                    nota: nota1,
                  });
                }}
              >
                <MaterialCommunityIcons
                  style={styles.listaItemIcone}
                  name="card-text"
                  size={25}
                  color="black"
                />
                <Text style={styles.listaItemTitulo}>{nota1.titulo}</Text>
                <Text style={styles.listaItemData}>{nota1.data}</Text>
              </TouchableOpacity>
            ) : null}
            {nota2.titulo ? (
              <TouchableOpacity
                style={styles.listaItem}
                onPress={() => {
                  navigation.navigate("AnotacoesNota", { nota: nota2 });
                }}
              >
                <MaterialCommunityIcons
                  style={styles.listaItemIcone}
                  name="card-text"
                  size={25}
                  color="black"
                />
                <Text style={styles.listaItemTitulo}>{nota2.titulo}</Text>
                <Text style={styles.listaItemData}>{nota2.data}</Text>
              </TouchableOpacity>
            ) : null}
            {nota3.titulo ? (
              <TouchableOpacity
                style={styles.listaItem}
                onPress={() => {
                  navigation.navigate("AnotacoesNota", { nota: nota3 });
                }}
              >
                <MaterialCommunityIcons
                  style={styles.listaItemIcone}
                  name="card-text"
                  size={25}
                  color="black"
                />
                <Text style={styles.listaItemTitulo}>{nota3.titulo}</Text>
                <Text style={styles.listaItemData}>{nota3.data}</Text>
              </TouchableOpacity>
            ) : null}
            {nota4.titulo ? (
              <TouchableOpacity
                style={styles.listaItem}
                onPress={() => {
                  navigation.navigate("AnotacoesNota", { nota: nota4 });
                }}
              >
                <MaterialCommunityIcons
                  style={styles.listaItemIcone}
                  name="card-text"
                  size={25}
                  color="black"
                />
                <Text style={styles.listaItemTitulo}>{nota4.titulo}</Text>
                <Text style={styles.listaItemData}>{nota4.data}</Text>
              </TouchableOpacity>
            ) : null}
            {nota5.titulo ? (
              <TouchableOpacity
                style={styles.listaItem}
                onPress={() => {
                  navigation.navigate("AnotacoesNota", { nota: nota5 });
                }}
              >
                <MaterialCommunityIcons
                  style={styles.listaItemIcone}
                  name="card-text"
                  size={25}
                  color="black"
                />
                <Text style={styles.listaItemTitulo}>{nota5.titulo}</Text>
                <Text style={styles.listaItemData}>{nota5.data}</Text>
              </TouchableOpacity>
            ) : null}
            {nota6.titulo ? (
              <TouchableOpacity
                style={styles.listaItem}
                onPress={() => {
                  navigation.navigate("AnotacoesNota", { nota: nota6 });
                }}
              >
                <MaterialCommunityIcons
                  style={styles.listaItemIcone}
                  name="card-text"
                  size={25}
                  color="black"
                />
                <Text style={styles.listaItemTitulo}>{nota6.titulo}</Text>
                <Text style={styles.listaItemData}>{nota6.data}</Text>
              </TouchableOpacity>
            ) : null}
            {nota7.titulo ? (
              <TouchableOpacity
                style={styles.listaItem}
                onPress={() => {
                  navigation.navigate("AnotacoesNota", { nota: nota7 });
                }}
              >
                <MaterialCommunityIcons
                  style={styles.listaItemIcone}
                  name="card-text"
                  size={25}
                  color="black"
                />
                <Text style={styles.listaItemTitulo}>{nota7.titulo}</Text>
                <Text style={styles.listaItemData}>{nota7.data}</Text>
              </TouchableOpacity>
            ) : null}
            {nota8.titulo ? (
              <TouchableOpacity
                style={styles.listaItem}
                onPress={() => {
                  navigation.navigate("AnotacoesNota", { nota: nota8 });
                }}
              >
                <MaterialCommunityIcons
                  style={styles.listaItemIcone}
                  name="card-text"
                  size={25}
                  color="black"
                />
                <Text style={styles.listaItemTitulo}>{nota8.titulo}</Text>
                <Text style={styles.listaItemData}>{nota8.data}</Text>
              </TouchableOpacity>
            ) : null}
            {nota9.titulo ? (
              <TouchableOpacity
                style={styles.listaItem}
                onPress={() => {
                  navigation.navigate("AnotacoesNota", { nota: nota9 });
                }}
              >
                <MaterialCommunityIcons
                  style={styles.listaItemIcone}
                  name="card-text"
                  size={25}
                  color="black"
                />
                <Text style={styles.listaItemTitulo}>{nota9.titulo}</Text>
                <Text style={styles.listaItemData}>{nota9.data}</Text>
              </TouchableOpacity>
            ) : null}
            {nota10.titulo ? (
              <TouchableOpacity
                style={styles.listaItem}
                onPress={() => {
                  navigation.navigate("AnotacoesNota", { nota: nota10 });
                }}
              >
                <MaterialCommunityIcons
                  style={styles.listaItemIcone}
                  name="card-text"
                  size={25}
                  color="black"
                />
                <Text style={styles.listaItemTitulo}>{nota10.titulo}</Text>
                <Text style={styles.listaItemData}>{nota10.data}</Text>
              </TouchableOpacity>
            ) : null}
          </View>
        )}
        <View style={styles.rodape}>
          {visibilidadeBotao ? (
            <TouchableOpacity
              style={styles.adicionar}
              onPress={() => {
                navigation.navigate("AnotacoesNota", { nota: notaNova });
              }}
            >
              <Text style={styles.textoAdicionar}>Adicionar nova nota</Text>
            </TouchableOpacity>
          ) : null}
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

  atualizar: {
    position: "absolute",
    top: 10,
    left: 10,
    zIndex: 1,
  },

  cabecalho: {
    alignItems: "center",
    marginTop: 20,
  },

  cabecalhoTitulo: {
    color: "rgb(50,50,50)",
    fontFamily: "Montserratb",
    fontSize: 33,
  },

  lista: {
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    marginTop: 50,
  },

  listaSkeleton: {
    marginTop: 60,
    width: "90%",
    alignSelf: 'center'
  },

  listaItem: {
    marginTop: 15,
    width: "90%",
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
    flexDirection: "row",
    padding: 15,
    justifyContent: "space-between",
  },

  listaItemTitulo: {
    flex: 2,
    fontFamily: "Montserratb",
    fontSize: 15,
    marginLeft: 15,
  },

  listaItemData: {
    fontFamily: "Montserratn",
    fontSize: 12,
  },

  rodape: {
    width: "100%",
    alignItems: "center",
  },

  adicionar: {
    // position: "absolute",
    marginTop: 20,
    backgroundColor: "#003a36",
    width: 200,
    borderRadius: 6,
    padding: 10,
  },

  textoAdicionar: {
    color: "white",
    fontFamily: "Montserratb",
    fontSize: 15,
    textAlign: "center",
  },
});
