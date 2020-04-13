import React from 'react'
import classes from "./Recipe.module.css"
import Img from '../UI/Img/Img'
import { useSelector, useDispatch } from 'react-redux'
import RecipeTop from './RecipeTop/RecipeTop'
import RecipeMid from './RecipeMid/RecipeMid'
import RecipeBottom from './RecipeBottom/RecipeBottom'
import Button from '../UI/Button/Button'
import SVGIcon from '../../assets/img/SVGIcon'
import * as actionsRecipe from "../../store/actions/actionsRecipe"
import * as actionsLikesItem from "../../store/actions/actionsLikesItems"
import Spinner from '../UI/Spinner/Spinner'
import { fire } from "../../axios-export"
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

const Recipe = (props) => {

    const chosenRecipe_ = useSelector(state => state.reducer_Recipe.chosenRecipe)
    const moveToShoppingList_ = useSelector(state => state.reducer_Recipe.moveToShoppingList)
    const likesRecipes_ = useSelector(state => state.reducer_Recipe.likesRecipes)
    const recipeShow_ = useSelector(state => state.reducer_Recipe.recipeShow)
    const spinnerRecipe_ = useSelector(state => state.reducer_Recipe.spinnerRecipe)
    const token_ = useSelector(state => state.reducer_Auth.token)
    const userId_ = useSelector(state => state.reducer_Auth.userId)

    const dispatch = useDispatch()
    const on_Shoping_List_Button_Handler = (moveToShoppingListButton) => dispatch(actionsRecipe.onShopingListButton(moveToShoppingListButton))
    const on_Like_Button_Handler = (likesRecipesNew) => dispatch(actionsRecipe.onLikeButton(likesRecipesNew))
    const on_Send_Item_To_Server = (likesRecipesNew, token, userId) => dispatch(actionsLikesItem.onSendItemToServer(likesRecipesNew, token, userId))

    const onLikeButtonHandler = (e, item) => {
        e.preventDefault()
        let likesRecipesNew = [...likesRecipes_]
        const checkId = likesRecipesNew.filter(oldItem => oldItem.id === item.id)
        const likesRecipesNew_ = { ...item, userId: userId_ }
        
        if(checkId.length === 0){
            likesRecipesNew = [...likesRecipesNew].concat(item)
            on_Send_Item_To_Server(likesRecipesNew_, token_, userId_)
            on_Like_Button_Handler(likesRecipesNew)
        }
    }

    const onShopingListButtonHandler = (e) => {
        e.preventDefault()
        const moveToShoppingListButton = !moveToShoppingList_
        on_Shoping_List_Button_Handler(moveToShoppingListButton)
    }

    let recipeItem

    if(chosenRecipe_ !== null && recipeShow_) {
        recipeItem = (
            chosenRecipe_.map(item => {
                return (
                    <React.Fragment key={item.id}>
                        <Img classNameFig="recipe__fig" 
                             src={item.recipe.image} 
                             alt={item.recipe.label} 
                             className="recipe__img"
                        >
                            <h1 className={classes.recipe__title}>
                                <span>{item.recipe.label}</span>
                            </h1>
                        </Img>

                        <RecipeTop onClick={(e) => {onLikeButtonHandler(e, item)}} 
                                   time={(item.recipe.ingredients.length) * 10} 
                                   servings={item.recipe.yield} 
                        />
                        
                        <div className={classes.recipe__ingredients}>
                            <ul className={classes.recipe__ingredientList}>  
                                {item.recipe.ingredients.map(item => {
                                    const keyRnd = Math.random().toString(36).slice(2)
                                    return(
                                        <RecipeMid key={keyRnd} 
                                                   count={(item.weight).toFixed(2)} 
                                                   unit="g" 
                                                   unitName={item.text} 
                                    />)})
                                }
                            </ul>

                            <Button classNameButton="btnSmall" onClick={(e) => onShopingListButtonHandler(e)}>
                                <SVGIcon name="icon-shopping-cart"
                                         className="search__icon"
                                         fill="#fff"
                                    />
                                <span>Add to shopping list</span>
                            </Button>
                        </div>

                        <RecipeBottom recipeBy={item.recipe.source} href={item.recipe.url} />
                    </React.Fragment>
                )
            })
        )
    }
    
    return (
        <div className={classes.recipe}>
            {spinnerRecipe_ ? <Spinner /> : recipeItem}
        </div>
    )
}

export default withErrorHandler(Recipe, fire)
