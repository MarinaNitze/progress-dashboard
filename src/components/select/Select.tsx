import React from 'react';
import ReactSelect, {components, OptionProps } from 'react-select';

  type selectProps = {
    selectOptions: {value: string; label: string}[];
    isMulti: boolean;
    handleChange: Function;
    value: any;
    id: string;
    name: string;
  }

export default function Select({selectOptions, isMulti, handleChange, value, id, name}: selectProps) {

const Option = (props: typeof OptionProps) => {
  return (
    <components.Option {...props}>
      <input type="checkbox" checked={props.isSelected} onChange={()=>null}/> <span>{props.data.label}</span>
    </components.Option>
  );
};

return (
  <ReactSelect
    options={selectOptions}
    style={{boxShadow: 'none'}}
    isMulti={isMulti}
    closeMenuOnSelect={!isMulti}
    hideSelectedOptions={false}
    components={isMulti ? {Option} : null }
    onChange={handleChange}
    allowSelectAll={isMulti}
    value={value}
    id={id}
    name={name}
  />
)

}