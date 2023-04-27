import { GetServerSideProps } from 'next';
import { executeQuery } from '../../../server/database';
import Layout from '@/components/layout';
import { TableGame } from '../../../server/database/tableInterfaces';
import Head from 'next/head';
import Error from 'next/error';
import Image from 'next/image';
import ReviewSection from '@/components/game-article/review-section';

type JoinedTableGame = TableGame & {
  ageRatingName: string;
  ageRatingImage: string;
  developers: string | null;
  publishers: string | null;
  genres: string | null;
  platforms: string | null;
};

export default function GameArticle(props: { data: string }) {
  const [data]: JoinedTableGame[] = JSON.parse(props.data);

  if (!data) return <Error statusCode={404} />;

  const relations = {
    Developers: data.developers,
    Publishers: data.publishers,
    Genres: data.genres,
    Platforms: data.platforms,
  };

  const relationsRows = Object.entries(relations).map(([key, val]) =>
    val ? (
      <tr key={key}>
        <th>{key}</th>
        <td>
          {val
            .split(',')
            .map((item, index) => (index < val.split(',').length - 1 ? item + ', ' : item))}
        </td>
      </tr>
    ) : null
  );

  return (
    <>
      <Head>
        <title>Game Jury - {data.title}</title>
      </Head>
      <Layout>
        <h2 className="my-4 font-montserrat text-4xl">{data.title}</h2>
        <div className="flex gap-4">
          <table className="">
            <caption>{data.title}</caption>
            <tbody>
              <tr>
                <th>Age rating</th>
                <td>
                  <div>
                    <Image
                      className="max-h-12"
                      src={`/img/age-rating/${data.ageRatingImage}`}
                      alt={`${data.ageRatingName}`}
                      width={100}
                      height={100}
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <th>Release date</th>
                <td>{new Date(data.releaseDate).toLocaleDateString()}</td>
              </tr>
              {relationsRows}
            </tbody>
          </table>
          <p className="max-w-4xl">{data.summary}</p>
        </div>
        <ReviewSection className="mt-8" gameId={data.id} />
      </Layout>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { title } = context.query;

  const sql = `
  SELECT Game.*, age_rating.name AS ageRatingName, age_rating.image as ageRatingImage, 
  developers, publishers, genres, platforms
    FROM (
      SELECT * 
        FROM game
          WHERE titleSlug = "${title}"
      ) Game
    JOIN age_rating
      ON age_rating.id = Game.ageRatingId
    LEFT JOIN (
      SELECT gameId, GROUP_CONCAT(company.name) AS developers 
        FROM developer 
          JOIN company
            ON company.id = developer.companyId
        GROUP BY gameId
      ) Dev
      ON Dev.gameId = Game.id
    LEFT JOIN (
      SELECT gameId, GROUP_CONCAT(company.name) AS publishers 
        FROM publisher 
          JOIN company
            ON company.id = publisher.companyId
        GROUP BY gameId
      ) Pub
      ON Pub.gameId = Game.id
    LEFT JOIN (
      SELECT gameId, GROUP_CONCAT(genre.name) AS genres 
        FROM in_genre 
          JOIN genre
            ON genre.id = in_genre.genreId
        GROUP BY gameId
      ) Genre
      ON Genre.gameId = Game.id
    LEFT JOIN (
      SELECT gameId, GROUP_CONCAT(platform.name) AS platforms 
        FROM on_platform 
          JOIN platform
            ON platform.id = on_platform.platformId
        GROUP BY gameId
      ) Plat
      ON Plat.gameId = Game.id
    GROUP BY Game.id`;

  let [result] = await executeQuery(sql);
  if (result === null) throw 'Result is null';
  return { props: { data: JSON.stringify(result) } };
};
