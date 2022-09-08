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
} from '@mui/material'
import { Container } from '@mui/system'
import { Link } from 'react-router-dom'
import DeleteIcon from '@mui/icons-material/Delete'
import { ToastContainer, toast } from 'react-toastify'

import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { URL } from '../../../config/api'
import { useState } from 'react'
import { useRef } from 'react'

const ShoppingBasket = () => {
  const updateRef = useRef(0)
  const navigate = useNavigate()
  const [orders, setOrders] = useState([])
  // const [total, setTotal] = useState()
  let total = 0
  const notify = (name) => toast(`${name} از سبد خرید حذف شد.`)

  useEffect(() => {
    setOrders(JSON.parse(localStorage.getItem('products')) ?? [])
    // const prices = document.querySelectorAll('#price')
    // console.log(prices)
  }, [])
  for (let i = 0; i < orders.length; i++) {
    total += orders[i].price * orders[i].number
  }
  localStorage.setItem('prices', JSON.stringify(total))

  const handleDelete = (item) => {
    orders.map((order, index) => {
      if (order.id === item.id) {
        orders.splice(index, 1)
      }
    })
    localStorage.setItem('products', JSON.stringify(orders))
    notify(item.name)
    const updatedTotal = total - item.price * item.number
    const totalElement = document.getElementById('total')
    totalElement.innerText = updatedTotal
    document.getElementById(`basketOrder${item.id}`).remove()
    localStorage.setItem('prices', JSON.stringify(total))
  }

  return (
    <Container>
      <ToastContainer />

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="right">تصویر</TableCell>
              <TableCell align="right">نام محصول</TableCell>
              <TableCell align="right">تعداد</TableCell>
              <TableCell align="right">قبمت</TableCell>
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
                <TableCell align="right">{item.number}</TableCell>
                <TableCell align="right" id="price">
                  {item.price}
                </TableCell>
                {/* <TableCell align="right">{item.number * item.price}</TableCell> */}
                <TableCell align="right">
                  <IconButton onClick={() => handleDelete(item)}>
                    <DeleteIcon color="primary" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell>قیمت نهایی:</TableCell>
              <TableCell id="total">{total}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Button
        variant="contained"
        color="secondary"
        onClick={() => navigate('/before-payment')}
      >
        نهایی کردن خرید
      </Button>
    </Container>
  )
}

export default ShoppingBasket
