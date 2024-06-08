"use client"
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Link, Button, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, DropdownSection, User} from "@nextui-org/react";
import React from "react";
import Image from "next/image";
import DroplistPaciente from "@/components/droplistPaciente";
import DroplistPsicologo from "@/components/DroplistPsicologo";
import { ChevronDown, PlusIcon } from "./Icons/Icons";
import { Images } from '@/components/imagenes'


export default function Navegation({ children }) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  
  return (
    <div>
      <Navbar position="static" onMenuOpenChange={setIsMenuOpen}>
        <NavbarContent>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden"/>          
          <NavbarBrand>{Images.mapri} </NavbarBrand>
        </NavbarContent>        
        
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem>
            <Link color="foreground" href="/">Inicio</Link>
          </NavbarItem>
          <NavbarItem isActive>
            <Link href="/AboutUs" aria-current="page"> Nosotros </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="/Funciones">Funciones </Link>
          </NavbarItem>          
          <DroplistPaciente></DroplistPaciente>
          <DroplistPsicologo></DroplistPsicologo>
        </NavbarContent>
        <NavbarContent justify="end">
          <NavbarItem className="hidden md:block">
            <Link href="/Login">Login</Link>
          </NavbarItem>
          <NavbarItem>
            <Button as={Link} color="primary" href="/Registrar" variant="flat">
              Sign Up
            </Button>
          </NavbarItem>
        </NavbarContent>
 
      </Navbar>
      {children}
    </div>    
  );
}
