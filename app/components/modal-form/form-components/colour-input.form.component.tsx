import { useState } from 'react';

import { ColorPicker, Input, type ColorPickerProps, type GetProp } from 'antd';
import { AggregationColor } from 'antd/es/color-picker/color';

export interface ModalFormColourInputProps {
  htmlFor: string;
  label: string;
  placeholder?: string;
  className?: string;
}

type Color = Extract<GetProp<ColorPickerProps, 'value'>, string | { cleared: any }>;

export const ModalFormColourInput = (props: ModalFormColourInputProps) => {
  const [colorHex, setColorHex] = useState<Color>('#000000');

  const onChange = (value: AggregationColor) => {
    setColorHex(value.toHexString().toUpperCase());
  };

  return (
    <div className={props.className}>
      <div className="flex justify-between align-middle gap-2">
        <Input value={colorHex.toString()} onChange={(e) => setColorHex(e.target.value)}/>
        <div>
          <ColorPicker className="h-full w-12" format="hex" value={colorHex} onChangeComplete={onChange} onChange={onChange}>
            <div className="w-12 rounded-lg border h-full border-none" style={{ backgroundColor: colorHex.toString() }} />
          </ColorPicker>
        </div>
      </div>
    </div>
  );
};
