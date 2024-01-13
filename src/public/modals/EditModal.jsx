import  PropTypes from "prop-types";
import "../../styles/modal/CustomModal.css";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export function EditModal({ isOpen, onClose, title, onSubmit }) {
    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit();

    };
                          
    return (
        <div className="customModal">
          <div className="customModal__content">
            <div className="direccion">
            <button  className="signup-x" onClick={onClose}>
            <FontAwesomeIcon icon={faTimes}/>
            </button>
            </div>
        
            <h2>{title}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-grouppp">
                <label htmlFor="proformaNumber">N° de proforma</label>
                <input className="h" type="text" id="proformaNumber" name="proformaNumber"  />
              </div>
              <div className="form-grouppp">
                <label htmlFor="fleteNumber">N° de contrato de flete vigente</label>
                <input className="h" type="text" id="fleteNumber" name="fleteNumber" />
              </div>
              <div className="form-grouppp">
                <label htmlFor="containerType">Tipo de contenedor</label>
                <input className="h" type="text" id="containerType" name="containerType" />
              </div>
              <div className="form-grouppp">
                <label htmlFor="responsibleUser">Usuario responsable</label>
                <input className="h" type="text" id="responsibleUser" name="responsibleUser"  />
              </div>
              <div className="customModal__buttons">
                <button className="signup-btn" type="submit">Editar</button>
              </div>
            </form>
          </div>
        </div>
      );
    }
    
    EditModal.propTypes = {
      isOpen: PropTypes.bool.isRequired,
      onClose: PropTypes.func.isRequired,
      title: PropTypes.string.isRequired,
      onSubmit: PropTypes.func.isRequired,
    };