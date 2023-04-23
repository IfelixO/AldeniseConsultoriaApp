import React, { useState, useEffect } from "react";
// import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  StatusBar,
  Button,
  Linking,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import { FontAwesome5 } from "@expo/vector-icons";
import usuarioService from "../services/UsuarioService";
import { Skeleton } from "@rneui/themed";

export default function Perfil({ navigation, route }) {
  const [renderiza, setRenderiza] = useState(true);
  const [usuario, setUsuario] = useState({});
  const [imagem, setImagem] = useState(
    "file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252FgerFin-28ad0714-8857-49b3-a73b-7182a3f60695/ImagePicker/c71734a9-da2f-49d1-a2ea-6dc03db0de82.jpeg"
  );

  function listar() {
    AsyncStorage.getItem("USUARIO").then((res_usuario) => {
      let usuarioInt = JSON.parse(res_usuario);
      setUsuario(usuarioInt);
      setImagem(usuarioInt.perfil);
    });
  }

  function sair() {
    AsyncStorage.removeItem("TOKEN")
      .then(() => {
        navigation.reset({
          index: 0,
          routes: [{ name: "Login" }],
        });
      })
      .catch((err) => {
        alert(err);
      });
  }

  async function escolherImagem() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      // let data = { perfil: result.assets[0].uri, id: usuario.id };
      let data = {
        id: usuario.id,
        nome: usuario.nome,
        perfil: result.assets[0].uri,
      };
      setImagem(result.assets[0].uri);
      usuarioService
        .atualizar(data)
        .then((res) => {
          AsyncStorage.setItem("USUARIO", JSON.stringify(data)).then(
            (resS) => {}
          );
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  useEffect(() => {
    if (renderiza) {
      listar();
    }
    if (usuario) {
      setTimeout(() => {
        setRenderiza(false);
      }, 1000);
      // setRenderiza(false);
    }
  });

  return (
    <SafeAreaView style={styles.tela}>
      <StatusBar barStyle="light-content" backgroundColor="#032140" />
      {/* <ScrollView > */}
      <View style={styles.cabecalho}>
        <View>
          {renderiza ? (
            <Skeleton
              style={styles.cabecalhoFoto}
              height={200}
              width={200}
              animation="pulse"
            />
          ) : (
            <Image style={styles.cabecalhoFoto} source={{ uri: imagem }} />
          )}
        </View>
        <FontAwesome5
          style={styles.cabecalhoEdit}
          name="user-edit"
          size={30}
          color="rgb(50,50,50)"
          onPress={escolherImagem}
        />
        {renderiza ? (
          <Skeleton
            style={styles.cabecalhoNome}
            height={30}
            width={250}
            animation="pulse"
          />
        ) : (
          <Text style={styles.cabecalhoNome}>{usuario.nome}</Text>
        )}
      </View>
      <View style={styles.rodape}>
        <Text
          style={styles.rodapeSuporte}
          onPress={() => {
            Linking.openURL("mailto:ifelixl.oliveira@gmail.com");
          }}
        >
          Suporte
        </Text>
        <Text style={styles.rodapeSair} onPress={() => sair()}>
          Sair
        </Text>
        {/* <Text style={styles.rodapeExcluir}>Excluir conta</Text> */}
      </View>
      {/* </ScrollView> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    // backgroundColor: "#003a36",
    backgroundColor: "#99B0AF",
  },

  cabecalho: {
    // backgroundColor: "#99B0AF",
    width: "100%",
    height: 250,
    alignItems: "center",
  },

  cabecalhoFoto: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginTop: 40,
  },

  cabecalhoEdit: {
    position: "absolute",
    top: 210,
    right: 100,
  },

  cabecalhoNome: {
    color: "rgb(50,50,50)",
    fontFamily: "Montserratb",
    fontSize: 25,
    marginTop: 10,
  },

  rodape: {
    position: "absolute",
    bottom: 20,
    alignItems: "center",
    width: "100%",
  },

  rodapeSuporte: {
    color: "rgb(50,50,50)",
    fontFamily: "Montserratb",
    fontSize: 18,
    marginBottom: 20,
  },

  rodapeSair: {
    color: "rgb(50,50,50)",
    fontFamily: "Montserratb",
    fontSize: 18,
    marginBottom: 10,
  },

  rodapeExcluir: {
    color: "red",
    fontFamily: "Montserratb",
    fontSize: 18,
  },
});
