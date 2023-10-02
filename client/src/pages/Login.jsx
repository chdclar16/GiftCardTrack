import { useState, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/userContext';



const Login = () => {
    const navigate = useNavigate()
    const [data, setData] = useState({
        username: '',
        password: '',
    })
    const { setIsLoggedInContext } = useContext(UserContext);
    

    const loginUser = async(e) => {
        e.preventDefault();
        const { username, password } = data;
        try {
            const response = await axios.post('http://localhost:3000/auth/login', {
                username,
                password
            }, {
                withCredentials: true,
            });
            console.log(response)
            if (response?.data) {
                setIsLoggedInContext(true);
            }
            console.log("response", response)
                setData({});
                navigate('/');
        } catch (err) {
            console.log({"login error": err.message})
            toast.error(err.message)
            
        }
    }

    return (
    <div className='flex m-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
        <form onSubmit={loginUser}>
            <label>Username:</label>
            <input 
                type='text' placeholder='Username...' 
                value={data.username} 
                onChange={(e) => {
                    setData({
                        ...data,
                        username: e.target.value
                    })         
            }}  
                className='bg-white'
            />
            <label>Password: </label>
            <input 
                type='password' 
                placeholder='Password...' 
                value={data.password} 
                onChange={(e) => {
                    setData({
                        ...data,
                        password: e.target.value
                    })
                }}
                className='bg-white'
            />
            <button type='submit'>Login</button>
        </form>
    </div>
  )
}

export default Login
