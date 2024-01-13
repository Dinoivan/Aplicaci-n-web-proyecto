import { Link } from "react-router-dom";
import "../../../../styles/features/body.css"

export function DetalleFichaPage() {

 

        return(
            <>
                 <section className="headbar headbar--abierto">

                        <div className="headbar__title headbar__title--detalle">
                        <Link to="/features/exportaciones/pedidos"> <img src="/src/assets/iconos/ico-back.svg" /></Link>
                            <h3>Nº de orden 100000</h3>
                        </div>

                        <div className="headbar__detail">
                            <em className="ico-element-ficha"></em> 
                            <span><strong>Ficha importación:</strong> I-10-23-00001</span>
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
                    </div>
                </div>
              
              </section>


            </>
        );
    }
