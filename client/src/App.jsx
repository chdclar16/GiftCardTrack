import { UserContextProvider } from '../context/userContext'
import NavBar from './components/Navbar'
import { Toaster } from 'react-hot-toast'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'

function App() {

  return (
    <UserContextProvider>
      <NavBar />
      <Toaster position='bottom-right' toastOptions={{duration: 2000}} />
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
    </UserContextProvider>
  )
}

export default App
