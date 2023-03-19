import {
  Button,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  IconButton,
  Box,
} from '@mui/material'
import { Container } from '@mui/system'
import { Link } from 'react-router-dom'
import DeleteIcon from '@mui/icons-material/Delete'
import { ToastContainer } from 'react-toastify'
import persian, { number } from '../../../Assets/persian'
import cart from '../../../Assets/pic/cart.png'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { URL } from '../../../config/api'
import { useState } from 'react'
import { useRef } from 'react'
import DeleteModal from './DeleteModal'

const ShoppingBasket = () => {
  const updateRef = useRef(0)
  const navigate = useNavigate()
  const [orders, setOrders] = useState([])
  const [deleteMood, setDeleteMood] = useState(false)
  const [currentItem, setCurrentItem] = useState()
  let total = 0

  useEffect(() => {
    setOrders(JSON.parse(localStorage.getItem('orders')) ?? [])
    // const prices = document.querySelectorAll('#price')
    // console.log(prices)
  }, [])
  for (let i = 0; i < orders.length; i++) {
    total += orders[i].price * orders[i].number
  }
  localStorage.setItem('prices', JSON.stringify(total))

  const handleDeleteMood = (item) => {
    setCurrentItem(item)
    setDeleteMood(true)
  }

  return (
    <Container sx={{ width: '100%' }}>
      <ToastContainer />
      {orders.length > 0 ? (
        <TableContainer>
          <Table sx={{ mb: '2rem' }}>
            <TableHead>
              <TableRow>
                <TableCell align="right">تصویر</TableCell>
                <TableCell align="right">نام محصول</TableCell>
                <TableCell align="right">تعداد</TableCell>
                <TableCell align="right"> قبمت (ریال)</TableCell>
                {/* <TableCell align="right">قیمت کل</TableCell> */}
                <TableCell align="right">حذف</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((item) => (
                <TableRow key={item.id} id={`basketOrder${item.id}`}>
                  <TableCell align="right">
                    <Avatar
                      onClick={() => navigate(`/books/${item.id}`)}
                      src={`${URL}/files/${item.image}`}
                    />
                  </TableCell>
                  <TableCell
                    align="right"
                    onClick={() => navigate(`/books/${item.id}`)}
                  >
                    {item.name}
                  </TableCell>
                  <TableCell align="right">{number(item.number)}</TableCell>
                  <TableCell align="right" id="price">
                    {persian(item.price)}
                  </TableCell>
                  {/* <TableCell align="right">{item.number * item.price}</TableCell> */}
                  <TableCell align="right">
                    <IconButton onClick={() => handleDeleteMood(item)}>
                      <DeleteIcon color="primary" />
                    </IconButton>
                    {deleteMood && (
                      <DeleteModal
                        total={total}
                        orders={orders}
                        setOrders={setOrders}
                        currentItem={currentItem}
                        setDeleteMood={setDeleteMood}
                      />
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div>
            <span>قیمت نهایی:{'       '}</span>
            <span id="total">{persian(total)}</span>
          </div>
          <Button
            variant="contained"
            color="secondary"
            sx={{ mt: '2rem' }}
            onClick={() => navigate('/before-payment')}
          >
            نهایی کردن خرید
          </Button>
        </TableContainer>
      ) : (
        <Box
          sx={{
            m: '0 auto 1rem',
            textAlign: 'center',
          }}
        >
          <img src={cart} width="65%" lat="سبد خرید شما خالی می باشد" />
          <Typography
            color="primary"
            sx={{ fontSize: '20px', fontWeight: 'bolder', mr: '7rem' }}
          >
            سبد خرید شما خالی می باشد.
          </Typography>
        </Box>
      )}
    </Container>
  )
}

export default ShoppingBasket
