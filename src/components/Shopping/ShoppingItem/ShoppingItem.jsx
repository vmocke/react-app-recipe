import React from 'react'
import classes from "./ShoppingItem.module.css"
import SVGIcon from '../../../assets/img/SVGIcon'
import Button from '../../UI/Button/Button'

const ShoppingItem = (props) => {
    return (
        <li className={classes.shopping__item} id={props.id}>
            <p className={classes.shopping__description}>{props.value}</p>
            <p className={classes.shopping__description}>g</p>
            <p className={classes.shopping__description}>{props.name}</p>
            <div className={classes.shopping__delete}>
                <Button classNameButton="btnTiny" onClick={props.onClick}>
                    <SVGIcon name="icon-circle-with-cross"
                             fill="#F59A83"
                    />
                </Button>
            </div>
        </li>
    )
}

export default ShoppingItem
