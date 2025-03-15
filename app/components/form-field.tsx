import React, { useEffect, useState } from "react"

interface FormFieldProps {
    htmlFor: string
    label: string
    value: string
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    type?: string
    error?: string
}

export const FormField = (props: FormFieldProps) => {
    const { htmlFor, label, value, error } = props;
    const type = props.type || "text"

    const [errorText, setErrorText] = useState(error);

    useEffect(() => {
        setErrorText(error)
    }, [error])

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.onChange(event);
        setErrorText('');
    }

    return (
        <>
            <label htmlFor={htmlFor} className="font-semibold">{label}</label>
            <input name={htmlFor} type={type} id={htmlFor} value={value} onChange={onChange} className="w-full p-2 rounded-xl my-2 bg-gray-500"/>
            <div className="text-xs font-semibold text-center tracking-wide text-red-500 w-full">
                {errorText || ''}
            </div>
      </>
    )
}