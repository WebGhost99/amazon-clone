import { StarIcon } from "@heroicons/react/solid"
import Image from "next/image"
import CurrencyFormat from "react-currency-format"
import { useDispatch } from "react-redux"
import { removeFromBasket } from "../slices/basketSlice";

function CheckoutProduct({id,title,description,image,rating,price,category,isPrime}) {

    const dispatch = useDispatch(); 

    const removeItemFromBasket = () => {
        //remove that item from redux
        dispatch(removeFromBasket({id}))
    }

    function truncate(string,number)  {
        return string?.length > number ? string.substring(0,number-1)+ "..." : string
    }
    console.log(removeItemFromBasket)

  return (
    <div className="grid grid-cols-5">
        <Image src={image} width={200} height={200} objectFit="contain" alt="" />

        <div className="col-span-3 mx-3">
            <p>{title}</p>
            <div className="flex">
            {Array(rating).fill().map((_,i)=>(
                          <StarIcon key={i} className="h-5 text-yellow-500" />
                    ))}
                    
            </div>
            <p className="text-xs my-2">{truncate(description,150)}</p>
            <CurrencyFormat 
                value={price}
                prefix="$"
            />

            {isPrime && (
                <div className="flex items-center space-x-2">
                    <img 
                        loading="lazy"
                        className="w-12"
                        src='https://links.papareact.com/fdw'
                        alt=""
                    />
                    <p className="text-xs text-gray-500">Free Next-Day Delivery</p>
                </div>
            )}
        </div>

        <div className=" space-y-2 my-auto">
            <button onClick={removeItemFromBasket} className="button">Remove From Basket</button>
        </div>

    </div>
  )
}

export default CheckoutProduct