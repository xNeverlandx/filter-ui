import React from 'react';
import {CriteriaDto} from "./types";

interface RadioButtonGroupProps {
  criteria: CriteriaDto[];
  handleSelected: (index: number) => void;
}

export const RadioButtonGroup = (props: RadioButtonGroupProps) => {
  return (
    <div className="form-group">
      <label>Selection</label>
      <div className="selection-options">
        {props.criteria.map((option, index) => (
          <label key={index}>
            <input
              type="radio"
              name="criteria"
              value={index}
              checked={option.selected}
              onChange={() => props.handleSelected(index)}
            />
            {"Select " + (index + 1)}
          </label>
        ))}
      </div>
    </div>
  );
}