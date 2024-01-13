import { useState } from "react";

export function useFichasState(){

    const [fichas,setFichas] = useState([]);
    const [showFilter, setShowFilter] = useState(false);
    const [sellOrganizationFilter, setSellOrganizationFilter] = useState('');
    const [responsibleuserFilter, setResponsible] = useState('');
    const [codeRelactionFilter, setCodeRelations] = useState('');
    const [proformaFilter,setProforma] =  useState('');
    const [hasAppliedFilter, setHasAppliedFilter] = useState(false);

    return{
        fichas,setFichas,
        showFilter,setShowFilter,
        sellOrganizationFilter,setSellOrganizationFilter,
        responsibleuserFilter,setResponsible,
        codeRelactionFilter,setCodeRelations,
        proformaFilter,setProforma,
        hasAppliedFilter,setHasAppliedFilter   
    };
}