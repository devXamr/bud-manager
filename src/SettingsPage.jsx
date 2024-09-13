import SingleInputField from "./SingleInputField.jsx";
import SingleButton from "./SingleButton.jsx";
import {useEffect, useState} from "react";
import SingleCategory from "./SingleCategory.jsx";
import { IoMdArrowRoundBack } from "react-icons/io";
import {useNavigate} from "react-router-dom";


export function fetchCategories(){
    let cats;
    try {
        cats = JSON.parse(localStorage.getItem('ExpenseCategories'));
    } catch (error) {
        console.error("Failed to parse logs from localStorage", error);
        return [];
    }

    if (!cats) return [];
    return cats;
}

export function fetchDate(){
    const month = new Date().getMonth()
    const date = new Date().getDate()
    const year = new Date().getFullYear()

    console.log(`${date}/${month}/${year}`)
    return `${date}/${month}/${year}`

}
export function fetchBudget(){
    let bud;
    try {
        bud = JSON.parse(localStorage.getItem('MonthlyBudget'));
    } catch (error) {
        console.error("Failed to parse logs from localStorage", error);
        return [];
    }

    if (!bud) return 0;
    return +bud;

}

export function fetchClickStatus() {
    let sta;
    try {
        sta = JSON.parse(localStorage.getItem('SetButtonClicked'));
    } catch (error) {
        console.error("Failed to parse logs from localStorage", error);
        return [];
    }

    if (!sta) return false;
    return sta;
}



export default function SettingsPage(){

    // An array of objects (containing categories)
    const [categories, setCategories] = useState(fetchCategories)

    // Handles value of category name
    const [catName, setCatName] = useState('')

    // Handles value of category value
    const [catVal, setCatVal] = useState(0)

    // toggle for whether the user wants to see the categories
    const [isCatOpen, setIsCatOpen] = useState(false)

    // The value for budget
    const [budget, setBudget] = useState(fetchBudget)

    // Toggle for budget update modal
    const [isModalOpen, setIsModalOpen]= useState(false)


    const [isSetClicked, setIsSetClicked] = useState(fetchClickStatus)
    const [updatedBudget, setUpdatedBudget] = useState(0)
    const [budgetMaintainer, setBudgetMaintainer] = useState(0)
    const [overBudget, setOverBudget] = useState({bool: false, type: 2})


    useEffect(() => {
        setBudgetMaintainer(budget)
        localStorage.setItem('MonthlyBudget', JSON.stringify(budget))

    }, [budget]);

    useEffect(() => {
        localStorage.setItem('SetButtonClicked', JSON.stringify(isSetClicked))
    }, [isSetClicked])


    useEffect(()=> {
        localStorage.setItem('ExpenseCategories', JSON.stringify(categories))

    }, [categories])

    // When set is clicked, this takes it to the next stage.
    function handleSetClick(){
        setIsSetClicked(prev => !prev)
    }

    // Handles adding categories (Minimal validation included)
    function addCategory(){
        if( catName === '' || catVal === 0){
            setOverBudget({bool: true, type: 3})
            return
        }


        if(catVal > budgetMaintainer) {
            setOverBudget({bool: true, type: 1})

        } else if(categories.find((category) => category.name === catName)){
            setOverBudget({bool: true, type: 2})

        } else {

            setOverBudget({bool: false, type: 0})
            setCategories(prev => [...prev, {name: catName, allocation: catVal, spent: 0}])
            setBudgetMaintainer(prev => prev - catVal)
            setCatVal(0)
            setCatName('')

        }





    }
    // Toggle for viewing categories
    function setCatView(){

        setIsCatOpen(prev => !prev)

    }

    //
    function budgetSetter(e){
        setBudget(e.target.value)


    }

    function setModalOpening(){
        setIsModalOpen(prev => !prev)
    }

    function budgetUpdater(e){
        setBudget(updatedBudget)
        setIsModalOpen(false)
        setOverBudget({bool: false, type: 0})


    }

    function deleteCategories(){
        setCategories([])
        setBudgetMaintainer(budget)

    }
    const nav = useNavigate()
    function handleNav(){
        nav('/')

    }


    return <div>


    <IoMdArrowRoundBack className='text-white text-3xl ml-3 mt-5' onClick={handleNav}/>
    <div className='mx-4 mt-11 shadow-md rounded-xl px-4 pt-4 bg-gray-700 pb-10'>
        {
            budget !== 0 && isSetClicked?
                <div className='mb-14 mt-7 '>
                    <div className='text-center font-poppins text-white mb-3'>Your monthly budget has been set to:</div>
                    <div className='text-center text-white font-poppins text-2xl'>{budget}</div>
                    <SingleButton text='Edit Budget' clickFunc={setModalOpening}/>
                </div>
                 :
        <div className='mb-12'>
        <div className='font-poppins text-white text-2xl text-center font-bold pb-10'>Settings</div>
        <SingleInputField amountPlaceholder='eg. 15,000' label='Enter Your Monthly Budget:' val={budget} givenType='number' changeFunc={budgetSetter} />
        <SingleButton text='Set' clickFunc={handleSetClick}/>
        </div>

        }


        {isModalOpen && <div className=' fixed top-0 right-0 left-0 m-auto border-2 border-gray-600 px-3 py-4 bg-gray-600 shadow-lg backdrop-blur-xl backdrop:blur backdrop-brightness-75 backdrop-filter h-full z-30'>
            <div className='m-auto mt-52'>
                <SingleInputField label='Set Budget To:' val={updatedBudget} givenType='number' changeFunc={(e) => {setUpdatedBudget(e.target.value)}} amountPlaceholder='eg. 12000 -> 21000' />
                <SingleButton text='Done' clickFunc={budgetUpdater}/>
                <SingleButton text='Cancel' clickFunc={() => {setIsModalOpen(false)}}/>

            </div>

        </div> }


        <div className='mb-12'>
        <SingleInputField givenType='text' amountPlaceholder='eg. Groceries' label='Add Category and Allocation:' val={catName} changeFunc={(e)=> {setCatName(e.target.value )}}/>
        <SingleInputField givenType='number' amountPlaceholder='eg. 1,300' val={catVal} changeFunc={(e) => {setCatVal(e.target.value)}}/>
            {overBudget.bool === true  && overBudget.type === 1 && <div className='text-red-600 font-poppins'>Crossed remaining budget of {budgetMaintainer}. Edit values or edit monthly balance. </div>}
            {overBudget.bool === true  && overBudget.type === 2 && <div className='text-red-600 font-poppins'>A category with this name already exists, please try another name. </div>}
            {overBudget.bool === true  && overBudget.type === 3 && <div className='text-red-600 font-poppins'>Filling both fields is required.</div>}
        <SingleButton text='Add Category' clickFunc={addCategory}/>
        </div>


        <SingleButton text='View All Categories' clickFunc={setCatView}/>
        {isCatOpen && <div>
            {
                categories.map(eachCat => <SingleCategory name={eachCat.name} allocation={eachCat.allocation} />)
            }
            {categories.length > 0 && <SingleButton text='Reset All' clickFunc={deleteCategories}/>}
        </div>}



    </div>
    </div>
}