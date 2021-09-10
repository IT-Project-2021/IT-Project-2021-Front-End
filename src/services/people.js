import axios from 'axios'

// NOTE: this will need to be changed after deployment
const baseUrl = 'http://localhost:4040/api/people'

const getAll = () => {
    return axios.get(baseUrl)
}

const peopleService = {
    getAll
}

export default peopleService