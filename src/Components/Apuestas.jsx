import React, { Component } from "react"
import { NavLink } from "react-router-dom"
import serviceFutbol from "../serviceFutbol"

export default class Apuestas extends Component {
    service = new serviceFutbol()
    state = { apuestas: [], cargando: true, error: null, eliminando: null }

    cargarApuestas = () => {
        this.setState({ cargando: true, error: null })
        this.service.getApuestas()
            .then((apuestas) => this.setState({ apuestas, cargando: false }))
            .catch((error) => this.setState({ error: error.message, cargando: false }))
    }

    componentDidMount() {
        this.cargarApuestas()
    }

    eliminar = (id) => {
        if (!window.confirm("¿Eliminar esta apuesta?")) return
        this.setState({ eliminando: id, error: null })
        this.service.deleteApuesta(id)
            .then(() => {
                this.setState({ eliminando: null })
                this.cargarApuestas()
            })
            .catch((error) => this.setState({ error: error.message, eliminando: null }))
    }

    render() {
        return (
            <main className="container py-5">
                <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
                    <div><span className="etiqueta-oscura">LA PORRA</span><h1 className="mt-2">Pronósticos registrados</h1></div>
                    <NavLink className="btn btn-warning" to="/nueva-apuesta">+ Nueva apuesta</NavLink>
                </div>
                {this.state.cargando && <p>Cargando apuestas...</p>}
                {this.state.error && <div className="alert alert-danger">{this.state.error}</div>}
                {!this.state.cargando && this.state.apuestas.length === 0 && !this.state.error && <p>Aún no hay apuestas.</p>}
                {this.state.apuestas.length > 0 && (
                    <div className="table-responsive tarjeta">
                        <table className="table table-hover align-middle mb-0">
                            <thead className="table-dark">
                                <tr><th>ID</th><th>Usuario</th><th>Resultado</th><th>Fecha</th><th>Acción</th></tr>
                            </thead>
                            <tbody>
                                {this.state.apuestas.map((apuesta) => (
                                    <tr key={apuesta.idApuesta}>
                                        <td>{apuesta.idApuesta}</td>
                                        <td className="fw-bold">{apuesta.usuario}</td>
                                        <td><span className="resultado">{apuesta.resultado}</span></td>
                                        <td>{apuesta.fecha ? String(apuesta.fecha).substring(0, 10) : ""}</td>
                                        <td>
                                            <button
                                                className="btn btn-sm btn-outline-danger"
                                                disabled={this.state.eliminando === apuesta.idApuesta}
                                                onClick={() => this.eliminar(apuesta.idApuesta)}
                                            >
                                                {this.state.eliminando === apuesta.idApuesta ? "Eliminando..." : "Eliminar"}
                                            </button>
                                        </td>
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
