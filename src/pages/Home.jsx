import { useState } from 'react'
import Login from './forms/Login'
import './styleHome.css'

import {Button} from 'reactstrap'
// import { Link } from 'react-router-dom'
function Home() {
  const [showLoginForm, setLoginForm] = useState(false)
  const handleButtonClick = () => {
    setLoginForm(!showLoginForm)
  }

  return (
    <div className="homepage-container"> 
      <div className='homepage-logo'>
      </div>
      <div className='start-button'>
        {!showLoginForm && (
          <Button
            onClick={handleButtonClick}
          >
            Start Journey
          </Button>
        )}
        {showLoginForm && <Login/> }
      </div>
    </div>
  )
}

export default Home