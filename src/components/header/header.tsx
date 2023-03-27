import Link from 'next/link';
import Logo from '../svg/logo';
import ThemeMenu from './themeMenu';

export default function Header() {
  return (
    <header className="bg-gray-300 dark:bg-slate-800">
      <div className="mx-auto flex max-w-container items-center justify-between">
        <Link href={'/'}>
          <h1 className="flex items-center gap-2 p-8 py-4 font-montserrat text-3xl font-semibold">
            <div className="inline-block h-10">
              <Logo />
            </div>
            GAME JURY
          </h1>
        </Link>
        <div className="flex items-center gap-4 px-8">
          <ThemeMenu />
          <Link
            href={'/account/login'}
            className="btn bg-blue-500 text-white transition-colors duration-150 hover:bg-blue-600 focus-visible:bg-blue-600 active:bg-blue-700"
          >
            Login
          </Link>
        </div>
      </div>
    </header>
  );
}
