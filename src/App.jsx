import './App.css'
import Routers from './Router/Router' // PROJECT ROUTES;
import { theme } from './Assets/Styles/Theme' // PROJECT THEME;
import { ThemeProvider } from '@mui/material/styles'
import { fetchOrders } from './Redux/orders/orders'
import { Provider } from 'react-redux'
import store from './Redux/store'

function App() {
  // fetchOrders()
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Routers sx={{ width: '100%' }} />
      </ThemeProvider>
    </Provider>
  )
}

export default App

// import { CKEditor } from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
