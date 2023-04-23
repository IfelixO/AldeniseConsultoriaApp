import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { VictoryPie } from "victory-native";
import custosService from "../../services/CustosService";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Skeleton } from "@rneui/themed";

export default function CarteiraMapaComp(params) {
  const navigation = useNavigation();
  const [nomeDespesa1, setNomeDespesa1] = useState();
  const [nomeDespesa2, setNomeDespesa2] = useState();
  const [nomeDespesa3, setNomeDespesa3] = useState();
  const [nomeDespesa4, setNomeDespesa4] = useState();
  const [nomeDespesa5, setNomeDespesa5] = useState();
  const [nomeDespesa6, setNomeDespesa6] = useState();
  const [porcDespesa1, setPorcDespesa1] = useState();
  const [porcDespesa2, setPorcDespesa2] = useState();
  const [porcDespesa3, setPorcDespesa3] = useState();
  const [porcDespesa4, setPorcDespesa4] = useState();
  const [porcDespesa5, setPorcDespesa5] = useState();
  const [porcDespesa6, setPorcDespesa6] = useState();
  const [porcOutros, setPorcOutros] = useState();
  const [porcSobra, setPorcSobra] = useState(0);
  const [custosGrafico, setCustosGrafico] = useState([]);
  const [anguloFinal, setAnguloFinal] = useState();
  const [renderiza, setRenderiza] = useState(true);

  function listar() {
    AsyncStorage.getItem("USUARIO").then((usuario) => {
      let usuarioInt = JSON.parse(usuario);
      custosService
        .listar(usuarioInt)
        .then((res) => {
          let conversao = Object.keys(res.data).map((key) => {
            return [String(key), res.data[key]];
          });
          let receita = conversao[2][1];
          receita = receita.replace("R$", "");
          receita = receita.replace(".", "");
          receita = receita.replace(",", ".");
          let despesasOrdenadasPorc = [];
          let despesasOrdenadasNomes = [];
          let primeiroValor = null;
          conversao.forEach((el, i) => {
            if (i > 2 && " - " != el[1] && "" != el[1]) {
              let separacao = el[1].split(" - ");
              let valor = separacao[1].replace("R$", "");
              valor = valor.replace(".", "");
              valor = Number(valor.replace(",", "."));
              if (!primeiroValor) {
                primeiroValor = valor;
                despesasOrdenadasPorc.push(valor / (receita / 100));
                despesasOrdenadasNomes.push(separacao[0]);
              } else {
                if (valor <= primeiroValor) {
                  despesasOrdenadasPorc.push(valor / (receita / 100));
                  despesasOrdenadasNomes.push(separacao[0]);
                }
                if (valor > primeiroValor) {
                  despesasOrdenadasPorc.unshift(valor / (receita / 100));
                  despesasOrdenadasNomes.unshift(separacao[0]);
                }
              }
            }
          });
          let TodosSoma = despesasOrdenadasPorc.reduce((a, b) => {
            return a + b;
          });

          if (despesasOrdenadasPorc[0]) {
            setPorcDespesa1(despesasOrdenadasPorc[0].toFixed(2));
            setNomeDespesa1(despesasOrdenadasNomes[0]);
          } else {
            setPorcDespesa1();
            setNomeDespesa1();
          }
          if (despesasOrdenadasPorc[1]) {
            setPorcDespesa2(despesasOrdenadasPorc[1].toFixed(2));
            setNomeDespesa2(despesasOrdenadasNomes[1]);
          } else {
            setPorcDespesa2();
            setNomeDespesa2();
          }
          if (despesasOrdenadasPorc[2]) {
            setPorcDespesa3(despesasOrdenadasPorc[2].toFixed(2));
            setNomeDespesa3(despesasOrdenadasNomes[2]);
          } else {
            setPorcDespesa3();
            setNomeDespesa3();
          }
          if (despesasOrdenadasPorc[3]) {
            setPorcDespesa4(despesasOrdenadasPorc[3].toFixed(2));
            setNomeDespesa4(despesasOrdenadasNomes[3]);
          } else {
            setPorcDespesa4();
            setNomeDespesa4();
          }
          if (despesasOrdenadasPorc[4]) {
            setPorcDespesa5(despesasOrdenadasPorc[4].toFixed(2));
            setNomeDespesa5(despesasOrdenadasNomes[4]);
          } else {
            setPorcDespesa5();
            setNomeDespesa5();
          }
          if (despesasOrdenadasPorc[5]) {
            setPorcDespesa6(despesasOrdenadasPorc[5].toFixed(2));
            setNomeDespesa6(despesasOrdenadasNomes[5]);
          } else {
            setPorcDespesa6();
            setNomeDespesa6();
          }
          {
            despesasOrdenadasPorc.length > 6
              ? setPorcOutros(despesasOrdenadasPorc.slice(6, 16))
              : setPorcOutros();
          }
          setCustosGrafico([
            { x: "", y: despesasOrdenadasPorc[0] },
            { x: "", y: despesasOrdenadasPorc[1] },
            { x: "", y: despesasOrdenadasPorc[2] },
            { x: "", y: despesasOrdenadasPorc[3] },
            { x: "", y: despesasOrdenadasPorc[4] },
            { x: "", y: despesasOrdenadasPorc[5] },
            { x: "", y: despesasOrdenadasPorc.slice(6, 16) },
          ]);
          setAnguloFinal(360 - ((100 - TodosSoma) / 100) * 360);
          if (100 - TodosSoma > 0) {
            setPorcSobra((100 - TodosSoma).toFixed(2));
          } else {
            let zero = 0;
            setPorcSobra(zero.toFixed(2));
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
    if (custosGrafico[0]) {
      setRenderiza(false);
    }

    {
      renderiza
        ? params.setRenderizaMapa(true)
        : params.setRenderizaMapa(false);
    }
  });

  useEffect(() => {
    setRenderiza(true);
    setCustosGrafico([]);
  }, [params.atualizar]);

  return (
    <View style={styles.mapa}>
      <Text style={styles.mapaTitulo}>Mapa de custos</Text>
      <View style={styles.mapaForma}>
        <View style={styles.mapaCabecalho}>
          <Entypo
            style={styles.mapaCabecalhoIcone}
            name="circular-graph"
            size={24}
            color="black"
          />
          <Text style={styles.mapaCabecalhoTitulo}>
            Divisão da renda pelos custos
          </Text>
          <Entypo
            style={styles.mapaCabecalhoEdit}
            name="dots-three-horizontal"
            size={30}
            color="black"
            onPress={() => navigation.navigate("CarteiraMapa")}
          />
        </View>
        <View style={styles.mapaGrafico}>
          {params.renderizaPag ? (
            <Skeleton
              style={styles.mapaGraficoPizzaSkeleton}
              height={150}
              width={150}
              animation="pulse"
            />
          ) : (
            <View style={styles.mapaGraficoPizza}>
              <VictoryPie
                data={custosGrafico}
                innerRadius={40}
                height={250}
                width={250}
                style={{ labels: { display: "none" } }}
                colorScale={[
                  "blue",
                  "orange",
                  "red",
                  "cyan",
                  "green",
                  "purple",
                  "gold",
                ]}
                startAngle={0}
                endAngle={anguloFinal}
              />
            </View>
          )}
          <View style={styles.mapaGraficoLeg}>
            {porcDespesa1 ? (
              <View style={styles.mapaGraficoLegDespesa}>
                <View style={styles.mapaGraficoLegDespesaForma1}></View>
                {params.renderizaPag ? (
                  <>
                    <Skeleton
                      style={styles.mapaGraficoLegDespesaPorc}
                      height={18.5}
                      animation="pulse"
                    />
                    <Skeleton
                      style={styles.mapaGraficoLegDespesaNome}
                      height={18.5}
                      width={95}
                      animation="pulse"
                    />
                  </>
                ) : (
                  <>
                    <Text style={styles.mapaGraficoLegDespesaPorc}>
                      {porcDespesa1}%
                    </Text>
                    <Text style={styles.mapaGraficoLegDespesaNome}>
                      {nomeDespesa1}
                    </Text>
                  </>
                )}
              </View>
            ) : null}
            {porcDespesa2 ? (
              <View style={styles.mapaGraficoLegDespesa}>
                <View style={styles.mapaGraficoLegDespesaForma2}></View>
                {params.renderizaPag ? (
                  <>
                    <Skeleton
                      style={styles.mapaGraficoLegDespesaPorc}
                      height={18.5}
                      animation="pulse"
                    />
                    <Skeleton
                      style={styles.mapaGraficoLegDespesaNome}
                      height={18.5}
                      width={95}
                      animation="pulse"
                    />
                  </>
                ) : (
                  <>
                    <Text style={styles.mapaGraficoLegDespesaPorc}>
                      {porcDespesa2}%
                    </Text>
                    <Text style={styles.mapaGraficoLegDespesaNome}>
                      {nomeDespesa2}
                    </Text>
                  </>
                )}
              </View>
            ) : null}
            {porcDespesa3 ? (
              <View style={styles.mapaGraficoLegDespesa}>
                <View style={styles.mapaGraficoLegDespesaForma3}></View>
                {params.renderizaPag ? (
                  <>
                    <Skeleton
                      style={styles.mapaGraficoLegDespesaPorc}
                      height={18.5}
                      animation="pulse"
                    />
                    <Skeleton
                      style={styles.mapaGraficoLegDespesaNome}
                      height={18.5}
                      width={95}
                      animation="pulse"
                    />
                  </>
                ) : (
                  <>
                    <Text style={styles.mapaGraficoLegDespesaPorc}>
                      {porcDespesa3}%
                    </Text>
                    <Text style={styles.mapaGraficoLegDespesaNome}>
                      {nomeDespesa3}
                    </Text>
                  </>
                )}
              </View>
            ) : null}
            {porcDespesa4 ? (
              <View style={styles.mapaGraficoLegDespesa}>
                <View style={styles.mapaGraficoLegDespesaForma4}></View>
                {params.renderizaPag ? (
                  <>
                    <Skeleton
                      style={styles.mapaGraficoLegDespesaPorc}
                      height={18.5}
                      animation="pulse"
                    />
                    <Skeleton
                      style={styles.mapaGraficoLegDespesaNome}
                      height={18.5}
                      width={95}
                      animation="pulse"
                    />
                  </>
                ) : (
                  <>
                    <Text style={styles.mapaGraficoLegDespesaPorc}>
                      {porcDespesa4}%
                    </Text>
                    <Text style={styles.mapaGraficoLegDespesaNome}>
                      {nomeDespesa4}
                    </Text>
                  </>
                )}
              </View>
            ) : null}
            {porcDespesa5 ? (
              <View style={styles.mapaGraficoLegDespesa}>
                <View style={styles.mapaGraficoLegDespesaForma5}></View>
                {params.renderizaPag ? (
                  <>
                    <Skeleton
                      style={styles.mapaGraficoLegDespesaPorc}
                      height={18.5}
                      animation="pulse"
                    />
                    <Skeleton
                      style={styles.mapaGraficoLegDespesaNome}
                      height={18.5}
                      width={95}
                      animation="pulse"
                    />
                  </>
                ) : (
                  <>
                    <Text style={styles.mapaGraficoLegDespesaPorc}>
                      {porcDespesa5}%
                    </Text>
                    <Text style={styles.mapaGraficoLegDespesaNome}>
                      {nomeDespesa5}
                    </Text>
                  </>
                )}
              </View>
            ) : null}
            {porcDespesa6 ? (
              <View style={styles.mapaGraficoLegDespesa}>
                <View style={styles.mapaGraficoLegDespesaForma6}></View>
                {params.renderizaPag ? (
                  <>
                    <Skeleton
                      style={styles.mapaGraficoLegDespesaPorc}
                      height={18.5}
                      animation="pulse"
                    />
                    <Skeleton
                      style={styles.mapaGraficoLegDespesaNome}
                      height={18.5}
                      width={95}
                      animation="pulse"
                    />
                  </>
                ) : (
                  <>
                    <Text style={styles.mapaGraficoLegDespesaPorc}>
                      {porcDespesa6}%
                    </Text>
                    <Text style={styles.mapaGraficoLegDespesaNome}>
                      {nomeDespesa6}
                    </Text>
                  </>
                )}
              </View>
            ) : null}
            {porcOutros ? (
              <View style={styles.mapaGraficoLegDespesa}>
                <View style={styles.mapaGraficoLegDespesaForma7}></View>
                {params.renderizaPag ? (
                  <Skeleton
                    style={styles.mapaGraficoLegDespesaPorc}
                    height={18.5}
                    animation="pulse"
                  />
                ) : (
                  <Text style={styles.mapaGraficoLegDespesaPorc}>
                    {porcOutros}%
                  </Text>
                )}
                <Text style={styles.mapaGraficoLegDespesaNome}>Outros</Text>
              </View>
            ) : null}
          </View>
        </View>
        <View style={styles.mapaDescicao}>
          <Text style={styles.mapaDescricaoTexto}>
            Nesse mês,{" "}
            {params.renderizaPag ? (
              <Skeleton height={15} width={50} animation="pulse" />
            ) : (
            <Text style={{ fontFamily: "Montserratb" }}>{porcSobra}%</Text>
            )} {' '}
            da sua receita mensal não está ligada diretamente a custos
            recorrentes, ou seja, disponível para aplicação e/ou uso cotidiano.
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mapa: {
    marginTop: 30,
    marginBottom: 30,
    position: "relative",
    justifyContent: "center",
  },

  mapaForma: {
    marginLeft: 10,
    marginRight: 10,
    paddingLeft: 40,
    paddingRight: 10,
    backgroundColor: "rgba( 255, 255, 255, 0.8)",
    borderRadius: 10,
    marginTop: 10,
    // height: 400
  },

  mapaTitulo: {
    fontFamily: "Montserratb",
    fontSize: 22,
    color: "rgb(50,50,50)",
    marginLeft: 50,
  },

  mapaCabecalho: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginTop: 5,
  },

  mapaCabecalhoTitulo: {
    marginLeft: 10,
    fontFamily: "Montserratb",
    fontSize: 14,
    color: "black",
    flex: 1,
  },

  mapaGrafico: {
    marginLeft: -20,
    marginTop: 10,
    flexDirection: "row",
    gap: 30,
  },

  mapaGraficoPizza: {
    height: 200,
    width: 200,
    position: "relative",
    top: -20,
    left: -60,
    flex: 1,
  },

  mapaGraficoPizzaSkeleton: {
    marginLeft: -10,
    marginTop: 30,
    marginRight: 46,
    marginBottom: 20,
    borderRadius: 200,
  },

  mapaGraficoLeg: {
    flex: 1,
    marginLeft: -60,
    marginTop: 20,
  },

  mapaGraficoLegDespesa: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
    marginBottom: 5,
  },

  mapaGraficoLegDespesaForma1: {
    width: 15,
    height: 15,
    backgroundColor: "blue",
  },

  mapaGraficoLegDespesaForma2: {
    width: 15,
    height: 15,
    backgroundColor: "orange",
  },

  mapaGraficoLegDespesaForma3: {
    width: 15,
    height: 15,
    backgroundColor: "red",
  },

  mapaGraficoLegDespesaForma4: {
    width: 15,
    height: 15,
    backgroundColor: "cyan",
  },

  mapaGraficoLegDespesaForma5: {
    width: 15,
    height: 15,
    backgroundColor: "green",
  },

  mapaGraficoLegDespesaForma6: {
    width: 15,
    height: 15,
    backgroundColor: "purple",
  },

  mapaGraficoLegDespesaForma7: {
    width: 15,
    height: 15,
    backgroundColor: "gold",
  },

  mapaGraficoLegDespesaPorc: {
    fontFamily: "Montserratb",
    fontSize: 14,
    color: "black",
    width: 60,
  },

  mapaGraficoLegDespesaNome: {
    fontFamily: "Montserratn",
    fontSize: 14,
    color: "black",
    textAlign: "left",
  },

  mapaDescricaoTexto: {
    fontFamily: "Montserratn",
    fontSize: 14,
    color: "black",
    marginBottom: 15,
    width: "90%",
  },
});
