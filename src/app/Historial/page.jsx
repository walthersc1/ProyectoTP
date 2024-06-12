import React from 'react'

export default function Historial () {
  return (
    <section className="flex-col justify-center justify-items-center text-center">
      <div className='flex-none bg-slate-800 border border-slate-400 rounded-md m-16 p-16 shadow-lg
      backdrop-filter backdrop-blur-sm bg-opacity-30 relative grid grid-cols-1 gap-4'>
        <h1 className='text-teal-400 text-[50px] font-bold'>Historial de resultados</h1>

        <div className='bg-white p-4 rounded-lg shadow grid grid-cols-2'>
          <div>
            <div className='flex items-center space-x-2 text-sm p-2'>
              <h3 className="text-blue-400 font-semibold text-[18px]">u20206h7676</h3>
              <h3 className="text-gray-400 font-semibold text-[18px]">24/04/2024</h3>
            </div>

            <div className='flex items-center space-x-2 p-2 text-[18px]'>
              <h3>Nivel de depresión:</h3>
              <h3 className='p-1 px-2 bg-green-400 rounded-lg'>Leve</h3>
            </div>
          </div>         

          
          <button className='text-[14px] font-bold border-2 border-black p-1 my-8 mx-16 text-black rounded-lg bg-slate-300'>
            <a>Revisar conversación</a>
          </button>
          
        </div>

        <div className='bg-white p-4 rounded-lg shadow grid grid-cols-2'>
          <div>
            <div className='flex items-center space-x-2 text-sm p-2'>
              <h3 className="text-blue-400 font-semibold text-[18px]">u20206h7676</h3>
              <h3 className="text-gray-400 font-semibold text-[18px]">06/04/2024</h3>
            </div>

            <div className='flex items-center space-x-2 p-2 text-[18px]'>
              <h3>Nivel de depresión:</h3>
              <h3 className='p-1 px-2 bg-orange-300 rounded-lg'>Moderada</h3>
            </div>
          </div>         

          
          <button className='text-[14px] font-bold border-2 border-black p-1 my-8 mx-16 text-black rounded-lg bg-slate-300'>
            <a>Revisar conversación</a>
          </button>
          
        </div>


      </div>

    </section>
  )
}