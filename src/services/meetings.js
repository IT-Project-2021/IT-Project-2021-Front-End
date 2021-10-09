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
    console.log("URL queried:", meetingInfoUrl);
    return axios.get(meetingInfoUrl)
}

// create a new meeting
const create = (newMeeting) => {
  return axios.post(baseUrl, newMeeting)
}

const meetingService = {
    getAll,
    getByID,
    create
}

export default meetingService 

