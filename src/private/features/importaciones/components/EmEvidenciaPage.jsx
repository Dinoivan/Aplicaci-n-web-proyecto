 
export function EmEvidenciaPage() {

    
        return(
            <>

              <section className="headbar headbar--abierto">

                  <div class="headbar__title">
                      <h3>Gestión EM - Evidencia</h3>
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
                                 <th class="thead">-</th>
                                 <th class="thead text-left">Ficha importación</th>
                                <th class="thead">Sociedad</th>
                                <th class="thead">ID </th>
                                <th class="thead">Link</th>
                                <th class="thead">Carga</th>
                               
                              </tr> 
                          </thead>
                          <tbody>
                              <tr>
                                <td>
                                  <input type="checkbox" />
                                </td>
                                <td className="ficha__group">
                                     <a  href="#"><em class="ico-element-ficha"></em> 2101230005</a>
                                </td>
                                  <td><strong>1000</strong></td> 
                                  <td>-</td> 
                                  <td>-</td> 
                                  <td>-</td> 
                                 
                              </tr>

                              <tr>
                                <td>
                                  <input type="checkbox" />
                                </td>
                                <td className="ficha__group">
                                     <a  href="#"><em class="ico-element-ficha"></em> 2101230005</a>
                                </td>
                                  <td><strong>1000</strong></td> 
                                  <td>-</td> 
                                  <td>-</td> 
                                  <td>-</td> 
                                 
                              </tr>
                             
                          </tbody>
                        </table>
                      </div>
                    </section>



            </>
        );
    }
