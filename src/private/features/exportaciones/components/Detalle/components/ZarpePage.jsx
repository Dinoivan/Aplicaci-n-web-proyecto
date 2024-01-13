import { useEffect,useState,useMemo } from 'react';
import { useAuth } from "../../../../../../contexts/Authutils";
import { format } from 'date-fns';
import { AddZarpe,ShippingUpdate } from '../../../../../../services/exportaciones/ShippingUpdate';
import { findAllPedidosFichaId } from '../../../../../../hooks/exportaciones/Estados-logicas-pedidos/usePedidosService';
import { usePedidosState } from '../../../../../../hooks/exportaciones/Estados-logicas-pedidos/usePedidosState';
import { findAllRequestibk } from '../../../../../../hooks/exportaciones/useRequestIbkProcess';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { actualizateZarte } from '../../../../../../services/exportaciones/ShippingUpdate';
import { ActualizarIBK } from '../../../../../../services/exportaciones/RequestIbkService';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { utcToZonedTime } from 'date-fns-tz';

import { isValid } from 'date-fns';
 
export function ZarpePage() {

  const fichaId = localStorage.getItem('fichaId');
  console.log("Soy la ficha: ",fichaId);
  
  const [ListarZarpe, setListarZarpe] = useState([]);
  
  const { accessToken } = useAuth(); // Obtiene el Token del contexto de autenticación
  const [FechaRealEta, setFechaRealEta] = useState(null);
  // const [FechaRealEtd,setFechaRealEtd] = useState(null);
  const [FechaReprogramacionEtd, setFechaReprogramacionEtd] = useState(null);

  const [numeroContenedor,setNumeroDeContanedor] = useState(0);

  const [mostrarIngreso, setMostrarIngreso] = useState(true); // Nuevo estado para controlar qué sección mostrar
  const [mostrarModal, setMostrarModal] = useState(false);

  const {pedidos,setPedidos
  } = usePedidosState();

  const [ibk,setibk] = useState([]);
  const [data,setData] = useState([]);

  const [modalDataInformation, setModalDatainformation] = useState({
    title: "",
    message: "",
    icon: "",
  });

  const [editable,setEditable] = useState(false);

  const minDate = useMemo(() => {
    const date = new Date();
    date.setMonth(date.getMonth() - 12);
    return date;
  }, []);


  const [editableZarpe,setEditableZarpe] = useState({
    id: 0,
    rescheduled_etd_date: null,
    real_eta_date: null,
    number_of_shipped_containers: 0,
  });



    //Evento para detectar lo que ingresa el usuario
    const handleInputChange = (field, value) => {
      setEditableZarpe({
        ...editableZarpe,
        [field]: value,
      });
    };

     // Función para manejar el cambio de fecha en el modo de edición
   const handleDateChange = (field, date) => {
    
    setEditableZarpe((prevFields) => ({
      ...prevFields,
      [field]: date instanceof Date ? format(utcToZonedTime(date, 'UTC'), 'yyyy-MM-dd') : null,
    }));
  };
  
  //Ibk

  //Objeto para almacenar los contenidos de ibk relacionado a la ficha
  const [editableFieldsibk, setEditableFieldsibk] = useState({
    id: 0,
    actual_etd_date: null,
  });


   // Función para manejar el cambio de fecha en el modo de edición
   const handleDateChangeibk = (field, date) => {
    setEditableFieldsibk((prevFields) => ({
      ...prevFields,
      [field]: date instanceof Date ? format(utcToZonedTime(date, 'UTC'), 'yyyy-MM-dd') : null,
    }));
  };
  

  //Guardar fecha Zarpe
  const handleGuardar = async () => {
    try {
      // Crear el objeto con los datos del formulario

      const fecha1 = FechaRealEta ? `${format(FechaRealEta, 'yyyy-MM-dd')}` : null;
      const fecha2 = FechaReprogramacionEtd ? `${format(FechaReprogramacionEtd, 'yyyy-MM-dd')}` : null;
      // const fecha3 = FechaRealEtd ? `${format(FechaRealEtd,'yyyy-MM-dd')}`: null; 
    

      const nuevoObjeto = {

        real_eta_date: fecha1,
        rescheduled_etd_date: fecha2,
        // real_etd_date: fecha3,
        number_of_shipped_containers: numeroContenedor,
        exportation_id: fichaId, // Reemplaza con el valor real

      };

      // Llamar al servicio Agregar para guardar los datos
      await AddZarpe(accessToken, nuevoObjeto);

      const resultado = await ShippingUpdate(fichaId,accessToken);
      setListarZarpe(resultado);

      handleGuardarCambiosActualizadosibk();

       window.location.href = `/features/exportaciones/ficha/liquidacion?exportation_id=${fichaId}`;

      setMostrarIngreso(!mostrarIngreso);
      setModalDatainformation({ title: "Éxito", message: "Información guardado exitosamente",icon: 'check', });
      setMostrarModal(true);
    } catch (error) {
      console.log("Error al guardar los datos",error);
      setModalDatainformation({ title: "Error", message: "Sucedio un Error",icon: 'times', });
    }
  };

  const handleActualizar = async() =>{

    try{
      const objeto = {
        id: editableZarpe.id,
        exportation_id: fichaId,
        rescheduled_etd_date: editableZarpe.rescheduled_etd_date,
        real_eta_date: editableZarpe.real_eta_date,
        number_of_shipped_containers: editableZarpe.number_of_shipped_containers || 0,
      }

      await actualizateZarte(accessToken,fichaId,objeto);
      handleGuardarCambiosActualizadosibk();
        setModalDatainformation({title: "Exito", message: "La información se actualizo correctamente", icon: 'check'});
        setMostrarModal(true);
        setEditable(false);

      

    }catch(error){
      console.error("Error al actualizar los datos: ",error);
      setModalDatainformation({title: "Error", message: "Sucedio un error al actualizar la información", icon: 'times'});
    }
  }

   //Evento para guardar cambios actualizados
   const handleGuardarCambiosActualizadosibk = async () => {
    try {
      const objetoParaActualizar = {
        id: editableFieldsibk.id,
        exportation_id: fichaId,
        actual_etd_date: editableFieldsibk.actual_etd_date,
       
      }
  
      await ActualizarIBK(accessToken, fichaId,objetoParaActualizar);

  }catch(error) {
      console.error('Error al actualizar la ficha:', error);
    }
  };

  // // Función para formatear la fecha para mostrarla en modo de solo lectura
  // const formatDateForDisplay = (date) => (isValid(date) ? format(utcToZonedTime(date, 'UTC'), 'dd/MM/yyyy') : '-');


  useEffect(() => {
    async function fetchData() {
      try {
        const resul = await findAllPedidosFichaId(fichaId, accessToken);
        setPedidos(resul);
      } catch (error) {
        console.log("Error al obtener los datos de detail");
      }
    }
    fetchData();
  }, [fichaId,setPedidos,accessToken]);

 console.log("Pedidos: ",pedidos);

 //Se utiliza datos de ibk
 useEffect(() => {
  async function fetchData() {
    try {
      const resultado = await findAllRequestibk(fichaId, accessToken);
      console.log("Hola soy el id: ",fichaId)
      setibk(resultado);
    
    } catch (error) {
      console.log("Error al obtener los datos de ibk");
    }
  }
  fetchData();
}, [fichaId,setibk,accessToken]);

  useEffect(() => {
    async function fetchData() {
       try {
         const resultado = await ShippingUpdate(fichaId,accessToken);
         const fichaData = resultado.length > 0 ? resultado[0] : {};
         console.log("Hola soy el id: ",fichaData)
         setListarZarpe(fichaData);
         setEditableZarpe({
          id: fichaData.id || 0,
          rescheduled_etd_date: fichaData.rescheduled_etd_date ? format(utcToZonedTime(new Date(fichaData.rescheduled_etd_date), 'UTC'), 'yyyy-MM-dd') : null,
          real_eta_date: fichaData.real_eta_date ? format(utcToZonedTime(new Date(fichaData.real_eta_date), 'UTC'), 'yyyy-MM-dd') : null,
          number_of_shipped_containers: fichaData.number_of_shipped_containers
         });
         setMostrarIngreso(resultado.length === 0);
       } catch (error) {
         console.log("Error al obtener los datos de ship");
       }
     }
     fetchData();
   }, [fichaId,setListarZarpe,accessToken],setEditableZarpe);

   console.log("Resultado de mostrar: ",mostrarIngreso)

  console.log("Hola soy el resultado: ",ListarZarpe);

  console.log("Resultado de Zarpe: ",editableZarpe);



  useEffect(() => {
    async function fetchData() {
       try {
         const resultado = await findAllRequestibk(fichaId, accessToken);
         const fichaData = resultado.length > 0 ? resultado[0] : {};
         setData(fichaData);
         setEditableFieldsibk({
          id: fichaData.id || "",
          actual_etd_date: fichaData.actual_etd_date || null,
         })
       } catch (error) {
         console.log("Error al obtener los datos");
       }
     }
     fetchData();
   }, [fichaId,setEditableFieldsibk,setData,accessToken]);
   
  console.log("Hola soy el resultado: ",data);               

    // Función para formatear la fecha para mostrarla en modo de solo lectura
    const formatDateForDisplay = (date) => (isValid(date) ? format(utcToZonedTime(date, 'UTC'), 'dd/MM/yyyy') : '-');

    return(
        <>

        {mostrarIngreso ? (
                  <>

                  <h3>Zarpe ETD-ETA</h3>

                  <div className="detalle">
                    

                    <div className="detalle__body form">
                  

                        <div  className="detalle__body__col--uno">
                          <label>Fecha real ETD</label>
                          <div>
                          <DatePicker
                          className="responsive-datepicker"
                          selected={editableFieldsibk.actual_etd_date ? new Date(editableFieldsibk.actual_etd_date + 'T00:00:00') : null}
                          onChange={(date) => handleDateChangeibk('actual_etd_date', date)}
                          dateFormat="dd/MM/yyyy"
                          placeholderText="Selecciona fecha"
                           minDate={minDate}
                           maxDate={null}
                          
                            />
                          </div>
                        </div>
       

                        <div className="detalle__body__col--uno">
                          <label>Fecha real ETA</label>
                          <div>
                          <DatePicker
                            selected={FechaRealEta}
                            onChange={(date) => setFechaRealEta(date)}
                            dateFormat="dd/MM/yyyy"
                            placeholderText="Selecciona fecha"
                            minDate={minDate}
                            maxDate={null}
                            className="w-100"
                          />
                          </div>
                        </div>

                        
                        {Array.isArray(pedidos) && pedidos.length > 0 && (
                          <>

                        <div className="detalle__body__col--uno">
                          <label>Embarque total del puerto</label>
                          <div>
                            <input type="text" value={pedidos[0].exportation.total_containers} className="w-100"  readOnly/>
                          </div>
                        </div>
                        </>
                        )}


                        <div className="detalle__body__col--uno">
                          <label>Nº de contenedores embarcados</label>
                          <div>
                            <input type="text" value={numeroContenedor} onChange={(e) => setNumeroDeContanedor(e.target.value)} className="w-100"/>
                          </div>
                        </div>

                      


                      {Array.isArray(ibk) && ibk.length > 0 && (
                        <div className="detalle__body__col--uno">
                          <label>Nombre real de la nave</label>
                          <div>
                            <input type="text" value={ibk[0].ship_name} className="w-100"  readOnly/>
                          </div>
                        </div>
                      )}

                        <div className="detalle__body__col--uno">
                          <label>Fecha de programacion ETD</label>
                          <div>
                          <DatePicker
                            selected={FechaReprogramacionEtd}
                            onChange={(date) => setFechaReprogramacionEtd(date)}
                            dateFormat="dd/MM/yyyy"
                            placeholderText="Selecciona fecha"
                            minDate={minDate}
                            maxDate={null}
                            className="w-100"
                          />
                          </div>
                        </div>
             
                        <div className="text-center block-center">
                            <button className="btn btn__primary" onClick={handleGuardar}>Guardar</button>

                        </div>
                    </div>
         
                </div>
                </>
        ):(
          <>

            <h3>Zarpe ETDETA</h3>

            <div className="detalle">
              

              <div className="detalle__body form">

                
                  <div className="detalle__body__col--uno">

                            <label>Fecha ETD Real</label>
                            <div>
                              {editable ? (
                                <DatePicker
                                  className="responsive-datepicker"
                                  selected={editableFieldsibk.actual_etd_date ? new Date(editableFieldsibk.actual_etd_date + 'T00:00:00') : null}
                                  onChange={(date) => handleDateChangeibk('actual_etd_date', date)}
                                  dateFormat="dd/MM/yyyy"
                                  placeholderText="Selecciona fecha"
                                  minDate={minDate}
                                  maxDate={null}
                                />
                              ) : (
                                <input
                                  type="text"
                                  value={formatDateForDisplay(editableFieldsibk.actual_etd_date ? new Date(`${editableFieldsibk.actual_etd_date}T00:00:00`) : null)}
                                  className="w-100"
                                  readOnly
                                />
                              )}
                            </div>
                          </div>

                 
                    <div className="detalle__body__col--uno">
                            <label>Fecha real ETA</label>
                            <div>
                              {editable ? (
                                <DatePicker
                                  className="responsive-datepicker"
                                  selected={editableZarpe.real_eta_date ? new Date(editableZarpe.real_eta_date + 'T00:00:00') : null}
                                  onChange={(date) => handleDateChange('real_eta_date', date)}
                                  dateFormat="dd/MM/yyyy"
                                  placeholderText="Selecciona fecha"
                                  minDate={minDate}
                                  maxDate={null}
                                />
                              ) : (
                                <input
                                  type="text"
                                  value={formatDateForDisplay(editableZarpe.real_eta_date ? new Date(`${editableZarpe.real_eta_date}`) : null)}
                                  className="w-100"
                                  readOnly
                                />
                              )}
                            </div>
                      </div>


                 
                  {Array.isArray(pedidos) && pedidos.length > 0 && (
                          <>

                        <div className="detalle__body__col--uno">
                          <label>Embarque total del puerto</label>
                          <div>
                            <input type="text" value={pedidos[0].exportation.total_containers} className="w-100"  readOnly/>
                          </div>
                        </div>

                        
                        </>
                        )}

                

                      <div className="detalle__body__col--uno">
                          <label>N° de contenedores embarcados</label>
                          <div>

                          {editable ? (
                              <input type="text" 
                              value={editableZarpe.number_of_shipped_containers}
                              onChange={(e) => handleInputChange('number_of_shipped_containers', e.target.value)}
                              className='w-100'
                              />
                            ):(
                              <input type="text" value={editableZarpe.number_of_shipped_containers || 0} className='w-100' readOnly/>

                            )}
                          </div>
                        </div>


                    {Array.isArray(ibk) && ibk.length > 0 && (
                        <div className="detalle__body__col--dos">
                          <label>Nombre real de la nave</label>
                          <div>
                            <input type="text" value={ibk[0].ship_name} className="w-100"  readOnly/>
                          </div>
                        </div>
                      )}



                    <div className="detalle__body__col--uno">
                            <label>Fecha de programación ETD</label>
                            <div>
                              {editable ? (
                                <DatePicker
                                  className="responsive-datepicker"
                                  selected={editableZarpe.rescheduled_etd_date ? new Date(editableZarpe.rescheduled_etd_date + 'T00:00:00') : null}
                                  onChange={(date) => handleDateChange('rescheduled_etd_date', date)}
                                  dateFormat="dd/MM/yyyy"
                                  placeholderText="Selecciona fecha"
                                  minDate={minDate}
                                  maxDate={null}
                                />
                              ) : (
                                <input
                                  type="text"
                                  value={formatDateForDisplay(editableZarpe.rescheduled_etd_date ? new Date(`${editableZarpe.rescheduled_etd_date}`) : null)}
                                  className="w-100"
                                  readOnly
                                />
                              )}
                            </div>
                      </div>


                  <div className="text-center block-center">
                  {!editable && (
               
                            <button className="btn btn__primary btn--ico m-2" onClick={() => setEditable(true)}>
                              <i className="bi bi-pencil-square"></i> Editar
                            </button>

                          )}
                          {editable && (
                            <>
                              <button className="btn btn__primary btn--ico m-2" onClick={handleActualizar}>
                                <i className="bi bi-check-square"></i> Guardar Cambios
                              </button>
                              <button className="btn btn__secondary btn--ico m-2" onClick={() => setEditable(false)}>
                                <i className="bi bi-x"></i> Cancelar
                              </button>
                            </>
                        )}


                  </div>
              </div>

            </div>

          </>

        )}

      {/* Modal para mostrar mensaje */}
      {mostrarModal && (
        <div className="confirmation-modal">
          <div className="confirmation-modal__content">
          {modalDataInformation.icon === 'check' && <FaCheck size={30} color="green" style={{ margin: ' 0 auto' }}/>} {/* Tamaño y color personalizables */}
          {modalDataInformation.icon === 'times' && <FaTimes size={30} color="red" style={{ margin: ' 0 auto' }} />} {/* Tamaño y color personalizables */}
          <p className='error_Tdata'>{modalDataInformation.message}</p>
          <div className='customModal__buttons'>
           <button className='btn btn__primary' onClick={() => setMostrarModal(false)}>Cerrar</button>
          </div>
            
          </div>
        </div>
          )}
        </>
    );
}
