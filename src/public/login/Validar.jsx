import { useValidarState } from "../../hooks/login/useValidarState"
import { useValidarEmail ,useCodeVerification} from "../../hooks/login/useValidarProcess"
import { LoginPublicidad} from "./LoginPublicidad"
import { LoginFormulario } from "./LoginFormulario"
import "../../styles/login/validar.css"

export function Validar () {

    const{currentStep,setCurrentStep,
          email,setEmail,
          verificationCode,setVerificationCode,
          newPassword,setNewPassword,
          showPassword,setShowPassword
          
    } = useValidarState();

    const handleValidation = useValidarEmail(email,setCurrentStep);
    const handleCodeVerification = useCodeVerification(email,verificationCode,newPassword,setCurrentStep);

    return(
        <>
        <section className="split-screen">

            <section className="left">
                <LoginPublicidad/>
            </section>

            <section className="right">

                {currentStep ===1 && (
                 <LoginFormulario
                        handleSubmit={handleValidation}
                        username={email}
                        setUsername={setEmail}
                        setShowPassword={setShowPassword} 
                        usernameLabel="Correo electrónico"
                        sectionclassName="input-container name"
                        nombre="fcorreo"
                        usernamePlaceholder="Analista 01"
                        inputType="email"
                        showArrobaIcon={true}
                        hideparrafo={true}
                        hidePassword={true}
                        validarclassName="accede"
                        linkclassName="contraseña-link"
                        buttonclassName="containe"
                        buttonclassNamed="signup-btn custom-btn"
                        linkTo="/"
                        linkText="Acceder a tu cuenta"
                        buttonText="Validar"
                 />

                )}
                {currentStep === 2 && (

                    <LoginFormulario
                        handleSubmit={handleCodeVerification}
                        usernameLabel="Verificar código"
                        sectionclassName="input-container codigo"
                        nombre="fcodigo"
                        usernamePlaceholder="875077"
                        inputType="text"
                        ptexto = "Código de verificación"
                        inpclassName="codigo"
                        username={verificationCode}
                        setUsername={setVerificationCode}
                        labelpassword="Contraseña nueva"
                        password={newPassword}
                        showPassword={showPassword}
                        setShowPassword={setShowPassword}
                        setPassword={setNewPassword}
                        showArrobaIcon={false}
                        validarclassName="acceder"
                        linkclassName="contr-link"
                        buttonclassName="container"
                        buttonclassNamed="signup-btnn custom-btnn"
                        linkTo="/"
                        linkText="Acceder a tu cuenta"
                        buttonText="Cambiar"
                    />
                )}
            </section>
    </section>   
        </>
    )

}

