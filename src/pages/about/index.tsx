import Layout from '@/components/layout';
import Head from 'next/head';

export default function About() {
  return (
    <>
      <Head>
        <title>About Game Jury</title>
      </Head>
      <Layout>
        <article className="max-w-4xl text-lg">
          <h2 className="my-4 font-montserrat text-4xl">About Game Jury</h2>
          <p>
            Game Jury lets you share your opinion on all your favourite games by reviewing or
            discussing with others. Be mindful of your language when commenting on games made for
            children as we want this site to be open to as many as possible. This site was created
            by MrNinjaPowha as a school project and might therefore have a few problems, so please
            report any bugs you find{' '}
            <a
              className="link"
              href="https://github.com/MrNinjaPowha/game-jury"
              target="_blank"
              rel="noopener noreferrer"
            >
              here
            </a>
            .
          </p>
        </article>
      </Layout>
    </>
  );
}
