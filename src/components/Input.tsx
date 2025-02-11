import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  labelBackground: string;
  inputName: string;
}

const Input: React.FC<InputProps> = ({
  labelBackground,
  inputName,
  ...props
}) => {
  return (
    <div className="relative border p-1 rounded-lg mt-2 w-11/12">
      <label
        className={`absolute top-[-0.8rem] ${labelBackground} text-white left-4 text-sm px-1`}
        htmlFor={props.name}
      >
        {inputName}
      </label>
      <input
        className="bg-slate-700 text-white w-full p-2 rounded-md outline-none"
        {...props}
      />
    </div>
  );
};

export default Input;
