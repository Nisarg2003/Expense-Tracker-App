import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout/Layout'
import { toast,ToastContainer } from 'react-toastify'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const Register = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const handlesubmit = async(e)=>{
        e.preventDefault();
        // console.log(name,email,password)
        // toast.success('sshh')
        try {
            const res = await axios.post("https://expense-tracker-app-w90z.onrender.com/api/v1/register",{name,email,password})
            
            if(res.data.success){
                toast.success(res.data.message)
                navigate("/login")
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
    <h1>Register Page</h1>
    <form onSubmit={handlesubmit}>
        <div className="mb-3">
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-control" id="exampleInputEmail1"
                placeholder='Enter Your Name'
                required
            />
        </div>

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

        

        <button  type="submit" className="btn btn-primary">Submit</button>
    </form>
</div>
                </Layout>
  )
}

export default Register