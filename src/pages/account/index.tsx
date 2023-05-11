import { getVerifiedToken } from '@/helpers/account/webToken';
import { JwtPayload } from 'jsonwebtoken';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { UserTokenObject } from '../api/users/authenticate';
import Layout from '@/components/layout';
import Image from 'next/image';
import DeleteModal from '@/components/account/deleteModal';

export default function Profile() {
  const [user, setUser] = useState<UserTokenObject & JwtPayload>();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getVerifiedToken().then((tokenObject) => {
      if (tokenObject) setUser(tokenObject);
    });
  }, []);

  function onDelete() {
    setShowModal(true);
  }

  return user ? (
    <>
      <Head>
        <title>Game Jury - {user.username}</title>
      </Head>
      <Layout>
        <div className="flex items-center gap-4">
          {user.profileImage ? (
            <Image
              className="h-24 w-24 border border-gray-400 dark:border-gray-300"
              src={user.profileImage}
              alt="profile"
              width={100}
              height={100}
            />
          ) : (
            <div className="flex h-24 w-24 items-center justify-center rounded-full border border-gray-400 bg-red-700 text-6xl text-gray-200 dark:border-gray-300">
              {user.username[0].toUpperCase()}
            </div>
          )}
          <h2 className="font-montserrat text-4xl">{user.username}</h2>
        </div>
        <h3 className="text-2xl">My account</h3>
        <div className="flex gap-2 py-2">
          <button className="btn btn-default">Edit</button>
          <button className="btn btn-red" onClick={onDelete}>
            Delete
          </button>
        </div>
      </Layout>
      <DeleteModal visible={showModal} onClose={() => setShowModal(false)} />
    </>
  ) : null;
}
