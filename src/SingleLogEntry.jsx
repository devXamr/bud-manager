export default function SingleLogEntry({logMsg, amount, category, date}) {
    return <div className='border p-3 rounded-xl mt-5 shadow-md'>
        <div className='justify-between flex'>
            <div>


            <div className='font-poppins font-light text-gray-300'>Reason</div>
            <div className='mr-8 font-poppins font-medium text-white text-2xl'>{logMsg}</div>
            </div>

            <div>
            <div className='font-poppins font-light text-gray-300 text-end'>Amount</div>
            <div
                className={`font-poppins font-semibold text-2xl ${amount.charAt(0) === '+' ? 'text-green-400' : 'text-red-500'}`}>{amount}</div>
            </div>
        </div>
        <div className='flex justify-between mt-5'>

        <div>

            <div className='mr-8 font-poppins font-semibold text-gray-300 text-lg mt-3 border border-gray-300 px-2 py-1 rounded-xl'>{category}</div>
        </div>
        <div>
            <div className='font-poppins font-light text-gray-300 text-end'>Date</div>
            <div className='font-poppins font-light text-gray-200 text-xl'>{date}</div>
        </div>
        </div>

    </div>

}