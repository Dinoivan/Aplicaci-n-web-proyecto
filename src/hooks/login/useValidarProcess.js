import { Validarusuario,Forgotpassword,confirmVerificationCode} from "../../services/login/validarService"
import { useNavigate } from "react-router-dom"

export function useValidarEmail(email,setCurrentStep){

    const handleValidation = async (e) => {
        e.preventDefault();

        try{
            
            const response = await Validarusuario(email);
            console.log("Logica",response);
            if(response){
                console.log("Entro en esta condicional")
                await Forgotpassword(email);
                alert("Se ha enviado un correo electrónico con instrucciones para restablecer la contraseña");
                setCurrentStep(2);
            }else{
                throw new Error("Correo no registrado o inactivo.");
            }

        }catch(error){
            if(error.message === "Correo no registrado o inactivo."){
                alert("El correo electrónico proporcionado no está registrado en nuestro sistema.");
            }else{
                alert("Ocurrio un error. Por favor, inténtalo de nuevo.");
            }

        }
    };

    return handleValidation;

}


export function useCodeVerification(email,verificationCode,newPassword,setCurrentStep){

    const navigate = useNavigate();

    const handleCodeVerification = async (e) => {
        e.preventDefault();

         // Validar si verificationCode y newPassword no están vacíos
         if (!verificationCode.trim() || !newPassword.trim()) {
            alert("Por favor, ingresa el código de verificación y la nueva contraseña.");
            return;  // Retorna para evitar continuar con la lógica subsiguiente.
        }
        
        await confirmVerificationCode(email, verificationCode,newPassword)
            .then(() => {
                alert("Contraseña cambiado exitosamente.");
                navigate('/');
                setCurrentStep(3); 
            })
            .catch(() => {
                alert('El código de verificación es incorrecto o ha expirado.');
            });
    };

    return handleCodeVerification;

}

