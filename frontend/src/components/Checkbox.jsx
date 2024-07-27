import React from "react";
import "../styles/Checkbox.css";

const Checkbox = ({ label, value, onChange }) => {
    return (
      <label className="check-label"> 
        <input type="checkbox" 
        checked={value}
        onChange={onChange} />
        {label}
      </label>
    );
  };

  export default Checkbox