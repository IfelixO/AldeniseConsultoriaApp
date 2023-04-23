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
import custosService from "../../services/CustosService";
import movimentacoesService from "../../services/MovimentacoesService";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Skeleton } from "@rneui/themed";

export default function FeedSaudeComp(params) {
  const [estadoSaude, setEstadoSaude] = useState(null);
  const [descricaoSaude, setDescricaoSaude] = useState();
  const [grafico, setGrafico] = useState(require("../../img/termo_0.0.png"));
  const [agulha, setAgulha] = useState();
  const [renderiza, setRenderiza] = useState(true);

  function calcularSaude(porcentagem) {
    if (porcentagem > 85) {
      setEstadoSaude("Alerta vermelho");
      setGrafico(require("../../img/termo_0.6.png"));
      setAgulha(require("../../img/agulha_alerta.png"));
      setDescricaoSaude(
        "Situação crítica! A beira de um colapso financeiro. Ciclo de fragilidade, estresse e desorganização financeira. Imediata necessidade de uma atitude de mudança total nos hábitos e relações!"
      );
    }
    if (porcentagem >= 70 && porcentagem < 85) {
      setEstadoSaude("Muito baixa");
      setGrafico(require("../../img/termo_1.6.png"));
      setAgulha(require("../../img/agulha_muitoruim.png"));
      setDescricaoSaude(
        "Risco de atingir a situação crítica. Presente numa espiral negativa de dívidas e gastos. Urgente necessidade de uma atitude de mudança ampla nos hábitos e relações!"
      );
    }
    if (porcentagem >= 55 && porcentagem < 70) {
      setEstadoSaude("Baixa");
      setGrafico(require("../../img/termo_2.6.png"));
      setAgulha(require("../../img/agulha_ruim.png"));
      setDescricaoSaude(
        "Situação desequilibrada. Sinais de irresponsabilidade e estresse financeiro emergente. Iminente necessidade de uma atitude de mudança parcial nos hábitos e relações."
      );
    }
    if (porcentagem >= 40 && porcentagem < 55) {
      setEstadoSaude("Razoável");
      setGrafico(require("../../img/termo_3.6.png"));
      setAgulha(require("../../img/agulha.png"));
      setDescricaoSaude(
        'Situação contida. Equilíbrio financeiro no limite, pouco espaço para erros e/ou "escapadas". Uma atitude de mudança em alguns hábitos é sugerida.'
      );
    }
    if (porcentagem >= 25 && porcentagem < 40) {
      setEstadoSaude("Alta");
      setGrafico(require("../../img/termo_4.6.png"));
      setAgulha(require("../../img/agulha_boa.png"));
      setDescricaoSaude(
        "Situação bem equilibrada. Básico sendo bem feito, pouca sobra no fim do mês. Uma atitude de revisão nos hábitos atuais e planejamento futuro a curto e médio prazo é sugerida."
      );
    }
    if (porcentagem >= 10 && porcentagem < 25) {
      setEstadoSaude("Muito alta");
      setGrafico(require("../../img/termo_5.6.png"));
      setAgulha(require("../../img/agulha_muitoboa.png"));
      setDescricaoSaude(
        "Situação favorável! Domínio completo sobre o cotidiano. A construção do patrimônio a longo prazo se faz necessária para a melhora constante!"
      );
    }
    if (porcentagem <= 10) {
      setEstadoSaude("Excelente");
      setGrafico(require("../../img/termo_6.6.png"));
      setAgulha(require("../../img/agulha_otima.png"));
      setDescricaoSaude(
        "Situação admirável! Vida financeira sem estresse. As finanças proporcionam liberdade e segurança. O investimento em sua herança se mostra relevante!"
      );
    }
  }

  function listar() {
    AsyncStorage.getItem("USUARIO").then((res) => {
      let usuarioInt = JSON.parse(res);
      custosService
        .listar(usuarioInt)
        .then((resC) => {
          if (resC.data) {
            let conversao = Object.keys(resC.data).map((key) => {
              return [String(key), resC.data[key]];
            });
            let custosArray = [];
            conversao.forEach((el, i) => {
              custosArray[i] = conversao[i][1];
            });
            let valores = [];
            custosArray.forEach((el, i) => {
              let separacao;
              if (i > 2 && el != "" && el != " - ") {
                separacao = el.split("- ");
                valores.push(separacao[1]);
              }
            });
            let custosTotais = 0;
            valores.forEach((el, i) => {
                let valor = el.replace("R$", "");
                valor = valor.replace(".", "");
                valor = valor.replace(",", ".");
                custosTotais = custosTotais + Number(valor);
            });
            let receita = custosArray.splice(2, 1);
            receita = receita[0].replace("R$", "");
            receita = receita.replace(".", "");
            receita = Number(receita.replace(",", "."));

            movimentacoesService
              .listar(usuarioInt)
              .then((resM) => {
                if (resM.data) {
                  let conversao = Object.keys(resM.data).map((key) => {
                    return [String(key), resM.data[key]];
                  });
                  let movimentacoesArray = [];
                  conversao.forEach((el, i) => {
                    if (i > 2 && el[1] != "") {
                      movimentacoesArray[i] = conversao[i][1];
                    }
                  });
                  let gastos = 0
                  if(movimentacoesArray){
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
                    let movimentacoesMesValores = [0];
                    movimentacoesArray.forEach((el, i) => {
                      if (i > 0 && el != "") {
                        let primeiraSeparacao = el.split(" - ");
                        let segundaSeparacao = primeiraSeparacao[2].split("de ");
                        let terceiraSeparacao = segundaSeparacao[1].split(",");
                        if (terceiraSeparacao[0] == mesHoje) {
                          movimentacoesMesValores.push(
                            Number(primeiraSeparacao[1])
                          );
                        }
                      }
                    });
                    gastos = movimentacoesMesValores.reduce((a, b) => {
                      return a + b;
                    });

                  }
                    let porcentagem = (custosTotais + gastos) / (receita / 100);
                    // console.log(custosTotais, gastos, receita)
                    // console.log(porcentagem)
                    // setEstadoSaude()
                    calcularSaude(porcentagem);
                    setDescricaoSaude(usuarioInt.descricaoSaude)
                }
              })
              .catch((err) => {
                console.log(err);
              });
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
    if (estadoSaude) {
      setRenderiza(false);
    }
    {
      renderiza
        ? params.setRenderizaSaude(true)
        : params.setRenderizaSaude(false);
    }
  });

  useEffect(() => {
    setRenderiza(true);
    setEstadoSaude(null);
  }, [params.atualizar]);

  return (
    <View style={styles.saude}>
      <Text style={styles.saudeTitulo}>Saúde financeira</Text>
      <View style={styles.saudeForma}>
        <View style={styles.saudeCabecalho}>
          <Image
            style={styles.saudeCabecalhoIcone}
            source={require("../../img/termo.png")}
          />
          <Text style={styles.saudeCabecalhoTitulo}>
            Termômetro do dinheiro
          </Text>
          {/* <Entypo
            style={styles.saudeCabecalhoEdit}
            name="dots-three-horizontal"
            size={30}
            color="black"
            onPress={() => {
              navigation.navigate("FeedSaude");
            }}
          /> */}
        </View>
        {params.renderizaPag ? (
          <>
            <Skeleton
              style={styles.saudeSubtitulo}
              height={25}
              width={200}
              animation="pulse"
            />
            <Skeleton
              style={styles.saudeDescricao}
              height={100}
              animation="pulse"
            />
            <View style={styles.saudeGrafico}>
              <Skeleton
                style={styles.saudeGraficoTermo}
                height={100}
                animation="pulse"
              />
            </View>
          </>
        ) : (
          <>
            <Text style={styles.saudeSubtitulo}>{estadoSaude}</Text>
            <Text style={styles.saudeDescricao}>{descricaoSaude}</Text>
            <View style={styles.saudeGrafico}>
              <Image style={styles.saudeGraficoTermo} source={grafico} />
              <Image style={styles.saudeGraficoAgulha} source={agulha} />
            </View>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  saude: {
    marginTop: -30,
    position: "relative",
    justifyContent: "center",
  },

  saudeForma: {
    marginLeft: 10,
    marginRight: 10,
    paddingLeft: 40,
    paddingRight: 10,
    backgroundColor: "rgba( 255, 255, 255, 0.8)",
    borderRadius: 10,
    marginTop: 10,
    paddingBottom: 30,
  },

  saudeTitulo: {
    fontFamily: "Montserratb",
    fontSize: 22,
    color: "rgb(50, 50, 50)",
    marginLeft: 50,
  },

  saudeCabecalho: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginTop: 5,
  },

  saudeCabecalhoIcone: {
    width: 20,
    height: 20,
  },

  saudeCabecalhoTitulo: {
    marginLeft: 10,
    fontFamily: "Montserratb",
    fontSize: 14,
    color: "black",
    flex: 1,
  },

  saudeSubtitulo: {
    fontFamily: "Montserratb",
    fontSize: 22,
    color: "black",
    marginTop: 10,
  },

  saudeDescricao: {
    fontFamily: "Montserratn",
    fontSize: 14,
    color: "black",
    marginTop: 15,
    width: "90%",
  },

  saudeGrafico: {
    marginTop: 20,
    marginBottom: 10,
    width: "91%",
    alignItems: "center",
    flexDirection: "row",
  },

  saudeGraficoTermo: {
    width: 200,
    height: 100,
    marginLeft: 55,
  },

  saudeGraficoAgulha: {
    width: 140,
    height: 80,
    position: "relative",
    top: 15,
    right: 170,
  },
});
