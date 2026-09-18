import axios from "axios";
import type {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from "axios";

// 定义后端基础返回类型
export interface ResponseData<T = any> {
  code: number;
  data: T;
  msg: string;
}

// 创建axios实例
const service: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
});

// 请求拦截器
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("token");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    console.error("请求错误：", error);
    return Promise.reject(error);
  },
);

// 响应拦截器【修复后】
service.interceptors.response.use(
  (response: AxiosResponse) => {
    const res = response.data as ResponseData;
    if (res.code !== 200) {
      console.warn("接口业务异常：", res.msg);
      return Promise.reject(new Error(res.msg || "请求失败"));
    }
    // 关键：类型断言，告诉TS这里是合法返回
    return res as unknown as AxiosResponse;
  },
  (error: AxiosError<ResponseData>) => {
    const message = error.response?.data?.msg || error.message || "服务器异常";
    const status = error.response?.status;
    if (status === 401) {
      localStorage.removeItem("token");
      // router.push('/login')
    }
    console.error("响应错误：", message);
    return Promise.reject(error);
  },
);

export default service;
