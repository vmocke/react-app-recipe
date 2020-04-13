import * as actionTypes from "./actionTypes"
import { edamam } from "../../axios-export"

const app_id = "92dc9a8d";
const app_key = "6c2e6d031e734bf9005d68cc87eed15e";

////////////////////////////////////////////////////////////////////
export const fetchRecipeStart = (searchInput) => {
    return {
        type: actionTypes.FETCH_RECIPE_DATA_START,
        searchInput: searchInput
    }
}

export const fetchRecipeFail = (error) => {
    return {
        type: actionTypes.FETCH_RECIPE_DATA_FAIL,
        err: error
    }
}

export const fetchRecipeSuccess = (response) => {
    return {
        type: actionTypes.FETCH_RECIPE_DATA_SUCCESS,
        recipe: response
    }
}

export const getRecipe = (searchInput) => {
    return dispatch => {
        dispatch(fetchRecipeStart(searchInput))
        edamam.get(`search?q=${searchInput.value}&app_id=${app_id}&app_key=${app_key}&to=50`)
            .then(response => {
                console.log(response)
                dispatch(fetchRecipeSuccess(response))
            })
            .catch(error => {
                console.log(error)
                dispatch(fetchRecipeFail(error))
            })
    }
}
////////////////////////////////////////////////////////////////////
export const getChosenRecipeStart = () => {
    return {
        type: actionTypes.GET_CHOSEN_RECIPE_START
    }
}
export const getChosenRecipeSuccess = (selectedItem_, shoppingIngList_) => {
    return {
        type: actionTypes.GET_CHOSEN_RECIPE_SUCCESS,
        chosenRecipe: selectedItem_,
        shoppingIngList: shoppingIngList_
    }
}
export const onResultItemClick = (selectedItem_, shoppingIngList_) => {
    return dispatch => {
        dispatch(getChosenRecipeStart())
        setTimeout(() => {
            dispatch(getChosenRecipeSuccess(selectedItem_, shoppingIngList_))      
        }, 500);
        
    }
}
////////////////////////////////////////////////////////////////////
export const moveToShoppingListStart = () => {
    return {
        type: actionTypes.MOVE_ITEM_ING_TO_SHOP_LIST_START
    }
}
export const moveToShoppingListSuccess = (moveToShoppingList_) => {
    return {
        type: actionTypes.MOVE_ITEM_ING_TO_SHOP_LIST_SUCCESS,
        moveToShoppingList: moveToShoppingList_
    }
}
export const onShopingListButton = (moveToShoppingList_) => {
    return dispatch => {
        dispatch(moveToShoppingListStart())
        setTimeout(() => {
            dispatch(moveToShoppingListSuccess(moveToShoppingList_))       
        }, 500);
    }
}
///////////////////////////////////////////////////////////////////////
export const deleteShoppingIngSuccess = (newShoppingIngList_) => {
    return {
        type: actionTypes.DELETE_SHOPPING_ING_SUCCESS,
        shoppingIngList: newShoppingIngList_
    }
}
export const onShopingIngDelete = (newShoppingIngList_) => {
    return dispatch => {
        dispatch(deleteShoppingIngSuccess(newShoppingIngList_))
    }
}

export const oldIngListShowStart = () => {
    return {
        type: actionTypes.OLD_ING_LIST_SHOW_START
    }
}

export const oldIngListShowSuccess = (shoppingIngListReserved_) => {
    return {
        type: actionTypes.OLD_ING_LIST_SHOW_SUCCESS,
        shoppingIngListReserved: shoppingIngListReserved_
    }
}

export const onAfterAllIngDeleted = (shoppingIngListReserved_) => {
    return dispatch => {
        dispatch(oldIngListShowStart())
        dispatch(oldIngListShowSuccess(shoppingIngListReserved_))
    }
}
///////////////////////////////////////////////////////////////////////////
export const moveItemToLikesSuccess = (likesRecipesNew) => {
    return {
        type: actionTypes.MOVE_ITEM_TO_LIKES_SUCCESS,
        likesRecipes: likesRecipesNew
    }
}

export const onLikeButton = (likesRecipesNew) => {
    return dispatch => {
        dispatch(moveItemToLikesSuccess(likesRecipesNew))
    }
}
///////////////////////////////////////////////////////////////////////////
export const removeLikesItemSuccess = (newLikesRescipes) => {
    return {
        type: actionTypes.REMOVE_ITEM_LOCAL_SUCCESS,
        likesRecipes: newLikesRescipes
    }
}

export const onItemDeleteLocal = (newLikesRescipes) => {
    return dispatch => {
        dispatch(removeLikesItemSuccess(newLikesRescipes))
    }
}
///////////////////////////////////////////////////////////////////////////
export const onDisplayChosenRecipeSuccess = (newChosenRecipe_, shoppingIngList) => {
    return {
        type: actionTypes.DISPLAY_CHOSEN_LIKE_ITEM_SUCCESS,
        chosenRecipe: newChosenRecipe_,
        shoppingIngList: shoppingIngList
    }
}

export const onDisplayChosenRecipe = (newChosenRecipe_, shoppingIngList) => {
    return dispatch => {
        dispatch(onDisplayChosenRecipeSuccess(newChosenRecipe_, shoppingIngList))
    }
}
////////////////////////////////////////////////////////////////////
export const onLogoutClearReducers = () => {
    return {
        type: actionTypes.AUTH_LOGOUT_CLEAR
    }
}

export const onLogoutClear = () => {
    return dispatch => {
        dispatch(onLogoutClearReducers())
    }
}