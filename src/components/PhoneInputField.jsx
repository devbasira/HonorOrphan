// components/PhoneInputField.jsx
import React from 'react';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';

const PhoneInputField = ({
  value,
  onChange,
  placeholder = "WhatsApp Number*",
  error = ""
}) => {
  return (
    <div className="w-full">
      <PhoneInput
        defaultCountry="in"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full"
        inputClassName={`p-2 h-[45px] text-center text-[#1a6864] placeholder:text-[#1a6864] text-md bg-[#e5e5e5] border ${
          error ? 'border-red-500' : 'border-gray-400'
        } rounded-lg outline-none w-full`}
        styles={{
          button: {
            backgroundColor: '#e5e5e5',
            border: 'none',
            paddingRight: '8px',
          },
          dropdown: {
            zIndex: 50,
          },
        }}
      />
      {error && (
        <p className="text-sm text-red-600 mt-1 text-center">{error}</p>
      )}
    </div>
  );
};

export default PhoneInputField;
