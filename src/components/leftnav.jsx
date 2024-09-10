"use client"
import React from "react";
import {  NavbarContent, NavbarItem,Button, Link } from "@nextui-org/react";


export default function Leftnav() {
    return (
        <>
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
        </>
    )
}
