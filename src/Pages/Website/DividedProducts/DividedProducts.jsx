import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Button,
  Avatar,
  Box,
  Typography,
} from '@mui/material'
import { useParams, Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { dividedProductWithSub } from '../../../Redux/dividedProducts/dividedProducts'
import { useState } from 'react'
import { fetchSubCategory } from '../../../Redux/subCategory/subCategory'
import { URL } from '../../../config/api'
import CardBook from '../Card/Card'
const DividedProductsPage = () => {
  const params = useParams()
  // const [searchParams, setSearchParams] = useSearchParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [sub, setSub] = useState('')
  const { dividedProducts } = useSelector((state) => state.dividedProducts)
  const { subCategories } = useSelector((state) => state.subCategories)

  const [page, setPage] = useState(1)
  useEffect(() => {
    // const currentParams = Object.fromEntries(...searchParams)
    dispatch(fetchSubCategory())
    subCategories.map((subcategory) =>
      subcategory.name === params.params ? setSub(subcategory) : null,
    )
    dispatch(dividedProductWithSub({ page, id: sub.id }))
    // dispatch(dividedProductWithSub({  currentParams._page, id: sub.id }))
  }, [page, params, sub])
  const bg = ['#FFF', '#ef476f', '#ffd166', '#06d6a0', '#118ab2', '#073b4c']

  return (
    <>
      <h1
        style={{
          backgroundColor: `${bg[sub.id]}`,
          textAlign: 'center',
          borderRadius: '10px',
          padding: '10px',
        }}
      >
        <Typography
          sx={{ color: '#fff', textDecoration: 'none', fontSize: '42px' }}
          component={Link}
          to={`/${params.params}`}
        >
          {sub.name}
        </Typography>
      </h1>
      <Box
        sx={{
          display: 'inline-flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          backgroundColor: `${bg[sub.id]}`,
          m: '3rem auto',
          borderRadius: '10px',
          textAlign: 'center',
        }}
      >
        {dividedProducts.map((book) => (
          <CardBook book={book} key={book.id} />
        ))}
      </Box>

      <Button onClick={() => setPage(page + 1)}>next</Button>
      <span>{page}</span>
      <Button onClick={() => setPage(page - 1)}>pre</Button>
    </>
  )
}

export default DividedProductsPage
