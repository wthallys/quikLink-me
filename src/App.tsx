import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import NotFound from './pages/NotFound'
import QrCode from './pages/QrCode'
import EditLinks from './pages/EditLinks'
import Home from './pages/Home'

function App() {

  return (
    <BrowserRouter>
    {/* Aqui pode vir um header fixo */}
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='signup' element={<SignUp />} />
        <Route path=':userId' element={<Home />} />
        <Route path='user/:userId' element={<QrCode />} />
        <Route path='user/:userId/edit' element={<EditLinks />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
