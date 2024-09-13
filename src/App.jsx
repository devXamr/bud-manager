import {useEffect, useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { TiCancel } from "react-icons/ti";
import { FaChevronRight } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa";
import AmountModal from "./AmountModal.jsx";
import LogComp from "./LogComp.jsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import BudgetFeature from "./BudgetFeature.jsx";
import SettingsPage from "./SettingsPage.jsx";

// todo - settings panel 1. switch currency

export function getLocalLogs(){

    let logs;
    try {
        logs = JSON.parse(localStorage.getItem('budgetLogs'));
    } catch (error) {
        console.error("Failed to parse logs from localStorage", error);
        return [];
    }

    if (!logs) return [];
    return logs;
}

function App() {
    return <>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<BudgetFeature/>}/>
                <Route path='/settings' element={<SettingsPage/>}/>
            </Routes>
        </BrowserRouter>



    </>
}
export default App
