'use client'
import axios from 'axios';
import React, { useState } from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function RegistrarPsicologo() {
    const año = new Date().getFullYear();
    /*const actualizarDatos = async (e) => {
        e.preventDefault();
        axios.PUT(`/api/docente/${1}`, values);
    };*/

    const [values, setValues] = useState({
        nombre: "",
        apellido: "",
        numtelefono: "",
        edad: "",
        email: "",
        coddocente: "",
        fechanacimiento: "",
        password: '',
        confirmpassword: '',
    })

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    const [errors, setErrors] = useState({})

    const handleChange = (e) => {

        const { name, value } = e.target;
        setValues({ ...values, [name]: value })
    }
    const inicioSesion = async (e) => {
        try {
            const response = await axios.post('/api/auth', values)
            if (response.status == 200) {
                window.location.href = '/';
            }
        } catch (error) {
            console.log(error)
        }
    }
    const GuardarRegistor = async (e) => {
        e.preventDefault()
        try {
            const resultado = await axios.put(`/api/docente/`, values)
            console.log(resultado.status)
            if (resultado.status == 200) {
                inicioSesion()
            }
        } catch (error) {
            console.log(error.response)
            if (error.response.status == 404) {
                toast.error(error.response.data.error)
            }
        }
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

        if (!values.email.trim()) {
            validationErrors.email = "Introducsca su correo"
        } else if (!regex.test(values.email)) {
            validationErrors.email = "Correo no valido"
        }

        if (!values.numtelefono.trim()) {
            validationErrors.numtelefono = "Se requiere ingresar un número de telefono"
        } else if (!Number.isFinite(Number(values.numtelefono)) || values.numtelefono.length != 9) {
            validationErrors.numtelefono = "Número de telefóno no número no valido"
        }

        if (!values.fechanacimiento.trim()) {
            validationErrors.fechanacimiento = "Debe de ingresar su fecha de nacimiento"
        } else {
            const edadPorFecha = año - parseInt(values.fechanacimiento.slice(0, 4))
            if (values.edad != edadPorFecha) {
                validationErrors.fechanacimiento = "La fecha no coincide con su edad "
            }
        }

        if (!values.password.trim()) {
            validationErrors.password = "Se requiere ingresar contraseña"
        } else if (values.password.length < 6) {
            validationErrors.password = "Contraseña debe ser mayor a 6 digitos"
        }

        if (values.confirmpassword !== values.password) {
            validationErrors.confirmpassword = "Contraseña no es igual"
        }

        if (Object.keys(validationErrors).length == 0) {
            GuardarRegistor(e)
        }
        setErrors(validationErrors)


    }
    return (
        <form onSubmit={handleSubmit}>
            <div className="flex-col bg-slate-800 border border-slate-400 rounded-md m-16 p-8 shadow-lg
            backdrop-filter backdrop-blur-sm bg-opacity-30 relative space-y-12">

                <div className="px-16 py-16">
                    <h1 className="text-[30px] font-bold leading-7 text-white">Regístrate como Psicólogo</h1>
                    <p className="mt-1 text-sm leading-6 font-semibold text-teal-400">Por favor introducir sus datos personales </p>

                    <div className="flex justify-center items-center mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-3">
                            <label htmlFor="nombre" className="block text-sm font-medium leading-6 text-white">
                                Nombres
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="nombre"
                                    id="nombre"
                                    onChange={handleChange}
                                    autoComplete="given-name"
                                    className="font-sans block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 p-3"
                                />
                                {errors.nombre && <p className="text-red-400 text-left text-[13px]">{errors.nombre}</p>}
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="apellido" className="block text-sm font-medium leading-6 text-white">
                                Apellidos
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="apellido"
                                    id="apellido"
                                    onChange={handleChange}
                                    autoComplete="family-name"
                                    className="font-sans block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 p-3"
                                />
                                {errors.apellido && <p className="text-red-400 text-left text-[13px]">{errors.apellido}</p>}
                            </div>
                        </div>

                        <div className="sm:col-span-2 sm:col-start-1">
                            <label htmlFor="numtelefono" className="block text-sm font-medium leading-6 text-white">
                                Telefono
                            </label>
                            <div className="mt-2">
                                <input
                                    type="tel"
                                    name="numtelefono"
                                    id="numtelefono"
                                    onChange={handleChange}
                                    autoComplete="address-level2"
                                    className="font-sans block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 p-3"
                                />
                                {errors.numtelefono && <p className="text-red-400 text-left text-[13px]">{errors.numtelefono}</p>}
                            </div>
                        </div>

                        <div className="sm:col-span-2">
                            <label htmlFor="edad" className="block text-sm font-medium leading-6 text-white">
                                Edad
                            </label>
                            <div className="mt-2">
                                <input
                                    type="number"
                                    name="edad"
                                    id="edad"
                                    onChange={handleChange}
                                    autoComplete="address-level1"
                                    className="font-sans block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 p-3"
                                />
                                {errors.edad && <p className="text-red-400 text-left text-[13px]">{errors.edad}</p>}
                            </div>
                        </div>

                        <div className="sm:col-span-2">
                            <label htmlFor="fechanacimiento" className="block text-sm font-medium leading-6 text-white">
                                Fecha de Nacimiento
                            </label>
                            <div className="mt-2">
                                <input
                                    type="date"
                                    name="fechanacimiento"
                                    id="fechanacimiento"
                                    onChange={handleChange}
                                    autoComplete="birth-date"
                                    className="font-sans block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 p-3"
                                />
                                {errors.fechanacimiento && <p className="text-red-400 text-left text-[13px]">{errors.fechanacimiento}</p>}
                            </div>
                        </div>

                        <div className="sm:col-span-4">
                            <label htmlFor="correo" className="block text-sm font-medium leading-6 text-white">
                                Correo
                            </label>
                            <div className="mt-2">
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    autoComplete="email"
                                    onChange={handleChange}
                                    className="font-sans block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 p-3"
                                />
                                {errors.email && <p className="text-red-400 text-left text-[13px]">{errors.email}</p>}
                            </div>
                        </div>

                        <div className="sm:col-span-2">
                            <label htmlFor="coddocente" className="block text-sm font-medium leading-6 text-white">
                                Cod Docente
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="coddocente"
                                    id="coddocente"
                                    autoComplete="email"
                                    className="font-sans block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 p-3"
                                    onChange={handleChange}
                                />
                                {errors.coddocente && <p className="text-red-400 text-left text-[13px]">{errors.coddocente}</p>}
                            </div>
                        </div>

                        <div className="sm:col-span-4">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-white">
                                Contraseña
                            </label>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="password"
                                    onChange={handleChange}
                                    className="font-sans block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 p-3"
                                />
                                {errors.password && <p className="text-red-400 text-left text-[13px]">{errors.password}</p>}
                            </div>
                        </div>

                        <div className="sm:col-span-4">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-white">
                                Confirmar Contraseña
                            </label>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="confirmpassword"
                                    type="password"
                                    autoComplete="password"
                                    onChange={handleChange}
                                    className="font-sans block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 p-3"
                                />
                                {errors.confirmpassword && <p className="text-red-400 text-left text-[13px]">{errors.confirmpassword}</p>}
                            </div>
                        </div>

                        <div className="sm:col-span-2 sm:col-start-3">

                            <div className="mt-2 font-bold">
                                <button className="font-sans text-white bg-teal-500 w-full rounded-full border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:max-w-xs sm:text-sm sm:leading-6 p-3">
                                    <a> Registrar </a>
                                </button>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
            <ToastContainer />

        </form>
    )
}
