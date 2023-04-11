import { TableGame } from '../../../server/database/tableInterfaces';
import Layout from '@/components/layout';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import LoadingSpinner from '@/components/loadingSpinner';
import Error from 'next/error';

export default function GameLibrary() {
  const [loading, setLoading] = useState(true);
  const [gamesData, setGamesData] = useState<TableGame[]>();

  useEffect(() => {
    fetch('/api/db/get-games-list')
      .then((res) => res.json())
      .then((res) => {
        setGamesData(res);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (!loading && !gamesData) return <Error statusCode={500} />;

  const html =
    gamesData?.map((game) => {
      return (
        <Link className="relative" href={`/games/${game.titleSlug}`} key={game.titleSlug}>
          <Image
            src={`/img/game/box-art/${game.boxArtImage}`}
            alt={`${game.title} box art`}
            width={100}
            height={100}
          />
          <div className="absolute inset-x-0 bottom-0 bg-slate-900 bg-opacity-90 p-2">
            <span>{game.title}</span>
          </div>
        </Link>
      );
    }) ?? null;

  return (
    <>
      <Head>
        <title>Game Jury - Games</title>
      </Head>
      <Layout>
        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="grid max-w-container gap-4 grid-col-auto-max-[8]">{html}</div>
        )}
      </Layout>
    </>
  );
}
