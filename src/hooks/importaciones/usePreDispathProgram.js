import { PreDispathManagement } from "../../services/importaciones/PreDispatchManagementService";

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