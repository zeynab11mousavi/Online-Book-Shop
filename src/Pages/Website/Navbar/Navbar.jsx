import './Nav.css'
import * as React from 'react'
<<<<<<< Updated upstream
import { AppBar, Typography, Toolbar, IconButton, Box } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../../../Assets/pic/logo.png'
import { Button } from '@mui/material'
import { ShoppingBasket } from '@mui/icons-material'
=======
import {
  CardMedia,
  AppBar,
  Typography,
  Toolbar,
  IconButton,
  Box,
} from '@mui/material'
import { Link, useNavigate, useParams } from 'react-router-dom'
import logo from '../../../Assets/pic/logo.png'
import { Button } from '@mui/material'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
>>>>>>> Stashed changes
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import MenuIcon from '@mui/icons-material/Menu'
<<<<<<< Updated upstream

const drawerWidth = 240
const navItems = [
  'تاریخی',
  'داستانی',
  'خارجی',
  'آموزشی',
  'درسی',
  'هنری',
  'روانشناسی',
]

const Navbar = (props) => {
  const { window } = props
  const [mobileOpen, setMobileOpen] = React.useState(false)

=======
import { useSelector, useDispatch } from 'react-redux'
import { fetchSubCategory } from '../../../Redux/subCategory/subCategory'
import { useEffect } from 'react'
const drawerWidth = 240

const Navbar = (props) => {
  const params = useParams()
  const dispatch = useDispatch()
  const { window } = props
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const { subCategories } = useSelector((state) => state.subCategories)

  useEffect(() => {
    dispatch(fetchSubCategory())
  }, [])
>>>>>>> Stashed changes
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        ماتیکان
      </Typography>
      <Divider />
      <List>
<<<<<<< Updated upstream
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText primary={item} />
=======
        {subCategories.map((item) => (
          <ListItem key={item.id}>
            <ListItemButton
              key={item.id}
              component={Link}
              to={`${item.name}`}
              sx={{ textAlign: 'center' }}
            >
              <ListItemText primary={item.name} />
>>>>>>> Stashed changes
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  )

<<<<<<< Updated upstream
  const container =
    window !== undefined ? () => window().document.body : undefined
  const navigate = useNavigate()
  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar color="info" component="nav">
        <Toolbar>
          <img
            src={logo}
            alt="logo"
            width={50}
=======
  const navigate = useNavigate()
  const container =
    window !== undefined ? () => window().document.body : undefined
  // const handleAdminLoginAuth = () => {
  //   isLoggedIn ? navigate('admin-panel') : navigate('admin-login')
  // }
  return (
    <Box sx={{ display: 'flex', width: '100%' }}>
      <AppBar color="info" component="nav">
        <Toolbar>
          <CardMedia
            component="img"
            image={logo}
            alt="logo"
            sx={{ width: { xs: '25px', lg: '45px', xl: '60px' } }}
>>>>>>> Stashed changes
            onClick={() => navigate('/')}
            className="navigate-to-home"
          />
          <Typography
            className="navigate-to-home"
            onClick={() => navigate('/')}
            variant="h3"
            color="primary"
            fontWeight="bold"
<<<<<<< Updated upstream
            sx={{ ml: '5rem' }}
=======
            sx={{ fontSize: { xs: '14px', lg: '26px', xl: '36px' } }}
>>>>>>> Stashed changes
          >
            ماتیکان
          </Typography>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
<<<<<<< Updated upstream
            sx={{ mr: 2, display: { sm: 'none' } }}
=======
            sx={{ display: { sm: 'none' } }}
>>>>>>> Stashed changes
          >
            <MenuIcon />
          </IconButton>

          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
<<<<<<< Updated upstream
            {navItems.map((item) => (
              <Button key={item}>{item}</Button>
=======
            {subCategories.map((item) => (
              <Button key={item.id} component={Link} to={`${item.name}`}>
                {item.name}
              </Button>
>>>>>>> Stashed changes
            ))}
          </Box>

          <Button
<<<<<<< Updated upstream
            sx={{ mr: '3rem' }}
            variant="contained"
            component={Link}
            to="admin-login"
=======
            sx={{
              width: { sm: '45px', lg: '70px', xl: '120px' },
              fontSize: { sm: '8px', lg: '12px', xl: '14px' },
              position: 'absolute',
              left: '5rem',
            }}
            variant="contained"
            component={Link}
            to="/admin-login"
>>>>>>> Stashed changes
            text="info"
          >
            پنل مدیریت
          </Button>

<<<<<<< Updated upstream
          <IconButton color="primary" component={Link} to="shopping-basket">
            <ShoppingBasket />
=======
          <IconButton
            color="primary"
            sx={{ position: 'absolute', left: '2rem' }}
            component={Link}
            to="shopping-basket"
          >
            <ShoppingCartIcon />
>>>>>>> Stashed changes
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  )
}

export default Navbar
