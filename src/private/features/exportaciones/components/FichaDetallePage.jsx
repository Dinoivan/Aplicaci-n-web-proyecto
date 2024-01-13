import "../../../../styles/features/body.css"
import { useEffect,useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from "../../../../contexts/Authutils";
import {findAllPedidoId} from "../../../../hooks/exportaciones/Estados-logicas-pedidos/usePedidosService";
import { findAllPedidosFichaId } from "../../../../hooks/exportaciones/Estados-logicas-pedidos/usePedidosService";
 
export function FichaDetallePage() {

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const exportation_detail_id = searchParams.get('exportation_detail_id');

  const fichaId = localStorage.getItem('fichaId');
  console.log("Soy la ficha: ",fichaId);
  
  const [data, setData] = useState([]);
  const { accessToken } = useAuth();
  
  const [guardadoVerificacion,setGuardadoVerificacion] = useState(false);
  // const [ver,setVeri] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const resul = await findAllPedidosFichaId(fichaId, accessToken);
        const firstOrderNumber = resul[0].has_file;
        setGuardadoVerificacion(firstOrderNumber);
        //  
      } catch (error) {
        console.log("Error al obtener los datos");
      }
    }
    fetchData();
  }, [fichaId,setGuardadoVerificacion,accessToken]);

 console.log("Pedidos: ",guardadoVerificacion);

  useEffect(() => {
    async function fetchData() {
      try {
        const resultado = await findAllPedidoId(exportation_detail_id, accessToken);
        setData(resultado);
      } catch (error) {
        console.log("Error al obtener los datos");
      }
    }
    fetchData();
  }, [exportation_detail_id,setData,accessToken]);

  console.log("Hola soy el resultado de pedidos detalle: ",data);

        return(
            <>
               <section className="headbar headbar--abierto">
                <div className="headbar__title headbar__title--detalle">
                    <Link  className="establecer" to="/features/exportaciones/pedidos">
                      <em className="bi bi-arrow-left-circle"/>
                     </Link>  
          
                  
                       {Array.isArray(data) && data.length > 0 ? (
                        <div key={data[0]?.id} className="headbar__title headbar__title--detalle">
                        <h3><strong>Número de pedido:</strong> {data[0]?.exportation_detail?.order_number || 'N/A'}</h3>
                      </div>
                    ) : (
                      <div>No hay datos disponibles</div>
                    )}
                  </div>
              </section>


              <section className="bodyFeature bodyFeature--vficha">

              <div className="bodyFeature__fichacol">
                  {Array.isArray(data) && data.length > 0 ? (
                    <>
                      <em className="icon-element-ficha-grande"></em>
                      <ul>
                        <li>
                          <span>Número de pedido</span>
                          <p>{data[0]?.exportation_detail?.order_number || 'N/A'}</p>
                        </li>
                        <li>
                          <span>Fecha de creación:</span>
                          <p>{data[0]?.exportation_detail?.order_creation_date || 'N/A'}</p>
                        </li>
                        <li>
                          <span>Cliente</span>
                          <p>{data[0]?.exportation_detail?.customer_number || 'N/A'}</p>
                        </li>
                        <li>
                          <span>Valor neto</span>
                          <p>{data[0]?.exportation_detail?.total_price || 'N/A'}</p>
                        </li>
                        <li>
                          <span>Estado</span>
                          <p>{data[0].exportation_detail?.exportation?.status_display || '-'}</p>
                        </li>
                      </ul>
                    </>
                    ) : (
                    <div>No hay datos disponibles</div>
                  )}
                </div>


                <div className="bodyFeature__fichatabla">
                <table className="tabla" cellSpacing="0" cellPadding="0">
                      <thead>
                          <tr>
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
                          
                          </tr> 
                      </thead>
                      <tbody>
                        {Array.isArray(data) && data.length > 0 ? (
                          data.map((datos) => (
                            <tr key={datos.id}>
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
                              <td>{datos.exportation_detail.currency || '-'}</td>
                              <td>{datos.exportation_detail.total_price || '-'}</td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="10">No hay datos disponibles</td>
                          </tr>
                        )}
                                              
                      </tbody>
                    </table>
                </div>      
              </section>
          </>
        );
    }
