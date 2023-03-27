import Link from 'next/link';
import ThemeMenu from './themeMenu';

export default function Header() {
  return (
    <header className="flex items-center justify-between bg-gray-300 dark:bg-slate-800">
      <Link href={'/'}>
        <h1 className="site-name-clip-path bg-red-800 p-8 py-4 pr-20 font-montserrat text-3xl font-semibold text-white">
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
    </header>
  );
}
