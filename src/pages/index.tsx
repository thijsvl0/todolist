import Button from '@components/common/Button';
import Card from '@components/common/Card';
import type { NextPage } from 'next';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import { LogoutIcon } from '@heroicons/react/outline';

const Home: NextPage = () => {
  const { data } = useSession();

  return (
    <>
      <div className="flex h-14 gap-x-2">
        <div className="relative aspect-square h-full overflow-hidden rounded-full">{data?.user?.image && <Image src={data?.user?.image} alt="pfp" layout="fill" objectFit="cover" loading="eager" />}</div>
        <div className="grid h-full flex-1 grid-rows-2 py-1">
          <h4 className="text-base font-semibold text-gray-900">{data?.user?.name}</h4>
          <span className="text-base text-gray-500">{data?.user?.email}</span>
        </div>
        <div className="flex items-center justify-center">
          <Button onClick={() => signOut()}>
            <LogoutIcon className="w-8 text-gray-500 transition duration-200 group-hover:text-gray-900" />
          </Button>
        </div>
      </div>
      <Card></Card>
    </>
  );
};

export default Home;
