import { NavLink, Outlet} from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { findAllPedidoId } from '../../../../../../../../hooks/exportaciones/Estados-logicas-pedidos/usePedidosService';
import { useEffect,useState } from 'react';
import { useAuth } from '../../../../../../../../contexts/Authutils';
 
export function DetallePagePredespachoApt() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const exportation_id = searchParams.get('exportation_id'); // Obten el valor de pk desde la URL
    
    const { accessToken } = useAuth(); // Obtiene el Token del contexto de autenticación

    const [data,setData] = useState([]); 

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


        return(
            <>

            <section className="bodyFeatureP">
                <ul className='bodyFeature__tab1'>

                   <li>
                        <NavLink exact="true"
                        to={`/features/exportaciones/ficha/despacho-apt/detalle/lista/?exportation_id=${exportation_id}`}
                        >
                         Despacho APT
                        </NavLink>
                    </li>

                   <li>
                        <NavLink exact="true"
                        to={`/features/exportaciones/ficha/despacho-apt/detalle/despacho/?exportation_id=${exportation_id}`}
                        >
                         Ingresar datos
                        </NavLink>
                    </li>

                    <li>
                        <NavLink exact="true"
                        to={`/features/exportaciones/ficha/despacho-apt/detalle/archivos/?exportation_id=${exportation_id}`}
                        >
                         Carga de Fotos OEA/BASC
                        </NavLink>
                    </li>

                    {/* <li>
                        <NavLink exact="true"
                        to={`/features/exportaciones/ficha/despacho-apt/detalle/despacho-det/?exportation_id=${exportation_id}`}
                        >
                         Detalle
                        </NavLink>
                    </li> */}

                </ul>
           
                <div className="bodyFeature__tabcnt">
                    <Outlet />
                </div>
            </section>      
            </>
        );
    }
