import { useState } from "react";

export function useDispathProgramStados(){

    const [ibk,setibk] = useState({});
    const [dispath,setDispath] = useState({});
    
    //Estado para almacenar las opciones disponibles de zonas
    const [userOptions, setUserOptions] = useState([]);


    // const [minDate, setMinDate] = useState(new Date());

    // Estado para manejar las fechas y ubicaciones seleccionadas
  const [fechasUbicacionesSJL, setFechasUbicacionesSJL] = useState([]);
  const [fechasUbicacionesPH, setFechasUbicacionesPH] = useState([]);

  const [fechasUbicacionesMilla, setFechasUbicacionesMilla] = useState([]);
  const [fechasUbicacionesTrebol, setFechasUbicacionesTrebol] = useState([]);

  const [selectedId, setSelectedId] = useState(null);
  const [fechaSelect,setFechasSelected] = useState(null);
  const [dispatch,setDispatch] = useState(null);
  const [selectedDatePickerDate, setSelectedDatePickerDate] = useState({});

  //Estado para guardar por locación especifica 

  const [fechasUbicacionesSJLUpdate, setFechasUbicacionesSJLUpdate] = useState([]);
  const [fechasUbicacionesPHUpdate, setFechasUbicacionesPHUpdate] = useState([]);

  const [fechasUbicacionesMillaUpdate, setFechasUbicacionesMillaUpdate] = useState([]);
  const [fechasUbicacionesTrebolUpdate, setFechasUbicacionesTrebolUpdate] = useState([]);

  //Elimina fecha
  const [showEliminarButton,setShowEliminarButton] = useState(false);
  const [selectedUbicacion, setSelectedUbicacion] = useState("");

  // const [FechasAgrupadas, setFechasAgrupadas] = useState([]);

  const [id, setId] = useState(null);

  const [codigoId, setCodigoId] = useState(null);

  //Estado que sirve para guardar las fechas mútliples
  // const [fechasMultiples_, setFechasMultiples_] = useState([]);

  //Estado para almacenar la zona y la capacidad nominal
  const [zona_, setZone_] = useState("");
  const [nominal, setNominal] = useState("");

  //Estado para mostrar la vista una vez que se ingreso los datos y el estado para que salga un modal de validación
  const [mostrarIngreso, setMostrarIngreso] = useState(true); // Nuevo estado para controlar qué sección mostrar
  const [mostrarModal, setMostrarModal] = useState(false);

  //Este estado sirve para guardar mensajes, icones y titulos para que el usuario pueda visualizar
  const [modalDataInformation, setModalDatainformation] = useState({
    title: "",
    message: "",
    icon: "",
  });

   // Se crea un estado para abri el modal de reprogramación 
   const [Reprogramacion,setReprogramcion] = useState(false);

   //Se crea un estado para guardar el tipo de razon seleccionada
   const [selectedReason, setSelectedReason] = useState(""); // Agrega este estado
 
 
    //Actualizar
 
    //Estado para editar los campos de fichas de exportación
    const [isEditing, setIsEditing] = useState(false);
    const [isAdd,setIsAdd] = useState(false);
 
    //Estado para editar los campos de fechas múltiples
    const [editableFieldsFechasMultiples,setEditableFieldsFechasMultiples] = useState([]);
 
 
 
   //Objeto para almacenar los contenidos de ibk relacionado a la ficha
   const [editableFieldsdispath, setEditableFieldsdispath] = useState({
     id: 0,
     zone: "",
     apt_nominal_capacity: "",
 
   });

    return{
        ibk,setibk,
        dispath,setDispath,
        userOptions,setUserOptions,
        fechasUbicacionesSJL,setFechasUbicacionesSJL,
        fechasUbicacionesPH,setFechasUbicacionesPH,
        fechasUbicacionesMilla,setFechasUbicacionesMilla,
        fechasUbicacionesTrebol,setFechasUbicacionesTrebol,
        selectedId,setSelectedId,
        fechaSelect,setFechasSelected,
        selectedDatePickerDate,setSelectedDatePickerDate,
        fechasUbicacionesSJLUpdate,setFechasUbicacionesSJLUpdate,
        fechasUbicacionesPHUpdate,setFechasUbicacionesPHUpdate,
        fechasUbicacionesMillaUpdate,setFechasUbicacionesMillaUpdate,
        fechasUbicacionesTrebolUpdate,setFechasUbicacionesTrebolUpdate,
        showEliminarButton,setShowEliminarButton,
        selectedUbicacion,setSelectedUbicacion,
        id,setId,
        codigoId,setCodigoId,
        zona_,setZone_,
        nominal,setNominal,
        mostrarIngreso,setMostrarIngreso,
        mostrarModal,setMostrarModal,
        modalDataInformation,setModalDatainformation,
        dispatch,setDispatch,
        Reprogramacion,setReprogramcion,
        selectedReason,setSelectedReason,
        isAdd,setIsAdd,
        editableFieldsFechasMultiples,setEditableFieldsFechasMultiples,
        editableFieldsdispath,setEditableFieldsdispath,
        isEditing,setIsEditing,

    };
}