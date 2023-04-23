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
  StatusBar,
  ActivityIndicator,
  ImageBackground,
} from "react-native";
import { Header, Input } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import usuarioService from "../services/UsuarioService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoginFormCodigo from "./componentes/LoginFormCodigo";
import LoginFormLogin from "./componentes/LoginFormLogin";

export default function Login() {
  const navigation = useNavigation();
  const [offset] = useState(new Animated.ValueXY({ x: 0, y: 50 }));
  const [opacity] = useState(new Animated.Value(0));
  const [logoW] = useState(new Animated.Value(250));
  const [logoH] = useState(new Animated.Value(150));
  const [codigo, setCodigo] = useState("");

  const [usuarioA, setUsuarioA] = useState({});
  const [pagForm, setPagForm] = useState(1);
  const [carregandoToken, setCarregandoToken] = useState(true);
  const [visibilidadeCodigo, setVisibilidadeCodigo] = useState(false);

  function tecladoEntra() {
    Animated.timing(logoW, {
      toValue: 170,
      duration: 500,
      useNativeDriver: false,
    }).start();

    Animated.timing(logoH, {
      toValue: 100,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }

  function tecladoSai() {
    Animated.timing(logoW, {
      toValue: 250,
      duration: 500,
      useNativeDriver: false,
    }).start();
    Animated.timing(logoH, {
      toValue: 150,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }

  function loginAuto(token) {
    console.log('token')
    let data = { token: token };
    usuarioService
      .loginAuto(data)
      .then((res) => {
        setCarregandoToken(false);
        let usuario = {
          id: res.data.idUsuario,
          nome: res.data.usuario,
          perfil: res.data.perfil,
        };
        AsyncStorage.setItem("USUARIO", JSON.stringify(usuario)).then(() => {
          navigation.reset({
            index: 0,
            routes: [
              {
                name: "Principal",
              },
            ],
          });
        });
      })
      .catch((err) => {
        setCarregandoToken(false);
      });
  }

  function validar() {
    let data = {
      codigo: codigo,
    };
    usuarioService
      .achar(data)
      .then((res) => {
        if (res.data) {
          console.log(res.data)
          setUsuarioA({
            id: res.data.id,
            nome: res.data.nome,
            perfil: res.data.perfil,
            descricaoSaude: res.data.descricaoSaude,
            descricaoAnalise: res.data.descricaoAnalise
          });
          setPagForm(2);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function cuidarCadastrar(usuario) {
    AsyncStorage.setItem("USUARIO", JSON.stringify(usuario)).then(() => {
      navigation.reset({
        index: 0,
        routes: [
          {
            name: "Principal",
          },
        ],
      });
    });
  }

  function cuidarEntrar(usuario) {
    AsyncStorage.setItem("USUARIO", JSON.stringify(usuario)).then((res) => {
      console.log(res)
      navigation.reset({
        index: 0,
        routes: [
          {
            name: "Principal",
          },
        ],
      });
    });
  }

  useEffect(() => {
    // AsyncStorage.getItem("TOKEN").then((token) => {
    //   if(token){
    //     loginAuto(token);
    //   }
    // }).catch((err)=>{console.log(err)})

    keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      tecladoEntra
    );
    KeyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      tecladoSai
    );

    Animated.parallel([
      Animated.spring(offset.y, {
        toValue: 0,
        speed: 1,
        bounciness: 5,
        useNativeDriver: false,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false,
      }),
    ]).start();
  }, []);

  return (
    <ImageBackground
      source={require("../img/foto_login.jpg")}
      style={styles.tela}
    >
      <StatusBar barStyle="light-content" translucent={true} />
      <View>
        <Image style={styles.logo} source={require("../img/logo.png")} />
      </View>
      <View style={styles.fundoConteiner}></View>
      <View style={styles.conteiner}>
        {pagForm == 1 ? (
          <View style={styles.chamada}>
            <Text style={styles.chamadaTexto}>
              Seja bem vindo a essa nova etapa da organização das suas finanças.
            </Text>
            <Text style={styles.chamadaTexto}>
              Se chegou até aqui é por que já aprendeu a importância da
              organização financeira para a sua vida. Esse é o momento de
              avançar para novos níveis e horizontes!
            </Text>
          </View>
        ) : null}
        {/* {!carregandoToken ? ( */}
          <Animated.View
            style={[
              styles.inputs,
              { opacity: opacity, transform: [{ translateY: offset.y }] },
            ]}
          >
            {pagForm == 1 ? (
              <>
                {visibilidadeCodigo ? (
                  <>
                    <View style={styles.inputV}>
                      <Input
                        style={styles.input}
                        placeholder="Código de cadastro"
                        autoCorrect={false}
                        onChangeText={(value) => {
                          setCodigo(value);
                        }}
                      />
                    </View>
                    <TouchableOpacity style={styles.bt} onPress={() => {}}>
                      <Text
                        style={styles.textoBt}
                        onPress={() => {
                          validar();
                        }}
                      >
                        Cadastrar login e senha
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.bt2}
                      onPress={() => {
                        setVisibilidadeCodigo(false);
                      }}
                    >
                      <Text style={styles.textoBt}>Voltar</Text>
                    </TouchableOpacity>
                  </>
                ) : (
                  <>
                    <TouchableOpacity style={styles.bt} onPress={() => {}}>
                      <Text
                        style={styles.textoBt}
                        onPress={() => {
                          setVisibilidadeCodigo(true);
                        }}
                      >
                        Entrar com código de cadastro
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.bt2}
                      onPress={() => {
                        setPagForm(3);
                      }}
                    >
                      <Text style={styles.textoBt}>Já tenho conta</Text>
                    </TouchableOpacity>
                  </>
                )}
              </>
            ) : null}
            {pagForm == 2 ? (
              <LoginFormCodigo
                cuidarCadastrar={cuidarCadastrar}
                usuario={usuarioA}
              />
            ) : null}
            {pagForm == 3 ? (
              <LoginFormLogin cuidarEntrar={cuidarEntrar} />
            ) : null}
          </Animated.View>
        {/* // ) : (
        //   <ActivityIndicator style={styles.indicador} />
        // )} */}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    alignItems: "center",
    paddingBottom: 20,
  },

  logo: {
    width: 100,
    height: 60,
    marginTop: 60,
    // flex: 5,
    // alignItems: "center",
    // justifyContent: "flex-start",
  },

  foto: {
    width: 350,
    height: 420,
    marginTop: 40,
  },

  subtitulo: {
    textAlign: "center",
    fontSize: 15,
    fontFamily: "Montserratb",
  },

  titulo: {
    // color: "white",
    textAlign: "center",
    // marginLeft: 20,
    // marginRight: 20,
    fontSize: 30,
    fontFamily: "Montserratb",
  },

  conteiner: {
    width: "100%",
    height: "37%",
    // backgroundColor: '#D9E2E1',
    position: "absolute",
    bottom: 0,
    left: 0,
    marginBottom: 50,
    flexDirection: "column",
    alignItems: "center",
  },

  fundoConteiner: {
    backgroundColor: "black",
    opacity: 0.5,
    width: "100%",
    height: "45%",
    position: "absolute",
    bottom: 0,
    left: 0,
    borderTopLeftRadius: 50,
  },

  chamada: {
    marginLeft: 40,
    marginRight: 40,
    marginTop: 15,
    marginBottom: 20,
  },

  chamadaTexto: {
    textAlign: "center",
    fontSize: 15,
    fontFamily: "Montserratn",
    color: "white",
    marginTop: 10,
  },

  indicador: {
    flex: 1,
  },

  inputV: {
    marginBottom: -15,
  },

  input: {
    color: "white",
  },

  bt: {
    backgroundColor: "#003a36",
    width: "80%",
    height: 50,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
  },

  bt2: {
    height: 50,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
  },

  textoBt: {
    color: "#FFF",
    fontSize: 15,
    fontFamily: "Montserratb",
    height: 50,
    textAlignVertical: "center",
  },
});
