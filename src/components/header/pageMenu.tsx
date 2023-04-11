import Link from 'next/link';
import MenuIcon from '../svg/menuIcon';
import { useEffect, useState } from 'react';

export default function PageMenu() {
  const [currentPath, setCurrentPath] = useState<string>();
  const links = [
    {
      name: 'Games',
      link: '/games',
    },
  ];

  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);

  const linksHtml = links.map((link) => (
    <Link
      className="btn-icon rounded-md px-3 text-lg data-[current=true]:bg-opacity-5"
      href={link.link}
      data-current={currentPath === link.link}
      key={link.name}
    >
      {link.name}
    </Link>
  ));

  return (
    <>
      <div className="hidden h-8 items-center gap-2 border-r border-gray-400 px-4 md:flex">
        {linksHtml}
      </div>
      <div className="relative md:hidden">
        <button className="btn-icon h-12 w-12">
          <MenuIcon />
        </button>
      </div>
    </>
  );
}
