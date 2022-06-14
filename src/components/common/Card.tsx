import { classNames } from '@utils';
import type { DetailedHTMLProps, FC, HTMLAttributes } from 'react';

interface CardProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children: React.ReactNode;
}

const Card: FC<CardProps> = ({ children, className, ...props }) => {
  return (
    <div className={classNames('w-full rounded-3xl bg-white', className ? className : '')} {...props}>
      {children}
    </div>
  );
};
export default Card;
