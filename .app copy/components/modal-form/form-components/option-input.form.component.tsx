export interface ModalFormOptionInputProps {
  htmlFor: string;
  label: string;
  placeholder?: string;
  className?: string;
}

import { Select } from 'antd';

import { getCountryDataList } from 'countries-list';

export const ModalFormOptionInput = (props: ModalFormOptionInputProps) => {
  const countries = getCountryDataList();
  const options = countries.map((country) => {
    return {
      value: country.name,
    };
  });

  return <Select showSearch options={options} placeholder={props.placeholder} className={props.className} />;
};
