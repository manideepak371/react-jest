import {useEffect,useState} from'react'
import axios from 'axios'
import { Outlet, useLocation } from 'react-router-dom'
  

function ReactTest({arg}){
    const [elementDisplayed,setVisibility]=useState(false)
    const [places,setPlaces]=useState([])
    const location=window.location

    const getData=async ()=>{
        const response=await axios.get('http://localhost:9000/')
        const responseData=await response.data
        if(responseData){
            setPlaces(responseData.data)
        }
    }
    const disabledstyle={
        display:"none"
    }
    const enabledstyle={
        display:"block"
    }
    const elementStyle= elementDisplayed ? enabledstyle : disabledstyle
    const buttonClick=()=>{
        if(elementDisplayed){
            setVisibility(false)
        }
        else{
            setVisibility(true)
        }
    }
    return(
        <>
            <div>
                <label data-testid="jest-label-test">testing react label</label>
                <button data-testid="jest-button-test" onClick={()=>{buttonClick()}}>Click React Test</button>
                <label data-testid="jest-props-test">{arg}</label>
                <input type='text' placeholder="test input box" data-testid="jest-inputBox-test" className="jest-inputBox-test"/>
                <label data-testid="jest-unhide-test" style={elementStyle}>Hiding element</label>
                <button data-testid="jest-apicall-test" onClick={()=>{getData()}}>Get Data</button>
                {places?.length >0 && <p><label data-testid="label-place">{places[0].placename}</label></p>}
                <p><label data-testid='home-route-test-jest'>Home Page</label></p>
                <Outlet/>
            </div>
        </>
    )
}

export default ReactTest