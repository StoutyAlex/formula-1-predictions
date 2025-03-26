import type { Color } from 'antd/es/color-picker';
import { ModalFormColourInput } from '../modal-form/form-components/colour-input.form.component';
import { ModalFormOptionInput } from '../modal-form/form-components/option-input.form.component';
import { ModalFormTextInput } from '../modal-form/form-components/text-input.form.component';
import { Modal } from '../modal.component';

import { Button, ColorPicker, Form, Input, Select, type FormProps } from 'antd';
import { useEffect, useState } from 'react';
import { AggregationColor } from 'antd/es/color-picker/color';
import { getCountryDataList } from 'countries-list';

interface CreateDriverFormValues {
  name: string;
  color: AggregationColor;
  country: string;
}

export interface ModalFormProps {
  open: boolean;
  onCancel?: () => void;
}

export const CreateConstructorModalForm = (props: ModalFormProps) => {
  const [formValues, setFormValues] = useState<CreateDriverFormValues>({
    name: '',
    color: new AggregationColor('#000000'),
    country: '',
  });

  const countries = getCountryDataList();
  const options = countries.map((country) => {
    return {
      value: country.name,
    };
  });

  const onFinishFailed: FormProps['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const onValuesChange: FormProps['onValuesChange'] = (changedValues) => {
    setFormValues({ ...formValues, ...changedValues });
  };

  useEffect(() => {
    console.log('formValues', formValues);
  }, [formValues]);

  return (
    <Modal title="Create Constructor" open={props.open} onCancel={props.onCancel}>
      <Form
        id="createConstructor"
        layout="vertical"
        onSubmitCapture={(value) => console.log('submit', value)}
        onFinishFailed={onFinishFailed}
        onValuesChange={onValuesChange}
      >
        <div className="flex md:flex-row w-full md:gap-4 flex-col">
          <Form.Item label="Name" name="name" className="w-full">
            <Input value={formValues.name} placeholder='Constructor name'/>
          </Form.Item>
          <Form.Item label="Color" name="color">
            <ColorPicker value={formValues.color} defaultValue={formValues.color} showText />
          </Form.Item>
        </div>
        <Form.Item label="Country" className="w-full" name="country">
          <Select value={formValues.country} showSearch placeholder="Select a country" options={options} className="w-full" />
        </Form.Item>
      </Form>
    </Modal>
  );
};
