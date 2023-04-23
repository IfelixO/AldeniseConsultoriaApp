import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import usuarioService from "../../services/UsuarioService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { VictoryPie } from "victory-native";
import { Skeleton } from "@rneui/themed";

export default function FeedSaudeComp(params) {
  const [grafico, setGrafico] = useState([]);
  const [tubarao, setTubarao] = useState(0);
  const [gato, setGato] = useState(0);
  const [lobo, setLobo] = useState(0);
  const [aguia, setAguia] = useState(0);
  const [descricao, setDescricao] = useState();
  const [renderiza, setRenderiza] = useState(true);

  function listar() {
    AsyncStorage.getItem("USUARIO").then((res) => {
      let usuarioInt = JSON.parse(res);
      usuarioService
        .achar(usuarioInt)
        .then((res) => {
          if (res.data) {
            let disc = JSON.parse(res.data.disc);
            setTubarao(disc.tubarao);
            setGato(disc.gato);
            setLobo(disc.lobo);
            setAguia(disc.aguia);
            setGrafico([
              { x: "", y: disc.tubarao },
              { x: "", y: disc.gato },
              { x: "", y: disc.lobo },
              { x: "", y: disc.aguia },
            ]);
            {
              res.data.descricaoAnalise && res.data.descricaoAnalise != ""
                ? setDescricao(res.data.descricaoAnalise)
                : setDescricao(
                    "Cada pessoa tem um perfil predominante que influencia seu comportamento. Baseado no teste DISC, o teste descobre a metáfora (águia, gato, lobo ou tubarão) que ilustra como você tem a tendência de se comportar!"
                  );
            }

            setRenderiza(false);
          }
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
    if (grafico[0]) {
      setRenderiza(false);
    }
    {
      renderiza
        ? params.setRenderizaAnalise(true)
        : params.setRenderizaAnalise(false);
    }
  });

  useEffect(() => {
    setRenderiza(true);
    setGrafico([]);
  }, [params.atualizar]);

  return (
    <View style={styles.analise}>
      <Text style={styles.analiseTitulo}>Análise comportamental</Text>
      <View style={styles.analiseForma}>
        <View style={styles.analiseCabecalho}>
          <AntDesign
            style={styles.analiseCabecalhoIcone}
            name="piechart"
            size={18}
            color="black"
          />
          <Text style={styles.analiseCabecalhoTitulo}>Marco do início</Text>
        </View>
        {params.renderizaPag ? (
          <Skeleton
            style={styles.analiseGraficoSkeleton}
            height={150}
            width={150}
            animation="pulse"
          />
        ) : (
          <View style={styles.analiseGrafico}>
            <VictoryPie
              data={grafico}
              // innerRadius={40}
              height={250}
              width={250}
              style={{ labels: { display: "none" } }}
              colorScale={["blue", "red", "orange", "green"]}
              startAngle={0}
            />
          </View>
        )}
        <View style={styles.analiseGraficoLegenda}>
          <View style={styles.analiseGraficoLegendaDado}>
            <View style={styles.analiseGraficoLegendaDadoCorTubarao}></View>
            <Text style={styles.analiseGraficoLegendaDadoTitulo}>Tubarão</Text>
            {params.renderizaPag ? (
              <Skeleton
                style={styles.analiseGraficoLegendaDadoValor}
                height={17}
                animation="pulse"
              />
            ) : (
              <Text style={styles.analiseGraficoLegendaDadoValor}>
                {tubarao.toFixed(2)}%
              </Text>
            )}
          </View>
          <View style={styles.analiseGraficoLegendaDado}>
            <View style={styles.analiseGraficoLegendaDadoCorGato}></View>
            <Text style={styles.analiseGraficoLegendaDadoTitulo}>Gato</Text>
            {params.renderizaPag ? (
              <Skeleton
                style={styles.analiseGraficoLegendaDadoValor}
                height={17}
                animation="pulse"
              />
            ) : (
              <Text style={styles.analiseGraficoLegendaDadoValor}>
                {gato.toFixed(2)}%
              </Text>
            )}
          </View>
          <View style={styles.analiseGraficoLegendaDado}>
            <View style={styles.analiseGraficoLegendaDadoCorLobo}></View>
            <Text style={styles.analiseGraficoLegendaDadoTitulo}>Lobo</Text>
            {params.renderizaPag ? (
              <Skeleton
                style={styles.analiseGraficoLegendaDadoValor}
                height={17}
                animation="pulse"
              />
            ) : (
              <Text style={styles.analiseGraficoLegendaDadoValor}>
                {lobo.toFixed(2)}%
              </Text>
            )}
          </View>
          <View style={styles.analiseGraficoLegendaDado}>
            <View style={styles.analiseGraficoLegendaDadoCorAguia}></View>
            <Text style={styles.analiseGraficoLegendaDadoTitulo}>Águia</Text>
            {params.renderizaPag ? (
              <Skeleton
                style={styles.analiseGraficoLegendaDadoValor}
                height={17}
                animation="pulse"
              />
            ) : (
              <Text style={styles.analiseGraficoLegendaDadoValor}>
                {aguia.toFixed(2)}%
              </Text>
            )}
          </View>
        </View>
        {params.renderizaPag ? (
          <Skeleton
            style={styles.analiseGraficoDescricao}
            height={120}
            animation="pulse"
          />
        ) : (
          <Text style={styles.analiseGraficoDescricao}>{descricao}</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  analise: {
    marginTop: 50,
    position: "relative",
    justifyContent: "center",
  },

  analiseForma: {
    marginLeft: 10,
    marginRight: 10,
    paddingLeft: 40,
    paddingRight: 40,
    backgroundColor: "rgba( 255, 255, 255, 0.8)",
    borderRadius: 10,
    marginTop: 10,
    paddingBottom: 30,
  },

  analiseTitulo: {
    fontFamily: "Montserratb",
    fontSize: 22,
    color: "rgb(50, 50, 50)",
    marginLeft: 50,
  },

  analiseCabecalho: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginTop: 5,
  },

  analiseCabecalhoTitulo: {
    marginLeft: 10,
    fontFamily: "Montserratb",
    fontSize: 14,
    color: "black",
    flex: 1,
  },

  analiseSubtitulo: {
    fontFamily: "Montserratb",
    fontSize: 22,
    color: "black",
    marginTop: 10,
  },

  analiseDescricao: {
    fontFamily: "Montserratn",
    fontSize: 14,
    color: "black",
    marginTop: 15,
    width: "90%",
  },

  analiseGrafico: {
    marginTop: -30,
    paddingLeft: "7%",
  },

  analiseGraficoSkeleton: {
    marginTop: 20,
    marginLeft: 70,
    marginBottom: 50,
    borderRadius: 200,
  },

  analiseGraficoLegenda: {
    alignItems: "center",
    marginTop: -40,
  },

  analiseGraficoDescricao: {
    fontFamily: "Montserratn",
    fontSize: 14,
    textAlign: "justify",
    marginTop: 20,
  },

  analiseGraficoLegendaDado: {
    flexDirection: "row",
    gap: 10,
    marginTop: 5,
  },

  analiseGraficoLegendaDadoCorTubarao: {
    width: 20,
    height: 20,
    backgroundColor: "blue",
  },

  analiseGraficoLegendaDadoCorGato: {
    width: 20,
    height: 20,
    backgroundColor: "red",
  },

  analiseGraficoLegendaDadoCorLobo: {
    width: 20,
    height: 20,
    backgroundColor: "orange",
  },

  analiseGraficoLegendaDadoCorAguia: {
    width: 20,
    height: 20,
    backgroundColor: "green",
  },

  analiseGraficoLegendaDadoTitulo: {
    fontFamily: "Montserratn",
    fontSize: 14,
    width: 60,
  },

  analiseGraficoLegendaDadoValor: {
    fontFamily: "Montserratn",
    fontSize: 14,
    width: 60,
  },
});
