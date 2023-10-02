import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useContext } from 'react';
import { UserContext } from '../../context/userContext';

const LogOutButton = () => {
    const navigate = useNavigate();
    const { setUser } = useContext(UserContext)

    const clearCookies = () => {
        document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    }


    const handleLogOut = async() => {
        try {
            const res = await axios.delete('http://localhost:3000/auth/')
            clearCookies();
            setUser(null)
            if (res) toast.success('Logged Out Successfully')
            navigate('/login');
        } catch (err) {
            toast.error("Failed to logout.")
            console.error(err);
        }
    }

    return (
    <button onClick={handleLogOut}>Logout</button>
  )
}

export default LogOutButton;