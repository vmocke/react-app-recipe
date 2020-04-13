import React from 'react'
import classes from "./Img.module.css"

const Img = (props) => {
    return (
        <figure className={[classes[props.classNameFig]].join('.')}>
            <img src={props.src} 
                 alt={props.alt} 
                 className={[classes[props.className]].join('.')} 
            />
            {props.children}
        </figure>
    )
}

export default Img