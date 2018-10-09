import axios from 'axios'

export default () => {
  // console.log(process.env)
  // console.log(process.env.BASE_URL)
  return axios.create({
    baseURL: 'http://localhost:8081'
  })
}
