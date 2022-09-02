import './product.css'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import RemoveIcon from '@mui/icons-material/Remove'
import AddIcon from '@mui/icons-material/Add'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { Paper, Typography, Box, IconButton } from '@mui/material'
import { fetchOneBook } from '../../../Redux/books/books'
import { fetchCategory } from '../../../Redux/category/categorySlice'
import { fetchSubCategory } from '../../../Redux/subCategory/subCategory'

const Product = () => {
  const params = useParams()
  const [added, setAdded] = useState(false)
  const [orderQuantity, setOrderQuantity] = useState(1)
  const [book, setBook] = useState('')
  const { categories } = useSelector((state) => state.categories)
  const { subCategories } = useSelector((state) => state.subCategories)
  const dispatch = useDispatch()

  useEffect(() => {
    //  CATEGORY
    dispatch(fetchCategory())

    // SUBCATEGORY
    dispatch(fetchSubCategory())

    // GET TEH BOOK
    dispatch(fetchOneBook(params.params))
      .unwrap()
      .then((res) => setBook(...res))
  }, [])

  // CATEGORY AND SUBCAtEGORY NAME HANDLER
  const catAndSubcat = (cat, sub) => {
    let tempCat, tempSubCat
    categories.map((category) =>
      category.id === cat ? (tempCat = category.name) : null,
    )
    subCategories.map((subcategory) =>
      subcategory.id === sub ? (tempSubCat = subcategory.name) : null,
    )
    return (
      <p>
        {tempCat} / {tempSubCat}
      </p>
    )
  }
  const priceFormatter = new Intl.NumberFormat()
  return (
    <Paper key={book.id}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', lg: 'row' },
        }}
      >
        <img
          width={'350px'}
          alt="تصویری برای این محصول وجود ندارد"
          src={`http://localhost:3001/files/${book.image}`}
        />
        <Box sx={{ m: '1rem 3rem 1rem 0' }}>
          <Typography sx={{ m: '1rm' }} variant="h4">
            {book.name}
          </Typography>
          <Typography sx={{ m: '1rm' }} variant="h5">
            {book.author}
          </Typography>
          <Typography> {book.description} </Typography>
          <Typography sx={{ m: '1rm' }}>
            {catAndSubcat(book.category, book.subcategory)}{' '}
          </Typography>
          <Typography sx={{ m: '1rm' }}>
            {' '}
            {priceFormatter.format(book.price)}{' '}
          </Typography>
          <div>
            {added ? (
              <Box
                sx={{
                  display: 'inline-flex',
                  flexDirection: 'row',
                  flexWrap: 'wrap',
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
                <ShoppingCartIcon />
              </IconButton>
            )}
          </div>
        </Box>
      </Box>
    </Paper>
  )
}

export default Product
