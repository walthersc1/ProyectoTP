"use client"
import React, { useEffect, useState } from "react";
import { DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, DropdownSection, User, Button, Link } from "@nextui-org/react";
import { Images } from '@/components/imagenes'
import axios from "axios";
import { useRouter } from 'next/navigation';

export default function DroplistPsicologo() {

    const route = useRouter();
    const [datosPsico, setdatosPsico] = useState([]);

    useEffect(() => {
        const inicialisarDatos = async () => {
            const datosCookie = await axios.get('/api/getToken');
            const correo = datosCookie.data.email;
            const datoPsicologo = await axios.get(`/api/docente/${correo}`);
            const coddocente = datoPsicologo.data.psicologo[0].coddocente;
            const docente = datoPsicologo.data.psicologo[0].apellido.split(" ")[0] + " " + datoPsicologo.data.psicologo[0].nombre.split(" ")[0]
            setdatosPsico({
                docente: docente,
                coddocente: coddocente
            });
        };
        inicialisarDatos();

    }, []);

    const logout = async () => {
        await axios.post("/api/getToken/logout")
        window.location.reload();
    }


    return (
        <>
            <Dropdown showArrow radius="sm" classNames={{
                base: "before:bg-default-200",
                content: "p-0 border-small border-divider bg-background",
            }}>
                <DropdownTrigger>
                    <Button disableRipple
                        className="p-0 bg-transparent data-[hover=true]:bg-transparent text-base text-default-900"
                        endContent={Images.downarrow}
                        radius="sm"
                        variant="light">Menu Psicologo</Button>
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
                                name={datosPsico.docente}
                                description={datosPsico.coddocente}
                                classNames={{
                                    name: "text-default-600",
                                    description: "text-default-500",
                                }}
                            />
                        </DropdownItem>
                        <DropdownItem key="infoPersonal" href="/InfoPsicologo" endContent={Images.account}>
                            Información Personal
                        </DropdownItem>
                    </DropdownSection>

                    <DropdownSection aria-label="Preferences" showDivider>
                        <DropdownItem key="contact" href="/Resultados" endContent={Images.resultados}>
                            Visualizar Resultados
                        </DropdownItem>
                        <DropdownItem key="historial" href="/Dashboard" endContent={Images.dashboard}>
                            Dashboard
                        </DropdownItem>
                        <DropdownItem key="agenda" href="/AgregarCita" endContent={Images.calendar}>
                            Agregar Cita
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
