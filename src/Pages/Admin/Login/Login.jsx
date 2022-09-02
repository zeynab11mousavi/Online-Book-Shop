<<<<<<< Updated upstream
import { Container } from '@mui/system'
// import { Link } from 'react-router-dom'
import { Button, TextField, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
const Login = () => {
  const [name, setName] = useState('')
  const [pass, setPass] = useState('')
=======
import { Button, TextField, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { login } from '../../../Redux/user/userSlice'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import './login.css'

const Login = () => {
  const [username, setUserName] = useState('')
  const [password, setPass] = useState('')
>>>>>>> Stashed changes
  const [nameError, setNameError] = useState('')
  const [passError, setPassError] = useState('')
  const [activeBtn, setActiveBtn] = useState(true)
  const navigate = useNavigate()
<<<<<<< Updated upstream
  const adminPanelNavigator = () => {
    navigate('/admin-panel')
  }

  const handleChangeUserName = (e) => {
    setName(e.target.value)
    if (name.length < 1) {
=======
  const dispatch = useDispatch()
  const { isLoggedIn } = useSelector((state) => state.users)
  const [error, setError] = useState('')

  const handleChangeUserName = (e) => {
    setUserName(e.target.value)
    if (username.length < 1) {
>>>>>>> Stashed changes
      setNameError('مقادیر وارد شده برای نام کاربری کافی نمی باشد')
    } else {
      setNameError('  ')
    }
  }
  const handleChangePass = (e) => {
    setPass(e.target.value)
<<<<<<< Updated upstream
    if (pass.length < 1) {
=======
    if (password.length < 1) {
>>>>>>> Stashed changes
      setPassError('مقادیر وارد شده برای نام رمز عبور کافی نمی باشد')
    } else {
      setPassError('  ')
    }
<<<<<<< Updated upstream
    if (pass.length > 0 && name.length > 0) {
=======
    if (password.length > 0 && username.length > 0) {
>>>>>>> Stashed changes
      setActiveBtn(false)
    }
  }

<<<<<<< Updated upstream
  return (
    <Container>
      <form noValidate autoComplete="off">
        <TextField
          label="نام کاربری"
          fullWidth
          sx={{ m: 2 }}
=======
  const handleLogin = async (e) => {
    e.preventDefault()
    dispatch(login({ username, password }))
    if (isLoggedIn) {
      navigate('/admin-panel')
    } else {
      navigate('/admin-login')
      setError('نام کاربری یا رمز عبور اشتباه است')
    }
  }

  return (
    <div className="login-page">
      <form
        onSubmit={(e) => handleLogin(e)}
        className="login-form"
        noValidate
        autoComplete="off"
      >
        <Typography component="h6" color="error">
          {error}
        </Typography>

        <h3 className="admin-login-title">
          لطفا نام کاربری <br />و رمز عبور خود را وارد نمایید
        </h3>
        <TextField
          sx={{ mt: '3rem' }}
          className="admin-login-input"
          label="نام کاربری"
          fullWidth
          value={username}
>>>>>>> Stashed changes
          onChange={handleChangeUserName}
        />
        <Typography variant="p" color="error">
          {nameError}{' '}
        </Typography>
        <TextField
<<<<<<< Updated upstream
          label="رمز عبور"
          fullWidth
          sx={{ m: 2 }}
=======
          sx={{ mt: 2 }}
          type="password"
          className="admin-login-input"
          label="رمز عبور"
          fullWidth
          value={password}
>>>>>>> Stashed changes
          onChange={handleChangePass}
        />
        <Typography variant="p" color="error">
          {' '}
          {passError}{' '}
        </Typography>

        <Button
<<<<<<< Updated upstream
          variant="contained"
          disabled={activeBtn}
          onClick={adminPanelNavigator}
=======
          sx={{ mt: 2 }}
          variant="contained"
          disabled={activeBtn}
          type="submit"
>>>>>>> Stashed changes
        >
          ورود
        </Button>
      </form>
<<<<<<< Updated upstream
    </Container>
=======
    </div>
>>>>>>> Stashed changes
  )
}

export default Login
