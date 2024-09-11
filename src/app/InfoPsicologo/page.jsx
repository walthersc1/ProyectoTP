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

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const [errors, setErrors] = useState({})
    const año = new Date().getFullYear();
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const { isOpen: isOpenEliminar, onClose: cerrarEliminar, onOpen: onOpenEliminar, onOpenChange: onOpenChangeEliminar } = useDisclosure();
    const [values, setValores] = useState({
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
        ConstActual:"",
        ConstNueva:"",
        ConstConfirm:"",
    });

    useEffect(() => {
        consultaUsuario().then((res) => {

            setValores({
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
                estado: "true",
                ConstActual:"",
                ConstNueva:"",
                ConstConfirm:"",
            });
        });
    }, []);

    const handleChange = async (event) => {
        const { name, value } = event.target;
        setValores({
            ...values,
            [name]: value,
        });
    };



    const actualizarDatos = async (e) => {
        e.preventDefault();
        if (handleSubmit) {
            axios.post(`/api/docente/${values.correo}`, values);
            toast.success("Se actualizo los datos de manera correcta")
        }
    };
    const darDebajaCuenta = async (event) => {
        axios.post(`/api/docente/${values.correo}`, values);
        await axios.post("/api/getToken/logout")
        window.location.reload();
    }

    const CerarModalDarDeBaja = (e) => {
        setValores({
            ...values,
            estado: 'true',
        });
        cerrarEliminar()
    }
    const modificarContraseña = async () => {
        if (!values.ConstActual.trim()){
            toast.error("Por favor ingresar su contraseña actual")
            return
        }
        if (!values.ConstNueva.trim()) {
            toast.error("Por favor ingresar una contraseña nueva")
        } else {
            try {
                if (values.ConstNueva == values.ConstConfirm) {
                    const respuesta = await axios.put('/api/docente/', values);
                    if (respuesta.status) {
                        toast.success(respuesta.data.message)
                        onClose()
                    }
                } else {
                    toast.error("No coninciden las contraseñas")
                }
            } catch (error) {
                console.error(error.response.data.message)
                if (error.response.status == 404) {
                    toast.error(error.response.data.message)
                }
            }
        }
    }

    const abrirModalDarDeBajaCuenta = (e) => {
        e.preventDefault()
        setValores({
            ...values,
            estado: 'false',
        });
        onOpenEliminar(e)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const validationErrors = {}
        console.log(values)

        if (!values.nombre.trim()) {
            validationErrors.nombre = "Introdusca su apellido"
        }

        if (!values.apellido.trim()) {
            validationErrors.apellido = "Introdusca su apellido"
        }

        if (!values.coddocente.trim()) {
            validationErrors.coddocente = "Introdusca su apellido"
        }

        if (!values.edad.trim()) {
            validationErrors.edad = "Introdusca su edad"
        }

        if (!values.correo.trim()) {
            validationErrors.correo = "Introducsca su correo"
        } else if (!regex.test(values.correo)) {
            validationErrors.correo = "Correo no valido"
        }

        if (!values.numtelefonico.trim()) {
            validationErrors.numtelefonico = "Se requiere ingresar un número de telefono"
        } else if (!Number.isFinite(Number(values.numtelefonico)) || values.numtelefonico.length != 9) {
            validationErrors.numtelefonico = "Número de telefóno no número no valido"
        }

        if (!values.fechanacimiento.trim()) {
            validationErrors.fechanacimiento = "Debe de ingresar su fecha de nacimiento"
        } else {
            const edadPorFecha = año - parseInt(values.fechanacimiento.slice(0, 4))
            if (values.edad != edadPorFecha) {
                validationErrors.fechanacimiento = "La fecha no coincide con su edad "
            }
        }
        if (!values.horainicio.trim()) {
            validationErrors.horainicio = "Por favor ingresa una hora de inicio"
        }
        if (!values.horafin.trim()) {
            validationErrors.horafin = "Por favor ingrese una hora de fin"
        }

        if (values.horainicio > values.horafin) {
            validationErrors.horafin = "La hora de fin debe se mayor a la hora de inicio"
        }
        if (Object.keys(validationErrors).length == 0) {
            return true
        } else {
            return false
        }
        setErrors(validationErrors)
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
                                    value={values.nombre}
                                />{errors.nombre && <p className="text-red-400 text-left text-[13px]">{errors.nombre}</p>}
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
                                    value={values.apellido}
                                />{errors.apellido && <p className="text-red-400 text-left text-[13px]">{errors.apellido}</p>}
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
                                    value={values.numtelefonico}
                                />{errors.numtelefonico && <p className="text-red-400 text-left text-[13px]">{errors.numtelefonico}</p>}
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
                                    value={values.edad}
                                />{errors.edad && <p className="text-red-400 text-left text-[13px]">{errors.edad}</p>}
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
                                    value={values.fechanacimiento}
                                />{errors.fechanacimiento && <p className="text-red-400 text-left text-[13px]">{errors.fechanacimiento}</p>}
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
                                    value={values.coddocente}
                                />{errors.coddocente && <p className="text-red-400 text-left text-[13px]">{errors.coddocente}</p>}
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
                                    value={values.correo}
                                />{errors.correo && <p className="text-red-400 text-left text-[13px]">{errors.correo}</p>}
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
                                    value={values.horainicio}
                                    className="font-sans block bg-gray-300 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 p-3"
                                />{errors.horainicio && <p className="text-red-400 text-left text-[13px]">{errors.horainicio}</p>}
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
                                    value={values.horafin}
                                    className="font-sans block bg-gray-300 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 p-3"
                                />{errors.horafin && <p className="text-red-400 text-left text-[13px]">{errors.horafin}</p>}
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

                            <h2 className="font-medium pb-3">Modificar Contraseña</h2>
                            <div className="mt-2 font-bold">
                                <button onClick={onOpen} className="font-sans text-white bg-violet-500 w-full rounded-full border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:max-w-xs sm:text-sm sm:leading-6 p-3">
                                    Modificar
                                </button>
                            </div>
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

                <Modal isOpen={isOpen} onOpenChange={onOpenChange} size='3xl' scrollBehavior='inside'>
                        <ModalContent>
                            {(onClose) => (
                                <>
                                    <ModalHeader className="flex flex-col gap-1">Modificación de contraseña para Psicologo</ModalHeader>
                                    <ModalBody>
                                        <div className="sm:col-span-4">
                                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                                Contreseña Actual
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    id="contraseña"
                                                    name="ConstActual"
                                                    type="password"
                                                    autoComplete="password"
                                                    placeholder="**********"
                                                    onChange={handleChange}
                                                    className="font-sans block bg-gray-300 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-500 placeholder:text-gray-600 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 p-3"
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-4">
                                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                                Nueva Contraseña
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    id="contraseña"
                                                    name="ConstNueva"
                                                    type="password"
                                                    autoComplete="password"
                                                    placeholder="**********"
                                                    onChange={handleChange}
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
                                                    name="ConstConfirm"
                                                    type="password"
                                                    autoComplete="password"
                                                    placeholder="**********"
                                                    onChange={handleChange}
                                                    className="font-sans block bg-gray-300 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-500 placeholder:text-gray-600 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 p-3"
                                                />
                                            </div>
                                        </div>
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button color="danger" variant="light" onPress={onClose}>
                                            Cancelar
                                        </Button>
                                        <Button color="primary" onPress={modificarContraseña}>
                                            Modificar Contraseña
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

        </form>
    )
}
