import { useState } from 'react'
import { Link } from 'react-router-dom'
import Login from '../components/loginForm/LoginForm.jsx'
import './style/homeStyle.css'

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
          <Link to = "/login">
            <Button
              onClick={handleButtonClick}
            >
              Start Journey
            </Button>
          </Link>
        )}
        {showLoginForm && <Login/> }
      </div>
    </div>
  )
}

export default Home