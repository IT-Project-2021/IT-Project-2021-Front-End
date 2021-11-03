import axios from 'axios'

const baseUrl = 'https://it-project-2021-back-end.herokuapp.com/api/people'
// const baseUrl = 'http://localhost:4040/api/people'

// get all people in the database
const getAll = (token) => {
    let authToken = `Bearer ${token}`
    return axios.get(baseUrl, {headers: {'Authorization': authToken}})
}

// get one person object via ObjectID
const getByID = (id, token) => {
    let authToken = `Bearer ${token}`
    //find where person info is stored
    const personInfoUrl = baseUrl + "/" + id;
    return axios.get(personInfoUrl, {headers: {'Authorization': authToken}})
}

// update an entry in the database
const update = (id, updated) => {
    const Url = baseUrl + "/" + id
    return axios.put(Url, updated)
}

// create a new person object
const create = (newPerson, token) => {
    let authToken = `Bearer ${token}`
    return axios.post(baseUrl, newPerson, {headers: {'Authorization': authToken}})
}
// delete a person object
const remove = (id, contact) => {
    const Url = baseUrl + "/" + id
    return axios.delete(Url, contact)
}

const peopleService = {
    getAll,
    getByID,
    create,
    update,
    remove
}

export default peopleService