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

export default function MovimentacoesParcial(params) {
  const [corF, setCorF] = useState("transparent");

  useEffect(() => {
    {
      params.tela == "CarteiraTempo"
        ? setCorF("rgba( 255, 255, 255, 0.8)")
        : null;
    }
  });

  return (
    <>
      {params.movimentacoesArrayConst[0]
        ? params.movimentacoesArrayConst.map((el, i) => {
            let separacao = el.split(" - ");
            let sources;
            let cor;
            switch (separacao[3].trim()) {
              case "Lazer":
                sources = require("../../img/lazer.png");
                cor = "red";
                break;
              case "Renda":
                sources = require("../../img/salario.png");
                cor = "#00958D";
                break;
              case "Contas":
                sources = require("../../img/fatura.png");
                cor = "red";
                break;
              case "Compras":
                sources = require("../../img/compras.png");
                cor = "red";
                break;
            }
            return (
              <View key={i}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "90%",
                    backgroundColor: corF,
                    borderRadius: 10,
                    padding: 10,
                    marginTop: 10,
                  }}
                >
                  <Image style={styles.linhaItemTipo} source={sources} />
                  <View style={styles.linhaItemTexto}>
                    <Text style={styles.linhaItemNome}> {separacao[0]} </Text>
                    <Text style={styles.linhaItemData}> {separacao[2]} </Text>
                  </View>
                  <Text
                    style={{
                      color: cor,
                      fontFamily: "Montserratb",
                      fontSize: 16,
                      textAlign: "right",
                    }}
                  >
                    {Number(separacao[1]).toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </Text>
                </View>
              </View>
            );
          })
        : null}
    </>
  );
}

const styles = StyleSheet.create({
  linhaItemTipo: {
    width: 35,
    height: 35,
    marginTop: 5,
    marginBottom: 5,
  },

  linhaItemTexto: {
    marginLeft: 10,
    flex: 1,
  },

  linhaItemNome: {
    color: "black",
    fontFamily: "Montserratn",
    fontSize: 16,
    textAlign: "left",
  },

  linhaItemData: {
    color: "black",
    fontFamily: "Montserratn",
    fontSize: 14,
    textAlign: "left",
  },
});
