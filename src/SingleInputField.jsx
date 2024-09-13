export default function SingleInputField({label, amountPlaceholder, changeFunc, val, givenType}) {
    return <div>
        <div className='mt-2 text-center font-poppins mb-2 text-white'>{label}</div>
        <input type={givenType} className='w-full border border-black rounded-md px-3 font-poppins py-2 bg-black text-white'
               placeholder={amountPlaceholder} onChange={changeFunc} value={val}/>

    </div>

}