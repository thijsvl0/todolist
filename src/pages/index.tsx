import Button from '@components/common/Button';
import Card from '@components/common/Card';
import { PlusIcon } from '@heroicons/react/outline';
import type { NextPage } from 'next';

const Home: NextPage = () => {
  return (
    <>
      <div className="flex justify-between gap-x-2">
        <input type="text" className="col-span-5 block w-full rounded-xl border-2 border-gray-100 focus:border-primary-200 focus:ring-primary-200 sm:text-sm" placeholder="Todo" />
        <div>
          <Button>
            <PlusIcon className="w-8 stroke-[1.5] text-gray-500 transition duration-200 group-hover:text-gray-900" />
          </Button>
        </div>
      </div>
    </>
  );
};

export default Home;
