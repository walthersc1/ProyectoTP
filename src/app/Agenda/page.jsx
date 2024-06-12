'use client'
import React from 'react';
import {Calendar} from "@nextui-org/calendar";
import Image from "next/image";
import {parseDate} from '@internationalized/date';
import {today, getLocalTimeZone} from "@internationalized/date";


export default function Agenda () {
  return (
    <section className="flex-col justify-center justify-items-center text-center">
      <div className=" flex-none bg-slate-800 border border-slate-400 rounded-md m-16 p-16 shadow-lg
      backdrop-filter backdrop-blur-sm bg-opacity-30 relative">
          <h1 className="font-poppins font-bold ss:text-[60px] text-[52px] text-white ss:leading-[100.8px] leading-[75px]">Agenda</h1>
          <div className='grid md:grid-cols-2 sm:grid-cols-1'>
            <div className='flex flex-row flex-col '>
              <div className="flex-col p-3 gap-2" >
                  <h3 className="text-left text-white font-semibold">Código de cita</h3> 
                  <div className="flex bg-white rounded-lg p-3 gap-3">
                      <Image src="/email.svg" width={19} height={19}/>
                      <input type="email" className='w-full'></input>
                  </div>
              </div>
              <div className="flex-col p-3 gap-2">
                  <h3 className="text-left text-white font-semibold">Nombre psicólogo</h3> 
                  <div className="flex bg-white rounded-lg p-3 gap-3">
                      <Image src="/lock.svg" width={19} height={19}/>
                      <input type="password" className='w-full'></input>
                  </div>
              </div>
              <div className="flex-col p-3 gap-2">
                  <h3 className="text-left text-white font-semibold">Horario</h3> 
                  <div className="flex bg-white rounded-lg p-3 gap-3">
                      <Image src="/lock.svg" width={19} height={19}/>
                      <input type="date" className='w-full'></input>
                  </div>
              </div>
              <div className="flex-col p-3 gap-2">
                  <h3 className="text-left text-white font-semibold">Modalidad</h3> 
                  <div className="flex bg-white rounded-lg p-3 gap-3">
                      <Image src="/lock.svg" width={19} height={19}/>
                      <input type="password" className='w-full'></input>
                  </div>
              </div>
              <div className="flex-col p-3 gap-2">
                  <h3 className="text-left text-white font-semibold">Lugar</h3> 
                  <div className="flex bg-white rounded-lg p-3 gap-3">
                      <Image src="/lock.svg" width={19} height={19}/>
                      <input type="password" className='w-full'></input>
                  </div>
              </div>
              <div className="flex-col p-3 gap-2">
                  <h3 className="text-left text-white font-semibold">Estado</h3> 
                  <div className="flex bg-white rounded-lg p-3 gap-3">
                    <Image src="/lock.svg" width={19} height={19}/>
                    <select
                      id="mayor"
                      name="mayor"                  
                      className="w-full rounded-md py-1.5 text-gray-900 sm:text-sm sm:leading-6 p-3"
                      >
                      <option>Disponible</option>
                      <option>Ocupado</option>
                      <option>Fuera de línea</option>
                    </select>
                  </div>
              </div>
            </div>
            <div className="flex flex-col gap-x-4 justify-center items-center">
              <Calendar aria-label="Date (Uncontrolled)" defaultValue={today(getLocalTimeZone())} />
            </div>
          </div>
          <button className='text-[20px] shadow-lg font-bold h-12 w-1/2 text-slate-50 my-6 
          rounded-full bg-teal-400'>Buscar</button>          

      </div>
    </section>
  )
}
