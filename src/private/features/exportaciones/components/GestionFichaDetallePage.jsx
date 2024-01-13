import { Link } from "react-router-dom";
import "../../../../styles/features/body.css"


 
export function DetallePage() {

 

        return(
            <>
              <section className="headbar headbar--abierto">

                    <div className="headbar__title headbar__title--detalle">
                    <Link to="/features2/exportaciones/fichas"> <img src="/src/assets/iconos/ico-back.svg" /></Link>
                        <h3>Nº de orden 100000</h3>
                    </div>

                    <div className="headbar__detail">
                        <img src="/src/assets/iconos/ico-ficha.svg" />
                        <span><strong>Ficha importación:</strong> 2101230001</span>
                    </div>
                  
              </section>


              <section className="bodyFeature">

                <div className="detalle">
                    <div className="detalle__head">
                        <ul>
                          <li><a href="#">Información general</a></li>
                        </ul>  
                    </div>

                    <div className="detalle__body form">
                        <div className="detalle__body__col--uno">
                          <label>C.I.</label>
                          <div>
                            <input type="text" value="ZPCI" className="w-100" />
                          </div>
                        </div>

                        <div className="detalle__body__col--uno">
                          <label>C.e.</label>
                          <div>
                            <input type="text" value="210" className="w-100" />
                          </div>
                        </div>

                        <div className="detalle__body__col--uno">
                          <label>Fecha Incoterms</label>
                          <div>
                            <input type="text" value="2010" className="w-100" />
                          </div>
                        </div>


                        <div className="detalle__body__col--uno">
                          <label>Fecha Alistamiento</label>
                          <div>
                            <input type="text" value="01/05/2023" className="w-100" />
                          </div>
                        </div>

                        <div className="detalle__body__col--uno">
                          <label>PEDIDOS MK</label>
                          <div>
                            <input type="text" value="4560002505" className="w-100" />
                          </div>
                        </div>


                        <div className="detalle__body__col--uno">
                          <label>Doc.compr.</label>
                          <div>
                            <input type="text" value="4720003600" className="w-100" />
                          </div>
                        </div>


                        <div className="detalle__body__col--uno">
                          <label>Posición</label>
                          <div>
                            <input type="text" value="10" className="w-100" />
                          </div>
                        </div>

                        <div className="detalle__body__col--dos">
                          <label>Proveedor/ Centrosuministrador</label>
                           <div>
                            <input type="text" value="200407 - TANGSHAN MONOPY CERAMIC CO. LTD" className="w-100" />
                          </div>
                        </div>


                        <div className="detalle__body__col--uno">
                          <label>Fecha doc.</label>
                           <div>
                            <input type="text" value="19.11.2021" className="w-100" />
                          </div>
                        </div>


                        <div className="detalle__body__col--uno">
                          <label>Sol.pedido</label>
                           <div>
                            <input type="text" value="12865654" className="w-100" />
                          </div>
                        </div>


                        <div className="detalle__body__col--uno">
                          <label>Pos.Solped</label>
                           <div>
                            <input type="text" value="" className="w-100" />
                          </div>
                        </div>


                        <div className="detalle__body__col--uno">
                          <label>Material</label>
                           <div>
                            <input type="text" value="710002343" className="w-100" />
                          </div>
                        </div>


                        <div className="detalle__body__col--uno">
                          <label>Texto breve</label>
                           <div>
                            <input type="text" value="OP ATLANTA BLANCO PS AS SD" className="w-100" />
                          </div>
                        </div>


                        <div className="detalle__body__col--uno">
                          <label>UMP</label>
                           <div>
                            <input type="text" value="UN" className="w-100" />
                          </div>
                        </div>


                        <div className="detalle__body__col--uno">
                          <label>Cantidad</label>
                           <div>
                            <input type="text" value="24" className="w-100" />
                          </div>
                        </div>


                        <div className="detalle__body__col--uno">
                          <label>   Prc.neto</label>
                           <div>
                            <input type="text" value="76.65" className="w-100" />
                          </div>
                        </div>



                        <div className="detalle__body__col--uno">
                          <label>Mon.</label>
                           <div>
                            <input type="text" value="USD" className="w-100" />
                          </div>
                        </div>


                        <div className="detalle__body__col--uno">
                          <label>Estado</label>
                           <div>
                            <input type="text" value="" className="w-100" />
                          </div>
                        </div>



                        <div className="detalle__body__col--uno">
                          <label>PAIS</label>
                           <div>
                            <input type="text" value="" className="w-100" />
                          </div>
                        </div>


                        <div className="detalle__body__col--uno">
                          <label>INCOTERMS</label>
                           <div>
                            <input type="text" value="" className="w-100" />
                          </div>
                        </div>


                        <div className="detalle__body__col--uno">
                          <label>FECHA PICK UP</label>
                           <div>
                            <input type="text" value="" className="w-100" />
                          </div>
                        </div>


                        <div className="detalle__body__col--uno">
                          <label>VIA</label>
                           <div>
                            <input type="text" value="" className="w-100" />
                          </div>
                        </div>


                        <div className="detalle__body__col--uno">
                          <label>TIPO</label>
                           <div>
                            <input type="text" value="" className="w-100" />
                          </div>
                        </div>


                        <div className="detalle__body__col--uno">
                          <label>CNTR  / BULTO</label>
                           <div>
                            <input type="text" value="" className="w-100" />
                          </div>
                        </div>


                        <div className="detalle__body__col--uno">
                          <label>TIPO / PESO</label>
                           <div>
                            <input type="text" value="" className="w-100" />
                          </div>
                        </div>

                        <div className="detalle__body__col--uno">
                          <label>Ficha Importación</label>
                           <div>
                            <input type="text" value="2101230001" className="w-100" />
                          </div>
                        </div>


                        <div className="detalle__body__col--uno">
                          <label>ESTADO DE FICHA </label>
                           <div>
                            <input type="text" value="ALISTAMIENTO" className="w-100" />
                          </div>
                        </div>


                        <div className="detalle__body__col--uno">
                          <label>Solicit.</label>
                           <div>
                            <input type="text" value="PROY CEL" className="w-100" />
                          </div>
                        </div>


                        <div className="detalle__body__col--uno">
                          <label>Crea.SolPe</label>
                           <div>
                            <input type="text" value="JOSVASQ0" className="w-100" />
                          </div>
                        </div>


                        <div className="detalle__body__col--uno">
                          <label>Canti Pend en Ficha</label>
                           <div>
                            <input type="text" value="" className="w-100" />
                          </div>
                        </div>


                        <div className="detalle__body__col--uno">
                          <label>Liberacion</label>
                           <div>
                            <input type="text" value="" className="w-100" />
                          </div>
                        </div>


                        <div className="detalle__body__col--uno">
                          <label>ETD REAL</label>
                           <div>
                            <input type="text" value="" className="w-100" />
                          </div>
                        </div>



                    </div>
                </div>
              
              </section>


            </>
        );
    }
