import axios from "axios";
import Config from "../util/Config";

class CustosService {
  async atualizar(data) {
    return axios({
      url: Config.API_URL + "/custos/atualizar",
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

  async excluir(data) {
    return axios({
      url: Config.API_URL + "/custos/excluir",
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

  async adicionar(data) {
    return axios({
      url: Config.API_URL + "/custos/adicionar",
      method: "POST",
      timeout: Config.TIMEOUT_REQUEST,
      params: data,
      headers: Config.HEADER_REQUEST,
    })
      .then((res) => {
        return Promise.resolve(res);
      })
      .catch((err) => {
        return Promise.reject(err);
      });
  }

  async listar(data) {
    return axios({
      url: Config.API_URL + "/custos/listar",
      method: "GET",
      params: data,
      timeout: Config.TIMEOUT_REQUEST,
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

const custosService = new CustosService();
export default custosService;
