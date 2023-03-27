import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="mx-auto w-full max-w-container">
      <div className="flex justify-between border-t border-gray-700 p-12 py-8">
        <div className="font-montserrat text-xl">GAME JURY</div>
        <div>
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
