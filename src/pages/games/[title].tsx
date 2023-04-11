import { GetServerSideProps } from 'next';
import { executeQuery } from '../../../server/database';
import Layout from '@/components/layout';
import { TableGame } from '../../../server/database/tableInterfaces';
import Head from 'next/head';
import Error from 'next/error';

export default function GameArticle(props: { data: string }) {
  const [data]: TableGame[] = JSON.parse(props.data);

  if (!data) return <Error statusCode={404} />;

  return (
    <>
      <Head>
        <title>Game Jury - {data.title}</title>
      </Head>
      <Layout>
        <h2 className="font-montserrat text-4xl">{data.title}</h2>
        <p>{data.summary}</p>
      </Layout>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { title } = context.query;
  const [result] = await executeQuery(`SELECT * FROM game WHERE titleSlug = "${title}"`);
  if (result === null) throw 'Result is null';
  return { props: { data: JSON.stringify(result) } };
};
