import axios, {
  InternalAxiosRequestConfig,
  AxiosRequestHeaders,
  AxiosResponse,
  AxiosRequestConfig,
} from "axios";
import { useToken } from "../../../layouts/auth/store/token";

const api: string = "https://edunex.omarov.me/api";

axios.defaults.baseURL = api;
const { getToken } = useToken();

axios.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const accessToken = getToken();

    if (accessToken) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${accessToken}`,
      } as AxiosRequestHeaders;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// axios.interceptors.request.use(
//   async (config: InternalAxiosRequestConfig) => {
//     const lang = localStorage.getItem("app-lang")
//       ? localStorage.getItem("app-lang")
//       : "en";
//     config.headers = {
//       ...config.headers,
//       "Accept-Language": lang,
//     } as any;

//     return config;
//   },
//   (error) => Promise.reject(error)
// );
axios.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error) => {
    var getUrl = window.location;
    var baseUrl = getUrl.protocol + "//" + getUrl.host;
    const config = error?.config as AxiosRequestConfig;
    if (error?.response?.status === 401) {
      window.location.replace(baseUrl + "/auth");
      return axios(config);
    }
    return Promise.reject(error);
  }
);

export const privateAxios = axios;
