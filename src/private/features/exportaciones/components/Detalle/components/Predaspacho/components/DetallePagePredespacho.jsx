import { NavLink, Outlet} from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import {findAllPedidoId} from "../../../../../../../../hooks/exportaciones/Estados-logicas-pedidos/usePedidosService";
import { useEffect,useState } from 'react';
import { useAuth } from "../../../../../../../../contexts/Authutils";
// import { MigrarModalPreDispath } from '../../../../../../../../public/modals/MigraSapPreDispath';
import { usePedidosState } from '../../../../../../../../hooks/exportaciones/Estados-logicas-pedidos/usePedidosState';
import { fetchDataWithoutFilters } from '../../../../../../../../hooks/exportaciones/Estados-logicas-pedidos/usePedidosLogica';
// import { migra } from '../../../../../../../../hooks/exportaciones/Estados-logicas-pedidos/usePedidosLogica';
import { Verificacion } from '../../../../../../../../public/modals/ErrorModal';
import { migrarPedido } from '../../../../../../../../hooks/exportaciones/Estados-logicas-pedidos/usePedidosLogica';
import { MigrarModal } from '../../../../../../../../public/modals/MigrarSap';
 
export function DetallePagePredespacho() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const exportation_id = searchParams.get('exportation_id'); // Obten el valor de pk desde la URL
    
    const { accessToken } = useAuth(); // Obtiene el Token del contexto de autenticación

    const [data,setData] = useState([]);
    
      //Estados
  const {pedidos,setPedidos,modalData,setModalData,isMigrarModalOpen, setIsMigrarModalOpen,
  } = usePedidosState();

   useEffect(() => {
    fetchDataWithoutFilters(accessToken, setPedidos);
   }, [accessToken, setPedidos]);

    useEffect(() => {
        async function fetchData() {
          try {
            const resultado = await findAllPedidoId(exportation_id, accessToken);
            setData(resultado);
          } catch (error) {
            console.log("Error al obtener los datos");
          }
        }
        fetchData();
      }, [exportation_id,setData,accessToken]);
      console.log("Hola: ",data); 

      //Evento de Migrar Sap
        // const handleMigrar =  async (number) =>{
        //     await migra(accessToken,number,setModalData,setIsMigrarModalOpen,fetchDataWithoutFilters,setPedidos);
        // };
        
        //Evento de Migrar Sap
        const handleMigrarSap =  async (requestNumbers,society_Value) =>{
            await migrarPedido(accessToken,requestNumbers,society_Value,setModalData,setIsMigrarModalOpen,fetchDataWithoutFilters,setPedidos);
        };


      //Evento para cerrar el modal y limpiar
   const handleCloseModal = () => {
    setModalData({
      title: "",
      message: "",
      icons: ""
    });
  };

  console.log("Hola soy el pedido: ",pedidos);


        return(
            <>

            <section>

             
                <div className="headbar__detaill">
              
                    <>
            
                     <div>
                      <h1><strong>Gestion predespacho</strong></h1>
                      </div>

                      {/* <div >
                              <button className="btn btn--ico btn--medium btn__secondary--outline" onClick={() => setIsMigrarModalOpen(true)}>
                                  <i className="bi bi-arrow-repeat"></i>
                                  Migrar SAP
                              </button>
                          </div> */}
                    
                    </>
                </div>
            </section>

            {/* {isMigrarModalOpen && (
                <MigrarModalPreDispath
                isOpen={isMigrarModalOpen}
                onClose={() => setIsMigrarModalOpen(false)}
                onMigrarClick={handleMigrar}
                />
              )}

               {/*Manejo de errores del modal Migrarsap*/}

                {isMigrarModalOpen && (
                <MigrarModal
                isOpen={isMigrarModalOpen}
                onClose={() => setIsMigrarModalOpen(false)}
                onMigrarClick={handleMigrarSap}
                />
              )}

               <Verificacion
              isOpen={true} onClose={handleCloseModal} data={modalData}/>


            <section className="bodyFeatureP">
                <ul className='bodyFeature__tab1'>
                <li>
                        <NavLink exact="true"
                        to={`/features/exportaciones/ficha/predespacho/detalle/instructivo/?exportation_id=${exportation_id}`}
                        >
                        REGISTRO DE INSTRUCTIVO
                        </NavLink>
                    </li>

                 <li>
                    <NavLink exact="true"
                        to={`/features/exportaciones/ficha/predespacho/detalle/correo/?exportation_id=${exportation_id}`}
                        >
                        ENTREGA
                        </NavLink>
                    </li>

                    <li>
                    <NavLink exact="true"
                        to={`/features/exportaciones/ficha/predespacho/detalle/instruccionesBL/?exportation_id=${exportation_id}`}
                        >
                        INSTRUCTIVO
                        </NavLink>
                    </li>

                    <li><NavLink exact="true" to={`/features/exportaciones/ficha/predespacho/detalle/correopredespacho/?exportation_id=${exportation_id}`}>
                         CORREO PREDESPACHO
                    </NavLink></li>
                </ul>
           
                <div className="bodyFeature__tabcnt">
                    <Outlet />
                </div>

            </section>      
            </>
        );
    }
