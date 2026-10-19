import React, { Component } from "react"
import { NavLink } from "react-router-dom"
import serviceFutbol from "../serviceFutbol"

export default class Home extends Component {
    service = new serviceFutbol()
    state = { equipos: [], cargando: true, error: null }

    componentDidMount() {
        this.service.getEquipos()
            .then((equipos) => this.setState({ equipos, cargando: false }))
            .catch((error) => this.setState({ error: error.message, cargando: false }))
    }

    render() {
        return (
            <main>
                <section className="hero-clasico text-center">
                    <div className="container py-5">
                        <span className="etiqueta">PRÁCTICA FINAL REACT</span>
                        <h1 className="display-4 fw-bold mt-3">Vive el Clásico</h1>
                        <p className="lead">Explora los equipos, conoce a sus jugadores y deja tu pronóstico.</p>
                        <NavLink to="/nueva-apuesta" className="btn btn-warning btn-lg mt-2">Participar en la porra</NavLink>
                    </div>
                </section>
                <section className="container py-5">
                    <h2 className="titulo-seccion">Los protagonistas</h2>
                    {this.state.cargando && <p>Cargando equipos...</p>}
                    {this.state.error && <div className="alert alert-danger">{this.state.error}</div>}
                    <div className="row g-4">
                        {this.state.equipos.map((equipo) => (
                            <div className="col-md-6" key={equipo.idEquipo}>
                                <article className="card tarjeta h-100">
                                    <div className="card-body text-center p-4">
                                        <img src={equipo.imagen} alt={equipo.nombre} className="escudo-grande mb-3" />
                                        <h3>{equipo.nombre}</h3>
                                        <p className="text-muted">{equipo.descripcion}</p>
                                        <NavLink className="btn btn-outline-dark" to={"/equipo/" + equipo.idEquipo}>
                                            Conocer equipo
                                        </NavLink>
                                    </div>
                                </article>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
        )
    }
}
