import { PreDispathManagement,FindAllPedidosPreDispath } from "../../services/exportaciones/PreDispatchManagementService";

export async function findAllPreDispathManagement(id,token){
    try{
        const resultado = await PreDispathManagement(id,token);
        if(resultado){
            return resultado;
        }
    }catch(error){
        console.log("Error no se puede filtrar los datos");
        return "Algo salio mal";
     }
}

export async function finAll(token){
    try{
        const resultado = await FindAllPedidosPreDispath(token);
        if(resultado){
            return resultado;
        }
    }catch(error){
        console.error("Error no se puede listar los datos migrados");
        return error;
    }
}