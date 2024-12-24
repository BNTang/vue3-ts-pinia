import { BASE_URL, TIME_OUT } from './config'
import NJRequest from './request'

const njRequest = new NJRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestSuccessFn: (config) => {
      // console.log('请求成功拦截')
      return config
    },
    requestFailureFn: (err) => {
      // console.log('请求失败拦截')
      return err
    },
    responseSuccessFn: (res) => {
      // console.log('响应成功拦截')
      return res
    },
    responseFailureFn: (err) => {
      // console.log('响应失败拦截')
      return err
    }
  }
})

export default njRequest
