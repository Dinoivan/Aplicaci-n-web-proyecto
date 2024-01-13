import { Link } from "react-router-dom";
import { HeadTitleSection } from "../../../components/Head-Title";

export function GestionarFichasR() {



  return(
    <>
        <section className="headbar headbar--abierto">

        <div class="headbar__title">
            <h3> Gestión de fichas</h3>
            <p>Coordinación, control y optimización</p>
        </div>

        <div class="headbar__acciones">
            <button class="btn btn--ico btn--medium btn__secondary--outline">
                <i class="bi bi-arrow-repeat"></i>
                Migrar SAP
            </button>
        </div>

        </section>
      <section class="bodyFeature">

     

      <div className="bodyFeature__controls">
           
            
      </div>
      

      
 


      <div>
          <table class="tabla" cellSpacing="0" cellPadding="0">
             <thead>
                <tr>
                  <th class="thead"> - </th>
                  <th class="thead text-left"> Nº de ficha </th>
                  <th class="thead">Sociedad</th>
                  <th class="thead">Tipo</th>
                  <th class="thead">Pedido/orden de compra</th>
                  <th class="thead">Proveedor a reclamar</th>
                  <th class="thead">Monto reclamado</th>
                  <th class="thead">Estado</th>
                  <th class="thead"> - </th>
                </tr> 
            </thead>
            <tbody>
            <tr>
                <td>
                  <input type="checkbox" />
                </td>
                <td className="ficha__group text-left">
                  <Link to="/features/reclamaciones/ficha/sustentacion">
                    <em class="ico-element-ficha"></em> 2101230001
                  </Link>
                </td>
                <td><strong>1000</strong></td> 
                <td>Exportación</td> 
                <td>9321312</td> 
                <td>-</td> 
                <td>10000</td> 
                <td>En proceso</td>
                <td> <Link to="/features/reclamaciones/ficha/sustentacion">Ver detalle</Link></td>
            </tr>

            <tr>
                <td>
                  <input type="checkbox" />
                </td>
                <td className="ficha__group text-left">
                  <Link to="/features/reclamaciones/ficha/sustentacion">
                    <em class="ico-element-ficha"></em> 2101230023
                  </Link>
                </td>
                <td><strong>1000</strong></td> 
                <td>Importación</td> 
                <td>9321312</td> 
                <td>-</td> 
                <td>10000</td> 
                <td>En proceso</td>
                <td> <Link to="/features/reclamaciones/ficha/sustentacion">Ver detalle</Link></td>
            </tr>


              
            </tbody>
          </table>
        </div>
      </section>


    </>
);
}