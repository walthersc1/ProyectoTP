'use client'
import Navegation from "@/components/Navegation"; 
import React, { useState } from 'react';
import Image from "next/image";
import {Input} from "@nextui-org/react";
import axios from "axios"


export default function Login(){
    const [values, setValues] =useState({
        email:'',
        password:''
    })

    const regex =/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    const [errors, setErrors] = useState({})

    const handleChange = (e) =>{
        const {name, value} = e.target;
        setValues({ ...values, [name] : value })
    }

    const handleSubmit  = async(e) => {
        e.preventDefault()
        const validationErrors= {}
        
        if(!values.email.trim()){
            validationErrors.email = "Se requiere ingresar correo "
        }else if(!regex.test(values.email)){
            validationErrors.email = "Correo no valido"
        }
        
        if(!values.password.trim()){
            validationErrors.password = "Se requiere ingresar contraseña"
        }else if(values.password.length <6){
            validationErrors.email = "Contraseña debe ser mayor a 6 digitos"
        }
console.log("Entrand a la funcion")
        const response = await axios.post('',values)
        console.log(response)
        setErrors(validationErrors)     


    }


    return (
                
        <section className="flex justify-center justify-items-center text-center">
            <form onSubmit={handleSubmit}>
                <div className="flex-col bg-slate-800 border border-slate-400 rounded-md m-16 p-16 shadow-lg
                backdrop-filter backdrop-blur-sm bg-opacity-30 relative">
                    <h1 className="font-poppins font-bold ss:text-[60px] text-[52px] text-white ss:leading-[100.8px] leading-[75px]">Login</h1>
                    <div className="flex-col p-3 gap-2" >
                        <h3 className="text-left text-white font-semibold">Correo</h3> 
                        <div className="flex bg-white rounded-lg p-3 gap-3">
                            <Image src="/email.svg" width={19} height={19}/>
                            <input type="email" placeholder="Ingresar Correo"                            
                            name="email"
                            onChange={handleChange} className="text-black"></input>
                        </div>
                        {errors.email && <p className="text-red-400 text-left text-[13px]">{errors.email}</p>}
                    </div>
                    <div className="flex-col p-3 gap-2">
                        <h3 className="text-left text-white font-semibold">Contraseña</h3> 
                        <div className="flex bg-white rounded-lg p-3 gap-3">
                            <Image src="/lock.svg" width={19} height={19}/>
                            <input type="password" placeholder="Ingresar Contraseña"                             
                            name="password"
                            onChange={handleChange}></input>
                        </div>
                        {errors.password && <p className="text-red-400 text-left text-[13px]">{errors.password}</p>}
                    </div>
                    <button className='text-[20px] shadow-lg font-bold h-12 w-full text-slate-50 my-6 
                    rounded-full bg-teal-400'>Ingresar</button>
                    <div className="flex p-3 justify-center">                    
                        <a href="/Recuperar" className="underline">¿Olvidaste tu contraseña?</a>
                    </div>

                </div>
            </form>
        </section>       

    );
}