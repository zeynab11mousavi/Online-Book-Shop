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
  const bg = [
    '#FFF',
    '#00acc1',
    '#ef476f',
    '#ffd166',
    '#06d6a0',
    '#118ab2',
    '#073b4c',
  ]

  return (
    <div>
      <h1
        style={{
          textAlign: 'center',
          borderRadius: '10px',
          padding: '10px',
        }}
      >
        <Typography
          sx={{
            color: `${bg[1]}`,
            textDecoration: 'none',
            fontSize: '36px',
            fontWeight: 'bold',
          }}
          component={Link}
          to={`/category/${params.params}`}
        >
          {`کتاب های گروه ${params.params}`}
        </Typography>
      </h1>
      <Box
        sx={{
          display: 'inline-flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
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
    </div>
  )
}

export default DividedProductsPage
