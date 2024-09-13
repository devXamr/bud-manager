export default function SingleButton({clickFunc, text} ){
    return <div className='m-auto mt-3 text-center bg-gray-500 rounded-md px-3 py-2 font-semibold mb-4 font-poppins text-white' onClick={clickFunc}>
        {text}
    </div>
}