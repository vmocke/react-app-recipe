import React, { useState, useEffect } from 'react'
import classes from "./MainPage.module.css"
import Results from '../../components/Results/Results'
import Recipe from '../../components/Recipe/Recipe'
import Shopping from '../../components/Shopping/Shopping'
import Header from '../../components/Header/Header'
import Copyright from '../../components/Copyright/Copyright'
import { useSelector } from 'react-redux'
import SpinnerBig from "../../components/UI/SpinnerBig/SpinnerBig"

const MainPage = (props) => {
  const [spinnerBig, setSpinnerBig] = useState(false)
  const recipeShow_ = useSelector(state => state.reducer_Recipe.recipeShow)
  const spinnerBig_ = useSelector(state => state.reducer_Recipe.spinnerBig)

  useEffect(() => {
    if(spinnerBig_) {
      setSpinnerBig(true)
  } else { setSpinnerBig(false) }
  }, [spinnerBig_])
  

  let pageContent
  if(recipeShow_) {
    pageContent = (
      <React.Fragment>
        <Results />
        <Recipe />
        <Shopping />
        <Copyright />
      </React.Fragment>
  )
} else if (!recipeShow_) { pageContent = <div className={classes.txth1}><h1>Start searching to find Yours RECIPE of TODAY</h1></div> }

  return (
    <React.Fragment>
      {spinnerBig ? <SpinnerBig /> : 
        <div className={classes.container}>
          <Header />
          {pageContent}
        </div>
      }
    </React.Fragment>
  )
}

export default MainPage