export default function SingleOption(catSetter, modalSetter, textGiven) {
    return <div onClick={() => {
        catSetter(textGiven)
        modalSetter(false)
    }} className='bg-black text-white py-2 font-poppins pl-4'>{textGiven}</div>
}