import './App.css'
import Routers from './Components/Router/Router' // PROJECT ROUTES;
import { theme } from './Components/Assets/GeneralStyles/Theme' // PROJECT THEME;
import { ThemeProvider } from '@mui/material/styles'

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Routers />
      </ThemeProvider>
    </div>
  )
}

export default App

// import { CKEditor } from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
