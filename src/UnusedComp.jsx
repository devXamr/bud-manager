import {FaChevronLeft, FaChevronRight} from "react-icons/fa";

export default function (){
    return <div>
        <>
            <div className='flex justify-center'>

                <FaChevronLeft className='mt-3.5'/>
                <div className='text-2xl mx-3 mt-2'>
                    September 2024
                </div>
                <FaChevronRight className='mt-3.5'/>




            </div>

            <div className='ml-3 mt-11'>
                <div className='text-xl font-light'>Your Balance:</div>
                <div className='flex'>
                    <div className='text-2xl mt-3.5 font-bold'>$</div>
                    <div className='text-5xl font-semibold'>15,000</div>
                </div>


                <div className='flex'>
                    <div className=''>Add Balance</div>
                    <div>Add Expense</div>
                </div>
            </div>
        </>
    </div>
}