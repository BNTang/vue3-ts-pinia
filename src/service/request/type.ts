import type { AxiosRequestConfig, AxiosResponse } from 'axios'

// 封装一些对应的类型接口
export interface NJInterceptors<T = AxiosResponse> {
  requestSuccessFn?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestFailureFn?: (err: any) => any
  responseSuccessFn?: (res: T) => T
  responseFailureFn?: (err: any) => any
}
// 在定义一个NJRequestConfig 接口 继承 AxiosRequestConfig
export interface NJRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: NJInterceptors<T>
}
