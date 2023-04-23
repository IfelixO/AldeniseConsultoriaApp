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
  StatusBar,
  ActivityIndicator,
  ImageBackground,
} from "react-native";
import { Input } from "react-native-elements";
import usuarioService from "../../services/UsuarioService";

export default function LoginFormCodigo(params) {
  const [erroLogin, setErroLogin] = useState(null);
  const [erroSenha, setErroSenha] = useState(null);
  const [erroSenhaR, setErroSenhaR] = useState(null);
  const [login, setLogin] = useState(null);
  const [senha, setSenha] = useState(null);
  const [senhaR, setSenhaR] = useState(null);

  async function cadastrar() {
    let erro = false;
    let data = {
      login: login,
      senha: senha,
    };
    if (!login) {
      erro = true;
      setErroLogin("Preencha um login válido");
    }
    if (senha.length < 8) {
      erro = true;
      setErroSenha("Preencha uma senha válida");
    }
    if (senha != senhaR) {
      erro = true;
      setErroSenhaR("As senhas não coicidem");
    }
    return usuarioService
      .achar(data)
      .then((res) => {
        if (res.data) {
          erro = true;
          setErroLogin("Esse login já existe");
        }
        if (!erro) {
          let data = {
            id: params.usuario.id,
            login: login,
            senha: senha,
          };
          usuarioService
            .atualizar(data)
            .then((res) => {
              let usuario = {
                id: params.usuario.id,
                perfil: params.usuario.perfil,
                nome: params.usuario.nome
              }
              params.cuidarCadastrar(usuario)
            })
            .catch((err) => {
              console.log(err);
            });
          return true;
        } else {
          return false;
        }
      })
      .catch((err) => {
        return false;
      });
  }

  return (
    <View style={styles.conteinerC}>
      <Text style={styles.titulo}>Bem vindo(a) {params.usuario.nome} </Text>
      <Input
        style={styles.input}
        placeholder="Login"
        autoCorrect={false}
        onChangeText={(value) => {
          setErroLogin(null);
          setLogin(value);
        }}
      />
      <Text style={styles.erro}>{erroLogin} </Text>
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
      <Text style={styles.erro}>{erroSenha} </Text>
      <Input
        style={styles.input}
        secureTextEntry={true}
        placeholder="Repita a senha"
        autoCorrect={false}
        onChangeText={(value) => {
          setErroSenhaR(null);
          setSenhaR(value);
        }}
      />
      <Text style={styles.erro}>{erroSenhaR} </Text>
      <TouchableOpacity
        style={styles.bt}
        onPress={() => {
          cadastrar();
        }}
      >
        <Text style={styles.textoBt}>Cadastrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  conteinerC: {
    flexDirection: "column",
    alignItems: "center",
    marginTop: 30,
    width: 300,
  },

  titulo: {
    color: "white",
    fontSize: 20,
    marginTop: -15,
    marginBottom: 20,
  },

  input: {
    color: "white",
    fontSize: 15,
    paddingLeft: 10,
  },

  erro: {
    color: "red",
    fontSize: 12,
    marginTop: -20,
  },

  bt: {
    backgroundColor: "#003a36",
    width: "80%",
    height: 50,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    marginTop: 5,
  },

  bt2: {
    height: 50,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
  },

  textoBt: {
    color: "#FFF",
    fontSize: 15,
    fontFamily: "Montserratb",
    height: 50,
    textAlignVertical: "center",
  },
});
