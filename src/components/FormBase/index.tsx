import React, { createContext, useContext, useState } from "react";
import "./index.scss"

export const FormContext = createContext<any>(null);

export interface IFormProps<T> {
  initialValues?: T;
  onFinish?: (values: T) => void;
  className?: string;
  children?: React.ReactNode;
}

export interface IFormInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  style?: React.CSSProperties,
}

// ===== Form =====
function Form<T extends Record<string, any> = Record<string, any>>(
  props: IFormProps<T>
) {
  const { initialValues = {}, onFinish, className = "", children } = props;
  const [values, setValues] = useState<T>(initialValues as T);

  const setFieldValue = (name: string, value: any) => {
    setValues((prev) => ({ ...prev, [name]: value } as T));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFinish?.(values);
  };

  return (
    <FormContext.Provider value={{ values, setFieldValue }}>
      <form onSubmit={handleSubmit} className={className} >
        {children}
      </form>
    </FormContext.Provider>
  );
}

// ===== Form.Input =====
function FormInput({ name, style, ...rest }: IFormInputProps) {
  const { values, setFieldValue } = useContext(FormContext);

  return (
    <input
      {...rest}
      name={name}
      value={values[name] ?? ""}
      onChange={(e) => setFieldValue(name, e.target.value)}
      className="input-base"
      style={{ ...style }}
    />
  );
}

Form.Input = FormInput;

export default Form;

export const Input = ({ name, style, ...rest }: IFormInputProps) => {

  return (
    <input
      {...rest}
      name={name}
      className="input-base"
      style={{ ...style }}
    />
  );
}