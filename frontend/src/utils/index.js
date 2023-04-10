import axios from 'axios'

export default (postfix = '') => {
    return axios.create({
        baseURL: 'http://localhost:3000/api/' + postfix
    })
}