import React from "react"
import LayoutContainer from "../../layout/LayoutContainer"
import welcomeImage from '../../assets/images/welcome-image.png'
import './WelcomePage.scss'

const WelcomePage = () => {
  return (
    <LayoutContainer>
      <div className="welcome-container">
        <img src={welcomeImage} alt="Image"/>
        <p className="welcome-title">Welcome to Emil's Merchant Portal!</p>
        <p className="welcome-description">At Emil's Merchant Portal, you have the power to create and manage your own stores, 
          as well as add and organize items within each store. 
        </p>
      </div>
    </LayoutContainer>
  )
}

export default React.memo(WelcomePage)