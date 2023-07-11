import React, { useEffect, useState } from 'react';
import './CustomSelect.css';
import ExpandMore from '../../share/assets/vector/ExpandMore.svg';
import ExpandLess from '../../share/assets/vector/ExpandLess.svg';
import IconSelected from '../../share/assets/vector/IconSelected.svg';
import useComponentVisible from '../../utils/useComponentVisible';
import { InputParams, OptionType } from '../../interfaces';

type Props = {
  listOptions: OptionType[];
  name: string;
  onChange: (inputParam: InputParams) => void;
  placeholder?: string;
  selectedValue?: string | number;
};

const getValue = (item: OptionType, key: 'id' | 'name'): string | number => {
  return typeof item === 'object' ? item[key] : item;
};
const getNameFromSelectedValue = (value: string | number, listOptions: OptionType[]): OptionType => {
  let returnValue: OptionType = value;
  if (listOptions.length && typeof listOptions[0] === 'object') {
    const selectedItem = listOptions.find((item) => {
      return typeof item === 'object' && item.id === value;
    });
    if (selectedItem) {
      returnValue = selectedItem;
    }
  }
  return returnValue;
};

const CustomSelect = (props: Props) => {
  const [ref, isComponentVisible, setIsComponentVisible] = useComponentVisible(false);

  const [value, setValue] = useState<OptionType>(
    props.selectedValue ? getNameFromSelectedValue(props.selectedValue, props.listOptions) : '',
  );

  const [colorSelect, setColorSelect] = useState(value ? 'text-black' : 'text-grey-1');
  const [showOutlineText, setShowOutlineText] = useState(false);

  const handleShowDropdown = () => {
    setIsComponentVisible(!isComponentVisible);
  };

  const handleOnSelectedOption = (item: OptionType) => {
    setValue(item);
  };

  useEffect(() => {
    if (isComponentVisible || value) {
      setShowOutlineText(true);
      setColorSelect('text-black');
      if (value) {
        props.onChange({
          body: {
            name: props.name,
            value: getValue(value, 'id'),
          },
        });
      }
    } else {
      setShowOutlineText(false);
      setColorSelect('text-grey-1');
    }
  }, [isComponentVisible, value]);

  return (
    <div ref={ref}>
      <div className={`custom-select-container ${colorSelect}`} onClick={handleShowDropdown}>
        {showOutlineText && (
          <label
            htmlFor="inputSelect"
            className={`custom-select-container__label ${isComponentVisible ? 'text-accent-1' : 'text-grey-5'}`}
          >
            {props.placeholder}
          </label>
        )}
        <div className={`custom-select ${isComponentVisible ? 'border-accent-1' : 'border-grey-3'}`}>
          <div className="custom-select-header">
            <p className="custom-select-header__placeholder">{getValue(value, 'name') || props.placeholder}</p>
            <img alt="icon" src={isComponentVisible ? ExpandLess : ExpandMore} />
          </div>
        </div>
        {isComponentVisible && (
          <div className="custom-select__dropdown ">
            {props.listOptions.map((item, index) => (
              <div className="custom-select-option" key={index} onClick={() => handleOnSelectedOption(item)}>
                <p className="custom-select-option__label">{getValue(item, 'name')}</p>
                {getValue(item, 'id') === value ? <img alt="iconSelected" src={IconSelected} /> : <></>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomSelect;
