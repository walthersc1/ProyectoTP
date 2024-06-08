import React from 'react'
import Image from 'next/image'

export default function ChatbotInfo () {
  const imagenes = {
    rightarrow: <Image src="/right-arrow.svg" width={26} height={16}/>
  }
  return (
    <section className='flex md:flex-row flex-col sm:py-16 p-16 '>
      <div className='flex-1 flex justify-center justify-items-start flex-col px-16 sm:px-16'>
        
        <div className="flex flex-row justify-between items-center w-full">
          <h1 className="flex-1 font-poppins font-bold ss:text-[72px] text-[60px] text-white ss:leading-[100.8px] leading-[75px]">
            ¡Bienvenido! <br className="sm:block hidden" />{" "}
            <span className="text-teal-400">Mapri Chatbot</span>{" "}
          </h1>
          <div className="ss:flex hidden md:mr-4 mr-0">
            
          </div>
        </div>

        <h1 className="font-poppins font-semibold ss:text-[68px] text-[60px] text-white ss:leading-[100.8px] leading-[75px] w-full">
          te atenderá.
        </h1>
        <p className='font-poppins font-normal text-white text-[18px] leading-[30.8px] max-w-[470px] mt-5'>
          Habla con Mapri-Chatbot y recibe un diagnostico inmediato sobre tu estado de salud mental a cualquier hora del día.
        </p>
        <button className='text-[25px] shadow-lg font-bold h-14 w-[200px] text-slate-50 my-6 rounded-full 
        bg-gradient-to-r from-purple-500 to-teal-400 hover:from-sky-700 hover:to-cyan-400'> 
         <a href='/Registrar'>Regístrate</a>
        </button>
      </div>

      <div className='flex-1 flex justify-center items-center md:my-0 my-10 relative'>
        <Image src="/robot.png" width={220} height={220}/>

        
      </div>

      
    </section>
  )
}
