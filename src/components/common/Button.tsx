import type { ButtonHTMLAttributes, DetailedHTMLProps, FC } from 'react';
import { classNames } from '@utils';

const colorClassname = {
  info: 'text-gray-800 hover:text-black hover:bg-gray-200 hover:shadow focus:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50',
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
