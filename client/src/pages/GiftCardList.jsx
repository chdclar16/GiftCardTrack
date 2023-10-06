import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/userContext';
import { toast } from 'react-hot-toast';
import axios from 'axios';

const GiftCardList = () => {
    const [giftCards, setGiftCards] = useState([]);
    const { user } = useContext(UserContext)
    console.log(user)
    
    const getGiftCards = async() => {
        try {
            const res = await axios.get(`http://localhost:3000/card/${user.id}`)
            if (res.data) {
                setGiftCards(res.data)
                toast.success('Grabbed all giftcards')
            }
        }
        catch(err) {
            console.log("Gift Card List Error", err.message)
            toast.error('Failed to create giftcard')
        }
    }

    console.log(giftCards)

    useEffect(() => {
        getGiftCards();
    }, [])

    return (
    <div>
        {giftCards.map((giftCard) => (
            <div key={giftCard}>
            Test
            </div>
        ))}
    </div>
  )
}

export default GiftCardList