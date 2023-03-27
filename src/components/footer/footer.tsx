import Link from 'next/link';
import Logo from '../svg/logo';

export default function Footer() {
  return (
    <footer className="mx-auto w-full max-w-container">
      <div className="flex justify-between border-t border-gray-700 p-12 py-8">
        <div className="flex items-center gap-2 font-montserrat text-xl">
          <div className="h-6">
            <Logo />
          </div>
          GAME JURY
        </div>
        <div className="flex gap-4">
          <Link className="link" href={'/about'}>
            About Us
          </Link>
          <a
            className="link"
            href={'https://github.com/MrNinjaPowha'}
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
