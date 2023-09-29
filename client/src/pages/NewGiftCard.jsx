import axios from 'axios';
import { useContext, useState } from 'react'
import { toast } from 'react-hot-toast';
import { UserContext } from '../../context/userContext';


const NewGiftCard = () => {
    const { user } = useContext(UserContext)
    console.log(user)
    const [data, setData] = useState({
        name: '',
        balance: '',
        photo: '',
        user: user.data.id,
    })


    // Removes number spinner on balance
    const handleBalanceChange = (e) => {
        const newValue = e.target.value.replace(/[^0-9]/g, '');
        setData({ ...data, balance: newValue })
    }

    const handleCreateNew = async(e) => {
        e.preventDefault();
        const { name, balance, photo, user } = data;
        console.log(data)
        try {
            const res = await axios
                .post('http://localhost:3000/card', {name, balance, photo, user})
            if (res.data.error) {
                toast.error(res.data.error)
            }
            else {
                setData({
                    name: '',
                    balance: '',
                    photo: '',
                    user: '',
                })
                toast.success('Created new giftcard')
            }
        }
        catch (err) {
            console.log(err)
            toast.error('Failed to create giftcard')
        }
    }

  return (
    <div>
        <form onSubmit={handleCreateNew}>
            <label>Gift Card Name</label>
            <input
            type='text'
            placeholder='Gift Card Name...'
            value={data.name}
            onChange={((e) => setData({...data, name: e.target.value}))}
            required
            />
            <label>Gift Card Balance</label>
            <input
            type='text'
            placeholder='Gift Card Balance...'
            value={data.balance}
            onChange={handleBalanceChange}
            required
            />
            <label>Gift Card Photo</label>
            <input
            type='text'
            placeholder='Gift Card Photo URL'
            value={data.photo}
            onChange={((e) => setData({...data, photo: e.target.value}))}
            />
            <button type='submit'>Create</button>
        </form>
    </div>
  )
}

export default NewGiftCard
