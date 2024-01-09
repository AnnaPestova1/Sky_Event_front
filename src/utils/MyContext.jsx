// eslint-disable-next-line no-unused-vars
import React, { createContext, useState } from "react";
import PropTypes from "prop-types";
export const AuthContext = createContext();
const ContextWrapper = ({ children }) => {
  const [isRegistered, setIsRegistered] = useState(false);
  return (
    <AuthContext.Provider value={{ isRegistered, setIsRegistered }}>
      {children}
    </AuthContext.Provider>
  );
};
ContextWrapper.propTypes = {
  children: PropTypes.node.isRequired
};
export default ContextWrapper;
