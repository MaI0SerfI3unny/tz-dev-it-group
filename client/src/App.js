import { useState, useEffect} from 'react'
import Panel from './page/Panel'
import Login from './page/Login'
import Single from "./page/Single"
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Create from './page/Create';
import Update from './page/Update';

const App = () => {
  const userData = JSON.parse(localStorage.getItem('DevItGroupData'));
  const [isAuth, setAuth] = useState(false);

  useEffect(() => {
    if(userData){
      setAuth(true)
    }
  },[])

  if(!isAuth){
    <Login setAuth={setAuth}/>
  }
  return(
    <Router>
      <Routes>
        <Route path='/' element={<Panel userData={userData}/>} />
        <Route path='/create' element={<Create userData={userData}/>} />
        <Route path='/post/:id' element={<Single userData={userData}/>} />
        <Route path='/post/update/:id' element={<Update userData={userData}/>} />
      </Routes>
    </Router>
  )
}

export default App;
