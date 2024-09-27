"use client"
import React from 'react'
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function helpYFeedback() {
    const { isOpen, onClose, onOpen, onOpenChange } = useDisclosure();
    const [getAsunto, setAsunto] = useState({
        titulo: "",
        texto: ""
    })
    const [getTikets, setTickets] = useState([]);
    const traerDataInicio = async (e) => {
        const data = await axios.get('/api/getToken')
        const correo = data.data.email
        const usuario = await axios.get(`/api/docente/${correo}`)
        //console.log(usuario.data.psicologo[0])
        const datosTicket = await axios.post('/api/ticket', usuario.data.psicologo[0])
        setTickets(Array.isArray(datosTicket.data) ? datosTicket.data : []);
    };
    useEffect(() => {
        traerDataInicio()

    }, []);
    const closeModal = () => {
        onClose()
    }

    const handleChange = async (event) => {
        const { name, value } = event.target;
        setAsunto({
            ...getAsunto,
            [name]: value,
        });
    };

    const abrirModal = () => {
        onOpen()
    }

    return (
        <section className="flex justify-center pt-12 pb-12 h-fit">



            <div className=" flex-none bg-slate-800 border border-slate-400 rounded-md m-16 p-16 shadow-lg
      backdrop-filter backdrop-blur-sm bg-opacity-30 relative">
                <h1 className="font-poppins font-bold ss:text-[60px] text-[52px] text-white ss:leading-[100.8px] leading-[75px] pb-3">Help and Feedbak</h1>

                <div className='grid md:grid-cols-3 sm:grid-cols-1 gap-4'>

                </div>

                <div className="max-h-[400px] overflow-y-auto overflow-x-auto pt-8 rounded-lg shadowp-6">
                    <table className="pl-4 pr-4 w-full border-collapse border-4 border-slate-900 text-center bg-white">
                        <thead className='bg-teal-600 border-b-2 border-gray-200'>
                            <tr className='border-b-2 border-gray-200'>
                                <th className="p-3 text-base font-semibold tracking-wide text-center text-white" scope="col">Cod ticket</th>
                                <th className='p-3 text-base font-semibold tracking-wide text-center text-white' scope="col">Asunto</th>
                                <th className='p-3 text-base font-semibold tracking-wide text-center text-white' scope="col">Estado</th>
                                <th className='p-3 text-base font-semibold tracking-wide text-center text-white' scope="col">Fecha Creación</th>
                                <th className='p-3 text-base font-semibold tracking-wide text-center text-white' scope="col">Visualizar</th>
                            </tr>
                        </thead>
                        <tbody className='divide-y divide-gray-300'>
                            {getTikets.length > 0 ? (
                                getTikets.map((ticket, index) => (
                                    <tr key={index}>
                                        <td className='p-3 text-sm whitespace-nowrap text-gray-800'>{ticket.idticket}</td>
                                        <td className='p-3 text-sm whitespace-nowrap text-gray-800'>{ticket.titulo}</td>
                                        <td className='p-3 text-sm whitespace-nowrap text-gray-800 capitalize'>{student.estado}</td>
                                        <td className='p-3 text-sm whitespace-nowrap text-gray-800 capitalize'>{student.created_at}</td>
                                        <td className='p-3 text-sm whitespace-nowrap text-gray-800'>{"Boton Visualizar"}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className='p-3 text-sm text-gray-800 text-center'>
                                        No se encuentra registrado ningun ticket de momento
                                    </td>
                                </tr>
                            )}
                        </tbody>

                    </table>
                </div>

                <button onClick={abrirModal} className='text-[20px] shadow-lg font-bold h-12 w-1/2 text-slate-50 my-6 
          rounded-full bg-teal-400'>Agregar</button>
                <div>



                    <Modal isOpen={isOpen} onOpenChange={onOpenChange} size='3xl' scrollBehavior='inside'>
                        <ModalContent>
                            {(closeModal) => (
                                <>
                                    <ModalHeader className="flex flex-col gap-1">Confirmación</ModalHeader>
                                    <ModalBody>
                                        <div className="sm:col-span-4">
                                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                                Titulo del asunto
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    id="contraseña"
                                                    name="titulo"
                                                    type="text"
                                                    onChange={handleChange}
                                                    className="font-sans block bg-gray-300 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-500 placeholder:text-gray-600 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 p-3"
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-4">
                                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                                Redacte el problema
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    id="contraseña"
                                                    name="texto"
                                                    type="text"
                                                    onChange={handleChange}
                                                    className="font-sans block bg-gray-300 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-500 placeholder:text-gray-600 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 p-3"
                                                />
                                            </div>
                                        </div>
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button color="primary" variant="light" onPress={closeModal} >
                                            Cerrar
                                        </Button>
                                        <Button color="danger" variant="light" onPress={""}>
                                            Aceptar
                                        </Button>
                                    </ModalFooter>
                                </>
                            )}
                        </ModalContent>
                    </Modal>


                </div>
            </div>
        </section>
    )
}
