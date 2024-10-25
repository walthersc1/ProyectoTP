"use client";
import React from 'react'
import axios from 'axios'
import { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { Spinner } from '@nextui-org/react';
import Image from "next/image";

export default function Eliminar() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const hedlContra = async (event) => {
    const { name, value } = event.target;
    setdatos({
      ...datos,
      [name]: value
    });
  }
  const [datos, setdatos] = useState({
    correo: "",
    codigo: "",
    rol: "",
    tokenHas: "",
    token: "",
    ConstNueva: "",
    ConstConfirm: ""
  })
  const llamarValidarToken = async () => {
    setLoading(true);
    const respuesta = await axios.post('/api/Recuperar/token', datos)
    setTimeout(() => {
      if (respuesta.data.message == "Conforme") {
        onOpen();
      } else {
        toast.error("El token no es correcto")
      }
      setLoading(false);
    }, 4000);
  };
  const hadleToken = async (event) => {
    const { name, value } = event.target
    setdatos({
      ...datos,
      token: value
    })
  }
  useEffect(() => {
    if (datos.token.length == 6) {
      llamarValidarToken()
      setdatos({
        ...datos,
        token: ""
      })
    }
  }, [datos]);

  const modificarContra = async () => {
    if (datos.ConstNueva == datos.ConstConfirm) {
      if (datos.ConstNueva.length >= 6) {
        const respuesta = await axios.put('/api/Recuperar/token', datos)
        if (respuesta.status == 200) {
          const valoresLogin = { email: respuesta.data.datosLogin.correo, password: respuesta.data.datosLogin.contra }
          onClose()
          const response = await axios.post('/api/auth', valoresLogin);
          if (response.status == 200) {
            window.location.href = '/';
          } else {
            toast.error("Ocurrio un error, no se puedo actualizar su clave")
          }
        } else {
          toast.error("la contraseña tiene que tener mas de 6 digitos")
        }
      } else {
        toast.error("las contraseñas no son iguales")
      }
    }
  }
    const handleChange = async (event) => {
      const { name, value } = event.target;
      setdatos({
        ...datos,
        [name]: value
      });
    };
    const enviarEmail = async (event) => {
      event.preventDefault()
      setDisabled(true);
      try {
        const validacionCorreo = await axios.post('/api/Recuperar/validar', datos)

        if (validacionCorreo.status == 200) {
          const resultado = await axios.post('/api/Recuperar', datos);
          setdatos({
            ...datos,
            tokenHas: resultado.data.token,
            rol: validacionCorreo.data.dataQuery.rol
          })
          toast.success("Se envio la clave de 6 digitos a su correo")
        }
        return
      } catch (ex) {
        if (ex.response.status == 405) {
          toast.error(ex.response.data.error)
        } else {
          toast.error("Error inesperado por favor contactar a soporte")
        }
      }

    }

    setTimeout(() => {
      setDisabled(false);
    }, 300000);

    return (
      <section className="flex justify-center justify-items-center text-center">
        {loading && (
          <div className="absolute inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50 z-50">
            <Spinner size="xl" color="primary" /> {/* Componente de spinner */}
          </div>
        )}
        <div className="flex-col bg-slate-800 border border-slate-400 rounded-md m-16 p-14 shadow-lg
            backdrop-filter backdrop-blur-sm bg-opacity-30 relative">
          <h1 className="font-poppins font-bold ss:text-[52px] text-[42px] text-white ss:leading-[100.8px] leading-[75px]">Recuperar contraseña</h1>
          <div className="flex-col p-3 gap-6" >
            <h3 className="text-left text-white font-semibold">Ingrese su correo: </h3>
            <div className="flex bg-white rounded-lg p-3 gap-3">
              <Image src="/lock.svg" width={19} height={19} />
              <input onChange={handleChange} name="correo"
                className='w-full h-[50px]' type='email' placeholder="Escriba su correo"
              ></input>
            </div>
          </div>
          <div className="flex-col p-3 gap-6" >
            <h3 className="text-left text-white font-semibold">Ingrese su código: </h3>
            <div className="flex bg-white rounded-lg p-3 gap-3">
              <Image src="/lock.svg" width={19} height={19} />
              <input onChange={handleChange} name="codigo"
                className='w-full h-[50px]' type='text' placeholder="Escriba su correo"
              ></input>
            </div>
          </div>
          <div className="flex-col p-3 gap-6">
            <h3 className="text-left text-white font-semibold">Ingrese el token </h3>
            <div className="flex bg-white rounded-lg p-3 gap-3">
              <input
                value={datos.token}
                onChange={hadleToken}
                name="token"
                className="w-full h-[50px]"
                type="number"
                placeholder="Ingrese el token"
                disabled={(!disabled)}
                max={999999}
                onInput={(e) => {
                  if (e.target.value.length > 6) {
                    e.target.value = e.target.value.slice(0, 6);
                  }
                }}
              />
            </div>
          </div>

          <div className='flex gap-8 px-3'>
            <button className='text-[18px] shadow-lg font-bold w-1/2 text-black my-6 p-2 
                  rounded-full bg-white'><a href='/'>Cancelar</a></button>
            <button onClick={enviarEmail} disabled={disabled}
              className={`text-[18px] shadow-lg font-bold w-1/2 my-6 p-2 rounded-full ${disabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-teal-400 text-slate-50'}`}  >Generar Token</button>
          </div>
        </div>
        <ToastContainer />
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} size='3xl' scrollBehavior='inside'>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="">Escriba su nueva contraseña</ModalHeader>
                <ModalBody>
                  <div className="sm:col-span-4">
                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                      Nueva Contraseña
                    </label>
                    <div className="mt-2">
                      <input
                        id="contraseña"
                        name="ConstNueva"
                        type="password"
                        autoComplete="password"
                        placeholder="**********"
                        onChange={hedlContra}
                        className='font-sans block bg-gray-300 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-500 placeholder:text-gray-600 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 p-3'
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-4">
                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                      Confirmar contraseña
                    </label>
                    <div className="mt-2">
                      <input
                        id="contraseña"
                        name="ConstConfirm"
                        type="password"
                        autoComplete="password"
                        placeholder="**********"
                        onChange={hedlContra}
                        className="font-sans block bg-gray-300 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-500 placeholder:text-gray-600 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 p-3"
                      />
                    </div>
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Cancelar
                  </Button>
                  <Button color="primary" onPress={modificarContra}>
                    Modificar Contraseña
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>

        </Modal>
      </section>


    )
  }




