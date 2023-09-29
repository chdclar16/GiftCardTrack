import { Link } from 'react-router-dom';
import {IoHomeOutline} from 'react-icons/io5'

const NavBar = () => {
    return (
        <div className='bg-blue-500'>
            <nav className='relative px-4 py-4 flex justify-between items-center'>
                <Link className='text-3xl font-bold leading-none w-8 h-8'>
                    <img src="/images/giftCard.png" alt="Gift Card" className='w-8 h-8' />
                </Link>
                <Link to='/' className='hover:scale-150 duration-150 ease-in-out'>
                    <IoHomeOutline />
                </Link>
                <Link>
                    <span>Cards</span>
                </Link>
                <Link to='/login'>
                    <button>Login</button>
                </Link>
            </nav>
        </div>
    )
}

export default NavBar
