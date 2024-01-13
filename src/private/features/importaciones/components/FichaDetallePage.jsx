import { Link } from "react-router-dom";
import "../../../../styles/features/body.css"
import { useState } from "react";

 
export function FichaDetalleImportPage() {

 

        return(
            <>
                 <section className="headbar headbar--abierto">

                        <div class="headbar__title headbar__title--detalle">
                        <Link to="/features/importaciones/pedidos"> <img src="/src/assets/iconos/ico-back.svg" /></Link>
                            <h3>Detalle</h3>
                        </div>

                  </section>


              <section class="bodyFeature bodyFeature--vficha">

                <div className="bodyFeature__fichacol">
                  <em className="icon-element-ficha-grande"></em>
                  <ul>
                    <li>
                      <span>Número de pedido</span>
                      <p>-</p>
                    </li>
                    <li>
                      <span>Fecha de creación:</span>
                      <p>03/11/2023</p>
                    </li>
                    <li>
                      <span>Cliente:</span>
                      <p>201186   ECO (XIAMEN) TECHNOLOGY INC.</p>
                    </li>
                    <li>
                      <span>Valor neto:</span>
                      <p>USD 550.0</p>
                    </li>

                    <li>
                      <span>Estado:</span>
                      <p>-</p>
                    </li>
                  </ul>
              
                </div>


                <div className="bodyFeature__fichatabla">
                <table class="tabla" cellSpacing="0" cellPadding="0">
                      <thead>
                          <tr>
                            <th class="thead">Pedido de venta</th>
                            <th class="thead">Posición</th>
                            <th class="thead">Material</th>
                            <th class="thead">Descripción de material</th>
                            <th class="thead">Cantidad</th>
                            <th class="thead">-</th>
                          
                          </tr> 
                      </thead>
                      <tbody>
                          <tr> 
                              <td colSpan={6}> No se encontraron resultados</td> 
                          </tr>


                          


                         
                        
                        
                      </tbody>
                    </table>
                </div>

 
              
              </section>


            </>
        );
    }
