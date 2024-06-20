"use client"
import React from "react";
import {DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, DropdownSection, User, Button,Link} from "@nextui-org/react";
import Image from "next/image";
import { Images } from '@/components/imagenes'


export default function DroplistPsicologo () {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  
    const menuItems = [
        "Inicio",
        "About us",
        "Integrations",
        "Open Menu",
    ];

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
                name="Alberto Peña"
                description="ps7364"
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
            <DropdownItem key="help_and_feedback" endContent={Images.feedback}>
                Help & Feedback
            </DropdownItem>
            <DropdownItem key="logout" endContent={Images.logout}>
                Log Out</DropdownItem>
            </DropdownSection> 
        </DropdownMenu>
        </Dropdown>
    </>
  )
}
