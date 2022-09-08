import { Button } from '@mui/material'

const PrimaryBtn = ({ children }) => {
  return (
    <Button variant="contained" color="primary">
      {children}
    </Button>
  )
}

export default PrimaryBtn
