import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { getWithSubcategory } from '../../../Redux/home/homeSlice'
import { fetchSubCategory } from '../../../Redux/subCategory/subCategory'
import { fetchCategory } from '../../../Redux/category/categorySlice'
import { Box } from '@mui/material'
import CardBook from '../Card/Card'

const GroupCards = (props) => {
  const { subcategory } = props
  const [sub1, setSub1] = useState([])
  const dispatch = useDispatch()
  const [subcat, setSubcat] = useState(subcategory.id)
  const bg = ['#FFF', '#ef476f', '#ffd166', '#06d6a0', '#118ab2', '#073b4c']

  useEffect(() => {
    dispatch(fetchSubCategory())
    dispatch(fetchCategory())
    dispatch(getWithSubcategory(subcat))
      .unwrap()
      .then((res) => setSub1(res))
  }, [])
  return (
    <Box sx={{ textAlign: 'center' }}>
      <Box
        sx={{
          display: 'inline-flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          backgroundColor: `${bg[subcat]}`,
          m: '3rem auto',
          borderRadius: '10px',
        }}
      >
        {sub1.map((book) => (
          <CardBook book={book} key={book.id} />
        ))}
      </Box>
    </Box>
  )
}

export default GroupCards
