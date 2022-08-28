import axios from 'axios'
import { NPStart, NPDone } from '@/utils/nprogress.js'

// const baseURL = 'http://api.qingyunke.com/api.php'
const baseURL = 'apis'
const instance = axios.create({
  baseURL,
  timeout: 5000
})

// 请求拦截
instance.interceptors.request.use((config) => {
  NPStart() // 显示进度条
  return config
})

// 响应拦截
instance.interceptors.response.use(
  (res) => {
    NPDone() // 隐藏进度条
    if (res.status === 200) {
      return res.data
    } else {
      return res
    }
  },
  (err) => {
    return Promise.reject(err)
  }
)

export default (url, method, submitData) => {
  return instance({
    url,
    method,
    [method.toLowerCase() === 'get' ? 'params' : 'data']: submitData
  })
}
