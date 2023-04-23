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

export default function Informativo({ navigation, route }) {
  return (
    <SafeAreaView style={styles.tela}>
      <StatusBar barStyle="light-content" backgroundColor="#032140" />
      {/* <ScrollView> */}
      <View style={styles.logo}>
      <Image style={styles.logoImg} source={require("../logo.png")} />

      </View>
        <View style={styles.meta}>
          <Text style={styles.metaTitulo}>Objetivo Principal</Text>
          <View style={styles.metaForma}>
            <View style={styles.metaCabecalho}>
              <Entypo
                style={styles.metaCabecalhoIcone}
                name="paper-plane"
                size={24}
                color="black"
              />
              <Text style={styles.metaCabecalhoTitulo}>Compra importante</Text>
              <Entypo
                style={styles.metaCabecalhoEdit}
                name="dots-three-horizontal"
                size={30}
                color="black"
                onPress={() =>
                  navigation.navigate("FeedMeta", {
                    tituloMeta: tituloMeta,
                    tipoMeta: tipoMeta,
                  })
                }
              />
            </View>
            <Text style={styles.metaSubtitulo}>Carro dos sonhos</Text>
            <View style={styles.metaGrafico}>
              <View style={styles.metaGraficoBarra}>
                <View style={styles.metaGraficoBarraFundo}></View>
                <View style={styles.metaGraficoBarraProgresso}></View>
              </View>
              <Text style={styles.metaGraficoPorcentagem}>75%</Text>
            </View>
          </View>
        </View>
        <View style={styles.explicativo}>
          <Text style={styles.explicativoTexto}>
            O objetivo principal é uma meta estabelecida por você para conseguir
            poupar ou investir um valor alvo com mais praticidade e controle
          </Text>
        </View>
        <View style={styles.botoes}>
          <TouchableOpacity
            style={styles.botao}
            onPress={() =>
              navigation.navigate("ConfigurarMeta", { tela: "Informativo", usuario: route.params })
            }
          >
            <Text style={styles.textoBotao}>
              Vamos configurar meu objetivo!
            </Text>
          </TouchableOpacity>

            <Text style={styles.textoBotao} onPress={() =>
              navigation.reset({
                index: 0,
                routes: [{ name: "Principal", usuario: route.params }],
              })
            }>Não tenho interesse em poupar</Text>
        </View>
      {/* </ScrollView> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: "#8597BF",
  },

  logo: {
    marginTop: 30,
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
  },

  logoImg: {
    width: 200,
    height: 200,
  },

  meta: {
    marginTop: 30,
    justifyContent: "center",
    flex: 2,
  },

  metaForma: {
    // width: "",
    marginLeft: 10,
    marginRight: 10,
    paddingLeft: 40,
    paddingRight: 10,
    backgroundColor: "rgba( 255, 255, 255, 0.8)",
    borderRadius: 10,
    marginTop: 10,
  },

  metaTitulo: {
    fontFamily: "Montserratb",
    fontSize: 22,
    color: "white",
    marginLeft: 50,
  },

  metaCabecalho: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginTop: 5,
  },

  metaCabecalhoTitulo: {
    marginLeft: 10,
    fontFamily: "Montserratb",
    fontSize: 14,
    color: "black",
    flex: 1,
  },

  metaSubtitulo: {
    fontFamily: "Montserratb",
    fontSize: 22,
    color: "black",
    marginTop: 10,
  },

  metaGrafico: {
    marginTop: 15,
    flexDirection: "row",
    alignItems: "flex-start",
  },

  metaGraficoBarraFundo: {
    width: 200,
    height: 15,
    backgroundColor: "white",
    borderRadius: 50,
    borderColor: "black",
    borderWidth: 1,
    marginTop: 2.5,
  },

  metaGraficoBarraProgresso: {
    width: 150,
    height: 15,
    backgroundColor: "#032140",
    borderRadius: 50,
    position: "relative",
    bottom: 15,
  },

  metaGraficoPorcentagem: {
    marginLeft: 10,
    fontFamily: "Montserratb",
    fontSize: 14,
    color: "black",
  },

  explicativo: {
    justifyContent: "center",
    flex: 1,
    padding: 20,
  },

  explicativoTexto: {
    textAlign: "center",
    marginLeft: 10,
    fontFamily: "Montserratb",
    fontSize: 15,
    color: "white",
  },

  botoes: {
    flex: 2,
    alignItems: 'center'
  },
  
  botao: {
    backgroundColor: "#032140",
    width: "90%",
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
    marginBottom: 10,
  },

  textoBotao: {
    color: "#FFF",
    fontSize: 15,
    fontFamily: "Montserratb",
  },

});
