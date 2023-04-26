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
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import MovimentacoesParcial from "./MovimentacoesParcial";
import movimentacoesService from "../../services/MovimentacoesService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Skeleton } from "@rneui/themed";

export default function CarteiraTempoComp(params) {
  const navigation = useNavigation();
  const [movimentacoesArrayConst, setMovimentacoesArrayConst] = useState([]);
  const [valorSeguro, setValorSeguro] = useState(0);
  const [renderiza, setRenderiza] = useState(true);
  const [nada, setNada] = useState(false);

  function listar() {
    AsyncStorage.getItem("USUARIO").then((usuario) => {
      let usuarioInt = JSON.parse(usuario);
      movimentacoesService
        .listar(usuarioInt)
        .then((res) => {
          let conversao = Object.keys(res.data).map((key) => {
            return [String(key), res.data[key]];
          });
          let movimentacoesArray = [];
          conversao.forEach((el, i) => {
            if (i > 1 && el[1] != "") {
              movimentacoesArray.push(el[1]);
            }
          });
          if (movimentacoesArray[0]) {
            let movimentacoesOrdem = [];
            movimentacoesArray.forEach((el, i) => {
              movimentacoesOrdem.unshift(el);
            });
            let primeiraLeva = movimentacoesOrdem.slice(0, 6);
            const meses = [
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
            const dataHoje = new Date();
            const mesHoje = meses[dataHoje.getMonth()];
            let movimentacoesMesValores = [];
            movimentacoesArray.forEach((el, i) => {
              if (i > 0 && el != "") {
                let primeiraSeparacao = el.split(" - ");
                let segundaSeparacao = primeiraSeparacao[2].split("de ");
                let terceiraSeparacao = segundaSeparacao[1].split(",");
                if (terceiraSeparacao[0] == mesHoje) {
                  movimentacoesMesValores.push(Number(primeiraSeparacao[1]));
                }
              }
            });
            setMovimentacoesArrayConst(primeiraLeva);
          } else {
            setNada(true);
          }
          // if (params.paramSobra.receita > 0) {
          //   let somaMes = movimentacoesMesValores.reduce((a, b) => {
          //     return a + b;
          //   });
          //   setValorSeguro(
          //     (
          //       params.paramSobra.receita -
          //       somaMes -
          //       params.paramSobra.custos
          //     ).toLocaleString("pt-BR", {
          //       style: "currency",
          //       currency: "BRL",
          //     })
          //   );
          // }
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }

  useEffect(() => {
    if (renderiza) {
      listar();
    }
    if (movimentacoesArrayConst[0] || nada) {
      setRenderiza(false);
    }
    {
      renderiza
        ? params.setRenderizaTempo(true)
        : params.setRenderizaTempo(false);
    }
  });

  useEffect(() => {
    setRenderiza(true);
    setMovimentacoesArrayConst([]);
  }, [params.atualizar]);

  return (
    <View style={styles.tempo}>
      <Text style={styles.tempoTitulo}>Linha do tempo</Text>
      <View style={styles.tempoForma}>
        <View style={styles.tempoCabecalho}>
          <Entypo
            style={styles.tempoCabecalhoIcone}
            name="shopping-cart"
            size={24}
            color="black"
          />
          <Text style={styles.tempoCabecalhoTitulo}>Despesas variáveis</Text>
          <Entypo
            style={styles.tempoCabecalhoEdit}
            name="dots-three-horizontal"
            size={30}
            color="black"
            onPress={() => navigation.navigate("CarteiraTempo")}
          />
        </View>
        {/* <View style={styles.descricao}>
          <Text style={styles.descicaoTexto}>
            Atualmente, você tem{" "}
            <Text style={styles.descicaoTextoDestaque}>{valorSeguro}</Text>{" "}
            dísponível para gastar
          </Text>
        </View> */}
        <View style={styles.linha}>
          {params.renderizaPag ? (
            <Skeleton
              style={styles.movimentacoesParcialSkeleton}
              height={50}
              width={350}
              animation="pulse"
            />
          ) : (
            <MovimentacoesParcial
              movimentacoesArrayConst={movimentacoesArrayConst}
              tela="Carteira"
            />
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tempo: {
    marginTop: 30,
    marginBottom: 30,
    position: "relative",
    justifyContent: "center",
  },

  tempoForma: {
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: "rgba( 255, 255, 255, 0.8)",
    borderRadius: 10,
    marginTop: 10,
  },

  tempoTitulo: {
    fontFamily: "Montserratb",
    fontSize: 22,
    color: "rgb(50,50,50)",
    marginLeft: 50,
  },

  tempoCabecalho: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginTop: 5,
    paddingLeft: 40,
    paddingRight: 10,
  },

  tempoCabecalhoTitulo: {
    marginLeft: 10,
    fontFamily: "Montserratb",
    fontSize: 14,
    color: "black",
    flex: 1,
  },

  descicaoTexto: {
    marginTop: 20,
    marginLeft: 40,
    marginRight: 40,
    fontFamily: "Montserratn",
    fontSize: 14,
    color: "black",
  },

  descicaoTextoDestaque: {
    fontFamily: "Montserratb",
    fontSize: 14,
    color: "black",
  },

  linha: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
  },

  movimentacoesParcialSkeleton: {
    marginTop: 15,
    marginBottom: 10,
  },
});
