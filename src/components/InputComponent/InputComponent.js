import React, { useState } from 'react';
import './InputComponent.scss';

function InputComponent({ label, id, className, type, required, error }) {
    const [inputFocused, setInputFocused] = useState(false);
    const [value, setValue] = useState("");

    return <div className={`custom-input ${className}`}>
        <label htmlFor={id} className={`custom-input__label ${inputFocused && 'custom-input__label--focused'} ${value && 'custom-input__label--notempty'}`}>
            {label}
        </label>
        <input type={type} id={id} onFocus={() => setInputFocused(true)} onBlur={() => setInputFocused(false)} value={value} onChange={(e) => setValue(e.target.value)} required={required}/>
    </div>;
}

export default InputComponent;
