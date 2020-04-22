import axios from 'axios'

const Axios = axios.create({
  baseURL: 'http://172.28.197.127:7010/api/v1/',
  timeout: 50000,
  header:{
    'Content-Type':'application/json'
  }
})

export default Axios