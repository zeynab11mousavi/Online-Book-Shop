import paymentForm from '../../../Assets/pic/paymentForm.jpg'
import {
  Button,
  CardMedia,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { Box } from '@mui/system'
import { useState } from 'react'

const BeforePayment = () => {
  const navigate = useNavigate()

  const [activeBtn, setActiveBtn] = useState(true)
  const [username, setUsername] = useState('')
  const [usernameError, setUsernameError] = useState('')
  const [lastname, setLastName] = useState('')
  const [lastNameError, setLastNameError] = useState('')

  const [address, setAddress] = useState('')
  const [addressError, setAddressError] = useState('')
  const [phone, setPhone] = useState()
  const [numberError, setNumberError] = useState('')
  const prices = JSON.parse(localStorage.getItem('prices'))
  const products = JSON.parse(localStorage.getItem('orders'))
  const pattern =
    '^([\u06F0]|[0])([\u06F9]|[9])(([\u06F0-\u06F9]|[0-9]){2})(([\u06F0-\u06F9]|[0-9]){3})(([\u06F0-\u06F9]|[0-9]){3})'

  const handleChangeUsername = (e) => {
    setUsername(e.target.value)
    if (username.length < 3) {
      setUsernameError('لطفا نام خود را کامل بنویسید!')
    } else {
      setUsernameError('  ')
    }
  }

  const handleChangeLastName = (e) => {
    setLastName(e.target.value)
    if (lastname.length < 3) {
      setLastNameError('لطفا نام خود را کامل بنویسید!')
    } else {
      setLastNameError('  ')
    }
  }

  const handleChangeAddress = (e) => {
    setAddress(e.target.value)
    if (address.length < 15) {
      setAddressError('لطفاآدرس را دقیق وارد نمایید!!')
    } else if (address.length > 15 && phone && username && lastname) {
      setAddressError('  ')
      setActiveBtn(false)
    } else setActiveBtn(true)
  }
  const handleChangeNumber = (e) => {
    setPhone(e.target.value)
    if (phone.match(pattern)) {
      setNumberError('  ')
    } else {
      setNumberError('شماره معتبر نیست!')
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const finalizeOrder = {
      username,
      lastname,
      address,
      phone,
      products,
      prices,
      delivered: false,
    }
    localStorage.setItem('finalizeOrder', JSON.stringify(finalizeOrder))
    setTimeout(() => {
      window.location.href = 'http://localhost:3002/'
    }, 0)
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
      }}
    >
      <form
        style={{
          width: '500px',
          display: 'flex',
          flexDirection: 'column',
        }}
        noValidate
        autoComplete="off"
        onSubmit={(e) => handleSubmit(e)}
      >
        <Typography color="primary">نام:</Typography>

        <TextField
          value={username}
          onChange={handleChangeUsername}
          sx={{ my: 2 }}
        />
        <Typography color="error">{usernameError}</Typography>
        <Typography color="primary">نام خانوداگی:</Typography>
        <TextField
          value={lastname}
          onChange={handleChangeLastName}
          sx={{ my: 2 }}
        />
        <Typography color="error">{lastNameError}</Typography>
        <Typography color="primary">شماره همراه:</Typography>

        <TextField onChange={handleChangeNumber} type="phone" sx={{ my: 2 }} />
        <Typography color="error">{numberError}</Typography>
        <Typography color="primary">آدرس:</Typography>
        <TextField onChange={handleChangeAddress} sx={{ my: 2 }} />
        <Typography color="error">{addressError}</Typography>

        <Button disabled={activeBtn} variant="contained" type="submit">
          ورود به درگاه بانکی
        </Button>
      </form>
      <img src={paymentForm} />
    </Box>
  )
}

export default BeforePayment
