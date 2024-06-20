'use client'
import { Calendar } from "@nextui-org/calendar";
import Image from "next/image";
import { parseDate } from '@internationalized/date';
import { today, getLocalTimeZone } from "@internationalized/date";
import { Images } from '@/components/imagenes';
import React, { useState, useEffect } from 'react';
import axios from "axios";


export default function Agenda() {

  const [datos, setdatos] = useState({
    codcita: "",
    fecha: "",
    nombre: "",
  });
  const [table, settable] = useState([]);
  const handleDateChange = (event) => {
    const { name, value } = event.target;

    setdatos({
      ...datos,
      [name]: value,
    });
  };

  const consultaUsuario = async () => {
    console.log(datos);
    const respuesta = await axios.post('/api/agenda', datos);
    settable(respuesta.data)
  }


  return (
    <section className="flex-col justify-center justify-items-center text-center">
      <div className=" flex-none bg-slate-800 border border-slate-400 rounded-md m-16 p-16 shadow-lg
      backdrop-filter backdrop-blur-sm bg-opacity-30 relative">
        <h1 className="font-poppins font-bold ss:text-[60px] text-[52px] text-white ss:leading-[100.8px] leading-[75px]">Agenda</h1>
        <div className='grid md:grid-cols-3 sm:grid-cols-1 gap-4'>

          <div className="flex-col p-3 gap-2">
            <h3 className="text-left text-white font-semibold">Cod. Cita</h3>
            <div className="flex bg-white rounded-lg p-3 gap-3">
              <Image src="/email.svg" width={19} height={19} />
              <input
                type="text"
                name="codcita"
                onChange={handleDateChange}
                className='w-full rounded-md py-1 text-gray-900 sm:text-sm sm:leading-6 p-3'></input>
            </div>
          </div>

          <div className="flex-col p-3 gap-2">
            <h3 className="text-left text-white font-semibold">Fecha</h3>
            <div className="flex bg-white rounded-lg p-3 gap-3">
              <Image src="/lock.svg" width={19} height={19} />
              <input
                type="date"
                name="fecha"
                onChange={handleDateChange}
                className='w-full rounded-md py-1 text-gray-900 sm:text-sm sm:leading-6 p-3'></input>
            </div>
          </div>

          <div className="flex-col p-3 gap-2">
            <h3 className="text-left text-white font-semibold">Nom. Psicólogo</h3>
            <div className="flex bg-white rounded-lg p-3 gap-3">
              <Image src="/lock.svg" width={19} height={19} />
              <input
                type="text"
                name="nombre"
                onChange={handleDateChange}
                className='w-full rounded-md py-1 text-gray-900 sm:text-sm sm:leading-6 p-3'></input>
            </div>
          </div>
        </div>


        <div className="max-h-[400px] overflow-y-auto overflow-x-auto pt-8 rounded-lg shadowp-6">
          <table className="pl-4 pr-4 w-full border-collapse border-4 border-slate-900 text-center bg-white">
            <thead className='bg-teal-600 border-b-2 border-gray-200'>
              <tr className='border-b-2 border-gray-200'>
                <th className="p-3 text-base font-semibold tracking-wide text-center text-white" scope="col">Cod. Cita</th>
                <th className='p-3 text-base font-semibold tracking-wide text-center text-white' scope="col">Nom. Psicólogo</th>
                <th className='p-3 text-base font-semibold tracking-wide text-center text-white' scope="col">Modalidad</th>
                <th className='p-3 text-base font-semibold tracking-wide text-center text-white' scope="col">Lugar</th>
                <th className='p-3 text-base font-semibold tracking-wide text-center text-white' scope="col">H. Inicio</th>
                <th className='p-3 text-base font-semibold tracking-wide text-center text-white' scope="col">H. Fin</th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-300'>
              {table.map((student, index) => (
                <tr key={index} className=''>
                  <td className='p-3 text-sm whitespace-nowrap text-gray-800'>{student.idcita}</td>
                  <td className='p-3 text-sm whitespace-nowrap text-gray-800'>{student.nombre}</td>
                  <td className='p-3 text-sm whitespace-nowrap text-gray-800 capitalize'>{student.modalidad}</td>
                  <td className='p-3 text-sm whitespace-nowrap text-gray-800 capitalize'>{student.lugar}</td>
                  <td className='p-3 text-sm whitespace-nowrap text-gray-800'>{student.horainicio}</td>
                  <td className='p-3 text-sm whitespace-nowrap text-gray-800'>{student.horafin}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>


        <button
          className='text-[20px] shadow-lg font-bold h-12 w-1/2 text-slate-50 my-6 rounded-full bg-teal-400'
          onClick={consultaUsuario}>Buscar</button>



      </div>
    </section>
  )
}
