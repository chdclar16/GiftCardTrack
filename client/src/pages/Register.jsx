import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom'

const Register = () => {
    const [data, setData] = useState({
        username: '',
        password: '',
        confirmPassword: '',
    });
    const navigate = useNavigate();

    const registerUser = async (e) => {
        e.preventDefault();
        const { username, password, confirmPassword } = data

        if (password !== confirmPassword) {
            toast.error("Passwords do not match")
            return;
        }

        try {
            const { data } = await axios.post('http://localhost:3000/auth/register', {username, password})
            if (data.error) {
                toast.error(data.error)
            }
            else {
                setData({})
                toast.success('Registered user')
                navigate('/login')
            }
        }
        catch (err) {
            console.log(err)
            toast.error(err.response.data.error)
        }
    }

    return (
    <div>
        <form onSubmit={registerUser}>
            <label>Username:</label>
            <input type='text' placeholder='Username...' value={data.username} onChange={(e) => setData({...data, username: e.target.value})} />
            <label>Password:</label>
            <input type='password' placeholder='Password...' value={data.password} onChange={(e) => setData({...data, password: e.target.value})} />
            <label>Confirm Password:</label>
            <input type='password' placeholder='Confirm Password...' value={data.confirmPassword} onChange={(e) => setData({...data, confirmPassword: e.target.value})} />
            <button type='submit'>Register</button>
        </form>
    </div>
  )
}

export default Register
