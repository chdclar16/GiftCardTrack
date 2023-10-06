import { Link } from 'react-router-dom';
import {IoHomeOutline} from 'react-icons/io5'
import { UserContext } from '../../context/userContext';
import { useContext, useEffect, useState } from 'react';
import LogOutButton from './LogOutButton';

const NavBar = () => {
    const { user } = useContext(UserContext)
    const [isLoggedIn, setIsLoggedIn] = useState(false)


    useEffect(() => {
        if (user) {
            setIsLoggedIn(true);
            console.log("User Logged", user)
            console.log(user, "user")
        } else {
            setIsLoggedIn(false);
        }
    }, [user]);

    return (
        <div className='bg-blue-500'>
            <nav className='relative px-4 py-4 flex justify-between items-center'>
                <Link className='text-3xl font-bold leading-none w-8 h-8'>
                    <img src="/images/giftCard.png" alt="Gift Card" className='w-8 h-8' />
                </Link>
                <Link to='/' className='hover:scale-150 duration-150 ease-in-out'>
                    <IoHomeOutline />
                </Link>
                {isLoggedIn ? (
                    <>
                        <Link to='/new'>
                            <span>New Card</span>
                        </Link>
                        <Link to='/list'>
                            <span>Gift Cards</span>
                        </Link>
                        <LogOutButton /> 
                    </>
                ) : (
                <Link to='/login'>
                    <button>Login</button>
                </Link>
                )}
            </nav>
        </div>
    )
}

export default NavBar
