import React, { useEffect, useCallback } from 'react'
import * as actionsAuth from "../../../store/actions/actionsAuth"
import * as actionsRecipe from "../../../store/actions/actionsRecipe"
import { Redirect } from 'react-router-dom'
import { useDispatch } from 'react-redux'

const Logout = (props) => {

    const dispatch = useDispatch()
    const on_Logout = useCallback(() => dispatch(actionsAuth.logout()), [dispatch])
    const on_Logout_Clear = useCallback(() => dispatch(actionsRecipe.onLogoutClear()), [dispatch])

    useEffect(() => {
        return () => {
            on_Logout()
            on_Logout_Clear()
        }
    }, [on_Logout, on_Logout_Clear])

    return <Redirect to='/login' />
}

export default Logout