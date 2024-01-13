import "../../../../../../styles/features/body.css"
import { useEffect,useState } from 'react';
import { useAuth } from "../../../../../../contexts/Authutils";
import {findAllPedidoId} from "../../../../../../hooks/exportaciones/Estados-logicas-pedidos/usePedidosService";
import { FindAllPedidosDetailsIdFicha } from "../../../../../../services/exportaciones/listapedidosServices";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
// import { Link } from "react-router-dom";
 
export function PedidosGeneral() {

  //Contiene el token de autenticación
  const { accessToken } = useAuth();
  //Arreglo que almacena la ficha con sus respectivos pedidos relacionados y guardar solo los números de pedidos
  const [numeroPedidos, setNumeroPedidos] = useState([]);

  const [pedidosRecuperados,setPedidosRecuperados] = useState([]);

  //Recupero el id de la ficha
  const fichaId = localStorage.getItem('fichaId');
  console.log("Soy la ficha: ",fichaId);

  //Listando el numero de ficha y por consecuencia me trae los pedidos relacionados a esa ficha
  useEffect(() => {
    async function fetchData() {
      try {
        const resultado = await FindAllPedidosDetailsIdFicha(fichaId, accessToken);
        console.log("Hola soy el id: ",fichaId)
        //Contiene la lista de pedidos relacionados a una ficha
        const newOrderNumbers = resultado.map((pedido) => pedido.id);
        setNumeroPedidos((prevOrderNumbers) => [...prevOrderNumbers, ...newOrderNumbers]);
      } catch (error) {
        console.log("Error al obtener los datos");
      }
    }
    fetchData();
  }, [fichaId,setNumeroPedidos,accessToken]);

  //Se imprime solo los números de pedidos
  console.log("Hola soy el resultado: ",numeroPedidos);

  useEffect(() => {
    async function fetchData() {
      try {       
        const resultadosacumulados = []; 
        for (const pedidoNumber of numeroPedidos) {
          const resultado = await findAllPedidoId(pedidoNumber, accessToken);
          resultadosacumulados.push(...resultado);
          
        }
        setPedidosRecuperados(resultadosacumulados);
      } catch (error) {
        console.log("Error al obtener los datos");
      }
    }
    
    if (numeroPedidos.length > 0) {
      fetchData();
    }
  }, [numeroPedidos, setPedidosRecuperados, accessToken]);

        return(
            <>

            <h3>Pedidos asignados a la ficha</h3>
            <p>Lista de pedidos de exportación</p>

              <section className="detalle">
                <table className="tabla" cellSpacing="0" cellPadding="0">
                      <thead>
                          <tr>
                            <th className="thead">Número de pedido</th>
                            <th className="thead">Posición</th>
                            <th className="thead">Material</th>
                            <th className="thead">Descripción de material</th>
                            <th className="thead">Cantidad</th>
                            <th className="thead">UM</th>
                            <th className="thead">Almacén</th>
                            <th className="thead">Centro</th>
                            <th className="thead">Peso</th>
                            <th className="thead">UM</th>
                            <th className="thead">Precio unitario</th>
                            <th className="thead">Moneda</th>
                            <th className="thead">Precio Total</th>
                            {/* <th className="thead">ver detalle</th> */}
                          
                          </tr> 
                      </thead>
                      <tbody>
                        {Array.isArray(pedidosRecuperados) && pedidosRecuperados.length > 0 ? (
                          pedidosRecuperados.map((datos) => (
                            <tr key={datos.id}>
                               <td>
                                <strong>
                                  {datos.exportation_detail ? datos.exportation_detail.order_number || '-' : '-'}
                               </strong>
                               </td>
                              <td>
                                <strong>{datos.position || '-'}</strong>
                              </td>
                              <td>{datos.material_code || '-'}</td>
                              <td>{datos.material_description || '-'}</td>
                              <td>{datos.quantity || '-'}</td>
                              <td>{datos.measurement_unit_quantity || '-'}</td>
                              <td>{datos.warehouse || '-'}</td>
                              <td>{datos.center || '-'}</td>
                              <td>{datos.weight || '-'}</td>
                              <td>{datos.measurement_unit_weight || '-'}</td>
                              <td>{datos.unit_price || '-'}</td>
                              <td>{datos.exportation_detail ? datos.exportation_detail.currency || '-' : '-'}</td>
                              <td>{datos.exportation_detail ? datos.exportation_detail.total_price || '-' : '-'}</td>
                              {/* <td>
                              <Link to={`/features/exportaciones/pedidos/detalle/?exportation_detail_id=${datos.exportation_detail.id}`}>
                                Ver detalle
                              </Link>
                              </td> */}
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
              </section>
          </>
        );
    }
