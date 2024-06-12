'use client'
import React from 'react';
import {Calendar} from "@nextui-org/calendar";
import {TimeInput} from "@nextui-org/react";
import { Images } from '@/components/imagenes';
import {parseDate} from '@internationalized/date';
import {today, getLocalTimeZone} from "@internationalized/date";

export default function AgendarCita  () {
  return (
    <section className="flex-col justify-center justify-items-center text-center">
      <div className=" flex-none bg-slate-800 border border-slate-400 rounded-md m-16 p-16 shadow-lg
      backdrop-filter backdrop-blur-sm bg-opacity-30 relative">
          <h1 className="font-poppins font-bold ss:text-[60px] text-[52px] text-white ss:leading-[100.8px] leading-[75px]">Agregar Cita</h1>
          <div className='grid md:grid-cols-3 sm:grid-cols-1'>
              <div className="flex-col p-3 gap-2">
                <h3 className="text-left text-white font-semibold">Fecha</h3> 
                <div className="flex bg-white rounded-lg p-3 gap-3">
                    {Images.calendar}
                    <input title='date' type="date" className='w-full rounded-md py-1 text-gray-900 sm:text-sm sm:leading-6 p-3'></input>
                </div>
              </div>
              <div className="flex-col p-3 gap-2">
                <h3 className="text-left text-white font-semibold">Modalidad</h3> 
                <div className="flex bg-white rounded-lg p-3 gap-3">
                  {Images.workplace}
                  <select 
                  title='modalidad'                
                    className="w-full rounded-md py-1.5 text-gray-900 sm:text-sm sm:leading-6 p-3"
                    >
                    <option>Presencial</option>
                    <option>Virtual</option>
                  </select>
                </div>
              </div>
              <div className="flex-col p-3 gap-2" >
                <h3 className="text-left text-white font-semibold">Lugar</h3> 
                <div className="flex bg-white rounded-lg p-3 gap-3">
                    {Images.workplace}
                    <input title='email' type="email" className='w-full rounded-md py-1 text-gray-900 sm:text-sm sm:leading-6 p-3'></input>
                </div>
              </div>
              <div className="flex-col p-3 gap-2">
                <h3 className="text-left text-white font-semibold">Hora Inicio</h3> 
                <div className="flex bg-white rounded-lg p-3 gap-3">                    
                    <TimeInput label={null} title='start' />
                </div>
              </div>
              <div className="flex-col p-3 gap-2">
                <h3 className="text-left text-white font-semibold">Hora Fin</h3> 
                <div className="flex bg-white rounded-lg p-3 gap-3">
                    <TimeInput label={null} title='rnd' />
                </div>
              </div>              
          </div>
          <div className="flex flex-col gap-x-4 justify-center items-center py-6">
            <Calendar aria-label="Date (Uncontrolled)" defaultValue={today(getLocalTimeZone())} />
          </div>
          <button className='text-[20px] shadow-lg font-bold h-12 w-1/2 text-slate-50 my-6 
          rounded-full bg-teal-400'>Agregar</button>          

      </div>
    </section>
  )
}
