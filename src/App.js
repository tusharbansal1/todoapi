import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Data from './Data';
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Create from './Create'
import './Style.css'
import Detail from './Detail'
import Edit from './Edit'


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
            <Route path='/todos/detail/:yourid' element={<Detail />} />
            <Route path='/todos/edit/:yourid' element={<Edit />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  )
}

export default App;