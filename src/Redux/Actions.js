import axios from "axios"

export const DEFAULT_NAME=()=>{
    return(
        {
            type:'default',
            name:'cheppu'
        }
    )
}

export const CHANGE_NAME=(payload)=>{
    return(
        {
            type:'change',
            name:payload
        }
    )
}

export const GET_DATA=(payload,message)=>{
    return(
        {
            type:'getdata',
            err:true,
            message:message,
            places:[]
        }
    )
}

export const LOADING_DATA=()=>{
    return {
        type:'loading',
        err:false,
        message:'Loading',
        places:[]
    }
}

export const LOADING_DATA_FAILED=(payload,message)=>{
    return {
        type:'failed',
        err:true,
        message:message,
        places:[]
    }
}

export const GetData=()=>{
    return async(dispatch,getState)=>{
        dispatch({type:'loading'})
        const response=await axios.get('http://localhost:9000/')
        .then(response => dispatch({type:'getdata',err:response.data.success,message:response.data.message,places:response.data.data}))
        .catch(response => dispatch({type:'failed',err:response.data.success,message:response.data.message}))
        // const responseData=await response.data
        // dispatch({type:'getdata',places:responseData.data})
        // console.log(getState())
    }
}
