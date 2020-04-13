import React from 'react'
import classes from "./RecipeMid.module.css"
import SVGIcon from '../../../assets/img/SVGIcon'

const RecipeMid = (props) => {
    return (
            <li className={classes.recipe__item}>
                <SVGIcon name="icon-check"
                         className={classes.recipe__icon}
                         fill="#F59A83"
                />
                <div className={classes.recipe__count}>{props.count}</div>
                <div className={classes.recipe__ingredient}>
                    <span className={classes.recipe__unit}>{props.unit} </span>
                    {props.unitName}
                </div>
            </li>
    )
}

export default RecipeMid
