import { useState } from "react";
import api from "../services/api";

function Register(){

    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");


    const register = async()=>{

        try{

            const response = await api.post(
                "/auth/register",
                {
                    name,
                    email,
                    password
                }
            );

            alert(response.data.message);

        }
        catch(error){

            alert("Registration failed");

        }

    };


    return(
        <div>

            <h1>🌱 Create EcoVia Account</h1>


            <input
            placeholder="Name"
            onChange={(e)=>setName(e.target.value)}
            />


            <input
            placeholder="Email"
            onChange={(e)=>setEmail(e.target.value)}
            />


            <input
            placeholder="Password"
            type="password"
            onChange={(e)=>setPassword(e.target.value)}
            />


            <button onClick={register}>
                Register
            </button>


        </div>
    );

}


export default Register;