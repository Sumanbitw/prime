import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { useAuth } from '../../context/authContext'
import "./signup.css"

function Signup() {
    const [ name, setName ] = useState("")
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ error, setError ] = useState("")
    const { user, signup } = useAuth()
    const navigate = useNavigate()
    const { state } = useLocation()

    const handleSignup = async(e) => {
        e.preventDefault()
        const { message, success } = await signup( name, email, password )
        if(success){
            navigate(state?.from ? state?.from : "/", { replace : true })
        }else{
            setError(message)
        }
    }
    useEffect(() => {
        user && navigate("/", { replace : true })
      }, [user, navigate])

    return (
        <>
        <form onSubmit={(e) => handleSignup(e)}>
            <div className="signup-conatainer">
                <div className="signup-box">
                    <h1>Signup</h1>
                    <div className="textbox">
                        <i className="fas fa-user"></i>
                        <input 
                        type="text" 
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(() => e.target.value)}
                        />
                    </div>

                    <div className="textbox">
                        <i className="fas fa-user"></i>
                        <input 
                        type="text"
                        value={email} 
                        placeholder="Email"
                        onChange={(e) => setEmail(() => e.target.value)}
                        />
                    </div>

                    <div className="textbox">
                        <i className="fas fa-lock"></i>
                        <input 
                        type="password" 
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(() => e.target.value)}
                        />
                    </div>

                    <button  
                    className="btn"
                    type="submit"
                    >
                        Signin
                    </button>

                    <button 
                    className="button"
                    type="submit"
                    onClick={() => navigate("/login") }
                    >
                        Already have an account ? Login
                    </button>
                </div>
                { error && <p>{error}</p>}
            </div>
            
        </form>
        </>
    )
}

export default Signup
