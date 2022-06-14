import type { GetStaticProps, NextPage } from 'next';
import { BuiltInProviderType } from 'next-auth/providers';
import { ClientSafeProvider, getProviders, LiteralUnion, signIn, signOut, useSession } from 'next-auth/react';

interface Props {
  providers: Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> | null;
}

const Home: NextPage<Props> = ({ providers }) => {
  const { data: session, status } = useSession();

  return (
    <>
      {session ? (
        <>
          <h1>Welcome {session?.user?.name}</h1>
          <button onClick={() => signOut()}>Sign Out</button>
        </>
      ) : (
        providers &&
        Object.values(providers).map((provider) => (
          <div key={provider.name}>
            <button onClick={() => signIn(provider.id)}>Sign in with {provider.name}</button>
          </div>
        ))
      )}
    </>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  return {
    props: { providers: await getProviders() },
  };
};

export default Home;
