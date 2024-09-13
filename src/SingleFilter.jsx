import {useEffect, useState} from "react";

export default function SingleFilter({text, handleShit}) {

    const [bool, setBool] = useState(false)

    useEffect(()=> {

        handleShit(text, bool)

    }, [bool])

    function handleClick(){
        setBool(prev => !prev)
    }

    return <div className={`text-lg font-poppins font-medium rounded-xl px-3  mx-3 ${bool ? 'border-white text-black shadow-sm bg-white' : 'border text-white'} mt-5`} onClick={handleClick}>{text}</div>
}