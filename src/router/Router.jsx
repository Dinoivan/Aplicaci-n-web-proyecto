import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { Login } from '../public/login/Login';
import { Validar } from '../public/login/Validar';
import Error404 from '../view/Error404';
import { Dashboard } from '../private/dashboard/Dashboard'; 


import { ExportacionesPage } from '../private/features/exportaciones/ExportacionesPage';
import { PedidosPage } from '../private/features/exportaciones/components/PedidosPage';
import {Reporte} from "../private/features/exportaciones/components/Reporte";

import { Outlet } from 'react-router-dom';
import { FeaturesDemo } from '../private/features/FeaturesDemo';


import { PredespachosPage } from '../private/features/exportaciones/components/Detalle/components/Predaspacho/Predespacho';

import { DespachoAptPage } from '../private/features/exportaciones/components/Detalle/components/DespachoAptPage';
import { LiquidacionPage } from '../private/features/exportaciones/components/Detalle/components/LiquidacionPage';
import { AdicionalPage } from '../private/features/exportaciones/components/Detalle/components/AdicionalPage';
import { DocumentariaPage } from '../private/features/exportaciones/components/Detalle/components/DocumentariaPage';
import { ProgramadespachosPage } from '../private/features/exportaciones/components/Detalle/components/ProgramaDespachoPage';
import { SolicitudBkPage } from '../private/features/exportaciones/components/Detalle/components/SolicitudBkPage';
import { GeneralPage } from '../private/features/exportaciones/components/Detalle/components/GeneralPage';
import { ZarpePage } from '../private/features/exportaciones/components/Detalle/components/ZarpePage';
import { ListaFichaPage } from '../private/features/exportaciones/components/ListaFichasPage';
import { FichaDetallePage } from '../private/features/exportaciones/components/FichaDetallePage';
import { PedidosGeneral } from '../private/features/exportaciones/components/Detalle/components/PedidosGeneral';

import { DetallePage } from '../private/features/exportaciones/components/Detalle/DetallePage';
import { FichaDetallePageAPT } from '../private/features/exportaciones/components/Detalle/components/Predaspacho/Apt/Detalle-apt';
import { DespachoPage } from '../private/features/exportaciones/components/Detalle/components/Predaspacho/Apt/DespachoApt';
import { DetallePagePredespachoApt } from '../private/features/exportaciones/components/Detalle/components/Predaspacho/Apt/DetallePageApt';
import { ListarApt } from '../private/features/exportaciones/components/Detalle/components/Predaspacho/Apt/ListarApt';
import { ArchivosPage } from '../private/features/exportaciones/components/Detalle/components/Predaspacho/Apt/ArchivosPage';

import { ImportacionesPage } from '../private/features/importaciones/ImportacionesPage';
import { GestionFichaPage } from '../private/features/importaciones/components/GestionFichaPage';
import { GestionarFichas } from '../private/features/importaciones/components/GestionarFichas';
import { SeguimientoListaFichaPage } from '../private/features/importaciones/components/SeguimientoListaFichaPage';
import { SeguimientoDeDocumentos } from '../private/features/importaciones/components/SeguimientoDeDocumentos';
import { SeguimientoDatosdeFicha } from '../private/features/importaciones/components/SeguimientoDatosdeFicha';
import { SeguimientoPedidoDeCompraPage } from '../private/features/importaciones/components/SeguimientoPedidoDeCompraPage';
import { CondicionesListaFichaPage } from '../private/features/importaciones/components/CondicionesListaFichaPage';
import { CondicionesListaPosicionPage } from '../private/features/importaciones/components/CondicionesListaPosicionPage';
import { CondicionesListaCondicionPage } from '../private/features/importaciones/components/CondicionesListaCondicionPage';
import { EmListaFichasPage } from '../private/features/importaciones/components/EmListaFichasPage';
import { EmEvidenciaPage } from '../private/features/importaciones/components/EmEvidenciaPage';
import { EmListaPosicionPage } from '../private/features/importaciones/components/EmListaPosicionPage';
import { ReclamacionesPage } from '../private/features/reclamaciones/ReclamacionesPage';
import { GestionarFichasR } from '../private/features/reclamaciones/components/GestionarFichasR';
import { NuevoRegistroPage } from '../private/features/reclamaciones/components/NuevoRegistroPage';
import { SustentacionPage } from '../private/features/reclamaciones/components/Detalle/components/SustentacionPage';
import { DetalleReclamacionPage } from '../private/features/reclamaciones/components/Detalle/DetalleReclamacionPage';
import { RevisionPage } from '../private/features/reclamaciones/components/Detalle/components/RevisionPage';
import { RechazoPage } from '../private/features/reclamaciones/components/Detalle/components/RechazoPage';
import { ConfirmacionRechazoPage } from '../private/features/reclamaciones/components/Detalle/components/ConfirmacionRechazoPage';
import { DepositoPage } from '../private/features/reclamaciones/components/Detalle/components/DepositoPage';
import { FichaDetalleImportPage } from '../private/features/importaciones/components/FichaDetallePage';
import { DetalleFichaPage } from '../private/features/importaciones/components/Detalle-ficha/DetalleFichaPage';
import { GeneralImportPage } from '../private/features/importaciones/components/Detalle-ficha/components/GeneralImportPage';
import { EstructuraCorreo } from '../private/features/exportaciones/components/Detalle/components/Predaspacho/components/EstructuraCorreo';
import { RegistroInstructivo } from '../private/features/exportaciones/components/Detalle/components/Predaspacho/components/ResgitroInstructivo';
import { Instrucciones } from '../private/features/exportaciones/components/Detalle/components/Predaspacho/components/Instrucciones';
import { CorreoPredespacho } from '../private/features/exportaciones/components/Detalle/components/Predaspacho/components/CorreoPredespacho';
import { DetallePagePredespacho } from '../private/features/exportaciones/components/Detalle/components/Predaspacho/components/DetallePagePredespacho';
// import {Navigate } from 'react-router-dom';



function App() {
  return (
    <Router>
		<Routes>
			<Route path="/" element={<Login />} />
			<Route path="/validar" element={<Validar />}exact="true" />
			<Route path="/dashboard" element={<Dashboard />} exact="true"/>
			{/* Rutas de Features (Importaciones, Exportaciones, Reclamaciones) */}
			

			<Route path="/features" element={<FeaturesDemo />}>
				<Route index element={<Outlet />} /> 

				<Route path="/features/exportaciones" element={<ExportacionesPage />}>
					
					<Route index element={<Outlet />} />
					
					<Route path="pedidos"  element={<PedidosPage />}  />
					<Route path='pedidos/detalle' element={<FichaDetallePage/>}/>
					<Route path="reporte" element={<Reporte/>}/>


					<Route path='fichas' element={<ListaFichaPage />} />
					
					<Route path="/features/exportaciones/ficha" element={<DetallePage />}>
						<Route index element={<Outlet />} />
						<Route path="general" element={<GeneralPage />}  />
						<Route path="pedidosgeneral" element={<PedidosGeneral/>}/>
						<Route path="bk" element={<SolicitudBkPage />}  />
						
					<Route path="predespacho" element={<PredespachosPage />}>
								<Route index element={<DetallePagePredespacho />} />
								<Route path="detalle" element={<DetallePagePredespacho/>}>
									<Route index element={<Outlet />} />
									<Route path="instructivo" element={<RegistroInstructivo />} />
									<Route path="correo" element={<EstructuraCorreo />} />
									<Route path="instruccionesBL" element={<Instrucciones />} />
									<Route path="correopredespacho" element={<CorreoPredespacho />} />
								</Route>	
					</Route> 

						<Route path="documentaria" element={<DocumentariaPage />}  />
						<Route path="programa-despacho" element={<ProgramadespachosPage />}  />


						{/* <Route path="despacho-apt" element={<DespachoAptPage />}  /> */}

						<Route  path="despacho-apt" element={<DespachoAptPage/>}>
						   <Route index element={< DetallePagePredespachoApt />} />
						   <Route path='detalle' element={< DetallePagePredespachoApt/>}>
						       <Route index element={<Outlet />} />
							   <Route path="despacho" element={<DespachoPage />} />	
							   <Route path="despacho-det" element={<FichaDetallePageAPT />} />
							   <Route path='lista' element={<ListarApt/>}/>	
							   <Route path="archivos" element={<ArchivosPage/>}/>
							</Route>
						</Route>


						<Route path="zarpe" element={<ZarpePage />}  />
						<Route path="liquidacion" element={<LiquidacionPage />}  />
						<Route path="adicional" element={<AdicionalPage />}  />
					</Route>

				</Route>
				<Route path="/features/importaciones" element={<ImportacionesPage />}>
					<Route index element={<Outlet />} /> 
					<Route path="pedidos"  element={<GestionFichaPage />}  />
					<Route path='pedidos/detalle' element={<FichaDetalleImportPage />}/>


					<Route path="fichas" element={<GestionarFichas />} />
					<Route path="/features/importaciones/ficha" element={<DetalleFichaPage />}>
						<Route index element={<Outlet />} />
						<Route path="general" element={<GeneralImportPage />}  />
					</Route>

					<Route exact path="seguimiento" render={ () => 
                                <Redirect to='seguimiento/seguimiento-lista-ficha'/>} />
					<Route path="seguimiento/seguimiento-lista-ficha" element={<SeguimientoListaFichaPage />} />
					<Route path="seguimiento/seguimiento-de-documentos" element={<SeguimientoDeDocumentos />} />
					<Route path="seguimiento/seguimiento-datos-de-ficha" element={<SeguimientoDatosdeFicha />} />
					<Route path="seguimiento/seguimiento-pedido-de-compra" element={<SeguimientoPedidoDeCompraPage />} />

					<Route exact path="condiciones" render={ () => 
                                <Redirect to='condiciones/condiciones-lista-ficha'/>} />
					<Route path="condiciones/condiciones-lista-ficha" element={<CondicionesListaFichaPage />} />
					<Route path="condiciones/condiciones-lista-posicion" element={<CondicionesListaPosicionPage />} />
					<Route path="condiciones/condiciones-lista-condicion" element={<CondicionesListaCondicionPage />} />

					<Route exact path="gestion" render={ () => 
                                <Redirect to='gestion/condiciones-lista-ficha'/>} />
					<Route path="gestion/gestion-em-lista-ficha" element={<EmListaFichasPage />} />
					<Route path="gestion/gestion-em-lista-posicion" element={<EmListaPosicionPage />} />
					<Route path="gestion/gestion-em-evidencia" element={<EmEvidenciaPage />} />


				</Route>


				<Route path="/features/reclamaciones" element={<ReclamacionesPage />}>
					<Route index element={<Outlet />} /> 
					<Route path="nuevo-registro" element={<NuevoRegistroPage />} />
					<Route path="gestionar-fichas" element={<GestionarFichasR />} />
					<Route path="/features/reclamaciones/ficha" element={<DetalleReclamacionPage />}>
						<Route index element={<Outlet />} />
						<Route path="sustentacion" element={<SustentacionPage />}  />
						<Route path="revision" element={<RevisionPage />}  />
						<Route path="rechazo" element={<RechazoPage />}  />
						<Route path="confirmacion" element={<ConfirmacionRechazoPage />}  />
						<Route path="deposito" element={<DepositoPage />}  />

					</Route>
				</Route>


			</Route>
			<Route path="*" element={<Error404 />} />
		</Routes>
    </Router>
  );
}

export default App;