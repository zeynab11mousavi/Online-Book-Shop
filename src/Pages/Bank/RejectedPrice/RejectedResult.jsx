import { Button, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
const RejectedResult = () => {
  const navigate = useNavigate()
  return (
    <>
      <Typography sx={{ my: '10rem' }}>
        خرید شما تا 2 ساعت در لیست خرید در حالت تعلیق باقی می ماند،
        <br /> لطفا هر چه سریع تر نسبت به پرداخت اقدام نمایید.
      </Typography>

      <Button variant="contained" color="primary" onClick={() => navigate('/')}>
        بازگشت به سایت
      </Button>
    </>
  )
}

export default RejectedResult
