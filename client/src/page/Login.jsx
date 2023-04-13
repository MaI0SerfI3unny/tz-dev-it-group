import { useState } from 'react';
import Header from '../components/Header/Header';
import {loginUser} from "../axios/axios"

const Login = ({setAuth}) => {
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")  
    const loginCreate = async() => {
        if(password && email)
        {    
          const {data} = await loginUser(email, password)
          if(data.status === 200)
          {
            localStorage
              .setItem('DevItGroupData', JSON.stringify({token : data.data}));
            setAuth(true)
          }
        }
      }
    return(
        <div>
        <Header/>
            <main>
            <div className='login_container'>
                <div className='login_form'>
                    <input 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}/>
    
                    <input 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}/>
    
                    <button onClick={loginCreate}>Login</button>
                </div>
            </div>
            </main>
      </div>
    )
}

export default Login