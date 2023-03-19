import { Container } from '@mui/system'
import { Outlet } from 'react-router-dom'
import AdminNavbar from '../../Pages/Admin/AdminNavbar/AdminNavbar'
function AdminLayout() {
  return (
    <Container>
      <AdminNavbar />
      <div style={{ marginBottom: '10rem' }}></div>
      <Outlet />
    </Container>
  )
}

export default AdminLayout
