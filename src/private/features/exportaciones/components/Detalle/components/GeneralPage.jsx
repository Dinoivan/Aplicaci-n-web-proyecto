import "../../../../../../styles/global/button.css";
import { useEffect,useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from "../../../../../../contexts/Authutils";
import {findAllPedidosFichaId} from "../../../../../../hooks/exportaciones/Estados-logicas-pedidos/usePedidosService";
import { Link } from "react-router-dom";
import { EnvioCorreo } from "../../../../../../public/modals/EnvioCorreo";
import { AprobacionModal } from "../../../../../../public/modals/Aprobado";
import { Update} from "../../../../../../services/exportaciones/listapedidosServices";
import {useGeneralState} from "../../../../../../hooks/exportaciones/useGeneralState";
import { FaCheck, FaTimes } from 'react-icons/fa';
import { EnviarCorreo } from "../../../../../../services/exportaciones/listapedidosServices";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { ActualizarFicha } from "../../../../../../services/exportaciones/GestionFichas";
import { UpdateFicha } from "../../../../../../services/exportaciones/listapedidosServices";
import { useFichasState } from "../../../../../../hooks/exportaciones/Estados-logicas-fichas/useGestionFichasState";
import { fetchDataWithoutFiltersFichas } from "../../../../../../hooks/exportaciones/Estados-logicas-fichas/useGestionFichasLogica";
import { fetchDataWithoutFilters } from "../../../../../../hooks/exportaciones/Estados-logicas-pedidos/usePedidosLogica";
import { usePedidosState } from "../../../../../../hooks/exportaciones/Estados-logicas-pedidos/usePedidosState";
import { ResponsablesExpertaciones } from "../../../../../../services/exportaciones/listapedidosServices";



export function GeneralPage() {

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const exportation_id = searchParams.get('exportation_id');

  const [isRechazadoModalOpen, setIsRechazadoModalOpen] = useState(false);
  const [isAprobacionModalOpen, setAprobacionModalOpen] = useState(false);

  const [userOptions, setUserOptions] = useState([]);

  const {pedidos,setPedidos
  } = usePedidosState();


  if (exportation_id !== localStorage.getItem('fichaId')) {
    localStorage.setItem('fichaId', exportation_id);
  }
   const fichaId = localStorage.getItem('fichaId');
   const [data, setData] = useState([]);
   const { accessToken } = useAuth(); // Obtiene el Token del contexto de autenticación

  const [isLoading, setIsLoading] = useState(true);

  const [totalContainers, setTotalContainers] = useState(0);

  const [newDocument,setNewDocument] = useState(null);

  const [dataReload, setDataReload] = useState(false);

  const {fichas,setFichas} = useFichasState();

   useEffect(() => {
     fetchDataWithoutFiltersFichas(accessToken, setFichas);
   }, [accessToken, setFichas]);

   console.log("hola: ",fichas);


  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setNewDocument(file);

  };

  // const getFileName = (documentPath) => {
  //   // Extraer el nombre del archivo de la ruta del documento
  //   const parts = documentPath.split('/');
  //   return parts[parts.length - 1];
  // };

  useEffect(() => {
    fetchDataWithoutFilters(accessToken, setPedidos);
  }, [accessToken, setPedidos]);

  console.log("Pedidos: ",pedidos);

 
  const handleRechazadoClick = async () => {
    setIsRechazadoModalOpen(true);
  }

  //Estado para editar los campos de fichas de exportación
  const [isEditing, setIsEditing] = useState(false);

  //Objeto para almacenar los contenidos de la fichas
  const [editableFields, setEditableFields] = useState({
    proforma_number: "",
    freight_contract_number: "",
    customer_oc_number: "",
    container_type: "",
    responsible_user_comex: "",
    san_juan_de_lurigancho: "",
    la_milla: "",
    punta_hermosa: "",
    trebol_san_martin: "",
  });

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

  

  //Estado para controlar la seleccion de usuarios
  const [selectedUser, setSelectedUser] = useState(editableFields.responsible_user_comex);


  //Efecto para controlar la suma automatica de San juan de lurigancho, la milla, punta hermosa y trebol san martin -> total de contenedores
  useEffect(() => {
    const sanJuan = parseFloat(editableFields.san_juan_de_lurigancho) || 0;
    const laMilla = parseFloat(editableFields.la_milla) || 0;
    const puntaHermosa = parseFloat(editableFields.punta_hermosa) || 0;
    const trebolSanMartin = parseFloat(editableFields.trebol_san_martin) || 0;
  
    const nuevoTotal = sanJuan + laMilla + puntaHermosa + trebolSanMartin;
    setTotalContainers(nuevoTotal);
  }, [editableFields.san_juan_de_lurigancho, editableFields.la_milla, editableFields.punta_hermosa, editableFields.trebol_san_martin]);
  

  //Evento para detectar lo que ingresa el usuario
  const handleInputChange = (field, value) => {
    setEditableFields({
      ...editableFields,
      [field]: value,
    });

    if (field === 'responsible_user_comex') {
      setSelectedUser(value);
    }
  };

  //Evento para guardar cambios actualizados
  const handleGuardarCambiosActualizados = async () => {
    try {
      const objetoParaActualizar = {
        id: exportation_id,
        proforma_number: editableFields.proforma_number,
        freight_contract_number: editableFields.freight_contract_number,
        container_type: editableFields.container_type,
        responsible_user_comex: editableFields.responsible_user_comex,
        san_juan_de_lurigancho: editableFields.san_juan_de_lurigancho,
        la_milla: editableFields.la_milla,
        punta_hermosa: editableFields.punta_hermosa,
        trebol_san_martin: editableFields.trebol_san_martin,
        total_containers: totalContainers,
        customer_oc_number: editableFields.customer_oc_number,
      };
  
      await ActualizarFicha(accessToken, objetoParaActualizar);
      setModalDatainformation({ title: "Éxito", message: "Información actualizada correctamente",icon: 'check', });
      setDataReload(true);
      setConfirmar(true);
      console.log('Ficha actualizada con éxito');

      // Verificar si hay un documento para actualizar
    if (newDocument) {
      await UpdateFicha(accessToken, exportation_id, newDocument);
      fetchDataWithoutFilters(accessToken, setPedidos);
    }

      setIsEditing(false);
    } catch (error) {
      setConfirmar(true);
      setModalDatainformation({title: "Error", message: "Error al actualizar", icon: 'times'});
      console.error('Error al actualizar la ficha:', error);
    }
  };



  //Evento para confirmar rechazo
  const handleRechazoConfirm = async (correData)=>{
    try{
      console.log("Datos de correo:", correData);

      const dataParaEnviar = {
        id: exportation_id,
        status: 'REJECTED',
        status_subject: correData.content,
        status_user: correData.to,
      };

      console.log("Enviando correo con los siguientes datos:", dataParaEnviar);
      await EnviarCorreo(accessToken,dataParaEnviar);
      // await Update(accessToken, { id: exportation_id, status: 'IN PROGRESS' });
      setModalDatainformation({title: "Exito",message: "Ficha Rechazado correctamente", icon: 'check'});
      setConfirmar(true);
      setDataReload(true);
    }catch(error){
      console.error("Error al rechazar la ficha: ",error);
      setModalDatainformation({title: "Error", message: "Error al rechazar la ficha", icon: 'times'});
      setConfirmar(true);
    } finally{
      setIsRechazadoModalOpen(false);
    }
  }

  const [modalDataInformation, setModalDatainformation] = useState({
    title: "",
    message: "",
    icon: "",
  });

  const [confirmar,setConfirmar] =  useState(false);
  
  // const title = "Pedidos"
  const {actionAccepted,setActionAccepted
 } = useGeneralState();


  const handleAprobadoClick = () => {
    // Lógica para abrir el modal de aprobación
    setAprobacionModalOpen(true);
  };


  const handleAprobacionConfirm = async () => {
    // Lógica para confirmar la aprobación (puedes colocar aquí la lógica específica)
    await Update(accessToken, { id: exportation_id, status: 'IN PROGRESS' }); 

    console.log('Ficha aprobada');
    setActionAccepted(true); // Establecer la variable de estado para volver a ejecutar el useEffect
    setAprobacionModalOpen(false);
    setModalDatainformation({ title: "Éxito", message: "Ficha aprobada correctamente",icon: 'check', });
    setConfirmar(true);
    setDataReload(true);
  
     // Redirige al usuario a la página Solicitud BK
      window.location.href = `/features/exportaciones/ficha/bk?exportation_id=${exportation_id}`;
  };

  const handleAprobacionCancel = () => {
    // Lógica para cancelar la aprobación
    console.log('Aprobación cancelada');
    setAprobacionModalOpen(false);
  };

  //Se llama al servicio de exportation detalle y se recupera los valores almacenados
  useEffect(() => {
    async function fetchData() {
      try {
        const resultado = await findAllPedidosFichaId(exportation_id, accessToken);
        const fichaData = resultado.length > 0 ? resultado[0] : {};
        setData(fichaData);
        setEditableFields({
          proforma_number: fichaData.exportation.proforma_number || "",
          freight_contract_number: fichaData.exportation.freight_contract_number || "",
          container_type: fichaData.exportation.container_type || "",
          responsible_user_comex: fichaData.exportation.responsible_user_comex || "",
          san_juan_de_lurigancho: fichaData.exportation.san_juan_de_lurigancho !== undefined ? fichaData.exportation.san_juan_de_lurigancho : '0',
          la_milla: fichaData.exportation.la_milla !== undefined ? fichaData.exportation.la_milla : '0',
          punta_hermosa: fichaData.exportation.punta_hermosa !== undefined ? fichaData.exportation.punta_hermosa : '0',
          trebol_san_martin: fichaData.exportation.trebol_san_martin !== undefined ? fichaData.exportation.trebol_san_martin : '0',
          customer_oc_number: fichaData.exportation.customer_oc_number !== undefined ? fichaData.exportation.customer_oc_number: "0",
         });

         // Inicializa selectedUser con el valor existente si estás en modo de edición
         setSelectedUser(isEditing ? fichaData.exportation.responsible_user_comex || "" : "");


        setIsLoading(false);
        setDataReload(false);
      } catch (error) {
        console.log("Error al obtener los datos");
      }
    }
    fetchData();
  }, [fichaId, setEditableFields, accessToken, exportation_id, actionAccepted,dataReload,setSelectedUser,isEditing]);

  console.log("Hola soy el resultado: ",data);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZone: 'America/New_York' };
  
    // Crear una instancia de la fecha
    const date = new Date(dateString);
  
    // Formatear la fecha usando las opciones
    return date.toLocaleDateString('es-ES', options);
  };
  
    return(
        <>

        <div className="centrar">

        <h3>Información general </h3>

         {Object.keys(data).length > 0 ? (
                        <div key={data.id} className="modif">
                        <p><strong>Fecha de creación:</strong> {formatDate(data.exportation.created_at) || 'N/A'}</p>
                        <p><strong>Fecha de actualización:</strong> {formatDate(data.exportation.updated_at) || 'N/A'}</p>
                      </div>
                    ) : (
                      <div>No hay datos disponibles</div>
           )}
        </div>
          

             <div className="detalle">
                    
                    <div className="detalle__body form">
                    {Object.keys(data).length > 0 ? (
                          <>
                        <div key={data.exportation.id} className="detalle__body__col--uno">
                          <label>Nº de ficha</label>
                          <div>
                            <input type="text" 
                            value={data.exportation.code_relations}
                            className="w-100" 
                            readOnly/>
                          </div>
                        </div>

                        <div className="detalle__body__col--uno">
                          <label>Organización de venta</label>
                          <div>
                            <input type="text" value={data.sell_organization} className="w-100" readOnly/>
                          </div>
                        </div>

                        <div className="detalle__body__col--uno">
                          <label>Nº de proforma</label>
                          <div>
                            {isEditing ? (
                              <input
                                type="text"
                                value={editableFields.proforma_number}
                                onChange={(e) => handleInputChange('proforma_number', e.target.value)}
                                className="w-100"
                              />
                            ) : (
                              <input type="text" value={editableFields.proforma_number} className="w-100" readOnly/>
                              // <span>{editableFields.proforma_number}</span>
                            )}
                          </div>
                        </div>


                        <div className="detalle__body__col--uno">
                          <label>Nº de contrato de flete Vigente</label>
                          <div>
                            {isEditing ? (
                              <input
                                type="text"
                                value={editableFields.freight_contract_number}
                                onChange={(e) => handleInputChange('freight_contract_number', e.target.value)}
                                className="w-100"
                              />
                            ) : (
                              <input type="text" value={editableFields.freight_contract_number} className="w-100" readOnly/>
                              // <span>{editableFields.freight_contract_number}</span>
                            )}
                          </div>
                        </div>

                        <div className="detalle__body__col--uno">
                          <label>Código de cliente SAP</label>
                          <div>
                            <input type="text" value={data.customer_number} className="w-100"  readOnly/>
                          </div>
                        </div>

                        <div className="detalle__body__col--uno">
                            <label>Tipo de Contenedor</label>
                            <div>
                              {isEditing ? (
                                <input
                                  type="text"
                                  value={editableFields.container_type}
                                  onChange={(e) => handleInputChange('container_type', e.target.value)}
                                  className="w-100"
                                />
                              ) : (
                                <input type="text" value={editableFields.container_type} className="w-100" readOnly/>
                         
                              )}
                            </div>
                          </div>

                       <div className="detalle__body__col--uno">
                          <label>Usuario Responsable COMEX</label>
                          <div>
                          {isEditing ? (
                            
                                <select className="h w-100 cc"
                                  value={selectedUser}
                                  onChange={(e) => handleInputChange('responsible_user_comex', e.target.value)}
                                >
                                  <option value="">Seleccione un usuario</option>
                                  {userOptions.map((user, index) => (
                                    <option key={index} value={user}>
                                      {user}
                                    </option>
                                  ))}
                                </select>
                            ) : (
                              <input type="text" value={editableFields.responsible_user_comex} className="w-100" readOnly />
                            )}
                          </div>
                        </div>


                        <div className="detalle__body__col--uno">
                          <label>San juan de Lurigancho</label>
                          <div>
                            {isEditing ? (
                              <input
                                type="text"
                                value={editableFields.san_juan_de_lurigancho !== undefined ? editableFields.san_juan_de_lurigancho : '0'}
                                onChange={(e) => handleInputChange('san_juan_de_lurigancho', e.target.value)}
                                className="w-100"
                              />
                            ) : (
                              <input type="text" value={editableFields.san_juan_de_lurigancho || '0'} className="w-100" readOnly />
                              // <span className="w-100">{editableFields.responsible_user_comex}</span>
                            )}
                          </div>
                        </div>

                        
                        <div className="detalle__body__col--uno">
                          <label>La Milla</label>
                          <div>
                            {isEditing ? (
                              <input
                                type="text"
                                value={editableFields.la_milla !== undefined ? editableFields.la_milla : '0'}
                                onChange={(e) => handleInputChange('la_milla', e.target.value)}
                                className="w-100"
                              />
                            ) : (
                              <input type="text" value={editableFields.la_milla || '0'} className="w-100" readOnly />
                              // <span className="w-100">{editableFields.responsible_user_comex}</span>
                            )}
                          </div>
                        </div>

                        <div className="detalle__body__col--uno">
                          <label>Punta hermosa</label>
                          <div>
                            {isEditing ? (
                              <input
                                type="text"
                                value={editableFields.punta_hermosa !== undefined ? editableFields.punta_hermosa : '0'}
                                onChange={(e) => handleInputChange('punta_hermosa', e.target.value)}
                                className="w-100"
                              />
                            ) : (
                              <input type="text" value={editableFields.punta_hermosa || '0'} className="w-100" readOnly />
                              // <span className="w-100">{editableFields.responsible_user_comex}</span>
                            )}
                          </div>
                        </div>

                        <div className="detalle__body__col--uno">
                          <label>TREBOL/ San Martin</label>
                          <div>
                            {isEditing ? (
                              <input
                                type="text"
                                value={editableFields.trebol_san_martin !== undefined ? editableFields.trebol_san_martin : '0'}
                                onChange={(e) => handleInputChange('trebol_san_martin', e.target.value)}
                                className="w-100"
                              />
                            ) : (
                              <input type="text" value={editableFields.trebol_san_martin || '0'} className="w-100" readOnly />
                              // <span className="w-100">{editableFields.responsible_user_comex}</span>
                            )}
                          </div>
                        </div>

                       <div className="detalle__body__col--uno">
                          <label>Total de  contenedores </label>
                           <div>
                            <input type="text" value={totalContainers} className="w-100"  readOnly/>
                          </div>
                        </div>

                        <div className="detalle__body__col--uno">
                          <label>Moneda</label>
                           <div>
                            <input type="text" value={data.currency} className="w-100"  readOnly/>
                          </div>
                        </div>

                        <div className="detalle__body__col--uno">
                          <label>Valor neto</label>
                           <div>
                            <input type="text" value={data.exportation.total.toFixed(2)} className="w-100"  readOnly/>
                          </div>
                        </div>

                        <div className="detalle__body__col--uno">
                          <label>PO/SKU</label>
                          <div>
                            {isEditing ? (
                              <input
                                type="text"
                                value={editableFields.customer_oc_number}
                                onChange={(e) => handleInputChange('customer_oc_number', e.target.value)}
                                className="w-100"
                              />
                            ) : (
                              <input type="text" value={editableFields.customer_oc_number} className="w-100" readOnly/>
                              // <span>{editableFields.freight_contract_number}</span>
                            )}
                          </div>
                        </div>


                        <div className="detalle__body__col--dos">
                            <label>Documento</label>
                            <div>
                              {isEditing ? (
                                <>
                                <input
                                  type="file"
                                  onChange={(e) => handleFileChange(e)}
                                  className="w-100"
                                />
                                </>
                                
                              ) : (
                                <Link to={`https://icomex.franco.expert${data.exportation.document_request}`} target="_blank">
                                   Descargar
                                 </Link>
                              )}
                            </div>
                          </div>

                          
                      
                          

                {(data.exportation.status_display !== "Inicio de Exportación") && (data.exportation.status_display !== "Rechazado" ) ? (
                  <>

             <div className="text-center block-center">

                    {confirmar && (
                          <div className="confirmation-modal">
                            <div className="confirmation-modal__content">
                                  {modalDataInformation.icon === 'check' && <FaCheck size={30} color="green" style={{ margin: '0 auto' }}/>} {/* Tamaño y color personalizables */}
                                  {modalDataInformation.icon === 'times' && <FaTimes size={30} color="red" style={{ margin: '0 auto' }}/>} {/* Tamaño y color personalizables */}
                              <p className="error_Tdata">{modalDataInformation.message}</p>
                              <button onClick={() => setConfirmar(false)}>Cerrar</button>
                            </div>
                          </div>
                        )}
          
                      {/* <button className="btn btn__primary btn--ico m-2"  onClick={handleRechazadoClick}>
                      <i className="bi bi-x-circle-fill"></i>
                        Rechazado 
                      </button>

                   
                        {isRechazadoModalOpen && (
                          <EnvioCorreo
                            isOpen={isRechazadoModalOpen}
                            onClose={() => setIsRechazadoModalOpen(false)}
                            title="Enviar Correo de Rechazo"
                            onSubmit={handleRechazoConfirm}
                          />
                        )} */}

                        
                      {!isEditing && (
                          <button className="btn btn__primary btn--ico m-2" onClick={() => setIsEditing(true)}>
                            <i className="bi bi-pencil-square"></i> Editar
                          </button>
                        )}
                        {isEditing && (
                          <>
                            <button className="btn btn__primary btn--ico m-2" onClick={handleGuardarCambiosActualizados}>
                              <i className="bi bi-check-square"></i> Guardar Cambios
                            </button>
                            <button className="btn btn__secondary btn--ico m-2" onClick={() => setIsEditing(false)}>
                              <i className="bi bi-x"></i> Cancelar
                            </button>
                          </>
                        )}

              </div>


                  </>
                ): data.exportation.status_display === "Rechazado" ? (
                  <>

               <div className="text-center block-center">
                  <button className="btn btn__primary btn--ico m-2"   onClick={handleAprobadoClick} >
                  <i className="bi bi-check-circle-fill"></i>
                  Aprobado
                  </button>
                
                  {/* Modal de Aprobación */}
                  <AprobacionModal
                    isOpen={isAprobacionModalOpen}
                    onClose={() => setAprobacionModalOpen(false)}
                    onConfirm={handleAprobacionConfirm}
                    onCancel={handleAprobacionCancel}
                    title="Confirmación de Aprobación"
                  />

                  {confirmar && (
                        <div className="confirmation-modal">
                          <div className="confirmation-modal__content">
                                {modalDataInformation.icon === 'check' && <FaCheck size={30} color="green" style={{ margin: '0 auto' }}/>} {/* Tamaño y color personalizables */}
                                {modalDataInformation.icon === 'times' && <FaTimes size={30} color="red" style={{ margin: '0 auto' }}/>} {/* Tamaño y color personalizables */}
                            <p className="error_Tdata">{modalDataInformation.message}</p>
                            <div className="customModal__buttons">
                            <button className="btn btn__primary" onClick={() => setConfirmar(false)}>Cerrar</button>
                            </div>
                           
                          </div>
                        </div>
                      )}
  
                      <button className="btn btn__primary btn--ico m-2"  onClick={handleRechazadoClick}>
                      <i className="bi bi-x-circle-fill"></i>
                        Rechazado 
                      </button>

                        {/* Renderiza el modal cuando isRechazadoModalOpen es true */}
                        {isRechazadoModalOpen && (
                          <EnvioCorreo
                            isOpen={isRechazadoModalOpen}
                            onClose={() => setIsRechazadoModalOpen(false)}
                            title="Enviar Correo de Rechazo"
                            onSubmit={handleRechazoConfirm}
                          />
                        )}

                      {!isEditing && (
                          <button className="btn btn__primary btn--ico m-2" onClick={() => setIsEditing(true)}>
                            <i className="bi bi-pencil-square"></i> Editar
                          </button>
                        )}
                        {isEditing && (
                          <>
                            <button className="btn btn__primary btn--ico m-2" onClick={handleGuardarCambiosActualizados}>
                              <i className="bi bi-check-square"></i> Guardar Cambios
                            </button>
                            <button className="btn btn__secondary btn--ico m-2" onClick={() => setIsEditing(false)}>
                              <i className="bi bi-x"></i> Cancelar
                            </button>
                          </>
                        )}

   </div>

                  </>
                ) : (
                  <>

                  
                <div className="text-center block-center">
                  <button className="btn btn__primary btn--ico m-2"   onClick={handleAprobadoClick} >
                  <i className="bi bi-check-circle-fill"></i>
                  Aprobado
                  </button>
                
                  {/* Modal de Aprobación */}
                  <AprobacionModal
                    isOpen={isAprobacionModalOpen}
                    onClose={() => setAprobacionModalOpen(false)}
                    onConfirm={handleAprobacionConfirm}
                    onCancel={handleAprobacionCancel}
                    title="Confirmación de Aprobación"
                  />

                  {confirmar && (
                        <div className="confirmation-modal">
                          <div className="confirmation-modal__content">
                                {modalDataInformation.icon === 'check' && <FaCheck size={30} color="green" style={{ margin: '0 auto' }}/>} {/* Tamaño y color personalizables */}
                                {modalDataInformation.icon === 'times' && <FaTimes size={30} color="red" style={{ margin: '0 auto' }}/>} {/* Tamaño y color personalizables */}
                            <p className="error_Tdata">{modalDataInformation.message}</p>
                            <div className="customModal__buttons">
                            <button className="btn btn__primary" onClick={() => setConfirmar(false) }>Cerrar</button>
                            </div>
                           
                          </div>
                        </div>
                      )}
  
                      <button className="btn btn__primary btn--ico m-2"  onClick={handleRechazadoClick}>
                      <i className="bi bi-x-circle-fill"></i>
                        Rechazado 
                      </button>

                        {/* Renderiza el modal cuando isRechazadoModalOpen es true */}
                        {isRechazadoModalOpen && (
                          <EnvioCorreo
                            isOpen={isRechazadoModalOpen}
                            onClose={() => setIsRechazadoModalOpen(false)}
                            title="Enviar Correo de Rechazo"
                            onSubmit={handleRechazoConfirm}
                          />
                        )}



                
                        {!isEditing && (
                          <button className="btn btn__primary btn--ico m-2" onClick={() => setIsEditing(true)}>
                            <i className="bi bi-pencil-square"></i> Editar
                          </button>
                        )}
                        {isEditing && (
                          <>
                            <button className="btn btn__primary btn--ico m-2" onClick={handleGuardarCambiosActualizados}>
                              <i className="bi bi-check-square"></i> Guardar Cambios
                            </button>
                            <button className="btn btn__secondary btn--ico m-2" onClick={() => setIsEditing(false)}>
                              <i className="bi bi-x"></i> Cancelar
                            </button>
                          </>
                        )}







                   </div>
    

                  </>
                )}
                        </>
                        
                        ) : (
                          <p>No existen datos disponibles</p>
                        )}
                    </div>
            </div>

            {isLoading? (
              <div className="centroC">
              {/* <td colSpan="10">No hay datos disponibles</td> */}
             
              <span>
                      <FontAwesomeIcon icon={faSpinner} spin /> Cargando...
               </span>

          </div>
            ):null}
            
        </>
    );
}