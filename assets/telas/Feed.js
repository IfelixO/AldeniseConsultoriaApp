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
  TouchableOpacity,
} from "react-native";
import FeedMetaComp from "./componentes/FeedMetaComp";
import FeedSaudeComp from "./componentes/FeedSaudeComp";
import FeedAnaliseComp from "./componentes/FeedAnaliseComp";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Skeleton } from "@rneui/themed";

export default function Feed({ route, navigation }) {
  const [usuario, setUsuario] = useState(0);
  const [proverbioFrase, setproverbioFrase] = useState(
    "A sorte é o encontro da oportunidade com o preparo!"
  );
  const [proverbioAutor, setproverbioAutor] = useState("Aldenise Oliveira");

  const [renderizaPag, setRenderizaPag] = useState(true);
  const [renderizaMeta, setRenderizaMeta] = useState(true);
  const [renderizaSaude, setRenderizaSaude] = useState(true);
  const [renderizaAnalise, setRenderizaAnalise] = useState(true);
  const [atualizar, setAtualizar] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem("USUARIO").then((res) => {
      setUsuario(JSON.parse(res));
    });
    {
      !renderizaMeta && !renderizaSaude && !renderizaAnalise
        ? setRenderizaPag(false)
        : setRenderizaPag(true);
    }
  });
  // console.log(renderizaMeta, renderizaSaude, renderizaAnalise)

  return (
    <SafeAreaView style={styles.tela}>
      <StatusBar barStyle="light-content" backgroundColor="#032140" />
      {renderizaPag ? (
          <ActivityIndicator size={30} style={styles.atualizar} />
        ) : (
          <TouchableOpacity
            style={styles.atualizar}
            onPress={() => {
              setAtualizar(!atualizar);
            }}
          >
            <MaterialCommunityIcons
              name="reload"
              size={30}
              color="white"
            />
          </TouchableOpacity>
        )}
      <ScrollView>
        <View style={styles.cabecalhoForma}>
          <View style={styles.cabecalho}>
            <View style={styles.cabecalhoTexto}>
              <Text style={styles.cabecalhoTextoChamada}>Olá,</Text>
              {renderizaPag ? (
                <Skeleton
                  style={styles.cabecalhoTextoNome}
                  height={25}
                  width={200}
                  animation="pulse"
                />
              ) : (
                <Text style={styles.cabecalhoTextoNome}>{usuario.nome}</Text>
              )}
            </View>
            <Image
              style={styles.cabecalhoFoto}
              source={{ uri: usuario.perfil }}
            />
          </View>
        </View>
        <FeedMetaComp
          atualizar={atualizar}
          setRenderizaMeta={setRenderizaMeta}
          renderizaPag={renderizaPag}
        />
        <FeedSaudeComp
          atualizar={atualizar}
          setRenderizaSaude={setRenderizaSaude}
          renderizaPag={renderizaPag}
        />
        <FeedAnaliseComp
          atualizar={atualizar}
          setRenderizaAnalise={setRenderizaAnalise}
          renderizaPag={renderizaPag}
        />
        <View style={styles.proverbio}>
          <Text style={styles.proverFrase}>{proverbioFrase}</Text>
          <Text style={styles.proverAutor}>{proverbioAutor}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: "rgba(0, 58, 54, 0.15)",
  },

  atualizar: {
    position: "absolute",
    top: 10,
    left: 10,
    zIndex: 1,
  },

  carregando: {
    marginTop: 350,
  },

  cabecalhoForma: {
    backgroundColor: "#003a36",
    width: "100%",
    height: 230,
  },

  cabecalho: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 30,
    marginLeft: 50,
    marginRight: 20,
  },

  cabecalhoTextoChamada: {
    color: "white",
    fontFamily: "Montserratb",
    fontSize: 33,

    // fontWeight: 'bold',
  },

  cabecalhoTextoNome: {
    color: "white",
    fontFamily: "Montserratn",
    fontSize: 21,
    // fontWeight: 'normal',
  },

  cabecalhoFoto: {
    width: 70,
    height: 70,
    borderRadius: 50,
  },

  proverbio: {
    width: "100%",
    alignItems: "center",
    marginTop: 70,
    marginBottom: 20,
  },

  proverFrase: {
    fontFamily: "Montserratb",
    fontSize: 14,
    color: "black",
    textAlign: 'center',
    width: 300
  },

  proverAutor: {
    fontFamily: "Montserratn",
    fontSize: 12,
    color: "black",
    textAlign: 'center',
  },
});
