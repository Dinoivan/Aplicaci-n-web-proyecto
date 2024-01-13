import  PropTypes from "prop-types";
import "../../styles/modal/CustomModal.css";
import { faTimes} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useState} from "react";
import { useEffect } from "react";
import {ErrorModal,Error} from "../modals/ErrorModal";
import { ResponsablesExpertaciones } from "../../services/exportaciones/listapedidosServices";
import { useAuth } from "../../contexts/Authutils";

export function CrearFichaModal({ isOpen, onClose, title, onSubmit,setDocumentPDF,pedidosSeleccionados,pedidosmodal}) {

  const selectedPedidosInfo = pedidosmodal.filter((pedido) => pedidosSeleccionados.includes(pedido.id));
  
  const [formData, setFormData] = useState({
    proforma_number: "",
    freight_contract_number: "",
    customer_oc_number: "",
    container_type: "",
    responsible_user_comex: "",
    san_juan_de_lurigancho: "",
    la_milla: "",
    punta_hermosa: "",
    trebol_san_martin: "",
    total_containers: "0",
    status: "START",
    status_comment: "",
  });

  const [isSubmitClicked, setIsSubmitClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Nueva variable de estado
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [isDocumentSelected,setIsDocumentSelected] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const [userOptions, setUserOptions] = useState([]);

   //Token para acceder a las funcionales de la aplicación
   const { accessToken } = useAuth();


  useEffect(() => {
    if (isSubmitClicked) {
      // Si se hizo clic en "Crear Ficha," abre el segundo modal
      setIsSubmitClicked(false); // Reinicia el estado para futuros usos

    }
  }, [isSubmitClicked]);

    //Se utiliza datos de pedidos
    useEffect(() => {
      async function fetchData() {
        try {
          const resul = await ResponsablesExpertaciones(accessToken);
          setUserOptions(resul);
        } catch (error) {
          console.log("Error al obtener los datos");
        }
      }
      fetchData();
    }, [setUserOptions,accessToken]);
  
    console.log("Lista de usuarios: ",userOptions);

 

  const transporteOptions = [
    "Marítima",
    "Aérea",
    "Terrestre"
  ]

  const handleFileChange = (e) => {
    const { files } = e.target;
  
    if (files.length > 0) {
      setDocumentPDF(files[0]);
      setIsDocumentSelected(true);
      setUploadedFile(files[0]);
      setIsFileUploaded(true);
    } else {
      // Si no se selecciona ningún archivo, elimina el archivo cargado
      setDocumentPDF(null);
      setIsDocumentSelected(false);
      setUploadedFile(null);
      setIsFileUploaded(false);
    }
  };

  const handleDeleteFile = () => {
    setDocumentPDF(null);
    setIsDocumentSelected(false);
    setUploadedFile(null);
    setIsFileUploaded(false);
  };

  const truncateFileName = (fileName, maxLength) => {
    if (fileName.length > maxLength) {
      return fileName.substring(0, maxLength) + "...";
    } else {
      return fileName;
    }
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (["san_juan_de_lurigancho", "la_milla", "punta_hermosa", "trebol_san_martin"].includes(name)) {
      const numericValue = parseFloat(value.replace(/[^0-9.]/g, '')) || 0;

      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: type === "file" ? files[0] : numericValue,
      }));

      setFormData((prevFormData) => {
        const sum =
          parseFloat(prevFormData.san_juan_de_lurigancho || 0) +
          parseFloat(prevFormData.la_milla || 0) +
          parseFloat(prevFormData.punta_hermosa || 0) +
          parseFloat(prevFormData.trebol_san_martin || 0);

        return {
          ...prevFormData,
          total_containers: sum.toString(), // Convierte a cadena sin redondeo
        };
      });
    } else {
      // Para otros campos, simplemente actualiza el estado sin cálculos
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: type === "file" ? files[0] : value,
      }));
  
    }
  };

  // Agrega console.log para imprimir los valores
  console.log("formData:", formData);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
          !formData.proforma_number ||
          // !formData.freight_contract_number ||
          !formData.container_type ||
          !formData.responsible_user_comex ||
          !isDocumentSelected
        ) {
          // Mostrar un mensaje de error o realizar alguna acción
          setIsErrorModalOpen(true);
          return;
        }
    
        setIsLoading(true); // Establecer isLoading en true antes de enviar el formulario
        try {
        const response = await onSubmit(formData);
        console.log("Respuesta: ",response);
          

        } catch (error) {
          console.error("Error al crear la ficha: ", error);
        } finally {


          setIsLoading(false); // Establecer isLoading en false después de enviar el formulario
        }
      };
    return (

        <div className="customModal">
          <div className="customModal__content">

          {pedidosSeleccionados.length === 0 ? (

                <ErrorModal isOpen={true} onClose={onClose} message="Selecciona al menos un pedido para crear  una ficha." /> 

                ) : pedidosSeleccionados.length === 1 || new Set(selectedPedidosInfo.map((pedido) => pedido.sell_organization)).size === 1 ? (
                  <>

                          <div className="direccion">
                            <button  className="signup-x" onClick={onClose}>
                              <FontAwesomeIcon icon={faTimes}/>
                              </button>
                          </div>

                            <h2>{title}</h2>

                            <form onSubmit={handleSubmit} encType="multipart/form-data" >

                                    <div className="form-row">

                                            <div className="form-grouppp">
                                                <label htmlFor="proforma_number">N° de proforma <span className="required">*</span></label>
                                                <input className="h" type="text" id="proforma_number" name="proforma_number"
                                                value={formData.proforma_number}
                                                onChange={handleChange} 
                                                placeholder="Ingrese número de proforma"/>
                                            </div>

                                            <div className="form-grouppp">
                                                <label htmlFor="container_type">Tipo de contenedor <span className="required">*</span></label>
                                                <input className="h"type="text" id="container_type" name="container_type"
                                                value={formData.container_type}
                                                onChange={handleChange}
                                                placeholder="Ingrese tipo de contenedor"/>
                                            </div>

                                            <div className="form-grouppp">
                                                <label htmlFor="freight_contract_number">N° de contrato de flete vigente <span className="required"></span></label>
                                                <input className="h" type="text" id="freight_contract_number" name="freight_contract_number"
                                                value={formData.freight_contract_number}
                                                onChange={handleChange} 
                                                placeholder="Ingrese un número"/>
                                            </div>

                                    </div>

                                      <div className="form-row">

                                              <div className="form-grouppp">
                                                  <label htmlFor="responsible_user_comex">Usuario responsable <span className="required">*</span></label>
                                                      <select className="h" id="responsible_user_comex" name="responsible_user_comex"
                                                        value={formData.responsible_user_comex}
                                                        onChange={handleChange}
                                                      >
                                                        <option value="">Selecciona un usuario</option>
                                                        {userOptions.map((user, index) => (
                                                          <option key={index} value={user}>
                                                            {user}
                                                          </option>
                                                        ))}
                                                      </select>
                                              </div>

                                            <div className="form-grouppp">
                                                <label htmlFor="san_juan_de_lurigancho">San Juan de Lurigancho</label>
                                                <input className="h" type="text" id="san_juan_de_lurigancho" name="san_juan_de_lurigancho"
                                                value={formData.san_juan_de_lurigancho}
                                                onChange={handleChange} 
                                                placeholder="Ingrese un número"/>
                                            </div>

                                            <div className="form-grouppp">
                                                <label htmlFor="la_milla">La milla</label>
                                                <input className="h"type="text" id="la_milla" name="la_milla"
                                                value={formData.la_milla}
                                                onChange={handleChange} 
                                                placeholder="Ingrese un número"/>
                                            </div>

                                    </div>


                                    <div className="form-row">

                                            <div className="form-grouppp">
                                                <label htmlFor="punta_hermosa">Punta hermosa</label>
                                                <input className="h" type="text" id="punta_hermosa" name="punta_hermosa"
                                                value={formData.punta_hermosa}
                                                onChange={handleChange} 
                                                placeholder="Ingrese un número"/>
                                            </div>

                                            <div className="form-grouppp">
                                                <label htmlFor="trebol_san_martin">Trebol San Martin</label>
                                                <input className="h" type="text" id="trebol_san_martin" name="trebol_san_martin"
                                                value={formData.trebol_san_martin}
                                                onChange={handleChange} 
                                                placeholder="Ingrese un número"/>
                                            </div>

                                            <div className="form-grouppp">
                                                <label htmlFor="total_containers">Total de contenedores</label>
                                                <input className="h hwd"type="text" id="total_containers" name="total_containers"
                                                value={formData.total_containers}
                                                onChange={handleChange} disabled/>
                                           </div>
                                    </div>

                                    <div className="form-rows">

                                            <div className="form-grouppp">
                                                <label htmlFor="status">Estado</label>
                                                <input className="h hwd"type="text" id="status" name="status"
                                                value={formData.status}
                                                onChange={handleChange}
                                                disabled />
                                            </div>

                                            <div className="form-grouppp">

                                                    <label htmlFor="responsible_user_comex">Vía</label>
                                                        <select
                                                          className="h"
                                                          id="responsible_user_comex"
                                                          name="responsible_user_comex"
                                                          // value={formData.responsible_user_comex}
                                                          // onChange={handleChange}
                                                        >
                                                          <option value="">Selecciona transporte</option>
                                                          {transporteOptions.map((transporte, index) => (
                                                            <option key={index} value={transporte}>
                                                              {transporte}
                                                            </option>
                                                          ))}
                                                        </select>
                                            </div>

                                            
                                            <div className="form-grouppp">
                                                <label htmlFor="customer_oc_number">Número de PO (OC de cliente)</label>
                                                <input className="h"type="text" id="customer_oc_number" name="customer_oc_number"
                                                value={formData.customer_oc_number}
                                                onChange={handleChange} placeholder="order de compra"/>
                                           </div>
                                    </div>

                                    <div className="form-rows_">

              
                                    <div className="form-grouppp">

                                                <label htmlFor="document_request">Documento (Obligatorio)  <span className="required">*</span></label>
                                                <div className="file-upload-container">
                                                  <input
                                                    type="file"
                                                    id="document_request"
                                                    name="document_request"
                                                    accept=".pdf, .xls, .xlsx, .doc, .docx, .ppt, .pptx, .jpg, .png"
                                                    onChange={handleFileChange}
                                                    style={{ display: "none" }}
                                                  />
                                                  <label htmlFor="document_request" className="file-upload-btn btn--ico" style={{color: 'white'}} disabled={isFileUploaded}>
                                                  <i className="bi bi-upload"></i>
                                                    Seleccionar Archivo
                                                  </label>
                                                  
                                                  {uploadedFile && (
                                                    <div className="file-info">
                                                      <span className="file-name">{truncateFileName(uploadedFile.name, 20)}</span>
                                                      <button className="delete-file-btn" onClick={() => handleDeleteFile()}>
                                                        X
                                                      </button>
                                                    </div>
                                                  )}
                                                </div>
                                          </div>

                                    </div>

                                    <div className="form-grouppp">
                                          <label htmlFor="status_comment">Comentario de estado</label>
                                          <textarea className="area" id="status_comment" name="status_comment"
                                          value={formData.status_comment}
                                          onChange={handleChange}
                                          placeholder="Ingrese un comentario"/>
                                    </div>

                                    <div className="customModal__buttons">
                                        <button className="btn btn__primary btn--ico" type="submit" disabled={isLoading}>
                                          {isLoading ? (
                                        <span>
                                          <FontAwesomeIcon icon={faSpinner} spin /> Creando Ficha...
                                          </span>
                                          ) : (

                                          "Crear Ficha"
                                          )}
                                        </button>
                                    </div>

                                      {/* Mostrar el ErrorModal si isErrorModalOpen es true */}
                                    {isErrorModalOpen && (
                                      <Error isOpen={true} onClose={() => setIsErrorModalOpen(false)} message="Completa todos los campos obligatorios." />
                                    )}                         
                          </form>
                  </>
                      
                ) : (
                <>
                  <ErrorModal isOpen={true} onClose={onClose} message="Error organizaciones de venta diferente." /> 
            </>
            )}
          </div>
        </div>
      );
    }

    CrearFichaModal.propTypes = {
      isOpen: PropTypes.bool.isRequired,
      onClose: PropTypes.func.isRequired,
      title: PropTypes.string.isRequired,
      onSubmit: PropTypes.func,
      values: PropTypes.object,
      handleInputChange_: PropTypes.func,
      setDocumentPDF: PropTypes.func,
      openAssignFichaModal: PropTypes.func,
      isModalDataComplete: PropTypes.func,
      pedidosSeleccionados: PropTypes.array.isRequired,
      pedidosmodal: PropTypes.array.isRequired,
      crearFichaStatus: PropTypes.shape({
        success: PropTypes.bool,
        message: PropTypes.string,
      }),

    };