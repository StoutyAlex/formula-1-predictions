import { Modal } from '../modal.component';

import { ColorPicker, Form, Input, Select, type FormProps } from 'antd';
import { useState } from 'react';
import { AggregationColor } from 'antd/es/color-picker/color';
import { getCountryDataList } from 'countries-list';

export interface CreateDriverRequest {
  name: string;
  color: string;
  country: string;
  drivers: string[];
}

interface CreateDriverFormValues extends Omit<CreateDriverRequest, 'color'> {
  color: AggregationColor;
}

export interface ModalFormProps {
  method?: string;
  action?: string;
  open: boolean;
  onCancel?: () => void;
  onSubmit?: (values: CreateDriverRequest) => void;
}

export const UpsertConstructorModalForm = (props: ModalFormProps) => {
  const [formValues, setFormValues] = useState<CreateDriverFormValues>({
    name: '',
    color: new AggregationColor('#000000'),
    country: '',
    drivers: [],
  });

  const countries = getCountryDataList();
  const options = countries.map((country) => {
    return {
      value: country.name,
    };
  });

  const onSubmit = (value: CreateDriverFormValues) => {
    props.onSubmit?.({
      name: value.name,
      color: value.color.toHexString(),
      country: value.country,
      drivers: [],
    });
  };

  return (
    <Modal title="Create Constructor" open={props.open} onCancel={props.onCancel}>
      <Form id="createConstructor" layout="vertical" onFinish={onSubmit} method={props.method} action={props.action}>
        <div className="flex md:flex-row w-full md:gap-4 flex-col">
          <Form.Item label="Name" name="name" className="w-full" rules={[{ required: true, message: 'Please input a name!' }]}>
            <Input value={formValues.name} placeholder="Constructor name" />
          </Form.Item>
          <Form.Item label="Color" name="color" rules={[{ required: true, message: 'Please select a color!' }]}>
            <ColorPicker value={formValues.color} defaultValue={formValues.color} showText />
          </Form.Item>
        </div>
        <Form.Item
          label="Country"
          className="w-full"
          name="country"
          rules={[{ required: true, message: 'Please select a country!' }]}
        >
          <Select value={formValues.country} showSearch placeholder="Select a country" options={options} className="w-full" />
        </Form.Item>
      </Form>
    </Modal>
  );
};
