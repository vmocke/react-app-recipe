import React from 'react'
import classes from "./RecipeTop.module.css"
import SVGIcon from '../../../assets/img/SVGIcon'
import Button from '../../UI/Button/Button'

const RecipeTop = (props) => {
    return (
        <div className={classes.recipe__details}> 
            <div className={classes.recipe__info}>
                <SVGIcon name="icon-stopwatch"
                         className={classes.recipe__infoIcon} 
                         fill="#F59A83"
                />
                <span className={classes.recipe__infoData}>{props.time}</span>
                <span> minutes</span>
            </div>

            <div className={classes.recipe__info}>
                <SVGIcon name="icon-man"
                         className={classes.recipe__infoIcon} 
                         fill="#F59A83"
                />
                <span className={classes.recipe__infoData}>{props.servings}</span>
                <span> servings</span>

                <div className={classes.recipe__infoButtons}>
                </div>

            </div>

            <Button classNameButton="recipe__love" onClick={props.onClick}>
                <SVGIcon name="icon-heart-outlined"
                         fill="#fff"
                />
            </Button>
        </div>
    )
}

export default RecipeTop
