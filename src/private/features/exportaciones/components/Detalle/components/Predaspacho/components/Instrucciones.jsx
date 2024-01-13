import { crearInstructivo } from "../../../../../../../../services/exportaciones/GestionFichas";
import { useState,useMemo } from "react";
import { useEffect} from 'react';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from 'date-fns';  
import { useAuth } from "../../../../../../../../contexts/Authutils";
import { FaCheck, FaTimes } from 'react-icons/fa';
import { findAllRequestibk } from "../../../../../../../../hooks/exportaciones/useRequestIbkProcess";
import { findAllPedidosFichaId } from "../../../../../../../../hooks/exportaciones/Estados-logicas-pedidos/usePedidosService";
import { usePedidosState } from "../../../../../../../../hooks/exportaciones/Estados-logicas-pedidos/usePedidosState";
import { FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { obtenerTipoDeSociedades } from "../../../../../../../../services/exportaciones/GestionFichas";
import { obtenerInformacionPorSociedad } from "../../../../../../../../services/exportaciones/GestionFichas";
import { obtenerInformacionDeFactura } from "../../../../../../../../services/exportaciones/GestionFichas";
import { DispathProgramFicha } from "../../../../../../../../services/exportaciones/DispatchProgramService";
import { FindAllPedidosSJandTrebol } from "../../../../../../../../services/exportaciones/listapedidosServices";
import { DispathProgramLocation } from "../../../../../../../../services/exportaciones/DispatchProgramService";
import { PreDispathManagement } from "../../../../../../../../services/exportaciones/PreDispatchManagementService";
import { FindAllPedidosDetailsIdFicha } from "../../../../../../../../services/exportaciones/listapedidosServices";
// import { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell } from "docx";

export function Instrucciones() {

  const [fromfield, setfromfield] = useState("");
  const [dateF, setDateF] = useState(null);
  // const [notifypayment, setnotifypayment] = useState("");
  // const [consignee, setconsignee] = useState("");
  const [generaldescription, setgeneralDescription] = useState("");
  // const [subject, setSubject] = useState("");
  const [billedto, setbBlledto] = useState("");
  // const [paymentcondition, setPayment_condition] = useState("");
  const [cntdescription, setCntdescription] = useState("");
  const [totalbl, setTotalbl] = useState("");
  // const [loadplaceanddate, setLoadplaceanddate] = useState("");
  const [portofloading, setPortofloading] = useState("");

  const [packagenumber, setPackagenumber] = useState("");
  const [marks,setMarks] = useState("");
  const [freight,setfreight] = useState("");


  // const [bl_declaration,setbl_declaration] = useState("");

  const [tiposSociedad,setTiposSociedad] = useState([]);
  const [tipoFacturado,setTipoFacturado] = useState([]);

  // const [options,setOpcions] = useState([]);
  const [to_,setTo_] = useState("");

  const [detalle,setDetalle] = useState([]);

  const [detallePredispath,setDetallePredispath] = useState([]);
  const [destallePedidos,setDetallePedidos] =  useState([]);

  const [pedidos_,setPedidos_] = useState([]);

  const [data,setData] = useState([]);

  //Fechas por ubicacion
  const [fechasPorUbicacion, setFechasPorUbicacion] = useState({
    sanJuanDeLurigancho: [],
    trebol: [],
    ph: [],
    milla: []
  });
  
  const [result,setResult] = useState("");

  const [result_,setResult_] = useState("");

  const [ibk,setibk] = useState({});
  const {pedidos,setPedidos
  } = usePedidosState();

  const [isLoading, setIsLoading] = useState(false); // Nueva variable de estado

  const { accessToken } = useAuth(); // Obtiene el Token del contexto de autenticación

  const fichaId = localStorage.getItem('fichaId');
  console.log("Soy la ficha: ",fichaId);

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

  const newOptions = ['GARCIA PERSICO S.A.C', 'C ZAVALA ADUANERA S.A.C'];

  //Se utiliza datos de pedidos
  useEffect(() => {
    async function fetchData() {
      try {
        const resul = await obtenerTipoDeSociedades(accessToken);
        setTiposSociedad(resul);
      } catch (error) {
        console.log("Error al obtener los datos");
      }
    }
    fetchData();
  }, [setTiposSociedad,accessToken]);

  console.log("Lista de tipos de sociedades: ",tiposSociedad);

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

   //Se utiliza datos de pedidos
   useEffect(() => {
    async function fetchData() {
      try {
        const resul = await obtenerInformacionPorSociedad(accessToken,fromfield);
        setTipoFacturado(resul);
      } catch (error) {
        console.log("Error al obtener los datos");
      }
    }
    fetchData();
  }, [setTipoFacturado,accessToken,fromfield]);

  console.log("Lista de usuarios: ",tipoFacturado)

   //Se utiliza datos de pedidos
   useEffect(() => {
    async function fetchData() {
      try {
        const resul = await obtenerInformacionDeFactura(accessToken,billedto);
        setDetalle(resul);
      } catch (error) {
        console.log("Error al obtener los datos");
      }
    }
    fetchData();
  }, [setDetalle,accessToken,billedto]);

  console.log("Lista de factura detallada: ",detalle);


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
//   useEffect(() => {
//     // ...

//     const combinedResult = `\nSan Juan de Lurigancho: ${destallePedidos.sanJuanDeLurigancho || ''}\nFecha: ${fechasPorUbicacion.sanJuanDeLurigancho || ''}\n` +
//                           `PH: ${destallePedidos.ph || ''}\nFecha: ${fechasPorUbicacion.ph || ''}\n` +
//                           `Milla: ${destallePedidos.milla || ''}\nFecha: ${fechasPorUbicacion.milla || ''}\n` +
//                           `Trebol: ${destallePedidos.trebolSanMartin || ''}\nFecha: ${fechasPorUbicacion.trebol || ''}`;
//     setResult(combinedResult);
// }, [destallePedidos, fechasPorUbicacion]);

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

  //Concatenar
  useEffect(() => {
    // ...

    const combinedResult = `Fecha: ${fechasPorUbicacion.sanJuanDeLurigancho || ''}, San Juan de Lurigancho: ${destallePedidos.sanJuanDeLurigancho || ''} =>` +
                          `Fecha: ${fechasPorUbicacion.ph || ''}\nPH: ${destallePedidos.ph || ''} =>` +
                          `Fecha: ${fechasPorUbicacion.milla || ''}\nMilla: ${destallePedidos.milla || ''} =>` +
                          `Fecha: ${fechasPorUbicacion.trebol || ''}\nTrebol: ${destallePedidos.trebolSanMartin || ''} =>`;
    setResult_(combinedResult);
}, [destallePedidos, fechasPorUbicacion]);

  console.log("Result_: ",result_);


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

    console.log("Pedidos: ",pedidos);


    useEffect(() => {
      async function fetchData() {
         try {
           const resultado = await PreDispathManagement(fichaId, accessToken);
           console.log("Hola soy el id: ",fichaId)
           setData(resultado);
         } catch (error) {
           console.log("Error al obtener los datos");
         }
       }
       fetchData();
     }, [fichaId,setData,accessToken]);

     console.log("Resultado de dato: ",data);

     const filteredData = data.filter(item => item.country);


  const handleGuardar = async () => {

    setIsLoading(true); // Establecer isLoading en true antes de enviar el formulario

    try {
      // Crear el objeto con los datos del formulario

      const fecha1 = dateF ? `${format(dateF, 'yyyy-MM-dd')}` : null;
  

      const nuevoObjeto = {
        // to: Array.isArray(ibk) && ibk.length > 0 ? ibk[0].cargo_agent : "",
        to: to_ || "",
        from_field: fromfield,
        date : fecha1,
        booking: Array.isArray(ibk) && ibk.length > 0 ? ibk[0].booking_number : "",
        billed_to: billedto || "",
        notify_payment: detalle?.notify || "",
        consignee: detalle?.consignee || "",
        subject: "Exportación",
        payment_condition: detalle?.payment_condition || "",
        cnt_description: cntdescription,
        general_description: generaldescription,
        sap_number: numerosDePedido || '0',
        total_bl: totalbl,
        load_place_and_date: result || "",
        port_of_loading: portofloading || "",
        destination_port: Array.isArray(ibk) && ibk.length > 0 ? ibk[0].destination_port : "",
        package_number: packagenumber,
        marks: marks,
        country: Array.isArray(filteredData) && filteredData.length > 0 ? filteredData[0].country : "",
        containers: Array.isArray(pedidos) && pedidos.length > 0 ? pedidos[0].exportation.total_containers : "",
        steamship: Array.isArray(ibk) && ibk.length > 0 ? ibk[0].ship_name : "",
        freight: freight,
        bl_declaration: detalle?.bulk_declaration || "",
        container_entry:  Array.isArray(ibk) && ibk.length > 0 ? ibk[0].full_container_entry_warehouse : "",
      };

      /// Llamar al servicio Agregar para guardar los datos
       const documentoData =  await crearInstructivo(accessToken, nuevoObjeto);

         // Crear un Blob con los datos del documento
      const blob = new Blob([documentoData], { type: 'application/msword' });

      // Crear un enlace para descargar el archivo
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'documento.docx';

      // Simular un clic en el enlace para iniciar la descarga
      document.body.appendChild(link);
      link.click();

      // Esperar un momento antes de eliminar el enlace
      await new Promise(resolve => setTimeout(resolve, 100));

       document.body.removeChild(link);
      //  window.location.href = `/features/expor
      //  window.location.href = `/features/exportaciones/ficha/predespacho/detalle/correopredespacho/?exportation_id=${fichaId}`;

      setModalDatainformation({ title: "Éxito", message: "Documento generado exitosamente",icon: 'check', });
      setMostrarModal(true);
    } catch (error) {
      console.log("Error al generar los datos",error);
      setModalDatainformation({ title: "Error", message: "Sucedio un Error",icon: 'times', });
    }finally {
            setIsLoading(false); // Establecer isLoading en true antes de enviar el formulario
        }
  };

     return(
       <>
                 <div className="detalle">
                  
                    <div className="detalle__body form">

                    {/* {Array.isArray(ibk) && ibk.length > 0 && (
                            <>
                  
               
                        <div className="detalle__body__col--uno">
                           <label>A</label>
                           <div>
                             <input type="text" value={ibk[0]?.cargo_agent} readOnly className="w-100"/>
                           </div>
                         </div>
                         </>
                      )} */}

                            <div className="detalle__body__col--uno">

                            <label>A</label>
                                <div>
                                  <select 
                                  value={to_} 
                                  onChange={(e) => setTo_(e.target.value)} 
                                  className="selectorr">
                                    <option value="">Agente de aduanas</option>
                                    {newOptions.map((empresa,index) => (
                                      <option key={index} value={empresa}>
                                        {empresa}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                            </div>



                        <div className="detalle__body__col--uno">

                        <label>De</label>
                            <div>
                              <select 
                              value={fromfield} 
                              onChange={(e) => setfromfield(e.target.value)} 
                              className="selectorr">
                                <option value="">Sociedad</option>
                                {tiposSociedad.map((sociedad,index) => (
                                  <option key={index} value={sociedad}>
                                    {sociedad}
                                  </option>
                                ))}
                              </select>
                            </div>
                         </div>

                         <div className="detalle__body__col--uno">
                           <label>ASUNTO</label>
                           <div>
                             <input type="text" value="Exportación" readOnly className="w-100"/>
                           </div>
                         </div>


                         <div className="detalle__body__col--uno">
                           <label>FECHA</label>
                           <div>

                           <DatePicker
                            className="responsive-datepicker"
                            selected={dateF}
                            onChange={(date) => setDateF(date)}
                            dateFormat="dd/MM/yyyy"
                            placeholderText="Selecciona fecha"
                            minDate={minDate}
                            maxDate={null}
                          />

                           </div>
                         </div>

                         
                         {Array.isArray(ibk) && ibk.length > 0 && (
                            <>

                         <div className="detalle__body__col--uno">
                           <label>BOOKING</label>
                           <div>
                             <input type="text" value={ibk[0]?.booking_number} readOnly
                             className="w-100"/>
                           </div>
                         </div>
                         </>
                         )}


                         <div className="detalle__body__col--uno">

                         <label>FACTURADO</label>
                            <div>
                              <select 
                              value={billedto} 
                              onChange={(e) => setbBlledto(e.target.value)} 
                              className="selectorr">
                                <option value="">Tipo de factura</option>
                                {tipoFacturado.map((facturaSociedad,index) => (
                                  <option key={index} value={facturaSociedad.primerasPalabrasBill}>
                                    {facturaSociedad.primerasPalabrasBill}
                                  </option>
                                ))}
                              </select>
                            </div>

                         </div>

                        <div className="detalle__body__col--uno">
                           <label>CONSIGNADO</label>
                           <div>
                             <textarea value={detalle?.consignee || ''}  readOnly className="area_"/>
                           </div>
                         </div>

                         <div className="detalle__body__col--uno">
                           <label>NOTIFY DE PAGO</label>
                           <div>
                             <textarea value={detalle?.notify || ''}   readOnly className="area_"/>
                           </div>
                         </div>

                         <div className="detalle__body__col--uno">
                           <label>CONDICIÓN DE PAGO</label>
                           <div>
                             <textarea value={detalle?.payment_condition || ''}  readOnly className="area_"/>
                           </div>
                         </div>

                         <div className="detalle__body__col--uno">
                           <label>DECLARACIÓN DE BULTOS</label>
                           <div>
                             <input type="text" value={detalle?.bulk_declaration || ''}  readOnly className="w-100"/>
                           </div>
                        </div>


                        <div className="detalle__body__col--uno">
                           <label>DESCRIPCIÓN GENERAL</label>
                           <div>
                             <input type="text" value={generaldescription} onChange={(e) => setgeneralDescription(e.target.value)} className="w-100"/>
                           </div>
                        </div>

                        <div className="detalle__body__col--uno">
                           <label>DESCRIPCIÓN POR CNT</label>
                           <div>
                             <input type="text" value={cntdescription} onChange={(e) => setCntdescription(e.target.value)} className="w-100"/>
                           </div>
                        </div>

                        <div className="detalle__body__col--uno">
                           <label>TOTAL BL</label>
                           <div>
                             <input type="text" value={totalbl} onChange={(e) => setTotalbl(e.target.value)} className="w-100"/>
                           </div>
                        </div>

                        <div className="detalle__body__col--uno">
                           <label>LUGAR Y FECHA DE CARGA</label>
                           <div>
                             <textarea value={result || ""} readOnly  className="w-100 custom-textarea"/>

                           
                           </div>
                        </div>

                        <div className="detalle__body__col--uno">
                           <label>PUERTO DE EMBARQUE</label>
                           <div>
                             <input type="text" value={portofloading} onChange={(e) => setPortofloading(e.target.value)} className="w-100"/>
                           </div>
                        </div>

                        {Array.isArray(ibk) && ibk.length > 0 && (
                            <>
                        <div className="detalle__body__col--uno">
                           <label>PUERTO DESTINO</label>
                           <div>
                             <input type="text"  value={ibk[0]?.destination_port}  readOnly className="w-100"/>
                           </div>
                        </div>
                        </>
                        )}

                        {Array.isArray(filteredData) && filteredData.length > 0 && (
                            <>
                        <div className="detalle__body__col--uno">
                           <label>PAIS</label>
                           <div>
                             <input type="text"  value={filteredData[0]?.country || "-"}  readOnly className="w-100"/>
                           </div>
                        </div>
                        </>
                        )}

                        <div className="detalle__body__col--uno">
                           <label>PACKAGE NUMBER</label>
                           <div>
                             <input type="text" value={packagenumber} onChange={(e) => setPackagenumber(e.target.value)} className="w-100"/>
                           </div>
                        </div>

                        <div className="detalle__body__col--uno">
                           <label>MARCAS</label>
                           <div>
                             <input type="text" value={marks} onChange={(e) => setMarks(e.target.value)} className="w-100"/>
                           </div>
                        </div>


                        {Array.isArray(pedidos) && pedidos.length > 0 && (
                            <>

                        <div className="detalle__body__col--uno">
                           <label>CONTAINERS</label>
                           <div>
                             <input type="text" value={pedidos[0]?.exportation?.total_containers} readOnly className="w-100"/>
                           </div>
                        </div>
                        </>
                        )}

                        {Array.isArray(ibk) && ibk.length > 0 && (
                            <>


                        <div className="detalle__body__col--uno">
                           <label>VAPOR</label>
                           <div>
                             <input type="text" value={ibk[0]?.ship_name} readOnly className="w-100"/>
                           </div>
                        </div>
                        </>
                        )}

                        <div className="detalle__body__col--uno">
                           <label>FLETE</label>
                           <div>
                             <input type="text" value={freight} onChange={(e) => setfreight(e.target.value)} className="w-100"/>
                           </div>
                        </div>

                        {Array.isArray(ibk) && ibk.length > 0 && (
                            <>


                        <div className="detalle__body__col--uno">
                           <label>INGRESO DE CONTENEDORES LLENOS</label>
                           <div>
                             <input type="text" value={ibk[0]?.full_container_entry_warehouse} readOnly className="w-100"/>
                           </div>
                        </div>
                        </>
                        )}
                           
                        <div className="text-center block-center">
                            <button className="btn btn__primary" onClick={handleGuardar} disabled={isLoading}>

                            {isLoading ? (
                                        <span>
                                          <FontAwesomeIcon icon={faSpinner} spin /> Generando...
                                          </span>
                                          ) : (

                                          "Generar Documento"
                                   )}
                          
                            </button>

                         </div>
                     </div>
         
             </div>

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














