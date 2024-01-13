  import { useEffect,useState} from 'react';
  import { findAllDispathPrograma } from '../../../../../../hooks/exportaciones/Estados-logica-programadespacho/useDispathProgramProcess';
  import { useAuth } from "../../../../../../contexts/Authutils";
  import { usePedidosState } from '../../../../../../hooks/exportaciones/Estados-logicas-pedidos/usePedidosState';
  import { AddDispath} from '../../../../../../services/exportaciones/DispatchProgramService';
  import { Update } from '../../../../../../services/exportaciones/listapedidosServices';
  import { findAllPedidosFichaId } from '../../../../../../hooks/exportaciones/Estados-logicas-pedidos/usePedidosService';
  import "react-datepicker/dist/react-datepicker.css";
  import { format } from 'date-fns';
  import {findAllRequestibk} from "../../../../../../hooks/exportaciones/useRequestIbkProcess";
  import { MotivoReprogramacion } from '../../../../../../public/modals/Motivo';
  import { FaCheck, FaTimes } from 'react-icons/fa';
  import { utcToZonedTime } from 'date-fns-tz';
  import { UpdateProgramDispath } from '../../../../../../services/exportaciones/DispatchProgramService';
  import { ParametrizaionZona } from '../../../../../../services/exportaciones/DispatchProgramService';
  import { fechasMultiples } from '../../../../../../services/exportaciones/DispatchProgramService';
  import DatePicker from "react-datepicker";
  import "react-datepicker/dist/react-datepicker.css";
  import { getFechasMultiples } from '../../../../../../services/exportaciones/DispatchProgramService';
  import { UpdateDispathProgram } from '../../../../../../services/exportaciones/DispatchProgramService';
  import { EliminarFechas } from '../../../../../../services/exportaciones/DispatchProgramService';
  import { useDispathProgramStados } from '../../../../../../hooks/exportaciones/Estados-logica-programadespacho/useDispathProgramState';

 
  export function ProgramadespachosPage() {

    const fichaId = localStorage.getItem('fichaId');

  const {ibk,setibk,dispath,setDispath,userOptions, setUserOptions,fechasUbicacionesSJL, setFechasUbicacionesSJL,fechasUbicacionesPH, setFechasUbicacionesPH,
    fechasUbicacionesMilla, setFechasUbicacionesMilla,fechasUbicacionesTrebol, setFechasUbicacionesTrebol,selectedId, setSelectedId,fechaSelect,setFechasSelected,
    dispatch,setDispatch,selectedDatePickerDate,setSelectedDatePickerDate,fechasUbicacionesSJLUpdate, setFechasUbicacionesSJLUpdate,fechasUbicacionesPHUpdate, setFechasUbicacionesPHUpdate,
    fechasUbicacionesMillaUpdate, setFechasUbicacionesMillaUpdate,fechasUbicacionesTrebolUpdate, setFechasUbicacionesTrebolUpdate,showEliminarButton,setShowEliminarButton,
    selectedUbicacion, setSelectedUbicacion,id, setId,codigoId, setCodigoId,zona_, setZone_,nominal, setNominal,mostrarIngreso, setMostrarIngreso,mostrarModal, setMostrarModal,
    modalDataInformation, setModalDatainformation,Reprogramacion,setReprogramcion,selectedReason, setSelectedReason,isEditing, setIsEditing,isAdd,setIsAdd,editableFieldsFechasMultiples,setEditableFieldsFechasMultiples,
    editableFieldsdispath, setEditableFieldsdispath} = useDispathProgramStados();

    const {pedidos,setPedidos
    } = usePedidosState();

    const { accessToken } = useAuth(); // Obtiene el Token del contexto de autenticación

   //Evento para detectar lo que ingresa el usuario
   const handleInputChange = (field, value) => {
    setEditableFieldsdispath({...editableFieldsdispath,[field]: value,});

    if (field === 'zone') {
      setSelectedZona(value);
    }
  };

  // Función para manejar cambios en las fechas múltiples
  const handleFechaChangeFechasMultiples = (date, location) => {
    // Encuentra el índice de la ubicación actual en el estado

     const formattedDate = format(date, 'yyyy-MM-dd');

     const updatedSelectedDates = { ...selectedDatePickerDate, [location]: date };

     setSelectedDatePickerDate(updatedSelectedDates);

     const index = editableFieldsFechasMultiples.findIndex((item) => item.id === selectedId);
  
     // Si la ubicación está en el estado, actualiza su fecha
     if (index !== -1) {
       const updatedFields = [...editableFieldsFechasMultiples];
       updatedFields[index].loading_dates_per_plant = formattedDate;
       setEditableFieldsFechasMultiples(updatedFields);

        // Actualiza el estado específico para la ubicación correspondiente
    switch (location) {
      case 'SJL':
        setFechasUbicacionesSJLUpdate((prevDates) => [...prevDates, { id: selectedId, location, dispatch_program: dispatch, loading_dates_per_plant: formattedDate }]);
        break;
      case 'PH':
        setFechasUbicacionesPHUpdate((prevDates) => [...prevDates, { id: selectedId, location, dispatch_program: dispatch, loading_dates_per_plant: formattedDate }]);
        break;
      case 'MILLA':
        setFechasUbicacionesMillaUpdate((prevDates) => [...prevDates, { id: selectedId, location, dispatch_program: dispatch, loading_dates_per_plant: formattedDate }]);
        break;
      case 'TREBOL':
        setFechasUbicacionesTrebolUpdate((prevDates) => [...prevDates, { id: selectedId, location, dispatch_program: dispatch, loading_dates_per_plant: formattedDate }]);
        break;
      default:
        break;
    }

     } else {
        //Si la ubicación no está en el estado, crea una nueva entrada
       setEditableFieldsFechasMultiples((prevFields) => [
         ...prevFields,
         { location, loading_dates_per_plant: formattedDate }
       ]);
     }
  };

   //Se utiliza datos de pedidos
   useEffect(() => {
    async function fetchData() {
      try {
        const resul = await ParametrizaionZona(accessToken);
        setUserOptions(resul);
      } catch (error) {
        console.log("Error al obtener los datos");
      }
    }
    fetchData();
  }, [setUserOptions,accessToken]);

  console.log("Lista de usuarios: ",userOptions);

     //Estado para controlar la seleccion de usuarios
     const [selectedZona, setSelectedZona] = useState(editableFieldsdispath.zone);

     
     const handleFechaChange = (date, location) => {

       const nuevaFecha = { dispatch_program: id, loading_dates_per_plant: date !== undefined ? date: null , location 
      };    
               // Actualizar el estado según la ubicación
               if (location === 'SJL') {
                 setFechasUbicacionesSJL((prevFechas) => [...prevFechas, nuevaFecha]);
                 console.log("Fecha de SJL: ",fechasUbicacionesSJL);
               } else if (location === 'PH') {
                 setFechasUbicacionesPH((prevFechas) => [...prevFechas, nuevaFecha]);
                 console.log("Fecha de PH: ",fechasUbicacionesPH);
               } else if (location === 'MILLA') {
                 setFechasUbicacionesMilla((prevFechas) => [...prevFechas, nuevaFecha]);
                 console.log("Fecha de la Milla: ",fechasUbicacionesMilla);
               } else if (location === 'TREBOL') {
                setFechasUbicacionesTrebol((prevFechas) => [...prevFechas, nuevaFecha]);
                console.log("Fechas de Trebol: ",fechasUbicacionesTrebol);
             }
 
       };

      //  console.log("Fechas Agrupdas estado: ",FechasAgrupadas);

  // Función para eliminar las fechas agregadas en SJL
    const handleEliminarFechaSJL = (index) => {
      const nuevasFechas = [...fechasUbicacionesSJL];
      nuevasFechas.splice(index, 1);
      setFechasUbicacionesSJL(nuevasFechas);
    };

    //Función para eliminar las fechas PH
    const handleEliminarFechaPH = (index) =>{
      const nuevaFechas = [...fechasUbicacionesPH];
      nuevaFechas.splice(index,1);
      setFechasUbicacionesPH(nuevaFechas);
    }

    //Función para eliminar las fechas MILLA
    const handleEliminarFechaMILLA = (index) => {
      const nuevasFechas = [...fechasUbicacionesMilla];
      nuevasFechas.splice(index,1);
      setFechasUbicacionesMilla(nuevasFechas);
    }

    //Función para eliminar las fechas TREBOL
    const handleEliminarFechaTREBOL = (index) => {
      const nuevaFechas = [...fechasUbicacionesTrebol];
      nuevaFechas.splice(index,1);
      setFechasUbicacionesTrebol(nuevaFechas);
    }

    //Evento para hacer clic y establecer en true para aditar

    const handleSetIsEditingTrue = async () =>{
      setIsEditing(true);
      setShowEliminarButton(false);
      // Actualizar editableFieldsFechasMultiples con la información más reciente
      const fechasMultiplesActualizadas = await getFechasMultiples(accessToken, codigoId);
      setEditableFieldsFechasMultiples(fechasMultiplesActualizadas);

       //Después de eliminar, actualiza el estado para reflejar el cambio
       setSelectedDatePickerDate(prevDates => ({
         ...prevDates,
         [selectedUbicacion]: null,
       }))
    }



    const handleRecuperarFecha = (id, dispatch_program, loading_dates_per_plant, ubicacion) => {
      setSelectedId(id);
      setFechasSelected(loading_dates_per_plant);
      setDispatch(dispatch_program);
      setShowEliminarButton(true);
      setSelectedUbicacion(ubicacion);
    
      if (loading_dates_per_plant) {
        const parsedDate = new Date(loading_dates_per_plant + 'T00:00:00');
        if (!isNaN(parsedDate.getTime())) {
          setSelectedDatePickerDate(prevDates => ({
            ...prevDates,
            [ubicacion]: parsedDate,
          }));
        } else {
          console.error("Fecha no válida:", loading_dates_per_plant);
          // Puedes manejar la lógica para fechas no válidas según tus necesidades
        }
      } else {
        console.log("Fecha no proporcionada");
        console.log("Ubicación:", ubicacion);
        // Resto del código
      }
    };

    useEffect(() => {
      console.log("Id recuperado de: ", id);
    }, [id]); // Este efecto se ejecutará cada vez que id cambi

        const handleGuardarDespacho = async () => {
          try {
            const nuevoObjeto = {
              zone: zona_,
              apt_nominal_capacity: nominal,
              exportation_id: fichaId, // Reemplaza con el valor real
            };
        
            // Llamar al servicio Agregar para guardar los datos
            await AddDispath(accessToken, nuevoObjeto);
        
            // Llama al servicio para listar con su ficha respectiva lo que se agregó con el servicio AddDispath
            const resultado = await findAllDispathPrograma(fichaId, accessToken);
        
            // Verifica que resultado sea un arreglo y contenga al menos un elemento
            if (!Array.isArray(resultado) || resultado.length === 0) {
              console.error('La respuesta del servicio AddDispath no tiene el formato esperado.');
              return;
            }
        
            const nuevoId = resultado[0].id || null;
            console.log("Id de identificación: ", nuevoId);
            setId(nuevoId);
        
            // Actualiza el ID de cada fecha antes de llamar a la función para guardar fechas
            const actualizarFechaConId = (fecha) => ({
              ...fecha,
              dispatch_program: nuevoId,
              loading_dates_per_plant: fecha.loading_dates_per_plant !== undefined ? fecha.loading_dates_per_plant : null,
            });
        
            const fechasConIdSJL = fechasUbicacionesSJL.map(actualizarFechaConId);
            const fechasConIdPH = fechasUbicacionesPH.map(actualizarFechaConId);
            const fechasConIdMilla = fechasUbicacionesMilla.map(actualizarFechaConId);
            const fechasConIdTrebol = fechasUbicacionesTrebol.map(actualizarFechaConId);
        
            // Lógica para guardar fechas múltiples para todas las ubicaciones
            await handleGuardarFechas(fechasConIdSJL, fechasConIdPH, fechasConIdMilla, fechasConIdTrebol);
        
            setDispath(resultado);
        
            await Update(accessToken, { id: fichaId, status: 'PACKAGED' });
            console.log('Ficha aprobada');
        
            const result = await findAllPedidosFichaId(fichaId, accessToken);
            setPedidos(result);
        
            setMostrarIngreso(!mostrarIngreso);
            setModalDatainformation({ title: 'Éxito', message: 'Información guardada exitosamente', icon: 'check' });
            setMostrarModal(true);
        
            window.location.href = `/features/exportaciones/ficha/predespacho/detalle/instructivo/?exportation_id=${fichaId}`;
        
          } catch (error) {
            console.log('Error al guardar los datos', error);
            setModalDatainformation({ title: 'Error', message: 'Ocurrió un error', icon: 'times' });
          }
        };


        const handleEliminarFechas = async (id) =>{
          try{
            await EliminarFechas(accessToken,id);
            // Actualizar editableFieldsFechasMultiples con la información más reciente
             const fechasMultiplesActualizadas = await getFechasMultiples(accessToken, codigoId);
              setEditableFieldsFechasMultiples(fechasMultiplesActualizadas);
              //Después de eliminar, actualiza el estado para reflejar el cambio
              setSelectedDatePickerDate(prevDates => ({
                ...prevDates,
                [selectedUbicacion]: null,
              }))
          }catch(error){
            console.error("Error al eliminar la fecha: ",error);
          }finally{
            setShowEliminarButton(false);
          }
        }

        /*
         Agregar una vez cargado
        */

         const handleGuardarDespachoAfter = async () => {
          let nuevoId = null; // Declarar nuevoId fuera del bloque if
          try {
           
            //Llama al servicio para listar con su ficha respectiva lo que se agrego con el servicio AddDispath
            const resultado = await findAllDispathPrograma(fichaId, accessToken);

            // Se verifica que resultado sea un arreglo y que contenga al menos un elemento
            if (Array.isArray(resultado) && resultado.length > 0) {
              nuevoId = resultado[0].id || null;
              console.log("Id de identificación: ",nuevoId);
              setId(nuevoId);
                
            // Actualizar el ID de cada fecha antes de llamar a la función para guardar fechas
            const fechasConIdSJL = fechasUbicacionesSJL.map((fecha) => ({
              ...fecha,
              dispatch_program: nuevoId,
              loading_dates_per_plant: fecha.loading_dates_per_plant !==undefined ? fecha.loading_dates_per_plant: null,
            }));

            const fechasConIdPH = fechasUbicacionesPH.map((fecha) => ({
              ...fecha,
              dispatch_program: nuevoId,
              loading_dates_per_plant: fecha.loading_dates_per_plant !==undefined ? fecha.loading_dates_per_plant: null,
            }));
             
            const fechasConIdMilla = fechasUbicacionesMilla.map((fecha) => ({
              ...fecha,
              dispatch_program: nuevoId,
              loading_dates_per_plant: fecha.loading_dates_per_plant !==undefined ? fecha.loading_dates_per_plant: null,
            }));

            const fechasConIdTrebol = fechasUbicacionesTrebol.map((fecha) => ({
              ...fecha,
              dispatch_program: nuevoId,
              loading_dates_per_plant: fecha.loading_dates_per_plant !==undefined ? fecha.loading_dates_per_plant: null,
            }));
        
            // Lógica para guardar fechas múltiples para todas las ubicaciones
            await handleGuardarFechas(fechasConIdSJL,fechasConIdPH,fechasConIdMilla,fechasConIdTrebol);
            await getFechasMultiples(accessToken, nuevoId);
            setIsAdd(false);

            // Actualizar editableFieldsFechasMultiples con la información más reciente
             const fechasMultiplesActualizadas = await getFechasMultiples(accessToken, codigoId);
              setEditableFieldsFechasMultiples(fechasMultiplesActualizadas);

          } else {
            console.error('La respuesta del servicio AddDispath no tiene el formato esperado.');
          }

             setDispath(resultado);
          
            setModalDatainformation({ title: 'Éxito', message: 'Fechas guardadas exitosamente', icon: 'check' });
            setMostrarModal(true);

          } catch (error) {
            console.log('Error al guardar los datos', error);
            setModalDatainformation({ title: 'Error', message: 'Ocurrió un error', icon: 'times' });
          }
        };


        

          // Función auxiliar para formatear las fechas
           const formatFechas = (fechasConId) => {
             return fechasConId.map((fecha) => ({
               ...fecha,
               loading_dates_per_plant: fecha.loading_dates_per_plant ? format(new Date(fecha.loading_dates_per_plant), 'yyyy-MM-dd'): null,
             }));
           };

          const handleGuardarFechas = async (fechasConIdSJL, fechasConIdPH, fechasConIdMilla, fechasConIdTrebol) => {
            try {
              // Formatea las fechas para cada ubicación
              const fechasFormateadasSJL = formatFechas(fechasConIdSJL);
              const fechasFormateadasPH = formatFechas(fechasConIdPH);
              const fechasFormateadasMilla = formatFechas(fechasConIdMilla);
              const fechasFormateadasTrebol = formatFechas(fechasConIdTrebol);
          
              // Llama al servicio para cada fecha y ubicación
              await Promise.all([
                ...fechasFormateadasSJL.map(async (fecha) => await fechasMultiples(accessToken, fecha)),
                ...fechasFormateadasPH.map(async (fecha) => await fechasMultiples(accessToken, fecha)),
                ...fechasFormateadasMilla.map(async (fecha) => await fechasMultiples(accessToken, fecha)),
                ...fechasFormateadasTrebol.map(async (fecha) => await fechasMultiples(accessToken, fecha)),
              ]);
          
              // Restablece el estado después de la llamada exitosa
              console.log('Agregación exitosa');
              setFechasUbicacionesSJL([]);
              setFechasUbicacionesPH([]);
              setFechasUbicacionesMilla([]);
              setFechasUbicacionesTrebol([]);
          
            } catch (error) {
              console.error('Error al almacenar las fechas múltiples', error);
              // Puedes manejar el error según tus necesidades
            }
          };

    //Evento para actualizar el valor del estado reprogramación y abrir el modal
    const handleReprogramacion = () =>{
      setReprogramcion(true);
    }

      //Evento para guardar cambios actualizados
    const handleGuardarCambiosActualizadosDispath = async () => {
      try {
        const objetoParaActualizar = {
          id: editableFieldsdispath.id,
          exportation_id: fichaId,
          zone: editableFieldsdispath.zone,
          apt_nominal_capacity: editableFieldsdispath.apt_nominal_capacity,
          reschedule_reason: selectedReason
        }
    
        await UpdateProgramDispath(accessToken, fichaId,objetoParaActualizar);
        setModalDatainformation({ title: "Éxito", message: "La información se actualizo correctamente",icon: 'check', });
        setMostrarModal(true);
        console.log('Ficha actualizada con éxito');

        handleGuardarFechasUpdate();
        setIsEditing(false);


    }catch(error) {
        console.error('Error al actualizar la ficha:', error);
        setModalDatainformation({ title: "Error", message: "Sucedio un Error",icon: 'times', });
      }
    };

      //Se utiliza datos de pedidos
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

    console.log("Pedidos: ",pedidos);


    const handleGuardarFechasUpdate = async () => {
      try {
        // Llama al servicio para cada fecha y ubicación
        await Promise.all([
          ...fechasUbicacionesSJLUpdate.map(async (fecha) => await UpdateDispathProgram(dispatch,accessToken, fecha)),
          ...fechasUbicacionesPHUpdate.map(async (fecha) => await UpdateDispathProgram(dispatch,accessToken, fecha)),
          ...fechasUbicacionesMillaUpdate.map(async (fecha) => await UpdateDispathProgram(dispatch,accessToken, fecha)),
          ...fechasUbicacionesTrebolUpdate.map(async (fecha) => await UpdateDispathProgram(dispatch,accessToken, fecha)),
        ]);
    
        // Restablece el estado después de la llamada exitosa
        console.log('Agregación exitosa');
        setFechasUbicacionesSJLUpdate([]);
        setFechasUbicacionesPHUpdate([]);
        setFechasUbicacionesMillaUpdate([]);
        setFechasUbicacionesTrebolUpdate([]);
    
      } catch (error) {
        console.error('Error al actualizar las', error);
        // Puedes manejar el error según tus necesidades
      }
    };


    //Se recupera los datos de recuperación para actualizar en el endpoint de DispathProgram

    useEffect(() => {
      console.log("ID obtenido:", fichaId); // Imprime el ID en la consola
      async function fetchData() {
        try {
          const resultado = await findAllDispathPrograma(fichaId, accessToken);
          console.log("Resultado de findAllDispathPrograma:", resultado);
          const fichaData = resultado.length > 0 ? resultado[0]: {};
           const idValue = fichaData ? fichaData.id : null;
           console.log("ID Value:", idValue);
           setCodigoId(idValue);  
           setDispath(fichaData);
           setEditableFieldsdispath({
            id: fichaData.id || "",
            zone: fichaData.zone || "",
            apt_nominal_capacity: fichaData.apt_nominal_capacity || "",
          })
          // Inicializa selectedUser con el valor existente si estás en modo de edición
         setSelectedZona(isEditing ? fichaData.zone || "" : "");
          setMostrarIngreso(resultado.length === 0)
        } catch (error) {
          console.log("Error al obtener los datos");
        }
      } 
      fetchData();
    }, [fichaId,setDispath,accessToken,setSelectedZona,isEditing,setCodigoId,setMostrarIngreso,setEditableFieldsdispath]);


    // Recupera fechas múltiples editables para cada ubicación
    useEffect(() => {
      const fetchEditableFieldsFechasMultiples = async (ubicacion) => {
        try {
          if (codigoId) {
            const fechasMultiples = await getFechasMultiples(accessToken, codigoId);
            // setFechasMultiples_(fechasMultiples);
    
            // Filtra fechas múltiples para la ubicación actual
            const fechasMultiplesUbicacion = fechasMultiples.filter((fecha) => fecha.location === ubicacion);
    
            // Si hay fechas múltiples para la ubicación actual, toma todas las fechas
            const editableFields = fechasMultiplesUbicacion.length > 0 ? fechasMultiplesUbicacion: [];
    
            // Imprime en consola para verificar
            console.log(`EditableFieldsFechasMultiples para ${ubicacion}:`, editableFields);
    
            // Actualiza el estado
            setEditableFieldsFechasMultiples((prevFields) => [...prevFields, ...editableFields]);
          }
        } catch (error) {
          console.error(`Error al obtener las fechas múltiples editables para ${ubicacion}`, error);
        }
      };
    
      // Puedes modificar esto según tus ubicaciones
      const ubicaciones = ["SJL", "PH", "MILLA", "TREBOL"];
    
      // Limpiar el estado antes de agregar nuevas fechas
      setEditableFieldsFechasMultiples([]);
    
      // Recorre las ubicaciones y recupera las fechas múltiples editables
      ubicaciones.forEach((ubicacion) => {
        fetchEditableFieldsFechasMultiples(ubicacion);
      });
    }, [codigoId, accessToken,setEditableFieldsFechasMultiples]);

    // console.log("fechas multiples con el estado inicial: ",fechasMultiples_);

    // Puedes imprimir en consola para verificar el estado final
    console.log('EditableFieldsFechasMultiples final:', editableFieldsFechasMultiples);

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

    console.log("Hola soy dispatch: ",dispath)

    console.log("mostrarIngreso:", mostrarIngreso);
    console.log("pedidos:", pedidos);
    console.log("ibk:", ibk);


  const fechasAgrupadas = editableFieldsFechasMultiples.reduce((acc, fecha) => {
    const { location, loading_dates_per_plant, id, dispatch_program } = fecha;
  
    if (!acc[location]) {
      acc[location] = [];
    }
  
    acc[location].push({ id, dispatch_program, loading_dates_per_plant: loading_dates_per_plant });
    return acc;
  }, { 'SJL': [], 'PH': [], 'MILLA': [], 'TREBOL': [] });

   
   
   console.log("Fechas Agrupadas: ", fechasAgrupadas);

   console.log("ID de fecha: ", selectedId);
   console.log("Fecha: ",fechaSelect);
   console.log("Numero de dispatch: ",dispatch);
   console.log("Fecha seleccionada: ",selectedDatePickerDate);

   console.log("Fecha por ubicación SJL:", fechasUbicacionesSJLUpdate);
   console.log("Fecha por ubicación PH: ",fechasUbicacionesPHUpdate);
   console.log("Fecha por ubicación Milla: ",fechasUbicacionesMillaUpdate);
   console.log("Fechas por ubicación TREBOL: ",fechasUbicacionesTrebolUpdate);

    
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZone: 'America/New_York' };
  
    // Crear una instancia de la fecha
    const date = new Date(dateString);
  
    // Formatear la fecha usando las opciones
    return date.toLocaleDateString('es-ES', options);
  };

  console.log("Valor de mostra ingreso: ",mostrarIngreso);
  console.log("Valor de editar: ",isEditing);
  console.log("Valor de Agregar: ",isAdd);

      return(
          <>

  {mostrarIngreso? (
            <>

              <h3>Programa de despacho</h3>

              <div className="detalle">
                      

                      <div className="detalle__body form">

                          {Array.isArray(pedidos) && pedidos.length > 0 && (
                          <>
                          <div className="detalle__body__col--uno">
                            <label>Cliente</label>
                            <div>
                              <input type="text" value={pedidos[0].customer_name} className="w-100" readOnly/>
                            </div>
                          </div>
                          </>
                        )}

                          <div className="detalle__body__col--uno">
                            <label>Zona</label>
                            <div>
                              <select 
                              value={zona_} 
                              onChange={(e) => setZone_(e.target.value)} 
                              className="selectorr w-100">
                                <option value="">Selecciona la zona</option>
                                {userOptions.map((zonaaaa,index) => (
                                  <option key={index} value={zonaaaa}>
                                    {zonaaaa}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>

                          {Array.isArray(pedidos) && pedidos.length > 0 && (
                          <>

                          <div className="detalle__body__col--uno">
                            <label>Nº de contenedores</label>
                            <div>
                              <input type="text" value={pedidos[0].exportation.total_containers} className="w-100"  readOnly/>
                            </div>
                          </div>

                          <div className="detalle__body__col--uno">
                            <label>San Juan de Lurigancho</label>
                            <div>
                              <input type="text" value={pedidos[0].exportation.san_juan_de_lurigancho} className="w-100" readOnly/>
                            </div>
                          </div>


                          <div className="detalle__body__col--uno">
                            <label>La Milla</label>
                            <div>
                              <input type="text" value={pedidos[0].exportation.la_milla} className="w-100" readOnly/>
                            </div>
                          </div>


                          <div className="detalle__body__col--uno">
                            <label>Punta Hermosa</label>
                            <div>
                              <input type="text" value={pedidos[0].exportation.punta_hermosa} className="w-100" readOnly/>
                            </div>
                          </div>

                          <div className="detalle__body__col--uno">
                            <label>TREBOL/ San Martin</label>
                            <div>
                              <input type="text" value={pedidos[0].exportation.trebol_san_martin} className="w-100" readOnly/>
                            </div>
                          </div>

                          </>
                          )}
                          
                          {Array.isArray(ibk) && ibk.length > 0 && (
                            <>
                          <div className="detalle__body__col--uno">
                            <label>Días de sobreestadía en origen</label>
                            <div>
                              <input type="text" value={ibk[0]?.overstay_days_origin} className="w-100" readOnly/>
                            </div>
                          </div>

                          <div className="detalle__body__col--uno">
                            <label>Fecha nave ETD</label>
                            <div>
                              <input 
                                type="text" 
                                value={ibk[0].expected_etd_date ? format(utcToZonedTime(new Date(`${ibk[0].expected_etd_date}T00:00:00`), 'UTC'),'dd/MM/yyyy') : '-'} className="w-100" readOnly
                              />
                            </div>
                          </div>
                          </>
                          )}

                        
                        <div className="detalle__body__col--uno">
                            <label>Capacidad nominal del APT</label>
                            <div>
                              <input type="text" id='apt_nominal_capacity' name='apt_nominal_capacity'
                              value={nominal}
                              onChange={(e) => setNominal(e.target.value)} 
                              className="w-100"/>
                            </div>
                          </div>

                              <div className="detalle__body__col--uno">
                                <label>Fechas de Carga de San juan de lurigancho</label>
                                <div>
                                  <DatePicker
                                    className="responsive-datepicker"
                                    selected={fechasUbicacionesSJL.length > 0 ? fechasUbicacionesSJL[fechasUbicacionesSJL.length - 1].loading_dates_per_plant : null}
                                    onChange={(date) => handleFechaChange(date, 'SJL')}
                                    dateFormat="dd/MM/yyyy"
                                    placeholderText="Selecciona fechas para SJL"
                                    // minDate={minDate}
                                  />
                                  {fechasUbicacionesSJL.map((fecha, index) => (
                                    <div className='pre' key={index}>
                                      <p >{`${fecha.loading_dates_per_plant.toLocaleDateString()}`}</p>
                                      <button
                                            type="button"
                                            className="signup-btn_a"
                                            onClick={() => handleEliminarFechaSJL(index)}
                                          >
                                            ❌
                                          </button>
                                    </div>
                                  ))}
                                  {/* Puedes agregar más DatePicker para otras ubicaciones */}
                                </div>
                              
                              </div>


                              <div className="detalle__body__col--uno">
                                <label>Fechas de Carga de San PH</label>
                                <div>
                                  <DatePicker
                                    className="responsive-datepicker"
                                    selected={fechasUbicacionesPH.length > 0 ? fechasUbicacionesPH[fechasUbicacionesPH.length - 1].loading_dates_per_plant : null}
                                    onChange={(date) => handleFechaChange(date, 'PH')}
                                    dateFormat="dd/MM/yyyy"
                                    placeholderText="Selecciona fechas para PH"
                                    // minDate={minDate}
                                  />
                                  {fechasUbicacionesPH.map((fecha, index) => (
                                    <div className='pre' key={index}>
                                      <p >{`${fecha.loading_dates_per_plant.toLocaleDateString()}`}</p>
                                      <button
                                            type="button"
                                            className="signup-btn_a"
                                            onClick={() => handleEliminarFechaPH(index)}
                                          >
                                            ❌
                                          </button>
                                    </div>
                                  ))}
                                  {/* Puedes agregar más DatePicker para otras ubicaciones */}
                                </div>
                              
                              </div>



                              <div className="detalle__body__col--uno">
                                <label>Fechas de Carga de Milla</label>
                                <div>
                                  <DatePicker
                                    className="responsive-datepicker"
                                    selected={fechasUbicacionesMilla.length > 0 ? fechasUbicacionesMilla[fechasUbicacionesMilla.length - 1].loading_dates_per_plant : null}
                                    onChange={(date) => handleFechaChange(date, 'MILLA')}
                                    dateFormat="dd/MM/yyyy"
                                    placeholderText="Selecciona fechas para MILLA"
                                    // minDate={minDate}
                                  />
                                  {fechasUbicacionesMilla.map((fecha, index) => (
                                    <div className='pre' key={index}>
                                      <p >{`${fecha.loading_dates_per_plant.toLocaleDateString()}`}</p>
                                      <button
                                            type="button"
                                            className="signup-btn_a"
                                            onClick={() => handleEliminarFechaMILLA(index)}
                                          >
                                            ❌
                                          </button>
                                    </div>
                                  ))}
                                  {/* Puedes agregar más DatePicker para otras ubicaciones */}
                                </div>
                              
                              </div>

                              <div className="detalle__body__col--uno">
                                <label>Fechas de Carga trebol</label>
                                <div>
                                  <DatePicker
                                    className="responsive-datepicker"
                                    selected={fechasUbicacionesTrebol.length > 0 ? fechasUbicacionesTrebol[fechasUbicacionesTrebol.length - 1].loading_dates_per_plant : null}
                                    onChange={(date) => handleFechaChange(date, 'TREBOL')}
                                    dateFormat="dd/MM/yyyy"
                                    placeholderText="Selecciona fechas para TREBOL"
                                    // minDate={minDate}
                                  />
                                  {fechasUbicacionesTrebol.map((fecha, index) => (
                                    <div className='pre' key={index}>
                                      <p >{`${fecha.loading_dates_per_plant.toLocaleDateString()}`}</p>
                                      <button
                                            type="button"
                                            className="signup-btn_a"
                                            onClick={() => handleEliminarFechaTREBOL(index)}
                                          >
                                            ❌
                                          </button>
                                    </div>
                                  ))}
                                  {/* Puedes agregar más DatePicker para otras ubicaciones */}
                                </div>
                              
                              </div>

                            {Array.isArray(ibk) && ibk.length > 0 && (
                          <div className="detalle__body__col--uno">
                            <label>Nombre de nave</label>
                            <div>
                              <input type="text" value={ibk[0]?.shipping_line} className="w-100" readOnly/>
                            </div>
                          </div>
                            )}
                              
                      </div>
              </div>

              <div className="text-center block-center">
                    <button className="btn btn__primary btn--ico" onClick={handleGuardarDespacho}>
                    <i className="bi bi-save"></i>
                      Guardar
                    </button>
              </div>
              </> 

         ): (
    <>

            <h3>Programa de despacho</h3>

            <div className="c">

              {Object.keys(dispath).length > 0 ? (
                        <div key={dispath.id} className="modif">
                        <p><strong>Fecha de creación:</strong> {formatDate(dispath.created_at) || 'N/A'}</p>
                        <p><strong>Fecha de actualización:</strong> {formatDate(dispath.updated_at) || 'N/A'}</p>
                      </div>
                    ) : (
                      <div>No hay datos disponibles</div>
               )}

                       {/* Se llama al evento en el boton de Reprogramación para abri el modal */}
                
                      <button className="btn btn__pedidos btn--ico"  onClick={handleReprogramacion}>
                        <i className="bi bi-pencil"></i>
                        Reprogramación</button>

                        {/* El modal se abre automáticamente y cuando se presiona cerrar se activa onClose y el estado de Reprogramación se actualiza a false */}
      
                      <MotivoReprogramacion
                        isOpen={Reprogramacion}
                        onClose={() => setReprogramcion(false)}
                        setIsEditing={setIsEditing}
                        onReasonSelected={setSelectedReason}
                        title="Motivo"
                      />  
            </div>


        <div className="detalle">
          
          <div className="detalle__body form">

              {Array.isArray(pedidos) && pedidos.length > 0 && (
              <>
              <div className="detalle__body__col--uno">
                <label>Cliente</label>
                <div>
                  <input type="text" value={pedidos[0].customer_name} className="w-100" readOnly/>
                </div>
              </div>
              </>
            )}

              {Object.keys(dispath).length > 0 ? (
              <>

              <div className="detalle__body__col--uno">
                   <label>Zona</label>
                      <div>
                          {isEditing ? (
                                <select className="h w-100 cc"
                                
                                  value={selectedZona}
                                  onChange={(e) => handleInputChange('zone', e.target.value)}
                                >
                                  <option value="">Selecciona la zona</option>
                                  {userOptions.map((zona, index) => (
                                    <option key={index} value={zona}>
                                      {zona}
                                    </option>
                                  ))}
                                </select>
                            ) : (
                              <input type="text" value={editableFieldsdispath.zone} className="w-100" readOnly />
                            )}
                          </div>
                      </div>
                      </>
                  ): (
                    <>
                    <p>No existe datos</p>
                    </>

                  )}

              {Array.isArray(pedidos) && pedidos.length > 0 && (
              <>

              <div className="detalle__body__col--uno">
                <label>Nº de contenedores</label>
                <div>
                  <input type="text" value={pedidos[0].exportation.total_containers} className="w-100"  readOnly/>
                </div>
              </div>

              <div className="detalle__body__col--uno">
                <label>San Juan de Lurigancho</label>
                <div>
                  <input type="text" value={pedidos[0].exportation.san_juan_de_lurigancho} className="w-100" readOnly/>
                </div>
              </div>


              <div className="detalle__body__col--uno">
                <label>La Milla</label>
                <div>
                  <input type="text" value={pedidos[0].exportation.la_milla} className="w-100" readOnly/>
                </div>
              </div>


              <div className="detalle__body__col--uno">
                <label>Punta Hermosa</label>
                <div>
                  <input type="text" value={pedidos[0].exportation.punta_hermosa} className="w-100" readOnly/>
                </div>
              </div>

              <div className="detalle__body__col--uno">
                <label>TREBOL/ San Martin</label>
                <div>
                  <input type="text" value={pedidos[0].exportation.trebol_san_martin} className="w-100" readOnly/>
                </div>
              </div>

              </>
              )}
              
              {Array.isArray(ibk) && ibk.length > 0 && (
                <>
              <div className="detalle__body__col--uno">
                <label>Días de sobreestadía en origen</label>
                <div>
                  <input type="text" value={ibk[0].overstay_days_origin} className="w-100" readOnly/>
                </div>
              </div>

              <div className="detalle__body__col--uno">
                  <label>Fecha nave ETD</label>
                  <div>
                    <input 
                      type="text"  
                      value={ibk[0].expected_etd_date 
                        ? format(utcToZonedTime(new Date(`${ibk[0].expected_etd_date}T00:00:00`), 'UTC'),'dd/MM/yyyy') : ''} className="w-100" readOnly
                    />
                  </div>
              </div>
              </>
              )}

            {Object.keys(dispath).length > 0 ? (
              <>
               <div className="detalle__body__col--uno">
                  <label>Capacidad nominal del APT</label>
                    <div>
                      {isEditing ? (
                        <input type="text" 
                        value={editableFieldsdispath.apt_nominal_capacity}
                        onChange={(e) => handleInputChange('apt_nominal_capacity', e.target.value)}
                        className='w-100'
                        />
                        ):(
                        <input type="text" value={editableFieldsdispath.apt_nominal_capacity} className='w-100' readOnly/>

                      )}
                  </div>
                </div>

                {/* Editar fechas agregadas */}

                {isEditing ? (
                      Object.keys(fechasAgrupadas).map((ubicacion, index) => {

                        const selectDate =  selectedDatePickerDate[ubicacion] || null;
                    
                        return (
                          <div className="detalle__body__col--uno" key={index}>
                            <label>{`Fechas de Carga de ${ubicacion}`}</label>
                            <div>
                              {/* Renderiza el DatePicker según sea necesario */}
                              <DatePicker
                                className="responsive-datepicker"
                                selected={selectDate}
                                onChange={(date) => handleFechaChangeFechasMultiples(date, ubicacion)}
                                dateFormat="dd/MM/yyyy"
                                placeholderText={`Selecciona fechas para ${ubicacion}`}
                              />

                              <div>
                                {/* Renderiza las fechas correspondientes con su ID y dispatch_program */}
                                {fechasAgrupadas[ubicacion].map(({ id, dispatch_program,loading_dates_per_plant }, fechaIndex) => (
                                  <div className='pre' key={fechaIndex}>
                                    <p>
                                      {loading_dates_per_plant ? format(utcToZonedTime(new Date(`${loading_dates_per_plant}T00:00:00`), 'UTC'), 'dd/MM/yyyy') : null}
                                    </p>
                                    <button
                                      type="button"
                                      className="signup-btn_a"
                                      onClick={() => handleRecuperarFecha(id,dispatch_program,loading_dates_per_plant, ubicacion)}
                                    >
                                      ✏️
                                    </button>

                                    {showEliminarButton && selectedUbicacion === ubicacion &&  selectedId === id &&(
                                      <button
                                      type='button'
                                      className="signup-btn_a_"
                                      onClick={() => handleEliminarFechas(selectedId)}
                                      >
                                      ❌
                                      </button>
                                    )}


                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        );
                      })
                    ) : isAdd ? (

                      <>

                  <div className="detalle__body__col--uno">
                                <label>FECHAS DE CARGA SJL</label>
                                <div>
                                  <DatePicker
                                    className="responsive-datepicker"
                                    selected={fechasUbicacionesSJL.length > 0 ? fechasUbicacionesSJL[fechasUbicacionesSJL.length - 1].loading_dates_per_plant : null}
                                    onChange={(date) => handleFechaChange(date, 'SJL')}
                                    dateFormat="dd/MM/yyyy"
                                    placeholderText="Selecciona fechas para SJL"
                                    // minDate={minDate}
                                  />
                                  {fechasUbicacionesSJL.map((fecha, index) => (
                                    <div className='pre' key={index}>
                                      <p >{`${fecha.loading_dates_per_plant.toLocaleDateString()}`}</p>
                                      <button
                                            type="button"
                                            className="signup-btn_a"
                                            onClick={() => handleEliminarFechaSJL(index)}
                                          >
                                            ❌
                                          </button>
                                    </div>
                                  ))}
                                  {/* Puedes agregar más DatePicker para otras ubicaciones */}
                                </div>
                              
                              </div>


                              <div className="detalle__body__col--uno">
                                <label>FECHAS DE CARGA PH</label>
                                <div>
                                  <DatePicker
                                    className="responsive-datepicker"
                                    selected={fechasUbicacionesPH.length > 0 ? fechasUbicacionesPH[fechasUbicacionesPH.length - 1].loading_dates_per_plant : null}
                                    onChange={(date) => handleFechaChange(date, 'PH')}
                                    dateFormat="dd/MM/yyyy"
                                    placeholderText="Selecciona fechas para PH"
                                    // minDate={minDate}
                                  />
                                  {fechasUbicacionesPH.map((fecha, index) => (
                                    <div className='pre' key={index}>
                                      <p >{`${fecha.loading_dates_per_plant.toLocaleDateString()}`}</p>
                                      <button
                                            type="button"
                                            className="signup-btn_a"
                                            onClick={() => handleEliminarFechaPH(index)}
                                          >
                                            ❌
                                          </button>
                                    </div>
                                  ))}
                                  {/* Puedes agregar más DatePicker para otras ubicaciones */}
                                </div>
                              
                              </div>



                              <div className="detalle__body__col--uno">
                                <label>FECHAS DE CARGA MILLA</label>
                                <div>
                                  <DatePicker
                                    className="responsive-datepicker"
                                    selected={fechasUbicacionesMilla.length > 0 ? fechasUbicacionesMilla[fechasUbicacionesMilla.length - 1].loading_dates_per_plant : null}
                                    onChange={(date) => handleFechaChange(date, 'MILLA')}
                                    dateFormat="dd/MM/yyyy"
                                    placeholderText="Selecciona fechas para MILLA"
                                    // minDate={minDate}
                                  />
                                  {fechasUbicacionesMilla.map((fecha, index) => (
                                    <div className='pre' key={index}>
                                      <p >{`${fecha.loading_dates_per_plant.toLocaleDateString()}`}</p>
                                      <button
                                            type="button"
                                            className="signup-btn_a"
                                            onClick={() => handleEliminarFechaMILLA(index)}
                                          >
                                            ❌
                                          </button>
                                    </div>
                                  ))}
                                  {/* Puedes agregar más DatePicker para otras ubicaciones */}
                                </div>
                              
                              </div>

                              <div className="detalle__body__col--uno">
                                <label>FECHAS DE CARGA TREBOL</label>
                                <div>
                                  <DatePicker
                                    className="responsive-datepicker"
                                    selected={fechasUbicacionesTrebol.length > 0 ? fechasUbicacionesTrebol[fechasUbicacionesTrebol.length - 1].loading_dates_per_plant : null}
                                    onChange={(date) => handleFechaChange(date, 'TREBOL')}
                                    dateFormat="dd/MM/yyyy"
                                    placeholderText="Selecciona fechas para TREBOL"
                                    // minDate={minDate}
                                  />
                                  {fechasUbicacionesTrebol.map((fecha, index) => (
                                    <div className='pre' key={index}>
                                      <p >{`${fecha.loading_dates_per_plant.toLocaleDateString()}`}</p>
                                      <button
                                            type="button"
                                            className="signup-btn_a"
                                            onClick={() => handleEliminarFechaTREBOL(index)}
                                          >
                                            ❌
                                          </button>
                                    </div>
                                  ))}
                                  {/* Puedes agregar más DatePicker para otras ubicaciones */}
                                </div>
                              
                              </div>


                      </>


                     ): (
                      ["SJL", "PH", "MILLA", "TREBOL"].map((ubicacion) => (
                        <div key={ubicacion} className="detalle__body__col--uno">
                          <label>{`FECHAS DE CARGA ${ubicacion}`}</label>
                          <div>
                            <textarea
                              className="w-100 textarea-scroll"
                              readOnly
                              value={fechasAgrupadas[ubicacion].map(({ loading_dates_per_plant }) => loading_dates_per_plant ? format(utcToZonedTime(new Date(`${loading_dates_per_plant}T00:00:00`), 'UTC'), 'dd/MM/yyyy') : null
                              ).join('\n')}
                            />
                          </div>
                        </div>
                      ))
                    )} 
                
                       {/* Agregar más fechas */}

              </>
          ): (
            <>
            <p>No existen datos</p>
            </>
          )}

                {Array.isArray(ibk) && ibk.length > 0 && (
              <div className="detalle__body__col--uno">
                <label>Nombre de nave</label>
                <div>
                  <input type="text" value={ibk[0]?.ship_name} className="w-100" readOnly/>
                </div>
              </div>
              )}
                  
          </div>
    </div>

    
  <div className="text-center block-center">
        
  {!isEditing && !isAdd && (
        <button className="btn btn__primary btn--ico m-2" onClick={handleSetIsEditingTrue}>
          <i className="bi bi-pencil-square"></i> Editar
        </button>
      )}
      
      {isEditing && (
        <>
          <button className="btn btn__primary btn--ico m-2" onClick={handleGuardarCambiosActualizadosDispath}>
            <i className="bi bi-check-square"></i> Guardar Cambios
          </button>
          <button className="btn btn__secondary btn--ico m-2" onClick={() => setIsEditing(false)}>
            <i className="bi bi-x"></i> Cancelar
          </button>
        </>
      )}

      {!isEditing && !isAdd && (
        <button className="btn btn__primary btn--ico m-2" onClick={() => setIsAdd(true)}>
          <i className="bi bi-pencil-square"></i> Agregar fechas
        </button>
      )}

      {isAdd && (
        <>
          <button className="btn btn__primary btn--ico m-2" onClick={handleGuardarDespachoAfter}>
            <i className="bi bi-check-square"></i> Guardar Cambios
          </button>
          <button className="btn btn__secondary btn--ico m-2" onClick={() => setIsAdd(false)}>
            <i className="bi bi-x"></i> Cancelar
          </button>
        </>
      )}

        </div>

    </>
            
  )} 


            
              {/* Modal para mostrar mensaje */}
        {mostrarModal && (
          <div className="confirmation-modal">
            <div className="confirmation-modal__content">
            {modalDataInformation.icon === 'check' && <FaCheck size={30} color="green" style={{ margin: ' 0 auto' }}/>} {/* Tamaño y color personalizables */}
            {modalDataInformation.icon === 'times' && <FaTimes size={30} color="red" style={{ margin: ' 0 auto' }}/>} {/* Tamaño y color personalizables */}
            <p className='error_Tdata'>{modalDataInformation.message}</p>
            <div className="customModal__buttons ">
              <button className="btn btn__primary" onClick={() => setMostrarModal(false)}>Cerrar</button>
            </div> 
            </div>
          </div>
        )}
  
  
          </>
      );
  }