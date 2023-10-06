import { UserContextProvider } from '../context/userContext'
import NavBar from './components/Navbar'
import { Toaster } from 'react-hot-toast'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import NewGiftCard from './pages/NewGiftCard'
import './styles.css'
import GiftCardList from './pages/GiftCardList'

function App() {

  return (
    <UserContextProvider>
      <NavBar />
      <Toaster position='bottom-right' toastOptions={{duration: 2000}} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/new' element={<NewGiftCard />} />
        <Route path='/list' element={<GiftCardList />} />
      </Routes>
    </UserContextProvider>
  )
}

export default App
