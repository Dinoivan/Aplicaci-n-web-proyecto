import  PropTypes from "prop-types";
import "../../styles/modal/CustomModal.css";
import { faTimes,faPaperclip } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { useState} from "react";
import { useEffect } from "react";


export function CustomModal({ isOpen, onClose, title, onSubmit,setDocumentPDF,openAssignFichaModal}) {


  const [formData, setFormData] = useState({
    proforma_number: "",
    freight_contract_number: "",
    container_type: "",
    responsible_user_comex: "",
    document_request: null, // Para el campo de archivo
  });

  const [isSubmitClicked, setIsSubmitClicked] = useState(false); // Nuevo estado

  useEffect(() => {
    if (isSubmitClicked) {
      // Si se hizo clic en "Crear Ficha," abre el segundo modal
      setIsSubmitClicked(false); // Reinicia el estado para futuros usos

    }
  }, [isSubmitClicked]);

  

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    setFormData({
      ...formData,
      [name]: type === "file" ? files[0] : value,
    });
    if (type === "file") {
      console.log("Archivo seleccionado:", files[0]);
      setDocumentPDF(files[0]); // Actualiza el estado de documentPDF cuando se selecciona un archivo
    }
  };

  // Agrega console.log para imprimir los valores
  console.log("formData:", formData);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
          onSubmit(formData);
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
                <label htmlFor="proforma_number">N° de proforma</label>
                <input className="h" type="text" id="proforma_number" name="proforma_number"
                value={formData.proforma_number}
                onChange={handleChange} />
              </div>
              <div className="form-grouppp">  
                <label htmlFor="freight_contract_number">N° de contrato de flete vigente</label>
                <input className="h" type="text" id="freight_contract_number" name="freight_contract_number"
                value={formData.freight_contract_number}
                onChange={handleChange} />
              </div>
              <div className="form-grouppp">
                <label htmlFor="container_type">Tipo de contenedor</label>
                <input className="h"type="text" id="container_type" name="container_type"
                value={formData.container_type}
                onChange={handleChange} />
              </div>
              <div className="form-grouppp">
                <label htmlFor="responsible_user_comex">Usuario responsable</label>
                <input className="h" type="text"id="responsible_user_comex" name="responsible_user_comex"
                value={formData.responsible_user_comex}
                onChange={handleChange} />
              </div>

              <div className="form-grouppp">
            <label htmlFor="document_request">Documento (Obligatorio)</label>
            <div className="file-input-container">
              <input className="h"type="file"id="document_request"name="document_request"
                accept=".pdf"
                onChange={handleChange}
                style={{ display: "none" }}
              />

              <div className="custom-file-input">
                <input className="h"type="text"readOnly
                  value={formData.document_request ? formData.document_request.name : "Sin archivo seleccionado"}
                />
                <button className="attach-button" onClick={() => document.getElementById("document_request").click()}>
                  <FontAwesomeIcon icon={faPaperclip} />
                </button>
              </div>
            </div>
          </div>


              <div className="customModal__buttons">
                <button className="signup-btn" type="submit"onClick={openAssignFichaModal}>Crear Ficha</button>
              </div>
            </form>
          </div>
        </div>
      );
    }
    
    CustomModal.propTypes = {
      isOpen: PropTypes.bool.isRequired,
      onClose: PropTypes.func.isRequired,
      title: PropTypes.string.isRequired,
      onSubmit: PropTypes.func,
      values: PropTypes.object,
      handleInputChange_: PropTypes.func,
      setDocumentPDF: PropTypes.func,
      openAssignFichaModal: PropTypes.func,
      isModalDataComplete: PropTypes.func

    };