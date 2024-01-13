import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { findAllPedidosFichaId } from "../../../../../hooks/exportaciones/Estados-logicas-pedidos/usePedidosService";
import { useEffect, useState } from 'react';
import { useAuth } from "../../../../../contexts/Authutils";


export function DetallePage() {

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const exportation_id = searchParams.get('exportation_id');
  const { accessToken } = useAuth();
  const [data, setData] = useState([]);
  const [exportationStatus, setExportationStatus] = useState(""); // Nuevo estado para el estatus

  useEffect(() => {
    console.log("useEffect in DetallePage executed"); // Verifica si este mensaje se muestra en la consola
    async function fetchData() {
      try {
        const resultado = await findAllPedidosFichaId(exportation_id, accessToken);
        setData(resultado);

        // Recuperar el primer estatus (puedes ajustar esto según la lógica de tu aplicación)
        if (resultado.length > 0) {
          setExportationStatus(resultado[0].exportation.status_display);
        }
      } catch (error) {
        console.log("Error al obtener los datos");
      }
    }
    fetchData();
  }, [exportation_id, setData, setExportationStatus, accessToken]);

  console.log("Data de obtener de la vista detalles: ",data);

  // const isInProgress = data.some((datos) => (datos.exportation.status_display === "Inicio de Exportación"));
  console.log("Resultado: ",exportationStatus);
  console.log("Data: ",data);

  return (
    <>
      <section className="headbar headbar--abierto">
        <div className="headbar__detail">
          {Array.isArray(data) && data.length > 0 && (
            <div key={data[0].exportation.id}>
              <em className="ico-element-ficha"></em>
              <span><strong>Ficha:</strong> {data[0].exportation.code_relations}</span>
            </div>
          )}
        </div>
      </section>

      <section className="bodyFeature">
        <ul className='bodyFeature__tab'>

        {exportationStatus === "Rechazado" && (
                <>
        
                <li>
                <NavLink exact to={`/features/exportaciones/ficha/general?exportation_id=${exportation_id}`}>
                  General
                </NavLink>
              </li>

              <li>
                <NavLink exact to={`/features/exportaciones/ficha/pedidosgeneral?exportation_id=${exportation_id}`}>
                  Pedidos
                </NavLink>
              </li>
              <li><NavLink exact="true" to={`/features/exportaciones/ficha/adicional?exportation_id=${exportation_id}`}>
                     Informacion Adicional
                    </NavLink></li>               
              </>
          )}
          
            {exportationStatus === "Inicio de Exportación" && (
                <>
        
                <li>
                <NavLink exact to={`/features/exportaciones/ficha/general?exportation_id=${exportation_id}`}>
                  General
                </NavLink>
              </li>

              <li>
                <NavLink exact to={`/features/exportaciones/ficha/pedidosgeneral?exportation_id=${exportation_id}`}>
                  Pedidos
                </NavLink>
              </li>

              <li><NavLink exact="true" to={`/features/exportaciones/ficha/adicional?exportation_id=${exportation_id}`}>
                     Informacion Adicional
                    </NavLink></li>     
              </>
              )}
            
            {exportationStatus === "En Proceso" && (
                <>
                <li>
                <NavLink exact="true" to={`/features/exportaciones/ficha/general?exportation_id=${exportation_id}`}>
                  General
                </NavLink>
                </li>

                <li>
                <NavLink exact to={`/features/exportaciones/ficha/pedidosgeneral?exportation_id=${exportation_id}`}>
                  Pedidos
                </NavLink>
              </li>    

                <li><NavLink exact="true" to={`/features/exportaciones/ficha/bk?exportation_id=${exportation_id}`}>
                Solicitud BK
                </NavLink>
                </li>

                <li><NavLink exact="true" to={`/features/exportaciones/ficha/adicional?exportation_id=${exportation_id}`}>
                     Informacion Adicional
                    </NavLink></li>

                {/* <li><NavLink exact="true" to={`/features/exportaciones/ficha/programa-despacho?exportation_id=${exportation_id}`}>
                        Despacho
                  </NavLink></li>

                  <li><NavLink exact="true" to={`/features/exportaciones/ficha/predespacho/detalle/instructivo?exportation_id=${exportation_id}`}>
                    PreDespacho
                    </NavLink></li>

                    <li><NavLink exact="true" to={`/features/exportaciones/ficha/despacho-apt/detalle/despacho?exportation_id=${exportation_id}`}>
                    Despacho Apt
                    </NavLink></li> */}
              </>   
            )}


             {exportationStatus === "Aprobado" && (
                 <>
                 <li>
                 <NavLink exact to={`/features/exportaciones/ficha/general?exportation_id=${exportation_id}`}>
                   General
                 </NavLink></li>

                 <li>
                <NavLink exact to={`/features/exportaciones/ficha/pedidosgeneral?exportation_id=${exportation_id}`}>
                  Pedidos
                </NavLink>
              </li>   
 
                 <li><NavLink exact="true" to={`/features/exportaciones/ficha/bk?exportation_id=${exportation_id}`}>
                 Solicitud BK
                 </NavLink>
                 </li>

                 <li><NavLink exact="true" to={`/features/exportaciones/ficha/programa-despacho?exportation_id=${exportation_id}`}>
                        Despacho
                  </NavLink></li>

                  <li><NavLink exact="true" to={`/features/exportaciones/ficha/adicional?exportation_id=${exportation_id}`}>
                     Informacion Adicional
                    </NavLink></li>

               </>
            
             )}

                {exportationStatus === "Despachado" && (
                  <>
                  <li>
                 <NavLink exact to={`/features/exportaciones/ficha/general?exportation_id=${exportation_id}`}>
                   General
                 </NavLink></li>

                 <li>
                <NavLink exact to={`/features/exportaciones/ficha/pedidosgeneral?exportation_id=${exportation_id}`}>
                  Pedidos
                </NavLink>
              </li>   
 
                 <li><NavLink exact="true" to={`/features/exportaciones/ficha/bk?exportation_id=${exportation_id}`}>
                 Solicitud BK
                 </NavLink>
                 
                 </li>

                 <li><NavLink exact="true" to={`/features/exportaciones/ficha/programa-despacho?exportation_id=${exportation_id}`}>
                  Despacho
                  </NavLink></li>
                  
                  <li><NavLink exact="true" to={`/features/exportaciones/ficha/predespacho/detalle/instructivo/?exportation_id=${exportation_id}`}>
                    PreDespacho
                    </NavLink></li>

                    <li><NavLink exact="true" to={`/features/exportaciones/ficha/despacho-apt/detalle/despacho/?exportation_id=${exportation_id}`}>
                    Despacho APT
                    </NavLink></li>

                    <li><NavLink exact="true" to={`/features/exportaciones/ficha/adicional?exportation_id=${exportation_id}`}>
                     Informacion Adicional
                    </NavLink></li>
                           

                    {/* <li><NavLink exact="true" to={`/features/exportaciones/ficha/despacho-apt/detalle/despacho?exportation_id=${exportation_id}`}>
                    Despacho APT
                    </NavLink></li>

                    <li><NavLink exact="true" to={`/features/exportaciones/ficha/documentaria?exportation_id=${exportation_id}`}>
                    Gestion Documentaria
                    </NavLink></li>

                    <li><NavLink exact="true" to={`/features/exportaciones/ficha/zarpe?exportation_id=${exportation_id}`}>
                    Zarpe
                    </NavLink></li>

                    <li><NavLink exact="true" to={`/features/exportaciones/ficha/liquidacion?exportation_id=${exportation_id}`}>
                    Liquidación
                    </NavLink></li>

                    <li><NavLink exact="true" to={`/features/exportaciones/ficha/adicional?exportation_id=${exportation_id}`}>
                    Adicional
                    </NavLink></li>          */}

                  {/* <li><NavLink exact="true" to={`/features/exportaciones/ficha/documentaria?exportation_id=${exportation_id}`}>
                    Gestion Documentaria
                    </NavLink></li>

                     <li><NavLink exact="true" to={`/features/exportaciones/ficha/zarpe?exportation_id=${exportation_id}`}>
                    Zarpe
                    </NavLink></li>

                    <li><NavLink exact="true" to={`/features/exportaciones/ficha/liquidacion?exportation_id=${exportation_id}`}>
                     Liquidación
                    </NavLink></li>        */}
                  </>

                
                )}

                
            {exportationStatus === "Embarcado" && (
                  <>
                  <li>
                 <NavLink exact to={`/features/exportaciones/ficha/general?exportation_id=${exportation_id}`}>
                   General
                 </NavLink></li>

                 <li>
                <NavLink exact to={`/features/exportaciones/ficha/pedidosgeneral?exportation_id=${exportation_id}`}>
                  Pedidos
                </NavLink>
              </li>   
 
                 <li><NavLink exact="true" to={`/features/exportaciones/ficha/bk?exportation_id=${exportation_id}`}>
                 Solicitud BK
                 </NavLink>
                 
                 </li>

                 <li><NavLink exact="true" to={`/features/exportaciones/ficha/programa-despacho?exportation_id=${exportation_id}`}>
                  Despacho
                  </NavLink></li>
                  
                  <li><NavLink exact="true" to={`/features/exportaciones/ficha/predespacho/detalle/instructivo/?exportation_id=${exportation_id}`}>
                    PreDespacho
                    </NavLink></li>

                    <li><NavLink exact="true" to={`/features/exportaciones/ficha/despacho-apt/detalle/despacho/?exportation_id=${exportation_id}`}>
                    Despacho APT
                    </NavLink></li>

                     <li><NavLink exact="true" to={`/features/exportaciones/ficha/documentaria?exportation_id=${exportation_id}`}>
                    Gestion Documentaria
                    </NavLink></li>

                     <li><NavLink exact="true" to={`/features/exportaciones/ficha/zarpe?exportation_id=${exportation_id}`}>
                    Zarpe
                    </NavLink></li>

                    <li><NavLink exact="true" to={`/features/exportaciones/ficha/liquidacion?exportation_id=${exportation_id}`}>
                     Liquidación
                    </NavLink></li>

                    <li><NavLink exact="true" to={`/features/exportaciones/ficha/adicional?exportation_id=${exportation_id}`}>
                     Informacion Adicional
                    </NavLink></li>       
             </>
            )}


                     
        {exportationStatus === "Concluido" && (
                  <>
                  <li>
                 <NavLink exact to={`/features/exportaciones/ficha/general?exportation_id=${exportation_id}`}>
                   General
                 </NavLink></li>

                 <li>
                <NavLink exact to={`/features/exportaciones/ficha/pedidosgeneral?exportation_id=${exportation_id}`}>
                  Pedidos
                </NavLink>
              </li>   
 
                 <li><NavLink exact="true" to={`/features/exportaciones/ficha/bk?exportation_id=${exportation_id}`}>
                 Solicitud BK
                 </NavLink>
                 
                 </li>

                 <li><NavLink exact="true" to={`/features/exportaciones/ficha/programa-despacho?exportation_id=${exportation_id}`}>
                  Despacho
                  </NavLink></li>
                  
                  <li><NavLink exact="true" to={`/features/exportaciones/ficha/predespacho/detalle/instructivo/?exportation_id=${exportation_id}`}>
                    PreDespacho
                    </NavLink></li>

                    <li><NavLink exact="true" to={`/features/exportaciones/ficha/despacho-apt/detalle/despacho/?exportation_id=${exportation_id}`}>
                    Despacho APT
                    </NavLink></li>

                     <li><NavLink exact="true" to={`/features/exportaciones/ficha/documentaria?exportation_id=${exportation_id}`}>
                    Gestion Documentaria
                    </NavLink></li>

                     <li><NavLink exact="true" to={`/features/exportaciones/ficha/zarpe?exportation_id=${exportation_id}`}>
                    Zarpe
                    </NavLink></li>

                    <li><NavLink exact="true" to={`/features/exportaciones/ficha/liquidacion?exportation_id=${exportation_id}`}>
                     Liquidación
                    </NavLink></li>

                    <li><NavLink exact="true" to={`/features/exportaciones/ficha/adicional?exportation_id=${exportation_id}`}>
                     Informacion Adicional
                    </NavLink></li>

             </>
            )}
        </ul>
        <div className="bodyFeature__tabcnt">
          <Outlet />
        </div>
      </section>
    </>
  );
}

