import {IoSettingsOutline} from "react-icons/io5";
import AmountModal from "./AmountModal.jsx";
import {CiReceipt} from "react-icons/ci";
import LogComp from "./LogComp.jsx";

export default function BudgetPage() {
    return <div>
        <IoSettingsOutline className='text-3xl text-white mt-5 ml-auto mr-4' onClick={handleNav}/>


        <div className='mx-4 mt-6 shadow-md rounded-xl px-4 pt-12 border'>


            <div className='text-xl font-light text-center font-poppins text-white'>Your Balance:</div>


            <div className='flex justify-center'>
                <div className='text-2xl mt-3.5 font-bold font-poppins text-white'>₹</div>
                <div className='text-5xl font-semibold font-poppins text-white'>{balance}</div>
            </div>


            {isIncomeClicked &&
                <AmountModal amountLabel='Enter Amount To Add:' amtPlaceholder='eg. 500' tagLabel='Source:'
                             tagPlaceholder='eg. Freelance Income' id='income' setterFunc={setFunc}/>}
            {isExpenseClicked &&
                <AmountModal amountLabel='Enter Amount To Deduct:' amtPlaceholder='eg. 500' tagLabel='Reason:'
                             tagPlaceholder='eg. Groceries' id='expense' setterFunc={setFunc}/>}


            <div className='flex justify-center mt-7'>
                <div className='mr-4 bg-green-400 rounded-md px-3 py-2 font-semibold mb-14 font-poppins text-white'
                     onClick={() => {
                         setIsIncomeClicked(prev => !prev)
                     }}>{isIncomeClicked ? 'Cancel' : 'Add Balance'}</div>

                <div className='ml-4 bg-red-400 rounded-md px-3 py-2 font-semibold mb-14 font-poppins text-white'
                     onClick={() => {
                         setIsExpenseClicked(prev => !prev)
                     }}>{isExpenseClicked ? 'Cancel' : 'Add Expense'}</div>

            </div>
        </div>


        <div
            className='flex justify-center mt-6 bg-slate-300 w-max m-auto px-2 py-2 rounded-md font-semibold font-poppins'
            onClick={setShowLog}>
            <CiReceipt className='text-2xl mr-2'/>
            <div>Balance Log</div>
        </div>
        {isShowLogClicked && <LogComp allLogs={allLogs} givenFunc={deleteLogs}/>}
    </div>
}