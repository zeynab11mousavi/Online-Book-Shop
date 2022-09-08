import { Button, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const SuccessfulResult = () => {
  const navigate = useNavigate()
  return (
    <>
      <Typography sx={{ my: '10rem' }}>خرید شما با موفقیت انجام شد.</Typography>

      <Button variant="contained" color="primary" onClick={() => navigate('/')}>
        بازگشت به سایت
      </Button>
    </>
  )
}

export default SuccessfulResult
