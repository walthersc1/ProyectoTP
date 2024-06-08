import React from 'react'

export default function AboutUs () {
  return (
    <section className="grid grid-cols-3 flex md:flex-row flex-col bg-[url('/artificial-intelligence.jpg')]">
      
      <div className='p-16 gap-6 col-span-2'>
        <h1 className='text-teal-400 font-bold px-16 ss:text-[72px] text-[60px]'>About us</h1>
        <p className='px-16 text-white text-[20px]'>
          Somos estudiantes de los últimos ciclos de la carrera de Ingenieria 
          de Sistemas de Información de la Universidad Peruana de Ciencias 
          Aplicadas.
        </p>
        <p className='pt-4 px-16 text-white text-[20px] leaning-2'>
          Nos vimos motivados a desarrollar Mapri-Chtbot debido al gran 
          porcentaje de estudiantes universitarios que sufren de algún 
          tipo de trastorno salud mental que afecta su rendimiento académico.
        </p>
      </div>

    </section>
  )
}
