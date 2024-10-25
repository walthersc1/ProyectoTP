"use client";

import React from "react";
import { useState, useEffect, preventDefault } from "react";
import axios from "axios";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function InfoPersonal() {

    const [carreras, setCarreras] = useState([]);
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const [errors, setErrors] = useState({})
    const { isOpen: isOpenEliminar, onClose: cerrarEliminar, onOpen: onOpenEliminar, onOpenChange: onOpenChangeEliminar } = useDisclosure();
    const [values, setValoresInput] = useState({
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
        ConstActual: "",
        ConstNueva: "",
        ConstConfirm: "",
    });
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const año = new Date().getFullYear();

    useEffect(() => {

        const consultaUsuario = async (e) => {
            const data = await axios.get('/api/getToken')
            const correo = data.data.email
            //console.log(correo)
            const usuario = await axios.get(`/api/queries/${correo}`)
            //console.log(usuario.data)

            setValoresInput({
                idestudiante: usuario.data.idestudiante,
                nombre: usuario.data.nombre,
                apellido: usuario.data.apellido,
                numtelefono: String(usuario.data.numtelefono),
                edad: String(usuario.data.edad),
                correo: usuario.data.correo,
                codestudiante: usuario.data.codestudiante,
                codcarrera: String(usuario.data.codcarrera),
                fechanacimiento: usuario.data.fechanacimiento.slice(0, 10),
                fechacreacion: usuario.data.fechacreacion,
                estado: usuario.data.estado,
                ConstActual: "",
                ConstNueva: "",
                ConstConfirm: "",
            });

        };

        const fetchCarreras = async () => {
            try {
                const RsCarreras = await axios.get('/api/queries/carreras');
                setCarreras(RsCarreras.data.datos.rows);
            } catch (error) {
                console.error('Error al obtener las carreras:', error);
            }
        };
        
        consultaUsuario();
        fetchCarreras();

    }, []);

    const handleChange = async (event) => {
        const { name, value } = event.target;

        setValoresInput({
            ...values,
            [name]: value,
        });
    };
    const CerarModalDarDeBaja = (e) => {
        setValoresInput({
            ...values,
            estado: 'true',
        });
        cerrarEliminar()
    }
    const abrirModalDarDeBajaCuenta = (e) => {
        e.preventDefault()
        setValoresInput({
            ...values,
            estado: 'false',
        });
        onOpenEliminar(e)
    }

    const darDebajaCuenta = async (event) => {
        axios.post(`/api/queries/`, values);
        await axios.post("/api/getToken/logout")
        window.location.reload();
    }

    const actualizarDatos = async (event) => {
        event.preventDefault()
        if (await handleSubmit()) {
            console.log("Cuardando")
            await axios.post(`/api/queries/`, values);
            toast.success("Se guardaron los cambios")
        }
    };

    const handleContactarClick = (e) => {
        e.preventDefault();
        onOpen();
    };


    const handleSubmit = async (e) => {
        const validacionNum = /\d/
        const validationErrors = {};
        // personalisar mas los mensaje de error para nombre y apellido, la segunda condicion del if
        if (!values.nombre.trim() || !values.nombre.includes(" ")) {
            validationErrors.nombre = "Introduzca sus nombres"
        }
        if (validacionNum.test(values.nombre)) {
            validationErrors.nombre = "El nombre no puede contener números"  
        }
        if (!values.apellido.trim() || !values.apellido.includes(" ")) {
            validationErrors.apellido = "Introdusca sus apellidos"
        }
        if (regex.test(values.apellido)) {
            validationErrors.apellido = "El apellido no puede contener números"  
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
        if (parseInt(values.edad) > 99) {
            validationErrors.edad = "Edad no valida"
        }

        setErrors(validationErrors)
        console.log(Object.keys(validationErrors).length)
        const nErores = Object.keys(validationErrors).length
        if ( nErores == 0) {
            console.log("true")
            return true
        } else {
            return false
        }

    }

    const modificarContraseña = async () => {
        if(!values.ConstActual.trim()){
            toast.error("Por favor su contraseña actual")
            return
        }
        if (!values.ConstNueva.trim()) {
            toast.error("Por favor ingresar una contraseña nueva")
            return
        }if((String)(values.ConstNueva).length < 6 && (String)(values.ConstConfirm).length < 6){
            toast.error("La contraseña tiene que tener una longitud minima de 6")
            return
        }
         else {
            try {
                if (values.ConstNueva == values.ConstConfirm) {
                    const respuesta = await axios.put('/api/queries/contrasena/', values);
                    if (respuesta.status) {
                        toast.success(respuesta.data.message)
                        onClose()
                    }
                } else {
                    //Personalisar mejor la contraseña
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
                                    value={values.nombre}
                                /> {errors.nombre && <p className="text-red-400 text-left text-[13px]">{errors.nombre}</p>}
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
                                    value={values.apellido}
                                /> {errors.apellido && <p className="text-red-400 text-left text-[13px]">{errors.apellido}</p>}
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
                                    value={values.numtelefono}
                                /> {errors.numtelefono && <p className="text-red-400 text-left text-[13px]">{errors.numtelefono}</p>}
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
                                    value={values.edad}
                                /> {errors.edad && <p className="text-red-400 text-left text-[13px]">{errors.edad}</p>}
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
                                    value={values.fechanacimiento}
                                /> {errors.fechanacimiento && <p className="text-red-400 text-left text-[13px]">{errors.fechanacimiento}</p>}
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
                                    value={values.codestudiante}
                                /> {errors.codestudiante && <p className="text-red-400 text-left text-[13px]">{errors.codestudiante}</p>}
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
                                    value={values.codcarrera}
                                    onChange={handleChange}
                                >
                                    <option value="0"></option>
                                    {carreras.map((row) => (
                                        <option key={row.idcarrera} value={row.idcarrera}>{row.carrera}</option>
                                    ))}
                                </select> {errors.codcarrera && <p className="text-red-400 text-left text-[13px]">{errors.codcarrera}</p>}
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
                                    value={values.correo}
                                /> {errors.correo && <p className="text-red-400 text-left text-[13px]">{errors.correo}</p>}
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
                        <ToastContainer />
                    </div>

                    <Modal isOpen={isOpen} onOpenChange={onOpenChange} size='3xl' scrollBehavior='inside'>
                        <ModalContent>
                            {(onClose) => (
                                <>
                                    <ModalHeader className="flex flex-col gap-1">Modificación de contraseña para Paciente</ModalHeader>
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

            </div>

        </form>

    )
}