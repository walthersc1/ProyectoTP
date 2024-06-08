"use client";

import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
 
export default function InfoPersonal() {

    const id = 2;
    const consultaUsuario = async (e) => {
        /*const usuario = await fetch(`http://localhost:3000/api/queries/${id}`,{
            method:'GET',
            headers:{
            "Content-Type": "application/json",
        }
        });*/
        const usuario = await axios.get(`http://localhost:3000/api/queries/${id}`)
        return usuario.data;
      };
    
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
        estado: "",
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
      }, []);
    
      const handleChange = async (event) => {
        const { name, value } = event.target;
        //console.log(name + "-" + value);
        setValoresInput({
          ...valoresInput,
          [name]: value,
        });
      };
      /*
      const datosquery = {
        idestudiante: valoresInput.idestudiante,
        nombre: valoresInput.nombre,
        apellido: valoresInput.apellido,
        numtelefonico: valoresInput.numtelefonico,
        edad: valoresInput.edad,
        correo: valoresInput.correo,
        codestudiante: valoresInput.codestudiante,
        codcarrera: valoresInput.codcarrera,
        fechanacimiento: valoresInput.fechanacimiento.slice(0, 10),
        fechacreacion: valoresInput.fechacreacion,
        estado: valoresInput.estado,
      }
*/
      const actualizarDatos = async (e) => {
        e.preventDefault();
        axios.post(`/api/queries/`,valoresInput);
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
                            <option>Ingeniería de Sistema de Información</option>
                            <option>Ingeniería de Software</option>
                            <option>Ciencias de la computación</option>
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
                            modificar
                        </button>
                        </div>

                    </div>

                    <div className="sm:col-span-6">
                        <div className="border-t-4 mx-3 p-2 border-gray-300"></div>
                        <h2 className="font-medium pb-3">Eliminar cuenta de paciente</h2>
                        <div className="mt-2 font-bold">
                        <button className="font-sans text-white bg-red-500 w-full rounded-lg border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:max-w-xs sm:text-sm sm:leading-6 p-3">
                            <a href="/Eliminar">Eliminar cuenta</a>
                        </button>
                        </div>
                    </div>
                    
                </div>
            </div>

        </div>

    </form>
    
  )
}