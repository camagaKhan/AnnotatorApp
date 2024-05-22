import axios from 'axios'

let baseURL = 'http://localhost:5011/api/annotate'

export const requests = {
    get: async (url) => {
        const { data } = await axios.get(`${baseURL}${url}`)
        return data
    },
    post : async (url, obj) => {
        return await axios.post(`${baseURL}${url}`, obj)
    }
}



