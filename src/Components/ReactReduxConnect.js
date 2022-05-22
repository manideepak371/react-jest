import {connect,MapDispatchToProps,MapStateToProps} from 'react-redux'
import UseRedux from './UseRedux'
import {DEFAULT_NAME,CHANGE_NAME} from '../Redux/Actions'

const mapStatetoProps=(state)=>({err:state.err,message:state.message,places:state.places,name:state.name})

const mapDispatchtoProps=(dispatch)=>{
    return {
        changeName:(value)=>dispatch(CHANGE_NAME(value))
    }
}

export default connect(mapStatetoProps,mapDispatchtoProps)(UseRedux)