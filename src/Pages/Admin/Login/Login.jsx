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
  const [nameError, setNameError] = useState('')
  const [passError, setPassError] = useState('')
  const [activeBtn, setActiveBtn] = useState(true)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { isLoggedIn } = useSelector((state) => state.users)
  const [error, setError] = useState('')

  const handleChangeUserName = (e) => {
    setUserName(e.target.value)
    if (username.length < 1) {
      setNameError('مقادیر وارد شده برای نام کاربری کافی نمی باشد')
    } else {
      setNameError('  ')
    }
  }
  const handleChangePass = (e) => {
    setPass(e.target.value)
    if (password.length < 1) {
      setPassError('مقادیر وارد شده برای نام رمز عبور کافی نمی باشد')
    } else {
      setPassError('  ')
    }
    if (password.length > 0 && username.length > 0) {
      setActiveBtn(false)
    }
  }

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
          sx={{ mt: '3rem', align: 'right' }}
          className="admin-login-input"
          label="نام کاربری"
          fullWidth
          value={username}
          onChange={handleChangeUserName}
        />
        <Typography variant="p" color="error">
          {nameError}{' '}
        </Typography>
        <TextField
          sx={{ mt: 2, textAlign: 'right' }}
          type="password"
          className="admin-login-input"
          label="رمز عبور"
          fullWidth
          value={password}
          onChange={handleChangePass}
        />
        <Typography variant="p" color="error">
          {' '}
          {passError}{' '}
        </Typography>

        <Button
          sx={{ mt: 2 }}
          variant="contained"
          disabled={activeBtn}
          type="submit"
        >
          ورود
        </Button>
      </form>
    </div>
  )
}

export default Login
