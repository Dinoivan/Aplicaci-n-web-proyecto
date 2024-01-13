import { useState } from "react";

export function usePedidosState() {

  const [pedidos, setPedidos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [orderCreationDataFilter,setOrderCreationDataFilter] = useState('');
  const [orderNumberFilter, setOrderNumberFilter] = useState('');
  const [customerNameFilter, setCustomerNameFilter] = useState('');
  const [sellOrganizationFilter, setSellOrganizationFilter] = useState('');
  const [customerNumberFilter,setCutsomerNumberFilter] = useState('');
  const [hasAppliedFilter, setHasAppliedFilter] = useState(false);
  


  return {
    pedidos,
    setPedidos,
    isModalOpen,
    setIsModalOpen,
    isEditModalOpen,
    setIsEditModalOpen,
    showFilter,
    setShowFilter,
    orderCreationDataFilter,
    setOrderCreationDataFilter,
    orderNumberFilter,
    setOrderNumberFilter,
    customerNameFilter,
    setCustomerNameFilter,
    sellOrganizationFilter,
    setSellOrganizationFilter,
    customerNumberFilter,
    setCutsomerNumberFilter,
    hasAppliedFilter,setHasAppliedFilter
  };
}