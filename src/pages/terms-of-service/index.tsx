import Layout from '@/components/layout';
import Head from 'next/head';

export default function TermsOfService() {
  return (
    <>
      <Head>
        <title>Game Jury - Terms of Service</title>
      </Head>
      <Layout>
        <article className="max-w-4xl text-lg">
          <h2 className="my-4 font-montserrat text-4xl">Storing data</h2>
          <p>
            Game Jury does not store any data other than the time you create an account and the
            information you provide. This includes your username, password and date of birth.
          </p>
        </article>
      </Layout>
    </>
  );
}
