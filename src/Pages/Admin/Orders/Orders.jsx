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
  const priceFormatter = new Intl.NumberFormat()
  // priceFormatter.format(book.price)

  useEffect(() => {
    dispatch(fetchOrders())
      .unwrap()
      .then((res) => setAllOrders(res))
  }, [])

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
      <TableContainer component="div">
        <Table>
          <TableHead className="tableBody" component="thead">
            <TableRow component="tr">
              <TableCell component="td" align="right">
                وضعیت
              </TableCell>
              <TableCell component="td" align="right">
                نام سفارش دهنده
              </TableCell>
              <TableCell component="td" align="right">
                مجموع مبلغ
              </TableCell>
              <TableCell component="td" align="right">
                زمان ثبت سفارش
              </TableCell>
              <TableCell component="td" align="right">
                بررسی سفارش
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody component="tbody">
            {allOrders.map(
              (order) =>
                order.delivered === status && (
                  <TableRow key={order.id} component="tr">
                    <TableCell component="td" align="right">
                      {order.delivered}
                    </TableCell>
                    <TableCell component="td" align="right">
                      {`
                      ${order.username} 
                      ${order.lastname}
                    `}
                    </TableCell>
                    <TableCell component="td" align="right">
                      {priceFormatter.format(order.prices)}
                    </TableCell>
                    <TableCell component="td" align="right">
                      {new Date(order.createdAt).toLocaleDateString('fa')}
                    </TableCell>
                    <TableCell component="td" align="right">
                      <Tooltip
                        TransitionComponent={Fade}
                        TransitionProps={{ timeout: 600 }}
                        title="برای مشاهده جزییات کلیک فرمایید"
                      >
                        <Typography
                          component="p"
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
          <Container component="div">
            <Typography component="p">
              {`
              نام مشتری: ${orderInfo.username}
              ${orderInfo.lastname}
              `}
            </Typography>
            <Typography component="p"> آدرس: {orderInfo.address}</Typography>
            <Typography component="p">شماره تلفن: {orderInfo.phone}</Typography>
            <Typography component="p">
              زمان سفارش:{'       '}
              {new Date(orderInfo.createdAt).toLocaleDateString('fa')}
            </Typography>
            <Typography component="p">
              زمان تحویل:
              {'             '}
              {new Date(orderInfo.expectAt).toLocaleDateString('fa')}
            </Typography>
          </Container>
          <TableContainer component="div">
            <Table color="info" component="table">
              <TableHead component="thead">
                <TableRow component="tr">
                  <TableCell component="td" align="right">
                    {' '}
                    عنوان کتاب
                  </TableCell>
                  <TableCell component="td" align="right">
                    نام نویسنده
                  </TableCell>
                  <TableCell component="td" align="right">
                    قیمت
                  </TableCell>
                  <TableCell component="td" align="right">
                    تعداد
                  </TableCell>
                  <TableCell component="td" align="right">
                    قیمت کل
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody component="tbody">
                {orderInfo.products.map((product) => (
                  <TableRow component="tr" key={product.id}>
                    <TableCell component="td" align="right">
                      {product.name}
                    </TableCell>
                    <TableCell component="td" align="right">
                      {product.author}
                    </TableCell>
                    <TableCell component="td" align="right">
                      {priceFormatter.format(product.price)}
                    </TableCell>
                    <TableCell component="td" align="right">
                      {priceFormatter.format(product.count)}
                    </TableCell>
                    <TableCell component="td" align="right">
                      {priceFormatter.format(product.price * product.count)}
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
