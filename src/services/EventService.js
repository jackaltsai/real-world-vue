import axios from "axios";

const apiClient = axios.create({
    baseURL: 'https://my-json-server.typicode.com/jackaltsai/vue',
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application'
    }
})

export default {
    getEvents() {
        return apiClient.get('/events')
    },
    getEvent(id) {
        return apiClient.get('/events/' + id)
    },
}