import React from 'react'
import Image from 'next/image'
import { Images } from '@/components/imagenes'

export default function Benefits () {
  
  return (
    <section>
      <div className='flex md:flex-row flex-col justify-center items-center'>
        <h1 className=' text-center text-white font-bold text-[40px] mr-2'>¿Qué ofrece
        <a className='text-center text-teal-300 font-bold text-[40px]'> Mapri Chatbot</a>
        ?
        </h1>        
      </div>
      <div className='flex md:flex-row flex-col p-16 gap-6'>
        <div className='flex-1 justify-center items-center rounded-2xl bg-white p-2 sm:px-2'>
          <div className='items-center text-center rounded-xl bg-black p-6 h-full'>
            <div className='flex justify-center items-center p-6'>
              {Images.diagnostico}
            </div>
            <h1 className='font-poppins font-semibold text-[30px] text-white'>
              Diagnostico inmediato</h1>
            <p className='font-poppins font-normal text-white text-[18px] leading-[30.8px] max-w-[470px] mt-5'>
            Mapri-Chatbot fue desarrollado para brindar un diagnostico 
            inmediato del nivel de depresión del paciente. Toda información 
            recepcionada por Mapri-Chatbot es confidencial. 
            </p>
          </div>        
        </div>

        <div className='flex-1 justify-center items-center rounded-2xl bg-white p-3 sm:px-3'>
          <div className='text-center rounded-xl bg-black p-6 h-full'>
            <div className='flex justify-center items-center p-6'>
              {Images.telefono}
            </div>
            <h1 className='font-poppins font-semibold text-[30px] text-white'>
              Contacto con psicólogos</h1>
            <p className='font-poppins font-normal text-white text-[18px] leading-[30.8px] max-w-[470px] mt-5'>
              Todos los pacientes tendrán la opción de contactar a un 
              psicólogo capacitado para poder agendar una cita y recibir 
              tratamiento adecuado. 
            </p>
          </div>        
        </div>

        <div className='flex-1 justify-center items-center rounded-2xl bg-white p-3 sm:px-3'>
          <div className='text-center rounded-xl bg-black p-6 h-full'>
            <div className='flex justify-center items-center p-6'>
              {Images.hours24}
            </div>
            <h1 className='font-poppins font-semibold text-[30px] text-white'>
              Atención a cualquier hora</h1>
            <p className='font-poppins font-normal text-white text-[18px] leading-[30.8px] max-w-[470px] mt-5'>
             El servicio de Mapri-Chatbot se encuentra disponible las 24 horas del día, los 7 dias de la semana. 
            </p>
          </div>        
        </div>

      </div>
    </section>
  )
}
