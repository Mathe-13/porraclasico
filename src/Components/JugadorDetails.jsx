import React, { Component } from "react"
import { NavLink } from "react-router-dom"
import serviceFutbol from "../serviceFutbol"

export default class JugadorDetails extends Component {
    service = new serviceFutbol()
    state = { jugador: null, cargando: true, error: null }

    cargar = () => {
        this.setState({ jugador: null, cargando: true, error: null })
        this.service.findJugador(this.props.id)
            .then((jugador) => this.setState({ jugador, cargando: false }))
            .catch((error) => this.setState({ error: error.message, cargando: false }))
    }

    componentDidMount() {
        this.cargar()
    }

    componentDidUpdate(anterior) {
        if (anterior.id !== this.props.id) this.cargar()
    }

    render() {
        let { jugador, cargando, error } = this.state
        return (
            <main className="container py-5">
                {cargando && <p>Cargando jugador...</p>}
                {error && <div className="alert alert-danger">{error}</div>}
                {jugador && (
                    <div className="card tarjeta mx-auto p-4" style={{ maxWidth: "760px" }}>
                        <div className="row align-items-center g-4">
                            <div className="col-md-5 text-center">
                                <img src={jugador.imagen} alt={jugador.nombre} className="img-fluid foto-detalle" />
                            </div>
                            <div className="col-md-7">
                                <span className="etiqueta-oscura">PERFIL DE JUGADOR</span>
                                <h1 className="mt-3">{jugador.nombre}</h1>
                                <p><strong>Posición:</strong> {jugador.posicion}</p>
                                <p><strong>País:</strong> {jugador.pais}</p>
                                <p><strong>Nacimiento:</strong> {jugador.fechaNacimiento}</p>
                                <NavLink to={"/jugadores/" + jugador.idEquipo} className="btn btn-warning me-2">Su equipo</NavLink>
                                <NavLink to="/buscar" className="btn btn-outline-dark">Buscar otro</NavLink>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        )
    }
}
