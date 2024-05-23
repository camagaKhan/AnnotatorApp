import axios from 'axios'

let baseURL = 'https://tough-corners-prove.loca.lt/api/annotate' //'https://fancy-cycles-jam.loca.lt/api/annotate'

const myinstance = axios.create({
    baseURL,
    headers: {
        'bypass-tunnel-reminder': 'https://camagakhan.github.io/AnnotatorApp/'
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



