import React from 'react'
import Image from "next/image";

export default function Recuperar () {
  return (
    <section className="flex justify-center justify-items-center text-center">
            <div className="flex-col bg-slate-800 border border-slate-400 rounded-md m-16 p-14 shadow-lg
            backdrop-filter backdrop-blur-sm bg-opacity-30 relative">
                <h1 className="font-poppins font-bold ss:text-[52px] text-[42px] text-white ss:leading-[100.8px] leading-[75px]">Recuperar contraseña</h1>
                <div className="flex-col p-3 gap-2" >
                    <h3 className="text-left text-white font-semibold">Nueva contraseña</h3> 
                    <div className="flex bg-white rounded-lg p-3 gap-3">
                        <Image src="/lock.svg" width={19} height={19}/>
                        <input className='w-full' type="password" placeholder="Ingresar nueva contraseña"                        
                        ></input>
                    </div>
                </div>
                <div className="flex-col p-3 gap-2">
                    <h3 className="text-left text-white font-semibold">Repita Contraseña</h3> 
                    <div className="flex bg-white rounded-lg p-3 gap-3">
                        <Image src="/lock.svg" width={19} height={19}/>
                        <input className='w-full' type="password" placeholder="Repita la contraseña"                        
                        ></input>
                    </div>
                </div>
                <div className='flex gap-8 px-3'>
                  <button className='text-[18px] shadow-lg font-bold w-1/2 text-slate-50 my-6 p-2 
                  rounded-full bg-teal-400'>Aceptar</button>
                  <button className='text-[18px] shadow-lg font-bold w-1/2 text-black my-6 p-2 
                  rounded-full bg-white'>Cancelar</button>

                </div>
                
            </div>
    </section>
  )
}
