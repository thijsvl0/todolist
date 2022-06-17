import '@styles/globals.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import Layout from '@components/layout';
import { withTRPC } from '@trpc/next';
import { AppRouter } from './api/trpc/[trpc]';
import superjson from 'superjson';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}

export default withTRPC<AppRouter>({
  config({ ctx }) {
    const url = process.env.NEXT_PUBLIC_URL ? `${process.env.NEXT_PUBLIC_URL}/api/trpc` : 'http://localhost:3000/api/trpc';

    return {
      url,
      transformer: superjson,
    };
  },
  ssr: true,
})(MyApp);
