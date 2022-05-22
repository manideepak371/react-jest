import React, { useEffect, useState } from 'react'
import { connect, useDispatch } from 'react-redux'
import {CHANGE_NAME, GetData} from'../Redux/Actions'
import Store from '../Redux/Store'

export default function UseRedux(props){
    const dispatch=useDispatch()
    useEffect(()=>{
        Store.dispatch(GetData())
    },[])
    const {name,changeName,err,message,places}=props
    console.log(err,message,places)
    return(
        <div>
            <label>{name}</label>
            <input type="text" onChange={(event)=>{changeName(event.target.value)}}/>
        </div>
    )
}
