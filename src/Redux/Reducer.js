import axios from "axios"

const INITIALSTATE={
    name:'cheppu',
    err:false,
    message:'',
    places:[]
}

const Reducer=(state=INITIALSTATE,action)=>{
    switch(action.type){
        case 'default':
            return {
                ...state,name:'cheppu'
            }
        case 'change':
            return{
                ...state,name:action.name
            }
        case 'getdata':
            return {
                ...state,message:action.message,places:action.places
            }
        case 'failed':
            return {
                ...state,err:true,message:action.message,places:[]
            }
        case 'loading':
            return {
                ...state,message:'Loading',places:[]
            }
        default:
            return state
    }
}


export default Reducer
