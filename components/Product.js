import { StarIcon } from "@heroicons/react/solid";
import Image from "next/image"
import { useState } from "react";
import CurrencyFormat from 'react-currency-format';
import { useDispatch } from "react-redux";
import { addToBasket } from "../slices/basketSlice";

function Product({id , price , description , category , image , title}) {
    const Max_Number = 5
    const Min_Number = 1

    const dispatch = useDispatch()

    const addItemToBasket = () => {
        const product = {
            id , price , description , category , image , title , rating , isPrime
        };
        // sending the product to the redux (basket slice)
        dispatch(addToBasket(product))
    }
    function truncate(string,number)  {
        return string?.length > number ? string.substring(0,number-1)+ "..." : string
    }
    const [rating] = useState(
        Math.floor(Math.random()* Max_Number - Min_Number) + Min_Number
    );

    const [isPrime] = useState(Math.random() < 0.5 )

  return (
        <div className="relative flex flex-col m-5 bg-white z-30 p-10">
            
                <>
                <p className="absolute right-2 top-2 text-xs italic text-gray-400">{category}</p>
                <Image src={image} height={200} width={200} objectFit="contain"  alt="" /> 
                <h4 className="my-3">{title}</h4>
                <div className="flex">
                    
                    {Array(rating).fill().map((_,i)=>(
                          <StarIcon key={i} className="h-5 text-yellow-500" />
                    ))}
                    
    
                </div>
    
                <div className="text-xs my-2 ">{truncate(description,150)}</div>
                <div className="mb-5">
                    <CurrencyFormat 
                        displayType={'text'}
                        value={price}
                        prefix="$"
                         />
                </div>   
    
                {isPrime && (
                    <div className="flex items-center space-x-2 -mt-5">
                        <img className="w-12" src="https://links.papareact.com/fdw" alt="" />
                        <p className="text-xs text-gray-500">Free Next-day Delivery</p>
                    </div>
                )}    
    
                <button onClick={addItemToBasket}
                className="mt-auto button">Add To Basket</button>
             
                </>
      
          
        </div>
      )
}

export default Product