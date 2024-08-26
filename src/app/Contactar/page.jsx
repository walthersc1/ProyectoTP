"use client";
import React, { useState, useEffect } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import axios from "axios";

export default function ContactarPsicologo() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [contactInfo, setContactInfo] = useState({ correo: "", numtelefono: "" });
  const [selectedDate, setSelectedDate] = useState({
    nombre: "",
    sede: "",
    codigo: "",
    numtelefono: "",
    correo: "",
  });
  const [psicologo, setpsicologo] = useState([]);
  const handleDateChange = (event) => {
    const { name, value } = event.target;

    setSelectedDate({
      ...selectedDate,
      [name]: value,
    });
    buscarPsicologo()
  };

  const handleContactClick = (correo, numtelefono) => {
    setContactInfo({ correo, numtelefono });
    onOpen();
  };

  const buscarPsicologo = async () => {
    const respuesta = await axios.post('/api/contactar', selectedDate);
    setpsicologo(respuesta.data);
  };

  useEffect(() => {
    buscarPsicologo();
  }, [selectedDate]);


  return (

    <section className="space-y-12 pt-12 pb-12">

      <div className="border-b border-gray-900/10 p-16 ml-24 mr-24 bg-white rounded-lg">
        <h1 className="font-poppins font-bold sm:text-[60px] md:text-[50px] text-center">Psicólogos Disponibles</h1>
        <div className="pt-6 pb-6 grid gap-x-6 gap-y-8 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
              Nombre de Psicologo
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="nombre"
                onChange={handleDateChange}
                id="first-name"
                autoComplete="given-name"
                className="font-sans block w-full bg-gray-300 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 p-3"
              />
            </div>
          </div>

          <div className="sm:col-span-1">
            <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
              Código
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="codigo"
                onChange={handleDateChange}
                id="first-name"
                autoComplete="given-name"
                className="font-sans block bg-gray-300 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 p-3"
              />
            </div>
          </div>


          <div className="sm:col-span-1">
            <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
              Sede
            </label>
            <div className="mt-2">
              <select
                id="country"
                name="sede"
                onChange={handleDateChange}
                autoComplete="country-name"
                className="h-[36px] font-sans block bg-gray-300 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 p-3"
              >
                <option> </option>
                <option>San Isidro</option>
                <option>San Miguel</option>
                <option>Monterrico</option>
                <option>Villa</option>
              </select>
            </div>
          </div>

        </div>

        <div className="overflow-auto rounded-lg shadowp-6 pt-4">
          <table className="pl-4 pr-4 w-full border-collapse border-4 border-slate-900 text-center bg-white">
            <thead className='bg-teal-600 border-b-2 border-gray-200'>
              <tr>
                <th className="p-3 text-sm font-semibold tracking-wide text-center text-white" scope="col">Código</th>
                <th className="p-3 text-sm font-semibold tracking-wide text-center text-white" scope="col">Nombre y apellido</th>
                <th className="p-3 text-sm font-semibold tracking-wide text-center text-white" scope="col">Horario</th>
                <th className="p-3 text-sm font-semibold tracking-wide text-center text-white" scope="col">Sede</th>
                <th className="p-3 text-sm font-semibold tracking-wide text-center text-white" scope="col">Contacto</th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-300'>
              {psicologo.map((datos, index) => (
                <tr key={index} className='bg-white'>
                  <td className="p-3 text-sm whitespace-nowrap font-bold text-blue-500">{datos.coddocente}</td>
                  <td className="p-3 text-sm whitespace-nowrap text-gray-800">{datos.nombre}</td>
                  <td className="p-3 text-sm whitespace-nowrap text-gray-800">{datos.horario}</td>
                  <td className="p-3 text-sm whitespace-nowrap text-gray-800">{datos.sede}</td>

                  <button onClick={() => handleContactClick(datos.correo,datos.numtelefono)} className='text-[14px] font-bold border-2 border-black px-2 my-1 text-black rounded-full bg-slate-300'>Contactar</button>

                </tr>
              ))}

            </tbody>
          </table>
          <Modal isOpen={isOpen} onOpenChange={onOpenChange} size='3xl' scrollBehavior='inside'>
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">Información del psicologo</ModalHeader>
                  <ModalBody>
                    <div className='grid grid-cols-2 gap-4'>
                      <h2 className="text-end font-bold pr-4">Correo electronico: </h2>
                      <p className="underline underline-offset-4 text-sky-500">{contactInfo.correo}</p>
                      <h2 className="text-end font-bold pr-4">Número de telefono: </h2>
                      <p className="text-sky-500">{contactInfo.numtelefono}</p>

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
        </div>


      </div>

    </section>

  )

}