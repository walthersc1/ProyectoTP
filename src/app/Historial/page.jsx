'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { Images } from '@/components/imagenes';

export default function Historial() {

  const [getResultado, setResultado] = useState([]);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [modalData, setModalData] = useState(null);
  const [datosEstudiante, setdatosEstudiante] = useState({
    codigo: "",
  });
  useEffect(() => {
    const obtenerDatosUsuario = async (e) => {
      const data = await axios.get('/api/getToken')
      const correo = data.data.email
      const usuario = await axios.get(`/api/queries/${correo}`)
      setdatosEstudiante({
        codigo: usuario.data.codestudiante,
      })
    };
    obtenerDatosUsuario()

  }, []);

  const [botResponses, setBotResponses] = useState([
    'Describa en detalle cómo ha experimentado la falta de interés o placer en actividades que antes disfrutaba. ¿En qué tipo de actividades ha notado este cambio y qué tan intenso ha sido este desinterés?',
    'Exprese con sus palabras cómo ha percibido su estado de ánimo. ¿Siente que ha experimentado desánimo, falta de esperanza o se ha sentido decaído/triste? ¿En qué momentos o situaciones ha notado estas emociones con mayor intensidad?',
    'Describa detalladamente sus patrones de sueño. ¿Ha tenido problemas para conciliar el sueño o se despierta con frecuencia durante la noche? ¿Sus horas de sueño han aumentado o disminuido últimamente? ¿Cómo han impactado estos cambios en su estado de ánimo?',
    'Exprese con sus palabras cómo ha experimentado los niveles de energía. ¿Ha sentido cansancio o falta de energía constantemente? ¿En qué actividades o momentos del día ha notado esta sensación con mayor intensidad? ¿Cómo ha afectado esto a su vida cotidiana?',
    'Describa detalladamente cómo han sido sus hábitos alimenticios. ¿Ha perdido el apetito o ha sentido una necesidad excesiva de comer? ¿Ha notado cambios en sus hábitos alimenticios? ¿Cómo han impactado estos cambios en su estado de ánimo y salud física?',
    'Exprese con sus palabras cómo se ha sentido consigo mismo(a). ¿Ha experimentado sentimientos de culpa, vergüenza, baja autoestima o inutilidad? ¿En qué situaciones o pensamientos ha notado estos sentimientos con mayor intensidad? ¿Cómo ha afectado esto a su imagen personal y a sus relaciones?',
    'Describa detalladamente cómo ha sido su capacidad de concentración. ¿Le ha costado enfocarse en tareas que antes le resultaban fáciles? ¿Ha notado dificultad para prestar atención o recordar información? ¿Durante qué momentos o actividades ha percibido esta dificultad con mayor intensidad? ¿Qué impacto tuvo en su rendimiento académico?',
    'Exprese con sus palabras cómo ha sido su comportamiento motor. ¿Ha notado cambios en su ritmo de movimiento o en su forma de hablar? ¿Las personas a su alrededor han comentado algo sobre estos cambios? ¿Cómo han afectado estos cambios a sus actividades diarias y académicas?',
    'Describa detalladamente si ha tenido pensamientos relacionados con la muerte o autolesiones. ¿Con qué frecuencia e intensidad ha tenido estos pensamientos? ¿Ha considerado llevar a cabo alguno de estos pensamientos? ¿Qué emociones o situaciones los han desencadenado?'
  ]);


  const fetchModalData = async () => {
    try {
      console.log("Entrando a generar popup");
      const response = await axios.post('/api/resultados', JSON.stringify(datosEstudiante));
      //console.log(response.data)
      setResultado(response.data)

    } catch (error) {
      console.error('Error fetching details:', error);
    }
  };

  const mostrarModal = async (idestudiante) => {
    try {
      console.log("Entrando a generar popup");
      const response = await axios.post('/api/resultados/obtenerDetalle', JSON.stringify(idestudiante));
      console.log(response.data)
      setModalData(response.data);
      onOpen();
    } catch (error) {
      console.error('Error fetching details:', error);
    }
  };

  useEffect(() => {
    fetchModalData()
  }, [datosEstudiante]);
  return (
    <section className="flex-col justify-center justify-items-center text-center">
      <div className='flex-none bg-slate-800 border border-slate-400 rounded-md m-16 p-16 shadow-lg
      backdrop-filter backdrop-blur-sm bg-opacity-30 relative grid grid-cols-1 gap-4'>
        <h1 className='text-teal-400 text-[50px] font-bold'>Historial de resultados</h1>

        <table className="pl-4 pr-4 w-full border-collapse border-4 border-slate-900 text-center bg-white">
          <thead className='bg-teal-600 border-b-2 border-gray-200'>
            <tr>
              <th className="p-3 text-base font-semibold tracking-wide text-center text-white" scope="col">Código</th>
              <th className="p-3 text-base font-semibold tracking-wide text-center text-white" scope="col">Nombre y apellido</th>
              <th className="p-3 text-base font-semibold tracking-wide text-center text-white" scope="col">Fecha</th>
              <th className="p-3 text-base font-semibold tracking-wide text-center text-white" scope="col">Acción</th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-300'>
            {getResultado.map((resultado, index) => (
              <tr key={index}>
                <td className='p-3 text-sm whitespace-nowrap text-gray-800'>{resultado.codestudiante}</td>
                <td className='p-3 text-sm whitespace-nowrap text-gray-800'>{resultado.nombre}</td>
                <td className='p-3 text-sm whitespace-nowrap text-gray-800'>{resultado.fechacreacion}</td>
                <td>
                  <button onClick={() => mostrarModal(resultado)} className='text-[14px] font-bold border-2 border-black px-2 my-1 text-black rounded-full bg-slate-300'>
                    Detalles
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>

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
                        <h3 className="text-left text-black font-semibold">Grado de depresión</h3>
                        <div className="flex bg-slate-400 rounded-lg p-3 gap-3">
                          {Images.level}
                          <input type="text" value={modalData.gradodepresion} readOnly className='w-full bg-slate-400 rounded-md py-1 text-gray-900 sm:text-sm sm:leading-6 p-3' />
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
                        <p>{botResponses[index]}</p>
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


    </section>
  )
}
