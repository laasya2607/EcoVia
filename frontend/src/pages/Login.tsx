import { useState } from "react";
import api from "../services/api";

function Login(){

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");


    const login = async()=>{

        try{

            const response = await api.post(
                "/auth/login",
                {
                    email,
                    password
                }
            );


            localStorage.setItem(
                "token",
                response.data.token
            );


            alert("Login successful");

        }
        catch(error){

            alert("Login failed");

        }

    };


    return(
        <div>

            <h1>🔐 EcoVia Login</h1>


            <input
            placeholder="Email"
            onChange={(e)=>setEmail(e.target.value)}
            />


            <input
            placeholder="Password"
            type="password"
            onChange={(e)=>setPassword(e.target.value)}
            />


            <button onClick={login}>
                Login
            </button>


        </div>
    );

}


export default Login;