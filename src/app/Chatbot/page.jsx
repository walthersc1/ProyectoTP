"use client";

import axios from 'axios';
import { json } from 'micro';
import { useState } from 'react';

export default function TextProcessor() {
  const [gettext, setText] = useState({
    text: "",
  });
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = async (event) => {
    const { name, value } = event.target;
    //console.log(name + "-" + value);
    setText({
      ...gettext,
      [name]: value,
    });
  };


  const actualizarDatos = async (e) => {
    e.preventDefault();
 
    const response = await axios.get('https://tpalgoritmo-production.up.railway.app/predict/', {
      text: JSON.stringify(gettext)
  });
    console.log(response)
  };
/*
  const handleSubmit = async (event) => {
    event.preventDefault();
    
      console.log("Post entrando - entrada de datos:" + text)
      const response = await axios.post(`/api/ia/`, text );
      console.log("Post saliendo" + response)
      setResult(response.data.result);

  };*/

  return (
    <form>
      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
    <div className="sm:col-span-3">
    <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
        Nombres
    </label>
    <div className="mt-2">
        <input
        type="text"
        name="text"
        id="first-name"
        autoComplete="given-name"
        className="font-sans block bg-gray-300 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 p-3"
        onChange={handleChange}
        value={gettext.text}
        />
    </div>
</div>
</div>

<div className="sm:col-span-2 sm:col-start-4">

<div className="mt-2 font-bold">
<button onClick={actualizarDatos} className="font-sans text-white bg-violet-500 w-full rounded-full border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:max-w-xs sm:text-sm sm:leading-6 p-3">
    modificar
</button>
</div>

</div>
</form>
  );
}
