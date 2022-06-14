import type { ButtonHTMLAttributes, DetailedHTMLProps, FC } from 'react';
import { classNames } from '@utils';

const colorClassname = {
  info: 'text-gray-800 hover:text-black hover:bg-gray-200 focus:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50',
  primary: 'bg-blue-500 font-semibold text-white shadow-sm hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50',
  secondary: 'border border-gray-200 font-normal text-gray-500 shadow-sm hover:shadow-md',
};

interface ButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  children: React.ReactNode;
  color?: keyof typeof colorClassname;
}

const Button: FC<ButtonProps> = ({ color = 'info', children, className, ...props }) => {
  return (
    <button type="button" className={classNames('group inline-block w-full rounded-2xl py-2.5 px-2 text-center text-sm transition duration-200', colorClassname[color], className ? className : '')} {...props}>
      {children}
    </button>
  );
};
export default Button;
