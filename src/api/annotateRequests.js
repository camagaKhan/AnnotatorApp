import axios from 'axios'

let baseURL = 'https://weak-stars-stick.loca.lt/api/annotate'

const myinstance = axios.create({
    baseURL,
    headers : {
        'bypass-tunnel-reminder' : true
    }
})

export const requests = {
    get: async (url) => {
        const { data } = await myinstance.get(url)
        return data
    },
    post : async (url, obj) => {
        return await myinstance.post(url, obj)
    }
}



