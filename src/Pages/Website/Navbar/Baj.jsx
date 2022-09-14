import allContexts from '../../../Context/BookStoreContext'
import { useContext } from 'react'
import { Typography } from '@mui/material'
import { number } from '../../../Assets/persian'
const Baj = () => {
  const { baj } = useContext(allContexts)

  return (
    <Typography component="div" color="primary" className="baj">
      {number(baj)}
    </Typography>
  )
}

export default Baj
