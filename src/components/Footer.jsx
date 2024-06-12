import React from 'react'
import Image from 'next/image'
import { Images } from '@/components/imagenes'

export default function Footer ({ children }) {
  return (
    <section className='flex justify-center items-center flex-col sm:py-6 py-6'>      
      <div className='flex flex-row space-between py-3 px-3' >
        <div className='m-3 py-15'>
          {Images.mapri}
          <p className='max-w-[500px] py-3'>Chatbot encargado de la detección temprana de la depresión</p>
        </div>
        <div className='mx-6 py-3'>
          <h3 className='font-semibold'>Conócenos</h3>
          <ul className='underline underline-offset-1'>
            <li>
              <a href='/AboutUs'>Sobre Nosotros</a>
            </li>
          </ul>

        </div>
        <div className='mx-6 py-3'>
          <h3 className='font-semibold'>Politicas</h3>
          <ul className='underline underline-offset-1'>
            <li>
              <a href='/TerminosYCondiciones'>Términos y Condiciones</a>
            </li>
          </ul>

        </div>
      </div>
      <div className="w-full flex justify-center items-center md:flex-row flex-col pt-6 border-t-[1px] border-t-[#3F3E45]">
        <p className="font-poppins font-normal text-center text-[18px] leading-[27px]">
          Copyright Ⓒ 2024 Mapri. All Rights Reserved.
        </p>
      </div>
    </section>
    
  )
}
