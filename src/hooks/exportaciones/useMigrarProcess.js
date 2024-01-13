import {MigrarSap} from "../../services/exportaciones/MigrarSap";
import { MigrarSapDispathProgram,MigrarSapDocumentary} from "../../services/exportaciones/MigrarSap";


export async function Migrar(token,requestNumbers,society_Value){
    try{
        return await MigrarSap(token,requestNumbers,society_Value);
   
    }catch(error){
        console.log("Error al migrar SAP: ",error);
        return error;
    }
}

export async function MigrarDispath(token,Number){
    try{
        return await MigrarSapDispathProgram(token,Number);
   
    }catch(error){
        console.log("Error al migrar SAP: ",error);
        throw error;
    }
}

export async function MigrarDocumentary(token,Number){
    try{
        return await MigrarSapDocumentary(token,Number);
    }catch(error){
        console.log("Error al migrar SAP: ",error);
        return error;
    }
}
