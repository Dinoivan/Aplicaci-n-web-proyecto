import {findAllDocumentary} from "../../../../../../hooks/exportaciones/useDocumentaryProcess";
import { useState,useEffect } from "react";
import { useAuth } from "../../../../../../contexts/Authutils";
import { CrearDocumentos } from "../../../../../../services/exportaciones/DocumentaryManagement";
import { Link } from "react-router-dom";
import { migraDocument } from "../../../../../../hooks/exportaciones/Estados-logicas-pedidos/usePedidosLogica";
import { VisualizarPedidos } from "../../../../../../public/modals/ListarPedidos";
import { usePedidosState } from "../../../../../../hooks/exportaciones/Estados-logicas-pedidos/usePedidosState";
import { fetchDataWithoutFiltersDocumentary } from "../../../../../../hooks/exportaciones/Estados-logicas-pedidos/usePedidosLogica";
import { MigrarModalPreDispath } from "../../../../../../public/modals/MigraSapPreDispath";
import { Verificacion } from "../../../../../../public/modals/ErrorModal";
import { FindAllPedidosDetailsIdFicha } from "../../../../../../services/exportaciones/listapedidosServices";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { Update } from "../../../../../../services/exportaciones/listapedidosServices";
import { SendDocumentManagement } from "../../../../../../services/exportaciones/DocumentaryManagement";
import { FaCheck, FaTimes } from 'react-icons/fa';
// import { GestionFichas} from "../../../../../../services/exportaciones/GestionFichas";

export function DocumentariaPage() {

  // const [data,setData] = useState([]);
  const [ficha,setFicha] = useState([]);
  const { accessToken } = useAuth();
  const [orderNumbers,setOrderNumbers] = useState([]);

  // const [load,setload] = useState("");

  const fichaId = localStorage.getItem('fichaId');
  console.log("Hola soy el id: ",fichaId);
  
  const [packingListFile, setPackingListFile] = useState(null);
  const [shipmentFile, setshipmentFile] = useState(null);
  const [fumigationFile, setfumigationFile] = useState(null);
  const [originFile, setOriginFile] = useState(null);
  const [sunatFile, setSunatFile] = useState(null);
  const [otherFile, setOtherFile] = useState(null);

  const [textoLibre,setTextoLibre] = useState("");

  // const [file1,setFile1] = useState(null);
  // const [file2,setFile2] = useState(null);
  // const [file3,setFile3] = useState(null);
  // const [file4,setFile4] = useState(null);
  // const [file5,setFile5] = useState(null);


  const [selectedFileCount, setSelectedFileCount] = useState(1);

  const handleFileCountChange = (e) => {
    const count = parseInt(e.target.value, 10) || 1;
    setSelectedFileCount(count);

    // Ajustar el estado fileState para establecer archivos adicionales en null
    setFileState((prevFileState) => {
      const newState = { ...prevFileState };
      for (let i = count + 1; i <= 10; i++) {
        const fileType = `file${i}`;
        newState[fileType] = "";
      }
      return newState;
   });

    
  };

  const [fileState, setFileState] = useState({
    file1: "",
    file2: "",
    file3: "",
    file4: "",
    file5: "",
    file6: "",
    file7: "",
    file8: "",
    file9: "",
    file10: "",
  });

  const handleFileChangeEnvioCorreo = (file, fileType) => {
    setFileState((prevFileState) => ({
      ...prevFileState,
      [fileType]: file,
    }));
  };

  const renderFileInputContainers = () => {
    const fileInputs = [];
    for (let i = 1; i <= selectedFileCount; i++) {
      const fileType = `file${i}`;
      fileInputs.push(
        <div key={i} className="form mb-4">
          <label>{`Archivo ${i}`}</label>
          <div className="form__file">
            <input
              type="file"
              id={fileType}
              onChange={(e) => handleFileChangeEnvioCorreo(e.target.files[0], fileType)}
            />
            <label htmlFor={fileType} className="btn btn__primary--outline">
              Adjuntar
            </label>
            {fileState[fileType] && <span>{fileState[fileType].name}</span>}
          </div>
        </div>
      );
    }
    return fileInputs;
  };

  const [mostrarIngreso, setMostrarIngreso] = useState(true); // Nuevo estado para controlar qué sección mostrar
  const [ListarFactura,setListarFactura] = useState(false);
  const [ListarPedidosFactura,setListarPedidosFactura] = useState(false);

   // const [Ingreso, setIngreso] = useState(true);
   const [mostrarModal, setMostrarModal] = useState(false);

  //  const [prueba_,setPrueba_] = useState([]);

   const [modalDataInformation, setModalDatainformation] = useState({
    title: "",
    message: "",
    icon: "",
  });
  
  const [errorMessage, setErrorMessage] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const [cargarndo,setCargando] = useState(false);

  //Estado para almacenar los correos ingresados
  const [formData, setFormData] = useState({
    to: [],
  });

  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       const resul = await GestionFichas(accessToken);
  //       setFicha(resul);
  //       setMostrarIngreso(resul.length === 0);
  //     } catch (error) {
  //       console.log("Error al obtener los datos");
  //     }
  //   }
  //   fetchData();
  // }, [setFicha,accessToken]);

  console.log("Resultado de todas las fichas: ",ficha);

  //Estado para almacenar un correo 
 const [email,setEmail] = useState("");

 //Evento para actaulizar los correos electrónicos
  const handleEmailsChange = (e) => {
    const { value } = e.target;
    setEmail(value.trim());
    setErrorMessage("");
    
  };


  const {modalData,setModalData,isMigrarModalOpen, setIsMigrarModalOpen,
  } = usePedidosState();

     //Se utiliza datos de pedidos
     useEffect(() => {
      async function fetchData() {
        try {
          const resul = await findAllDocumentary(fichaId,accessToken);
          setListarFactura(resul);
        } catch (error) {
          console.log("Error al obtener los datos");
        }
      }
      fetchData();
    }, [fichaId,setListarFactura,accessToken]);

    useEffect(() => {
      async function fetchData() {
        try {
          const resultado = await FindAllPedidosDetailsIdFicha(fichaId, accessToken);
          setFicha(resultado);
          setMostrarIngreso(
            resultado[0].exportation.packing_list_path === null && resultado[0].exportation.shipment_document_path === null  && resultado[0].exportation.fumigation_certificate_path === null && resultado[0].exportation.origin_certificate_path === null  && resultado[0].exportation.sunat_invoice_path === null && resultado[0].exportation.other_document_path === null);
          console.log("Hola soy el id: ",fichaId)
          const newOrderNumbers = resultado.map((pedido) => pedido.order_number);
          setOrderNumbers((prevOrderNumbers) => [...prevOrderNumbers, ...newOrderNumbers]);
        } catch (error) {
          console.log("Error al obtener los datos");
        }
      }
      fetchData();
    }, [fichaId,setOrderNumbers,accessToken]);

    //Evento de Migrar Sap
   const handleMigrarSapDocumentary =  async () =>{
    try{
    if(orderNumbers.length>0){
     await migraDocument(accessToken,orderNumbers,setModalData,setIsMigrarModalOpen,fetchDataWithoutFiltersDocumentary,fichaId,setListarFactura,setIsLoading);
    }
     }catch(error){
    console.error("Error al migrar sap: ",error);
  }
};

    console.log("Prueba: ",ListarFactura);

    const handleCloseModal = () => {
      setModalData({
        title: "",
        message: "",
        icons: ""
      });
    };


  const handleFileChange = (file, fileType) => {
    // Actualiza el estado correspondiente según el tipo de archivo
    switch (fileType) {
      case "packingList":
        setPackingListFile(file);
        break;
        case "shipmentList":
          setshipmentFile(file);
        break;
        case "fumigationList":
          setfumigationFile(file);
        break;
        case "originList":
          setOriginFile(file);
        break;
        case "sunatList":
          setSunatFile(file);
        break;
        case "otherList":
          setOtherFile(file);
        break;
      // Agrega más casos para otros tipos de archivos
      default:
        break;
    }
  };



  const handleListar = () =>{
    setListarPedidosFactura(true);
  }

  const handleSaveClick = async () => {
    // Lógica para manejar la subida del archivo al servidor
    try {
      // Asegúrate de tener exportationId actualizado antes de llamar a CrearDocumentos
      const response = await CrearDocumentos(accessToken,fichaId,packingListFile,shipmentFile,fumigationFile,originFile,sunatFile,otherFile);
      console.log("Documentos: ",response);

      await Update(accessToken, { id: fichaId, status: 'SENT' });
      console.log('Ficha aprobada');
      // setMostrarIngreso(false);

      window.location.href =  `/features/exportaciones/ficha/zarpe?exportation_id=${fichaId}`;
    
      // Maneja la respuesta del servidor, actualiza el estado, etc.

    } catch (error) {
      console.error("Error al subir archivos: ", error);
    }
  }

  console.log("Mostrar: ",mostrarIngreso);

  console.log("Numero de ficha")

  // useEffect(() => {
  //   console.log("useEffect - Inicio");
  //   async function fetchData() {
  //     try {

  //       if(!accessToken){
  //         console.error("No se encontro un token disponible");
  //         return;
  //       }
  //       const fichaData = await findAllDocumentary(fichaId,accessToken);
  //       setData(fichaData);
  //       // setMostrarIngreso(fichaData.length === 0);
   
        
  //     } catch (error) {
  //       console.error("Error al obtener los datos");
  //     }
  //   }
  //   fetchData();
  // }, [fichaId,accessToken]);


  // console.log("Hola soy la data: ",data);

  //Evento para enviar correo y documentos

  const handleEnviarCorreosDocumentos = async () => {

    setCargando(true); // Establecer isLoading en true antes de enviar el formulario
    try {


      const correoData = {
        free_text: textoLibre,
        exportation: fichaId,
        recipients: formData.to,
         file_1: fileState.file1,
         file_2: fileState.file2,
         file_3: fileState.file3,
         file_4: fileState.file4,
         file_5: fileState.file5,
         file_6: fileState.file6,
         file_7: fileState.file7,
         file_8: fileState.file8,
         file_9: fileState.file9,
         file_10: fileState.file10
        // ...otros datos necesarios
      };

  
    
    console.log('Archivos seleccionados:', correoData);
  
      const verificacion = await SendDocumentManagement(accessToken, correoData);
    
      console.log("Correos después de enviar: ", formData.to);
      console.log("Verificacion: ",verificacion);
      setModalDatainformation({
        title: "Éxito",
        message: "Información enviada correctamente",
        icon: "check",
      });
      setMostrarModal(true);
    } catch (error) {
      console.error("Error al enviar correos", error);
      setModalDatainformation({
        title: "Error",
        message: "Error al enviar correos",
        icon: "times",
      });
      setMostrarModal(true);
    } finally {
        setCargando(false); // Establecer isLoading en true antes de enviar el formulario
    }
  };


  const isValidEmail = (email) =>{
     // Expresión regular para validar el formato de correo electrónico
      const emailRegex = /^[a-zA-Z][a-zA-Z0-9._-]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return emailRegex.test(email);
  }

  const handleAddEmail = () => {
    // Extraer correos electrónicos de la cadena
    const extractedEmails = email.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g) || [];
  
    // Filtrar correos electrónicos válidos
    const validEmails = extractedEmails.filter((e) => isValidEmail(e));
  
    if (validEmails.length > 0) {
      setFormData((prevFormData) => {
        // Obtener correos electrónicos actuales
        const currentEmails = prevFormData.to || [];
  
        // Crear un conjunto (Set) para filtrar correos electrónicos únicos
        const uniqueEmailsSet = new Set([...currentEmails.map((e) => e.email.toLowerCase()), ...validEmails.map((e) => e.toLowerCase())]);
  
        // Convertir el conjunto de vuelta a un array de objetos
        const newTo = [...uniqueEmailsSet].map((email) => ({ email }));
  
        return { ...prevFormData, to: newTo };
      });
      setEmail("");
      setErrorMessage("");
    } else {
      setErrorMessage("Ingresa al menos un correo electrónico válido");
    }
  };

  // const handleAddEmail = () => {
  //   // Extraer correos electrónicos de la cadena
  //   const extractedEmails = email.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g) || [];
  
  //   // Filtrar correos electrónicos válidos
  //   const validEmails = extractedEmails.filter((e) => isValidEmail(e));
  
  //   if (validEmails.length > 0) {
  //     setFormData((prevFormData) => {
  //       // Agregar correos electrónicos válidos al estado
  //       const newTo = [...(prevFormData.to || []), ...validEmails.map((e) => ({ email: e }))];
  //       return { ...prevFormData, to: newTo };
  //     });
  //     setEmail("");
  //   } else {
  //     setErrorMessage("Ingresa al menos un correo electrónico válido");
  //   }
  // };

  
  const handleRemoveEmail = (index) => {
    const updateEmail = [...formData.to];
    updateEmail.splice(index,1);
    setFormData((prevFormData) => ({...prevFormData,to: updateEmail}));
  };

  const handleRemoveAllEmails = () => {
    setFormData((prevFormData) => ({...prevFormData,to: []}));
  };

  console.log("Hola: ",formData.to)


    
    return(
        <>
				
        
        {mostrarIngreso ? (
          <>


<section>

  

             
<div className="headbar__detail_d">
                    <>
                    <h3>Gestión Documentaria</h3>

                      <div >
                              <button className="btn btn--ico btn--medium btn__secondary--outline" onClick={handleMigrarSapDocumentary} disabled={isLoading}>
                                  {isLoading ? (
                                                <span>
                                                  <FontAwesomeIcon icon={faSpinner} spin /> Migrando...
                                                </span>
                                              ) : (
                                                "Migrar"
                                    )}
                              </button>
                          
                          </div>


                          <div className="c">
                            <button className="btn btn__pedidos btn--ico"  onClick={handleListar}>
                              <i className="bi bi-hash"></i>
                               Lista de pedidos
                             </button>
                            {/* Modal de Aprobación */}
                              <VisualizarPedidos
                                isOpen={ListarPedidosFactura}
                                onClose={() => setListarPedidosFactura(false)}
                                title="Relacion de pedidos"
                              />
                        </div>
                    
                    </>
                </div>
  </section>

           {isMigrarModalOpen && (
                <MigrarModalPreDispath
                isOpen={isMigrarModalOpen}
                onClose={() => setIsMigrarModalOpen(false)}
                onMigrarClick={handleMigrarSapDocumentary}
                />
              )}

            

                <Verificacion
              isOpen={true} onClose={handleCloseModal} data={modalData}/>    


            <section className="gestion">
					<div className="gestion__form">
						<div className="form mb-3">
								<label>Packing list</label>
								<div className="form__file">
									<input type="file" id="packing"
                   onChange={(e) => handleFileChange(e.target.files[0], "packingList")}
                  />
									<label  htmlFor="packing" className="btn btn__primary--outline">Adjuntar</label>
                  {packingListFile && <span>{packingListFile.name}</span>}
								</div>
						</div>

						<div className="form mb-3">
								<label>Documento de embarque</label>
								<div className="form__file">
									<input type="file" id="embarque" 
                  onChange={(e) => handleFileChange(e.target.files[0], "shipmentList")}
                  
                  />
									<label htmlFor="embarque" className="btn btn__primary--outline">Adjuntar</label>
                   {shipmentFile && <span>{shipmentFile.name}</span>}
								</div>
						</div>


						<div className="form mb-3">
								<label>Certificado de fumigación</label>
								<div className="form__file">
									<input type="file" id="fumigacion"
                   onChange={(e) => handleFileChange(e.target.files[0], "fumigationList")} 
                  />
									<label htmlFor="fumigacion" className="btn btn__primary--outline">Adjuntar</label>
                  {fumigationFile && <span>{fumigationFile.name}</span>}
								</div>
						</div>


						<div className="form mb-3">
								<label>Certificado de origen</label>
								<div className="form__file">
									<input type="file" id="origen" 
                   onChange={(e) => handleFileChange(e.target.files[0], "originList")} 
                   />
									<label htmlFor="origen" className="btn btn__primary--outline">Adjuntar</label>
                  {originFile && <span>{originFile.name}</span>}
								</div>
						</div>


						<div className="form mb-3">
								<label>Factura SUNAT</label>
								<div className="form__file">
									<input type="file" id="sunat" 
                   onChange={(e) => handleFileChange(e.target.files[0], "sunatList")} 
                   />
									<label  htmlFor="sunat" className="btn btn__primary--outline">Adjuntar</label>
                  {sunatFile && <span>{sunatFile.name}</span>}
								</div>
						</div>
          


						<div className="form mb-3">
								<label>Otros</label>
								<div className="form__file">
									<input type="file" id="otros" 
                   onChange={(e) => handleFileChange(e.target.files[0], "otherList")} 
                   />
									<label htmlFor="otros" className="btn btn__primary--outline">Adjuntar</label>
                  {otherFile && <span>{otherFile.name}</span>}
								</div>
						</div>


					</div>
 
               <div  className="gestion__tabla">

                    <table className="tabla" cellSpacing="0" cellPadding="0">
                      <thead>
                          <tr>
                            <th className="thead">Nº de factura SAP</th>
                            <th className="thead">Nº de factura SUNAT</th>
                            <th className="thead">Importe SUNAT</th> 
                          </tr> 
                      </thead>
                      <tbody>
					
                      {Array.isArray(ListarFactura) && ListarFactura.length > 0 && ListarFactura.map((factura) => ( 
                      <tr key={factura.id}>
                        <td>{factura.sap_invoice_number || '-'}</td>
                        <td>{factura.update_log || '-'}</td>
                        <td>{factura.sunat_amount || '-'}</td>    
                      </tr>
                     ))}
                      </tbody>
                    </table>


                    <h2 className="centro">Destionatarios</h2>


                            <form>


                                  <div className="form-grouppp-horizontal_">
                                          <div className="form-grouppp">
                                              <label htmlFor="to">Para</label>
                                              <input className={`w ${errorMessage && "error-input"}`} type="email" id="to" name="to" value={email} onChange={handleEmailsChange}/>
                                                  {errorMessage && (
                                                      <div className="error-message">
                                                      <p>{errorMessage}</p>
                                                      </div>
                                                  )}
                                              
                                          </div>
                                          <button type="button" className="btn btn__primary btn--ico" onClick={handleAddEmail} >
                                          <i className="bi bi-plus"></i>
                                              Agregar
                                          </button>

                                          <button type="button" className="btn btn__primary btn--ico" onClick={handleRemoveAllEmails} >
                                          <i className="bi bi-trash"></i>
                                              Eliminar todo
                                          </button>
                                  </div>

                                  <div className="list">
                                          {formData.to.map((emailObj, index) => (
                                              <div key={index} className="list-items" style={{marginTop: index % 5 === 0 ? "0" : "0",display: "flex",justifyContent: "center",alignItems: "center",
                                              }}>
                                              {emailObj.email}
                                              <button
                                                  type="button"
                                                  className="signup-btn_a" style={{marginLeft: "10px"}}   
                                                  onClick={() => handleRemoveEmail(index)}
                                              >
                                                  ❌
                                              </button>
                                              </div>
                                          ))}
                                    </div>

                                  
                                  
                                          <div className="form-grouppp">
                                                <label htmlFor="status_comment">Motivo</label>
                                                <textarea className="area" id="status_comment" name="status_comment"
                                                value={textoLibre}
                                                onChange={(e) => setTextoLibre(e.target.value)}
                                                placeholder="Ingres motivo"/>
                                        </div>


                                        {/* <section className="gestion_">
                                              <div className="gestion__formm">

                                                  <div className="formm mb-4">
                                                      <label>Archivo 1</label>
                                                      <div className="form__file">
                                                          <input type="file" id="file1"
                                                          onChange={(e) => handleFileChangeEnvioCorreo(e.target.files[0], "file1List")}
                                                          />
                                                          
                                                          <label  htmlFor="file1" className="btn btn__primary--outline">Adjuntar</label>
                                                          {file1 && <span>{file1.name}</span>}
                                                          </div>
                                                      </div>
                                                      
                                                      <div className="form mb-4">
                                                          <label>Archivo 2</label>
                                                          <div className="form__file">
                                                              <input type="file" id="file2" 
                                                              onChange={(e) => handleFileChangeEnvioCorreo(e.target.files[0], "file2List")}
                                                              />
                                                              <label htmlFor="file2" className="btn btn__primary--outline">Adjuntar</label>
                                                              {file2 && <span>{file2.name}</span>}
                                                         </div>
                                                      </div>

                                                      <div className="form mb-4">
                                                          <label>Archivo 3</label>
                                                          <div className="form__file">
                                                              <input type="file" id="file3" 
                                                              onChange={(e) => handleFileChangeEnvioCorreo(e.target.files[0], "file3List")}
                                                              />
                                                              <label htmlFor="file3" className="btn btn__primary--outline">Adjuntar</label>
                                                              {file3 && <span>{file3.name}</span>}
                                                         </div>
                                                      </div>

                                                      <div className="form mb-4">
                                                          <label>Archivo 4</label>
                                                          <div className="form__file">
                                                              <input type="file" id="file4" 
                                                              onChange={(e) => handleFileChangeEnvioCorreo(e.target.files[0], "file4List")}
                                                              />
                                                              <label htmlFor="file4" className="btn btn__primary--outline">Adjuntar</label>
                                                              {file4 && <span>{file4.name}</span>}
                                                         </div>
                                                      </div>

                                                      <div className="form mb-4">
                                                          <label>Archivo 5</label>
                                                          <div className="form__file">
                                                              <input type="file" id="file5" 
                                                              onChange={(e) => handleFileChangeEnvioCorreo(e.target.files[0], "file5List")}
                                                              />
                                                              <label htmlFor="file5" className="btn btn__primary--outline">Adjuntar</label>
                                                              {file5 && <span>{file5.name}</span>}
                                                         </div>
                                                      </div>
                                              </div>
                                        </section>
                                  */}

                                  <section className="gestion_">
                                        <div className="gestion__formm">
                                          <div className="formm mb-4">
                                            <label>Seleccionar número de archivos</label>
                                            <select value={selectedFileCount} onChange={handleFileCountChange}>
                                              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                                                <option key={num} value={num}>
                                                  {num}
                                                </option>
                                              ))}
                                            </select>
                                          </div>
                                          {renderFileInputContainers()}
                                        </div>
                                      </section>

                                  </form>


                                  
                                <div className="text-center block-center">
                                    <button type="submit" className="btn btn__primary" onClick={handleEnviarCorreosDocumentos} disabled={cargarndo}>
                                    {cargarndo ? (
                                        <span>
                                          <FontAwesomeIcon icon={faSpinner} spin /> Enviando...
                                          </span>
                                          ) : (

                                          "Enviar"
                                          )}
                           
                                    </button>
                                </div>

               </div>


            </section>

				
				<div className="text-center block-center">
               <button className="btn btn__primary" onClick={handleSaveClick}>Guardar</button>
            </div>

            </>

        ): (
          <>
<section>
<div className="headbar__detail_d">
                    <>
                    <h3>Gestión Documentaria</h3>

                      <div >
                              <button className="btn btn--ico btn--medium btn__secondary--outline" onClick={handleMigrarSapDocumentary} disabled={isLoading}>
                                  {isLoading ? (
                                                <span>
                                                  <FontAwesomeIcon icon={faSpinner} spin /> Migrando...
                                                </span>
                                              ) : (
                                                "Migrar"
                                    )}
                              </button>
                          
                          </div>


                          <div className="c">
                            <button className="btn btn__pedidos btn--ico"  onClick={handleListar}>
                              <i className="bi bi-hash"></i>
                               Lista de pedidos
                             </button>
                            {/* Modal de Aprobación */}
                              <VisualizarPedidos
                                isOpen={ListarPedidosFactura}
                                onClose={() => setListarPedidosFactura(false)}
                                title="Relacion de pedidos"
                              />
                        </div>
                    
                    </>
                </div>
  </section>

        { isMigrarModalOpen && (
                <MigrarModalPreDispath
                isOpen={isMigrarModalOpen}
                onClose={() => setIsMigrarModalOpen(false)}
                onMigrarClick={handleMigrarSapDocumentary}
                />
              )}

            

                <Verificacion
              isOpen={true} onClose={handleCloseModal} data={modalData}/>    

                    <section className="gestion">
                    <div className="gestion__form">

                    {Array.isArray(ficha) && ficha.length > 0 && (
                   <>
                   <div className="form mb-3">
                          <label>Packing list</label>
                           <div>
                            {ficha[0].exportation.packing_list_path ? (
                            <Link to={`https://icomex.franco.expert${ficha[0].exportation.packing_list_path}`} target="_blank">
                              Descargar
                           </Link>
                            ): (
                              <span>Sin documento adjunto</span>
                            )}
                          </div>
                      </div>

                      <div className="form mb-3">
                          <label>Documento de embarque</label>
                           <div>
                            {ficha[0].exportation.shipment_document_path ? (
                            <Link to={`https://icomex.franco.expert${ficha[0].exportation.shipment_document_path}`} target="_blank">
                              Descargar
                           </Link>
                            ): (
                              <span>Sin documento adjunto</span>
                            )}
                          </div>
                      </div>


                      <div className="form mb-3">
                          <label>Certificado de fumigación</label>
                           <div>
                            {ficha[0].exportation.fumigation_certificate_path ? (
                            <Link to={`https://icomex.franco.expert${ficha[0].exportation.fumigation_certificate_path}`} target="_blank">
                              Descargar
                           </Link>
                            ): (
                              <span>Sin documento adjunto</span>
                            )}
                          </div>
                      </div>

                      <div className="form mb-3">
                          <label>Certificado de origen</label>
                           <div>
                            {ficha[0].exportation.origin_certificate_path ? (
                            <Link to={`https://icomex.franco.expert${ficha[0].exportation.origin_certificate_path}`} target="_blank">
                              Descargar
                           </Link>
                          ): (
                            <span>Sin documento adjunto</span>
                          )}
                          </div>
                      </div>


                      <div className="form mb-3">
                          <label>Factura SUNAT</label>
                           <div>
                            {ficha[0].exportation.sunat_invoice_path ? (
                            <Link to={`https://icomex.franco.expert${ficha[0].exportation.sunat_invoice_path}`} target="_blank">
                              Descargar
                           </Link>
                          ): (
                            <span>Sin documento adjunto</span>
                          )}
                          </div>
                      </div>


                      <div className="form mb-3">
                          <label>Otros</label>
                           <div>
                            {ficha[0].exportation.other_document_path ? (
                            <Link to={`https://icomex.franco.expert${ficha[0].exportation.other_document_path}`} target="_blank">
                              Descargar
                           </Link>
                          ): (
                            <span>Sin documento adjunto</span>
                          )}
                          </div>
                      </div>
                    </>

                    )}


                    </div>

                      <div  className="gestion__tabla">

                            <table className="tabla" cellSpacing="0" cellPadding="0">
                              <thead>
                                  <tr>
                                    <th className="thead">Nº de factura SAP</th>
                                    <th className="thead">Nº de factura SUNAT</th>
                                    <th className="thead">Importe SUNAT</th> 
                                  </tr> 
                              </thead>
                              <tbody>

                              {Array.isArray(ListarFactura) && ListarFactura.length > 0 && ListarFactura.map((factura) => ( 
                              <tr key={factura.id}>
                                <td>{factura.sap_invoice_number || '-'}</td>
                                <td>{factura.update_log || '-'}</td>
                                <td>{factura.sunat_amount || '-'}</td>    
                              </tr>
                            ))}
                              </tbody>
                            </table>

                            <h2 className="centro">Envío documentario</h2>


                            <form>


                                  <div className="form-grouppp-horizontal_">
                                          <div className="form-grouppp">
                                              <label htmlFor="to">Para</label>
                                              <input className={`w ${errorMessage && "error-input"}`} type="email" id="to" name="to" value={email} onChange={handleEmailsChange}/>
                                                  {errorMessage && (
                                                      <div className="error-message">
                                                      <p>{errorMessage}</p>
                                                      </div>
                                                  )}
                                              
                                          </div>
                                          <button type="button" className="btn btn__primary btn--ico" onClick={handleAddEmail} >
                                          <i className="bi bi-plus"></i>
                                              Agregar
                                          </button>

                                          <button type="button" className="btn btn__primary btn--ico" onClick={handleRemoveAllEmails} >
                                          <i className="bi bi-trash"></i>
                                              Eliminar todo
                                          </button>
                                  </div>

                                  <div className="list">
                                          {formData.to.map((emailObj, index) => (
                                              <div key={index} className="list-items" style={{
                                                marginTop: index % 5 === 0 ? "0" : "0",
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                              }}>
                                              {emailObj.email}
                                              <button
                                                  type="button"
                                                  className="signup-btn_a" style={{marginLeft: "10px"}}   
                                                  onClick={() => handleRemoveEmail(index)}
                                              >
                                                  ❌
                                              </button>
                                              </div>
                                          ))}
                                          </div>
                                  
                                  
                                          <div className="form-grouppp">
                                                <label htmlFor="status_comment">Motivo</label>
                                                <textarea className="area" id="status_comment" name="status_comment"
                                                value={textoLibre}
                                                onChange={(e) => setTextoLibre(e.target.value)}
                                                placeholder="Ingres motivo"/>
                                        </div>


                                        {/* <section className="gestion_">
                                              <div className="gestion__formm">
                                                  <div className="formm mb-4">
                                                      <label>Archivo 1</label>

                                                      <div className="form__file">
                                                          <input type="file" id="file1"
                                                          onChange={(e) => handleFileChangeEnvioCorreo(e.target.files[0], "file1List")}
                                                          />
                                                          
                                                          <label  htmlFor="file1" className="btn btn__primary--outline">Adjuntar</label>
                                                          {file1 && <span>{file1.name}</span>}
                                                          </div>
                                                      </div>
                                                      
                                                      <div className="form mb-4">
                                                          <label>Archivo 2</label>
                                                          <div className="form__file">
                                                              <input type="file" id="file2" 
                                                              onChange={(e) => handleFileChangeEnvioCorreo(e.target.files[0], "file2List")}
                                                              />
                                                              <label htmlFor="file2" className="btn btn__primary--outline">Adjuntar</label>
                                                              {file2 && <span>{file2.name}</span>}
                                                         </div>
                                                      </div>

                                                      <div className="form mb-4">
                                                          <label>Archivo 3</label>
                                                          <div className="form__file">
                                                              <input type="file" id="file3" 
                                                              onChange={(e) => handleFileChangeEnvioCorreo(e.target.files[0], "file3List")}
                                                              />
                                                              <label htmlFor="file3" className="btn btn__primary--outline">Adjuntar</label>
                                                              {file3 && <span>{file3.name}</span>}
                                                         </div>
                                                      </div>

                                                      <div className="form mb-4">
                                                          <label>Archivo 4</label>
                                                          <div className="form__file">
                                                              <input type="file" id="file4" 
                                                              onChange={(e) => handleFileChangeEnvioCorreo(e.target.files[0], "file4List")}
                                                              />
                                                              <label htmlFor="file4" className="btn btn__primary--outline">Adjuntar</label>
                                                              {file4 && <span>{file4.name}</span>}
                                                         </div>
                                                      </div>

                                                      <div className="form mb-4">
                                                          <label>Archivo 5</label>
                                                          <div className="form__file">
                                                              <input type="file" id="file5" 
                                                              onChange={(e) => handleFileChangeEnvioCorreo(e.target.files[0], "file5List")}
                                                              />
                                                              <label htmlFor="file5" className="btn btn__primary--outline">Adjuntar</label>
                                                              {file5 && <span>{file5.name}</span>}
                                                         </div>
                                                      </div>
                                              </div>
                                        </section> */}

                                  <section className="gestion_">
                                                        <div className="gestion__formm">
                                                          <div className="formm mb-4">
                                                            <label>Seleccionar número de archivos</label>
                                                            <select value={selectedFileCount} onChange={handleFileCountChange}>
                                                              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                                                                <option key={num} value={num}>
                                                                  {num}
                                                                </option>
                                                              ))}
                                                            </select>
                                                          </div>
                                                          {renderFileInputContainers()}
                                                        </div>
                                                      </section>
                                  </form>


                                  
                                <div className="text-center block-center">
                                    <button type="submit" className="btn btn__primary" onClick={handleEnviarCorreosDocumentos} disabled={cargarndo}>
                                    {cargarndo? (
                                        <span>
                                          <FontAwesomeIcon icon={faSpinner} spin /> Enviando...
                                          </span>
                                          ) : (

                                          "Enviar"
                                          )}
                           
                                    </button>
                                </div>


                      </div>

   
                    </section>

                    


          </>

        )}

              {mostrarModal && (
                    <div className="confirmation-modal">
                      <div className="confirmation-modal__content">
                      {modalDataInformation.icon === 'check' && <FaCheck size={30} color="green" style={{ margin: ' 0 auto' }}/>} {/* Tamaño y color personalizables */}
                      {modalDataInformation.icon === 'times' && <FaTimes size={30} color="red" style={{ margin: ' 0 auto' }}/>} {/* Tamaño y color personalizables */}
                      <p className="error_Tdata">{modalDataInformation.message}</p>
                      <div className="customModal__buttons">
                      <button className="btn btn__primary" onClick={() => setMostrarModal(false)}>Cerrar</button>
                      </div>
                      
                      </div>
          </div>
          )}



        </>
    );
}
