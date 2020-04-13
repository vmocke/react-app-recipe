import React from 'react'
import classes from "./Button.module.css"

const Button = (props) => {
    return (
        <div className={[classes[props.classNameDiv]].join(".")}>
            <button className={[classes[props.classNameButton]].join(".")}
                    onClick={props.onClick}
                    href={props.href}
            >
                {props.children}
            </button>
        </div>
    )
}

export default Button
