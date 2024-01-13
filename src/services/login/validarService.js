import axios from 'axios';
import {API} from "../../constants/env"

const basePath = "/api/user";

//Servicio para validar si el usuario esta registrado en la plataforma
export  async function Validarusuario(email){
    try{
        const response = await axios.get(`${API}${basePath}/find-by-email/${email}`)
        return response.data.status;
    }catch(error){
        console.error("Error al validar el usuario",error);
        throw error;
    }
}   

//Servicio para enviar codigo de cambio de contraseña al correo electrónico
export async function Forgotpassword(username) {

    const body = {username: username};

    try{
        const response = await axios.post(`${API}${basePath}/forgotpassword`, body,{
        headers: {
            'Content-Type': 'application/json',
        }
    });

    if(response.status === 200){
        return response.data;
    }

    }catch(error){
        console.error("Error al enviar el código de cambio de contraseña: ", error);
        throw error;
    }
   
}

//Servicio para confirmar codigo e ingresar la nueva contraseña
export async function confirmVerificationCode(username, code, newPassword){
    const body = {username, verification_code: code,new_password: newPassword};


    try{
        const response = await axios.post(`${API}${basePath}/confirmforgotpassword`,body,{
        headers: {
            'Content-Type': 'application/json',
        }
    });
    return response.data.result;
  }catch(error){
    console.error("Error al confirmar el código y establecer la nueva contraseña: ",error);
    throw error;
 }

}



