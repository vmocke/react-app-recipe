import { useState, useEffect } from "react"

export default httpClient => {
    const [error, setEror] = useState(null)
    
    const reqInterceptor = httpClient.interceptors.request.use(req => {
        setEror(null)
        return req
    })
    const resInterceptor = httpClient.interceptors.response.use(res => res, err => {
        setEror(err)
    })
    
    useEffect(() => {
        return() => {
            httpClient.interceptors.request.eject(reqInterceptor)
            httpClient.interceptors.response.eject(resInterceptor)
        }
    }, [httpClient.interceptors.request, httpClient.interceptors.response, reqInterceptor, resInterceptor])
    
    const errorConfirmedHandler = () => {
        setEror(null)
    }

    return [error, errorConfirmedHandler]

}
