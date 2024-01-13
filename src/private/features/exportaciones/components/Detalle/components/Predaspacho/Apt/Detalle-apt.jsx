import { useAuth } from "../../../../../../../../contexts/Authutils";
import {findAllRequestibk} from "../../../../../../../../hooks/exportaciones/useRequestIbkProcess";
import {findAllPedidosFichaId} from "../../../../../../../../hooks/exportaciones/Estados-logicas-pedidos/usePedidosService";
import { usePedidosState } from "../../../../../../../../hooks/exportaciones/Estados-logicas-pedidos/usePedidosState";
import { useEffect,useState,useMemo}  from 'react';
import {AddPreDispath,PreDispathManagement} from "../../../../../../../../services/exportaciones/PreDispatchManagementService"
import { format } from 'date-fns';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCheck, FaTimes } from 'react-icons/fa';
import { utcToZonedTime } from 'date-fns-tz';
import { AddAptDispath } from "../../../../../../../../services/exportaciones/AptDispath";

import { AptDispath } from "../../../../../../../../services/exportaciones/AptDispath";  


export function FichaDetallePageAPT(){

  const fichaId = localStorage.getItem('fichaId');
  console.log("Soy la ficha: ",fichaId);

  const [ibk, setibk] = useState([]);

  const {pedidos,setPedidos
  } = usePedidosState();

  const { accessToken } = useAuth(); // Obtiene el Token del contexto de autenticación

  const [data, setData] = useState([]);
  const [preDispath, setPreDispath] = useState([]);

  const [denominacion, setDenominacion] = useState("");
  const [numeroContainer, setNumeroContainer] = useState("");
  const [seal,setSeal] = useState("");
  const [packageC,setPackageC] =  useState("");

  const [mostrarIngreso, setMostrarIngreso] = useState(true); // Nuevo estado para controlar qué sección mostrar
  const [mostrarModal, setMostrarModal] = useState(false);

  const [modalDataInformation, setModalDatainformation] = useState({
    title: "",
    message: "",
    icon: "",
  });

  const minDate = useMemo(() => {
    const date = new Date();
    date.setMonth(date.getMonth() - 12);
    return date;
  }, []);



  const handleGuardar = async () => {
    try {
      // Crear el objeto con los datos del formulario

      const nuevoObjeto = {
        sku_denomination: denominacion,
        container_number: numeroContainer,
        seal: seal,
        package_quantity: packageC,
        exportation_id: fichaId, // Reemplaza con el valor real
      };

      // Llamar al servicio Agregar para guardar los datos
      await AddAptDispath(accessToken, nuevoObjeto);

      window.location.href = `/features/exportaciones/ficha/documentaria?exportation_id=${fichaId}`;

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

   //Se utiliza datos de ibk
   useEffect(() => {
    async function fetchData() {
       try {
         const resultado = await findAllRequestibk(fichaId, accessToken);
         console.log("Hola soy el id: ",fichaId)
         setibk(resultado);
       
       } catch (error) {
         console.log("Error al obtener los datos");
       }
     }
     fetchData();
   }, [fichaId,setibk,accessToken]);


   useEffect(() => {
    async function fetchData() {
       try {
         const resultado = await AptDispath(fichaId, accessToken);
         console.log("Hola soy el id: ",fichaId)
         setData(resultado);
         setMostrarIngreso(resultado.length === 0);
       } catch (error) {
         console.log("Error al obtener los datos");
       }
     }
     fetchData();
   }, [fichaId,setData,accessToken]);

 console.log("Pedidos: ",pedidos);

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

 

    return(
        <>

      <div className="detalle">
        
        <div className="detalle__body form">

    

            <div className="detalle__body__col--uno">
              <label>Numro de material</label>
              <div>
                <input type="text" value="" className="w-100"/>
              </div>
            </div>

          
            <div className="detalle__body__col--uno">
              <label>Cantidad entregada (m2)</label>
              <div>
                <input type="text" value="" className="w-100"/>
              </div>
            </div>
            

            
            <div className="detalle__body__col--uno">
              <label>Centro</label>
              <div>
              <input type="text" 
              value=""
              className="ww-100"/>
              </div>
            </div>

      
            <div className="detalle__body__col--uno">
              <label>Almacen</label>
               <div>
              <input type="text" 
              value=""
              className="ww-100"/>
              </div>
            </div>

            <div className="detalle__body__col--uno">
              <label>Centro de predespacho</label>
               <div>
              <input type="text" 
              value="" 
              className="ww-100"/>
              </div>
            </div>

          
        </div>

      </div>

    {mostrarModal && (
        <div className="confirmation-modal">
          <div className="confirmation-modal__content">
          {modalDataInformation.icon === 'check' && <FaCheck size={30} color="green" />} {/* Tamaño y color personalizables */}
          {modalDataInformation.icon === 'times' && <FaTimes size={30} color="red" />} {/* Tamaño y color personalizables */}
          <p>{modalDataInformation.message}</p>
            <button onClick={() => setMostrarModal(false)}>Cerrar</button>
          </div>
        </div>
      )}

        </>
    );
}
