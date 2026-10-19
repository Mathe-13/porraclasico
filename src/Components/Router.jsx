import React, { Component } from "react"
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom"
import MenuComponent from "./MenuComponent"
import Home from "./Home"
import EquipoDetails from "./EquipoDetails"
import JugadoresEquipo from "./JugadoresEquipo"
import JugadorDetails from "./JugadorDetails"
import Buscador from "./Buscador"
import Apuestas from "./Apuestas"
import CrearApuesta from "./CrearApuesta"

function EquipoRuta() {
    let { id } = useParams()
    return <EquipoDetails id={id} />
}

function JugadoresRuta() {
    let { id } = useParams()
    return <JugadoresEquipo id={id} />
}

function JugadorRuta() {
    let { id } = useParams()
    return <JugadorDetails id={id} />
}

export default class Router extends Component {
    render() {
        return (
            <BrowserRouter>
                <MenuComponent />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/equipo/:id" element={<EquipoRuta />} />
                    <Route path="/jugadores/:id" element={<JugadoresRuta />} />
                    <Route path="/jugador/:id" element={<JugadorRuta />} />
                    <Route path="/buscar" element={<Buscador />} />
                    <Route path="/apuestas" element={<Apuestas />} />
                    <Route path="/nueva-apuesta" element={<CrearApuesta />} />
                    <Route path="*" element={<main className="container py-5"><h1>Página no encontrada</h1></main>} />
                </Routes>
            </BrowserRouter>
        )
    }
}
