"use client";

import React from "react";
import { useState, useEffect,preventDefault } from "react";
import axios from "axios";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";

export default function InfoPersonal() {
    const consultaUsuario = async (e) => {
        const data = await axios.get('/api/getToken')
        const correo = data.data.email
        console.log(correo)
        const usuario = await axios.get(`/api/queries/${correo}`)
        return usuario.data;
    };
    const [carreras, setCarreras] = useState([]);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const { isOpen: isOpenEliminar, onClose: cerrarEliminar, onOpen: onOpenEliminar, onOpenChange: onOpenChangeEliminar } = useDisclosure();
    const [valoresInput, setValoresInput] = useState({
        idestudiante: "",
        nombre: "",
        apellido: "",
        numtelefono: "",
        edad: "",
        correo: "",
        codestudiante: "",
        codcarrera: "",
        fechanacimiento: "",
        fechacreacion: "",
        estado: "true",
    });

    useEffect(() => {
        consultaUsuario().then((res) => {

            setValoresInput({
                idestudiante: res.usuarios[0].idestudiante,
                nombre: res.usuarios[0].nombre,
                apellido: res.usuarios[0].apellido,
                numtelefono: res.usuarios[0].numtelefono,
                edad: res.usuarios[0].edad,
                correo: res.usuarios[0].correo,
                codestudiante: res.usuarios[0].codestudiante,
                codcarrera: res.usuarios[0].codcarrera,
                fechanacimiento: res.usuarios[0].fechanacimiento.slice(0, 10),
                fechacreacion: res.usuarios[0].fechacreacion,
                estado: res.usuarios[0].estado,
            });
        });

        const fetchCarreras = async () => {
            try {
                const RsCarreras = await axios.get('/api/queries/carreras');
                setCarreras(RsCarreras.data.datos.rows);
            } catch (error) {
                console.error('Error al obtener las carreras:', error);
            }
        };

        fetchCarreras();

    }, []);

    const handleChange = async (event) => {
        const { name, value } = event.target;

        setValoresInput({
            ...valoresInput,
            [name]: value,
        });
    };
    const CerarModalDarDeBaja = (e) =>{
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

    const darDebajaCuenta = async (event) => {
        axios.post(`/api/queries/`, valoresInput);
        await axios.post("/api/getToken/logout")
        window.location.reload();
    }

    const actualizarDatos = async (event) => {
        event.preventDefault()
        axios.post(`/api/queries/`, valoresInput);
    };

    const handleContactarClick = (e) => {
        e.preventDefault();
        onOpen();
    };

    return (
        <form>
            <div className="space-y-12  m-16">

                <div className="bg-neutral-50  rounded-3xl border-b border-gray-900/10 px-24 py-16">
                    <h1 className="text-xl font-bold leading-7 text-gray-900">Información Personal del Paciente</h1>
                    <p className="mt-1 text-sm leading-6 text-gray-600">Puede modificar su información personal aqui </p>

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-3">
                            <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                                Nombres
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="nombre"
                                    id="first-name"
                                    autoComplete="given-name"
                                    className="font-sans block bg-gray-300 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 p-3"
                                    onChange={handleChange}
                                    value={valoresInput.nombre}
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                                Apellidos
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="apellido"
                                    id="last-name"
                                    autoComplete="family-name"
                                    className="font-sans block bg-gray-300 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 p-3"
                                    onChange={handleChange}
                                    value={valoresInput.apellido}
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-2 sm:col-start-1">
                            <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
                                Telefono
                            </label>
                            <div className="mt-2">
                                <input
                                    type="tel"
                                    name="numtelefono"
                                    id="phone"
                                    autoComplete="address-level2"
                                    className="font-sans block bg-gray-300 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 p-3"
                                    onChange={handleChange}
                                    value={valoresInput.numtelefono}
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-2">
                            <label htmlFor="Age" className="block text-sm font-medium leading-6 text-gray-900">
                                Edad
                            </label>
                            <div className="m-2">
                                <input
                                    type="number"
                                    name="edad"
                                    id="Age"
                                    autoComplete="address-level1"
                                    className="font-sans block bg-gray-300 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 p-3"
                                    onChange={handleChange}
                                    value={valoresInput.edad}
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-2">
                            <label htmlFor="birth-date" className="block text-sm font-medium leading-6 text-gray-900">
                                Fecha de Nacimiento
                            </label>
                            <div className="mt-2">
                                <input
                                    type="date"
                                    name="fechanacimiento"
                                    id="birth-date"
                                    autoComplete="birth-date"
                                    className="font-sans block bg-gray-300 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 p-3"
                                    onChange={handleChange}
                                    value={valoresInput.fechanacimiento}
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-2">
                            <label htmlFor="student-code" className="block text-sm font-medium leading-6 text-gray-900">
                                Codigo de Estudiante
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="codestudiante"
                                    id="student-code"
                                    className="font-sans block bg-gray-300 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 p-3"
                                    onChange={handleChange}
                                    value={valoresInput.codestudiante}
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="mayor" className="block text-sm font-medium leading-6 text-gray-900">
                                Carrera
                            </label>
                            <div className="mt-2">
                                <select
                                    id="mayor"
                                    name="codcarrera"
                                    className="font-sans block bg-gray-300 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:max-w-xs sm:text-sm sm:leading-6 p-3"
                                    value={valoresInput.codcarrera}
                                    onChange={handleChange}
                                >
                                    <option value="0"></option>
                                    {carreras.map((row) => (
                                        <option key={row.idcarrera} value={row.idcarrera}>{row.carrera}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="sm:col-span-4">
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Correo
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="correo"
                                    type="email"
                                    autoComplete="email"
                                    className="font-sans block bg-gray-300 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 p-3"
                                    onChange={handleChange}
                                    value={valoresInput.correo}
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-4">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                Contraseña
                            </label>
                            <div className="mt-2">
                                <input
                                    id="contraseña"
                                    name="contraseña"
                                    type="password"
                                    autoComplete="password"
                                    placeholder="**********"
                                    className="font-sans block bg-gray-300 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-500 placeholder:text-gray-600 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 p-3"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-4">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                Confirmar contraseña
                            </label>
                            <div className="mt-2">
                                <input
                                    id="contraseña"
                                    name="contraseña"
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
                                    modificar
                                </button>
                            </div>

                        </div>

                        <div className="sm:col-span-6">
                            <div className="border-t-4 mx-3 p-2 border-gray-300"></div>

                            <div className="mt-2 font-bold">
                                <button onClick={handleContactarClick} className="font-sans text-white bg-violet-500 w-full rounded-full border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:max-w-xs sm:text-sm sm:leading-6 p-3">
                                    Modificar Contraseña
                                </button>
                            </div>

                            <h2 className="font-medium pb-3">Eliminar cuenta de paciente</h2>
                            <div className="mt-2 font-bold">
                                <button onClick={abrirModalDarDeBajaCuenta} className="font-sans text-white bg-red-500 w-full rounded-lg border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:max-w-xs sm:text-sm sm:leading-6 p-3">
                                    <a>Eliminar cuenta</a>
                                </button>
                            </div>
                        </div>

                    </div>

                    <Modal isOpen={isOpen} onOpenChange={onOpenChange} size='3xl' scrollBehavior='inside'>
                        <ModalContent>
                            {(onClose) => (
                                <>
                                    <ModalHeader className="flex flex-col gap-1">Información del psicologo</ModalHeader>
                                    <ModalBody>
                                        <div className='grid grid-cols-2 gap-4'>
                                            <h2 className="text-end font-bold pr-4">Correo electronico: </h2>
                                            <p className="underline underline-offset-4 text-sky-500">prueba@upc.pe.pe</p>
                                            <h2 className="text-end font-bold pr-4">Número de telefono: </h2>
                                            <p className="text-sky-500">987456115</p>

                                        </div>
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button color="danger" variant="light" onPress={onClose}>
                                            Close
                                        </Button>
                                        <Button color="primary" onPress={onClose}>
                                            Agendar Cita
                                        </Button>
                                    </ModalFooter>
                                </>
                            )}
                        </ModalContent>
                    </Modal>
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

            </div>

        </form>

    )
}