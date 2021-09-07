import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { useAuth } from '../../context/authContext'
import "./login.css"

function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const { user, login } = useAuth()
    const navigate = useNavigate()
    const { state } = useLocation()

    const handleFormSubmit = async (e) => {
        e.preventDefault()
        const { message, success } = await login( email, password )
        if(success){
            navigate(state?.from ? state?.from : "/", { replace : true })
        }else{
            setError(message)
        }
    }
    const handleLogin = async(e) => {
        e.preventDefault()
        const { message, success } = await login("test@test", "test@12")
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
        <form onSubmit={(e) => handleFormSubmit(e)}>
            <div className="login-conatainer">
                <div className="login-box">
                    <h1>Login</h1>
                    {error && <p style={{ color: "red" }}>{error}</p>}
                    <div className="textbox email">
                        <i className="fas fa-user"></i>
                        <input 
                        type="text" 
                        value={email}
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="textbox password">
                        <i className="fas fa-lock"></i>
                        <input 
                        type="password" 
                        value={password}
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button  
                    className="btn"
                    type="submit"
                    >
                        Login
                    </button>
                    <button  
                    className="btn"
                    type="submit"
                    onClick={(e) => handleLogin(e)}
                    >
                        Login with guest user
                    </button>
                    <button 
                    className="button"
                    type="submit"
                    onClick={() => navigate("/signup")}
                    >
                        Don't have an account ? Signup
                    </button>
                </div>
                { error && <p>{error}</p>}
            </div>    
        </form>
        </>
    )
}

export default Login
