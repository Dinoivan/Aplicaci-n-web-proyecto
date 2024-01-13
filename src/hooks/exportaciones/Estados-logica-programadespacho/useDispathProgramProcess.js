//  import {DispathProgram} from "../../services/exportaciones/DispatchProgramService";
import { DispathProgram } from "../../../services/exportaciones/DispatchProgramService";

 export async function findAllDispathPrograma(id,token){

     try{
         const dispathprogram = await DispathProgram(id,token);
         if(dispathprogram){
             return dispathprogram;
         }
     }catch(error){
         console.error("Error al obtener los datos hola",error);
         return "Algo salio mal";
     }

 }