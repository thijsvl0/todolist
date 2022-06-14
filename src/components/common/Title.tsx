import type { FC } from 'react';

interface TitleProps {
  children: React.ReactNode;
}

const Title: FC<TitleProps> = ({ children }) => {
  return <h1 className="mb-4 text-left text-xl font-semibold">{children}</h1>;
};
export default Title;
