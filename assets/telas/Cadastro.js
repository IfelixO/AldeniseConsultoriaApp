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
  ActivityIndicator,
} from "react-native";
import { Input } from "react-native-elements";
import usuarioService from "../services/UsuarioService";
import progressaoService from "../services/ProgressaoService";
import metaService from "../services/MetaService";
import custosService from "../services/CustosService";
import movimentacoesService from "../services/MovimentacoesService";

export default function Cadastro({ navigation, route }) {
  const [nome, setNome] = useState();
  const [login, setLogin] = useState();
  const [senha, setSenha] = useState();
  const [senhaR, setSenhaR] = useState();

  const [erroNome, setErroNome] = useState();
  const [erroLogin, setErroLogin] = useState();
  const [erroSenha, setErroSenha] = useState();
  const [erroSenhaR, setErroSenhaR] = useState();

  const [carregando, setCarregando] = useState(false);

  function validar() {
    // navigation.navigate("Informativo");
    let data = {
      nome: nome,
      login: login,
      senha: senha,
    };
    let erro = false;
    if (!nome) {
      setErroNome("Preencha seu nome");
      erro = true;
    }
    if (!login) {
      setErroLogin("Defina um login válido");
      erro = true;
    }
    if (!senha) {
      setErroSenha("Preencha sua senha");
      erro = true;
    }
    if (senhaR != senha) {
      setErroSenhaR("As senhas precisam ser iguais");
      erro = true;
    }
    if (!erro) {
      setCarregando(true)
      usuarioService
        .adicionar(data)
        .then((res) => {
          console.log(res.data);
          let usuario = {
            id: res.data.id,
          };
          progressaoService
            .adicionar(usuario)
            .then((res) => {
              metaService
                .adicionar(usuario)
                .then((res) => {
                  custosService
                    .adicionar(usuario)
                    .then((res) => {
                      movimentacoesService
                        .adicionar(usuario)
                        .then((res) => {
                          navigation.reset({
                            index: 0,
                            routes: [
                              {
                                name: "Informativo",
                                params: { nome: usuario.nome, id: usuario.id },
                              },
                            ],
                          });
                        })
                        .catch((err) => {
                          console.log(err);
                        });
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                })
                .catch((err) => {
                  console.log(err);
                });
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  return (
    <SafeAreaView style={styles.tela}>
      <StatusBar barStyle="light-content" backgroundColor="#032140" />
      <ScrollView>
        <Text style={styles.titulo}>Registre-se</Text>
        <View style={styles.form}>
          <View style={styles.formCategoria}>
            <Text style={styles.formLabel}>Nome</Text>
            <Input
              style={styles.formInput}
              placeholder="Primeiro nome e último sobrenome"
              autoCorrect={false}
              onChangeText={(value) => {
                setNome(value);
              }}
            />

            <Text style={styles.erroText}>{erroNome}</Text>
          </View>
          <View style={styles.formCategoria}>
            <Text style={styles.formLabel}>Login</Text>
            <Input
              placeholder="Login único"
              style={styles.formInput}
              autoCorrect={false}
              onChangeText={(value) => {
                setLogin(value);
              }}
            />
            <Text style={styles.erroText}>{erroLogin}</Text>
          </View>
          <View style={styles.formCategoria}>
            <Text style={styles.formLabel}>Senha</Text>
            <Input
              secureTextEntry={true}
              placeholder="Senha forte"
              style={styles.formInput}
              autoCorrect={false}
              onChangeText={(value) => {
                setSenha(value);
              }}
            />
            <Text style={styles.erroText}>{erroSenha}</Text>
          </View>
          <View style={styles.formCategoria}>
            <Text style={styles.formLabel}>Repita a senha</Text>
            <Input
              secureTextEntry={true}
              placeholder="Senha forte"
              style={styles.formInput}
              autoCorrect={false}
              onChangeText={(value) => {
                setSenhaR(value);
              }}
            />
            <Text style={styles.erroText}>{erroSenhaR}</Text>
          </View>
          {!carregando ? (
            <TouchableOpacity style={styles.botao} onPress={() => validar()}>
              <Text style={styles.textoBotao}>Próximo</Text>
            </TouchableOpacity>
          ) : (
            <ActivityIndicator />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: "#8597BF",
  },

  titulo: {
    color: "white",
    fontFamily: "Montserratb",
    fontSize: 33,
    textAlign: "center",
    marginTop: 20,
  },

  form: {
    alignItems: "center",
    marginTop: 25,
  },

  formCategoria: {
    width: "100%",
    paddingLeft: 20,
    paddingRight: 20,
  },

  formLabel: {
    paddingLeft: 20,
    color: "white",
    fontFamily: "Montserratb",
    fontSize: 18,
    textAlign: "left",
    // marginTop: 15,
  },

  formInput: {
    backgroundColor: "#DFE0DF",
    color: "#222",
    fontSize: 15,
    borderRadius: 6,
    fontFamily: "Montserratb",
    textAlign: "left",
    marginTop: 10,
    padding: 5,
    paddingLeft: 10,
  },

  botao: {
    backgroundColor: "#032140",
    width: "90%",
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },

  textoBotao: {
    color: "#FFF",
    fontSize: 15,
    fontFamily: "Montserratb",
  },

  erroText: {
    color: "red",
    fontSize: 10,
    fontFamily: "Montserratn",
    marginTop: -22,
    marginBottom: 15,
    marginLeft: 20,
  },
});
