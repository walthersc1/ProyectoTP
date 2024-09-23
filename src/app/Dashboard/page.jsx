"use client"
import React from 'react'
import { Images } from '@/components/imagenes'
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';


export default function Dashboard () {

  const traerDataInicio = async (e) => {
    const data = await axios.get('/api/getToken')
    const correo = data.data.email
    const usuario = await axios.get(`/api/docente/${correo}`)
    const datafec = await axios.post('/api/dashboard',usuario.data.psicologo[0])
    console.log(datafec.data)
    return datafec.data;
};

const [values, setValores] = useState({
  CantidadCitas: "",
  CantidadPacientes: "",
  fechaCita: ""
});

useEffect(() => {
  traerDataInicio().then((res)=>{
    setValores({
      CantidadCitas: res[0].CantidadCitas,
      CantidadPacientes: res[1].CantidadPacientes,
      fechaCita: res[2].fechaCita
    })
  });

}, []);

  return (
    <section className='m-16'>
      <div className='flex flex-col bg-black rounded-2xl'>
        <h1 className='py-8 px-16 text-teal-400 font-bold text-[30px]'>DASHBOARD</h1>
        <div className=' grid md:grid-cols-6 gap-4 px-16 pb-8 sm:grid-cols-1 '>
          <div className='flex-1 rounded-lg bg-neutral-700 md:col-span-2 sm:col-span-1 '>
            
            <h2 className='p-6 font-bold text-violet-500 text-[25px]'>Citas del día</h2>
            <div className='grid grid-cols-2 justify-items-center px-6'>
              {Images.event}
              <h3 className='text-center pb-1 text-white text-[40px]'>{values.CantidadCitas}</h3>
            </div>
            <div className='flex justify-center'>
              <button className='my-4 text-center border-t-2 border-gray-400 px-8 pt-3' >
                <a href='/AgregarCita' className='text-white tracking-widest font-semibold' >+ Agregar nueva cita</a>
              </button>
            </div>
          </div>
          <div className='flex-1 rounded-lg bg-neutral-700 md:col-span-2 sm:col-span-1 '>
            <h2 className='p-6 font-bold text-violet-500 text-[25px]'>Total de Pacientes</h2>
            <div className='grid grid-cols-2 justify-items-center px-6'>
              {Images.personas}
              <h3 className='text-center pb-1 text-white text-[40px]'>{values.CantidadPacientes}</h3>
            </div>
            <div className='flex justify-center'>
              <button className='my-4 text-center border-t-2 border-gray-400 px-8 pt-3' >
                <a href='/Resultados' className='text-white tracking-widest font-semibold' >Visualizar resultados</a>
              </button>
            </div>
          </div>
          <div className='flex-1 rounded-lg bg-neutral-700 md:col-span-2 sm:col-span-1 '>
          <h2 className='p-6 font-bold text-violet-500 text-[25px]'>Cita más cercana</h2>
            <div className='grid grid-cols justify-items-center px-6'>
              <a className='text-center pb-1 text-white'>{values.fechaCita}</a>
            </div>
            <div className='flex justify-center'>
              <button className='my-4 text-center border-t-2 border-gray-400 px-8 pt-3' >
                <a href='/Resultados' className='text-white tracking-widest font-semibold' >Visualizar resultados</a>
              </button>
            </div>
          </div>

        </div>
      </div>

    </section>
  )
}
