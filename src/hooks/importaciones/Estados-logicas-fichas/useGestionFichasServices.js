import {GestionFichas} from "../../../services/exportaciones/GestionFichas";
import {Filtros} from "../../../services/exportaciones/GestionFichas";

export async function findAllGestionFichas(token){

    try{
        const gestionfichas = await GestionFichas(token);
        if(gestionfichas){
            return gestionfichas;
        }
    }catch(error){
        console.error("Error al obtener los datos hola",error);
        return "Algo salio mal";
    }

}

export async function FiltrarDatos(params, token) {
    try {
      const resultado = await Filtros(params, token);
      if (resultado) {
        return resultado;
      }
    } catch (error) {
      console.log("Error al filtrar los datos específicos");
      return "Algo salió mal";
    }
  }