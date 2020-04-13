import React from 'react'
import classes from "./Copyright.module.css"

const Copyright = () => {
    return (
        <div className={classes.copyright}>
            &copy; by Vismantas Mockevicius. Powered by <a href="http://www.edamam.com" className={classes.link}>edamam.com</a>
        </div>
    )
}

export default Copyright
