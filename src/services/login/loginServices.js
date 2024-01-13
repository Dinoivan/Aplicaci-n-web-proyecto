import axios from 'axios';
import {API} from "../../constants/env"

export async function loginUser(username, password) {
    
    const body = {username: username,password: password};

    try{
        const response = await axios.post(`${API}/login/`, body,{
        headers: {
            'Content-Type': 'application/json',
        }
    });

    if (response.status === 200  && response.data.token) {
        localStorage.setItem('token', response.data.token);
        return response.data;
    }
    }catch(error){
        console.error("Error al iniciar sesión: ",error);
        return {error: "Ocurrio un error al iniciar sesión. Por favor, verifica tus credenciales"};

    }
}




