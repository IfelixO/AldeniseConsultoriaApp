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
  Alert,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { Input } from "react-native-elements";
import AddInput from "./componentes/AddInput";
import metaService from "../services/MetaService";
import progressaoService from "../services/ProgressaoService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Skeleton } from "@rneui/themed";

export default function FeedMeta({ route, navigation }) {
  const [usuario, setUsuario] = useState(0);
  const [titulo, setTitulo] = useState(route.params.titulo);
  const [motivacao, setMotivacao] = useState(route.params.motivacao);
  const [progressaoMeta, setProgressaoMeta] = useState(route.params.progressao);
  const [final, setFinal] = useState(route.params.final);
  const [inicial, setInicial] = useState(route.params.inicial);
  const [previsao, setPrevisao] = useState(route.params.previsao);
  const [parcela, setParcela] = useState(route.params.parcela);
  const [entradasConst, setEntradasConst] = useState([]);
  const [entradasConstR, setEntradasConstR] = useState([]);
  const [finalNumero, setFinalNumero] = useState(0);
  const [renderiza, setRenderiza] = useState(true);
  const [nada, setNada] = useState(false);

  function listar() {
    AsyncStorage.getItem("USUARIO").then((usuario_res) => {
      let usuarioInt = JSON.parse(usuario_res);
      setUsuario(usuarioInt);
      metaService
        .achar(usuarioInt)
        .then((resM) => {
          {
            resM.data.titulo != "" ? setTitulo(resM.data.titulo) : null;
          }
          {
            resM.data.motivacao != ""
              ? setMotivacao(resM.data.motivacao)
              : null;
          }
          if (resM.data.final != "") {
            setFinal(resM.data.final);
          }
          {
            resM.data.inicial != "" ? setInicial(resM.data.inicial) : null;
          }
          {
            resM.data.parcela != "" ? setParcela(resM.data.parcela) : null;
          }
          progressaoService
            .listar(usuarioInt)
            .then((resP) => {
              let conversao = Object.keys(resP.data).map((key) => {
                return [String(key), resP.data[key]];
              });
              let entradasArray = [];
              conversao.forEach((el, i) => {
                if(el != '' && i != 1){
                  entradasArray.push(el[1]);
                }
              });
              let soma = inicial.replace("R$", "");
              soma = soma.replace(".", "");
              soma = Number(soma.replace(",", "."));
              let valores = [];
              entradasArray.forEach((el, i) => {
                let separacao;
                if (i > 0 && el != "") {
                  separacao = el.split("- ");
                  valores.push(separacao[1]);
                }
              });
              if (valores[0]) {
                valores.forEach((el, i) => {
                  soma = soma + Number(el);
                });
                setEntradasConstR(entradasArray);
              } else {
                setNada(true);
              }
              setEntradasConst(entradasArray);
              setProgressaoMeta(soma);
              let finalN = final.replace("R$", "");
              finalN = finalN.replace(".", "");
              finalN = Number(finalN.replace(",", "."));
              setFinalNumero(finalN);
              let parcelaNumero = resM.data.parcela.replace("R$", "");
              parcelaNumero = parcelaNumero.replace(".", "");
              parcelaNumero = Number(parcelaNumero.replace(",", "."));
              setPrevisao(
                Math.round((finalN - progressaoMeta) / parcelaNumero)
              );
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }

  function handleAddParcela(parcela) {
    if (parcela && parcela + progressaoMeta < finalNumero) {
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
      let entradaHoje = dataHoje + " - " + parcela;
      let parada;
      let entradasAtualizadas = entradasConst.map((el, i) => {
        if (el != "") {
          return el;
        }
        if (el == "" && parada != 1) {
          parada = 1;
          return entradaHoje;
        }
        if (parada == 1) {
          return "";
        }
      });
      
      let data = {
        id: entradasAtualizadas[0],
        entrada1: entradasAtualizadas[1],
        entrada2: entradasAtualizadas[2],
        entrada3: entradasAtualizadas[3],
        entrada4: entradasAtualizadas[4],
        entrada5: entradasAtualizadas[5],
        entrada6: entradasAtualizadas[6],
        entrada7: entradasAtualizadas[7],
        entrada8: entradasAtualizadas[8],
      };
      progressaoService
        .atualizar(data)
        .then((res) => {
          setRenderiza(true);
          setEntradasConstR([]);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    if (parcela && parcela + progressaoMeta >= finalNumero) {
      // console.log(parcela, progressaoMeta, finalNumero);
      Alert.alert("Insersão negada", "Parcela excede valor restante");
    }
  }

  function resetar() {
    progressaoService
      .resetar(usuario)
      .then((res) => {
        listar();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    if (renderiza) {
      listar();
    }
    if (entradasConstR[0] || nada) {
      setRenderiza(false);
    }
  });

  return (
    <SafeAreaView style={styles.tela}>
      <StatusBar barStyle="light-content" backgroundColor="#032140" />
      <ScrollView>
        <TouchableOpacity
          style={styles.voltar}
          onPress={() => {
            navigation.goBack({});
          }}
        >
          <Entypo name="back" size={30} color="rgb(75, 75, 75)" />
        </TouchableOpacity>
        <Text style={styles.titulo}>Progressão</Text>
        {renderiza ? (
          <View style={styles.cabecalho}>
            <View style={styles.cabecalhoTitulo}>
              <Skeleton
                style={styles.cabecalhoTituloTexto}
                height={20}
                width={150}
                animation="pulse"
              />
              {/* <Entypo
                style={styles.cabecalhoTituloEdit}
                name="edit"
                size={16}
                color="rgb(75, 75, 75)"
                onPress={() =>
                  navigation.navigate("ConfigurarMeta", {
                    tituloMeta: titulo,
                    final: final,
                    inicial: inicial,
                    parcela: parcela,
                    motivacao: motivacao,
                    tela: "FeedMeta",
                  })
                }
              /> */}
            </View>
            <Skeleton
              style={styles.cabecalhoProgressao}
              height={20}
              width={250}
              animation="pulse"
            />
            <Text style={styles.cabecalhoPrevisaoTitulo}>
              Roda financeira
            </Text>
            <Skeleton
              style={styles.cabecalhoPrevisaoValor}
              height={20}
              width={350}
              animation="pulse"
            />
          </View>
        ) : (
          <View style={styles.cabecalho}>
            <View style={styles.cabecalhoTitulo}>
              <Text style={styles.cabecalhoTituloTexto}>{titulo}</Text>
              {/* <Entypo
                style={styles.cabecalhoTituloEdit}
                name="edit"
                size={16}
                color="rgb(75, 75, 75)"
                onPress={() =>
                  navigation.navigate("ConfigurarMeta", {
                    tituloMeta: titulo,
                    final: final,
                    inicial: inicial,
                    parcela: parcela,
                    motivacao: motivacao,
                    tela: "FeedMeta",
                  })
                }
              /> */}
            </View>
            <Text style={styles.cabecalhoProgressao}>
              {progressaoMeta.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}{" "}
              // {final}
            </Text>
            <Text style={styles.cabecalhoPrevisaoTitulo}>
              Previsão de conclusão
            </Text>
            <Text style={styles.cabecalhoPrevisaoValor}>
              {previsao} meses com {parcela} ao mês
            </Text>
          </View>
        )}
        <AddInput
          tela="FeedMeta"
          item="parcela"
          handleAddParcela={handleAddParcela}
        />

        {renderiza ? (
          <Skeleton
            style={styles.linhaSkeleton}
            height={30}
            animation="pulse"
          />
        ) : (
          <View style={styles.linha}>
            {entradasConst[1]
              ? entradasConst.map((el, i) => {
                  if (i > 0 && el) {
                    let separacao = el.split("- ");
                    return (
                      <View style={styles.linhaItem} key={i}>
                        <Text style={styles.linhaItemData}>{separacao[0]}</Text>
                        <Text style={styles.linhaItemValor}>
                          {Number(separacao[1]).toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          })}
                        </Text>
                      </View>
                    );
                  }
                })
              : null}
          </View>
        )}
        <TouchableOpacity style={styles.botao} onPress={() => resetar()}>
          <Text style={styles.textoBotao}>Reiniciar progressão</Text>
        </TouchableOpacity>
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
    color: "rgb(50, 50, 50)",
    fontFamily: "Montserratb",
    fontSize: 33,
    textAlign: "center",
    marginTop: 40,
  },

  cabecalho: {
    marginTop: 25,
    alignItems: "center",
  },

  cabecalhoTitulo: {
    flexDirection: "row",
    marginLeft: 25,
    alignItems: "center",
  },

  cabecalhoTituloTexto: {
    color: "rgb(75, 75, 75)",
    fontFamily: "Montserratb",
    fontSize: 16,
    textAlign: "center",
    marginRight: 10,
  },

  cabecalhoProgressao: {
    marginTop: 5,
    color: "rgb(75, 75, 75)",
    fontFamily: "Montserratn",
    fontSize: 16,
    textAlign: "center",
  },

  cabecalhoPrevisaoTitulo: {
    marginTop: 10,
    color: "rgb(75, 75, 75)",
    fontFamily: "Montserratb",
    fontSize: 16,
    textAlign: "center",
  },

  cabecalhoPrevisaoValor: {
    marginTop: 5,
    color: "rgb(75, 75, 75)",
    fontFamily: "Montserratn",
    fontSize: 16,
    textAlign: "center",
  },

  linha: {
    alignItems: "center",
    marginTop: 10,
  },

  linhaSkeleton: {
    marginTop: 20,
    alignSelf: "center",
    width: "90%",
    borderRadius: 10,
  },

  linhaItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "90%",
    backgroundColor: "rgba( 255, 255, 255, 0.8)",
    borderRadius: 10,
    padding: 5,
    marginTop: 10,
  },

  linhaItemData: {
    color: "black",
    fontFamily: "Montserratn",
    fontSize: 16,
    // textAlign: 'center',
    marginLeft: 10,
  },

  linhaItemValor: {
    color: "#00958D",
    fontFamily: "Montserratb",
    fontSize: 16,
    // textAlign: 'center',
    marginRight: 10,
  },

  botao: {
    backgroundColor: "rgb(150,0,0)",
    width: "50%",
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
    alignSelf: "center",
  },

  textoBotao: {
    color: "#FFF",
    fontSize: 15,
    fontFamily: "Montserratb",
  },
});
