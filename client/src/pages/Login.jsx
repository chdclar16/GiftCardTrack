import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';



const Login = () => {
    const navigate = useNavigate()
    const [data, setData] = useState({
        username: '',
        password: '',
    })

    const loginUser = async(e) => {
        e.preventDefault();
        const { username, password } = data;
        try {
            await axios.post('http://localhost:3000/auth/login', {
                username,
                password
            }, {
                withCredentials: true,
            });
                setData({});
                navigate('/');
        } catch (err) {
            console.log({"login error": err.message})
            if (err.response.status === 404) {
                toast.error(err.response.data.error)
            }
        }
    }

    const logoutUser = async() => {
        try {
            const res = await axios.delete('http://localhost:3000/auth/')
            if (res) toast.success('Logged Out Successfully')
            navigate('/login')
        } catch (err) {
            toast.error(err)
        }
    }

    return (
    <div className='flex m-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
        <form onSubmit={loginUser}>
            <label>Username:</label>
            <input type='text' placeholder='Username...' value={data.username} onChange={(e) => {
                setData({
                    ...data,
                    username: e.target.value
                })
            }} />
            <label>Password: </label>
            <input type='password' placeholder='Password...' value={data.password} onChange={(e) => {
                setData({
                    ...data,
                    password: e.target.value
                })
            }} />
            <button type='submit'>Login</button>
        </form>
        <button onClick={logoutUser}>Logout</button>
    </div>
  )
}

export default Login
