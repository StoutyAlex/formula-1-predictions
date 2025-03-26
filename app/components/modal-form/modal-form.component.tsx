import { ModalFormTextInput, type ModalFormTextInputProps } from './form-components/text-input.form.component';

export enum FormType {
  TEXT = 'text',
}

interface FormTypeMap {
  [FormType.TEXT]: ModalFormTextInputProps;
}

interface InputOptions {
  type: FormType.TEXT;
  props: FormTypeMap[FormType.TEXT];
}

export interface ModalFormProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  layout: InputOptions[][];
}

export const ModalForm = ({ layout }: ModalFormProps) => {
  const rows = layout.map((row) => {
    const cols = row.map((col) => {
      switch (col.type) {
        case FormType.TEXT:
          return <ModalFormTextInput {...col.props} />;
        default:
          return null;
      }
    });

    const inputs = cols.map((col) => {
      return <div className="col-span-2 sm:col-span-2">{col}</div>;
    });

    return <div className="grid gap-4 mb-4 grid-cols-2">{inputs}</div>;
  });

  return (
    <form className="p-4 md:p-5">
      <div className="grid gap-4 mb-4 grid-cols-2">
        {rows}
        <div className="col-span-2">
          <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Product Description
          </label>
          <textarea
            id="description"
            rows={4}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Write product description here"
          ></textarea>
        </div>
      </div>
      <button
        type="submit"
        className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path
            fill-rule="evenodd"
            d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
            clip-rule="evenodd"
          ></path>
        </svg>
        Add new product
      </button>
    </form>
  );
};
