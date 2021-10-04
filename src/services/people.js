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

const peopleService = {
    getAll,
    getByID
}

export default peopleService