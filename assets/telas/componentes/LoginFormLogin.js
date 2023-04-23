import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
  Keyboard,
  ActivityIndicator,
} from "react-native";
import { Input } from "react-native-elements";
import usuarioService from "../../services/UsuarioService";

export default function LoginFormLogin(params) {
  const [erroSenha, setErroSenha] = useState(null);
  const [carregando, setCarregando] = useState(false);
  const [login, setLogin] = useState();
  const [senha, setSenha] = useState();
  const [margin, setMargin] = useState(0);

  function tecladoEntra() {
    setMargin(-100);
  }

  function tecladoSai() {
    setMargin(0);
  }

  useEffect(() => {
    keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      tecladoEntra
    );
    KeyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      tecladoSai
    );
  });

  function entrar() {
    setCarregando(true);
    let data = {
      username: login,
      password: senha,
    };

    usuarioService
      .login(data)
      .then((res) => {
        setCarregando(false);

        let usuario = {
          id: res.data.idUsuario,
          nome: res.data.usuario,
          perfil: res.data.perfil,
          descricaoSaude: res.data.descricaoSaude,
          descricaoAnalise: res.data.descricaoAnalise
        };
        params.cuidarEntrar(usuario);
      })
      .catch((err) => {
        setCarregando(false);
        setErroSenha("Login e/ou senha incorretos");
        console.log(err);
      });
  }

  return (
    <View style={styles.inputs}>
      <Input
        style={styles.input}
        placeholder="Login"
        autoCorrect={false}
        onChangeText={(value) => {
          setErroSenha(null);
          setLogin(value);
        }}
      />
      <Input
        style={styles.input}
        secureTextEntry={true}
        placeholder="Senha"
        autoCorrect={false}
        onChangeText={(value) => {
          setErroSenha(null);
          setSenha(value);
        }}
      />
      <Text style={styles.erro}>{erroSenha}</Text>

      {!carregando ? (
        <TouchableOpacity
          style={{
            backgroundColor: "#003a36",
            width: "90%",
            height: 50,
            borderRadius: 6,
            justifyContent: "center",
            alignItems: "center",
            marginBottom: margin,
          }}
          onPress={() => entrar()}
        >
          <Text style={styles.textoAcessar}>Acessar</Text>
        </TouchableOpacity>
      ) : (
        <ActivityIndicator style={styles.carregando} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  carregando:{
    marginBottom: -20,
  },

  inputs: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: 300,
    gap: 15,
  },

  input: {
    fontSize: 15,
    paddingLeft: 10,
    fontFamily: "Montserratb",
    color: "white",
  },

  textoAcessar: {
    color: "#FFF",
    fontSize: 15,
    fontFamily: "Montserratb",
    height: 50,
    textAlignVertical: "center",
  },

  erro: {
    color: "red",
    fontSize: 12,
    fontFamily: "Montserratn",
    marginTop: -35,
    marginBottom: 15,
    marginLeft: 20,
    alignSelf: "flex-start",
  },
});
