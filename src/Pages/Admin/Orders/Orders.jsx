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
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchOrders,
  deliveredOrders,
  pendingOrders,
  handleDeliver,
} from '../../../Redux/orders/orders'
import persian from '../../../Assets/persian'
import CancelPresentationRoundedIcon from '@mui/icons-material/CancelPresentationRounded'
const initialToggle = {
  toggle: false,
  orderInfo: {},
}

const Orders = () => {
  // states for managing the data to show to user;
  const { orders } = useSelector((state) => state.orders)
  const [page, setPage] = useState(1)
  //  PAGINATION BUTTONS
  const [next, setNext] = useState(false)
  const [prev, setPrev] = useState(true)
  const [limit, setLimit] = useState(20)

  const [info, setInfo] = useState('تمام سفارشات')
  const [status, setStatus] = useState('true')
  const [toggleStatus, setToggleStatus] = useState(initialToggle)
  const { orderInfo } = toggleStatus
  const dispatch = useDispatch()
  const priceFormatter = new Intl.NumberFormat()
  // priceFormatter.format(book.price)

  useEffect(() => {
    dispatch(fetchOrders({ page, limit }))
  }, [])

  const handleDetail = (id) => {
    const orderInfo = orders.find((order) => order.id === id)
    setToggleStatus({ toggle: true, orderInfo })
  }

  const handleNextPage = () => {
    // if (Math.ceil(total / limit) > page) {
    setPage(page + 1)
    setPrev(false)
    // }
    // if (Math.round(total / limit) === page) {
    //   setNext(true)
    // }
  }
  const handlePrevPage = () => {
    // if (page > 1) {
    setPage(page - 1)
    setNext(false)
    // }
    // if (page === 2) setPrev(true)
  }

  const delivered = () => {
    dispatch(deliveredOrders({ page, limit }))
    setInfo('ارسال شده')
  }
  const pending = () => {
    dispatch(pendingOrders({ page, limit }))
    setInfo('در دست ارسال')
  }

  // HANDLE DELIVERED
  const handleDelivered = (id) => {
    const time = new Date()
    dispatch(handleDeliver({ id, time }))
    setToggleStatus(initialToggle)
    dispatch(deliveredOrders({ page, limit }))
  }

  return (
    <>
      <Button
        sx={{ ml: '1rem' }}
        variant="contained"
        color="primary"
        onClick={() => delivered()}
      >
        تحویل داده شده
      </Button>
      <Button variant="contained" color="primary" onClick={() => pending()}>
        تحویل داده نشده
      </Button>
      <TableContainer component="div">
        <Typography sx={{ m: '2rem' }}>{info}</Typography>
        <Table>
          <TableHead className="tableBody" component="thead">
            <TableRow component="tr">
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
            {orders.map((order) => (
              <TableRow key={order.id} component="tr">
                <TableCell component="td" align="right">
                  {`
                      ${order.username} 
                      ${order.lastname}
                    `}
                </TableCell>
                <TableCell component="td" align="right">
                  {/* ***************************** */}
                  {order.prices}
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
                      followcourser={''}
                      onClick={() => handleDetail(order.id)}
                    >
                      بررسی سفارش
                    </Typography>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Button disabled={next} onClick={handleNextPage}>
          بعدی
        </Button>
        <Typography>صفحه {page}</Typography>
        <Button disabled={prev} onClick={handlePrevPage}>
          قبلی
        </Button>
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
            <Typography component="p">
              شماره تلفن: {persian(orderInfo.phone).toLocaleString('fa')}
            </Typography>
            <Typography component="p">
              زمان سفارش:{'       '}
              {new Date(orderInfo.createdAt).toLocaleDateString('fa')}
            </Typography>
            {/* <Typography component="p">
              زمان تحویل:
              {'             '}
              {new Date(orderInfo.expectAt).toLocaleDateString('fa')}
            </Typography> */}
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
                      {persian(product.price).toLocaleString('fa-IR')}
                    </TableCell>
                    <TableCell component="td" align="right">
                      {product.count ? (
                        <span>{product.count.toLocaleString('fa')}</span>
                      ) : (
                        <span>{product.number.toLocaleString('fa')}</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Box>
            {orderInfo.delivered === true ? (
              <Typography>
                در تاریخ{' '}
                {new Date(orderInfo.deliveredAt).toLocaleDateString('fa')} تحویل
                داده شد.
              </Typography>
            ) : (
              <Button
                variant="contained"
                color="info"
                sx={{ mt: '1rem' }}
                onClick={() => handleDelivered(orderInfo.id)}
              >
                تحویل داده شد
              </Button>
            )}
          </Box>
        </Box>
      )}
    </>
  )
}

export default Orders
