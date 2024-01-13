import {Requestibk} from "../../services/importaciones/RequestIbkService";

export async function findAllRequestibk(id,token){

    try{
        const gestionfichas = await Requestibk(id,token);
        if(gestionfichas){
            return gestionfichas;
        }
    }catch(error){
        console.error("Error al obtener los datos hola",error);
        return "Algo salio mal";
    }

}