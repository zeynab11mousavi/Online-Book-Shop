import { AppBar, Button, Toolbar, Typography } from '@mui/material'
// import { Container } from '@mui/system'
import { useNavigate, Link } from 'react-router-dom'

const AdminNavbar = () => {
  const navigate = useNavigate()
  const navigator = (address) => {
    navigate(`${address}`)
  }
  return (
    <AppBar sx={{ mb: 30 }}>
      <Toolbar>
        <Typography sx={{ ml: '40rem', mr: '10rem' }}>
          پنل مدیریت فروشگاه
        </Typography>
        <Button variant="contained" component={Link} to="orders" color="info">
          سفارشات
        </Button>
        <Button
          variant="contained"
          color="info"
          component={Link}
          to="goods-and-prices"
        >
          موجودی و قیمت ها
        </Button>
        <Button
          variant="contained"
          color="info"
          onClick={() => navigator('/books')}
        >
          کتاب ها
        </Button>
        <Button variant="contained" color="info" onClick={() => navigator('/')}>
          بازگشت به فروشگاه
        </Button>
      </Toolbar>
    </AppBar>
  )
}

export default AdminNavbar
