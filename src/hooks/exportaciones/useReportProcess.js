import {ExportationTarget} from "../../services/exportaciones/ExportationTarget";
   
export async function Exportar(token){

    try{
        const exportar = await ExportationTarget(token);
        if(exportar){
            return exportar;
        }
    }catch(error){
        console.error("Error al obtener los datos hola",error);
        return "Algo salio mal";
    }

}