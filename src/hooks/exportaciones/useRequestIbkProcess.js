import {Requestibk,UpdateIBKFicha} from "../../services/exportaciones/RequestIbkService";

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

export async function UpdatePedidoFichaIbk(token,id,RequestibkData){
    try{
        const resultado = await UpdateIBKFicha(token,id,RequestibkData)
        if(resultado){
            return resultado;
        }
    }catch(error){
        console.error("Error al actualizar la data",error);
        return "Revisa algo salio mal";
    }
}
