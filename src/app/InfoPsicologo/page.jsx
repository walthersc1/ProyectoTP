"use client";

import React from 'react'
import { useState, useEffect } from "react";
import axios from "axios";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function InfoPsicologo() {
    const consultaUsuario = async (e) => {
        const data = await axios.get('/api/getToken')
        const correo = data.data.email
        const usuario = await axios.get(`/api/docente/${correo}`)
        return usuario.data.psicologo[0];
    };

    const { isOpen: isOpenEliminar, onClose: cerrarEliminar, onOpen: onOpenEliminar, onOpenChange: onOpenChangeEliminar } = useDisclosure();
    const [valoresInput, setValoresInput] = useState({
        iddocente: "",
        nombre: "",
        apellido: "",
        numtelefonico: "",
        edad: "",
        correo: "",
        coddocente: "",
        fechanacimiento: "",
        estado: "",
        disponibilidad: "",
        horainicio: "",
        horafin: "",
        estado: "",
    });

    useEffect(() => {
        consultaUsuario().then((res) => {

            setValoresInput({
                iddocente: res.iddocente,
                nombre: res.nombre,
                apellido: res.apellido,
                numtelefonico: res.numtelefono,
                edad: res.edad,
                correo: res.correo,
                coddocente: res.coddocente,
                fechanacimiento: res.fechanacimiento.slice(0, 10),
                estado: res.estado,
                disponibilidad: res.disponibilidad,
                horainicio: res.horainicio,
                horafin: res.horafin,
                estado: "true"
            });
        });
    }, []);

    const handleChange = async (event) => {
        const { name, value } = event.target;
        setValoresInput({
            ...valoresInput,
            [name]: value,
        });
    };



    const actualizarDatos = async (e) => {
        e.preventDefault();
        axios.post(`/api/docente/${valoresInput.correo}`, valoresInput);
        toast.success("Se actualizo los datos de manera correcta")
    };
    const darDebajaCuenta = async (event) => {
        axios.post(`/api/docente/${valoresInput.correo}`, valoresInput);
        await axios.post("/api/getToken/logout")
        window.location.reload();
    }

    const CerarModalDarDeBaja = (e) => {
        setValoresInput({
            ...valoresInput,
            estado: 'true',
        });
        cerrarEliminar()
    }

    const abrirModalDarDeBajaCuenta = (e) => {
        e.preventDefault()
        setValoresInput({
            ...valoresInput,
            estado: 'false',
        });
        onOpenEliminar(e)
    }

    return (
        <form>
            <div className="space-y-12  m-16">

                <div className="bg-neutral-50 rounded-3xl border-b border-gray-900/10 px-24 py-16">
                    <h1 className="text-xl font-bold leading-7 text-gray-900">Información Personal del Psicólogo</h1>
                    <p className="mt-1 text-sm leading-6 text-gray-600">Puede modificar su información personal aqui </p>

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-3">
                            <label htmlFor="nombre" className="block text-sm font-medium leading-6 text-gray-900">
                                Nombres
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="nombre"
                                    id="nombre"
                                    autoComplete="given-name"
                                    className="font-sans block bg-gray-300 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 p-3"
                                    onChange={handleChange}
                                    value={valoresInput.nombre}
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="apellido" className="block text-sm font-medium leading-6 text-gray-900">
                                Apellidos
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="apellido"
                                    id="apellido"
                                    autoComplete="family-name"
                                    className="font-sans block bg-gray-300 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 p-3"
                                    onChange={handleChange}
                                    value={valoresInput.apellido}
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-2 sm:col-start-1">
                            <label htmlFor="numtelefonico" className="block text-sm font-medium leading-6 text-gray-900">
                                Telefono
                            </label>
                            <div className="mt-2">
                                <input
                                    type="tel"
                                    name="numtelefonico"
                                    id="numtelefonico"
                                    pattern="[0-9]{10}"
                                    autoComplete="address-level2"
                                    className="font-sans block bg-gray-300 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 p-3"
                                    onChange={handleChange}
                                    value={valoresInput.numtelefonico}
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-2">
                            <label htmlFor="edad" className="block text-sm font-medium leading-6 text-gray-900">
                                Edad
                            </label>
                            <div className="m-2">
                                <input
                                    type="number"
                                    name="edad"
                                    id="edad"
                                    autoComplete="address-level1"
                                    className="font-sans block bg-gray-300 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 p-3"
                                    onChange={handleChange}
                                    value={valoresInput.edad}
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-2">
                            <label htmlFor="fechanacimiento" className="block text-sm font-medium leading-6 text-gray-900">
                                Fecha de Nacimiento
                            </label>
                            <div className="mt-2">
                                <input
                                    type="date"
                                    name="fechanacimiento"
                                    id="fechanacimiento"
                                    autoComplete="birth-date"
                                    className="font-sans block bg-gray-300 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 p-3"
                                    onChange={handleChange}
                                    value={valoresInput.fechanacimiento}
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-2">
                            <label htmlFor="coddocente" className="block text-sm font-medium leading-6 text-gray-900">
                                Cod Docente
                            </label>
                            <div className="mt-2">
                                <input
                                    type="email"
                                    name="coddocente"
                                    id="coddocente"
                                    autoComplete="email"
                                    className="font-sans block bg-gray-300 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 p-3"
                                    onChange={handleChange}
                                    value={valoresInput.coddocente}
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-4">
                            <label htmlFor="correo" className="block text-sm font-medium leading-6 text-gray-900">
                                Correo
                            </label>
                            <div className="mt-2">
                                <input
                                    type="email"
                                    name="correo"
                                    id="correo"
                                    autoComplete="email"
                                    className="font-sans block bg-gray-300 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 p-3"
                                    onChange={handleChange}
                                    value={valoresInput.correo}
                                />
                            </div>
                        </div>


                        <div className="sm:col-span-2">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                Horario Inicio
                            </label>
                            <div className="mt-2">
                                <input
                                    title='horainicio'
                                    type="time"
                                    name="horainicio"
                                    onChange={handleChange}
                                    value={valoresInput.horainicio}
                                    className="font-sans block bg-gray-300 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 p-3"
                                />
                            </div>
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                Horario Fin
                            </label>
                            <div className="mt-2">
                                <input
                                    title='horafin'
                                    type="time"
                                    name="horafin"
                                    onChange={handleChange}
                                    value={valoresInput.horafin}
                                    className="font-sans block bg-gray-300 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 p-3"
                                />
                            </div>
                        </div>


                        <div className="sm:col-span-4">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                Password
                            </label>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="password"
                                    placeholder="**********"
                                    className="font-sans block bg-gray-300 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-500 placeholder:text-gray-600 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 p-3"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-2 sm:col-start-2">

                            <div className="mt-2 ">
                                <button className="font-sans bg-gray-100 w-full rounded-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:max-w-xs sm:text-sm sm:leading-6 p-3">
                                    <a href="/">Cancelar</a>
                                </button>
                            </div>

                        </div>

                        <div className="sm:col-span-2 sm:col-start-4">

                            <div className="mt-2 font-bold">
                                <button onClick={actualizarDatos} className="font-sans text-white bg-violet-500 w-full rounded-full border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:max-w-xs sm:text-sm sm:leading-6 p-3">
                                    <a href="/">Modificar</a>
                                </button>
                            </div>

                        </div>

                        <div className="sm:col-span-6">
                            <div className="border-t-4 mx-3 p-2 border-gray-300"></div>
                            <h2 className="font-medium pb-3">Eliminar cuenta de psicologo</h2>
                            <div className="mt-2 font-bold">
                                <button onClick={abrirModalDarDeBajaCuenta} className="font-sans text-white bg-red-500 w-full rounded-lg border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:max-w-xs sm:text-sm sm:leading-6 p-3">
                                    <a >Eliminar cuenta</a>
                                </button>
                            </div>
                        </div>

                    </div>

                    <ToastContainer />

                </div>


                <Modal isOpen={isOpenEliminar} onOpenChange={onOpenChangeEliminar} size='3xl' scrollBehavior='inside'>
                    <ModalContent>
                        {(CerarModalDarDeBaja) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1">Confirmación</ModalHeader>
                                <ModalBody>
                                    <div className='flex justify-center'>
                                        <p className="text-center font-bold underline-offset-4">
                                            ¿Seguro que quiere dar de baja su cuenta? no se eliminar su información personal solo se dashabilitara su usuario
                                        </p>
                                    </div>
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="primary" variant="light" onPress={CerarModalDarDeBaja} >
                                        Cerrar
                                    </Button>
                                    <Button color="danger" variant="light" onPress={darDebajaCuenta}>
                                        Aceptar
                                    </Button>
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </Modal>


            </div>

        </form>
    )
}
