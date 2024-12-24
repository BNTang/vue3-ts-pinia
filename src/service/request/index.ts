import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { NJRequestConfig } from './type'

class NJRequest {
  instance: AxiosInstance

  // axios的实例
  constructor(config: NJRequestConfig) {
    this.instance = axios.create(config)

    // 每个instance实例都添加拦截器
    this.instance.interceptors.request.use(
      (config) => {
        // 全局请求拦截成功处理
        // console.log('全局请求拦截成功处理')
        return config
      },
      (err) => {
        // 全局请求拦截失败处理
        // console.log('全局请求拦截失败处理')
        return err
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        // 全局响应拦截成功处理
        // console.log('全局响应拦截成功处理')
        return res.data
      },
      (err) => {
        // 全局响应拦截失败处理
        // console.log('全局响应拦截失败处理')
        return err
      }
    )

    // 针对特定的实例添加拦截器
    this.instance.interceptors.request.use(
      config.interceptors?.requestFailureFn,
      config.interceptors?.requestSuccessFn
    )
    this.instance.interceptors.response.use(
      config.interceptors?.responseFailureFn,
      config.interceptors?.responseSuccessFn
    )
  }

  // 封装网络请求的方法
  request<T = any>(config: NJRequestConfig<T>) {
    // 单次请求的成功拦截处理
    if (config.interceptors?.requestSuccessFn) {
      config = config.interceptors.requestSuccessFn(config)
    }

    // 返回Promise
    return new Promise<T>((resolve, reject) => {
      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 单词响应的成功拦截处理
          if (config.interceptors?.responseSuccessFn) {
            res = config.interceptors.responseSuccessFn(res)
          }
          resolve(res)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  get<T = any>(config: NJRequestConfig<T>) {
    return this.request({ ...config, method: 'GET' })
  }
  post<T = any>(config: NJRequestConfig<T>) {
    return this.request({ ...config, method: 'POST' })
  }
  delete<T = any>(config: NJRequestConfig<T>) {
    return this.request({ ...config, method: 'DELETE' })
  }
  put<T = any>(config: NJRequestConfig<T>) {
    return this.request({ ...config, method: 'PUT' })
  }
  patch<T = any>(config: NJRequestConfig<T>) {
    return this.request({ ...config, method: 'PATCH' })
  }
}

export default NJRequest
