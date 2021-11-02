import axios from 'axios'

// TODO change back
// const baseUrl = 'https://it-project-2021-back-end.herokuapp.com/api/meetings'
const baseUrl = 'http://localhost:4040/api/meetings'

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
const create = (newMeeting) => {
  return axios.post(baseUrl, newMeeting)
}

// get list of meetings by participantID
const getByParticipant = (participantID) => {
    const queryURL = baseUrl + "/participant/" + participantID
    return axios.get(queryURL)
}

const meetingService = {
    getAll,
    getByID,
    create,
    getByParticipant
}

export default meetingService 

