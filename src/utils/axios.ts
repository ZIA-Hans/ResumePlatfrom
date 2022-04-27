import axios from "axios";
import { ElMessage } from 'element-plus'
import store from "../store";

const baseURL = 'http://localhost:3001';

const request = axios.create({
    baseURL,
    timeout: 20000
})

axios.interceptors.request.use(
    (response) => {
      /**
       * 根据你的项目实际情况来对 config 做处理
       * 这里对 config 不做任何处理，直接返回
       */
      const { user } = store.state;
      if(user && user.token) {
        response.headers.Authorization = `Bearer ${user.token}`;
      } 
      return response
    },
    (error) => {
      return Promise.reject(error)
    }
  )


  axios.interceptors.response.use(
    (response) => {
      /**
       * 根据你的项目实际情况来对 response 和 error 做处理
       * 这里对 response 和 error 不做任何处理，直接返回
       */
      return response
    },
    (error) => {
      if (error.response && error.response.data) {
        const code = error.response.status
        const msg = error.response.data.message
        ElMessage.error(`Code: ${code}, Message: ${msg}`)
        console.error(`[Axios Error]`, error.response)
      } else {
        ElMessage.error(`${error}`)
      }
      return Promise.reject(error)
    }
  )

  // export default request

export default {
  post(url: string, data?:any) {
    return new Promise((resolve, reject) => {
      request({
        method: 'post',
        // url: `${baseURL}${url}`,
        url,
        data
      })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      })
    })
  },

  get(url: string, data?: any) {
    return new Promise((resolve, reject) => {
      request({
        method: 'get',
        // url: `${baseURL}${url}`
        url,
        data
      })
      .then((res) => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      })
    })
  }
}