"use client";
import React from 'react'
import axios from 'axios'


export default function Eliminar () {
  const enviarEmail = async(e) =>{
    
    console.log("Entrando al api")
    const resultado =await axios.get('/api/correo',datos);
    return
  }

  return (
    <section className="flex justify-center justify-items-center text-center">
            <div className="flex-col bg-slate-800 border border-slate-400 rounded-md m-16 p-14 shadow-lg
            backdrop-filter backdrop-blur-sm bg-opacity-30 relative">
                <h1 className="font-poppins font-bold ss:text-[52px] text-[42px] text-white ss:leading-[100.8px] leading-[75px]">Eliminar cuenta</h1>
                <div className="flex-col p-3 gap-6" >
                    <h3 className="text-left text-white font-semibold">Comentanos por qué deseas eliminar tu cuenta </h3> 
                    <div className="flex bg-white rounded-lg p-3 gap-3">                        
                        <input className='w-full h-[50px] ' type="password" placeholder="Comenta aqui"                        
                        ></input>
                    </div>
                </div>                
                <div className='flex gap-8 px-3'>
                  <button onClick={enviarEmail} className='text-[18px] shadow-lg font-bold w-1/2 text-slate-50 my-6 p-2 
                  rounded-full bg-teal-400' >Eliminar</button>
                  <button className='text-[18px] shadow-lg font-bold w-1/2 text-black my-6 p-2 
                  rounded-full bg-white'>Cancelar</button>

                </div>
                
            </div>
    </section>
  )
}




