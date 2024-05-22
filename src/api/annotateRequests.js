import axios from 'axios'

let baseURL = 'https://vast-swans-double.loca.lt/api/annotate'

axios.create({
    baseURL,
    headers : {
        'bypass-tunnel-reminder' : true
    }
})

export const requests = {
    get: async (url) => {
        const { data } = await axios.get(url)
        return data
    },
    post : async (url, obj) => {
        return await axios.post(url, obj)
    }
}



