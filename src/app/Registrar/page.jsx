import React from 'react'
import Image from "next/image";
import {Input} from "@nextui-org/react";

export default function Registrar () {
  return (
    <section className="text-center grid grid-cols-2 flex md:flex-row flex-col bg-[url('/artificial-intelligence.jpg')]">
      
      <div className='p-16' >
        <h1 className='text-white font-bold px-16 py-8 ss:text-[72px] text-[60px]'>Regístrate como paciente</h1>
        <button className="px-16 font-sans text-white bg-teal-500 w-full rounded-full border-0 py-1.5 shadow-sm 
          sm:max-w-xs sm:text-sm sm:leading-6 p-3">
         <a href='/RegistrarPaciente' className='justify-center flex py-2' >
            <Image src="/left-arrow.svg" className='flex-none' width={40} height={40}/>         
            <h3 className='text-[25px] px-4 content-center'>Registrar</h3>
         </a>   
        </button>
      </div>
      <div className='p-16' >
        <h1 className='text-white font-bold px-16 py-8 ss:text-[72px] text-[60px]'>Regístrate como psicólogo</h1>
        <button className="px-16 font-sans text-white bg-teal-500 w-full rounded-full border-0 py-1.5 shadow-sm 
          sm:max-w-xs sm:text-sm sm:leading-6 p-3">
         <a href='/RegistrarPsicologo' className='justify-center flex py-2' >
            <h3 className='text-[25px] px-4 content-center'>Registrar</h3>
            <Image src="/arrow-signup.svg" className='flex-none' width={40} height={40}/>         
         </a>   
        </button>
      </div>

    </section>
  )
}
