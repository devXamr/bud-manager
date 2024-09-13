import SingleLogEntry from "./SingleLogEntry.jsx";
import SingleFilter from "./SingleFilter.jsx";
import {useEffect, useState} from "react";
import {fetchCategories} from "./SettingsPage.jsx";


export default function LogComp({allLogs, givenFunc}){

    const [cats, setCats] = useState(fetchCategories)
    const [visibleLogs, setVisibleLogs] = useState([])
    const [allFilters, setAllFilters] = useState([])

    useEffect(() => {
        handleEverything()


    }, [allFilters, allLogs])


    function handleEverything(){
        if(allFilters.length === 0){
            setVisibleLogs(allLogs)
        } else{
            setVisibleLogs(allLogs.filter(log => allFilters.includes(log.category)))
        }
    }



    function filterHandler(name, booVal){
        if(booVal === true){
            setAllFilters(prev => [...prev, name])
        } else if (booVal === false){
            setAllFilters(prev => prev.filter(filterName => filterName !== name));

        }
    }





    return <>
        <div className='flex justify-center'>
            {cats.map((eachCat) => <SingleFilter text={eachCat.name} handleShit={filterHandler}/>)}

        </div>
        <div className='mx-4 shadow-md rounded-xl px-4 py-4'>

            {visibleLogs.length > 0 ? visibleLogs.map(eachLog => <SingleLogEntry amount={eachLog.amount} logMsg={eachLog.tag} category={eachLog.category} date={eachLog.date}/>): <div className='text-white font-poppins text-center'>There are no logs to display</div>}


        </div>
        <div
            className='flex justify-center mt-6 bg-slate-300 w-max m-auto px-2 py-3 rounded-md font-semibold font-poppins' onClick={givenFunc}>Clear All Logs
        </div>
    </>

}