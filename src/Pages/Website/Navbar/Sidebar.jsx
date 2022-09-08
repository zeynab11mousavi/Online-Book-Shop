import { Link, useNavigate, useParams } from 'react-router-dom'
import { Button } from '@mui/material'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import MenuIcon from '@mui/icons-material/Menu'
import { useSelector, useDispatch } from 'react-redux'
import { fetchSubCategory } from '../../../Redux/subCategory/subCategory'
import { useEffect } from 'react'
const drawerWidth = 240

const Sidebar = () => {
  /**          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton> */

  /**
     *   const params = useParams()
  const dispatch = useDispatch()
  const { window } = props
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const { subCategories } = useSelector((state) => state.subCategories)
     */
  /**
 * const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        ماتیکان
      </Typography>
      <Divider />
      <List>
        {subCategories.map((item) => (
          <ListItem key={item.id}>
            <ListItemButton
              key={item.id}
              component={Link}
              to={`${item.name}`}
              sx={{ textAlign: 'center' }}
            >
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  )

  const navigate = useNavigate()
  const container =
    window !== undefined ? () => window().document.body : undefined
  // const handleAdminLoginAuth = () => {
  //   isLoggedIn ? navigate('admin-panel') : navigate('admin-login')
  // }
 */

  /**
 *   useEffect(() => {
    dispatch(fetchSubCategory())
  }, [])
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }
 */

  return (
    <></>
    //  FULL WIDTH
    //           <Box component="nav">
    //     <Drawer
    //       container={container}
    //       variant="temporary"
    //       open={mobileOpen}
    //       onClose={handleDrawerToggle}
    //       ModalProps={{
    //         keepMounted: true, // Better open performance on mobile.
    //       }}
    //       sx={{
    //         display: { xs: 'block', sm: 'none' },
    //         '& .MuiDrawer-paper': {
    //           boxSizing: 'border-box',
    //           width: drawerWidth,
    //         },
    //       }}
    //     >
    //       {drawer}
    //     </Drawer>
    //   </Box>
    // DRAWER
    //     <Box sx={{ display: { xs: 'none', sm: 'block' }, mr: '2rem' }}>
    //     {subCategories.map((item) => (
    //       <Button
    //         key={item.id}
    //         sx={{ fontSize: '20px' }}
    //         component={Link}
    //         to={`${item.name}`}
    //       >
    //         {item.name}
    //       </Button>
    //     ))}
    //   </Box>
  )
}

export default Sidebar
