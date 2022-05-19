import './App.css';
import {useReducer} from 'react'

const initialstate={
  name:'cheppu'
}

const MyReducer=(state,action)=>{
  switch(action.type){
    case 'change':
      console.log(action.name)
      return {...state,name:action.name}
  }
}

function App() {
  const [state,dispatach]=useReducer(MyReducer,initialstate)
  const str="hello world"
  var a=str.split(' ')
  a.push("nijama")
    
  console.log(a.slice(0,2))
  const nameChange=()=>{
    dispatach({type:'change',name:'deepu'})
  }

  return (
    <div className="App">
      <p>{state.name}</p>
      <button onClick={()=>{nameChange()}}>CLick me</button>
    </div>
  );
}

export default App;
