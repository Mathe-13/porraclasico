import React, { Component } from "react"
import { NavLink } from "react-router-dom"
import serviceFutbol from "../serviceFutbol"

export default class MenuComponent extends Component {
    service = new serviceFutbol()
    state = { equipos: [] }

    componentDidMount() {
        this.service.getEquipos()
            .then((equipos) => this.setState({ equipos }))
            .catch((error) => console.error(error))
    }

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark barra-principal">
                <div className="container">
                    <NavLink className="navbar-brand fw-bold" to="/">⚽ ZONA CLÁSICO</NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#menuFutbol">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="menuFutbol">
                        <div className="navbar-nav ms-auto align-items-lg-center">
                            <NavLink className="nav-link" to="/">Inicio</NavLink>
                            <div className="nav-item dropdown">
                                <button className="btn btn-link nav-link dropdown-toggle text-decoration-none" data-bs-toggle="dropdown">
                                    Equipos
                                </button>
                                <ul className="dropdown-menu dropdown-menu-end">
                                    {this.state.equipos.map((equipo) => (
                                        <li key={equipo.idEquipo}>
                                            <NavLink className="dropdown-item" to={"/equipo/" + equipo.idEquipo}>
                                                {equipo.nombre}
                                            </NavLink>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <NavLink className="nav-link" to="/buscar">Buscar jugadores</NavLink>
                            <NavLink className="nav-link" to="/apuestas">Apuestas</NavLink>
                            <NavLink className="btn btn-warning ms-lg-3" to="/nueva-apuesta">Hacer apuesta</NavLink>
                        </div>
                    </div>
                </div>
            </nav>
        )
    }
}
