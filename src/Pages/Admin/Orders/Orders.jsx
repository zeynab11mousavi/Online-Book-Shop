import './orderDetails.css'
import {
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material'
import Fade from '@mui/material/Fade'
import { Box, Container } from '@mui/system'
import { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { fetchOrders } from '../../../Redux/orders/orders'
import CancelPresentationRoundedIcon from '@mui/icons-material/CancelPresentationRounded'
const initialToggle = {
  toggle: false,
  orderInfo: {},
}

const Orders = () => {
  // states for managing the data to show to user;
  const [allOrders, setAllOrders] = useState([])
  const [status, setStatus] = useState('true')
  const [toggleStatus, setToggleStatus] = useState(initialToggle)
  const { orderInfo } = toggleStatus
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchOrders())
      .unwrap()
      .then((res) => setAllOrders(res))
  })

  const handleDetail = (id) => {
    const orderInfo = allOrders.find((order) => order.id === id)
    setToggleStatus({ toggle: true, orderInfo })
  }

  return (
    <>
      <Button
        sx={{ ml: '1rem' }}
        variant="contained"
        color="primary"
        onClick={() => setStatus('true')}
      >
        تحویل داده شده
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setStatus('false')}
      >
        تحویل داده نشده
      </Button>
      <TableContainer>
        <Table>
          <TableHead className="tableBody">
            <TableRow>
              <TableCell align="right">وضعیت</TableCell>
              <TableCell align="right">نام سفارش دهنده</TableCell>
              <TableCell align="right">مجموع مبلغ</TableCell>
              <TableCell align="right">زمان ثبت سفارش</TableCell>
              <TableCell align="right">بررسی سفارش</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allOrders.map(
              (order) =>
                order.delivered === status && (
                  <TableRow key={order.id}>
                    <TableCell align="right">{order.delivered}</TableCell>
                    <TableCell align="right">
                      {`
                      ${order.username} 
                      ${order.lastname}
                    `}
                    </TableCell>
                    <TableCell align="right">{order.prices}</TableCell>
                    <TableCell align="right">
                      {new Date(order.createdAt).toLocaleDateString('fa')}
                    </TableCell>
                    <TableCell align="right">
                      <Tooltip
                        TransitionComponent={Fade}
                        TransitionProps={{ timeout: 600 }}
                        title="برای مشاهده جزییات کلیک فرمایید"
                      >
                        <Typography
                          color="primary"
                          followCourser
                          onClick={() => handleDetail(order.id)}
                        >
                          بررسی سفارش
                        </Typography>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ),
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {toggleStatus.toggle && (
        <Box component="div" className="orderDetails">
          <IconButton
            color="info"
            onClick={() => setToggleStatus(initialToggle)}
          >
            <CancelPresentationRoundedIcon sx={{ ml: '1rem' }} /> بستن
          </IconButton>
          <Container>
            <Typography>
              {`
              نام مشتری: ${orderInfo.username}
              ${orderInfo.lastname}
              `}
            </Typography>
            <Typography> آدرس: {orderInfo.address}</Typography>
            <Typography>شماره تلفن: {orderInfo.phone}</Typography>
            <Typography>
              زمان سفارش:{'       '}
              {new Date(orderInfo.createdAt).toLocaleDateString('fa')}
            </Typography>
            <Typography>
              زمان تحویل:
              {'             '}
              {new Date(orderInfo.expectAt).toLocaleDateString('fa')}
            </Typography>
          </Container>
          <TableContainer>
            <Table color="info">
              <TableHead>
                <TableRow>
                  <TableCell align="right"> عنوان کتاب</TableCell>
                  <TableCell align="right">نام نویسنده</TableCell>
                  <TableCell align="right">قیمت</TableCell>
                  <TableCell align="right">تعداد</TableCell>
                  <TableCell align="right">قیمت کل</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orderInfo.products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell align="right">{product.name}</TableCell>
                    <TableCell align="right">{product.author}</TableCell>
                    <TableCell align="right">{product.price}</TableCell>
                    <TableCell align="right">{product.count}</TableCell>
                    <TableCell align="right">
                      {product.price * product.count}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Button variant="contained" color="info" sx={{ mt: '1rem' }}>
            تحویل داده شد
          </Button>
        </Box>
      )}
    </>
  )
}

export default Orders
