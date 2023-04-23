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
import custosService from "../services/CustosService";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function FeedSaude({ navigation, route }) {
  const [receita, setReceita] = useState(0);
  const [custos, setCustos] = useState(0);
  const [porcentagem, setPorcentagem] = useState(0);
  const [dividas, setDividas] = useState(0);
  const [patromonio, setPatrimonio] = useState(0);
  const [mesesRenda, setMesesRenda] = useState(0);

  const [nota2, setNota2] = useState("");
  const [nota3, setNota3] = useState("");
  const [nota4, setNota4] = useState("");

  function listar() {
    AsyncStorage.getItem("USUARIO").then((usuario) => {
      custosService
        .listar(JSON.parse(usuario))
        .then((res) => {
          let conversao = Object.keys(res.data).map((key) => {
            return [String(key), res.data[key]];
          });
          let custosArray = [];
          conversao.forEach((el, i) => {
            custosArray[i] = conversao[i][1];
          });
          let soma = 0;
          let valores = custosArray.map((el, i) => {
            let separacao;
            if (i > 1 && el != "") {
              separacao = el.split("- ");
              return separacao[1];
            }
          });
          valores.forEach((el, i) => {
            {
              i != 0 && el ? (soma = soma + Number(el)) : null;
            }
          });
          let receitaN = Number(custosArray.splice(1, 1));
          setReceita(
            receitaN.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })
          );
          setCustos(
            Number(soma).toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })
          );
          setPorcentagem((soma / (receitaN / 100)).toFixed(2));
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }

  useEffect(() => {
    listar();
  }, []);

  return (
    <SafeAreaView style={styles.tela}>
      <StatusBar barStyle="light-content" backgroundColor="#032140" />
      <ScrollView>
        <TouchableOpacity
          style={styles.voltar}
          onPress={() => {
            navigation.goBack()
          }}
        >
          <Entypo name="back" size={30} color="white" />
        </TouchableOpacity>
        <View style={styles.cabecalho}>
          <Text style={styles.cabecalhoTitulo}>Indicadores financeiros</Text>
          <Text style={styles.cabecalhoDescricao}>
            Valor da receita e custos representa uma média dos últimos três
            meses
          </Text>
        </View>
        <View style={styles.indicador}>
          <Text style={styles.indicadorLabel}>Receita</Text>
          <Text style={styles.indicadorCampo}>{receita}</Text>
        </View>
        <View style={styles.indicador}>
          <Text style={styles.indicadorLabel}>Custos</Text>
          <Text style={styles.indicadorCampo}> {custos}</Text>
        </View>
        <View style={styles.indicador}>
          <Text style={styles.indicadorLabel}>Patrimônio</Text>
          <Text style={styles.indicadorCampo}> {patromonio}</Text>
        </View>
        <View style={styles.indicador}>
          <Text style={styles.indicadorLabel}>Dívidas</Text>
          <Text style={styles.indicadorCampo}> {dividas}</Text>
        </View>
        <View style={styles.notas}>
          <Text style={styles.notasTitulo}>Principais notas</Text>
          <View style={styles.notasItem}>
            <Entypo
              style={styles.notasItemPonto}
              name="dot-single"
              size={30}
              color="black"
            />
            <Text style={styles.notasItemTexto}>
              Seus custos representam {porcentagem}% da sua receita
            </Text>
          </View>
          {/* <View style={styles.notasItem}>
            <Entypo
              style={styles.notasItemPonto}
              name="dot-single"
              size={30}
              color="black"
            />
            <Text style={styles.notasItemTexto}>
              Dívidas mais altas que o patrimônio{nota2}
            </Text>
          </View>
          <View style={styles.notasItem}>
            <Entypo
              style={styles.notasItemPonto}
              name="dot-single"
              size={30}
              color="black"
            />
            <Text style={styles.notasItemTexto}>
              Patrimônio suficiente para seus custos médios por X meses{nota3}
            </Text>
          </View>
          <View style={styles.notasItem}>
            <Entypo
              style={styles.notasItemPonto}
              name="dot-single"
              size={30}
              color="black"
            />
            <Text style={styles.notasItemTexto}>
              Custos formam XX% da receita{nota4}
            </Text>
          </View> */}
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

  voltar: {
    position: "absolute",
    top: 10,
    left: 10,
    zIndex: 1,
  },

  cabecalho: {
    marginTop: 20,
    alignItems: "center",
  },

  cabecalhoTitulo: {
    color: "white",
    fontFamily: "Montserratb",
    fontSize: 30,
    textAlign: "center",
    marginTop: 20,
  },

  cabecalhoDescricao: {
    marginTop: 5,
    color: "white",
    fontFamily: "Montserratn",
    fontSize: 16,
    textAlign: "center",
    padding: 5,
  },

  indicador: {
    marginTop: 20,
    alignItems: "center",
  },

  indicadorLabel: {
    color: "white",
    fontFamily: "Montserratb",
    fontSize: 20,
    textAlign: "center",
  },

  indicadorCampo: {
    color: "black",
    fontFamily: "Montserratb",
    fontSize: 15,
    textAlign: "center",
    backgroundColor: "white",
    width: "70%",
    marginTop: 5,
    borderRadius: 6,
    padding: 5,
  },

  notas: {
    marginTop: 40,
  },

  notasTitulo: {
    color: "white",
    fontFamily: "Montserratb",
    fontSize: 20,
    marginLeft: 30,
  },

  notasItem: {
    backgroundColor: "white",
    width: "85%",
    marginTop: 10,
    borderRadius: 6,
    alignSelf: "center",
    justifyContent: "center",
    flexDirection: "row",
    paddingLeft: 15,
    paddingRight: 15,
  },

  notasItemTexto: {
    color: "black",
    fontFamily: "Montserratn",
    fontSize: 15,
    textAlign: "center",
    padding: 5,
  },
});
