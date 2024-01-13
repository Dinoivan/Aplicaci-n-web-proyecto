
import {useLoginState} from '../../hooks/login/useLoginState';
import {ErrorModal} from "../modals/ErrorModal";
import {LoginFormulario} from './LoginFormulario';
import {LoginPublicidad } from './LoginPublicidad';
import {useLoginProcess} from '../../hooks/login/useLoginProcess';
import {validateLoginData } from '../../helpers/login/Validations';
import "../../styles/login/Login.css"

export function Login() {
    
    const {isModalOpen, setIsModalOpen,errorMessage,setErrorMessage,username, setUsername,
           password, setPassword,showPassword, setShowPassword} = useLoginState();

    const handleLogin = useLoginProcess(setIsModalOpen,setErrorMessage);


    const handleSubmit = async (event) =>{
        event.preventDefault();
        const errorMessage = validateLoginData(username,password);

        if(errorMessage){
            setIsModalOpen(true);
            setErrorMessage(errorMessage);
        }else{
            handleLogin(username,password);
        }
    }
    
    const closeModal = () => {
        setIsModalOpen(false);
    };

  return (
    <>
    <ErrorModal isOpen={isModalOpen} onClose={closeModal} message={errorMessage} />
      <section className="split-screen">
            <section className="left">
                <LoginPublicidad/>
            </section>
            <section className="right">
                <LoginFormulario
                username={username}
                setUsername={setUsername}
                password={password}
                setPassword={setPassword}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
                handleSubmit={handleSubmit}
                /> 
            </section>
     </section>
    </>
  )
}

