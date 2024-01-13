import { useEffect, useState} from "react";
import { useAuth } from "../../../../../../../../contexts/Authutils";
import { FindAllPedidosDetailsIdFicha } from "../../../../../../../../services/exportaciones/listapedidosServices";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { PreDispathManagement } from "../../../../../../../../services/exportaciones/PreDispatchManagementService";
import { findAllPedidosFichaId } from "../../../../../../../../hooks/exportaciones/Estados-logicas-pedidos/usePedidosService";

export function ListarApt() {

  // const [data,setdatos] = useState([]);
  const { accessToken } = useAuth();

  const fichaId = localStorage.getItem('fichaId');


     const [orderNumbers,setOrderNumbers] = useState([]);

     const [listar,setListar] = useState([]);
     const [Listarpedidos_,setListarPedidos_] =  useState([]);
     


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


  console.log("Pedidos: ",orderNumbers);
  console.log("Peidos migrados: ",listar);


 
    

       //Se utiliza datos de pedidos
    useEffect(() => {
        async function fetchData() {
          try {
            const resul = await findAllPedidosFichaId(fichaId, accessToken);
            setListarPedidos_(resul);
          } catch (error) {
            console.log("Error al obtener los datos");
          }
        }
        fetchData();
      }, [fichaId,setListarPedidos_,accessToken]);
  
      console.log("Pedidos: ",Listarpedidos_);
  

    return(
        <>
             <section>

             
              <div className="headbar__detail_d">
                                  <>
                                  <h2>Despacho APT</h2>
                                  </>
                              </div>
              </section>
 
                <div>
                    <table className="tabla" cellSpacing="0" cellPadding="0">
                      <thead>
                          <tr>
                            <th className="thead">Pedido</th>
                            <th className="thead">Entrega</th>
                            <th className="thead">Cliente</th>
                            <th className="thead">Número de contenedor</th>
                          </tr> 
                      </thead>
                      <tbody>
                      {Array.isArray(Listarpedidos_) && Listarpedidos_.length > 0 ? (
                          Listarpedidos_.map((lista) => (
                                <tr key={lista.id}>
                                  <td>
                                    <strong>{lista.order_number || '-'}</strong>
                                  </td>
                                  <td>{lista.customer_number || '-'}</td>
                                  <td>{lista.customer_name || '-'}</td>
                                  <td>{lista.exportation.total_containers || '-'}</td>
                                </tr>
                            
                            ))
                            ) : (
    
                              <tr>
                                {/* <td colSpan="10">No hay datos disponibles</td> */}
                                <td colSpan={13} className="text-center">
                                <span >
                                        <FontAwesomeIcon icon={faSpinner} spin /> Cargando...
                                 </span>
                                 </td>
                                 <td></td>
                              </tr>
                            )}
                        </tbody>
                    </table>
                  </div>
        </>
    );
}
