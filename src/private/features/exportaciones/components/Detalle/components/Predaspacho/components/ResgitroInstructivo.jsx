import { useAuth } from "../../../../../../../../contexts/Authutils";
import {findAllRequestibk} from "../../../../../../../../hooks/exportaciones/useRequestIbkProcess";
import {findAllPedidosFichaId} from "../../../../../../../../hooks/exportaciones/Estados-logicas-pedidos/usePedidosService";
import { usePedidosState } from "../../../../../../../../hooks/exportaciones/Estados-logicas-pedidos/usePedidosState";
import { useEffect,useState}  from 'react';
import {AddPreDispath,PreDispathManagement} from "../../../../../../../../services/exportaciones/PreDispatchManagementService"
import { format } from 'date-fns';
// import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCheck, FaTimes } from 'react-icons/fa';
import { utcToZonedTime } from 'date-fns-tz';
import { DispathProgramFicha } from "../../../../../../../../services/exportaciones/DispatchProgramService";
import { FindAllPedidosSJandTrebol } from "../../../../../../../../services/exportaciones/listapedidosServices";
import { DispathProgramLocation } from "../../../../../../../../services/exportaciones/DispatchProgramService";  


export function RegistroInstructivo(){

  const fichaId = localStorage.getItem('fichaId');
  console.log("Soy la ficha: ",fichaId);

  const [ibk, setibk] = useState([]);

  const {pedidos,setPedidos
  } = usePedidosState();

  const { accessToken } = useAuth(); // Obtiene el Token del contexto de autenticación

  const [data, setData] = useState([]);

  const [country, setCountry] = useState("");
  const [packeType, setPackageType] = useState("");
  // const [fechaDispath, setFechaDispath] = useState(null);

  const [mostrarIngreso, setMostrarIngreso] = useState(true); // Nuevo estado para controlar qué sección mostrar
  const [mostrarModal, setMostrarModal] = useState(false);


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


  const [modalDataInformation, setModalDatainformation] = useState({
    title: "",
    message: "",
    icon: "",
  });

  // const minDate = useMemo(() => {
  //   const date = new Date();
  //   date.setMonth(date.getMonth() - 12);
  //   return date;
  // }, []);



  const handleGuardar = async () => {
    try {
      // Crear el objeto con los datos del formulario

      // const fecha1 = fechaDispath ? `${format(fechaDispath, 'yyyy-MM-dd')}` : null;
  
      const nuevoObjeto = {
        country: country,
        package_type: packeType,
        // other_dates: "2023-01-20",
        exportation_id: fichaId, // Reemplaza con el valor real
      };

      // Llamar al servicio Agregar para guardar los datos
      await AddPreDispath(accessToken, nuevoObjeto);

      window.location.href = `/features/exportaciones/ficha/predespacho/detalle/correo/?exportation_id=${fichaId}`;

      const resultado = await findAllRequestibk(fichaId, accessToken);
      setData(resultado);

       const result = await findAllPedidosFichaId(fichaId,accessToken);
       setPedidos(result)

      setMostrarIngreso(resultado.length === 0);
      setModalDatainformation({ title: "Éxito", message: "Información guardado exitosamente",icon: 'check', });
      setMostrarModal(true);
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

  const numerosDePedido = pedidos.map((pedido) => pedido.order_number).join(", ");

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


   useEffect(() => {
    async function fetchData() {
       try {
         const resultado = await PreDispathManagement(fichaId, accessToken);
         console.log("Hola soy el id: ",fichaId)
         setData(resultado);
         setMostrarIngreso(resultado.length === 0);
       } catch (error) {
         console.log("Error al obtener los datos");
       }
     }
     fetchData();
   }, [fichaId,setData,accessToken]);

 console.log("Pedidos: ",data);

 const filteredData = data.filter(item => item.country && item.package_type);


    return(
        <>
          
    {mostrarIngreso ? (
          <>

      <div className="detalle">
        
        <div className="detalle__body form">

        {Array.isArray(pedidos) && pedidos.length > 0 && (
          <>

            <div className="detalle__body__col--dos">
              <label>Cliente</label>
              <div>
                <input type="text" value={pedidos[0].customer_name} className="w-100" readOnly />
              </div>
            </div>

            </>
        )}

      {Array.isArray(ibk) && ibk.length > 0 && (
                                <>

            <div className="detalle__body__col--uno">
              <label>Puerto</label>
              <div>
                <input type="text" value={ibk[0].destination_port} className="w-100" readOnly/>
              </div>
            </div>
            </>
          )} 
            <div className="detalle__body__col--uno">
              <label>Pais</label>
              <div>
              <input type="text" id="country" name="country"
              value={country}
              onChange={(e) => setCountry(e.target.value)} 
              className="w-100"/>
              </div>
            </div>

            {Array.isArray(pedidos) && pedidos.length > 0 && (
          <>

            <div className="detalle__body__col--uno">
              <label>Tipo de contenedor</label>
              <div>
                <input type="text" value={pedidos[0].exportation.container_type} className="w-100" readOnly/>
              </div>
            </div>

            </>
            )}

            <div className="detalle__body__col--uno">
              <label>Pedidos SAP</label>
              <div>
                <input type="text" value={numerosDePedido} className="w-100" readOnly/>
              </div>
            </div>
           



            <div className="detalle__body__col--uno">
              <label>Tipo de empaque</label>
               <div>
              <input type="text" id="package_type" name="package_type"
              value={packeType}
              onChange={(e) => setPackageType(e.target.value)} 
              className="w-100"/>
              </div>
            </div>

            {Array.isArray(ibk) && ibk.length > 0 && (
              <>

            <div className="detalle__body__col--uno">
              <label>Número de BK</label>
              <div>
                <input type="text" value={ibk[0].booking_number} className="w-100" readOnly/>
              </div>
            </div>

            <div className="detalle__body__col--uno">
              <label>Nombre de la nave</label>
              <div>
                <input type="text" value={ibk[0].ship_name} className="w-100" readOnly />
              </div>
            </div>
            </>
            )}

           

        
            <div className="detalle__body__col--uno">
              <label>Fecha de despacho</label>
              <div>
                          
              <textarea value={result || ""} readOnly  className="w-100 custom-textarea"/>
              </div>
            </div>
          

            {Array.isArray(ibk) && ibk.length > 0 && (
              <>

            <div className="detalle__body__col--uno">
              <label>Almacen de ingreso de contenedores llenos</label>
              <div>
                <input type="text" value={ibk[0].full_container_entry_warehouse} className="w-100" readOnly/>
              </div>
            </div>

            <div className="detalle__body__col--uno">
                  <label>Matriz final</label>
                  <div>
                    <input 
                      type="text" 
                      value={ibk[0].max_date_matrix 
                        ? format(
                            utcToZonedTime(new Date(`${ibk[0].max_date_matrix}T00:00:00`), 'UTC'),
                            'dd/MM/yyyy'
                          ) 
                        : '-'} 
                      className="w-100" 
                      readOnly
                    />
                  </div>
                </div>

                <div className="detalle__body__col--uno">
                  <label>Matriz VGM</label>
                  <div>
                    <input 
                      type="text" 
                      value={ibk[0].vgm_matrix_date ? format(utcToZonedTime(new Date(`${ibk[0].vgm_matrix_date}T00:00:00`), 'UTC'),'dd/MM/yyyy') : '-'} 
                      className="w-100" 
                      readOnly
                    />
                  </div>
                </div>
            </>
            )}
                  
            <div className="text-center block-center">
                <button className="btn btn__primary btn--ico" onClick={handleGuardar}>
                  <i className="bi bi-save"></i>
                  Guardar</button>
            </div>
        </div>


      </div>

      </>
    ): (
      <>
         <div className="detalle">
        

        <div className="detalle__body form">

        {Array.isArray(pedidos) && pedidos.length > 0 && (
          <>

            <div className="detalle__body__col--dos">
              <label>Cliente</label>
              <div>
                <input type="text" value={pedidos[0].customer_name} className="w-100" readOnly />
              </div>
            </div>

            </>
        )}

      {Array.isArray(ibk) && ibk.length > 0 && (
                                <>

            <div className="detalle__body__col--uno">
              <label>Puerto</label>
              <div>
                <input type="text" value={ibk[0].destination_port} className="w-100" readOnly/>
              </div>
            </div>
            </>
      )}

    {Array.isArray(filteredData) && filteredData.length > 0 && (   
                    <>

            
            <div className="detalle__body__col--uno">
              <label>Pais</label>
              <div>
                <input type="text" value={filteredData[0].country || '-'} className="w-100" readOnly/>
              </div>
            </div>

            </>
    )}

            {Array.isArray(pedidos) && pedidos.length > 0 && (
          <>

            <div className="detalle__body__col--uno">
              <label>Tipo de contenedor</label>
              <div>
                <input type="text" value={pedidos[0].exportation.container_type} className="w-100" readOnly/>
              </div>
            </div>

            </>
            )}


            <div className="detalle__body__col--uno">
              <label>Pedidos SAP</label>
              <div>
                <input type="text" value={numerosDePedido} className="w-100" readOnly/>
              </div>
            </div>
            

      {Array.isArray(filteredData) && filteredData.length > 0 && (   
                    <>

            <div className="detalle__body__col--uno">
              <label>Tipo de empaque</label>
              <div>
                <input type="text" value={filteredData[0]. package_type || '-'} className="w-100" readOnly/>
              </div>
            </div>

        </>
        )}

            {Array.isArray(ibk) && ibk.length > 0 && (
              <>

            <div className="detalle__body__col--uno">
              <label>Número de BK</label>
              <div>
                <input type="text" value={ibk[0].booking_number} className="w-100" readOnly/>
              </div>
            </div>

            <div className="detalle__body__col--uno">
              <label>Nombre de la nave</label>
              <div>
                <input type="text" value={ibk[0].ship_name} className="w-100" readOnly />
              </div>
            </div>
            </>
            )}

            
             <div className="detalle__body__col--uno">
              <label>Fecha de despacho</label>
              <div>
                          
              <textarea value={result || ""} readOnly  className="w-100 custom-textarea"/>
              </div>
            </div>


                {/* {Array.isArray(data) && data.length > 0 && (
                  <>
                    <div className="detalle__body__col--uno">
                      <label>Fecha de despacho</label>
                      <div>
                        <textarea
                          className="w-100 custom-textarea"
                          readOnly
                          value={["SJL", "PH", "MILLA", "TREBOL"].map((ubicacion) => {
                            const ubicacionData = data[0].other_dates
                              .filter(dateInfo => dateInfo.location === ubicacion)
                              .map(dateInfo => `Fecha: ${format(new Date(`${dateInfo.loading_dates_per_plant}T00:00:00`), 'dd/MM/yyyy')}`)
                              .join('\n');
                            return `Local: ${ubicacion}\n${ubicacionData || "Fecha: No exite fecha"}\n`;
                          }).join('\n')}
                        />
                      </div>
                    </div>
                  </>
                )} */}

            {Array.isArray(ibk) && ibk.length > 0 && (
              <>

                  <div className="detalle__body__col--uno">
                    <label>Almacen de ingreso de contenedores llenos</label>
                    <div>
                      <input 
                        type="text" 
                        value={ibk[0].full_container_entry_warehouse || ''} 
                        className="w-100" 
                        readOnly
                      />
                    </div>
                  </div>

                  <div className="detalle__body__col--uno">
                    <label>Matriz final</label>
                    <div>
                      <input 
                        type="text" 
                        value={ibk[0].max_date_matrix 
                          ? format(
                              utcToZonedTime(new Date(`${ibk[0].max_date_matrix}T00:00:00`), 'UTC'),
                              'dd/MM/yyyy'
                            ) 
                          : '-'} 
                        className="w-100" 
                        readOnly
                      />
                    </div>
                  </div>

                  <div className="detalle__body__col--uno">
                    <label>Matriz VGM</label>
                    <div>
                      <input 
                        type="text" 
                        value={ibk[0].vgm_matrix_date 
                          ? format(
                              utcToZonedTime(new Date(`${ibk[0].vgm_matrix_date}T00:00:00`), 'UTC'),
                              'dd/MM/yyyy'
                            ) 
                          : '-'} 
                        className="w-100" 
                        readOnly
                      />
                    </div>
            </div>
            </>
            )}
                
                  <div className="text-center block-center">
                <button className="btn btn__primary btn--ico">
                  <i className="bi bi-save"></i>
                  Guardar</button>
            </div>
        </div>


      </div>

      </>

    )}

    {mostrarModal && (
        <div className="confirmation-modal">
          <div className="confirmation-modal__content">
          {modalDataInformation.icon === 'check' && <FaCheck size={30} color="green" />} {/* Tamaño y color personalizables */}
          {modalDataInformation.icon === 'times' && <FaTimes size={30} color="red" />} {/* Tamaño y color personalizables */}
          <p>{modalDataInformation.message}</p>
          <div className="customModal__buttons">
            <button className="btn btn__primary" onClick={() => setMostrarModal(false)}>Cerrar</button>
          </div>
          </div>
        </div>
      )}

        </>
    );
}

