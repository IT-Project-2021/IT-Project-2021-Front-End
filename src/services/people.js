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

// create a new person object
const create = (newPerson) => {
    return axios.post(baseUrl, newPerson)
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