import axios from 'axios'

const baseUrl = 'https://it-project-2021-back-end.herokuapp.com/api/auth'

// attempt to authorise the user
const attemptLogin = (loginDetails) => {
  const loginURL = baseUrl + "/login"
  return axios.post(loginURL, loginDetails)
}

const authService = {
  attemptLogin
}

export default authService