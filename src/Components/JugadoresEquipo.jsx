import React, { Component } from "react"
import { NavLink } from "react-router-dom"
import serviceFutbol from "../serviceFutbol"

export default class JugadoresEquipo extends Component {
    service = new serviceFutbol()
    state = { jugadores: [], cargando: true, error: null }

    cargar = () => {
        this.setState({ jugadores: [], cargando: true, error: null })
        this.service.getJugadoresEquipo(this.props.id)
            .then((jugadores) => this.setState({ jugadores, cargando: false }))
            .catch((error) => this.setState({ error: error.message, cargando: false }))
    }

    componentDidMount() {
        this.cargar()
    }

    componentDidUpdate(anterior) {
        if (anterior.id !== this.props.id) this.cargar()
    }

    render() {
        return (
            <main className="container py-5">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h1>Plantilla del equipo</h1>
                    <NavLink className="btn btn-outline-secondary" to={"/equipo/" + this.props.id}>Volver al equipo</NavLink>
                </div>
                {this.state.cargando && <p>Cargando jugadores...</p>}
                {this.state.error && <div className="alert alert-danger">{this.state.error}</div>}
                <div className="row g-3">
                    {this.state.jugadores.map((jugador) => (
                        <div className="col-sm-6 col-lg-4" key={jugador.idJugador}>
                            <div className="card tarjeta h-100">
                                <div className="card-body text-center">
                                    <img src={jugador.imagen} alt={jugador.nombre} className="foto-jugador mb-3" />
                                    <h4>{jugador.nombre}</h4>
                                    <p className="text-muted mb-2">{jugador.posicion} · {jugador.pais}</p>
                                    <NavLink to={"/jugador/" + jugador.idJugador} className="btn btn-dark">Ver ficha</NavLink>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        )
    }
}
