import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import metaService from "../../services/MetaService";
import progressaoService from "../../services/ProgressaoService";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Skeleton } from "@rneui/themed";

export default function FeedMetaComp(params) {
  const navigation = useNavigation();
  const [tituloMeta, setTituloMeta] = useState("Título do objetivo");
  const [motivacao, setMotivacao] = useState("Motivação");
  const [valorMetaInicial, setValorMetaInicial] = useState(0);
  const [valorMeta, setValorMeta] = useState(0);
  const [porcentagemMeta, setPorcentagemMeta] = useState(0);
  const [larguraBarra, setLarguraBarra] = useState(0);
  const [corBarra, setCorBarra] = useState('#032140');
  const [progressaoMeta, setProgressaoMeta] = useState(0);
  const [previsao, setPrevisao] = useState(0);
  const [parcela, setParcela] = useState(0);
  const [renderiza, setRenderiza] = useState(true);
  const [nada, setNada] = useState(true);

  function transformarMoeda(moeda) {
    let valor = moeda.replace("R$", "");
    valor = valor.replace(".", "");
    return Number(valor.replace(",", "."));
  }

  function listar() {
    AsyncStorage.getItem("USUARIO").then((res) => {
      let usuarioInt = JSON.parse(res);
      metaService
        .achar(usuarioInt)
        .then((res) => {
          {
            res.data.titulo != "" ? setTituloMeta(res.data.titulo) : null;
          }
          {
            res.data.motivacao != "" ? setMotivacao(res.data.motivacao) : null;
          }
          {
            res.data.final != ""
              ? setValorMeta(transformarMoeda(res.data.final))
              : null;
          }
          {
            res.data.inicial != ""
              ? setValorMetaInicial(transformarMoeda(res.data.inicial))
              : null;
          }
          {
            res.data.parcela != ""
              ? setParcela(transformarMoeda(res.data.parcela))
              : null;
          }

          progressaoService
            .listar(usuarioInt)
            .then((resP) => {
              let conversao = Object.keys(resP.data).map((key) => {
                return [String(key), resP.data[key]];
              });
              let entradasArray = [];
              conversao.forEach((el, i) => {
                entradasArray[i] = el[1];
              });
              if(transformarMoeda(res.data.inicial) > 0){
                let soma = transformarMoeda(res.data.inicial);
                let valores = entradasArray.map((el, i) => {
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
                let porc = (
                  soma /
                  (transformarMoeda(res.data.final) / 100)
                ).toFixed(2);
                setProgressaoMeta(soma);
                setPorcentagemMeta(porc);
                setLarguraBarra(porc * 2);
                setPrevisao(
                  Math.round(
                    (transformarMoeda(res.data.final) - soma) /
                      transformarMoeda(res.data.parcela)
                  )
                );
                {porc > 100 ? setCorBarra('green') :null}
              } else {
                setNada(true)
              }
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

  useEffect(() => {
    if (renderiza) {
      listar();
    }
    if (larguraBarra || nada) {
      setTimeout(() => {
        setRenderiza(false);
      }, 1000);
    }
    {
      renderiza
        ? params.setRenderizaMeta(true)
        : params.setRenderizaMeta(false);
    }
  });

  useEffect(() => {
    setRenderiza(true);
    setLarguraBarra(null);
  }, [params.atualizar]);

  return (
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
          {params.renderizaPag ? (
            <Skeleton
              style={styles.metaCabecalhoTitulo}
              height={15}
              animation="pulse"
            />
          ) : motivacao != "Motivação" ? (
            <Text style={styles.metaCabecalhoTitulo}>{motivacao} </Text>
          ) : (
            <Text style={styles.metaCabecalhoTitulo}>
              Motivação não definida
            </Text>
          )}

          <Entypo
            style={styles.metaCabecalhoEdit}
            name="dots-three-horizontal"
            size={30}
            color="black"
            onPress={() => {
              navigation.navigate("FeedMeta", {
                previsao: previsao,
                progressao: progressaoMeta,
                final: valorMeta,
                titulo: tituloMeta,
                motivacao: motivacao,
                inicial: valorMetaInicial,
                parcela: parcela,
              });
            }}
          />
        </View>

        {params.renderizaPag ? (
          <Skeleton
            style={styles.metaSubtitulo}
            height={26}
            width={210}
            animation="pulse"
          />
        ) : tituloMeta != "Título do objetivo" ? (
          <Text style={styles.metaSubtitulo}>{tituloMeta}</Text>
        ) : (
          <Text style={styles.metaSubtitulo}>Objetivo não definido</Text>
        )}
        <View style={styles.metaGrafico}>
          {!params.renderizaPag ? (
            <>
              <View>
                <View style={styles.metaGraficoBarraFundo}></View>
                <View
                  style={{
                    width: larguraBarra || 0,
                    height: 15,
                    backgroundColor: corBarra,
                    borderRadius: 50,
                    position: "relative",
                    bottom: 15,
                  }}
                ></View>
              </View>
              <Text style={styles.metaGraficoPorcentagem}>
                {porcentagemMeta}%
              </Text>
            </>
          ) : (
            <Skeleton
              style={styles.metaGraficoBarra}
              height={20}
              width={265}
              animation="pulse"
            />
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  meta: {
    // marginTop: 30,
    position: "relative",
    bottom: 75,
    justifyContent: "center",
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
    marginRight: 20,
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

  metaGraficoBarra: {
    marginBottom: 15,
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
    width: 50,
    height: 15,
    backgroundColor: "#032140",
    borderRadius: 50,
    position: "absolute",
    bottom: 15,
  },

  metaGraficoPorcentagem: {
    marginLeft: 10,
    fontFamily: "Montserratb",
    fontSize: 14,
    color: "black",
  },

  carregando: {
    marginBottom: 15,
    marginLeft: 140,
  },
});
