import * as React from 'react'
import { AppBar, Typography, Toolbar, IconButton, Box } from '@mui/material'
import { Link } from 'react-router-dom'
import logo from '../../../Assets/pic/logo.png'
import { Button } from '@mui/material'
import { ShoppingBasket } from '@mui/icons-material'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import MenuIcon from '@mui/icons-material/Menu'

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
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  )

  const container =
    window !== undefined ? () => window().document.body : undefined

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar color="info" component="nav">
        <Toolbar>
          <img src={logo} alt="logo" width={50} />
          <Typography
            variant="h3"
            color="primary"
            fontWeight="bold"
            sx={{ ml: '5rem' }}
          >
            ماتیکان
          </Typography>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>

          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {navItems.map((item) => (
              <Button key={item}>{item}</Button>
            ))}
          </Box>

          <Button
            sx={{ mr: '3rem' }}
            variant="contained"
            component={Link}
            to="admin-login"
            text="info"
          >
            پنل مدیریت
          </Button>

          <IconButton color="primary" component={Link} to="shopping-basket">
            <ShoppingBasket />
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
