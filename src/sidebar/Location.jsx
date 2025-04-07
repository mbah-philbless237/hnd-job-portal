import React from "react";
import Inputfield from "../components/inputfield";

const Location = ({ handleChange }) => {
  return (
    <div>
      <h4 className="text-lg font-medium mb-2">Location</h4>
      <div>
        <label className="sidebar-label-container">
          <input
            type="radio"
            name="test"
            id="test"
            value=""
            onChange={handleChange}
          />
          <span className="checkmark"></span>ALL
        </label>

        <Inputfield
          handleChange={handleChange}
          value="Bamenda"
          title="Bamenda"
          name="test"
         />
          
        <Inputfield
        handleChange={handleChange}
        value="Yaounde"
        title="Yaounde"
        name="test"
        />
      <Inputfield
        handleChange={handleChange}
        value="Douala"
        title="Douala"
        name="test"
        /> 
         <Inputfield
        handleChange={handleChange}
        value="Buea"
        title="Buea"
        name="test"
        /> 
      </div>
    </div>
  );
};

export default Location;
