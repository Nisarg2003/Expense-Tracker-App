import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import { toast } from 'react-toastify'

import axios from 'axios'
import { NavLink, useNavigate } from 'react-router-dom'

const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    
    const handlesubmit = async(e)=>{
        e.preventDefault();
        try {
            const res = await axios.post("/api/v1/login",{email,password})
            
            if(res.data.success){
                toast.success(res.data.message)
                localStorage.setItem('user',JSON.stringify({...res.data.user,password:''}))
                navigate("/")
            }else{
                 toast.error(res.data.message)
            }
        
        } catch (error) {
            console.log(error)
            toast.error('something went wrong')
        }
    }
    
    //Prevent for login user
    useEffect(()=>{
        if(localStorage.getItem('user')){
            navigate('/')

        }
    }, [navigate])

  return (
    <Layout>
          <div className='register'>
                <h1>Login Page</h1>
                <form onSubmit={handlesubmit}>
                 
                    <div className="mb-3">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-control" id="exampleInputEmail1"
                            placeholder='Enter Your E-mail'
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" id="exampleInputPassword1" placeholder='Enter Your Password' />
                    </div>

                    <NavLink to="/register">New User ?</NavLink>
                 
                    <div>
                    <button  type="submit" className="btn btn-primary">Submit</button>
                    </div>
                </form>
            </div>
    </Layout>
  )
}

export default Login