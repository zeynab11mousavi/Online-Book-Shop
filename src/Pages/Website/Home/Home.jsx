import './home.css'
import GroupCards from '../Cards/GroupCards'
import { Typography, Box } from '@mui/material'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { fetchSubCategory } from '../../../Redux/subCategory/subCategory'

const Home = () => {
  const dispatch = useDispatch()
  const { subCategories } = useSelector((state) => state.subCategories)

  useEffect(() => {
    dispatch(fetchSubCategory())
  }, [])
  const bg = ['#FFF', '#f15a7d', '#fbd67f', '#15d9a5', '#2194ba', '#073b4c']

  return (
    <Box className="home-page-of-my-website">
      {subCategories.map((subcategory) => (
        <Box key={`group-${subcategory.id}`}>
          <Typography
            sx={{
              color: '#fff',
              backgroundColor: `${bg[subcategory.id]}`,
              fontSize: '40px',
              textAlign: 'center',
              textDecoration: 'none',
              textDecorationLine: 'none',
              borderRadius: '10px',
              p: '10px 15rem',
            }}
            component={Link}
            to={`/${subcategory.name}`}
          >
            {subcategory.name}
          </Typography>
          <GroupCards key={`${subcategory.name}`} subcategory={subcategory} />
        </Box>
      ))}
    </Box>
  )
}

export default Home
