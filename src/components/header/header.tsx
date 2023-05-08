import Link from 'next/link';
import Logo from '../svg/logo';
import ThemeMenu from './themeMenu';
import SearchBar from './searcbar';
import SearchModal from './searchModal';
import PageMenu from './pageMenu';
import { useEffect, useState } from 'react';
import { UserTokenObject } from '@/pages/api/users/authenticate';
import ProfileMenu from './profileMenu';
import { JwtPayload } from 'jsonwebtoken';
import { getVerifiedToken } from '@/helpers/account/webToken';

export default function Header() {
  const [user, setUser] = useState<JwtPayload & UserTokenObject>();

  useEffect(() => {
    getVerifiedToken()
      .then((tokenObject) => {
        if (tokenObject) setUser(tokenObject);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <header className="bg-gray-300 dark:bg-slate-800">
      <div className="mx-auto flex max-w-container items-center justify-between">
        <Link href={'/'}>
          <h1 className="flex items-center gap-2 p-8 py-4 font-montserrat text-3xl font-semibold">
            <div className="w-6 flex-shrink-0">
              <Logo />
            </div>
            GAME JURY
          </h1>
        </Link>
        <SearchBar />
        <div className="flex items-center gap-4 pr-8">
          <div className="flex items-center gap-2">
            <SearchModal />
            <PageMenu />
            <ThemeMenu />
          </div>
          {user ? (
            <ProfileMenu user={user} />
          ) : (
            <Link href={'/account/login'} className="btn btn-blue">
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
