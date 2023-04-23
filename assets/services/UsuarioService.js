import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Config from "../util/Config";

class UsuarioService {
  async adicionar(data) {
    return axios({
      url: Config.API_URL + "/usuario/adicionar",
      method: "POST",
      timeout: Config.TIMEOUT_REQUEST,
      data: data,
      headers: Config.HEADER_REQUEST,
    })
      .then((res) => {
        return Promise.resolve(res);
      })
      .catch((err) => {
        return Promise.reject(err);
      });
  }

  async login(data) {
    return axios({
      url: Config.API_URL + "/auth/login",
      method: "POST",
      timeout: Config.TIMEOUT_REQUEST,
      data: data,
      headers: Config.HEADER_REQUEST,
    })
      .then((res) => {
        AsyncStorage.setItem("TOKEN", res.data.access_token);
        return Promise.resolve(res);
      })
      .catch((err) => {
        return Promise.reject(err);
      });
  }

  async achar(data) {
    return axios({
      url: Config.API_URL + "/usuario/achar",
      method: "PUT",
      timeout: Config.TIMEOUT_REQUEST,
      data: data,
      headers: Config.HEADER_REQUEST,
    })
      .then((res) => {
        return Promise.resolve(res);
      })
      .catch((err) => {
        return Promise.reject(err);
      });
  }

  async loginAuto(data) {
    return axios({
      url: Config.API_URL + "/auth/login-auto",
      method: "POST",
      timeout: Config.TIMEOUT_REQUEST,
      data: data,
      headers: Config.HEADER_REQUEST,
    })
      .then((res) => {
        if (res.data.access_token) {
          AsyncStorage.setItem("TOKEN", res.data.access_token);
          return Promise.resolve(res);
        } else {
          return Promise.reject(res);
        }
      })
      .catch((err) => {
        return Promise.reject(err);
      });
  }

  async atualizar(data) {
    return axios({
      url: Config.API_URL + "/usuario/atualizar",
      method: "PUT",
      timeout: Config.TIMEOUT_REQUEST,
      data: data,
      headers: Config.HEADER_REQUEST,
    })
      .then((res) => {
        return Promise.resolve(res);
      })
      .catch((err) => {
        return Promise.reject(err);
      });
  }
}

const usuarioService = new UsuarioService();
export default usuarioService;
