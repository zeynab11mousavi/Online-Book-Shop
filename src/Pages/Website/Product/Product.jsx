import './product.css'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import RemoveIcon from '@mui/icons-material/Remove'
import AddIcon from '@mui/icons-material/Add'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import { URL } from '../../../config/api'
import persian from '../../../Assets/persian'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {
  Paper,
  Typography,
  Box,
  IconButton,
  TextField,
  Button,
  CardMedia,
} from '@mui/material'
import allContexts from '../../../Context/BookStoreContext'
import { useContext } from 'react'
import { fetchOneBook } from '../../../Redux/books/books'
import { fetchCategory } from '../../../Redux/category/categorySlice'
import { fetchSubCategory } from '../../../Redux/subCategory/subCategory'
import AddRemove from './AddRemove'

const Product = () => {
  const params = useParams()
  const { baj, setBaj } = useContext(allContexts)
  const notify = (name) => toast.success(`${name} با موفقیت به سبد اضافه شد.`)
  const [shoppingMood, setShoppingMood] = useState(true)
  const [orderQuantity, setOrderQuantity] = useState(0)
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

  //******************  ADD/Remove PRODUCT TO CART  *****************//

  const handleChangeOrder = (e) => {
    if (e < book.quantity && e > 0) {
      setOrderQuantity(e)
      setShoppingMood(false)
    }
  }

  return (
    <Paper
      className="product-page"
      component="div"
      key={book.id}
      sx={{
        width: '100%',
        m: '0 auto',
        p: { xs: '5px', lg: '1rem' },
      }}
    >
      <ToastContainer />

      <Box
        component="div"
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', lg: 'row' },
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <CardMedia
          alt="تصویری برای این محصول وجود ندارد"
          image={`${URL}/files/${book.image}`}
          component="img"
          sx={{ width: '300px', height: 'auto' }}
        />
        <Box
          component="div"
          sx={{
            m: '1rem 5rem',
            width: '80%',
            display: 'flex',
            flexDirection: { xs: 'column', lg: 'row' },
            justifyContent: 'space-around',
          }}
        >
          <Box
            component="div"
            sx={{
              display: 'flex',
              width: { xs: '100%', lg: '60%' },
              flexDirection: 'column',
              justifyContent: 'space-around',
            }}
          >
            <Typography
              component="div"
              sx={{
                m: '1rm',
                fontWeight: 'bold',
                fontSize: { xs: '14px', lg: '20px' },
              }}
              color="primary"
              variant="h6"
            >
              <MenuBookIcon color="primary" /> {book.name}
            </Typography>
            <Typography
              component="div"
              sx={{ m: '1rm', fontSize: { xs: '14px', lg: '20px' } }}
              variant="h5"
            >
              نویسنده: {book.author}
            </Typography>

            <Typography
              sx={{ m: '1rm', fontSize: '18px', fontWeight: 'bold' }}
              color="primary"
            >
              دسته بندی:
            </Typography>
            <Typography
              component="div"
              sx={{ m: '1rm', fontSize: '18px', fontWeight: 'bold' }}
            >
              {catAndSubcat(book.category, book.subcategory)}{' '}
            </Typography>
            <Typography component="div" sx={{ m: '1rm' }}>
              قیمت: {persian(+book.price)}
              {' ریال '}
            </Typography>
            <div>
              {+book.quantity === 0 ? (
                <Typography color="primary">در انبار موجود نیست</Typography>
              ) : (
                <AddRemove book={book} />
              )}
            </div>
          </Box>
          <Box
            sx={{
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              width: { xs: '100%', lg: '40%' },
            }}
          >
            <Box
              sx={{
                width: '100%',
                height: '50%',
                p: { lg: '30% 1rem 0' },
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-around',
              }}
            >
              <Typography
                color="primary"
                sx={{
                  fontWeight: 'bold',
                  display: 'flex',
                  cursor: 'pointer',
                  fontSize: { xs: '14px', lg: '16px' },
                }}
              >
                نظرات کاربران در مورد {book.name}
              </Typography>
              <Box sx={{ display: 'flex' }}>
                <Typography
                  color="primary"
                  sx={{ display: 'flex', alignItems: 'center' }}
                >
                  <IconButton>
                    <ThumbUpIcon />
                  </IconButton>
                  99%
                </Typography>
                <Typography
                  color="primary"
                  sx={{ display: 'flex', alignItems: 'center' }}
                >
                  <IconButton>
                    <ThumbDownAltIcon />
                  </IconButton>
                  1%
                </Typography>
              </Box>
              <Typography
                sx={{ mt: '1rem', fontSize: { xs: '14px', lg: '16px' } }}
              >
                اولین نفری باشید که نظری در باره این کتاب وارد می کند:
              </Typography>
              <TextField sx={{ mt: '1rem' }} />
              <Button variant="contained" color="primary" sx={{ mt: '1rem' }}>
                بازگشت به سایت
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box sx={{ p: '2rem' }}>
        <Typography color="primary" sx={{ fontWeight: 'bold' }}>
          توضیحات:{' '}
        </Typography>
        <Typography> {book.description} </Typography>
      </Box>
    </Paper>
  )
}

export default Product
