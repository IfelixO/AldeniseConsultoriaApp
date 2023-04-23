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
import CarteiraMapaComp from "./componentes/CarteiraMapaComp";
import CarteiraTempoComp from "./componentes/CarteiraTempoComp";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function Carteira({ navigation, route }) {
  // const [mes1, setMes1] = useState("Jan");
  // const [mes2, setMes2] = useState("Fev");
  // const [mes3, setMes3] = useState("Mar");
  // const [mes4, setMes4] = useState("Abr");
  // const [mes5, setMes5] = useState("Mai");
  // const [mes6, setMes6] = useState("Jun");
  // const [mes7, setMes7] = useState("Jul");
  // const [saldoMes1, setSaldoMes1] = useState(120);
  // const [saldoMes2, setSaldoMes2] = useState(200);
  // const [saldoMes3, setSaldoMes3] = useState(30);
  // const [saldoMes4, setSaldoMes4] = useState(80);
  // const [saldoMes5, setSaldoMes5] = useState(321);
  // const [saldoMes6, setSaldoMes6] = useState(150);
  // const [saldoMes7, setSaldoMes7] = useState(100);
  // const [alturaMes1, setAlturaMes1] = useState();
  // const [alturaMes2, setAlturaMes2] = useState();
  // const [alturaMes3, setAlturaMes3] = useState();
  // const [alturaMes4, setAlturaMes4] = useState();
  // const [alturaMes5, setAlturaMes5] = useState();
  // const [alturaMes6, setAlturaMes6] = useState();
  // const [alturaMes7, setAlturaMes7] = useState();

  // const [paramSobra, setParamSobra] = useState({
  //   custos: 0,
  //   receita: 0,
  // });

  const [atualizar, setAtualizar] = useState(false);
  const [renderizaPag, setRenderizaPag] = useState(true);
  const [renderizaMapa, setRenderizaMapa] = useState(true);
  const [renderizaTempo, setRenderizaTempo] = useState(true);

  useEffect(() => {
    {
      !renderizaMapa && !renderizaTempo
        ? setRenderizaPag(false)
        : setRenderizaPag(true);
    }
    // console.log(renderizaMapa, renderizaTempo)

    // Resumo
    // let saldos = [
    //   saldoMes1,
    //   saldoMes2,
    //   saldoMes3,
    //   saldoMes4,
    //   saldoMes5,
    //   saldoMes6,
    //   saldoMes7,
    // ];
    // let maximo = Math.max(
    //   saldoMes1,
    //   saldoMes2,
    //   saldoMes3,
    //   saldoMes4,
    //   saldoMes5,
    //   saldoMes6,
    //   saldoMes7
    // );

    // function ComparaSaldos(saldo) {
    //   if (maximo == saldo) {
    //     setAlturaMes1((150 / saldo) * saldoMes1);
    //     setAlturaMes2((150 / saldo) * saldoMes2);
    //     setAlturaMes3((150 / saldo) * saldoMes3);
    //     setAlturaMes4((150 / saldo) * saldoMes4);
    //     setAlturaMes5((150 / saldo) * saldoMes5);
    //     setAlturaMes6((150 / saldo) * saldoMes6);
    //     setAlturaMes7((150 / saldo) * saldoMes7);
    //   }
    // }

    // for (let i = 0; i < saldos.length; i++) {
    //   ComparaSaldos(saldos[i]);
    // }
  });

  return (
    <SafeAreaView style={styles.tela}>
      <StatusBar barStyle="light-content" backgroundColor="#032140" />
      <ScrollView>
        <TouchableOpacity
          style={styles.atualizar}
          onPress={() => {
            setAtualizar(!atualizar);
          }}
        >
          <MaterialCommunityIcons
            name="reload"
            size={30}
            color="rgb(50,50,50)"
          />
        </TouchableOpacity>
        <View style={styles.cabecalho}>
          <Text style={styles.cabecalhoTitulo}>Carteira</Text>
        </View>
        {/* <View style={styles.resumo}>
          <Text style={styles.resumoTitulo}>Resumo mensal</Text>
          <View style={styles.resumoForma}>
            <View style={styles.resumoCabecalho}>
              <Entypo
                style={styles.resumoCabecalhoIcone}
                name="calendar"
                size={24}
                color="black"
              />
              <Text style={styles.resumoCabecalhoTitulo}>
                Saldo final dos últimos meses (R$)
              </Text>
              <Entypo
                style={styles.resumoCabecalhoEdit}
                name="dots-three-horizontal"
                size={30}
                color="black"
              />
            </View>
            <View style={styles.resumoGrafico}>
              <View style={styles.resumoGraficoMes}>
                <Text style={styles.resumoGraficoMesValor}>{saldoMes1}</Text>
                <View
                  style={{
                    width: 40,
                    backgroundColor: "#00958D",
                    height: alturaMes1,
                  }}
                ></View>
                <Text style={styles.resumoGraficoMesLeg}>{mes1}</Text>
              </View>
              <View style={styles.resumoGraficoMes}>
                <Text style={styles.resumoGraficoMesValor}>{saldoMes2}</Text>
                <View
                  style={{
                    width: 40,
                    backgroundColor: "#00958D",
                    height: alturaMes2,
                  }}
                ></View>
                <Text style={styles.resumoGraficoMesLeg}>{mes2}</Text>
              </View>
              <View style={styles.resumoGraficoMes}>
                <Text style={styles.resumoGraficoMesValor}>{saldoMes3}</Text>
                <View
                  style={{
                    width: 40,
                    backgroundColor: "#00958D",
                    height: alturaMes3,
                  }}
                ></View>
                <Text style={styles.resumoGraficoMesLeg}>{mes3}</Text>
              </View>
              <View style={styles.resumoGraficoMes}>
                <Text style={styles.resumoGraficoMesValor}>{saldoMes4}</Text>
                <View
                  style={{
                    width: 40,
                    backgroundColor: "#00958D",
                    height: alturaMes4,
                  }}
                ></View>
                <Text style={styles.resumoGraficoMesLeg}>{mes4}</Text>
              </View>
              <View style={styles.resumoGraficoMes}>
                <Text style={styles.resumoGraficoMesValor}>{saldoMes5}</Text>
                <View
                  style={{
                    width: 40,
                    backgroundColor: "#00958D",
                    height: alturaMes5,
                  }}
                ></View>
                <Text style={styles.resumoGraficoMesLeg}>{mes5}</Text>
              </View>
              <View style={styles.resumoGraficoMes}>
                <Text style={styles.resumoGraficoMesValor}>{saldoMes6}</Text>
                <View
                  style={{
                    width: 40,
                    backgroundColor: "#00958D",
                    height: alturaMes6,
                  }}
                ></View>
                <Text style={styles.resumoGraficoMesLeg}>{mes6}</Text>
              </View>
              <View style={styles.resumoGraficoMes}>
                <Text style={styles.resumoGraficoMesValor}>{saldoMes7}</Text>
                <View
                  style={{
                    width: 40,
                    backgroundColor: "#00958D",
                    height: alturaMes7,
                  }}
                ></View>
                <Text style={styles.resumoGraficoMesLeg}>{mes7}</Text>
              </View>
            </View>
          </View>
        </View> */}
        <CarteiraMapaComp renderizaPag={renderizaPag} setRenderizaMapa={setRenderizaMapa} atualizar={atualizar} />
        <CarteiraTempoComp renderizaPag={renderizaPag} setRenderizaTempo={setRenderizaTempo} atualizar={atualizar} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: "rgba(0, 58, 54, 0.15)",
    // backgroundColor: "rgba(0, 58, 54, 0.15)",
  },

  atualizar: {
    position: "absolute",
    top: 10,
    left: 10,
    zIndex: 1,
  },

  cabecalho: {
    alignItems: "center",
    marginTop: 20,
  },

  cabecalhoTitulo: {
    color: "rgb(50,50,50)",
    fontFamily: "Montserratb",
    fontSize: 33,
  },

  resumo: {
    marginTop: 30,
    position: "relative",
    justifyContent: "center",
  },

  resumoForma: {
    marginLeft: 10,
    marginRight: 10,
    paddingLeft: 40,
    paddingRight: 10,
    backgroundColor: "rgba( 255, 255, 255, 0.8)",
    borderRadius: 10,
    marginTop: 10,
  },

  resumoTitulo: {
    fontFamily: "Montserratb",
    fontSize: 22,
    color: "rgb(50,50,50)",
    marginLeft: 50,
  },

  resumoCabecalho: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginTop: 5,
  },

  resumoCabecalhoTitulo: {
    marginLeft: 10,
    fontFamily: "Montserratb",
    fontSize: 14,
    color: "black",
    flex: 1,
  },

  resumoSubtitulo: {
    fontFamily: "Montserratb",
    fontSize: 22,
    color: "black",
    marginTop: 10,
  },

  resumoDescricao: {
    fontFamily: "Montserratn",
    fontSize: 14,
    color: "black",
    marginTop: 15,
  },

  resumoGrafico: {
    marginTop: 20,
    marginLeft: -25,
    flexDirection: "row",
    alignItems: "flex-end",
    marginBottom: 20,
  },

  resumoGraficoMes: {
    marginLeft: 10,
    alignItems: "center",
  },

  resumoGraficoMesLeg: {
    fontFamily: "Montserratn",
    fontSize: 14,
    color: "black",
  },

  resumoGraficoMesValor: {
    fontFamily: "Montserratb",
    fontSize: 9,
    color: "black",
  },
});
