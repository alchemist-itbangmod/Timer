import axios from 'axios'

let instance = axios.create({
  baseURL: `/api/v1`
})

export default instance