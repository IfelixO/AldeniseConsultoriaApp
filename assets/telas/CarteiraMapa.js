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
import custosService from "../services/CustosService";
import EditDespesa from "./componentes/EditDespesa";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Skeleton } from "@rneui/themed";

export default function CarteiraMapa({ navigation, route }) {
  const [usuario, setUsuario] = useState(0);
  const [custosTotais, setCustosTotais] = useState(0);
  const [custosConst, setCustosConst] = useState([]);
  const [receita, setReceita] = useState(0);

  const [abrirEdit1, setAbrirEdit1] = useState(false);
  const [abrirEdit2, setAbrirEdit2] = useState(false);
  const [abrirEdit3, setAbrirEdit3] = useState(false);
  const [abrirEdit4, setAbrirEdit4] = useState(false);
  const [abrirEdit5, setAbrirEdit5] = useState(false);
  const [abrirEdit6, setAbrirEdit6] = useState(false);
  const [abrirEdit7, setAbrirEdit7] = useState(false);
  const [abrirEdit8, setAbrirEdit8] = useState(false);
  const [abrirEdit9, setAbrirEdit9] = useState(false);
  const [abrirEdit10, setAbrirEdit10] = useState(false);
  const [abrirEdit11, setAbrirEdit11] = useState(false);
  const [abrirEdit12, setAbrirEdit12] = useState(false);
  const [abrirEdit13, setAbrirEdit13] = useState(false);
  const [abrirEdit14, setAbrirEdit14] = useState(false);
  const [abrirEdit15, setAbrirEdit15] = useState(false);

  const [nome, setNome] = useState();
  const [valor, setValor] = useState();
  const [id, setId] = useState();

  const [renderiza, setRenderiza] = useState(true);

  function listar() {
    AsyncStorage.getItem("USUARIO").then((usuario_res) => {
      let usuarioInt = JSON.parse(usuario_res);
      setUsuario(usuarioInt);
      custosService
        .listar(usuarioInt)
        .then((res) => {
          let conversao = Object.keys(res.data).map((key) => {
            return [String(key), res.data[key]];
          });
          let custosArray = [];
          conversao.forEach((el, i) => {
            custosArray[i] = conversao[i][1];
          });
          let soma = 0;
          let valores = [];
          custosArray.forEach((el, i) => {
            if (i > 2 && el != "" && el != " - ") {
              let separacao = el.split(" - ");
              let valor = separacao[1].replace("R$", "");
              valor = valor.replace(".", "");
              valor = Number(valor.replace(",", "."));
              valores.push(valor);
              // console.log(valor)
            }
            if (i == 2) {
              setReceita(el);
            }
          });
          valores.forEach((el, i) => {
            soma = soma + el;
          });
          setCustosTotais(
            soma.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })
          );
          setCustosConst(custosArray);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }

  function handleAddDespesa(despesa, nome) {
    if (despesa && nome) {
      let despesaMoeda = despesa.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
      let despesaNova = nome + " - " + despesaMoeda;
      let parada;
      let despesasAtualizadas = custosConst.map((el, i) => {
        if (el != " - ") {
          return el;
        }
        if (el == " - " && parada != 1) {
          parada = 1;
          return despesaNova;
        }
        if (parada == 1) {
          return " - ";
        }
      });

      let data = {
        id: despesasAtualizadas[0],
        receita: despesasAtualizadas[2],
        despesa1: despesasAtualizadas[3],
        despesa2: despesasAtualizadas[4],
        despesa3: despesasAtualizadas[5],
        despesa4: despesasAtualizadas[6],
        despesa5: despesasAtualizadas[7],
        despesa6: despesasAtualizadas[8],
        despesa7: despesasAtualizadas[9],
        despesa8: despesasAtualizadas[10],
        despesa9: despesasAtualizadas[11],
        despesa10: despesasAtualizadas[12],
      };

      custosService
        .atualizar(data)
        .then((res) => {
          setRenderiza(true);
          setCustosConst([]);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  function setEdit(i, nome, valor) {
    setNome(nome);
    setValor(valor);
    setId(i);
    switch (i) {
      case 1:
        setAbrirEdit1(true);
        break;
      case 2:
        setAbrirEdit2(true);
        break;
      case 3:
        setAbrirEdit3(true);
        break;
      case 4:
        setAbrirEdit4(true);
        break;
      case 5:
        setAbrirEdit5(true);
        break;
      case 6:
        setAbrirEdit6(true);
        break;
      case 7:
        setAbrirEdit7(true);
        break;
      case 8:
        setAbrirEdit8(true);
        break;
      case 9:
        setAbrirEdit9(true);
        break;
      case 10:
        setAbrirEdit10(true);
        break;
      case 11:
        setAbrirEdit11(true);
        break;
      case 12:
        setAbrirEdit12(true);
        break;
      case 13:
        setAbrirEdit13(true);
        break;
      case 14:
        setAbrirEdit14(true);
        break;
      case 15:
        setAbrirEdit15(true);
        break;

      default:
        break;
    }
  }

  function handleEditDespesa(i, nome, valor) {
    if (nome && valor) {
      let novaDespesa = nome + " - " + valor;
      let data = {
        id: usuario.id,
        index: i,
        despesa: novaDespesa,
        receita: custosConst[1],
        despesa1: custosConst[2],
        despesa2: custosConst[3],
        despesa3: custosConst[4],
        despesa4: custosConst[5],
        despesa5: custosConst[6],
        despesa6: custosConst[7],
        despesa7: custosConst[8],
        despesa8: custosConst[9],
        despesa9: custosConst[10],
        despesa10: custosConst[11],
      };
      setAbrirEdit1(false);
      setAbrirEdit2(false);
      setAbrirEdit3(false);
      setAbrirEdit4(false);
      setAbrirEdit5(false);
      setAbrirEdit6(false);
      setAbrirEdit7(false);
      setAbrirEdit8(false);
      setAbrirEdit9(false);
      setAbrirEdit10(false);
      setAbrirEdit11(false);
      setAbrirEdit12(false);
      setAbrirEdit13(false);
      setAbrirEdit14(false);
      setAbrirEdit15(false);
      custosService
        .atualizar(data)
        .then((res) => {
          setRenderiza(true);
          setCustosConst([]);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  function handleExcluiDespesa(i) {
    let data = {
      id: usuario.id,
      index: i,
      receita: custosConst[1],
      despesa1: custosConst[2],
      despesa2: custosConst[3],
      despesa3: custosConst[4],
      despesa4: custosConst[5],
      despesa5: custosConst[6],
      despesa6: custosConst[7],
      despesa7: custosConst[8],
      despesa8: custosConst[9],
      despesa9: custosConst[10],
      despesa10: custosConst[11],
    };
    custosService
      .excluir(data)
      .then((res) => {
        setRenderiza(true);
        setCustosConst([]);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    if (renderiza) {
      listar();
    }
    if (custosConst[0]) {
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
        <Text style={styles.titulo}>Mapa de custos</Text>
        <View style={styles.cabecalho}>
          <Text style={styles.cabecalhoTitulo}>Relação custos e receita</Text>
          {renderiza ? (
            <Skeleton
              style={styles.cabecalhoRelacao}
              height={20}
              width={250}
              animation="pulse"
            />
          ) : (
            <Text style={styles.cabecalhoRelacao}>
              {custosTotais} / {receita}
            </Text>
          )}
        </View>
        <AddInput
          tela="CarteiraMapa"
          cor="#99B0AF"
          item="despesa"
          handleAddDespesa={handleAddDespesa}
        />
        {renderiza ? (
          <Skeleton
            style={styles.linhaSkeleton}
            height={30}
            animation="pulse"
          />
        ) : (
          <View style={styles.linha}>
            {custosConst.map((el, i) => {
              if (i > 2 && el != "" && el != " - ") {
                let separacao = el.split("- ");
                return (
                  <View key={i}>
                    <View style={styles.linhaItem}>
                      <Entypo
                        name="edit"
                        size={16}
                        color="black"
                        onPress={() => {
                          setEdit(i, separacao[0], separacao[1]);
                        }}
                      />
                      <Text style={styles.linhaItemNome}>{separacao[0]}</Text>
                      <Text style={styles.linhaItemValor}>{separacao[1]}</Text>
                      <Entypo
                        name="trash"
                        size={16}
                        color="black"
                        onPress={() => {
                          handleExcluiDespesa(i);
                        }}
                      />
                    </View>
                  </View>
                );
              }
            })}
            {abrirEdit1 ? (
              <EditDespesa
                id={id}
                nome={nome}
                valor={valor}
                handleEditDespesa={handleEditDespesa}
              />
            ) : null}
            {abrirEdit2 ? (
              <EditDespesa
                id={id}
                nome={nome}
                valor={valor}
                handleEditDespesa={handleEditDespesa}
              />
            ) : null}
            {abrirEdit3 ? (
              <EditDespesa
                id={id}
                nome={nome}
                valor={valor}
                handleEditDespesa={handleEditDespesa}
              />
            ) : null}
            {abrirEdit4 ? (
              <EditDespesa
                id={id}
                nome={nome}
                valor={valor}
                handleEditDespesa={handleEditDespesa}
              />
            ) : null}
            {abrirEdit5 ? (
              <EditDespesa
                id={id}
                nome={nome}
                valor={valor}
                handleEditDespesa={handleEditDespesa}
              />
            ) : null}
            {abrirEdit6 ? (
              <EditDespesa
                id={id}
                nome={nome}
                valor={valor}
                handleEditDespesa={handleEditDespesa}
              />
            ) : null}
            {abrirEdit7 ? (
              <EditDespesa
                id={id}
                nome={nome}
                valor={valor}
                handleEditDespesa={handleEditDespesa}
              />
            ) : null}
            {abrirEdit8 ? (
              <EditDespesa
                id={id}
                nome={nome}
                valor={valor}
                handleEditDespesa={handleEditDespesa}
              />
            ) : null}
            {abrirEdit9 ? (
              <EditDespesa
                id={id}
                nome={nome}
                valor={valor}
                handleEditDespesa={handleEditDespesa}
              />
            ) : null}
            {abrirEdit10 ? (
              <EditDespesa
                id={id}
                nome={nome}
                valor={valor}
                handleEditDespesa={handleEditDespesa}
              />
            ) : null}
            {/* {abrirEdit11 ? (
            <EditDespesa
              id={id}
              nome={nome}
              valor={valor}
              handleEditDespesa={handleEditDespesa}
            />
          ) : null}
          {abrirEdit12 ? (
            <EditDespesa
              id={id}
              nome={nome}
              valor={valor}
              handleEditDespesa={handleEditDespesa}
            />
          ) : null}
          {abrirEdit13 ? (
            <EditDespesa
              id={id}
              nome={nome}
              valor={valor}
              handleEditDespesa={handleEditDespesa}
            />
          ) : null}
          {abrirEdit14 ? (
            <EditDespesa
              id={id}
              nome={nome}
              valor={valor}
              handleEditDespesa={handleEditDespesa}
            />
          ) : null}
          {abrirEdit15 ? (
            <EditDespesa
              id={id}
              nome={nome}
              valor={valor}
              handleEditDespesa={handleEditDespesa}
            />
          ) : null} */}
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

    // fontWeight: 'bold',
  },

  cabecalho: {
    marginTop: 25,
    alignItems: "center",
  },

  cabecalhoTitulo: {
    color: "rgb(50, 50, 50)",
    fontFamily: "Montserratb",
    fontSize: 16,
    textAlign: "center",
    marginRight: 10,
  },

  cabecalhoRelacao: {
    marginTop: 5,
    color: "rgb(50, 50, 50)",
    fontFamily: "Montserratn",
    fontSize: 16,
    textAlign: "center",
  },

  cabecalhoPrevisaoTitulo: {
    marginTop: 10,
    color: "rgb(50, 50, 50)",
    fontFamily: "Montserratb",
    fontSize: 16,
    textAlign: "center",
  },

  cabecalhoPrevisaoValor: {
    marginTop: 5,
    color: "rgb(50, 50, 50)",
    fontFamily: "Montserratn",
    fontSize: 16,
    textAlign: "center",
  },

  linha: {
    alignItems: "center",
    marginTop: 10,
  },

  linhaSkeleton: {
    marginTop: 20,
    width: "80%",
    borderRadius: 10,
    alignSelf: 'center'
  },

  linhaItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "80%",
    backgroundColor: "rgba( 255, 255, 255, 0.8)",
    borderRadius: 10,
    padding: 5,
    paddingLeft: 10,
    marginTop: 10,
  },

  linhaItemNome: {
    color: "black",
    fontFamily: "Montserratn",
    fontSize: 16,
    textAlign: "left",
    marginLeft: 10,
    flex: 1,
  },

  linhaItemValor: {
    color: "red",
    fontFamily: "Montserratb",
    fontSize: 16,
    marginRight: 10,
  },
});
