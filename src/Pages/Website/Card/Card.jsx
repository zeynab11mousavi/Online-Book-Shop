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

const CardBook = (props) => {
  const { book } = props
  const navigate = useNavigate()
  const [added, setAdded] = useState(false)
  const [orderQuantity, setOrderQuantity] = useState(1)

  return (
    <Card
      className="card-body-for-my-home-page"
      key={book.id}
      sx={{ m: '2rem 4rem 1rem', width: '250px', position: 'relative' }}
    >
      <CardMedia
        className="card-picture-for-my-home-page"
        component="img"
        sx={{ width: '90px', margin: '1rem auto' }}
        image={`${URL}/files/${book.image}`}
        alt={`${book.name}`}
        onClick={() => navigate(`/books/${book.id}`)}
      />
      <CardContent>
        <Typography>عنوان: {book.name}</Typography>
        <Typography>نویسنده: {book.author}</Typography>
        <Typography sx={{ mb: '2rem' }}>قیمت: {book.price}</Typography>

        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'space-between',
            width: '100%',
          }}
        >
          {added ? (
            <Box
              sx={{
                width: '100%',
                display: 'inline-flex',
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                alignItems: 'center',
              }}
            >
              <IconButton color="primary">
                <AddIcon />
              </IconButton>
              <Typography>{orderQuantity}</Typography>
              <IconButton color="primary">
                <RemoveIcon />
              </IconButton>
            </Box>
          ) : (
            <IconButton color="primary" onClick={() => setAdded(true)}>
              <ShoppingBasketIcon />
            </IconButton>
          )}
          <IconButton>
            <InfoIcon
              color="primary"
              onClick={() => navigate(`/books/${book.id}`)}
            />
          </IconButton>
        </div>
      </CardContent>
    </Card>
  )
}

export default CardBook
