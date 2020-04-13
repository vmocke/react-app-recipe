import React, { useState } from 'react'
import classes from "./Results.module.css"
import ItemPanel from '../UI/ItemPanel/ItemPanel'
import { useSelector, useDispatch } from 'react-redux'
import * as actionsRecipe from "../../store/actions/actionsRecipe"
import Button from '../UI/Button/Button'
import SVGIcon from '../../assets/img/SVGIcon'
import Spinner from '../UI/Spinner/Spinner'
import { spinnerTimeout } from "../../shared/utility"

const Results = (props) => {
    const [currPage, setCurrPage] = useState(0)
    const [spinnerLocal, setSpinnerLocal] = useState(false)
    let recipePagesArr = []
    const recipesPerPage = 10

    const recipe_ = useSelector(state => state.reducer_Recipe.recipe)

    const dispatch = useDispatch()
    const on_Result_Item_Click_Handler = (selectedItem, shoppingIngList) => dispatch(
        actionsRecipe.onResultItemClick(selectedItem, shoppingIngList)
    )
    
    if(recipe_ !== null && recipe_ !== undefined) {
        let recipeArr = [...recipe_.data.hits]
        while(recipeArr.length > 0) {
            const tempArr = recipeArr.splice(0, recipesPerPage)
            recipePagesArr = [...recipePagesArr].concat([tempArr])
        }
    }

    const onPrevButtonHandler = (e) => {
        e.preventDefault()  
        setCurrPage(currPage - 1)
        spinnerTimeout(setSpinnerLocal, 500)
    }
    const onNextButtonHandler = (e) => {
        e.preventDefault() 
        setCurrPage(currPage + 1)
        spinnerTimeout(setSpinnerLocal, 500)
    }
    
    const onResultItemClickHandler = (e, URI, itemId) => {
        e.preventDefault()
        const selectedItem_ = []
        const id = {id: itemId}
        recipe_.data.hits.filter(item => {
            if(item.recipe.uri === URI) {
                selectedItem_.push(item)
            }
            return item
        })

        const selectedItem = [Object.assign(...selectedItem_, id)]
        
        let chosenRecipeIngredients = selectedItem.map(item => item.recipe.ingredients)
        chosenRecipeIngredients = chosenRecipeIngredients[0]

        const shoppingIngList = []
        for(let key in chosenRecipeIngredients) {
            shoppingIngList.push({
                id: Math.random().toString(36).slice(2),
                ing: chosenRecipeIngredients[key]
            })
        }
        
        on_Result_Item_Click_Handler(selectedItem, shoppingIngList)
    }

    let resultItemPanel
    
    if(recipe_ !== null && recipe_.data.hits.length !== 0 && recipePagesArr !== undefined) {
        resultItemPanel = (
            <React.Fragment>
                {recipePagesArr[currPage].map(item => {
                    const itemId = item.recipe.uri.split("#recipe_")
                    return (
                        <ItemPanel 
                            key={itemId[1]}
                            id={itemId[1]}
                            href={item.recipe.uri}
                            logo={item.recipe.image}
                            alt={item.recipe.label}
                            title={item.recipe.label}
                            text={item.recipe.source}
                            onClick={(e) => onResultItemClickHandler(e, item.recipe.uri, itemId[1])}
                            />
                    )
                })}
            </React.Fragment>
        )
    } else { resultItemPanel = null }

    let buttons

    if(recipePagesArr.length === 0) {
        buttons = null
    } else if(currPage === 0 && recipePagesArr.length > 1) {
        buttons = (
            <Button onClick={(e) => {onNextButtonHandler(e)}}
                    classNameDiv="results__btnNext" classNameButton="btnInline">
                <span>Next</span>
                <SVGIcon name="icon-triangle-right"
                         fill="currentColor"
                />
            </Button>
        )
    } else if(currPage === recipePagesArr.length - 1 && recipePagesArr.length - 1 > 0) {
        buttons = (
            <Button onClick={(e) => {onPrevButtonHandler(e)}}
                    classNameDiv="results__btnPrev" classNameButton="btnInline">
                <SVGIcon name="icon-triangle-left"
                         fill="currentColor"
                /><span>Prev</span>
            </Button>
        )
    } else if(currPage > 0 && currPage !== recipePagesArr.length - 1) {
        buttons = (
            <React.Fragment>
                <Button onClick={(e) => {onPrevButtonHandler(e)}}
                        classNameDiv="results__btnPrev" classNameButton="btnInline">
                <SVGIcon name="icon-triangle-left"
                         fill="currentColor"
                /><span>Prev</span>
                </Button>
                <Button onClick={(e) => {onNextButtonHandler(e)}}
                        classNameDiv="results__btnNext" classNameButton="btnInline">
                <span>Next</span>
                <SVGIcon name="icon-triangle-right"
                         fill="currentColor"
                />
                </Button>
            </React.Fragment>
        )
    } else buttons = null
    
    
    return (
        <div className={classes.results}>
            <ul className={classes.ItemPanel_list}>
                {spinnerLocal ? <Spinner /> : resultItemPanel}
                <div className={classes.results__pages}>{spinnerLocal ? null : buttons}</div>
            </ul>
        </div>
    )
}

export default Results