import { FormGroup, Form, Label, Input, Button } from "reactstrap"
import { Link } from "react-router-dom"
import { useState } from "react"
import Login from "../loginForm/LoginForm"
import Terms from "../terms/Terms"
import "./styleRegister.css"
function RegisterForm() {
  const [showLoginForm, setShowLoginForm] = useState(false)
  const handleLogin = () => {
    setShowLoginForm(!showLoginForm)
  }
  // const [termAgree, setTermAgree] = useState(false)
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  // const [errorPassword, setErrorPassword] = useState(false)

  const handleChangePassword = (event) => {
    const value = event.target.value
    setPassword(value)
  }
  const handleChangeConfirmPassword = (event) => {
    const value = event.target.value
    setConfirmPassword(value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
  }
  return (
    <div className="form-container">
      {!showLoginForm && (
        <Form className='register-form'
              onSubmit={handleSubmit}
        >
          <div className='form-header'>
            <h2>Register</h2>
          </div>
          <FormGroup>
            <Label>Email</Label>
            <Input
              type="email"
              name="email"
              id="email" 
              placeholder='Enter your school email...' 
              required
            />
          </FormGroup>
          <FormGroup>
            <label>Password</label>
            <input 
              type="password"
              value={password}
              name="password"
              id="password" 
              placeholder='Enter your password...'
              onChange={handleChangePassword}
              required
            />
          </FormGroup>
          <FormGroup>
            <label>Confirm password</label>
            <input 
              type="password"
              value={confirmPassword}
              name="confirm-password"
              id="confirm-password" 
              placeholder='Re-enter your password...'
              onChange={handleChangeConfirmPassword}
              required
              pattern={password}
              title="Password confirmation does not match"
            />

          </FormGroup>
          <div className="term-check-box">
            <Input type="checkbox"
                   required           
            /> Agree with <Link to='terms'><Terms/></Link>
          </div> 
          <div className='register-button'>
            <Button 
              type="submit"
            >
              Sign-up
            </Button>
          </div>
          <div className='form-footer'>
            <p>Already have an account?.
              <Link to ='/login'
                    onClick={handleLogin}
              > Sign in
              </Link>
            </p>
          </div>
        </Form>
      )}
      {showLoginForm && <Login/>}
    </div>
  )
}

export default RegisterForm