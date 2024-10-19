"use client"
import React,{useEffect,useState} from "react";
import {DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, DropdownSection, User, Button,Link} from "@nextui-org/react";
import { Images } from '@/components/imagenes'
import axios from "axios";

export default function DroplistPaciente () {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const [datosEstudiante, setdatosEstudiante] = useState([]);
    const logout = async () => {
        await axios.post("/api/getToken/logout")
        window.location.reload();
    }
    useEffect(() => {
        const inicialisarDatos = async () => {
            const datosCookie = await axios.get('/api/getToken');
            const correo = datosCookie.data.email;
            const datoPaciente = await axios.get(`/api/queries/${correo}`);
            const codEstudiante = datoPaciente.data.codestudiante;
            const estudiante = datoPaciente.data.apellido.split(" ")[0] + " " + datoPaciente.data.nombre.split(" ")[0]
            console.log("Estudiante: " + codEstudiante + " codEstudiante: " + codEstudiante)
            setdatosEstudiante({
                codEstudiante: codEstudiante,
                nomEstudiante: estudiante
            })
        };
        inicialisarDatos();

    }, []);

  return (
    <>
        <Dropdown showArrow radius="sm" classNames={{
            base: "before:bg-default-200", // change arrow background
            content: "p-0 border-small border-divider bg-background",
        }}>
        <DropdownTrigger>
            <Button disableRipple
            className="p-0 bg-transparent data-[hover=true]:bg-transparent text-base text-default-900"
            endContent={Images.downarrow}
            radius="sm"
            variant="light">Menu Paciente</Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Custom item styles"
            disabledKeys={["profile"]}
            className="p-3"
            itemClasses={{
            base: [
                "rounded-md",
                "text-default-900",
                "transition-opacity",
                "data-[hover=true]:text-foreground",
                "data-[hover=true]:bg-default-100",
                "dark:data-[hover=true]:bg-default-50",
                "data-[selectable=true]:focus:bg-default-50",
                "data-[pressed=true]:opacity-70",
                "data-[focus-visible=true]:ring-default-500",
            ],
            }}>
            <DropdownSection aria-label="Profile & Actions" showDivider>
            <DropdownItem isReadOnly key="profile"
                className="h-14 gap-2">
                <User
                name={datosEstudiante.nomEstudiante}
                description={datosEstudiante.codEstudiante}
                classNames={{
                    name: "text-default-600",
                    description: "text-default-500",
                }}
                />
            </DropdownItem>
            <DropdownItem key="infoPersonal" href="/InfoPersonal" endContent={Images.account}>
                Información Personal
            </DropdownItem>
            <DropdownItem key="contact" href="/Contactar" endContent={Images.contact}>
                Contactar
            </DropdownItem>
            <DropdownItem key="chatbot" href="/Chatbot" endContent={Images.chat}>
                Chatbot
            </DropdownItem>
            </DropdownSection>

            <DropdownSection aria-label="Preferences" showDivider>
            <DropdownItem key="historial" href="/Historial" endContent={Images.historial}>
                Historial
            </DropdownItem>
            <DropdownItem key="agenda" href="/Agenda" endContent={Images.calendar}>
                Agenda
            </DropdownItem>
            </DropdownSection>  

            <DropdownSection aria-label="Help & Feedback">
            <DropdownItem key="logout" endContent={Images.logout} onPress={logout}>
                Log Out</DropdownItem>
            </DropdownSection> 
        </DropdownMenu>
        </Dropdown>
    </>
  )
}
