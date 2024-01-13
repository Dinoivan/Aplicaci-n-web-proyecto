import { useState,useEffect } from "react";
import { usePedidosState } from "../../../../../../../../hooks/exportaciones/Estados-logicas-pedidos/usePedidosState";
import { findAllPedidosFichaId } from "../../../../../../../../hooks/exportaciones/Estados-logicas-pedidos/usePedidosService";
import { useAuth } from "../../../../../../../../contexts/Authutils";
import { findAllRequestibk } from "../../../../../../../../hooks/exportaciones/useRequestIbkProcess";
import { PreDispathManagement } from "../../../../../../../../services/exportaciones/PreDispatchManagementService";
import { format } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import { SendPreDispatch } from "../../../../../../../../services/exportaciones/listapedidosServices";
import { FaCheck, FaTimes } from 'react-icons/fa';
import { FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FindAllPedidosDetailsIdFicha } from "../../../../../../../../services/exportaciones/listapedidosServices";
import { DispathProgramFicha } from "../../../../../../../../services/exportaciones/DispatchProgramService";
import { FindAllPedidosSJandTrebol } from "../../../../../../../../services/exportaciones/listapedidosServices";
import { DispathProgramLocation } from "../../../../../../../../services/exportaciones/DispatchProgramService";  
// import { Update } from "../../../../../../../../services/exportaciones/listapedidosServices";

export function CorreoPredespacho(){

    const fichaId = localStorage.getItem('fichaId');

    const [load,setload] = useState("");

    const [pedidos_,setPedidos_] = useState([]);

    // const [file1, setFile1] = useState(null);
    // const [file2, setFile2] = useState(null);

    // const [file3, setFile3] = useState(null);
    // const [file4, setFile4] = useState(null);

    // const [file5, setFile5] = useState(null);
    // const [file6, setFile6] = useState(null);

    // const [file7, setFile7] = useState(null);
    // const [file8, setfile8] = useState(null);

    // const [file9, setFile9] = useState(null);
    // const [file10, setFile10] = useState(null);


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

    const handleFileChange = (file, fileType) => {
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
                onChange={(e) => handleFileChange(e.target.files[0], fileType)}
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


    const [errorMessage, setErrorMessage] = useState("");

    const [isLoading, setIsLoading] = useState(false); // Nueva variable de estado

     const [formData, setFormData] = useState({
         to: [],
       });

      const [email,setEmail] = useState("");

      const handleEmailsChange = (e) => {
        const { value } = e.target;
        setEmail(value.trim());
        setErrorMessage("");
        
      };


    // const [Ingreso, setIngreso] = useState(true);
    const [mostrarModal, setMostrarModal] = useState(false);


    const {pedidos,setPedidos
    } = usePedidosState();

    const [ibk,setibk] = useState({});
    const [data,setData] = useState([]);

    const { accessToken } = useAuth(); // Obtiene el Token del contexto de autenticación


    
      useEffect(() => {
        async function fetchData() {
          try {
            const resultado = await FindAllPedidosDetailsIdFicha(fichaId, accessToken);
            console.log("Hola soy el id: ",fichaId)
            setPedidos_(resultado);
          } catch (error) {
            console.log("Error al obtener los datos");
          }
        }
        fetchData();
      }, [fichaId,setPedidos,accessToken]);

      console.log("Hola soy el resultado: ",pedidos_);

      const numerosDePedido = pedidos.map((pedido) => pedido.order_number).join(", ");

      console.log("Soy los pedidos seleccionados: ", numerosDePedido);

    
    const handleEnviarCorreos = async () => {

        setIsLoading(true); // Establecer isLoading en true antes de enviar el formulario
        try {

        console.log("Correos antes de enviar: ", formData.to);

          const correoData = {
            free_text: load,
            client: Array.isArray(pedidos) && pedidos.length > 0 ? pedidos[0].customer_name : "",
            country_port: Array.isArray(ibk) && ibk.length > 0 ? ibk[0].destination_port : "",
            cnts: Array.isArray(pedidos) && pedidos.length > 0 ? pedidos[0].exportation.container_type : "",
            // sap_order_number: Array.isArray(pedidos) && pedidos.length > 0 ? pedidos[0].order_number : "",
            sap_order_number: numerosDePedido || "0",
            booking: Array.isArray(ibk) && ibk.length > 0 ? ibk[0].booking_number : "",
            ship_name: Array.isArray(ibk) && ibk.length > 0 ? ibk[0].ship_name : "",
            full_containers: Array.isArray(ibk) && ibk.length > 0 ? ibk[0]?.full_container_entry_warehouse : "",
            parent_deadline: Array.isArray(ibk) && ibk.length > 0 ? ibk[0]?.vgm_matrix_date ? format(utcToZonedTime(new Date(`${ibk[0]?.vgm_matrix_date}T00:00:00`), 'UTC'), 'yyyy-MM-dd') : '' : "",
            recipients: formData.to,
            proforma_invoice: Array.isArray(pedidos) && pedidos.length > 0 ? pedidos[0]?.exportation.proforma_number : "",
            exportation_id: fichaId,
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
      
          const verificacion = await SendPreDispatch(accessToken, correoData);
        
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
            setIsLoading(false); // Establecer isLoading en true antes de enviar el formulario
        }
      };
      const [modalDataInformation, setModalDatainformation] = useState({
        title: "",
        message: "",
        icon: "",
      });

    //Se utiliza datos de pedidos
    useEffect(() => {
        async function fetchData() {
          try {
            const resul = await findAllPedidosFichaId(fichaId, accessToken);
            setPedidos(resul);
          } catch (error) {
            console.log("Error al obtener los datos");
          }
        }
        fetchData();
      }, [fichaId,setPedidos,accessToken]);

        //Se utiliza datos de ibk
    useEffect(() => {
        async function fetchData() {
          try {
            const resultado = await findAllRequestibk(fichaId, accessToken);
            console.log("Hola soy el id: ",fichaId)
            setibk(resultado);
          
          } catch (error) {
            console.log("Error al obtener los datos");
          }
        }
        fetchData();
      }, [fichaId,setibk,accessToken]);    

      console.log("Pedidos: ",pedidos);
      console.log("Ibk: ",ibk);

      useEffect(() => {
        async function fetchData() {
           try {
             const resultado = await PreDispathManagement(fichaId, accessToken);
             console.log("Hola soy el id: ",fichaId)
            //  setIngreso(resultado[0].load === null)
             setData(resultado);
           } catch (error) {
             console.log("Error al obtener los datos");
           }
         }
         fetchData();
       }, [fichaId,setData,accessToken]);

       const filteredData = data.filter(item => item.package_type);

         //Gestión de las fechas múltiples

  const [detallePredispath,setDetallePredispath] = useState([]);
  const [destallePedidos,setDetallePedidos] =  useState([]);

  //Fechas por ubicacion
  const [fechasPorUbicacion, setFechasPorUbicacion] = useState({
    sanJuanDeLurigancho: [],
    trebol: [],
    ph: [],
    milla: []
  });

  const [result,setResult] = useState("");

  
   //Servicio de predespacho
   //Se utiliza datos de pedidos
   useEffect(() => {
    async function fetchData() {
      try {
        const resul = await DispathProgramFicha(fichaId,accessToken);
        setDetallePredispath(resul);
      } catch (error) {
        console.log("Error al obtener los datos");
      }
    }
    fetchData();
  }, [setDetallePredispath,accessToken,fichaId]);

  console.log("Id del enpoint Dispatch Programa: ",detallePredispath.dispathId);


  useEffect(() => {
    async function fetchData() {
      try {
        const resul = await FindAllPedidosSJandTrebol(fichaId,accessToken);
        setDetallePedidos(resul);
      } catch (error) {
        console.log("Error al obtener los datos");
      }
    }
    fetchData();
  }, [setDetallePedidos,accessToken,fichaId]);

  console.log("Datos de pedidos valores sjl y trebol: ",destallePedidos);

  //Servicio para listar los reultados de San Juan De Lurigancho y Trebol
  useEffect(() => {
    async function fetchData() {
      try {
        if(detallePredispath.dispathId){
        const resul = await DispathProgramLocation(detallePredispath.dispathId,accessToken);
        setFechasPorUbicacion(resul);
        }
      } catch (error) {
        console.log("Error al obtener los datos");
      }
    }
    fetchData();
  }, [setFechasPorUbicacion,accessToken,fichaId,detallePredispath]);

  console.log("Fechas de san juan de lurigancho: ",fechasPorUbicacion.sanJuanDeLurigancho);
  console.log("Fechas de Ph: ",fechasPorUbicacion.ph);
  console.log("Fechas de Milla: ",fechasPorUbicacion.milla);
  console.log("Fechas de Trebol: ",fechasPorUbicacion.trebol);

  //Concatenar
useEffect(() => {
  // ...

  const combinedResult = `
San Juan de Lurigancho: ${destallePedidos.sanJuanDeLurigancho || ''}
Fecha: ${fechasPorUbicacion.sanJuanDeLurigancho || ''}

PH: ${destallePedidos.ph || ''}
Fecha: ${fechasPorUbicacion.ph || ''}

Milla: ${destallePedidos.milla || ''}
Fecha: ${fechasPorUbicacion.milla || ''}

Trebol: ${destallePedidos.trebolSanMartin || ''}
Fecha: ${fechasPorUbicacion.trebol || ''}
  `;

  setResult(combinedResult);
}, [destallePedidos, fechasPorUbicacion]);

console.log("Resultado: ", result);




      //  const handleFileChange = (file, fileType) => {
      //   // Actualiza el estado correspondiente según el tipo de archivo
      //   switch (fileType) {
      //     case "file1List":
      //       setFile1(file);
      //       break;
      //       case "file2List":
      //         setFile2(file);
      //       break;
      //       case "file3List":
      //         setFile3(file);
      //       break;
      //       case "file4List":
      //         setFile4(file);
      //       break;
      //       case "file5List":
      //         setFile5(file);
      //       break;
      //       case "file6List":
      //         setFile6(file);
      //       break;
      //       case "file7List":
      //         setFile7(file);
      //       break;
      //       case "file8List":
      //         setfile8(file);
      //       break;
      //       case "file9List":
      //         setFile9(file);
      //       break;
      //       case "file10List":
      //       setFile10(file);
      //       break;
      //     // Agrega más casos para otros tipos de archivos
      //     default:
      //       break;
      //   }
      // };


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

            <div className="detalle">
            <div className="detalle__bodyy form">
                
                    <div className="detalle__body__col--dos">
                        <label>Texto Libre</label>
                        <div>
                            <textarea
                                name="ingreso"
                                value={load}
                                onChange={(e) => setload(e.target.value)}
                                className="w-100"
                            />
                        </div>
                    </div>

                    {Array.isArray(pedidos) && pedidos.length > 0 && (
                          <>
                          <div className="detalle__body__col--uno">
                            <label>Cliente</label>
                            <div>
                              <input type="text" value={pedidos[0].customer_name} className="w-100" readOnly/>
                            </div>
                          </div>
                          </>
                        )}

                {Array.isArray(ibk) && ibk.length > 0 && (
                            <>

                    <div className="detalle__body__col--uno">
                        <label>PUERTO PAIS</label>
                        <div>
                            <input
                                type="text"
                                value={ibk[0].destination_port} className="w-100" readOnly
                            />
                        </div>
                    </div>
                    </>
                )}

                    {Array.isArray(pedidos) && pedidos.length > 0 && (
                          <>
                    <div className="detalle__body__col--uno">
                        <label>PROFORMA</label>
                        <div>
                            <input
                                type="text"
                                value={pedidos[0]?.exportation?.proforma_number} className="w-100" readOnly
                            />
                        </div>
                    </div>
                  
                    <div className="detalle__body__col--uno">
                        <label>CNTS</label>
                        <div>
                            <input
                                type="text"
                                value={pedidos[0].exportation.container_type} className="w-100" readOnly
                            />
                        </div>
                    </div>
                    
                    </>
                    )}

                    <div className="detalle__body__col--uno">
                        <label>PED SISTEMAS SAP</label>
                        <div>
                            <input
                                type="text"
                                  value={numerosDePedido} className="w-100" readOnly
                            />
                        </div>
                    </div>


                    {Array.isArray(filteredData) && filteredData.length > 0 && (
                          <>

                    <div className="detalle__body__col--uno">
                        <label>Tipo DE EMPAQUE</label>
                        <div>
                            <input
                                type="text"
                                value={filteredData[0].package_type || '-'} className="w-100" readOnly
                            />
                        </div>
                    </div>

                    </>
                    )}

                  
                    {Array.isArray(ibk) && ibk.length > 0 && (
                            <>

                    <div className="detalle__body__col--uno">
                        <label>BOOKING</label>
                        <div>
                            <input
                                type="text"
                                value={ibk[0].booking_number} className="w-100" readOnly
                            />
                        </div>
                    </div>

                        
                    <div className="detalle__body__col--uno">
                        <label>NAVE</label>
                        <div>
                            <input
                                type="text"
                                value={ibk[0].ship_name} className="w-100" readOnly
                            />
                        </div>
                    </div>
                    </>

                    )}

                  
                    {/* {Array.isArray(data) && data.length > 0 && (
                          <>

                    <div className="detalle__body__col--uno">
                        <label>FECHA DE DESPACHO</label>
                        <div>
                            <input
                                type="text"
                                value={data[0]?.dispatch_date} className="w-100" readOnly
                            />
                        </div>
                    </div>
                    </>
                    )} */}

                    <div className="detalle__body__col--uno">
                      <label>Fecha de despacho</label>
                      <div>
                        <textarea value={result || ""} readOnly  className="w-100 custom-textarea"/>
                        </div>
                    </div>

                    {Array.isArray(ibk) && ibk.length > 0 && (
                            <>

                    <div className="detalle__body__col--uno">
                        <label>CONTENEDORES LLENOS</label>
                        <div>
                            <input
                                type="text"
                                value={ibk[0]?.full_container_entry_warehouse} className="w-100" readOnly
                            />
                        </div>
                    </div>

                    <div className="detalle__body__col--uno">
                        <label>PLAZO MATRIZ</label>
                        <div>
                            <input
                                type="text"
                                value={ibk[0]?.vgm_matrix_date ? format(utcToZonedTime(new Date(`${ibk[0]?.vgm_matrix_date}T00:00:00`), 'UTC'), 'yyyy-MM-dd'): ''} className="w-100" readOnly/>
                        </div>
                    </div>
                    </>
                    )}


                            </div>
                        </div>

                        
                    <section className="gestion_">
                      <div className="gestion__formm">
                        <div className="formm mb-4">
                          <label style={{textAlig: "center"}}>Seleccionar número de archivos</label>
                          <select  style={{textAlign: "center"}}  value={selectedFileCount} onChange={handleFileCountChange}>
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

                     <div className="tag-listt">
                            {formData.to.map((emailObj, index) => (
                                <div key={index} className="tagg" style={{marginTop: index % 5 === 0 ? "0": "0",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center"}}>
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

            </form>

            
                                {/* Agrega los demás campos aquí siguiendo el mismo patrón */}

                                <div className="text-center block-center">
                                    <button type="submit" className="btn btn__primary" onClick={handleEnviarCorreos} disabled={isLoading}>
                                    {isLoading ? (
                                        <span>
                                          <FontAwesomeIcon icon={faSpinner} spin /> Enviando...
                                          </span>
                                          ) : (

                                          "Enviar"
                                          )}
                           
                                    </button>
                                </div>




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


