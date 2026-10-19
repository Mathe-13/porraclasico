import React, { Component } from "react"
import { NavLink } from "react-router-dom"
import serviceFutbol from "../serviceFutbol"

export default class Buscador extends Component {
    service = new serviceFutbol()
    cajaNombre = React.createRef()
    cajaEquipo = React.createRef()

    state = { equipos: [], jugadores: [], cargando: false, error: null, buscado: false }

    componentDidMount() {
        this.service.getEquipos()
            .then((equipos) => this.setState({ equipos }))
            .catch((error) => this.setState({ error: error.message }))
    }

    buscarNombre = (event) => {
        event.preventDefault()
        let nombre = this.cajaNombre.current.value.trim()
        if (!nombre) return
        this.setState({ cargando: true, error: null, buscado: true })
        this.service.buscarJugadores(nombre)
            .then((jugadores) => this.setState({ jugadores, cargando: false }))
            .catch((error) => this.setState({ jugadores: [], error: error.message, cargando: false }))
    }

    buscarEquipo = (event) => {
        event.preventDefault()
        let id = this.cajaEquipo.current.value
        if (!id) return
        this.setState({ cargando: true, error: null, buscado: true })
        this.service.getJugadoresEquipo(id)
            .then((jugadores) => this.setState({ jugadores, cargando: false }))
            .catch((error) => this.setState({ jugadores: [], error: error.message, cargando: false }))
    }

    render() {
        return (
            <main className="container py-5">
                <h1 className="mb-4">Encuentra a tu jugador</h1>
                <div className="row g-4 mb-4">
                    <div className="col-md-6">
                        <form className="card tarjeta p-4 h-100" onSubmit={this.buscarNombre}>
                            <h3>Por nombre</h3>
                            <label className="form-label" htmlFor="nombre">Nombre del jugador</label>
                            <input id="nombre" className="form-control mb-3" ref={this.cajaNombre} required placeholder="Ej: Vinicius" />
                            <button className="btn btn-dark mt-auto" type="submit">Buscar nombre</button>
                        </form>
                    </div>
                    <div className="col-md-6">
                        <form className="card tarjeta p-4 h-100" onSubmit={this.buscarEquipo}>
                            <h3>Por equipo</h3>
                            <label className="form-label" htmlFor="equipo">Selecciona un equipo</label>
                            <select id="equipo" className="form-select mb-3" ref={this.cajaEquipo} defaultValue="" required>
                                <option value="" disabled>Seleccionar...</option>
                                {this.state.equipos.map((equipo) => (
                                    <option key={equipo.idEquipo} value={equipo.idEquipo}>{equipo.nombre}</option>
                                ))}
                            </select>
                            <button className="btn btn-warning mt-auto" type="submit">Ver jugadores</button>
                        </form>
                    </div>
                </div>
                {this.state.cargando && <p>Buscando jugadores...</p>}
                {this.state.error && <div className="alert alert-danger">{this.state.error}</div>}
                {this.state.buscado && !this.state.cargando && !this.state.error && this.state.jugadores.length === 0 && (
                    <p>No se encontraron jugadores.</p>
                )}
                {this.state.jugadores.length > 0 && (
                    <div className="table-responsive tarjeta">
                        <table className="table table-hover align-middle mb-0">
                            <thead className="table-dark"><tr><th>Foto</th><th>Nombre</th><th>Posición</th><th>País</th><th></th></tr></thead>
                            <tbody>
                                {this.state.jugadores.map((jugador) => (
                                    <tr key={jugador.idJugador}>
                                        <td><img src={jugador.imagen} alt={jugador.nombre} className="mini-foto" /></td>
                                        <td>{jugador.nombre}</td>
                                        <td>{jugador.posicion}</td>
                                        <td>{jugador.pais}</td>
                                        <td><NavLink className="btn btn-sm btn-outline-dark" to={"/jugador/" + jugador.idJugador}>Detalles</NavLink></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </main>
        )
    }
}
