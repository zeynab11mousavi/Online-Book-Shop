import { Container } from '@mui/system'
import { Outlet } from 'react-router-dom'
import Navbar from '../../Pages/Website/Navbar/Navbar'
import Footer from '../../Pages/Website/Footer/Footer'

function ClientLayout() {
  return (
    <Container
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Navbar sx={{ width: '100%', m: '0px' }} />
      <div style={{ marginBottom: '10rem' }}></div>
      <Outlet sx={{ width: '100%' }} />
      <div style={{ marginBottom: '2rem' }}></div>
      <Footer sx={{ width: '100%' }} />
    </Container>
  )
}

export default ClientLayout
