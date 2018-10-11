import axios from 'axios'

export default () => {
  // console.log(process.env)
  // console.log(process.env.BASE_URL)
  return axios.create({
    baseURL: process.env.VUE_APP_AXIOS_URL
  })
}
