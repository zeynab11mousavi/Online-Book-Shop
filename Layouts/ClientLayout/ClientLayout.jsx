import { Container } from '@mui/system'
import { Outlet } from 'react-router-dom'
import Navbar from '../../Pages/Website/Navbar/Navbar'
import Footer from '../../Pages/Website/Footer/Footer'
import { Button } from '@mui/material'

function ClientLayout() {
  return (
    <Container>
      <Navbar />
      <div style={{ marginBottom: '10rem' }}></div>
      <Outlet />
      <Footer />
    </Container>
  )
}

export default ClientLayout
