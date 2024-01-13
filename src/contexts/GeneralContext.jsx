// useGeneralState.js
import { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

const GeneralStateContext = createContext();

export const GeneralStateProvider = ({ children }) => {
  const [actionAccepted, setActionAccepted] = useState(false);

  const values = {
    actionAccepted,
    setActionAccepted,
  };

  return (
    <GeneralStateContext.Provider value={values}>
      {children}
    </GeneralStateContext.Provider>
  );
};

GeneralStateProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };

export const useGeneralState = () => {
  return useContext(GeneralStateContext);
};