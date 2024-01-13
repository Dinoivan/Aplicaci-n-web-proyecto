import {DocumentaryManagement} from "../../services/importaciones/DocumentaryManagement";

export async function findAllDocumentary(id,token){

    try{
        const dispathprogram = await DocumentaryManagement(id,token);
        if(dispathprogram){
            return dispathprogram;
        }
    }catch(error){
        console.error("Error al obtener los datos hola",error);
        return "Algo salio mal";
    }

}