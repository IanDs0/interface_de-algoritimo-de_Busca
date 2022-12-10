import React from 'react';

import './index.css';

const Button = ({ children, onClick, disabled }) => {
  return (
    <button isDisabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
