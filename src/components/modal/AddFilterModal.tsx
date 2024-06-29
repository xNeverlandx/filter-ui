import React, {useState} from 'react';
import './Modal.css';
import {ConditionType, CriteriaDto, FilterDto} from "../types";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {RadioButtonGroup} from "../RadioButtonGroup";
import {useYupValidation} from "../useYupValidation/useYupValidation";
import {modalSchema} from "./modalSchema";

interface AddFilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (filter: FilterDto) => void;
  isModal?: boolean;
}

const initialState: FilterDto = {
  filterId: null,
  name: '',
  criteriaDtoList: [],
}

export const AddFilterModal = (props: AddFilterModalProps) => {
  const [filter, setFilter] = useState<FilterDto>(initialState);
  const newDate = new Date();

  const { validate, errors, clearErrors } = useYupValidation(modalSchema);

  const addCriteria = () => {
    clearErrors("criteriaDtoList");
    setFilter({
      ...filter,
      criteriaDtoList: [...filter.criteriaDtoList, { criteriaId: null, type: 'Amount', condition: 'More', criteriaValue: '', selected: false}]
    });
  };

  const getParentFieldError = (fieldName: string) => {
    return errors[fieldName];
  };

  const removeCriteria = (index: number) => {
    const newCriteria = [...filter.criteriaDtoList];
    newCriteria.splice(index, 1);
    setFilter({ ...filter, criteriaDtoList: newCriteria });
  };

  const handleInputChange = (index: number, key: keyof CriteriaDto, value: string | undefined | boolean) => {
    const newCriteria = [...filter.criteriaDtoList];
    newCriteria[index] = { ...newCriteria[index], [key]: value };
    setFilter({ ...filter, criteriaDtoList: newCriteria });
  };

  const handleSelected = (index: number) => {
    const updatedCriteria = filter.criteriaDtoList.map((criteria, i) => ({
      ...criteria,
      selected: i === index,
    }));
    setFilter({...filter, criteriaDtoList: updatedCriteria});
  }

  const handleValidation = async () => {
    await validate(filter, () => handleSave());
  };

  const handleSave = () => {
    props.onSave(filter);
    props.onClose();
    setFilter(initialState);
  }

  const handleClose = () => {
    clearErrors("criteriaDtoList");
    props.onClose();
    setFilter(initialState);
  }


  if (!props.isOpen) return null;

  return (
    <div className={`${props.isModal ? 'dialog-overlay' : 'non-modal'}`}>
      <div className="dialog">
        <div className="dialog-header">
          <h2>Filter</h2>
          <button className="close-btn" onClick={handleClose}>&times;</button>
        </div>
        <div className="dialog-body">
          <div className="form-group">
            <label htmlFor="filter-name">Filter name</label>
            <input
              id="filter-name"
              type="text"
              value={filter.name}
              onChange={(e) => setFilter({ ...filter, name: e.target.value })}
            />
          </div>
          <div className="form-group">
            <h5 className="error-message">
              {getParentFieldError('criteriaDtoList')}
            </h5>
            <label>Criteria</label>
            {filter.criteriaDtoList.map((criteria, index) => (
              <div key={index} className="criteria-row">
                <select
                  value={criteria.type}
                  onChange={(e) => handleInputChange(index, 'type', e.target.value)}
                >
                  <option value="Amount">Amount</option>
                  <option value="Title">Title</option>
                  <option value="Date">Date</option>
                </select>
                {criteria.type === 'Amount' && (
                  <>
                    <select
                      value={criteria.condition}
                      onChange={(e) => handleInputChange(index, 'condition', e.target.value as ConditionType)}
                    >
                      <option value="More">More</option>
                      <option value="Less">Less</option>
                      <option value="Equal">Equal</option>
                    </select>
                    <input
                      type="number"
                      value={criteria.criteriaValue}
                      onChange={(e) => handleInputChange(index, 'criteriaValue', e.target.value)}
                    />
                  </>
                )}
                {criteria.type === 'Title' && (
                  <>
                    <select
                      value={criteria.condition}
                      onChange={(e) => handleInputChange(index, 'condition', e.target.value as ConditionType)}
                    >
                      <option value="Starts with">Starts with</option>
                      <option value="Contains">Contains</option>
                      <option value="Ends with">Ends with</option>
                    </select>
                    <input
                      type="text"
                      value={criteria.criteriaValue}
                      onChange={(e) => handleInputChange(index, 'criteriaValue', e.target.value)}
                    />
                  </>
                )}
                {criteria.type === 'Date' && (
                  <>
                    <select
                      value={criteria.condition}
                      onChange={(e) => handleInputChange(index, 'condition', e.target.value as ConditionType)}
                    >
                      <option value="From">From</option>
                      <option value="To">To</option>
                    </select>
                    <DatePicker
                      selected={criteria.criteriaValue === '' ? newDate : new Date(criteria.criteriaValue)}
                      onChange={(date) => handleInputChange(index, 'criteriaValue', String(date))}
                    />
                  </>
                )}
                <button className="remove-btn" onClick={() => removeCriteria(index)}>-</button>
              </div>
            ))
            }
            <button className="add-row-btn" onClick={() => addCriteria()}>+ Add Row</button>
          </div>
          <RadioButtonGroup
            criteria={filter.criteriaDtoList}
            handleSelected={handleSelected}
          />
        </div>
        <div className="dialog-footer">
          <button className="close-btn" onClick={handleClose}>Close</button>
          <button className="save-btn" onClick={handleValidation}>Save</button>
        </div>
      </div>
    </div>
  );
}