import './Nav.css'
import * as React from 'react'
import {
  CardMedia,
  AppBar,
  Typography,
  Toolbar,
  IconButton,
  Box,
  TextField,
} from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import bookcity from '../../../Assets/pic/bookcity.JPG'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { Search } from '@mui/icons-material'

const Navbar = () => {
  const navigate = useNavigate()
  return (
    <Box
      sx={{
        m: '0px',
        display: 'flex',
        width: { xs: '600px', lg: '100%' },
        position: 'relative',
      }}
    >
      <AppBar
        color="info"
        component="nav"
        sx={{ p: { xs: '5px', lg: '1rem' } }}
      >
        <Toolbar>
          <CardMedia
            component="img"
            image={bookcity}
            alt="logo"
            sx={{ width: { xs: '30px', lg: '45px', xl: '90px' }, ml: '5px' }}
            onClick={() => navigate('/')}
            className="navigate-to-home"
          />
          <Typography
            className="navigate-to-home"
            onClick={() => navigate('/')}
            variant="h3"
            color="primary"
            fontWeight="bold"
            sx={{ fontSize: { xs: '14px', lg: '26px', xl: '36px' } }}
          >
            ماتیکان
          </Typography>
          <Box
            sx={{
              width: { xs: '40%', lg: '65%' },
              m: '0 5%',
              borderRadius: '30%',
              position: 'relative',
            }}
          >
            <TextField placeholder="جست و جوی محصول" sx={{ width: '100%' }} />
            <IconButton sx={{ position: 'absolute', left: '15px' }}>
              <Search
                color="primary"
                sx={{
                  fontSize: { sm: '15px', lg: '25px', xl: '35px' },
                  m: '3px',
                }}
              />
            </IconButton>
          </Box>

          <Box>
            <IconButton
              color="primary"
              component={Link}
              to="/admin-login"
              text="info"
            >
              <AdminPanelSettingsIcon
                sx={{
                  fontSize: { sm: '15px', lg: '25px', xl: '35px' },
                }}
              />
            </IconButton>

            <IconButton color="primary" component={Link} to="shopping-basket">
              <ShoppingCartIcon
                sx={{
                  fontSize: { sm: '15px', lg: '25px', xl: '35px' },
                }}
              />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Navbar
