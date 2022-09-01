import './home.css'
import GroupCards from '../Cards/GroupCards'
import { Typography } from '@mui/material'
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
    <div className="home-page-of-my-website">
      {subCategories.map((subcategory) => (
        <>
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
            to="#"
          >
            {subcategory.name}
          </Typography>
          <GroupCards key={subcategory.id} subcategory={subcategory} />
        </>
      ))}
    </div>
  )
}

export default Home
