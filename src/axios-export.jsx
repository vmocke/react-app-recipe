import axios from "axios"

export const fire = axios.create({
    baseURL: `https://recipes-edamam.firebaseio.com/`
})
    
export const edamam = axios.create({
    baseURL: `https://api.edamam.com/`
})