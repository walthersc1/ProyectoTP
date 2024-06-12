import { PythonShell } from 'python-shell';
import path from 'path';
import { compareSync } from 'bcrypt';
import { NextResponse } from 'next/server';

export async function POST(request) {


  console.log("Entrando a la funcion")
 
  const datosEntrada = await request.json();

  const scriptDirectory = process.cwd();

  console.log(scriptDirectory);

  console.log("----------------222222222222222222222------------------");

  const scriptPath = path.join(scriptDirectory, 'src', 'app', 'api', 'ia');

console.log("----------------------------------");
console.log(scriptPath);

  console.log("Datos optenidos")
 
  const options = {
      mode: 'text',
      pythonOptions: ['-u'],
      scriptPath: scriptPath,  // Ruta donde se encuentran los archivos model.pkl y vectorizer.pkl
      args: [datosEntrada]
  };

  console.log("opcion creada")

  PythonShell.run('ia.py', options, (err, results) => {
      if (err) {
        console.log("--------------33333333333--------------------");
          console.error(err);
          return NextResponse.json(err,  { status: 500 });
      } else {
        console.log("--------------else parte del codigo--------------------");
           console.log(results.tostring());
      }
  });

  console.log("---------------4444444444444-------------------");
console.log(scriptPath);
  
};
