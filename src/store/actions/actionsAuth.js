import * as actionTypes from "./actionTypes"
import axios from "axios"
import * as actionsRecipe from "./actionsRecipe"

export const authStart = ()  => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (idToken_, localId_) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: idToken_,
        userId: localId_
    }
}

export const authFail = (error_) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error_
    }
}

export const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("expirationDate")
    localStorage.removeItem("userId")
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
            setTimeout(() => {
                dispatch(logout())
                dispatch(actionsRecipe.onLogoutClear())
            }, expirationTime * 1000);
    }
}

export const setAuthRedirectPath = (path_) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path_
    }
}

export const auth = (email_, password_, isSignup_) => {
    return dispatch => {
        dispatch(authStart())
        const API_KEY = "AIzaSyAgAaO9K2YKYX-hSFMMdiCxQTvj7EMs130"
        const authData = {
            email: email_,
            password: password_,
            returnSecureToken: true
        }

        let url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`
        if(!isSignup_) {
            url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`
        }

        axios.post(url, authData)
            .then((response) => {
                //console.log(response);
                const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000)
                localStorage.setItem("token", response.data.idToken)
                localStorage.setItem("expirationDate", expirationDate)
                localStorage.setItem("userId", response.data.localId)
                dispatch(authSuccess(response.data.idToken, response.data.localId))
                dispatch(checkAuthTimeout(response.data.expiresIn))
                
            })
            .catch((error) => {
                console.log("klaida email?: ", error)
                dispatch(authFail(error.response.data.error))
            })
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem("token")
        if(!token) {
            dispatch(logout())
        } else {
            const expirationDate = new Date(localStorage.getItem("expirationDate"))
            if(expirationDate <= new Date()) {
                dispatch(logout())
            } else {
                const userId = localStorage.getItem("userId")
                dispatch(authSuccess(token, userId))
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000))
            }
        }
    }
}