"use client"
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Link, Button, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, DropdownSection, User } from "@nextui-org/react";
import React from "react";
import DroplistPaciente from "@/components/droplistPaciente";
import DroplistPsicologo from "@/components/DroplistPsicologo";
import { useRouter } from 'next/navigation';
import { Images } from '@/components/imagenes'
import axios from "axios";

export default function Navegation(req, { children }) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [userType, setUserType] = React.useState(null);
  const route = useRouter();
  React.useEffect(() => {

    const fetchData = async () => {
      try {
        const reqs = await axios.get('/api/getToken');
        const { tipo } = reqs.data;
        setUserType(tipo);
      } catch (error) {
        if(error.response.status == 500){
          route.replace('/Login');
        }
        
      }
    };

    fetchData();
  }, []);


  return (
    <div>
      <Navbar position="static" onMenuOpenChange={setIsMenuOpen}>
        <NavbarContent>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden" />
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
          {userType === 'Estudiante' && <DroplistPaciente />}
          {userType === 'Docente' && <DroplistPsicologo />}
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
