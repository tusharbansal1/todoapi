import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Data from './Data';
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Create from './Create'
import './Style.css'


const theme = createTheme(
  {
    typography: {
      fontFamily: 'Oswald'
    }
  },
  
)

function App() {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Data />} />
            <Route path='/todos/create' element={<Create />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  )
}

export default App;