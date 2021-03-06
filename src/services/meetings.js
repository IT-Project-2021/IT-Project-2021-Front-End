import axios from 'axios'

const baseUrl = 'https://it-project-2021-back-end.herokuapp.com/api/meetings'
// const baseUrl = 'http://localhost:4040/api/meetings'

// get all meetings in the database
const getAll = (token) => {
    let authToken = `Bearer ${token}`
    return axios.get(baseUrl, {headers: {'Authorization': authToken}})
}

// get one meeting object via ObjectID
const getByID = (id, token) => {
    let authToken = `Bearer ${token}`
    const meetingInfoUrl = baseUrl + "/" + id;
    return axios.get(meetingInfoUrl, {headers: {'Authorization': authToken}})
}

// create a new meeting
const create = (newMeeting, token) => {
  let authToken = `Bearer ${token}`
  return axios.post(baseUrl, newMeeting, {headers: {'Authorization': authToken}})
}

// get list of meetings by participantID
const getByParticipant = (participantID, token) => {
    let authToken = `Bearer ${token}`
    const queryURL = baseUrl + "/participant/" + participantID
    return axios.get(queryURL, {headers: {'Authorization': authToken}})
}

const remove = (id, info, token) => {
    let authToken = `Bearer ${token}`
    const Url = baseUrl + "/" + id
    return axios.delete(Url, {headers: {'Authorization': authToken}})
}

const update = (id, info, token) => {
    let authToken = `Bearer ${token}`
    const Url = baseUrl + "/" + id
    return axios.put(Url, info, {headers: {'Authorization': authToken}})
}

const meetingService = {
    getAll,
    getByID,
    create,
    getByParticipant,
    remove,
    update
}

export default meetingService

