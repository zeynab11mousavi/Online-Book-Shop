import './product.css'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import RemoveIcon from '@mui/icons-material/Remove'
import AddIcon from '@mui/icons-material/Add'
import { useState } from 'react'
import { Typography, Box, IconButton } from '@mui/material'
import allContexts from '../../../Context/BookStoreContext'
import { useContext } from 'react'
import { number } from '../../../Assets/persian'

const AddRemove = (props) => {
  const { book } = props
  const { baj, setBaj } = useContext(allContexts)
  const [added, setAdded] = useState(false)
  const [add, setAdd] = useState(false)
  const [orderQuantity, setOrderQuantity] = useState(0)
  const [maxError, setMaxError] = useState('')

  const prevOrders = JSON.parse(localStorage.getItem('orders')) ?? []
  const [orders, setOrders] = useState(prevOrders)
  const [newOrder, setNewOrder] = useState({ ...book })

  const firstAddToCart = (id) => {
    setAdded(true)
    setOrderQuantity(1)

    const allIds = []
    orders.map((order) => allIds.push(order.id))
    if (orders.length === 0) {
      setOrders([...orders, { ...newOrder, number: 1 }])
      localStorage.setItem(
        'orders',
        JSON.stringify([{ ...newOrder, number: 1 }]),
      )
      setBaj(baj + 1)
    } else if (orders.length > 0 && allIds.includes(book.id)) {
      orders.find((order) =>
        +order.id === +book.id ? ++order.number : order.number,
      )
      localStorage.setItem('orders', JSON.stringify(orders))
    } else if (orders.length > 0) {
      // setOrders([...orders, { ...newOrder, number: 1 }])
      localStorage.setItem(
        'orders',
        JSON.stringify([...orders, { ...newOrder, number: 1 }]),
      )
      setBaj(baj + 1)
    }
  }

  const addToCart = (id) => {
    console.log(orders)
    orderQuantity < book.quantity
      ? setOrderQuantity(orderQuantity + 1)
      : setAdd(true)
    if (+orderQuantity === +book.quantity) {
      setMaxError(
        ` بیشتر از ${number(book.quantity)} عدد در انبار موجود نمی باشد`,
      )
    }

    orders.find((order) => (+order.id === +book.id ? order.number++ : null))
    localStorage.setItem('orders', JSON.stringify(orders))
  }

  const removeFromCart = (id) => {
    if (+orderQuantity - 1 < +book.quantity) {
      setMaxError('')
    }
    if (orderQuantity === 1 && orders.length === 1) {
      setAdded(false)
      setBaj(baj - 1)
      localStorage.removeItem('orders')
    } else if (orderQuantity === 1) {
      setAdded(false)

      setBaj(baj - 1)
      let up = orders.filter((order, book) => +order.id !== +book.id)
      console.log('donkey', up)
      localStorage.setItem('orders', JSON.stringify(orders))
    } else {
      setOrderQuantity(orderQuantity - 1)
      orders.find((order) => (+order.id === +book.id ? order.number-- : null))
      localStorage.setItem('orders', JSON.stringify(orders))
    }
  }
  return (
    <Box>
      {added ? (
        <>
          <Box
            sx={{
              display: 'inline-flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
            }}
          >
            <IconButton
              disabled={add}
              onClick={() => addToCart()}
              color="primary"
            >
              <AddIcon />
            </IconButton>
            <Typography component="span">{orderQuantity}</Typography>
            <IconButton onClick={() => removeFromCart(book.id)} color="primary">
              <RemoveIcon />
            </IconButton>
          </Box>
          <Typography component="span" color="error">
            {maxError}
          </Typography>
        </>
      ) : (
        <IconButton color="primary" onClick={() => firstAddToCart()}>
          <ShoppingCartIcon />
        </IconButton>
      )}
    </Box>
  )
}

export default AddRemove
