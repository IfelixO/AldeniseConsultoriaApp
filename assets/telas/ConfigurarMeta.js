import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  StatusBar,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Input } from "react-native-elements";
import { TextInputMask } from "react-native-masked-text";
import { Entypo, FontAwesome } from "@expo/vector-icons";
import metaService from "../services/MetaService";
import progressaoService from "../services/ProgressaoService";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ConfigurarMeta({ navigation, route }) {
  const [erroTitulo, setErroTitulo] = useState(null);
  const [erroMotivacao, setErroMotivacao] = useState(null);
  const [erroInicial, setErroInicial] = useState(null);
  const [erroFinal, setErroFinal] = useState(null);
  const [erroParcela, setErroParcela] = useState(null);

  const [novoTitulo, setNovoTitulo] = useState();
  const [novoMotivacao, setNovoMotivacao] = useState();
  const [novoInicial, setNovoInicial] = useState();
  const [novoFinal, setNovoFinal] = useState();
  const [novoParcela, setNovoParcela] = useState();

  const [carregando, setCarregando] = useState(false);
  const [confirma, setConfirma] = useState(false);

  const [placeholderTitulo, setPlaceholderTitulo] =
    useState("Uso para o valor");
  const [placeholderMotivacao, setPlaceholderMotivacao] =
    useState("Razão para o uso");
  const [placeholderInicial, setPlaceholderincial] = useState("0");
  const [placeholderFinal, setPlaceholderFinal] = useState("0");
  const [placeholderParcela, setPlaceholderParcela] = useState("0");

  function validar() {
    let erro = false;
    if (!novoTitulo) {
      setErroTitulo("Defina o título do objetivo");
      erro = true;
    }
    if (!novoMotivacao) {
      setErroMotivacao("Defina a motivação do objetivo");
      erro = true;
    }
    if (!novoFinal) {
      setErroFinal("Defina uma valor válido");
      erro = true;
    }
    if (novoParcela == 0) {
      setErroParcela("Defina uma valor válido");
      erro = true;
    }
    if (novoFinal <= novoInicial) {
      setErroFinal("O valor final precisa ser maior que o inicial");
      erro = true;
    }
    if (novoParcela >= novoFinal) {
      setErroParcela("O valor da parcela precisa ser menor que o valor final");
      erro = true;
    }
    return !erro;
  }

  function salvar() {
    if (validar()) {
      setCarregando(true);
      AsyncStorage.getItem("USUARIO").then((usuario) => {
        let usuarioObj = JSON.parse(usuario);
        let data = {
          titulo: novoTitulo.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          }),
          motivacao: novoMotivacao.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          }),
          inicial: novoInicial.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          }),
          final: novoFinal.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          }),
          parcela: novoParcela.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          }),
          id: usuarioObj.id,
        };

        if (route.params.tela == "FeedMeta") {
          metaService
            .configurar(data)
            .then((res) => {
              progressaoService
                .resetar(data)
                .then((res) => {
                  setCarregando(false);
                  setConfirma(true);
                  navigation.reset({
                    index: 0,
                    routes: [{ name: "Feed" }],
                  });
                })
                .catch((err) => {
                  console.log(err);
                });
            })
            .catch((err) => {
              console.log(err);
              setCarregando(false);
            });
        }
      });
    }
  }

  function definirNovoInicial(value) {
    value = value.replace("R$", "");
    value = value.replace(".", "");
    value = value.replace(",", ".");
    setNovoInicial(Number(value));
  }

  function definirNovoFinal(value) {
    value = value.replace("R$", "");
    value = value.replace(".", "");
    value = value.replace(",", ".");
    setNovoFinal(Number(value));
  }

  function definirNovoParcela(value) {
    value = value.replace("R$", "");
    value = value.replace(".", "");
    value = value.replace(",", ".");
    setNovoParcela(Number(value));
  }

  useEffect(() => {
    if (route.params.tela == "FeedMeta") {
      setPlaceholderTitulo(route.params.tituloMeta);
      setPlaceholderMotivacao(route.params.motivacao);
      setPlaceholderincial(route.params.inicial);
      setPlaceholderFinal(route.params.final);
      setPlaceholderParcela(route.params.parcela);
    }
  });

  return (
    <SafeAreaView style={styles.tela}>
      <StatusBar barStyle="light-content" backgroundColor="#032140" />
      <ScrollView>
        {route.params.tela == "FeedMeta" ? (
          <TouchableOpacity
            style={styles.voltar}
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Entypo name="back" size={30} color="rgb(75, 75, 75)" />
          </TouchableOpacity>
        ) : null}
        <Text style={styles.titulo}>Objetivo</Text>
        <View style={styles.form}>
          <View style={styles.formCategoria}>
            <Text style={styles.formLabel}>Título do objetivo</Text>
            <Input
              style={styles.formInput}
              placeholder={placeholderTitulo}
              autoCorrect={false}
              onChangeText={(value) => {
                setNovoTitulo(value);
                setErroTitulo(null);
                setConfirma(false);
              }}
            />
            <Text style={styles.erroText}>{erroTitulo}</Text>
          </View>
          <View style={styles.formCategoria}>
            <Text style={styles.formLabel}>Motivação</Text>
            <Input
              placeholder={placeholderMotivacao}
              style={styles.formInput}
              autoCorrect={false}
              onChangeText={(value) => {
                setErroMotivacao(null);
                setNovoMotivacao(value);
                setConfirma(false);
              }}
            />
            <Text style={styles.erroText}>{erroMotivacao}</Text>
          </View>
          <View style={styles.formCategoria}>
            <Text style={styles.formLabel}>Valor inicial</Text>
            <TextInputMask
              type={"money"}
              value={novoInicial}
              style={styles.formInputMask}
              placeholder={placeholderInicial}
              autoCorrect={false}
              onChangeText={(value) => {
                definirNovoInicial(value);
                setErroInicial(null);
                setConfirma(false);
              }}
              keyboardType="number-pad"
            />
            <Text style={styles.erroValor}>{erroInicial}</Text>
          </View>
          <View style={styles.formCategoria}>
            <Text style={styles.formLabel}>Valor final</Text>
            <TextInputMask
              type={"money"}
              value={novoFinal}
              style={styles.formInputMask}
              placeholder={placeholderFinal}
              autoCorrect={false}
              onChangeText={(value) => {
                definirNovoFinal(value);
                setErroFinal(null);
                setConfirma(false);
              }}
              keyboardType="number-pad"
            />
            <Text style={styles.erroValor}>{erroFinal}</Text>
          </View>
          <View style={styles.formCategoria}>
            <Text style={styles.formLabel}>Valor de parcela pretendido</Text>
            <TextInputMask
              type={"money"}
              value={novoParcela}
              style={styles.formInputMask}
              placeholder={placeholderParcela}
              autoCorrect={false}
              onChangeText={(value) => {
                definirNovoParcela(value);
                setErroParcela(null);
                setConfirma(false);
              }}
              keyboardType="number-pad"
            />
            <Text style={styles.erroValor}>{erroParcela}</Text>
          </View>

          {!carregando && !confirma ? (
            <TouchableOpacity style={styles.botao} onPress={() => salvar()}>
              <Text style={styles.textoBotao}>Configurar Objetivo</Text>
            </TouchableOpacity>
          ) : null}
          {!carregando && confirma ? (
            <TouchableOpacity style={styles.botao} onPress={() => salvar()}>
              <Text style={styles.textoBotao}>Configurar objetivo novamente</Text>
            </TouchableOpacity>
          ) : null}
          {carregando ? <ActivityIndicator /> : null}
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

  titulo: {
    color: "rgb(75, 75, 75)",
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
    color: "rgb(75, 75, 75)",
    fontFamily: "Montserratb",
    fontSize: 18,
    textAlign: "left",
    // marginTop: 15,
  },

  formInput: {
    // backgroundColor: "#DFE0DF",
    color: "#222",
    fontSize: 15,
    borderRadius: 6,
    fontFamily: "Montserratb",
    textAlign: "left",
    marginTop: 10,
    padding: 5,
    paddingLeft: 10,
  },

  formInputMask: {
    // backgroundColor: "#DFE0DF",
    borderBottomColor: "#8d8d8d",
    borderBottomWidth: 1,
    color: "#222",
    width: 330,
    fontSize: 15,
    // borderRadius: 6,
    fontFamily: "Montserratb",
    textAlign: "left",
    marginTop: 10,
    // marginLeft: 10,
    padding: 5,
    paddingLeft: 10,
    alignSelf: "center",
  },

  botao: {
    backgroundColor: "#003a36",
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

  erroValor: {
    color: "red",
    fontSize: 10,
    fontFamily: "Montserratn",
    marginTop: 5,
    marginBottom: 15,
    marginLeft: 20,
  },
});
