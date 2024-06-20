'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Images } from '@/components/imagenes';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
 

export default function AgendarCita() {
  const [selectedDate, setSelectedDate] = useState({
    iddocente: "1",
    fecha: new Date().toISOString().slice(0, 10),
    codestudiante: "",
    modalidad: "",
    lugar: "",
    horainicio: "",
    horafin: "",
  });
  const [students, setStudents] = useState([]);

  const updateTableData = () => {
    consultaUsuario(); // Llama a la función para actualizar los datos de la tabla
  };

  const handleDateChange = (event) => {
    const { name, value } = event.target;

    setSelectedDate({
      ...selectedDate,
      [name]: value,
    });
    updateTableData(); // Llama a la función para actualizar los datos de la tabla
  };

  const guardarCita = async () => {
    try {
      console.log("Entro a guardar");
 
      toast.success('Cita guardada satisfactoriamente');
      const response = await axios.put('/api/agregarcita', selectedDate);
      consultaUsuario();
      // Opcional: actualizar la lista de citas o mostrar una notificación de éxito
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  const consultaUsuario = async () => {
    try {
      const usuario = await axios.post('/api/agregarcita', selectedDate);

      if (Array.isArray(usuario.data)) {
        setStudents(usuario.data);
      } else {
        console.error('Error: La respuesta de la API no es un array.');
      }
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  useEffect(() => {
    updateTableData(); // Llama a fetchData cuando el componente se monta inicialmente
  }, [selectedDate]); // Vacío para que se ejecute solo una vez al montar el componente

  return (

    <section className="flex-col justify-center justify-items-center text-center">
      <div className=" flex-none bg-slate-800 border border-slate-400 rounded-md m-16 p-16 shadow-lg
      backdrop-filter backdrop-blur-sm bg-opacity-30 relative">
        <h1 className="font-poppins font-bold ss:text-[60px] text-[52px] text-white ss:leading-[100.8px] leading-[75px] pb-3">Agregar Cita</h1>
        <div className='grid md:grid-cols-3 sm:grid-cols-1 gap-4'>
          <div className="flex-col p-3 gap-2">
            <h3 className="text-left text-white font-semibold">Fecha</h3>
            <div className="flex bg-white rounded-lg p-3 gap-3">
              <input
                title='date'
                type="date"
                name="fecha"
                value={selectedDate.fecha}
                onChange={handleDateChange}
                className='w-full rounded-md py-1 text-gray-900 sm:text-sm sm:leading-6 p-3 appearance-none'
              />
            </div>
          </div>
          <div className="flex-col p-3 gap-2">
            <h3 className="text-left text-white font-semibold">Modalidad</h3>
            <div className="flex bg-white rounded-lg p-3 gap-3">
              {Images.workplace}
              <select
                title='modalidad'
                name='modalidad'
                className="w-full rounded-md py-1.5 text-gray-900 sm:text-sm sm:leading-6 p-3"
                onChange={handleDateChange}
              >
                <option>Presencial</option>
                <option>Virtual</option>
              </select>
            </div>
          </div>
          <div className="flex-col p-3 gap-2">
            <h3 className="text-left text-white font-semibold">Lugar</h3>
            <div className="flex bg-white rounded-lg p-3 gap-3">
              {Images.meeting}
              <input
                title='lugar'
                type="text"
                name="lugar"
                onChange={handleDateChange}
                className='w-full rounded-md py-1 text-gray-900 sm:text-sm sm:leading-6 p-3'
              />
            </div>
          </div>
          <div className="flex-col p-3 gap-2">
            <h3 className="text-left text-white font-semibold">Cod. Estudiante</h3>
            <div className="flex bg-white rounded-lg p-3 gap-3">
              {Images.student}
              <input
                title='codestudiante'
                type="text"
                name="codestudiante"
                onChange={handleDateChange}
                className='w-full rounded-md py-1 text-gray-900 sm:text-sm sm:leading-6 p-3'
              />
            </div>
          </div>
          <div className="flex-col p-3 gap-2">
            <h3 className="text-left text-white font-semibold">Hora Inicio</h3>
            <div className="flex bg-white rounded-lg p-3 gap-3">
              <input
                title='horainicio'
                type="time"
                name="horainicio"
                onChange={handleDateChange}
                className='w-full rounded-md py-1 text-gray-900 sm:text-sm sm:leading-6 p-3'
              />
            </div>
          </div>
          <div className="flex-col p-3 gap-2">
            <h3 className="text-left text-white font-semibold">Hora Fin</h3>
            <div className="flex bg-white rounded-lg p-3 gap-3">
              <input
                title='horafin'
                type="time"
                name="horafin"
                onChange={handleDateChange}
                className='w-full rounded-md py-1 text-gray-900 sm:text-sm sm:leading-6 p-3'
              />
            </div>
          </div>
        </div>

        <div className="max-h-[400px] overflow-y-auto overflow-x-auto pt-8 rounded-lg shadowp-6">
        <table className="pl-4 pr-4 w-full border-collapse border-4 border-slate-900 text-center bg-white">
            <thead className='bg-teal-600 border-b-2 border-gray-200'>
              <tr className='border-b-2 border-gray-200'>
                <th className="p-3 text-base font-semibold tracking-wide text-center text-white" scope="col">Cod. Estudiante</th>
                <th className='p-3 text-base font-semibold tracking-wide text-center text-white' scope="col">Nom. Estudiante</th>
                <th className='p-3 text-base font-semibold tracking-wide text-center text-white' scope="col">Modalidad</th>
                <th className='p-3 text-base font-semibold tracking-wide text-center text-white' scope="col">Lugar</th>
                <th className='p-3 text-base font-semibold tracking-wide text-center text-white' scope="col">H. Inicio</th>
                <th className='p-3 text-base font-semibold tracking-wide text-center text-white' scope="col">H. Fin</th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-300'>
              {students.map((student, index) => (
                <tr key={index} className=''>
                  <td className='p-3 text-sm whitespace-nowrap text-gray-800'>{student.codestudiante}</td>
                  <td className='p-3 text-sm whitespace-nowrap text-gray-800'>{student.nombre}</td>
                  <td className='p-3 text-sm whitespace-nowrap text-gray-800 capitalize'>{student.modalidad}</td>
                  <td className='p-3 text-sm whitespace-nowrap text-gray-800 capitalize'>{student.lugar}</td>
                  <td className='p-3 text-sm whitespace-nowrap text-gray-800'>{student.horainicio}</td>
                  <td className='p-3 text-sm whitespace-nowrap text-gray-800'>{student.horafin}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <button className='text-[20px] shadow-lg font-bold h-12 w-1/2 text-slate-50 my-6 
          rounded-full bg-teal-400' onClick={guardarCita}>Agregar</button>
            <div>
    <ToastContainer />
    </div>
      </div>
    </section>
    
  );
}
