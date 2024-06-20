'use client'
import React, { useState, useEffect } from 'react';
import { Images } from '@/components/imagenes';
import { parseDate } from '@internationalized/date';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { today, getLocalTimeZone } from "@internationalized/date";
import axios from 'axios';

export default function Resultados() {
  const [getFiltro, setFiltro] = useState({
    nombre: "",
    estado: "",
    codigo: "",
  });

  const [getResultado, setResultado] = useState([]);
  const [modalData, setModalData] = useState(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleDateChange = (event) => {
    const { name, value } = event.target;
    setFiltro({
      ...getFiltro,
      [name]: value,
    });
  };

  const obtenerResultados = async () => {
   const resultados = await axios.post('/api/resultados', getFiltro);
    setResultado(resultados.data);
     
  };

  useEffect(() => {
  }, [handleDateChange]);

  const fetchModalData = async (idestudiante) => {
    try {
      console.log("Entrando a generar popup");
      const response = await axios.post('/api/resultados/obtenerDetalle',JSON.stringify(idestudiante) );
      console.log(response.data)
      setModalData(response.data);
      onOpen();
    } catch (error) {
      console.error('Error fetching details:', error);
    }
  };

  return (
    <section className="flex-col justify-center justify-items-center text-center">
      <div className="flex-none bg-slate-800 border border-slate-400 rounded-md m-16 p-16 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-30 relative">
        <h1 className="font-poppins font-bold ss:text-[60px] text-[52px] text-white ss:leading-[100.8px] leading-[75px]">Resultados</h1>
        <div className='grid md:grid-cols-2 sm:grid-cols-1'>
          <div className="flex-col p-3 gap-2">
            <h3 className="text-left text-white font-semibold">Nombre</h3>
            <div className="flex bg-white rounded-lg p-3 gap-3">
              {Images.account}
              <input
                name="nombre"
                type="text"
                onChange={handleDateChange}
                className='w-full rounded-md py-1 text-gray-900 sm:text-sm sm:leading-6 p-3'
              />
            </div>
          </div>
          <div className="flex-col p-3 gap-2">
            <h3 className="text-left text-white font-semibold">Estado de depresión</h3>
            <div className="flex bg-white rounded-lg p-3 gap-3">
              {Images.level}
              <select
                name="estado"
                onChange={handleDateChange}
                className="w-full rounded-md py-1.5 text-gray-900 sm:text-sm sm:leading-6 p-3"
              >
                <option value=""></option>
                <option value="Minima">Minima</option>
                <option value="Leve">Leve</option>
                <option value="Moderada">Moderada</option>
                <option value="Moderamente Grave">Moderamente Grave</option>
                <option value="Grave">Grave</option>
              </select>
            </div>
          </div>
          <div className="flex-col p-3 gap-2">
            <h3 className="text-left text-white font-semibold">Código</h3>
            <div className="flex bg-white rounded-lg p-3 gap-3">
              {Images.university}
              <input
                name="codigo"
                type="text"
                onChange={handleDateChange}
                className='w-full rounded-md py-1 text-gray-900 sm:text-sm sm:leading-6 p-3'
              />
            </div>
          </div>
        </div>
        <div className="overflow-auto rounded-lg shadow p-6">
          <table className="pl-4 pr-4 w-full border-collapse border-4 border-slate-900 text-center bg-white">
            <thead className='bg-teal-600 border-b-2 border-gray-200'>
              <tr>
                <th className="p-3 text-sm font-semibold tracking-wide text-center text-white" scope="col">Código</th>
                <th className="p-3 text-sm font-semibold tracking-wide text-center text-white" scope="col">Nombre y apellido</th>
                <th className="p-3 text-sm font-semibold tracking-wide text-center text-white" scope="col">Fecha</th>
                <th className="p-3 text-sm font-semibold tracking-wide text-center text-white" scope="col">Estado</th>
                <th className="p-3 text-sm font-semibold tracking-wide text-center text-white" scope="col">Edad</th>
                <th className="p-3 text-sm font-semibold tracking-wide text-center text-white" scope="col">Acción</th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-300'>
              {getResultado.map((resultado, index) => (
                <tr key={index}>
                  <td className='p-3 text-sm whitespace-nowrap text-gray-800'>{resultado.codestudiante}</td>
                  <td className='p-3 text-sm whitespace-nowrap text-gray-800'>{resultado.nombre}</td>
                  <td className='p-3 text-sm whitespace-nowrap text-gray-800'>{resultado.fechacreacion}</td>
                  <td className='p-3 text-sm whitespace-nowrap text-gray-800'>{resultado.gradodepresion}</td>
                  <td className='p-3 text-sm whitespace-nowrap text-gray-800'>{resultado.edad}</td>
                  <td>
                    <button onClick={() => fetchModalData(resultado)} className='text-[14px] font-bold border-2 border-black px-2 my-1 text-black rounded-full bg-slate-300'>
                      Detalles
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button onClick={obtenerResultados} className='text-[20px] shadow-lg font-bold h-12 w-1/2 text-slate-50 my-6 rounded-full bg-teal-400'>
          Buscar
        </button>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} size='3xl' scrollBehavior='inside'>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">Respuesta de cuestionario</ModalHeader>
                <ModalBody>
                  {modalData && (
                    <>
                      <div className='grid grid-cols-2'>
                        <div className="flex-col p-3 gap-2">
                          <h3 className="text-left text-black font-semibold">Nombre</h3>
                          <div className="flex bg-slate-400 rounded-lg p-3 gap-3">
                            {Images.account}
                            <input type="text" value={modalData.nombre} readOnly className='w-full bg-slate-400 rounded-md py-1 text-gray-900 sm:text-sm sm:leading-6 p-3' />
                          </div>
                        </div>
                        <div className="flex-col p-3 gap-2">
                          <h3 className="text-left text-black font-semibold">Estado de depresión</h3>
                          <div className="flex bg-slate-400 rounded-lg p-3 gap-3">
                            {Images.level}
                            <select value={modalData.gradodepresion} readOnly className="w-full bg-slate-400 rounded-md py-1.5 text-gray-900 sm:text-sm sm:leading-6 p-3">
                              <option value="Minima">Minima</option>
                              <option value="Leve">Leve</option>
                              <option value="Moderada">Moderada</option>
                              <option value="Moderamente Grave">Moderamente Grave</option>
                              <option value="Grave">Grave</option>
                            </select>
                          </div>
                        </div>
                        <div className="flex-col p-3 gap-2">
                          <h3 className="text-left text-black font-semibold">Código</h3>
                          <div className="flex bg-slate-400 rounded-lg p-3 gap-3">
                            {Images.university}
                            <input type="text" value={modalData.codestudiante} readOnly className='w-full bg-slate-400 rounded-md py-1 text-gray-900 sm:text-sm sm:leading-6 p-3' />
                          </div>
                        </div>
                      </div>
                      {modalData.respuestas.map((respuesta, index) => (
                        <div key={index} className='flex flex-col px-3 gap-2'>
                          <h2>Pregunta {index + 1}</h2>
                          <p className='bg-slate-300 p-3 text-justify'>{respuesta}</p>
                        </div>
                      ))}
                    </>
                  )}
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Cerrar
                  </Button>
                  <Button color="primary" onPress={onClose}>
                    Acción
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </section>
  );
}
