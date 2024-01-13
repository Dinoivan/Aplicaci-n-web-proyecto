// // import "../../../../styles/features/body.css"
// // import {  useState,useEffect,useCallback } from "react";
// // import { useAuth } from "../../../../contexts/Authutils";
// // import {findAllGestionFichas} from "../../../../hooks/exportaciones/Estados-logicas-fichas/useGestionFichasServices";
// // import { FiltrarDatos } from "../../../../hooks/exportaciones/Estados-logicas-fichas/useGestionFichasServices";


// export function ReportePage() {

//   // const [fichas,setFichas] = useState([]);
//   // const [showFilter, setShowFilter] = useState(false);
//   // const { accessToken } = useAuth();
//   // const [customerNameFilter, setCustomerNameFilter] = useState('');
//   // const [sellOrganizationFilter, setSellOrganizationFilter] = useState('');
//   // const [orderNumberFilter, setOrderNumberFilter] = useState('');


//   // console.log("ListaFichaPage renderizado");

//   // useEffect(() => {
//   //   async function fetchData() {
//   //     try {

//   //       if(!accessToken){
//   //         console.error("No se encontro un token disponible");
//   //         return;
//   //       }
//   //       const fichaData = await findAllGestionFichas(accessToken);
//   //       setFichas(fichaData);
   
        
//   //     } catch (error) {
//   //       console.error("Error al obtener los datos");
//   //     }
//   //   }

//   //   fetchData();
//   // }, [accessToken]);



//   // const handlerOnClick = () => {
//   //   setShowFilter(!showFilter);
//   // }

//   // const handleApplyFilterClick = useCallback(async () => {
//   //   try {
//   //     if (!accessToken) {
//   //       console.error('No se encontró un token disponible');
//   //       return;
//   //     }

//   //     const filtroParams = {
//   //       customer_name: customerNameFilter,
//   //       sell_organization: sellOrganizationFilter,
//   //       order_number: orderNumberFilter,
//   //     };

//   //     const filteredData = await FiltrarDatos(filtroParams, accessToken);
//   //     setFichas(filteredData);
//   //   } catch (error) {
//   //     console.error('Error al aplicar los filtros', error);
//   //   }
//   //   console.log("handleApplyFilterClick - Inicio");
//   // }, [accessToken, customerNameFilter, sellOrganizationFilter, orderNumberFilter]);

//   // useEffect(() => {
//   //   // Llama a la función para actualizar datos en función de los filtros
//   //   if((customerNameFilter === '' && sellOrganizationFilter === '' && orderNumberFilter === '')){
//   //     console.log("handleApplyFilterClick - Se cumple la condición");
      
//   //     handleApplyFilterClick();
//   //   }

   
//   // }, [accessToken, customerNameFilter, sellOrganizationFilter, orderNumberFilter, handleApplyFilterClick]);

//       return(
        
//             <>
            
//                  <section className="headbar headbar--abierto">

//                         <div className="headbar__title">
//                             <h3>Exportaciones &rarr; Reporte de seguimiento</h3>
//                             <p>Reporte de seguimiento para el proceso de exportación</p>
//                         </div>

//                         <div className="headbar__acciones">
//                             <button className="btn btn--ico btn--medium btn__secondary--outline">
//                                 <i className="bi bi-arrow-repeat"></i>
//                                 Migrar SAP
//                             </button>
//                         </div>
                      
//                   </section>


//               <section className="bodyFeature">

              

//               <div className="bodyFeature__controls">

//                     <div className="bodyFeature__controls__actions">
                       
                         
//                     </div>

//                     <div className="bodyFeature__controls__filter">
//                         <button value="si" onClick={handlerOnClick} className="btn btn--simple"><span>Filtro</span> <img src="/src/assets/iconos/ico-filtro.svg" /></button>
//                     </div>
//               </div>
          
//               {showFilter && (
//               <div className="bodyFeature__searching form">
//                   <div className="bodyFeature__searching__col">
//                     <label>Organización de venta</label>
//                     <input type="text" 
//                     className="w-100"
//                     value={sellOrganizationFilter}
//                     onChange={(e) => setSellOrganizationFilter(e.target.value)}
                    
                 
//                  />
//                   </div>


//                   <div className="bodyFeature__searching__col">
//                     <label>Posición</label>
//                     <input type="text" 
//                     className="w-100"
//                     value={orderNumberFilter}
//                     onChange={(e) => setOrderNumberFilter(e.target.value)}
                    
                 
//                    />
//                   </div>

//                   <div className="bodyFeature__searching__col">
//                     <label>Nombre de proforma</label>
//                     <input type="text" 
//                     className="w-100"
//                     value={customerNameFilter}
//                     onChange={(e) => {setCustomerNameFilter(e.target.value); }}
                    
//                     />
//                   </div>

//                   <div className="bodyFeature__controls__button">
//                         {/* <button  onClick={handleApplyFilterClick}  className="btn btn__primary--outline">Buscar</button> */}
//                   </div>
//               </div>
//               )}

//               <div>
//                   <table className="tabla" cellSpacing="0" cellPadding="0">
//                      <thead>
//                         <tr>
//                           <th className="thead"> - </th>
//                           <th className="thead text-left">Nº de ficha</th>
//                           <th className="thead">Cliente </th>
//                           <th className="thead">Pedido</th>
//                           <th className="thead">Proforma</th>
                          
//                           <th className="thead">Fecha envío instr.</th>
//                           <th className="thead">Fecha de envío DAM </th>
//                           <th className="thead">Línea naviera</th>
//                           <th className="thead">Importe SUNAT</th>
//                           <th className="thead"> - </th>
//                         </tr> 
//                     </thead>
//                     <tbody>
//                       <tr>
//                         <td colSpan="10">No se encontraron resultados</td>
//                       </tr>  
//                     </tbody>
//                   </table>
//                 </div>
//               </section>
//             </>
//         );
//   }
