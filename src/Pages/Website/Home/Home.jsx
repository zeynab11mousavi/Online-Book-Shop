import './home.css'
import GroupCards from '../Cards/GroupCards'
import { Typography, Box } from '@mui/material'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { fetchSubCategory } from '../../../Redux/subCategory/subCategory'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper'
import 'swiper/css'
import s1 from '../../../Assets/pic/s1.jpg'
import s2 from '../../../Assets/pic/s2.jpg'
import s3 from '../../../Assets/pic/s3.jpg'
import s4 from '../../../Assets/pic/s4.jpg'

const Home = () => {
  const dispatch = useDispatch()
  const { subCategories } = useSelector((state) => state.subCategories)
  const slides = [s1, s2, s3, s4]

  useEffect(() => {
    dispatch(fetchSubCategory())
  }, [])
  const bg = [
    '#FFF',
    '#00acc1',
    '#f15a7d',
    '#fbd67f',
    '#15d9a5',
    '#073b4c',
    '#118ab2',
  ]

  return (
    <Box className="home-page-of-my-website">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        slidesPerView={1}
        navigation
        autoplay={true}
        pagination={{ clickable: true }}
        style={{ margin: '0 0 2rem 0' }}
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide}>
            <img src={slide} alt="slider" />
          </SwiperSlide>
        ))}
      </Swiper>

      {subCategories.map((subcategory) => (
        <Box key={`group-${subcategory.id}`}>
          <Typography
            sx={{
              color: `${bg[1]}`,
              fontSize: '32px',
              fontWeight: 'bold',
              textDecoration: 'none',
              textDecorationLine: 'none',
            }}
            component={Link}
            to={`/${subcategory.name}`}
          >
            {`کتاب های گروه ${subcategory.name}`}
          </Typography>
          <GroupCards key={`${subcategory.name}`} subcategory={subcategory} />
        </Box>
      ))}
    </Box>
  )
}

export default Home
