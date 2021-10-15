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
    console.log("URL queried:", personInfoUrl);
    return axios.get(personInfoUrl)
}

// create a new person object
const create = (newPerson) => {
    return axios.post(baseUrl, newPerson)
}


const peopleService = {
    getAll,
    getByID,
    create
}

export default peopleService