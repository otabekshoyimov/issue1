import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
}
export const Button = (props: ButtonProps) => {
  return (
    <>
      <button
        className="disabled:cursor-not-allowed disabled:text-gray-300 disabled:outline-gray-300 enabled:hover:outline-black enabled:hover:text-black shadow-sm px-1 outline outline-1 py-1 text-gray-6  00 outline-gray-400 rounded-md  leading-3"
        {...props}
      >
        {props.text}
      </button>
    </>
  );
};
