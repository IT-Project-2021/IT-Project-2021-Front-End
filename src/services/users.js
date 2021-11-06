import axios from 'axios'

const baseUrl = 'https://it-project-2021-back-end.herokuapp.com/api/users'
// const baseUrl = 'http://localhost:4040/api/users'

const updateUser = (id, newDetails, token) => {
  let authToken = `Bearer ${token}`
  let url = baseUrl + "/" + id
  return axios.put(url, newDetails, {headers: {'Authorization': authToken}})
}


const getInfo = (token) => {
  let authToken = `Bearer ${token}`
  return axios.get(baseUrl, {headers: {'Authorization': authToken}})
}

const userService = {
  updateUser,
  getInfo
}

export default userService