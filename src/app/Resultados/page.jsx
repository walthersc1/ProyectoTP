'use client'
import React from 'react';
import {Calendar} from "@nextui-org/calendar";
import {TimeInput} from "@nextui-org/react";
import { Images } from '@/components/imagenes';
import {parseDate} from '@internationalized/date';
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import {today, getLocalTimeZone} from "@internationalized/date";

export default function Resultados () {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  return (
    <section className="flex-col justify-center justify-items-center text-center">
      <div className=" flex-none bg-slate-800 border border-slate-400 rounded-md m-16 p-16 shadow-lg
      backdrop-filter backdrop-blur-sm bg-opacity-30 relative">
          <h1 className="font-poppins font-bold ss:text-[60px] text-[52px] text-white ss:leading-[100.8px] leading-[75px]">Resultados</h1>
          <div className='grid md:grid-cols-2 sm:grid-cols-1'>              
              <div className="flex-col p-3 gap-2" >
                <h3 className="text-left text-white font-semibold">Nombre</h3> 
                <div className="flex bg-white rounded-lg p-3 gap-3">
                    {Images.account}
                    <input type="nombre" className='w-full rounded-md py-1 text-gray-900 sm:text-sm sm:leading-6 p-3'></input>
                </div>
              </div>
              <div className="flex-col p-3 gap-2">
                <h3 className="text-left text-white font-semibold">Estado de depresión</h3> 
                <div className="flex bg-white rounded-lg p-3 gap-3">
                  {Images.level}
                  <select                 
                    className="w-full rounded-md py-1.5 text-gray-900 sm:text-sm sm:leading-6 p-3"
                    >
                    <option>Minima</option>
                    <option>Leve</option>
                    <option>Moderada</option>
                    <option>Moderamente severa</option>
                    <option>Severa</option>
                  </select>
                </div>
              </div>
              <div className="flex-col p-3 gap-2" >
                <h3 className="text-left text-white font-semibold">Código</h3> 
                <div className="flex bg-white rounded-lg p-3 gap-3">
                    {Images.university}
                    <input type="codigo" className='w-full rounded-md py-1 text-gray-900 sm:text-sm sm:leading-6 p-3'></input>
                </div>
              </div>
                            
          </div>
          <div className="overflow-auto rounded-lg shadowp-6">
              <table className=" pl-4 pr-4 w-full border-collapse border-4 border-slate-900 text-center bg-white">
                <thead className='bg-gray-200 border-b-2 border-gray-200'>
                  <tr>
                    <th className="p-3 text-sm font-semibold tracking-wide text-center" scope="col">Código</th>
                    <th className="p-3 text-sm font-semibold tracking-wide text-center" scope="col">Nombre y apellido</th>
                    <th className="p-3 text-sm font-semibold tracking-wide text-center" scope="col">Fecha</th>
                    <th className="p-3 text-sm font-semibold tracking-wide text-center" scope="col">Estado</th>
                    <th className="p-3 text-sm font-semibold tracking-wide text-center" scope="col">Ciclo</th>
                    <th className="p-3 text-sm font-semibold tracking-wide text-center" scope="col">Edad</th>
                    <th className="p-3 text-sm font-semibold tracking-wide text-center" scope="col">Acción</th>                 
                  </tr>
                </thead>
                <tbody className='divide-y divide-gray-300'>
                  <tr className='bg-white'>
                      <td className="p-3 text-sm whitespace-nowrap font-bold text-blue-500">u20204j364</td>
                      <td className="p-3 text-sm whitespace-nowrap text-gray-700">Alberto Peña</td>
                      <td className="p-3 text-sm whitespace-nowrap text-gray-700">19/4/2024</td>
                      <td className="p-3 text-sm whitespace-nowrap text-gray-700 text-green-600 font-medium">Leve</td>
                      <td className="p-3 text-sm whitespace-nowrap text-gray-700">7</td>
                      <td className="p-3 text-sm whitespace-nowrap text-gray-700">20</td>
                      <td className="p-3 text-sm whitespace-nowrap text-gray-700">
                          <button className='text-[14px] font-bold border-2 border-black px-2 my-1 text-black rounded-full bg-slate-300'>Detalles</button>
                      </td>
                  </tr>
                  <tr className='bg-gray-100'>
                      <td className="p-3 text-sm whitespace-nowrap font-bold text-blue-500">u20225w366</td>
                      <td className="p-3 text-sm whitespace-nowrap text-gray-700">Maria Fernandez</td>
                      <td className="p-3 text-sm whitespace-nowrap text-gray-700">San Miguel</td>
                      <td className="p-3 text-sm whitespace-nowrap text-gray-700 text-orange-500 font-medium">Moderada</td>
                      <td className="p-3 text-sm whitespace-nowrap text-gray-700">4</td>
                      <td className="p-3 text-sm whitespace-nowrap text-gray-700">19</td>
                      <td className="p-3 text-sm whitespace-nowrap text-gray-700">
                          <button className='text-[14px] font-bold border-2 border-black px-2 my-1 text-black rounded-full bg-slate-300'>Detalles</button>
                      </td>
                  </tr>
                  <tr className='bg-white'>
                      <td className="p-3 text-sm whitespace-nowrap font-bold text-blue-500">u20206h737</td>
                      <td className="p-3 text-sm whitespace-nowrap text-gray-700">Alejandra Rodriguez</td>
                      <td className="p-3 text-sm whitespace-nowrap text-gray-700">Monterico</td>
                      <td className="p-3 text-sm whitespace-nowrap text-gray-700 text-red-500 font-medium">Moderadamente severa</td>
                      <td className="p-3 text-sm whitespace-nowrap text-gray-700">7</td>
                      <td className="p-3 text-sm whitespace-nowrap text-gray-700">21</td>
                      <td className="p-3 text-sm whitespace-nowrap text-gray-700">
                          <button className='text-[14px] font-bold border-2 border-black px-2 my-1 text-black rounded-full bg-slate-300'>Detalles</button>
                      </td>
                  </tr>
                </tbody>
              </table>
          </div>
          <button onClick={onOpen} className='text-[20px] shadow-lg font-bold h-12 w-1/2 text-slate-50 my-6 
          rounded-full bg-teal-400'>Buscar</button>
          <Modal isOpen={isOpen} onOpenChange={onOpenChange} size='3xl' scrollBehavior='inside'>
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">Respuesta de cuestionario</ModalHeader>
                  <ModalBody>
                  <div className='grid grid-cols-2'>              
                      <div className="flex-col p-3 gap-2" >
                        <h3 className="text-left text-black font-semibold">Nombre</h3> 
                        <div className="flex bg-slate-400 rounded-lg p-3 gap-3">
                            {Images.account}
                            <input type="nombre" className='w-full bg-slate-400 rounded-md py-1 text-gray-900 sm:text-sm sm:leading-6 p-3'></input>
                        </div>
                      </div>
                      <div className="flex-col p-3 gap-2">
                        <h3 className="text-left text-black font-semibold">Estado de depresión</h3> 
                        <div className="flex bg-slate-400 rounded-lg p-3 gap-3">
                          {Images.level}
                          <select                 
                            className="w-full bg-slate-400 rounded-md py-1.5 text-gray-900 sm:text-sm sm:leading-6 p-3"
                            >
                            <option>Minima</option>
                            <option>Leve</option>
                            <option>Moderada</option>
                            <option>Moderamente severa</option>
                            <option>Severa</option>
                          </select>
                        </div>
                      </div>
                      <div className="flex-col p-3 gap-2" >
                        <h3 className="text-left text-black font-semibold">Código</h3> 
                        <div className="flex bg-slate-400 rounded-lg p-3 gap-3">
                            {Images.university}
                            <input type="codigo" className='w-full bg-slate-400 rounded-md py-1 text-gray-900 sm:text-sm sm:leading-6 p-3'></input>
                        </div>
                      </div>       
                  </div>
                  <div className='flex flex-col px-3 gap-2'>
                    <div>
                      <h2>Pregunta 1</h2>
                      <p className='bg-slate-300 p-3 text-justify'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    </div>
                    <div>
                      <h2>Pregunta 2</h2>
                      <p className='bg-slate-300 p-3 text-justify'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    </div>
                    <div>
                      <h2>Pregunta 3</h2>
                      <p className='bg-slate-300 p-3 text-justify'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    </div>
                  </div>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                      Close
                    </Button>
                    <Button color="primary" onPress={onClose}>
                      Action
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>          

      </div>
    </section>
  )
}
