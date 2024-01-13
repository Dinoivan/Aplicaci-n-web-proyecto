import PropTypes from 'prop-types';
import "../../styles/modal/ErrorModal.css";
import "../../styles/global/button.css";
import { FaCheck,FaTimes } from 'react-icons/fa';
import { faUnlink,faAsterisk  } from "@fortawesome/free-solid-svg-icons"; // Asegúrate de importar el icono correcto
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

//Maneja solo error
export function ErrorModal({ isOpen, onClose, message }) {
    if (!isOpen) return null;
    return (
        <div className="errorModal">
             <FaTimes size={30} color="red" />
            <p className='errorText'>{message}</p>
            <button onClick={onClose}>Cerrar</button>
        </div>
    );
}

ErrorModal.propTypes = 
{isOpen: PropTypes.bool.isRequired,
onClose: PropTypes.func.isRequired,
message: PropTypes.string.isRequired};


//Modal
 export function Error({isOpen,onClose,message}){
     if(!isOpen)return null;
     return (
         <div className='error_'>
            <FontAwesomeIcon icon={faAsterisk} size={500} color='red'/>
            <p className='error_Text'>{message}</p>
            <button onClick={onClose}>Cerrar</button>
        </div>
        
     );
 }

 Error.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    message: PropTypes.string.isRequired
 }

//Maneja error y exito
export function Verificacion({isOpen,onClose,data}){
    if(!isOpen)return null;

    return(

   data.title && (
    <div className="confirmation-modal">
      <div className="confirmation-modal__content">
        {data.icon === 'check' && <FaCheck size={30} color="green" style={{ margin: 'auto' }}/>}
        {data.icon === 'times' && <FaTimes size={30} color="red" style={{ margin: 'auto' }}/>}
        <p className='error_Tdata'>{data.message}</p>
         <button onClick={onClose}>Cerrar</button> 
      </div>
    </div>
    )

    );
}

Verificacion.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    data: PropTypes.shape({
        title: PropTypes.string.isRequired,
        message: PropTypes.string.isRequired,
        icon: PropTypes.string.isRequired
    })
}


//Maneja error y exito con 2 botones si o no
export function Validacion({isOpen,onConfirm,onCancel,data}){
    if (!isOpen)return null;
    return (
        data.title && (
            <div className="confirmation-modal">
                <div className="confirmation-modal__content">
                    <FontAwesomeIcon icon={faUnlink} size='3px' color='#ff0000' style={{marginBottom: "10px"}}/>
                    <p>{data.message}</p>
                    <button onClick={onConfirm}>Si</button>
                    <button onClick={onCancel}>No</button>
                </div>
            </div>
        )
    );
}



Validacion.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onConfirm: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    data:PropTypes.shape({
        title: PropTypes.string.isRequired,
        message: PropTypes.string.isRequired,
        icon: PropTypes.string.isRequired
    })
}

