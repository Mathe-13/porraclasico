import React, { Component } from "react"
import { Navigate, NavLink } from "react-router-dom"
import serviceFutbol from "../serviceFutbol"

export default class CrearApuesta extends Component {
    service = new serviceFutbol()
    cajaUsuario = React.createRef()
    cajaResultado = React.createRef()
    cajaFecha = React.createRef()

    state = { guardado: false, guardando: false, error: null }

    guardar = (event) => {
        event.preventDefault()
        let apuesta = {
            idApuesta: 0,
            usuario: this.cajaUsuario.current.value.trim(),
            resultado: this.cajaResultado.current.value.trim(),
            fecha: this.cajaFecha.current.value
        }
        this.setState({ guardando: true, error: null })
        this.service.insertApuesta(apuesta)
            .then(() => this.setState({ guardado: true, guardando: false }))
            .catch((error) => this.setState({ error: error.message, guardando: false }))
    }

    render() {
        if (this.state.guardado) return <Navigate to="/apuestas" replace />

        return (
            <main className="container py-5">
                <div className="card tarjeta mx-auto" style={{ maxWidth: "580px" }}>
                    <div className="card-body p-4 p-md-5">
                        <span className="etiqueta-oscura">PARTICIPA</span>
                        <h1 className="mt-2 mb-2">Tu pronóstico</h1>
                        <p className="text-muted">Escribe el resultado que crees que tendrá el partido.</p>
                        {this.state.error && <div className="alert alert-danger">{this.state.error}</div>}
                        <form onSubmit={this.guardar}>
                            <div className="mb-3">
                                <label className="form-label" htmlFor="usuario">Nombre de usuario</label>
                                <input id="usuario" className="form-control" ref={this.cajaUsuario} required maxLength="100" />
                            </div>
                            <div className="mb-3">
                                <label className="form-label" htmlFor="resultado">Resultado</label>
                                <input id="resultado" className="form-control" ref={this.cajaResultado} placeholder="Ej: 2-1" required />
                            </div>
                            <div className="mb-4">
                                <label className="form-label" htmlFor="fecha">Fecha</label>
                                <input id="fecha" type="date" className="form-control" ref={this.cajaFecha} required />
                            </div>
                            <div className="d-flex gap-2">
                                <button className="btn btn-warning" type="submit" disabled={this.state.guardando}>
                                    {this.state.guardando ? "Guardando..." : "Guardar apuesta"}
                                </button>
                                <NavLink to="/apuestas" className="btn btn-outline-secondary">Cancelar</NavLink>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        )
    }
}
