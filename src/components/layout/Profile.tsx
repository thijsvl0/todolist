import Card from '@components/common/Card';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import { SignOut } from 'phosphor-react';
import type { FC } from 'react';

interface ProfileProps {}

const Profile: FC<ProfileProps> = ({}) => {
  const { data: session } = useSession();

  return (
    <Card className="mb-4 bg-gray-100 py-2 px-4">
      <div className="flex h-14 gap-x-2">
        <div className="relative aspect-square h-full overflow-hidden rounded-full">{session?.user?.image && <Image src={session?.user?.image} alt="pfp" layout="fill" objectFit="cover" loading="eager" />}</div>
        <div className="grid h-full flex-1 grid-rows-2 py-1">
          <h4 className="text-base font-semibold text-gray-900">{session?.user?.name}</h4>
          <span className="text-base text-gray-500">{session?.user?.email}</span>
        </div>
        <div className="flex items-center justify-center">
          <SignOut onClick={() => signOut()} size={32} className="text-gray-500 transition duration-200 hover:cursor-pointer hover:text-gray-900" />
        </div>
      </div>
    </Card>
  );
};
export default Profile;
