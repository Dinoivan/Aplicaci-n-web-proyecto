import { useEffect,useState,useMemo}  from 'react';
import {findAllRequestibk} from "../../../../../../hooks/exportaciones/useRequestIbkProcess";
import { useAuth } from "../../../../../../contexts/Authutils";
import { Agregar } from "../../../../../../services/exportaciones/RequestIbkService";
import { FaCheck, FaTimes } from 'react-icons/fa';
import {findAllPedidosFichaId} from "../../../../../../hooks/exportaciones/Estados-logicas-pedidos/usePedidosService";
import { usePedidosState } from "../../../../../../hooks/exportaciones/Estados-logicas-pedidos/usePedidosState";
import { Update} from "../../../../../../services/exportaciones/listapedidosServices";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format,  isValid } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import { ActualizarIBK } from '../../../../../../services/exportaciones/RequestIbkService';

export function SolicitudBkPage() {

  const fichaId = localStorage.getItem('fichaId');
  console.log("Soy la ficha: ",fichaId);
  
  const [data, setData] = useState([]);

  const {pedidos,setPedidos
 } = usePedidosState();
  
  const { accessToken } = useAuth(); // Obtiene el Token del contexto de autenticación

  const [lineaNaviera, setLineaNaviera] = useState("");
  const [agenteCarga, setAgenteCarga] = useState("");
  const [diasSobreestadia, setDiasSobreestadia] = useState("");
  const [numeroBooking, setNumeroBooking] = useState("");
  const [fechaRetiroContenedores, setFechaRetiroContenedores] = useState(null);
  const [fechaFinalMatriz, setFechaFinalMatriz] = useState(null);
  const [fechaEnvioVGM, setFechaEnvioVGM] = useState(null);
  const [nombreNave, setNombreNave] = useState(null);
  const [fechaPreliminarMatriz, setFechaPreliminarMatriz] = useState(null);
  const [fechaETDPrevista, setFechaETDPrevista] = useState(null);
  const [fechaETAPrevista, setFechaETAPrevista] = useState(null);
  const [fechaETDReal, setFechaETDReal] = useState(null);
  const [almacenRetiroContenedores, setAlmacenRetiroContenedores] = useState("");
  const [numeroDocumentoEmbarque,setNumeroDocumentoEmbarque] = useState("");
  const [almacenIngresoContenedores, setAlmacenIngresoContenedores] = useState("");
  const [puertoDestino, setPuertoDestino] = useState("");

  const [mostrarIngreso, setMostrarIngreso] = useState(true); // Nuevo estado para controlar qué sección mostrar
  const [mostrarModal, setMostrarModal] = useState(false);

  const [modalDataInformation, setModalDatainformation] = useState({
    title: "",
    message: "",
    icon: "",
  });

  const minDate = useMemo(() => {
    const date = new Date();
    date.setMonth(date.getMonth() - 12);
    return date;
  }, []);

  //Actualizar

   //Estado para editar los campos de fichas de exportación
   const [isEditing, setIsEditing] = useState(false);

  //Objeto para almacenar los contenidos de ibk relacionado a la ficha
  const [editableFieldsibk, setEditableFieldsibk] = useState({
    id: 0,
    shipping_line: "",
    cargo_agent: "",
    overstay_days_origin: "",
    booking_number: "",
    document_booking: "",
    container_withdrawal_date: null,
    vgm_matrix_date: null,
    ship_name: "",
    preliminary_matrix_date: null,
    expected_etd_date: null,
    expected_eta_date: null,
    actual_etd_date: null,
    max_date_matrix: null,
    empty_container_withdrawal_warehouse: "",
    full_container_entry_warehouse: "",
    destination_port: "",
  });

  //Evento para detectar lo que ingresa el usuario
  const handleInputChange = (field, value) => {
    setEditableFieldsibk({
      ...editableFieldsibk,
      [field]: value,
    });
    
  };

   // Función para manejar el cambio de fecha en el modo de edición
   const handleDateChange = (field, date) => {
    setEditableFieldsibk((prevFields) => ({
      ...prevFields,
      [field]: date instanceof Date ? format(utcToZonedTime(date, 'UTC'), 'yyyy-MM-dd') : null,
    }));
  };

  // Función para formatear la fecha para mostrarla en modo de solo lectura
   const formatDateForDisplay = (date) => (isValid(date) ? format(utcToZonedTime(date, 'UTC'), 'dd/MM/yyyy') : '-');

  

   //Evento para guardar cambios actualizados
   const handleGuardarCambiosActualizadosibk = async () => {
    try {
      const objetoParaActualizar = {
        id: editableFieldsibk.id,
        exportation_id: fichaId,
        shipping_line: editableFieldsibk.shipping_line,
        cargo_agent: editableFieldsibk.cargo_agent,
        overstay_days_origin: editableFieldsibk.overstay_days_origin,
        booking_number: editableFieldsibk.booking_number,
        document_booking: editableFieldsibk.document_booking,
        container_withdrawal_date: editableFieldsibk.container_withdrawal_date,
        vgm_matrix_date: editableFieldsibk.vgm_matrix_date,
        ship_name: editableFieldsibk.ship_name,
        preliminary_matrix_date: editableFieldsibk.preliminary_matrix_date,
        expected_etd_date: editableFieldsibk.expected_etd_date,
        expected_eta_date: editableFieldsibk.expected_eta_date,
        actual_etd_date: editableFieldsibk.actual_etd_date,
        max_date_matrix: editableFieldsibk.max_date_matrix,
        empty_container_withdrawal_warehouse: editableFieldsibk.empty_container_withdrawal_warehouse,
        full_container_entry_warehouse: editableFieldsibk.full_container_entry_warehouse,
        destination_port: editableFieldsibk.destination_port,
      }
  
      await ActualizarIBK(accessToken, fichaId,objetoParaActualizar);
      setModalDatainformation({ title: "Éxito", message: "La información se actualizo correctamente",icon: 'check', });
      setMostrarModal(true);
      console.log('Ficha actualizada con éxito');

    setIsEditing(false);

  }catch(error) {
      console.error('Error al actualizar la ficha:', error);
      setModalDatainformation({ title: "Error", message: "Sucedio un Error",icon: 'times', });
    }
  };


  const handleGuardar = async () => {
    try {
      // Crear el objeto con los datos del formulario

      const fecha1 = fechaRetiroContenedores ? `${format(fechaRetiroContenedores, 'yyyy-MM-dd')}` : null;
      const fecha2 = fechaEnvioVGM ? `${format(fechaEnvioVGM, 'yyyy-MM-dd')}` : null;
      const fecha3 = fechaPreliminarMatriz ? `${format(fechaPreliminarMatriz, 'yyyy-MM-dd')}`: null;
      const fecha4 =  fechaETDPrevista ? `${format(fechaETDPrevista, 'yyyy-MM-dd')}`: null;
      const fecha5 = fechaETAPrevista ? `${format(fechaETAPrevista, 'yyyy-MM-dd')}`: null;
      const fecha6 = fechaETDReal ? `${format(fechaETDReal, 'yyyy-MM-dd')}`: null;
      const fecha7 = fechaFinalMatriz ? `${format(fechaFinalMatriz, 'yyyy-MM-dd')}`: null;

      const nuevoObjeto = {
        shipping_line: lineaNaviera,
        cargo_agent: agenteCarga,
        overstay_days_origin: diasSobreestadia,
        booking_number: numeroBooking,
        document_booking: numeroDocumentoEmbarque,
        container_withdrawal_date: fecha1,
        max_date_matrix: fecha7,
        vgm_matrix_date: fecha2,
        ship_name: nombreNave,
        preliminary_matrix_date: fecha3,
        expected_etd_date: fecha4,
        expected_eta_date: fecha5,
        actual_etd_date: fecha6,
        empty_container_withdrawal_warehouse: almacenRetiroContenedores,
        full_container_entry_warehouse: almacenIngresoContenedores,
        destination_port: puertoDestino,
        exportation_id: fichaId, // Reemplaza con el valor real
      };

      // Llamar al servicio Agregar para guardar los datos
      await Agregar(accessToken, nuevoObjeto);

      const resultado = await findAllRequestibk(fichaId, accessToken);
      setData(resultado);

      await Update(accessToken, { id: fichaId, status: 'APPROVED' });
      console.log('Ficha aprobada');

       const result = await findAllPedidosFichaId(fichaId,accessToken);
       setPedidos(result)

      setMostrarIngreso(resultado.length === 0);
      setModalDatainformation({ title: "Éxito", message: "Información guardado exitosamente",icon: 'check', });
      setMostrarModal(true);

      window.location.href = `/features/exportaciones/ficha/programa-despacho?exportation_id=${fichaId}`;
      
    } catch (error) {
      console.log("Error al guardar los datos",error);
      setModalDatainformation({ title: "Error", message: "Sucedio un Error",icon: 'times', });
    }
  };

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

  console.log("Pedidos: ",pedidos);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZone: 'America/New_York' };
  
    // Crear una instancia de la fecha
    const date = new Date(dateString);
  
    // Formatear la fecha usando las opciones
    return date.toLocaleDateString('es-ES', options);
  };
  
   useEffect(() => {
    async function fetchData() {
       try {
         const resultado = await findAllRequestibk(fichaId, accessToken);
         const fichaData = resultado.length > 0 ? resultado[0] : {};
         setData(fichaData);
         setEditableFieldsibk({
          id: fichaData.id || "",
          shipping_line: fichaData.shipping_line || "",
          cargo_agent: fichaData.cargo_agent || "",
          overstay_days_origin: fichaData.overstay_days_origin || "",
          booking_number: fichaData.booking_number || "",
          document_booking: fichaData.document_booking || "",
          container_withdrawal_date: fichaData.container_withdrawal_date || null,
          vgm_matrix_date: fichaData.vgm_matrix_date || null,
          ship_name: fichaData.ship_name || "",
          preliminary_matrix_date: fichaData.preliminary_matrix_date || null,
          expected_etd_date: fichaData.expected_etd_date || null,
          expected_eta_date: fichaData.expected_eta_date || null,
          actual_etd_date: fichaData.actual_etd_date || null,
          max_date_matrix: fichaData.max_date_matrix || null,
          empty_container_withdrawal_warehouse: fichaData.empty_container_withdrawal_warehouse || "",
          full_container_entry_warehouse: fichaData.full_container_entry_warehouse || "",
          destination_port: fichaData.destination_port || "",
         })
         setMostrarIngreso(resultado.length === 0);
       } catch (error) {
         console.log("Error al obtener los datos");
       }
     }
     fetchData();
   }, [fichaId,setEditableFieldsibk,setData,accessToken]);
   
  console.log("Hola soy el resultado: ",data);                                      

    return(
        <>
        {mostrarIngreso ? (
          <>

          <div className='centrar'>
          <h3>Solicitud BK</h3>

          {Object.keys(data).length > 0 ? (
                        <div key={data.id} className="modif">
                        <p><strong>Fecha de creación:</strong> {formatDate(data.created_at) || 'N/A'}</p>
                        <p><strong>Fecha de actualización:</strong> {formatDate(data.updated_at) || 'N/A'}</p>
                      </div>
                    ) : (
                      <div>-</div>
            )}

          </div>
       

             <div className="detalle">
                    <div className="detalle__body form">
                  
                        
                        <div className="detalle__body__col--uno">
                          <label>Linea de transporte</label>
                          <div>
                            <input type="text" id="shipping_line" name="shipping_line"
                            value={lineaNaviera}
                            onChange={(e) => setLineaNaviera(e.target.value)} 
                            className="w-100"/>
                          </div>
                        </div>
                        
                        <div className="detalle__body__col--uno">
                          <label>Agente de Carga</label>
                          <div>
                            <input type="text" id='cargo_agent' name='cargo_agent'
                            value={agenteCarga}
                            onChange={(e) => setAgenteCarga(e.target.value)} 
                            className="w-100" />
                          </div>
                        </div>

                        <div className="detalle__body__col--uno">
                          <label>Dias de sobreestadia en origen</label>
                          <div>
                            <input type="text" id='overstay_days_origin' name='overstay_days_origin'
                            value={diasSobreestadia}
                            onChange={(e) => setDiasSobreestadia(e.target.value)} 
                            className="w-100" />
                          </div>
                        </div>


                        <div className="detalle__body__col--uno">
                          <label>Nº de booking</label>
                          <div>
                            <input type="text" id='booking_number' name='booking_number'
                            value={numeroBooking}
                            onChange={(e) => setNumeroBooking(e.target.value)} 
                            className="w-100"/>
                          </div>
                        </div>


                        <div className="detalle__body__col--uno">
                          <label>Documento de Embarque</label>
                          <div>
                            <input type="text" id='document_booking' name='document_booking'
                            value={numeroDocumentoEmbarque}
                            onChange={(e) => setNumeroDocumentoEmbarque(e.target.value)} 
                            className="w-100"/>
                          </div>
                        </div>

                        {Array.isArray(pedidos) && pedidos.length > 0 && (
                          <div className="detalle__body__col--uno">
                              <label>Nº de contenedores por embarque</label>
                              <div>
                                  <input type="text"  value={pedidos[0]?.exportation?.total_containers} className="w-100" readOnly/>
                              </div>
                          </div>
                          )}

                        <div className="detalle__body__col--uno">
                          <label>Fecha máxima para retiro de contenedores</label>
                          <div className='custom-datepicker-container'>
                            <DatePicker
                            className="responsive-datepicker"
                            selected={fechaRetiroContenedores}
                            onChange={(date) => setFechaRetiroContenedores(date)}
                            dateFormat="dd/MM/yyyy"
                            placeholderText="Selecciona fecha"
                            minDate={minDate}
                            maxDate={null}
                       
      
                          />
                         
                          </div>
                        </div>


                        <div className="detalle__body__col--uno">
                          <label>Fecha Maxima de envío Matriz</label>
                          <div>
                            <DatePicker
                             className="responsive-datepicker"
                            selected={fechaFinalMatriz}
                            onChange={(date) => setFechaFinalMatriz(date)}
                            dateFormat="dd/MM/yyyy"
                            placeholderText='Selecione una fecha'
                            minDate={minDate}
                            maxDate={null} 
                        
                             />
                          </div>
                        </div>

                        <div className="detalle__body__col--uno">
                          <label>Fecha Máxima de envio VGM</label>
                           <div>
                            <DatePicker
                            className="responsive-datepicker" 
                            selected={fechaEnvioVGM}
                            onChange={(date) => setFechaEnvioVGM(date)}
                            dateFormat="dd/MM/yyyy"
                            placeholderText='Seleccione una fecha'
                            minDate={minDate}
                            maxDate={null}
                         
                            />
                          </div>
                        </div>


                        <div className="detalle__body__col--uno">
                          <label>Nombre de Nave</label>
                           <div>
                            <input type="text" id='ship_name' name='ship_name'
                            value={nombreNave}
                            onChange={(e) => setNombreNave(e.target.value)} 
                            className="w-100"/>
                          </div>
                        </div>


                        <div className="detalle__body__col--uno">
                          <label>Fecha preliminar de Matriz</label>
                           <div>
                            <DatePicker
                            className="responsive-datepicker" 
                            selected={fechaPreliminarMatriz}
                            onChange={(date) => setFechaPreliminarMatriz(date)}
                            dateFormat="dd/MM/yyyy"
                            placeholderText='Seleccione una fecha'
                            minDate={minDate}
                            maxDate={null}
                         
                       
                             />
                          </div>
                        </div>

                        <div className="detalle__body__col--uno">
                          <label>Fecha ETD Prevista</label>
                           <div>
                            <DatePicker
                             className="responsive-datepicker" 
                            selected={fechaETDPrevista}
                            onChange={(date) => setFechaETDPrevista(date)}
                            dateFormat="dd/MM/yyyy"
                            placeholderText='Seleccione una fecha'
                            minDate={minDate}
                            maxDate={null}
                        
                            />
                          </div>
                        </div>


                       <div className="detalle__body__col--uno">
                          <label>Fecha ETA prevista</label>
                           <div>
                            <DatePicker
                             className="responsive-datepicker" 
                            selected={fechaETAPrevista}
                            onChange={(date) => setFechaETAPrevista(date)}
                            dateFormat="dd/MM/yyyy"
                            placeholderText='Seleccione una fecha'
                            minDate={minDate}
                            maxDate={null}
                       
                            />
                          </div>
                        </div>


                       <div className="detalle__body__col--uno">
                          <label>Fecha ETD Real</label>
                           <div>
                            <DatePicker
                            className="responsive-datepicker" 
                            selected={fechaETDReal}
                            onChange={(date) => setFechaETDReal(date)}
                            dateFormat="dd/MM/yyyy"
                            placeholderText='Seleccione una fecha'
                            minDate={minDate}
                            maxDate={null}
                      
                     
                            />
                          </div>
                        </div>

                       <div className="detalle__body__col--uno">
                          <label>Almacen de retiro de contenedores vacios</label>
                           <div>
                            <input type="text" id='empty_container_withdrawal_warehouse' name='empty_container_withdrawal_warehouse'
                            value={almacenRetiroContenedores}
                            onChange={(e) => setAlmacenRetiroContenedores(e.target.value)} 
                            className="w-100"  />
                          </div>
                        </div>

                        <div className="detalle__body__col--uno">
                          <label>Almacen de ingreso de contenedores llenos</label>
                           <div>
                            <input type="text" id='full_container_entry_warehouse'
                            value={almacenIngresoContenedores}
                            onChange={(e) => setAlmacenIngresoContenedores(e.target.value)} 
                            className="w-100"/>
                          </div>
                        </div>


                        <div className="detalle__body__col--uno">
                          <label>Puerto de destino</label>
                           <div>
                            <input type="text" id='destination_port'
                            value={puertoDestino}
                            onChange={(e) => setPuertoDestino(e.target.value)} 
                            className="w-100" />
                          </div>
                        </div> 
                    </div>

            </div>
  <div className="text-center block-center">
				<button className="btn btn__primary" onClick={handleGuardar}>Guardar</button>

			</div>
      </>

        ): (
          <>
           <div className='centrar'>
              <h3>Solicitud BK</h3>

                  {Object.keys(data).length > 0 ? (
                                <div key={data.id} className="modif">
                                <p><strong>Fecha de creación:</strong> {formatDate(data.created_at) || 'N/A'}</p>
                                <p><strong>Fecha de actualización:</strong> {formatDate(data.updated_at) || 'N/A'}</p>
                              </div>
                            ) : (
                              <div>-</div>
                )}
             </div>

             <div className="detalle">
  
                    <div className="detalle__body form">
                    {Object.keys(data).length > 0 ? (
                    <>
                        
                        <div key={data.id}  className="detalle__body__col--uno">
                          <label>Linea de transporte </label>
                          <div>
                          {isEditing ? (
                              <input type="text" 
                              value={editableFieldsibk.shipping_line}
                              onChange={(e) => handleInputChange('shipping_line', e.target.value)}
                              className='w-100'
                              />
                            ):(
                              <input type="text" value={editableFieldsibk.shipping_line} className='w-100' readOnly/>

                            )}
                          </div>
                        </div>
                        
                        <div className="detalle__body__col--uno">
                          <label>Agente de Carga</label>
                          <div>

                          {isEditing ? (
                              <input type="text" 
                              value={editableFieldsibk.cargo_agent}
                              onChange={(e) => handleInputChange('cargo_agent', e.target.value)}
                              className='w-100'
                              />
                            ):(
                              <input type="text" value={editableFieldsibk.cargo_agent} className='w-100' readOnly/>

                            )}
                          </div>
                        </div>

                        <div className="detalle__body__col--uno">
                          <label>Dias de sobreestadia en origen</label>
                          <div>

                          {isEditing ? (
                              <input type="text" 
                              value={editableFieldsibk.overstay_days_origin}
                              onChange={(e) => handleInputChange('overstay_days_origin', e.target.value)}
                              className='w-100'
                              />
                            ):(
                              <input type="text" value={editableFieldsibk.overstay_days_origin} className='w-100' readOnly/>

                            )}
                          </div>
                        </div>


                        <div className="detalle__body__col--uno">
                          <label>Nº de booking</label>
                          <div>
 
                          {isEditing ? (
                              <input type="text" 
                              value={editableFieldsibk.booking_number}
                              onChange={(e) => handleInputChange('booking_number', e.target.value)}
                              className='w-100'
                              />
                            ):(
                              <input type="text" value={editableFieldsibk.booking_number} className='w-100' readOnly/>

                            )}
                          </div>
                        </div>


                        <div className="detalle__body__col--uno">
                          <label>Documento de Embarque</label>
                          <div>
 
                          {isEditing ? (
                              <input type="text" 
                              value={editableFieldsibk.document_booking}
                              onChange={(e) => handleInputChange('document_booking', e.target.value)}
                              className='w-100'
                              />
                            ):(
                              <input type="text" value={editableFieldsibk.document_booking} className='w-100' readOnly/>

                            )}
                          </div>
                        </div>

                  
                        <div className="detalle__body__col--uno">
                          <label>Nº de contenedores por embarque</label>
                          <div>
                            <input type="text" value={data.exportation.total_containers} className="w-100"  readOnly/>
                          </div>
                        </div>


    
                        <div className="detalle__body__col--uno">
                            <label>Fecha máxima para retiro de contenedores</label>
                            <div>
                              {isEditing ? (
                                <DatePicker
                                  className="responsive-datepicker"
                                  selected={editableFieldsibk.container_withdrawal_date ? new Date(editableFieldsibk.container_withdrawal_date + 'T00:00:00') : null}
                                  onChange={(date) => handleDateChange('container_withdrawal_date', date)}
                                  dateFormat="dd/MM/yyyy"
                                  placeholderText="Selecciona fecha"
                                  minDate={minDate}
                                  maxDate={null}
                                />
                              ) : (
                                <input
                                  type="text"
                                  value={formatDateForDisplay(editableFieldsibk.container_withdrawal_date ? new Date(`${editableFieldsibk.container_withdrawal_date}T00:00:00`) : null)}
                                  className="w-100"
                                  readOnly
                                />
                              )}
                            </div>
                      </div>
                        
                        
                      <div className="detalle__body__col--uno">
                        <label>Fecha Maxima de envío Matriz</label>
                        <div>
                          {isEditing ? (
                            <DatePicker
                              className="responsive-datepicker"
                              selected={editableFieldsibk.max_date_matrix ? new Date(editableFieldsibk.max_date_matrix + 'T00:00:00') : null}
                              onChange={(date) => handleDateChange('max_date_matrix', date)}
                              dateFormat="dd/MM/yyyy"
                              placeholderText="Selecciona fecha"
                              minDate={minDate}
                              maxDate={null}
                            />
                          ) : (
                            <input
                              type="text"
                              value={formatDateForDisplay(editableFieldsibk.max_date_matrix ? new Date(`${editableFieldsibk.max_date_matrix}T00:00:00`) : null)}
                              className="w-100"
                              readOnly
                            />
                          )}
                        </div>
                      </div>

                      <div className="detalle__body__col--uno">
                      <label>Fecha Máxima de envio VGM</label>
                      <div>
                        {isEditing ? (
                          <DatePicker
                            className="responsive-datepicker"
                            selected={editableFieldsibk.vgm_matrix_date ? new Date(editableFieldsibk.vgm_matrix_date + 'T00:00:00') : null}
                            onChange={(date) => handleDateChange('vgm_matrix_date', date)}
                            dateFormat="dd/MM/yyyy"
                            placeholderText="Selecciona fecha"
                            minDate={minDate}
                            maxDate={null}
                          />
                        ) : (
                          <input
                            type="text"
                            value={formatDateForDisplay(editableFieldsibk.vgm_matrix_date ? new Date(`${editableFieldsibk.vgm_matrix_date}T00:00:00`) : null)}
                            className="w-100"
                            readOnly
                          />
                        )}
                      </div>
                   </div>


                        <div className="detalle__body__col--uno">
                          <label>Nombre de Nave</label>
                           <div>

                           {isEditing ? (
                              <input type="text" 
                              value={editableFieldsibk.ship_name}
                              onChange={(e) => handleInputChange('ship_name', e.target.value)}
                              className='w-100'
                              />
                            ):(
                              <input type="text" value={editableFieldsibk.ship_name} className='w-100' readOnly/>

                            )}

                          </div>
                        </div>


                        <div className="detalle__body__col--uno">
                          <label>Fecha preliminar de Matriz</label>
                          <div>
                            {isEditing ? (
                              <DatePicker
                                className="responsive-datepicker"
                                selected={editableFieldsibk.preliminary_matrix_date ? new Date(editableFieldsibk.preliminary_matrix_date + 'T00:00:00') : null}
                                onChange={(date) => handleDateChange('preliminary_matrix_date', date)}
                                dateFormat="dd/MM/yyyy"
                                placeholderText="Selecciona fecha"
                                minDate={minDate}
                                maxDate={null}
                              />
                            ) : (
                              <input
                                type="text"
                                value={formatDateForDisplay(editableFieldsibk.preliminary_matrix_date ? new Date(`${editableFieldsibk.preliminary_matrix_date}T00:00:00`) : null)}
                                className="w-100"
                                readOnly
                              />
                            )}
                          </div>
                        </div>


                        <div className="detalle__body__col--uno">
                            <label>Fecha ETD Prevista</label>
                            <div>
                              {isEditing ? (
                                <DatePicker
                                  className="responsive-datepicker"
                                  selected={editableFieldsibk.expected_etd_date ? new Date(editableFieldsibk.expected_etd_date + 'T00:00:00') : null}
                                  onChange={(date) => handleDateChange('expected_etd_date', date)}
                                  dateFormat="dd/MM/yyyy"
                                  placeholderText="Selecciona fecha"
                                  minDate={minDate}
                                  maxDate={null}
                                />
                              ) : (
                                <input
                                  type="text"
                                  value={formatDateForDisplay(editableFieldsibk.expected_etd_date ? new Date(`${editableFieldsibk.expected_etd_date}T00:00:00`) : null)}
                                  className="w-100"
                                  readOnly
                                />
                              )}
                            </div>
                          </div>


                          <div className="detalle__body__col--uno">
                          <label>Fecha ETA prevista</label>
                          <div>
                            {isEditing ? (
                              <DatePicker
                                className="responsive-datepicker"
                                selected={editableFieldsibk.expected_eta_date ? new Date(editableFieldsibk.expected_eta_date + 'T00:00:00') : null}
                                onChange={(date) => handleDateChange('expected_eta_date', date)}
                                dateFormat="dd/MM/yyyy"
                                placeholderText="Selecciona fecha"
                                minDate={minDate}
                                maxDate={null}
                              />
                            ) : (
                              <input
                                type="text"
                                value={formatDateForDisplay(editableFieldsibk.expected_eta_date ? new Date(`${editableFieldsibk.expected_eta_date}T00:00:00`) : null)}
                                className="w-100"
                                readOnly
                              />
                            )}
                          </div>
                        </div>


                        <div className="detalle__body__col--uno">
                            <label>Fecha ETD Real</label>
                            <div>
                              {isEditing ? (
                                <DatePicker
                                  className="responsive-datepicker"
                                  selected={editableFieldsibk.actual_etd_date ? new Date(editableFieldsibk.actual_etd_date + 'T00:00:00') : null}
                                  onChange={(date) => handleDateChange('actual_etd_date', date)}
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
                          <label>Almacen de retiro de contenedores vacios</label>
                           <div>

                           {isEditing ? (
                              <input type="text" 
                              value={editableFieldsibk.empty_container_withdrawal_warehouse}
                              onChange={(e) => handleInputChange('empty_container_withdrawal_warehouse', e.target.value)}
                              className='w-100'
                              />
                            ):(
                              <input type="text" value={editableFieldsibk.empty_container_withdrawal_warehouse} className='w-100' readOnly/>

                            )}
                          </div>
                        </div>

                        <div className="detalle__body__col--uno">
                          <label>Almacen de ingreso de contenedores llenos</label>
                           <div>

                           {isEditing ? (
                              <input type="text" 
                              value={editableFieldsibk.full_container_entry_warehouse}
                              onChange={(e) => handleInputChange('full_container_entry_warehouse', e.target.value)}
                              className='w-100'
                              />
                            ):(
                              <input type="text" value={editableFieldsibk.full_container_entry_warehouse} className='w-100' readOnly/>

                            )}
                          </div>
                        </div>


                        <div className="detalle__body__col--uno">
                          <label>Puerto de destino</label>
                           <div>

                           {isEditing ? (
                              <input type="text" 
                              value={editableFieldsibk.destination_port}
                              onChange={(e) => handleInputChange('destination_port', e.target.value)}
                              className='w-100'
                              />
                            ):(
                              <input type="text" value={editableFieldsibk.destination_port} className='w-100' readOnly/>

                            )}
                          </div>
                        </div>
                        </>
                         ): (
                          <>
                          <p>No existe datos</p>
                          </>
                         )} 
                    </div>

              </div>


              
              <div className="text-center block-center">
    
                     {!isEditing && (
               
                          <button className="btn btn__primary btn--ico m-2" onClick={() => setIsEditing(true)}>
                            <i className="bi bi-pencil-square"></i> Editar
                          </button>
       
                        )}
                        {isEditing && (
                          <>
                            <button className="btn btn__primary btn--ico m-2" onClick={handleGuardarCambiosActualizadosibk}>
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


        {/* Modal para mostrar mensaje */}
      {mostrarModal && (
        <div className="confirmation-modal">
          <div className="confirmation-modal__content">
          {modalDataInformation.icon === 'check' && <FaCheck size={30} color="green" style={{ margin: ' 0 auto' }}/>} {/* Tamaño y color personalizables */}
          {modalDataInformation.icon === 'times' && <FaTimes size={30} color="red" style={{ margin: ' 0 auto' }} />} {/* Tamaño y color personalizables */}
          <p className='error_Tdata'>{modalDataInformation.message}</p>
          <div className="customModal__buttons ">
           <button className="btn btn__primary" onClick={() => setMostrarModal(false)}>Cerrar</button>
          </div>
          </div>
        </div>
      )}
 
        </>
    );
}