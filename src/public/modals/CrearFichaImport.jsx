import  PropTypes from "prop-types";
import "../../styles/modal/CustomModal.css";
import { faTimes,faPaperclip } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useState} from "react";
import { useEffect } from "react";


export function CrearFichaImportModal({ isOpen, onClose, title, onSubmit,setDocumentPDF}) {
    
  const [formData, setFormData] = useState({
    ustomer_oc_number: "",
    proforma_number: "",
    freight_contract_number: "",
    container_type: "",
    responsible_user_comex: "",
    san_juan_de_lurigancho: "",
    la_milla: "",
    punta_hermosa: "",
    trebol_san_martin: "",
    total_containers: "",
    currency: "",
    sell_organization: "",
    net_value: "",
    status: "IN PROGRESS",
    status_comment: "",
    document_request: null, 
  });

  const [isSubmitClicked, setIsSubmitClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Nueva variable de estado

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true); // Establecer isLoading en true antes de enviar el formulario
        try {
          await onSubmit(formData);
        } catch (error) {
          console.error("Error al crear la ficha: ", error);
        } finally {
          setIsLoading(false); // Establecer isLoading en false después de enviar el formulario
        }
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

            <div className="form-row">
                    <div className="form-grouppp">
                        <label htmlFor="customer_oc_number">Número de cliente</label>
                        <input className="h"type="text" id="customer_oc_number" name="customer_oc_number"
                        value={formData.customer_oc_number}
                        onChange={handleChange} />
                    </div>

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

            </div>

         
           


            <div className="form-row">

                <div className="form-grouppp">
                    <label htmlFor="total_containers">Total de contenedores</label>
                    <input className="h"type="text" id="total_containers" name="total_containers"
                    value={formData.total_containers}
                    onChange={handleChange} />
                </div>

                <div className="form-grouppp">
                    <label htmlFor="currency">Tipo de moneda</label>
                    <input className="h" type="text" id="currency" name="currency"
                    value={formData.currency}
                    onChange={handleChange} />
                </div>
                <div className="form-grouppp">  
                    <label htmlFor="sell_organization">Organización de venta</label>
                    <input className="h" type="text" id="sell_organization" name="sell_organization"
                    value={formData.sell_organization}
                    onChange={handleChange} />
                </div>

            </div>

            <div className="form-row">

            <div className="form-grouppp">  
                    <label htmlFor="net_value">Valor neto</label>
                    <input className="h" type="text" id="net_value" name="net_value"
                    value={formData.net_value}
                    onChange={handleChange} />
                </div>

            <div className="form-grouppp">
                <label htmlFor="status">Estado</label>
                <input className="hw"type="text" id="status" name="status"
                value={formData.status}
                onChange={handleChange}
                disabled />
                
              </div>

              <div className="form-grouppp">
            <label htmlFor="document_request">Documento (Obligatorio)</label>
            <div className="file-input-container">
              <input className="h"type="file"id="document_request"name="document_request"
                accept=".pdf, .xls, .xlsx, .doc, .docx, .ppt, .pptx, .jpg, .png"
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
          </div>

          <div className="form-grouppp">
                <label htmlFor="status_comment">Comentario de estado</label>
                <textarea className="area" id="status_comment" name="status_comment"
                value={formData.status_comment}
                onChange={handleChange}
                placeholder="The exportation process is approved."/>
          </div>

              <div className="customModal__buttons">
                <button className="signup-btn" type="submit" disabled={isLoading}>
                  {isLoading ? (
                <span>
                  <FontAwesomeIcon icon={faSpinner} spin /> Creando Ficha...
                  </span>
                  ) : ( 
                  
                  "Crear Ficha"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      );
    }
    
    CrearFichaImportModal.propTypes = {
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