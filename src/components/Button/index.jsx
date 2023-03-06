import React from 'react';
import './button.css'

const Button = ({ onClick, label, disabled = false, classes = '', role = 'button' }) => {
  return <button
    disabled={disabled}
    onClick={onClick}
    className={`button ${classes}`}
    role={role}
  >
    {label}
  </button>;
}

export default Button;
