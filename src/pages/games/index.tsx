import Layout from '@/components/layout';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Error from 'next/error';
import { GamesList } from '../api/db/get-games-list';

export default function GameLibrary() {
  const [loading, setLoading] = useState(true);
  const [gamesData, setGamesData] = useState<GamesList[]>();

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
        <Link
          className="group relative overflow-hidden"
          href={`/games/${game.titleSlug}`}
          key={game.titleSlug}
        >
          <Image
            src={`/img/game/box-art/${game.boxArtImage}`}
            alt={`${game.title} box art`}
            width={100}
            height={100}
          />
          <div className="absolute inset-0 flex items-end">
            <div className="flex h-12 w-full items-center bg-gray-600 !bg-opacity-90 p-2 font-semibold text-gray-200 transition-all group-hover:h-full group-focus:h-full dark:bg-slate-800">
              <span>{game.title}</span>
            </div>
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
          <div className="m-auto max-w-max p-4">
            <div className="loading-spinner h-12 w-12"></div>
          </div>
        ) : (
          <div className="grid max-w-container gap-4 grid-col-auto-max-[8]">{html}</div>
        )}
      </Layout>
    </>
  );
}
