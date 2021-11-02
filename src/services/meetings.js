import axios from 'axios'

const baseUrl = 'https://it-project-2021-back-end.herokuapp.com/api/meetings'

// get all meetings in the database
const getAll = () => {
    return axios.get(baseUrl)
}

// get one meeting object via ObjectID
const getByID = (id) => {
    //find where meeting info is stored
    const meetingInfoUrl = baseUrl + "/" + id;
    return axios.get(meetingInfoUrl)
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

const remove = (id, info) => {
    const Url = baseUrl + "/" + id
    return axios.delete(Url, info)
}

const meetingService = {
    getAll,
    getByID,
    create,
    getByParticipant,
    remove
}

export default meetingService

