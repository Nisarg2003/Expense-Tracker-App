import React,{useState,useEffect} from 'react'
import { NavLink, Link, Navigate, useNavigate } from 'react-router-dom'

const Header = () => {

    const [loginUser,setloginUser] = useState('')
    const navigate = useNavigate()
    
    useEffect(()=>{
        const user = JSON.parse(localStorage.getItem('user'))
        if(user){
            setloginUser(user)
        }
    },[])

    const logOutHandler = () =>{
        localStorage.removeItem('user') 
        navigate('/login')
    }
    return (

        <>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <Link className="navbar-brand"> Expense Management</Link>
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                           {loginUser && loginUser.name}
                        </li>
                 
                    </ul>

                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <button className="btn btn-primary" onClick={logOutHandler}>
                            LogOut
                        </button>
                 
                    </ul>
                </div>
        </nav>

        </>
    )
}

export default Header