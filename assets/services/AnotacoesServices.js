import axios from "axios";
import Config from "../util/Config";

class AnotacoesService {
    async listar(data) {
      return axios({
        url: Config.API_URL + "/anotacoes/listar",
        method: "GET",
        timeout: Config.TIMEOUT_REQUEST,
        params: data,
        headers: Config.HEADER_REQUEST
      })
        .then((res) => {
          return Promise.resolve(res);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    }

//   async adicionar(data) {
//     return axios({
//       url: Config.API_URL + "/anotacoes/adicionar",
//       method: "POST",
//       timeout: Config.TIMEOUT_REQUEST,
//       params: data,
//       headers: Config.HEADER_REQUEST
//     })
//       .then((res) => {
//         return Promise.resolve(res);
//       })
//       .catch((err) => {
//         return Promise.reject(err);
//       });
//   }

  async atualizar(data) {
    return axios({
      url: Config.API_URL + "/anotacoes/atualizar",
      method: "PUT",
      timeout: Config.TIMEOUT_REQUEST,
      data: data,
      headers: Config.HEADER_REQUEST
    })
      .then((res) => {
        return Promise.resolve(res);
      })
      .catch((err) => {
        return Promise.reject(err);
      });
  }

//   async resetar(data) {
//     return axios({
//       url: Config.API_URL + "/anotacoes/resetar",
//       method: "PUT",
//       timeout: Config.TIMEOUT_REQUEST,
//       data: data,
//       headers: Config.HEADER_REQUEST
//     })
//       .then((res) => {
//         return Promise.resolve(res);
//       })
//       .catch((err) => {
//         return Promise.reject(err);
//       });
//   }

}

const anotacoesService = new AnotacoesService();
export default anotacoesService;
