import { Container } from '@mui/system'
// import { Link } from 'react-router-dom'
import { Button, TextField, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
const Login = () => {
  const [name, setName] = useState('')
  const [pass, setPass] = useState('')
  const [nameError, setNameError] = useState('')
  const [passError, setPassError] = useState('')
  const [activeBtn, setActiveBtn] = useState(true)
  const navigate = useNavigate()
  const adminPanelNavigator = () => {
    navigate('/admin-panel')
  }

  const handleChangeUserName = (e) => {
    setName(e.target.value)
    if (name.length < 1) {
      setNameError('مقادیر وارد شده برای نام کاربری کافی نمی باشد')
    } else {
      setNameError('  ')
    }
  }
  const handleChangePass = (e) => {
    setPass(e.target.value)
    if (pass.length < 1) {
      setPassError('مقادیر وارد شده برای نام رمز عبور کافی نمی باشد')
    } else {
      setPassError('  ')
    }
    if (pass.length > 0 && name.length > 0) {
      setActiveBtn(false)
    }
  }

  return (
    <Container>
      <form noValidate autoComplete="off">
        <TextField
          label="نام کاربری"
          fullWidth
          sx={{ m: 2 }}
          onChange={handleChangeUserName}
        />
        <Typography variant="p" color="error">
          {nameError}{' '}
        </Typography>
        <TextField
          label="رمز عبور"
          fullWidth
          sx={{ m: 2 }}
          onChange={handleChangePass}
        />
        <Typography variant="p" color="error">
          {' '}
          {passError}{' '}
        </Typography>

        <Button
          variant="contained"
          disabled={activeBtn}
          onClick={adminPanelNavigator}
        >
          ورود
        </Button>
      </form>
    </Container>
  )
}

export default Login
