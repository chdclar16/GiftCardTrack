import { useState, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
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
    <div className='bg-gray-100 flex justify-center items-center h-screen'>
        <div className='w-1/2 h-screen hidden lg:block'>
            <img src='/images/giftCard.jfif' alt='Gift Card' className='object-cover w-full h-full'/>
        </div>
        <div className='lg:p-35 md:p-52 sm:20 p-8 w-full lg:w-1/2'>
            <h1 className='text-2xl font-semibold mb-4'>Login</h1>
            <form onSubmit={loginUser}>
                <div className='mb-4'>
                <label htmlFor='username' className='block text-gray-600'>Username:</label>
                    <input 
                        type='text' placeholder='Username...' 
                        value={data.username} 
                        onChange={(e) => {
                            setData({
                                ...data,
                                username: e.target.value
                            })         
                        }}  
                        className='bg-white w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500' autoComplete='off'
                        id='username'
                        />
                </div>
                <div className='mb-4'>
                    <label htmlFor='password' className='block text-gray-600'>Password: </label>
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
                            className='bg-white w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500' autoComplete='off'
                            id='password'
                            />
                </div>
                <button type='submit' className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full">Login</button>
                <div className='mt-6 text-blue-500 text-center'>
                    <Link to='/register'>
                        <p className='hover:underline '>Sign up here</p>
                    </Link>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Login
