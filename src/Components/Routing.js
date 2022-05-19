import { Routes,Route,Link,Navigate, useLocation } from "react-router-dom";
import ReactTest from "./ReactTest";

  
  export const Sidepage=()=>{
    return(
        <div>
            <label data-testid='side-route-test-jest'>Not Home Page</label>
        </div>
    )
  }
  
  function Navlinks(){
    return(
        <>
            <p><Link to='/home' data-testid='home-link'>Home page</Link></p>
            <p><Link to='/notHome' data-testid='not-home-link'>Not Home page</Link></p>
        </>
    )
  }
  
  function Redirect(){
    return(
      <Navigate to='/' replace={true}/>
    )
  }

function Routing(){
  const location=useLocation()
    return(
        <>
            <>
                <p><Link to='/home' data-testid='home-link'>Home page</Link></p>
                <p><Link to='/notHome' data-testid='not-home-link'>Not Home page</Link></p>
            </>
            <Routes>
                <Route path='/home' element={<ReactTest/>}/>
                <Route path='/notHome' element={<Sidepage/>}/>
            </Routes>
            <label data-testid='url-route-test-jest'>{location.pathname}</label>
        </>
    )
}

export default Routing