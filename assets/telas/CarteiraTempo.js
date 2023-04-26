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
import AddInput from "./componentes/AddInput";
import movimentacoesService from "../services/MovimentacoesService";
import MovimentacoesParcial from "./componentes/MovimentacoesParcial";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Skeleton } from "@rneui/themed";

export default function CarteiraTempo({ navigation, route }) {
  const [usuario, setUsuario] = useState(0);
  const [movimentacoesArrayConst1, setMovimentacoesArrayConst1] = useState([]);
  const [movimentacoesArrayConst2, setMovimentacoesArrayConst2] = useState([]);
  const [movimentacoesArrayOriginal, setMovimentacoesArrayOriginal] =
    useState();
  const [visibilidade, setVisibilidade] = useState(false);
  const [renderiza, setRenderiza] = useState(true);
  const [nada, setNada] = useState(false);

  function listar() {
    AsyncStorage.getItem("USUARIO").then((usuario_res) => {
      let usuarioInt = JSON.parse(usuario_res);
      setUsuario(usuarioInt);
      movimentacoesService
        .listar(usuarioInt)
        .then((res) => {
          let conversao = Object.keys(res.data).map((key) => {
            return [String(key), res.data[key]];
          });
          let movimentacoesArray = [];
          for (let i = 0; i < 33; i++) {
            movimentacoesArray[i] = conversao[i][1];
          }
          let movimentacoesOrdem = [];
          movimentacoesArray.forEach((el, i) => {
            if (i > 1 && el != undefined && el != "") {
              movimentacoesOrdem.unshift(el);
            }
          });
          let primeiraLeva = movimentacoesOrdem.slice(0, 16);
          let segundaLeva = movimentacoesOrdem.slice(16, 33);
          if(primeiraLeva[0]){
            setMovimentacoesArrayConst1(primeiraLeva);

          } else {
            setNada(true)
          }
          if (segundaLeva[0]) {
            setMovimentacoesArrayConst2(segundaLeva);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }

  function handleAddMovimentacao(valor, nome, tipo) {
    if (valor && nome && tipo) {
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
      let movimentacaoHoje =
        nome + " - " + valor + " - " + dataHoje + " - " + tipo;

      let movimentacoesTodas = movimentacoesArrayConst1;
      {
        movimentacoesArrayConst2
          ? movimentacoesArrayConst2.forEach((el) => {
              movimentacoesTodas.push(el);
            })
          : null;
      }
      let movimentacoesOrdem = [];
      movimentacoesTodas.forEach((el, i) => {
        if (i > 0 && el != undefined && el != "") {
          movimentacoesOrdem.unshift(el);
        }
      });
      movimentacoesOrdem.push(movimentacaoHoje);

      let data = {
        id: usuario.id,
        entrada1: movimentacoesOrdem[0] || '',
        entrada2: movimentacoesOrdem[1] || '',
        entrada3: movimentacoesOrdem[2] || '',
        entrada4: movimentacoesOrdem[3] || '',
        entrada5: movimentacoesOrdem[4] || '',
        entrada6: movimentacoesOrdem[5] || '',
        entrada7: movimentacoesOrdem[6] || '',
        entrada8: movimentacoesOrdem[7] || '',
        entrada9: movimentacoesOrdem[8] || '',
        entrada10: movimentacoesOrdem[9] || '',
        entrada11: movimentacoesOrdem[10] || '',
        entrada12: movimentacoesOrdem[11] || '',
        entrada13: movimentacoesOrdem[12] || '',
        entrada14: movimentacoesOrdem[13] || '',
        entrada15: movimentacoesOrdem[14] || '',
        entrada16: movimentacoesOrdem[15] || '',
        entrada17: movimentacoesOrdem[16] || '',
        entrada18: movimentacoesOrdem[17] || '',
        entrada19: movimentacoesOrdem[18] || '',
        entrada20: movimentacoesOrdem[19] || '',
        entrada21: movimentacoesOrdem[20] || '',
        entrada22: movimentacoesOrdem[21] || '',
        entrada23: movimentacoesOrdem[22] || '',
        entrada24: movimentacoesOrdem[23] || '',
        entrada25: movimentacoesOrdem[24] || '',
        entrada26: movimentacoesOrdem[25] || '',
        entrada27: movimentacoesOrdem[26] || '',
        entrada28: movimentacoesOrdem[27] || '',
        entrada29: movimentacoesOrdem[28] || '',
        entrada30: movimentacoesOrdem[29] || '',
        entrada31: movimentacoesOrdem[30] || '',
        entrada32: movimentacoesOrdem[31] || '',
      };
      // console.log(data);
      movimentacoesService
        .atualizar(data)
        .then((res) => {
          setRenderiza(true);
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
    if (movimentacoesArrayConst1[0] || nada) {
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
            navigation.goBack();
          }}
        >
          <Entypo name="back" size={30} color="rgb(50, 50, 50)" />
        </TouchableOpacity>
        <Text style={styles.titulo}>Despesas variáveis</Text>
        <AddInput
          tela="CarteiraTempo"
          cor="#99B0AF"
          item="movimentação"
          handleAddMovimentacao={handleAddMovimentacao}
        />
        {renderiza ? (
          <Skeleton
            style={styles.linhaSkeleton}
            height={60}
            animation="pulse"
          />
        ) : (
          <View style={styles.linha}>
            <MovimentacoesParcial
              movimentacoesArrayConst={movimentacoesArrayConst1}
              tela="CarteiraTempo"
            />
            {movimentacoesArrayConst2[0] ? (
              <TouchableOpacity
                style={styles.botao}
                onPress={() => {
                  setVisibilidade(!visibilidade);
                }}
              >
                {visibilidade ? (
                  <Text style={styles.textoBotao}>Mostrar menos</Text>
                ) : (
                  <Text style={styles.textoBotao}>Mostrar mais</Text>
                )}
              </TouchableOpacity>
            ) : null}

            {visibilidade ? (
              <MovimentacoesParcial
                movimentacoesArrayConst={movimentacoesArrayConst2}
                tela="CarteiraTempo"
              />
            ) : null}
          </View>
        )}
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

  linha: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 50,
  },

  linhaSkeleton :{
    marginBottom: 50,
    marginTop: 20,
    borderRadius: 10,
    width: "90%",
    alignSelf: 'center'
  },

  botao: {
    width: 150,
    height: 25,
    backgroundColor: "#003a36",
    justifyContent: "center",
    borderRadius: 10,
    marginTop: 30,
  },

  textoBotao: {
    color: "white",
    fontFamily: "Montserratb",
    fontSize: 15,
    textAlign: "center",
  },
});
