import axios from 'axios'

const baseUrl = 'https://it-project-2021-back-end.herokuapp.com/api/people'

// get all people in the database
const getAll = () => {
    return axios.get(baseUrl)
}

// get one person object via ObjectID
const getByID = (id) => {
    //find where person info is stored
    const personInfoUrl = baseUrl + "/" + id;
    return axios.get(personInfoUrl)
}

// update an entry in the database
const update = (id, updated) => {
    const Url = baseUrl + "/" + id
    return axios.put(Url, updated)
}

const peopleService = {
    getAll,
    getByID,
    update
}

export default peopleService