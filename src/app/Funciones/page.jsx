import React from 'react'

export default function Funciones () {
  return (
    <section className="grid md:grid-cols-3 sm:grid-cols-1 flex md:flex-row flex-col bg-[url('/artificial-intelligence.jpg')]">
      <div className='md:col-span-2 sm:col-span-1 p-16 w-fit'>
        <h1 className='text-teal-400 font-bold px-16 ss:text-[72px] text-[60px]'>¿Cómo funciona Mapri-Chatbot?</h1>
        
        <div className='m-3 rounded-lg bg-gray-700 mx-16 flex'>
          <h1 className='p-8 pr-2 text-white text-[40px]'>1.</h1>
          <p className='p-8 text-white text-[20px]'>
            Mapri-Chatbot iniciará la convwersación saludando y 
            pidiendo algunos datos personales importantes. 
          </p>

        </div>
        
        <div className='m-3 rounded-lg bg-gray-700 mx-16 flex'>
          <h1 className='p-8 pr-2 text-white text-[40px]'>2.</h1>
          <p className='p-8 text-white text-[20px]'>
            Mapri-Chatbot comenzará a realizar preguntas 
            estructuradas obtenidas del cuestionario 
            PHQ-9 &#40;Cuestionario sobre la Salud 
            del Paciente&#41;.
          </p>

        </div>

        <div className='m-3 rounded-lg bg-gray-700 mx-16 flex'>
          <h1 className='p-8 pr-2 text-white text-[40px]'>3.</h1>
          <p className='p-8 text-white text-[20px]'>
            Responde libremente cada pregunta realizada y espera 
            por el diagnostico que te brindará Mapri-Chatbot
          </p>

        </div>


      </div>

    </section>
  )
}
