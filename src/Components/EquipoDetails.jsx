import React, { Component } from "react"
import { NavLink } from "react-router-dom"
import serviceFutbol from "../serviceFutbol"

export default class EquipoDetails extends Component {
    service = new serviceFutbol()
    state = { equipo: null, cargando: true, error: null }

    cargarEquipo = () => {
        this.setState({ equipo: null, cargando: true, error: null })
        this.service.findEquipo(this.props.id)
            .then((equipo) => this.setState({ equipo, cargando: false }))
            .catch((error) => this.setState({ error: error.message, cargando: false }))
    }

    componentDidMount() {
        this.cargarEquipo()
    }

    componentDidUpdate(anterior) {
        if (anterior.id !== this.props.id) this.cargarEquipo()
    }

    render() {
        let { equipo, cargando, error } = this.state
        return (
            <main className="container py-5">
                {cargando && <p>Cargando equipo...</p>}
                {error && <div className="alert alert-danger">{error}</div>}
                {equipo && (
                    <article className="card tarjeta p-4">
                        <div className="row align-items-center g-4">
                            <div className="col-md-4 text-center">
                                <img src={equipo.imagen} alt={equipo.nombre} className="escudo-detalle" />
                            </div>
                            <div className="col-md-8">
                                <span className="etiqueta-oscura">FICHA DEL EQUIPO</span>
                                <h1 className="mt-3">{equipo.nombre}</h1>
                                <p className="text-muted">{equipo.descripcion}</p>
                                <div className="row g-3 mb-4">
                                    <div className="col-6"><div className="dato"><strong>{equipo.champions}</strong><span>Champions</span></div></div>
                                    <div className="col-6"><div className="dato"><strong>{equipo.finalista}</strong><span>Finalista</span></div></div>
                                </div>
                                {equipo.web && <p><a href={equipo.web} target="_blank" rel="noreferrer">Web oficial</a></p>}
                                <NavLink to={"/jugadores/" + equipo.idEquipo} className="btn btn-warning me-2">Ver plantilla</NavLink>
                                <NavLink to="/" className="btn btn-outline-secondary">Volver</NavLink>
                            </div>
                        </div>
                    </article>
                )}
            </main>
        )
    }
}
