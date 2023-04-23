import axios from "axios";
import Config from "../util/Config";

class MetaService {
  async configurar(data) {
    return axios({
      url: Config.API_URL + "/meta/configurar",
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
      url: Config.API_URL + "/meta/adicionar",
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

  async achar(data) {
    return axios({
      url: Config.API_URL + "/meta/achar",
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

const metaService = new MetaService();
export default metaService;
