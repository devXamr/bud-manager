export default function SingleCategory({name, allocation}){
    return <div className='flex justify-between'>
        <div className='font-poppins text-white text-lg'>{name}</div>
        <div className='font-bold text-white text-lg'>{allocation}</div>
    </div>
}