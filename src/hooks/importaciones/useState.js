import { useState } from 'react';

// Estado inicial (puede ser null u otro valor predeterminado)
const initialState = null;

// Creamos un estado global
export const useIdState = () => {
  const [id, setId] = useState(initialState);

  // Función para actualizar el ID
  const setIdValue = (newId) => {
    setId(newId);
  };

  return { id, setIdValue };
};