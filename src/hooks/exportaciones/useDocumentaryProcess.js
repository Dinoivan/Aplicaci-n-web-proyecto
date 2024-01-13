import {DocumentaryManagement,FindAllPedidosDocumentary} from "../../services/exportaciones/DocumentaryManagement";

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

export async function finAllDocumentary(token){
    try{
        const resultado = await FindAllPedidosDocumentary(token);
        if(resultado){
            return resultado;
        }
    }catch(error){
        console.error("Error no se puede listar los datos migrados");
        return error;
    }
}