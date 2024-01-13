import { useEffect,useState,useMemo } from 'react';
import { findAllAditional} from "../../../../../../hooks/exportaciones/useAditionalProcess";
import { useAuth } from "../../../../../../contexts/Authutils";
import { PostAditionalInformation } from '../../../../../../services/exportaciones/AdditionalInformation';
import { format,} from 'date-fns';
// import { utcToZonedTime } from 'date-fns-tz';
import { AdditionalInformation } from '../../../../../../services/exportaciones/AdditionalInformation';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCheck, FaTimes } from 'react-icons/fa';
// import { utcToZonedTime } from 'date-fns-tz';
import { isValid } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import { UpdateAdditionalInformation } from '../../../../../../services/exportaciones/AdditionalInformation';

export function AdicionalPage() {

  const [data, setData] = useState([]);
  const { accessToken } = useAuth(); // Obtiene el Token del contexto de autenticación
  // const [observaciones, setObservaciones] = useState('');

  const fichaId = localStorage.getItem('fichaId');


  //Estado para fecha de dem_send_date
  const [danSen, setDanSen] = useState(null);
  //Estado para fecha bl_review
  const [blReview, setBlReview] = useState(null);
  //Estado para numero entero
  const [palletsNumber, setPalletsNumber] = useState("");

  //Estado para solictud
  const [requestDate,setRequestData] = useState(null);

  //Estado para clr_date
  const [clrDate,setClrDate] = useState(null);

  //Estado para clrCode
  const [clrCode,setClrCode] = useState("");
  
  //Factura
  const [lowersInvoice, setLowersInvoice] = useState("");

  //plLower
  const [plLowers,setPlLowers] = useState("");

  //oascar
  const [oascrExcelent,setOascrExcel] = useState("");

  //additional
  const [adtionalInformation,setAddicionalInformacion] = useState(null);

  //doct
  const [docRespect,setDocRespet] = useState(null);
  
  //Origin
  const [origin,setOrigin] = useState("");

  //damco
  const [damcoInvoiceNumber,setDamcoInvoiceNumber] = useState("");

  //dhl
  const [dlhDocs,setDlhDocs] = useState(null);

  //Observations
  const [observationsReport,setObservationReport] = useState("");

  // const [listarAdicional,setAdicional] = useState([]);

  const [mostrarIngreso, setMostrarIngreso] = useState(true); // Nuevo estado para controlar qué sección mostrar
  const [mostrarModal, setMostrarModal] = useState(false);

  const [modalDataInformation, setModalDatainformation] = useState({
    title: "",
    message: "",
    icon: "",
  });



  //Configuración para editar



  
  //Objeto para almacenar los contenidos de ibk relacionado a la ficha


  //Estado para editar los campos de fichas de exportación
    
  //1) Se crea el estado para editar
  const [isEditing, setIsEditing] = useState(false);

  //2) Se crea valores para la edición
  const [editableFieldsaddicional, setEditableFieldsaddicional] = useState({
    id: 0,
    dam_send_date:  null,
    bl_review_date: null,
    pallets_boxes_number:  0,
    bk_request_date: null,
    clr_date: null,
    clr_code: "",
    lowers_invoice: "",
    pl_lowers: "",
    oascr: "",
    additional_docs_upload_date: null,
    docs_receipt_confirmation_date: null,
    origin_expenses: "",
    damco_invoices_number: "",
    dhl_docs_send_date: null,
    observations: "",
  });


  //Evento para guardar cambios actualizados
  const handleGuardarCambiosActualizados = async () => {
    try {
      const objetoParaActualizar = {
        id: editableFieldsaddicional.id,
        exportation_id: fichaId,
        dam_send_date: editableFieldsaddicional.dam_send_date,
        bl_review_date: editableFieldsaddicional.bl_review_date,
        pallets_boxes_number: editableFieldsaddicional.pallets_boxes_number,
        bk_request_date: editableFieldsaddicional.bk_request_date,
        clr_date: editableFieldsaddicional.clr_date,
        clr_code: editableFieldsaddicional.clr_code,
        lowers_invoice: editableFieldsaddicional.lowers_invoice,
        pl_lowers: editableFieldsaddicional.pl_lowers,
        oascr: editableFieldsaddicional.oascr,
        additional_docs_upload_date: editableFieldsaddicional.additional_docs_upload_date,
        docs_receipt_confirmation_date: editableFieldsaddicional.docs_receipt_confirmation_date,
        origin_expenses: editableFieldsaddicional.origin_expenses,
        damco_invoices_number: editableFieldsaddicional.damco_invoices_number,
        dhl_docs_send_date: editableFieldsaddicional.dhl_docs_send_date,
        observations: editableFieldsaddicional.observations,
      }
  
     const result =   await UpdateAdditionalInformation(accessToken, fichaId,objetoParaActualizar);
      setEditableFieldsaddicional(result);
      setModalDatainformation({ title: "Éxito", message: "La información se actualizo correctamente",icon: 'check', });
      setMostrarModal(true);
      console.log('Ficha actualizada con éxito');

    setIsEditing(false);

  }catch(error) {
      console.error('Error al actualizar la ficha:', error);
      setModalDatainformation({ title: "Error", message: "Sucedio un Error",icon: 'times', });
    }
  };

  //Evento para detectar lo que ingresa el usuario
  const handleInputChange = (field, value) => {
    setEditableFieldsaddicional({
      ...editableFieldsaddicional,
      [field]: value,
    });
    
  };

   // Función para manejar el cambio de fecha en el modo de edición
   const handleDateChange = (field, date) => {
    setEditableFieldsaddicional((prevFields) => ({
      ...prevFields,
      [field]: date instanceof Date ? format(utcToZonedTime(date, 'UTC'), 'yyyy-MM-dd') : null,
    }));
  };


  // // Función para formatear la fecha para mostrarla en modo de solo lectura
  //  const formatDateForDisplay = (date) => (isValid(date) ? format(utcToZonedTime(date, 'UTC'), 'dd/MM/yyyy') : '-');


  const minDate = useMemo(() => {
    const date = new Date();
    date.setMonth(date.getMonth() - 12);
    return date;
  }, []);

  const handleGuardar = async () => {
    try {
      // Crear el objeto con los datos del formulario

      const fecha1 = danSen ? `${format(danSen, 'yyyy-MM-dd')}` : null;
      const fecha2 = blReview ? `${format(blReview, 'yyyy-MM-dd')}` : null;
      const fecha3 = requestDate ? `${format(requestDate, 'yyyy-MM-dd')}`: null;
      const fecha4 = clrDate ? `${format(clrDate, 'yyyy-MM-dd')}`: null;
      const fecha6 = adtionalInformation ? `${format(adtionalInformation, 'yyyy-MM-dd')}`: null;
      const fecha7 = docRespect ? `${format(docRespect, 'yyyy-MM-dd')}`: null;
      const fecha8 = dlhDocs ? `${format(dlhDocs, 'yyyy-MM-dd')}`: null;

      const nuevoObjeto = {
        dam_send_date:  fecha1,
        bl_review_date: fecha2,
        pallets_boxes_number: palletsNumber || 0,
        bk_request_date: fecha3,
        clr_date: fecha4,
        clr_code: clrCode,
        lowers_invoice: lowersInvoice,
        pl_lowers: plLowers,
        oascr: oascrExcelent,
        additional_docs_upload_date: fecha6,
        docs_receipt_confirmation_date: fecha7,
        origin_expenses: origin,
        damco_invoices_number: damcoInvoiceNumber,
        dhl_docs_send_date: fecha8,
        observations: observationsReport,
        exportation_id: fichaId, // Reemplaza con el valor real
      };

      // Llamar al servicio Agregar para guardar los datos
      await PostAditionalInformation(accessToken, nuevoObjeto);

      const resultado = await AdditionalInformation(fichaId, accessToken);
      setData(resultado);

      // await Update(accessToken, { id: fichaId, status: 'APPROVED' });
      // console.log('Ficha aprobada');

      // window.location.href =  "/features/exportaciones/fichas";

      await AdditionalInformation(fichaId, accessToken);
      setMostrarIngreso(!mostrarIngreso);
      setModalDatainformation({ title: "Éxito", message: "Información guardado exitosamente",icon: 'check', });
      setMostrarModal(true);

    } catch (error) {
      console.log("Error al guardar los datos",error);
      setModalDatainformation({ title: "Error", message: "Sucedio un Error",icon: 'times', });
    }
  };

  // // Función para formatear la fecha para mostrarla en modo de solo lectura
  const formatDateForDisplay = (date) => (isValid(date) ? format(utcToZonedTime(date, 'UTC'), 'dd/MM/yyyy') : '-');


  useEffect(() => {
    console.log("ID obtenido:", fichaId); // Imprime el ID en la consola
    async function fetchData() {
      try {
        const resultado = await findAllAditional(fichaId, accessToken);
        setData(resultado);
      } catch (error) {
        console.log("Error al obtener los datos");
      }
    }
    fetchData();
  }, [fichaId,setData,accessToken]);

  console.log("Id: ",data);

  



    //Recuperar los datos para actualizar información
    useEffect(() => {
      console.log("ID obtenido:", fichaId); // Imprime el ID en la consola
      async function fetchData() {
        try {
          const resultado = await AdditionalInformation(fichaId, accessToken);
          const fichaData = resultado.length > 0 ? resultado[0] : {};
          setData(fichaData);
          setEditableFieldsaddicional({  
            id: fichaData.id,
            dam_send_date: fichaData.dam_send_date,
            bl_review_date: fichaData.bl_review_date,
            pallets_boxes_number: fichaData.pallets_boxes_number,
            bk_request_date: fichaData.bk_request_date,
            clr_date: fichaData.clr_date,
            clr_code: fichaData.clr_code,
            lowers_invoice: fichaData.lowers_invoice,
            pl_lowers: fichaData.pl_lowers,
            oascr: fichaData.oascr,
            additional_docs_upload_date: fichaData.additional_docs_upload_date,
            docs_receipt_confirmation_date: fichaData.docs_receipt_confirmation_date,
            origin_expenses: fichaData.origin_expenses,
            damco_invoices_number: fichaData.damco_invoices_number,
            dhl_docs_send_date: fichaData.dhl_docs_send_date,
            observations: fichaData.observations,
           })
          console.log("Resultado de información adicional:", resultado);
          setMostrarIngreso(resultado.length === 0)
        } catch (error) {
          console.log("Error al obtener los datos");
        }
      } 
      fetchData();
    }, [fichaId,setData,setEditableFieldsaddicional,accessToken]);

    console.log("Resultado: ",editableFieldsaddicional);

    console.log("Resultado de adicional: ",data);


    return(
        <>

            <h3>Información adicional</h3>

        {mostrarIngreso ? (
            <>

             <div className="detalle">

                    <div className="detalle__body form">

                 
                        <div className="detalle__body__col--uno">
                          <label>Fecha envío DAM</label>
                          <div>
                              
                          <DatePicker
                            className="responsive-datepicker"
                            selected={danSen}
                            onChange={(date) => setDanSen(date)}
                            dateFormat="dd/MM/yyyy"
                            placeholderText="Selecciona fecha"
                            minDate={minDate}
                            maxDate={null}
                          /> 
                            
                          </div>
                        </div>

                        <div className="detalle__body__col--uno">
                          <label>Fecha revisión BL</label>
                          <div>
                          <DatePicker
                            className="responsive-datepicker"
                            selected={blReview}
                            onChange={(date) => setBlReview(date)}
                            dateFormat="dd/MM/yyyy"
                            placeholderText="Selecciona fecha"
                            minDate={minDate}
                            maxDate={null}
                          /> 
                          </div>
                        </div>

                        <div className="detalle__body__col--uno">
                          <label>Nº de paletas / cajas</label>
                          <div>
                            <input type="text" id='pallets_boxes_number' name='pallets_boxes_number' value={palletsNumber} onChange={(e) => setPalletsNumber(e.target.value)} className="w-100"/>
                          </div>
                        </div>


                        <div className="detalle__body__col--uno">
                          <label>Solicitud BK DAMCO </label>
                          <div>
                          <DatePicker
                            className="responsive-datepicker"
                            selected={requestDate}
                            onChange={(date) => setRequestData(date)}
                            dateFormat="dd/MM/yyyy"
                            placeholderText="Selecciona fecha"
                            minDate={minDate}
                            maxDate={null}
                          /> 
                          </div>
                        </div>

                        <div className="detalle__body__col--uno">
                          <label>CLR (fecha)</label>
                          <div>
                          <DatePicker
                            className="responsive-datepicker"
                            selected={clrDate}
                            onChange={(date) => setClrDate(date)}
                            dateFormat="dd/MM/yyyy"
                            placeholderText="Selecciona fecha"
                            minDate={minDate}
                            maxDate={null}
                          /> 
                          </div>
                        </div>


                        <div className="detalle__body__col--uno">
                          <label>Código CLR</label>
                          <div>
                            <input type='text' id='clr_code' name='clr_name' value={clrCode} onChange={(e) => setClrCode(e.target.value)} className='w-100'/>
                          </div>
                        </div>


                        <div className="detalle__body__col--uno">
                          <label>Factura lowes</label>
                          <div>
                            <input type="text" id='lowers_invoice' name='lowers_invoice' value={lowersInvoice}  onChange={(e) => setLowersInvoice(e.target.value)} className="w-100"/>
                          </div>
                        </div>
                        <div className="detalle__body__col--uno">
                          <label>PL lowes</label>
                           <div>
                            <input type="text" value={plLowers}  onChange={(e) => setPlLowers(e.target.value)}  className="w-100"/>
                          </div>
                        </div>


                        <div className="detalle__body__col--uno">
                          <label>OASCR</label>
                           <div>
                            <input type="text" value= {oascrExcelent} onChange={(e) => setOascrExcel(e.target.value)} className="w-100"/>
                          </div>
                        </div>


                        <div className="detalle__body__col--uno">
                          <label>Fecha de subido de documentos adic.</label>
                           <div>
                           <DatePicker
                            className="responsive-datepicker"
                            selected={adtionalInformation}
                            onChange={(date) => setAddicionalInformacion(date)}
                            dateFormat="dd/MM/yyyy"
                            placeholderText="Selecciona fecha"
                            minDate={minDate}
                            maxDate={null}
                          /> 
                          </div>
                        </div>


                        <div className="detalle__body__col--uno">
                          <label>Fecha de confirmación de recepción</label>
                           <div>
                           <DatePicker
                            className="responsive-datepicker"
                            selected={docRespect}
                            onChange={(date) => setDocRespet(date)}
                            dateFormat="dd/MM/yyyy"
                            placeholderText="Selecciona fecha"
                            minDate={minDate}
                            maxDate={null}
                          /> 
                          </div>
                        </div>


                        <div className="detalle__body__col--uno">
                          <label>Pago/gastos origen</label>
                           <div>
                            <input type="text" value={origin}  onChange={(e) => setOrigin(e.target.value)}  className="w-100"/>
                          </div>
                        </div>



                        <div className="detalle__body__col--uno">
                          <label>Factura MAERSK</label>
                           <div>
                            <input type="text" value={damcoInvoiceNumber} onChange={(e) => setDamcoInvoiceNumber(e.target.value)} className="w-100"/>
                          </div>
                        </div>



                        <div className="detalle__body__col--uno">
                          <label>Fecha de factura MAERSK</label>
                           <div>
                           <DatePicker
                            className="responsive-datepicker"
                            selected={dlhDocs}
                            onChange={(date) => setDlhDocs(date)}
                            dateFormat="dd/MM/yyyy"
                            placeholderText="Selecciona fecha"
                            minDate={minDate}
                            maxDate={null}
                          /> 
                          </div>
                        </div>


                        <div className="detalle__body__col--tres">
                          <label>Observaciones</label>
                           <div>
                            <textarea rows={5} 
                            value={observationsReport}
                            onChange={(e) => setObservationReport(e.target.value)}  
                            className="w-100"></textarea>
                          </div>
                        </div>

                        <div className="text-center block-center">
                            <button className="btn btn__primary" onClick={handleGuardar}>Guardar</button>
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

                      <div key={data.id} className="detalle__body__col--uno">
                        <label>Fecha envío DAM</label>
                        <div>
                        {isEditing ? (
                                <DatePicker
                                  className="responsive-datepicker"
                                  selected={editableFieldsaddicional.dam_send_date ? new Date(editableFieldsaddicional.dam_send_date + 'T00:00:00') : null}
                                  onChange={(date) => handleDateChange('dam_send_date', date)}
                                  dateFormat="dd/MM/yyyy"
                                  placeholderText="Selecciona fecha"
                                  minDate={minDate}
                                  maxDate={null}
                                />
                              ) : (
                                <input
                                  type="text"
                                  value={formatDateForDisplay(editableFieldsaddicional.dam_send_date ? new Date(`${editableFieldsaddicional.dam_send_date}T00:00:00`) : null)}
                                  className="ww-100"
                                  readOnly
                                />
                              )}
                        </div>
                      </div>

                      <div className="detalle__body__col--uno">
                        <label>Fecha revisión BL</label>
                        <div>
                        {isEditing ? (
                                <DatePicker
                                  className="responsive-datepicker"
                                  selected={editableFieldsaddicional.bl_review_date ? new Date(editableFieldsaddicional.bl_review_date + 'T00:00:00') : null}
                                  onChange={(date) => handleDateChange('bl_review_date', date)}
                                  dateFormat="dd/MM/yyyy"
                                  placeholderText="Selecciona fecha"
                                  minDate={minDate}
                                  maxDate={null}
                                />
                              ) : (
                                <input
                                  type="text"
                                  value={formatDateForDisplay(editableFieldsaddicional.bl_review_date ? new Date(`${editableFieldsaddicional.bl_review_date}T00:00:00`) : null)}
                                  className="ww-100"
                                  readOnly
                                />
                              )}
                        </div>
                      </div>

                      <div className="detalle__body__col--uno">
                        <label>Nº de paletas / cajas</label>
                        <div>
                        {isEditing ? (
                              <input type="text" 
                              value={editableFieldsaddicional.pallets_boxes_number}
                              onChange={(e) => handleInputChange('pallets_boxes_number', e.target.value)}
                              className='w-100'
                              />
                            ):(
                              <input type="text" value={editableFieldsaddicional.pallets_boxes_number} className='w-100' readOnly/>

                            )}
                        </div>
                      </div>


                      <div className="detalle__body__col--uno">
                        <label>Solicitud BK DAMCO </label>
                        <div>
                        {isEditing ? (
                                <DatePicker
                                  className="responsive-datepicker"
                                  selected={editableFieldsaddicional.bk_request_date ? new Date(editableFieldsaddicional.bk_request_date + 'T00:00:00') : null}
                                  onChange={(date) => handleDateChange('bk_request_date', date)}
                                  dateFormat="dd/MM/yyyy"
                                  placeholderText="Selecciona fecha"
                                  minDate={minDate}
                                  maxDate={null}
                                />
                              ) : (
                                <input
                                  type="text"
                                  value={formatDateForDisplay(editableFieldsaddicional.bk_request_date ? new Date(`${editableFieldsaddicional.bk_request_date}T00:00:00`) : null)}
                                  className="ww-100"
                                  readOnly
                                />
                              )}
                        </div>
                      </div>

                      <div className="detalle__body__col--uno">
                        <label>CLR (fecha)</label>
                        <div>
                        {isEditing ? (
                                <DatePicker
                                  className="responsive-datepicker"
                                  selected={editableFieldsaddicional.clr_date ? new Date(editableFieldsaddicional.clr_date + 'T00:00:00') : null}
                                  onChange={(date) => handleDateChange('clr_date', date)}
                                  dateFormat="dd/MM/yyyy"
                                  placeholderText="Selecciona fecha"
                                  minDate={minDate}
                                  maxDate={null}
                                />
                              ) : (
                                <input
                                  type="text"
                                  value={formatDateForDisplay(editableFieldsaddicional.clr_date ? new Date(`${editableFieldsaddicional.clr_date}T00:00:00`) : null)}
                                  className="ww-100"
                                  readOnly
                                />
                              )}
                        </div>
                      </div>


                      <div className="detalle__body__col--uno">
                        <label>Código CLR</label>
                        <div>
                        {isEditing ? (
                              <input type="text" 
                              value={editableFieldsaddicional.clr_code}
                              onChange={(e) => handleInputChange('clr_code', e.target.value)}
                              className='w-100'
                              />
                            ):(
                              <input type="text" value={editableFieldsaddicional.clr_code} className='w-100' readOnly/>

                            )}
                        </div>
                      </div>


                      <div className="detalle__body__col--uno">
                        <label>Factura lowes</label>
                        <div>
                        {isEditing ? (
                              <input type="text" 
                              value={editableFieldsaddicional.lowers_invoice}
                              onChange={(e) => handleInputChange('lowers_invoice', e.target.value)}
                              className='ww-100'
                              />
                            ):(
                              <input type="text" value={editableFieldsaddicional.lowers_invoice} className='ww-100' readOnly/>

                            )}
                        </div>
                      </div>
                      <div className="detalle__body__col--uno">
                        <label>PL lowes</label>
                        <div>
                        {isEditing ? (
                              <input type="text" 
                              value={editableFieldsaddicional.pl_lowers}
                              onChange={(e) => handleInputChange('pl_lowers', e.target.value)}
                              className='ww-100'
                              />
                            ):(
                              <input type="text" value={editableFieldsaddicional.pl_lowers} className='ww-100' readOnly/>

                            )}
                        </div>
                      </div>


                      <div className="detalle__body__col--uno">
                        <label>OASCR</label>
                        <div>
                        {isEditing ? (
                              <input type="text" 
                              value={editableFieldsaddicional.oascr}
                              onChange={(e) => handleInputChange('oascr', e.target.value)}
                              className='w-100'
                              />
                            ):(
                              <input type="text" value={editableFieldsaddicional.oascr} className='w-100' readOnly/>

                            )}
                        </div>
                      </div>


                      <div className="detalle__body__col--uno">
                        <label>Fecha de subido de documentos adic.</label>
                        <div>
                        {isEditing ? (
                                <DatePicker
                                  className="responsive-datepicker"
                                  selected={editableFieldsaddicional.additional_docs_upload_date ? new Date(editableFieldsaddicional.additional_docs_upload_date) : null}
                                  onChange={(date) => handleDateChange('additional_docs_upload_date', date)}
                                  dateFormat="dd/MM/yyyy"
                                  placeholderText="Selecciona fecha"
                                  minDate={minDate}
                                  maxDate={null}
                                />
                              ) : (
                                <input
                                  type="text"
                                  value={formatDateForDisplay(editableFieldsaddicional.additional_docs_upload_date ? new Date(editableFieldsaddicional.additional_docs_upload_date) : null)}
                                  className="ww-100"
                                  readOnly
                                />
                              )}
                        </div>
                      </div>


                      <div className="detalle__body__col--uno">
                        <label>Fecha de confirmación de recepción</label>
                        <div>
                        {isEditing ? (
                                <DatePicker
                                  className="responsive-datepicker"
                                  selected={editableFieldsaddicional.docs_receipt_confirmation_date ? new Date(editableFieldsaddicional.docs_receipt_confirmation_date) : null}
                                  onChange={(date) => handleDateChange('docs_receipt_confirmation_date', date)}
                                  dateFormat="dd/MM/yyyy"
                                  placeholderText="Selecciona fecha"
                                  minDate={minDate}
                                  maxDate={null}
                                />
                              ) : (
                                <input
                                  type="text"
                                  value={formatDateForDisplay(editableFieldsaddicional.docs_receipt_confirmation_date ? new Date(editableFieldsaddicional.docs_receipt_confirmation_date) : null)}
                                  className="ww-100"
                                  readOnly
                                />
                              )}
                        </div>
                      </div>


                      <div className="detalle__body__col--uno">
                        <label>Pago/gastos origen</label>
                        <div>
                        {isEditing ? (
                              <input type="text" 
                              value={editableFieldsaddicional.origin_expenses}
                              onChange={(e) => handleInputChange('origin_expenses', e.target.value)}
                              className='w-100'
                              />
                            ):(
                              <input type="text" value={editableFieldsaddicional.origin_expenses} className='w-100' readOnly/>

                            )}
                        </div>
                      </div>



                      <div className="detalle__body__col--uno">
                        <label>N° Factura MAERSK</label>
                        <div>
                        {isEditing ? (
                              <input type="text" 
                              value={editableFieldsaddicional.damco_invoices_number}
                              onChange={(e) => handleInputChange('damco_invoices_number', e.target.value)}
                              className='ww-100'
                              />
                            ):(
                              <input type="text" value={editableFieldsaddicional.damco_invoices_number} className='ww-100' readOnly/>

                            )}
                        </div>
                      </div>



                      <div className="detalle__body__col--uno">
                        <label>Fecha de factura MAERSK</label>
                        <div>
                        {isEditing ? (
                                <DatePicker
                                  className="responsive-datepicker"
                                  selected={editableFieldsaddicional.dhl_docs_send_date ? new Date(editableFieldsaddicional.dhl_docs_send_date + 'T00:00:00') : null}
                                  onChange={(date) => handleDateChange('dhl_docs_send_date', date)}
                                  dateFormat="dd/MM/yyyy"
                                  placeholderText="Selecciona fecha"
                                  minDate={minDate}
                                  maxDate={null}
                                />
                              ) : (
                                <input
                                  type="text"
                                  value={formatDateForDisplay(editableFieldsaddicional.dhl_docs_send_date ? new Date(`${editableFieldsaddicional.dhl_docs_send_date}T00:00:00`) : null)}
                                  className="ww-100"
                                  readOnly
                                />
                              )}
                        </div>
                      </div>


                      <div className="detalle__body__col--tres">
                        <label>Observaciones</label>
                        <div>
                        {isEditing ? (
                              <input type="text" 
                              value={editableFieldsaddicional.observations}
                              onChange={(e) => handleInputChange('observations', e.target.value)}
                              className='w-100'
                              />
                            ):(
                              <input type="text" value={editableFieldsaddicional.observations} className='w-100' readOnly/>

                            )}
                        </div>
                      </div>

                      </>

                       ): (
                          <>
                          <p>No existe datos</p>
                          </>
                         )} 

                       <div className="text-center block-center">

                        
                      {!isEditing && (
                      
                      <button className="btn btn__primary btn--ico m-2" onClick={() => setIsEditing(true)}>
                        <i className="bi bi-pencil-square"></i> Editar
                      </button>

                    )}
                    {isEditing && (
                      <>
                        <button className="btn btn__primary btn--ico m-2" onClick={handleGuardarCambiosActualizados}>
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


                      {/* Modal para mostrar mensaje */}
              {mostrarModal && (
                <div className="confirmation-modal">
                  <div className="confirmation-modal__content">
                  {modalDataInformation.icon === 'check' && <FaCheck size={30} color="green" style={{ margin: ' 0 auto' }}/>} {/* Tamaño y color personalizables */}
                  {modalDataInformation.icon === 'times' && <FaTimes size={30} color="red" style={{ margin: ' 0 auto' }} />} {/* Tamaño y color personalizables */}
                  <p className='error_Tdata'>{modalDataInformation.message}</p>
                  <div className="customModal__buttons">
                  <button className="btn btn__primary" onClick={() => setMostrarModal(false)}>Cerrar</button>
                  </div>
                  </div>
                </div>
              )}
 
        </>
    );
}