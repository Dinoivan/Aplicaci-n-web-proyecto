 
export function EmListaPosicionPage() {

    
        return(
            <>

              <section className="headbar headbar--abierto">

                  <div class="headbar__title">
                      <h3>Gestión EM - Lista de Posición de Pedido de Compra Listo para EM</h3>
                      <p>Coordinación, control y optimización</p>
                  </div>
              </section>



              <section class="bodyFeature">

                    <div className="bodyFeature__controls">
                          <div className="bodyFeature__controls__actions">
                                <input class="lupa" type="text" placeholder="Buscar por palabra clave"></input>
                          </div>

                          <div class="bodyFeature__controls__filter">

                              <button  class="btn btn--simple"><span>Filtro</span> <em class="icon-element-fitro"></em></button>
                          </div>
                    </div>
                    

                    
              


                    <div>
                        <table class="tabla" cellSpacing="0" cellPadding="0">
                          <thead>
                              <tr>
                                 <th class="thead">Nº de ficha</th>

                                <th class="thead">Sociedad</th>
                                <th class="thead">CI</th>
                                <th class="thead">Ce</th>
                                <th class="thead">Doc. compr.</th>
                                <th class="thead">Pos. </th>
                                <th class="thead">Proveedor/ Centro suministro</th>
                                <th class="thead">Fecha doc. </th>
                                <th class="thead">Material</th>
                                <th class="thead">Texto breve</th>
                                <th class="thead">UMP</th>
                                <th class="thead">Cantidad</th>
                                <th class="thead">Prc. neto</th>
                                <th class="thead">Mon</th>
                                <th class="thead">Estado</th>
                              </tr> 
                          </thead>
                          <tbody>
                              <tr>
                                
                                  <td className="ficha__group">
                                     <a  href="#"><em class="ico-element-ficha"></em> 2101230005</a>
                                </td>
                                  <td><strong>100000</strong></td> 
                                  <td>ZPCI</td> 
                                  <td>2010</td> 
                                  <td>4720003600</td> 
                                  <td>10</td> 
                                  <td>200407     TANGSHAN MONOPY CERAMIC CO. LTD</td> 
                                  <td>19.11.2021</td>
                                  <td>710002343</td>
                                  <td>OP ATLANTA BLANCO PS AS SD</td>
                                  <td>UN</td>
                                  <td>24</td>
                                  <td>76.65</td>
                                  <td>USD</td>
                                  <td></td>
                              </tr>



                              <tr>
                                
                                  <td className="ficha__group">
                                     <a  href="#"><em class="ico-element-ficha"></em> 2101230005</a>
                                </td>
                                  <td><strong>100000</strong></td> 
                                  <td>ZPCI</td> 
                                  <td>2010</td> 
                                  <td>4720003600</td> 
                                  <td>10</td> 
                                  <td>200407     TANGSHAN MONOPY CERAMIC CO. LTD</td> 
                                  <td>19.11.2021</td>
                                  <td>710002343</td>
                                  <td>OP ATLANTA BLANCO PS AS SD</td>
                                  <td>UN</td>
                                  <td>24</td>
                                  <td>76.65</td>
                                  <td>USD</td>
                                  <td></td>
                              </tr>

                              
                             
                          </tbody>
                        </table>
                      </div>
                    </section>



            </>
        );
    }
