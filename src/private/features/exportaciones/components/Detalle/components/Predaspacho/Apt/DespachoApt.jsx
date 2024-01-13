import { useAuth } from "../../../../../../../../contexts/Authutils";
import {findAllRequestibk} from "../../../../../../../../hooks/exportaciones/useRequestIbkProcess";
import {findAllPedidosFichaId} from "../../../../../../../../hooks/exportaciones/Estados-logicas-pedidos/usePedidosService";
import { usePedidosState } from "../../../../../../../../hooks/exportaciones/Estados-logicas-pedidos/usePedidosState";
import { useEffect,useState}  from 'react';
import {PreDispathManagement} from "../../../../../../../../services/exportaciones/PreDispatchManagementService"
import "react-datepicker/dist/react-datepicker.css";
import { FaCheck, FaTimes } from 'react-icons/fa';
import { AddAptDispath } from "../../../../../../../../services/exportaciones/AptDispath";

import { AptDispath } from "../../../../../../../../services/exportaciones/AptDispath";
import { ActualizarAPT } from "../../../../../../../../services/exportaciones/AptDispath";  
// import { Update } from "../../../../../../../../services/exportaciones/listapedidosServices";


export function DespachoPage(){

  const fichaId = localStorage.getItem('fichaId');
  console.log("Soy la ficha: ",fichaId);

  const {pedidos,setPedidos
  } = usePedidosState();

  const { accessToken } = useAuth(); // Obtiene el Token del contexto de autenticación

  const [data, setData] = useState([]);
  const [preDispath, setPreDispath] = useState([]);

  const [denominacion, setDenominacion] = useState("");
  const [numeroContainer, setNumeroContainer] = useState("");
  const [seal,setSeal] = useState("");
  const [additionalPrecint,setAdditionalPrecint] = useState(null);
  const [packageC,setPackageC] =  useState("");

  const [mostrarIngreso, setMostrarIngreso] = useState(true); // Nuevo estado para controlar qué sección mostrar
  const [mostrarModal, setMostrarModal] = useState(false);

  const [modalDataInformation, setModalDatainformation] = useState({
    title: "",
    message: "",
    icon: "",
  });

  const [editableFieldsapt, setEditableFieldsapt] = useState({
    id: 0,
    seal: "",
    additional_seal: null,
    package_quantity: "",
    sku_denomination: "",
    container_number: "",
  });

  //Estado para editar los campos de fichas de exportación
  const [isEditing, setIsEditing] = useState(false);

   //Evento para detectar lo que ingresa el usuario
   const handleInputChange = (field, value) => {
    setEditableFieldsapt({...editableFieldsapt,[field]: value,});

  };

  const handleGuardar = async () => {
    try {
      // Crear el objeto con los datos del formulario

      const nuevoObjeto = {
        seal: seal,
        additional_seal: additionalPrecint,
        package_quantity: packageC,
        sku_denomination: denominacion,
        container_number: numeroContainer,
        exportation_id: fichaId, // Reemplaza con el valor real
      };

      // Llamar al servicio Agregar para guardar los datos
      await AddAptDispath(accessToken, nuevoObjeto);

      window.location.href = `/features/exportaciones/ficha/despacho-apt/detalle/archivos/?exportation_id=${fichaId}`;

      // await Update(accessToken, { id: fichaId, status: 'SENT' });

      const resultado = await findAllRequestibk(fichaId, accessToken);
      setData(resultado);

       const result = await findAllPedidosFichaId(fichaId,accessToken);
       setPedidos(result)

      setMostrarIngreso(resultado.length === 0);
      setModalDatainformation({ title: "Éxito", message: "Información guardado exitosamente",icon: 'check', });
      setMostrarModal(true);
    } catch (error) {
      console.log("Error al guardar los datos",error);
      setModalDatainformation({ title: "Error", message: "Sucedio un Error",icon: 'times', });
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const resul = await findAllPedidosFichaId(fichaId, accessToken);
        setPedidos(resul);
      } catch (error) {
        console.log("Error al obtener los datos");
      }
    }
    fetchData();
  }, [fichaId,setPedidos,accessToken]);


   useEffect(() => {
    async function fetchData() {
       try {
         const resultado = await AptDispath(fichaId, accessToken);
         const fichaData = resultado.length > 0 ? resultado[0] : {};
         console.log("Hola soy el id: ",fichaId)
         setData(fichaData);
         setEditableFieldsapt({
          id: fichaData.id || "",
          seal: fichaData.seal || "",
          additional_seal: fichaData.additional_seal || null,
          package_quantity: fichaData.package_quantity || "-",
          sku_denomination: fichaData.sku_denomination || "-",
          container_number: fichaData.container_number || "-",
         })

         setMostrarIngreso(resultado.length === 0);
       } catch (error) {
         console.log("Error al obtener los datos");
       }
     }
     fetchData();
   }, [fichaId,setData,accessToken]);

   console.log("Data: ",data);


   //Evento para guardar cambios actualizados
   const handleGuardarCambiosActualizadosAPT = async () => {
    try {
      const objetoParaActualizar = {
        id: editableFieldsapt.id,
        exportation_id: fichaId,
        seal: editableFieldsapt.seal,
        additional_seal: editableFieldsapt.additional_seal,
        package_quantity: editableFieldsapt.package_quantity,
        sku_denomination: editableFieldsapt.sku_denomination,
        container_number: editableFieldsapt.container_number,
      }
  
      await ActualizarAPT(accessToken, fichaId,objetoParaActualizar);
      setModalDatainformation({ title: "Éxito", message: "La información se actualizo correctamente",icon: 'check', });
      setMostrarModal(true);
      console.log('Ficha actualizada con éxito');

    setIsEditing(false);

  }catch(error) {
      console.error('Error al actualizar la ficha:', error);
      setModalDatainformation({ title: "Error", message: "Sucedio un Error",icon: 'times', });
    }
  };


   console.log("Datos: ",data);

 useEffect(() => {
  async function fetchData() {
     try {
       const resultado = await PreDispathManagement(fichaId, accessToken);
       console.log("Hola soy el id: ",fichaId)
       setPreDispath(resultado);
     } catch (error) {
       console.log("Error al obtener los datos");
     }
   }
   fetchData();
 }, [fichaId,setData,accessToken]);

console.log("Pedidos: ",pedidos);
console.log("Programa despacho: ",preDispath)

console.log("Resultado del estado para editar: ", editableFieldsapt);


 
    return(
        <>
          
    {mostrarIngreso ? (
          <>

      <div className="detalle">
        
        <div className="detalle__body form">
          
            <div className="detalle__body__col--uno">
              <label>Precinto</label>
              <div>
              <textarea type="text" 
              value={seal}
              onChange={(e) => setSeal(e.target.value)} 
              className="w-100 area-apt"/>
              </div>
            </div>

      
            <div className="detalle__body__col--uno">
              <label>Precinto adicional</label>
               <div>
              <textarea type="text" 
              value={additionalPrecint}
              onChange={(e) => setAdditionalPrecint(e.target.value)} 
              className="w-100 area-apt"/>
              </div>
            </div>


            <div className="detalle__body__col--uno">
              <label>Cantidad Bulto</label>
               <div>
              <textarea type="text" 
              value={packageC}
              onChange={(e) => setPackageC(e.target.value)} 
              className="w-100 area-apt"/>
              </div>
            </div>

            <div className="detalle__body__col--uno">
              <label>Número de GR</label>
               <div>
              <textarea type="text" 
              value={denominacion}
              onChange={(e) => setDenominacion(e.target.value)} 
              className="w-100 area-apt"/>
              </div>
            </div>

            
            <div className="detalle__body__col--uno">
              <label>Número de contenedor</label>
               <div>
              <textarea type="text" 
              value={numeroContainer}
              onChange={(e) => setNumeroContainer(e.target.value)} 
              className="w-100 area-apt"/>
              </div>
            </div>


            <div className="text-center block-center">
                <button className="btn btn__primary btn--ico" onClick={handleGuardar}>
                  <i className="bi bi-save"></i>
                  Guardar</button>
            </div>
        </div>

      </div>

      </>
    ): (
      <>
         <div className="detalle">
        

        <div className="detalle__body form">


        {Object.keys(data).length > 0 ? (
                    <>


            
            <div className="detalle__body__col--uno">
              <label>Precinto</label>
              <div key={data.id}>
                {isEditing ? (
                      <textarea 
                      value={editableFieldsapt.seal}
                      onChange={(e) => handleInputChange('seal', e.target.value)}
                      className='w-100 area-apt'
                      />
                      ):(
                      <textarea  value={editableFieldsapt.seal || '-'} className='w-100 area' readOnly/>
                  )}
              </div>
            </div>

            <div className="detalle__body__col--uno">
              <label>Precinto adicional</label>
              <div>
              {isEditing ? (
                      <textarea  
                      value={editableFieldsapt.additional_seal}
                      onChange={(e) => handleInputChange('additional_seal', e.target.value)}
                      className='w-100 area-apt'
                      />
                      ):(
                      <textarea value={editableFieldsapt.additional_seal || '-'} className='w-100 area' readOnly/>
                  )}
              </div>
            </div>


            <div className="detalle__body__col--uno">
              <label>Cantidad Bulto</label>
              <div>
              {isEditing ? (
                      <textarea  
                      value={editableFieldsapt.package_quantity}
                      onChange={(e) => handleInputChange('package_quantity', e.target.value)}
                      className='w-100 area-apt'
                      />
                      ):(
                      <textarea value={editableFieldsapt.package_quantity || '-'} className='w-100 area' readOnly/>
                  )}
              </div>
            </div>
            
         

            <div className="detalle__body__col--uno">
              <label>Número GR</label>
              <div>
              {isEditing ? (
                      <textarea  
                      value={editableFieldsapt.sku_denomination}
                      onChange={(e) => handleInputChange('sku_denomination', e.target.value)}
                      className='w-100 area-apt'
                      />
                      ):(
                      <textarea  value={editableFieldsapt.sku_denomination || '-'} className='w-100 area' readOnly/>
                  )}
              </div>
            </div>

            <div className="detalle__body__col--uno">
              <label>Número de contenedor</label>
              <div>
              {isEditing ? (
                      <textarea  
                      value={editableFieldsapt.container_number}
                      onChange={(e) => handleInputChange('container_number', e.target.value)}
                      className='w-100 area-apt'
                      />
                      ):(
                      <textarea value={editableFieldsapt.container_number || '-'} className='w-100 area' readOnly/>
                  )}
              </div>
            </div>

            </>
       ): (
        <>
        <p>No exite dato</p>
        </>
       )}
                
                <div className="text-center block-center">
                {/* <button className="btn btn__primary btn--ico">
                <i className="bi bi-save"></i>
                Guardar
              </button>  */}


              {!isEditing && (
               
                          <button className="btn btn__primary btn--ico m-2" onClick={() => setIsEditing(true)}>
                            <i className="bi bi-pencil-square"></i> Editar
                          </button>
       
                        )}
                        {isEditing && (
                          <>
                            <button className="btn btn__primary btn--ico m-2" onClick={handleGuardarCambiosActualizadosAPT}>
                              <i className="bi bi-check-square"></i> Guardar Cambios
                            </button>
                            <button className="btn btn__secondary btn--ico m-2" onClick={() => setIsEditing(false)}>
                              <i className="bi bi-x"></i> Cancelar
                            </button>
                          </>
              )}

             </div>
        </div>


      </div>

      </>

    )}

    {mostrarModal && (
        <div className="confirmation-modal">
          <div className="confirmation-modal__content">
          {modalDataInformation.icon === 'check' && <FaCheck size={30} color="green" style={{ margin: ' 0 auto' }}/>} {/* Tamaño y color personalizables */}
          {modalDataInformation.icon === 'times' && <FaTimes size={30} color="red" style={{ margin: ' 0 auto' }}/>} {/* Tamaño y color personalizables */}
          <p>{modalDataInformation.message}</p>
          <div className="customModal__buttons">
          <button className="btn btn__primary" onClick={() => setMostrarModal(false)}>Cerrar</button>
          </div> 
          </div>
        </div>
      )}

        </>
    );
}

