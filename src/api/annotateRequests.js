import axios from 'axios'

const baseURL = 'http://localhost:5011/api/annotate'//'https://camagakhan.ngrok.app/api/annotate' //'https://fancy-cycles-jam.loca.lt/api/annotate'

const myinstance = axios.create({
    baseURL,
    // headers: {
    //     'bypass-tunnel-reminder': 'https://camagakhan.github.io/AnnotatorApp/'
    // }
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



