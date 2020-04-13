import React from 'react'
import classes from "./Header.module.css"
import LogoHeader from "../../assets/img/favicon.png"
import Img from '../UI/Img/Img'
import HeaderSearch from './HeaderSearch/HeaderSearch'
import HeaderLikes from './HeaderLikes/HeaderLikes'
import Button from '../UI/Button/Button'
import SVGIcon from '../../assets/img/SVGIcon'
import { NavLink } from 'react-router-dom'

const Header = (props) => {
    return (
        <header className={classes.header}>
            <Img src={LogoHeader} alt="Logo" className="header__logo"/>
            <HeaderSearch />
            <HeaderLikes>
                <NavLink to="/logout" exact>
                    <Button classNameDiv ="headerLogout" 
                            classNameButton="btnSmall"
                    >
                        <span>Logout</span>
                        <SVGIcon name="icon-triangle-right"
                            className="search__icon"
                            fill="#fff"
                        />
                    </Button>
                </NavLink>
            </HeaderLikes>
        </header>
    )
}

export default Header