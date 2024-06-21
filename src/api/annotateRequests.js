import axios from 'axios'

const baseURL = 'https://annotator.camagakhan.com/api/annotate'

const myinstance = axios.create({
    baseURL
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



