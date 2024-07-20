import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import NotFound from './pages/NotFound'
import QrCode from './pages/QrCode'

function App() {

  return (
    <BrowserRouter>
    {/* Aqui pode vir um header que não muda */}
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='signup' element={<SignUp />} />
        <Route path='*' element={<NotFound />} />
        <Route path='user/:id' element={<QrCode />} />
        <Route path='user/:id/edit' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
