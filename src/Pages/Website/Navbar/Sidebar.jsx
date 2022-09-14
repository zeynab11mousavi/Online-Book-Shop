// import React from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
// import { Button, Box, IconButton, Typography } from '@mui/material'
// import Divider from '@mui/material/Divider'
// import Drawer from '@mui/material/Drawer'
// import List from '@mui/material/List'
// import ListItem from '@mui/material/ListItem'
// import ListItemButton from '@mui/material/ListItemButton'
// import ListItemText from '@mui/material/ListItemText'
// import MenuIcon from '@mui/icons-material/Menu'
import { useSelector, useDispatch } from 'react-redux'
import { fetchSubCategory } from '../../../Redux/subCategory/subCategory'
import { useEffect } from 'react'
// const drawerWidth = 240

// const Sidebar = () => {
// useEffect(() => {
//   dispatch(fetchSubCategory())
// }, [])
//   const handleDrawerToggle = () => {
//     setMobileOpen(!mobileOpen)
//   }

//   const params = useParams()
//   const dispatch = useDispatch()
//   // const { window } = props
//   const [mobileOpen, setMobileOpen] = React.useState(false)
//   const { subCategories } = useSelector((state) => state.subCategories)

//   const drawer = (
//     <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
//       <Typography variant="h6" sx={{ my: 2 }}>
//         ماتیکان
//       </Typography>
//       <Divider />
//       <List>
//         {subCategories.map((item) => (
//           <ListItem key={item.id}>
//             <ListItemButton
//               key={item.id}
//               component={Link}
//               to={`${item.name}`}
//               sx={{ textAlign: 'center' }}
//             >
//               <ListItemText primary={item.name} />
//             </ListItemButton>
//           </ListItem>
//         ))}
//       </List>
//     </Box>
//   )

//   const navigate = useNavigate()
//   const container =
//     window !== undefined ? () => window().document.body : undefined
//   // const handleAdminLoginAuth = () => {
//   //   isLoggedIn ? navigate('admin-panel') : navigate('admin-login')
//   // }

//   return (
//     <>
//       {/* //  FULL WIDTH */}
//       <Box component="nav">
//         <Drawer
//           container={container}
//           variant="temporary"
//           open={mobileOpen}
//           onClose={handleDrawerToggle}
//           ModalProps={{
//             keepMounted: true, // Better open performance on mobile.
//           }}
//           sx={{
//             display: { xs: 'block', sm: 'none' },
//             '& .MuiDrawer-paper': {
//               boxSizing: 'border-box',
//               width: drawerWidth,
//             },
//           }}
//         >
//           {drawer}
//         </Drawer>
//       </Box>
//       {/* // DRAWER */}
//       <Box sx={{ display: { xs: 'none', sm: 'block' }, mr: '2rem' }}>
//         {subCategories.map((item) => (
//           <Button
//             key={item.id}
//             sx={{ fontSize: '20px' }}
// component={Link}
// to={`${item.name}`}
//           >
//             {item.name}
//           </Button>
//         ))}
//       </Box>
//     </>
//   )
// }

// export default Sidebar

import * as React from 'react'
import PropTypes from 'prop-types'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import MenuIcon from '@mui/icons-material/Menu'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

const drawerWidth = 240
const navItems = ['Home', 'About', 'Contact']

function Sidebar(props) {
  const { window } = props
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const { subCategories } = useSelector((state) => state.subCategories)
  const dispatch = useDispatch()

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  useEffect(() => {
    dispatch(fetchSubCategory())
  }, [])

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        ماتیکان
      </Typography>
      <Divider />
      <List>
        {subCategories.map((item) => (
          <ListItem key={item.id} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText
                primary={item.name}
                component={Link}
                to={`${item.name}`}
              />
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
      <AppBar component="nav" sx={{ mt: '102px' }}>
        <Toolbar>
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
            {subCategories.map((item) => (
              <Button
                key={item.id}
                sx={{ color: '#fff' }}
                component={Link}
                to={`${item.name}`}
              >
                {item.name}
              </Button>
            ))}
          </Box>
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
            display: { xs: 'unset', sm: 'none' },
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

Sidebar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
}

export default Sidebar
