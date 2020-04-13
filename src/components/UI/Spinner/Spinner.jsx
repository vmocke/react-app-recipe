import React from 'react'
import classes from "./Spinner.module.css"
import SVGIcon from '../../../assets/img/SVGIcon'

const Spinner = (props) => {
    return (
        <div className={classes.loader}>
            <SVGIcon name="icon-cw"
                     fill="#F59A83"/>
        </div>
    )
}

export default Spinner
