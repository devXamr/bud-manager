import SingleInputField from "./SingleInputField.jsx";
import {useEffect, useState} from "react";
import SingleOption from "./SingleOption.jsx";
import {fetchCategories} from "./SettingsPage.jsx";



export default function AmountModal({amountLabel, amtPlaceholder, tagLabel, tagPlaceholder, id, setterFunc}) {
    const [amountField, setAmountField] = useState(0)
    const [tagField, setTagField] = useState('')
    const [category, setCategory] =  useState('None')
    const [isOpen, setIsOpen] = useState(false)
    const [error, setError] = useState({})

    const [allCats, setAllCats] = useState(fetchCategories)

    console.log(allCats)

    useEffect(() => {
        console.log(category)

    }, [category]);



    function onAmtChange(e){
        setAmountField(e.target.value)
    }

    function onTagChange(e){
        setTagField(e.target.value)
    }

    function handleClick(){
        if(amountField === 0){
            setError({bool: true, type: 1})
            return
        }

        if(tagField === ''){
            setError({bool: true, type: 2})
            return
        }



        setterFunc(id, amountField, tagField, category)


        setAmountField(0)
        setTagField('')
    }



    return <div className='w-72 fixed top-64 right-0 left-0 m-auto border-2 border-gray-600 rounded-xl px-3 py-4 bg-gray-600 shadow-lg'>
        <SingleInputField label={amountLabel} amountPlaceholder={amtPlaceholder} changeFunc={onAmtChange} val={amountField} givenType='number'/>
        {error.bool === true && error.type === 1 && <div className='text-red-600 font-poppins'>This field cannot be empty</div>}
        <SingleInputField label={tagLabel} amountPlaceholder={tagPlaceholder} changeFunc={onTagChange} val={tagField} givenType='text'/>
        {error.bool === true && error.type === 2 && <div className='text-red-600 font-poppins'>This field cannot be empty</div>}
        <div onClick={() => {setIsOpen(prev => !prev)}} className='mt-5 text-center font-poppins text-lg text-gray-200 rounded-t-lg py-1 bg-black'>{category === 'None' ? 'Select Category': category} </div>
        {
            isOpen && allCats.map((eachCat) => <div>
                <div onClick={() => {
                    setCategory(eachCat.name)
                    setIsOpen(false)
                }} className='bg-black text-white py-2 font-poppins pl-4'>{eachCat.name}</div>


            </div>)

        }


        <div
            className='bg-blue-600 w-1/3 text-center rounded-md text-white mr-auto ml-auto mt-3 px-3 py-2 font-poppins font-semibold' onClick={handleClick}>Save
        </div>

    </div>
}