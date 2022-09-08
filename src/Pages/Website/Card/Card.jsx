import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket'
import RemoveIcon from '@mui/icons-material/Remove'
import InfoIcon from '@mui/icons-material/Info'
import AddIcon from '@mui/icons-material/Add'
import { Box, IconButton } from '@mui/material'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { useState } from 'react'
import { URL } from '../../../config/api'
import { useNavigate } from 'react-router-dom'
import persian from '../../../Assets/persian.js'

const CardBook = (props) => {
  const { book } = props
  const navigate = useNavigate()

  return (
    <Card
      className="card-body-for-my-home-page"
      sx={{
        m: '2rem',
        p: '15px',
        width: '270px',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <CardMedia
        className="card-picture-for-my-home-page"
        sx={{ height: '170px', width: 'auto', mb: '20px' }}
        component="img"
        image={`${URL}/files/${book.image}`}
        alt={`${book.name}`}
        onClick={() => navigate(`/books/${book.id}`)}
      />

      <CardContent sx={{ position: 'sticky', bottom: '20px' }}>
        <Typography>عنوان: {book.name}</Typography>
        <Typography>نویسنده: {book.author}</Typography>
        <Typography>قیمت: {persian(+book.price)}</Typography>
      </CardContent>
    </Card>
  )
}

export default CardBook
