import React, { useEffect, useCallback } from 'react'
import classes from "./Shopping.module.css"
import ShoppingItem from "./ShoppingItem/ShoppingItem"
import { useSelector, useDispatch } from 'react-redux'
import * as actionsRecipe from "../../store/actions/actionsRecipe"
import Spinner from '../UI/Spinner/Spinner'

const Shopping = (props) => {
    const moveToShoppingList_ = useSelector(state => state.reducer_Recipe.moveToShoppingList)
    const shoppingIngList_ = useSelector(state => state.reducer_Recipe.shoppingIngList)
    const shoppingIngListReserved_ = useSelector(state => state.reducer_Recipe.shoppingIngListReserved)
    const spinnerShoppingList_ = useSelector(state => state.reducer_Recipe.spinnerShoppingList)

    const dispatch = useDispatch()
    const on_Shoping_Ing_Delete_Handler = (newShoppingIngList_) => dispatch(actionsRecipe.onShopingIngDelete(newShoppingIngList_))
    const on_After_All_Ing_Deleted_Handler = useCallback((shoppingIngListReserved_) => 
        dispatch(actionsRecipe.onAfterAllIngDeleted(shoppingIngListReserved_)
    ), [dispatch])

    const checkShoppingList = useCallback((item) => {
        if(item !== null && item.length === 0) {
            on_After_All_Ing_Deleted_Handler(shoppingIngListReserved_)
        }
    }, [on_After_All_Ing_Deleted_Handler, shoppingIngListReserved_])

    useEffect(() => {
        checkShoppingList(shoppingIngList_)
    }, [checkShoppingList, shoppingIngList_])


    const onShopingIngDeleteHandler = (e, itemId) => {
        e.preventDefault()
        if(shoppingIngList_ !== null && shoppingIngList_.length !== 0) {
            const newShoppingIngList_ = shoppingIngList_.filter(item => item.id !== itemId)
            on_Shoping_Ing_Delete_Handler(newShoppingIngList_)
        }
    }

    let shopItems

    if(shoppingIngList_ !== null && shoppingIngList_.length > 0 && moveToShoppingList_) {
        shopItems = (
            (shoppingIngList_.map(item => {
                return (
                    <ShoppingItem 
                        key={item.id}
                        id={item.id}
                        type="number"
                        value={(item.ing.weight.toFixed(2))}
                        name={item.ing.text}
                        onClick={(e) => {onShopingIngDeleteHandler(e, item.id)}}
                    />
                )
            }))
        )
    }

    return (
        <div className={classes.shopping}>
            <h2 className={classes.heading2}>My Shopping List</h2>
            <ul className={classes.shopping__list}>
                {spinnerShoppingList_ ? <Spinner /> : shopItems}
            </ul>
        </div>
    )
}

export default Shopping