import axios from "axios"
import Global from "./Global"

export default class serviceFutbol {
    async getEquipos() {
        let response = await axios.get(Global.urlApi + "api/Equipos")
        return response.data
    }

    async findEquipo(id) {
        let response = await axios.get(Global.urlApi + "api/Equipos/" + id)
        return response.data
    }

    async getJugadoresEquipo(id) {
        let response = await axios.get(Global.urlApi + "api/Jugadores/JugadoresEquipos/" + id)
        return response.data
    }

    async findJugador(id) {
        let response = await axios.get(Global.urlApi + "api/Jugadores/" + id)
        return response.data
    }

    async buscarJugadores(nombre) {
        let response = await axios.get(Global.urlApi + "api/Jugadores/FindJugadores/" + encodeURIComponent(nombre))
        return response.data
    }

    async getApuestas() {
        let response = await axios.get(Global.urlApi + "api/Apuestas")
        return response.data
    }

    async insertApuesta(apuesta) {
        let response = await axios.post(Global.urlApi + "api/Apuestas", apuesta)
        return response.data
    }

    async deleteApuesta(id) {
        let response = await axios.delete(Global.urlApi + "api/Apuestas/" + id)
        return response.data
    }
}
