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

    console.log("giftcards here", giftCards)

    useEffect(() => {
        getGiftCards();
    }, [])

    return (
        <>
            <div className='text-center text-3xl'>
                <h1 className='flex justify-center font-bold'>Gift Cards</h1>
            </div>
            <div className='flex flex-wrap justify-center'>
            {giftCards.data &&
                giftCards.data.map((giftCard) => (
                <div key={giftCard._id} className='card w-96 m-4 glass shadow-xl hover:scale-110 ease-in-out duration-300'>
                    <div className='card-body'>
                    {!giftCard.photo ? (
                        <figure>
                        <img
                            src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOZlTosq_oXxmxXD9z2Fc80Ej3t8iiuZwkQw&usqp=CAU'
                            alt='card'
                        />
                        </figure>
                    ) : (
                        <figure>
                        <img src={giftCard.photo} alt='card' />
                        </figure>
                    )}
                    <h2 className='card-title'>{giftCard.name}</h2>
                    <p>{giftCard.balance}</p>
                    </div>
                </div>
                ))}
            </div>
        </>
        );
}

export default GiftCardList;