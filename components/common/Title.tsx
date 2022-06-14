import type { FC } from 'react';

interface TitleProps {
  children: React.ReactNode;
}

const Title: FC<TitleProps> = ({ children }) => {
  return <h1 className="mb-5 text-center text-2xl font-bold text-gray-900">{children}</h1>;
};
export default Title;
