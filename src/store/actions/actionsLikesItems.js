import * as actionsType from "./actionTypes"
import { fire } from "../../axios-export"

export const onSendItemToServerStart = (likesRecipesNew) => {
    return {
        type: actionsType.SEND_ITEM_TO_SERVER_START,
        likesRecipesNew: likesRecipesNew
    }
}

export const onSendItemToServerSuccess = (fireId, likesRecipesNew) => {
    return {
        type: actionsType.SEND_ITEM_TO_SERVER_SUCCESS,
        likesItemsList: likesRecipesNew,
        fireId: fireId
    }
}

export const onSendItemToServerFail = (error) => {
    return {
        type: actionsType.SEND_ITEM_TO_SERVER_FAIL,
        error: error
    }
}

export const onSendItemToServer = (likesRecipesNew, token, userId) => {
    return dispatch => {
        dispatch(onSendItemToServerStart(likesRecipesNew))
        fire.post(`likesItems/${userId}.json?auth=${token}`, likesRecipesNew)
        .then(response => {
            dispatch(onSendItemToServerSuccess(response.data.name, likesRecipesNew))
        })
        .catch(error => {
            dispatch(onSendItemToServerFail(error))
        })
    }
}
/////////////////////////////////////////////////////////////////////////
export const fecthLikesItemsStart = () => {
    return {
        type:actionsType.FETCH_LIKES_ITEMS_FROM_SERVER_START
    }
}

export const fecthLikesItemsSuccess = (fetchedLikesList) => {
    return {
        type:actionsType.FETCH_LIKES_ITEMS_FROM_SERVER_SUCCESS,
        likesItemsList: fetchedLikesList
    }
}

export const fecthLikesItemsFail = (error) => {
    return {
        type:actionsType.FETCH_LIKES_ITEMS_FROM_SERVER_FAIL,
        error: error
    }
}

export const fetchLikesItemsList = (token_, userId_) => {
    return dispatch => {
        dispatch(fecthLikesItemsStart())
        const queryParams = `?auth=${token_}"`
        fire.get(`likesItems/${userId_}.json${queryParams}`)
            .then((response) => {
                const fetchedLikesList = []
                for (let key in response.data) {
                    fetchedLikesList.push({
                        ...response.data[key]
                    });
                }
                dispatch(fecthLikesItemsSuccess(fetchedLikesList))
            })
            .catch((error) => {
                dispatch(fecthLikesItemsFail(error))
            })
    }
}
/////////////////////////////////////////////////////////////////////////
export const onItemDeleteInServerStart = () => {
    return {
        type: actionsType.REMOVE_ITEM_IN_SERVER_START
    }
}
export const onItemDeleteInServerSuccess = (newLikesRescipes) => {
    return {
        type: actionsType.REMOVE_ITEM_IN_SERVER_SUCCESS,
        likesRecipes: newLikesRescipes
    }
}
export const onItemDeleteInServerServerFail = (error) => {
    return {
        type: actionsType.REMOVE_ITEM_IN_SERVER_FAIL,
        error: error
    }
}

export const onItemDeleteInServer = (newLikesRescipes, token, userId) => {
    const likesRecipesNew = {...newLikesRescipes}
    return dispatch => {
        dispatch(onItemDeleteInServerStart())
        fire.put(`likesItems/${userId}.json?auth=${token}`, likesRecipesNew)
        .then(response => {
            dispatch(onItemDeleteInServerSuccess(likesRecipesNew))
        })
        .catch(error => {
            dispatch(onItemDeleteInServerServerFail(error))
        })
    }
}