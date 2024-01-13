
// import {findAllAptDispath} from "../../../../../../../../hooks/exportaciones/useAptDispathProcess";
import { useEffect, useState} from "react";
// import { Link } from "react-router-dom";
import { useAuth } from "../../../../../../../../contexts/Authutils";
// import {findAllRequestibk} from "../../../../../../../../hooks/exportaciones/useRequestIbkProcess";
// import { findAllPedidosFichaId } from "../../../../../../../../hooks/exportaciones/Estados-logicas-pedidos/usePedidosService";
import { usePedidosState } from "../../../../../../../../hooks/exportaciones/Estados-logicas-pedidos/usePedidosState";
// import { MigrarModalPreDispath } from '../../../../../../../../public/modals/MigraSapPreDispath';
import { fetchDataWithoutFiltersPreDispath } from '../../../../../../../../hooks/exportaciones/Estados-logicas-pedidos/usePedidosLogica';
// import { migra } from '../../../../../../../../hooks/exportaciones/Estados-logicas-pedidos/usePedidosLogica';
import { Verificacion } from '../../../../../../../../public/modals/ErrorModal';
import { migra } from '../../../../../../../../hooks/exportaciones/Estados-logicas-pedidos/usePedidosLogica';
// import { MigrarModal } from '../../../../../../../../public/modals/MigrarSap';
import { MigrarModalPreDispath } from "../../../../../../../../public/modals/MigraSapPreDispath";
// import { finAll } from "../../../../../../../../hooks/exportaciones/usePreDispathProgram";
import { VisualizarPedidos } from "../../../../../../../../public/modals/ListarPedidos";
import { FindAllPedidosDetailsIdFicha } from "../../../../../../../../services/exportaciones/listapedidosServices";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PreDispathManagement } from "../../../../../../../../services/exportaciones/PreDispatchManagementService";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

import { format } from 'date-fns';


export function EstructuraCorreo() {

  // const [data,setdatos] = useState([]);
  const { accessToken } = useAuth();

  const fichaId = localStorage.getItem('fichaId');

     //Estados
     const {modalData,setModalData,isMigrarModalOpen, setIsMigrarModalOpen,
     } = usePedidosState();

     const [orderNumbers,setOrderNumbers] = useState([]);

     const [listar,setListar] = useState([]);
     const [ListarPedidos,setListarPedidos] = useState(false);

     const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    async function fetchData() {
      try {
        const resultado = await FindAllPedidosDetailsIdFicha(fichaId, accessToken);
        console.log("Hola soy el id: ",fichaId)
        const newOrderNumbers = resultado.map((pedido) => pedido.order_number);
        setOrderNumbers((prevOrderNumbers) => [...prevOrderNumbers, ...newOrderNumbers]);
      } catch (error) {
        console.log("Error al obtener los datos");
      }
    }
    fetchData();
  }, [fichaId,setOrderNumbers,accessToken]);


  useEffect(() => {
    async function fetchData() {
      try {
        const resul = await PreDispathManagement(fichaId,accessToken);
        setListar(resul);
      } catch (error) {
        console.log("Error al obtener los datos");
      }
    }
    fetchData();
  }, [fichaId,setListar,accessToken]);



  console.log("Pedidos: ",orderNumbers);
  console.log("Peidos migrados: ",listar);

   //Evento de Migrar Sap
   const handleMigrarSap =  async () =>{
    
    try{
      console.log("Entrando a handleMigrarSap");
      if(orderNumbers.length>0){
        console.log("Llamando a migra");
        await migra(accessToken,orderNumbers,setModalData,setIsMigrarModalOpen,fetchDataWithoutFiltersPreDispath,fichaId,setListar,setIsLoading);
      }
    }catch(error){
      console.error("Error al migrar sap: ",error);
    }
};



  const handleListar = () =>{
    setListarPedidos(true);
  }


  
      //Evento para cerrar el modal y limpiar
      const handleCloseModal = () => {
        setModalData({
          title: "",
          message: "",
          icons: ""
        });
      };


    return(
        <>
             <section>

             
              <div className="headbar__detail_d">
                                  <>

                                         <div >
                                            <button className="btn btn--ico btn--medium btn__secondary--outline" onClick={handleMigrarSap} disabled={isLoading}>
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
                                              isOpen={ListarPedidos}
                                              onClose={() => setListarPedidos(false)}
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
                onMigrarClick={handleMigrarSap}
                />
              )}

               <Verificacion
              isOpen={true} onClose={handleCloseModal} data={modalData}/>
 
                <div>
                    <table className="tabla" cellSpacing="0" cellPadding="0">
                      <thead>
                          <tr>
                            <th className="thead">Pedido</th>
                            <th className="thead">Posición</th>
                            <th className="thead">Entrega</th>
                            <th className="thead">Centro</th>
                            <th className="thead">Almacen</th>
                            <th className="thead">Denominación Material</th>
                            <th className="thead">Cantidad Real</th>
                            <th className="thead">Unidad de medida</th>
                            <th className="thead">Fecha de despacho</th>
              
                          </tr> 
                      </thead>
                      <tbody>
                          {Array.isArray(listar) &&
                            listar.map((lista) => {
                              // Check if "country" property is not present or its value is null
                              const shouldPrint = !('country' in lista) || lista.country === null;

                              // If shouldPrint is true, render the table row
                              return shouldPrint && (
                                <tr key={lista.id}>
                                  <td>
                                    <strong>{lista.order_number || '-'}</strong>
                                  </td>
                                  <td>{lista.position || '-'}</td>
                                  <td>{lista.trip_number || '-'}</td>
                                  <td>{lista.center || '-'}</td>
                                  <td>{lista.delivery || '-'}</td>
                                  <td>{lista.customer_description_sap || '-'}</td>
                                  <td>{lista.package_quantity || '-'}</td>
                                  <td>{lista.load || '-'}</td>
                                  <td>{lista.dispatch_date ? format(new Date(`${lista.dispatch_date}T00:00:00`), 'dd/MM/yyyy') : '-'}</td>
                                </tr>
                              );
                            })
                          }
                        </tbody>
                    </table>
                  </div>
        </>
    );
}
