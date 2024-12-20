"use client";
import React from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function TextProcessor() {
  let contado = 1;
  const messageEndRef = useRef(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isDisabled, setIsDisabled] = useState(false);
  const [totalResult, setTotalResult] = useState(0);
  const [data, setdata] = useState({
    gradodepresion: "",
    idestudiante: "",
    user: "",
    respuesta1: "",
    respuesta2: "",
    respuesta3: "",
    respuesta4: "",
    respuesta5: "",
    respuesta6: "",
    respuesta7: "",
    respuesta8: "",
    respuesta9: "",
  });
  const [inputAlgoritmo, setinputAlgoritmo] = useState({
    all_responses: "",
    gender: "",
    age: 0,
    major: "",
  });
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [botResponses, setBotResponses] = useState([
    '¡Hola!, soy Mapri. Te haré unas preguntas para evaluar cómo te sientes. Tus respuestas son confidenciales y solo serán revisadas si es necesario. Cuanta más información des, más preciso será el análisis. Cuando estés listo/a, envíame cualquier mensaje para comenzar.',
    'Describa en detalle cómo ha experimentado la falta de interés o placer en actividades que antes disfrutaba. ¿En qué tipo de actividades ha notado este cambio y qué tan intenso ha sido este desinterés?',
    'Exprese con sus palabras cómo ha percibido su estado de ánimo. ¿Siente que ha experimentado desánimo, falta de esperanza o se ha sentido decaído/triste? ¿En qué momentos o situaciones ha notado estas emociones con mayor intensidad?',
    'Describa detalladamente sus patrones de sueño. ¿Ha tenido problemas para conciliar el sueño o se despierta con frecuencia durante la noche? ¿Sus horas de sueño han aumentado o disminuido últimamente? ¿Cómo han impactado estos cambios en su estado de ánimo?',
    'Exprese con sus palabras cómo ha experimentado los niveles de energía. ¿Ha sentido cansancio o falta de energía constantemente? ¿En qué actividades o momentos del día ha notado esta sensación con mayor intensidad? ¿Cómo ha afectado esto a su vida cotidiana?',
    'Describa detalladamente cómo han sido sus hábitos alimenticios. ¿Ha perdido el apetito o ha sentido una necesidad excesiva de comer? ¿Ha notado cambios en sus hábitos alimenticios? ¿Cómo han impactado estos cambios en su estado de ánimo y salud física?',
    'Exprese con sus palabras cómo se ha sentido consigo mismo(a). ¿Ha experimentado sentimientos de culpa, vergüenza, baja autoestima o inutilidad? ¿En qué situaciones o pensamientos ha notado estos sentimientos con mayor intensidad? ¿Cómo ha afectado esto a su imagen personal y a sus relaciones?',
    'Describa detalladamente cómo ha sido su capacidad de concentración. ¿Le ha costado enfocarse en tareas que antes le resultaban fáciles? ¿Ha notado dificultad para prestar atención o recordar información? ¿Durante qué momentos o actividades ha percibido esta dificultad con mayor intensidad? ¿Qué impacto tuvo en su rendimiento académico?',
    'Exprese con sus palabras cómo ha sido su comportamiento motor. ¿Ha notado cambios en su ritmo de movimiento o en su forma de hablar? ¿Las personas a su alrededor han comentado algo sobre estos cambios? ¿Cómo han afectado estos cambios a sus actividades diarias y académicas?',
    'Describa detalladamente si ha tenido pensamientos relacionados con la muerte o autolesiones. ¿Con qué frecuencia e intensidad ha tenido estos pensamientos? ¿Ha considerado llevar a cabo alguno de estos pensamientos? ¿Qué emociones o situaciones los han desencadenado?',
    'Generando diagnostico . . .'
  ]);
  const [botResponseIndex, setBotResponseIndex] = useState(0);



  const isFirstLoad = useRef(true);

  const handleChange = (event) => {
    setInput(event.target.value);
  };

  const handleBotResponse = () => {
    const botMessage = { text: botResponses[botResponseIndex], sender: 'Mapri-bot' };
    setMessages((prevMessages) => [...prevMessages, botMessage]);
    setBotResponseIndex((prevIndex) => prevIndex + 1);
  };

  const limpiarTexto = (texto) => {
    return texto.replace(/[^a-zA-Z\s]/g, '');
  };


  const actualizarDatos = async (e) => {
    e.preventDefault();
    //console.log("Se envio la respuesta")
    const msgLimpio = limpiarTexto(input)
    if (msgLimpio.length < 2 && botResponseIndex > 1) {
      toast.error("El mensaje es muy corto, por favor detalles mas su respuesta.");
      return;
    }

    const userMessage = { text: msgLimpio, sender: data.user };

    setMessages([...messages, userMessage]);
    setInput('');



    let rawData = "";//response.data;

    if (typeof rawData !== 'string') {
      rawData = JSON.stringify(rawData);
    }
    const number = Number(rawData.replace(/[^\d]/g, ''));


    if (botResponseIndex > 1 && botResponseIndex < 11) {
      const nombreAtributo = "respuesta" + (botResponseIndex - 1)
      //console.log("La etiqueta q se esta tomando es: " + nombreAtributo + " index: " + botResponseIndex + " respuesta: " + userMessage.text + " Suma actual: " + totalResult)
      setdata({
        ...data,
        [nombreAtributo]: userMessage.text,
      });
      setinputAlgoritmo({
        ...inputAlgoritmo,
        all_responses: inputAlgoritmo.all_responses + " " + msgLimpio,
      })
      setTotalResult(prevTotal => prevTotal + number);
      contado += 1;
    }
    if (botResponseIndex === 10) {
      let constGrado
      console.log(inputAlgoritmo)
      setIsDisabled(true);
      const response = await axios.post('https://tpalgoritmo-production.up.railway.app/predict/', inputAlgoritmo);
      console.log(response)
      const puntaje = response.data[0]
      if(puntaje[1] == 0 ){
        constGrado = 'Ninguna'
      }if(puntaje[1] == 1 ){
        constGrado = 'Leve'
      }if(puntaje[1] == 2 ){
        constGrado = 'Moderado'
      }if(puntaje[1] == 3 ){
        constGrado = 'Moderadamente Severo '
      }if(puntaje[1] == 4 ){
        constGrado = 'Severo'
      }
      console.log(constGrado);
      setdata({
        ...data,
        gradodepresion: constGrado,
        respuesta9: userMessage.text,
      })
    }
    handleBotResponse();
  };



  useEffect(() => {
    const mostrarREsultado = async (event) => {

      const respuesta = await axios.post('/api/chatbot', data)
      if (respuesta.status == 200) {
        toast.success('Se guardado sus respuesta de manera correcta');
      } else {
        toast.error('Se genero un error al momento de guardar sus respuestas')
      }
    };
    if (data.gradodepresion !== "") {
      console.log("Entrando a guardar resultado ****")
      mostrarREsultado();
    }

  }, [data.gradodepresion]);



  useEffect(() => {
    if (isFirstLoad.current) {
      handleBotResponse();
      isFirstLoad.current = false;
    }
    if (messageEndRef.current) {
      messageEndRef.current.scrollTop = messageEndRef.current.scrollHeight;
    }
  }, [messages]);


  useEffect(() => {
    const consultaUsuario = async () => {
      try {
        const datos = await axios.get('/api/getToken')
        const correo = datos.data.email
        const usuario = await axios.get(`/api/queries/${correo}`)
        setdata((prevData) => ({
          ...prevData,
          idestudiante: (usuario.data.idestudiante),
          user: (usuario.data.nombre)
        }));
        setinputAlgoritmo((prevData) => ({
          ...prevData,
          age: usuario.data.edad,
          gender: usuario.data.genero,
          major: usuario.data.carrera
        }))
      } catch (error) {
        console.error('Error al obtener la información del usuario:', error);
      }
    };

    consultaUsuario();
  }, []);

  return (
    <section className="flex justify-center pt-12 pb-12 h-fit">
      <div className="flex flex-col bg-white rounded-lg shadow-lg justify-between w-9/12 h-full">

        <header className='bg-violet-600 text-2xl font-bold rounded-t-lg self-start text-lg content-center h-fit w-full'>
          <h2 className='titulo'>Chatbot MAPRI</h2>
        </header>

        <div className="flex-grow p-8">
          <div className='overflow-y-scroll flex flex-col h-[500px]' ref={messageEndRef}>
            {messages.map((message, index) => (

              <div key={index} className={`my-2 p-2 rounded-lg max-w-xs ${message.sender === data.user ? 'bg-violet-500 text-white self-end' : 'bg-gray-200 text-black self-start'}`}>
                <div className={`  ${message.sender === data.user ? 'text-black font-bold' : 'text-left font-bold'}`}>
                  {message.sender}
                </div>
                {message.text}
              </div>
            ))}

          </div>
        </div>
        <form onSubmit={actualizarDatos} className="flex w-full p-8 mt-auto">

          <input
            type="text"
            className="w-full align-middle p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring focus:border-blue-300"
            value={input}
            onChange={handleChange}
            disabled={isDisabled}
            placeholder="Escribe tu mensaje..."
          />

          <button disabled={isDisabled} type="submit" className="bg-blue-500 text-white p-2 rounded-r-lg">Enviar</button>
        </form>
        {botResponseIndex == 11 && (
          <button onClick={onOpen} className='bg-teal-400 rounded lg w-1/2 self-center p-2 mb-3'>Visualizar Resultados</button>

        )}
        <ToastContainer />
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size='3xl' scrollBehavior='inside'>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Diagnostico de cuestionario</ModalHeader>
              <ModalBody>
                <div className='grid grid-cols-2'>
                  <h2>{data.gradodepresion}</h2>
                  <h2>{totalResult}</h2>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onClick={onClose}>
                  Close
                </Button>
                <button color="primary" >
                  <a href='/Contactar'> Agendar Cita</a>
                </button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

    </section>
  );
}
