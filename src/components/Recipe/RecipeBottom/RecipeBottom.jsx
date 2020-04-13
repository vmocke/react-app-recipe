import React from 'react'
import classes from "./RecipeBottom.module.css"
import Button from '../../UI/Button/Button'
import SVGIcon from '../../../assets/img/SVGIcon'

const RecipeBottom = (props) => {
    return (
        <div className={classes.recipe__directions}>
            <h2 className={classes.heading2}>How to cook it</h2>
            <p className={classes.recipe__directionsText}>
                This recipe was carefully designed and tested by
                <span className={classes.recipe__by}> {props.recipeBy}</span>. Please check out directions at their website.
            </p>
            <a href={props.href}>
                <Button classNameButton="btnSmall">
                    <span>Directions</span>
                    <SVGIcon name="icon-triangle-right"
                            className="search__icon"
                            fill="#fff"
                    />
                </Button>
            </a>
        </div>
    )
}

export default RecipeBottom
