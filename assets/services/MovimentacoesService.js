import axios from "axios";
import Config from "../util/Config";

class MovimentacoesService {
  async atualizar(data) {
    return axios({
      url: Config.API_URL + "/movimentacoes/atualizar",
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
      url: Config.API_URL + "/movimentacoes/adicionar",
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
      url: Config.API_URL + "/movimentacoes/listar",
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

const movimentacoesService = new MovimentacoesService();
export default movimentacoesService;
