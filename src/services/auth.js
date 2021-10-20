import axios from 'axios'

const baseUrl = 'https://it-project-2021-back-end.herokuapp.com/api/auth'


// attempt to authorise the user
const attemptLogin = (loginDetails) => {
  const loginURL = baseUrl + "/login"
  return axios.post(loginURL, loginDetails)
}

// get a random number if authorised
// used to test authentication
const getRandomNum = (token) => {
  const Url = baseUrl + "/random-number"
  const tokenHeader = 'Bearer ' + token
  return axios.get(Url, {headers: {'Authorization': tokenHeader}})
}

const authService = {
  attemptLogin,
  getRandomNum
}

export default authService