import axios from 'axios'

let baseURL = 'https://cool-lines-fly.loca.lt/api/annotate'

export const requests = {
    get: async (url) => {
        const { data } = await axios.get(`${baseURL}${url}`)
        return data
    },
    post : async (url, obj) => {
        return await axios.post(`${baseURL}${url}`, obj)
    }
}



