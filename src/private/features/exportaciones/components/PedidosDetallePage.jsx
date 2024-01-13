  import "../../../../styles/features/body.css"
  import { Link } from "react-router-dom";
  import { useLocation } from "react-router-dom";


  
  export function PedidosDetallePage() {
    
    const location = useLocation();
    const servicio = location.state?.servicio || {};
    const fichaRelacionada = location.state?.fichaRelacionada || {}; // Obtener la información de la ficha


    const handleChange = (e) => {
      const { name, value } = e.target;
      // Actualizar el servicio con el nuevo valor
      const updatedServicio = { ...servicio, [name]: value };
      // Asignar el servicio actualizado
      location.state.servicio = updatedServicio;
    };

    console.log("Hola: ",servicio);
    console.log("fichas: ",fichaRelacionada);
    
  
    return(
      <>
          <section className="headbar headbar--abierto">

                  <div className="headbar__title headbar__title--detalle">
                  <Link to="/features/exportaciones/pedidos"> <img src="/src/assets/iconos/ico-back.svg" /></Link>
                      <h3>Nº de orden 3201316	</h3>
                  </div>

                  <div className="headbar__detail">
                  <em className="ico-element-ficha"></em> 
                      <span><strong>Ficha exportación:</strong> I-10-23-00001</span>
                  </div>
                
            </section>


        <section className="bodyFeature">

          <div className="detalle">
              <div className="detalle__head">
                  <ul>
                    <li><a href="#">Información generalaa</a></li>
                  </ul>  
              </div>

              <div className="detalle__body form">

                  <div className="detalle__body__col--uno">
                    <label>Pedido</label>
                    <div>
                      <input 
                      type="text"
                      name="order_number" 
                      value={servicio.position || ""}
                      onChange={handleChange} 
                      className="w-100" />
                    </div>
                  </div>

                  <div className="detalle__body__col--uno">
                    <label>Posición</label>
                    <div>
                    <input 
                      type="text"
                      name="quantity" 
                      value={fichaRelacionada.order_number || ""}
                      onChange={handleChange} 
                      className="w-100" />
                    </div>
                  </div>


                  <div className="detalle__body__col--uno">
                    <label>Fecha de creación</label>
                    <div>
                    <input 
                      type="text"
                      name="created_at" 
                      value={fichaRelacionada.order_creation_date || ""}
                      onChange={handleChange} 
                      className="w-100" />
                    </div>
                  </div>

                  <div className="detalle__body__col--uno">
                    <label>Organización de venta</label>
                    <div>
                    <input 
                      type="text"
                      name="payment_condition" 
                      value={fichaRelacionada.sell_organization || ""}
                      onChange={handleChange} 
                      className="w-100" />
                    </div>
                  </div>


                  <div className="detalle__body__col--uno">
                    <label>Número de cliente</label>
                    <div>
                    <input 
                      type="text"
                      name="order_number" 
                      value={fichaRelacionada.order_number || ""}
                      onChange={handleChange} 
                      className="w-100" />
                    </div>
                  </div>

                  <div className="detalle__body__col--uno">
                    <label>Almacén</label>
                    <div>
                    <input 
                      type="text"
                      name="warehouse" 
                      value={fichaRelacionada.payment_condition || ""}
                      onChange={handleChange} 
                      className="w-100" />
                    </div>
                  </div>


                  <div className="detalle__body__col--tres">
                    <label>Nombre de cliente</label>
                    <div>
                    <input 
                      type="text"
                      name="customer_address" 
                      value={fichaRelacionada.customer_name || ""}
                      onChange={handleChange} 
                      className="w-100" />
                    </div>
                  </div>


                  <div className="detalle__body__col--dos">
                    <label>Dirección de cliente</label>
                    <div>
                    <input 
                      type="text"
                      name="customer_address" 
                      value={fichaRelacionada.customer_address || ""}
                      onChange={handleChange} 
                      className="w-100" />
                    </div>
                  </div>


                  <div className="detalle__body__col--uno">
                    <label>Material</label>
                    <div>
                    <input 
                      type="text"
                      name="material_code" 
                      value={servicio.material_code || ""}
                      onChange={handleChange} 
                      className="w-100" />
                    </div>
                  </div>

                  <div className="detalle__body__col--dos">
                    <label>Descripción de Material</label>
                    <div>
                    <input 
                      type="text"
                      name="material_code" 
                      value={servicio.material_description || ""}
                      onChange={handleChange} 
                      className="w-100" />
                    </div>
                  </div>


                  <div className="detalle__body__col--uno">
                    <label>Cantidad</label>
                    <div>
                    <input 
                      type="text"
                      name="quantity" 
                      value={fichaRelacionada.payment_condition || ""}
                      onChange={handleChange} 
                      className="w-100" />
                    </div>
                  </div>

                  <div className="detalle__body__col--uno">
                    <label>Centro</label>
                    <div>
                    <input 
                      type="text"
                      name="center" 
                      value={servicio.center || ""}
                      onChange={handleChange} 
                      className="w-100" />
                    </div>
                  </div>


                  <div className="detalle__body__col--uno">
                    <label>Peso</label>
                    <div>
                    <input 
                      type="text"
                      name="weight" 
                      value={servicio.weight || ""}
                      onChange={handleChange} 
                      className="w-100" />
                    </div>
                  </div>



                  <div className="detalle__body__col--uno">
                    <label>Condición Pago</label>
                    <div>
                    <input 
                      type="text"
                      name="payment_condition" 
                      value={fichaRelacionada.payment_condition || ""}
                      onChange={handleChange} 
                      className="w-100" />
                    </div>
                  </div>


                  <div className="detalle__body__col--uno">
                    <label>Precio Unitario</label>
                    <div>
                    <input 
                      type="text"
                      name="unit_price" 
                      value={servicio.unit_price || ""}
                      onChange={handleChange} 
                      className="w-100" />
                    </div>
                  </div>


                  <div className="detalle__body__col--uno">
                    <label>Moneda</label>
                    <div>
                    <input 
                      type="text"
                      name="unit_price" 
                      value={servicio.unit_price || ""}
                      onChange={handleChange} 
                      className="w-100" />
                    </div>
                  </div>



                  <div className="detalle__body__col--uno">
                    <label>Precio total</label>
                    <div>
                    <input 
                      type="text"
                      name="total_price" 
                      value={servicio.total_price || ""}
                      onChange={handleChange} 
                      className="w-100" />
                    </div>
                  </div>
              </div>
          </div>
        
        </section>


      </>
  );
      }
