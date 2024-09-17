'use client'
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from 'next/navigation';

export default function RegistrarPaciente() {


    const route = useRouter();
    const [values, setValues] = useState({
        nombre: "",
        apellido: "",
        numtelefono: "",
        edad: "",
        correo: "",
        codestudiante: "",
        codcarrera: "",
        fechanacimiento: "",
        fechacreacion: "",
        password: '',
        confirmpassword: '',
    })

    const [carreras, setCarreras] = useState([]);

    useEffect(() => {
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

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    const [errors, setErrors] = useState({})

    const handleChange = (event) => {
        const { name, value } = event.target;
        setValues({
            ...values,
            [name]: value
        });
    }

    const año = new Date().getFullYear();

    const toasterror = (message) => {

        toast.error(message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = {};
        console.log(values)
        // personalisar mas los mensaje de error para nombre y apellido, la segunda condicion del if
        if (!values.nombre.trim() || !values.nombre.includes(" ")) {
            validationErrors.nombre = "Introdusca sus nombres"
        }
        if (!values.apellido.trim() || !values.apellido.includes(" ")) {
            validationErrors.apellido = "Introdusca sus apellidos"
        }

        if (!values.edad.trim()) {
            validationErrors.edad = "Introdusca su edad"
        }

        if (!values.codestudiante.trim()) {
            validationErrors.codestudiante = "Introdusca su código de estudiante"
        }
        if (values.codestudiante.length > 11) {
            validationErrors.codestudiante = "Código no valido, demasiados caracteres"
        }

        if (!values.codcarrera.trim()) {
            validationErrors.codcarrera = "Introdusca su carrera"
        }

        if (!values.correo.trim()) {
            validationErrors.correo = "Se requiere ingresar correo "
        } else if (!regex.test(values.correo)) {
            validationErrors.correo = "Correo no valido"
        }

        if (!values.numtelefono.trim()) {
            validationErrors.numtelefono = "Se requiere ingresar un número de telefono"
        } else if (isNaN(parseInt(values.numtelefono), 10) || values.numtelefono.length != 9) {
            validationErrors.numtelefono = "Numero de telefóno no valido"
        }

        if (!values.fechanacimiento.trim()) {
            validationErrors.fechanacimiento = "Debe de ingresar sus apellidos"
        } else {
            const edadPorFecha = año - parseInt(values.fechanacimiento.slice(0, 4))
            if (values.edad != edadPorFecha) {
                validationErrors.fechanacimiento = "La fecha no coincide con su edad "
            }
        }

        if (!values.password.trim()) {
            validationErrors.password = "Se requiere ingresar contraseña"
        } else if (values.password.length < 6) {
            validationErrors.email = "Contraseña debe ser mayor a 6 digitos"
        }


        if (values.confirmpassword !== values.password) {
            validationErrors.confirmpassword = "Contraseña no es igual"
        }



        setErrors(validationErrors)
        try {


            if (Object.keys(validationErrors).length == 0) {

                console.log("Entrando a la consulta")
                const result = await axios.put(`/api/queries`, values)
                toast.success("Se creo el usuario de manera correcta")
            }
        } catch (error) {
            console.log(error.response)
            if (error.response.status == 500) {
                toasterror(error.response.data.message)
            }
        }
    }



    return (
        <form onSubmit={handleSubmit}>
            <div className="flex-col bg-slate-800 border border-slate-400 rounded-md m-16 p-8 shadow-lg
                backdrop-filter backdrop-blur-sm bg-opacity-30 relative space-y-12">

                <div className="px-16 py-16">
                    <h1 className="text-[30px] font-bold leading-7 text-white">Regístrate como Paciente</h1>
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
                                /> {errors.nombre && <p className="text-red-400 text-left text-[13px]">{errors.nombre}</p>}
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
                                />{errors.apellido && <p className="text-red-400 text-left text-[13px]">{errors.apellido}</p>}
                            </div>
                        </div>

                        <div className="sm:col-span-2 sm:col-start-1">
                            <label htmlFor="numtelefonico" className="block text-sm font-medium leading-6 text-white">
                                Telefono
                            </label>
                            <div className="mt-2">
                                <input
                                    type="tel"
                                    name="numtelefono"
                                    id=""
                                    onChange={handleChange}
                                    autoComplete="address-level2"
                                    className="font-sans block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 p-3"
                                />{errors.numtelefono && <p className="text-red-400 text-left text-[13px]">{errors.numtelefono}</p>}
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
                                />{errors.edad && <p className="text-red-400 text-left text-[13px]">{errors.edad}</p>}
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
                                    id="birth-date"
                                    onChange={handleChange}
                                    autoComplete="birth-date"
                                    className="font-sans block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 p-3"
                                />{errors.fechanacimiento && <p className="text-red-400 text-left text-[13px]">{errors.fechanacimiento}</p>}
                            </div>
                        </div>

                        <div className="sm:col-span-2">
                            <label htmlFor="codestudiante" className="block text-sm font-medium leading-6 text-white">
                                Codigo de Estudiante
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="codestudiante"
                                    id="codestudiante"
                                    onChange={handleChange}
                                    className="font-sans block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 p-3"
                                />{errors.codestudiante && <p className="text-red-400 text-left text-[13px]">{errors.codestudiante}</p>}
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="codcarrera" className="block text-sm font-medium leading-6 text-white">
                                Carrera
                            </label>
                            <div className="mt-2">
                                <select
                                    id="codcarrera"
                                    name="codcarrera"
                                    onChange={handleChange}
                                    className="font-sans block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:max-w-xs sm:text-sm sm:leading-6 p-3"
                                >
                                    <option value="0"></option>
                                    {carreras.map((row) => (
                                        <option key={row.idcarrera} value={row.idcarrera}>{row.carrera}</option>
                                    ))}
                                </select>{errors.codcarrera && <p className="text-red-400 text-left text-[13px]">{errors.codcarrera}</p>}
                            </div>
                        </div>

                        <div className="sm:col-span-4">
                            <label htmlFor="correo" className="block text-sm font-medium leading-6 text-white">
                                Correo
                            </label>
                            <div className="mt-2">
                                <input
                                    id="correo"
                                    name="correo"
                                    type="email"
                                    autoComplete="email"
                                    onChange={handleChange}
                                    className="font-sans block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 p-3"
                                />
                                {errors.correo && <p className="text-red-400 text-left text-[13px]">{errors.correo}</p>}
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
                                    <a >Registrar</a>
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
