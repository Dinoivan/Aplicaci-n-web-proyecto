import { useState } from "react";

export function useGeneralState() {

    const [actionAccepted, setActionAccepted] = useState(false); // Nueva variable de estado
    
  return {
    actionAccepted,
    setActionAccepted,
  };
}